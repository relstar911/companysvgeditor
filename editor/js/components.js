class ComponentLibrary {
    constructor() {
        this.components = {
            frames: this.initializeFrames(),
            textElements: this.initializeTextElements(),
            decorative: this.initializeDecorative(),
            icons: this.initializeIcons()
        };
        
        this.initializeLibrary();
    }

    initializeFrames() {
        return [
            {
                name: 'Basic Frame',
                template: `
                    <rect width="750" height="1050" rx="37.5" fill="url(#cardBackground)"/>
                    <rect width="750" height="1050" rx="37.5" stroke="#000" fill="none"/>
                `
            },
            {
                name: 'Aurora Frame',
                template: `
                    <defs>
                        <linearGradient id="auroraBackground" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#E0FFFF"/>
                            <stop offset="35%" style="stop-color:#B0E0E6"/>
                            <stop offset="65%" style="stop-color:#87CEEB"/>
                            <stop offset="100%" style="stop-color:#E0FFFF"/>
                        </linearGradient>
                    </defs>
                    <rect width="750" height="1050" rx="37.5" fill="url(#auroraBackground)"/>
                `
            }
        ];
    }

    initializeTextElements() {
        return [
            {
                name: 'Title Text',
                template: `
                    <text x="375" y="85" 
                          text-anchor="middle" 
                          font-family="Trajan Pro, serif" 
                          font-size="45" 
                          fill="#000" 
                          font-weight="bold">
                        Card Title
                    </text>
                `
            },
            {
                name: 'Type Text',
                template: `
                    <text x="375" y="655" 
                          text-anchor="middle" 
                          font-family="Trajan Pro, serif" 
                          font-size="24" 
                          fill="#000">
                        Card Type
                    </text>
                `
            }
        ];
    }

    initializeDecorative() {
        return [
            {
                name: 'Ornate Border',
                template: `
                    <path d="M30 30 H720 V1020 H30 V30
                           M35 35 H715 V1015 H35 V35" 
                          stroke="#000" 
                          stroke-width="2" 
                          fill="none"/>
                `
            },
            {
                name: 'Corner Flourish',
                template: `
                    <path d="M50 50 C70 50, 90 50, 110 70" 
                          stroke="#000" 
                          stroke-width="2" 
                          fill="none"/>
                `
            }
        ];
    }

    initializeIcons() {
        return [
            {
                name: 'Mana Crystal',
                template: `
                    <path d="M25,0 L50,25 L25,50 L0,25 Z" 
                          fill="#87CEEB" 
                          stroke="#000"/>
                `
            },
            {
                name: 'Power Icon',
                template: `
                    <circle r="25" 
                            fill="#FF4444" 
                            stroke="#000"/>
                `
            }
        ];
    }

    initializeLibrary() {
        this.populateCategory('frameComponents', this.components.frames);
        this.populateCategory('textComponents', this.components.textElements);
        this.populateCategory('decorativeComponents', this.components.decorative);
        this.populateCategory('iconComponents', this.components.icons);
    }

    populateCategory(containerId, components) {
        const container = document.getElementById(containerId);
        if (!container) return;

        components.forEach(component => {
            const componentEl = document.createElement('div');
            componentEl.className = 'component-item';
            
            // Create a mini SVG preview
            const preview = document.createElement('div');
            preview.innerHTML = `
                <svg width="100" height="60" viewBox="0 0 100 60">
                    ${this.createPreviewVersion(component.template)}
                </svg>
            `;
            
            const name = document.createElement('div');
            name.textContent = component.name;
            
            componentEl.appendChild(preview);
            componentEl.appendChild(name);
            
            // Add drag functionality
            this.addDragBehavior(componentEl, component);
            
            container.appendChild(componentEl);
        });
    }

    createPreviewVersion(template) {
        // Simplify the template for preview
        // This could be enhanced to create better previews
        return template;
    }

    addDragBehavior(element, component) {
        element.draggable = true;
        
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('application/json', JSON.stringify(component));
        });
    }
}

// Initialize the component library when the page loads
window.addEventListener('load', () => {
    window.componentLibrary = new ComponentLibrary();
});
