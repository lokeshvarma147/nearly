// All content sourced from Syed Jawad Haider Rizvi's CV (Jawad Resume.pdf)

export const profile = {
  name: 'Syed Jawad Haider Rizvi',
  shortName: 'Jawad Rizvi',
  roles: ['AI Solutions Architect', 'Full-Stack Developer', 'Web Systems Engineer'],
  tagline:
    'I architect end-to-end, AI-powered platforms — turning complex business problems into intelligent, production-grade systems.',
  summary:
    'Results-driven AI Solutions Architect with 7+ years designing and delivering intelligent, scalable web systems. I evolved from a deep e-commerce and engineering background into architecting end-to-end AI platforms — integrating LLM APIs, automation pipelines, and modern full-stack technologies. I take products from concept to production, lead cross-functional teams, and translate business requirements into working software.',
  location: 'Pakistan · Remote, Worldwide',
  email: 'contact@jawadrizvi.com',
  altEmail: 'jawadhaider.jh@outlook.com',
  phone: '+92 347 0314600',
  site: 'jawadrizvi.com',
  linkedin: 'https://linkedin.com/in/syed-jawad-haider-rizvi-575341a8',
  resume: 'Jawad.pdf',
}

export const stats = [
  { value: '7+', label: 'Years Engineering' },
  { value: '200+', label: 'Sites Delivered' },
  { value: '5+', label: 'Countries Served' },
  { value: '1', label: 'Production AI Platform (Sole Architect)' },
]

export const expertise = [
  {
    title: 'AI & Intelligent Automation',
    icon: 'ai',
    blurb:
      'Designing systems where LLMs do real work — parsing, matching, deciding, and acting.',
    items: [
      'LLM Integration — Anthropic Claude, Google Gemini',
      'AI-Powered Email Parsing & Data Extraction',
      'Intelligent Product Search & Supplier Matching',
      'Gmail API / Google Workspace API',
      'n8n Workflow Automation',
      'Redis + Celery Async Task Queues',
    ],
  },
  {
    title: 'Solution Architecture',
    icon: 'arch',
    blurb:
      'End-to-end system design: data models, services, queues, and deployment pipelines.',
    items: [
      'Concept → Production System Design',
      'API & Service Architecture',
      'Database Schema Design (PostgreSQL)',
      'Async / Event-Driven Pipelines',
      'Cross-Functional Team Leadership',
      'Requirements → Working Software',
    ],
  },
  {
    title: 'Full-Stack Development',
    icon: 'code',
    blurb:
      'Modern, typed, and fast — from FastAPI backends to React/Next.js frontends.',
    items: [
      'Python — FastAPI, REST API Design',
      'React, Next.js, TypeScript',
      'PostgreSQL, Redis',
      'HTML, CSS, JavaScript, PHP',
      'WordPress Plugin & Theme Development',
      'WooCommerce Custom Extensions',
    ],
  },
  {
    title: 'Infrastructure & DevOps',
    icon: 'infra',
    blurb:
      'Shipping and running real systems on Linux VPS infrastructure with confidence.',
    items: [
      'Linux VPS — nginx, PM2, systemd',
      'AWS, Google Cloud, Hostinger VPS',
      'CI/CD Deployment Pipelines',
      'DNS, Domain & SSL Management',
      'SSH, FTP/SFTP, cPanel, WHM',
      'Performance & Security Optimization',
    ],
  },
]

