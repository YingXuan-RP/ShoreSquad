/**
 * ShoreSquad App - Main JavaScript File
 * Interactive beach cleanup coordination platform
 */

// ==========================================
// GLOBAL VARIABLES & CONFIGURATION
// ==========================================

const CONFIG = {
    API_ENDPOINTS: {
        weather: 'https://api.openweathermap.org/data/2.5',
        cleanups: '/api/cleanups',
        crew: '/api/crew'
    },
    WEATHER_API_KEY: 'your-weather-api-key', // Replace with actual API key
    MAP_CONFIG: {
        defaultCenter: { lat: 1.381497, lng: 103.955574 }, // Pasir Ris, Singapore
        defaultZoom: 15
    },
    ANIMATION_DURATION: 300
};

// ==========================================
// STATE MANAGEMENT
// ==========================================

const AppState = {
    user: {
        id: null,
        name: null,
        location: null
    },
    weather: {
        current: null,
        forecast: []
    },
    cleanups: [],
    crew: [],
    filters: {
        activeFilter: 'all'
    }
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Debounce function to limit API calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format date for display
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

/**
 * Format time for display
 */
function formatTime(time) {
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).format(new Date(time));
}

/**
 * Show loading spinner
 */
function showLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.add('active');
    }
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.remove('active');
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    // Create toast element if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
        background: ${type === 'success' ? '#2ECC71' : type === 'error' ? '#FF6B6B' : '#0077BE'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 4 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Navigation link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Scroll event for navbar styling
        window.addEventListener('scroll', debounce(() => this.handleScroll(), 10));

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            this.scrollToSection(href.substring(1));
            this.closeMobileMenu();
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navHeight = this.navbar.offsetHeight;
            const targetPosition = section.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// ==========================================
// WEATHER FUNCTIONALITY
// ==========================================

class WeatherService {
    constructor() {
        this.apiKey = CONFIG.WEATHER_API_KEY;
        this.baseUrl = CONFIG.API_ENDPOINTS.weather;
    }

    async getCurrentWeather(lat, lon) {
        try {
            // For demo purposes, return mock data
            return {
                location: 'Pasir Ris, Singapore',
                temperature: 32,
                condition: 'sunny',
                icon: 'fas fa-sun',
                wind: '12 km/h',
                humidity: '78%',
                uvIndex: 8
            };
        } catch (error) {
            console.error('Error fetching weather:', error);
            return null;
        }
    }

    async getForecast(lat, lon) {
        try {
            // For demo purposes, return mock data
            return [
                { day: 'Mon', icon: 'fas fa-sun', high: 75, low: 62 },
                { day: 'Tue', icon: 'fas fa-cloud-sun', high: 73, low: 60 },
                { day: 'Wed', icon: 'fas fa-cloud-rain', high: 68, low: 58 },
                { day: 'Thu', icon: 'fas fa-sun', high: 76, low: 64 },
                { day: 'Fri', icon: 'fas fa-sun', high: 78, low: 66 }
            ];
        } catch (error) {
            console.error('Error fetching forecast:', error);
            return [];
        }
    }

    updateWeatherDisplay(weather) {
        if (!weather) return;

        // Update current weather
        const locationEl = document.getElementById('current-location');
        const tempEl = document.getElementById('current-temp');
        const windEl = document.getElementById('wind-speed');
        const humidityEl = document.getElementById('humidity');
        const uvEl = document.getElementById('uv-index');

        if (locationEl) locationEl.textContent = weather.location;
        if (tempEl) tempEl.textContent = weather.temperature;
        if (windEl) windEl.textContent = weather.wind;
        if (humidityEl) humidityEl.textContent = weather.humidity;
        if (uvEl) uvEl.textContent = weather.uvIndex;
    }

    updateForecastDisplay(forecast) {
        const forecastGrid = document.getElementById('forecast-grid');
        if (!forecastGrid) return;

        forecastGrid.innerHTML = forecast.map(day => `
            <div class="forecast-item">
                <div class="forecast-day">${day.day}</div>
                <div class="forecast-icon">
                    <i class="${day.icon}"></i>
                </div>
                <div class="forecast-temps">
                    <span class="high">${day.high}°</span>
                    <span class="low">${day.low}°</span>
                </div>
            </div>
        `).join('');
    }
}

// ==========================================
// CLEANUP EVENTS FUNCTIONALITY
// ==========================================

class CleanupManager {
    constructor() {
        this.cleanups = [];
        this.filteredCleanups = [];
        this.currentFilter = 'all';
    }

    async loadCleanups() {
        try {
            // Mock data for demonstration
            this.cleanups = [
                {
                    id: 1,
                    title: 'Pasir Ris Beach Cleanup',
                    date: '2025-12-07',
                    time: '09:00',
                    duration: '3 hours',
                    location: 'Pasir Ris, Singapore',
                    participants: 23,
                    description: 'Join us for a morning beach cleanup at Pasir Ris! We\'ll provide all supplies and refreshments.',
                    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop',
                    weather: { icon: 'fas fa-sun', temp: 32 },
                    category: 'this-week'
                },
                {
                    id: 2,
                    title: 'Sentosa Beach Environmental Day',
                    date: '2025-12-14',
                    time: '08:00',
                    duration: '4 hours',
                    location: 'Sentosa, Singapore',
                    participants: 45,
                    description: 'A comprehensive cleanup and environmental awareness event at Sentosa Island.',
                    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop',
                    weather: { icon: 'fas fa-cloud-sun', temp: 30 },
                    category: 'weekend'
                },
                {
                    id: 3,
                    title: 'East Coast Park Coastal Restoration',
                    date: '2025-12-21',
                    time: '07:30',
                    duration: '5 hours',
                    location: 'East Coast Park, Singapore',
                    participants: 67,
                    description: 'Help restore the natural beauty of East Coast Park\'s coastline and marine ecosystem.',
                    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
                    weather: { icon: 'fas fa-sun', temp: 33 },
                    category: 'weekend'
                }
            ];

            this.displayCleanups();
            return this.cleanups;
        } catch (error) {
            console.error('Error loading cleanups:', error);
            showToast('Failed to load cleanup events', 'error');
            return [];
        }
    }

    filterCleanups(filter) {
        this.currentFilter = filter;
        
        if (filter === 'all') {
            this.filteredCleanups = this.cleanups;
        } else {
            this.filteredCleanups = this.cleanups.filter(cleanup => 
                cleanup.category === filter
            );
        }
        
        this.displayCleanups();
        this.updateFilterButtons(filter);
    }

    displayCleanups() {
        const grid = document.getElementById('cleanup-grid');
        if (!grid) return;

        const cleanupsToShow = this.filteredCleanups.length > 0 
            ? this.filteredCleanups 
            : this.cleanups;

        grid.innerHTML = cleanupsToShow.map(cleanup => this.createCleanupCard(cleanup)).join('');
        
        // Add event listeners to join buttons
        grid.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cleanupId = parseInt(e.target.closest('.cleanup-card').dataset.id);
                this.joinCleanup(cleanupId);
            });
        });
    }

    createCleanupCard(cleanup) {
        return `
            <div class="cleanup-card" data-id="${cleanup.id}" data-category="${cleanup.category}">
                <div class="card-image">
                    <img src="${cleanup.image}" alt="${cleanup.title}" loading="lazy">
                    <div class="weather-badge">
                        <i class="${cleanup.weather.icon}"></i>
                        <span>${cleanup.weather.temp}°F</span>
                    </div>
                </div>
                <div class="card-content">
                    <h3>${cleanup.title}</h3>
                    <div class="card-meta">
                        <div class="meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${formatDate(cleanup.date)}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${cleanup.time} (${cleanup.duration})</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${cleanup.location}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-users"></i>
                            <span>${cleanup.participants} going</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${cleanup.location}</span>
                        </div>
                    </div>
                    <p class="card-description">${cleanup.description}</p>
                    <button class="btn btn-primary">
                        <i class="fas fa-hands-helping"></i>
                        Join Cleanup
                    </button>
                </div>
            </div>
        `;
    }

    updateFilterButtons(activeFilter) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === activeFilter) {
                btn.classList.add('active');
            }
        });
    }

    async joinCleanup(cleanupId) {
        try {
            showLoading();
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update participant count
            const cleanup = this.cleanups.find(c => c.id === cleanupId);
            if (cleanup) {
                cleanup.participants += 1;
                this.displayCleanups();
                showToast(`Successfully joined "${cleanup.title}"!`, 'success');
            }
        } catch (error) {
            console.error('Error joining cleanup:', error);
            showToast('Failed to join cleanup. Please try again.', 'error');
        } finally {
            hideLoading();
        }
    }
}

