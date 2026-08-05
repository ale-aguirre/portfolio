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
        { value: '316', label: 'applications sent by agents' },
        { value: '85k', label: 'lines of TypeScript in prod' },
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
          desc: 'Multi-agent orchestration dashboard. Work is classified by an LLM, routed by deterministic config, and held at a human approval gate before anything executes.',
          detail: 'Claude Agent SDK · Chrome CDP · Telegram API · Groq intent classification · 6 scheduler jobs',
        },
        'intent-gate': {
          desc: 'Open-source library for the part of an agent that must not be improvised: an LLM picks one of a known set of domains, and everything downstream comes from config it never sees.',
          detail: 'A prompt injection in the input cannot name a handler that does not exist, and cannot waive a human approval. Zero dependencies.',
        },
        skuscribe: {
          desc: 'B2B SaaS that generates e-commerce product listings for Amazon and Etsy from an LLM pipeline, with per-marketplace constraints validated before anything is shown.',
          detail: 'Auth, subscription tiers, Stripe billing and row level security. Built solo, front to back.',
        },
        'job-hunter': {
          desc: 'Autonomous job application agent. Discovers listings, fills forms, runs QA — fully headless with Playwright + Chrome CDP.',
          detail: '17 job board APIs · CV tailored per posting against a fact registry · QA auditor pauses a worker after 3 failures and resumes it on a clean cycle.',
        },
        forgix: {
          desc: 'Browser strategy game with AI-driven NPC dialogs and real-time physics. Vertical slice: Operator League.',
          detail: 'React Three Fiber + Rapier physics · Groq SDK for in-game dialogs · Supabase realtime matchmaking',
        },
        docunify: {
          desc: 'Enterprise document reconciliation platform. Semantic engine detects inconsistencies and duplicates across large document sets.',
          detail: 'Private deployment for enterprise client · Railway backend + Vercel frontend · semantic similarity engine · Python + Next.js',
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
        { value: '316', label: 'aplicaciones enviadas por agentes' },
        { value: '85k', label: 'líneas de TypeScript en prod' },
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
          desc: 'Dashboard de orquestación multi-agente. Un LLM clasifica el pedido, la config determinística decide qué corre, y hay un gate de aprobación humana antes de ejecutar.',
          detail: 'Claude Agent SDK · Chrome CDP · Telegram API · clasificación de intents con Groq · 6 jobs de scheduler',
        },
        'intent-gate': {
          desc: 'Librería open source para la parte de un agente que no se puede improvisar: el LLM elige uno de varios dominios conocidos y todo lo que sigue sale de config que el modelo nunca ve.',
          detail: 'Una inyección en la entrada no puede nombrar un handler inexistente ni saltarse una aprobación humana. Cero dependencias.',
        },
        skuscribe: {
          desc: 'SaaS B2B que genera listings de e-commerce para Amazon y Etsy con un pipeline de LLM, validando los límites de cada marketplace antes de mostrar nada.',
          detail: 'Auth, planes de suscripción, cobros con Stripe y aislamiento por usuario. Construido solo, de punta a punta.',
        },
        'job-hunter': {
          desc: 'Agente autónomo de postulación laboral. Descubre listados, completa formularios y corre QA — totalmente headless con Playwright + Chrome CDP.',
          detail: '17 APIs de job boards · CV adaptado por oferta contra un registro de hechos · el auditor QA pausa un worker tras 3 fallos y lo reanuda en un ciclo limpio.',
        },
        forgix: {
          desc: 'Juego de estrategia en browser con diálogos NPC por IA y física en tiempo real. Vertical slice: Operator League.',
          detail: 'React Three Fiber + Rapier physics · Groq SDK para diálogos in-game · Supabase realtime matchmaking',
        },
        docunify: {
          desc: 'Plataforma enterprise de reconciliación de documentos. Motor semántico que detecta inconsistencias y duplicados en grandes volúmenes de documentos.',
          detail: 'Deployment privado para cliente enterprise · backend Railway + frontend Vercel · motor de similitud semántica · Python + Next.js',
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
