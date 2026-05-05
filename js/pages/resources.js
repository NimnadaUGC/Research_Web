pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let currentPDFPath = '';
let pdfDoc = null;
let totalPdfPages = 1;
let pageFlipInstance = null;
let isFlipping = false;
let currentZoom = 1;
let currentPageMode = 'spread';
let rebuildTimer = null;
let rebuildInProgress = false;
let rebuildQueued = false;
let pdfPageAspectRatio = 0.707;
let fullscreenTransitionActive = false;
let fullscreenSyncTimer = null;
const FULLSCREEN_SYNC_DEBOUNCE_MS = 160;
const PSEUDO_FULLSCREEN_CLASS = 'pdf-pseudo-fullscreen';
let pdfViewerResizeObserver = null;
let viewerLayoutDebounceTimer = null;
const VIEWER_LAYOUT_DEBOUNCE_MS = 200;

/** In fullscreen, PageFlip/WebGL often fails to show PDF textures; use plain canvases instead. */
let simpleViewerActive = false;
let simpleSpreadStart = 1;
let pageFlipBroken = false;

function nextAnimationFrame() {
    return new Promise((resolve) => {
        requestAnimationFrame(() => resolve());
    });
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function isPseudoFullscreen() {
    const modal = document.getElementById('pdfViewerModal');
    return Boolean(modal && modal.classList.contains(PSEUDO_FULLSCREEN_CLASS));
}

function clearPseudoFullscreen() {
    const modal = document.getElementById('pdfViewerModal');
    if (modal) {
        modal.classList.remove(PSEUDO_FULLSCREEN_CLASS);
    }
}

function containerIsNativeFullscreen() {
    const container = document.getElementById('pdfViewerContainer');
    if (!container) return false;
    const fs = document.fullscreenElement
        || document.webkitFullscreenElement
        || document.mozFullScreenElement
        || document.msFullscreenElement;
    return Boolean(fs && fs === container);
}

function detachPdfViewerResizeObserver() {
    if (pdfViewerResizeObserver) {
        pdfViewerResizeObserver.disconnect();
        pdfViewerResizeObserver = null;
    }
}

function attachPdfViewerResizeObserver() {
    detachPdfViewerResizeObserver();
    const el = document.getElementById('pdfViewerContainer');
    if (!el || typeof ResizeObserver === 'undefined') {
        return;
    }
    pdfViewerResizeObserver = new ResizeObserver(() => {
        const modal = document.getElementById('pdfViewerModal');
        if (!modal || !modal.classList.contains('active') || !pdfDoc) {
            return;
        }
        if (rebuildInProgress || fullscreenTransitionActive || isFlipping) {
            return;
        }
        if (viewerLayoutDebounceTimer) {
            clearTimeout(viewerLayoutDebounceTimer);
        }
        viewerLayoutDebounceTimer = setTimeout(() => {
            viewerLayoutDebounceTimer = null;
            if (!pdfDoc || !document.getElementById('pdfViewerModal')?.classList.contains('active')) {
                return;
            }
            if (rebuildInProgress || fullscreenTransitionActive || isFlipping) {
                return;
            }
            if (isFullscreenMode()) {
                scheduleFullscreenLayoutSync();
            } else if (pageFlipInstance || simpleViewerActive) {
                scheduleFlipbookRebuild(80);
            }
        }, VIEWER_LAYOUT_DEBOUNCE_MS);
    });
    pdfViewerResizeObserver.observe(el);
}

function showLoadingOverlay(text = 'Loading document…') {
    const container = document.getElementById('pdfCanvasContainer');
    if (!container) return;
    let overlay = container.querySelector('.pdf-loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'pdf-loading-overlay';
        overlay.innerHTML = '<div class="pdf-loading-spinner"></div><div class="pdf-loading-text"></div>';
        container.appendChild(overlay);
    }
    overlay.querySelector('.pdf-loading-text').textContent = text;
    overlay.classList.remove('hidden');
}

function hideLoadingOverlay() {
    const container = document.getElementById('pdfCanvasContainer');
    if (!container) return;
    const overlay = container.querySelector('.pdf-loading-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

async function waitForStageLayout(maxWaitMs = 1400) {
    const started = Date.now();
    let prevWidth = 0;
    let prevHeight = 0;
    let stableFrames = 0;

    while (Date.now() - started < maxWaitMs) {
        await nextAnimationFrame();
        const stage = document.getElementById('flipbookStage');
        if (!stage) continue;

        const width = stage.clientWidth;
        const height = stage.clientHeight;
        const hasSize = width > 200 && height > 200;
        const isStable = hasSize && Math.abs(width - prevWidth) < 2 && Math.abs(height - prevHeight) < 2;

        if (isStable) {
            stableFrames += 1;
            if (stableFrames >= 2) {
                return;
            }
        } else {
            stableFrames = 0;
        }

        prevWidth = width;
        prevHeight = height;
    }
    // Timeout reached - proceed anyway to prevent hanging
}

async function waitForLayoutSettle(maxWaitMs = 2000) {
    const started = Date.now();
    let prevWidth = 0;
    let prevHeight = 0;
    let stableCount = 0;
    const requiredStable = 3;

    while (Date.now() - started < maxWaitMs) {
        await nextAnimationFrame();
        const stage = document.getElementById('flipbookStage');
        if (!stage) { stableCount = 0; continue; }

        const w = stage.clientWidth;
        const h = stage.clientHeight;

        if (w > 100 && h > 100 && Math.abs(w - prevWidth) < 2 && Math.abs(h - prevHeight) < 2) {
            stableCount++;
            if (stableCount >= requiredStable) return true;
        } else {
            stableCount = 0;
        }
        prevWidth = w;
        prevHeight = h;
    }
    return false;
}

function updateZoomLabel() {
    const zoomLabel = document.getElementById('pdfZoomValue');
    if (!zoomLabel) return;
    zoomLabel.textContent = `${Math.round(currentZoom * 100)}%`;
}

function applyFlipZoom() {
    const flipbook = document.getElementById('pdfFlipBook');
    if (!flipbook) return;
    flipbook.style.transform = `scale(${currentZoom})`;
    updateZoomLabel();
}

function spreadEndPage(spreadStart) {
    return Math.min(spreadStart + 1, totalPdfPages);
}

function clampPageNumber(page) {
    const safePage = Number.isFinite(page) ? Math.floor(page) : 1;
    return Math.min(Math.max(1, safePage), Math.max(1, totalPdfPages));
}

function getFlipIndexForMode(pageNumber, mode) {
    const safePage = clampPageNumber(pageNumber);
    if (mode === 'single') {
        return safePage - 1;
    }

    const spreadStart = safePage % 2 === 0 ? safePage - 1 : safePage;
    return Math.max(0, spreadStart - 1);
}

function isSinglePageMode() {
    return window.matchMedia('(max-width: 760px)').matches;
}

/**
 * Content area for PDF layout: modal header/footer subtracted from the viewport.
 * Used for fullscreen and for narrow/mobile where we use plain canvases (no PageFlip).
 */
function getViewerContentBox() {
    const container = document.getElementById('pdfViewerContainer');
    const header = container?.querySelector('.pdf-viewer-header');
    const footer = container?.querySelector('.pdf-viewer-footer');
    const hh = header ? Math.ceil(header.getBoundingClientRect().height) : 56;
    const fh = footer ? Math.ceil(footer.getBoundingClientRect().height) : 72;
    const horizontalGutter = 24;
    const verticalGutter = 20;
    const w = Math.max(240, Math.floor(window.innerWidth - horizontalGutter));
    const h = Math.max(280, Math.floor(window.innerHeight - hh - fh - verticalGutter));
    return { width: w, height: h };
}

function useSimpleCanvasViewer() {
    // Hybrid strategy:
    // - Fullscreen: always use simple PDF.js canvases.
    // - Narrow/mobile: use simple viewer (PageFlip is fragile there).
    // - If PageFlip has thrown/failed once, permanently fall back to simple viewer.
    return isFullscreenMode() || isSinglePageMode() || pageFlipBroken;
}

/**
 * Pin #flipbookStage to a real pixel size in fullscreen so flex does not leave it at 0 height
 * (PageFlip/WebGL would render invisible content while PDF math used window innerHeight).
 */
function applyFlipbookStageLayout() {
    const stage = document.getElementById('flipbookStage');
    if (!stage) {
        return;
    }

    if (isFullscreenMode()) {
        const { width: boxW, height: boxH } = getViewerContentBox();
        stage.style.width = '100%';
        stage.style.boxSizing = 'border-box';
        stage.style.minHeight = `${boxH}px`;
        stage.style.height = `${boxH}px`;
        stage.style.maxHeight = `${boxH}px`;
    } else if (isSinglePageMode()) {
        const { height: boxH } = getViewerContentBox();
        stage.style.width = '100%';
        stage.style.boxSizing = 'border-box';
        stage.style.minHeight = `${boxH}px`;
        stage.style.height = `${boxH}px`;
        stage.style.maxHeight = `${boxH}px`;
    } else {
        stage.style.removeProperty('width');
        stage.style.removeProperty('box-sizing');
        stage.style.removeProperty('min-height');
        stage.style.removeProperty('height');
        stage.style.removeProperty('max-height');
    }
}

function getSafePdfUrl(pdfPath) {
    return encodeURI(pdfPath);
}

function getCurrentSpreadStart() {
    if (simpleViewerActive) {
        return simpleSpreadStart;
    }
    if (!pageFlipInstance) return 1;
    const index = Math.max(0, pageFlipInstance.getCurrentPageIndex() || 0);
    return index + 1;
}

function zoomInPDF() {
    currentZoom = Math.min(2, currentZoom + 0.1);
    applyFlipZoom();
}

function zoomOutPDF() {
    currentZoom = Math.max(0.7, currentZoom - 0.1);
    applyFlipZoom();
}

function fitPDFViewer() {
    currentZoom = 1;
    applyFlipZoom();
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prevPdfBtn');
    const nextBtn = document.getElementById('nextPdfBtn');
    const spreadStart = getCurrentSpreadStart();
    const singlePage = currentPageMode === 'single';
    const hasPrev = spreadStart > 1;
    const hasNext = singlePage ? spreadStart < totalPdfPages : spreadEndPage(spreadStart) < totalPdfPages;

    prevBtn.disabled = isFlipping || !hasPrev;
    nextBtn.disabled = isFlipping || !hasNext;

    prevBtn.style.opacity = prevBtn.disabled ? '0.35' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.35' : '1';
}

function getFlipDimensions() {
    const stage = document.getElementById('flipbookStage');
    if (!stage) {
        return {
            pageWidth: 400,
            pageHeight: 380
        };
    }

    void stage.offsetHeight;

    const isFullscreen = isFullscreenMode();
    const narrowUi = isSinglePageMode();

    let stageWidth = stage.clientWidth;
    let stageHeight = stage.clientHeight;

    if (isFullscreen || narrowUi) {
        const box = getViewerContentBox();
        stageWidth = box.width;
        stageHeight = box.height;
    } else {
        if (stageWidth <= 0 || !Number.isFinite(stageWidth)) {
            stageWidth = Math.min(900, window.innerWidth * 0.86);
        }

        if (stageHeight <= 0 || !Number.isFinite(stageHeight)) {
            stageHeight = Math.min(760, window.innerHeight * 0.72);
        }
    }

    const singlePage = currentPageMode === 'single';
    const safeWidth = Math.max(220, stageWidth - 24);
    const safeHeight = Math.max(300, stageHeight - 24);
    const ratio = Number.isFinite(pdfPageAspectRatio) && pdfPageAspectRatio > 0
        ? pdfPageAspectRatio
        : 0.707;

    let pageWidth;
    let pageHeight;

    if (singlePage) {
        pageWidth = Math.min(safeWidth, safeHeight * ratio);
        pageHeight = pageWidth / ratio;
    } else {
        const spreadWidth = safeWidth / 2;
        pageWidth = Math.min(spreadWidth, safeHeight * ratio);
        pageHeight = pageWidth / ratio;
    }

    return {
        pageWidth: Math.max(220, Math.floor(pageWidth)),
        pageHeight: Math.max(300, Math.floor(pageHeight))
    };
}

async function buildSimpleCanvasViewer(preservedStart) {
    const host = document.getElementById('pdfFlipBook');
    const stage = document.getElementById('flipbookStage');
    if (!host || !pdfDoc) {
        return;
    }

    if (pageFlipInstance) {
        pageFlipInstance.destroy();
        pageFlipInstance = null;
    }

    simpleViewerActive = true;
    simpleSpreadStart = clampPageNumber(preservedStart);
    currentPageMode = isSinglePageMode() ? 'single' : 'spread';
    if (currentPageMode === 'spread' && simpleSpreadStart % 2 === 0) {
        simpleSpreadStart -= 1;
    }

    if (stage) {
        stage.classList.add('flipbook-stage--simple-fs');
    }

    const stageTimeout = 800;
    await waitForStageLayout(stageTimeout);

    const { pageWidth, pageHeight } = getFlipDimensions();
    if (!Number.isFinite(pageWidth) || !Number.isFinite(pageHeight) || pageWidth <= 0 || pageHeight <= 0) {
        console.warn('Simple canvas viewer: invalid dimensions', { pageWidth, pageHeight });
        scheduleFlipbookRebuild(520);
        return;
    }

    host.innerHTML = '';
    host.className = 'pdf-flipbook pdf-fullscreen-simple';
    host.style.width = '100%';
    host.style.maxWidth = '100%';
    host.style.height = 'auto';
    host.style.display = 'flex';
    host.style.alignItems = 'center';
    host.style.justifyContent = 'center';
    host.style.flexWrap = 'wrap';
    host.style.boxSizing = 'border-box';

    const wrap = document.createElement('div');
    wrap.className = 'pdf-fullscreen-simple-inner';

    if (currentPageMode === 'single') {
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-fullscreen-simple-canvas';
        wrap.appendChild(canvas);
        await renderPDFPageToCanvas(simpleSpreadStart, canvas, pageWidth, pageHeight);
    } else {
        const left = document.createElement('canvas');
        const right = document.createElement('canvas');
        left.className = 'pdf-fullscreen-simple-canvas';
        right.className = 'pdf-fullscreen-simple-canvas';
        wrap.appendChild(left);
        wrap.appendChild(right);
        await renderPDFPageToCanvas(simpleSpreadStart, left, pageWidth, pageHeight);
        const rightPage = spreadEndPage(simpleSpreadStart);
        if (rightPage > simpleSpreadStart) {
            await renderPDFPageToCanvas(rightPage, right, pageWidth, pageHeight);
        } else {
            const ctx = right.getContext('2d');
            right.width = left.width;
            right.height = left.height;
            right.style.width = left.style.width;
            right.style.height = left.style.height;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, right.width, right.height);
        }
    }

    host.appendChild(wrap);
    isFlipping = false;
    applyFlipZoom();
    updateSpreadCounter();
    updateNavButtons();
    hideLoadingOverlay();
}

async function renderFullscreenSimplePages() {
    if (!simpleViewerActive || !pdfDoc) {
        return;
    }
    const host = document.getElementById('pdfFlipBook');
    const wrap = host?.querySelector('.pdf-fullscreen-simple-inner');
    if (!host || !wrap) {
        return;
    }

    showLoadingOverlay('Rendering…');
    try {
        applyFlipbookStageLayout();
        await waitForStageLayout(500);
        const { pageWidth, pageHeight } = getFlipDimensions();
        const canvases = wrap.querySelectorAll('canvas');
        if (currentPageMode === 'single' && canvases[0]) {
            await renderPDFPageToCanvas(simpleSpreadStart, canvases[0], pageWidth, pageHeight);
        } else if (canvases.length >= 2) {
            await renderPDFPageToCanvas(simpleSpreadStart, canvases[0], pageWidth, pageHeight);
            const rightPage = spreadEndPage(simpleSpreadStart);
            if (rightPage > simpleSpreadStart) {
                await renderPDFPageToCanvas(rightPage, canvases[1], pageWidth, pageHeight);
            } else {
                const left = canvases[0];
                const right = canvases[1];
                right.width = left.width;
                right.height = left.height;
                right.style.width = left.style.width;
                right.style.height = left.style.height;
                const ctx = right.getContext('2d');
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, right.width, right.height);
            }
        }
        applyFlipZoom();
        updateSpreadCounter();
        updateNavButtons();
    } finally {
        hideLoadingOverlay();
    }
}

async function renderPDFPageToCanvas(pageNum, canvas, pageWidth, pageHeight) {
    const page = await pdfDoc.getPage(pageNum);
    const baseViewport = page.getViewport({ scale: 1 });
    const fitScale = Math.max(0.4, Math.min(pageWidth / baseViewport.width, pageHeight / baseViewport.height));
    const capScale = isFullscreenMode() || isSinglePageMode();
    const maxOutputScale = capScale ? 1.75 : 2;
    const outputScale = Math.min(maxOutputScale, Math.max(1, (window.devicePixelRatio || 1) * 1.1));
    const viewport = page.getViewport({ scale: fitScale * outputScale });

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    canvas.style.width = `${Math.floor(viewport.width / outputScale)}px`;
    canvas.style.height = `${Math.floor(viewport.height / outputScale)}px`;

    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: context, viewport }).promise;
}