export const experience = [
  {
    company: 'Besomi Electronics',
    role: 'AI Solutions Architect & Tech Lead',
    location: 'Jordan · Remote',
    period: 'Oct 2023 — Present',
    current: true,
    points: [
      'Architected and built the Kashif AI Platform — a production-grade AI procurement system using FastAPI, React/Vite, PostgreSQL, Redis/Celery, and LLM APIs (Claude & Gemini).',
      'Integrated the Gmail API to auto-ingest procurement inquiries; designed LLM prompts that extract structured client and product data from unstructured emails with high accuracy.',
      'Built an AI search engine performing per-product supplier lookups with ranked results and one-click supplier agreement.',
      'Designed the full flagging-to-quotation workflow and led a team of junior developers.',
    ],
  },
  {
    company: 'Buzznerd',
    role: 'WordPress Developer & QA Analyst',
    location: 'USA · Remote',
    period: 'Apr 2022 — Dec 2023',
    points: [
      'Led end-to-end WordPress projects: custom theme builds, plugin integration, and third-party API connections.',
      'Ran comprehensive manual QA (functional, UI, cross-browser, responsive) for production-ready deployments.',
      'Provided technical support and performed on-page SEO to improve search visibility.',
    ],
  },
  {
    company: 'p-Themes',
    role: 'WordPress / Shopify Developer & Support Specialist',
    location: 'USA · Remote',
    period: 'Mar 2020 — Mar 2022',
    points: [
      'Developed and maintained custom WordPress sites and Shopify stores for diverse clients.',
      'Built support docs and FAQ knowledge bases, reducing support ticket volume.',
      'Supervised junior developers and enforced project standards and timelines.',
    ],
  },
  {
    company: 'Logiciel House',
    role: 'Senior Web Developer',
    location: 'Pakistan · Part-Time',
    period: 'Apr 2020 — Mar 2021',
    points: [
      'Built and maintained sites with WordPress, HTML, CSS, JavaScript, and PHP.',
      'Led client discovery meetings and managed a team of web developers.',
    ],
  },
  {
    company: 'Codewage',
    role: 'Web Developer (Internship)',
    location: 'Pakistan',
    period: 'Feb 2019 — Apr 2019',
    points: [
      'Built foundational skills in WordPress, HTML, CSS, JavaScript, and version control on live client projects.',
    ],
  },
]

export const projects = [
  {
    name: 'Kashif AI Procurement Platform',
    tag: 'Flagship · AI System',
    link: 'kashif.besomi.com',
    desc:
      'End-to-end AI-powered procurement system. Integrates Anthropic Claude and Google Gemini for intelligent email parsing, automated product-supplier matching, and quotation generation.',
    stack: ['FastAPI', 'React', 'PostgreSQL', 'Redis/Celery', 'Claude', 'Gemini'],
    featured: true,
  },
  {
    name: 'Besomi AI Chatbot',
    tag: 'AI Agent · Magento',
    link: 'besomi.com',
    desc:
      'An AI shopping assistant embedded in the Besomi Magento store. Detects intent and, when a customer describes a project (e.g. a "line follower robot"), uses an LLM to break it into a components list — then maps each part to real catalog products via the Magento REST API, showing what is in stock vs missing, with email/WhatsApp human handoff.',
    stack: ['LLM (OpenRouter)', 'PHP Proxy', 'Magento REST API', 'JS Widget'],
  },
  {
    name: 'ROP Procurement Plugin',
    tag: 'WordPress · WooCommerce',
    link: 'rop.besomi.com',
    desc:
      'Custom WooCommerce procurement plugin with AJAX scraper proxy, custom user roles, automated email workflows, cart token management, and a full admin interface. Live in production.',
    stack: ['WordPress', 'WooCommerce', 'PHP', 'AJAX'],
  },
  {
    name: 'Besomi B2B Marketplace',
    tag: 'E-Commerce · Platform',
    link: 'besomi.com',
    desc:
      'Global B2B marketplace for electronic components — microprocessors, batteries, PCBs — built on WordPress/WooCommerce with custom integrations.',
    stack: ['WooCommerce', 'Custom Integrations', 'SEO'],
  },
  {
    name: 'E-Commerce Portfolio',
    tag: '200+ Sites · 5+ Countries',
    link: null,
    desc:
      'Delivered 200+ WordPress, Shopify, and Magento websites across automotive, healthcare, logistics, and retail for clients in the USA, UK, UAE, and Australia.',
    stack: ['WordPress', 'Shopify', 'Magento 2'],
  },
]

export const achievements = [
  'Designed and shipped a full production AI platform (Kashif) as sole architect and developer — automating procurement workflows with Claude and Gemini.',
  'Built and deployed a custom WooCommerce procurement plugin (ROP) from scratch, now live supporting a real business team.',
  'Delivered 200+ websites across WordPress, Shopify, and Magento for clients in 5+ countries.',
  'Reduced support ticket resolution time by 30% through Zendesk optimization and structured knowledge bases.',
  'Managed end-to-end infrastructure for multi-service AI applications — backend APIs, task queues, frontend builds, and VPS pipelines.',
]

export const education = [
  { degree: 'M.Sc. — Information Technology', school: 'University of Central Punjab', year: '2018' },
  { degree: 'Associate Degree — Information Technology', school: 'University of Central Punjab', year: '2016' },
]
