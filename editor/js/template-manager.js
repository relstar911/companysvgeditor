class TemplateManager {
    constructor() {
        this.templates = window.cardTemplates;
        this.components = window.tcgComponents;
        this.currentTemplate = null;
        this.initializeInterface();
    }

    initializeInterface() {
        this.createTemplateSelector();
    }

    createTemplateSelector() {
        const container = document.createElement('div');
        container.className = 'template-selector';
        container.innerHTML = `
            <div class="template-header">
                <h3>Card Type</h3>
                <select id="templateSelect" class="template-select">
                    <option value="">Select Card Type</option>
                </select>
            </div>
            <div id="templatePreview" class="template-preview"></div>
        `;

        // Add template options
        const select = container.querySelector('#templateSelect');
        Object.keys(this.templates.templates).forEach(templateKey => {
            const template = this.templates.templates[templateKey];
            const option = document.createElement('option');
            option.value = templateKey;
            option.textContent = template.name;
            select.appendChild(option);
        });

        // Bind events
        select.addEventListener('change', (e) => {
            const templateKey = e.target.value;
            if (templateKey) {
                this.selectTemplate(templateKey);
            }
        });

        // Add to sidebar
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.appendChild(container);
        }
    }

    selectTemplate(templateKey) {
        this.currentTemplate = templateKey;
        const template = this.templates.templates[templateKey];
        
        // Create preview
        const preview = document.getElementById('templatePreview');
        if (!preview) return;

        // Create SVG preview
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('viewBox', '0 0 750 1050');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');

        // Add background gradient and pattern
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        defs.innerHTML = template.background.gradient + template.background.pattern;
        svg.appendChild(defs);

        // Add background layers
        const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bgRect.setAttribute('width', '750');
        bgRect.setAttribute('height', '1050');
        bgRect.setAttribute('rx', '37.5');
        bgRect.setAttribute('fill', `url(#${templateKey}Background)`);
        svg.appendChild(bgRect);

        const patternRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        patternRect.setAttribute('width', '750');
        patternRect.setAttribute('height', '1050');
        patternRect.setAttribute('rx', '37.5');
        patternRect.setAttribute('fill', `url(#${templateKey}Pattern)`);
        svg.appendChild(patternRect);

        // Clear and add new preview
        preview.innerHTML = '';
        preview.appendChild(svg);

        // Trigger template change event
        const event = new CustomEvent('templateChange', {
            detail: {
                templateKey: templateKey,
                template: template
            }
        });
        document.dispatchEvent(event);
    }

    getCurrentTemplate() {
        return this.currentTemplate ? {
            key: this.currentTemplate,
            template: this.templates.templates[this.currentTemplate]
        } : null;
    }
}

// Initialize when document loads
window.addEventListener('load', () => {
    window.templateManager = new TemplateManager();
});
