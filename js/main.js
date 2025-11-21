// ===========================
// Navigation
// ===========================

// Sticky navbar on scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// ===========================
// Smooth Scroll
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Animated Counters
// ===========================

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16); // 60 FPS
    const suffix = element.textContent.replace(/[0-9.]/g, ''); // Get suffix like TB, K, %
    const decimals = target % 1 !== 0 ? 1 : 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = current.toFixed(decimals) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toFixed(decimals) + suffix;
        }
    };
    
    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                let target;
                
                if (text.includes('TB')) {
                    target = parseFloat(text);
                } else if (text.includes('%')) {
                    target = parseFloat(text);
                } else if (text.includes('+')) {
                    target = parseInt(text);
                } else if (text.includes('/')) {
                    // For "24/7", don't animate
                    return;
                } else {
                    target = parseInt(text);
                }
                
                stat.textContent = '0';
                animateCounter(stat, target);
            });
            
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}

// ===========================
// Reveal Animations Disabled
// ===========================

// To make content appear instantly (no reveal-on-scroll delays), set relevant
// elements visible immediately and remove transition delays.
const makeVisibleImmediately = (selector) => {
    document.querySelectorAll(selector).forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'none';
    });
};

makeVisibleImmediately('.feature-card');
makeVisibleImmediately('.scenario-card');
makeVisibleImmediately('.process-step');
makeVisibleImmediately('.pricing-card');

// ===========================
// Contact Form Handling with Email Service
// ===========================

const contactForm = document.getElementById('contactForm');

// Initialize email service
let emailService = null;

// Wait for config to load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof EMAIL_CONFIG !== 'undefined' && typeof EmailService !== 'undefined') {
        emailService = new EmailService(EMAIL_CONFIG);
        console.log('Email service initialized');
    }
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        company: document.getElementById('company').value.trim(),
        migrationType: document.getElementById('migration-type').value,
        message: document.getElementById('message').value.trim()
    };
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    try {
        // Check if email service is initialized
        if (!emailService) {
            throw new Error('Email service not initialized. Please check configuration.');
        }
        
        // Send email using the email service
        const response = await emailService.send(formData);
        
        console.log('Email sent successfully:', response);
        
        // Show success message
        showNotification('Thank you! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        
    } catch (error) {
        console.error('Email sending failed:', error);
        
        // Show error message with more details
        let errorMessage = 'Oops! Something went wrong. Please try again or email us directly at admin@opsmigrator.in';
        
        if (error.message) {
            if (error.message.includes('not configured')) {
                errorMessage = 'Email service not configured. Please see EMAILJS_SETUP.md for setup instructions.';
            } else if (error.message.includes('fill in')) {
                errorMessage = error.message;
            } else if (error.message.includes('valid email')) {
                errorMessage = error.message;
            } else if (error.message.includes('suspicious')) {
                errorMessage = error.message;
            }
        }
        
        showNotification(errorMessage, 'error');
    } finally {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});

// ===========================
// Notification System
// ===========================

function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00C48C' : '#FF3B3B'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.25rem;
        padding: 0;
        margin-left: 1rem;
    `;
    
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Back to Top Button
// ===========================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Form Validation
// ===========================

const formInputs = document.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Display validation result
    if (!isValid) {
        input.classList.add('error');
        showFieldError(input, errorMessage);
    } else {
        input.classList.remove('error');
        removeFieldError(input);
    }
    
    return isValid;
}

function showFieldError(input, message) {
    removeFieldError(input); // Remove existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #FF3B3B;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    input.style.borderColor = '#FF3B3B';
    input.parentElement.appendChild(errorDiv);
}

function removeFieldError(input) {
    const errorDiv = input.parentElement.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.style.borderColor = '';
}

// ===========================
// Lazy Loading Images
// ===========================

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===========================
// Keyboard Navigation
// ===========================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Arrow keys for navigation (optional)
    if (e.key === 'ArrowUp' && window.pageYOffset > 0) {
        e.preventDefault();
        window.scrollBy({ top: -100, behavior: 'smooth' });
    }
    
    if (e.key === 'ArrowDown' && window.pageYOffset < document.body.scrollHeight - window.innerHeight) {
        e.preventDefault();
        window.scrollBy({ top: 100, behavior: 'smooth' });
    }
});

// ===========================
// Performance Monitoring
// ===========================

// Log page load performance
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});

// ===========================
// Accessibility Enhancements
// ===========================

// Add skip to content link for screen readers
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    text-decoration: none;
    z-index: 10000;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ===========================
// Console Welcome Message
// ===========================

console.log('%c Welcome to OpsMigrator AI! ', 'background: linear-gradient(135deg, #0066FF, #7B61FF); color: white; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Intelligent Enterprise Migration Platform ', 'color: #0066FF; font-size: 14px;');
console.log('%c Looking for careers? Contact us at admin@opsmigrator.in ', 'color: #64748B; font-size: 12px;');

// ===========================
// Initialize on DOM Ready
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('OpsMigrator website initialized successfully!');
});