// ==========================================
// CREW/COMMUNITY FUNCTIONALITY
// ==========================================

class CrewManager {
    constructor() {
        this.crewMembers = [];
        this.leaderboard = [];
    }

    async loadCrewData() {
        try {
            // Mock leaderboard data
            this.leaderboard = [
                { id: 1, name: 'Alex Rivera', points: 1250, avatar: '👨‍🌾', cleanups: 15 },
                { id: 2, name: 'Maya Chen', points: 1180, avatar: '👩‍🔬', cleanups: 12 },
                { id: 3, name: 'Jordan Smith', points: 1050, avatar: '🧑‍🎨', cleanups: 11 },
                { id: 4, name: 'Sam Taylor', points: 980, avatar: '👩‍💻', cleanups: 9 },
                { id: 5, name: 'River Davis', points: 875, avatar: '🧑‍🚀', cleanups: 8 }
            ];

            this.displayLeaderboard();
            this.updateStats();
        } catch (error) {
            console.error('Error loading crew data:', error);
        }
    }

    displayLeaderboard() {
        const leaderboardList = document.querySelector('.leaderboard-list');
        if (!leaderboardList) return;

        leaderboardList.innerHTML = this.leaderboard.map((member, index) => `
            <div class="leaderboard-item" style="
                display: flex;
                align-items: center;
                padding: 1rem;
                background: ${index < 3 ? 'linear-gradient(135deg, #FFD700, #FFA500)' : '#f8f9fa'};
                border-radius: 8px;
                margin-bottom: 0.5rem;
                transition: transform 0.3s ease;
            " onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                <div style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #0077BE;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    margin-right: 1rem;
                ">
                    ${member.avatar}
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: #333;">${member.name}</div>
                    <div style="font-size: 0.875rem; color: #666;">${member.cleanups} cleanups</div>
                </div>
                <div style="
                    font-weight: 700;
                    font-size: 1.25rem;
                    color: ${index < 3 ? '#fff' : '#0077BE'};
                ">
                    ${member.points} pts
                </div>
                <div style="
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: ${index < 3 ? '#fff' : '#0077BE'};
                    color: ${index < 3 ? '#0077BE' : '#fff'};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.875rem;
                    margin-left: 1rem;
                ">
                    ${index + 1}
                </div>
            </div>
        `).join('');
    }

