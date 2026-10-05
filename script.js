"use strict";

/* =========================================================
   CONFIG
========================================================= */

const STORY_PATHS = ["story/prologue.txt", "story/prologue_boss.txt", "story/chapter1.txt", "story/chapter2.txt"];
const LANGUAGE_KEY = "killer-drones-language";
const APP_LAYOUT = document.documentElement.dataset.layout === "mobile" ? "mobile" : "pc";
const SETTINGS_KEY = `killer-drones-settings-${APP_LAYOUT}`;
const LEGACY_SETTINGS_KEY = "killer-drones-settings";
const SAVE_PREFIX = "killer-drones-save-";
const LEGACY_SAVE_PREFIX = SAVE_PREFIX;
const ACHIEVEMENTS_KEY = "killer-drones-achievements";

const SAVE_VERSION = 4;
const SAVE_SLOTS = 6;

const DEFAULT_SETTINGS = {
    showFPS: true,
    quality: APP_LAYOUT === "pc" ? "ultra" : "high",
    effects: true,
    flashingLights: true,
    mouseLight: true,
    textSpeed: 25,
    masterVolume: 1,
    musicVolume: 0.35,
    sfxVolume: 1
};

const MUSIC = {
    menu: "assets/audio/music/menu.ogg",
    menu2: "assets/audio/music/menu2.ogg",
    menu3: "assets/audio/music/menu3.ogg",
    abandoned_hall: "assets/audio/music/abandoned_hall.ogg",
    lament: "assets/audio/music/lament.mp3",
    holyDrama: "assets/audio/music/holyDrama.ogg"
};

const BACKGROUNDS = {
    abandonedHall: "assets/backgrounds/abandonedHall.jpg",
    moreAbandonedd: "assets/backgrounds/moreAbandonedd.jpg",
    files: "assets/backgrounds/files.jpg",
    shards: "assets/backgrounds/shards.webp",
    outside: "assets/backgrounds/outside.jpg"
};
const MOUSE_LIT_BACKGROUNDS = new Set(["files"]);

const SPRITES = {
    Alice: {
        "001": "assets/characters/alice/Alice001.png",
        "002": "assets/characters/alice/Alice002.png",
        "003": "assets/characters/alice/Alice003.png",
        "004": "assets/characters/alice/Alice004.png",
        "005": "assets/characters/alice/Alice005.png",
        "006": "assets/characters/alice/Alice006.png"
    },
    Z: {
        "001": "assets/characters/z/Z001.png",
        "002": "assets/characters/z/Z002.png",
        "003": "assets/characters/z/Z003.png",
        "004": "assets/characters/z/Z004.png"
    },
    Corrode: {
        "001": "assets/characters/corrode/Corrode001.png"
    }
};

const UI_TEXT = {
    en: {
        subtitle: "AN MD AU STORY",
        pressAnyKey: "PRESS ANY KEY TO BEGIN",
        touchToBegin: "TOUCH THE SCREEN TO BEGIN",
        playTitle: "PLAY",
        chapters: "CHAPTERS",
        achievements: "ACHIEVEMENTS",
        playChapter: "PLAY CHAPTER",
        firstSteps: "FIRST STEPS",
        firstStepsDetail: "Begin the story.",
        intoTheFiles: "INTO THE FILES",
        intoTheFilesDetail: "Reach the abandoned files.",
        chapterComplete: "TO BE CONTINUED",
        chapterCompleteDetail: "Finish the available chapter.",
        warningTitle: "SYSTEM WARNING",
        warningEpilepsyTitle: "FLASHING LIGHTS",
        warningEpilepsyText: "This game contains intermittent flashing and glitch effects with high contrast. If you are sensitive to flashing lights, you can disable them below or in Settings. Stop playing if you feel unwell.",
        warningGraphicsTitle: "GRAPHICS AND PERFORMANCE",
        warningGraphicsText: "The PC build runs at Ultra quality and may be demanding on weaker computers. The mobile build lets you choose High, Medium, or Low. You can turn the FPS counter on or off in Settings.",
        warningLanguage: "LANGUAGE",
        warningPrompt: "Disable flashing lights? [Y/N]",
        warningInputLabel: "Type Y to disable flashing lights or N to keep them on",
        flashingLights: "FLASHING LIGHTS",
        mouseLight: "MOUSE LIGHT (L)",
        start: "PLAY",
        continue: "CONTINUE",
        load: "LOAD",
        settings: "SETTINGS",
        credits: "CREDITS",
        back: "BACK",
        settingsTitle: "SETTINGS",
        creditsTitle: "CREDITS",
        finalCreditsTitle: "FINAL CREDITS",
        creatorRole: "CREATOR / DEVELOPER",
        projectRole: "PROJECT",
        techRole: "TECHNOLOGY",
        fontRole: "FONT",
        musicRole: "MUSIC",
        storyReferenceRole: "STORY REFERENCE",
        resetSettings: "RESET SETTINGS",
        language: "LANGUAGE",
        menu: "MENU",
        menuContinue: "CONTINUE",
        menuBack: "BACK",
        menuSave: "SAVE",
        menuLoad: "LOAD",
        menuBackMenu: "BACK TO MENU",
        menuClose: "CLOSE",
        next: "NEXT",
        save: "SAVE",
        loadTitle: "LOAD",
        startTitle: "START",
        empty: "EMPTY",
        delete: "DELETE",
        deleteAll: "DELETE ALL SAVES",
        confirmDelete: slot => `Delete SLOT ${slot}?\n\nThis cannot be undone.`,
        confirmDeleteAll: "Delete ALL saves?\n\nThis cannot be undone.",
        endSpeaker: "SYSTEM",
        chapterEnd: "End of this chapter.\n\nMore content will be added soon.",
        overwrite: slot => `SLOT ${slot} already contains a save.\n\nStart a new game and overwrite it?`,
        saveLine: (chapter, line, date) => `${chapter} — LINE ${line}<br>${date}`,
        fps: "SHOW FPS",
        quality: "QUALITY",
        effects: "VISUAL EFFECTS / SHADERS",
        textSpeed: "TEXT SPEED",
        volume: "MASTER VOLUME",
        musicVolume: "MUSIC VOLUME",
        sfxVolume: "SFX VOLUME",
        low: "LOW",
        medium: "MEDIUM",
        high: "HIGH",
        ultra: "ULTRA",
        off: "OFF",
        on: "ON",
        fast: "FAST",
        normal: "NORMAL",
        slow: "SLOW",
        loading: [
            "INITIALIZING SYSTEM",
            "LOADING ASSETS",
            "LOADING STORY",
            "INITIALIZING AUDIO",
            "READY"
        ]
    },
    "pt-BR": {
        subtitle: "UMA HISTÓRIA AU DE MD",
        pressAnyKey: "APERTE QUALQUER TECLA PARA COMEÇAR",
        touchToBegin: "TOQUE NA TELA PARA COMEÇAR",
        playTitle: "JOGAR",
        chapters: "CAPÍTULOS",
        achievements: "CONQUISTAS",
        playChapter: "JOGAR CAPÍTULO",
        firstSteps: "PRIMEIROS PASSOS",
        firstStepsDetail: "Comece a história.",
        intoTheFiles: "RUMO AOS ARQUIVOS",
        intoTheFilesDetail: "Chegue aos arquivos abandonados.",
        chapterComplete: "CONTINUA...",
        chapterCompleteDetail: "Termine o capítulo disponível.",
        warningTitle: "AVISO DO SISTEMA",
        warningEpilepsyTitle: "LUZES PISCANTES",
        warningEpilepsyText: "O jogo tem efeitos ocasionais de luzes piscantes e glitch com alto contraste. Se você tem sensibilidade a luzes piscantes, pode desativá-las abaixo ou nas opções. Pare de jogar se sentir mal-estar.",
        warningGraphicsTitle: "GRÁFICOS E DESEMPENHO",
        warningGraphicsText: "A versão de PC roda em qualidade Ultra e pode pesar em computadores mais fracos. Na versão mobile, você pode escolher High, Medium ou Low. Nas opções, também dá para ligar ou desligar o contador de FPS.",
        warningLanguage: "IDIOMA",
        warningPrompt: "Desativar luzes piscantes? [Y/N]",
        warningInputLabel: "Digite Y para desativar as luzes ou N para mantê-las",
        flashingLights: "LUZES PISCANTES",
        mouseLight: "LUZ DO MOUSE (L)",
        start: "JOGAR",
        continue: "CONTINUAR",
        load: "CARREGAR",
        settings: "CONFIGURAÇÕES",
        credits: "CRÉDITOS",
        back: "VOLTAR",
        settingsTitle: "CONFIGURAÇÕES",
        creditsTitle: "CRÉDITOS",
        finalCreditsTitle: "CRÉDITOS FINAIS",
        creatorRole: "CRIADOR / DESENVOLVEDOR",
        projectRole: "PROJETO",
        techRole: "TECNOLOGIA",
        fontRole: "FONTE",
        musicRole: "MÚSICA",
        storyReferenceRole: "REFERÊNCIA DA HISTÓRIA",
        resetSettings: "REDEFINIR CONFIGURAÇÕES",
        language: "IDIOMA",
        menu: "MENU",
        menuContinue: "CONTINUAR",
        menuBack: "VOLTAR",
        menuSave: "SALVAR",
        menuLoad: "CARREGAR",
        menuBackMenu: "VOLTAR AO MENU",
        menuClose: "FECHAR",
        next: "PRÓXIMO",
        save: "SALVAR",
        loadTitle: "CARREGAR",
        startTitle: "INICIAR",
        empty: "VAZIO",
        delete: "APAGAR",
        deleteAll: "APAGAR TODOS OS SAVES",
        confirmDelete: slot => `Apagar o SLOT ${slot}?\n\nIsso não pode ser desfeito.`,
        confirmDeleteAll: "Apagar TODOS os saves?\n\nIsso não pode ser desfeito.",
        endSpeaker: "SISTEMA",
        chapterEnd: "Fim deste capítulo.\n\nMais conteúdo será adicionado em breve.",
        overwrite: slot => `O SLOT ${slot} já possui um save.\n\nIniciar um novo jogo e sobrescrevê-lo?`,
        saveLine: (chapter, line, date) => `${chapter} — LINHA ${line}<br>${date}`,
        fps: "MOSTRAR FPS",
        quality: "QUALIDADE",
        effects: "EFEITOS VISUAIS / SHADERS",
        textSpeed: "VELOCIDADE DO TEXTO",
        volume: "VOLUME GERAL",
        musicVolume: "VOLUME DA MÚSICA",
        sfxVolume: "VOLUME DOS SFX",
        low: "BAIXA",
        medium: "MÉDIA",
        high: "ALTA",
        ultra: "ULTRA",
        off: "DESLIGADO",
        on: "LIGADO",
        fast: "RÁPIDA",
        normal: "NORMAL",
        slow: "LENTA",
        loading: [
            "INICIALIZANDO SISTEMA",
            "CARREGANDO RECURSOS",
            "CARREGANDO HISTÓRIA",
            "INICIALIZANDO ÁUDIO",
            "PRONTO"
        ]
    },
    "es-419": {
        subtitle: "UNA HISTORIA AU DE MD",
        pressAnyKey: "PRESIONA CUALQUIER TECLA PARA EMPEZAR",
        touchToBegin: "TOCA LA PANTALLA PARA EMPEZAR",
        playTitle: "JUGAR",
        chapters: "CAPÍTULOS",
        achievements: "LOGROS",
        playChapter: "JUGAR CAPÍTULO",
        firstSteps: "PRIMEROS PASOS",
        firstStepsDetail: "Empieza la historia.",
        intoTheFiles: "RUMBO A LOS ARCHIVOS",
        intoTheFilesDetail: "Llega a los archivos abandonados.",
        chapterComplete: "CONTINUARÁ",
        chapterCompleteDetail: "Termina el capítulo disponible.",
        warningTitle: "AVISO DEL SISTEMA",
        warningEpilepsyTitle: "LUCES INTERMITENTES",
        warningEpilepsyText: "El juego contiene efectos ocasionales de luces intermitentes y glitch con alto contraste. Si eres sensible a las luces intermitentes, puedes desactivarlas abajo o en Configuración. Deja de jugar si te sientes mal.",
        warningGraphicsTitle: "GRÁFICOS Y RENDIMIENTO",
        warningGraphicsText: "La versión de PC funciona con calidad Ultra y puede exigir mucho a equipos menos potentes. En la versión móvil puedes elegir High, Medium o Low. También puedes activar o desactivar el contador de FPS en Configuración.",
        warningLanguage: "IDIOMA",
        warningPrompt: "¿Desactivar las luces intermitentes? [Y/N]",
        warningInputLabel: "Escribe Y para desactivar las luces o N para mantenerlas",
        flashingLights: "LUCES INTERMITENTES",
        mouseLight: "LUZ DEL MOUSE (L)",
        start: "JUGAR",
        continue: "CONTINUAR",
        load: "CARGAR",
        settings: "CONFIGURACIÓN",
        credits: "CRÉDITOS",
        back: "VOLVER",
        settingsTitle: "CONFIGURACIÓN",
        creditsTitle: "CRÉDITOS",
        finalCreditsTitle: "CRÉDITOS FINALES",
        creatorRole: "CREADOR / DESARROLLADOR",
        projectRole: "PROYECTO",
        techRole: "TECNOLOGÍA",
        fontRole: "FUENTE",
        musicRole: "MÚSICA",
        storyReferenceRole: "REFERENCIA DE LA HISTORIA",
        resetSettings: "RESTABLECER CONFIGURACIÓN",
        language: "IDIOMA",
        menu: "MENÚ",
        menuContinue: "CONTINUAR",
        menuBack: "VOLVER",
        menuSave: "GUARDAR",
        menuLoad: "CARGAR",
        menuBackMenu: "VOLVER AL MENÚ",
        menuClose: "CERRAR",
        next: "SIGUIENTE",
        save: "GUARDAR",
        loadTitle: "CARGAR",
        startTitle: "INICIAR",
        empty: "VACÍO",
        delete: "BORRAR",
        deleteAll: "BORRAR TODOS LOS GUARDADOS",
        confirmDelete: slot => `¿Borrar SLOT ${slot}?\n\nEsto no se puede deshacer.`,
        confirmDeleteAll: "¿Borrar TODOS los guardados?\n\nEsto no se puede deshacer.",
        endSpeaker: "SISTEMA",
        chapterEnd: "Fin de este capítulo.\n\nSe añadirá más contenido pronto.",
        overwrite: slot => `El SLOT ${slot} ya contiene un guardado.\n\n¿Iniciar un juego nuevo y sobrescribirlo?`,
        saveLine: (chapter, line, date) => `${chapter} — LÍNEA ${line}<br>${date}`,
        fps: "MOSTRAR FPS",
        quality: "CALIDAD",
        effects: "EFECTOS VISUALES / SHADERS",
        textSpeed: "VELOCIDAD DEL TEXTO",
        volume: "VOLUMEN GENERAL",
        musicVolume: "VOLUMEN DE MÚSICA",
        sfxVolume: "VOLUMEN DE SFX",
        low: "BAJA",
        medium: "MEDIA",
        high: "ALTA",
        ultra: "ULTRA",
        off: "DESACTIVADO",
        on: "ACTIVADO",
        fast: "RÁPIDA",
        normal: "NORMAL",
        slow: "LENTA",
        loading: [
            "INICIALIZANDO SISTEMA",
            "CARGANDO RECURSOS",
            "CARGANDO HISTORIA",
            "INICIALIZANDO AUDIO",
            "LISTO"
        ]
    }
};

