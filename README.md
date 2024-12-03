# TCG Card Creator Tools

A professional suite of tools for creating and editing Trading Card Game (TCG) cards, featuring a modern dark theme interface and comprehensive editing capabilities.

## Quick Start

1. Start the local server:
```bash
python -m http.server 8000
```

2. Access the tools:
- Viewer: `http://localhost:8000/viewer.html`
- Editor: `http://localhost:8000/editor/index.html`

## SVG Card Viewer

The viewer (`viewer.html`) is a simple tool for previewing SVG card templates in real-time.

### Features
- Live preview of SVG files
- Automatic refresh every 2 seconds
- Zoom controls
- File selector dropdown
- Mobile-responsive design

## Card Editor

A powerful, feature-rich editor for creating and customizing TCG cards with a modern dark theme interface.

### Directory Structure
```
editor/
├── index.html           # Main editor interface
├── css/
│   ├── style.css       # Core editor styles
│   └── template-manager.css  # Template management styles
├── js/
│   ├── editor.js       # Core editor functionality
│   ├── card-templates.js    # Template system
│   ├── card-components.js   # Component library
│   └── template-manager.js  # Template management
├── templates/          # Card template SVGs
├── components/         # Reusable card components
└── assets/            # Images and resources
```

### Features

#### 1. Modern Interface
- Dark theme design for reduced eye strain
- Responsive layout that adapts to different screen sizes
- Consistent visual styling with CSS variables
- Smooth transitions and animations
- Custom scrollbar styling

#### 2. Template System
- Multiple card template categories
  - Human
  - Aurora
  - Tera
  - Nebula
  - Ignasar
  - Druid
  - Elven
  - Mystic
- Template preview and selection
- Category filtering
- Search functionality

#### 3. Component Library
- Organized component categories:
  - Card Frames
  - Text Elements
  - Decorative Elements
  - Icons
  - Stats
  - Symbols
- Drag-and-drop functionality
- Preview thumbnails
- Component search

#### 4. Editor Tools
- Select Tool (V)
- Move Tool (M)
- Text Tool (T)
- Zoom Controls (+/-/0)
- Undo/Redo (Ctrl+Z/Ctrl+Y)

#### 5. Properties Panel
- Dynamic property controls
- Real-time updates
- Color picker
- Size and position controls
- Text formatting options

### Keyboard Shortcuts
```
V       - Select Tool
M       - Move Tool
T       - Text Tool
+       - Zoom In
-       - Zoom Out
0       - Reset Zoom
Ctrl+Z  - Undo
Ctrl+Y  - Redo
Del     - Delete Selected
```

### Using the Editor

1. **Template Selection**
   - Choose a template category
   - Preview available templates
   - Select a template to start editing

2. **Adding Components**
   - Browse component categories
   - Drag components onto the canvas
   - Use the Text tool for adding text
   - Double-click text to edit

3. **Editing Elements**
   - Use Select tool (V) to choose elements
   - Use Move tool (M) to reposition
   - Adjust properties in the right panel
   - Use keyboard shortcuts for efficiency

4. **Saving and Exporting**
   - Save work in progress
   - Export as SVG or PNG
   - Share designs with others

## Customization

### Theme Customization
The editor uses CSS variables for easy theme customization. Main variables include:

```css
--primary-color: #2a6bb8;
--bg-primary: #1e1e1e;
--bg-secondary: #2d2d2d;
--text-primary: #ffffff;
--border-radius: 4px;
```

Modify these variables in `style.css` to customize the appearance.

### Adding New Templates
1. Add SVG template to `templates/` directory
2. Register template in `card-templates.js`
3. Add preview image if needed
4. Update template categories if required

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
