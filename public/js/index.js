const dom = {
    container: document.getElementById("mainContainer"),
    backgroundStage: document.getElementById("backgroundStage"),
    backgroundBaseLayer: document.getElementById("backgroundBaseLayer"),
    backgroundTransitionLayer: document.getElementById("backgroundTransitionLayer"),
    playlist: document.getElementById("playlist"),
    playlistItems: document.getElementById("playlistItems"),
    lyrics: document.getElementById("lyrics"),
    lyricsScroll: document.getElementById("lyricsScroll"),
    lyricsContent: document.getElementById("lyricsContent"),
    mobileInlineLyrics: document.getElementById("mobileInlineLyrics"),
    mobileInlineLyricsScroll: document.getElementById("mobileInlineLyricsScroll"),
    mobileInlineLyricsContent: document.getElementById("mobileInlineLyricsContent"),
    audioPlayer: document.getElementById("audioPlayer"),
    themeToggleButton: document.getElementById("themeToggleButton"),
    loadOnlineBtn: document.getElementById("loadOnlineBtn"),
    showPlaylistBtn: document.getElementById("showPlaylistBtn"),
    showLyricsBtn: document.getElementById("showLyricsBtn"),
    searchInput: document.getElementById("searchInput"),
    searchBtn: document.getElementById("searchBtn"),
    sourceSelectButton: document.getElementById("sourceSelectButton"),
    sourceSelectLabel: document.getElementById("sourceSelectLabel"),
    sourceMenu: document.getElementById("sourceMenu"),
    searchResults: document.getElementById("searchResults"),
    searchResultsList: document.getElementById("searchResultsList"),
    notification: document.getElementById("notification"),
    albumCover: document.getElementById("albumCover"),
    currentSongTitle: document.getElementById("currentSongTitle"),
    currentSongArtist: document.getElementById("currentSongArtist"),
    debugInfo: document.getElementById("debugInfo"),
    importSelectedBtn: document.getElementById("importSelectedBtn"),
    importSelectedCount: document.getElementById("importSelectedCount"),
    importPlaylistBtn: document.getElementById("importPlaylistBtn"),
    exportPlaylistBtn: document.getElementById("exportPlaylistBtn"),
    importPlaylistInput: document.getElementById("importPlaylistInput"),
    clearPlaylistBtn: document.getElementById("clearPlaylistBtn"),
    mobileImportPlaylistBtn: document.getElementById("mobileImportPlaylistBtn"),
    mobileExportPlaylistBtn: document.getElementById("mobileExportPlaylistBtn"),
    playModeBtn: document.getElementById("playModeBtn"),
    playPauseBtn: document.getElementById("playPauseBtn"),
    progressBar: document.getElementById("progressBar"),
    currentTimeDisplay: document.getElementById("currentTimeDisplay"),
    durationDisplay: document.getElementById("durationDisplay"),
    volumeSlider: document.getElementById("volumeSlider"),
    volumeIcon: document.getElementById("volumeIcon"),
    qualityToggle: document.getElementById("qualityToggle"),
    playerQualityMenu: document.getElementById("playerQualityMenu"),
    qualityLabel: document.getElementById("qualityLabel"),
    mobileToolbarTitle: document.getElementById("mobileToolbarTitle"),
    mobileSearchToggle: document.getElementById("mobileSearchToggle"),
    mobileSearchClose: document.getElementById("mobileSearchClose"),
    mobilePanelClose: document.getElementById("mobilePanelClose"),
    mobileClearPlaylistBtn: document.getElementById("mobileClearPlaylistBtn"),
    mobileOverlayScrim: document.getElementById("mobileOverlayScrim"),
    mobileExploreButton: document.getElementById("mobileExploreButton"),
    mobileQualityToggle: document.getElementById("mobileQualityToggle"),
    mobileQualityLabel: document.getElementById("mobileQualityLabel"),
    mobilePanel: document.getElementById("mobilePanel"),
    mobilePanelTitle: document.getElementById("mobilePanelTitle"),
    mobileQueueToggle: document.getElementById("mobileQueueToggle"),
    searchArea: document.getElementById("searchArea"),
};

// 新增搜索配置常量
const SEARCH_PAGE_SIZE = 50; // 每页搜索结果数量，增加到100条
const MAX_RADAR_OFFSET = 100; // 最大雷达偏移量，对应2页结果（2×50=100条）
const MAX_SEARCH_PAGES = 2; // 最大搜索页数

// 在文件开头的常量定义部分添加音质等级配置
const QUALITY_LEVELS = [
    { value: "999", label: "无损音质", description: "FLAC", level: 4 },
    { value: "320", label: "极高音质", description: "320 kbps", level: 3 },
    { value: "192", label: "高品音质", description: "192 kbps", level: 2 },
    { value: "128", label: "标准音质", description: "128 kbps", level: 1 }
];

// 在文件开头的常量定义部分添加屏蔽关键词配置
const BLOCKED_KEYWORDS = [
    "Cover", "cover", "COVER", "翻唱", "Cover:", "cover:", "COVER:",
    "Remix", "remix", "REMIX", "混音", "Remix:", "remix:", "REMIX:",
    "Live", "live", "LIVE", "现场", "演唱会", "Live:", "live:", "LIVE:",
    "合集", "精选", "串烧", "DJ", "dj", "D.J.",
    "播客", "Podcast", "podcast", "PODCAST", "电台节目", "广播剧",
    "伴奏", "纯音乐", "Instrumental", "instrumental", "背景音乐",
    "Demo", "demo", "DEMO", "试听", "原唱", "翻奏",
    "自制", "铃声", "手机铃声", "网友自制",
    "教学", "教程", "练习", "乐理", "指法",
    "片段", "剪辑", "剪切", "节选", "精彩片段",
    "非原唱", "不是原唱", "翻自",
    "伴奏版", "纯音乐版", "无人声", "无演唱",
    
    // 新增屏蔽关键词
    "讲故事", "睡前故事", "儿童故事", "童话故事", "有声书", "有声小说",
    "广播小说", "小说连载", "故事会", "寓言故事",
    "播客节目", "谈话节目", "访谈", "对谈", "聊天", "脱口秀",
    "钢琴版", "吉他版", "小提琴版", "古筝版", "二胡版", "器乐版",
    "乐器演奏", "演奏版", "独奏", "合奏", "即兴演奏",
    "配乐", "BGM", "背景音乐", "环境音乐",
    "ASMR", "asmr", "白噪音", "放松音乐", "冥想音乐",
    "录音室", "排练", "练习曲", "音阶练习",
    "消音版", "卡拉OK版", "KTV版", "跟唱版",
    "变速", "升降调", "慢速版", "快速版",
    "教学版", "示范", "分解教学", "入门教学",
    "原声带", "OST", "影视原声", "游戏原声",
    "试听版", "预览版", "短版", "不完整版",
    "混剪", "Mashup", "mashup", "拼接版",
    "反应视频", "Reaction", "reaction", "乐评",
    "解析", "分析", "点评", "鉴赏"
];
// 在 state 对象之前添加
let mobilePanelState = {
    isOpen: false,
    currentView: null,
    isTransitioning: false
};
window.SolaraDom = dom;

const isMobileView = Boolean(window.__SOLARA_IS_MOBILE);

const mobileBridge = window.SolaraMobileBridge || {};
mobileBridge.handlers = mobileBridge.handlers || {};
mobileBridge.queue = Array.isArray(mobileBridge.queue) ? mobileBridge.queue : [];
window.SolaraMobileBridge = mobileBridge;

function invokeMobileHook(name, ...args) {
    if (!isMobileView) {
        return undefined;
    }
    const handler = mobileBridge.handlers[name];
    if (typeof handler === "function") {
        return handler(...args);
    }
    mobileBridge.queue.push({ name, args });
    return undefined;
}

function initializeMobileUI() {
    return invokeMobileHook("initialize");
}

function updateMobileToolbarTitle() {
    return invokeMobileHook("updateToolbarTitle");
}

function runAfterOverlayFrame(callback) {
    if (typeof callback !== "function" || !isMobileView) {
        return;
    }
    const runner = () => {
        if (!document.body) {
            return;
        }
        callback();
    };
    if (typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(runner);
    } else {
        window.setTimeout(runner, 0);
    }
}

function syncMobileOverlayVisibility() {
    if (!isMobileView || !document.body) {
        return;
    }
    const searchOpen = document.body.classList.contains("mobile-search-open");
    const panelOpen = document.body.classList.contains("mobile-panel-open");
    if (dom.searchArea) {
        dom.searchArea.setAttribute("aria-hidden", searchOpen ? "false" : "true");
    }
    if (dom.mobileOverlayScrim) {
        dom.mobileOverlayScrim.setAttribute("aria-hidden", (searchOpen || panelOpen) ? "false" : "true");
    }
}

function updateMobileClearPlaylistVisibility() {
    if (!isMobileView) {
        return;
    }
    const button = dom.mobileClearPlaylistBtn;
    if (!button) {
        return;
    }
    const playlistElement = dom.playlist;
    const body = document.body;
    const currentView = body ? body.getAttribute("data-mobile-panel-view") : null;
    const isPlaylistView = !body || !currentView || currentView === "playlist";
    const playlistSongs = (typeof state !== "undefined" && Array.isArray(state.playlistSongs)) ? state.playlistSongs : [];
    const isEmpty = playlistSongs.length === 0 || !playlistElement || playlistElement.classList.contains("empty");
    const shouldShow = isPlaylistView && !isEmpty;
    button.hidden = !shouldShow;
    button.setAttribute("aria-hidden", shouldShow ? "false" : "true");
}

function forceCloseMobileSearchOverlay() {
    if (!isMobileView || !document.body) {
        return;
    }
    document.body.classList.remove("mobile-search-open");
    if (dom.searchInput) {
        dom.searchInput.blur();
    }
    syncMobileOverlayVisibility();
}

function forceCloseMobilePanelOverlay() {
    if (!isMobileView || !document.body) {
        return;
    }
    document.body.classList.remove("mobile-panel-open");
    // 添加状态同步
    mobilePanelState.isOpen = false;
    mobilePanelState.currentView = null;
    mobilePanelState.isTransitioning = false;
    syncMobileOverlayVisibility();
}

function openMobileSearch() {
    return invokeMobileHook("openSearch");
}

function closeMobileSearch() {
    const result = invokeMobileHook("closeSearch");
    runAfterOverlayFrame(forceCloseMobileSearchOverlay);
    return result;
}

function toggleMobileSearch() {
    return invokeMobileHook("toggleSearch");
}

// 完全替换这两个函数
function openMobilePanel(view = "playlist") {
    debugLog(`请求打开移动端面板: ${view}, 当前状态: ${mobilePanelState.isOpen ? '打开' : '关闭'}`);
    // 如果已经打开同一个视图，则关闭
    if (mobilePanelState.isOpen && mobilePanelState.currentView === view) {
        debugLog("已经打开相同视图，执行关闭");
        closeMobilePanel();
        return;
    }
    
    // 更新状态
    mobilePanelState.isOpen = true;
    mobilePanelState.currentView = view;
    mobilePanelState.isTransitioning = false; // 不再使用过渡状态阻塞
    
    // 立即更新UI
    if (isMobileView && document.body) {
        document.body.classList.add("mobile-panel-open");
        document.body.setAttribute("data-mobile-panel-view", view);
    }
    
    // 切换视图
    switchMobileView(view);
    
    // 调用移动端桥接
    const result = invokeMobileHook("openPanel", view);
    
    // 如果是播放列表视图，添加自动滚动
    if (view === "playlist") {
        debugLog("移动端打开播放列表面板，准备自动滚动");
        setTimeout(() => {
            if (dom.playlist && dom.playlist.classList.contains("active")) {
                scrollToCurrentPlaylistItem();
            }
        }, 150);
    }
    
    debugLog(`移动端面板已打开: ${view}`);
    return result;
}

function closeMobilePanel() {
    debugLog(`请求关闭移动端面板, 当前状态: ${document.body.classList.contains("mobile-panel-open") ? '打开' : '关闭'}`);
    
    // 直接检查DOM状态，而不是依赖内部状态变量
    if (!document.body.classList.contains("mobile-panel-open")) {
        debugLog("面板已经关闭，忽略重复关闭");
        return;
    }
    
    // 更新内部状态
    mobilePanelState.isOpen = false;
    const previousView = mobilePanelState.currentView;
    mobilePanelState.currentView = null;
    mobilePanelState.isTransitioning = false;
    
    // 更新DOM
    document.body.classList.remove("mobile-panel-open");
    document.body.removeAttribute("data-mobile-panel-view");
    
    // 调用移动端桥接
    const result = invokeMobileHook("closePanel");
    debugLog("移动端面板已关闭");
    
    // 添加额外调试
    debugLog(`关闭后状态: panelOpen=${document.body.classList.contains("mobile-panel-open")}`);
    
    return result;
}

function toggleMobilePanel(view = "playlist") {
    return invokeMobileHook("togglePanel", view);
}

function closeAllMobileOverlays() {
    const result = invokeMobileHook("closeAllOverlays");
    runAfterOverlayFrame(() => {
        forceCloseMobileSearchOverlay();
        forceCloseMobilePanelOverlay();
    });
    return result;
}

function updateMobileInlineLyricsAria(isOpen) {
    if (!dom.mobileInlineLyrics) {
        return;
    }
    dom.mobileInlineLyrics.setAttribute("aria-hidden", isOpen ? "false" : "true");
}

function setMobileInlineLyricsOpen(isOpen) {
    if (!isMobileView || !document.body || !dom.mobileInlineLyrics) {
        return;
    }
    state.isMobileInlineLyricsOpen = Boolean(isOpen);
    document.body.classList.toggle("mobile-inline-lyrics-open", Boolean(isOpen));
    updateMobileInlineLyricsAria(Boolean(isOpen));
}

function hasInlineLyricsContent() {
    const content = dom.mobileInlineLyricsContent;
    if (!content) {
        return false;
    }
    return content.textContent.trim().length > 0;
}

function canOpenMobileInlineLyrics() {
    if (!isMobileView || !document.body) {
        return false;
    }
    const hasSong = Boolean(state.currentSong);
    return hasSong && hasInlineLyricsContent();
}

function closeMobileInlineLyrics(options = {}) {
    if (!isMobileView || !document.body) {
        return false;
    }
    if (!document.body.classList.contains("mobile-inline-lyrics-open")) {
        updateMobileInlineLyricsAria(false);
        state.isMobileInlineLyricsOpen = false;
        return false;
    }
    setMobileInlineLyricsOpen(false);
    if (options.force) {
        state.userScrolledLyrics = false;
    }
    return true;
}

function openMobileInlineLyrics() {
    if (!isMobileView || !document.body) {
        return false;
    }
    if (!canOpenMobileInlineLyrics()) {
        return false;
    }
    setMobileInlineLyricsOpen(true);
    state.userScrolledLyrics = false;
    window.requestAnimationFrame(() => {
        const container = dom.mobileInlineLyricsScroll || dom.mobileInlineLyrics;
        const activeLyric = dom.mobileInlineLyricsContent?.querySelector(".current") ||
            dom.mobileInlineLyricsContent?.querySelector("div[data-index]");
        if (container && activeLyric) {
            scrollToCurrentLyric(activeLyric, container);
        }
    });
    syncLyrics();
    return true;
}

function toggleMobileInlineLyrics() {
    if (!isMobileView || !document.body) {
        return;
    }
    if (document.body.classList.contains("mobile-inline-lyrics-open")) {
        closeMobileInlineLyrics();
    } else {
        openMobileInlineLyrics();
    }
}

const PLACEHOLDER_HTML = `<div class="placeholder"><i class="fas fa-music"></i></div>`;
const paletteCache = new Map();
const PALETTE_STORAGE_KEY = "paletteCache.v1";
let paletteAbortController = null;
const BACKGROUND_TRANSITION_DURATION = 850;
let backgroundTransitionTimer = null;
const PALETTE_APPLY_DELAY = 140;
let pendingPaletteTimer = null;
let deferredPaletteHandle = null;
let deferredPaletteType = "";
let deferredPaletteUrl = null;
const themeDefaults = {
    light: {
        gradient: "",
        primaryColor: "",
        primaryColorDark: "",
    },
    dark: {
        gradient: "",
        primaryColor: "",
        primaryColorDark: "",
    }
};
let paletteRequestId = 0;

function safeGetLocalStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.warn(`读取本地存储失败: ${key}`, error);
        return null;
    }
}

function safeSetLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.warn(`写入本地存储失败: ${key}`, error);
    }
}

function parseJSON(value, fallback) {
    if (!value) return fallback;
    try {
        const parsed = JSON.parse(value);
        return parsed;
    } catch (error) {
        console.warn("解析本地存储 JSON 失败", error);
        return fallback;
    }
}

function loadStoredPalettes() {
    const stored = safeGetLocalStorage(PALETTE_STORAGE_KEY);
    if (!stored) {
        return;
    }

    try {
        const entries = JSON.parse(stored);
        if (Array.isArray(entries)) {
            for (const entry of entries) {
                if (Array.isArray(entry) && typeof entry[0] === "string" && entry[1] && typeof entry[1] === "object") {
                    paletteCache.set(entry[0], entry[1]);
                }
            }
        }
    } catch (error) {
        console.warn("解析调色板缓存失败", error);
    }
}