/* =========================================================
   STATE
========================================================= */

let dom = {};

let currentLanguage = safeGetLocalStorage(LANGUAGE_KEY) || "en";
if (!UI_TEXT[currentLanguage]) currentLanguage = "en";

let settings = loadSettings();

let storyLines = [];
let storyLoaded = false;

let currentLine = 0;
let currentChapter = "Prologue";
let currentBackground = null;
let currentWeather = null;
let currentMusicName = null;

let storyStarted = false;
let chapterFinished = false;
let cinematicPlaying = false;
let titleIntroDismissed = false;
let activeSaveSlot = null;
let choiceHistory = {};
let availableChapters = [];
let selectedChapterIndex = 0;
let saveCarouselIndex = 1;
let saveChapterCarouselIndex = 0;

let saveMode = "load";
let saveReturnTo = "title";
let saveChapterScope = "Prologue";
let vnMenuOpen = false;

let isTyping = false;
let typewriterTimer = null;
let typewriterToken = 0;

let initialized = false;
let menu2Music = null;
let menu2Available = false;
let menu3Music = null;
let finalCreditsOpen = false;

let fpsFrames = 0;
let fpsLastTime = performance.now();
let fpsValue = 0;

const audioFadeTokens = new WeakMap();

/* =========================================================
   STORAGE / SAFETY
========================================================= */

function safeGetLocalStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch (_) {
        return null;
    }
}

function safeSetLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (_) {
        return false;
    }
}

function safeRemoveLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (_) {
        return false;
    }
}

function loadSettings() {
    const layoutSettings = safeGetLocalStorage(SETTINGS_KEY);
    const raw = layoutSettings || safeGetLocalStorage(LEGACY_SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };

    try {
        const parsed = JSON.parse(raw);
        const loaded = {
            ...DEFAULT_SETTINGS,
            ...(parsed && typeof parsed === "object" ? parsed : {})
        };
        if (!layoutSettings && APP_LAYOUT === "mobile" && loaded.quality === "ultra") {
            loaded.quality = "high";
        }
        return loaded;
    } catch (_) {
        return { ...DEFAULT_SETTINGS };
    }
}

function saveSettings() {
    safeSetLocalStorage(SETTINGS_KEY, JSON.stringify(settings));
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getUI() {
    return UI_TEXT[currentLanguage] || UI_TEXT.en;
}

function normalizeSettings() {
    if (!["low", "medium", "high", "ultra"].includes(settings.quality)) {
        settings.quality = APP_LAYOUT === "pc" ? "ultra" : "high";
    }

    settings.effects = Boolean(settings.effects);
    settings.flashingLights = Boolean(settings.flashingLights);
    settings.mouseLight = Boolean(settings.mouseLight);
    settings.showFPS = Boolean(settings.showFPS);

    settings.textSpeed = clamp(Number(settings.textSpeed) || 25, 5, 80);
    settings.masterVolume = clamp(Number(settings.masterVolume), 0, 1);
    settings.musicVolume = clamp(Number(settings.musicVolume), 0, 1);
    settings.sfxVolume = clamp(Number(settings.sfxVolume), 0, 1);
}

/* =========================================================
   DOM
========================================================= */

function cacheDOM() {
    const ids = [
        "loading-screen", "loading-progress", "loading-percent",
        "warning-screen", "warning-title", "warning-epilepsy-title",
        "warning-epilepsy-text", "warning-graphics-title",
        "warning-graphics-text", "warning-language-label", "warning-prompt",
        "warning-command-input",
        "title-screen", "game-subtitle", "title-start-prompt", "start-button", "continue-button",
        "load-title-button", "settings-button", "credits-button",

        "play-screen", "play-title", "chapters-tab", "achievements-tab",
        "chapters-panel", "achievements-panel", "chapter-card", "chapter-previous",
        "chapter-next", "play-chapter-button", "play-back-button", "achievement-list",

        "settings-screen", "credits-screen", "credits-title", "credits-back-button",
        "settings-reset-button",
        "settings-title", "settings-language-label",
        "settings-back-button",

        "settings-fps", "settings-quality", "settings-effects",
        "settings-flashing-lights", "settings-mouse-light",
        "settings-text-speed", "settings-volume", "settings-music-volume",
        "settings-sfx-volume",

        "fps-counter",

        "save-screen", "save-screen-title", "save-slots", "save-previous", "save-next",
        "save-chapter-filter", "save-chapter-name", "save-chapter-previous", "save-chapter-next",
        "save-back-button", "delete-all-saves-button",

        "story-screen", "background", "weather", "characters", "cutscene-video",
        "alice", "z", "corrode", "dialogue-box", "speaker", "dialogue-text",
        "next-button", "vn-menu-button", "vn-menu", "vn-menu-title",
        "vn-continue", "vn-back-line", "vn-save", "vn-load",
        "vn-back-menu", "vn-close", "choice-container",

        "menu-music", "menu2-music", "story-music",
        "text-sound", "button-sound", "hover-sound", "warning-sound", "flashlight-sound", "vignette"
    ];

    for (const id of ids) {
        dom[id.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] =
            document.getElementById(id);
    }

    dom.loadingSteps = [1, 2, 3, 4, 5]
        .map(n => document.getElementById(`loading-step-${n}`));

    dom.loadingTexts = [1, 2, 3, 4, 5]
        .map(n => document.getElementById(`loading-text-${n}`));

    dom.languageButtons = document.querySelectorAll(".language-button");
}

function showScreen(screen) {
    if (
        dom.warningScreen?.classList.contains("active") &&
        screen !== dom.warningScreen &&
        dom.warningSound
    ) {
        safePause(dom.warningSound);
        dom.warningSound.currentTime = 0;
        dom.warningSound.dataset.pending = "0";
        dom.warningSound.dataset.started = "0";
    }

    const screens = [
        dom.loadingScreen,
        dom.warningScreen,
        dom.titleScreen,
        dom.playScreen,
        dom.settingsScreen,
        dom.creditsScreen,
        dom.saveScreen,
        dom.storyScreen
    ];

    for (const element of screens) {
        if (element) element.classList.remove("active");
    }

    if (screen) screen.classList.add("active");
    if (dom.fpsCounter) {
        const visibleMenu = Boolean(screen && screen !== dom.loadingScreen && screen !== dom.warningScreen);
        dom.fpsCounter.style.display = settings.showFPS && visibleMenu ? "block" : "none";
    }
}

function dismissTitleIntro() {
    if (titleIntroDismissed || !dom.titleScreen?.classList.contains("active")) return;
    requestGameFullscreen();
    titleIntroDismissed = true;
    dom.titleScreen.classList.remove("title-gated");
    playButtonSound();
}

function requestGameFullscreen() {
    if (document.fullscreenElement) return;
    const root = document.documentElement;
    const request = root.requestFullscreen || root.webkitRequestFullscreen || root.msRequestFullscreen;
    if (typeof request !== "function") return;
    try {
        const result = request === root.requestFullscreen
            ? request.call(root, { navigationUI: "hide" })
            : request.call(root);
        result?.catch?.(() => {});
    } catch (_) {}
}

function getAvailableChapters() {
    const chapters = (storyLines.chapters || []).map(chapter => ({ ...chapter }));
    storyLines.forEach((line, index) => {
        const title = line.chapter || "Prologue";
        const existing = chapters.find(chapter => chapter.title === title);
        if (!existing) {
            chapters.push({ title, startLine: index, background: line.background, ready: true });
        } else if (!existing.ready) {
            existing.startLine = index;
            existing.background = line.background;
            existing.ready = true;
        }
    });
    return chapters;
}

function renderChapterCarousel() {
    if (!dom.chapterCard) return;
    availableChapters = getAvailableChapters();
    if (!availableChapters.length) return;
    selectedChapterIndex = (selectedChapterIndex + availableChapters.length) % availableChapters.length;
    const chapter = availableChapters[selectedChapterIndex];
    const background = BACKGROUNDS[chapter.banner || chapter.background] || BACKGROUNDS.abandonedHall;
    dom.chapterCard.classList.remove("carousel-arrive");
    void dom.chapterCard.offsetWidth;
    dom.chapterCard.classList.add("carousel-arrive");
    dom.chapterCard.textContent = "";
    dom.chapterCard.style.backgroundImage = `linear-gradient(rgba(0,0,0,.38), rgba(0,0,0,.88)), url("${background}")`;
    const index = document.createElement("span");
    index.className = "chapter-index";
    index.textContent = `${String(selectedChapterIndex + 1).padStart(2, "0")} / ${String(availableChapters.length).padStart(2, "0")}`;
    const title = document.createElement("h3");
    title.textContent = chapter.title;
    const status = document.createElement("p");
    status.textContent = chapter.ready
        ? (currentLanguage === "pt-BR" ? "CAPÍTULO DISPONÍVEL" : currentLanguage === "es-419" ? "CAPÍTULO DISPONIBLE" : "CHAPTER AVAILABLE")
        : (currentLanguage === "pt-BR" ? "AGUARDANDO HISTÓRIA" : currentLanguage === "es-419" ? "ESPERANDO LA HISTORIA" : "STORY NOT WRITTEN YET");
    if (dom.playChapterButton) {
        dom.playChapterButton.disabled = !chapter.ready;
        dom.playChapterButton.setAttribute("aria-disabled", String(!chapter.ready));
    }
    dom.chapterCard.append(index, title, status);
}

function getUnlockedAchievements() {
    try {
        const parsed = JSON.parse(safeGetLocalStorage(ACHIEVEMENTS_KEY) || "{}");
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
        return {};
    }
}

function unlockAchievement(id) {
    const unlocked = getUnlockedAchievements();
    if (unlocked[id]) return;
    unlocked[id] = Date.now();
    safeSetLocalStorage(ACHIEVEMENTS_KEY, JSON.stringify(unlocked));
    renderAchievements();
}

function renderAchievements() {
    if (!dom.achievementList) return;
    const ui = getUI();
    const unlocked = getUnlockedAchievements();
    const definitions = [
        ["firstSteps", ui.firstSteps, ui.firstStepsDetail],
        ["intoTheFiles", ui.intoTheFiles, ui.intoTheFilesDetail],
        ["chapterComplete", ui.chapterComplete, ui.chapterCompleteDetail]
    ];
    dom.achievementList.textContent = "";
    for (const [id, titleText, detailText] of definitions) {
        const item = document.createElement("article");
        item.className = `achievement-card${unlocked[id] ? " unlocked" : " locked"}`;
        const icon = document.createElement("span");
        icon.className = "achievement-icon";
        icon.textContent = unlocked[id] ? "◆" : "◇";
        const title = document.createElement("h3");
        title.textContent = unlocked[id] ? titleText : "???";
        const detail = document.createElement("p");
        detail.textContent = unlocked[id] ? detailText : "????????????????";
        item.append(icon, title, detail);
        dom.achievementList.appendChild(item);
    }
}

async function openPlayScreen() {
    playButtonSound();
    if (!storyLoaded) await loadStory();
    renderChapterCarousel();
    renderAchievements();
    showScreen(dom.playScreen);
    await transitionToSubmenuMusic();
}

function showPlayTab(tab) {
    const achievements = tab === "achievements";
    dom.chaptersPanel?.toggleAttribute("hidden", achievements);
    dom.achievementsPanel?.toggleAttribute("hidden", !achievements);
    dom.chaptersTab?.classList.toggle("active", !achievements);
    dom.achievementsTab?.classList.toggle("active", achievements);
    if (achievements) renderAchievements();
}

/* =========================================================
   UI
========================================================= */

function updateUI() {
    const ui = getUI();

    const setText = (element, value) => {
        if (element) element.textContent = value;
    };

    setText(dom.gameSubtitle, ui.subtitle);
    setText(dom.titleStartPrompt, APP_LAYOUT === "mobile" ? ui.touchToBegin : ui.pressAnyKey);
    setText(dom.playTitle, ui.playTitle);
    setText(dom.chaptersTab, ui.chapters);
    setText(dom.achievementsTab, ui.achievements);
    setText(dom.playChapterButton, ui.playChapter);
    setText(dom.warningTitle, ui.warningTitle);
    setText(dom.warningEpilepsyTitle, ui.warningEpilepsyTitle);
    setText(dom.warningEpilepsyText, ui.warningEpilepsyText);
    setText(dom.warningGraphicsTitle, ui.warningGraphicsTitle);
    setText(dom.warningGraphicsText, ui.warningGraphicsText);
    setText(dom.warningLanguageLabel, ui.warningLanguage);
    setText(dom.warningPrompt, ui.warningPrompt);
    if (dom.warningCommandInput) {
        dom.warningCommandInput.setAttribute("aria-label", ui.warningInputLabel);
    }
    setText(dom.startButton, ui.start);
    setText(dom.continueButton, ui.continue);
    setText(dom.loadTitleButton, ui.load);
    setText(dom.settingsButton, ui.settings);
    setText(dom.creditsButton, ui.credits);

    setText(dom.settingsTitle, ui.settingsTitle);
    setText(dom.creditsTitle, finalCreditsOpen ? ui.finalCreditsTitle : ui.creditsTitle);
    document.querySelectorAll(".music-credit-role").forEach(element => {
        element.textContent = ui.musicRole;
    });
    document.querySelectorAll(".story-reference-role").forEach(element => {
        element.textContent = ui.storyReferenceRole;
    });
    setText(dom.settingsLanguageLabel, ui.language);
    setText(dom.settingsBackButton, ui.back);

    setText(dom.nextButton, ui.next);

    setText(dom.vnMenuTitle, ui.menu);
    setText(dom.vnContinue, ui.menuContinue);
    setText(dom.vnBackLine, ui.menuBack);
    setText(dom.vnSave, ui.menuSave);
    setText(dom.vnLoad, ui.menuLoad);
    setText(dom.vnBackMenu, ui.menuBackMenu);
    setText(dom.vnClose, ui.menuClose);

    if (dom.loadingTexts) {
        dom.loadingTexts.forEach((element, index) => {
            if (element) element.textContent = ui.loading[index] || "";
        });
    }

    if (dom.settingsFps) {
        dom.settingsFps.parentElement?.querySelector(".setting-label") &&
            (dom.settingsFps.parentElement.querySelector(".setting-label").textContent = ui.fps);
    }

    if (dom.settingsQuality) {
        dom.settingsQuality.parentElement?.querySelector(".setting-label") &&
            (dom.settingsQuality.parentElement.querySelector(".setting-label").textContent = ui.quality);
    }

    if (dom.settingsEffects) {
        dom.settingsEffects.parentElement?.querySelector(".setting-label") &&
            (dom.settingsEffects.parentElement.querySelector(".setting-label").textContent = ui.effects);
    }

    if (dom.settingsFlashingLights) {
        dom.settingsFlashingLights.parentElement?.querySelector(".setting-label") &&
            (dom.settingsFlashingLights.parentElement.querySelector(".setting-label").textContent = ui.flashingLights);
    }

    if (dom.settingsMouseLight) {
        dom.settingsMouseLight.parentElement?.querySelector(".setting-label") &&
            (dom.settingsMouseLight.parentElement.querySelector(".setting-label").textContent = ui.mouseLight);
    }

    if (dom.settingsTextSpeed) {
        dom.settingsTextSpeed.parentElement?.querySelector(".setting-label") &&
            (dom.settingsTextSpeed.parentElement.querySelector(".setting-label").textContent = ui.textSpeed);
    }

    if (dom.settingsVolume) {
        dom.settingsVolume.parentElement?.querySelector(".setting-label") &&
            (dom.settingsVolume.parentElement.querySelector(".setting-label").textContent = ui.volume);
    }

    if (dom.settingsMusicVolume) {
        dom.settingsMusicVolume.parentElement?.querySelector(".setting-label") &&
            (dom.settingsMusicVolume.parentElement.querySelector(".setting-label").textContent = ui.musicVolume);
    }

    if (dom.settingsSfxVolume) {
        dom.settingsSfxVolume.parentElement?.querySelector(".setting-label") &&
            (dom.settingsSfxVolume.parentElement.querySelector(".setting-label").textContent = ui.sfxVolume);
    }

    if (dom.settingsResetButton) {
        dom.settingsResetButton.textContent = ui.resetSettings;
    }

    if (dom.deleteAllSavesButton) {
        dom.deleteAllSavesButton.textContent = ui.deleteAll;
    }
}

function updateLanguageButtons() {
    if (!dom.languageButtons) return;

    dom.languageButtons.forEach(button => {
        button.classList.toggle(
            "selected",
            button.dataset.language === currentLanguage
        );
    });
}

function updateSettingsUI() {
    normalizeSettings();

    if (dom.settingsFps) {
        dom.settingsFps.checked = settings.showFPS;
        dom.settingsFps.disabled = false;
    }
    if (dom.settingsEffects) dom.settingsEffects.checked = settings.effects;
    if (dom.settingsFlashingLights) dom.settingsFlashingLights.checked = settings.flashingLights;
    if (dom.settingsMouseLight) {
        dom.settingsMouseLight.checked = settings.mouseLight && mouseLightingAvailable;
        dom.settingsMouseLight.disabled = !mouseLightingAvailable;
    }

    if (dom.settingsQuality) {
        dom.settingsQuality.value = settings.quality;
        dom.settingsQuality.disabled = false;
    }
    if (dom.settingsEffects) dom.settingsEffects.disabled = false;
    if (dom.settingsTextSpeed) dom.settingsTextSpeed.value = String(settings.textSpeed);
    if (dom.settingsVolume) dom.settingsVolume.value = String(settings.masterVolume);
    if (dom.settingsMusicVolume) dom.settingsMusicVolume.value = String(settings.musicVolume);
    if (dom.settingsSfxVolume) dom.settingsSfxVolume.value = String(settings.sfxVolume);

    const textSpeedValue = document.getElementById("settings-text-speed-value");
    const volumeValue = document.getElementById("settings-volume-value");
    const musicVolumeValue = document.getElementById("settings-music-volume-value");
    const sfxVolumeValue = document.getElementById("settings-sfx-volume-value");

    if (textSpeedValue) textSpeedValue.textContent = String(settings.textSpeed);
    if (volumeValue) volumeValue.textContent = `${Math.round(settings.masterVolume * 100)}%`;
    if (musicVolumeValue) musicVolumeValue.textContent = `${Math.round(settings.musicVolume * 100)}%`;
    if (sfxVolumeValue) sfxVolumeValue.textContent = `${Math.round(settings.sfxVolume * 100)}%`;

    document.documentElement.dataset.quality = settings.quality;
    document.documentElement.dataset.effects = settings.effects ? "on" : "off";
    document.documentElement.dataset.flashingLights = settings.flashingLights ? "on" : "off";
    document.documentElement.dataset.mouseLight = settings.mouseLight ? "on" : "off";

    if (dom.fpsCounter) {
        updateFPSVisibility();
    }

    applyAudioVolumes();
    updateShaderQuality();
}

/* =========================================================
   LOADING
========================================================= */

function setLoadingProgress(percent, stepIndex) {
    const value = clamp(Number(percent) || 0, 0, 100);

    if (dom.loadingProgress) {
        dom.loadingProgress.style.width = `${value}%`;
    }

    if (dom.loadingPercent) {
        dom.loadingPercent.textContent = `${Math.round(value)}%`;
    }

    if (dom.loadingSteps) {
        dom.loadingSteps.forEach((step, index) => {
            if (!step) return;

            step.classList.toggle("active", index <= stepIndex);
            step.classList.toggle("done", index < stepIndex);
        });
    }
}

function preloadImage(src) {
    return new Promise(resolve => {
        const image = new Image();

        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);

        image.src = src;
    });
}

