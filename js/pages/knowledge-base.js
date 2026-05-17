import { knowledgeBaseSections } from './knowledge-base-data.js';

const state = {
    activeId: null,
    topicId: 'all',
    view: 'map',
    openSectionId: null,
    counterIndex: 0
};

const refs = {
    sectionList: document.getElementById('kb-section-list'),
    answerCard: document.getElementById('kb-answer-card'),
    suggestions: document.getElementById('kb-suggestions'),
    branchStrip: document.getElementById('kb-branch-strip'),
    topicFilter: document.getElementById('kb-topic-filter'),
    topicFilterToggle: document.getElementById('kb-topic-filter-toggle'),
    topicFilterLabel: document.getElementById('kb-topic-filter-label'),
    topicFilterMenu: document.getElementById('kb-topic-filter-menu'),
    fullscreen: document.getElementById('kb-fullscreen'),
    counterGrid: document.getElementById('kb-counter-grid'),
    counterModal: document.getElementById('kb-counter-modal'),
    counterDialogBody: document.getElementById('kb-counter-dialog-body'),
    counterPrev: document.getElementById('kb-counter-prev'),
    counterNext: document.getElementById('kb-counter-next'),
    counterPosition: document.getElementById('kb-counter-position'),
    topicCount: document.getElementById('kb-topic-count'),
    questionCount: document.getElementById('kb-question-count'),
    mapView: document.getElementById('kb-map-view'),
    mapFullscreen: document.getElementById('kb-map-fullscreen'),
    basicView: document.getElementById('kb-basic-view'),
    mapPrimary: document.getElementById('kb-map-primary'),
    mapAnswer: document.getElementById('kb-map-answer'),
    mapNext: document.getElementById('kb-map-next'),
    mapLines: document.getElementById('kb-map-lines'),
    mobileAnswerModal: document.getElementById('kb-mobile-answer-modal'),
    mobileAnswerBody: document.getElementById('kb-mobile-answer-body'),
    viewButtons: document.querySelectorAll('[data-view]')
};

const knowledgeSections = knowledgeBaseSections.filter((section) => !section.counterarguments);
const counterSection = knowledgeBaseSections.find((section) => section.counterarguments);
const counterItems = counterSection?.primary || [];
const flatItems = flattenKnowledge();
const MOBILE_KB_QUERY = '(max-width: 760px)';

function flattenKnowledge() {
    const items = [];

    knowledgeBaseSections.forEach((section) => {
        section.primary.forEach((primary) => {
            items.push({
                id: primary.id,
                type: section.counterarguments ? 'Counterargument' : 'Primary Question',
                section,
                primary,
                question: primary.question,
                answer: primary.answer,
                number: primary.number,
                groups: primary.groups,
                parentId: null
            });

            getNestedQuestions(primary).forEach((nestedQuestion, index) => {
                items.push({
                    id: nestedQuestion.question.id,
                    type: nestedQuestion.group.title,
                    section,
                    primary,
                    group: nestedQuestion.group,
                    question: nestedQuestion.question.question,
                    answer: nestedQuestion.question.answer,
                    number: `${primary.number}.${index + 1}`,
                    groups: [],
                    parentId: primary.id
                });
            });
        });
    });

    return items;
}

function getNestedQuestions(primary) {
    return primary.groups.flatMap((group) => group.questions.map((question) => ({ group, question })));
}

function initKnowledgeBase() {
    if (!refs.sectionList || !refs.answerCard) return;

    const defaultItem = flatItems.find((item) => !item.section.counterarguments);
    state.activeId = defaultItem?.id || flatItems[0]?.id;
    if (isNarrowKnowledgeMobile()) state.view = 'basic';
    if (refs.mobileAnswerModal && refs.mobileAnswerModal.parentElement !== document.body) {
        document.body.appendChild(refs.mobileAnswerModal);
    }

    renderStats();
    renderTopicFilter();
    renderTree();
    renderCounterarguments();
    renderActive();
    renderMap();
    syncViewVisibility();
    bindEvents();
}