function persistPaletteCache() {
    const maxEntries = 20;
    const entries = Array.from(paletteCache.entries()).slice(-maxEntries);
    try {
        safeSetLocalStorage(PALETTE_STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
        console.warn("保存调色板缓存失败", error);
    }
}

function preferHttpsUrl(url) {
    if (!url || typeof url !== "string") return url;

    try {
        const parsedUrl = new URL(url, window.location.href);
        if (parsedUrl.protocol === "http:" && window.location.protocol === "https:") {
            parsedUrl.protocol = "https:";
            return parsedUrl.toString();
        }
        return parsedUrl.toString();
    } catch (error) {
        if (window.location.protocol === "https:" && url.startsWith("http://")) {
            return "https://" + url.substring("http://".length);
        }
        return url;
    }
}

function toAbsoluteUrl(url) {
    if (!url) {
        return "";
    }

    try {
        const absolute = new URL(url, window.location.href);
        return absolute.href;
    } catch (_) {
        return url;
    }
}

function buildAudioProxyUrl(url) {
    if (!url || typeof url !== "string") return url;

    try {
        const currentProtocol = window.location.protocol;
        const targetUrl = new URL(url);

        // 如果当前是 HTTPS，但目标是 HTTP，必须走代理
        if (currentProtocol === "https:" && targetUrl.protocol === "http:") {
            // 使用 encodeURIComponent 包裹目标 URL
            return `${API.baseUrl}?target=${encodeURIComponent(url)}`;
        }

        // 特殊处理：某些域名强制走代理（即使是 HTTPS 也可能需要代理来绕过 IP 限制或 Referrer）
        // 这里保留你原来的酷我逻辑，并可以扩展
        if (/(^|\.)kuwo\.cn$/i.test(targetUrl.hostname)) {
             return `${API.baseUrl}?target=${encodeURIComponent(url)}`;
        }

        return url;
    } catch (error) {
        console.warn("解析音频地址失败，跳过代理处理", error);
        return url;
    }
}

const SOURCE_OPTIONS = [
    { value: "kuwo", label: "酷我音乐" },
    { value: "netease", label: "网易云音乐" },
    { value: "joox", label: "JOOX音乐" }
];

// 备选关键词列表
const RADAR_KEYWORDS = [
    // 歌曲风格
    "流行", "摇滚", "民谣", "电子", "说唱", "R&B", "爵士", "蓝调",
    "Blues", "Rock & Roll", "Hard Core",
    "Funk", "Soul Music", "Bossa Nova", "R&B", "Rap", "拉丁",
    "Indie", "金属", "朋克", "工业摇滚", 
    "Trap", "Future Bass", "Dubstep", "Techno", "House", "Progressive House", "Trance", "Ambient",
    "New Wave", "Synthwave", "Post-Punk", "Gothic", "Folk Rock", "Post-Rock", "Hardstyle", "J-Pop", "K-Pop",
    "Reggaeton", "Tropical House", "Soul", "Chillwave", "Vaporwave", "Lo-fi Hip Hop", "Disco", "Folk", "Psychedelic",
    "Noise Rock", "Tech House", "Deep House", "Garage Rock", "Bluegrass", "Glam Rock", "Baroque Pop", "Alternative Rock",

    // 国内热门歌手
    "周杰伦", "邓紫棋", "李健", "毛不易", "薛之谦", "张韶涵", "王心凌",
    "赵雷", "张含韵", "SHE", "林俊杰", "蔡依林", "王力宏", "五月天",
    "张靓颖", "李荣浩", "田馥甄", "林宥嘉", "张杰", "周深", "任贤齐",
    "张信哲", "费玉清", "张惠妹", "刀郎", "腾格尔",
    "陈奕迅", "容祖儿", "李玉刚", "米津玄师", "易烊千玺",
    "周华健", "刘德华", "张学友", "陈慧娴", "林志炫", "莫文蔚", "潘玮柏",

    // 国际热门歌手
    "Taylor Swift", "Ed Sheeran", "Adele", "Beyoncé", "Justin Bieber",
    "Billie Eilish", "Bruno Mars", "Ariana Grande", "Shawn Mendes",
    "Dua Lipa", "Coldplay", "Maroon 5", "The Weeknd", "Lady Gaga",
    "Rihanna", "Kanye West", "Drake", "Post Malone", "Imagine Dragons",
    "Alicia Keys", "Sam Smith", "Selena Gomez", "Harry Styles",
    "One Direction", "Katy Perry", "Nicki Minaj", "Camila Cabello",
    "Halsey", "Charlie Puth", "Shakira", "P!nk", "Sia", "Avicii",
    "Calvin Harris", "David Guetta", "Zedd", "Martin Garrix", "Kygo",
    "Marshmello", "Alan Walker", "Coldplay", "Linkin Park", "Green Day",
    "Red Hot Chili Peppers", "Foo Fighters", "Queen", "The Beatles",
    "Michael Jackson", "Elton John", "Madonna", "Whitney Houston",
    "Celine Dion", "BTS", "BLACKPINK", "EXO", "TWICE", "BIGBANG", "SEVENTEEN",
    "NCT", "Stray Kids", "Red Velvet", "MONSTA X", "Aespa",

    // 国内知名乐队（包含活跃和已解散的）
    "五月天", "苏打绿", "鱼丁糸", "草东没有派对", 
    "新裤子", "痛仰", "反光镜", "逃跑计划",
    "万能青年旅店", "二手玫瑰", "黑豹", "唐朝",
    "Beyond", "花儿乐队", "F.I.R.飞儿乐团", "S.H.E",
    "凤凰传奇", "牛奶咖啡", "GALA", "后海大鲨鱼",
    "海龟先生", "刺猬", "Joyside", "重塑雕像的权利",
    "声音碎片", "达达乐队", "木马", "低苦艾",
    "顶楼的马戏团", "C-BLOCK", "Higher Brothers", "落日飞车",
    "告五人", "Deca Joins", "椅子乐团", "傻子与白痴",
    "康姆士", "岛屿心情", "对角巷", "白日密语",
    "回春丹", "Schoolgirl byebye", "Chinese Football", "C.S.B.Q",
    "ETA乐队", "表情银行", "缺省", "海朋森",
    "野外合作社", "闪星", "Life Awaits", "郁乐队",
    
    // 补充的热门已解散乐队
    "小虎队", "飞轮海", "信乐团", "水木年华",
    "无印良品", "羽泉", "零点乐队", "鲍家街43号",
    "轮回乐队", "超载乐队", "面孔乐队", "指南针乐队",
    "眼镜蛇乐队", "地下婴儿", "新裤子", "脑浊",
    "挂在盒子上", "生命之饼", "AK-47", "夜叉",
    "扭曲的机器", "T9", "皇冠", "窒息",
    "战斧", "春秋", "冥界", "施教日",

    // 国际知名乐队（热门/经典/已解散）
    "The Beatles", "Queen", "The Rolling Stones", "Nirvana", "Led Zeppelin", "Pink Floyd",
    "Metallica", "AC/DC", "Guns N' Roses", "Linkin Park", "Red Hot Chili Peppers", 
    "U2", "Coldplay", "Foo Fighters", "Imagine Dragons", "Maroon 5", 
    "Pearl Jam", "Radiohead", "The Killers", "Arctic Monkeys", "OneRepublic",
    "Green Day", "The Who", "The Doors", "Black Sabbath", "Bon Jovi",
    "Oasis", "The Cure", "Muse", "Paramore", "Kings of Leon"
];


function normalizeSource(value) {
    const allowed = SOURCE_OPTIONS.map(option => option.value);
    return allowed.includes(value) ? value : SOURCE_OPTIONS[0].value;
}

// 修改 QUALITY_OPTIONS 使用新的音质等级
const QUALITY_OPTIONS = QUALITY_LEVELS;

// 添加音质切换相关函数
function getCurrentQualityLevel() {
    const currentQuality = state.currentQualityAttempt || state.playbackQuality;
    return QUALITY_LEVELS.find(q => q.value === currentQuality) || QUALITY_LEVELS[2]; // 默认返回极高音质
}

function getNextLowerQuality(currentQuality) {
    const currentLevel = QUALITY_LEVELS.find(q => q.value === currentQuality)?.level || 3;
    const nextQuality = QUALITY_LEVELS.find(q => q.level === currentLevel - 1);
    return nextQuality ? nextQuality.value : null;
}


function getLowestQuality() {
    return QUALITY_LEVELS[QUALITY_LEVELS.length - 1].value;
}

function resetQualityState() {
    state.currentQualityAttempt = state.playbackQuality;
    state.qualityRetryCount = 0;
    state.isAutoQualitySwitching = false; // 重置标志
    state.playbackStuckCount = 0;
    state.isPlaybackStuck = false;
    state.isWaitingForPlayback = false;
    // 不再重置音源状态
    stopPlaybackMonitoring();
    stopLoadTimeoutMonitoring();
    debugLog(`音质状态重置: 当前尝试音质=${state.currentQualityAttempt}, 重试次数=${state.qualityRetryCount}`);
}


function handlePlaybackError(song, error) {
    // 关键修改：检查当前歌曲是否还是出错的这首歌，或者列表是否已清空
    if (!state.currentSong || state.currentSong.id !== song.id || state.playlistSongs.length === 0) {
        debugLog("错误处理中止：歌曲已切换或列表已清空");
        return;
    }

    // 检查是否已经在处理音质切换
    if (state.isAutoQualitySwitching) {
        debugLog(`已经在进行音质切换，忽略重复错误`);
        return;
    }
    
    stopPlaybackMonitoring();
    stopLoadTimeoutMonitoring();
    
    debugLog(`播放错误处理: 当前音质=${state.currentQualityAttempt}`);

    // 设置标志防止重复处理
    state.isAutoQualitySwitching = true;
    
    // 直接尝试降低音质，不再切换音源
    handleQualitySwitch(song, error);
    
    // 一段时间后重置标志
    setTimeout(() => {
        state.isAutoQualitySwitching = false;
    }, 3000);
}

// 新增：只降低音质的处理函数
function handleQualitySwitch(song, error) {
    state.qualityRetryCount++;
    
    debugLog(`尝试降低音质: 当前音质=${state.currentQualityAttempt}, 音质重试次数=${state.qualityRetryCount}`);

    // 尝试下一个较低音质
    const nextQuality = getNextLowerQuality(state.currentQualityAttempt);
    if (nextQuality) {
        state.currentQualityAttempt = nextQuality;
        const qualityInfo = QUALITY_LEVELS.find(q => q.value === nextQuality);
        debugLog(`自动切换音质: ${state.currentQualityAttempt} -> ${nextQuality}`);
        showNotification(`音质切换: ${qualityInfo?.label || nextQuality}`, 'info');
        
        // 使用新音质重新播放（保持原音源）
        setTimeout(() => {
            playSong(song, {
                autoplay: true,
                startTime: state.currentPlaybackTime,
                preserveProgress: true,
                isRetry: true
            });
        }, 500);
    } else {
        // 没有更低的音质可用，切换到下一首
        debugLog(`所有音质均无法播放，切换到下一首歌曲`);
        showNotification(`所有音质均无法播放 ${song.name}，自动切换下一首`, 'error');
        resetQualityState();
        
        // 切换到下一首前，先更新歌曲信息
        const nextSong = getNextSong();
        if (nextSong) {
            state.currentSong = nextSong;
            updateCurrentSongInfo(nextSong, { loadArtwork: true });
        }
        
        playNext();
    }
}

// 新增辅助函数：获取下一首歌曲
function getNextSong() {
    let playlist = [];
    let currentIndex = state.currentTrackIndex;

    if (state.currentPlaylist === "playlist") {
        playlist = state.playlistSongs;
    } else if (state.currentPlaylist === "online") {
        playlist = state.onlineSongs;
    } else if (state.currentPlaylist === "search") {
        playlist = state.searchResults;
    }

    if (playlist.length === 0) return null;

    let nextIndex = -1;

    if (state.playMode === "random") {
        // 随机模式下，确保不重复播放同一首（除非只有一首）
        if (playlist.length === 1) {
            nextIndex = 0;
        } else {
            do {
                nextIndex = Math.floor(Math.random() * playlist.length);
            } while (nextIndex === currentIndex && playlist.length > 1);
        }
    } else {
        // 顺序模式
        nextIndex = (currentIndex + 1) % playlist.length;
    }

    return playlist[nextIndex] || null;
}

function normalizeQuality(value) {
    const match = QUALITY_LEVELS.find(option => option.value === value);
    return match ? match.value : "320";
}

const savedPlaylistSongs = (() => {
    const stored = safeGetLocalStorage("playlistSongs");
    const playlist = parseJSON(stored, []);
    return Array.isArray(playlist) ? playlist : [];
})();

const PLAYLIST_EXPORT_VERSION = 1;

const savedCurrentTrackIndex = (() => {
    const stored = safeGetLocalStorage("currentTrackIndex");
    const index = Number.parseInt(stored, 10);
    return Number.isInteger(index) ? index : -1;
})();

const savedPlayMode = (() => {
    const stored = safeGetLocalStorage("playMode");
    const modes = ["list", "single", "random"];
    return modes.includes(stored) ? stored : "list";
})();

const savedPlaybackQuality = normalizeQuality(safeGetLocalStorage("playbackQuality"));

const savedVolume = (() => {
    const stored = safeGetLocalStorage("playerVolume");
    const volume = Number.parseFloat(stored);
    if (Number.isFinite(volume)) {
        return Math.min(Math.max(volume, 0), 1);
    }
    return 0.8;
})();

const savedSearchSource = (() => {
    const stored = safeGetLocalStorage("searchSource");
    return normalizeSource(stored);
})();

const savedPlaybackTime = (() => {
    const stored = safeGetLocalStorage("currentPlaybackTime");
    const time = Number.parseFloat(stored);
    return Number.isFinite(time) && time >= 0 ? time : 0;
})();

const savedCurrentSong = (() => {
    const stored = safeGetLocalStorage("currentSong");
    return parseJSON(stored, null);
})();

const savedCurrentPlaylist = (() => {
    const stored = safeGetLocalStorage("currentPlaylist");
    const playlists = ["playlist", "online", "search"];
    return playlists.includes(stored) ? stored : "playlist";
})();

// API配置 - 修复API地址和请求方式
const API = {
    baseUrl: "/proxy",

    generateSignature: () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },

    fetchJson: async (url) => {
        try {
            const response = await fetch(url, {
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const text = await response.text();
            try {
                return JSON.parse(text);
            } catch (parseError) {
                console.warn("JSON parse failed, returning raw text", parseError);
                return text;
            }
        } catch (error) {
            console.error("API request error:", error);
            throw error;
        }
    },

    search: async (keyword, source = "kuwo", count = SEARCH_PAGE_SIZE, page = 1) => {
        const signature = API.generateSignature();
        // 修改：使用动态页面大小
        const url = `${API.baseUrl}?types=search&source=${source}&name=${encodeURIComponent(keyword)}&count=${count}&pages=${page}&s=${signature}`;

        try {
            debugLog(`API请求: ${url}`);
            const data = await API.fetchJson(url);
            debugLog(`API响应: 获取到 ${Array.isArray(data) ? data.length : 0} 条结果`);

            if (!Array.isArray(data)) throw new Error("搜索结果格式错误");

            return data.map(song => ({
                id: song.id,
                name: song.name,
                artist: song.artist,
                album: song.album,
                pic_id: song.pic_id,
                url_id: song.url_id,
                lyric_id: song.lyric_id,
                source: song.source,
            }));
        } catch (error) {
            debugLog(`API错误: ${error.message}`);
            throw error;
        }
    },

    

    
    search: async (keyword, source = "kuwo", count = 50, page = 1) => {
        const signature = API.generateSignature();
        const url = `${API.baseUrl}?types=search&source=${source}&name=${encodeURIComponent(keyword)}&count=${count}&pages=${page}&s=${signature}`;

        try {
            debugLog(`API请求: ${url}`);
            const data = await API.fetchJson(url);
            debugLog(`API响应: ${JSON.stringify(data).substring(0, 200)}...`);

            if (!Array.isArray(data)) throw new Error("搜索结果格式错误");

            return data.map(song => ({
                id: song.id,
                name: song.name,
                artist: song.artist,
                album: song.album,
                pic_id: song.pic_id,
                url_id: song.url_id,
                lyric_id: song.lyric_id,
                source: song.source,
            }));
        } catch (error) {
            debugLog(`API错误: ${error.message}`);
            throw error;
        }
    },

    getRadarPlaylist: async (playlistId = "3778678", options = {}) => {
        const signature = API.generateSignature();

        let limit = 50;
        let offset = 0;

        if (typeof options === "number") {
            limit = options;
        } else if (options && typeof options === "object") {
            if (Number.isFinite(options.limit)) {
                limit = options.limit;
            } else if (Number.isFinite(options.count)) {
                limit = options.count;
            }
            if (Number.isFinite(options.offset)) {
                offset = options.offset;
            }
        }

        limit = Math.max(1, Math.min(200, Math.trunc(limit)) || 50);
        offset = Math.max(0, Math.trunc(offset) || 0);

        const params = new URLSearchParams({
            types: "playlist",
            id: playlistId,
            limit: String(limit),
            offset: String(offset),
            s: signature,
        });
        const url = `${API.baseUrl}?${params.toString()}`;

        try {
            const data = await API.fetchJson(url);
            const tracks = data && data.playlist && Array.isArray(data.playlist.tracks)
                ? data.playlist.tracks.slice(0, limit)
                : [];

            if (tracks.length === 0) throw new Error("No tracks found");

            return tracks.map(track => ({
                id: track.id,
                name: track.name,
                artist: Array.isArray(track.ar) ? track.ar.map(artist => artist.name).join(" / ") : "",
                source: "netease",
                lyric_id: track.id,
                pic_id: track.al?.pic_str || track.al?.pic || track.al?.picUrl || "",
            }));
        } catch (error) {
            console.error("API request failed:", error);
            throw error;
        }
    },

    getSongUrl: (song, quality = "320") => {
        const signature = API.generateSignature();
        return `${API.baseUrl}?types=url&id=${song.id}&source=${song.source || "netease"}&br=${quality}&s=${signature}`;
    },

    getLyric: (song) => {
        const signature = API.generateSignature();
        return `${API.baseUrl}?types=lyric&id=${song.lyric_id || song.id}&source=${song.source || "netease"}&s=${signature}`;
    },

    getPicUrl: (song) => {
        const signature = API.generateSignature();
        return `${API.baseUrl}?types=pic&id=${song.pic_id}&source=${song.source || "netease"}&size=300&s=${signature}`;
    }
};

Object.freeze(API);

// 新增：歌曲过滤函数
function filterBlockedSongs(songs) {
    if (!Array.isArray(songs) || songs.length === 0) {
        return [];
    }

    return songs.filter(song => {
        if (!song || typeof song !== 'object') return false;
        
        const songName = String(song.name || '').toLowerCase();
        const artistName = Array.isArray(song.artist) 
            ? song.artist.join(' ').toLowerCase()
            : String(song.artist || '').toLowerCase();
        const albumName = String(song.album || '').toLowerCase();

        // 检查是否包含任何屏蔽关键词
        const hasBlockedKeyword = BLOCKED_KEYWORDS.some(keyword => {
            const lowerKeyword = keyword.toLowerCase();
            return songName.includes(lowerKeyword) || 
                   artistName.includes(lowerKeyword) || 
                   albumName.includes(lowerKeyword);
        });

        return !hasBlockedKeyword;
    });
}
// 雷达偏移量初始化
const savedRadarOffset = (() => {
    const stored = safeGetLocalStorage("radarOffset");
    const offset = Number.parseInt(stored, 10);
    return Number.isInteger(offset) && offset >= 0 ? offset : 0;
})();

const state = {
    onlineSongs: [],
    searchResults: [],
    renderedSearchCount: 0,
    currentTrackIndex: savedCurrentTrackIndex,
    currentAudioUrl: null,
    lyricsData: [],
    currentLyricLine: -1,
    currentPlaylist: savedCurrentPlaylist, 
    searchPage: 1,
    searchKeyword: "", 
    searchSource: savedSearchSource,
    hasMoreResults: true,
    currentSong: savedCurrentSong,
    currentArtworkUrl: null,
    debugMode: false,
    isSearchMode: false, 
    playlistSongs: savedPlaylistSongs, 
    playMode: savedPlayMode, 
    playbackQuality: savedPlaybackQuality,
    volume: savedVolume,
    currentPlaybackTime: savedPlaybackTime,
    lastSavedPlaybackTime: savedPlaybackTime,
    pendingSeekTime: null,
    isSeeking: false,
    qualityMenuOpen: false,
    sourceMenuOpen: false,
    userScrolledLyrics: false, 
    lyricsScrollTimeout: null, 
    userScrolledPlaylist: false, 
    playlistScrollTimeout: null, 
    themeDefaultsCaptured: false,
    dynamicPalette: null,
    currentPaletteImage: null,
    pendingPaletteData: null,
    pendingPaletteImage: null,
    pendingPaletteImmediate: false,
    pendingPaletteReady: false,
    audioReadyForPalette: true,
    currentGradient: '',
    isMobileInlineLyricsOpen: false,
    selectedSearchResults: new Set(),
    radarOffset: savedRadarOffset, 
    currentQualityAttempt: savedPlaybackQuality, 
    qualityRetryCount: 0, 
    maxQualityRetries: 3, 
    isAutoQualitySwitching: false, 
    playbackStuckTimer: null, 
    lastPlaybackTime: 0, 
    playbackStuckCount: 0, 
    maxStuckRetries: 2, 
    isPlaybackStuck: false, 
    loadTimeoutTimer: null, 
    loadStartTime: 0, 
    maxLoadTime: 10000, 
    isWaitingForPlayback: false, 
    isAutoPlayingNext: false, 
    // === 新增字段 ===
    playbackRequestId: 0, // 用于解决异步竞态问题
};

// ==== Media Session integration (Safari/iOS Lock Screen) ====
(() => {
    const audio = dom.audioPlayer;
    if (!('mediaSession' in navigator) || !audio) return;

    let handlersBound = false;
    let lastPositionUpdateTime = 0;
    const MEDIA_SESSION_ENDED_FLAG = '__solaraMediaSessionHandledEnded';

    function triggerMediaSessionMetadataRefresh() {
        let refreshed = false;
        if (typeof window.__SOLARA_UPDATE_MEDIA_METADATA === 'function') {
            try {
                window.__SOLARA_UPDATE_MEDIA_METADATA();
                refreshed = true;
            } catch (error) {
                console.warn('刷新媒体信息失败:', error);
            }
        }
        if (!refreshed) {
            updateMediaMetadata();
        }
    }

    ['currentSong', 'currentArtworkUrl'].forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(state, key)) {
            return;
        }
        let internalValue = state[key];
        Object.defineProperty(state, key, {
            configurable: true,
            enumerable: true,
            get() {
                return internalValue;
            },
            set(nextValue) {
                internalValue = nextValue;
                triggerMediaSessionMetadataRefresh();
            }
        });
    });

    function bindActionHandlersOnce() {
        if (handlersBound) return;
        handlersBound = true;

        // 播放/暂停交给 <audio> 默认行为即可
        try {
            navigator.mediaSession.setActionHandler('previoustrack', () => {
                // 直接复用你已有的全局函数（HTML 里也在用）
                if (typeof window.playPrevious === 'function') {
                    const result = window.playPrevious();
                    if (result && typeof result.then === 'function') {
                        result.finally(triggerMediaSessionMetadataRefresh);
                    } else {
                        triggerMediaSessionMetadataRefresh();
                    }
                }
            });
            navigator.mediaSession.setActionHandler('nexttrack', () => {
                if (typeof window.playNext === 'function') {
                    const result = window.playNext();
                    if (result && typeof result.then === 'function') {
                        result.finally(triggerMediaSessionMetadataRefresh);
                    } else {
                        triggerMediaSessionMetadataRefresh();
                    }
                }
            });

            navigator.mediaSession.setActionHandler('seekbackward', null);
            navigator.mediaSession.setActionHandler('seekforward', null);

            // 关键：让锁屏支持拖动进度到任意位置
            navigator.mediaSession.setActionHandler('seekto', (e) => {
                if (!e || typeof e.seekTime !== 'number') return;
                audio.currentTime = Math.max(0, Math.min(audio.duration || 0, e.seekTime));
                if (e.fastSeek && typeof audio.fastSeek === 'function') {
                    audio.fastSeek(audio.currentTime);
                }
                updatePositionState();
            });

            // 可选：切换播放状态（大部分系统自己会处理）
            navigator.mediaSession.setActionHandler('play', async () => {
                try { await audio.play(); } catch(_) {}
            });
            navigator.mediaSession.setActionHandler('pause', () => audio.pause());
        } catch (_) {
            // 某些平台不支持全部动作
        }
    }

    // 监听 audio 事件，同步锁屏信息与进度
    audio.addEventListener('loadedmetadata', () => {
        triggerMediaSessionMetadataRefresh();
        updatePositionState();
        lastPositionUpdateTime = Date.now();
        bindActionHandlersOnce();
    });

    audio.addEventListener('play', () => {
        navigator.mediaSession.playbackState = 'playing';
        updatePositionState();
        lastPositionUpdateTime = Date.now();
    });

    audio.addEventListener('pause', () => {
        navigator.mediaSession.playbackState = 'paused';
        updatePositionState();
        lastPositionUpdateTime = Date.now();
    });

    audio.addEventListener('timeupdate', () => {
        const now = Date.now();
        if (now - lastPositionUpdateTime >= 1000) {
            lastPositionUpdateTime = now;
            updatePositionState();
        }
    });

    audio.addEventListener('durationchange', updatePositionState);
    audio.addEventListener('ratechange', updatePositionState);
    audio.addEventListener('seeking', updatePositionState);
    audio.addEventListener('seeked', updatePositionState);

    audio.addEventListener('ended', () => {
        navigator.mediaSession.playbackState = 'paused';
        updatePositionState();
        
        const refresh = () => {
            triggerMediaSessionMetadataRefresh();
            audio[MEDIA_SESSION_ENDED_FLAG] = false;
        };

        if (typeof autoPlayNext === 'function') {
            try {
                audio[MEDIA_SESSION_ENDED_FLAG] = 'handling';
                autoPlayNext();
                audio[MEDIA_SESSION_ENDED_FLAG] = 'skip';
                Promise.resolve().then(refresh);
                return;
            } catch (error) {
                console.warn('自动播放下一首失败:', error);
            }
        }
        
        audio[MEDIA_SESSION_ENDED_FLAG] = 'skip';
        if (typeof window.playNext === 'function') {
            try {
                const result = window.playNext();
                if (typeof updatePlayPauseButton === 'function') {
                    updatePlayPauseButton();
                }
                if (result && typeof result.then === 'function') {
                    result.finally(refresh);
                } else {
                    Promise.resolve().then(refresh);
                }
                return;
            } catch (error) {
                console.warn('自动播放下一首失败:', error);
            }
        }
        refresh();
    });

    // 当你在应用内切歌（更新 state.currentSong / 封面 / 标题）时，也调用一次：
    // window.__SOLARA_UPDATE_MEDIA_METADATA = updateMediaMetadata;
    // 这样在你现有的切歌逻辑里，设置完新的 audio.src 后手动调用它可立即更新锁屏封面/文案。
    if (typeof window.__SOLARA_UPDATE_MEDIA_METADATA !== 'function') {
        window.__SOLARA_UPDATE_MEDIA_METADATA = updateMediaMetadata;
    }

    triggerMediaSessionMetadataRefresh();
})();


async function checkAuth() {
    try {
        const response = await fetch('/api/auth-status', {
            credentials: 'include'  // 重要：包含 cookies
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.authenticated) {
            console.log('用户未认证，跳转到登录页面');
            window.location.href = '/login.html';
            return false;
        }
        
        console.log('用户已认证，继续加载应用');
        return true;
    } catch (error) {
        console.error('认证检查失败:', error);
        window.location.href = '/login.html';
        return false;
    }
}

// 退出登录功能
function setupLogout() {
    // 添加一个退出按钮到界面，或者使用键盘快捷键
    document.addEventListener('keydown', (e) => {
        // Ctrl+Shift+L 退出登录
        if (e.ctrlKey && e.shiftKey && e.key === 'L') {
            if (confirm('确定要退出登录吗？')) {
                fetch('/api/logout', { 
                    method: 'POST',
                    credentials: 'include'
                }).then(() => {
                    window.location.href = '/login.html';
                });
            }
        }
    });
}

// 在应用初始化前检查认证
async function initializeApp() {
    console.log('开始应用初始化，检查认证状态...');
    
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        console.log('认证失败，停止初始化');
        return;
    }
    
    console.log('认证成功，设置退出功能和交互');
    setupLogout();
    
    // 原有的初始化代码
    if (typeof setupInteractions === 'function') {
        setupInteractions();
    } else {
        console.error('setupInteractions 函数未找到');
    }
}

// 替换原有的立即执行代码，改为调用initializeApp
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

let sourceMenuPositionFrame = null;
let qualityMenuPositionFrame = null;
let floatingMenuListenersAttached = false;
let qualityMenuAnchor = null;

function runWithoutTransition(element, callback) {
    if (!element || typeof callback !== "function") return;
    const previousTransition = element.style.transition;
    element.style.transition = "none";
    callback();
    void element.offsetHeight;
    if (previousTransition) {
        element.style.transition = previousTransition;
    } else {
        element.style.removeProperty("transition");
    }
}

function cancelSourceMenuPositionUpdate() {
    if (sourceMenuPositionFrame !== null) {
        window.cancelAnimationFrame(sourceMenuPositionFrame);
        sourceMenuPositionFrame = null;
    }
}

function scheduleSourceMenuPositionUpdate() {
    if (!state.sourceMenuOpen) {
        cancelSourceMenuPositionUpdate();
        return;
    }
    if (sourceMenuPositionFrame !== null) {
        return;
    }
    sourceMenuPositionFrame = window.requestAnimationFrame(() => {
        sourceMenuPositionFrame = null;
        updateSourceMenuPosition();
    });
}

function cancelPlayerQualityMenuPositionUpdate() {
    if (qualityMenuPositionFrame !== null) {
        window.cancelAnimationFrame(qualityMenuPositionFrame);
        qualityMenuPositionFrame = null;
    }
}

function schedulePlayerQualityMenuPositionUpdate() {
    if (!state.qualityMenuOpen) {
        cancelPlayerQualityMenuPositionUpdate();
        return;
    }
    if (qualityMenuPositionFrame !== null) {
        return;
    }
    qualityMenuPositionFrame = window.requestAnimationFrame(() => {
        qualityMenuPositionFrame = null;
        updatePlayerQualityMenuPosition();
    });
}

function handleFloatingMenuResize() {
    if (state.sourceMenuOpen) {
        scheduleSourceMenuPositionUpdate();
    }
    if (state.qualityMenuOpen) {
        schedulePlayerQualityMenuPositionUpdate();
    }
}

function handleFloatingMenuScroll() {
    if (state.sourceMenuOpen) {
        scheduleSourceMenuPositionUpdate();
    }
    if (state.qualityMenuOpen) {
        schedulePlayerQualityMenuPositionUpdate();
    }
}

function ensureFloatingMenuListeners() {
    if (floatingMenuListenersAttached) {
        return;
    }
    window.addEventListener("resize", handleFloatingMenuResize);
    window.addEventListener("scroll", handleFloatingMenuScroll, { passive: true, capture: true });
    floatingMenuListenersAttached = true;
}

function releaseFloatingMenuListenersIfIdle() {
    if (state.sourceMenuOpen || state.qualityMenuOpen) {
        return;
    }
    if (!floatingMenuListenersAttached) {
        return;
    }
    window.removeEventListener("resize", handleFloatingMenuResize);
    window.removeEventListener("scroll", handleFloatingMenuScroll, true);
    floatingMenuListenersAttached = false;
}

state.currentGradient = getComputedStyle(document.documentElement)
    .getPropertyValue("--bg-gradient")
    .trim();

function setGlobalThemeProperty(name, value) {
    if (typeof name !== "string") {
        return;
    }
    document.documentElement.style.setProperty(name, value);
    if (document.body) {
        document.body.style.setProperty(name, value);
    }
}

function removeGlobalThemeProperty(name) {
    if (typeof name !== "string") {
        return;
    }
    document.documentElement.style.removeProperty(name);
    if (document.body) {
        document.body.style.removeProperty(name);
    }
}

if (state.currentGradient) {
    setGlobalThemeProperty("--bg-gradient-next", state.currentGradient);
}

