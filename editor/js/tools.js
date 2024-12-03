class ToolManager {
    constructor(editor) {
        this.editor = editor;
        this.currentTool = null;
        this.isDragging = false;
        this.selectedElement = null;
        
        this.initializeTools();
    }

    initializeTools() {
        this.tools = {
            select: new SelectTool(this),
            move: new MoveTool(this),
            text: new TextTool(this)
        };
    }

    setTool(toolName) {
        if (this.currentTool) {
            this.currentTool.deactivate();
        }
        
        this.currentTool = this.tools[toolName];
        if (this.currentTool) {
            this.currentTool.activate();
        }
    }
}

class Tool {
    constructor(manager) {
        this.manager = manager;
        this.editor = manager.editor;
    }

    activate() {
        // Override in subclasses
    }

    deactivate() {
        // Override in subclasses
    }

    onMouseDown(e) {
        // Override in subclasses
    }

    onMouseMove(e) {
        // Override in subclasses
    }

    onMouseUp(e) {
        // Override in subclasses
    }
}

class SelectTool extends Tool {
    activate() {
        this.editor.canvas.style.cursor = 'default';
        this.addEventListeners();
    }

    deactivate() {
        this.removeEventListeners();
    }

    addEventListeners() {
        this.editor.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    removeEventListeners() {
        this.editor.canvas.removeEventListener('mousedown', this.onMouseDown.bind(this));
        document.removeEventListener('mousemove', this.onMouseMove.bind(this));
        document.removeEventListener('mouseup', this.onMouseUp.bind(this));
    }

    onMouseDown(e) {
        const target = e.target;
        if (target.classList.contains('selectable')) {
            this.manager.selectedElement = target;
            this.manager.isDragging = true;
            
            // Highlight selected element
            this.highlightElement(target);
        } else {
            this.manager.selectedElement = null;
            this.clearHighlights();
        }
    }

    onMouseMove(e) {
        if (this.manager.isDragging && this.manager.selectedElement) {
            // Update selection box position
        }
    }

    onMouseUp(e) {
        this.manager.isDragging = false;
    }

    highlightElement(element) {
        this.clearHighlights();
        element.classList.add('selected');
    }

    clearHighlights() {
        document.querySelectorAll('.selected').forEach(el => {
            el.classList.remove('selected');
        });
    }
}

class MoveTool extends Tool {
    activate() {
        this.editor.canvas.style.cursor = 'move';
        this.addEventListeners();
    }

    deactivate() {
        this.removeEventListeners();
    }

    addEventListeners() {
        this.editor.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    removeEventListeners() {
        this.editor.canvas.removeEventListener('mousedown', this.onMouseDown.bind(this));
        document.removeEventListener('mousemove', this.onMouseMove.bind(this));
        document.removeEventListener('mouseup', this.onMouseUp.bind(this));
    }

    onMouseDown(e) {
        const target = e.target;
        if (target.classList.contains('movable')) {
            this.manager.selectedElement = target;
            this.manager.isDragging = true;
            
            // Store initial position
            this.startX = e.clientX;
            this.startY = e.clientY;
        }
    }

    onMouseMove(e) {
        if (this.manager.isDragging && this.manager.selectedElement) {
            const dx = e.clientX - this.startX;
            const dy = e.clientY - this.startY;
            
            // Update element position
            const element = this.manager.selectedElement;
            const newX = element.x.baseVal.value + dx;
            const newY = element.y.baseVal.value + dy;
            
            element.x.baseVal.value = newX;
            element.y.baseVal.value = newY;
            
            this.startX = e.clientX;
            this.startY = e.clientY;
        }
    }

    onMouseUp(e) {
        this.manager.isDragging = false;
    }
}

class TextTool extends Tool {
    activate() {
        this.editor.canvas.style.cursor = 'text';
        this.addEventListeners();
    }

    deactivate() {
        this.removeEventListeners();
    }

    addEventListeners() {
        this.editor.canvas.addEventListener('click', this.onClick.bind(this));
    }

    removeEventListeners() {
        this.editor.canvas.removeEventListener('click', this.onClick.bind(this));
    }

    onClick(e) {
        const point = this.editor.canvas.point(e.clientX, e.clientY);
        
        // Create text element
        const text = this.editor.canvas.text(function(add) {
            add.tspan('New Text').fill('#000');
        });
        
        text.move(point.x, point.y)
            .addClass('selectable')
            .addClass('movable');
        
        // Make text editable
        this.makeTextEditable(text);
    }

    makeTextEditable(textElement) {
        textElement.on('dblclick', function() {
            const text = this.text();
            const input = document.createElement('input');
            input.value = text;
            input.style.position = 'absolute';
            
            // Position input over text
            const bbox = this.bbox();
            input.style.left = bbox.x + 'px';
            input.style.top = bbox.y + 'px';
            
            document.body.appendChild(input);
            input.focus();
            
            input.addEventListener('blur', () => {
                this.text(input.value);
                document.body.removeChild(input);
            });
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    input.blur();
                }
            });
        });
    }
}

// Initialize tools when the page loads
window.addEventListener('load', () => {
    if (window.cardEditor) {
        window.toolManager = new ToolManager(window.cardEditor);
    }
});
