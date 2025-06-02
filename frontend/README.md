# Harsh Jaiswal Portfolio Website

A modern, responsive portfolio website built with React, showcasing projects, skills, and professional experience.

## Features

- Modern and responsive design
- Interactive UI with smooth animations using Framer Motion
- Project showcase with detailed modal views and image galleries
- Advanced filtering by technology tags and search functionality
- Skills and experience sections
- Contact form
- Dark mode theme

## Project Structure

The website is organized into modular components:

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Resume.jsx
│   │   ├── Contact.jsx
│   │   └── ...
│   └── ui/
│       └── ...
├── data/
│   ├── projects.js
│   └── ...
├── hooks/
│   ├── useScrollReveal.js
│   └── ...
├── styles/
│   ├── index.css
│   └── ...
└── ...
```

## Adding New Projects

The Projects section is designed to be easily expandable. To add a new project:

1. Open the `src/data/projects.js` file
2. Add a new project object to the array with the following structure:

```javascript
{
  id: 9,  // Increment from the last ID
  title: "Your Project Title",
  description: "Short description of your project (shown on the card)",
  
  // Optional longer description for the modal
  longDescription: "A more detailed explanation of your project...", 
  
  // Project thumbnail image
  image: "URL or path to your project image",
  
  // Optional additional images for the gallery (will be shown in the modal)
  gallery: [
    "URL or path to additional image 1",
    "URL or path to additional image 2",
    "URL or path to additional image 3"
  ],
  
  // Technology tags (also used for filtering)
  tags: ["Python", "Machine Learning", "Other Technologies"],
  
  // Set to true if you want it to appear in the Featured filter
  featured: true,
  
  // Links to live demo and code repository
  demoLink: "https://your-demo-url.com",
  codeLink: "https://github.com/yourusername/your-project",
  
  // Optional list of key features (bullet points in modal)
  features: [
    "Feature one description",
    "Feature two description",
    "Feature three description"
  ],
  
  // Optional additional resources/links
  additionalLinks: [
    {
      title: "Documentation",
      url: "https://your-docs-url.com"
    },
    {
      title: "Another Resource",
      url: "https://another-resource-url.com"
    }
  ]
}
```

3. Save the file and the new project will automatically appear in the Projects section

## Enhanced User Experience Features

The Projects section includes several UX improvements:

1. **Image Gallery** - Projects can display multiple images in a slideshow format
2. **Tag Filtering** - Users can filter projects by technology tags
3. **Search Functionality** - Users can search for projects by keywords
4. **Responsive Design** - Optimized for all screen sizes
5. **Keyboard Navigation** - Modal can be closed with ESC key
6. **Smooth Animations** - Polished transitions and hover effects
7. **Accessibility** - Improved focus management and ARIA attributes

## Customizing Project Display

The Projects section uses modular components that can be easily customized:

- `ProjectCard`: Controls the appearance of project cards in the grid
- `ProjectModal`: Controls the detailed view when a project is clicked
- `ImageGallery`: Handles the image slideshow in the modal
- `FilterTag`: Manages the tag filtering system

You can modify these components in `src/components/sections/Projects.jsx` to change the appearance or add new features.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) to view the site

## Build and Deploy

1. Build the project:
   ```
   npm run build
   ```
2. The build artifacts will be in the `dist/` directory
3. Deploy to your preferred hosting service

## Technologies Used

- React
- Framer Motion
- Tailwind CSS
- Vite
- React Icons
