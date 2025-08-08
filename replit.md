# FULL HOUSE Night Club Website

## Overview

FULL HOUSE is a modern, single-page website for a night club located in Rostov-on-Don, Russia. The project is a static HTML/CSS/JavaScript website featuring a dark nightlife aesthetic with neon accents, smooth animations, and full responsive design. The site includes sections for the club's main landing area, about information, events calendar, and contact details with booking functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static Single-Page Application**: Built with vanilla HTML5, CSS3, and JavaScript (ES6+)
- **Responsive Design**: Mobile-first approach using CSS Flexbox and Grid layouts
- **Component-Based CSS**: Modular stylesheet organization with CSS custom properties for theming
- **Semantic HTML Structure**: Proper use of semantic HTML5 elements for accessibility and SEO

### Design System
- **Color Scheme**: Dark theme with purple/violet primary colors (#8b5cf6, #a855f7) and neon green accents (#06ffa5)
- **Typography**: Primary font "Orbitron" for headings (futuristic feel), "Poppins" for body text
- **Animation Strategy**: AOS.js library for scroll-triggered animations with smooth easing
- **Layout Pattern**: Sticky navigation with smooth scrolling between sections

### JavaScript Architecture
- **Modular JavaScript**: ES6+ classes for organizing functionality (Navigation class pattern)
- **Event-Driven**: Event listeners for scroll effects, mobile menu, form handling
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with interactive features
- **Performance Optimized**: Lazy loading and efficient event handling

### File Structure
```
/
├── index.html              # Main HTML file
├── styles/main.css         # Complete stylesheet with CSS custom properties
├── scripts/main.js         # JavaScript functionality
└── README.md              # Project documentation
```

### Responsive Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

### Browser Compatibility
- Modern browsers supporting ES6+, CSS Grid, and Flexbox
- Graceful degradation for older browsers

## External Dependencies

### CDN Libraries
- **AOS.js (v2.3.1)**: Animate On Scroll library for smooth reveal animations
- **FontAwesome (v6.4.0)**: Icon library for social media and UI icons
- **Google Fonts**: Orbitron and Poppins font families

### Third-Party Integrations
- **Telegram**: Direct messaging link to @Full_House_161
- **Yandex Maps**: Embedded map link for club location
- **Phone System**: Click-to-call functionality for +7 996 836-54-27

### Deployment Platform
- **GitHub Pages**: Static site hosting with automatic deployment from main branch
- **Domain**: Configured for custom domain support if needed

### Business Information
- **Operating Hours**: Friday/Saturday 22:00–08:00
- **Location**: Rostov-on-Don, Russia
- **Services**: Music, Dancing, Cocktails, Table Booking