function renderTopicFilter() {
    if (!refs.topicFilterMenu || !refs.topicFilterLabel) return;

    refs.topicFilterMenu.innerHTML = [
        topicFilterOption('all', 'All', 'All main topics'),
        ...knowledgeSections.map((section) => (
            topicFilterOption(section.id, section.number, section.title)
        ))
    ].join('');

    updateTopicFilterLabel();
}

function topicFilterOption(id, number, title) {
    const isActive = state.topicId === id;
    return `
        <button class="kb-topic-filter-option ${isActive ? 'active' : ''}" type="button" role="option" data-topic="${escapeAttr(id)}" aria-selected="${isActive ? 'true' : 'false'}">
            <strong>${escapeHtml(number)}</strong>
            <span>${escapeHtml(title)}</span>
        </button>
    `;
}

function updateTopicFilterLabel() {
    const activeSection = knowledgeSections.find((section) => section.id === state.topicId);
    refs.topicFilterLabel.textContent = activeSection ? `${activeSection.number}. ${activeSection.title}` : 'All main topics';
}

function renderStats() {
    const primaryCount = knowledgeSections.reduce((count, section) => count + section.primary.length, 0);
    const questionCount = flatItems.length;

    if (refs.topicCount) refs.topicCount.textContent = String(knowledgeSections.length);
    if (refs.questionCount) refs.questionCount.textContent = String(questionCount);

    document.documentElement.style.setProperty('--kb-primary-count', primaryCount);
}

function renderTree() {
    const html = getFilteredSections().map((section) => {
        const isOpen = state.topicId !== 'all' ? true : state.openSectionId === section.id;

        return `
            <div class="kb-section-group ${isOpen ? 'is-open' : 'is-collapsed'}">
                <button class="kb-section-toggle ${isOpen ? 'active' : ''}" type="button" data-section="${escapeAttr(section.id)}" aria-expanded="${isOpen ? 'true' : 'false'}">
                    <span class="kb-section-number">${escapeHtml(section.number)}</span>
                    <span>${highlight(section.title)}</span>
                    <i class="fa-solid fa-chevron-${isOpen ? 'up' : 'down'}"></i>
                </button>
                <div class="kb-tree-children ${isOpen ? 'is-visible' : 'is-hidden-tree'}" ${isOpen ? '' : 'hidden'} aria-hidden="${isOpen ? 'false' : 'true'}">
                    ${section.primary.map((primary) => renderPrimaryNode(section, primary)).join('')}
                </div>
            </div>
        `;
    }).join('');

    refs.sectionList.innerHTML = html || '<div class="kb-empty compact">No questions match the current filter.</div>';
}

function renderPrimaryNode(section, primary) {
    const nestedQuestions = getNestedQuestions(primary);

    let nestedIndex = 0;

    return `
        ${questionButton(primary.id, primary.number, primary.question, 'Primary')}
        ${nestedQuestions.map(({ group, question }) => questionButton(question.id, `${primary.number}.${++nestedIndex}`, question.question, group.title)).join('')}
    `;
}

function questionButton(id, number, question, label) {
    return `
        <button class="kb-tree-question ${id === state.activeId ? 'active' : ''}" type="button" data-id="${escapeAttr(id)}">
            <strong>${escapeHtml(number)}</strong>
            <span>${highlight(question)}<br><small>${escapeHtml(label)}</small></span>
        </button>
    `;
}

