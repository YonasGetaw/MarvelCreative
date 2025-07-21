document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation (shared with main script.js)
    const navigation = new NavigationManager();
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.founder-card, .story-content, .service-card, .value-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    };
    
    // Founder card hover effects
    const setupFounderHover = () => {
        const founderCards = document.querySelectorAll('.founder-card');
        
        founderCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const image = card.querySelector('.founder-image');
                image.style.transform = 'scale(1.05)';
                image.style.borderColor = '#a777e3';
            });
            
            card.addEventListener('mouseleave', () => {
                const image = card.querySelector('.founder-image');
                image.style.transform = 'scale(1)';
                image.style.borderColor = '#6e8efb';
            });
        });
    };
    
    // Initialize all animations
    animateOnScroll();
    setupFounderHover();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Reuse the NavigationManager class from script.js if not already loaded
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupDropdowns();
        this.setupScrollEffects();
    }

    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            const navLinks = navMenu.querySelectorAll('a:not(.dropdown-toggle)');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (!link.classList.contains('dropdown-toggle')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                });
            });
        }
    }

    setupDropdowns() {
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const navDropdown = document.querySelector('.nav-dropdown');

        if (dropdownToggle && dropdownMenu && navDropdown) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                navDropdown.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!navDropdown.contains(e.target)) {
                    navDropdown.classList.remove('active');
                }
            });
        }
    }

    setupScrollEffects() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(26, 62, 99, 0.95)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(26, 62, 99, 0.95)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Animate services on scroll
    const serviceCards = document.querySelectorAll('.magic-service');
    
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        serviceObserver.observe(card);
    });
    
    // Add hover effects to service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.color = '#a777e3';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
            this.style.color = '#6e8efb';
        });
    });
});