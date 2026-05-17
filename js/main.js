/* ============================================================================
   MAIN APPLICATION INITIALIZATION
   ========================================================================== */

import { initScrollReveal,animateValue, isMobile } from './utils.js';
import { initNavbar } from './navbar.js';
import { initComponents } from './components.js';
import { initResearchChatbot } from './chatbot.js';

/**
 * Main application class
 */
class App {
    constructor() {
        this.initialized = false;
        this.init();
    }

    init() {
        if (this.initialized) return;

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('🚀 Initializing Research Web Application');

        // Initialize core modules
        this.initNavigation();
        this.initComponents();
        this.initAnimations();
        this.initStats();
        this.initKnowledgeShortcut();
        this.initResearchAssistant();
        this.attachEventListeners();

        this.initialized = true;
        console.log('✅ Application initialized');
    }

    initNavigation() {
        console.log('📍 Initializing navigation');
        initNavbar();
    }

    initComponents() {
        console.log('🎨 Initializing components');
        initComponents();
    }

    initAnimations() {
        console.log('✨ Initializing animations');
        initScrollReveal();
    }

    initStats() {
        console.log('📊 Initializing statistics');

        // Animate stat values when in view
        const stats = document.querySelectorAll('[data-animate-stat]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const endValue = parseInt(entry.target.dataset.animateStat);
                    const suffix = entry.target.dataset.suffix || '';
                    animateValue(entry.target, 0, endValue, 1500, suffix);
                    entry.target.dataset.animated = 'true';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        stats.forEach((stat) => observer.observe(stat));
    }

    initKnowledgeShortcut() {
        const isKnowledgePage = window.location.pathname.endsWith('/knowledge-base.html') || window.location.pathname.endsWith('knowledge-base.html');
        const shortcut = document.createElement('a');
        shortcut.className = 'global-kb-shortcut';
        shortcut.href = isKnowledgePage ? 'index.html' : 'knowledge-base.html#knowledge-app';
        shortcut.setAttribute('aria-label', isKnowledgePage ? 'Go back to home' : 'Explore Knowledge Base');
        shortcut.innerHTML = isKnowledgePage
            ? '<i class="fa-solid fa-house"></i><span>Go back to home</span>'
            : '<i class="fa-solid fa-sitemap"></i><span>Explore Knowledge Base</span>';
        document.body.appendChild(shortcut);
    }

    initResearchAssistant() {
        initResearchChatbot({
            kbUrl: 'kb.json',
            cssUrl: 'css/chatbot.css'
        });
    }

    attachEventListeners() {
        console.log('🎯 Attaching event listeners');

        // Always support explicit "Back to top" links, even if #top target does not exist.
        document.querySelectorAll('a[href="#top"], .to-top').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            console.log('📱 Orientation changed');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Home key: scroll to top
            if (e.key === 'Home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            // End key: scroll to bottom
            if (e.key === 'End') {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        });
    }

    /**
     * Utility to load external modules
     */
    static loadModule(modulePath) {
        return import(modulePath).catch((error) => {
            console.error(`Failed to load module: ${modulePath}`, error);
        });
    }

    /**
     * Get application state
     */
    getState() {
        return {
            initialized: this.initialized,
            isMobile: isMobile(),
            currentPage: window.location.pathname,
            theme: localStorage.getItem('theme') || 'light'
        };
    }
}

/**
 * Expose global app instance
 */
window.app = new App();

// Export for use in other modules
export default window.app;
