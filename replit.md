# Overview

This is a Next.js web application called "Shizuru" - a modern anime streaming platform with a dark theme design. The application includes authentication, scheduling functionality, and a "watch together" feature for collaborative viewing. Built with modern React architecture using Next.js App Router (v14), the system includes user authentication, multiple feature modules, and is optimized for AMOLED displays with a purple accent color (#b26df5).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js with App Router architecture for modern React development
- **Styling**: Tailwind CSS for utility-first styling with custom CSS modules for component-specific styles
- **Theme**: Dark theme implementation as the default user interface
- **Routing**: File-based routing with dedicated pages for authentication (`/auth/login`), scheduling (`/schedule`), and watch together functionality (`/watch2gether`)
- **Component Structure**: Modular component architecture with separate CSS modules (Toast, Auth components)

## Build System
- **Bundling**: Webpack-based build system with code splitting and chunk optimization
- **Static Assets**: Optimized static file serving with hashed filenames for cache busting
- **Font Loading**: Custom Geist font implementation with font-display swap for performance
- **CSS Processing**: Compiled CSS with PostCSS and Tailwind processing

## Performance Optimizations
- **Code Splitting**: Automatic chunk splitting for different application sections
- **Polyfills**: Separate polyfill bundles for browser compatibility
- **Static Generation**: Pre-built HTML pages for improved initial load times
- **Asset Optimization**: Minified JavaScript and CSS bundles

## Authentication System
- **Login Flow**: Dedicated authentication pages with form-based login
- **UI Components**: Custom styled authentication forms with dark theme integration
- **Route Protection**: Likely implemented authentication guards for protected routes

# External Dependencies

## Core Framework Dependencies
- **Next.js**: React-based web framework for server-side rendering and static generation
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling

## Font Resources
- **Geist Font**: Custom web font family loaded via font-face declarations

## Browser Compatibility
- **Polyfills**: JavaScript polyfills for cross-browser compatibility
- **Modern Browser Features**: Utilizes modern CSS and JavaScript features with fallbacks

## Potential Integration Points
- **Media Services**: Based on "watch together" functionality, likely integrates with video streaming services
- **Real-time Communication**: Scheduling and collaborative features suggest WebSocket or similar real-time capabilities
- **Authentication Provider**: Login system indicates integration with authentication services or custom backend API