async function buildFlipbookPages() {
    const host = document.getElementById('pdfFlipBook');
    if (!host || !pdfDoc) return;

    applyFlipbookStageLayout();

    if (useSimpleCanvasViewer()) {
        const preserved = pageFlipInstance
            ? getCurrentSpreadStart()
            : (simpleViewerActive ? simpleSpreadStart : 1);
        await buildSimpleCanvasViewer(preserved);
        return;
    }

    simpleViewerActive = false;
    simpleSpreadStart = 1;
    document.getElementById('flipbookStage')?.classList.remove('flipbook-stage--simple-fs');
    host.classList.remove('pdf-fullscreen-simple');
    host.style.display = '';
    host.style.alignItems = '';
    host.style.justifyContent = '';
    host.style.flexWrap = '';
    host.style.boxSizing = '';
    host.style.maxWidth = '';

    const stageTimeout = 1400;
    await waitForStageLayout(stageTimeout);

    currentPageMode = isSinglePageMode() ? 'single' : 'spread';

    const { pageWidth, pageHeight } = getFlipDimensions();
    if (!Number.isFinite(pageWidth) || !Number.isFinite(pageHeight) || pageWidth <= 0 || pageHeight <= 0) {
        console.warn('Invalid flipbook dimensions, retrying rebuild...', { pageWidth, pageHeight });
        scheduleFlipbookRebuild(520);
        return;
    }

    try {
        const pageNodes = [];
        for (let pageNum = 1; pageNum <= totalPdfPages; pageNum += 1) {
            const pageElement = document.createElement('div');
            pageElement.className = 'pdf-flip-page';
            pageElement.style.width = `${pageWidth}px`;
            pageElement.style.height = `${pageHeight}px`;

            const canvas = document.createElement('canvas');
            canvas.className = 'pdf-flip-canvas';
            await renderPDFPageToCanvas(pageNum, canvas, pageWidth, pageHeight);
            pageElement.appendChild(canvas);
            pageNodes.push(pageElement);
        }

        if (currentPageMode === 'spread' && totalPdfPages % 2 !== 0) {
            const blankPage = document.createElement('div');
            blankPage.className = 'pdf-flip-page';
            blankPage.style.width = `${pageWidth}px`;
            blankPage.style.height = `${pageHeight}px`;
            blankPage.innerHTML = '<div class="pdf-flip-empty" aria-hidden="true"></div>';
            pageNodes.push(blankPage);
        }

        if (typeof St === 'undefined' || typeof St.PageFlip !== 'function') {
            throw new Error('PageFlip CDN failed to load');
        }

        if (pageFlipInstance) {
            pageFlipInstance.destroy();
            pageFlipInstance = null;
        }

        host.innerHTML = '';
        const flipbookWidth = currentPageMode === 'single' ? pageWidth : pageWidth * 2;
        host.style.width = `${flipbookWidth}px`;
        host.style.height = `${pageHeight}px`;
        const fragment = document.createDocumentFragment();
        pageNodes.forEach((pageNode) => {
            fragment.appendChild(pageNode);
        });
        host.appendChild(fragment);

        const reduceMotion = typeof window.matchMedia === 'function'
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        pageFlipInstance = new St.PageFlip(host, {
            width: pageWidth,
            height: pageHeight,
            size: 'fixed',
            minWidth: 220,
            maxWidth: 2200,
            minHeight: 300,
            maxHeight: 2200,
            drawShadow: true,
            maxShadowOpacity: 0.42,
            showCover: false,
            mobileScrollSupport: false,
            useMouseEvents: false,
            swipeDistance: 20,
            flippingTime: reduceMotion ? 200 : 900,
            autoSize: false,
            usePortrait: currentPageMode === 'single',
            startPage: 0
        });

        pageFlipInstance.loadFromHTML(host.querySelectorAll('.pdf-flip-page'));

        pageFlipInstance.on('flip', () => {
            updateSpreadCounter();
            updateNavButtons();
        });

        pageFlipInstance.on('changeState', (event) => {
            isFlipping = event.data === 'flipping' || event.data === 'user_fold';
            updateNavButtons();
        });

        applyFlipZoom();
        updateSpreadCounter();
        updateNavButtons();
        hideLoadingOverlay();

        if (pageFlipInstance && typeof pageFlipInstance.update === 'function') {
            requestAnimationFrame(() => {
                try {
                    pageFlipInstance.update();
                } catch (e) {
                    // Optional API; ignore failures.
                }
            });
        }
    } catch (error) {
        console.error('PageFlip initialization failed, switching to simple PDF viewer:', error);
        pageFlipBroken = true;
        await buildSimpleCanvasViewer(getCurrentSpreadStart());
    }
}

