// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            navLinks.classList.remove('active');
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== CERTIFICATE TABS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.cert-grid').forEach(grid => grid.classList.add('hidden'));
        const tabId = btn.dataset.tab;
        document.getElementById('cert-' + tabId).classList.remove('hidden');
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-target]');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCounter();
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.key-metrics').forEach(el => counterObserver.observe(el));

// ===== TYPEWRITER EFFECT =====
const typewriter = document.querySelector('.typewriter');
if (typewriter) {
    const text = typewriter.textContent;
    typewriter.textContent = '';
    let i = 0;
    const type = () => {
        if (i < text.length) {
            typewriter.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    };
    setTimeout(type, 1000);
}

// ===== LINE QR MODAL =====
const lineQrBtn = document.getElementById('line-qr-btn');
const lineQrModal = document.getElementById('line-qr-modal');
const lineQrClose = document.getElementById('line-qr-close');

if (lineQrBtn && lineQrModal) {
    lineQrBtn.addEventListener('click', () => {
        lineQrModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    lineQrClose.addEventListener('click', () => {
        lineQrModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    lineQrModal.addEventListener('click', (e) => {
        if (e.target === lineQrModal) {
            lineQrModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