function captureThemeDefaults() {
    if (state.themeDefaultsCaptured) {
        return;
    }

    const initialIsDark = document.body.classList.contains("dark-mode");
    document.body.classList.remove("dark-mode");
    const lightStyles = getComputedStyle(document.body);
    themeDefaults.light.gradient = lightStyles.getPropertyValue("--bg-gradient").trim();
    themeDefaults.light.primaryColor = lightStyles.getPropertyValue("--primary-color").trim();
    themeDefaults.light.primaryColorDark = lightStyles.getPropertyValue("--primary-color-dark").trim();

    document.body.classList.add("dark-mode");
    const darkStyles = getComputedStyle(document.body);
    themeDefaults.dark.gradient = darkStyles.getPropertyValue("--bg-gradient").trim();
    themeDefaults.dark.primaryColor = darkStyles.getPropertyValue("--primary-color").trim();
    themeDefaults.dark.primaryColorDark = darkStyles.getPropertyValue("--primary-color-dark").trim();

    if (!initialIsDark) {
        document.body.classList.remove("dark-mode");
    }

    state.themeDefaultsCaptured = true;
}

function applyThemeTokens(tokens) {
    if (!tokens) return;
    if (tokens.primaryColor) {
        setGlobalThemeProperty("--primary-color", tokens.primaryColor);
    }
    if (tokens.primaryColorDark) {
        setGlobalThemeProperty("--primary-color-dark", tokens.primaryColorDark);
    }
}

function setDocumentGradient(gradient, { immediate = false } = {}) {
    const normalized = (gradient || "").trim();
    const current = (state.currentGradient || "").trim();
    const shouldSkipTransition = immediate || normalized === current;

    if (!dom.backgroundTransitionLayer || !dom.backgroundBaseLayer) {
        if (normalized) {
            setGlobalThemeProperty("--bg-gradient", normalized);
            setGlobalThemeProperty("--bg-gradient-next", normalized);
        } else {
            removeGlobalThemeProperty("--bg-gradient");
            removeGlobalThemeProperty("--bg-gradient-next");
        }
        state.currentGradient = normalized;
        return;
    }

    window.clearTimeout(backgroundTransitionTimer);

    if (shouldSkipTransition) {
        if (normalized) {
            setGlobalThemeProperty("--bg-gradient", normalized);
            setGlobalThemeProperty("--bg-gradient-next", normalized);
        } else {
            removeGlobalThemeProperty("--bg-gradient");
            removeGlobalThemeProperty("--bg-gradient-next");
        }
        document.body.classList.remove("background-transitioning");
        state.currentGradient = normalized;
        return;
    }

    if (normalized) {
        setGlobalThemeProperty("--bg-gradient-next", normalized);
    } else {
        removeGlobalThemeProperty("--bg-gradient-next");
    }

    requestAnimationFrame(() => {
        document.body.classList.add("background-transitioning");
        backgroundTransitionTimer = window.setTimeout(() => {
            if (normalized) {
                setGlobalThemeProperty("--bg-gradient", normalized);
                setGlobalThemeProperty("--bg-gradient-next", normalized);
            } else {
                removeGlobalThemeProperty("--bg-gradient");
                removeGlobalThemeProperty("--bg-gradient-next");
            }
            document.body.classList.remove("background-transitioning");
            state.currentGradient = normalized;
        }, BACKGROUND_TRANSITION_DURATION);
    });
}

function applyDynamicGradient(options = {}) {
    if (!state.themeDefaultsCaptured) {
        captureThemeDefaults();
    }
    const isDark = document.body.classList.contains("dark-mode");
    const mode = isDark ? "dark" : "light";
    const defaults = themeDefaults[mode];

    let targetGradient = defaults.gradient || "";
    applyThemeTokens(defaults);

    const palette = state.dynamicPalette;
    if (palette && palette.gradients) {
        const gradients = palette.gradients;
        let gradientMode = mode;
        let gradientInfo = gradients[gradientMode] || null;

        if (!gradientInfo) {
            const fallbackModes = gradientMode === "dark" ? ["light"] : ["dark"];
            for (const candidate of fallbackModes) {
                if (gradients[candidate]) {
                    gradientMode = candidate;
                    gradientInfo = gradients[candidate];
                    break;
                }
            }
            if (!gradientInfo) {
                const availableModes = Object.keys(gradients);
                if (availableModes.length) {
                    const candidate = availableModes[0];
                    gradientMode = candidate;
                    gradientInfo = gradients[candidate];
                }
            }
        }

        if (gradientInfo && gradientInfo.gradient) {
            targetGradient = gradientInfo.gradient;
        }

        if (palette.tokens) {
            const tokens = palette.tokens[gradientMode] || palette.tokens[mode];
            if (tokens) {
                applyThemeTokens(tokens);
            }
        }
    }

    setDocumentGradient(targetGradient, options);
}

function queueDefaultPalette(options = {}) {
    window.clearTimeout(pendingPaletteTimer);
    pendingPaletteTimer = null;
    cancelDeferredPaletteUpdate();
    state.pendingPaletteData = null;
    state.pendingPaletteImage = null;
    state.pendingPaletteImmediate = Boolean(options.immediate);
    state.pendingPaletteReady = true;
    attemptPaletteApplication();
}

function resetDynamicBackground(options = {}) {
    paletteRequestId += 1;
    cancelDeferredPaletteUpdate();
    if (paletteAbortController) {
        paletteAbortController.abort();
        paletteAbortController = null;
    }
    state.dynamicPalette = null;
    state.currentPaletteImage = null;
    queueDefaultPalette(options);
}

function queuePaletteApplication(palette, imageUrl, options = {}) {
    window.clearTimeout(pendingPaletteTimer);
    pendingPaletteTimer = null;
    state.pendingPaletteData = palette || null;
    state.pendingPaletteImage = imageUrl || null;
    state.pendingPaletteImmediate = Boolean(options.immediate);
    state.pendingPaletteReady = true;
    attemptPaletteApplication();
}

function cancelDeferredPaletteUpdate() {
    if (deferredPaletteHandle === null) {
        return;
    }
    if (deferredPaletteType === "idle" && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(deferredPaletteHandle);
    } else {
        window.clearTimeout(deferredPaletteHandle);
    }
    deferredPaletteHandle = null;
    deferredPaletteType = "";
    deferredPaletteUrl = null;
}

function scheduleDeferredPaletteUpdate(imageUrl, options = {}) {
    const immediate = Boolean(options.immediate);
    if (!imageUrl) {
        cancelDeferredPaletteUpdate();
        if (immediate) {
            resetDynamicBackground();
        }
        return;
    }

    if (immediate) {
        cancelDeferredPaletteUpdate();
        updateDynamicBackground(imageUrl);
        return;
    }

    if (deferredPaletteHandle !== null) {
        if (deferredPaletteType === "idle" && typeof window.cancelIdleCallback === "function") {
            window.cancelIdleCallback(deferredPaletteHandle);
        } else {
            window.clearTimeout(deferredPaletteHandle);
        }
    }

    deferredPaletteUrl = imageUrl;
    const runner = () => {
        deferredPaletteHandle = null;
        deferredPaletteType = "";
        const targetUrl = deferredPaletteUrl;
        deferredPaletteUrl = null;
        if (targetUrl) {
            updateDynamicBackground(targetUrl);
        }
    };

    if (typeof window.requestIdleCallback === "function") {
        deferredPaletteType = "idle";
        deferredPaletteHandle = window.requestIdleCallback(runner, { timeout: 800 });
    } else {
        deferredPaletteType = "timeout";
        deferredPaletteHandle = window.setTimeout(runner, 120);
    }
}

function attemptPaletteApplication() {
    if (!state.pendingPaletteReady || !state.audioReadyForPalette) {
        return;
    }

    const palette = state.pendingPaletteData || null;
    const imageUrl = state.pendingPaletteImage || null;
    const immediate = state.pendingPaletteImmediate;

    state.pendingPaletteData = null;
    state.pendingPaletteImage = null;
    state.pendingPaletteImmediate = false;
    state.pendingPaletteReady = false;

    const apply = () => {
        pendingPaletteTimer = null;
        state.dynamicPalette = palette;
        state.currentPaletteImage = imageUrl;
        applyDynamicGradient({ immediate: false });
    };

    if (immediate) {
        pendingPaletteTimer = null;
        state.dynamicPalette = palette;
        state.currentPaletteImage = imageUrl;
        applyDynamicGradient({ immediate: true });
        return;
    }

    pendingPaletteTimer = window.setTimeout(apply, PALETTE_APPLY_DELAY);
}

function showAlbumCoverPlaceholder() {
    dom.albumCover.innerHTML = PLACEHOLDER_HTML;
    dom.albumCover.classList.remove("loading");
    state.currentArtworkUrl = toAbsoluteUrl('/favicon.png');
    queueDefaultPalette();
    if (typeof window.__SOLARA_UPDATE_MEDIA_METADATA === 'function') {
        window.__SOLARA_UPDATE_MEDIA_METADATA();
    }
}

function setAlbumCoverImage(url) {
    const safeUrl = toAbsoluteUrl(preferHttpsUrl(url));
    state.currentArtworkUrl = safeUrl;
    dom.albumCover.innerHTML = `<img src="${safeUrl}" alt="专辑封面">`;
    dom.albumCover.classList.remove("loading");
    if (typeof window.__SOLARA_UPDATE_MEDIA_METADATA === 'function') {
        window.__SOLARA_UPDATE_MEDIA_METADATA();
    }
}

loadStoredPalettes();

async function fetchPaletteData(imageUrl, signal) {
    if (paletteCache.has(imageUrl)) {
        const cached = paletteCache.get(imageUrl);
        paletteCache.delete(imageUrl);
        paletteCache.set(imageUrl, cached);
        return cached;
    }

    const response = await fetch(`/palette?image=${encodeURIComponent(imageUrl)}`, { signal });
    const raw = await response.text();
    let payload = null;
    try {
        payload = raw ? JSON.parse(raw) : null;
    } catch (parseError) {
        console.warn("解析调色板响应失败:", parseError);
    }

    if (!response.ok) {
        const detail = payload && payload.error ? ` (${payload.error})` : "";
        throw new Error(`Palette request failed: ${response.status}${detail}`);
    }

    if (payload === null) {
        throw new Error("Palette response missing body");
    }

    const data = payload;
    if (paletteCache.has(imageUrl)) {
        paletteCache.delete(imageUrl);
    }
    paletteCache.set(imageUrl, data);
    persistPaletteCache();
    return data;
}

async function updateDynamicBackground(imageUrl) {
    paletteRequestId += 1;
    const requestId = paletteRequestId;

    if (!imageUrl) {
        resetDynamicBackground();
        return;
    }

    if (paletteAbortController) {
        paletteAbortController.abort();
        paletteAbortController = null;
    }

    if (paletteCache.has(imageUrl)) {
        const cached = paletteCache.get(imageUrl);
        paletteCache.delete(imageUrl);
        paletteCache.set(imageUrl, cached);
        queuePaletteApplication(cached, imageUrl);
        return;
    }

    if (state.currentPaletteImage === imageUrl && state.dynamicPalette) {
        queuePaletteApplication(state.dynamicPalette, imageUrl);
        return;
    }

    let controller = null;
    try {
        if (paletteAbortController) {
            paletteAbortController.abort();
        }

        controller = new AbortController();
        paletteAbortController = controller;

        const palette = await fetchPaletteData(imageUrl, controller.signal);
        if (requestId !== paletteRequestId) {
            return;
        }
        queuePaletteApplication(palette, imageUrl);
    } catch (error) {
        if (error?.name === "AbortError") {
            return;
        }
        console.warn("获取动态背景失败:", error);
        if (requestId === paletteRequestId) {
            resetDynamicBackground();
        }
    } finally {
        if (controller && paletteAbortController === controller) {
            paletteAbortController = null;
        }
    }
}

function savePlayerState() {
    safeSetLocalStorage("playlistSongs", JSON.stringify(state.playlistSongs));
    safeSetLocalStorage("currentTrackIndex", String(state.currentTrackIndex));
    safeSetLocalStorage("playMode", state.playMode);
    safeSetLocalStorage("playbackQuality", state.playbackQuality);
    safeSetLocalStorage("playerVolume", String(state.volume));
    safeSetLocalStorage("currentPlaylist", state.currentPlaylist);
    safeSetLocalStorage("radarOffset", String(state.radarOffset || 0));
    if (state.currentSong) {
        safeSetLocalStorage("currentSong", JSON.stringify(state.currentSong));
    } else {
        safeSetLocalStorage("currentSong", "");
    }
    safeSetLocalStorage("currentPlaybackTime", String(state.currentPlaybackTime || 0));
}

// 调试日志函数
function debugLog(message) {
    console.log(`[DEBUG] ${message}`);
    if (state.debugMode) {
        const debugInfo = dom.debugInfo;
        debugInfo.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
        debugInfo.classList.add("show");
        debugInfo.scrollTop = debugInfo.scrollHeight;
    }
}

// 启用调试模式（按Ctrl+D）
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        state.debugMode = !state.debugMode;
        if (state.debugMode) {
            dom.debugInfo.classList.add("show");
            debugLog("调试模式已启用");
        } else {
            dom.debugInfo.classList.remove("show");
        }
    }
    
    // 测试播放列表滚动（按Ctrl+S）
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        debugLog("手动触发播放列表滚动测试");
        window.testPlaylistScroll();
    }
});

// 新增：切换搜索模式
function toggleSearchMode(enable) {
    state.isSearchMode = enable;
    if (enable) {
        dom.container.classList.add("search-mode");
        debugLog("进入搜索模式");
    } else {
        dom.container.classList.remove("search-mode");
        debugLog("退出搜索模式");
    }
}

// 新增：显示搜索结果
function showSearchResults() {
    toggleSearchMode(true);
    if (state.sourceMenuOpen) {
        scheduleSourceMenuPositionUpdate();
    }
    if (state.qualityMenuOpen) {
        schedulePlayerQualityMenuPositionUpdate();
    }
}

// 新增：隐藏搜索结果 - 优化立即收起
function hideSearchResults() {
    toggleSearchMode(false);
    if (state.sourceMenuOpen) {
        scheduleSourceMenuPositionUpdate();
    }
    if (state.qualityMenuOpen) {
        schedulePlayerQualityMenuPositionUpdate();
    }
    // 立即清空搜索结果内容
    const container = dom.searchResultsList || dom.searchResults;
    if (container) {
        container.innerHTML = "";
    }
    state.renderedSearchCount = 0;
    resetSelectedSearchResults();
}

const playModeTexts = {
    "list": "列表循环",
    "single": "单曲循环",
    "random": "随机播放"
};

const playModeIcons = {
    "list": "fa-repeat",
    "single": "fa-redo",
    "random": "fa-shuffle"
};

function updatePlayModeUI() {
    const mode = state.playMode;
    dom.playModeBtn.innerHTML = `<i class="fas ${playModeIcons[mode] || playModeIcons.list}"></i>`;
    dom.playModeBtn.title = `播放模式: ${playModeTexts[mode] || playModeTexts.list}`;
}

// 新增：播放模式切换
function togglePlayMode() {
    const modes = ["list", "single", "random"];
    const currentIndex = modes.indexOf(state.playMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    state.playMode = modes[nextIndex];

    updatePlayModeUI();
    savePlayerState();

    const modeText = playModeTexts[state.playMode] || playModeTexts.list;
    showNotification(`播放模式: ${modeText}`);
    debugLog(`播放模式切换为: ${state.playMode}`);
}

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return "00:00";
    }
    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updatePlayPauseButton() {
    if (!dom.playPauseBtn) return;
    const isPlaying = !dom.audioPlayer.paused && !dom.audioPlayer.ended;
    dom.playPauseBtn.innerHTML = `<i class="fas ${isPlaying ? "fa-pause" : "fa-play"}"></i>`;
    dom.playPauseBtn.title = isPlaying ? "暂停" : "播放";
    if (document.body) {
        document.body.classList.toggle("is-playing", isPlaying);
    }
}

function updateProgressBarBackground(value = Number(dom.progressBar.value), max = Number(dom.progressBar.max)) {
    const duration = Number.isFinite(max) && max > 0 ? max : 0;
    const progressValue = Number.isFinite(value) ? Math.max(value, 0) : 0;
    const percent = duration > 0 ? Math.min(progressValue / duration, 1) * 100 : 0;
    dom.progressBar.style.setProperty("--progress", `${percent}%`);
}

function updateVolumeSliderBackground(volume = dom.audioPlayer.volume) {
    const clamped = Math.min(Math.max(Number.isFinite(volume) ? volume : 0, 0), 1);
    dom.volumeSlider.style.setProperty("--volume-progress", `${clamped * 100}%`);
}

function updateVolumeIcon(volume) {
    if (!dom.volumeIcon) return;
    const clamped = Math.min(Math.max(Number.isFinite(volume) ? volume : 0, 0), 1);
    let icon = "fa-volume-high";
    if (clamped === 0) {
        icon = "fa-volume-xmark";
    } else if (clamped < 0.4) {
        icon = "fa-volume-low";
    }
    dom.volumeIcon.className = `fas ${icon}`;
}

function onAudioVolumeChange() {
    const volume = dom.audioPlayer.volume;
    state.volume = volume;
    dom.volumeSlider.value = volume;
    updateVolumeSliderBackground(volume);
    updateVolumeIcon(volume);
    savePlayerState();
}

function handleVolumeChange(event) {
    const volume = Number.parseFloat(event.target.value);
    const clamped = Number.isFinite(volume) ? Math.min(Math.max(volume, 0), 1) : dom.audioPlayer.volume;
    dom.audioPlayer.volume = clamped;
    state.volume = clamped;
    updateVolumeSliderBackground(clamped);
    updateVolumeIcon(clamped);
    safeSetLocalStorage("playerVolume", String(clamped));
}

function handleTimeUpdate() {
    const currentTime = dom.audioPlayer.currentTime || 0;
    
    // 如果用户没有正在拖动进度条，更新网页进度条显示
    if (!state.isSeeking) {
        dom.progressBar.value = currentTime;
        dom.currentTimeDisplay.textContent = formatTime(currentTime);
        updateProgressBarBackground(currentTime, Number(dom.progressBar.max));
    }

    // 同步歌词
    syncLyrics();

    // 更新内部状态
    state.currentPlaybackTime = currentTime;
    
    // 保存播放进度到本地存储 (每变动2秒保存一次，避免频繁写入)
    if (Math.abs(currentTime - state.lastSavedPlaybackTime) >= 2) {
        state.lastSavedPlaybackTime = currentTime;
        safeSetLocalStorage("currentPlaybackTime", currentTime.toFixed(1));
    }

}

function handleLoadedMetadata() {
    const duration = dom.audioPlayer.duration || 0;
    
    // 更新网页内的进度条最大值
    dom.progressBar.max = duration;
    dom.durationDisplay.textContent = formatTime(duration);
    updateProgressBarBackground(dom.audioPlayer.currentTime || 0, duration);

    // 处理之前的 Seek 请求（如果有）
    if (state.pendingSeekTime != null) {
        setAudioCurrentTime(state.pendingSeekTime);
        state.pendingSeekTime = null;
    }

    // --- 新增修复部分 ---
    // 音频元数据加载完成后，立即更新 Media Session 的进度
    // 这能修复切歌后锁屏界面总时长显示为 0:00 的问题
    if ('mediaSession' in navigator) {
        // 确保状态为播放或暂停（取决于自动播放是否成功），防止状态滞留在 "none"
        if (!dom.audioPlayer.paused) {
            navigator.mediaSession.playbackState = 'playing';
        } else {
            navigator.mediaSession.playbackState = 'paused';
        }
        updatePositionState();
    }
}

function setAudioCurrentTime(time) {
    if (!Number.isFinite(time)) return;
    const duration = dom.audioPlayer.duration || Number(dom.progressBar.max) || 0;
    const clamped = duration > 0 ? Math.min(Math.max(time, 0), duration) : Math.max(time, 0);
    try {
        dom.audioPlayer.currentTime = clamped;
    } catch (error) {
        console.warn("设置播放进度失败", error);
    }
    dom.progressBar.value = clamped;
    dom.currentTimeDisplay.textContent = formatTime(clamped);
    updateProgressBarBackground(clamped, duration);
    state.currentPlaybackTime = clamped;
}

function handleProgressInput() {
    state.isSeeking = true;
    const value = Number(dom.progressBar.value);
    dom.currentTimeDisplay.textContent = formatTime(value);
    updateProgressBarBackground(value, Number(dom.progressBar.max));
}

function handleProgressChange() {
    const value = Number(dom.progressBar.value);
    state.isSeeking = false;
    seekAudio(value);
}

function seekAudio(value) {
    if (!Number.isFinite(value)) return;
    setAudioCurrentTime(value);
    state.lastSavedPlaybackTime = state.currentPlaybackTime;
    safeSetLocalStorage("currentPlaybackTime", state.currentPlaybackTime.toFixed(1));
}

async function togglePlayPause() {
    if (!state.currentSong) {
        if (state.playlistSongs.length > 0) {
            const targetIndex = state.currentTrackIndex >= 0 && state.currentTrackIndex < state.playlistSongs.length
                ? state.currentTrackIndex
                : 0;
            await playPlaylistSong(targetIndex);
        } else {
            showNotification("播放列表为空，请先添加歌曲", "error");
        }
        return;
    }

    if (!dom.audioPlayer.src) {
        try {
            await playSong(state.currentSong, {
                autoplay: true,
                startTime: state.currentPlaybackTime,
                preserveProgress: true,
            });
        } catch (error) {
            console.error("恢复播放失败:", error);
            showNotification("播放失败，请稍后重试", "error");
        }
        return;
    }

    if (dom.audioPlayer.paused) {
        const playPromise = dom.audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // 更新 Media Session 状态
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.playbackState = 'playing';
                    updatePositionState();
                }
            }).catch(error => {
                console.error("播放失败:", error);
                showNotification("播放失败，请检查网络连接", "error");
            });
        }
    } else {
        // 关键：用户主动暂停时，增加 ID，防止正在进行的加载操作在未来自动触发播放
        state.playbackRequestId++;
        
        dom.audioPlayer.pause();
        
        // 更新 Media Session 状态
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'paused';
            updatePositionState();
        }
    }
}

function buildSourceMenu() {
    if (!dom.sourceMenu) return;
    const optionsHtml = SOURCE_OPTIONS.map(option => {
        const isActive = option.value === state.searchSource;
        return `
            <div class="source-option${isActive ? " active" : ""}" data-source="${option.value}" role="option" aria-selected="${isActive}">
                <span>${option.label}</span>
                ${isActive ? '<i class="fas fa-check" aria-hidden="true"></i>' : ""}
            </div>
        `;
    }).join("");
    dom.sourceMenu.innerHTML = optionsHtml;
    if (state.sourceMenuOpen) {
        scheduleSourceMenuPositionUpdate();
    }
}

function updateSourceLabel() {
    const option = SOURCE_OPTIONS.find(item => item.value === state.searchSource) || SOURCE_OPTIONS[0];
    if (!option || !dom.sourceSelectLabel || !dom.sourceSelectButton) return;
    dom.sourceSelectLabel.textContent = option.label;
    dom.sourceSelectButton.dataset.source = option.value;
    dom.sourceSelectButton.setAttribute("aria-expanded", state.sourceMenuOpen ? "true" : "false");
    dom.sourceSelectButton.setAttribute("aria-label", `当前音源：${option.label}，点击切换音源`);
    dom.sourceSelectButton.setAttribute("title", `音源：${option.label}`);
}

function updateSourceMenuPosition() {
    if (!state.sourceMenuOpen || !dom.sourceMenu || !dom.sourceSelectButton) return;

    const menu = dom.sourceMenu;
    const button = dom.sourceSelectButton;
    const spacing = 10;
    const buttonWidth = Math.ceil(button.getBoundingClientRect().width);
    const effectiveWidth = Math.max(buttonWidth, 140);

    menu.style.left = "0px";
    menu.style.width = `${effectiveWidth}px`;
    menu.style.minWidth = `${effectiveWidth}px`;
    menu.style.maxWidth = `${effectiveWidth}px`;

    const menuHeight = Math.max(menu.scrollHeight, 0);
    const buttonRect = button.getBoundingClientRect();
    const viewportHeight = Math.max(window.innerHeight || 0, document.documentElement.clientHeight || 0);
    const spaceBelow = Math.max(viewportHeight - buttonRect.bottom - spacing, 0);
    const canOpenUpwards = buttonRect.top - spacing - menuHeight >= 0;
    const shouldOpenUpwards = menuHeight > spaceBelow && canOpenUpwards;

    if (shouldOpenUpwards) {
        menu.classList.add("open-upwards");
        menu.classList.remove("open-downwards");
        menu.style.top = "";
        menu.style.bottom = `${button.offsetHeight + spacing}px`;
    } else {
        menu.classList.add("open-downwards");
        menu.classList.remove("open-upwards");
        menu.style.bottom = "";
        menu.style.top = `${button.offsetHeight + spacing}px`;
    }
}

