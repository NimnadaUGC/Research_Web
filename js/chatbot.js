const TRANSFORMERS_CDN = 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';
const MODEL_ID = 'Xenova/bge-small-en-v1.5';
const EMBEDDING_CACHE_PREFIX = 'aiBaResearchChatbotEmbeddings';
const MAX_EMBEDDING_CHARS = 900;
const LOW_CONFIDENCE_THRESHOLD = 0.23;
const MIN_ANSWER_SCORE = 0.18;
const MIN_LEXICAL_SCORE_FOR_SEMANTIC = 0.18;
const SEMANTIC_CANDIDATE_LIMIT = 24;
const BGE_QUERY_PREFIX = 'Represent this sentence for searching relevant passages: ';

const state = {
    initialized: false,
    open: false,
    kbLoaded: false,
    modelLoading: false,
    modelReady: false,
    modelFailed: false,
    greeted: false,
    items: [],
    extractor: null,
    embeddings: new Map(),
    messages: []
};

const refs = {};

export function initResearchChatbot(options = {}) {
    if (state.initialized || document.getElementById('research-chatbot')) return;

    state.initialized = true;
    loadStyles(options.cssUrl || 'css/chatbot.css');
    createShell();
    bindEvents();
    loadKnowledgeBase(options.kbUrl || 'kb.json');
}

