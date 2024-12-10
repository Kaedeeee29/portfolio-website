// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active navigation link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
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

// Skill bar and fade-in animation
const skillLevels = document.querySelectorAll('.skill-level');
const fadeElements = document.querySelectorAll('.fade-in');

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skill-level')) {
                entry.target.style.width = `${entry.target.dataset.level}%`;
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const scrollObserver = new IntersectionObserver(animateOnScroll, {
    threshold: 0.5
});

skillLevels.forEach(skill => {
    scrollObserver.observe(skill);
});

fadeElements.forEach(element => {
    scrollObserver.observe(element);
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Mobile menu toggle
const navMenu = document.getElementById('nav-menu');
const logoLink = document.querySelector('.logo');

logoLink.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        e.preventDefault();
        navMenu.classList.toggle('show');
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('show');
        }
    });
});

// Typing effect for subtitle
const subtitleElement = document.querySelector('.subtitle');
const subtitleText = subtitleElement.textContent;
subtitleElement.textContent = '';

let i = 0;
function typeWriter() {
    if (i < subtitleText.length) {
        subtitleElement.textContent += subtitleText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when the page loads
window.addEventListener('load', typeWriter);

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top-btn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Binary code background
const canvas = document.getElementById('binary-bg');
const ctx = canvas.getContext('2d');

let width, height;
let columns;
const fontSize = 14;
const drops = [];

function setupCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    columns = Math.floor(width / fontSize);

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
}

function draw() {
    ctx.fillStyle = 'rgba(44, 62, 80, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#2ecc71';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.95) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

setupCanvas();
animate();

window.addEventListener('resize', setupCanvas);