function resetSourceMenuPosition() {
    if (!dom.sourceMenu) return;
    dom.sourceMenu.classList.remove("open-upwards", "open-downwards");
    dom.sourceMenu.style.top = "";
    dom.sourceMenu.style.left = "";
    dom.sourceMenu.style.bottom = "";
    dom.sourceMenu.style.minWidth = "";
    dom.sourceMenu.style.maxWidth = "";
    dom.sourceMenu.style.width = "";
}

function openSourceMenu() {
    if (!dom.sourceMenu || !dom.sourceSelectButton) return;
    state.sourceMenuOpen = true;
    ensureFloatingMenuListeners();
    buildSourceMenu();
    dom.sourceMenu.classList.add("show");
    dom.sourceSelectButton.classList.add("active");
    dom.sourceSelectButton.setAttribute("aria-expanded", "true");
    updateSourceMenuPosition();
    scheduleSourceMenuPositionUpdate();
}

function closeSourceMenu() {
    if (!dom.sourceMenu) return;
    dom.sourceMenu.classList.remove("show");
    dom.sourceSelectButton.classList.remove("active");
    dom.sourceSelectButton.setAttribute("aria-expanded", "false");
    state.sourceMenuOpen = false;
    cancelSourceMenuPositionUpdate();
    resetSourceMenuPosition();
    releaseFloatingMenuListenersIfIdle();
}

function toggleSourceMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    if (state.sourceMenuOpen) {
        closeSourceMenu();
    } else {
        openSourceMenu();
    }
}

function handleSourceSelection(event) {
    const option = event.target.closest(".source-option");
    if (!option) return;
    event.preventDefault();
    event.stopPropagation();
    const { source } = option.dataset;
    if (source) {
        selectSearchSource(source);
    }
}

function selectSearchSource(source) {
    const normalized = normalizeSource(source);
    if (normalized === state.searchSource) {
        closeSourceMenu();
        return;
    }
    state.searchSource = normalized;
    safeSetLocalStorage("searchSource", normalized);
    updateSourceLabel();
    buildSourceMenu();
    closeSourceMenu();
}

// 添加加载超时监控函数
function startLoadTimeoutMonitoring() {
    stopLoadTimeoutMonitoring();
    
    state.loadStartTime = Date.now();
    state.isWaitingForPlayback = true;
    
    // 设置15秒超时检测
    state.maxLoadTime = 10000; // 10秒
    state.loadTimeoutTimer = setTimeout(() => {
        checkLoadTimeout();
    }, state.maxLoadTime);
    
    debugLog(`开始加载超时监控: 最大等待时间=${state.maxLoadTime}ms`);
}

function stopLoadTimeoutMonitoring() {
    if (state.loadTimeoutTimer) {
        clearTimeout(state.loadTimeoutTimer);
        state.loadTimeoutTimer = null;
    }
    state.isWaitingForPlayback = false;
    debugLog("停止加载超时监控");
}

function checkLoadTimeout() {
    if (!state.currentSong || !state.isWaitingForPlayback) {
        return;
    }
    
    const currentTime = Date.now();
    const loadTime = currentTime - state.loadStartTime;
    
    debugLog(`加载超时检查: 已等待 ${loadTime}ms, 播放状态=${!dom.audioPlayer.paused}, 当前时间=${dom.audioPlayer.currentTime}`);
    
    // 如果5秒后还没有开始播放或者播放时间几乎为0，认为加载超时
    if (dom.audioPlayer.paused || (dom.audioPlayer.currentTime || 0) < 0.5) {
        handleLoadTimeout();
    } else {
        debugLog("加载成功，播放已开始");
    }
}

function handleLoadTimeout() {
    if (!state.currentSong || !state.isWaitingForPlayback) {
        return;
    }
    
    debugLog(`加载超时处理: 当前音质=${state.currentQualityAttempt}, 等待时间=${Date.now() - state.loadStartTime}ms`);
    
    // 尝试切换到更低音质
    const nextQuality = getNextLowerQuality(state.currentQualityAttempt);
    if (nextQuality) {
        state.currentQualityAttempt = nextQuality;
        const qualityInfo = QUALITY_LEVELS.find(q => q.value === nextQuality);
        debugLog(`加载超时，自动切换音质: ${state.currentQualityAttempt} -> ${nextQuality}`);
        showNotification(`加载超时，切换为 ${qualityInfo?.label || nextQuality}`, 'warning');
        
        // 使用新音质重新播放
        setTimeout(() => {
            replayCurrentSongDueToLoadTimeout();
        }, 500);
    } else {
        // 没有更低的音质可用，切换到下一首
        debugLog(`所有音质均加载超时，切换到下一首歌曲`);
        showNotification(`加载超时，自动切换下一首`, 'error');
        stopLoadTimeoutMonitoring();
        resetQualityState();
        playNext();
    }
}

function replayCurrentSongDueToLoadTimeout() {
    if (!state.currentSong) return;
    
    stopLoadTimeoutMonitoring();
    
    try {
        playSong(state.currentSong, {
            autoplay: true,
            startTime: 0, // 从头开始播放
            preserveProgress: false,
            isRetry: true
        });
    } catch (error) {
        console.error("重新播放失败:", error);
        handlePlaybackError(state.currentSong, error);
    }
}
// 添加播放状态监控函数
function startPlaybackMonitoring() {
    // 清除现有的监控
    stopPlaybackMonitoring();
    
    state.lastPlaybackTime = dom.audioPlayer.currentTime || 0;
    state.playbackStuckCount = 0;
    state.isPlaybackStuck = false;
    
    // 每2秒检查一次播放状态
    state.playbackStuckTimer = setInterval(() => {
        checkPlaybackProgress();
    }, 2000);
    
    debugLog("开始播放状态监控");
}

function stopPlaybackMonitoring() {
    if (state.playbackStuckTimer) {
        clearInterval(state.playbackStuckTimer);
        state.playbackStuckTimer = null;
    }
    state.isPlaybackStuck = false;
    debugLog("停止播放状态监控");
}

function checkPlaybackProgress() {
    if (!dom.audioPlayer.src || dom.audioPlayer.paused || dom.audioPlayer.ended) {
        return;
    }
    
    const currentTime = dom.audioPlayer.currentTime || 0;
    const timeDiff = currentTime - state.lastPlaybackTime;
    
    // 放宽卡住判断条件：5秒内进度变化小于0.2秒才认为是卡住
    if (timeDiff < 0.2 && currentTime > 0) {
        state.playbackStuckCount++;
        debugLog(`播放可能卡住: 进度变化=${timeDiff.toFixed(2)}秒, 卡住计数=${state.playbackStuckCount}`);
        
        // 增加到3次才触发处理
        if (state.playbackStuckCount >= 3 && !state.isPlaybackStuck) {
            handlePlaybackStuck();
        }
    } else {
        // 播放正常，重置计数
        if (state.playbackStuckCount > 0) {
            debugLog("播放恢复正常");
            state.playbackStuckCount = 0;
            state.isPlaybackStuck = false;
        }
    }
    
    state.lastPlaybackTime = currentTime;
}

function handlePlaybackStuck() {
    if (!state.currentSong || state.isPlaybackStuck) {
        return;
    }
    
    state.isPlaybackStuck = true;
    debugLog(`播放卡住处理: 当前音质=${state.currentQualityAttempt}, 当前音源=${state.currentSourceAttempt}, 卡住计数=${state.playbackStuckCount}`);
    
    // 直接触发播放错误处理，让音质和音源切换逻辑接管
    handlePlaybackError(state.currentSong, new Error('播放卡住'));
}

function replayCurrentSongWithNewQuality() {
    if (!state.currentSong) return;
    
    const wasPlaying = !dom.audioPlayer.paused;
    const targetTime = dom.audioPlayer.currentTime || state.currentPlaybackTime || 0;
    
    stopPlaybackMonitoring();
    
    try {
        playSong(state.currentSong, {
            autoplay: wasPlaying,
            startTime: targetTime,
            preserveProgress: true,
            isRetry: true
        });
    } catch (error) {
        console.error("重新播放失败:", error);
        handlePlaybackError(state.currentSong, error);
    }
}

function buildQualityMenu() {
    if (!dom.playerQualityMenu) return;
    const currentQuality = state.playbackQuality;
    const optionsHtml = QUALITY_LEVELS.map(option => {
        const isActive = option.value === currentQuality;
        return `
            <div class="player-quality-option${isActive ? " active" : ""}" data-quality="${option.value}">
                <span>${option.label}</span>
                <small>${option.description}</small>
                ${isActive ? '<i class="fas fa-check" aria-hidden="true"></i>' : ""}
            </div>
        `;
    }).join("");
    dom.playerQualityMenu.innerHTML = optionsHtml;
    if (state.qualityMenuOpen) {
        schedulePlayerQualityMenuPositionUpdate();
    }
}

function isElementNode(value) {
    return Boolean(value) && typeof value === "object" && value.nodeType === 1;
}

function resolveQualityAnchor(anchor) {
    if (isElementNode(anchor)) {
        return anchor;
    }
    if (isElementNode(dom.qualityToggle)) {
        return dom.qualityToggle;
    }
    if (isElementNode(dom.mobileQualityToggle)) {
        return dom.mobileQualityToggle;
    }
    return null;
}

function setQualityAnchorState(anchor, expanded) {
    if (!isElementNode(anchor)) {
        return;
    }
    anchor.classList.toggle("active", Boolean(expanded));
    if (typeof anchor.setAttribute === "function") {
        anchor.setAttribute("aria-expanded", expanded ? "true" : "false");
    }
}

function getQualityMenuAnchor() {
    if (isElementNode(qualityMenuAnchor) && (!document.body || document.body.contains(qualityMenuAnchor))) {
        return qualityMenuAnchor;
    }
    const fallback = resolveQualityAnchor();
    qualityMenuAnchor = fallback;
    return fallback;
}

// 修改 updateQualityLabel 函数，显示当前尝试的音质
function updateQualityLabel() {
    const currentQuality = state.currentQualityAttempt || state.playbackQuality;
    const option = QUALITY_LEVELS.find(item => item.value === currentQuality) || QUALITY_LEVELS[2];
    if (!option) return;
    
    dom.qualityLabel.textContent = option.label;
    dom.qualityToggle.title = `音质: ${option.label} (${option.description})`;
    if (dom.mobileQualityLabel) {
        dom.mobileQualityLabel.textContent = option.label;
    }
    if (dom.mobileQualityToggle) {
        dom.mobileQualityToggle.title = `音质: ${option.label} (${option.description})`;
    }
}

function togglePlayerQualityMenu(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const anchor = resolveQualityAnchor(event && event.currentTarget ? event.currentTarget : qualityMenuAnchor);
    if (!anchor) {
        return;
    }
    if (state.qualityMenuOpen && qualityMenuAnchor === anchor) {
        closePlayerQualityMenu();
    } else {
        openPlayerQualityMenu(anchor);
    }
}

function updatePlayerQualityMenuPosition() {
    if (!state.qualityMenuOpen || !dom.playerQualityMenu) return;

    const anchor = getQualityMenuAnchor();
    if (!isElementNode(anchor)) {
        return;
    }
    const menu = dom.playerQualityMenu;
    const toggleRect = anchor.getBoundingClientRect();
    const viewportWidth = Math.max(window.innerWidth || 0, document.documentElement.clientWidth || 0);
    const viewportHeight = Math.max(window.innerHeight || 0, document.documentElement.clientHeight || 0);
    const spacing = 10;

    menu.classList.add("floating");

    const targetWidth = Math.max(Math.round(toggleRect.width), 180);
    menu.style.minWidth = `${targetWidth}px`;
    menu.style.maxWidth = `${targetWidth}px`;
    menu.style.width = `${targetWidth}px`;
    menu.style.right = "auto";

    const menuRect = menu.getBoundingClientRect();
    const menuHeight = Math.round(menuRect.height);
    const menuWidth = Math.round(menuRect.width) || targetWidth;

    let top = Math.round(toggleRect.bottom + spacing);
    let openUpwards = false;
    if (top + menuHeight > viewportHeight - spacing) {
        const upwardTop = Math.round(toggleRect.top - spacing - menuHeight);
        if (upwardTop >= spacing) {
            top = upwardTop;
            openUpwards = true;
        } else {
            top = Math.max(spacing, viewportHeight - spacing - menuHeight);
        }
    }

    const isPortraitOrientation = (() => {
        if (typeof window.matchMedia === "function") {
            const portraitQuery = window.matchMedia("(orientation: portrait)");
            if (typeof portraitQuery.matches === "boolean") {
                return portraitQuery.matches;
            }
        }
        return viewportHeight >= viewportWidth;
    })();

    let left;
    if (isMobileView && isPortraitOrientation) {
        left = Math.round(toggleRect.left + (toggleRect.width - menuWidth) / 2);
    } else {
        left = Math.round(toggleRect.right - menuWidth);
    }

    const minLeft = spacing;
    const maxLeft = Math.max(minLeft, viewportWidth - spacing - menuWidth);
    left = Math.min(Math.max(left, minLeft), maxLeft);

    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
    menu.classList.toggle("open-upwards", openUpwards);
    menu.classList.toggle("open-downwards", !openUpwards);
}

function resetPlayerQualityMenuPosition() {
    if (!dom.playerQualityMenu) return;
    dom.playerQualityMenu.classList.remove("floating", "open-upwards", "open-downwards");
    dom.playerQualityMenu.style.top = "";
    dom.playerQualityMenu.style.left = "";
    dom.playerQualityMenu.style.right = "";
    dom.playerQualityMenu.style.minWidth = "";
    dom.playerQualityMenu.style.maxWidth = "";
    dom.playerQualityMenu.style.width = "";
}

function openPlayerQualityMenu(anchor) {
    if (!dom.playerQualityMenu) return;
    const targetAnchor = resolveQualityAnchor(anchor);
    if (!targetAnchor) {
        return;
    }
    if (qualityMenuAnchor && qualityMenuAnchor !== targetAnchor) {
        setQualityAnchorState(qualityMenuAnchor, false);
    }
    qualityMenuAnchor = targetAnchor;
    state.qualityMenuOpen = true;
    ensureFloatingMenuListeners();
    const menu = dom.playerQualityMenu;
    setQualityAnchorState(qualityMenuAnchor, true);
    menu.classList.add("floating");
    menu.classList.remove("show");

    runWithoutTransition(menu, () => {
        updatePlayerQualityMenuPosition();
    });

    requestAnimationFrame(() => {
        if (!state.qualityMenuOpen) return;
        menu.classList.add("show");
    });

    schedulePlayerQualityMenuPositionUpdate();
}

function closePlayerQualityMenu() {
    if (!dom.playerQualityMenu) return;
    const menu = dom.playerQualityMenu;
    const wasOpen = state.qualityMenuOpen || menu.classList.contains("show");

    if (!wasOpen) {
        resetPlayerQualityMenuPosition();
        setQualityAnchorState(qualityMenuAnchor, false);
        qualityMenuAnchor = null;
        releaseFloatingMenuListenersIfIdle();
        return;
    }

    const finalizeClose = () => {
        if (finalizeClose._timeout) {
            window.clearTimeout(finalizeClose._timeout);
            finalizeClose._timeout = null;
        }
        menu.removeEventListener("transitionend", handleTransitionEnd);
        if (state.qualityMenuOpen || menu.classList.contains("show")) {
            return;
        }
        resetPlayerQualityMenuPosition();
        releaseFloatingMenuListenersIfIdle();
    };

    const handleTransitionEnd = (event) => {
        if (event.target !== menu) {
            return;
        }
        if (event.propertyName && !["opacity", "transform"].includes(event.propertyName)) {
            return;
        }
        finalizeClose();
    };

    menu.addEventListener("transitionend", handleTransitionEnd);
    finalizeClose._timeout = window.setTimeout(finalizeClose, 250);

    menu.classList.remove("show");
    state.qualityMenuOpen = false;
    cancelPlayerQualityMenuPositionUpdate();
    setQualityAnchorState(qualityMenuAnchor, false);
    qualityMenuAnchor = null;
}

function handlePlayerQualitySelection(event) {
    const option = event.target.closest(".player-quality-option");
    if (!option) return;
    event.preventDefault();
    event.stopPropagation();
    const { quality } = option.dataset;
    if (quality) {
        selectPlaybackQuality(quality);
    }
}

async function selectPlaybackQuality(quality) {
    const normalized = normalizeQuality(quality);
    if (normalized === state.playbackQuality) {
        closePlayerQualityMenu();
        return;
    }

    state.playbackQuality = normalized;
    // 重置当前尝试音质
    state.currentQualityAttempt = normalized;
    state.qualityRetryCount = 0;
    
    updateQualityLabel();
    buildQualityMenu();
    savePlayerState();
    closePlayerQualityMenu();

    const option = QUALITY_LEVELS.find(item => item.value === normalized);
    if (option) {
        showNotification(`默认音质已设置为 ${option.label} (${option.description})`);
    }

    // 如果当前有歌曲在播放，使用新音质重新加载
    if (state.currentSong) {
        const success = await reloadCurrentSong();
        if (!success) {
            showNotification("切换音质失败，请稍后重试", "error");
        }
    }
}
async function reloadCurrentSong() {
    if (!state.currentSong) return true;
    const wasPlaying = !dom.audioPlayer.paused;
    const targetTime = dom.audioPlayer.currentTime || state.currentPlaybackTime || 0;
    
    // 重置音质状态
    resetQualityState();
    
    try {
        await playSong(state.currentSong, {
            autoplay: wasPlaying,
            startTime: targetTime,
            preserveProgress: true,
        });
        if (!wasPlaying) {
            dom.audioPlayer.pause();
            updatePlayPauseButton();
        }
        return true;
    } catch (error) {
        console.error("切换音质失败:", error);
        return false;
    }
}