function loadStyles(cssUrl) {
    if (!document.querySelector(`link[rel="stylesheet"][href="${cssUrl}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssUrl;
        document.head.appendChild(link);
    }
}

function pinChatbotShell(root) {
    Object.assign(root.style, {
        position: 'fixed',
        right: 'max(1rem, 2vw)',
        bottom: 'calc(1.25rem + 76px)',
        width: 'max-content',
        height: '52px',
        padding: '0',
        zIndex: '160',
        fontFamily: 'var(--font-family, Ubuntu, sans-serif)'
    });
}

function createShell() {
    const root = document.createElement('section');
    root.className = 'research-chatbot';
    root.id = 'research-chatbot';
    root.setAttribute('aria-label', 'Ask BA research assistant');
    root.innerHTML = `
        <button class="chatbot-launcher" type="button" aria-expanded="false" aria-controls="chatbot-panel">
            <i class="fa-solid fa-comments" aria-hidden="true"></i>
            <span>Ask BA</span>
        </button>
        <div class="chatbot-panel" id="chatbot-panel" hidden>
            <div class="chatbot-header">
                <div>
                    <strong>Research Assistant</strong>
                    <span id="chatbot-status">Loading knowledge base...</span>
                </div>
                <button class="chatbot-close" type="button" aria-label="Close research assistant">
                    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
            </div>
            <div class="chatbot-messages" id="chatbot-messages" aria-live="polite"></div>
            <div class="chatbot-loader" id="chatbot-loader" hidden>
                <div class="chatbot-loader-card">
                    <span class="chatbot-loader-ring" aria-hidden="true"></span>
                    <strong>Loading Ask BA</strong>
                    <p id="chatbot-loader-text">Loading smarter intelligence model...</p>
                    <div class="chatbot-loader-progress" aria-hidden="true">
                        <span id="chatbot-loader-bar"></span>
                    </div>
                    <small id="chatbot-loader-value">Starting...</small>
                </div>
            </div>
            <div class="chatbot-suggestions" id="chatbot-suggestions" aria-label="Suggested questions"></div>
            <form class="chatbot-form" id="chatbot-form">
                <label class="sr-only" for="chatbot-input">Ask a research question</label>
                <textarea id="chatbot-input" rows="1" placeholder="Ask about..." autocomplete="off"></textarea>
                <button type="submit" aria-label="Send question">
                    <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
                </button>
            </form>
        </div>
    `;

    pinChatbotShell(root);
    document.body.appendChild(root);
    refs.root = root;
    refs.launcher = root.querySelector('.chatbot-launcher');
    refs.panel = root.querySelector('.chatbot-panel');
    refs.close = root.querySelector('.chatbot-close');
    refs.status = root.querySelector('#chatbot-status');
    refs.messages = root.querySelector('#chatbot-messages');
    refs.loader = root.querySelector('#chatbot-loader');
    refs.loaderText = root.querySelector('#chatbot-loader-text');
    refs.loaderBar = root.querySelector('#chatbot-loader-bar');
    refs.loaderValue = root.querySelector('#chatbot-loader-value');
    refs.suggestions = root.querySelector('#chatbot-suggestions');
    refs.form = root.querySelector('#chatbot-form');
    refs.input = root.querySelector('#chatbot-input');
}

function bindEvents() {
    refs.launcher.addEventListener('click', () => setOpen(!state.open));
    refs.close.addEventListener('click', () => setOpen(false));

    refs.form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = refs.input.value.trim();
        if (!query) return;

        refs.input.value = '';
        autoresizeInput();
        await answerQuery(query);
    });

    refs.input.addEventListener('input', autoresizeInput);
    refs.input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            refs.form.requestSubmit();
        }
    });

    refs.suggestions.addEventListener('click', (event) => {
        const button = event.target.closest('[data-question]');
        if (!button) return;
        submitSuggestedQuestion(button.dataset.question);
    });

    refs.messages.addEventListener('click', (event) => {
        const button = event.target.closest('[data-question]');
        if (!button) return;
        submitSuggestedQuestion(button.dataset.question);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && state.open) setOpen(false);
    });
}

async function loadKnowledgeBase(kbUrl) {
    try {
        const response = await fetch(kbUrl, { cache: 'default' });
        if (!response.ok) throw new Error(`Knowledge base request failed: ${response.status}`);
        const data = await response.json();
        state.items = flattenKnowledgeBase(data);
        state.kbLoaded = state.items.length > 0;

        addBotMessage('Ask me about the research problem, Business Analysis, adaptive prompting, ethical safeguards, hybrid AI agents, or evaluation methodology. I match your question against the local knowledge base in this browser.');
        renderSuggestions(getStarterQuestions());
        state.embeddings = readEmbeddingCache(getEmbeddingCacheKey()) || new Map();
        setStatus(`${state.items.length} answers ready. Ask BA will prepare when opened.`);
        setLoadingProgress(0, 'Ready to prepare when opened.');
    } catch (error) {
        console.error('Failed to load chatbot knowledge base', error);
        setStatus('Knowledge base unavailable');
        addBotMessage('I could not load the local knowledge base. Please open the site through a local server, not directly as a file, so `kb.json` can be fetched.');
    }
}

function flattenKnowledgeBase(data) {
    const sections = data.sections || [];
    const items = [];

    sections.forEach((section) => {
        (section.primary || []).forEach((primary) => {
            items.push(createKnowledgeItem(section, primary, primary, primary.question, primary.answer, primary.number, 'Primary Question'));

            (primary.groups || []).forEach((group) => {
                (group.questions || []).forEach((question, index) => {
                    const number = `${primary.number}.${index + 1}`;
                    items.push(createKnowledgeItem(section, primary, question, question.question, question.answer, number, group.title));
                });
            });
        });
    });

    return items.filter((item) => item.question && item.answer);
}

function createKnowledgeItem(section, primary, source, question, answer, number, type) {
    return {
        id: `${section.id}:${primary.id}:${number}:${slugify(question)}`,
        sectionId: section.id,
        sectionTitle: section.title,
        number,
        type,
        primaryQuestion: primary.question,
        question,
        answer,
        actions: normalizeActions([...(section.actions || []), ...(primary.actions || []), ...(source.actions || [])]),
        searchableText: normalizeText(`${section.title} ${primary.question} ${question} ${answer}`),
        embeddingText: `${section.title}. ${primary.question}. ${question}. ${stripMarkdown(answer)}`.slice(0, MAX_EMBEDDING_CHARS)
    };
}

function normalizeActions(actions) {
    const seen = new Set();
    return actions
        .filter((action) => action?.href && action?.label)
        .filter((action) => {
            const key = `${action.label}:${action.href}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        })
        .slice(0, 4)
        .map((action) => ({
            label: String(action.label),
            href: String(action.href),
            icon: String(action.icon || 'fa-arrow-up-right-from-square')
        }));
}