function renderActive() {
    const item = getActiveItem();
    if (!item) {
        refs.answerCard.innerHTML = '<div class="kb-empty">Select a question to view the answer.</div>';
        refs.suggestions.innerHTML = '';
        refs.branchStrip.innerHTML = '';
        renderMobileAnswer();
        return;
    }

    renderBranch(item);
    
    const currentIndex = flatItems.findIndex((candidate) => candidate.id === item.id);
    const prevItem = currentIndex > 0 ? flatItems[currentIndex - 1] : null;
    const nextItem = currentIndex < flatItems.length - 1 ? flatItems[currentIndex + 1] : null;

    let navHtml = '';
    if (prevItem || nextItem) {
        navHtml = `
            <div class="kb-presentation-nav">
                <button type="button" class="prev-btn" ${!prevItem ? 'disabled' : `data-id="${escapeAttr(prevItem?.id)}"`}>
                    <i class="fa-solid fa-arrow-left"></i> Previous Question
                </button>
                <button type="button" class="next-btn" ${!nextItem ? 'disabled' : `data-id="${escapeAttr(nextItem?.id)}"`}>
                    Next Question <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        `;
    }

    refs.answerCard.innerHTML = `
        <div class="kb-answer-meta">
            <span class="kb-answer-number"><i class="fa-solid fa-location-dot"></i>${escapeHtml(item.number)}</span>
            <span class="kb-answer-kind">${escapeHtml(item.type)}</span>
        </div>
        <h3>${highlight(item.question)}</h3>
        <div class="kb-answer-body">${markdownToHtml(item.answer)}</div>
        ${navHtml}
    `;
    renderSuggestions(item);
    renderMap();
    renderMobileAnswer();
    updateUrlHash(item.id);
}