function updateSpreadCounter() {
    const spreadStart = getCurrentSpreadStart();
    const modeText = document.getElementById('pdfPageMode');

    if (currentPageMode === 'single') {
        document.getElementById('currentPdfPage').textContent = `${spreadStart}`;
        if (modeText) {
            modeText.textContent = 'Single Page';
        }
    } else {
        const end = spreadEndPage(spreadStart);
        document.getElementById('currentPdfPage').textContent = `${spreadStart}-${end}`;
        if (modeText) {
            modeText.textContent = 'Spread';
        }
    }

    document.getElementById('totalPdfPages').textContent = `${totalPdfPages}`;
}

async function showNotFound() {
    const container = document.getElementById('pdfCanvasContainer');
    const safePdfUrl = currentPDFPath ? getSafePdfUrl(currentPDFPath) : '';
    const fallbackAction = safePdfUrl
        ? `<p><a href="${safePdfUrl}" target="_blank" rel="noopener noreferrer" class="pdf-action-link" style="margin-top: 0.6rem; display: inline-flex;"><i class="fa-solid fa-up-right-from-square"></i> Open PDF in New Tab</a></p>`
        : '';
    container.innerHTML = `<div class="pdf-not-found"><div class="pdf-not-found-icon"><i class="fa-solid fa-file-circle-xmark"></i></div><p>Could not load this PDF in flipbook mode.</p><p>Please use Download instead.</p>${fallbackAction}</div>`;
}