async function answerQuery(query) {
    addUserMessage(query);

    const directResponse = getDirectIntentResponse(query);
    if (directResponse) {
        addBotMessage(directResponse);
        renderSuggestions(getStarterQuestions());
        return;
    }

    if (!state.kbLoaded) {
        addBotMessage('The knowledge base is still loading. Please try again in a moment.');
        return;
    }

    setThinking(true);

    const lexicalResults = searchLexically(query);
    let results = lexicalResults;
    let mode = 'keyword';

    try {
        await ensureSemanticMatcher();
        if (state.modelReady) {
            results = await searchSemantically(query, lexicalResults);
            mode = 'semantic';
        }
    } catch (error) {
        console.warn('Semantic matcher unavailable, using keyword search', error);
        state.modelFailed = true;
        setStatus('Using keyword matching fallback');
    }

    setThinking(false);
    const best = results[0] || lexicalResults[0];

    const utilityResponse = getDateTimeUtilityResponse(query);
    if (utilityResponse) {
        addBotMessage(utilityResponse);
        renderSuggestions(getStarterQuestions());
        return;
    }

    if (!best || best.score < MIN_ANSWER_SCORE) {
        const clarificationQuestions = buildClarificationOptions(query, results, lexicalResults);
        if (clarificationQuestions.length) {
            addClarificationMessage(query, clarificationQuestions);
        } else {
            addBotMessage(getUnsupportedQuestionResponse(query));
        }
        renderSuggestions(getStarterQuestions());
        return;
    }

    if (best.score < LOW_CONFIDENCE_THRESHOLD || !hasMeaningfulQuestionOverlap(query, best.item)) {
        const clarificationQuestions = buildClarificationOptions(query, results, lexicalResults, best.item.question);
        if (clarificationQuestions.length) {
            addClarificationMessage(query, clarificationQuestions, { includeClosest: best.item.question });
        } else {
            addBotMessage(getUnsupportedQuestionResponse(query));
        }
        renderSuggestions(getStarterQuestions());
        return;
    }

    addAnswerMessage(best.item, best.score, mode);
    renderSuggestions(results.slice(1, 5).map((result) => result.item.question));
}

function submitSuggestedQuestion(question) {
    if (!question) return;
    refs.input.value = question;
    refs.form.requestSubmit();
}

async function ensureSemanticMatcher() {
    if (!state.kbLoaded || state.modelReady || state.modelFailed) return;
    if (state.modelLoading) {
        while (state.modelLoading) {
            await delay(100);
        }
        return;
    }

    state.modelLoading = true;
    setModelLoading(true);
    setStatus('Loading smarter intelligence model...');
    setLoadingProgress(8, 'Loading smarter intelligence model...');

    try {
        setLoadingProgress(18, 'Checking browser cache...');
        const transformers = await import(TRANSFORMERS_CDN);
        if (transformers.env?.allowLocalModels !== undefined) {
            transformers.env.allowLocalModels = false;
        }

        setLoadingProgress(56, 'Preparing smarter search...');
        state.extractor = await transformers.pipeline('feature-extraction', MODEL_ID);
        state.embeddings = readEmbeddingCache(getEmbeddingCacheKey()) || new Map();
        state.modelReady = true;
        setLoadingProgress(100, 'Ask BA is ready.');
        setStatus('Semantic AI matcher ready');
    } finally {
        state.modelLoading = false;
        setModelLoading(false);
    }
}

function warmUpSemanticMatcher() {
    if (!state.kbLoaded || state.modelReady || state.modelLoading || state.modelFailed) return;

    ensureSemanticMatcher().catch((error) => {
        console.warn('Semantic matcher warm-up failed, keyword fallback remains available', error);
        state.modelFailed = true;
        setStatus('Using keyword matching fallback');
    });
}

