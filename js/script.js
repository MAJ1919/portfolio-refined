/* Portfolio Scripts – Mahdi */

document.addEventListener('DOMContentLoaded', () => {

    // 1. THEME TOGGLE
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    const setTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    };

    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        setTheme(current === 'light' ? 'dark' : 'light');
    });

    // 2. TIME-OF-DAY GREETING
    const greetingEl = document.getElementById('greeting');

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 5) return 'Working late? 🌙';
        if (hour < 12) return 'Good morning ☀️';
        if (hour < 17) return 'Good afternoon 🌤️';
        if (hour < 21) return 'Good evening 🌇';
        return 'Good night 🌙';
    };

    if (greetingEl) greetingEl.textContent = getGreeting();

    // 3. MOBILE MENU
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // 4. ACTIVE NAV ON SCROLL
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[data-nav]');

    const highlightActiveLink = () => {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.nav === id);
                });
            }
        });
    };

    window.addEventListener('scroll', highlightActiveLink, { passive: true });
    highlightActiveLink();

    // 5. SCROLL-REVEAL ANIMATIONS
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 6. FORM VALIDATION
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formSuccess = document.getElementById('form-success');

    const validateField = (input, errorEl, fieldName) => {
        const value = input.value.trim();

        if (!value) {
            errorEl.textContent = `${fieldName} is required.`;
            input.classList.add('error');
            return false;
        }

        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorEl.textContent = 'Please enter a valid email address.';
                input.classList.add('error');
                return false;
            }
        }

        errorEl.textContent = '';
        input.classList.remove('error');
        return true;
    };

    nameInput.addEventListener('blur', () => validateField(nameInput, nameError, 'Name'));
    emailInput.addEventListener('blur', () => validateField(emailInput, emailError, 'Email'));
    messageInput.addEventListener('blur', () => validateField(messageInput, messageError, 'Message'));

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('focus', () => input.classList.remove('error'));
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateField(nameInput, nameError, 'Name');
        const isEmailValid = validateField(emailInput, emailError, 'Email');
        const isMessageValid = validateField(messageInput, messageError, 'Message');

        if (isNameValid && isEmailValid && isMessageValid) {
            formSuccess.style.display = 'flex';
            contactForm.reset();
            setTimeout(() => formSuccess.style.display = 'none', 5000);
        }
    });

    // 7. FLOATING PARTICLES
    const particlesContainer = document.getElementById('particles');

    const createParticles = () => {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 6 + 3;
            const left = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 10;
            particle.style.cssText = `width:${size}px;height:${size}px;left:${left}%;animation-duration:${duration}s;animation-delay:${delay}s`;
            particlesContainer.appendChild(particle);
        }
    };

    if (particlesContainer) createParticles();

    // 8. HEADER SCROLL SHADOW
    const header = document.getElementById('header');

    const handleHeaderScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // 9. PREVENT DISABLED LINKS FROM NAVIGATING
    document.querySelectorAll('.disabled-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            return false;
        });
    });

    // 10. PROJECT SEARCH & FILTER
    const searchInput = document.getElementById('project-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (searchInput && filterBtns.length > 0 && projectCards.length > 0) {
        const filterProjects = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const activeFilterBtn = document.querySelector('.filter-btn.active');
            const activeCategory = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';

            projectCards.forEach(card => {
                const titleElement = card.querySelector('.project-card__title');
                const title = titleElement ? titleElement.textContent.toLowerCase() : '';
                const categories = card.dataset.category ? card.dataset.category.split(' ') : [];

                const matchesSearch = title.includes(searchTerm);
                const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory);

                if (matchesSearch && matchesCategory) {
                    card.classList.remove('project-hidden');
                    // Retrigger reveal animation if not already visible
                    if (!card.classList.contains('visible')) {
                        card.classList.add('visible');
                    }
                } else {
                    card.classList.add('project-hidden');
                }
            });
        };

        searchInput.addEventListener('input', filterProjects);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to the clicked button
                btn.classList.add('active');
                // Trigger filter
                filterProjects();
            });
        });
    }

});