    updateStats() {
        // These would typically come from an API
        const stats = {
            members: 247,
            wasteCollected: 1847,
            eventsHosted: 32
        };

        // Animate the numbers
        this.animateNumber('.stat-number', stats.members, 0);
        this.animateNumber('.stat-number', stats.wasteCollected, 1);
        this.animateNumber('.stat-number', stats.eventsHosted, 2);
    }

    animateNumber(selector, target, index) {
        const elements = document.querySelectorAll(selector);
        if (!elements[index]) return;

        const element = elements[index];
        const start = 0;
        const duration = 2000;
        const startTime = performance.now();

        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (target - start) * progress);
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }

        requestAnimationFrame(updateNumber);
    }
}

// ==========================================
// IMPACT VISUALIZATION
// ==========================================

class ImpactVisualizer {
    constructor() {
        this.chartCanvas = document.getElementById('trash-chart');
        this.chart = null;
    }

    init() {
        if (this.chartCanvas) {
            this.createTrashChart();
        }
        this.animateProgressCircles();
    }

    createTrashChart() {
        const ctx = this.chartCanvas.getContext('2d');
        const data = [
            { label: 'Plastic', value: 45, color: '#FF6B6B' },
            { label: 'Glass', value: 20, color: '#4ECDC4' },
            { label: 'Metal', value: 15, color: '#45B7D1' },
            { label: 'Paper', value: 12, color: '#96CEB4' },
            { label: 'Other', value: 8, color: '#FECA57' }
        ];

        // Simple pie chart implementation
        let total = data.reduce((sum, item) => sum + item.value, 0);
        let currentAngle = -Math.PI / 2;

        data.forEach((item, index) => {
            const sliceAngle = (item.value / total) * 2 * Math.PI;
            
            // Draw slice
            ctx.beginPath();
            ctx.moveTo(100, 100);
            ctx.arc(100, 100, 80, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = item.color;
            ctx.fill();

            // Draw label
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = 100 + Math.cos(labelAngle) * 60;
            const labelY = 100 + Math.sin(labelAngle) * 60;
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${item.value}%`, labelX, labelY);

            currentAngle += sliceAngle;
        });
    }

    animateProgressCircles() {
        const circles = document.querySelectorAll('.progress-circle');
        circles.forEach(circle => {
            const percent = parseInt(circle.dataset.percent);
            const degrees = (percent / 100) * 360;
            
            // Animate the conic gradient
            let currentDegrees = 0;
            const animation = setInterval(() => {
                currentDegrees += 2;
                circle.style.background = `conic-gradient(var(--accent-green) 0deg ${currentDegrees}deg, rgba(255, 255, 255, 0.2) ${currentDegrees}deg)`;
                
                if (currentDegrees >= degrees) {
                    clearInterval(animation);
                }
            }, 20);
        });
    }
}

// ==========================================
// MAP FUNCTIONALITY
// ==========================================

class MapService {
    constructor() {
        this.map = null;
        this.marker = null;
        this.cleanupLocation = {
            lat: 1.381497,
            lng: 103.955574,
            name: 'Pasir Ris Beach',
            description: 'Beach Cleanup Location'
        };
    }

    initMap() {
        try {
            // Initialize the map
            this.map = L.map('map-container').setView([this.cleanupLocation.lat, this.cleanupLocation.lng], 15);

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(this.map);

            // Create custom icon for the cleanup location
            const cleanupIcon = L.divIcon({
                className: 'custom-marker',
                html: '<i class="fas fa-map-marker-alt" style="color: white; font-size: 16px; margin-top: 6px;"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            // Add marker for cleanup location
            this.marker = L.marker([this.cleanupLocation.lat, this.cleanupLocation.lng], {
                icon: cleanupIcon
            }).addTo(this.map);

            // Add popup to marker
            this.marker.bindPopup(`
                <div style="text-align: center; padding: 8px;">
                    <strong style="color: #0077BE; font-size: 14px;">${this.cleanupLocation.name}</strong><br>
                    <span style="color: #666; font-size: 12px;">${this.cleanupLocation.description}</span><br>
                    <small style="color: #999; font-size: 11px;">Dec 7, 2025 • 9:00 AM</small>
                </div>
            `).openPopup();

            // Disable zoom on double click to prevent accidental zooming
            this.map.doubleClickZoom.disable();

            console.log('Map initialized successfully');
        } catch (error) {
            console.error('Error initializing map:', error);
            this.showMapFallback();
        }
    }

    showMapFallback() {
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #0077BE, #00A8CC); color: white; text-align: center; padding: 2rem;">
                    <div>
                        <i class="fas fa-map-marker-alt" style="font-size: 3rem; margin-bottom: 1rem; color: #FF6B6B;"></i>
                        <h3 style="margin: 0 0 0.5rem 0;">Pasir Ris Beach</h3>
                        <p style="margin: 0; opacity: 0.9;">Beach Cleanup Location</p>
                        <small style="opacity: 0.8;">1.381497, 103.955574</small>
                    </div>
                </div>
            `;
        }
    }
}

// ==========================================
// GEOLOCATION FUNCTIONALITY
// ==========================================

class LocationService {
    constructor() {
        this.currentPosition = null;
    }

    async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser.'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.currentPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    resolve(this.currentPosition);
                },
                (error) => {
                    console.warn('Geolocation error:', error);
                    // Fallback to default location (Pasir Ris)
                    this.currentPosition = CONFIG.MAP_CONFIG.defaultCenter;
                    resolve(this.currentPosition);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 600000 // 10 minutes
                }
            );
        });
    }
}

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupARIALabels();
    }

    setupKeyboardNavigation() {
        // Handle Enter/Space key presses on buttons
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const target = e.target;
                if (target.classList.contains('btn') || target.classList.contains('filter-btn')) {
                    e.preventDefault();
                    target.click();
                }
            }
        });
    }

    setupFocusManagement() {
        // Ensure focus is visible for keyboard users
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--primary-blue)';
                element.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }

    setupARIALabels() {
        // Add ARIA labels for better screen reader support
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label')) {
                const text = button.textContent.trim() || button.querySelector('i')?.className || 'Button';
                button.setAttribute('aria-label', text);
            }
        });
    }
}

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0
        };
    }

    init() {
        // Measure page load time
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            console.log(`Page loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
        });

        // Observe performance entries
        if ('PerformanceObserver' in window) {
            this.observeWebVitals();
        }
    }

    observeWebVitals() {
        // First Contentful Paint
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    this.metrics.firstContentfulPaint = entry.startTime;
                    console.log(`FCP: ${entry.startTime.toFixed(2)}ms`);
                }
            }
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.largestContentfulPaint = lastEntry.startTime;
            console.log(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    }
}

// ==========================================
// MAIN APPLICATION CLASS
// ==========================================

class ShoreSquadApp {
    constructor() {
        this.navigation = null;
        this.weatherService = null;
        this.cleanupManager = null;
        this.crewManager = null;
        this.impactVisualizer = null;
        this.locationService = null;
        this.mapService = null;
        this.accessibilityManager = null;
        this.performanceMonitor = null;
    }

    async init() {
        try {
            console.log('🌊 Initializing ShoreSquad App...');
            
            // Show loading
            showLoading();

            // Initialize core services
            this.navigation = new Navigation();
            this.weatherService = new WeatherService();
            this.cleanupManager = new CleanupManager();
            this.crewManager = new CrewManager();
            this.impactVisualizer = new ImpactVisualizer();
            this.locationService = new LocationService();
            this.mapService = new MapService();
            this.accessibilityManager = new AccessibilityManager();
            this.performanceMonitor = new PerformanceMonitor();

            // Initialize performance monitoring
            this.performanceMonitor.init();

            // Get user location
            await this.locationService.getCurrentLocation();

            // Load initial data
            await Promise.all([
                this.loadWeatherData(),
                this.cleanupManager.loadCleanups(),
                this.crewManager.loadCrewData()
            ]);

            // Initialize visualizations and map
            this.impactVisualizer.init();
            this.mapService.initMap();

            // Bind global event listeners
            this.bindGlobalEvents();

            // Hide loading
            hideLoading();

            console.log('✅ ShoreSquad App initialized successfully!');
            showToast('Welcome to ShoreSquad! 🌊', 'success');

        } catch (error) {
            console.error('❌ Error initializing app:', error);
            hideLoading();
            showToast('Failed to initialize app. Please refresh the page.', 'error');
        }
    }

    async loadWeatherData() {
        try {
            const position = this.locationService.currentPosition || CONFIG.MAP_CONFIG.defaultCenter;
            
            const [currentWeather, forecast] = await Promise.all([
                this.weatherService.getCurrentWeather(position.lat, position.lng),
                this.weatherService.getForecast(position.lat, position.lng)
            ]);

            if (currentWeather) {
                this.weatherService.updateWeatherDisplay(currentWeather);
                AppState.weather.current = currentWeather;
            }

            if (forecast) {
                this.weatherService.updateForecastDisplay(forecast);
                AppState.weather.forecast = forecast;
            }
        } catch (error) {
            console.error('Error loading weather data:', error);
        }
    }

    bindGlobalEvents() {
        // Filter buttons for cleanups
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.cleanupManager.filterCleanups(filter);
            });
        });

        // Hero CTA buttons
        const findCleanupBtn = document.getElementById('find-cleanup-btn');
        const createEventBtn = document.getElementById('create-event-btn');

        if (findCleanupBtn) {
            findCleanupBtn.addEventListener('click', () => {
                this.navigation.scrollToSection('cleanups');
            });
        }

        if (createEventBtn) {
            createEventBtn.addEventListener('click', () => {
                showToast('Event creation feature coming soon! 🎉', 'info');
            });
        }

        // Scroll progress indicator
        window.addEventListener('scroll', () => {
            const scrollIndicator = document.getElementById('scroll-indicator');
            if (scrollIndicator) {
                const scrollTop = window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                scrollIndicator.style.width = scrollPercent + '%';
            }
        });

        // Back to top button
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            // Show/hide based on scroll position
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.pointerEvents = 'auto';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.pointerEvents = 'none';
                }
            });

            // Scroll to top functionality
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Handle errors gracefully
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            showToast('Something went wrong. Please refresh the page.', 'error');
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            event.preventDefault();
        });
    }
}

// ==========================================
// APP INITIALIZATION
// ==========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize the main app
    const app = new ShoreSquadApp();
    await app.init();
});

// Service Worker Registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('ServiceWorker registration successful:', registration);
        } catch (error) {
            console.log('ServiceWorker registration failed:', error);
        }
    });
}

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ShoreSquadApp,
        CONFIG,
        AppState
    };
}