async function searchSemantically(query, lexicalResults) {
    const candidates = getSemanticCandidates(query, lexicalResults);
    if (!candidates.length) return lexicalResults;

    await ensureCandidateEmbeddings(candidates);
    const output = await state.extractor(`${BGE_QUERY_PREFIX}${query}`, { pooling: 'mean', normalize: true });
    const outputList = output.tolist();
    const queryVector = Array.isArray(outputList[0]) ? outputList[0] : outputList;
    const lexicalById = new Map(lexicalResults.map((result) => [result.item.id, result.score]));
    const normalizedQuery = normalizeText(query);
    const queryTokens = tokenize(query);

    return candidates
        .map((item) => {
            const semanticScore = dot(queryVector, state.embeddings.get(item.id));
            const lexicalScore = lexicalById.get(item.id) || 0;
            const questionBoost = getQuestionMatchBoost(item.question, normalizedQuery, queryTokens);
            return {
                item,
                score: semanticScore * 0.6 + Math.min(lexicalScore, 1.4) * 0.34 + questionBoost,
                semanticScore,
                lexicalScore,
                questionBoost
            };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
}

function getSemanticCandidates(query, lexicalResults) {
    const candidates = new Map();
    lexicalResults
        .filter((result) => result.score >= MIN_LEXICAL_SCORE_FOR_SEMANTIC)
        .forEach((result) => candidates.set(result.item.id, result.item));

    if (candidates.size < 8) {
        const queryTokens = tokenize(query);
        state.items.forEach((item) => {
            if (candidates.size >= SEMANTIC_CANDIDATE_LIMIT) return;
            const title = normalizeText(`${item.sectionTitle} ${item.primaryQuestion} ${item.question}`);
            if (queryTokens.some((token) => title.includes(token))) {
                candidates.set(item.id, item);
            }
        });
    }

    return [...candidates.values()].slice(0, SEMANTIC_CANDIDATE_LIMIT);
}

async function ensureCandidateEmbeddings(items) {
    const missing = items.filter((item) => !state.embeddings.has(item.id));
    if (!missing.length) return;

    setStatus('Preparing the most relevant answers...');
    const batchSize = 8;
    for (let index = 0; index < missing.length; index += batchSize) {
        const batch = missing.slice(index, index + batchSize);
        const output = await state.extractor(batch.map((item) => item.embeddingText), {
            pooling: 'mean',
            normalize: true
        });
        const vectors = output.tolist();
        batch.forEach((item, batchIndex) => {
            state.embeddings.set(item.id, vectors[batchIndex]);
        });
        setStatus(`Prepared ${Math.min(index + batchSize, missing.length)}/${missing.length} relevant answers...`);
        await delay(0);
    }

    writeEmbeddingCache(getEmbeddingCacheKey(), state.embeddings);
    setStatus('Semantic AI matcher ready');
}

function getQuestionMatchBoost(question, normalizedQuery, queryTokens) {
    const normalizedQuestion = normalizeText(question);
    if (!normalizedQuestion || !normalizedQuery) return 0;
    if (normalizedQuestion === normalizedQuery) return 0.45;
    if (normalizedQuestion.includes(normalizedQuery) || normalizedQuery.includes(normalizedQuestion)) return 0.32;

    const questionTokens = new Set(tokenize(question));
    if (!queryTokens.length || !questionTokens.size) return 0;

    const overlap = queryTokens.filter((token) => questionTokens.has(token)).length / queryTokens.length;
    if (overlap >= 0.8) return 0.22;
    if (overlap >= 0.6) return 0.12;
    return 0;
}

function searchLexically(query) {
    const queryTokens = tokenize(query);
    if (!queryTokens.length) return [];

    return state.items
        .map((item) => {
            const title = normalizeText(`${item.sectionTitle} ${item.primaryQuestion} ${item.question}`);
            const matches = queryTokens.reduce((count, token) => {
                const inTitle = title.includes(token) ? 2.4 : 0;
                const inBody = item.searchableText.includes(token) ? 1 : 0;
                return count + inTitle + inBody;
            }, 0);
            const phraseBoost = item.searchableText.includes(normalizeText(query)) ? 3 : 0;
            return {
                item,
                score: (matches + phraseBoost) / Math.max(queryTokens.length * 3, 1)
            };
        })
        .filter((result) => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, SEMANTIC_CANDIDATE_LIMIT);
}

function addAnswerMessage(item, score, mode) {
    const confidence = score < LOW_CONFIDENCE_THRESHOLD ? 'Closest match' : 'Matched answer';
    const modeLabel = mode === 'semantic' ? 'Semantic Search' : 'Keyword fallback';

    addMessage('bot', `
        <div class="chatbot-answer">
            <div class="chatbot-answer-meta">
                <span>${escapeHtml(confidence)}</span>
                <span>${escapeHtml(modeLabel)}</span>
            </div>
            <h4>${escapeHtml(item.question)}</h4>
            <div class="chatbot-answer-body">${markdownToHtml(item.answer)}</div>
            ${renderAnswerActions(item)}
            <div class="chatbot-source">
                <i class="fa-solid fa-book-open" aria-hidden="true"></i>
                ${escapeHtml(item.number)} · ${escapeHtml(item.sectionTitle)}
            </div>
        </div>
    `);
}

function renderAnswerActions(item) {
    if (!item.actions?.length) return '';

    return `
        <div class="chatbot-answer-actions" aria-label="Related actions">
            ${item.actions.map((action) => `
                <a href="${escapeAttr(action.href)}" class="chatbot-action-link">
                    <i class="fa-solid ${escapeAttr(action.icon)}" aria-hidden="true"></i>
                    <span>${escapeHtml(action.label)}</span>
                </a>
            `).join('')}
        </div>
    `;
}

function addClarificationMessage(query, questions, options = {}) {
    const intro = options.includeClosest
        ? 'I could not confidently match that question to the knowledge base. Did you mean to ask one of these instead?'
        : 'I could not confidently match that question. Did you mean to ask one of these?';

    addMessage('bot', `
        <div class="chatbot-clarify">
            <p>${intro}</p>
            <div class="chatbot-clarify-options">
                ${questions.map((question) => `
                    <button type="button" data-question="${escapeAttr(question)}">
                        ${escapeHtml(question)}
                    </button>
                `).join('')}
            </div>
            <small>You asked: ${escapeHtml(query)}</small>
        </div>
    `);
}

function addUserMessage(text) {
    addMessage('user', escapeHtml(text));
}

function addBotMessage(text) {
    addMessage('bot', `<p>${escapeHtml(text)}</p>`);
}

function addMessage(role, html) {
    const message = document.createElement('div');
    message.className = `chatbot-message ${role}`;
    message.innerHTML = html;
    refs.messages.appendChild(message);
    if (role === 'bot' && message.querySelector('.chatbot-answer')) {
        refs.messages.scrollTop = Math.max(message.offsetTop - refs.messages.offsetTop - 8, 0);
    } else {
        refs.messages.scrollTop = refs.messages.scrollHeight;
    }
}

function renderSuggestions(questions) {
    const uniqueQuestions = [...new Set(questions)].filter(Boolean).slice(0, 4);
    refs.suggestions.innerHTML = uniqueQuestions.map((question) => `
        <button type="button" data-question="${escapeAttr(question)}">${escapeHtml(question)}</button>
    `).join('');
}

function getStarterQuestions() {
    return [
        'What is the main research contribution?',
        'Why use AI in Business Analysis?',
        'What information is on the Resources page?',
        'What is the 8-month research timeline?'
    ];
}

function setOpen(isOpen) {
    state.open = isOpen;
    refs.panel.hidden = !isOpen;
    refs.root.classList.toggle('is-open', isOpen);
    refs.launcher.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
        warmUpSemanticMatcher();
        requestAnimationFrame(() => refs.input.focus());
    }
}

function getDirectIntentResponse(query) {
    const normalized = normalizeText(query);
    if (!normalized) return null;

    if (isGreetingIntent(normalized)) {
        state.greeted = true;
        return `${getGreetingReply(normalized)} I am Ask BA, the research assistant for this website. Ask me about the research problem, methodology, ethical prompting, hybrid AI agents, evaluation metrics, documents, pages, or website content.`;
    }

    if (/\b(thanks|thank you|thankyou|appreciate)\b/.test(normalized)) {
        return 'You are welcome. I can continue helping with the research knowledge base or the website content.';
    }

    const dateTimeResponse = getDateTimeUtilityResponse(query);
    if (dateTimeResponse) return dateTimeResponse;

    if (/\b(where are you|where do you live|your location|where am i|current page)\b/.test(normalized)) {
        return `I am running inside this research website in your browser. The current page is ${getCurrentPageLabel()}. I can help you navigate to Home, Problem, Methodology, Presentation, Resources, Progress, Knowledge Base, or Apply for Beta.`;
    }

    if (/\b(who are you|what are you|your name|what can you do|help)\b/.test(normalized)) {
        return 'I am Ask BA. I search this website knowledge base and return the closest stored research or page answer. I can also handle basic greetings, date/time questions, current page questions, and navigation help. I am accurate for the stored research content, but I am not a full generative LLM.';
    }

    if (/\b(model|transformer|transformers|bge|cdn|intelligence)\b/.test(normalized) && /\b(good|enough|accurate|smart|intelligent|limitation|limit)\b/.test(normalized)) {
        return 'The current CDN setup runs browser-side semantic retrieval. It is stronger for search-style matching than the previous MiniLM option, but it is still not a generative chatbot model. Ask BA therefore answers from kb.json and website content to stay accurate and avoid invented research claims.';
    }

    if (/\b(general question|outside question|random question|invalid question|anything|everything)\b/.test(normalized)) {
        return 'Ask BA is best for this research website: Business Analysis, adaptive prompting, ethical safeguards, hybrid AI agents, evaluation metrics, proposal documents, progress, resources, and page navigation. For unrelated general-world questions, I will avoid guessing and ask you to stay within the research knowledge base.';
    }

    return null;
}

function getUnsupportedQuestionResponse(query) {
    const normalized = normalizeText(query);
    if (isOutsideScopeQuestion(normalized)) {
        return 'That looks outside this research website knowledge base. I can answer accurately about the BA research project, methodology, pages, proposal documents, progress timeline, ethics, hybrid AI agents, and evaluation plan.';
    }

    return 'I could not find a strong enough match in the research knowledge base. Try asking about the research problem, Business Analysis, methodology, ethical prompting, hybrid AI agents, evaluation metrics, documents, pages, or website navigation.';
}

function buildClarificationOptions(query, results, lexicalResults, excludeQuestion = '') {
    if (isOutsideScopeQuestion(normalizeText(query))) return getQueryReformulations(query).slice(0, 3);

    const reformulations = getQueryReformulations(query);
    const combined = [...results, ...lexicalResults]
        .filter((result) => result?.item?.question)
        .filter((result) => result.score > 0.04)
        .sort((a, b) => b.score - a.score)
        .map((result) => result.item.question)
        .filter((question) => question !== excludeQuestion);

    return [...new Set([...reformulations, ...combined])].slice(0, 4);
}

function getQueryReformulations(query) {
    const normalized = normalizeText(query);
    const reforms = [];

    if (/\bdata\b/.test(normalized) && /\btime\b/.test(normalized)) {
        reforms.push(query.replace(/\bdata\b/gi, 'date'));
    }
    if (/\bteh\b/.test(normalized)) {
        reforms.push(query.replace(/\bteh\b/gi, 'the'));
    }
    if (/\bday\b/.test(normalized) && !/\b(today|weekday|timeline|methodology)\b/.test(normalized)) {
        reforms.push('What is today\'s date?');
    }

    return reforms.filter((candidate, index, list) => {
        const key = normalizeText(candidate);
        return key && key !== normalized && list.findIndex((item) => normalizeText(item) === key) === index;
    });
}

function getDateTimeUtilityResponse(query) {
    const normalized = normalizeText(query);
    if (!normalized) return null;

    const kind = getDateTimeUtilityKind(normalized);
    if (!kind) return null;

    const formats = getLocalDateTimeFormats();
    if (kind === 'both') {
        return `Today is ${formats.date}. The current time is ${formats.time}.`;
    }
    if (kind === 'time') {
        return `The current time is ${formats.time}.`;
    }
    if (kind === 'day') {
        return `Today is ${formats.dayName}. The full date is ${formats.date}.`;
    }
    return `Today is ${formats.date}.`;
}

function getDateTimeUtilityKind(normalized) {
    if (/\b(date and time|time and date|date time|datetime|data and time|data time)\b/.test(normalized)) {
        return 'both';
    }
    if (/\bdata\b/.test(normalized) && /\btime\b/.test(normalized)) {
        return 'both';
    }
    if (/\b(what time|time now|current time|what is the time|tell me the time)\b/.test(normalized)) {
        return 'time';
    }
    if (/\b(what day|which day|day is it|day today|what day is it|todays day)\b/.test(normalized)) {
        return 'day';
    }
    if (/\b(today|current date|what date|which date|date today|what is the date)\b/.test(normalized)) {
        return 'date';
    }
    return null;
}

function getLocalDateTimeFormats() {
    const now = new Date();
    return {
        date: new Intl.DateTimeFormat(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(now),
        time: new Intl.DateTimeFormat(undefined, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(now),
        dayName: new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(now)
    };
}

function hasMeaningfulQuestionOverlap(query, item) {
    const contentTokens = getContentTokens(query);
    if (!contentTokens.length) return true;

    const questionTokens = new Set(tokenize(`${item.question} ${item.sectionTitle}`));
    const overlap = contentTokens.filter((token) => questionTokens.has(token)).length / contentTokens.length;
    return overlap >= 0.34;
}

function getContentTokens(query) {
    const utilityTokens = new Set(['time', 'date', 'day', 'today', 'now', 'current', 'data', 'tell', 'please']);
    return tokenize(query).filter((token) => !utilityTokens.has(token));
}

function isOutsideScopeQuestion(normalized) {
    return /\b(weather|news|sports|price|stock|crypto|movie|song|recipe|joke|capital|president)\b/.test(normalized);
}

function getCurrentPageLabel() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const labels = {
        'index.html': 'Home',
        'problem.html': 'Problem',
        'methodology.html': 'Methodology',
        'presentation.html': 'Presentation',
        'resources.html': 'Resources',
        'progress.html': 'Progress',
        'knowledge-base.html': 'Knowledge Base',
        'beta.html': 'Apply for Beta'
    };
    return labels[page] ? `${labels[page]} (${page})` : page;
}

function isGreetingIntent(normalized) {
    if (normalized.length > 48) return false;
    return /^(hi|hello|hey|good morning|good afternoon|good evening|good night|greetings|ayubowan|yo|sup)(\s|$)/.test(normalized);
}

function getGreetingReply(normalized) {
    const requestedPeriod = getRequestedGreetingPeriod(normalized);
    const currentPeriod = getCurrentDayPeriod();
    const currentGreeting = getTimeBasedGreeting();

    if (!requestedPeriod || requestedPeriod === currentPeriod) {
        return `${getRequestedGreeting(normalized) || currentGreeting}.`;
    }

    if (requestedPeriod === 'night') {
        return `It is ${currentPeriod} here, so ${currentGreeting.toLowerCase()}. If you are signing off, good night.`;
    }

    return `It is ${currentPeriod} here, so ${currentGreeting.toLowerCase()}.`;
}

function getRequestedGreeting(normalized) {
    if (normalized.startsWith('good night')) return 'Good night';
    if (normalized.startsWith('good evening')) return 'Good evening';
    if (normalized.startsWith('good afternoon')) return 'Good afternoon';
    if (normalized.startsWith('good morning')) return 'Good morning';
    return null;
}

function getRequestedGreetingPeriod(normalized) {
    if (normalized.startsWith('good morning')) return 'morning';
    if (normalized.startsWith('good afternoon')) return 'afternoon';
    if (normalized.startsWith('good evening')) return 'evening';
    if (normalized.startsWith('good night')) return 'night';
    return null;
}

function getCurrentDayPeriod() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
}

function getTimeBasedGreeting() {
    const period = getCurrentDayPeriod();
    if (period === 'morning') return 'Good morning';
    if (period === 'afternoon') return 'Good afternoon';
    return 'Good evening';
}

function setStatus(text) {
    if (refs.status) refs.status.textContent = text;
}

function setModelLoading(isLoading) {
    refs.root.classList.toggle('is-loading-model', isLoading);
    if (refs.loader) refs.loader.hidden = !isLoading;
}

function setLoadingProgress(percent, text) {
    const safePercent = Math.max(0, Math.min(100, Math.round(percent)));
    refs.root.style.setProperty('--chatbot-load-progress', `${safePercent}%`);
    if (refs.loaderText) refs.loaderText.textContent = text;
    if (refs.loaderValue) refs.loaderValue.textContent = `${safePercent}%`;
    if (refs.loaderBar) refs.loaderBar.style.width = `${safePercent}%`;
}

function setThinking(isThinking) {
    refs.root.classList.toggle('is-thinking', isThinking);
    refs.form.querySelector('button').disabled = isThinking;
    refs.input.disabled = isThinking;

    let thinking = refs.messages.querySelector('.chatbot-thinking');
    if (isThinking && !thinking) {
        thinking = document.createElement('div');
        thinking.className = 'chatbot-message bot chatbot-thinking';
        thinking.innerHTML = '<span></span><span></span><span></span>';
        refs.messages.appendChild(thinking);
    }
    if (!isThinking && thinking) thinking.remove();
    refs.messages.scrollTop = refs.messages.scrollHeight;
}

function autoresizeInput() {
    refs.input.style.height = 'auto';
    refs.input.style.height = `${Math.min(refs.input.scrollHeight, 118)}px`;
}

function getEmbeddingCacheKey() {
    const signature = `${MODEL_ID}:${state.items.length}:${state.items.map((item) => item.id).join('|').length}`;
    return `${EMBEDDING_CACHE_PREFIX}:${signature}`;
}

function readEmbeddingCache(cacheKey) {
    try {
        const cached = JSON.parse(localStorage.getItem(cacheKey));
        const map = new Map();

        if (Array.isArray(cached)) {
            cached.forEach((vector, index) => {
                const item = state.items[index];
                if (item && Array.isArray(vector)) map.set(item.id, vector);
            });
            return map.size ? map : null;
        }

        if (!cached?.vectors || typeof cached.vectors !== 'object') return null;
        Object.entries(cached.vectors).forEach(([id, vector]) => {
            if (Array.isArray(vector)) map.set(id, vector);
        });
        return map.size ? map : null;
    } catch {
        return null;
    }
}

function writeEmbeddingCache(cacheKey, embeddingMap) {
    try {
        cleanupEmbeddingCaches(cacheKey);
        localStorage.setItem(cacheKey, JSON.stringify({
            version: 2,
            model: MODEL_ID,
            createdAt: new Date().toISOString(),
            vectors: Object.fromEntries(embeddingMap)
        }));
    } catch {
        // Browsers may reject the cache when storage is full or private mode is enabled.
    }
}

function cleanupEmbeddingCaches(activeCacheKey) {
    const staleKeys = [];
    for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (key && key.startsWith(EMBEDDING_CACHE_PREFIX) && key !== activeCacheKey) {
            staleKeys.push(key);
        }
    }
    staleKeys.forEach((key) => localStorage.removeItem(key));
}

