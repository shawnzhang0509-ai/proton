export type Lang = 'en' | 'zh';

export const translations = {
  nav: {
    brand: { en: 'PROTON', zh: '质子' },
    services: { en: 'Services', zh: '服务' },
    process: { en: 'Process', zh: '流程' },
    clients: { en: 'Clients', zh: '客户' },
    pricing: { en: 'Pricing', zh: '方案' },
    contact: { en: 'Contact', zh: '联系' },
    cta: { en: 'Get Started', zh: '开始咨询' },
  },
  hero: {
    headline1: { en: 'Where Ideas Become Systems', zh: '让想法成为系统' },
    subtitle: { en: 'NZ Digital Studio', zh: '新西兰数字化工作室' },
    cta: { en: 'Explore Services', zh: '探索服务' },
  },
  services: {
    label: { en: 'SERVICES', zh: '服务' },
    headline: { en: 'From Tool Stack to System Architecture', zh: '从工具堆到系统架构' },
    body: {
      en: 'Most SMEs are trapped in a patchwork of tools. We help you consolidate data, automate workflows, and build truly scalable digital infrastructure.',
      zh: '大多数中小企业被困在拼凑的工具里：微信群聊客户、Excel 管理库存、手动记账。我们帮助您整合数据、自动化流程、建立真正可扩展的数字化基础设施。',
    },
    cta: { en: 'See Our Process', zh: '了解完整流程' },
    items: [
      {
        title: { en: 'Digital Audit', zh: '数字化诊断' },
        desc: { en: 'Map existing tools and data flows', zh: '梳理现有工具与数据流' },
      },
      {
        title: { en: 'System Integration', zh: '系统整合' },
        desc: { en: 'Connect APIs, eliminate silos', zh: '打通 API，消除信息孤岛' },
      },
      {
        title: { en: 'AI Enhancement', zh: '智能升级' },
        desc: { en: 'Embed AI, continuously optimize', zh: '嵌入 AI 能力，持续优化' },
      },
    ],
  },
  process: {
    label: { en: 'PROCESS', zh: '流程' },
    headline: { en: 'Four Steps to Transformation', zh: '四步完成转型' },
    steps: [
      {
        num: '01',
        title: { en: 'Discover', zh: '发现' },
        desc: { en: 'Deep dive into current operations and pain points', zh: '深入了解业务现状与痛点' },
      },
      {
        num: '02',
        title: { en: 'Design', zh: '设计' },
        desc: { en: 'Architect the system and integration plan', zh: '制定系统架构与整合方案' },
      },
      {
        num: '03',
        title: { en: 'Deliver', zh: '交付' },
        desc: { en: 'Deploy and train your team', zh: '实施部署并培训团队' },
      },
      {
        num: '04',
        title: { en: 'Optimize', zh: '优化' },
        desc: { en: 'Continuous monitoring and AI-driven optimization', zh: '持续监控、迭代与 AI 升级' },
      },
    ],
  },
  clients: {
    label: { en: 'CLIENTS', zh: '客户' },
    headline: { en: 'Industries We Serve', zh: '我们服务的行业' },
    cards: [
      {
        title: { en: 'E-commerce & Retail', zh: '电商与零售' },
        desc: { en: 'Inventory and multi-channel order integration', zh: '库存管理与多渠道订单整合' },
      },
      {
        title: { en: 'EdTech', zh: '教育科技' },
        desc: { en: 'Student data and course automation', zh: '学生数据与课程自动化' },
      },
      {
        title: { en: 'Local Services', zh: '本地服务' },
        desc: { en: 'Booking systems and CRM', zh: '预约系统与客户关系管理' },
      },
      {
        title: { en: 'Professional Services', zh: '专业咨询' },
        desc: { en: 'Document automation and knowledge management', zh: '文档自动化与知识管理' },
      },
    ],
  },
  caseStudy: {
    label: { en: 'IMPACT', zh: '案例' },
    headline: { en: 'From 12 Tools to 1 System', zh: '从 12 个工具到 1 个系统' },
    body: {
      en: 'We consolidated student data, course management, and finance systems across five platforms for an Auckland educational institution, reducing operational costs by 40% and admin time by 60%.',
      zh: '我们为一家奥克兰的教育机构整合了分散在五个平台上的学生数据、课程管理和财务系统，将运营成本降低 40%，行政时间减少 60%。',
    },
    stats: [
      { value: '40%', label: { en: 'Cost Reduction', zh: '成本降低' } },
      { value: '60%', label: { en: 'Time Saved', zh: '时间节省' } },
      { value: '5\u21921', label: { en: 'Platforms Unified', zh: '平台整合' } },
    ],
  },
  pricing: {
    label: { en: 'PLANS', zh: '方案' },
    headline: { en: 'Transparent Pricing, Flexible Plans', zh: '透明定价，按需选择' },
    plans: [
      {
        name: { en: 'Starter', zh: '起步' },
        price: '$2,500 NZD',
        desc: { en: 'For targeted fixes', zh: '适合单点突破' },
        features: [
          { en: '1 core integration', zh: '1 个核心系统整合' },
          { en: 'Data migration', zh: '数据迁移支持' },
          { en: '2-week delivery', zh: '2 周交付' },
        ],
        cta: { en: 'Choose Plan', zh: '选择方案' },
      },
      {
        name: { en: 'Growth', zh: '成长' },
        price: '$6,500 NZD',
        desc: { en: 'For system overhaul', zh: '适合系统重构' },
        recommended: true,
        features: [
          { en: 'Full platform integration', zh: '全平台整合' },
          { en: 'Automated workflows', zh: '自动化工作流' },
          { en: 'AI module', zh: 'AI 模块接入' },
          { en: '4-week delivery', zh: '4 周交付' },
          { en: '3-month support', zh: '3 个月支持' },
        ],
        cta: { en: 'Choose Plan', zh: '选择方案' },
      },
      {
        name: { en: 'Enterprise', zh: '企业' },
        price: { en: 'Custom', zh: '定制报价' },
        desc: { en: 'For deep transformation', zh: '适合深度转型' },
        features: [
          { en: 'Custom architecture', zh: '定制化架构' },
          { en: 'Dedicated AI models', zh: '专属 AI 模型' },
          { en: 'Continuous optimization', zh: '持续优化服务' },
          { en: 'Priority support', zh: '优先支持' },
        ],
        cta: { en: 'Contact Us', zh: '联系我们' },
      },
    ],
  },
  footer: {
    headline: { en: 'Ready to Transform?', zh: '准备好开始了吗？' },
    sub: {
      en: 'Book a free consultation to explore your digital opportunities',
      zh: '预约一次免费咨询，了解您的数字化机会',
    },
    email: 'hello@protondigital.co.nz',
    phone: '+64 9 000 0000',
    location: { en: 'Auckland, New Zealand', zh: '新西兰奥克兰' },
    cta: { en: 'Book a Call', zh: '预约咨询' },
    copyright: { en: '2025 Proton Digital. All rights reserved.', zh: '2025 Proton Digital. 保留所有权利。' },
    privacy: { en: 'Privacy', zh: '隐私' },
    terms: { en: 'Terms', zh: '条款' },
  },
} as const;
