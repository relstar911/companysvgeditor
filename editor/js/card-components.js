class TCGComponentLibrary {
    constructor() {
        this.loadTemplates();
        this.componentTypes = {
            frames: this.initializeFrames(),
            stats: this.initializeStats(),
            symbols: this.initializeSymbols(),
            decorative: this.initializeDecorative(),
            textboxes: this.initializeTextboxes()
        };
    }

    async loadTemplates() {
        this.templates = {
            human: await this.loadSVGTemplate('human compan.txt'),
            aurora: await this.loadSVGTemplate('aurora compan.txt'),
            tera: await this.loadSVGTemplate('tera compan.txt'),
            nebula: await this.loadSVGTemplate('nebula compan.txt'),
            ignasar: await this.loadSVGTemplate('ignasar Compan.txt'),
            druid: await this.loadSVGTemplate('Druid Compan.txt'),
            elven: await this.loadSVGTemplate('Elven Compan.txt'),
            mystic: await this.loadSVGTemplate('Mystic Compan.txt')
        };
    }

    async loadSVGTemplate(filename) {
        try {
            const response = await fetch(`../svg/${filename}`);
            return await response.text();
        } catch (error) {
            console.error(`Error loading template ${filename}:`, error);
            return null;
        }
    }

    // Card Frames for different card types
    initializeFrames() {
        return {
            human: {
                name: 'Human Frame',
                category: 'frames',
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
                        <filter id="premiumBlueGlow">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0.145   0 0 0 0 0.388   0 0 0 0 0.921  0 0 0 0.6 0"/>
                        </filter>
                    `
                }
            },
            aurora: {
                name: 'Aurora Frame',
                category: 'frames',
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
                }
            },
            tera: {
                name: 'Tera Frame',
                category: 'frames',
                background: {
                    gradient: `
                        <linearGradient id="teraBackground" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#2E8B57"/>
                            <stop offset="35%" style="stop-color:#3CB371"/>
                            <stop offset="65%" style="stop-color:#90EE90"/>
                            <stop offset="100%" style="stop-color:#98FB98"/>
                        </linearGradient>
                    `,
                    pattern: `
                        <pattern id="teraPattern" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M40,0 C60,20 60,60 40,80 C20,60 20,20 40,0" fill="none" stroke="rgba(46,139,87,0.1)" stroke-width="1"/>
                            <circle cx="40" cy="40" r="2" fill="rgba(46,139,87,0.1)"/>
                        </pattern>
                    `
                }
            },
            // Add more frame types here
        };
    }

    // Initialize other component types
    initializeStats() {
        return {
            standard: {
                name: 'Standard Stats',
                category: 'stats',
                template: `
                    <g class="card-stats">
                        <rect x="50" y="850" width="650" height="100" rx="10" fill="rgba(0,0,0,0.5)"/>
                        <text x="75" y="910" fill="white" font-family="Arial" font-size="24">ATK: {attack} | DEF: {defense} | SPD: {speed}</text>
                    </g>
                `
            }
        };
    }

    initializeSymbols() {
        return {
            elementalIcons: {
                name: 'Elemental Icons',
                category: 'symbols',
                template: `
                    <g class="elemental-icon" transform="translate({x}, {y})">
                        <circle r="20" fill="url(#{elementColor})"/>
                        <path d="{elementPath}" fill="white"/>
                    </g>
                `
            }
        };
    }

    initializeDecorative() {
        return {
            cornerOrnaments: {
                name: 'Corner Ornaments',
                category: 'decorative',
                template: `
                    <g class="corner-ornament" transform="translate({x}, {y}) rotate({rotation})">
                        <path d="M0,0 C10,-10 30,-10 40,0 C30,10 10,10 0,0 Z" fill="{color}" opacity="0.5"/>
                    </g>
                `
            }
        };
    }

    initializeTextboxes() {
        return {
            description: {
                name: 'Description Box',
                category: 'textboxes',
                template: `
                    <g class="description-box">
                        <rect x="75" y="700" width="600" height="120" rx="10" fill="rgba(0,0,0,0.5)"/>
                        <foreignObject x="85" y="710" width="580" height="100">
                            <div xmlns="http://www.w3.org/1999/xhtml" style="color: white; font-family: Arial; font-size: 16px;">
                                {description}
                            </div>
                        </foreignObject>
                    </g>
                `
            }
        };
    }

    getComponent(category, name) {
        return this.componentTypes[category]?.[name];
    }

    getAllComponents() {
        return this.componentTypes;
    }

    getTemplate(templateName) {
        return this.templates[templateName];
    }

    async createCard(templateName, data) {
        const template = await this.getTemplate(templateName);
        if (!template) return null;

        // Replace placeholders in template with actual data
        let cardSVG = template.replace(/{(\w+)}/g, (match, key) => data[key] || match);

        return cardSVG;
    }
}

// Initialize when document loads
window.addEventListener('load', () => {
    window.tcgComponents = new TCGComponentLibrary();
});