function markdownToHtml(markdown) {
    const lines = String(markdown || '').split('\n');
    const chunks = [];
    let listItems = [];

    const flushList = () => {
        if (!listItems.length) return;
        chunks.push(`<ul>${listItems.map((item) => `<li>${formatInline(item)}</li>`).join('')}</ul>`);
        listItems = [];
    };

    lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) {
            flushList();
            return;
        }
        if (trimmed.startsWith('|')) return;
        if (/^#{1,4}\s/.test(trimmed)) {
            flushList();
            chunks.push(`<strong class="chatbot-mini-heading">${formatInline(trimmed.replace(/^#{1,4}\s/, ''))}</strong>`);
            return;
        }
        if (/^[-*]\s+/.test(trimmed)) {
            listItems.push(trimmed.replace(/^[-*]\s+/, ''));
            return;
        }
        flushList();
        chunks.push(`<p>${formatInline(trimmed)}</p>`);
    });

    flushList();
    return chunks.join('');
}

function formatInline(value) {
    return escapeHtml(value)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/"([^"]+)"/g, '<q>$1</q>');
}

function tokenize(value) {
    return normalizeText(value)
        .split(/\s+/)
        .filter((token) => token.length > 2)
        .filter((token) => !['what', 'why', 'how', 'are', 'the', 'and', 'with', 'for', 'this', 'that', 'does'].includes(token));
}

function normalizeText(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function stripMarkdown(value) {
    return String(value || '')
        .replace(/[#*_`>|-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function slugify(value) {
    return normalizeText(value).replace(/\s+/g, '-').slice(0, 48);
}

function dot(a, b) {
    let total = 0;
    for (let index = 0; index < a.length; index += 1) {
        total += a[index] * b[index];
    }
    return total;
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeAttr(value) {
    return escapeHtml(value);
}
