export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  category: string;
  image: string;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "山川之间的静谧时光",
    excerpt: "在高山与云层之间，我找到了内心深处的宁静。日落时分，金色的光芒洒满大地，仿佛时间都静止了。",
    content: `
# 山川之间的静谧时光

当第一缕阳光穿透云层，映照在远处的山峰上时，我意识到，美好总是在不经意间降临。

## 日落的馈赠

日落时分，整个山谷都沐浴在金色的光芒中。这种美景让人不由自主地放慢脚步，静静地欣赏大自然的馈赠。每一个瞬间都值得被珍藏，每一次呼吸都充满了自然的气息。

## 内心的宁静

在城市的喧嚣中待久了，总是渴望这样的时刻——只有天空、山川和自己。没有任何打扰，只有内心的声音在回响。这种宁静，是现代人最奢侈的享受。

*"真正的旅行，是一次内心的回归。"*
    `,
    date: "2026年1月25日",
    read_time: "5分钟",
    category: "旅行",
    image: "https://images.unsplash.com/photo-1643559247329-7254c71646f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHN1bnNldHxlbnwxfHx8fDE3Njk0ODI3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "2",
    title: "咖啡与书香的午后",
    excerpt: "一杯咖啡，一本好书，窗外的阳光正好。这个午后，时光仿佛变得格外温柔。",
    content: `
# 咖啡与书香的午后

午后的咖啡馆，总是弥漫着一种特别的气息——混合着咖啡的香气和书页的味道。

## 慢生活的艺术

在快节奏的都市生活中，能够静下心来读一本书，品一杯咖啡，已经成为一种奢侈。但这种慢下来的时光，恰恰是滋养灵魂最好的方式。

## 书中的世界

每一本书都是一扇通往新世界的门。当你翻开书页的那一刻，就开始了一段新的旅程。文字的力量，在于它能带我们去任何想去的地方。

*"读书，是灵魂最美的旅行。"*
    `,
    date: "2026年1月22日",
    read_time: "4分钟",
    category: "生活",
    image: "https://images.unsplash.com/photo-1707142979946-a745d1d0092c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3Njk0OTQ3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "3",
    title: "写作的温度",
    excerpt: "敲击键盘的声音，是思想流淌的音符。每一个字符，都承载着表达的渴望。",
    content: `
# 写作的温度

在数字时代，打字机已经成为一种怀旧的象征。但那种机械敲击的声音，依然让人心生向往。

## 文字的力量

写作不仅仅是记录，更是一种思考和表达的方式。当思绪通过指尖流淌到纸上（或屏幕上），我们就完成了一次与自己的对话。

## 表达的勇气

写作需要勇气——不仅是把想法写下来的勇气，更是将内心展现给世界的勇气。每一篇文章，都是作者灵魂的一部分。

*"写作，是最真诚的自我表达。"*
    `,
    date: "2026年1月20日",
    read_time: "6分钟",
    category: "思考",
    image: "https://images.unsplash.com/photo-1766128209231-ce21cfc9aca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHlwZXdyaXRlciUyMHdyaXRpbmd8ZW58MXx8fHwxNzY5NTA1MDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "4",
    title: "极简主义的美学",
    excerpt: "少即是多。在简约的空间里，找到生活的本质。",
    content: `
# 极简主义的美学

在物质丰盈的时代，极简主义教会我们如何做减法。

## 空间的留白

就像绘画中的留白一样，生活空间的简约能让心灵得到更好的舒展。每一件物品都应该有其存在的理由，每一个角落都值得被好好对待。

## 本质的追求

极简不是贫乏，而是对本质的追求。当我们学会放下不必要的东西，才能更清楚地看到真正重要的是什么。

*"简单，才是最高级的复杂。"*
    `,
    date: "2026年1月18日",
    read_time: "5分钟",
    category: "美学",
    image: "https://images.unsplash.com/photo-1644337540803-2b2fb3cebf12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlJTIwZGVza3xlbnwxfHx8fDE3Njk0NzQ1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "5",
    title: "秋日私语",
    excerpt: "落叶飘零的季节，是大自然最诗意的时刻。每一片叶子，都在讲述着生命的故事。",
    content: `
# 秋日私语

秋天是一个充满诗意的季节。当树叶从绿色渐变为金黄、橙红，整个世界仿佛都在上演一场色彩的盛宴。

## 落叶的哲学

每一片落叶都曾是枝头的绿意，如今化作泥土的养分。这种循环往复，是大自然最深刻的哲学。生命的意义，不在于永恒，而在于每一个当下的绽放。

## 季节的变换

四季更迭，是时间最温柔的提醒。秋天告诉我们，放下也是一种智慧，结束也是新的开始。

*"秋天教会我们如何优雅地告别。"*
    `,
    date: "2026年1月15日",
    read_time: "4分钟",
    category: "自然",
    image: "https://images.unsplash.com/photo-1694100381966-5cf52917d452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBmb3Jlc3QlMjBwYXRofGVufDF8fHx8MTc2OTQ5MDgzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "6",
    title: "书架上的时光",
    excerpt: "每一本书都是一段记忆，每一个书架都是一座时光的博物馆。",
    content: `
# 书架上的时光

走进一家老书店，空气中弥漫着纸张和墨水的气味。那是知识沉淀的味道，也是时光流转的印记。

## 阅读的记忆

每一本书都承载着阅读时的记忆——也许是某个雨天的午后，也许是失眠的深夜。当我们再次翻开这些书，那些记忆也随之涌现。

## 书的生命

一本书的生命，不仅在于它被创作的那一刻，更在于每一次被阅读、被思考、被讨论。好的书，会在不同的时期给我们不同的感悟。

*"书籍是人类进步的阶梯，也是心灵栖息的港湾。"*
    `,
    date: "2026年1月12日",
    read_time: "5分钟",
    category: "阅读",
    image: "https://images.unsplash.com/photo-1639414839074-51d49728c748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwbGlicmFyeSUyMGJvb2tzfGVufDF8fHx8MTc2OTUxNzI5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];
