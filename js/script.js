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
    // Get the search input box and buttons from the HTML
    const searchInput = document.getElementById('project-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Make sure the elements exist on the page before running the code
    if (searchInput && filterBtns.length > 0 && projectCards.length > 0) {
        
        // This function decides which project cards should be hidden or shown
        const filterProjects = () => {
            const searchTerm = searchInput.value.toLowerCase().trim(); // Get the typed text
            const activeFilterBtn = document.querySelector('.filter-btn.active'); // Find the clicked button
            const activeCategory = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all'; // Get its category (like 'python')

            // Loop through every single project card
            projectCards.forEach(card => {
                const titleElement = card.querySelector('.project-card__title');
                const title = titleElement ? titleElement.textContent.toLowerCase() : ''; // Get the project's title
                const categories = card.dataset.category ? card.dataset.category.split(' ') : []; // Get the project's hidden tags

                // Check if the card matches our search text and our active button tag
                const matchesSearch = title.includes(searchTerm);
                const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory);

                // If it matches both, show the card. Otherwise, hide it.
                if (matchesSearch && matchesCategory) {
                    card.classList.remove('project-hidden'); // Show card
                    if (!card.classList.contains('visible')) {
                        card.classList.add('visible'); // Trigger animation if needed
                    }
                } else {
                    card.classList.add('project-hidden'); // Hide card
                }
            });
        };

        // Run our function every time the user types a letter
        searchInput.addEventListener('input', filterProjects);

        // Run our function every time the user clicks a filter button
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active')); // Reset all buttons
                btn.classList.add('active'); // Highlight the clicked button
                filterProjects(); // Update the projects on screen
            });
        });
    }

});
