export const translations = {
  zh: {
    // Navbar
    home: "首页",
    about: "关于",
    search: "搜索",
    toggleTheme: "切换主题",

    // Home
    articles: "篇文章",
    heart: "用心创作",
    continue: "持续更新",
    featured: "精选文章",
    moreArticles: "更多文章",
    filterResults: "筛选结果",
    categoryFilter: "分类筛选",
    tagFilter: "标签筛选",
    all: "全部",
    clearFilter: "清除筛选",
    found: "找到",
    articlesFound: "篇文章",
    gridView: "网格模式",
    listView: "列表模式",

    // Article
    back: "返回",
    likes: "喜欢",
    bookmark: "收藏",
    share: "分享",
    copyLink: "链接已复制到剪贴板",
    words: "字",
    readMore: "阅读全文",
    previousArticle: "上一篇",
    nextArticle: "下一篇",
    relatedArticles: "相关文章",
    thankReading: "感谢阅读，希望这篇文章能给你带来启发",
    viewMoreArticles: "看更多文章",

    // Comments
    comments: "评论",
    publishComment: "发布评论",
    nickname: "署名",
    nicknamePlaceholder: "您的署名（必填）",
    commentPlaceholder: "分享你的想法...",
    reply: "回复",
    cancelReply: "取消回复",
    submitReply: "发布回复",
    like: "赞",
    delete: "删除",
    noComments: "还没有评论",
    beFirst: "成为第一个评论者",
    postAs: "发布为",

    // Search
    searchPlaceholder: "搜索文章...",
    noResults: "未找到相关文章",
    typeToSearch: "输入关键词开始搜索",

    // Categories & Tags
    categories: "分类",
    tags: "标签",
    recentArticles: "最新文章",

    // About
    bio: "个人简介",
    skills: "技能",
    timeline: "历程",
    contact: "联系方式",
    email: "邮箱",

    // Portfolio
    portfolio: "作品集",
    projectName: "项目名称",
    projectDesc: "项目描述",
    techStack: "技术栈",
    viewProject: "查看项目",
    sourceCode: "源码",

    // Donation
    donate: "打赏",
    donateTitle: "喜欢这篇文章？",
    donateDesc: "如果我的内容对你有帮助，可以请我喝杯咖啡 ☕",
    thankYou: "感谢支持！",

    // Archive
    archive: "归档",
    articlesByMonth: "文章按月归档",

    // Common
    loading: "加载中...",
    noArticles: "暂无文章",
    createInSupabase: "请先在 Supabase 中创建文章数据",
  },
  en: {
    // Navbar
    home: "Home",
    about: "About",
    search: "Search",
    toggleTheme: "Toggle theme",

    // Home
    articles: " articles",
    heart: "Heartfelt",
    continue: "Updating",
    featured: "Featured",
    moreArticles: "More Articles",
    filterResults: "Filter Results",
    categoryFilter: "Category",
    tagFilter: "Tags",
    all: "All",
    clearFilter: "Clear Filter",
    found: "Found",
    articlesFound: " articles",
    gridView: "Grid View",
    listView: "List View",

    // Article
    back: "Back",
    likes: "Like",
    bookmark: "Bookmark",
    share: "Share",
    copyLink: "Link copied to clipboard",
    words: "words",
    readMore: "Read More",
    previousArticle: "Previous",
    nextArticle: "Next",
    relatedArticles: "Related Articles",
    thankReading: "Thanks for reading, hope this article inspires you",
    viewMoreArticles: "View More Articles",

    // Comments
    comments: "Comments",
    publishComment: "Post Comment",
    nickname: "Name",
    nicknamePlaceholder: "Your name (required)",
    commentPlaceholder: "Share your thoughts...",
    reply: "Reply",
    cancelReply: "Cancel",
    submitReply: "Reply",
    like: "Like",
    delete: "Delete",
    noComments: "No comments yet",
    beFirst: "Be the first to comment",
    postAs: "Post as",

    // Search
    searchPlaceholder: "Search articles...",
    noResults: "No articles found",
    typeToSearch: "Type to search",

    // Categories & Tags
    categories: "Categories",
    tags: "Tags",
    recentArticles: "Recent Articles",

    // About
    bio: "Biography",
    skills: "Skills",
    timeline: "Timeline",
    contact: "Contact",
    email: "Email",

    // Portfolio
    portfolio: "Portfolio",
    projectName: "Project Name",
    projectDesc: "Description",
    techStack: "Tech Stack",
    viewProject: "View Project",
    sourceCode: "Source Code",

    // Donation
    donate: "Donate",
    donateTitle: "Enjoyed this article?",
    donateDesc: "If my content helped you, buy me a coffee ☕",
    thankYou: "Thank you for your support!",

    // Archive
    archive: "Archive",
    articlesByMonth: "Articles by Month",

    // Common
    loading: "Loading...",
    noArticles: "No articles",
    createInSupabase: "Please create article data in Supabase first",
  }
};

export type Language = 'zh' | 'en';
export type TranslationKey = keyof typeof translations.zh;