async function restoreCurrentSongState() {
    if (!state.currentSong) return;
    try {
        await playSong(state.currentSong, {
            autoplay: false,
            startTime: state.currentPlaybackTime,
            preserveProgress: true,
        });
        dom.audioPlayer.pause();
        updatePlayPauseButton();
    } catch (error) {
        console.warn("恢复音频失败:", error);
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);
dom.audioPlayer.addEventListener("ended", autoPlayNext);

// ==== Media Session 相关函数 ====
function updateMediaMetadata() {
    if (!('mediaSession' in navigator)) return;
    
    const song = state.currentSong || {};
    const title = song.name || dom.currentSongTitle?.textContent || 'Solara';
    const artist = song.artist || dom.currentSongArtist?.textContent || '';
    const artworkUrl = state.currentArtworkUrl || '';

    try {
        navigator.mediaSession.metadata = new MediaMetadata({
            title,
            artist,
            album: song.album || '',
            artwork: getArtworkList(artworkUrl)
        });
    } catch (e) {
        // 某些旧 iOS 可能对 artwork 尺寸挑剔，失败时用最小配置重试
        try {
            navigator.mediaSession.metadata = new MediaMetadata({ title, artist });
        } catch (_) {}
    }
}

function updatePositionState() {
    // 基础检查：浏览器是否支持该 API
    if (!('mediaSession' in navigator) || typeof navigator.mediaSession.setPositionState !== 'function') return;
    
    const audio = dom.audioPlayer;
    if (!audio) return;

    // 1. 获取并验证时长 (Duration)
    // 注意：MediaSession API 要求 duration 必须是有限的正数 (duration > 0)
    // 如果歌曲正在加载 (NaN) 或时长为 0，不能调用 setPositionState，否则会抛出错误导致进度条失效
    const rawDuration = audio.duration;
    const duration = (Number.isFinite(rawDuration) && rawDuration > 0) ? rawDuration : 0;

    if (duration === 0) {
        // 如果时长无效，直接返回，不更新状态，避免报错
        return;
    }

    // 2. 获取并验证当前位置 (Position)
    let position = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;

    // 3. 关键修复：确保 position 永远不会超过 duration
    // 某些浏览器在播放结束瞬间 position 可能微小地超过 duration，导致 API 报错
    if (position > duration) {
        position = duration;
    }
    if (position < 0) {
        position = 0;
    }

    // 4. 获取播放速率
    const playbackRate = Number.isFinite(audio.playbackRate) ? audio.playbackRate : 1;

    try {
        // 更新锁屏/通知栏进度条
        navigator.mediaSession.setPositionState({
            duration: duration,
            playbackRate: playbackRate,
            position: position
        });
    } catch (error) {
        // 即使有防呆处理，某些极端情况仍可能报错，捕获但不中断流程
        console.warn('更新播放位置状态失败:', error);
    }
}

function getArtworkMime(url) {
    if (!url) {
        return 'image/png';
    }

    const normalized = url.split('?')[0].toLowerCase();
    if (normalized.endsWith('.jpg') || normalized.endsWith('.jpeg')) {
        return 'image/jpeg';
    }
    if (normalized.endsWith('.webp')) {
        return 'image/webp';
    }
    if (normalized.endsWith('.gif')) {
        return 'image/gif';
    }
    if (normalized.endsWith('.bmp')) {
        return 'image/bmp';
    }
    if (normalized.endsWith('.svg')) {
        return 'image/svg+xml';
    }
    return 'image/png';
}

function getArtworkList(url) {
    const src = (typeof preferHttpsUrl === 'function') ? preferHttpsUrl(url) : (url || '');
    const fallback = '/favicon.png';
    const baseSrc = src || fallback;
    const base = toAbsoluteUrl(baseSrc);
    const type = getArtworkMime(base);
    return [
        { src: base, sizes: '1024x1024', type },
        { src: base, sizes: '640x640', type },
        { src: base, sizes: '512x512', type },
        { src: base, sizes: '384x384', type },
        { src: base, sizes: '256x256', type },
        { src: base, sizes: '192x192', type },
        { src: base, sizes: '128x128', type },
        { src: base, sizes: '96x96',  type }
    ];
}

// 确保全局函数可用
if (typeof window.__SOLARA_UPDATE_MEDIA_METADATA !== 'function') {
    window.__SOLARA_UPDATE_MEDIA_METADATA = updateMediaMetadata;
}

function setupInteractions() {
    function ensureQualityMenuPortal() {
        if (!dom.playerQualityMenu || !document.body || !isMobileView) {
            return;
        }
        const currentParent = dom.playerQualityMenu.parentElement;
        if (!currentParent || currentParent === document.body) {
            return;
        }
        currentParent.removeChild(dom.playerQualityMenu);
        document.body.appendChild(dom.playerQualityMenu);
    }

    function initializePlaylistEventHandlers() {
        if (!dom.playlistItems) {
            return;
        }

        const activatePlaylistItem = (index) => {
            if (typeof index !== "number" || Number.isNaN(index)) {
                return;
            }
            playPlaylistSong(index);
        };

        const handlePlaylistAction = (event, actionButton) => {
            const index = Number(actionButton.dataset.index);
            if (Number.isNaN(index)) {
                return;
            }

            const action = actionButton.dataset.playlistAction;
            if (action === "remove") {
                event.preventDefault();
                event.stopPropagation();
                removeFromPlaylist(index);
            } else if (action === "download") {
                event.preventDefault();
                event.stopPropagation();
                showQualityMenu(event, index, "playlist");
            }
        };

        const handleClick = (event) => {
            const actionButton = event.target.closest("[data-playlist-action]");
            if (actionButton) {
                handlePlaylistAction(event, actionButton);
                return;
            }
            const item = event.target.closest(".playlist-item");
            if (!item || !dom.playlistItems.contains(item)) {
                return;
            }

            const index = Number(item.dataset.index);
            if (Number.isNaN(index)) {
                return;
            }

            activatePlaylistItem(index);
        };

        const handleKeydown = (event) => {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }
            if (event.target.closest("[data-playlist-action]")) {
                return;
            }
            const item = event.target.closest(".playlist-item");
            if (!item || !dom.playlistItems.contains(item)) {
                return;
            }
            const index = Number(item.dataset.index);
            if (Number.isNaN(index)) {
                return;
            }
            event.preventDefault();
            activatePlaylistItem(index);
        };

        dom.playlistItems.addEventListener("click", handleClick);
        dom.playlistItems.addEventListener("keydown", handleKeydown);
    }

    function applyTheme(isDark) {
        if (!state.themeDefaultsCaptured) {
            captureThemeDefaults();
        }
        document.body.classList.toggle("dark-mode", isDark);
        dom.themeToggleButton.classList.toggle("is-dark", isDark);
        const label = isDark ? "切换为浅色模式" : "切换为深色模式";
        dom.themeToggleButton.setAttribute("aria-label", label);
        dom.themeToggleButton.setAttribute("title", label);
        applyDynamicGradient();
    }

    captureThemeDefaults();
    const savedTheme = safeGetLocalStorage("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialIsDark = savedTheme ? savedTheme === "dark" : prefersDark;
    applyTheme(initialIsDark);

    dom.themeToggleButton.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-mode");
        applyTheme(isDark);
        safeSetLocalStorage("theme", isDark ? "dark" : "light");
    });

    dom.audioPlayer.volume = state.volume;
    dom.volumeSlider.value = state.volume;
    // 添加音频事件监听
    dom.audioPlayer.addEventListener('error', (e) => {
        console.error('音频播放错误:', e);
        stopPlaybackMonitoring();
        stopLoadTimeoutMonitoring();
        
        // 更新 Media Session 状态为暂停
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'paused';
            updatePositionState();
        }
        
        if (state.currentSong && !state.isAutoQualitySwitching) {
            handlePlaybackError(state.currentSong, new Error('音频播放错误'));
        }
    });

    dom.audioPlayer.addEventListener('loaderror', (e) => {
        console.error('音频加载错误:', e);
        stopPlaybackMonitoring();
        stopLoadTimeoutMonitoring();
        
        // 更新 Media Session 状态为暂停
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'paused';
            updatePositionState();
        }
        
        if (state.currentSong && !state.isAutoQualitySwitching) {
            handlePlaybackError(state.currentSong, new Error('音频加载错误'));
        }
    });

    dom.audioPlayer.addEventListener('pause', () => {
        debugLog("音频暂停事件触发");
        stopPlaybackMonitoring();
        stopLoadTimeoutMonitoring();
        updatePlayPauseButton();
        
        // 更新 Media Session 状态为暂停
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'paused';
            updatePositionState();
        }
    });

    dom.audioPlayer.addEventListener('ended', () => {
        debugLog("音频播放结束事件触发");
        stopPlaybackMonitoring();
        stopLoadTimeoutMonitoring();
        
        // 更新 Media Session 状态为暂停（播放结束）
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'paused';
            updatePositionState();
        }
        
        // 移除 Media Session 标记检查，直接处理自动播放
        debugLog("开始处理自动播放下一首");
        autoPlayNext();
    });

    dom.audioPlayer.addEventListener('seeked', () => {
        // 跳转后重置播放状态监控
        state.lastPlaybackTime = dom.audioPlayer.currentTime || 0;
        state.playbackStuckCount = 0;
        
        // 更新 Media Session 进度状态
        if ('mediaSession' in navigator) {
            updatePositionState();
        }
        
        debugLog(`跳转完成，重置播放监控状态，当前时间: ${state.lastPlaybackTime}`);
    });

    // 添加缺失的音频事件监听
    dom.audioPlayer.addEventListener('play', () => {
        debugLog("音频开始播放事件触发");
        // 开始播放监控
        startPlaybackMonitoring();
        updatePlayPauseButton();
        
        // 更新 Media Session 状态为播放中
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'playing';
            updatePositionState();
        }
    });

    // 添加播放进度事件监听，用于检测播放开始
    dom.audioPlayer.addEventListener('timeupdate', () => {
        // 如果正在等待播放开始，并且有播放进度，停止加载超时监控
        if (state.isWaitingForPlayback && dom.audioPlayer.currentTime > 0.5) {
            debugLog("检测到播放开始，停止加载超时监控");
            stopLoadTimeoutMonitoring();
        }
        
        // 定期更新 Media Session 进度状态（timeupdate 事件已经节流，不会太频繁）
        if ('mediaSession' in navigator) {
            updatePositionState();
        }
    });

    // 添加 loadedmetadata 事件监听，确保音频元数据加载后更新 Media Session
    dom.audioPlayer.addEventListener('loadedmetadata', () => {
        debugLog("音频元数据加载完成");
        
        // 更新 Media Session 进度状态
        if ('mediaSession' in navigator) {
            updatePositionState();
        }
    });

    // 添加 durationchange 事件监听
    dom.audioPlayer.addEventListener('durationchange', () => {
        // 更新 Media Session 进度状态
        if ('mediaSession' in navigator) {
            updatePositionState();
        }
    });

    // 添加 ratechange 事件监听
    dom.audioPlayer.addEventListener('ratechange', () => {
        // 更新 Media Session 进度状态
        if ('mediaSession' in navigator) {
            updatePositionState();
        }
    });

    // 添加加载进度事件监听
    dom.audioPlayer.addEventListener('progress', () => {
        // 如果有加载进度，但播放还没开始，可以考虑延长超时时间或提供反馈
        if (state.isWaitingForPlayback) {
            const buffered = dom.audioPlayer.buffered;
            if (buffered.length > 0) {
                const bufferedEnd = buffered.end(buffered.length - 1);
                debugLog(`加载进度: 已缓冲 ${bufferedEnd.toFixed(2)} 秒`);
            }
        }
    });

    updateVolumeSliderBackground(state.volume);
    updateVolumeIcon(state.volume);


    buildSourceMenu();
    updateSourceLabel();
    buildQualityMenu();
    ensureQualityMenuPortal();
    initializePlaylistEventHandlers();
    updateQualityLabel();
    updatePlayPauseButton();
    dom.currentTimeDisplay.textContent = formatTime(state.currentPlaybackTime);
    updateProgressBarBackground(0, Number(dom.progressBar.max));

    dom.playPauseBtn.addEventListener("click", togglePlayPause);
    dom.audioPlayer.addEventListener("timeupdate", handleTimeUpdate);
    dom.audioPlayer.addEventListener("loadedmetadata", handleLoadedMetadata);
    dom.audioPlayer.addEventListener("play", updatePlayPauseButton);
    dom.audioPlayer.addEventListener("pause", updatePlayPauseButton);
    dom.audioPlayer.addEventListener("volumechange", onAudioVolumeChange);

    dom.progressBar.addEventListener("input", handleProgressInput);
    dom.progressBar.addEventListener("change", handleProgressChange);
    dom.progressBar.addEventListener("pointerup", handleProgressChange);

    dom.volumeSlider.addEventListener("input", handleVolumeChange);

    if (dom.sourceSelectButton && dom.sourceMenu) {
        dom.sourceSelectButton.addEventListener("click", toggleSourceMenu);
        dom.sourceMenu.addEventListener("click", handleSourceSelection);
    }
    dom.qualityToggle.addEventListener("click", togglePlayerQualityMenu);
    if (dom.mobileQualityToggle) {
        dom.mobileQualityToggle.addEventListener("click", togglePlayerQualityMenu);
    }
    setQualityAnchorState(dom.qualityToggle, false);
    if (dom.mobileQualityToggle) {
        setQualityAnchorState(dom.mobileQualityToggle, false);
    }
    dom.playerQualityMenu.addEventListener("click", handlePlayerQualitySelection);

    if (isMobileView && dom.albumCover) {
        dom.albumCover.addEventListener("click", () => {
            toggleMobileInlineLyrics();
        });
    }

    // [新增] 强制音频元素不发送 Referrer，解决 403 Forbidden 问题
    if (dom.audioPlayer) {
        dom.audioPlayer.setAttribute('referrerpolicy', 'no-referrer');
        dom.audioPlayer.crossOrigin = "anonymous"; // 尝试跨域支持
    }
    // 在 setupInteractions 函数中添加面板关闭按钮的事件处理
    if (dom.mobilePanelClose) {
        dom.mobilePanelClose.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            debugLog("面板关闭按钮被点击");
            closeMobilePanel();
        });
    }

    // 添加遮罩层点击关闭
    if (dom.mobileOverlayScrim) {
        dom.mobileOverlayScrim.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            debugLog("遮罩层被点击，关闭所有面板");
            closeAllMobileOverlays();
        });
    }

    if (isMobileView && dom.mobileInlineLyrics) {
        dom.mobileInlineLyrics.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!state.isMobileInlineLyricsOpen) {
                return;
            }
            closeMobileInlineLyrics();
        });
    }

    dom.loadOnlineBtn.addEventListener("click", exploreOnlineMusic);
    if (dom.mobileExploreButton) {
        dom.mobileExploreButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            closeAllMobileOverlays();
            exploreOnlineMusic();
        });
    }

    if (dom.importPlaylistBtn && dom.importPlaylistInput) {
        dom.importPlaylistBtn.addEventListener("click", () => {
            dom.importPlaylistInput.value = "";
            dom.importPlaylistInput.click();
        });
        dom.importPlaylistInput.addEventListener("change", handleImportPlaylistChange);
    }

    if (dom.exportPlaylistBtn) {
        dom.exportPlaylistBtn.addEventListener("click", exportPlaylist);
    }

    if (dom.mobileImportPlaylistBtn && dom.importPlaylistInput) {
        dom.mobileImportPlaylistBtn.addEventListener("click", () => {
            dom.importPlaylistInput.value = "";
            dom.importPlaylistInput.click();
        });
    }

    if (dom.mobileExportPlaylistBtn) {
        dom.mobileExportPlaylistBtn.addEventListener("click", exportPlaylist);
    }

    // 新增辅助函数：检查移动端面板状态
function getMobilePanelState() {
    if (!isMobileView || !document.body) {
        return { isOpen: false, currentView: null };
    }
    
    // 直接从 DOM 状态读取，确保与实际显示一致
    const isOpen = document.body.classList.contains("mobile-panel-open");
    const currentView = document.body.getAttribute("data-mobile-panel-view");
    
    // 同时更新内部状态保持同步
    mobilePanelState.isOpen = isOpen;
    mobilePanelState.currentView = currentView;
    
    return { isOpen, currentView };
}


// 使用新函数简化播放列表按钮逻辑
if (dom.showPlaylistBtn) {
    dom.showPlaylistBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        debugLog("播放列表按钮被点击");
        if (isMobileView) {
            // 直接从DOM读取当前状态，确保与UI一致
            const isPanelOpen = document.body.classList.contains("mobile-panel-open");
            const currentView = document.body.getAttribute("data-mobile-panel-view");
            debugLog(`DOM状态检查: panelOpen=${isPanelOpen}, currentView=${currentView}`);
            
            // 如果面板已打开且当前是播放列表视图，则关闭
            if (isPanelOpen && currentView === "playlist") {
                debugLog("播放列表面板已打开，执行关闭");
                closeMobilePanel();
            } 
            // 如果面板已打开但当前是其他视图（如歌词），则切换到播放列表
            else if (isPanelOpen && currentView !== "playlist") {
                debugLog("面板已打开但视图不是播放列表，切换到播放列表");
                openMobilePanel("playlist");
            } 
            // 面板未打开，打开播放列表
            else {
                debugLog("面板未打开，打开播放列表");
                openMobilePanel("playlist");
            }
        } else {
            // 桌面端逻辑
            switchMobileView("playlist");
            setTimeout(() => {
                scrollToCurrentPlaylistItem();
            }, 100);
        }
    });
}

if (dom.showLyricsBtn) {
    dom.showLyricsBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        debugLog("歌词按钮被点击");
        
        if (isMobileView) {
            // 使用新的状态管理
            if (mobilePanelState.isOpen && mobilePanelState.currentView === "lyrics") {
                debugLog("歌词面板已打开，执行关闭");
                closeMobilePanel();
            } else {
                debugLog("歌词面板未打开，执行打开");
                openMobilePanel("lyrics");
            }
        } else {
            // 桌面端逻辑
            switchMobileView("lyrics");
        }
    });
}

    // 播放模式按钮事件
    updatePlayModeUI();
    dom.playModeBtn.addEventListener("click", togglePlayMode);

    // 搜索相关事件 - 修复搜索下拉框显示问题
    dom.searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        debugLog("搜索按钮被点击");
        performSearch();
    });

    dom.searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            debugLog("搜索输入框回车键被按下");
            performSearch();
        }
    });

    updateImportSelectedButton();
    if (dom.importSelectedBtn) {
        dom.importSelectedBtn.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            importSelectedSearchResults();
        });
    }

    // 修复：点击搜索区域外部时隐藏搜索结果
    document.addEventListener("click", (e) => {
        const searchArea = document.querySelector(".search-area");
        if (searchArea && !searchArea.contains(e.target) && state.isSearchMode) {
            debugLog("点击搜索区域外部，隐藏搜索结果");
            hideSearchResults();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && state.sourceMenuOpen) {
            closeSourceMenu();
        }
        if (isMobileView && e.key === "Escape") {
            closeAllMobileOverlays();
        }
    });

    // 搜索结果相关事件处理 - 修复加载更多按钮点击问题
    document.addEventListener("click", (e) => {
        const qualityMenus = document.querySelectorAll(".quality-menu");
        qualityMenus.forEach(menu => {
            if (!menu.contains(e.target) &&
                !e.target.closest(".playlist-item-download")) {
                menu.classList.remove("show");
                const parentItem = menu.closest(".search-result-item");
                if (parentItem) parentItem.classList.remove("menu-active");
            }
        });

        if (state.qualityMenuOpen &&
            dom.playerQualityMenu &&
            !dom.playerQualityMenu.contains(e.target)) {
            const anchor = isElementNode(qualityMenuAnchor) ? qualityMenuAnchor : resolveQualityAnchor();
            if (anchor && anchor.contains(e.target)) {
                return;
            }
            closePlayerQualityMenu();
        }

        if (state.sourceMenuOpen &&
            dom.sourceMenu &&
            dom.sourceSelectButton &&
            !dom.sourceMenu.contains(e.target) &&
            !dom.sourceSelectButton.contains(e.target)) {
            closeSourceMenu();
        }
    });

    // 修复：使用更强健的事件委托处理加载更多按钮点击
    dom.searchResults.addEventListener("click", (e) => {
        debugLog(`点击事件触发: ${e.target.tagName} ${e.target.className} ${e.target.id}`);

        // 检查多种可能的目标元素
        const loadMoreBtn = e.target.closest(".load-more-btn") || 
                           e.target.closest("#loadMoreBtn") ||
                           (e.target.id === "loadMoreBtn" ? e.target : null) ||
                           (e.target.classList.contains("load-more-btn") ? e.target : null);

        if (loadMoreBtn) {
            debugLog("检测到加载更多按钮点击");
            e.preventDefault();
            e.stopPropagation();
            loadMoreResults();
        }
    });

    // 额外的直接事件监听器作为备用
    document.addEventListener("click", (e) => {
        if (e.target.id === "loadMoreBtn" || e.target.closest("#loadMoreBtn")) {
            debugLog("备用事件监听器触发");
            e.preventDefault();
            e.stopPropagation();
            loadMoreResults();
        }
    });

    // 新增：歌词滚动监听
    const attachLyricScrollHandler = (scrollElement, getCurrentElement) => {
        if (!scrollElement) {
            return;
        }
        scrollElement.addEventListener("scroll", () => {
            state.userScrolledLyrics = true;
            clearTimeout(state.lyricsScrollTimeout);
            state.lyricsScrollTimeout = setTimeout(() => {
                state.userScrolledLyrics = false;
                const currentLyricElement = typeof getCurrentElement === "function"
                    ? getCurrentElement()
                    : dom.lyricsContent?.querySelector(".current");
                if (currentLyricElement) {
                    scrollToCurrentLyric(currentLyricElement, scrollElement);
                }
            }, 3000);
        }, { passive: true });
    };

    attachLyricScrollHandler(dom.lyricsScroll, () => dom.lyricsContent?.querySelector(".current"));
    attachLyricScrollHandler(dom.mobileInlineLyricsScroll, () => dom.mobileInlineLyricsContent?.querySelector(".current"));

    updatePlaylistActionStates();

    if (state.playlistSongs.length > 0) {
        let restoredIndex = state.currentTrackIndex;
        if (restoredIndex < 0 || restoredIndex >= state.playlistSongs.length) {
            restoredIndex = 0;
        }

        state.currentTrackIndex = restoredIndex;
        state.currentPlaylist = "playlist";
        renderPlaylist();

        const restoredSong = state.playlistSongs[restoredIndex];
        if (restoredSong) {
            state.currentSong = restoredSong;
            updatePlaylistHighlight();
            updateCurrentSongInfo(restoredSong).catch(error => {
                console.error("恢复歌曲信息失败:", error);
            });
        }

        savePlayerState();
        
        // 添加播放列表滚动监听器
        if (isMobileView && dom.playlist) {
            const playlistScroll = dom.playlist.querySelector('.playlist-scroll');
            if (playlistScroll) {
                playlistScroll.addEventListener('scroll', () => {
                    // 用户手动滚动时，暂时禁用自动滚动
                    state.userScrolledPlaylist = true;
                    clearTimeout(state.playlistScrollTimeout);
                    state.playlistScrollTimeout = setTimeout(() => {
                        state.userScrolledPlaylist = false;
                    }, 5000);
                }, { passive: true });
            }
        }
    } else {
        dom.playlist.classList.add("empty");
        if (dom.playlistItems) {
            dom.playlistItems.innerHTML = "";
        }
        updateMobileClearPlaylistVisibility();
    }

    if (state.currentSong) {
        restoreCurrentSongState();
    }

    if (isMobileView) {
        initializeMobileUI();
        updateMobileClearPlaylistVisibility();
    }
}

// 修复：更新当前歌曲信息和封面
function updateCurrentSongInfo(song, options = {}) {
    const { loadArtwork = true } = options;
    state.currentSong = song;
    dom.currentSongTitle.textContent = song.name;
    updateMobileToolbarTitle();

    // 修复艺人名称显示问题 - 使用正确的字段名
    const artistText = Array.isArray(song.artist) ? song.artist.join(', ') : (song.artist || '未知艺术家');
    dom.currentSongArtist.textContent = artistText;

    cancelDeferredPaletteUpdate();

    if (!loadArtwork) {
        dom.albumCover.classList.add("loading");
        dom.albumCover.innerHTML = PLACEHOLDER_HTML;
        state.currentArtworkUrl = null;
        return Promise.resolve();
    }

    // 加载封面
    if (song.pic_id) {
        cancelDeferredPaletteUpdate();
        dom.albumCover.classList.add("loading");
        const picUrl = API.getPicUrl(song);

        API.fetchJson(picUrl)
            .then(data => {
                if (!data || !data.url) {
                    throw new Error("封面地址缺失");
                }

                const img = new Image();
                const imageUrl = preferHttpsUrl(data.url);
                const absoluteImageUrl = toAbsoluteUrl(imageUrl);
                if (state.currentSong === song) {
                    state.currentArtworkUrl = absoluteImageUrl;
                    if (typeof window.__SOLARA_UPDATE_MEDIA_METADATA === 'function') {
                        window.__SOLARA_UPDATE_MEDIA_METADATA();
                    }
                }
                img.crossOrigin = "anonymous";
                img.onload = () => {
                    if (state.currentSong !== song) {
                        return;
                    }
                    setAlbumCoverImage(imageUrl);
                    const shouldApplyImmediately = paletteCache.has(imageUrl) ||
                        (state.currentPaletteImage === imageUrl && state.dynamicPalette);
                    scheduleDeferredPaletteUpdate(imageUrl, { immediate: shouldApplyImmediately });
                };
                img.onerror = () => {
                    if (state.currentSong !== song) {
                        return;
                    }
                    cancelDeferredPaletteUpdate();
                    showAlbumCoverPlaceholder();
                };
                img.src = imageUrl;
            })
            .catch(error => {
                console.error("加载封面失败:", error);
                if (state.currentSong === song) {
                    cancelDeferredPaletteUpdate();
                    showAlbumCoverPlaceholder();
                }
            });
    } else {
        cancelDeferredPaletteUpdate();
        showAlbumCoverPlaceholder();
    }

    return Promise.resolve();
}

// 搜索功能 - 修复搜索下拉框显示问题
async function performSearch(isLiveSearch = false) {
    const query = dom.searchInput.value.trim();
    if (!query) {
        showNotification("请输入搜索关键词", "error");
        return;
    }

    if (state.sourceMenuOpen) {
        closeSourceMenu();
    }

    const source = normalizeSource(state.searchSource);
    state.searchSource = source;
    safeSetLocalStorage("searchSource", source);
    updateSourceLabel();
    buildSourceMenu();

    // 重置搜索状态
    if (!isLiveSearch) {
        state.searchPage = 1;
        state.searchKeyword = query;
        state.searchSource = source;
        state.searchResults = [];
        state.hasMoreResults = true;
        state.renderedSearchCount = 0;
        resetSelectedSearchResults();
        const listContainer = dom.searchResultsList || dom.searchResults;
        if (listContainer) {
            listContainer.innerHTML = "";
        }
        debugLog(`开始新搜索: ${query}, 来源: ${source}`);
    } else {
        state.searchKeyword = query;
        state.searchSource = source;
    }

    try {
        // 禁用搜索按钮并显示加载状态
        dom.searchBtn.disabled = true;
        dom.searchBtn.innerHTML = '<span class="loader"></span><span>搜索中...</span>';

        // 立即显示搜索模式
        showSearchResults();
        debugLog("已切换到搜索模式");

        // 执行搜索
        const results = await API.search(query, source, SEARCH_PAGE_SIZE, state.searchPage);
        debugLog(`API返回结果数量: ${results.length}`);

        if (state.searchPage === 1) {
            state.searchResults = results;
        } else {
            state.searchResults = [...state.searchResults, ...results];
        }

        state.hasMoreResults = results.length === 50;

        // 显示搜索结果
        displaySearchResults(results, {
            reset: state.searchPage === 1,
            totalCount: state.searchResults.length,
        });
        debugLog(`搜索完成: 总共显示 ${state.searchResults.length} 个结果`);

        // 如果没有结果，显示提示
        if (state.searchResults.length === 0) {
            showNotification("未找到相关歌曲", "error");
        }

    } catch (error) {
        console.error("搜索失败:", error);
        showNotification("搜索失败，请稍后重试", "error");
        hideSearchResults();
        debugLog(`搜索失败: ${error.message}`);
    } finally {
        // 恢复搜索按钮状态
        dom.searchBtn.disabled = false;
        dom.searchBtn.innerHTML = '<i class="fas fa-search"></i><span>搜索</span>';
    }
}

// 加载更多搜索结果
async function loadMoreResults() {
    if (!state.hasMoreResults || !state.searchKeyword) {
        debugLog("没有更多结果或搜索关键词为空");
        return;
    }

    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (!loadMoreBtn) {
        debugLog("找不到加载更多按钮");
        return;
    }

    try {
        loadMoreBtn.disabled = true;
        loadMoreBtn.innerHTML = '<span class="loader"></span><span>加载中...</span>';

         state.searchPage++;
        debugLog(`加载第 ${state.searchPage} 页结果`);

        const source = normalizeSource(state.searchSource);
        state.searchSource = source;
        safeSetLocalStorage("searchSource", source);
        const results = await API.search(state.searchKeyword, source, SEARCH_PAGE_SIZE, state.searchPage);

        if (results.length > 0) {
            state.searchResults = [...state.searchResults, ...results];
            state.hasMoreResults = results.length === 50;
            displaySearchResults(results, {
                totalCount: state.searchResults.length,
            });
            debugLog(`加载完成: 新增 ${results.length} 个结果`);
        } else {
            state.hasMoreResults = false;
            showNotification("没有更多结果了");
            debugLog("没有更多结果");
        }
    } catch (error) {
        console.error("加载更多失败:", error);
        showNotification("加载失败，请稍后重试", "error");
        state.searchPage--; // 回退页码
    } finally {
        if (loadMoreBtn) {
            loadMoreBtn.disabled = false;
            loadMoreBtn.innerHTML = "<i class=\"fas fa-plus\"></i><span>加载更多</span>";
        }
    }
}

function createSearchResultItem(song, index) {
    const item = document.createElement("div");
    item.className = "search-result-item";
    item.dataset.index = String(index);

    const selectionToggle = document.createElement("button");
    selectionToggle.className = "search-result-select";
    selectionToggle.type = "button";
    selectionToggle.innerHTML = '<i class="fas fa-check"></i>';
    selectionToggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleSearchResultSelection(index);
    });

    const info = document.createElement("div");
    info.className = "search-result-info";

    const title = document.createElement("div");
    title.className = "search-result-title";
    title.textContent = song.name || "未知歌曲";

    const artist = document.createElement("div");
    artist.className = "search-result-artist";
    const artistName = Array.isArray(song.artist)
        ? song.artist.join(', ')
        : (song.artist || "未知艺术家");
    const albumText = song.album ? ` - ${song.album}` : "";
    artist.textContent = `${artistName}${albumText}`;

    info.appendChild(title);
    info.appendChild(artist);

    const actions = document.createElement("div");
    actions.className = "search-result-actions";

    const playButton = document.createElement("button");
    playButton.className = "action-btn play";
    playButton.type = "button";
    playButton.title = "播放";
    playButton.innerHTML = '<i class="fas fa-play"></i> 播放';
    playButton.addEventListener("click", (event) => {
        event.stopPropagation();
        playSearchResult(index);
    });

    const downloadButton = document.createElement("button");
    downloadButton.className = "action-btn download";
    downloadButton.type = "button";
    downloadButton.title = "下载";
    downloadButton.innerHTML = '<i class="fas fa-download"></i>';
    downloadButton.addEventListener("click", (event) => {
        event.stopPropagation();
        showQualityMenu(event, index, "search");
    });

    const qualityMenu = document.createElement("div");
    qualityMenu.className = "quality-menu";

    const qualityOptions = [
        { label: "标准音质", suffix: " (128k)", quality: "128" },
        { label: "高音质", suffix: " (192k)", quality: "192" },
        { label: "超高音质", suffix: " (320k)", quality: "320" },
        { label: "无损音质", suffix: "", quality: "999" },
    ];

    qualityOptions.forEach(option => {
        const qualityItem = document.createElement("div");
        qualityItem.className = "quality-option";
        qualityItem.textContent = `${option.label}${option.suffix}`;
        qualityItem.addEventListener("click", (event) => {
            downloadWithQuality(event, index, "search", option.quality);
        });
        qualityMenu.appendChild(qualityItem);
    });

    downloadButton.appendChild(qualityMenu);

    actions.appendChild(playButton);
    actions.appendChild(downloadButton);

    item.appendChild(selectionToggle);
    item.appendChild(info);
    item.appendChild(actions);

    applySelectionStateToElement(item, state.selectedSearchResults.has(index));

    item.addEventListener("click", (event) => {
        if (event.target.closest(".search-result-actions")) {
            return;
        }
        if (event.target.closest(".search-result-select")) {
            return;
        }
        toggleSearchResultSelection(index);
    });

    return item;
}

