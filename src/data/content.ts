// Toda la información viene del CV real de Sandra (sandra_cv_rose_tech.html).
// No se inventa experiencia: lo que no está aquí, no se muestra en el sitio.

export const person = {
  firstName: 'Sandra',
  lastName: 'Aguilar Santos',
  fullName: 'Sandra Aguilar Santos',
  availability: 'Disponible · Open to work',
  roles: ['Full Stack Developer', 'Back-End Developer', 'AI Orchestrator'],
  headline: 'Escribo código y orquesto agentes de IA para acelerar productos digitales.',
  location: 'Xicotepec, Puebla · México',
  languages: [
    { label: 'ES', level: 'Nativo' },
    { label: 'EN', level: 'B1' }
  ],
  email: 'sandraaguilar02607@gmail.com',
  whatsapp: { display: '+52 764 131 4825', href: 'https://wa.me/527641314825' },
  linkedin: {
    display: 'Sandra Aguilar Santos',
    href: 'https://linkedin.com/in/sandra-aguilar-santos-0833a12bb'
  }
};

export const about = {
  label: 'Sobre mí',
  paragraph:
    'Desarrolladora de Software Full Stack con 3 años y 9 meses de experiencia en el desarrollo, mantenimiento y optimización de aplicaciones web y sistemas administrativos. Experiencia en análisis de requerimientos, implementación de nuevas funcionalidades, mejora de procesos y resolución de problemas técnicos. Enfocada en construir soluciones escalables, funcionales y orientadas a la experiencia del usuario, con aprendizaje continuo y adaptación a nuevas herramientas y metodologías.',
  stats: [
    { value: '3.9', label: 'Años de experiencia' },
    { value: '2', label: 'Empresas / equipos' },
    { value: '∞', label: 'Aprendizaje continuo' }
  ]
};

export type Experience = {
  role: string;
  company: string;
  place: string;
  period: string;
  current?: boolean;
  description: string;
  tags: { label: string; kind?: 'green' | 'blue' }[];
};

export const experience: Experience[] = [
  {
    role: 'Full Stack Developer',
    company: 'Xpertme',
    place: 'Querétaro, México',
    period: '2023 — Actual',
    current: true,
    description:
      'Desarrollo, mantenimiento y optimización de módulos para plataforma educativa y sistemas administrativos. Implementación de nuevas funcionalidades, mejora de procesos internos, gestión de usuarios, suscripciones y grupos, así como optimización de consultas y estructuras de base de datos. Colaboración constante con equipos de desarrollo para garantizar soluciones escalables, eficientes y centradas en la experiencia del usuario.',
    tags: [
      { label: 'Desarrollo Web' },
      { label: 'Optimización' },
      { label: 'Bases de Datos' },
      { label: 'UX/UI', kind: 'blue' },
      { label: 'Mantenimiento' },
      { label: 'Resolución de Problemas', kind: 'green' }
    ]
  },
  {
    role: 'Software Developer Intern',
    company: 'NC Tech',
    place: 'Querétaro, México',
    period: '2022 — 2023',
    description:
      'Participación en el desarrollo y mantenimiento de sistemas internos, apoyando en la implementación de nuevas funcionalidades, corrección de errores y optimización de procesos. Colaboración en el análisis de requerimientos, pruebas y mejora de interfaces para garantizar soluciones funcionales y eficientes.',
    tags: [
      { label: 'Desarrollo Web' },
      { label: 'Mantenimiento' },
      { label: 'Testing' },
      { label: 'UX/UI', kind: 'blue' },
      { label: 'Bases de Datos' },
      { label: 'Debugging' }
    ]
  }
];

// Backend & datos: lo real es optimización de queries y estructuras MySQL,
// no "data science" — se presenta honesto, sin inflar.
export const dataFocus = {
  label: 'Backend & Datos',
  blurb:
    'Donde más me clavo: estructuras de base de datos en MySQL, optimización de consultas y APIs REST que mueven los datos sin fricción entre el back y el front.',
  points: [
    'Optimización de consultas y estructuras de base de datos',
    'Gestión de usuarios, suscripciones y grupos a escala',
    'APIs REST como puente entre módulos y plataformas',
    'AWS S3 para almacenamiento de archivos en producción'
  ]
};

export const aiTools = [
  { name: 'Claude Code', description: 'Componentes, librerías y flujos completos.' },
  { name: 'Cursor / Antigravity IDE', description: 'Edición inteligente asistida.' },
  { name: 'ComfyUI', description: 'Pipelines de imagen generativa.' },
  { name: 'Figma Make', description: 'Rediseño por prompt sobre vistas existentes.' },
  { name: 'Modelos LLM locales', description: 'Recursos propios, sin límite de tokens.' }
];

export const techStack = [
  'PHP',
  'Laravel',
  'CodeIgniter 4',
  'MySQL',
  'JavaScript',
  'HTML',
  'CSS',
  'Twig',
  'MaterializeCSS',
  'Tailwind CSS',
  'Git / Bitbucket',
  'Jira / Trello',
  'Postman',
  'REST APIs',
  'AWS S3'
];

export const designSystems = [
  { name: 'Material 3' },
  { name: 'Tailwind UI' },
  { name: 'Atlassian DS' }
];

export const education = [
  {
    title: 'Ingeniería en Desarrollo y Gestión de Software',
    detail: 'Titulado · Formación en sistemas, desarrollo de software y fundamentos de ingeniería'
  },
  {
    title: 'Claude Code 101 — Anthropic',
    detail: 'Orquestación de agentes de IA en flujos de desarrollo real'
  },
  {
    title: 'Certificaciones especializadas',
    detail:
      'Diseño de Interfaces Móviles · Certificado Profesional de Diseño UX de Google · Accesibilidad Web · Investigación Cuantitativa'
  },
  {
    title: 'Aprendizaje continuo',
    detail: 'Midudev, Anthropic docs, canales especializados en IA, front-end y tendencias emergentes'
  }
];