function preloadAudio(src) {
    return new Promise(resolve => {
        const audio = new Audio();
        let doneCalled = false;

        const done = () => {
            if (doneCalled) return;
            doneCalled = true;
            resolve(true);
        };

        audio.preload = "auto";
        audio.addEventListener("canplaythrough", done, { once: true });
        audio.addEventListener("error", done, { once: true });

        audio.src = src;
        audio.load();

        setTimeout(done, 1800);
    });
}

/* =========================================================
   AUDIO
========================================================= */

function getMasterMusicVolume() {
    return clamp(settings.masterVolume * settings.musicVolume, 0, 1);
}

function getSFXVolume() {
    return clamp(settings.masterVolume * settings.sfxVolume, 0, 1);
}

function applyAudioVolumes() {
    if (dom.menuMusic) {
        dom.menuMusic.volume = clamp(
            dom.menuMusic.dataset.playing === "1"
                ? getMasterMusicVolume()
                : 0,
            0,
            1
        );
    }

    if (menu2Music) {
        menu2Music.volume = clamp(
            menu2Music.dataset.playing === "1"
                ? getMasterMusicVolume()
                : 0,
            0,
            1
        );
    }

    if (menu3Music) {
        menu3Music.volume = clamp(
            menu3Music.dataset.playing === "1" ? getMasterMusicVolume() : 0,
            0,
            1
        );
    }

    if (dom.storyMusic) {
        dom.storyMusic.volume = clamp(
            dom.storyMusic.dataset.playing === "1"
                ? getMasterMusicVolume()
                : 0,
            0,
            1
        );
    }

    if (dom.textSound) dom.textSound.volume = getSFXVolume();
    if (dom.buttonSound) dom.buttonSound.volume = getSFXVolume();
    if (dom.hoverSound) dom.hoverSound.volume = getSFXVolume();
    if (dom.warningSound) dom.warningSound.volume = getSFXVolume();
    if (dom.flashlightSound) dom.flashlightSound.volume = getSFXVolume();
}

function safePlay(audio) {
    if (!audio) return;

    try {
        const promise = audio.play();

        if (promise && typeof promise.catch === "function") {
            promise.catch(() => {});
        }
    } catch (_) {}
}

function safePause(audio) {
    if (!audio) return;

    try {
        audio.pause();
    } catch (_) {}
}

function playFlashlightSound() {
    if (!dom.flashlightSound) return;
    dom.flashlightSound.currentTime = 0;
    dom.flashlightSound.volume = getSFXVolume();
    safePlay(dom.flashlightSound);
}

function playWarningBroadcast() {
    const audio = dom.warningSound;
    if (!audio || audio.dataset.started === "1" || audio.dataset.pending === "1") return;

    audio.volume = getSFXVolume();
    audio.currentTime = 0;
    audio.dataset.pending = "1";
    try {
        const playback = audio.play();
        if (playback && typeof playback.then === "function") {
            playback.then(() => {
                audio.dataset.pending = "0";
                audio.dataset.started = "1";
            }).catch(() => {
                audio.dataset.pending = "0";
            });
        } else {
            audio.dataset.pending = "0";
            audio.dataset.started = "1";
        }
    } catch (_) {
        audio.dataset.pending = "0";
    }
}

