import type { CaseStudy } from '../components/CaseStudyModal'

export const caseStudies: Record<string, CaseStudy> = {
  docunify: {
    client: 'Fumiscor S.A. ← Famma Automotive S.A.',
    industry: {
      en: 'Automotive quality (IATF 16949 / ISO 9001)',
      es: 'Calidad automotriz (IATF 16949 / ISO 9001)',
    },
    tagline: {
      en: 'AI-driven document unification for an enterprise M&A',
      es: 'Unificación de documentación con IA tras una adquisición enterprise',
    },
    challenge: {
      en: 'M&A merging two ISO/IATF-certified quality systems by hand: weeks of cross-checking on the quality manager.',
      es: 'Fusión M&A de dos sistemas de calidad certificados ISO/IATF a mano: semanas de revisión en el responsable de calidad.',
    },
    solution: {
      en: 'AI handles ingest, pairing, and per-section comparison grounded in the actual standards. Humans only review what differs.',
      es: 'La IA hace ingest, emparejamiento y comparación sección por sección con RAG sobre las normas reales. El humano solo revisa lo que difiere.',
    },
    heroSplit: {
      left: { value: '99%', label: { en: 'AI handles', es: 'Lo resuelve la IA' } },
      right: { value: '1%', label: { en: 'Human reviews', es: 'Revisa el humano' } },
      ratio: 0.99,
    },
    beforeAfter: {
      before: {
        title: { en: 'Pre-merger reality', es: 'Realidad pre-fusión' },
        items: [
          { en: 'Two parallel quality systems (IATF 16949 + ISO 9001)', es: 'Dos sistemas de calidad paralelos (IATF 16949 + ISO 9001)' },
          { en: 'Hundreds of duplicate procedures and records', es: 'Cientos de procedimientos y registros duplicados' },
          { en: 'Manual cross-check bottlenecked on one quality manager', es: 'Cross-check manual cuello de botella en un solo responsable' },
          { en: 'Weeks of timeline at risk of breaking certification', es: 'Semanas de timeline con riesgo de perder certificación' },
        ],
      },
      after: {
        title: { en: 'With DocUnify', es: 'Con DocUnify' },
        items: [
          { en: 'Single unified DOCX per procedure pair', es: 'Un solo DOCX unificado por par de procedimientos' },
          { en: 'Every decision cited against the real standard', es: 'Cada decisión citada contra la norma real' },
          { en: 'Supervisor only touches flagged diffs', es: 'El supervisor solo toca los diffs marcados' },
          { en: 'Hours instead of weeks — certification preserved', es: 'Horas en vez de semanas — certificación preservada' },
        ],
      },
    },
    pipeline: [
      {
        step: 'Ingest',
        desc: {
          en: 'Scans both document trees and registers them in SQLite. Supports .docx, .doc, .xlsx, .pdf, .txt.',
          es: 'Escanea los dos árboles de documentos y los registra en SQLite. Soporta .docx, .doc, .xlsx, .pdf, .txt.',
        },
      },
      {
        step: 'Extract',
        desc: {
          en: 'Pulls text and headings with python-docx, antiword and pdfplumber so matching can work at section level.',
          es: 'Extrae texto y headings con python-docx, antiword y pdfplumber para poder matchear a nivel sección.',
        },
      },
      {
        step: 'Match',
        desc: {
          en: 'TF-IDF cosine similarity pairs equivalent docs across companies; bipartite matching prevents duplicate pairings.',
          es: 'Cosine similarity TF-IDF empareja docs equivalentes entre empresas; bipartite matching evita pares duplicados.',
        },
      },
      {
        step: 'Compare',
        desc: {
          en: 'Groq Llama 3.3 70B compares each pair section by section with a RAG over the real IATF/ISO standard.',
          es: 'Groq Llama 3.3 70B compara cada par sección por sección con RAG sobre las normas IATF/ISO reales.',
        },
      },
      {
        step: 'Generate',
        desc: {
          en: 'Builds the unified DOCX with color-coded diffs so the supervisor audits the AI\'s choices visually.',
          es: 'Construye el DOCX unificado con diffs por color para que el supervisor audite las elecciones de la IA visualmente.',
        },
      },
    ],
    metrics: [
      {
        value: '99% / 1%',
        label: {
          en: 'AI-handled vs human-reviewed',
          es: 'IA automático vs revisado humano',
        },
      },
      {
        value: 'weeks → hours',
        label: {
          en: 'Manual review cycle compressed',
          es: 'Ciclo de revisión manual comprimido',
        },
      },
      {
        value: 'IATF + ISO',
        label: {
          en: 'Standards grounded via RAG',
          es: 'Normas aterrizadas vía RAG',
        },
      },
      {
        value: '5 stages',
        label: {
          en: 'End-to-end pipeline (ingest → generate)',
          es: 'Pipeline end-to-end (ingest → generate)',
        },
      },
    ],
    stackGrouped: [
      {
        label: { en: 'Backend', es: 'Backend' },
        items: ['Python', 'Flask', 'SQLite'],
      },
      {
        label: { en: 'AI / RAG', es: 'IA / RAG' },
        items: ['Groq (Llama 3.3 70B)', 'ChromaDB', 'sentence-transformers'],
      },
      {
        label: { en: 'Frontend', es: 'Frontend' },
        items: ['Next.js 16', 'React 19', 'Tailwind', 'mammoth (DOCX render)'],
      },
      {
        label: { en: 'Infra', es: 'Infra' },
        items: ['Railway (backend)', 'Vercel (frontend)', 'private deploy'],
      },
    ],
    learnings: {
      en: [
        'Cite the standard on every LLM call — supervisors trust output backed by the norm, not raw text.',
        'TF-IDF as a cheap pre-pass: the LLM only sees viable pairs, never the cross-product.',
        'temperature=0 for compliance — reproducibility beats creativity in a quality doc.',
        'Render diffs in the real DOCX — adoption depends on visual review, not JSON.',
        'Bipartite matching killed a silent bug where two A docs both stole the same B doc.',
      ],
      es: [
        'Citar la norma en cada llamada al LLM — el supervisor confía en la salida respaldada, no en texto crudo.',
        'TF-IDF como pre-pase barato: el LLM solo ve pares viables, no el producto cruzado.',
        'temperature=0 en compliance — la reproducibilidad le gana a la creatividad en un doc de calidad.',
        'Renderizar diffs en el DOCX real — la adopción depende del review visual, no de un JSON.',
        'Bipartite matching mató un bug silencioso: dos docs A robaban el mismo doc B.',
      ],
    },
  },
}
