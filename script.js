document.getElementById('buyNow').addEventListener('click', function(e) {
    const button = this;
    
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size/2}px`;
    ripple.style.top = `${e.clientY - rect.top - size/2}px`;
    button.appendChild(ripple);
    
    // Add loading state
    button.classList.add('loading');
    button.textContent = 'Processing...';
    
    // Create confetti
    createConfetti();
    
    // Show success state after a brief delay
    setTimeout(() => {
        button.classList.remove('loading');
        button.classList.add('success');
        button.textContent = 'Success!';
        
        // Reset button after animation
        setTimeout(() => {
            button.classList.remove('success');
            button.textContent = 'SCORE A BAG';
            ripple.remove();
        }, 2000);
    }, 1500);
});

// Update confetti colors to match theme
function createConfetti() {
    const colors = ['#E31837', '#FFB81C', '#ffffff', '#00ff00', '#ffd700'];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties for more natural movement
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = Math.random() * 10 + 5;
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 3;
        const randomRotation = Math.random() * 360;
        
        confetti.style.backgroundColor = randomColor;
        confetti.style.width = `${randomSize}px`;
        confetti.style.height = `${randomSize}px`;
        confetti.style.left = `${randomLeft}vw`;
        confetti.style.animationDelay = `${randomDelay}s`;
        confetti.style.transform = `rotate(${randomRotation}deg)`;
        
        document.getElementById('confetti').appendChild(confetti);
        
        // Cleanup confetti
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti styles dynamically
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        top: -10px;
        pointer-events: none;
        animation: fall 5s cubic-bezier(.36,.07,.19,.97) forwards;
        z-index: 9998;
    }

    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        25% {
            transform: translateY(25vh) rotate(180deg) translateX(25px);
            opacity: 0.9;
        }
        50% {
            transform: translateY(50vh) rotate(360deg) translateX(-25px);
            opacity: 0.8;
        }
        75% {
            transform: translateY(75vh) rotate(540deg) translateX(25px);
            opacity: 0.6;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add chart loading handler
const chartFrame = document.querySelector('.chart-container iframe');
chartFrame.addEventListener('load', () => {
    console.log('Chart loaded successfully');
});

chartFrame.addEventListener('error', () => {
    console.error('Chart failed to load');
    chartFrame.insertAdjacentHTML('afterend', '<p class="chart-error">Chart temporarily unavailable</p>');
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Performance Optimization - Lazy Loading
document.addEventListener('DOMContentLoaded', () => {
    const lazyElements = document.querySelectorAll('[data-src]');
    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                lazyLoadObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyElements.forEach(element => lazyLoadObserver.observe(element));
});

// Add smooth page transitions
document.querySelectorAll('section').forEach(section => {
    section.classList.add('page-transition');
});

// Error handling for chart loading
const chartFrame = document.querySelector('.chart-container iframe');
chartFrame.addEventListener('error', (e) => {
    e.target.classList.add('error-state');
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Chart failed to load. Please try again later.';
    e.target.parentNode.appendChild(errorMessage);
});

// Add interactive element class to clickable items
document.querySelectorAll('button, .social-link, .feature-item').forEach(element => {
    element.classList.add('interactive-element');
}); 