function ensureSelectedSearchResultsSet() {
    if (!(state.selectedSearchResults instanceof Set)) {
        state.selectedSearchResults = new Set();
    }
}

function applySelectionStateToElement(item, isSelected) {
    if (!item) {
        return;
    }
    item.classList.toggle("selected", Boolean(isSelected));
    const toggle = item.querySelector(".search-result-select");
    if (toggle) {
        toggle.setAttribute("aria-pressed", isSelected ? "true" : "false");
        toggle.setAttribute("aria-label", isSelected ? "取消选择" : "选择歌曲");
    }
}

function updateSearchResultSelectionUI(index) {
    const container = dom.searchResultsList || dom.searchResults;
    if (!container) {
        return;
    }
    const numericIndex = Number(index);
    const item = container.querySelector(`.search-result-item[data-index="${numericIndex}"]`);
    ensureSelectedSearchResultsSet();
    applySelectionStateToElement(item, state.selectedSearchResults.has(numericIndex));
}

function updateImportSelectedButton() {
    const button = dom.importSelectedBtn;
    if (!button) {
        return;
    }
    ensureSelectedSearchResultsSet();
    const count = state.selectedSearchResults.size;
    button.disabled = count === 0;
    button.setAttribute("aria-disabled", count === 0 ? "true" : "false");
    const countLabel = dom.importSelectedCount;
    if (countLabel) {
        countLabel.textContent = count > 0 ? `(${count})` : "";
    }
    const label = count > 0 ? `导入已选 (${count})` : "导入已选";
    button.title = label;
    button.setAttribute("aria-label", count > 0 ? `导入已选 ${count} 首歌曲` : "导入已选");
}

function toggleSearchResultSelection(index) {
    const numericIndex = Number(index);
    if (!Number.isInteger(numericIndex) || numericIndex < 0) {
        return;
    }
    ensureSelectedSearchResultsSet();
    if (state.selectedSearchResults.has(numericIndex)) {
        state.selectedSearchResults.delete(numericIndex);
    } else {
        state.selectedSearchResults.add(numericIndex);
    }
    updateSearchResultSelectionUI(numericIndex);
    updateImportSelectedButton();
}

function resetSelectedSearchResults() {
    ensureSelectedSearchResultsSet();
    if (state.selectedSearchResults.size === 0) {
        updateImportSelectedButton();
        return;
    }
    const indices = Array.from(state.selectedSearchResults);
    state.selectedSearchResults.clear();
    indices.forEach(updateSearchResultSelectionUI);
    updateImportSelectedButton();
}

function importSelectedSearchResults() {
    ensureSelectedSearchResultsSet();
    if (state.selectedSearchResults.size === 0) {
        return;
    }

    const indices = Array.from(state.selectedSearchResults).filter((value) => Number.isInteger(value) && value >= 0);
    if (indices.length === 0) {
        resetSelectedSearchResults();
        return;
    }

    const songsToAdd = indices
        .map((index) => state.searchResults[index])
        .filter((song) => song && typeof song === "object");

    if (songsToAdd.length === 0) {
        resetSelectedSearchResults();
        showNotification("未找到可导入的歌曲", "warning");
        return;
    }

    if (!Array.isArray(state.playlistSongs)) {
        state.playlistSongs = [];
    }

    const existingKeys = new Set(
        state.playlistSongs
            .map(getSongKey)
            .filter((key) => typeof key === "string" && key !== "")
    );

    let added = 0;
    let duplicates = 0;

    songsToAdd.forEach((song) => {
        const key = getSongKey(song);
        if (key && existingKeys.has(key)) {
            duplicates++;
            return;
        }
        state.playlistSongs.push(song);
        if (key) {
            existingKeys.add(key);
        }
        added++;
    });

    const processedIndices = [...indices];
    state.selectedSearchResults.clear();
    processedIndices.forEach(updateSearchResultSelectionUI);
    updateImportSelectedButton();

    if (added > 0) {
        renderPlaylist();
        const duplicateHint = duplicates > 0 ? `，${duplicates} 首已存在` : "";
        showNotification(`成功导入 ${added} 首歌曲${duplicateHint}`, "success");
    } else {
        updatePlaylistActionStates();
        showNotification("选中的歌曲已在播放列表中", "warning");
    }
}

function createLoadMoreButton() {
    const button = document.createElement("button");
    button.id = "loadMoreBtn";
    button.className = "load-more-btn";
    button.type = "button";
    button.innerHTML = '<i class="fas fa-plus"></i><span>加载更多</span>';
    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        loadMoreResults();
    });
    return button;
}

function displaySearchResults(newItems, options = {}) {
    dom.playlist.classList.remove("empty");
    const container = dom.searchResultsList || dom.searchResults;
    if (!container) {
        return;
    }

    const { reset = false, totalCount = state.searchResults.length } = options;

    if (reset) {
        container.innerHTML = "";
        state.renderedSearchCount = 0;
        resetSelectedSearchResults();
        
        // 添加播放全部按钮
        if (newItems.length > 0) {
            const playAllButton = document.createElement("button");
            playAllButton.id = "playAllBtn";
            playAllButton.className = "play-all-btn";
            playAllButton.type = "button";
            playAllButton.innerHTML = '<i class="fas fa-play-circle"></i><span>播放全部</span>';
            playAllButton.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                playAllSearchResults();
            });
            container.appendChild(playAllButton);
        }
    }

    const existingLoadMore = container.querySelector("#loadMoreBtn");
    if (existingLoadMore) {
        existingLoadMore.remove();
    }

    const itemsToAppend = Array.isArray(newItems) ? newItems : [];

    if (itemsToAppend.length === 0 && state.renderedSearchCount === 0 && totalCount === 0) {
        container.innerHTML = "<div style=\"text-align: center; color: var(--text-secondary-color); padding: 20px;\">未找到相关歌曲</div>";
        state.renderedSearchCount = 0;
        debugLog("显示搜索结果: 0 个结果, 无可用数据");
        return;
    }

    if (itemsToAppend.length > 0) {
        const fragment = document.createDocumentFragment();
        const startIndex = state.renderedSearchCount;
        itemsToAppend.forEach((song, offset) => {
            fragment.appendChild(createSearchResultItem(song, startIndex + offset));
        });
        container.appendChild(fragment);
        state.renderedSearchCount += itemsToAppend.length;
    }

    if (state.hasMoreResults) {
        container.appendChild(createLoadMoreButton());
    }

    const appendedCount = itemsToAppend.length;
    const totalRendered = state.renderedSearchCount;
    debugLog(`显示搜索结果: 新增 ${appendedCount} 个结果, 总计 ${totalRendered} 个, 加载更多按钮: ${state.hasMoreResults ? "显示" : "隐藏"}`);
}

// 播放全部搜索结果
async function playAllSearchResults() {
    if (state.searchResults.length === 0) {
        showNotification("没有可播放的搜索结果", "warning");
        return;
    }

    try {
        // 隐藏搜索结果，显示播放界面
        hideSearchResults();
        dom.searchInput.value = "";
        if (isMobileView) {
            closeMobileSearch();
        }

        // 去重处理
        const existingKeys = new Set(
            state.playlistSongs
                .map(getSongKey)
                .filter(key => typeof key === "string" && key !== "")
        );

        const uniqueSongs = [];
        for (const song of state.searchResults) {
            const key = getSongKey(song);
            if (!key || !existingKeys.has(key)) {
                uniqueSongs.push(song);
                if (key) {
                    existingKeys.add(key);
                }
            }
        }

        if (uniqueSongs.length === 0) {
            showNotification("所有搜索结果已在播放列表中", "warning");
            return;
        }

        // 添加去重后的歌曲到播放列表
        const currentPlaylistLength = state.playlistSongs.length;
        state.playlistSongs = [...state.playlistSongs, ...uniqueSongs];
        
        // 更新播放列表显示
        renderPlaylist();

        // 播放第一首新添加的歌曲
        state.currentTrackIndex = currentPlaylistLength;
        state.currentPlaylist = "playlist";
        await playPlaylistSong(currentPlaylistLength);

        showNotification(`已播放全部搜索结果 (${uniqueSongs.length} 首)`);

    } catch (error) {
        console.error("播放全部搜索结果失败:", error);
        showNotification("播放全部失败，请稍后重试", "error");
    }
}

// 显示质量选择菜单
function showQualityMenu(event, index, type) {
    event.stopPropagation();

    // 移除现有的质量菜单
    const existingMenu = document.querySelector(".dynamic-quality-menu");
    if (existingMenu) {
        existingMenu.remove();
    }

    // 创建新的质量菜单
    const menu = document.createElement("div");
    menu.className = "dynamic-quality-menu";
    menu.innerHTML = `
        <div class="quality-option" onclick="downloadWithQuality(event, ${index}, '${type}', '128')">标准音质 (128k)</div>
        <div class="quality-option" onclick="downloadWithQuality(event, ${index}, '${type}', '192')">高音质 (192k)</div>
        <div class="quality-option" onclick="downloadWithQuality(event, ${index}, '${type}', '320')">超高音质 (320k)</div>
        <div class="quality-option" onclick="downloadWithQuality(event, ${index}, '${type}', '999')">无损音质</div>
    `;

    // 设置菜单位置
    const button = event.target.closest("button");
    const rect = button.getBoundingClientRect();
    menu.style.position = "fixed";
    menu.style.top = (rect.bottom + 5) + "px";
    menu.style.left = (rect.left - 50) + "px";
    menu.style.zIndex = "10000";

    // 添加到body
    document.body.appendChild(menu);

    // 点击其他地方关闭菜单
    setTimeout(() => {
        document.addEventListener("click", function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener("click", closeMenu);
            }
        });
    }, 0);
}

// 根据质量下载 - 支持播放列表模式
async function downloadWithQuality(event, index, type, quality) {
    event.stopPropagation();
    let song;

    if (type === "search") {
        song = state.searchResults[index];
    } else if (type === "online") {
        song = state.onlineSongs[index];
    } else if (type === "playlist") {
        song = state.playlistSongs[index];
    }

    if (!song) return;

    // 关闭菜单并移除 menu-active 类
    document.querySelectorAll(".quality-menu").forEach(menu => {
        menu.classList.remove("show");
        const parentItem = menu.closest(".search-result-item");
        if (parentItem) parentItem.classList.remove("menu-active");
    });

    // 关闭动态质量菜单
    const dynamicMenu = document.querySelector(".dynamic-quality-menu");
    if (dynamicMenu) {
        dynamicMenu.remove();
    }

    try {
        await downloadSong(song, quality);
    } catch (error) {
        console.error("下载失败:", error);
        showNotification("下载失败，请稍后重试", "error");
    }
}

// 修复：播放搜索结果 - 添加到播放列表而不是清空
async function playSearchResult(index) {
    const song = state.searchResults[index];
    if (!song) return;

    try {
        // 立即隐藏搜索结果，显示播放界面
        hideSearchResults();
        dom.searchInput.value = "";
        if (isMobileView) {
            closeMobileSearch();
        }

        // 检查歌曲是否已在播放列表中
        const existingIndex = state.playlistSongs.findIndex(s => s.id === song.id && s.source === song.source);

        if (existingIndex !== -1) {
            // 如果歌曲已存在，直接播放
            state.currentTrackIndex = existingIndex;
            state.currentPlaylist = "playlist";
        } else {
            // 如果歌曲不存在，添加到播放列表
            state.playlistSongs.push(song);
            state.currentTrackIndex = state.playlistSongs.length - 1;
            state.currentPlaylist = "playlist";
        }

        // 更新播放列表显示
        renderPlaylist();

        // 播放歌曲
        await playSong(song);

        showNotification(`正在播放: ${song.name}`);

    } catch (error) {
        console.error("播放失败:", error);
        showNotification("播放失败，请稍后重试", "error");
    }
}

function resolveSongId(song) {
    if (!song || typeof song !== "object") {
        return null;
    }
    const candidates = [
        "id",
        "songId",
        "songid",
        "songmid",
        "mid",
        "hash",
        "sid",
        "rid",
        "trackId"
    ];
    for (const key of candidates) {
        if (Object.prototype.hasOwnProperty.call(song, key)) {
            const value = song[key];
            if (typeof value === "number" && Number.isFinite(value)) {
                return String(value);
            }
            if (typeof value === "string" && value.trim() !== "") {
                return value.trim();
            }
        }
    }
    return null;
}

function normalizeArtistValue(value) {
    if (Array.isArray(value)) {
        const names = value.map((item) => {
            if (typeof item === "string") {
                return item.trim();
            }
            if (item && typeof item === "object" && typeof item.name === "string") {
                return item.name.trim();
            }
            return "";
        }).filter(Boolean);
        if (names.length === 0) {
            return undefined;
        }
        if (names.length === 1) {
            return names[0];
        }
        return names;
    }
    if (value && typeof value === "object" && typeof value.name === "string") {
        const name = value.name.trim();
        return name || undefined;
    }
    if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed || undefined;
    }
    return undefined;
}

function getSongKey(song) {
    if (!song || typeof song !== "object") {
        return null;
    }
    const source = typeof song.source === "string" && song.source.trim() !== ""
        ? song.source.trim().toLowerCase()
        : (typeof song.platform === "string" && song.platform.trim() !== ""
            ? song.platform.trim().toLowerCase()
            : "netease");
    const id = resolveSongId(song);
    if (id) {
        return `${source}:${id}`;
    }
    const name = typeof song.name === "string" ? song.name.trim().toLowerCase() : "";
    if (!name) {
        return null;
    }
    const artistValue = song.artist ?? song.artists ?? song.singers ?? song.singer;
    let artistText = "";
    if (Array.isArray(artistValue)) {
        artistText = artistValue.map((item) => {
            if (typeof item === "string") {
                return item.trim().toLowerCase();
            }
            if (item && typeof item === "object" && typeof item.name === "string") {
                return item.name.trim().toLowerCase();
            }
            return "";
        }).filter(Boolean).join(",");
    } else if (artistValue && typeof artistValue === "object" && typeof artistValue.name === "string") {
        artistText = artistValue.name.trim().toLowerCase();
    } else if (typeof artistValue === "string") {
        artistText = artistValue.trim().toLowerCase();
    }
    return `${source}:${name}::${artistText}`;
}

function sanitizeImportedSong(rawSong) {
    if (!rawSong || typeof rawSong !== "object") {
        return null;
    }
    const name = typeof rawSong.name === "string" ? rawSong.name.trim() : "";
    if (!name) {
        return null;
    }

    const normalized = { ...rawSong, name };
    const sourceCandidate = rawSong.source || rawSong.platform || rawSong.provider || rawSong.vendor;
    normalized.source = typeof sourceCandidate === "string" && sourceCandidate.trim() !== ""
        ? sourceCandidate.trim()
        : "netease";

    const resolvedId = resolveSongId(rawSong);
    if (resolvedId) {
        normalized.id = resolvedId;
    }

    const artistValue = rawSong.artist ?? rawSong.artists ?? rawSong.singers ?? rawSong.singer;
    const normalizedArtist = normalizeArtistValue(artistValue);
    if (normalizedArtist !== undefined) {
        normalized.artist = normalizedArtist;
    }

    if (normalized.album && typeof normalized.album === "object" && typeof normalized.album.name === "string") {
        normalized.album = normalized.album.name.trim();
    }

    return normalized;
}

function extractPlaylistItems(payload) {
    if (Array.isArray(payload)) {
        return payload;
    }
    if (payload && typeof payload === "object") {
        const possibleKeys = ["items", "songs", "playlist", "tracks", "data"];
        for (const key of possibleKeys) {
            if (Array.isArray(payload[key])) {
                return payload[key];
            }
        }
    }
    return [];
}

function updatePlaylistActionStates() {
    const hasSongs = Array.isArray(state.playlistSongs) && state.playlistSongs.length > 0;
    if (dom.exportPlaylistBtn) {
        dom.exportPlaylistBtn.disabled = !hasSongs;
        dom.exportPlaylistBtn.setAttribute("aria-disabled", hasSongs ? "false" : "true");
    }
    if (dom.mobileExportPlaylistBtn) {
        dom.mobileExportPlaylistBtn.disabled = !hasSongs;
        dom.mobileExportPlaylistBtn.setAttribute("aria-disabled", hasSongs ? "false" : "true");
    }
    if (dom.clearPlaylistBtn) {
        dom.clearPlaylistBtn.disabled = !hasSongs;
        dom.clearPlaylistBtn.setAttribute("aria-disabled", hasSongs ? "false" : "true");
    }
    if (dom.mobileClearPlaylistBtn) {
        dom.mobileClearPlaylistBtn.disabled = !hasSongs;
        dom.mobileClearPlaylistBtn.setAttribute("aria-disabled", hasSongs ? "false" : "true");
    }
}

function exportPlaylist() {
    if (!Array.isArray(state.playlistSongs) || state.playlistSongs.length === 0) {
        showNotification("播放列表为空，无法导出", "warning");
        return;
    }

    try {
        const payload = {
            meta: {
                app: "Solara",
                version: PLAYLIST_EXPORT_VERSION,
                exportedAt: new Date().toISOString(),
                itemCount: state.playlistSongs.length
            },
            items: state.playlistSongs
        };

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const now = new Date();
        const formattedTimestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `solara-playlist-${formattedTimestamp}.json`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
        showNotification(`已导出 ${state.playlistSongs.length} 首歌曲`, "success");
    } catch (error) {
        console.error("导出播放列表失败:", error);
        showNotification("导出失败，请稍后重试", "error");
    }
}

function handleImportedPlaylistItems(rawItems) {
    if (!Array.isArray(state.playlistSongs)) {
        state.playlistSongs = [];
    }

    const sanitizedSongs = rawItems
        .map(sanitizeImportedSong)
        .filter((song) => song && typeof song === "object");

    if (sanitizedSongs.length === 0) {
        throw new Error("NO_VALID_SONGS");
    }

    const existingKeys = new Set(
        state.playlistSongs
            .map(getSongKey)
            .filter((key) => typeof key === "string" && key !== "")
    );

    let added = 0;
    let duplicates = 0;

    sanitizedSongs.forEach((song) => {
        const key = getSongKey(song);
        if (key && existingKeys.has(key)) {
            duplicates++;
            return;
        }
        state.playlistSongs.push(song);
        if (key) {
            existingKeys.add(key);
        }
        added++;
    });

    if (added > 0) {
        renderPlaylist();
    } else {
        updatePlaylistActionStates();
    }

    return { added, duplicates };
}

function handleImportPlaylistChange(event) {
    const input = event?.target;
    const file = input?.files?.[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        try {
            const text = typeof reader.result === "string" ? reader.result : "";
            if (!text) {
                throw new Error("EMPTY_FILE");
            }

            const payload = parseJSON(text, null);
            if (!payload) {
                throw new Error("INVALID_JSON");
            }

            const items = extractPlaylistItems(payload);
            if (!Array.isArray(items) || items.length === 0) {
                throw new Error("NO_SONGS");
            }

            const { added, duplicates } = handleImportedPlaylistItems(items);
            if (added > 0) {
                const duplicateHint = duplicates > 0 ? `，${duplicates} 首已存在` : "";
                showNotification(`成功导入 ${added} 首歌曲${duplicateHint}`, "success");
            } else {
                showNotification("文件中的歌曲已在播放列表中", "warning");
            }
        } catch (error) {
            console.error("导入播放列表失败:", error);
            showNotification("导入失败，请确认文件格式", "error");
        } finally {
            if (input) {
                input.value = "";
            }
        }
    };

    reader.onerror = () => {
        console.error("读取播放列表文件失败:", reader.error);
        showNotification("无法读取播放列表文件", "error");
        if (input) {
            input.value = "";
        }
    };

    reader.readAsText(file, "utf-8");
}

// 新增：渲染统一播放列表
function renderPlaylist() {
    if (!dom.playlistItems) return;

    if (state.playlistSongs.length === 0) {
        dom.playlist.classList.add("empty");
        dom.playlistItems.innerHTML = "";
        savePlayerState();
        updatePlaylistHighlight();
        updateMobileClearPlaylistVisibility();
        updatePlaylistActionStates();
        return;
    }

    dom.playlist.classList.remove("empty");
    const playlistHtml = state.playlistSongs.map((song, index) =>
        `<div class="playlist-item" data-index="${index}" role="button" tabindex="0" aria-label="播放 ${song.name}">
            ${song.name} - ${Array.isArray(song.artist) ? song.artist.join(", ") : song.artist}
            <button class="playlist-item-remove" type="button" data-playlist-action="remove" data-index="${index}" title="从播放列表移除">
                <i class="fas fa-times"></i>
            </button>
            <button class="playlist-item-download" type="button" data-playlist-action="download" data-index="${index}" title="下载">
                <i class="fas fa-download"></i>
            </button>
        </div>`
    ).join("");

    dom.playlistItems.innerHTML = playlistHtml;
    savePlayerState();
    updatePlaylistHighlight();
    updateMobileClearPlaylistVisibility();
    updatePlaylistActionStates();
    
    // 如果当前有正在播放的歌曲，自动滚动到该歌曲
    if (state.currentPlaylist === "playlist" && state.currentTrackIndex >= 0) {
        debugLog("渲染播放列表: 检测到当前播放歌曲，准备自动滚动");
        setTimeout(() => {
            scrollToCurrentPlaylistItem();
        }, 150);
    }
}

// 新增：从播放列表移除歌曲
function removeFromPlaylist(index) {
    if (index < 0 || index >= state.playlistSongs.length) return;

    const removingCurrent = state.currentPlaylist === "playlist" && state.currentTrackIndex === index;

    if (removingCurrent) {
        // 关键：增加 RequestID，立即使 pending 的播放请求失效
        state.playbackRequestId++; 

        if (state.playlistSongs.length === 1) {
            dom.audioPlayer.pause();
            dom.audioPlayer.src = "";
            state.currentTrackIndex = -1;
            state.currentSong = null;
            state.currentAudioUrl = null;
            state.currentPlaybackTime = 0;
            state.lastSavedPlaybackTime = 0;
            dom.progressBar.value = 0;
            dom.progressBar.max = 0;
            dom.currentTimeDisplay.textContent = "00:00";
            dom.durationDisplay.textContent = "00:00";
            updateProgressBarBackground(0, 1);
            dom.currentSongTitle.textContent = "选择一首歌曲开始播放";
            updateMobileToolbarTitle();
            dom.currentSongArtist.textContent = "未知艺术家";
            showAlbumCoverPlaceholder();
            clearLyricsContent();
            if (dom.lyrics) {
                dom.lyrics.dataset.placeholder = "default";
            }
            dom.lyrics.classList.add("empty");
            updatePlayPauseButton();
        } else if (index === state.playlistSongs.length - 1) {
            state.currentTrackIndex = index - 1;
        }
    } else if (state.currentPlaylist === "playlist" && state.currentTrackIndex > index) {
        state.currentTrackIndex--;
    }

    state.playlistSongs.splice(index, 1);

    if (state.playlistSongs.length === 0) {
        dom.playlist.classList.add("empty");
        if (dom.playlistItems) {
            dom.playlistItems.innerHTML = "";
        }
        state.currentPlaylist = "playlist";
        updateMobileClearPlaylistVisibility();
    } else {
        if (state.currentPlaylist === "playlist" && state.currentTrackIndex < 0) {
            state.currentTrackIndex = 0;
        }

        renderPlaylist();

        if (removingCurrent && state.currentPlaylist === "playlist" && state.currentTrackIndex >= 0) {
            const targetIndex = Math.min(state.currentTrackIndex, state.playlistSongs.length - 1);
            state.currentTrackIndex = targetIndex;
            playPlaylistSong(targetIndex);
        } else {
            updatePlaylistHighlight();
        }
    }

    updatePlaylistActionStates();
    savePlayerState();
    showNotification("已从播放列表移除", "success");
}

