/**
 * FULL HOUSE Night Club Website
 * Main JavaScript file for interactive functionality
 */

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const scrollToTopBtn = document.getElementById('scrollToTop');
const bookingForm = document.getElementById('bookingForm');

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });
}

/**
 * Navigation functionality
 */
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleActiveLinks();
        this.handleSmoothScrolling();
    }

    // Handle navbar scroll effect
    handleScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Handle mobile hamburger menu
    handleMobileMenu() {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Handle active navigation links
    handleActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-10% 0px -70% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to current link
                    const currentLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    if (currentLink) {
                        currentLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // Handle smooth scrolling for anchor links
    handleSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip empty hrefs or just "#"
                if (href === '#' || !href) return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

/**
 * Scroll to top functionality
 */
class ScrollToTop {
    constructor() {
        this.init();
    }

    init() {
        this.handleVisibility();
        this.handleClick();
    }

    handleVisibility() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
    }

    handleClick() {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Form handling
 */
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        this.handleBookingForm();
        this.setupFormValidation();
    }

    handleBookingForm() {
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processBookingForm();
            });
        }
    }

    processBookingForm() {
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);

        // Validate required fields
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showSuccessMessage();
            this.resetForm();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    validateForm(data) {
        const errors = [];

        if (!data.name || data.name.trim().length < 2) {
            errors.push('Введите корректное имя (минимум 2 символа)');
        }

        if (!data.phone || !this.validatePhone(data.phone)) {
            errors.push('Введите корректный номер телефона');
        }

        if (!data.guests || data.guests < 1 || data.guests > 20) {
            errors.push('Количество гостей должно быть от 1 до 20');
        }

        if (!data.date || new Date(data.date) < new Date()) {
            errors.push('Выберите корректную дату (не раньше сегодняшнего дня)');
        }

        if (errors.length > 0) {
            this.showErrors(errors);
            return false;
        }

        return true;
    }

    validatePhone(phone) {
        const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489]\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    showErrors(errors) {
        const errorHtml = `
            <div class="form-errors">
                <h4>Пожалуйста, исправьте ошибки:</h4>
                <ul>
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;
        
        this.showNotification(errorHtml, 'error');
    }

    showSuccessMessage() {
        const successHtml = `
            <div class="form-success">
                <h4>Заявка отправлена!</h4>
                <p>Мы свяжемся с вами в ближайшее время для подтверждения бронирования.</p>
            </div>
        `;
        
        this.showNotification(successHtml, 'success');
    }

    showNotification(html, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = html;

        // Add styles dynamically
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            padding: 20px;
            border-radius: 10px;
            color: white;
            font-family: var(--font-secondary);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideInRight 0.5s ease;
            background: ${type === 'success' ? 'linear-gradient(135deg, #06ffa5, #00d4aa)' : 'linear-gradient(135deg, #ff4757, #ff3838)'};
        `;

        // Add animation keyframes if not already present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(100%); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .notification h4 { margin: 0 0 10px 0; font-size: 1.2em; }
                .notification p { margin: 0; line-height: 1.4; }
                .notification ul { margin: 5px 0 0 20px; }
                .notification li { margin: 5px 0; }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Allow manual close
        notification.addEventListener('click', () => {
            notification.remove();
        });
    }

    resetForm() {
        bookingForm.reset();
        
        // Remove any validation classes
        const inputs = bookingForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
        });
    }

    setupFormValidation() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Real-time validation on blur
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            // Clear validation on focus
            input.addEventListener('focus', () => {
                input.classList.remove('error', 'success');
            });
        });

        // Set minimum date for date input
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        // Format phone input
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.startsWith('8')) {
                    value = '7' + value.substring(1);
                }
                
                if (value.startsWith('7') && value.length <= 11) {
                    value = value.replace(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4');
                }
                
                e.target.value = value;
            });
        }
    }

    validateField(input) {
        const value = input.value.trim();
        let isValid = true;

        switch (input.type) {
            case 'text':
                isValid = value.length >= 2;
                break;
            case 'tel':
                isValid = this.validatePhone(value);
                break;
            case 'number':
                const num = parseInt(value);
                isValid = num >= 1 && num <= 20;
                break;
            case 'date':
                isValid = new Date(value) >= new Date();
                break;
        }

        if (isValid) {
            input.classList.remove('error');
            input.classList.add('success');
        } else {
            input.classList.remove('success');
            input.classList.add('error');
        }
    }
}

/**
 * Hero section animations and effects
 */