function resetViewerCanvasMarkup() {
    const container = document.getElementById('pdfCanvasContainer');
    container.innerHTML = `
        <div class="flipbook-stage" id="flipbookStage">
            <div class="flipbook-shadow" aria-hidden="true"></div>
            <div class="flipbook-gutter" aria-hidden="true"></div>
            <button class="flip-nav-fixed flip-nav-left" onclick="previousPDFPage()" title="Previous spread" aria-label="Previous spread" id="prevPdfBtn">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <div id="pdfFlipBook" class="pdf-flipbook" aria-label="PDF Flipbook"></div>
            <button class="flip-nav-fixed flip-nav-right" onclick="nextPDFPage()" title="Next spread" aria-label="Next spread" id="nextPdfBtn">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
        <div class="pdf-loading-overlay">
            <div class="pdf-loading-spinner"></div>
            <div class="pdf-loading-text">Loading document…</div>
        </div>
    `;
}

async function openPDFViewer(pdfPath, pdfTitle) {
    currentPDFPath = pdfPath;
    currentZoom = 1;
    updateZoomLabel();
    document.getElementById('pdfViewerTitle').textContent = pdfTitle;
    document.getElementById('pdfViewerModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    resetViewerCanvasMarkup();
    attachPdfViewerResizeObserver();
    showLoadingOverlay('Loading document…');

    try {
        const safePdfUrl = getSafePdfUrl(pdfPath);
        pdfDoc = await pdfjsLib.getDocument({ url: safePdfUrl }).promise;
        totalPdfPages = pdfDoc.numPages;

        const firstPage = await pdfDoc.getPage(1);
        const firstViewport = firstPage.getViewport({ scale: 1 });
        const nextAspectRatio = firstViewport.width / firstViewport.height;
        pdfPageAspectRatio = Number.isFinite(nextAspectRatio) && nextAspectRatio > 0
            ? nextAspectRatio
            : 0.707;

        await buildFlipbookPages();
    } catch (error) {
        console.error('PDF flipbook load failed:', error);
        hideLoadingOverlay();
        await showNotFound();
    }
}

function nextPDFPage() {
    if (simpleViewerActive) {
        if (currentPageMode === 'single') {
            if (simpleSpreadStart >= totalPdfPages) return;
            simpleSpreadStart += 1;
        } else {
            if (spreadEndPage(simpleSpreadStart) >= totalPdfPages) return;
            simpleSpreadStart += 2;
        }
        void renderFullscreenSimplePages();
        return;
    }

    if (!pageFlipInstance || isFlipping) return;

    const currentIndex = Math.max(0, pageFlipInstance.getCurrentPageIndex() || 0);
    const step = currentPageMode === 'single' ? 1 : 2;
    const targetIndex = Math.min(pageFlipInstance.getPageCount() - 1, currentIndex + step);

    if (targetIndex > currentIndex) {
        if (typeof pageFlipInstance.flip === 'function') {
            pageFlipInstance.flip(targetIndex, 'top');
        } else {
            pageFlipInstance.turnToPage(targetIndex);
        }
    }
}

function previousPDFPage() {
    if (simpleViewerActive) {
        if (currentPageMode === 'single') {
            if (simpleSpreadStart <= 1) return;
            simpleSpreadStart -= 1;
        } else {
            if (simpleSpreadStart <= 1) return;
            simpleSpreadStart -= 2;
        }
        void renderFullscreenSimplePages();
        return;
    }

    if (!pageFlipInstance || isFlipping) return;

    const currentIndex = Math.max(0, pageFlipInstance.getCurrentPageIndex() || 0);
    const step = currentPageMode === 'single' ? 1 : 2;
    const targetIndex = Math.max(0, currentIndex - step);

    if (targetIndex < currentIndex) {
        if (typeof pageFlipInstance.flip === 'function') {
            pageFlipInstance.flip(targetIndex, 'bottom');
        } else {
            pageFlipInstance.turnToPage(targetIndex);
        }
    }
}

function closePDFViewer() {
    if (fullscreenSyncTimer) {
        clearTimeout(fullscreenSyncTimer);
        fullscreenSyncTimer = null;
    }
    if (viewerLayoutDebounceTimer) {
        clearTimeout(viewerLayoutDebounceTimer);
        viewerLayoutDebounceTimer = null;
    }
    detachPdfViewerResizeObserver();
    clearPseudoFullscreen();
    void exitNativeFullscreenIfNeeded();

    document.getElementById('pdfViewerModal').classList.remove('active');
    document.body.style.overflow = '';

    if (pageFlipInstance) {
        pageFlipInstance.destroy();
        pageFlipInstance = null;
    }

    simpleViewerActive = false;
    simpleSpreadStart = 1;

    resetViewerCanvasMarkup();
    pdfDoc = null;
    totalPdfPages = 1;
    isFlipping = false;
    currentZoom = 1;
    currentPageMode = 'spread';
    pdfPageAspectRatio = 0.707;
    document.getElementById('currentPdfPage').textContent = '1';
    document.getElementById('totalPdfPages').textContent = '1';
    const modeText = document.getElementById('pdfPageMode');
    if (modeText) {
        modeText.textContent = 'Spread';
    }
    updateZoomLabel();
    updateNavButtons();
}

// Ensure core viewer APIs are globally accessible for inline HTML handlers.
// This also guards against any future bundling/strict-mode changes.
window.openPDFViewer = openPDFViewer;
window.closePDFViewer = closePDFViewer;

function downloadCurrentPDF() {
    if (currentPDFPath) {
        const fileName = currentPDFPath.split('/').pop();
        const link = document.createElement('a');
        link.href = getSafePdfUrl(currentPDFPath);
        link.download = fileName;
        link.click();
    }
}

async function rebuildFlipbookAtCurrentPosition(forcedPageNumber = null) {
    const isViewerOpen = document.getElementById('pdfViewerModal').classList.contains('active');
    if (!pdfDoc || isFlipping || !isViewerOpen) {
        return;
    }

    if (rebuildInProgress) {
        rebuildQueued = true;
        return;
    }

    rebuildInProgress = true;
    showLoadingOverlay('Rendering pages…');

    try {
        await waitForStageLayout();
        const rememberedPage = forcedPageNumber === null
            ? getCurrentSpreadStart()
            : clampPageNumber(forcedPageNumber);

        await buildFlipbookPages();
        // ⚠️ CRITICAL: buildFlipbookPages() calls hideLoadingOverlay() internally
        // But ONLY if it completes successfully. Make sure overlay is always hidden.
        hideLoadingOverlay();

        if (pageFlipInstance) {
            const mappedIndex = getFlipIndexForMode(rememberedPage, currentPageMode);
            const safeIndex = Math.min(Math.max(0, mappedIndex), pageFlipInstance.getPageCount() - 1);
            pageFlipInstance.turnToPage(safeIndex);
        }

        updateSpreadCounter();
        updateNavButtons();
    } catch (error) {
        console.error('Flipbook rebuild failed:', error);
        hideLoadingOverlay();
    } finally {
        rebuildInProgress = false;

        if (rebuildQueued) {
            rebuildQueued = false;
            setTimeout(() => {
                rebuildFlipbookAtCurrentPosition();
            }, 80);
        }
    }
}

function scheduleFlipbookRebuild(delay = 220) {
    if (rebuildTimer) {
        clearTimeout(rebuildTimer);
    }

    rebuildTimer = setTimeout(() => {
        rebuildTimer = null;
        rebuildFlipbookAtCurrentPosition();
    }, delay);
}

/* ============ \"FULLSCREEN\" BUTTON – OPEN IN NEW TAB ============ */

// In this revised version, we completely remove browser fullscreen usage for the viewer.
// The button simply opens the current PDF in a new tab, which is the most robust behavior
// across browsers and devices.

function isFullscreenMode() {
    // We no longer support browser fullscreen for the viewer.
    return false;
}

function scheduleFullscreenLayoutSync() {
    // No-op: kept only so other code paths can safely call it without errors.
}

async function executeFullscreenLayoutSync() {
    // No-op: legacy hook disabled now that fullscreen is removed.
}

function updateFullscreenButtonUI() {
    const btn = document.getElementById('pdfFullscreenBtn');
    const icon = document.getElementById('pdfFullscreenIcon');
    const label = document.getElementById('pdfFullscreenLabel');

    if (!btn || !icon || !label) return;

    // Always show the action as \"Open in new tab\" now.
    btn.title = currentPDFPath ? 'Open PDF in new tab' : 'No PDF loaded';
    btn.setAttribute('aria-label', currentPDFPath ? 'Open PDF in new tab' : 'No PDF loaded');
    icon.className = 'fa-solid fa-up-right-from-square';
    label.textContent = 'Open in New Tab';
}

async function exitNativeFullscreenIfNeeded() {
    // Defensive cleanup: even though fullscreen is not used now, keep this available
    // so closePDFViewer never crashes if browser fullscreen state exists.
    if (document.fullscreenElement && typeof document.exitFullscreen === 'function') {
        try { await document.exitFullscreen(); } catch (e) {}
    } else if (document.webkitFullscreenElement && typeof document.webkitExitFullscreen === 'function') {
        try { document.webkitExitFullscreen(); } catch (e) {}
    } else if (document.mozFullScreenElement && typeof document.mozCancelFullScreen === 'function') {
        try { document.mozCancelFullScreen(); } catch (e) {}
    } else if (document.msFullscreenElement && typeof document.msExitFullscreen === 'function') {
        try { document.msExitFullscreen(); } catch (e) {}
    }
}

function togglePDFFullscreen() {
    if (!currentPDFPath) return;
    const url = getSafePdfUrl(currentPDFPath);
    window.open(url, '_blank', 'noopener');
}

/* ============ EVENT LISTENERS - FRESH ============ */

document.getElementById('pdfViewerModal').addEventListener('click', (e) => {
    if (e.target.id === 'pdfViewerModal') closePDFViewer();
});

document.addEventListener('keydown', (e) => {
    if (!document.getElementById('pdfViewerModal').classList.contains('active')) return;

    if (e.key === 'ArrowRight') nextPDFPage();
    if (e.key === 'ArrowLeft') previousPDFPage();

    if (e.key === 'Escape') {
        closePDFViewer();
    }
});

// Previously: attempted to rebuild the viewer on tab visibility changes.
// This caused the modal to become non-interactive in some browsers after
// switching tabs, so this hook is now intentionally a no-op.
document.addEventListener('visibilitychange', () => {
    // Intentionally left blank.
});

window.addEventListener('resize', () => {
    if (!pdfDoc || !document.getElementById('pdfViewerModal').classList.contains('active') || isFlipping || fullscreenTransitionActive) {
        return;
    }
    if (!pageFlipInstance && !simpleViewerActive) {
        return;
    }

    if (isFullscreenMode()) {
        scheduleFullscreenLayoutSync();
        return;
    }

    scheduleFlipbookRebuild(220);
});

document.getElementById('year').textContent = new Date().getFullYear();
updateFullscreenButtonUI();

// When returning to this page via back/forward cache after opening a PDF
// in a separate tab, make sure the modal is not left open automatically.
// Note: we intentionally do NOT change modal state on pageshow (back/forward cache)
// so that opening a PDF in a new tab does not implicitly close or reopen the viewer
// when the user returns to this page.