// 新增：清空播放列表
function clearPlaylist() {
    if (state.playlistSongs.length === 0) return;

    // 关键：增加 RequestID，失效所有正在进行的加载
    state.playbackRequestId++;

    if (state.currentPlaylist === "playlist") {
        dom.audioPlayer.pause();
        dom.audioPlayer.src = "";
        state.currentTrackIndex = -1;
        state.currentSong = null;
        state.currentAudioUrl = null;
        state.currentPlaybackTime = 0;
        state.lastSavedPlaybackTime = 0;
        dom.progressBar.value = 0;
        dom.progressBar.max = 0;
        dom.currentTimeDisplay.textContent = "00:00";
        dom.durationDisplay.textContent = "00:00";
        updateProgressBarBackground(0, 1);
        dom.currentSongTitle.textContent = "选择一首歌曲开始播放";
        updateMobileToolbarTitle();
        dom.currentSongArtist.textContent = "未知艺术家";
        showAlbumCoverPlaceholder();
        clearLyricsContent();
        if (dom.lyrics) {
            dom.lyrics.dataset.placeholder = "default";
        }
        dom.lyrics.classList.add("empty");
        updatePlayPauseButton();
    }

    state.playlistSongs = [];
    dom.playlist.classList.add("empty");
    if (dom.playlistItems) {
        dom.playlistItems.innerHTML = "";
    }
    state.currentPlaylist = "playlist";
    updateMobileClearPlaylistVisibility();
    updatePlaylistActionStates();

    savePlayerState();
    showNotification("播放列表已清空", "success");
}

// 新增：播放播放列表中的歌曲
async function playPlaylistSong(index) {
    if (index < 0 || index >= state.playlistSongs.length) return;

    const song = state.playlistSongs[index];
    state.currentTrackIndex = index;
    state.currentPlaylist = "playlist";

    try {
        await playSong(song);
        updatePlaylistHighlight();
        // 播放后自动滚动到当前歌曲
        setTimeout(() => {
            scrollToCurrentPlaylistItem();
        }, 300);
        if (isMobileView) {
            closeMobilePanel();
        }
    } catch (error) {
        console.error("播放失败:", error);
        showNotification("播放失败，请稍后重试", "error");
    }
}

// 新增：滚动到当前播放的播放列表项目
function scrollToCurrentPlaylistItem() {
    if (!dom.playlistItems || state.currentPlaylist !== "playlist" || state.currentTrackIndex < 0) {
        debugLog(`播放列表滚动条件不满足: playlistItems=${!!dom.playlistItems}, currentPlaylist=${state.currentPlaylist}, currentTrackIndex=${state.currentTrackIndex}`);
        return;
    }
    
    // 确保播放列表容器可见且已渲染
    if (!dom.playlist || !dom.playlist.classList.contains("active")) {
        debugLog("播放列表视图未激活，无法滚动");
        return;
    }
    
    // 如果用户手动滚动了播放列表，暂时不自动滚动
    if (state.userScrolledPlaylist) {
        debugLog("用户手动滚动了播放列表，跳过自动滚动");
        return;
    }
    
    const currentItem = dom.playlistItems.querySelector(`.playlist-item[data-index="${state.currentTrackIndex}"]`);
    if (!currentItem) {
        debugLog(`播放列表滚动: 找不到当前歌曲元素, index=${state.currentTrackIndex}`);
        // 如果找不到元素，可能是DOM还未更新，延迟重试
        setTimeout(() => {
            const retryItem = dom.playlistItems.querySelector(`.playlist-item[data-index="${state.currentTrackIndex}"]`);
            if (retryItem) {
                debugLog("重试滚动成功");
                scrollToCurrentPlaylistItem();
            } else {
                debugLog("重试滚动失败，元素仍未找到");
            }
        }, 200);
        return;
    }
    
    // 使用正确的滚动容器 - 移动端应该是 playlist-scroll
    const container = dom.playlist.querySelector('.playlist-scroll') || dom.playlistItems;
    if (!container) {
        debugLog("找不到滚动容器");
        return;
    }
    
    const containerHeight = container.clientHeight;
    const itemOffsetTop = currentItem.offsetTop;
    const itemHeight = currentItem.offsetHeight;
    
    // 目标滚动位置：让当前歌曲的中心与容器中心对齐
    const targetScrollTop = itemOffsetTop - (containerHeight / 2) + (itemHeight / 2);
    
    const maxScrollTop = container.scrollHeight - containerHeight;
    const finalScrollTop = Math.max(0, Math.min(targetScrollTop, maxScrollTop));
    
    if (Math.abs(container.scrollTop - finalScrollTop) > 1) {
        if (typeof container.scrollTo === "function") {
            container.scrollTo({
                top: finalScrollTop,
                behavior: 'smooth'
            });
        } else {
            container.scrollTop = finalScrollTop;
        }
        debugLog(`播放列表滚动: 当前歌曲索引=${state.currentTrackIndex}, 目标滚动位置=${finalScrollTop}, 容器高度=${containerHeight}, 元素偏移=${itemOffsetTop}`);
    } else {
        debugLog(`播放列表滚动: 无需滚动, 当前位置=${container.scrollTop}, 目标位置=${finalScrollTop}`);
    }
}

// 新增：强制滚动到当前播放列表项目（用于调试和测试）
function forceScrollToCurrentPlaylistItem() {
    debugLog("强制滚动到当前播放列表项目");
    scrollToCurrentPlaylistItem();
}

// 新增：更新播放列表高亮
function updatePlaylistHighlight() {
    if (!dom.playlistItems) return;
    const playlistItems = dom.playlistItems.querySelectorAll(".playlist-item");
    playlistItems.forEach((item, index) => {
        const isCurrent = state.currentPlaylist === "playlist" && index === state.currentTrackIndex;
        item.classList.toggle("current", isCurrent);
        item.setAttribute("aria-current", isCurrent ? "true" : "false");
        item.setAttribute("aria-pressed", isCurrent ? "true" : "false");
    });
}

// 修复：播放歌曲函数 - 支持统一播放列表
function waitForAudioReady(player) {
    if (!player) return Promise.resolve();
    if (player.readyState >= 1) {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        const cleanup = () => {
            player.removeEventListener('loadedmetadata', onLoaded);
            player.removeEventListener('error', onError);
        };
        const onLoaded = () => {
            cleanup();
            resolve();
        };
        const onError = () => {
            cleanup();
            reject(new Error('音频加载失败'));
        };
        player.addEventListener('loadedmetadata', onLoaded, { once: true });
        player.addEventListener('error', onError, { once: true });
    });
}

function extractUrlFromData(data) {
    if (!data) return null;
    if (typeof data === 'string') return data; // 直接返回字符串
    
    // 常见的数据结构路径
    return data.url || 
           (data.data && data.data.url) || 
           (data.data && data.data[0] && data.data[0].url) ||
           (data.req_0 && data.req_0.data && data.req_0.data.sip && data.req_0.data.sip[0] && data.req_0.data.midurlinfo && data.req_0.data.midurlinfo[0] && data.req_0.data.sip[0] + data.req_0.data.midurlinfo[0].purl) || // QQ音乐复杂结构示例
           null;
}

async function playSong(song, options = {}) {
    const { autoplay = true, startTime = 0, preserveProgress = false, isRetry = false } = options;

    // 1. 生成新的请求ID
    state.playbackRequestId++; 
    const currentRequestId = state.playbackRequestId;

    // 如果不是重试，重置音质和音源状态
    if (!isRetry) {
        resetQualityState();
        state.currentSourceAttempt = song.source || state.searchSource;
    }
    
    state.isAutoQualitySwitching = false;
    stopPlaybackMonitoring();
    stopLoadTimeoutMonitoring();

    // 更新 Media Session
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'none';
        if (typeof window.__SOLARA_UPDATE_MEDIA_METADATA === 'function') {
            window.__SOLARA_UPDATE_MEDIA_METADATA();
        }
    }

    // 重置背景色相关
    window.clearTimeout(pendingPaletteTimer);
    state.audioReadyForPalette = false;
    state.pendingPaletteData = null;
    state.pendingPaletteImage = null;
    state.pendingPaletteImmediate = false;
    state.pendingPaletteReady = false;

    try {
        // 先加载封面和标题，让用户感觉响应很快
        updateCurrentSongInfo(song, { loadArtwork: false });

        const currentQuality = state.currentQualityAttempt;
        const currentSource = song.source || state.searchSource;
        
        // 获取音频 API 地址
        const apiUrl = API.getSongUrl({ ...song, source: currentSource }, currentQuality);
        debugLog(`请求音频API: ${apiUrl}`);

        if (state.playbackRequestId !== currentRequestId) return;

        // 请求 API 获取真实的音频文件地址
        const apiResponse = await API.fetchJson(apiUrl);

        if (state.playbackRequestId !== currentRequestId) {
            debugLog("播放请求已过期 (API返回后)，停止");
            return;
        }

        // [修改] 使用增强的提取逻辑
        const originalAudioUrl = extractUrlFromData(apiResponse);

        if (!originalAudioUrl) {
            console.error("API 返回数据:", apiResponse);
            throw new Error('API 返回的音频地址为空');
        }

        // [关键修改] 构建候选地址列表
        // 1. 代理地址 (解决 HTTPS 混排和跨域)
        const proxiedAudioUrl = buildAudioProxyUrl(originalAudioUrl);
        // 2. HTTPS 升级地址 (如果原地址是 HTTP)
        const preferredAudioUrl = preferHttpsUrl(originalAudioUrl);
        
        // 构建候选列表，去重并过滤空值
        // 优先尝试代理地址，因为它是最稳的
        const candidateAudioUrls = Array.from(
            new Set([proxiedAudioUrl, preferredAudioUrl, originalAudioUrl].filter(Boolean))
        );

        debugLog(`音频候选地址: ${JSON.stringify(candidateAudioUrls)}`);

        state.currentSong = song;
        state.currentAudioUrl = null;

        dom.audioPlayer.pause();
        // 设置防盗链策略 (以防 setupInteractions 没执行到)
        dom.audioPlayer.setAttribute('referrerpolicy', 'no-referrer');

        // 处理进度条逻辑
        if (!preserveProgress) {
            state.currentPlaybackTime = 0;
            state.lastSavedPlaybackTime = 0;
            safeSetLocalStorage('currentPlaybackTime', '0');
            dom.progressBar.value = 0;
            dom.currentTimeDisplay.textContent = "00:00";
            updateProgressBarBackground(0, Number(dom.progressBar.max));
        } else if (startTime > 0) {
            state.currentPlaybackTime = startTime;
            state.lastSavedPlaybackTime = startTime;
        }
        state.pendingSeekTime = startTime > 0 ? startTime : null;

        // [修改] 尝试加载音频
        let selectedAudioUrl = null;
        let lastAudioError = null;

        for (const candidateUrl of candidateAudioUrls) {
            if (state.playbackRequestId !== currentRequestId) return;

            // 检查 URL 是否包含 undefined 字符串
            if (candidateUrl.includes('undefined')) {
                continue;
            }

            debugLog(`尝试加载音频 URL: ${candidateUrl}`);
            dom.audioPlayer.src = candidateUrl;
            dom.audioPlayer.load();

            try {
                await waitForAudioReady(dom.audioPlayer);
                
                if (state.playbackRequestId !== currentRequestId) return;

                selectedAudioUrl = candidateUrl;
                debugLog(`音频加载成功: ${candidateUrl}`);
                break;
            } catch (error) {
                lastAudioError = error;
                console.warn(`音频地址加载失败: ${candidateUrl}`, error);
            }
        }

        if (!selectedAudioUrl) {
            throw lastAudioError || new Error('所有音频地址均加载失败');
        }

        state.currentAudioUrl = selectedAudioUrl;

        // 恢复进度
        if (state.pendingSeekTime != null) {
            setAudioCurrentTime(state.pendingSeekTime);
            state.pendingSeekTime = null;
        } else {
            setAudioCurrentTime(dom.audioPlayer.currentTime || 0);
        }
        state.lastPlaybackTime = state.currentPlaybackTime;

        let playPromise = null;

        if (autoplay) {
            if (state.playbackRequestId !== currentRequestId) return;

            startLoadTimeoutMonitoring();
            
            playPromise = dom.audioPlayer.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    if (state.playbackRequestId !== currentRequestId) {
                        dom.audioPlayer.pause();
                        return;
                    }
                    stopLoadTimeoutMonitoring();
                    startPlaybackMonitoring();
                    
                    if ('mediaSession' in navigator) {
                        navigator.mediaSession.playbackState = 'playing';
                        updatePositionState();
                    }
                }).catch(error => {
                    if (state.playbackRequestId !== currentRequestId) return;
                    console.error('播放 Promise 失败:', error);
                    stopLoadTimeoutMonitoring();
                    // 不要立即抛出错误，有些浏览器会在加载中触发 AbortError
                    if (error.name !== 'AbortError') {
                        handlePlaybackError(song, error);
                    }
                });
            } else {
                startPlaybackMonitoring();
            }
        } else {
            stopLoadTimeoutMonitoring();
            dom.audioPlayer.pause();
            updatePlayPauseButton();
        }

        scheduleDeferredSongAssets(song, playPromise);
        
        // 通知
        const qualityInfo = QUALITY_LEVELS.find(q => q.value === currentQuality);
        if (qualityInfo && !isRetry) {
            showNotification(`正在播放: ${song.name}`);
        }

        if (typeof window.__SOLARA_UPDATE_MEDIA_METADATA === 'function') {
            window.__SOLARA_UPDATE_MEDIA_METADATA();
        }

    } catch (error) {
        if (state.playbackRequestId !== currentRequestId) return;

        console.error('播放流程严重错误:', error);
        stopLoadTimeoutMonitoring();
        handlePlaybackError(song, error);
    } finally {
        if (state.playbackRequestId === currentRequestId) {
            savePlayerState();
        }
    }
}

function scheduleDeferredSongAssets(song, playPromise) {
    const run = () => {
        if (state.currentSong !== song) {
            return;
        }

        updateCurrentSongInfo(song, { loadArtwork: true });
        loadLyrics(song);
        state.audioReadyForPalette = true;
        attemptPaletteApplication();
    };

    const kickoff = () => {
        if (state.currentSong !== song) {
            return;
        }

        if (typeof window.requestAnimationFrame === "function") {
            window.requestAnimationFrame(() => {
                if (state.currentSong !== song) {
                    return;
                }

                if (typeof window.requestIdleCallback === "function") {
                    window.requestIdleCallback(() => {
                        if (state.currentSong !== song) {
                            return;
                        }
                        run();
                    }, { timeout: 600 });
                } else {
                    run();
                }
            });
        } else {
            window.setTimeout(run, 0);
        }
    };

    if (playPromise && typeof playPromise.finally === "function") {
        playPromise.finally(kickoff);
    } else {
        kickoff();
    }
}

async function autoPlayNext() {
    debugLog("autoPlayNext 被调用，开始处理下一首播放");
    
    // 检查是否已经在处理中，避免重复调用
    if (state.isAutoPlayingNext) {
        debugLog("已经在处理自动播放下一首，跳过重复调用");
        return;
    }
    
    state.isAutoPlayingNext = true;
    
    try {
        // 单曲循环模式
        if (state.playMode === "single") {
            debugLog("单曲循环模式，重新播放当前歌曲");
            dom.audioPlayer.currentTime = 0;
            
            // 更新 Media Session 状态
            if ('mediaSession' in navigator) {
                navigator.mediaSession.playbackState = 'playing';
                updatePositionState();
            }
            
            const playPromise = dom.audioPlayer.play();
            if (playPromise !== undefined) {
                await playPromise.catch(error => {
                    console.error('单曲循环播放失败:', error);
                });
            }
            return;
        }

        // 重置播放监控状态
        stopPlaybackMonitoring();
        stopLoadTimeoutMonitoring();
        
        // 检查是否需要自动添加雷达歌曲
        await checkAndAutoAddRadarSongs();

        // 获取下一首歌曲
        const nextSong = getNextSong();
        if (!nextSong) {
            debugLog("没有找到下一首歌曲");
            showNotification("播放列表已结束", "info");
            
            // 更新 Media Session 状态为暂停
            if ('mediaSession' in navigator) {
                navigator.mediaSession.playbackState = 'paused';
                updatePositionState();
            }
            
            return;
        }

        // 更新当前曲目索引
        if (state.currentPlaylist === "playlist") {
            const playlist = state.playlistSongs;
            state.currentTrackIndex = playlist.findIndex(song => 
                song.id === nextSong.id && song.source === nextSong.source
            );
        } else if (state.currentPlaylist === "online") {
            const playlist = state.onlineSongs;
            state.currentTrackIndex = playlist.findIndex(song => 
                song.id === nextSong.id && song.source === nextSong.source
            );
        } else if (state.currentPlaylist === "search") {
            const playlist = state.searchResults;
            state.currentTrackIndex = playlist.findIndex(song => 
                song.id === nextSong.id && song.source === nextSong.source
            );
        }

        // 确保索引有效
        if (state.currentTrackIndex === -1) {
            state.currentTrackIndex = 0; // 回退到第一首
        }

        debugLog(`准备播放下一首: ${nextSong.name}`);

        // 立即更新 Media Session 元数据
        if ('mediaSession' in navigator) {
            // 先更新歌曲信息
            state.currentSong = nextSong;
            updateMediaMetadata();
            
            // 重置播放状态为 playing
            navigator.mediaSession.playbackState = 'playing';
            
            // 重置进度状态
            updatePositionState();
        }

        // 更新当前歌曲信息
        state.currentSong = nextSong;
        await updateCurrentSongInfo(nextSong, { loadArtwork: true });

        // 播放下一首
        if (state.currentPlaylist === "playlist") {
            await playPlaylistSong(state.currentTrackIndex);
        } else if (state.currentPlaylist === "online") {
            await playOnlineSong(state.currentTrackIndex);
        } else if (state.currentPlaylist === "search") {
            await playSearchResult(state.currentTrackIndex);
        }

        debugLog("下一首播放成功");

    } catch (error) {
        console.error('自动播放下一首失败:', error);
        debugLog(`自动播放下一首失败: ${error.message}`);
        
        // 如果播放失败，更新 Media Session 状态
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'paused';
            updatePositionState();
        }
        
        // 延迟一段时间后重试
        setTimeout(() => {
            if (!dom.audioPlayer.paused) return;
            debugLog("尝试重新播放下一首");
            state.isAutoPlayingNext = false;
            autoPlayNext();
        }, 2000);
    } finally {
        // 短暂延迟后重置标志，避免立即重复调用
        setTimeout(() => {
            state.isAutoPlayingNext = false;
        }, 500);
    }
}


// 检查并自动添加雷达歌曲
async function checkAndAutoAddRadarSongs() {
    if (state.currentPlaylist !== "playlist" || state.playlistSongs.length === 0) {
        return;
    }

    const remainingSongs = state.playlistSongs.length - state.currentTrackIndex - 1;
    if (remainingSongs <= 3) {
        debugLog(`播放列表即将结束，剩余 ${remainingSongs} 首歌曲，自动添加雷达歌曲`);
        
        try {
            const shuffledKeywords = [...RADAR_KEYWORDS].sort(() => Math.random() - 0.5);
            const keyword1 = shuffledKeywords[0];
            const keyword2 = shuffledKeywords[1];
            
            const randomOffset = Math.floor(Math.random() * MAX_RADAR_OFFSET);
            state.radarOffset = randomOffset;
            
            debugLog(`自动添加雷达歌曲，使用关键词: ${keyword1} 和 ${keyword2}, 随机偏移量: ${randomOffset}`);

            const [results1, results2] = await Promise.all([
		    API.search(keyword1, "netease", SEARCH_PAGE_SIZE, Math.floor(randomOffset / SEARCH_PAGE_SIZE) + 1).catch(() => []),
		    API.search(keyword2, "netease", SEARCH_PAGE_SIZE, Math.floor((randomOffset + SEARCH_PAGE_SIZE) % MAX_RADAR_OFFSET / SEARCH_PAGE_SIZE) + 1).catch(() => [])
		]);

            const allResults = [...(results1 || []), ...(results2 || [])];
            const uniqueResults = allResults.filter((song, index, self) => 
                index === self.findIndex(s => 
                    s.id === song.id && s.source === song.source
                )
            );

            // 新增：应用屏蔽关键词过滤
            const filteredResults = filterBlockedSongs(uniqueResults);
            debugLog(`自动添加雷达过滤结果: 原始 ${uniqueResults.length} 首 -> 过滤后 ${filteredResults.length} 首`);

            // 位置 3：修改这里 - 使用 filteredResults 判断
            if (filteredResults.length > 0) {
                const existingKeys = new Set(
                    state.playlistSongs
                        .map(getSongKey)
                        .filter(key => typeof key === "string" && key !== "")
                );

                const uniqueSongs = [];
                // 这里已经是使用 filteredResults 循环了
                for (const song of filteredResults) {
                    const key = getSongKey(song);
                    if (!key || !existingKeys.has(key)) {
                        uniqueSongs.push(song);
                        if (key) {
                            existingKeys.add(key);
                        }
                    }
                }

                const shuffledSongs = [...uniqueSongs].sort(() => Math.random() - 0.5);
                const songsToAdd = shuffledSongs.slice(0, 10);
                
                if (songsToAdd.length > 0) {
                    state.playlistSongs = [...state.playlistSongs, ...songsToAdd];
                    renderPlaylist();
                    
                    const filteredCount = uniqueResults.length - filteredResults.length;
                    debugLog(`自动添加雷达歌曲成功: 添加 ${songsToAdd.length} 首歌曲, 过滤 ${filteredCount} 首 (关键词: ${keyword1}, ${keyword2}, 随机偏移量: ${randomOffset})`);
                    showNotification(`自动添加 ${songsToAdd.length} 首雷达歌曲${filteredCount > 0 ? ` (过滤 ${filteredCount} 首)` : ''}`);
                }
            }
        } catch (error) {
            console.error("自动添加雷达歌曲失败:", error);
            debugLog("自动添加雷达歌曲失败");
        }
    }
}

function playNext() {
    debugLog("playNext 被调用");
    
    // 停止当前的播放监控
    stopPlaybackMonitoring();
    stopLoadTimeoutMonitoring();
    
    let nextIndex = -1;
    let playlist = [];

    if (state.currentPlaylist === "playlist") {
        playlist = state.playlistSongs;
    } else if (state.currentPlaylist === "online") {
        playlist = state.onlineSongs;
    } else if (state.currentPlaylist === "search") {
        playlist = state.searchResults;
    }

    if (playlist.length === 0) {
        debugLog("播放列表为空，无法播放下一首");
        showNotification("播放列表为空", "warning");
        return;
    }

    // 重置音质状态
    resetQualityState();

    // 计算下一首索引
    if (state.playMode === "random") {
        nextIndex = Math.floor(Math.random() * playlist.length);
        debugLog(`随机模式，下一首索引: ${nextIndex}`);
    } else {
        nextIndex = (state.currentTrackIndex + 1) % playlist.length;
        debugLog(`顺序模式，下一首索引: ${nextIndex} (当前: ${state.currentTrackIndex}, 总数: ${playlist.length})`);
    }

    state.currentTrackIndex = nextIndex;

    // 立即更新当前歌曲信息
    const nextSong = playlist[nextIndex];
    if (nextSong) {
        state.currentSong = nextSong;
        updateCurrentSongInfo(nextSong, { loadArtwork: true });
    }

    // 根据播放列表类型播放
    if (state.currentPlaylist === "playlist") {
        playPlaylistSong(nextIndex);
    } else if (state.currentPlaylist === "online") {
        playOnlineSong(nextIndex);
    } else if (state.currentPlaylist === "search") {
        playSearchResult(nextIndex);
    }
}


function playPrevious() {
    debugLog("playPrevious 被调用");
    
    // 停止当前的播放监控
    stopPlaybackMonitoring();
    stopLoadTimeoutMonitoring();
    
    let prevIndex = -1;
    let playlist = [];

    if (state.currentPlaylist === "playlist") {
        playlist = state.playlistSongs;
    } else if (state.currentPlaylist === "online") {
        playlist = state.onlineSongs;
    } else if (state.currentPlaylist === "search") {
        playlist = state.searchResults;
    }

    if (playlist.length === 0) {
        debugLog("播放列表为空，无法播放上一首");
        showNotification("播放列表为空", "warning");
        return;
    }

    // 重置音质状态
    resetQualityState();

    // 计算上一首索引
    if (state.playMode === "random") {
        prevIndex = Math.floor(Math.random() * playlist.length);
        debugLog(`随机模式，上一首索引: ${prevIndex}`);
    } else {
        prevIndex = state.currentTrackIndex - 1;
        if (prevIndex < 0) prevIndex = playlist.length - 1;
        debugLog(`顺序模式，上一首索引: ${prevIndex} (当前: ${state.currentTrackIndex}, 总数: ${playlist.length})`);
    }

    state.currentTrackIndex = prevIndex;

    // 立即更新当前歌曲信息
    const prevSong = playlist[prevIndex];
    if (prevSong) {
        state.currentSong = prevSong;
        updateCurrentSongInfo(prevSong, { loadArtwork: true });
    }

    // 根据播放列表类型播放
    if (state.currentPlaylist === "playlist") {
        playPlaylistSong(prevIndex);
    } else if (state.currentPlaylist === "online") {
        playOnlineSong(prevIndex);
    } else if (state.currentPlaylist === "search") {
        playSearchResult(prevIndex);
    }
}


