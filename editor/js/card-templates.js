class CardTemplateSystem {
    constructor() {
        this.templates = {
            human: {
                name: 'Human Class',
                colors: {
                    primary: '#2196F3',
                    secondary: '#1e40af',
                    text: '#e5e7eb',
                    accent: 'rgba(37,99,235,0.15)'
                },
                background: {
                    gradient: `
                        <linearGradient id="humanBackground" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#000428"/>
                            <stop offset="35%" style="stop-color:#001e43"/>
                            <stop offset="65%" style="stop-color:#002857"/>
                            <stop offset="100%" style="stop-color:#000428"/>
                        </linearGradient>
                    `,
                    pattern: `
                        <pattern id="humanPattern" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M30,0 L60,30 L30,60 L0,30 Z" fill="none" stroke="rgba(37,99,235,0.07)"/>
                            <circle cx="30" cy="30" r="1.5" fill="rgba(37,99,235,0.07)"/>
                        </pattern>
                    `
                },
                effects: {
                    glow: `
                        <filter id="premiumBlueGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0.145   0 0 0 0 0.388   0 0 0 0 0.921  0 0 0 0.6 0"/>
                        </filter>
                    `
                }
            },
            aurora: {
                name: 'Aurora Class',
                colors: {
                    primary: '#E0FFFF',
                    secondary: '#B0E0E6',
                    text: '#E0FFFF',
                    accent: 'rgba(176,224,230,0.15)'
                },
                background: {
                    gradient: `
                        <linearGradient id="auroraBackground" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#E0FFFF"/>
                            <stop offset="35%" style="stop-color:#B0E0E6"/>
                            <stop offset="65%" style="stop-color:#87CEEB"/>
                            <stop offset="100%" style="stop-color:#E0FFFF"/>
                        </linearGradient>
                    `,
                    pattern: `
                        <pattern id="icePattern" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M50,0 L100,50 L50,100 L0,50 Z" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
                            <path d="M50,20 L50,80 M20,50 L80,50 M35,35 L65,65 M35,65 L65,35" stroke="rgba(255,255,255,0.15)" stroke-width="0.5" fill="none"/>
                        </pattern>
                    `
                },
                effects: {
                    glow: `
                        <filter id="iceGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
                            <feColorMatrix type="matrix" values="0.5 0 0 0 0.5  0 0.7 0 0 0.7  0 0 1 0 1  0 0 0 1 0"/>
                        </filter>
                    `
                }
            },
            tera: {
                name: 'Tera Class',
                colors: {
                    primary: '#CD853F',
                    secondary: '#8B4513',
                    text: '#DEB887',
                    accent: 'rgba(205,133,63,0.15)'
                },
                background: {
                    gradient: `
                        <linearGradient id="teraBackground" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#3D1C02"/>
                            <stop offset="35%" style="stop-color:#4A2511"/>
                            <stop offset="65%" style="stop-color:#5C2A14"/>
                            <stop offset="100%" style="stop-color:#3D1C02"/>
                        </linearGradient>
                    `,
                    pattern: `
                        <pattern id="geoPattern" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M50,20 L80,50 L50,80 L20,50 Z" fill="none" stroke="rgba(176,196,222,0.1)" stroke-width="2"/>
                            <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="none" stroke="rgba(176,196,222,0.07)" stroke-width="1"/>
                        </pattern>
                    `
                },
                effects: {
                    glow: `
                        <filter id="crystalGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
                            <feColorMatrix type="matrix" values="0.3 0 0 0 0.2  0 0.4 0 0 0.3  0 0 0.5 0 0.4  0 0 0 1 0"/>
                        </filter>
                    `
                }
            },
            mystic: {
                name: 'Mystic Class',
                colors: {
                    primary: '#4B0082',
                    secondary: '#2E0854',
                    text: '#4B0082',
                    accent: 'rgba(75,0,130,0.25)'
                },
                background: {
                    gradient: `
                        <linearGradient id="mysticBackground" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#000000"/>
                            <stop offset="35%" style="stop-color:#0A0A0A"/>
                            <stop offset="65%" style="stop-color:#141414"/>
                            <stop offset="100%" style="stop-color:#000000"/>
                        </linearGradient>
                    `,
                    pattern: `
                        <pattern id="voidPattern" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="1" fill="rgba(75,0,130,0.3)"/>
                            <circle cx="25" cy="25" r="0.5" fill="rgba(75,0,130,0.2)"/>
                            <circle cx="75" cy="75" r="0.5" fill="rgba(75,0,130,0.2)"/>
                        </pattern>
                    `
                },
                effects: {
                    glow: `
                        <filter id="voidGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
                            <feColorMatrix type="matrix" values="0.3 0 0 0 0  0 0.1 0 0 0  0 0 0.3 0 0  0 0 0 1 0"/>
                        </filter>
                    `
                }
            },
            ignasar: {
                name: 'Ignasar Class',
                colors: {
                    primary: '#FF4500',
                    secondary: '#FF0000',
                    text: '#FF4500',
                    accent: 'rgba(255,69,0,0.15)'
                },
                background: {
                    gradient: `
                        <linearGradient id="ignasarBackground" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#330000"/>
                            <stop offset="35%" style="stop-color:#660000"/>
                            <stop offset="65%" style="stop-color:#990000"/>
                            <stop offset="100%" style="stop-color:#330000"/>
                        </linearGradient>
                    `,
                    pattern: `
                        <pattern id="plasmaPattern" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M50,0 Q75,25 50,50 T50,100" fill="none" stroke="rgba(255,69,0,0.1)" stroke-width="2"/>
                            <path d="M0,50 Q25,75 50,50 T100,50" fill="none" stroke="rgba(255,69,0,0.1)" stroke-width="2"/>
                        </pattern>
                    `
                },
                effects: {
                    glow: `
                        <filter id="fireGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
                            <feColorMatrix type="matrix" values="1 0 0 0 0.5  0 0.3 0 0 0  0 0 0.1 0 0  0 0 0 1 0"/>
                        </filter>
                    `
                }
            }
        };

        // Common card structure for all templates
        this.cardStructure = {
            width: 750,
            height: 1050,
            cornerRadius: 37.5,
            sections: {
                title: {
                    y: 85,
                    fontSize: 45,
                    fontFamily: 'Trajan Pro, serif'
                },
                art: {
                    x: 75,
                    y: 150,
                    width: 600,
                    height: 450
                },
                type: {
                    y: 655,
                    fontSize: 24,
                    fontFamily: 'Trajan Pro, serif'
                },
                textbox: {
                    x: 90,
                    y: 700,
                    width: 570,
                    height: 200,
                    cornerRadius: 20
                },
                stats: {
                    x: 600,
                    y: 960
                },
                artist: {
                    x: 50,
                    y: 1000,
                    fontSize: 12,
                    fontFamily: 'Trajan Pro, serif'
                },
                copyright: {
                    x: 520,
                    y: 1000,
                    fontSize: 12,
                    fontFamily: 'Trajan Pro, serif'
                }
            }
        };
    }

    // Get template by name
    getTemplate(name) {
        return this.templates[name.toLowerCase()];
    }

    // Get all template names
    getTemplateNames() {
        return Object.keys(this.templates);
    }

    // Create a new card with the specified template
    createCard(templateName, cardData) {
        const template = this.getTemplate(templateName);
        if (!template) return null;

        const card = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        card.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        card.setAttribute('viewBox', `0 0 ${this.cardStructure.width} ${this.cardStructure.height}`);

        // Add template-specific definitions
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
            ${template.background.gradient}
            ${template.background.pattern}
            ${template.effects.glow}
        `;
        card.appendChild(defs);

        // Add background layers
        this.addBackgroundLayers(card, template);

        // Add card sections
        this.addCardSections(card, template, cardData);

        return card;
    }

    // Helper methods for card creation
    addBackgroundLayers(card, template) {
        // Base gradient
        const baseRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        baseRect.setAttribute('width', this.cardStructure.width);
        baseRect.setAttribute('height', this.cardStructure.height);
        baseRect.setAttribute('rx', this.cardStructure.cornerRadius);
        baseRect.setAttribute('fill', `url(#${template.name.toLowerCase()}Background)`);
        card.appendChild(baseRect);

        // Pattern overlay
        const patternRect = baseRect.cloneNode();
        patternRect.setAttribute('fill', `url(#${template.name.toLowerCase()}Pattern)`);
        card.appendChild(patternRect);
    }

    addCardSections(card, template, data) {
        const structure = this.cardStructure;
        
        // Add title
        if (data.title) {
            const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            title.setAttribute('x', structure.width / 2);
            title.setAttribute('y', structure.sections.title.y);
            title.setAttribute('text-anchor', 'middle');
            title.setAttribute('font-family', structure.sections.title.fontFamily);
            title.setAttribute('font-size', structure.sections.title.fontSize);
            title.setAttribute('fill', template.colors.text);
            title.setAttribute('font-weight', 'bold');
            title.textContent = data.title;
            card.appendChild(title);
        }

        // Add other sections similarly...
    }
}

// Initialize when document loads
window.addEventListener('load', () => {
    window.cardTemplates = new CardTemplateSystem();
});