function fadeAudio(audio, targetVolume, duration = 450) {
    if (!audio) return Promise.resolve();

    let token = (audioFadeTokens.get(audio) || 0) + 1;
    audioFadeTokens.set(audio, token);

    const startVolume = Number.isFinite(audio.volume) ? audio.volume : 0;
    const target = clamp(targetVolume, 0, 1);

    if (duration <= 0) {
        audio.volume = target;
        return Promise.resolve();
    }

    return new Promise(resolve => {
        const start = performance.now();

        const tick = now => {
            if (audioFadeTokens.get(audio) !== token) {
                resolve();
                return;
            }

            const progress = clamp((now - start) / duration, 0, 1);
            const eased = progress * (2 - progress);

            audio.volume = clamp(
                startVolume + (target - startVolume) * eased,
                0,
                1
            );

            if (progress >= 1) {
                resolve();
                return;
            }

            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    });
}

function createMenu2Audio() {
    if (menu2Music) return menu2Music;

    const existing = dom.menu2Music;

    menu2Music = existing || new Audio();
    menu2Music.loop = true;
    menu2Music.preload = "auto";
    menu2Music.volume = 0;
    menu2Music.dataset.playing = "0";

    const configuredSource = existing?.getAttribute("src");
    const source = configuredSource || MUSIC.menu2;

    if (source) menu2Music.src = source;

    menu2Music.addEventListener("error", () => {
        menu2Available = false;
    });

    menu2Music.addEventListener("canplaythrough", () => {
        menu2Available = true;
    });

    if (!configuredSource) {
        menu2Available = false;
    }

    return menu2Music;
}

function createMenu3Audio() {
    if (menu3Music) return menu3Music;
    menu3Music = new Audio(MUSIC.menu3);
    menu3Music.loop = true;
    menu3Music.preload = "auto";
    menu3Music.volume = 0;
    menu3Music.dataset.playing = "0";
    return menu3Music;
}

async function startMenuMusic() {
    if (!dom.menuMusic) return;

    createMenu3Audio();
    menu3Music.dataset.playing = "0";
    await fadeAudio(menu3Music, 0, 250);
    safePause(menu3Music);

    dom.menuMusic.loop = true;
    dom.menuMusic.dataset.playing = "1";

    safePlay(dom.menuMusic);
    await fadeAudio(dom.menuMusic, getMasterMusicVolume(), 450);
}

async function stopMenuMusic() {
    if (!dom.menuMusic) return;

    dom.menuMusic.dataset.playing = "0";

    await fadeAudio(dom.menuMusic, 0, 350);
    safePause(dom.menuMusic);
}

async function transitionToSubmenuMusic() {
    createMenu2Audio();
    createMenu3Audio();

    if (!menu2Available) {
        menu3Music.dataset.playing = "0";
        await fadeAudio(menu3Music, 0, 300);
        safePause(menu3Music);
        return;
    }

    safePlay(dom.menuMusic);
    safePlay(menu2Music);
    menu3Music.dataset.playing = "0";

    dom.menuMusic.dataset.playing = "0";
    menu2Music.dataset.playing = "1";

    await Promise.all([
        fadeAudio(dom.menuMusic, 0, 450),
        fadeAudio(menu2Music, getMasterMusicVolume(), 450),
        fadeAudio(menu3Music, 0, 300)
    ]);

    safePause(dom.menuMusic);
    safePause(menu3Music);
}

async function transitionToStartMenuMusic() {
    createMenu2Audio();
    createMenu3Audio();
    safePlay(menu3Music);
    menu3Music.dataset.playing = "1";
    dom.menuMusic.dataset.playing = "0";
    if (menu2Music) menu2Music.dataset.playing = "0";
    await Promise.all([
        fadeAudio(dom.menuMusic, 0, 400),
        fadeAudio(menu2Music, 0, 400),
        fadeAudio(menu3Music, getMasterMusicVolume(), 400)
    ]);
    safePause(dom.menuMusic);
    safePause(menu2Music);
}

async function transitionToMainMenuMusic() {
    createMenu2Audio();
    createMenu3Audio();

    safePlay(dom.menuMusic);
    dom.menuMusic.dataset.playing = "1";

    if (menu2Music) menu2Music.dataset.playing = "0";
    menu3Music.dataset.playing = "0";
    await Promise.all([
        fadeAudio(menu2Music, 0, 450),
        fadeAudio(menu3Music, 0, 450),
        fadeAudio(dom.menuMusic, getMasterMusicVolume(), 450)
    ]);

    safePause(menu2Music);
    safePause(menu3Music);
}

async function playStoryMusic(
    musicName,
    { fromMenu2 = false, restart = false } = {}
) {
    if (!musicName || !dom.storyMusic) return;

    const src = MUSIC[musicName] || musicName;

    let absoluteSrc;

    try {
        absoluteSrc = new URL(src, document.baseURI).href;
    } catch (_) {
        absoluteSrc = src;
    }

    if (
        !restart &&
        currentMusicName === musicName &&
        dom.storyMusic.src === absoluteSrc &&
        !dom.storyMusic.paused
    ) {
        return;
    }

    dom.storyMusic.loop = true;

    if (dom.storyMusic.src !== absoluteSrc) {
        safePause(dom.storyMusic);
        dom.storyMusic.src = src;
        dom.storyMusic.load();
    }

    currentMusicName = musicName;
    dom.storyMusic.dataset.playing = "1";
    dom.storyMusic.volume = fromMenu2 ? 0 : Math.min(
        dom.storyMusic.volume,
        getMasterMusicVolume()
    );

    safePlay(dom.storyMusic);

    const menuFade = fadeAudio(dom.menuMusic, 0, 500);
    if (menu3Music) menu3Music.dataset.playing = "0";
    const menu3Fade = fadeAudio(menu3Music, 0, 450);

    if (fromMenu2 && menu2Available) {
        dom.menuMusic.dataset.playing = "0";
        menu2Music.dataset.playing = "0";

        await Promise.all([
            menuFade,
            menu3Fade,
            fadeAudio(menu2Music, 0, 500),
            fadeAudio(
                dom.storyMusic,
                getMasterMusicVolume(),
                650
            )
        ]);

        safePause(dom.menuMusic);
        safePause(menu2Music);
    } else {
        dom.menuMusic.dataset.playing = "0";

        await Promise.all([
            menuFade,
            menu3Fade,
            fadeAudio(
                dom.storyMusic,
                getMasterMusicVolume(),
                450
            )
        ]);

        safePause(dom.menuMusic);
    }
    safePause(menu3Music);
}

async function stopStoryMusic() {
    if (!dom.storyMusic) return;

    dom.storyMusic.dataset.playing = "0";

    await fadeAudio(dom.storyMusic, 0, 350);
    safePause(dom.storyMusic);

    currentMusicName = null;
}

function playButtonSound() {
    if (!dom.buttonSound) return;

    try {
        dom.buttonSound.volume = getSFXVolume();
        dom.buttonSound.currentTime = 0;

        const promise = dom.buttonSound.play();

        if (promise?.catch) promise.catch(() => {});
    } catch (_) {}
}

function playHoverSound() {
    if (!dom.hoverSound) return;
    try {
        dom.hoverSound.volume = getSFXVolume();
        dom.hoverSound.currentTime = 0;
        const promise = dom.hoverSound.play();
        if (promise?.catch) promise.catch(() => {});
    } catch (_) {}
}

function playTextSound() {
    if (!dom.textSound) return;

    try {
        dom.textSound.volume = getSFXVolume();
        dom.textSound.currentTime = 0;

        const promise = dom.textSound.play();

        if (promise?.catch) promise.catch(() => {});
    } catch (_) {}
}

/* =========================================================
   STORY PARSER
========================================================= */

function parseStory(text) {
    const rawLines = String(text || "")
        .replace(/\r/g, "")
        .split("\n");

    const lines = [];
    const labels = {};

    let background = null;
    let weather = null;
    let music = null;
    let chapter = "Prologue";

    let currentDialogue = null;
    let language = null;
    let languageBuffer = [];

    let currentCharacter = null;
    let currentSprite = "001";
    let nextDialogueIsAction = false;

    let characterStates = { Alice: "001", Z: "001", Corrode: "001" };
    let visibleCharacters = { Alice: true, Z: false, Corrode: false };

    let activeChoice = null;
    let activeOption = null;
    const chapters = [];

    function registerChapter(title) {
        let entry = chapters.find(item => item.title === title);
        if (!entry) {
            entry = { title, startLine: null, background: background || "abandonedHall", ready: false };
            chapters.push(entry);
        }
        return entry;
    }

    const clone = value => JSON.parse(JSON.stringify(value));

    function flushLanguage() {
        if (!currentDialogue || !language) {
            languageBuffer = [];
            return;
        }
        const value = languageBuffer.join("\n").trim();
        if (value) currentDialogue.texts[language] = value;
        languageBuffer = [];
    }

    function flushDialogue() {
        flushLanguage();
        language = null;
        if (!currentDialogue) return;
        if (Object.keys(currentDialogue.texts).length > 0) {
            const chapterEntry = registerChapter(currentDialogue.chapter || chapter);
            if (chapterEntry.startLine === null) {
                chapterEntry.startLine = lines.length;
                chapterEntry.background = currentDialogue.background || chapterEntry.background;
                chapterEntry.ready = true;
            }
            lines.push(currentDialogue);
        }
        currentDialogue = null;
    }

    function flushOptionLanguage() {
        if (!activeOption || !language) {
            languageBuffer = [];
            return;
        }
        const value = languageBuffer.join("\n").trim();
        if (value) activeOption.texts[language] = value;
        languageBuffer = [];
    }

    function finishOption() {
        flushOptionLanguage();
        language = null;
        if (!activeChoice || !activeOption) return;
        if (Object.keys(activeOption.texts).length > 0) {
            activeChoice.options.push(activeOption);
        }
        activeOption = null;
    }

    function finishChoice() {
        finishOption();
        if (!activeChoice) return;
        if (activeChoice.options.length > 0) {
            const chapterEntry = registerChapter(activeChoice.chapter || chapter);
            if (chapterEntry.startLine === null) {
                chapterEntry.startLine = lines.length;
                chapterEntry.background = activeChoice.background || chapterEntry.background;
                chapterEntry.ready = true;
            }
            lines.push(activeChoice);
        }
        activeChoice = null;
    }

    function beginDialogue(character, sprite) {
        flushDialogue();
        currentCharacter = character;
        currentSprite = sprite || characterStates[character] || "001";
        if (characterStates[character]) characterStates[character] = currentSprite;
        if (Object.prototype.hasOwnProperty.call(visibleCharacters, character)) {
            visibleCharacters[character] = true;
        }
        currentDialogue = {
            type: "dialogue",
            character,
            sprite: currentSprite,
            texts: {},
            background,
            weather,
            music,
            chapter,
            characterStates: clone(characterStates),
            visibleCharacters: clone(visibleCharacters)
        };
    }

    function beginChoice() {
        flushDialogue();
        finishChoice();
        activeChoice = {
            type: "choice",
            id: `choice_${lines.length}`,
            options: [],
            background,
            weather,
            music,
            chapter,
            characterStates: clone(characterStates),
            visibleCharacters: clone(visibleCharacters)
        };
    }

    for (let i = 0; i < rawLines.length; i++) {
        const raw = rawLines[i];
        const line = raw.trim();
        if (!line) continue;

        if (activeOption) {
            const nextOption = line.match(/^@option\s+(.+)$/i);

            if (nextOption) {
                finishOption();
                activeOption = {
                    target: nextOption[1].trim(),
                    texts: {}
                };
                language = null;
                languageBuffer = [];
                continue;
            }

            if (/^@endoption$/i.test(line)) {
                finishOption();
                continue;
            }

            if (/^@endchoice$/i.test(line)) {
                finishOption();
                finishChoice();
                continue;
            }

            const languageStart = line.match(/^\[([^\]/]+)\]$/);
            if (languageStart) {
                flushOptionLanguage();
                language = languageStart[1].trim();
                languageBuffer = [];
                continue;
            }
            if (/^\[\/[^\]]+\]$/.test(line)) {
                flushOptionLanguage();
                language = null;
                continue;
            }
            if (language) languageBuffer.push(raw.trim());
            continue;
        }

        if (activeChoice) {
            const optionMatch = line.match(/^@option\s+(.+)$/i);
            if (optionMatch) {
                finishOption();
                activeOption = { target: optionMatch[1].trim(), texts: {} };
                language = null;
                languageBuffer = [];
                continue;
            }
            if (/^@endchoice$/i.test(line)) {
                finishChoice();
                continue;
            }
            continue;
        }

        if (/^@choice$/i.test(line)) {
            beginChoice();
            continue;
        }

        if (/^@endbranch$/i.test(line)) {
            flushDialogue();
            const branchEnd = lines[lines.length - 1];
            if (branchEnd?.type === "dialogue") branchEnd.endBranch = true;
            continue;
        }

        const labelMatch = line.match(/^@label\s+(.+)$/i);
        if (labelMatch) {
            flushDialogue();
            finishChoice();
            const label = labelMatch[1].trim();
            if (label) labels[label] = lines.length;
            continue;
        }

        if (line.startsWith("#")) {
            const chapterMatch = line.match(/^#\s*Chapter:\s*(.+)$/i);
            if (chapterMatch) {
                chapter = chapterMatch[1].trim();
                registerChapter(chapter);
            }
            const bannerMatch = line.match(/^#\s*Banner:\s*(.+)$/i);
            if (bannerMatch) registerChapter(chapter).banner = bannerMatch[1].trim();
            continue;
        }

        if (line.startsWith("@background")) {
            flushDialogue();
            background = line.replace(/^@background/i, "").trim() || null;
            continue;
        }

        if (line.startsWith("@weather")) {
            flushDialogue();
            weather = line.replace(/^@weather/i, "").trim() || null;
            continue;
        }

        if (line.startsWith("@music")) {
            flushDialogue();
            music = line.replace(/^@music/i, "").trim() || null;
            continue;
        }

        if (/^@action$/i.test(line)) {
            flushDialogue();
            currentCharacter = "";
            nextDialogueIsAction = true;
            continue;
        }

        if (line.startsWith("@cutscene")) {
            flushDialogue();
            const cutscene = line.replace(/^@cutscene/i, "").trim();
            const previous = lines[lines.length - 1];
            if (cutscene && previous?.type === "dialogue") previous.cutscene = cutscene;
            continue;
        }

        const hideMatch = line.match(/^@hide\s+(.+)$/i);
        if (hideMatch) {
            flushDialogue();
            const target = hideMatch[1].trim();
            if (target.toLowerCase() === "all") {
                for (const characterName of Object.keys(visibleCharacters)) visibleCharacters[characterName] = false;
            } else if (Object.prototype.hasOwnProperty.call(visibleCharacters, target)) {
                visibleCharacters[target] = false;
            }
            continue;
        }

        const jumpMatch = line.match(/^@jump\s+(.+)$/i);
        if (jumpMatch) {
            flushDialogue();
            const previous = lines[lines.length - 1];
            if (previous?.type === "dialogue") previous.jumpTarget = jumpMatch[1].trim();
            continue;
        }

        const characterMatch = line.match(/^(.+?)\s+@sprite\s+(.+)$/i);
        if (characterMatch) {
            const character = characterMatch[1].trim();
            const sprite = characterMatch[2].trim() || "001";
            flushDialogue();
            currentCharacter = character;
            currentSprite = sprite;
            nextDialogueIsAction = false;
            if (Object.prototype.hasOwnProperty.call(characterStates, character)) {
                characterStates[character] = sprite;
                visibleCharacters[character] = true;
            }
            continue;
        }

        const inlineDialogue = line.match(/^([^:]+):\s*"([\s\S]*)"$/);
        if (inlineDialogue) {
            beginDialogue(inlineDialogue[1].trim(), currentSprite || "001");
            currentDialogue.texts.en = inlineDialogue[2].trim();
            flushDialogue();
            continue;
        }

        const languageStart = line.match(/^\[([^\]/]+)\]$/);
        if (languageStart) {
            if (!currentDialogue) {
                beginDialogue(nextDialogueIsAction ? "" : (currentCharacter || "SYSTEM"), currentSprite || "001");
                nextDialogueIsAction = false;
            }
            flushLanguage();
            language = languageStart[1].trim();
            languageBuffer = [];
            continue;
        }

        if (/^\[\/[^\]]+\]$/.test(line)) {
            flushLanguage();
            language = null;
            continue;
        }

        if (language) languageBuffer.push(raw.trim());
    }

    finishChoice();
    flushDialogue();
    lines.labels = labels;
    lines.chapters = chapters;
    return lines;
}