// 修复：在线音乐播放函数
async function playOnlineSong(index) {
    const song = state.onlineSongs[index];
    if (!song) return;

    state.currentTrackIndex = index;
    state.currentPlaylist = "online";

    try {
        await playSong(song);
        updateOnlineHighlight();
    } catch (error) {
        console.error("播放失败:", error);
        showNotification("播放失败，请稍后重试", "error");
    }
}

// 修复：更新在线音乐高亮
function updateOnlineHighlight() {
    if (!dom.playlistItems) return;
    const playlistItems = dom.playlistItems.querySelectorAll(".playlist-item");
    playlistItems.forEach((item, index) => {
        if (state.currentPlaylist === "online" && index === state.currentTrackIndex) {
            item.classList.add("current");
        } else {
            item.classList.remove("current");
        }
    });
}

// 修复：探索在线音乐 - 使用随机关键词和酷我音源，添加动态偏移量
async function exploreOnlineMusic() {
    const btn = dom.loadOnlineBtn;
    const btnText = btn.querySelector(".btn-text");
    const loader = btn.querySelector(".loader");

    try {
        btn.disabled = true;
        btnText.style.display = "none";
        loader.style.display = "inline-block";

        // 从备选关键词中随机选择两个不同的关键词
        const shuffledKeywords = [...RADAR_KEYWORDS].sort(() => Math.random() - 0.5);
        const keyword1 = shuffledKeywords[0];
        const keyword2 = shuffledKeywords[1];
        
        // 使用随机偏移量
        const randomOffset = Math.floor(Math.random() * MAX_RADAR_OFFSET);
        state.radarOffset = randomOffset;
        
        debugLog(`探索雷达使用关键词: ${keyword1} 和 ${keyword2}, 随机偏移量: ${randomOffset}`);

        // 使用两个关键词分别搜索
        const [results1, results2] = await Promise.all([
		    API.search(keyword1, "netease", SEARCH_PAGE_SIZE, Math.floor(randomOffset / SEARCH_PAGE_SIZE) + 1).catch(() => []),
		    API.search(keyword2, "netease", SEARCH_PAGE_SIZE, Math.floor((randomOffset + SEARCH_PAGE_SIZE) % MAX_RADAR_OFFSET / SEARCH_PAGE_SIZE) + 1).catch(() => [])
		]);

        // 合并并去重搜索结果
        const allResults = [...(results1 || []), ...(results2 || [])];
        const uniqueResults = allResults.filter((song, index, self) => 
            index === self.findIndex(s => 
                s.id === song.id && s.source === song.source
            )
        );

        // 新增：应用屏蔽关键词过滤
        const filteredResults = filterBlockedSongs(uniqueResults);
        debugLog(`探索雷达过滤结果: 原始 ${uniqueResults.length} 首 -> 过滤后 ${filteredResults.length} 首`);

        // 位置 1：修改这里 - 使用 filteredResults 判断
        if (filteredResults.length > 0) {
            // 去重处理（与现有播放列表比较）
            const existingKeys = new Set(
                state.playlistSongs
                    .map(getSongKey)
                    .filter((key) => typeof key === "string" && key !== "")
            );

            const uniqueSongs = [];
            // 位置 2：修改这里 - 使用 filteredResults 循环
            for (const song of filteredResults) {
                const key = getSongKey(song);
                if (!key || !existingKeys.has(key)) {
                    uniqueSongs.push(song);
                    if (key) {
                        existingKeys.add(key);
                    }
                }
            }

            // 随机打乱歌曲顺序
            const shuffledSongs = [...uniqueSongs].sort(() => Math.random() - 0.5);
            
            // 添加最多10首去重后的歌曲到播放列表
            const songsToAdd = shuffledSongs.slice(0, 10);
            
            if (songsToAdd.length > 0) {
                state.playlistSongs = [...state.playlistSongs, ...songsToAdd];
                state.onlineSongs = songsToAdd;

                // 更新播放列表显示
                renderPlaylist();

                const filteredCount = uniqueResults.length - filteredResults.length;
                const filterMessage = filteredCount > 0 ? ` (已过滤 ${filteredCount} 首)` : '';
                showNotification(`探索雷达: 已添加 ${songsToAdd.length} 首歌曲${filterMessage} (关键词: ${keyword1}, ${keyword2})`);
                debugLog(`探索雷达成功: 关键词 "${keyword1}", "${keyword2}", 随机偏移量 ${randomOffset}, 添加 ${songsToAdd.length} 首歌曲, 过滤 ${filteredCount} 首`);

                // 自动播放第一首新添加的歌曲
                if (songsToAdd.length > 0) {
                    const newIndex = state.playlistSongs.length - songsToAdd.length;
                    state.currentTrackIndex = newIndex;
                    state.currentPlaylist = "playlist";
                    await playPlaylistSong(newIndex);
                }
            } else {
                showNotification("探索雷达: 没有找到新的歌曲", "warning");
            }
        } else {
            showNotification("探索雷达: 未找到相关歌曲或所有结果已被过滤", "error");
        }
    } catch (error) {
        console.error("探索雷达失败:", error);
        showNotification("探索雷达失败，请稍后重试", "error");
    } finally {
        btn.disabled = false;
        btnText.style.display = "flex";
        loader.style.display = "none";
    }
}

async function loadLyrics(song) {
    const tryLyricId = async (lyricId) => {
        try {
            const url = API.getLyric({ ...song, lyric_id: lyricId });
            const data = await API.fetchJson(url);
            let text = null;
            
            // 增强数据结构兼容性
            if (typeof data === 'string') {
                text = data;
            } else if (data) {
                text = data.lyric || data.lrc || data.content || data.data || 
                       data.klyric || data.tlyric || data.romalrc; // 添加更多可能的字段
            }
            return text?.trim() || null;
        } catch (e) {
            console.warn(`尝试歌词ID ${lyricId} 失败:`, e);
            return null;
        }
    };

    try {
        // 优先尝试 lyric_id
        let lyricText = await tryLyricId(song.lyric_id);
        
        // 失败则尝试 song.id
        if (!lyricText && song.id !== song.lyric_id) {
            lyricText = await tryLyricId(song.id);
        }
        
        // 还失败则尝试其他可能的ID字段
        if (!lyricText && song.songId && song.songId !== song.id) {
            lyricText = await tryLyricId(song.songId);
        }
        
        // 最后尝试 artist + name 拼接
        if (!lyricText) {
            const fallbackId = `${song.artist}_${song.name}`.replace(/[^\w]/g, '_');
            lyricText = await tryLyricId(fallbackId);
        }

        if (lyricText) {
            parseLyrics(lyricText);
            dom.lyrics.classList.remove("empty");
            dom.lyrics.dataset.placeholder = "default";
            debugLog(`歌词加载成功: ${song.name}`);
        } else {
            setLyricsContentHtml("<div>暂无歌词</div>");
            dom.lyrics.classList.add("empty");
            dom.lyrics.dataset.placeholder = "message";
            state.lyricsData = [];
            state.currentLyricLine = -1;
            debugLog(`未找到歌词: ${song.name}`);
        }
    } catch (error) {
        console.error("加载歌词失败:", error);
        setLyricsContentHtml("<div>歌词加载失败</div>");
        dom.lyrics.classList.add("empty");
        dom.lyrics.dataset.placeholder = "message";
        state.lyricsData = [];
        state.currentLyricLine = -1;
        debugLog(`歌词加载异常: ${error.message}`);
    }
}

// 修复：解析歌词 - 增强格式兼容性（完整版）
// 替换原来的 parseLyrics 函数
// 完全替换 parseLyrics 函数
function parseLyrics(lyricText) {
    const lines = lyricText.split('\n');
    const lyrics = [];
    let hasValidLyrics = false;

    // 预处理：合并连续的无时间戳行，并正确处理多行歌词
    const processedLines = [];
    let currentTime = null;
    let currentText = [];
    
    lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        // 检查是否是时间戳行
        const timeFormats = [
            /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/,  // [mm:ss.xxx]text
            /\[(\d{2}):(\d{2}):(\d{2,3})\](.*)/,   // [mm:ss:xxx]text
            /\[(\d{2}):(\d{2})\](.*)/,              // [mm:ss]text
            /\[(\d{1,2}):(\d{2})\.(\d{2,3})\](.*)/, // [m:ss.xxx]text
            /\[(\d{1,2}):(\d{2})\](.*)/             // [m:ss]text
        ];
        
        let match = null;
        for (const pattern of timeFormats) {
            match = line.match(pattern);
            if (match) break;
        }

        if (match) {
            // 如果之前有累积的文本，先保存
            if (currentTime !== null && currentText.length > 0) {
                processedLines.push({
                    time: currentTime,
                    text: currentText.join('\n')
                });
                currentText = [];
            }
            
            // 解析时间戳
            let minutes, seconds, milliseconds = 0;
            if (match[3] !== undefined) {
                minutes = parseInt(match[1], 10);
                seconds = parseInt(match[2], 10);
                milliseconds = parseInt(match[3].padEnd(3, '0'), 10);
            } else {
                minutes = parseInt(match[1], 10);
                seconds = parseInt(match[2], 10);
            }
            currentTime = minutes * 60 + seconds + milliseconds / 1000;
            
            // 提取文本
            const text = match[match.length - 1].trim();
            if (text && text !== '//' && !text.startsWith('//')) {
                currentText.push(text);
            }
        } else if (line.includes('[') && line.includes(']')) {
            // 跳过元数据行
            debugLog(`跳过元数据行: ${line}`);
        } else if (line.trim() && currentTime !== null) {
            // 无时间戳的行，累积到当前时间点
            currentText.push(line.trim());
        }
    });
    
    // 处理最后累积的内容
    if (currentTime !== null && currentText.length > 0) {
        processedLines.push({
            time: currentTime,
            text: currentText.join('\n')
        });
    }

    // 如果没有处理出有效行，尝试备选解析方法
    if (processedLines.length === 0) {
        debugLog("标准解析失败，尝试备选解析方法");
        
        // 备选方法：逐行处理，不合并
        lines.forEach(line => {
            line = line.trim();
            if (!line) return;

            const timeFormats = [
                /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/,
                /\[(\d{2}):(\d{2}):(\d{2,3})\](.*)/,
                /\[(\d{2}):(\d{2})\](.*)/,
                /\[(\d{1,2}):(\d{2})\.(\d{2,3})\](.*)/,
                /\[(\d{1,2}):(\d{2})\](.*)/
            ];
            
            let match = null;
            for (const pattern of timeFormats) {
                match = line.match(pattern);
                if (match) break;
            }

            if (match) {
                let minutes, seconds, milliseconds = 0;
                if (match[3] !== undefined) {
                    minutes = parseInt(match[1], 10);
                    seconds = parseInt(match[2], 10);
                    milliseconds = parseInt(match[3].padEnd(3, '0'), 10);
                } else {
                    minutes = parseInt(match[1], 10);
                    seconds = parseInt(match[2], 10);
                }
                const time = minutes * 60 + seconds + milliseconds / 1000;
                const text = match[match.length - 1].trim();
                
                if (text && text !== '//' && !text.startsWith('//')) {
                    processedLines.push({ time, text });
                    hasValidLyrics = true;
                }
            }
        });
    } else {
        hasValidLyrics = processedLines.length > 0;
    }

    if (hasValidLyrics) {
        // 排序并去重（按时间）
        const uniqueLyrics = [];
        const timeSet = new Set();
        
        processedLines
            .sort((a, b) => a.time - b.time)
            .forEach(item => {
                // 允许相同时间点的不同歌词（这种情况很少见，但可能发生）
                const key = `${item.time}-${item.text}`;
                if (!timeSet.has(key)) {
                    timeSet.add(key);
                    uniqueLyrics.push(item);
                }
            });
        
        state.lyricsData = uniqueLyrics;
        displayLyrics();
        debugLog(`解析歌词成功: ${uniqueLyrics.length} 行`);
    } else {
        // 完全没有有效时间戳：显示原始文本
        const cleanText = lyricText.trim();
        if (cleanText) {
            setLyricsContentHtml(`<div class="lyrics-plain">${cleanText.replace(/\n/g, '<br>')}</div>`);
            dom.lyrics.classList.remove("empty");
            dom.lyrics.dataset.placeholder = "default";
        } else {
            setLyricsContentHtml("<div>暂无歌词</div>");
            dom.lyrics.classList.add("empty");
            dom.lyrics.dataset.placeholder = "message";
        }
        state.lyricsData = [];
        state.currentLyricLine = -1;
        debugLog("无有效时间戳歌词，显示原始文本");
    }
}

function setLyricsContentHtml(html) {
    if (dom.lyricsContent) {
        dom.lyricsContent.innerHTML = html;
    }
    if (dom.mobileInlineLyricsContent) {
        dom.mobileInlineLyricsContent.innerHTML = html;
    }
}

function clearLyricsContent() {
    setLyricsContentHtml("");
    state.lyricsData = [];
    state.currentLyricLine = -1;
    if (isMobileView) {
        closeMobileInlineLyrics({ force: true });
    }
}

// 修复：显示歌词
function displayLyrics() {
    const lyricsHtml = state.lyricsData.map((lyric, index) => {
        // 将文本中的换行符转换为HTML换行，并保留原始格式
        const formattedText = lyric.text.replace(/\n/g, '<br>');
        return `<div data-time="${lyric.time}" data-index="${index}">${formattedText}</div>`;
    }).join("");
    
    setLyricsContentHtml(lyricsHtml);
    if (dom.lyrics) {
        dom.lyrics.dataset.placeholder = "default";
    }
    if (state.isMobileInlineLyricsOpen) {
        syncLyrics();
    }
}

// 修复：同步歌词
function syncLyrics() {
    if (state.lyricsData.length === 0) return;

    const currentTime = dom.audioPlayer.currentTime;
    let currentIndex = -1;

    for (let i = 0; i < state.lyricsData.length; i++) {
        if (currentTime >= state.lyricsData[i].time) {
            currentIndex = i;
        } else {
            break;
        }
    }

    if (currentIndex !== state.currentLyricLine) {
        state.currentLyricLine = currentIndex;

        const lyricTargets = [];
        if (dom.lyricsContent) {
            lyricTargets.push({
                elements: dom.lyricsContent.querySelectorAll("div[data-index]"),
                container: dom.lyricsScroll || dom.lyrics,
            });
        }
        if (dom.mobileInlineLyricsContent) {
            lyricTargets.push({
                elements: dom.mobileInlineLyricsContent.querySelectorAll("div[data-index]"),
                container: dom.mobileInlineLyricsScroll || dom.mobileInlineLyrics,
                inline: true,
            });
        }

        lyricTargets.forEach(({ elements, container, inline }) => {
            elements.forEach((element, index) => {
                if (index === currentIndex) {
                    element.classList.add("current");
                    const shouldScroll = !state.userScrolledLyrics && (!inline || state.isMobileInlineLyricsOpen);
                    if (shouldScroll) {
                        scrollToCurrentLyric(element, container);
                    }
                } else {
                    element.classList.remove("current");
                }
            });
        });
    }
}

// 新增：滚动到当前歌词 - 修复居中显示问题
function scrollToCurrentLyric(element, containerOverride) {
    const container = containerOverride || dom.lyricsScroll || dom.lyrics;
    if (!container || !element) {
        return;
    }
    const containerHeight = container.clientHeight;
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // 计算元素在容器内部的可视位置，避免受到 offsetParent 影响
    const elementOffsetTop = elementRect.top - containerRect.top + container.scrollTop;
    const elementHeight = elementRect.height;

    // 目标滚动位置：让当前歌词的中心与容器中心对齐
    const targetScrollTop = elementOffsetTop - (containerHeight / 2) + (elementHeight / 2);

    const maxScrollTop = container.scrollHeight - containerHeight;
    const finalScrollTop = Math.max(0, Math.min(targetScrollTop, maxScrollTop));

    if (Math.abs(container.scrollTop - finalScrollTop) > 1) {
        if (typeof container.scrollTo === "function") {
            container.scrollTo({
                top: finalScrollTop,
                behavior: 'smooth'
            });
        } else {
            container.scrollTop = finalScrollTop;
        }
    }

    debugLog(`歌词滚动: 元素在容器内偏移=${elementOffsetTop}, 容器高度=${containerHeight}, 目标滚动=${finalScrollTop}`);
}

// 修复：下载歌曲
async function downloadSong(song, quality = "320") {
    try {
        showNotification("正在准备下载...");

        const audioUrl = API.getSongUrl(song, quality);
        const audioData = await API.fetchJson(audioUrl);

        if (audioData && audioData.url) {
            const proxiedAudioUrl = buildAudioProxyUrl(audioData.url);
            const preferredAudioUrl = preferHttpsUrl(audioData.url);

            if (proxiedAudioUrl !== audioData.url) {
                debugLog(`下载链接已通过代理转换为 HTTPS: ${proxiedAudioUrl}`);
            } else if (preferredAudioUrl !== audioData.url) {
                debugLog(`下载链接由 HTTP 升级为 HTTPS: ${preferredAudioUrl}`);
            }

            const downloadUrl = proxiedAudioUrl || preferredAudioUrl || audioData.url;

            const link = document.createElement("a");
            link.href = downloadUrl;
            const preferredExtension =
                quality === "999" ? "flac" : quality === "740" ? "ape" : "mp3";
            const fileExtension = (() => {
                try {
                    const url = new URL(audioData.url);
                    const pathname = url.pathname || "";
                    const match = pathname.match(/\.([a-z0-9]+)$/i);
                    if (match) {
                        return match[1];
                    }
                } catch (error) {
                    console.warn("无法从下载链接中解析扩展名:", error);
                }
                return preferredExtension;
            })();
            link.download = `${song.name} - ${Array.isArray(song.artist) ? song.artist.join(", ") : song.artist}.${fileExtension}`;
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showNotification("下载已开始", "success");
        } else {
            throw new Error("无法获取下载地址");
        }
    } catch (error) {
        console.error("下载失败:", error);
        showNotification("下载失败，请稍后重试", "error");
    }
}

// 修复：移动端视图切换
function switchMobileView(view) {
    if (view === "playlist") {
        if (dom.showPlaylistBtn) {
            dom.showPlaylistBtn.classList.add("active");
        }
        if (dom.showLyricsBtn) {
            dom.showLyricsBtn.classList.remove("active");
        }
        dom.playlist.classList.add("active");
        dom.lyrics.classList.remove("active");
    } else if (view === "lyrics") {
        if (dom.showLyricsBtn) {
            dom.showLyricsBtn.classList.add("active");
        }
        if (dom.showPlaylistBtn) {
            dom.showPlaylistBtn.classList.remove("active");
        }
        dom.lyrics.classList.add("active");
        dom.playlist.classList.remove("active");
    }
    if (isMobileView && document.body) {
        document.body.setAttribute("data-mobile-panel-view", view);
        if (dom.mobilePanelTitle) {
            dom.mobilePanelTitle.textContent = view === "lyrics" ? "歌词" : "播放列表";
        }
        updateMobileClearPlaylistVisibility();
    }
}

// 修复：显示通知
function showNotification(message, type = "success") {
    const notification = dom.notification;
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// 新增：全局函数用于测试播放列表滚动
window.testPlaylistScroll = function() {
    debugLog("测试播放列表滚动功能");
    if (state.currentPlaylist === "playlist" && state.currentTrackIndex >= 0) {
        debugLog(`当前播放列表: ${state.currentPlaylist}, 当前歌曲索引: ${state.currentTrackIndex}`);
        scrollToCurrentPlaylistItem();
        showNotification("正在滚动到当前播放歌曲", "success");
    } else {
        debugLog("没有正在播放的歌曲或不在播放列表模式");
        showNotification("没有正在播放的歌曲或不在播放列表模式", "error");
    }
};

// 新增：确保播放列表显示时自动滚动到当前歌曲
window.ensurePlaylistScroll = function() {
    if (dom.playlist && dom.playlist.classList.contains("active")) {
        debugLog("播放列表已激活，触发自动滚动");
        setTimeout(() => {
            scrollToCurrentPlaylistItem();
        }, 150);
    }
};

// 在切换视图时确保滚动
if (typeof window.switchMobileView === "function") {
    const originalSwitchMobileView = window.switchMobileView;
    window.switchMobileView = function(view) {
        originalSwitchMobileView(view);
        if (view === "playlist") {
            debugLog("切换到播放列表视图，准备自动滚动");
            setTimeout(() => {
                scrollToCurrentPlaylistItem();
            }, 150);
        }
    };
}

// 新增：强制滚动到当前播放列表项目（用于调试）
window.forceScrollToCurrentPlaylistItem = function() {
    debugLog("强制滚动到当前播放列表项目");
    scrollToCurrentPlaylistItem();
};

// 新增：测试播放列表滚动功能
window.testPlaylistScroll = function() {
    debugLog("测试播放列表滚动功能");
    if (state.currentPlaylist === "playlist" && state.currentTrackIndex >= 0) {
        debugLog(`当前播放列表: ${state.currentPlaylist}, 当前歌曲索引: ${state.currentTrackIndex}`);
        scrollToCurrentPlaylistItem();
        showNotification("正在滚动到当前播放歌曲", "success");
    } else {
        debugLog("没有正在播放的歌曲或不在播放列表模式");
        showNotification("没有正在播放的歌曲或不在播放列表模式", "error");
    }
};

// 新增：确保播放列表显示时自动滚动到当前歌曲
window.ensurePlaylistScroll = function() {
    if (dom.playlist && dom.playlist.classList.contains("active")) {
        debugLog("播放列表已激活，触发自动滚动");
        setTimeout(() => {
            scrollToCurrentPlaylistItem();
        }, 150);
    }
};

// 在切换视图时确保滚动
const originalSwitchMobileView = window.switchMobileView;
window.switchMobileView = function(view) {
    originalSwitchMobileView(view);
    if (view === "playlist") {
        debugLog("切换到播放列表视图，准备自动滚动");
        setTimeout(() => {
            scrollToCurrentPlaylistItem();
        }, 150);
    }
};

// 新增：重置雷达偏移量
window.resetRadarOffset = function() {
    state.radarOffset = 0;
    savePlayerState();
    showNotification("雷达偏移量已重置为0", "success");
    debugLog("雷达偏移量已重置为0");
};

// 新增：获取当前雷达偏移量
window.getRadarOffset = function() {
    return state.radarOffset;
};

// 新增：设置雷达偏移量
window.setRadarOffset = function(offset) {
    const newOffset = Math.max(0, Math.min(offset, MAX_RADAR_OFFSET - 1)); // 限制在0-999之间
    state.radarOffset = newOffset;
    savePlayerState();
    showNotification(`雷达偏移量已设置为 ${newOffset}`, "success");
    debugLog(`雷达偏移量已设置为 ${newOffset}`);
};
// ==== 调试函数 ====
window.getQualityState = function() {
    return {
        playbackQuality: state.playbackQuality,
        currentQualityAttempt: state.currentQualityAttempt,
        qualityRetryCount: state.qualityRetryCount,
        isAutoQualitySwitching: state.isAutoQualitySwitching,
        playbackStuckCount: state.playbackStuckCount,
        isPlaybackStuck: state.isPlaybackStuck,
        lastPlaybackTime: state.lastPlaybackTime,
        currentPlaybackTime: dom.audioPlayer.currentTime || 0,
        isWaitingForPlayback: state.isWaitingForPlayback,
        loadStartTime: state.loadStartTime,
        loadTimeElapsed: state.isWaitingForPlayback ? Date.now() - state.loadStartTime : 0
    };
};

window.forceLoadTimeout = function() {
    if (state.currentSong && state.isWaitingForPlayback) {
        debugLog("手动触发加载超时");
        handleLoadTimeout();
    } else {
        debugLog("无法触发加载超时: 没有正在等待播放的歌曲");
    }
};

// 添加配置选项到调试函数
window.setLoadTimeout = function(timeoutMs) {
    if (timeoutMs && timeoutMs > 0) {
        state.maxLoadTime = timeoutMs;
        debugLog(`设置加载超时时间为: ${timeoutMs}ms`);
        return `加载超时时间已设置为 ${timeoutMs}ms`;
    } else {
        return `当前加载超时时间: ${state.maxLoadTime}ms`;
    }
};

// ==== 应用初始化 ====
// 替换原有的立即执行代码，改为调用initializeApp
document.addEventListener('DOMContentLoaded', initializeApp);
dom.audioPlayer.addEventListener("ended", autoPlayNext);