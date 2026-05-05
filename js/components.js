/* ============================================================================
   COMPONENTS MODULE (Accordion, Tabs, Modals)
   ========================================================================== */

import { toggleClass } from './utils.js';

/**
 * Accordion Manager
 */
export class AccordionManager {
    constructor(containerSelector = '.accordion') {
        this.containers = document.querySelectorAll(containerSelector);
        if (this.containers.length === 0) return;

        this.init();
    }

    init() {
        this.containers.forEach((container) => {
            const headers = container.querySelectorAll('.accordion-header');
            headers.forEach((header) => {
                header.addEventListener('click', () => this.toggleAccordion(header));
            });
        });
    }

    toggleAccordion(header) {
        const isActive = header.classList.contains('active');
        const content = header.nextElementSibling;

        if (!isActive) {
            // Close other open items in the same container
            const container = header.closest('.accordion');
            const otherHeaders = container.querySelectorAll('.accordion-header.active');
            otherHeaders.forEach((otherHeader) => {
                if (otherHeader !== header) {
                    this.closeAccordion(otherHeader);
                }
            });

            // Open current item
            this.openAccordion(header, content);
        } else {
            // Close current item
            this.closeAccordion(header);
        }
    }

    openAccordion(header, content) {
        header.classList.add('active');
        content.classList.add('active');
    }

    closeAccordion(header) {
        const content = header.nextElementSibling;
        header.classList.remove('active');
        content.classList.remove('active');
    }
}

/**
 * Tabs Manager
 */
export class TabsManager {
    constructor(containerSelector = '.tabs-container') {
        this.containers = document.querySelectorAll(containerSelector);
        if (this.containers.length === 0) return;

        this.init();
    }

    init() {
        this.containers.forEach((container) => {
            const buttons = container.querySelectorAll('.tab-button');
            const contents = container.querySelectorAll('.tab-content');

            buttons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    this.activeTab(buttons, contents, index);
                });
            });

            // Activate first tab by default
            if (buttons.length > 0) {
                this.activeTab(buttons, contents, 0);
            }
        });
    }

    activeTab(buttons, contents, index) {
        buttons.forEach((btn) => btn.classList.remove('active'));
        contents.forEach((content) => content.classList.remove('active'));

        if (buttons[index]) buttons[index].classList.add('active');
        if (contents[index]) contents[index].classList.add('active');
    }
}

/**
 * Modal Manager
 */
export class ModalManager {
    constructor() {
        this.modals = new Map();
        this.init();
    }

    init() {
        // Auto-setup modals from HTML
        const triggers = document.querySelectorAll('[data-modal-trigger]');
        triggers.forEach((trigger) => {
            const modalId = trigger.getAttribute('data-modal-trigger');
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(modalId);
            });
        });

        // Setup close buttons
        const closeButtons = document.querySelectorAll('.modal-close');
        closeButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                if (modal) {
                    this.close(modal.id);
                }
            });
        });

        // Close modal on backdrop click
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach((backdrop) => {
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    const modal = backdrop.nextElementSibling;
                    if (modal && modal.classList.contains('modal')) {
                        this.close(modal.id);
                    }
                }
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLastOpen();
            }
        });
    }

    register(id, modalElement, backdropElement) {
        this.modals.set(id, {
            modal: modalElement,
            backdrop: backdropElement
        });
    }

    open(id) {
        const modal = this.modals.get(id);
        if (!modal) {
            console.warn(`Modal ${id} not found`);
            return;
        }

        modal.backdrop.classList.add('active');
        modal.modal.classList.add('active');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    close(id) {
        const modal = this.modals.get(id);
        if (!modal) return;

        modal.backdrop.classList.remove('active');
        modal.modal.classList.remove('active');

        // Restore body scroll
        document.body.style.overflow = '';
    }

    closeLastOpen() {
        let lastId = null;
        for (const [id, modal] of this.modals) {
            if (modal.modal.classList.contains('active')) {
                lastId = id;
            }
        }

        if (lastId) {
            this.close(lastId);
        }
    }
}

/**
 * Animation Trigger Manager
 */
export class AnimationTrigger {
    constructor() {
        this.init();
    }

    init() {
        const elements = document.querySelectorAll('[data-animation]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const animation = entry.target.getAttribute('data-animation');
                    entry.target.classList.add(`animate-${animation}`);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach((el) => observer.observe(el));
    }
}

/**
 * Initialize all components
 */
export function initComponents() {
    new AccordionManager();
    new TabsManager();
    new ModalManager();
    new AnimationTrigger();
}

export default {
    AccordionManager,
    TabsManager,
    ModalManager,
    AnimationTrigger,
    initComponents
};