class HeroEffects {
    constructor() {
        this.init();
    }

    init() {
        this.createParticleAnimation();
        this.handleScrollIndicator();
    }

    createParticleAnimation() {
        const particles = document.querySelector('.hero-particles');
        if (!particles) return;

        // Add floating particles effect
        let particleCount = 0;
        const maxParticles = 20;

        const createParticle = () => {
            if (particleCount >= maxParticles) return;

            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            // Random position and properties
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(6, 255, 165, 0.8);
                border-radius: 50%;
                left: ${left}%;
                top: 100%;
                animation: floatUp ${duration}s linear infinite;
                pointer-events: none;
            `;

            particles.appendChild(particle);
            particleCount++;

            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                    particleCount--;
                }
            }, duration * 1000);
        };

        // Add CSS animation for floating particles
        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Create particles periodically
        setInterval(createParticle, 1000);
    }

    handleScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        window.addEventListener('scroll', () => {
            const opacity = Math.max(0, 1 - window.scrollY / 300);
            scrollIndicator.style.opacity = opacity;
        });
    }
}

/**
 * Performance optimizations
 */
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeScrollEvents();
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    optimizeScrollEvents() {
        let ticking = false;

        const updateScrollEffects = () => {
            // Batch scroll-related updates here
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const fontPreloads = [
            'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap'
        ];

        fontPreloads.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = 'style';
            link.onload = function() { this.onload = null; this.rel = 'stylesheet'; };
            document.head.appendChild(link);
        });
    }
}

/**
 * Utility functions
 */
class Utils {
    static throttle(func, wait) {
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

    static debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    static isMobile() {
        return window.innerWidth <= 768;
    }

    static isReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
}

/**
 * Event Analytics (Optional)
 */
class Analytics {
    constructor() {
        this.events = [];
    }

    track(event, data = {}) {
        const eventData = {
            event,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...data
        };

        this.events.push(eventData);
        console.log('Analytics Event:', eventData);

        // Here you would send to your analytics service
        // this.sendToAnalytics(eventData);
    }

    trackNavigation(section) {
        this.track('navigation', { section });
    }

    trackFormSubmission(formType) {
        this.track('form_submission', { formType });
    }

    trackPhoneCall() {
        this.track('phone_call', { phone: '+79968365427' });
    }

    trackExternalLink(url) {
        this.track('external_link', { url });
    }
}

/**
 * Application initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏠 FULL HOUSE Website Loading...');

    try {
        // Initialize core functionality
        const navigation = new Navigation();
        const scrollToTop = new ScrollToTop();
        const formHandler = new FormHandler();
        const heroEffects = new HeroEffects();
        const performanceOptimizer = new PerformanceOptimizer();
        const analytics = new Analytics();

        // Track page load
        analytics.track('page_load');

        // Add click tracking for important elements
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button');
            if (!target) return;

            // Track phone calls
            if (target.href && target.href.includes('tel:')) {
                analytics.trackPhoneCall();
            }

            // Track external links
            if (target.href && (target.href.includes('t.me') || target.href.includes('yandex.ru'))) {
                analytics.trackExternalLink(target.href);
            }

            // Track navigation
            if (target.classList.contains('nav-link')) {
                analytics.trackNavigation(target.textContent.trim());
            }
        });

        // Enhanced form submission tracking
        if (bookingForm) {
            bookingForm.addEventListener('submit', () => {
                analytics.trackFormSubmission('booking');
            });
        }

        console.log('✅ FULL HOUSE Website Loaded Successfully!');

        // Add a subtle loading complete indicator
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);

    } catch (error) {
        console.error('❌ Error initializing FULL HOUSE website:', error);
        
        // Fallback: ensure basic functionality works
        const fallbackInit = () => {
            // Basic navigation
            const navLinks = document.querySelectorAll('a[href^="#"]');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });

            // Basic mobile menu
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                });
            }
        };

        fallbackInit();
    }
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause non-critical animations when page is hidden
        console.log('Page hidden - pausing animations');
    } else {
        // Resume animations when page is visible
        console.log('Page visible - resuming animations');
    }
});

// Handle connection changes
window.addEventListener('online', () => {
    console.log('Connection restored');
    // Re-enable features that require internet
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    // Disable features that require internet
});

// Service Worker registration (if needed for PWA)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        // Uncomment if you want to add PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export for potential external use
window.FullHouse = {
    Navigation,
    FormHandler,
    HeroEffects,
    Utils,
    Analytics
};
