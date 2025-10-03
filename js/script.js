// Coffee Shop Interactive Script
document.addEventListener('DOMContentLoaded', () => {
    console.log("Coffee Shop Website Loaded ✅");
    initializeThemeToggle();
    setDynamicGreeting();
    initializeModal();
    initializeNavigation();
    initializePageSpecificFeatures();
});

function initializePageSpecificFeatures() {
    // Features that only exist on certain pages
    if (document.getElementById('greeting')) {
        setDynamicGreeting();
    }
    
    if (document.getElementById('orderModal')) {
        initializeModal();
    }
    
    if (document.querySelector('.menu-items')) {
        initializeMenuFilters();
    }
    
    if (document.getElementById('contactForm')) {
        initializeContactForm();
    }
}

// Dynamic greeting based on time of day
function setDynamicGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;
    
    const hours = new Date().getHours();
    let greeting = "Your Daily Dose of Coffee";
    
    if (hours < 12) greeting = "Good Morning! Start Your Day Right ☕";
    else if (hours < 18) greeting = "Good Afternoon! Time for a Break 🌞";
    else greeting = "Good Evening! Relax with Perfect Coffee 🌙";
    
    greetingElement.textContent = greeting;
}

// Theme toggle functionality - WORKS ON ALL PAGES
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle || !themeIcon) {
        console.log('Theme toggle elements not found on this page');
        return;
    }
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(themeIcon, currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeIcon, newTheme);
    });
}

function updateThemeIcon(icon, theme) {
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('orderModal');
    if (!modal) return;
    
    const closeBtn = document.querySelector('.close');
    const orderForm = document.getElementById('orderForm');

    // Close modal when clicking X
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        processOrder();
    });

    // Add input animations
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

function orderNow() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'block';
        document.getElementById('orderForm').reset();
    }
}

function processOrder() {
    const coffeeType = document.getElementById('coffeeType').value;
    const quantity = document.getElementById('quantity').value;
    
    if (!coffeeType) {
        alert('Please select a coffee type!');
        return;
    }

    const coffeePrices = {
        espresso: 3.50,
        latte: 4.50,
        cappuccino: 4.00,
        americano: 3.00
    };

    const price = coffeePrices[coffeeType] * quantity;
    const coffeeName = document.getElementById('coffeeType').options[document.getElementById('coffeeType').selectedIndex].text;

    // Show success message with animation
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'slideIn 0.3s ease';
    
    setTimeout(() => {
        alert(`🎉 Order Successful!\n\n${quantity}x ${coffeeName}\nTotal: $${price.toFixed(2)}\n\nThank you for choosing Coffee Haven! ☕`);
        document.getElementById('orderModal').style.display = 'none';
    }, 500);
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            e.target.classList.add('active');
        });
    });
}

// Menu page functionality
function initializeMenuFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Filter items
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
    });
}

// Add scroll animation for feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe feature cards when they're added to the DOM
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.opacity = '0';
        observer.observe(card);
    });
});