function renderMobileAnswer() {
    if (!refs.mobileAnswerBody) return;

    const item = getActiveItem();
    if (!item) {
        refs.mobileAnswerBody.innerHTML = '<div class="kb-empty">Select a question to view the answer.</div>';
        return;
    }

    const mobileItems = flatItems.filter((candidate) => !candidate.section.counterarguments && itemMatchesTopic(candidate));
    const currentIndex = mobileItems.findIndex((candidate) => candidate.id === item.id);
    const previousItem = currentIndex > 0 ? mobileItems[currentIndex - 1] : null;
    const nextItem = currentIndex >= 0 && currentIndex < mobileItems.length - 1 ? mobileItems[currentIndex + 1] : null;
    const suggestions = getSuggestions(item).slice(0, 6);

    refs.mobileAnswerBody.innerHTML = `
        <div class="kb-answer-meta">
            <span class="kb-answer-number"><i class="fa-solid fa-location-dot"></i>${escapeHtml(item.number)}</span>
            <span class="kb-answer-kind">${escapeHtml(item.type)}</span>
        </div>
        <h3 id="kb-mobile-answer-title">${highlight(item.question)}</h3>
        <div class="kb-answer-body">${markdownToHtml(item.answer)}</div>
        <div class="kb-mobile-answer-nav">
            <button type="button" class="prev-btn" ${!previousItem ? 'disabled' : `data-id="${escapeAttr(previousItem.id)}"`}>
                <i class="fa-solid fa-arrow-left"></i> Previous
            </button>
            <span>${currentIndex + 1} of ${mobileItems.length}</span>
            <button type="button" class="next-btn" ${!nextItem ? 'disabled' : `data-id="${escapeAttr(nextItem.id)}"`}>
                Next <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
        ${suggestions.length ? `
            <div class="kb-mobile-suggestions">
                <h4>Suggested Questions</h4>
                <div class="kb-suggestion-grid">
                    ${suggestions.map((suggestion) => `
                        <button class="kb-suggestion-btn" type="button" data-id="${escapeAttr(suggestion.id)}">
                            <i class="fa-solid fa-arrow-right-long"></i>
                            <span>
                                <strong>${escapeHtml(suggestion.type)}</strong>
                                ${escapeHtml(suggestion.question)}
                            </span>
                        </button>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
}

function renderMap() {
    const item = getActiveItem();
    if (!item || !refs.mapPrimary || !refs.mapAnswer || !refs.mapNext) return;

    const primaryItems = getVisiblePrimaryItems();
    const nextItems = getSuggestions(item);
    const nextLabel = refs.mapNext.previousElementSibling;
    if (nextLabel) nextLabel.textContent = `Related questions (${nextItems.length})`;

    refs.mapPrimary.innerHTML = primaryItems.map((primaryItem) => mapNode(primaryItem, primaryItem.id === item.primary.id || primaryItem.id === item.id, 'primary')).join('');
    refs.mapAnswer.innerHTML = `
        <div class="kb-answer-meta">
            <span class="kb-answer-number"><i class="fa-solid fa-location-dot"></i>${escapeHtml(item.number)}</span>
            <span class="kb-answer-kind">${escapeHtml(item.type)}</span>
        </div>
        <h3>${highlight(item.question)}</h3>
        <div class="kb-map-answer-scroll">${markdownToHtml(item.answer)}</div>
    `;
    refs.mapNext.innerHTML = nextItems.length
        ? nextItems.map((nextItem) => mapNode(nextItem, false, 'next')).join('')
        : '<div class="kb-empty compact">No further suggestions in this branch.</div>';

    requestAnimationFrame(drawMapLines);
    requestAnimationFrame(scrollActiveMapNodeIntoView);
}

function getVisiblePrimaryItems() {
    return getFilteredSections().flatMap((section) => section.primary.map((item) => findItem(item.id)).filter(Boolean));
}

function mapNode(item, active, side) {
    return `
        <button class="kb-map-node ${active ? 'active' : ''}" type="button" data-id="${escapeAttr(item.id)}" data-map-node="${escapeAttr(side)}">
            <span>${escapeHtml(item.number)}</span>
            <strong>${highlight(item.question)}</strong>
            <small>${escapeHtml(item.section.title)}</small>
        </button>
    `;
}

function drawMapLines() {
    if (!refs.mapLines || !refs.mapView || (state.view !== 'map' && !refs.mapView.classList.contains('fullscreen'))) return;

    const shell = refs.mapView.querySelector('.kb-map-shell');
    const activePrimary = refs.mapPrimary?.querySelector('.kb-map-node.active');
    const answer = refs.mapAnswer;
    const nextNodes = [...(refs.mapNext?.querySelectorAll('.kb-map-node') || [])];

    if (!shell || !activePrimary || !answer) return;

    const shellRect = shell.getBoundingClientRect();
    const primaryRect = activePrimary.getBoundingClientRect();
    const answerRect = answer.getBoundingClientRect();
    const width = shellRect.width;
    const height = shellRect.height;

    refs.mapLines.setAttribute('viewBox', `0 0 ${width} ${height}`);
    refs.mapLines.setAttribute('width', width);
    refs.mapLines.setAttribute('height', height);

    const paths = [];
    const defs = `
        <defs>
            <marker id="kb-arrow-primary" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="userSpaceOnUse">
                <path d="M 0 1 L 11 6 L 0 11 z" class="kb-map-arrow-primary"></path>
            </marker>
            <marker id="kb-arrow-next" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="userSpaceOnUse">
                <path d="M 0 1 L 11 6 L 0 11 z" class="kb-map-arrow-next"></path>
            </marker>
        </defs>
    `;

    paths.push(curvePath(
        primaryRect.right - shellRect.left,
        primaryRect.top + primaryRect.height / 2 - shellRect.top,
        answerRect.left - shellRect.left,
        answerRect.top + answerRect.height / 2 - shellRect.top,
        'primary'
    ));

    nextNodes.forEach((node) => {
        const nodeRect = node.getBoundingClientRect();
        const nodeCenterY = nodeRect.top + nodeRect.height / 2;
        if (nodeCenterY < shellRect.top || nodeCenterY > shellRect.bottom) return;

        paths.push(curvePath(
            answerRect.right - shellRect.left,
            answerRect.top + answerRect.height / 2 - shellRect.top,
            nodeRect.left - shellRect.left,
            nodeRect.top + nodeRect.height / 2 - shellRect.top,
            'next'
        ));
    });

    refs.mapLines.innerHTML = defs + paths.join('');
}

function curvePath(x1, y1, x2, y2, type) {
    const control = Math.max(56, Math.abs(x2 - x1) * 0.38);
    const marker = type === 'primary' ? 'kb-arrow-primary' : 'kb-arrow-next';
    return `<path class="kb-map-line ${type}" marker-end="url(#${marker})" d="M ${x1} ${y1} C ${x1 + control} ${y1}, ${x2 - control} ${y2}, ${x2} ${y2}" />`;
}

function scrollActiveMapNodeIntoView() {
    const activePrimary = refs.mapPrimary?.querySelector('.kb-map-node.active');
    if (activePrimary) activePrimary.scrollIntoView({ block: 'nearest' });
}

function renderBranch(item) {
    const parts = [
        `<span class="kb-branch-pill"><i class="fa-solid fa-layer-group"></i>${escapeHtml(item.section.title)}</span>`
    ];

    if (item.parentId) {
        parts.push(`<button class="kb-branch-pill kb-small-btn" type="button" data-id="${escapeAttr(item.primary.id)}"><i class="fa-solid fa-arrow-turn-up"></i>${escapeHtml(item.primary.question)}</button>`);
    }

    parts.push(`<span class="kb-branch-pill"><i class="fa-solid fa-circle-dot"></i>${escapeHtml(item.question)}</span>`);
    refs.branchStrip.innerHTML = parts.join('');
}

function renderSuggestions(item) {
    const suggestions = getSuggestions(item);

    if (suggestions.length === 0) {
        refs.suggestions.innerHTML = '';
        return;
    }

    refs.suggestions.innerHTML = `
        <h3><i class="fa-solid fa-wand-magic-sparkles"></i> Smart next questions (${suggestions.length})</h3>
        <div class="kb-suggestion-grid">
            ${suggestions.map((suggestion) => `
                <button class="kb-suggestion-btn" type="button" data-id="${escapeAttr(suggestion.id)}">
                    <i class="fa-solid fa-arrow-right-long"></i>
                    <span>
                        <strong>${escapeHtml(suggestion.type)}</strong>
                        ${escapeHtml(suggestion.question)}
                    </span>
                </button>
            `).join('')}
        </div>
    `;
}

function getSuggestions(item) {
    const currentPrimaryChildren = item.primary.groups.flatMap((group) => group.questions.map((question) => findItem(question.id))).filter(Boolean);
    const samePrimary = currentPrimaryChildren.filter((child) => child.id !== item.id && itemMatchesTopic(child));

    if (samePrimary.length) return samePrimary;

    const currentIndex = flatItems.findIndex((candidate) => candidate.id === item.id);
    return flatItems
        .slice(currentIndex + 1)
        .filter((candidate) => !candidate.section.counterarguments)
        .concat(flatItems.filter((candidate) => !candidate.section.counterarguments))
        .filter((candidate) => candidate.id !== item.id && itemMatchesTopic(candidate));
}

function renderCounterarguments() {
    if (!refs.counterGrid || !counterSection) return;

    refs.counterGrid.innerHTML = counterItems.map((item, index) => `
        <button class="kb-counter-card" type="button" data-counter-index="${index}">
            <span class="kb-answer-number">${escapeHtml(item.number)}</span>
            <h3>${escapeHtml(cleanCounterQuestion(item.question))}</h3>
        </button>
    `).join('');
}

function bindEvents() {
    refs.sectionList.addEventListener('click', (event) => {
        const sectionToggle = event.target.closest('[data-section]');
        const question = event.target.closest('[data-id]');

        if (question) {
            selectItem(question.dataset.id);
            return;
        }

        if (sectionToggle) {
            const sectionId = sectionToggle.dataset.section;
            state.openSectionId = state.openSectionId === sectionId ? null : sectionId;
            renderTree();
        }
    });

    document.addEventListener('click', (event) => {
        const button = event.target.closest('.kb-suggestion-btn, .kb-branch-pill[data-id], .kb-map-node, .kb-presentation-nav button[data-id], .kb-mobile-answer-nav button[data-id]');
        if (button?.dataset.id) selectItem(button.dataset.id);
    });

    refs.counterGrid?.addEventListener('click', (event) => {
        const card = event.target.closest('[data-counter-index]');
        if (!card) return;
        openCounterModal(Number(card.dataset.counterIndex) || 0);
    });

    refs.counterPrev?.addEventListener('click', () => showCounterAt(state.counterIndex - 1));
    refs.counterNext?.addEventListener('click', () => showCounterAt(state.counterIndex + 1));

    refs.counterModal?.addEventListener('click', (event) => {
        if (event.target.closest('[data-counter-close]')) closeCounterModal();
    });

    refs.mobileAnswerModal?.addEventListener('click', (event) => {
        if (event.target.closest('[data-mobile-answer-close]')) closeMobileAnswerModal();
    });

    refs.topicFilterToggle?.addEventListener('click', () => {
        setTopicFilterOpen(!refs.topicFilter.classList.contains('is-open'));
    });

    refs.topicFilterMenu?.addEventListener('click', (event) => {
        const option = event.target.closest('[data-topic]');
        if (!option) return;
        applyTopicFilter(option.dataset.topic || 'all');
        setTopicFilterOpen(false);
    });

    document.addEventListener('click', (event) => {
        if (!refs.topicFilter?.contains(event.target)) setTopicFilterOpen(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setTopicFilterOpen(false);
        if (!refs.mobileAnswerModal?.hidden && event.key === 'Escape') closeMobileAnswerModal();
        if (!refs.counterModal?.hidden && event.key === 'Escape') closeCounterModal();
        if (!refs.counterModal?.hidden && event.key === 'ArrowLeft') showCounterAt(state.counterIndex - 1);
        if (!refs.counterModal?.hidden && event.key === 'ArrowRight') showCounterAt(state.counterIndex + 1);
    });

    refs.viewButtons.forEach((button) => {
        button.addEventListener('click', () => setView(button.dataset.view));
    });

    window.addEventListener('resize', () => {
        requestAnimationFrame(handleResponsiveKnowledgeView);
        requestAnimationFrame(drawMapLines);
    });
    refs.mapPrimary?.addEventListener('scroll', () => requestAnimationFrame(drawMapLines));
    refs.mapNext?.addEventListener('scroll', () => requestAnimationFrame(drawMapLines));
    refs.mapAnswer?.addEventListener('scroll', () => requestAnimationFrame(drawMapLines));

    /* ── Fullscreen: move out of .reveal ancestor to escape its transform ── */
    let fsOriginalParent = null;
    let fsOriginalNext   = null;
    let mapFsOriginalParent = null;
    let mapFsOriginalNext = null;

    refs.mapFullscreen?.addEventListener('click', () => {
        const entering = !refs.mapView.classList.contains('fullscreen');

        if (entering) {
            mapFsOriginalParent = refs.mapView.parentNode;
            mapFsOriginalNext = refs.mapView.nextSibling;
            document.body.appendChild(refs.mapView);
            refs.mapView.classList.add('fullscreen');
            refs.mapFullscreen.innerHTML = '<i class="fa-solid fa-compress"></i> Exit Full Screen';
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(drawMapLines);
        } else {
            refs.mapView.classList.remove('fullscreen');
            if (mapFsOriginalParent) {
                mapFsOriginalParent.insertBefore(refs.mapView, mapFsOriginalNext);
            }
            refs.mapFullscreen.innerHTML = '<i class="fa-solid fa-expand"></i> Full Screen';
            document.body.style.overflow = '';
            requestAnimationFrame(drawMapLines);
        }
    });

    refs.fullscreen?.addEventListener('click', () => {
        const entering = !refs.basicView.classList.contains('fullscreen');

        if (entering) {
            /* remember where to put it back */
            fsOriginalParent = refs.basicView.parentNode;
            fsOriginalNext   = refs.basicView.nextSibling;

            /* move to body so position:fixed escapes .reveal transform */
            document.body.appendChild(refs.basicView);
            refs.basicView.classList.add('fullscreen');
            refs.fullscreen.innerHTML = '<i class="fa-solid fa-compress"></i> Exit Full Screen';
            document.body.style.overflow = 'hidden';
        } else {
            refs.basicView.classList.remove('fullscreen');

            /* move back to original location in the DOM */
            if (fsOriginalParent) {
                fsOriginalParent.insertBefore(refs.basicView, fsOriginalNext);
            }
            refs.fullscreen.innerHTML = '<i class="fa-solid fa-expand"></i> Full Screen';
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && refs.mapView.classList.contains('fullscreen')) {
            refs.mapView.classList.remove('fullscreen');
            if (mapFsOriginalParent) {
                mapFsOriginalParent.insertBefore(refs.mapView, mapFsOriginalNext);
            }
            refs.mapFullscreen.innerHTML = '<i class="fa-solid fa-expand"></i> Full Screen';
            document.body.style.overflow = '';
            requestAnimationFrame(drawMapLines);
        }

        if (e.key === 'Escape' && refs.basicView.classList.contains('fullscreen')) {
            refs.basicView.classList.remove('fullscreen');
            if (fsOriginalParent) {
                fsOriginalParent.insertBefore(refs.basicView, fsOriginalNext);
            }
            refs.fullscreen.innerHTML = '<i class="fa-solid fa-expand"></i> Full Screen';
            document.body.style.overflow = '';
        }
    });

    const hashId = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    if (hashId && findItem(hashId)) selectItem(hashId, false);
}

function applyTopicFilter(topicId) {
    state.topicId = topicId;
    state.openSectionId = state.topicId === 'all' ? null : state.topicId;
    ensureActiveMatchesFilters();
    updateTopicFilterLabel();
    renderTopicFilter();
    renderTree();
    renderActive();
    requestAnimationFrame(drawMapLines);
}

function setTopicFilterOpen(open) {
    if (!refs.topicFilter || !refs.topicFilterMenu || !refs.topicFilterToggle) return;
    refs.topicFilter.classList.toggle('is-open', open);
    refs.topicFilterMenu.hidden = !open;
    refs.topicFilterToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function openCounterModal(index) {
    if (!refs.counterModal || !counterItems.length) return;
    showCounterAt(index);
    refs.counterModal.hidden = false;
    refs.counterModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('kb-modal-open');
}

function closeCounterModal() {
    if (!refs.counterModal) return;
    refs.counterModal.hidden = true;
    refs.counterModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('kb-modal-open');
}

function showCounterAt(index) {
    if (!refs.counterDialogBody || !counterItems.length) return;

    state.counterIndex = (index + counterItems.length) % counterItems.length;
    const item = counterItems[state.counterIndex];

    refs.counterDialogBody.innerHTML = `
        <div class="kb-answer-meta">
            <span class="kb-answer-number"><i class="fa-solid fa-shield-halved"></i>${escapeHtml(item.number)}</span>
            <span class="kb-answer-kind">Counterargument</span>
        </div>
        <h3 id="kb-counter-modal-title">${escapeHtml(cleanCounterQuestion(item.question))}</h3>
        <div class="kb-answer-body">${markdownToHtml(item.answer)}</div>
    `;

    if (refs.counterPosition) {
        refs.counterPosition.textContent = `${state.counterIndex + 1} of ${counterItems.length}`;
    }
}

function selectItem(id, scroll = true) {
    if (!findItem(id)) return;
    state.activeId = id;
    renderTree();
    renderActive();

    if (isNarrowKnowledgeMobile()) {
        openMobileAnswerModal();
        return;
    }

    if (scroll && state.view !== 'map') {
        document.getElementById('knowledge-app')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function setView(view) {
    state.view = isNarrowKnowledgeMobile() || view === 'basic' ? 'basic' : 'map';
    if (state.view === 'basic' && state.topicId === 'all') {
        state.openSectionId = null;
        renderTree();
    }
    syncViewVisibility();
    requestAnimationFrame(drawMapLines);
}

function syncViewVisibility() {
    refs.mapView?.classList.toggle('is-hidden', state.view !== 'map');
    refs.basicView?.classList.toggle('is-hidden', state.view !== 'basic');
    refs.viewButtons.forEach((button) => {
        const active = button.dataset.view === state.view;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
}

function handleResponsiveKnowledgeView() {
    if (isNarrowKnowledgeMobile()) {
        if (state.view !== 'basic') setView('basic');
        return;
    }

    closeMobileAnswerModal();
    syncViewVisibility();
}

function openMobileAnswerModal() {
    if (!refs.mobileAnswerModal || !isNarrowKnowledgeMobile()) return;
    renderMobileAnswer();
    refs.mobileAnswerModal.hidden = false;
    refs.mobileAnswerModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('kb-mobile-answer-open');
}

function closeMobileAnswerModal() {
    if (!refs.mobileAnswerModal) return;
    refs.mobileAnswerModal.hidden = true;
    refs.mobileAnswerModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('kb-mobile-answer-open');
}

function isNarrowKnowledgeMobile() {
    return window.matchMedia?.(MOBILE_KB_QUERY).matches || window.innerWidth <= 760;
}

function getActiveItem() {
    return findItem(state.activeId);
}

function findItem(id) {
    return flatItems.find((item) => item.id === id);
}

function getFilteredSections() {
    if (state.topicId === 'all') return knowledgeSections;
    return knowledgeSections.filter((section) => section.id === state.topicId);
}

function ensureActiveMatchesFilters() {
    const active = getActiveItem();
    if (active && itemMatchesTopic(active)) return;

    const fallback = flatItems.find((item) => itemMatchesActiveFilters(item))
        || flatItems.find((item) => !item.section.counterarguments && itemMatchesTopic(item));

    if (fallback) state.activeId = fallback.id;
}

function itemMatchesActiveFilters(item) {
    return !item.section.counterarguments && itemMatchesTopic(item);
}

function itemMatchesTopic(item) {
    return state.topicId === 'all' || item.section.id === state.topicId;
}

function markdownToHtml(markdown) {
    if (!markdown) return '<p>No answer available.</p>';

    const lines = markdown.replace(/  \n/g, '\n').split('\n');
    const html = [];
    let paragraph = [];
    let list = null;
    let table = [];

    const flushParagraph = () => {
        if (paragraph.length) {
            html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
            paragraph = [];
        }
    };
    const flushList = () => {
        if (list) {
            html.push(`<${list.type}>${list.items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</${list.type}>`);
            list = null;
        }
    };
    const flushTable = () => {
        if (table.length) {
            const rows = table.map((row) => row.split('|').slice(1, -1).map((cell) => inlineMarkdown(cell.trim())));
            const [head, divider, ...body] = rows;
            if (head && divider) {
                html.push(`<table><thead><tr>${head.map((cell) => `<th>${cell}</th>`).join('')}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
            }
            table = [];
        }
    };

    lines.forEach((rawLine) => {
        const line = rawLine.trim();

        if (!line) {
            flushParagraph();
            flushList();
            flushTable();
            return;
        }

        if (/^\|.+\|$/.test(line)) {
            flushParagraph();
            flushList();
            table.push(line);
            return;
        }

        flushTable();

        const heading = line.match(/^(#{1,4})\s+(.+)/);
        if (heading) {
            flushParagraph();
            flushList();
            const level = Math.min(4, heading[1].length + 2);
            html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
            return;
        }

        const bullet = line.match(/^[-*]\s+(.+)/);
        const ordered = line.match(/^\d+\.\s+(.+)/);
        if (bullet || ordered) {
            flushParagraph();
            const type = bullet ? 'ul' : 'ol';
            if (!list || list.type !== type) {
                flushList();
                list = { type, items: [] };
            }
            list.items.push((bullet || ordered)[1]);
            return;
        }

        paragraph.push(line);
    });

    flushParagraph();
    flushList();
    flushTable();

    return html.join('');
}

function inlineMarkdown(value) {
    return highlightHtml(escapeHtml(value)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.+?)`/g, '<code>$1</code>'));
}

function highlight(value) {
    return escapeHtmlIfNeeded(value);
}

function highlightHtml(escaped) {
    return escaped;
}

function escapeHtmlIfNeeded(value) {
    return /[<>&]/.test(value) ? escapeHtml(value) : value;
}

function stripMarkdown(value) {
    return value.replace(/[#*_`|>-]/g, '').replace(/\s+/g, ' ').trim();
}

function cleanCounterQuestion(question) {
    return question.replace(/^["“”']+|["“”']+$/g, '').trim();
}

function updateUrlHash(id) {
    if (!id) return;
    const url = `${window.location.pathname}${window.location.search}#${encodeURIComponent(id)}`;
    window.history.replaceState(null, '', url);
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeAttr(value) {
    return escapeHtml(value);
}

initKnowledgeBase();
