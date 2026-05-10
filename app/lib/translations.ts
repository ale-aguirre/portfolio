export type Lang = 'en' | 'es'

export const translations = {
  en: {
    nav: {
      work: 'Work',
      stack: 'Stack',
      contact: 'Contact',
    },
    hero: {
      stats: [
        { value: '5+', label: 'years shipping' },
        { value: '12',  label: 'projects in prod' },
        { value: '3',  label: 'autonomous agents' },
      ],
      tagline1: 'AI agentic developer building',
      taglineHighlight: 'autonomous systems',
      tagline2: ', SaaS products\nand browser experiences.',
      location: '· Argentina · Remote-first',
      ctaWork: 'View work',
      ctaContact: 'Get in touch',
    },
    projects: {
      sectionLabel: 'Selected work',
      sectionTitle: 'AI projects & agents',
      countSuffix: 'projects',
      filterAll: 'All',
      items: {
        cortex: {
          desc: 'Multi-agent orchestration dashboard. 147 autonomous agents with Chrome CDP integration, Telegram I/O, deterministic model routing.',
          detail: 'Claude Agent SDK · Chrome CDP · Telegram API · Groq intent classification · 6 scheduler jobs',
        },
        'job-hunter': {
          desc: 'Autonomous job application agent. Discovers listings, fills forms, runs QA — fully headless with Playwright + Chrome CDP.',
          detail: 'daemon → scout → apply → Nanami QA. Claude Haiku for form inference. 74 → 32 relevant listings via LLM filter.',
        },
        forgix: {
          desc: 'Browser strategy game with AI-driven NPC dialogs and real-time physics. Vertical slice: Operator League.',
          detail: 'React Three Fiber + Rapier physics · Groq SDK for in-game dialogs · Supabase realtime matchmaking',
        },
        ladymanager: {
          desc: 'Anime image generation pipeline. LLM prompt engineering → RunPod Forge serverless → Stable Diffusion XL.',
          detail: 'WAI-Illustrious-SDXL · ADetailer face inpainting · LoRA training on kohya_ss · RunPod endpoint management',
        },
        'nuggets-core': {
          desc: 'Core AI business logic layer. Semantic memory with LanceDB, Telegram bot interface, multi-agent task routing.',
          detail: 'LanceDB vector store · OpenRouter multi-model · nomic-embed-text embeddings · Node.js runtime',
        },
        saku: {
          desc: 'E-commerce for lingerie brand. Custom storefront with MercadoPago payments, product management and order tracking.',
          detail: 'Next.js + Supabase · MercadoPago integration · custom admin panel · Vercel deploy',
        },
        kitsuflow: {
          desc: 'SaaS hub for anime/AI artists. Centralizes generation tools, model management and client delivery workflows.',
          detail: 'Next.js 16 + Supabase · LadyNuggets as first client · Stripe subscriptions · RunPod integration',
        },
        docunify: {
          desc: 'Enterprise document reconciliation platform. Semantic engine detects inconsistencies and duplicates across large document sets.',
          detail: 'Private deployment for enterprise client · Railway backend + Vercel frontend · semantic similarity engine · Python + Next.js',
        },
        gr: {
          desc: 'Landing page for GR Servicios Integrales. Electrical, construction and plumbing services company in Córdoba.',
          detail: 'Next.js 14 · responsive design · Framer Motion · SEO optimized · Vercel deploy',
        },
        calibre: {
          desc: 'AI-native content production studio. Generates visual narratives for brands without physical production limits.',
          detail: 'Next.js · Framer Motion · bilingual (EN/ES) · video integration · Vercel deploy',
        },
        distribuidora: {
          desc: 'E-commerce for healthy food distributor. Products, orders and delivery management for Córdoba local market.',
          detail: 'Next.js + Supabase · MercadoPago · product catalog · admin dashboard',
        },
        cadete: {
          desc: 'Proximity delivery app demo. Three-role system: customer storefront, business panel and delivery dashboard.',
          detail: 'Next.js · multi-role routing · real-time order tracking · no-commission model',
        },
        kage: {
          desc: 'Browser RPG game: Shinobi Manager. Strategy/management game with cloud save, powered by Gemini AI.',
          detail: 'Bushido Engine v3.2 · Gemini Nano for dialogs · cloud save · demo version 0.1',
        },
        waifu: {
          desc: 'MyAiko — Waifu AI companion. Conversational assistant with personality, onboarding flow and persistent memory.',
          detail: 'Next.js · conversational AI · character persona system · mobile-first design',
        },
        'total-limpieza': {
          desc: 'Stock management system for cleaning products distributor. Inventory control, low-stock alerts and product scanning.',
          detail: 'Next.js · product CRUD · stock control by scan · low-rotation detection · Vercel deploy',
        },
        portfolio: {
          desc: 'This portfolio. Built with Next.js 16, Framer Motion animations, bilingual i18n (EN/ES), PostHog analytics and Playwright-generated project screenshots.',
          detail: 'LangContext i18n · filter system by tag · screenshot-on-hover · Vercel deploy · PostHog',
        },
      },
    },
    stack: {
      label: 'Tech stack',
      title: 'What I work with',
    },
    contact: {
      label: 'Contact',
      title1: "Let's build",
      title2: 'something.',
      body: 'Open to full-time remote roles and interesting freelance projects in AI, SaaS and frontend engineering. I respond to every message.',
      downloadCV: 'Download CV',
    },
  },

  es: {
    nav: {
      work: 'Proyectos',
      stack: 'Stack',
      contact: 'Contacto',
    },
    hero: {
      stats: [
        { value: '5+', label: 'años de experiencia' },
        { value: '12',  label: 'proyectos en prod' },
        { value: '3',  label: 'agentes autónomos' },
      ],
      tagline1: 'Desarrollador de agentes IA. Construyo',
      taglineHighlight: 'sistemas autónomos',
      tagline2: ', productos SaaS\ny experiencias browser.',
      location: '· Argentina · Remoto',
      ctaWork: 'Ver proyectos',
      ctaContact: 'Contacto',
    },
    projects: {
      sectionLabel: 'Trabajo seleccionado',
      sectionTitle: 'Proyectos IA & agentes',
      countSuffix: 'proyectos',
      filterAll: 'Todos',
      items: {
        cortex: {
          desc: 'Dashboard de orquestación multi-agente. 147 agentes autónomos con integración Chrome CDP, I/O por Telegram, enrutamiento determinístico de modelos.',
          detail: 'Claude Agent SDK · Chrome CDP · Telegram API · clasificación de intents con Groq · 6 jobs de scheduler',
        },
        'job-hunter': {
          desc: 'Agente autónomo de postulación laboral. Descubre listados, completa formularios y corre QA — totalmente headless con Playwright + Chrome CDP.',
          detail: 'daemon → scout → apply → Nanami QA. Claude Haiku para inferencia de formularios. 74 → 32 listings relevantes via filtro LLM.',
        },
        forgix: {
          desc: 'Juego de estrategia en browser con diálogos NPC por IA y física en tiempo real. Vertical slice: Operator League.',
          detail: 'React Three Fiber + Rapier physics · Groq SDK para diálogos in-game · Supabase realtime matchmaking',
        },
        ladymanager: {
          desc: 'Pipeline de generación de imágenes anime. Ingeniería de prompts LLM → RunPod Forge serverless → Stable Diffusion XL.',
          detail: 'WAI-Illustrious-SDXL · ADetailer face inpainting · entrenamiento LoRA en kohya_ss · gestión de endpoints RunPod',
        },
        'nuggets-core': {
          desc: 'Capa core de lógica de negocio con IA. Memoria semántica con LanceDB, interfaz Telegram, enrutamiento multi-agente.',
          detail: 'Vector store LanceDB · OpenRouter multi-modelo · embeddings nomic-embed-text · runtime Node.js',
        },
        saku: {
          desc: 'E-commerce para marca de lencería. Storefront propio con pagos MercadoPago, gestión de productos y seguimiento de pedidos.',
          detail: 'Next.js + Supabase · integración MercadoPago · panel admin propio · deploy en Vercel',
        },
        kitsuflow: {
          desc: 'Hub SaaS para artistas anime/IA. Centraliza herramientas de generación, gestión de modelos y entrega a clientes.',
          detail: 'Next.js 16 + Supabase · LadyNuggets como primer cliente · suscripciones Stripe · integración RunPod',
        },
        docunify: {
          desc: 'Plataforma enterprise de reconciliación de documentos. Motor semántico que detecta inconsistencias y duplicados en grandes volúmenes de documentos.',
          detail: 'Deployment privado para cliente enterprise · backend Railway + frontend Vercel · motor de similitud semántica · Python + Next.js',
        },
        gr: {
          desc: 'Landing page para GR Servicios Integrales. Empresa de electricidad, construcción y plomería en Córdoba.',
          detail: 'Next.js 14 · diseño responsive · Framer Motion · SEO optimizado · deploy en Vercel',
        },
        calibre: {
          desc: 'Estudio de producción de contenido nativo de IA. Genera narrativas visuales para marcas sin límites de producción física.',
          detail: 'Next.js · Framer Motion · bilingüe (EN/ES) · integración de video · deploy en Vercel',
        },
        distribuidora: {
          desc: 'E-commerce para distribuidora de alimentos saludables. Gestión de productos, pedidos y entregas para el mercado local de Córdoba.',
          detail: 'Next.js + Supabase · MercadoPago · catálogo de productos · panel admin',
        },
        cadete: {
          desc: 'Demo de app de delivery de proximidad. Sistema de tres roles: storefront de cliente, panel de negocio y panel de cadete.',
          detail: 'Next.js · routing multi-rol · seguimiento de pedidos en tiempo real · modelo sin comisiones',
        },
        kage: {
          desc: 'Juego RPG browser: Shinobi Manager. Juego de estrategia/gestión con guardado en la nube, potenciado por Gemini IA.',
          detail: 'Bushido Engine v3.2 · Gemini Nano para diálogos · guardado en la nube · versión demo 0.1',
        },
        waifu: {
          desc: 'MyAiko — Compañera IA waifu. Asistente conversacional con personalidad, flujo de onboarding y memoria persistente.',
          detail: 'Next.js · IA conversacional · sistema de personalidad de personaje · diseño mobile-first',
        },
        'total-limpieza': {
          desc: 'Sistema de gestión de stock para distribuidora de productos de limpieza. Control de inventario, alertas de bajo stock y escaneo de productos.',
          detail: 'Next.js · CRUD de productos · control de stock por escaneo · detección de baja rotación · deploy en Vercel',
        },
        portfolio: {
          desc: 'Este mismo portfolio. Construido con Next.js 16, animaciones Framer Motion, i18n bilingüe (EN/ES), analytics PostHog y screenshots de proyectos generados con Playwright.',
          detail: 'LangContext i18n · sistema de filtros por tag · screenshot en hover · deploy en Vercel · PostHog',
        },
      },
    },
    stack: {
      label: 'Stack técnico',
      title: 'Con qué trabajo',
    },
    contact: {
      label: 'Contacto',
      title1: 'Construyamos',
      title2: 'algo.',
      body: 'Disponible para roles remotos full-time y proyectos freelance interesantes en IA, SaaS e ingeniería frontend. Respondo todos los mensajes.',
      downloadCV: 'Descargar CV',
    },
  },
} as const
