# 🌊 ShoreSquad

**Rally your crew, track weather, and hit the next beach cleanup with our dope map app!**

[![Live Demo](https://img.shields.io/badge/Demo-Live-00A8CC?style=for-the-badge&logo=safari)](http://localhost:5500)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🎯 Project Vision

ShoreSquad creates value by mobilizing young people to clean beaches, using weather and maps for easy planning and social features to make eco-action fun and connected.

## ✨ Features

### 🗺️ Interactive Experience
- **Real-time Weather Integration** - Check conditions before you head out
- **Interactive Map Interface** - Find cleanups near you
- **Mobile-First Design** - Perfect for on-the-go coordination

### 👥 Community Focused  
- **Squad Management** - Rally your crew and track participation
- **Leaderboards** - Gamified experience with points and achievements
- **Social Features** - Connect with like-minded eco-warriors

### 📊 Impact Tracking
- **Waste Collection Metrics** - Visualize your environmental impact
- **Progress Tracking** - See how much your community has accomplished
- **Cleanup Analytics** - Data-driven insights for better planning

## 🎨 Design System

### Color Palette
- **Primary Ocean Blue**: `#0077BE` & `#00A8CC`
- **Secondary Coral**: `#FF6B6B`  
- **Accent Green**: `#2ECC71`
- **Sandy Beige**: `#F4E4BC`
- **Clean Neutrals**: Whites and light grays

### Typography
- **Headings**: Poppins (Modern, friendly)
- **Body**: Open Sans (Readable, accessible)

### Accessibility Features
- High contrast color ratios (WCAG AA compliant)
- Keyboard navigation support
- Screen reader optimized
- Reduced motion options
- Focus management

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension (recommended)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shoresquad.git
   cd shoresquad
   ```

2. **Open with Live Server**
   - Open the project in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Navigate to `http://localhost:5500`

3. **Start exploring!**
   - Browse upcoming cleanups
   - Check weather conditions
   - Join the community

## 📁 Project Structure

```
ShoreSquad/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet with design system
├── js/
│   └── app.js              # JavaScript functionality & interactivity
├── .vscode/
│   └── settings.json       # VS Code configuration & Live Server setup
├── .gitignore              # Git ignore patterns
└── README.md               # Project documentation
```

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic, accessible markup
- **CSS3** - Modern styling with custom properties, Grid, Flexbox
- **Vanilla JavaScript** - ES6+, no framework dependencies
- **Progressive Enhancement** - Works without JavaScript

### Development Tools
- **VS Code** - Recommended editor with Live Server
- **Git** - Version control
- **Live Server** - Development server with hot reload

### APIs & Services (Future Integration)
- **OpenWeatherMap API** - Real-time weather data
- **Google Maps API** - Interactive mapping
- **Geolocation API** - User location services

## 🎯 JavaScript Features & Architecture

### Core Modules
- **Navigation System** - Smooth scrolling, mobile menu
- **Weather Service** - API integration, forecast display
- **Cleanup Manager** - Event filtering, RSVP functionality
- **Crew Management** - Leaderboards, community stats
- **Impact Visualizer** - Charts and progress tracking

### Performance Features
- **Debounced API calls** - Optimized network requests
- **Lazy loading** - Images load only when needed
- **Intersection Observer** - Efficient scroll animations
- **Service Worker ready** - PWA capabilities

### UX Enhancements
- **Smooth animations** - CSS transitions and JavaScript
- **Loading states** - User feedback during operations
- **Error handling** - Graceful failure with user notifications
- **Responsive design** - Mobile-first approach

## 🌟 UX Design Principles

### Usability
- **Progressive Disclosure** - Show relevant info when needed
- **Familiar Patterns** - Standard UI conventions
- **Quick Actions** - Primary tasks are prominent
- **Visual Hierarchy** - Clear content organization

### Accessibility
- **WCAG 2.1 AA Compliance** - Accessible to all users
- **Keyboard Navigation** - Full functionality without mouse
- **Screen Reader Support** - Semantic HTML and ARIA labels
- **Color Independence** - Information not conveyed by color alone

### Mobile Experience
- **Touch Targets** - 44px minimum tap areas
- **Thumb-Friendly** - Important actions within reach
- **Fast Loading** - Optimized for mobile networks
- **Offline Capability** - Core features work offline

## 🔧 Development

### Code Style
- **2-space indentation**
- **Semantic HTML** - Meaningful element choices
- **CSS Custom Properties** - Consistent design tokens
- **ES6+ JavaScript** - Modern language features

### File Organization
- **Modular CSS** - Organized by component/section
- **Class-based JavaScript** - Object-oriented architecture
- **Semantic naming** - Clear, descriptive identifiers

### Performance Best Practices
- **Critical CSS inline** - Above-the-fold optimization
- **Lazy loading** - Deferred non-critical resources
- **Optimized images** - WebP format, appropriate sizing
- **Minimal JavaScript** - Only what's necessary

## 🚀 Deployment

### Local Development
```bash
# Using Live Server (Recommended)
# Right-click index.html → "Open with Live Server"

# Or using Python
python -m http.server 8000

# Or using Node.js
npx serve .
```

### Production Deployment
- **Netlify** - Drag and drop deployment
- **Vercel** - GitHub integration
- **GitHub Pages** - Free static hosting
- **Firebase Hosting** - Google's platform

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following our code style
4. **Test thoroughly** across different devices
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and patterns
- Ensure accessibility standards are maintained
- Test on mobile devices
- Update documentation as needed
- Keep commits focused and descriptive

## 🎮 Future Features

### Version 2.0 Roadmap
- [ ] **User Authentication** - Personal profiles and history
- [ ] **Real API Integration** - Live weather and map data
- [ ] **Push Notifications** - Event reminders and updates
- [ ] **Offline Mode** - Full PWA functionality
- [ ] **Photo Sharing** - Before/after cleanup photos
- [ ] **Gamification** - Badges, challenges, and rewards
- [ ] **Event Creation** - User-generated cleanup events
- [ ] **Social Integration** - Share achievements on social media

### Technical Improvements
- [ ] **TypeScript** - Enhanced developer experience
- [ ] **Build System** - Webpack/Vite for optimization
- [ ] **Testing Suite** - Unit and integration tests
- [ ] **CI/CD Pipeline** - Automated testing and deployment
- [ ] **Analytics** - User behavior insights
- [ ] **Performance Monitoring** - Real-time performance tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration** - Modern eco-friendly design trends
- **Color Palette** - Ocean and beach-inspired themes  
- **Icons** - Font Awesome for consistent iconography
- **Fonts** - Google Fonts (Poppins, Open Sans)
- **Images** - Unsplash for high-quality beach photography

## 📞 Contact & Support

- **Project Maintainer**: [Your Name](mailto:your.email@example.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/shoresquad/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/shoresquad/discussions)

---

<div align="center">

**Built with 💚 for our oceans**

[Demo](http://localhost:5500) • [Documentation](https://github.com/yourusername/shoresquad/wiki) • [Report Bug](https://github.com/yourusername/shoresquad/issues) • [Request Feature](https://github.com/yourusername/shoresquad/issues)

Made with ❤️ by the ShoreSquad team

</div>