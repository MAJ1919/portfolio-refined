/* ============================================================
   Portfolio Scripts – Mahdi Al Hassan
   Modular architecture: each feature is a self-contained module
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // Initialize all modules
    ThemeManager.init();
    Navigation.init();
    ScrollReveal.init();
    ProjectFilter.init();
    ContactForm.init();
    HeroEffects.init();
    HeaderScroll.init();
    DisabledLinks.init();

});


/* ==========================================================
   1. THEME MANAGER
   ========================================================== */
const ThemeManager = {
    init() {
        this.toggleBtn = document.getElementById('theme-toggle');
        this.root = document.documentElement;

        if (!this.toggleBtn) return;

        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        this.apply(savedTheme);

        this.toggleBtn.addEventListener('click', () => this.toggle());
    },

    apply(theme) {
        this.root.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    },

    toggle() {
        const current = this.root.getAttribute('data-theme');
        this.apply(current === 'light' ? 'dark' : 'light');
    }
};


/* ==========================================================
   2. NAVIGATION
   ========================================================== */
const Navigation = {
    init() {
        this.menuToggle = document.getElementById('menu-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav__link[data-nav]');

        if (!this.menuToggle || !this.navMenu) return;

        // Mobile menu toggle
        this.menuToggle.addEventListener('click', () => {
            this.menuToggle.classList.toggle('open');
            this.navMenu.classList.toggle('open');
        });

        // Close menu on link click
        this.navMenu.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                this.menuToggle.classList.remove('open');
                this.navMenu.classList.remove('open');
            });
        });

        // Active nav highlighting on scroll
        window.addEventListener('scroll', () => this.highlightActive(), { passive: true });
        this.highlightActive();
    },

    highlightActive() {
        const scrollY = window.scrollY + 120;
        this.sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                this.navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.nav === id);
                });
            }
        });
    }
};


/* ==========================================================
   3. SCROLL REVEAL (with staggered children)
   ========================================================== */
const ScrollReveal = {
    init() {
        const revealElements = document.querySelectorAll('.reveal');
        if (!revealElements.length) return;

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');

                        // Stagger children within the revealed parent
                        const children = entry.target.querySelectorAll('.reveal-child');
                        children.forEach((child, i) => {
                            child.style.transitionDelay = `${i * 0.08}s`;
                            child.classList.add('visible');
                        });

                        this.observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        revealElements.forEach(el => this.observer.observe(el));
    }
};


/* ==========================================================
   4. PROJECT FILTER & SEARCH
   ========================================================== */
const ProjectFilter = {
    init() {
        this.searchInput = document.getElementById('project-search');
        this.projectCards = document.querySelectorAll('.project-card');
        this.tagSelect = document.getElementById('project-tag-select');

        if (!this.searchInput || !this.projectCards.length) return;

        // Search input listener
        this.searchInput.addEventListener('input', () => this.filter());

        // Populate tag dropdown from actual project tags
        if (this.tagSelect) {
            const uniqueTags = new Set();
            document.querySelectorAll('.project-card .tag').forEach(tag => {
                uniqueTags.add(tag.textContent.trim());
            });

            Array.from(uniqueTags).sort().forEach(tag => {
                const option = document.createElement('option');
                option.value = tag;
                option.textContent = tag;
                this.tagSelect.appendChild(option);
            });

            this.tagSelect.addEventListener('change', () => this.filter());
        }

        // Clicking a tag inside a project card sets the dropdown
        document.querySelectorAll('.project-card .tag').forEach(tag => {
            tag.style.cursor = 'pointer';
            tag.addEventListener('click', (e) => {
                const tagText = e.target.textContent.trim();
                if (this.tagSelect) {
                    this.tagSelect.value = tagText;
                    this.filter();
                }
            });
        });
    },

    filter() {
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        const selectedTag = this.tagSelect ? this.tagSelect.value.toLowerCase() : '';

        this.projectCards.forEach(card => {
            const titleEl = card.querySelector('.project-card__title');
            const title = titleEl ? titleEl.textContent.toLowerCase() : '';
            const tagElements = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase().trim());

            const matchesSearch = !searchTerm || title.includes(searchTerm) || tagElements.some(t => t.includes(searchTerm));
            const matchesTag = !selectedTag || tagElements.includes(selectedTag);

            if (matchesSearch && matchesTag) {
                card.classList.remove('project-hidden');
                if (!card.classList.contains('visible')) {
                    card.classList.add('visible');
                }
            } else {
                card.classList.add('project-hidden');
            }
        });
    }
};


