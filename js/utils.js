/* ============================================================================
   UTILITY FUNCTIONS
   ========================================================================== */

/**
 * Detect if element is in viewport
 */
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}

/**
 * Get scroll position (top, middle, bottom)
 */
export function getScrollPosition(element) {
    const rect = element.getBoundingClientRect();
    const elementHeight = rect.height;
    const screenHeight = window.innerHeight;
    const elementCenter = rect.top + elementHeight / 2;
    const screenCenter = screenHeight / 2;
    const scrollDistance = elementCenter - screenCenter;
    return scrollDistance;
}

/**
 * Trigger reveal animation on scroll with auto-staggering
 */
export function initScrollReveal() {
    // Select standard reveals + all cards/boxes
    const rawReveals = document.querySelectorAll('.reveal, .card, .box, .step, .timeline-item, .stat-card, .obj-card, .doc-card, .issue');
    
    // Add base reveal class to all of them if they don't have it
    rawReveals.forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });

    const reveals = document.querySelectorAll('.reveal');
    
    // Group elements by their parent container to calculate stagger delays
    const groups = new Map();
    
    reveals.forEach(el => {
        if (!el.parentElement) return;
        if (!groups.has(el.parentElement)) {
            groups.set(el.parentElement, []);
        }
        groups.get(el.parentElement).push(el);
    });

    // Assign automatic transition delays for siblings
    groups.forEach(siblings => {
        if (siblings.length > 1) {
            siblings.forEach((el, index) => {
                // Max stagger index to avoid waiting too long
                const staggerIndex = Math.min(index + 1, 5); 
                el.classList.add(`stagger-${staggerIndex}`);
            });
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach((reveal) => {
        observer.observe(reveal);
    });
}

/**
 * Smooth scroll to element
 */
export function smoothScroll(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
    }
    return false;
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Animate numeric value (for stats)
 */
export function animateValue(element, start, end, duration = 1500, suffix = '') {
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = `${value}${suffix}`;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

/**
 * Format date
 */
export function formatDate(date, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    };
    return new Date(date).toLocaleDateString('en-US', defaultOptions);
}

/**
 * Copy to clipboard
 */
export function copyToClipboard(text) {
    return navigator.clipboard.writeText(text)
        .then(() => true)
        .catch(() => false);
}

/**
 * Check if element is mobile (simple device detection)
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Get viewport width
 */
export function getViewportWidth() {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

/**
 * Get viewport height
 */
export function getViewportHeight() {
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}

/**
 * Generate unique ID
 */
export function generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Add/Remove class with fallback support
 */
export function toggleClass(element, className, force) {
    if (element.classList) {
        element.classList.toggle(className, force);
    } else {
        // Fallback for older browsers
        const classes = element.className.split(' ');
        const index = classes.indexOf(className);
        if (force || (force !== false && index === -1)) {
            if (index === -1) classes.push(className);
        } else {
            if (index !== -1) classes.splice(index, 1);
        }
        element.className = classes.join(' ');
    }
}

/**
 * Parse query string
 */
export function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Build URL with query params
 */
export function buildUrl(path, params = {}) {
    const url = new URL(path, window.location.origin);
    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });
    return url.toString();
}

/**
 * Log only in development (check if localhost or dev flag)
 */
export function devLog(...args) {
    if (window.location.hostname === 'localhost' || localStorage.getItem('DEBUG')) {
        console.log('[DEV]', ...args);
    }
}

/**
 * Safe JSON parse
 */
export function safeJsonParse(jsonString, fallback = null) {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        return fallback;
    }
}

/**
 * Fetch with timeout
 */
export async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

/**
 * Lazy load images
 */
export function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach((img) => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach((img) => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Extract domain from URL
 */
export function extractDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch {
        return null;
    }
}

/**
 * Wait for element to exist in DOM
 */
export function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }

        const observer = new MutationObserver(() => {
            const found = document.querySelector(selector);
            if (found) {
                observer.disconnect();
                resolve(found);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        }, timeout);
    });
}

export default {
    isInViewport,
    getScrollPosition,
    initScrollReveal,
    smoothScroll,
    debounce,
    throttle,
    animateValue,
    formatDate,
    copyToClipboard,
    isMobile,
    getViewportWidth,
    getViewportHeight,
    generateId,
    toggleClass,
    getQueryParam,
    buildUrl,
    devLog,
    safeJsonParse,
    fetchWithTimeout,
    lazyLoadImages,
    extractDomain,
    waitForElement
};