async function loadStory() {
    const parts = await Promise.all(STORY_PATHS.map(async path => {
        const response = await fetch(`${path}?v=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) throw new Error(`Could not load story ${path}: ${response.status}`);
        return response.text();
    }));
    const text = parts.join("\n");
    const parsed = parseStory(text);

    if (!parsed.length) {
        throw new Error("Story contains no dialogue.");
    }

    storyLines = parsed;
    storyLoaded = true;
}

function getLineText(line) {
    if (!line || !line.texts) return "";

    return (
        line.texts[currentLanguage] ||
        line.texts.en ||
        Object.values(line.texts)[0] ||
        ""
    );
}

/* =========================================================
   BACKGROUND / WEATHER
========================================================= */

function updateBackground(name) {
    if (!dom.background || !name) return;
    if (currentBackground === name) return;

    const src = BACKGROUNDS[name] || name;

    currentBackground = name;
    dom.background.style.backgroundImage =
        `url("${src}")`;
    document.getElementById("story-screen")?.classList.toggle(
        "mouse-lit-background",
        MOUSE_LIT_BACKGROUNDS.has(name)
    );
    updateBackgroundMouseTarget();

    if (currentWeather === "snow") {
        dom.weather.textContent = "";
        if (settings.effects && settings.quality !== "low") createSnow();
    }
}

function updateWeather(name) {
    if (!dom.weather) return;

    const normalized =
        name ? String(name).toLowerCase() : null;

    if (currentWeather === normalized) return;

    currentWeather = normalized;
    dom.weather.textContent = "";

    if (
        normalized === "snow" &&
        settings.effects &&
        settings.quality !== "low"
    ) {
        createSnow();
    }
}

function createSnow() {
    if (!dom.weather) return;

    const baseAmount =
        settings.quality === "ultra" ? 80 :
        settings.quality === "high" ? 55 :
        settings.quality === "medium" ? 35 :
        18;
    const amount = MOUSE_LIT_BACKGROUNDS.has(currentBackground)
        ? Math.max(1, Math.round(baseAmount * 0.4))
        : baseAmount;

    const fragment =
        document.createDocumentFragment();

    for (let i = 0; i < amount; i++) {
        const flake =
            document.createElement("span");

        flake.className = "snowflake";
        flake.textContent = "•";

        flake.style.left =
            `${Math.random() * 100}%`;

        flake.style.setProperty(
            "--wind",
            `${-20 + Math.random() * 40}vw`
        );

        flake.style.animationDelay =
            `${Math.random() * 6}s`;

        flake.style.animationDuration =
            `${4 + Math.random() * 5}s`;

        flake.style.opacity =
            `${0.3 + Math.random() * 0.7}`;

        fragment.appendChild(flake);
    }

    dom.weather.appendChild(fragment);
}

/* =========================================================
   CHARACTERS
========================================================= */

function setCharacterVisible(element, visible) {
    if (!element) return;

    if (element === dom.corrode && element.dataset.assetMissing === "1") {
        visible = false;
    }

    element.style.visibility =
        visible ? "visible" : "hidden";

    element.style.opacity =
        visible ? "1" : "0";

    element.style.pointerEvents = "none";
}

function setCharacterSprite(character, sprite) {
    const table = SPRITES[character];

    if (!table) return;

    const source =
        table[String(sprite)] ||
        table["001"];

    const element =
        character === "Alice"
            ? dom.alice
            : character === "Z"
                ? dom.z
                : dom.corrode;

    if (!element) return;

    if (element.getAttribute("src") !== source) {
        element.src = source;
    }
}

function resetCharacters() {
    if (dom.alice) {
        setCharacterSprite("Alice", "001");
        dom.alice.classList.remove(
            "alice-right",
            "talking",
            "alice-cold"
        );
        setCharacterVisible(dom.alice, true);
    }

    if (dom.z) {
        setCharacterSprite("Z", "001");
        dom.z.classList.remove(
            "z-visible",
            "talking"
        );
        setCharacterVisible(dom.z, false);
    }

    if (dom.corrode) {
        setCharacterSprite("Corrode", "001");
        dom.corrode.classList.remove("corrode-visible", "talking");
        setCharacterVisible(dom.corrode, false);
    }
}

function rebuildCharacterStage(line) {
    if (!line) return;

    const states =
        line.characterStates || {};

    const visible =
        line.visibleCharacters || {};

    const zVisible =
        Boolean(visible.Z);
    const corrodeVisible = Boolean(visible.Corrode);

    setCharacterSprite(
        "Alice",
        states.Alice || "001"
    );

    setCharacterVisible(
        dom.alice,
        visible.Alice !== false
    );

    dom.alice?.classList.toggle(
        "alice-right",
        zVisible && !corrodeVisible
    );

    setCharacterSprite(
        "Z",
        states.Z || "001"
    );

    setCharacterVisible(
        dom.z,
        zVisible
    );

    dom.z?.classList.toggle(
        "z-visible",
        zVisible
    );

    setCharacterSprite("Corrode", states.Corrode || "001");
    setCharacterVisible(dom.corrode, corrodeVisible);
    dom.corrode?.classList.toggle("corrode-visible", corrodeVisible);

    dom.alice?.classList.remove("talking");
    dom.z?.classList.remove("talking");
    dom.corrode?.classList.remove("talking");

    dom.alice?.classList.toggle(
        "alice-cold",
        line.background === "outside" &&
        settings.effects
    );

    if (line.character === "Alice") {
        dom.alice?.classList.add("talking");
    } else if (line.character === "Z") {
        dom.z?.classList.add("talking");
    } else if (line.character === "Corrode") {
        dom.corrode?.classList.add("talking");
    }
}

/* =========================================================
   TYPEWRITER
========================================================= */

function stopTypewriter() {
    typewriterToken++;

    if (typewriterTimer) {
        clearTimeout(typewriterTimer);
    }

    typewriterTimer = null;
    isTyping = false;
}

function finishTypewriter() {
    stopTypewriter();

    const line =
        storyLines[currentLine];
    if (line.background === "files") unlockAchievement("intoTheFiles");

    if (dom.dialogueText && line) {
        dom.dialogueText.textContent =
            getLineText(line);
    }
}

function startTypewriter(text) {
    stopTypewriter();

    if (!dom.dialogueText) return;

    dom.dialogueText.textContent = "";
    isTyping = true;

    const token = typewriterToken;
    let index = 0;

    const typeNext = () => {
        if (token !== typewriterToken) return;

        if (index >= text.length) {
            isTyping = false;
            typewriterTimer = null;
            return;
        }

        const char = text[index++];

        dom.dialogueText.textContent += char;

        if (
            char !== " " &&
            char !== "\n" &&
            index % 2 === 0
        ) {
            playTextSound();
        }

        let delay = Number(settings.textSpeed) || 25;

        if (".,!?".includes(char)) {
            delay *= 4;
        }

        if (char === "\n") {
            delay *= 3;
        }

        if (char === "-" || char === "~") {
            delay *= 1.8;
        }

        typewriterTimer =
            setTimeout(typeNext, delay);
    };

    typeNext();
}

/* =========================================================
   CHOICES
========================================================= */

function getChoiceText(option) {
    if (!option || !option.texts) return "";
    return option.texts[currentLanguage] || option.texts.en || Object.values(option.texts)[0] || "";
}

function ensureChoiceContainer() {
    if (dom.choiceContainer) return dom.choiceContainer;
    if (!dom.storyScreen) return null;

    const container = document.createElement("div");
    container.id = "choice-container";
    container.className = "kd-choice-container";
    container.setAttribute("aria-live", "polite");
    dom.storyScreen.appendChild(container);
    dom.choiceContainer = container;
    return container;
}

function hideChoices() {
    const container = ensureChoiceContainer();
    if (!container) return;
    container.classList.remove("active");
    container.textContent = "";
    if (dom.nextButton) {
        dom.nextButton.disabled = false;
        dom.nextButton.style.display = "";
    }
}

function showChoices(line) {
    const container = ensureChoiceContainer();
    if (!container || !line || line.type !== "choice") return;

    container.textContent = "";
    container.classList.add("active");
    if (dom.nextButton) dom.nextButton.style.display = "none";

    const title = document.createElement("div");
    title.className = "kd-choice-title";
    title.textContent = currentLanguage === "pt-BR" ? "ESCOLHA" : currentLanguage === "es-419" ? "ELECCIÓN" : "CHOICE";
    container.appendChild(title);

    line.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "kd-choice-button";
        button.dataset.choiceIndex = String(index);
        button.textContent = getChoiceText(option);
        button.addEventListener("click", async () => {
            if (isTyping || vnMenuOpen) return;
            playButtonSound();
            await selectChoice(line, option, index);
        });
        container.appendChild(button);
    });
}

function resolveChoiceTarget(target) {
    const raw = String(target || "").trim();
    if (!raw) return -1;

    const labels = storyLines.labels || {};
    if (Object.prototype.hasOwnProperty.call(labels, raw)) return Number(labels[raw]);

    const normalized = raw.toLowerCase();
    const matchingLabel = Object.keys(labels).find(key => key.toLowerCase() === normalized);
    if (matchingLabel) return Number(labels[matchingLabel]);

    if (/^line:\d+$/i.test(raw)) return Number(raw.split(":")[1]);
    if (/^\d+$/.test(raw)) return Number(raw);
    return -1;
}

async function selectChoice(line, option, index) {
    if (!line || !option) return;

    const targetIndex = resolveChoiceTarget(option.target);
    if (!Number.isInteger(targetIndex) || targetIndex < 0 || targetIndex >= storyLines.length) {
        console.error("[Killer Drones] Invalid choice target:", option.target);
        hideChoices();
        if (dom.speaker) dom.speaker.textContent = getUI().endSpeaker;
        if (dom.dialogueText) {
            dom.dialogueText.textContent = currentLanguage === "pt-BR"
                ? "ERRO: destino da escolha não encontrado."
                : currentLanguage === "es-419"
                    ? "ERROR: no se encontró el destino de la elección."
                    : "ERROR: choice destination not found.";
        }
        return;
    }

    choiceHistory[line.id] = {
        option: index,
        target: option.target,
        line: targetIndex,
        timestamp: Date.now()
    };

    currentLine = targetIndex;
    chapterFinished = false;
    hideChoices();

    await renderCurrentLine({ updateMusic: true });
    autoCheckpoint();
}

async function renderChoiceLine(line) {
    stopTypewriter();
    hideChoices();
    if (dom.speaker) {
        dom.speaker.textContent = currentLanguage === "pt-BR" ? "ESCOLHA" : currentLanguage === "es-419" ? "ELECCIÓN" : "CHOICE";
    }
    if (dom.dialogueText) dom.dialogueText.textContent = "";
    showChoices(line);
}

/* =========================================================
   DIALOGUE
========================================================= */

async function renderCurrentLine(
    { updateMusic = true } = {}
) {
    if (!storyLines.length) return;

    if (
        currentLine < 0 ||
        currentLine >= storyLines.length
    ) {
        return;
    }

    const line =
        storyLines[currentLine];

    chapterFinished = false;

    const lineChapter = line.chapter || currentChapter || "Prologue";
    if (storyStarted && currentChapter && lineChapter !== currentChapter) {
        saveChapterScope = lineChapter;
        const firstEmpty = Array.from({ length: SAVE_SLOTS }, (_, i) => i + 1)
            .find(slot => !getSaveData(slot, saveChapterScope));
        activeSaveSlot = firstEmpty || null;
    }
    currentChapter = lineChapter;

    if (line.type === "choice") {
        updateBackground(line.background);
        updateWeather(line.weather);
        rebuildCharacterStage(line);

        if (updateMusic && line.music) {
            await playStoryMusic(line.music);
        }

        await renderChoiceLine(line);
        return;
    }

    updateBackground(line.background);
    updateWeather(line.weather);
    rebuildCharacterStage(line);

    if (dom.speaker) {
        dom.speaker.textContent =
            line.character || "";
    }

    startTypewriter(
        getLineText(line)
    );

    if (updateMusic && line.music) {
        const fromMenu2 =
            Boolean(
                menu2Available &&
                menu2Music &&
                !menu2Music.paused &&
                currentMusicName === null
            );

        await playStoryMusic(
            line.music,
            { fromMenu2 }
        );
    }
}

async function startStory(lineIndex = 0) {
    if (!storyLoaded) {
        await loadStory();
    }

    if (!storyLines.length) return;

    storyStarted = true;
    unlockAchievement("firstSteps");
    chapterFinished = false;
    choiceHistory = {};

    currentLine =
        clamp(
            Number(lineIndex) || 0,
            0,
            storyLines.length - 1
        );

    currentChapter = storyLines[currentLine]?.chapter || "Prologue";

    currentBackground = null;
    currentWeather = null;
    currentMusicName = null;

    stopTypewriter();
    resetCharacters();
    showScreen(dom.storyScreen);
    closeVNMenu();

    await renderCurrentLine({
        updateMusic: true
    });
}

async function nextLine() {
    if (!storyStarted || vnMenuOpen || cinematicPlaying) return;

    if (isTyping) {
        finishTypewriter();
        return;
    }

    const currentStoryLine = storyLines[currentLine];
    if (currentStoryLine?.cutscene) {
        await playStoryCutscene(currentStoryLine.cutscene);
    }

    if (currentStoryLine?.jumpTarget) {
        const jumpIndex = resolveChoiceTarget(currentStoryLine.jumpTarget);
        if (jumpIndex >= 0 && jumpIndex < storyLines.length) {
            currentLine = jumpIndex;
            await renderCurrentLine({ updateMusic: true });
            autoCheckpoint();
            return;
        }
    }

    if (currentStoryLine?.type === "choice") {
        return;
    }

    if (currentStoryLine?.endBranch) {
        await showChapterEnd();
        return;
    }

    if (
        currentLine >=
        storyLines.length - 1
    ) {
        await showChapterEnd();
        return;
    }

    currentLine++;

    await renderCurrentLine({
        updateMusic: true
    });

    autoCheckpoint();
}

async function playStoryCutscene(name) {
    if (cinematicPlaying) return;
    const video = dom.cutsceneVideo;
    const story = dom.storyScreen;
    if (!video || !story) return;

    cinematicPlaying = true;
    story.classList.add("cutscene-prep");
    await new Promise(resolve => window.setTimeout(resolve, 1650));

    video.pause();
    video.currentTime = 0;
    video.src = `assets/cutscenes/${name}.mp4`;
    story.classList.add("cutscene-playing");

    const completed = await new Promise(resolve => {
        const finish = result => {
            video.removeEventListener("ended", onEnded);
            video.removeEventListener("error", onError);
            resolve(result);
        };
        const onEnded = () => finish(true);
        const onError = () => finish(false);
        video.addEventListener("ended", onEnded, { once: true });
        video.addEventListener("error", onError, { once: true });
        video.load();
        video.play().catch(onError);
    });

    video.pause();
    story.classList.remove("cutscene-playing", "cutscene-prep");
    cinematicPlaying = false;
    if (!completed) console.error(`[Killer Drones] Could not play cutscene: ${name}.mp4`);
}

async function previousLine() {
    if (!storyStarted || vnMenuOpen) return;

    if (isTyping) {
        finishTypewriter();
        return;
    }

    if (currentLine <= 0) return;

    currentLine--;

    await renderCurrentLine({
        updateMusic: false
    });
}

async function showChapterEnd() {
    if (chapterFinished) return;

    chapterFinished = true;
    unlockAchievement("chapterComplete");
    stopTypewriter();

    if (String(currentChapter).toLowerCase() === "chapter 1") {
        finalCreditsOpen = true;
        updateUI();
        autoCheckpoint();
        document.getElementById("credits-screen")?.classList.add("final-credits");
        showScreen(dom.creditsScreen);
        void stopStoryMusic();
        await new Promise(resolve => window.setTimeout(resolve, 1500));
        return;
    }

    const ui = getUI();

    if (dom.speaker) {
        dom.speaker.textContent =
            ui.endSpeaker;
    }

    if (dom.dialogueText) {
        dom.dialogueText.textContent =
            ui.chapterEnd;
    }

    autoCheckpoint();
}

/* =========================================================
   LANGUAGE
========================================================= */

async function setLanguage(language) {
    if (!UI_TEXT[language]) return;

    currentLanguage = language;

    safeSetLocalStorage(
        LANGUAGE_KEY,
        currentLanguage
    );

    updateLanguageButtons();
    updateUI();

    if (
        storyStarted &&
        dom.storyScreen &&
        dom.storyScreen.classList.contains("active")
    ) {
        await renderCurrentLine({
            updateMusic: false
        });
    }

    renderSaveSlots();
}

/* =========================================================
   SAVE / LOAD / DELETE
========================================================= */

function getSaveScopeId(chapter = saveChapterScope) {
    return String(chapter || "Prologue").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getSaveKey(slot, chapter = saveChapterScope) {
    return `${SAVE_PREFIX}${getSaveScopeId(chapter)}-${slot}`;
}

function parseSaveData(raw) {
    if (!raw) return null;
    try {
        const data = JSON.parse(raw);
        if (!data || typeof data !== "object" || !Number.isInteger(Number(data.line))) return null;
        if (data.version && Number(data.version) > SAVE_VERSION) return null;
        return data;
    } catch (_) {
        return null;
    }
}

function getSaveData(slot, chapter = saveChapterScope) {
    const scoped = parseSaveData(safeGetLocalStorage(getSaveKey(slot, chapter)));
    if (scoped) return scoped;

    // Keep old single-set saves visible in the matching chapter's new slot set.
    const legacy = parseSaveData(safeGetLocalStorage(`${LEGACY_SAVE_PREFIX}${slot}`));
    return legacy && (legacy.chapter || "Prologue") === chapter ? legacy : null;
}

function createSaveData() {
    return {
        version: SAVE_VERSION,
        slot: activeSaveSlot,
        language: currentLanguage,
        chapter: currentChapter,
        saveChapter: saveChapterScope,
        line: currentLine,
        background: currentBackground,
        weather: currentWeather,
        music: currentMusicName,
        choices: JSON.parse(JSON.stringify(choiceHistory)),
        timestamp: Date.now()
    };
}

function saveGame(slot) {
    if (
        !Number.isInteger(slot) ||
        slot < 1 ||
        slot > SAVE_SLOTS
    ) {
        return false;
    }

    activeSaveSlot = slot;

    const data =
        createSaveData();

    data.slot = slot;

    const ok =
        safeSetLocalStorage(
            getSaveKey(slot, saveChapterScope),
            JSON.stringify(data)
        );

    if (ok) {
        const legacy = parseSaveData(safeGetLocalStorage(`${LEGACY_SAVE_PREFIX}${slot}`));
        if (legacy && (legacy.chapter || "Prologue") === saveChapterScope) {
            safeRemoveLocalStorage(`${LEGACY_SAVE_PREFIX}${slot}`);
        }
        renderSaveSlots();
    }

    return ok;
}

function autoCheckpoint() {
    if (
        !storyStarted ||
        !Number.isInteger(activeSaveSlot)
    ) {
        return;
    }

    saveGame(activeSaveSlot);
}

async function loadGame(slot) {
    const data =
        getSaveData(slot);

    if (!data) return false;

    activeSaveSlot = slot;
    choiceHistory =
        data.choices && typeof data.choices === "object"
            ? JSON.parse(JSON.stringify(data.choices))
            : {};

    if (
        data.language &&
        UI_TEXT[data.language]
    ) {
        currentLanguage =
            data.language;

        safeSetLocalStorage(
            LANGUAGE_KEY,
            currentLanguage
        );

        updateLanguageButtons();
        updateUI();
    }

    if (!storyLoaded) {
        await loadStory();
    }

    currentLine =
        clamp(
            Number(data.line) || 0,
            0,
            storyLines.length - 1
        );

    currentChapter = data.chapter || "Prologue";
    saveChapterScope = data.saveChapter || currentChapter;

    currentBackground = null;
    currentWeather = null;
    currentMusicName = null;
    chapterFinished = false;
    storyStarted = true;
    unlockAchievement("firstSteps");

    stopTypewriter();
    resetCharacters();
    closeVNMenu();
    showScreen(dom.storyScreen);

    await renderCurrentLine({
        updateMusic: true
    });

    return true;
}

function deleteSave(slot) {
    if (
        !Number.isInteger(slot) ||
        slot < 1 ||
        slot > SAVE_SLOTS
    ) {
        return false;
    }

    const deleted =
        safeRemoveLocalStorage(
            getSaveKey(slot, saveChapterScope)
        );

    const legacy = parseSaveData(safeGetLocalStorage(`${LEGACY_SAVE_PREFIX}${slot}`));
    if (legacy && (legacy.chapter || "Prologue") === saveChapterScope) {
        safeRemoveLocalStorage(`${LEGACY_SAVE_PREFIX}${slot}`);
    }

    if (activeSaveSlot === slot) {
        activeSaveSlot = null;
    }

    renderSaveSlots();

    return deleted;
}

function deleteAllSaves() {
    const chapters = getAvailableChapters().map(chapter => chapter.title);
    if (!chapters.includes("Prologue")) chapters.push("Prologue");
    chapters.forEach(chapter => {
        for (let slot = 1; slot <= SAVE_SLOTS; slot++) safeRemoveLocalStorage(getSaveKey(slot, chapter));
    });
    for (let slot = 1; slot <= SAVE_SLOTS; slot++) safeRemoveLocalStorage(`${LEGACY_SAVE_PREFIX}${slot}`);

    activeSaveSlot = null;
    renderSaveSlots();
}

function formatSaveDate(timestamp) {
    if (!timestamp) return "";

    const date =
        new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleString();
}

function renderSaveSlots() {
    if (!dom.saveSlots) return;

    dom.saveSlots.textContent = "";

    const ui = getUI();

    for (
        let slot = 1;
        slot <= SAVE_SLOTS;
        slot++
    ) {
        const data =
            getSaveData(slot);

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "save-slot-wrapper";
        wrapper.dataset.slot = String(slot);
        wrapper.classList.toggle("active", slot === saveCarouselIndex);

        const button =
            document.createElement("button");

        button.className =
            "save-slot";

        button.type = "button";
        button.dataset.slot =
            String(slot);

        const title =
            document.createElement("div");

        title.className =
            "save-slot-number";

        title.textContent =
            `SLOT ${slot}`;

        const preview = document.createElement("div");
        preview.className = "save-preview";
        const sceneLine = data && storyLines[Number(data.line)];
        const sceneName = data?.background || sceneLine?.background || "abandonedHall";
        const sceneImage = BACKGROUNDS[sceneName] || BACKGROUNDS.abandonedHall;
        preview.style.backgroundImage = `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.35)), url("${sceneImage}")`;
        if (data && sceneLine) {
            const visibleCharacters = sceneLine.visibleCharacters || {};
            const states = sceneLine.characterStates || {};
            for (const character of ["Alice", "Z"]) {
                if (visibleCharacters[character] === false) continue;
                const sprite = document.createElement("img");
                sprite.className = `save-preview-character ${character.toLowerCase()}`;
                sprite.src = SPRITES[character]?.[states[character] || "001"] || SPRITES[character]?.["001"];
                sprite.alt = "";
                preview.appendChild(sprite);
            }
        }

        const information =
            document.createElement("div");

        information.className =
            "save-slot-info";

        if (!data) {
            information.textContent =
                ui.empty;
        } else {
            const chapter =
                data.chapter || "Prologue";

            const line =
                Number(data.line) + 1;

            const date =
                formatSaveDate(
                    data.timestamp
                );

            information.innerHTML =
                ui.saveLine(
                    chapter,
                    line,
                    date
                );
        }

        button.append(title, preview, information);

        button.addEventListener(
            "click",
            () => handleSaveSlot(slot)
        );

        const deleteButton =
            document.createElement("button");

        deleteButton.type = "button";
        deleteButton.className =
            "save-delete-button";

        deleteButton.textContent =
            ui.delete;

        deleteButton.addEventListener(
            "click",
            event => {
                event.stopPropagation();

                if (
                    window.confirm(
                        ui.confirmDelete(slot)
                    )
                ) {
                    playButtonSound();
                    deleteSave(slot);
                }
            }
        );

        wrapper.append(
            button,
            deleteButton
        );

        dom.saveSlots.appendChild(
            wrapper
        );
    }
}

function changeSaveCarousel(direction) {
    saveCarouselIndex = ((saveCarouselIndex - 1 + direction + SAVE_SLOTS) % SAVE_SLOTS) + 1;
    document.querySelectorAll(".save-slot-wrapper").forEach(wrapper => {
        wrapper.classList.toggle("active", Number(wrapper.dataset.slot) === saveCarouselIndex);
    });
}

function updateSaveScreenTitle() {
    if (!dom.saveScreenTitle) return;
    const ui = getUI();
    const modeTitle = saveMode === "start" ? ui.startTitle : saveMode === "save" ? ui.save : ui.loadTitle;
    dom.saveScreenTitle.textContent = `${modeTitle} — ${saveChapterScope}`;
}

function updateSaveChapterFilter() {
    if (!dom.saveChapterFilter) return;
    const visible = saveMode === "load" && saveReturnTo === "title";
    dom.saveChapterFilter.hidden = !visible;
    if (!visible) return;
    availableChapters = getAvailableChapters();
    if (!availableChapters.length) return;
    const matchingIndex = availableChapters.findIndex(chapter => chapter.title === saveChapterScope);
    saveChapterCarouselIndex = matchingIndex >= 0 ? matchingIndex : 0;
    const selected = availableChapters[saveChapterCarouselIndex];
    if (dom.saveChapterName) {
        dom.saveChapterName.textContent = `${String(saveChapterCarouselIndex + 1).padStart(2, "0")} / ${String(availableChapters.length).padStart(2, "0")} — ${selected.title}`;
    }
}

function changeSaveChapter(direction) {
    availableChapters = getAvailableChapters();
    if (!availableChapters.length) return;
    saveChapterCarouselIndex = (saveChapterCarouselIndex + direction + availableChapters.length) % availableChapters.length;
    saveChapterScope = availableChapters[saveChapterCarouselIndex].title;
    saveCarouselIndex = findNewestSave()?.slot || 1;
    updateSaveScreenTitle();
    updateSaveChapterFilter();
    renderSaveSlots();
}

async function openSaveScreen(
    mode = "load",
    returnTo = "title"
) {
    saveMode = mode;
    saveReturnTo = returnTo;

    if (!storyLoaded) {
        try { await loadStory(); } catch (error) { console.error("Could not load story preview data.", error); }
    }
    availableChapters = getAvailableChapters();

    if (mode === "start") {
        saveChapterScope = availableChapters[selectedChapterIndex]?.title || "Prologue";
    } else if (mode === "save" || (mode === "load" && returnTo === "story")) {
        saveChapterScope = currentChapter || "Prologue";
    } else if (mode === "load" && returnTo === "title") {
        const newestAnyChapter = findNewestSaveAcrossChapters();
        saveChapterScope = newestAnyChapter?.data.chapter || availableChapters[selectedChapterIndex]?.title || "Prologue";
    }

    if (
        mode === "start"
    ) {
        await transitionToStartMenuMusic();
    } else if (mode === "load") {
        await transitionToSubmenuMusic();
    }

    showScreen(dom.saveScreen);
    const newest = mode === "load" && returnTo === "title"
        ? findNewestSaveAcrossChapters()
        : findNewestSave();
    if (mode === "load" && newest) saveCarouselIndex = newest.slot;
    else if (mode === "save" && Number.isInteger(activeSaveSlot)) saveCarouselIndex = activeSaveSlot;
    else if (mode === "start") {
        const firstEmpty = Array.from({ length: SAVE_SLOTS }, (_, i) => i + 1).find(slot => !getSaveData(slot));
        saveCarouselIndex = firstEmpty || 1;
    } else saveCarouselIndex = 1;
    if (dom.saveScreenTitle) {
        updateSaveScreenTitle();
    }

    updateSaveChapterFilter();
    renderSaveSlots();
}

async function closeSaveScreen() {
    if (saveReturnTo === "story") {
        showScreen(dom.storyScreen);
        return;
    }

    if (saveReturnTo === "play") {
        showScreen(dom.playScreen);
        await transitionToSubmenuMusic();
        return;
    }

    showScreen(dom.titleScreen);

    await transitionToMainMenuMusic();
}

async function handleSaveSlot(slot) {
    playButtonSound();
    if (saveMode === "start" || saveMode === "load") requestGameFullscreen();

    const existing =
        getSaveData(slot);

    if (saveMode === "start") {
        if (
            existing &&
            !window.confirm(
                getUI().overwrite(slot)
            )
        ) {
            return;
        }

        activeSaveSlot = slot;

        await startStory(availableChapters[selectedChapterIndex]?.startLine || 0);

        saveGame(slot);

        return;
    }

    if (saveMode === "save") {
        saveGame(slot);
        return;
    }

    if (
        saveMode === "load" &&
        existing
    ) {
        await loadGame(slot);
    }
}

function findNewestSave() {
    let newest = null;

    for (
        let slot = 1;
        slot <= SAVE_SLOTS;
        slot++
    ) {
        const data =
            getSaveData(slot);

        if (!data) continue;

        if (
            !newest ||
            Number(data.timestamp) >
            Number(newest.data.timestamp)
        ) {
            newest = {
                slot,
                data
            };
        }
    }

    return newest;
}

function findNewestSaveAcrossChapters() {
    const chapters = [...new Set([
        "Prologue",
        ...getAvailableChapters().map(chapter => chapter.title)
    ])];
    let newest = null;
    for (const chapter of chapters) {
        for (let slot = 1; slot <= SAVE_SLOTS; slot++) {
            const data = getSaveData(slot, chapter);
            if (!data) continue;
            if (!newest || Number(data.timestamp) > Number(newest.data.timestamp)) {
                newest = { slot, data, chapter: data.chapter || chapter };
            }
        }
    }
    return newest;
}

async function continueGame() {
    playButtonSound();
    requestGameFullscreen();

    const newest = findNewestSaveAcrossChapters();

    if (!newest) {
        await openSaveScreen(
            "start",
            "title"
        );
        return;
    }

    saveChapterScope = newest.data.saveChapter || newest.data.chapter || newest.chapter || "Prologue";
    await transitionToSubmenuMusic();
    await loadGame(newest.slot);
}

/* =========================================================
   SETTINGS
========================================================= */

function setupSettingsControls() {
    if (dom.settingsFps) {
        dom.settingsFps.addEventListener(
            "change",
            () => {
                settings.showFPS =
                    dom.settingsFps.checked;

                saveSettings();
                updateSettingsUI();
            }
        );
    }

    if (dom.settingsEffects) {
        dom.settingsEffects.addEventListener(
            "change",
            () => {
                settings.effects = dom.settingsEffects.checked;

                saveSettings();
                updateSettingsUI();

                if (
                    currentWeather === "snow"
                ) {
                    updateWeather(null);
                    updateWeather("snow");
                }

                if (
                    storyLines[currentLine]
                ) {
                    rebuildCharacterStage(
                        storyLines[currentLine]
                    );
                }
            }
        );
    }

    if (dom.settingsFlashingLights) {
        dom.settingsFlashingLights.addEventListener("change", () => {
            settings.flashingLights = dom.settingsFlashingLights.checked;
            saveSettings();
            updateSettingsUI();
        });
    }

    if (dom.settingsMouseLight) {
        dom.settingsMouseLight.addEventListener("change", () => {
            setMouseLightEnabled(dom.settingsMouseLight.checked);
        });
    }

    if (dom.settingsQuality) {
        dom.settingsQuality.addEventListener(
            "change",
            () => {
                settings.quality = dom.settingsQuality.value;

                saveSettings();
                updateSettingsUI();

                if (
                    currentWeather === "snow"
                ) {
                    updateWeather(null);
                    updateWeather("snow");
                }
            }
        );
    }

    if (dom.settingsTextSpeed) {
        dom.settingsTextSpeed.addEventListener(
            "input",
            () => {
                settings.textSpeed =
                    Number(
                        dom.settingsTextSpeed.value
                    );

                saveSettings();
            }
        );
    }

    if (dom.settingsVolume) {
        dom.settingsVolume.addEventListener(
            "input",
            () => {
                settings.masterVolume =
                    Number(
                        dom.settingsVolume.value
                    );

                saveSettings();
                updateSettingsUI();
            }
        );
    }

    if (dom.settingsMusicVolume) {
        dom.settingsMusicVolume.addEventListener(
            "input",
            () => {
                settings.musicVolume =
                    Number(
                        dom.settingsMusicVolume.value
                    );

                saveSettings();
                updateSettingsUI();
            }
        );
    }

    if (dom.settingsSfxVolume) {
        dom.settingsSfxVolume.addEventListener(
            "input",
            () => {
                settings.sfxVolume =
                    Number(
                        dom.settingsSfxVolume.value
                    );

                saveSettings();
                updateSettingsUI();
            }
        );
    }
}

/* =========================================================
   TITLE / VN MENU
========================================================= */

async function openSettings() {
    playButtonSound();

    showScreen(dom.settingsScreen);

    updateSettingsUI();

    await stopMenu2IfNeeded();
}

async function closeSettings() {
    playButtonSound();

    showScreen(dom.titleScreen);

    await transitionToMainMenuMusic();
}

async function openCredits() {
    playButtonSound();
    finalCreditsOpen = false;
    updateUI();
    showScreen(dom.creditsScreen);
    await stopMenu2IfNeeded();
}

async function closeCredits() {
    playButtonSound();
    finalCreditsOpen = false;
    updateUI();
    showScreen(dom.titleScreen);
    await transitionToMainMenuMusic();
}

async function stopMenu2IfNeeded() {
    createMenu2Audio();
    createMenu3Audio();

    if (
        menu2Music &&
        !menu2Music.paused
    ) {
        menu2Music.dataset.playing = "0";

        await fadeAudio(
            menu2Music,
            0,
            250
        );

        safePause(menu2Music);
    }

    if (!menu3Music.paused) {
        menu3Music.dataset.playing = "0";
        await fadeAudio(menu3Music, 0, 250);
        safePause(menu3Music);
    }
}

async function openTitleScreen() {
    stopTypewriter();

    closeVNMenu();

    storyStarted = false;
    chapterFinished = false;

    await stopStoryMusic();

    showScreen(dom.titleScreen);

    await transitionToMainMenuMusic();
}

function openVNMenu() {
    if (!dom.vnMenu) return;

    vnMenuOpen = true;

    dom.vnMenu.classList.add(
        "active"
    );
}

function closeVNMenu() {
    vnMenuOpen = false;

    if (dom.vnMenu) {
        dom.vnMenu.classList.remove(
            "active",
            "open"
        );
    }
}

function toggleVNMenu() {
    if (vnMenuOpen) {
        closeVNMenu();
    } else {
        openVNMenu();
    }
}

/* =========================================================
   WEBGL SHADER (ULTRA QUALITY)
========================================================= */

let shaderGL = null;
let shaderProgram = null;
let shaderReady = false;
let shaderAnimating = false;
const mouseLightingAvailable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
let shaderMousePos = [-2, -2];
let lastPointerPosition = null;
let shaderUniforms = {};

function updateShaderMouse(event) {
    if (!mouseLightingAvailable || event.pointerType === "touch") return;
    lastPointerPosition = [event.clientX, event.clientY];
    if (!settings.mouseLight) return;

    const story = document.getElementById("story-screen");
    if (!story) return;
    const rect = story.getBoundingClientRect();
    shaderMousePos = MOUSE_LIT_BACKGROUNDS.has(currentBackground)
        ? [
            Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
            1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
        ]
        : [-2, -2];

    for (const image of [document.getElementById("alice"), document.getElementById("z"), document.getElementById("corrode")]) {
        if (!image) continue;
        const bounds = image.getBoundingClientRect();
        const nearestX = Math.max(bounds.left, Math.min(event.clientX, bounds.right));
        const nearestY = Math.max(bounds.top, Math.min(event.clientY, bounds.bottom));
        const distance = Math.hypot(event.clientX - nearestX, event.clientY - nearestY) / Math.max(rect.height, 1);
        // Let the character light reach a little farther than the background beam.
        const amount = Math.min(1, distance / 0.33);
        const illumination = 1 - amount * amount * (3 - 2 * amount);
        const visible = image.style.visibility !== "hidden" && !(image.id === "z" && !image.classList.contains("z-visible"));
        image.style.setProperty("--mouse-light", visible ? illumination.toFixed(3) : "0");
    }

    document.querySelectorAll("#weather .snowflake").forEach(flake => {
        const bounds = flake.getBoundingClientRect();
        const dx = event.clientX - (bounds.left + bounds.width / 2);
        const dy = event.clientY - (bounds.top + bounds.height / 2);
        const distance = Math.hypot(dx, dy) / Math.max(rect.height, 1);
        const glow = Math.max(0, 1 - distance / 0.20);
        flake.style.setProperty("--pointer-brightness", (1 + glow * 1.6).toFixed(2));
        flake.style.setProperty("--pointer-glow", `${(glow * 10).toFixed(1)}px`);
        flake.style.setProperty("--pointer-glow-alpha", (glow * 0.8).toFixed(2));
    });
}

function updateBackgroundMouseTarget() {
    if (
        !mouseLightingAvailable ||
        !settings.mouseLight ||
        !MOUSE_LIT_BACKGROUNDS.has(currentBackground)
    ) {
        shaderMousePos = [-2, -2];
        return;
    }

    if (lastPointerPosition) {
        updateShaderMouse({
            pointerType: "mouse",
            clientX: lastPointerPosition[0],
            clientY: lastPointerPosition[1]
        });
    }
}

function setMouseLightEnabled(enabled) {
    if (!mouseLightingAvailable) return;
    settings.mouseLight = Boolean(enabled);
    saveSettings();
    updateSettingsUI();
    playFlashlightSound();

    if (!settings.mouseLight) {
        shaderMousePos = [-2, -2];
        for (const image of [dom.alice, dom.z, dom.corrode]) {
            image?.style.setProperty("--mouse-light", "0");
        }
        document.querySelectorAll("#weather .snowflake").forEach(flake => {
            flake.style.setProperty("--pointer-brightness", "1");
            flake.style.setProperty("--pointer-glow", "0px");
            flake.style.setProperty("--pointer-glow-alpha", "0");
        });
    } else if (lastPointerPosition) {
        updateShaderMouse({
            pointerType: "mouse",
            clientX: lastPointerPosition[0],
            clientY: lastPointerPosition[1]
        });
    }
}

window.addEventListener("pointermove", updateShaderMouse, { passive: true });

async function loadShaderSource(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    return await response.text();
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("[Killer Drones] Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

async function initShaderSystem() {
    const canvas = document.getElementById("shader-canvas");
    const layer = document.getElementById("shader-layer");
    if (!canvas || !layer) return false;

    const gl = canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: false,
        antialias: false
    });

    if (!gl) {
        console.warn("[Killer Drones] WebGL not available — Ultra lighting disabled.");
        return false;
    }

    try {
        const inlineVert = document.getElementById("scene-vertex-shader")?.textContent.trim();
        const inlineFrag = document.getElementById("scene-fragment-shader")?.textContent.trim();
        const [vertSrc, fragSrc] = await Promise.all([
            inlineVert || loadShaderSource(new URL("scene.vert", document.baseURI).href),
            inlineFrag || loadShaderSource(new URL("scene.frag", document.baseURI).href)
        ]);

        const vert = createShader(gl, gl.VERTEX_SHADER, vertSrc);
        const frag = createShader(gl, gl.FRAGMENT_SHADER, fragSrc);

        if (!vert || !frag) return false;

        const program = gl.createProgram();
        gl.attachShader(program, vert);
        gl.attachShader(program, frag);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("[Killer Drones] Shader link error:", gl.getProgramInfoLog(program));
            return false;
        }

        // Fullscreen quad
        const positions = new Float32Array([
            -1, -1,  1, -1,  -1, 1,
            -1,  1,  1, -1,   1, 1
        ]);
        const posBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const aPos = gl.getAttribLocation(program, "a_position");

        shaderUniforms = {
            u_mousePosition: gl.getUniformLocation(program, "u_mousePosition"),
            u_lightRadius: gl.getUniformLocation(program, "u_lightRadius"),
            u_time: gl.getUniformLocation(program, "u_time"),
            u_eyeAlice: gl.getUniformLocation(program, "u_eyeAlice"),
            u_eyeZ: gl.getUniformLocation(program, "u_eyeZ"),
            u_eyeRadiusAlice: gl.getUniformLocation(program, "u_eyeRadiusAlice"),
            u_eyeRadiusZ: gl.getUniformLocation(program, "u_eyeRadiusZ"),
            u_aspect: gl.getUniformLocation(program, "u_aspect")
        };

        shaderGL = {
            gl,
            program,
            canvas,
            layer,
            posBuf,
            aPos
        };

        shaderProgram = program;
        shaderReady = true;
        console.log("[Killer Drones] Ultra shader system ready.");
        return true;
    } catch (err) {
        console.error("[Killer Drones] Failed to init Ultra shaders:", err);
        return false;
    }
}

function resizeShaderCanvas() {
    if (!shaderGL) return;
    const { canvas, gl } = shaderGL;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
    }
}

function renderShaderFrame() {
    if (!shaderReady || !shaderGL || settings.quality !== "ultra" || !settings.effects) {
        shaderAnimating = false;
        return;
    }

    const { gl, program, posBuf, aPos, layer } = shaderGL;

    resizeShaderCanvas();

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.useProgram(program);

    const t = performance.now() * 0.001;
    gl.uniform2f(shaderUniforms.u_mousePosition, shaderMousePos[0], shaderMousePos[1]);
    gl.uniform1f(shaderUniforms.u_lightRadius, 0.23);
    gl.uniform1f(shaderUniforms.u_time, t);

    const storyRect = document.getElementById("story-screen").getBoundingClientRect();
    const getEye = (image, xFraction, yFraction, visible) => {
        if (!image || !visible) return { point: [-2, -2], radius: 0 };
        const rect = image.getBoundingClientRect();
        const point = [
            (rect.left - storyRect.left + rect.width * xFraction) / storyRect.width,
            1 - (rect.top - storyRect.top + rect.height * yFraction) / storyRect.height
        ];
        return { point, radius: rect.height / storyRect.height * 0.13 };
    };
    const aliceEye = getEye(document.getElementById("alice"), 0.47, 0.405, true);
    const zImage = document.getElementById("z");
    const zEye = getEye(zImage, 0.49, 0.405, zImage?.classList.contains("z-visible"));
    gl.uniform2f(shaderUniforms.u_eyeAlice, aliceEye.point[0], aliceEye.point[1]);
    gl.uniform2f(shaderUniforms.u_eyeZ, zEye.point[0], zEye.point[1]);
    gl.uniform1f(shaderUniforms.u_eyeRadiusAlice, aliceEye.radius);
    gl.uniform1f(shaderUniforms.u_eyeRadiusZ, zEye.radius);
    gl.uniform1f(shaderUniforms.u_aspect, storyRect.width / storyRect.height);

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    if (layer) layer.classList.add("active");

    requestAnimationFrame(renderShaderFrame);
}

function updateShaderQuality() {
    const story = document.getElementById("story-screen");
    const layer = document.getElementById("shader-layer");

    if (settings.quality === "ultra" && settings.effects) {
        if (!shaderReady) {
            initShaderSystem().then(ok => {
                if (ok && settings.quality === "ultra" && settings.effects) {
                    if (story) {
                        story.classList.add("shader-enabled");
                        story.classList.remove("shader-disabled", "shader-fallback");
                    }
                    if (!shaderAnimating) {
                        shaderAnimating = true;
                        requestAnimationFrame(renderShaderFrame);
                    }
                } else if (story) {
                    story.classList.add("shader-fallback");
                    story.classList.remove("shader-enabled");
                }
            });
        } else {
            if (story) {
                story.classList.add("shader-enabled");
                story.classList.remove("shader-disabled", "shader-fallback");
            }
            if (layer) layer.classList.add("active");
            if (!shaderAnimating) {
                shaderAnimating = true;
                requestAnimationFrame(renderShaderFrame);
            }
        }
    } else {
        if (layer) layer.classList.remove("active");
        if (story) {
            story.classList.remove("shader-enabled");
            story.classList.add("shader-disabled");
            story.classList.remove("shader-fallback");
        }
        shaderAnimating = false;
    }
}

/* =========================================================
   FPS
========================================================= */

function updateFPSVisibility() {
    if (!dom.fpsCounter) return;
    const excluded = [dom.loadingScreen, dom.warningScreen].some(screen => screen?.classList.contains("active"));
    dom.fpsCounter.style.display = settings.showFPS && !excluded ? "block" : "none";
}

function startFPSCounter() {
    const tick = now => {
        fpsFrames++;

        const elapsed =
            now - fpsLastTime;

        if (elapsed >= 500) {
            fpsValue =
                Math.round(
                    fpsFrames /
                    (elapsed / 1000)
                );

            fpsFrames = 0;
            fpsLastTime = now;

            if (dom.fpsCounter) {
                dom.fpsCounter.textContent =
                    `${fpsValue} FPS`;

                updateFPSVisibility();
            }
        }

        requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
}

/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {
    dom.corrode?.addEventListener("error", () => {
        dom.corrode.dataset.assetMissing = "1";
        setCharacterVisible(dom.corrode, false);
    }, { once: true });
    dom.warningScreen?.addEventListener("pointerdown", playWarningBroadcast, { passive: true });

    document.addEventListener("mouseover", event => {
        if (event.relatedTarget instanceof Node && event.target instanceof Element && event.target.contains(event.relatedTarget)) return;
        if (event.target instanceof Element && event.target.closest("button, [role='button']")) playHoverSound();
    });

    dom.warningCommandInput?.addEventListener("input", () => {
        const command = dom.warningCommandInput.value.trim().toLowerCase();
        if (command === "y" || command === "n") {
            void answerWarning(command === "y");
        } else {
            dom.warningCommandInput.value = "";
        }
    });

    if (APP_LAYOUT === "mobile") {
        dom.warningCommandInput?.setAttribute("disabled", "");
        document.querySelectorAll("[data-warning-command]").forEach(button => {
            button.addEventListener("click", () => {
                const command = button.getAttribute("data-warning-command");
                if (command === "y" || command === "n") {
                    void answerWarning(command === "y");
                }
            });
        });
    }

    if (dom.startButton) {
        dom.startButton.addEventListener(
            "click",
            openPlayScreen
        );
    }

    dom.titleStartPrompt?.addEventListener("click", dismissTitleIntro);
    dom.titleScreen?.addEventListener("pointerdown", () => {
        if (dom.titleScreen.classList.contains("title-gated")) dismissTitleIntro();
    });

    dom.chapterPrevious?.addEventListener("click", () => {
        playButtonSound();
        selectedChapterIndex--;
        renderChapterCarousel();
    });
    dom.chapterNext?.addEventListener("click", () => {
        playButtonSound();
        selectedChapterIndex++;
        renderChapterCarousel();
    });
    dom.savePrevious?.addEventListener("click", () => {
        playButtonSound();
        changeSaveCarousel(-1);
    });
    dom.saveNext?.addEventListener("click", () => {
        playButtonSound();
        changeSaveCarousel(1);
    });
    dom.saveChapterPrevious?.addEventListener("click", () => {
        playButtonSound();
        changeSaveChapter(-1);
    });
    dom.saveChapterNext?.addEventListener("click", () => {
        playButtonSound();
        changeSaveChapter(1);
    });
    dom.chaptersTab?.addEventListener("click", () => showPlayTab("chapters"));
    dom.achievementsTab?.addEventListener("click", () => showPlayTab("achievements"));
    dom.playChapterButton?.addEventListener("click", async () => {
        playButtonSound();
        await openSaveScreen("start", "play");
    });
    dom.playBackButton?.addEventListener("click", async () => {
        playButtonSound();
        showScreen(dom.titleScreen);
        await transitionToMainMenuMusic();
    });

    if (dom.continueButton) {
        dom.continueButton.addEventListener(
            "click",
            continueGame
        );
    }

    if (dom.loadTitleButton) {
        dom.loadTitleButton.addEventListener(
            "click",
            async () => {
                playButtonSound();

                await openSaveScreen(
                    "load",
                    "title"
                );
            }
        );
    }

    if (dom.settingsButton) {
        dom.settingsButton.addEventListener(
            "click",
            openSettings
        );
    }

    if (dom.creditsButton) {
        dom.creditsButton.addEventListener("click", openCredits);
    }

    if (dom.creditsBackButton) {
        dom.creditsBackButton.addEventListener("click", closeCredits);
    }

    if (dom.settingsResetButton) {
        dom.settingsResetButton.addEventListener("click", () => {
            playButtonSound();
            settings = { ...DEFAULT_SETTINGS };
            saveSettings();
            updateSettingsUI();
            if (currentWeather === "snow") {
                updateWeather(null);
                updateWeather("snow");
            }
        });
    }

    if (dom.settingsBackButton) {
        dom.settingsBackButton.addEventListener(
            "click",
            closeSettings
        );
    }

    if (dom.languageButtons) {
        dom.languageButtons.forEach(
            button => {
                button.addEventListener(
                    "click",
                    async () => {
                        playButtonSound();

                        await setLanguage(
                            button.dataset.language
                        );
                    }
                );
            }
        );
    }

    if (dom.saveBackButton) {
        dom.saveBackButton.addEventListener(
            "click",
            async () => {
                playButtonSound();

                await closeSaveScreen();
            }
        );
    }

    if (dom.deleteAllSavesButton) {
        dom.deleteAllSavesButton.addEventListener(
            "click",
            () => {
                if (
                    window.confirm(
                        getUI().confirmDeleteAll
                    )
                ) {
                    playButtonSound();
                    deleteAllSaves();
                }
            }
        );
    }

    if (dom.nextButton) {
        dom.nextButton.addEventListener(
            "click",
            async () => {
                playButtonSound();

                await nextLine();
            }
        );
    }

    if (dom.vnMenuButton) {
        dom.vnMenuButton.addEventListener(
            "click",
            () => {
                playButtonSound();
                toggleVNMenu();
            }
        );
    }

    if (dom.vnContinue) {
        dom.vnContinue.addEventListener(
            "click",
            () => {
                playButtonSound();
                closeVNMenu();
            }
        );
    }

    if (dom.vnBackLine) {
        dom.vnBackLine.addEventListener(
            "click",
            async () => {
                playButtonSound();
                closeVNMenu();

                await previousLine();
            }
        );
    }

    if (dom.vnSave) {
        dom.vnSave.addEventListener(
            "click",
            async () => {
                playButtonSound();
                closeVNMenu();

                await openSaveScreen(
                    "save",
                    "story"
                );
            }
        );
    }

    if (dom.vnLoad) {
        dom.vnLoad.addEventListener(
            "click",
            async () => {
                playButtonSound();
                closeVNMenu();

                await openSaveScreen(
                    "load",
                    "story"
                );
            }
        );
    }

    if (dom.vnBackMenu) {
        dom.vnBackMenu.addEventListener(
            "click",
            async () => {
                playButtonSound();
                closeVNMenu();

                await openTitleScreen();
            }
        );
    }

    if (dom.vnClose) {
        dom.vnClose.addEventListener(
            "click",
            () => {
                playButtonSound();
                closeVNMenu();
            }
        );
    }

    document.addEventListener(
        "keydown",
        async event => {
            if (dom.warningScreen?.classList.contains("active")) {
                playWarningBroadcast();
                if (event.target === dom.warningCommandInput) return;
                if (APP_LAYOUT === "mobile") return;
                if (event.key.toLowerCase() === "y") {
                    event.preventDefault();
                    await answerWarning(true);
                } else if (event.key.toLowerCase() === "n") {
                    event.preventDefault();
                    await answerWarning(false);
                }
                return;
            }

            if (dom.titleScreen?.classList.contains("active") && dom.titleScreen.classList.contains("title-gated")) {
                event.preventDefault();
                dismissTitleIntro();
                return;
            }

            const isLeft = event.key === "ArrowLeft";
            const isRight = event.key === "ArrowRight";
            if ((isLeft || isRight) && dom.playScreen?.classList.contains("active") && !dom.chaptersPanel?.hidden) {
                event.preventDefault();
                playButtonSound();
                selectedChapterIndex += isLeft ? -1 : 1;
                renderChapterCarousel();
                return;
            }
            if ((isLeft || isRight) && dom.saveScreen?.classList.contains("active")) {
                event.preventDefault();
                playButtonSound();
                if (event.target instanceof Element && event.target.closest("#save-chapter-filter")) {
                    changeSaveChapter(isLeft ? -1 : 1);
                } else {
                    changeSaveCarousel(isLeft ? -1 : 1);
                }
                return;
            }

            if (event.key === "Escape") {
                if (dom.storyScreen?.classList.contains("active")) {
                    event.preventDefault();
                    toggleVNMenu();
                    return;
                }
                if (dom.saveScreen?.classList.contains("active")) {
                    event.preventDefault();
                    await closeSaveScreen();
                    return;
                }
                if (dom.playScreen?.classList.contains("active")) {
                    event.preventDefault();
                    showScreen(dom.titleScreen);
                    await transitionToMainMenuMusic();
                    return;
                }
                if (dom.settingsScreen?.classList.contains("active")) {
                    event.preventDefault();
                    await closeSettings();
                    return;
                }
                if (dom.creditsScreen?.classList.contains("active")) {
                    event.preventDefault();
                    await closeCredits();
                    return;
                }
            }

            if (
                !dom.storyScreen ||
                !dom.storyScreen.classList.contains(
                    "active"
                )
            ) {
                return;
            }

            if (event.key.toLowerCase() === "l") {
                event.preventDefault();
                setMouseLightEnabled(!settings.mouseLight);
                return;
            }

            if (vnMenuOpen) return;

            const isActivationKey =
                event.key === "Enter" || event.key === " ";
            const targetHasNativeActivation =
                event.target instanceof Element &&
                event.target.closest("button, input, select, textarea, [contenteditable='true']");
            if (isActivationKey && targetHasNativeActivation) return;

            if (
                event.key === "ArrowRight" ||
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                if (event.key === "Enter") playButtonSound();
                await nextLine();
                return;
            }

            if (
                event.key === "ArrowLeft"
            ) {
                event.preventDefault();
                await previousLine();
            }
        }
    );
}

async function answerWarning(disableFlashingLights) {
    requestGameFullscreen();
    settings.flashingLights = !disableFlashingLights;
    saveSettings();
    updateSettingsUI();
    playButtonSound();
    showScreen(dom.titleScreen);
    await startMenuMusic();
}

/* =========================================================
   VIGNETTE FALLBACK
========================================================= */

function setupVignetteFallback() {
    const vignette =
        dom.vignette;

    if (!vignette) return;

    Object.assign(
        vignette.style,
        {
            position: "absolute",
            inset: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: "35"
        }
    );
}

/* =========================================================
   DEBUG
========================================================= */

window.killerDronesDebug = function () {
    return {
        initialized,
        storyLoaded,
        storyLines: storyLines.length,
        currentLine,
        currentChapter,
        currentLanguage,
        currentMusicName,
        storyStarted,
        chapterFinished,
        activeSaveSlot,
        choiceHistory: JSON.parse(JSON.stringify(choiceHistory)),
        vnMenuOpen,
        menu2Available,
        settings: { ...settings },

        saves: Array.from(
            { length: SAVE_SLOTS },
            (_, index) =>
                getSaveData(index + 1)
        ),

        aliceVisible:
            dom.alice
                ? getComputedStyle(
                    dom.alice
                ).visibility
                : null,

        zVisible:
            dom.z
                ? getComputedStyle(
                    dom.z
                ).visibility
                : null,

        menuMusicPlaying:
            dom.menuMusic
                ? !dom.menuMusic.paused
                : false,

        menu2MusicPlaying:
            menu2Music
                ? !menu2Music.paused
                : false,

        storyMusicPlaying:
            dom.storyMusic
                ? !dom.storyMusic.paused
                : false,

        fps: fpsValue
    };
};

/* =========================================================
   INITIALIZATION
========================================================= */

async function initializeGame() {
    if (initialized) return;

    initialized = true;

    cacheDOM();
    normalizeSettings();
    setupVignetteFallback();
    setupSettingsControls();
    startFPSCounter();

    try {
        setLoadingProgress(5, 0);

        updateUI();
        updateLanguageButtons();
        updateSettingsUI();

        await wait(80);

        setLoadingProgress(20, 1);

        const imageSources = [
            "assets/blur.png",
            ...Object.values(BACKGROUNDS),
            ...Object.values(SPRITES.Alice),
            ...Object.values(SPRITES.Z)
        ];

        await Promise.all(
            imageSources.map(preloadImage)
        );

        setLoadingProgress(45, 2);

        await loadStory();

        setLoadingProgress(70, 3);

        createMenu2Audio();
        createMenu3Audio();

        await Promise.all([
            preloadAudio(MUSIC.menu),
            preloadAudio(MUSIC.menu3),
            preloadAudio(MUSIC.abandoned_hall),
            dom.warningSound
                ? preloadAudio(dom.warningSound.src)
                : Promise.resolve(),

            dom.flashlightSound
                ? preloadAudio(dom.flashlightSound.src)
                : Promise.resolve(),

            dom.textSound
                ? preloadAudio(
                    "assets/audio/sfx/text.ogg"
                )
                : Promise.resolve(),

            dom.buttonSound
                ? preloadAudio(
                    "assets/audio/sfx/button.ogg"
                )
                : Promise.resolve()
        ]);

        if (dom.menuMusic) {
            dom.menuMusic.volume = 0;
            dom.menuMusic.dataset.playing = "0";
        }

        if (dom.storyMusic) {
            dom.storyMusic.volume = 0;
            dom.storyMusic.dataset.playing = "0";
        }

        if (menu2Music) {
            menu2Music.volume = 0;
            menu2Music.dataset.playing = "0";
        }

        applyAudioVolumes();

        setupEvents();
        resetCharacters();

        updateUI();
        updateLanguageButtons();
        updateSettingsUI();

        setLoadingProgress(100, 4);

        await wait(300);

        showScreen(dom.warningScreen || dom.titleScreen);
        playWarningBroadcast();
    } catch (error) {
        console.error(
            "[Killer Drones] Initialization failed:",
            error
        );

        /*
         * Optional assets must not make the UI unusable.
         * The browser will still show the title screen.
         */
        setupEvents();
        resetCharacters();

        updateUI();
        updateLanguageButtons();
        updateSettingsUI();

        setLoadingProgress(100, 4);

        showScreen(dom.warningScreen || dom.titleScreen);
        playWarningBroadcast();
    }
}

function bootGame() {
    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            initializeGame,
            { once: true }
        );
    } else {
        initializeGame();
    }
}

bootGame();
