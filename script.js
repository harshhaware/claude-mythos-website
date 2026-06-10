// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.exclusive-card, .capability-card, .access-card, .faq-item, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Button click handlers
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        console.log('🔐 Access Request:', buttonText);
        
        if (buttonText.includes('Access')) {
            alert('Redirecting to enterprise access request form...');
        } else if (buttonText.includes('Demo')) {
            alert('Scheduling demo with Anthropic team...');
        } else if (buttonText.includes('Sales')) {
            alert('Connecting to sales team...');
        }
    });
});

// Page load animation
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    document.body.style.opacity = '1';
});

// Console branding
console.log('%c🧠 Claude Mythos', 'font-size: 24px; font-weight: bold; color: #ec4899;');
console.log('%cAnthropics\'s Most Powerful AI | Enterprise Access Only', 'font-size: 14px; color: #cbd5e1;');
console.log('%c🔒 This is an exclusive product for authorized organizations only', 'font-size: 12px; color: #ec4899; font-weight: bold;');
