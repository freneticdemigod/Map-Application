# React Map Application

A React application that features a user information form and an interactive map with polygon drawing capabilities using OpenLayers.

## Features

- Two-page application with routing
- User information collection form with validation
- Interactive map powered by OpenLayers
- Polygon drawing, editing, and deletion capabilities
- Responsive design

## Demo

![Form Page]ottermap-react-application/Screenshot (469).png
![Map Page]ottermap-react-application/Screenshot (470).png

## Installation

To get started with this application, follow these steps:

```bash
# Clone the repository
git clone https://github.com/yourusername/react-map-application.git

# Navigate to the project directory
cd react-map-application

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Usage

### Form Page

1. The application starts with a form page at the root URL (`/`).
2. Enter your first name and a 10-digit mobile number.
3. The form validates that:
   - First name is not empty
   - Mobile number is exactly 10 digits
4. Click the "Continue to Map" button to proceed to the map page.

### Map Page

1. After submitting the form, you'll be redirected to the map page (`/map`).
2. Your name will appear in the header at the center of the page.
3. The main section displays an interactive map powered by OpenLayers.
4. Use the toolbar above the map for the following operations:
   - **Draw Polygon**: Click this button to start drawing a polygon. Click on the map to add vertices, and double-click to complete the polygon.
   - **Delete Selected**: First click on a polygon to select it (it will highlight in red), then click this button to delete it.
   - **Clear All**: Click this button to remove all polygons from the map.
5. You can also edit existing polygons by clicking and dragging the vertices.

## Project Structure

```
src/
├── App.js                # Main app with routing
├── index.js              # Entry point
├── components/
│   ├── Header.js         # Header component 
│   ├── SearchForm.js     # Form component for the first route
│   └── MapPage.js        # Map component with OpenLayers
├── context/
│   └── UserContext.js    # Context for user data
└── styles/
    ├── Header.css        # Styling for header
    ├── SearchForm.css    # Styling for search form
    ├── MapPage.css       # Styling for map page
    └── index.css         # Global styles
```

## Technologies Used

- React
- React Router
- OpenLayers
- Context API for state management
- CSS for styling

## Browser Compatibility

This application has been tested and works on:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Safari (latest)

## License

[MIT](LICENSE)