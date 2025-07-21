// Navigation and Mobile Menu Management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupDropdowns();
        this.setupScrollEffects();
        this.setupAnimations();
    }

    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active'); // Toggles the hamburger icon animation
            });

            // Close mobile menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('a:not(.dropdown-toggle)'); // Exclude dropdown toggle
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // Only close if it's a direct navigation link, not a dropdown toggle
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
        const navDropdown = document.querySelector('.nav-dropdown'); // Get the parent for toggling 'active'

        if (dropdownToggle && dropdownMenu && navDropdown) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                // Toggle 'active' class on the parent dropdown for CSS to show/hide
                navDropdown.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!navDropdown.contains(e.target)) {
                    navDropdown.classList.remove('active');
                }
            });
        }
    }

    setupScrollEffects() {
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Reduced scroll threshold for background change
                navbar.style.background = 'rgba(61, 72, 170, 0.973)'; // Revert to initial transparency


            } else {
                navbar.style.background = 'rgba(61, 72, 170, 0.973)'; // Revert to initial transparency

            }
        });
        // Smooth scrolling for anchor links (if you add any in the future)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
    }

    setupAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .testimonial, .value-prop, .hero-title, .hero-overlay-text, .hero-idea-icon, .hero-services .service-tag');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
}

// Utility Functions
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

// Preload images for better performance
function preloadImages() {
    const images = [
        './logo.png',
        'FavIcon.png',
        'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHoydDF2Z3JheDF1ZDYza3l4NjNrcnl3ZXh6aWR5NTU1Y3BuazF4cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iMMfCfD9TLuCY/giphy.gif',
        './idea.png',
        'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
        // Add all other important images you want to preload here
    ];

    images.forEach(image => {
        const img = new Image();
        img.src = image;
    });
}

// Initialize navigation and preload images when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const navigation = new NavigationManager();
    preloadImages();
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize if window becomes larger than mobile breakpoint
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        // Also ensure dropdown is closed if desktop view
        const navDropdown = document.querySelector('.nav-dropdown');
        if (navDropdown) navDropdown.classList.remove('active');
    }
}, 250));
// Add to your existing script.js
function setupVerticalSectorAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectorObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150); // Staggered delay
            }
        });
    }, observerOptions);

    const sectorCards = document.querySelectorAll('.sector-vertical-card');
    sectorCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        sectorObserver.observe(card);
    });
}

// Call this in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing code ...
    setupVerticalSectorAnimations();
});


document.addEventListener('DOMContentLoaded', function() {
    const sloganContent = document.querySelector('.slogan-content');
    const minScale = 0.7;
    const maxScale = 1.3;
    let lastScrollY = window.scrollY;
    let currentScale = 1;

    function updateScale() {
        const scrollY = window.scrollY;
        const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = scrollY;

        // Adjust scale based on scroll direction
        if (scrollDirection === 'down') {
            currentScale = Math.min(currentScale + 0.01, maxScale);
        } else {
            currentScale = Math.max(currentScale - 0.01, minScale);
        }

        // Apply the scale
        sloganContent.style.transform = `scale(${currentScale})`;
        
        // Continue the animation if not at limits
        if ((scrollDirection === 'down' && currentScale < maxScale) || 
            (scrollDirection === 'up' && currentScale > minScale)) {
            requestAnimationFrame(updateScale);
        }
    }

    // Use IntersectionObserver to reset when out of view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                currentScale = 1;
                sloganContent.style.transform = 'scale(1)';
            }
        });
    }, {threshold: 0.1});

    observer.observe(document.querySelector('.scroll-responsive-slogan'));

    // Initial setup
    window.addEventListener('scroll', function() {
        requestAnimationFrame(updateScale);
    });
});



  const button = document.querySelector('button');
        const arrow = button.querySelector('span');
        
        button.addEventListener('mouseenter', () => {
            button.style.paddingRight = '60px';
            arrow.style.transform = 'translate(5px, -50%) scale(1.2)';
            button.style.boxShadow = '0 6px 25px rgba(167, 119, 227, 0.5)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.paddingRight = '50px';
            arrow.style.transform = 'translateY(-50%)';
            button.style.boxShadow = '0 4px 20px rgba(167, 119, 227, 0.3)';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });

        function setupVerticalTestimonialAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150); // Staggered delay
            }
        });
    }, observerOptions);

    const testimonialCards = document.querySelectorAll('.testimonial-vertical-card');
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        testimonialObserver.observe(card);
    });
}

// Call this in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    setupVerticalTestimonialAnimations();
});
function animateCTACircles() {
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach((circle, index) => {
        // Initial state
        circle.style.transform = 'scale(0)';
        circle.style.opacity = '0';
        circle.style.transition = `all 0.5s ease ${index * 0.2}s`;
        
        // Animate in after short delay
        setTimeout(() => {
            circle.style.transform = 'scale(1)';
            circle.style.opacity = '1';
        }, 500);
    });
}

// Email Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userEmail = document.getElementById('userEmail').value;
    
    // Here you would normally send the email to your server
    // For this example, we'll simulate it with a timeout
    console.log(`Message from: ${userEmail} would be sent to yonasgetaw5444@gmail.com`);
    
    // Show success modal
    document.getElementById('successModal').style.display = 'block';
    
    // Clear the form
    this.reset();
});

// Close modal when clicking X
document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('successModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userEmail = document.getElementById('userEmail').value;
    const formData = new FormData();
    formData.append('email', userEmail);
    
    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('successModal').style.display = 'block';
            this.reset();
        } else {
            alert('There was an error sending your message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    });
});