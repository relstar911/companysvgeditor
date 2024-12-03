class CardEditor {
    constructor() {
        this.initializeEditor();
        this.bindEvents();
        this.currentZoom = 1;
        this.selectedTool = 'select';
        this.undoStack = [];
        this.redoStack = [];
        this.currentTemplate = null;
        this.components = null;
        this.templateManager = null;
    }

    async initializeEditor() {
        // Wait for components and templates to load
        await this.waitForDependencies();

        // Initialize SVG.js
        this.canvas = SVG()
            .addTo('#editorCanvas')
            .size(750, 1050);

        // Initialize the component library
        this.initializeComponentLibrary();

        // Initialize tools
        this.initializeTools();

        // Listen for template changes
        this.bindTemplateEvents();
    }

    async waitForDependencies() {
        // Wait for components and template manager to be available
        return new Promise(resolve => {
            const checkDependencies = () => {
                if (window.tcgComponents && window.templateManager) {
                    this.components = window.tcgComponents;
                    this.templateManager = window.templateManager;
                    resolve();
                } else {
                    setTimeout(checkDependencies, 100);
                }
            };
            checkDependencies();
        });
    }

    initializeComponentLibrary() {
        const components = this.components.getAllComponents();
        
        // Populate frame components
        const frameComponents = document.getElementById('frameComponents');
        Object.values(components.frames).forEach(frame => {
            const component = this.createComponentElement(frame);
            frameComponents.appendChild(component);
        });

        // Populate text components
        const textComponents = document.getElementById('textComponents');
        Object.values(components.textboxes).forEach(text => {
            const component = this.createComponentElement(text);
            textComponents.appendChild(component);
        });

        // Populate decorative components
        const decorativeComponents = document.getElementById('decorativeComponents');
        Object.values(components.decorative).forEach(deco => {
            const component = this.createComponentElement(deco);
            decorativeComponents.appendChild(component);
        });

        // Populate icon components
        const iconComponents = document.getElementById('iconComponents');
        Object.values(components.symbols).forEach(symbol => {
            const component = this.createComponentElement(symbol);
            iconComponents.appendChild(component);
        });
    }

    createComponentElement(component) {
        const div = document.createElement('div');
        div.className = 'component-item';
        div.setAttribute('data-category', component.category);
        div.setAttribute('data-name', component.name);

        const preview = document.createElement('div');
        preview.className = 'component-preview';
        if (component.template) {
            preview.innerHTML = component.template;
        }

        const label = document.createElement('div');
        label.className = 'component-label';
        label.textContent = component.name;

        div.appendChild(preview);
        div.appendChild(label);

        div.addEventListener('click', () => this.addComponentToCanvas(component));
        div.addEventListener('dragstart', (e) => this.handleDragStart(e, component));

        return div;
    }

    bindTemplateEvents() {
        document.addEventListener('templateChange', (event) => {
            const { templateKey, template } = event.detail;
            this.loadTemplate(templateKey, template);
        });
    }

    async loadTemplate(templateKey, template) {
        // Clear current canvas
        this.canvas.clear();

        // Create base card with template
        const cardData = {
            name: 'New Card',
            type: template.name,
            description: 'Enter card description',
            attack: '0',
            defense: '0',
            speed: '0'
        };

        const cardSVG = await this.components.createCard(templateKey, cardData);
        if (cardSVG) {
            // Parse SVG string to DOM
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(cardSVG, 'image/svg+xml');
            
            // Import SVG elements to canvas
            const svgElement = svgDoc.documentElement;
            const svgContent = this.canvas.svg(svgElement.outerHTML);
            
            // Make elements selectable
            this.makeElementsSelectable(svgContent);
        }

        this.currentTemplate = templateKey;
        this.saveState();
    }

    makeElementsSelectable(element) {
        if (element.children) {
            element.children().forEach(child => {
                child.click(() => this.selectElement(child));
                this.makeElementsSelectable(child);
            });
        }
    }

    selectElement(element) {
        // Remove previous selection
        this.canvas.find('.selected').forEach(el => el.removeClass('selected'));
        
        // Add selection to clicked element
        element.addClass('selected');
        
        // Show properties panel for selected element
        this.showProperties(element);
    }

    showProperties(element) {
        const propertiesPanel = document.getElementById('propertiesPanel');
        // Clear previous properties
        propertiesPanel.innerHTML = '';

        // Add common properties
        if (element.type === 'text') {
            this.addTextProperties(element, propertiesPanel);
        } else {
            this.addShapeProperties(element, propertiesPanel);
        }
    }

    addComponentToCanvas(component) {
        if (!component.template) return;

        const svgElement = this.createSVGFromTemplate(component.template);
        const addedElement = this.canvas.svg(svgElement.outerHTML);
        
        // Make the new element draggable and selectable
        addedElement.draggable();
        this.makeElementsSelectable(addedElement);
        
        this.saveState();
    }

    createSVGFromTemplate(template) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(template, 'image/svg+xml');
        return doc.documentElement;
    }

    bindEvents() {
        // Zoom controls
        document.getElementById('zoomIn').addEventListener('click', () => this.adjustZoom(0.1));
        document.getElementById('zoomOut').addEventListener('click', () => this.adjustZoom(-0.1));
        document.getElementById('resetZoom').addEventListener('click', () => this.resetZoom());

        // Tool selection
        document.querySelectorAll('.toolbar button').forEach(button => {
            button.addEventListener('click', (e) => this.handleToolSelection(e));
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Save and Export
        document.getElementById('saveCard').addEventListener('click', () => this.saveCard());
        document.getElementById('exportCard').addEventListener('click', () => this.exportCard());
    }

    adjustZoom(delta) {
        this.currentZoom = Math.max(0.1, Math.min(3, this.currentZoom + delta));
        this.updateCanvasZoom();
    }

    resetZoom() {
        this.currentZoom = 1;
        this.updateCanvasZoom();
    }

    updateCanvasZoom() {
        const canvas = document.getElementById('editorCanvas');
        canvas.style.transform = `scale(${this.currentZoom})`;
    }

    handleToolSelection(e) {
        const toolId = e.currentTarget.id;
        this.selectedTool = toolId;

        // Update UI
        document.querySelectorAll('.toolbar button').forEach(button => {
            button.classList.remove('active');
        });
        e.currentTarget.classList.add('active');

        // Update cursor and tool behavior
        this.updateToolBehavior();
    }

    updateToolBehavior() {
        const canvas = document.getElementById('editorCanvas');
        
        switch(this.selectedTool) {
            case 'selectTool':
                canvas.style.cursor = 'default';
                break;
            case 'moveTool':
                canvas.style.cursor = 'move';
                break;
            case 'textTool':
                canvas.style.cursor = 'text';
                break;
        }
    }

    handleKeyboardShortcuts(e) {
        // Tool shortcuts
        if (!e.ctrlKey) {
            switch(e.key.toLowerCase()) {
                case 'v': 
                    document.getElementById('selectTool').click(); 
                    break;
                case 'm': 
                    document.getElementById('moveTool').click(); 
                    break;
                case 't': 
                    document.getElementById('textTool').click(); 
                    break;
            }
        }

        // Undo/Redo
        if (e.ctrlKey) {
            switch(e.key.toLowerCase()) {
                case 'z':
                    if (e.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                    break;
                case 'y':
                    this.redo();
                    break;
            }
        }

        // Zoom shortcuts
        if (e.key === '0') {
            this.resetZoom();
        } else if (e.key === '+' || e.key === '=') {
            this.adjustZoom(0.1);
        } else if (e.key === '-' || e.key === '_') {
            this.adjustZoom(-0.1);
        }
    }

    undo() {
        if (this.undoStack.length > 1) {
            const currentState = this.undoStack.pop();
            this.redoStack.push(currentState);
            const previousState = this.undoStack[this.undoStack.length - 1];
            this.canvas.clear();
            this.canvas.svg(previousState);
            this.makeElementsSelectable(this.canvas);
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            const nextState = this.redoStack.pop();
            this.canvas.clear();
            this.canvas.svg(nextState);
            this.undoStack.push(nextState);
            this.makeElementsSelectable(this.canvas);
        }
    }

    saveCard() {
        // Implement save functionality
        const svgContent = this.canvas.svg();
        // Save to file or localStorage
    }

    exportCard() {
        // Implement export functionality
        const svgContent = this.canvas.svg();
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'card.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    saveState() {
        const currentState = this.canvas.svg();
        this.undoStack.push(currentState);
        this.redoStack = [];
    }
}

// Initialize the editor when the page loads
window.addEventListener('load', () => {
    window.cardEditor = new CardEditor();
});