/* ==========================================================
   5. CONTACT FORM VALIDATION
   ========================================================== */
const ContactForm = {
    init() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        this.fields = {
            name: {
                input: document.getElementById('contact-name'),
                error: document.getElementById('name-error'),
                label: 'Name'
            },
            email: {
                input: document.getElementById('contact-email'),
                error: document.getElementById('email-error'),
                label: 'Email'
            },
            message: {
                input: document.getElementById('contact-message'),
                error: document.getElementById('message-error'),
                label: 'Message'
            }
        };

        this.successEl = document.getElementById('form-success');

        // Blur validation
        Object.values(this.fields).forEach(field => {
            field.input.addEventListener('blur', () => this.validateField(field));
            field.input.addEventListener('focus', () => field.input.classList.remove('error'));
        });

        // Submit
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    validateField(field) {
        const value = field.input.value.trim();

        if (!value) {
            field.error.textContent = `${field.label} is required.`;
            field.input.classList.add('error');
            return false;
        }

        if (field.input.type === 'email') {
            const hasAt = /@/.test(value);
            const hasName = /^[^@]+@/.test(value);
            const hasDomain = /@[^@.]+/.test(value);
            const hasExtension = /@[^@]+\.[a-zA-Z]{2,}$/.test(value);

            if (!hasAt) {
                field.error.textContent = `Please include an '@' in the email address. '${value}' is missing an '@'.`;
                field.input.classList.add('error');
                return false;
            } else if (!hasName) {
                field.error.textContent = "Please enter a part before the '@'.";
                field.input.classList.add('error');
                return false;
            } else if (!hasDomain) {
                field.error.textContent = "Please enter a domain after the '@'.";
                field.input.classList.add('error');
                return false;
            } else if (!hasExtension) {
                field.error.textContent = "Please include a valid domain extension (e.g., '.com').";
                field.input.classList.add('error');
                return false;
            }
        }

        field.error.textContent = '';
        field.input.classList.remove('error');
        return true;
    },

    handleSubmit(e) {
        e.preventDefault();

        const results = Object.values(this.fields).map(field => this.validateField(field));
        const allValid = results.every(Boolean);

        if (allValid) {
            this.successEl.style.display = 'flex';
            this.form.reset();
            setTimeout(() => { this.successEl.style.display = 'none'; }, 5000);
        }
    }
};


/* ==========================================================
   6. HERO EFFECTS
   ========================================================== */
const HeroEffects = {
    init() {
        this.initGreeting();
        this.initParticles();
    },

    initGreeting() {
        const greetingEl = document.getElementById('greeting');
        if (!greetingEl) return;

        const hour = new Date().getHours();
        let greeting;

        if (hour < 5) greeting = 'Working late? 🌙';
        else if (hour < 12) greeting = 'Good morning ☀️';
        else if (hour < 17) greeting = 'Good afternoon 🌤️';
        else if (hour < 21) greeting = 'Good evening 🌇';
        else greeting = 'Good night 🌙';

        greetingEl.textContent = greeting;
    },

    initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        // Use fewer particles for better performance
        const count = window.innerWidth < 768 ? 10 : 16;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 5 + 2;
            const left = Math.random() * 100;
            const duration = Math.random() * 18 + 12;
            const delay = Math.random() * 12;
            particle.style.cssText = `width:${size}px;height:${size}px;left:${left}%;animation-duration:${duration}s;animation-delay:${delay}s`;
            container.appendChild(particle);
        }
    }
};


/* ==========================================================
   7. HEADER SCROLL BEHAVIOR
   ========================================================== */
const HeaderScroll = {
    init() {
        this.header = document.getElementById('header');
        if (!this.header) return;

        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        this.onScroll();
    },

    onScroll() {
        this.header.classList.toggle('scrolled', window.scrollY > 50);
    }
};


/* ==========================================================
   8. DISABLED LINKS
   ========================================================== */
const DisabledLinks = {
    init() {
        document.querySelectorAll('.disabled-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                return false;
            });
        });
    }
};
