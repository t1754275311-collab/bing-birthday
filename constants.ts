import { DropItemType, DropItemConfig } from './types';

// ==========================================
// REPLACE THESE URLS WITH YOUR REAL IMAGES
// ==========================================
export const ASSETS = {
  // 图1：【首屏主图·本人出镜】—— 赛博审判长
  // IMPORTANT: Save the image you provided as "judge.png" in your project root/public folder
  heroImage: "./judge.png", 
  // 图2：【背景素材·纯环境】—— 未名湖·数据池
  glassContainerBg: "https://picsum.photos/800/1200?blur=5", 
  // 图4：【分隔插图·纯环境】—— 逻辑粉碎机
  shredderBg: "https://picsum.photos/1920/1080?grayscale",
  // 图5：【页脚配图·本人出镜】—— 真实的战友
  outroImage: "https://picsum.photos/600/800",
};

export const DROP_ITEMS: Record<DropItemType, DropItemConfig> = {
  [DropItemType.LOGIC]: {
    type: DropItemType.LOGIC,
    label: "排期优先", 
    color: "bg-amber-400", 
    shadowColor: "shadow-amber-600",
    message: "斌哥的需求优先级最高",
    soundType: 'coin',
    drops: [
      { emoji: "🥇", count: 1 } // Gold Medal
    ]
  },
  [DropItemType.DEMAND]: {
    type: DropItemType.DEMAND,
    label: "研发独宠",
    color: "bg-red-500", 
    shadowColor: "shadow-red-800",
    message: "斌哥说的需求我们都能实现",
    soundType: 'bounce', // Changed to bounce for hearts
    drops: [
      { emoji: "❤️", count: 1 } // Heart
    ]
  },
  [DropItemType.HAIR]: {
    type: DropItemType.HAIR,
    label: "海量植发",
    color: "bg-slate-800", 
    shadowColor: "shadow-slate-950",
    message: "保住发际线，就是保住夸克的未来！",
    soundType: 'bounce',
    drops: [
      { emoji: "⚫", count: 8 } // Massive hairballs
    ]
  },
  [DropItemType.LOVE]: {
    type: DropItemType.LOVE,
    label: "颜值正义",
    color: "bg-pink-400", 
    shadowColor: "shadow-pink-700",
    message: "夸克颜王，生日快乐",
    soundType: 'coin',
    drops: [
      { emoji: "🥤", count: 1 }, // Milk Tea
      { emoji: "❤️", count: 1 }  // Heart
    ]
  }
};

export const TEXT_CONTENT = {
  hero: {
    title: "夸克最高法 · 开庭",
    subtitle: "", // Removed as requested
    name: "审判长：斌哥",
    codename: "代号：法律系最强 AI 产品操盘手",
    status: "当前状态：年龄版本更新中..."
  },
  physics: {
    caseNumber: "案号 1204：关于斌哥生日资源分配的紧急仲裁",
    instruction: "“陪审团请注意，本庭急需以下战略物资，请研发、测试、设计组同学火速提交。”"
  },
  jury: {
    title: "陪审团合议 · 现场记录",
    subtitle: "庭现开放自由辩论环节。请各位陪审员（同事）就“寿星是否最帅”、“表达对他的爱”等重大议题，发表您的关键证词。",
    placeholderName: "代号 (可选)",
    placeholderContent: "请输入您的生日祝福...",
    submitBtn: "提交证词",
    initialTestimonies: [
      { name: "隔壁竞对", content: "膜拜大佬" },
      { name: "设计组卧底", content: "关于“颜值第一”的指控，我方表示...完全同意！生日快乐！" },
      { name: "后端开发", content: "需求改得再多，也是为了世界的爱与和平（只要不回滚代码就行）。" }
    ]
  },
  rules: {
    title: "夸克基本法 · 斌哥生日特赦令",
    cards: [
      {
        title: "法案一：需求善变豁免权",
        content: "【今日裁决】：本庭特别批准：今日他的每一次需求变更，均被法律定义为“追求完美的产品精神”，研发团队需配合演出，不仅不能拔刀，还需回以微笑（仅限今日）。"
      },
      {
        title: "法案二：时间膨胀合法化",
        content: "【今日裁决】：授予斌哥“时间领主”称号。当他说出“尽快上线这个功能”时，依据夸克生日法，我们假装听懂了其中包含的战略价值。但如果今晚要请客吃饭，我们可以考虑让他体验一下什么叫“光速上线”。"
      },
      {
        title: "法案三：以用户之名辩护法",
        content: "【今日裁决】：驳回所有研发侧的“无法实现”抗辩。即日起，斌哥指哪，我们就打哪。哪怕他说要用 AI 给手机壳贴膜，我们也要承认：这肯定也是为了那个 0.01% 的高端用户体验！ 寿星永远是对的！"
      }
    ]
  },
  outro: {
    title: "庭审结束 · 结案陈词",
    paragraphs: [
      "案件裁定如下：",
      "你是我们见过的，最懂法的 AI 探索者，",
      "也是最懂 AI 的逻辑守护者。",
      "感谢你，用法律人的严谨，",
      "给那些天马行空的想法筑起了地基；",
      "感谢你，在每一个需求评审的午后，",
      "和我们一起死磕每一个细节。",
      "代码会迭代，产品会更新，",
      "但那些并肩作战的日子，将作为永久数据封存。",
      "愿你在新的一岁里：",
      "需求不迷茫，发量不彷徨。"
    ],
    signature: "斌哥，生日快乐！",
    from: "—— 夸克全体成员 敬上"
  }
};