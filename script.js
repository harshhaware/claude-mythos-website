// ==================== SMOOTH SCROLLING & INTERACTIONS ====================

// Smooth scroll for navigation links
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

// ==================== BUTTON INTERACTIONS ====================

const allButtons = document.querySelectorAll('.btn');

allButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== SCROLL ANIMATIONS ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animStyle = document.createElement('style');
animStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animStyle);

document.querySelectorAll('.capability-card, .testimonial-card, .timeline-item, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== NAVBAR SCROLL EFFECT ====================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== PRICING CARD HOVER EFFECT ====================

document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        document.querySelectorAll('.pricing-card').forEach(c => {
            if (c !== this) {
                c.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        document.querySelectorAll('.pricing-card').forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// ==================== FORM MODAL SIMULATION ====================

const ctaButtons = document.querySelectorAll('[class*="btn"]');
const primaryButtons = Array.from(ctaButtons).filter(btn => 
    btn.textContent.includes('Begin') || 
    btn.textContent.includes('Schedule') ||
    btn.textContent.includes('Choose') ||
    btn.textContent.includes('Access')
);

primaryButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        
        if (buttonText.includes('Begin') || buttonText.includes('Access')) {
            showNotification('🚀 Welcome to Claude! Redirecting to signup...');
        } else if (buttonText.includes('Schedule')) {
            showNotification('📅 Demo scheduling coming soon!');
        } else if (buttonText.includes('Choose')) {
            showNotification('✨ Tier selected! Proceeding to checkout...');
        } else if (buttonText.includes('Explore') || buttonText.includes('Contact')) {
            showNotification('📧 Contact form would open here');
        } else if (buttonText.includes('Start')) {
            showNotification('🧠 Get started with Claude for free!');
        }
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
        padding: 1.25rem 1.75rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const notifStyle = document.createElement('style');
notifStyle.textContent = `
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
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notifStyle);

console.log('✨ Claude AI Consciousness Engine - Welcome to the future');