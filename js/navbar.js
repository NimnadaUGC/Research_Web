/* ============================================================================
   NAVBAR & NAVIGATION MODULE
   ========================================================================== */

import { debounce, toggleClass } from './utils.js';

export class NavbarManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.navItems = document.querySelectorAll('.nav-links a');
        this.isHomePage = this.checkHomePage();
        
        if (!this.navbar) return;

        this.init();
    }

    checkHomePage() {
        const path = window.location.pathname;
        return path === '/' || path.endsWith('/index.html') || path.endsWith('index.html');
    }

    init() {
        this.setupMenuToggle();
        this.setupNavLinks();
        this.setupScrollBehavior();
        this.setActiveLink();
    }

    /**
     * Setup mobile menu toggle
     */
    setupMenuToggle() {
        if (this.menuToggle && this.navLinks) {
            this.menuToggle.addEventListener('click', () => {
                toggleClass(this.menuToggle, 'active');
                toggleClass(this.navLinks, 'active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.navbar.contains(e.target)) {
                    this.menuToggle.classList.remove('active');
                    this.navLinks.classList.remove('active');
                }
            });
        }
    }

    /**
     * Setup navigation link behavior
     */
    setupNavLinks() {
        this.navItems.forEach((link) => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // If it's an internal anchor link
                if (href.startsWith('#')) {
                    e.preventDefault();
                    this.navigateToSection(href);
                } else if (!href.includes('://') && !href.includes('mailto:')) {
                    // Internal page link (without protocol), handle with history
                    // Let default behavior work, but update active states
                }

                // Close mobile menu
                if (this.menuToggle && this.navLinks) {
                    this.menuToggle.classList.remove('active');
                    this.navLinks.classList.remove('active');
                }

                // Update active link
                this.setActiveLink();
            });
        });
    }

    /**
     * Navigate to a section with smooth scroll
     */
    navigateToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            const navHeight = this.navbar ? this.navbar.offsetHeight : 70;
            const offset = section.offsetTop - navHeight;
            
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Setup scroll behavior for navbar
     */
    setupScrollBehavior() {
        const handleScroll = debounce(() => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;

            if (scrollY > 18) {
                this.navbar.classList.remove('at-top');
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.add('at-top');
                this.navbar.classList.remove('scrolled');
            }
        }, 10);

        window.addEventListener('scroll', handleScroll);

        // Initial check
        handleScroll();
    }

    /**
     * Set active link based on current page
     */
    setActiveLink() {
        const currentPath = window.location.pathname;
        const hash = window.location.hash;

        this.navItems.forEach((link) => {
            link.classList.remove('active');

            const href = link.getAttribute('href');
            
            // Check if it matches current path
            if (href === currentPath || 
                (currentPath.includes(href.replace('.html', '')) && href.endsWith('.html')) ||
                (hash && href === hash)) {
                link.classList.add('active');
            }

            // Special case: home page
            if ((currentPath === '/' || currentPath.endsWith('index.html')) && 
                (href === '/' || href === 'index.html' || href === '#overview' || href.startsWith('index.html#'))) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Update active link on scroll (for same-page navigation)
     */
    updateActiveLinkOnScroll() {
        const scrollPosition = window.scrollY + 100; // Add offset for navbar height

        this.navItems.forEach((link) => {
            const href = link.getAttribute('href');
            if (!href.startsWith('#')) return;

            const section = document.querySelector(href);
            if (!section) return;

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navItems.forEach((l) => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }
}

/**
 * Initialize navbar on DOM ready
 */
export function initNavbar() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new NavbarManager();
        });
    } else {
        new NavbarManager();
    }
}

// Auto-initialize if script is loaded
if (typeof window !== 'undefined' && document.currentScript) {
    initNavbar();
}

export default NavbarManager;
