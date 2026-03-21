# Monster Energy Experience

**Live Demo: [monster.dinomae.in](https://monster.dinomae.in/)**

This is a passion project built to experiment with immersive web experiences. It's a high-energy, single-page site for Monster Energy that leans heavily into glassmorphism, GSAP animations, and interactive mini-games. The goal was to create a site that feels as "monstrous" as the brand itself—fast, dark, and visually intense.

---

## The Vibe

The site is designed to feel "alive" using GSAP ScrollTrigger to handle the scroll flow. As you scroll, the product stays central, morphing and reacting to your position. Everything on the site—from custom cursor tracking to glowing liquid-crystal buttons—is meant to keep the user engaged.

### Features:

- **Dynamic Flavour Swapping:** Switch between Original, Blue, Purple, and Red. The whole site's theme (glows, accents, text shadows) shifts instantly to match the can.
- **Can Catcher Mini-Game:** An arcade game built on HTML5 Canvas. Catch logos, manage lives, and beat your high score.
- **News & Events:** Custom-built glassmorphic modals with smooth transitions and a "More News" side panel to keep the main page clean.
- **Magnetic Navigation:** A sticky navbar that tracks your position on the page and enables smooth anchor scrolling.
- **Responsive Design:** Fully responsive layout that adapts to all screen sizes.

---

## Design Philosophy

This project keeps the fundamentals simple but powerful: HTML, CSS, and Vanilla JavaScript without heavy frameworks or complex build steps. Resource elements for some components were designed and optimized using Blender, providing high-quality 3D elements that enhance the visual experience.

### Technology Stack:

- **HTML5:** Semantic structure for the web experience
- **CSS:** Organized into modular sections for easy maintenance and scalability
- **JavaScript:** Vanilla JS modules for clean, readable, and maintainable logic
- **GSAP:** Animation library providing scroll-spy effects and dynamic transitions
- **Blender:** Used for designing and optimizing resource elements and visual components

---

## Complete Project Structure

```
Monster/
├── index.html                      # Main entry point
├── README.md                       # Project documentation
│
├── assets/
│   └── images/                     # All high-resolution assets, cans, and backgrounds
│
├── css/                            # Stylesheet organization
│   ├── main.css                    # Primary stylesheet (imports all modules)
│   ├── base.css                    # Base styles and resets
│   ├── variables.css               # CSS variables and theme definitions
│   ├── typography-nav.css          # Typography and navigation styles
│   ├── components.css              # Component styles reference
│   ├── sections.css                # Section styles reference
│   ├── responsive.css              # Media queries for responsive design
│   │
│   ├── components/
│   │   ├── cart.css                # Shopping cart styling
│   │   ├── modals.css              # Modal dialog styling
│   │   └── toast.css               # Toast notification styling
│   │
│   └── sections/
│       ├── hero.css                # Hero section styling
│       ├── flavours.css            # Flavour selector styling
│       ├── flavours-base.css       # Base flavour styles
│       ├── game.css                # Mini-game section styling
│       ├── news.css                # News section styling
│       ├── more-news.css           # Additional news panel styling
│       ├── events.css              # Events section styling
│       ├── footer.css              # Footer styling
│       └── other-*.css             # Additional section styles
│
└── js/
    └── modules/
        ├── core.js                 # Core functionality and initialization
        ├── cart.js                 # Shopping cart logic
        ├── game.js                 # Can Catcher game implementation
        ├── flavours-modal.js       # Flavour selection modal handling
        └── news-events.js          # News and events section logic
```

---

## Key Implementation Details

### CSS Architecture

The stylesheet is organized hierarchically:

- **Variables:** Centralized theme colors, sizes, and animations
- **Base:** Reset styles and foundational elements
- **Typography & Navigation:** Font definitions and navbar styling
- **Components:** Reusable UI elements (modals, cart, notifications)
- **Sections:** Page section-specific styles
- **Responsive:** Mobile-first approach with media queries

### JavaScript Modules

Each module handles a specific feature:

- **core.js:** Initialization, event delegation, and global utilities
- **cart.js:** Shopping cart management and interactions
- **game.js:** Can Catcher game logic and canvas rendering
- **flavours-modal.js:** Dynamic flavour switching and theme updates
- **news-events.js:** News feed and events panel management

### Design Resources

Resource elements were designed using Blender for optimal visual quality. These include product renders, 3D backgrounds, and interactive components that enhance the overall immersive experience.

---

## How to Use

1. Extract or clone the project files
2. Open `index.html` in a modern web browser
3. Explore the site's interactive features by scrolling and clicking
4. Try the Can Catcher game in the designated section
5. Switch between flavours to see the dynamic theme changes

---

Unleash the Beast.
