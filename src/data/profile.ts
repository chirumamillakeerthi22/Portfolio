/*
  Single source of truth for every fact shown on the site.

  Everything here is taken from the current resume (1-page and 2-page versions,
  November 2026) or from the public source code of the projects on GitHub.
  When the resume changes, update this file and the PDFs in /public/resume.
  Do not add numbers, employers or certifications that are not on the resume.
*/

export type Link = { label: string; href: string };

export const person = {
  name: 'Keerthi Chirumamilla',
  // Same wording as the resume headline.
  role: 'Data Engineering · Data Analytics · Python & SQL',
  headline: 'I build data applications where every record is modelled, validated and secured.',
  intro:
    'Data-focused developer working with SQL, PostgreSQL and Python. I design relational data models, integrate REST APIs, validate data with schema checks and automated tests, and turn datasets into Power BI and Tableau dashboards.',
  location: 'Koblenz, Germany',
  availability: 'Open to Werkstudent, internship and junior roles in data engineering, data analytics and BI.',
  email: 'chirumamillakeerthi16@gmail.com',
  github: 'https://github.com/chirumamillakeerthi22',
  githubHandle: 'chirumamillakeerthi22',
  linkedin: 'https://www.linkedin.com/in/keerthi-chirumamilla-65b7a3226',
  portfolio: 'https://portfolio-pied-pi-12.vercel.app',
};

export const resumes = [
  {
    label: 'One-page resume',
    note: 'Quick overview · PDF',
    href: '/resume/Keerthi_Chirumamilla_Resume_1Page.pdf',
  },
  {
    label: 'Two-page resume',
    note: 'Full detail · PDF',
    href: '/resume/Keerthi_Chirumamilla_Resume_2Page.pdf',
  },
] as const;

export const about = {
  paragraphs: [
    'I work at the point where data meets the application around it. In my own projects I have designed PostgreSQL schemas with versioned migrations and Row Level Security, connected external REST APIs through server-side functions so keys never reach the browser, and checked every request and AI response against Zod or Pydantic schemas before it is stored or shown.',
    'On the analytics side I clean and explore data with Python, Pandas and NumPy, compare forecasting models, and present results in Power BI and Tableau dashboards.',
    'The problems I like most are the unglamorous ones that decide whether data can be trusted: who is allowed to read a row, what happens when an upstream API returns something malformed, and how to prove it with tests.',
  ],
  focus: [
    { title: 'Data modelling', text: 'Relational schemas, SQL migrations, exact numeric types, row-level access policies.' },
    { title: 'Data integration & quality', text: 'REST APIs behind server-side functions, schema validation, rate limits, automated tests.' },
    { title: 'Analysis & BI', text: 'Python data cleaning and EDA, model comparison, Power BI and Tableau dashboards.' },
  ],
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'German', level: 'A2 · currently learning' },
  ],
};

/* ---------- Experience ---------- */

export type Experience = {
  title: string;
  org: string;
  kind: string;
  start: string;
  end: string;
  points: string[];
  tech: string[];
};

// Both entries are virtual internship programmes, labelled as such on purpose.
export const experience: Experience[] = [
  {
    title: 'AI-ML Virtual Internship',
    org: 'Eduskills (AWS Academy)',
    kind: 'Virtual internship · Remote',
    start: '05/2023',
    end: '07/2023',
    points: [
      'Built machine learning and deep learning models in Python as part of a structured virtual programme.',
      'Applied data preprocessing and feature preparation to improve model inputs.',
      'Evaluated models with standard metrics and compared results to improve predictive accuracy.',
    ],
    tech: ['Python', 'Machine learning', 'Deep learning', 'Model evaluation'],
  },
  {
    title: 'Data Analytics Virtual Internship',
    org: 'Eduskills',
    kind: 'Virtual internship · Remote',
    start: '12/2022',
    end: '02/2023',
    points: [
      'Cleaned, transformed and prepared datasets using Excel, SQL and Python.',
      'Performed exploratory data analysis to identify patterns and trends.',
      'Summarised findings as business-intelligence insights to support data-driven decisions.',
    ],
    tech: ['Python', 'SQL', 'Excel', 'EDA'],
  },
];

/* ---------- Skills ---------- */

// Where a skill has actually been used. Shown next to each skill so a reader can check it.
export type Evidence = 'Veyoraq' | 'InvestTrack' | 'Capstone' | 'Internship' | 'Academic' | 'Certification';

export type Skill = { name: string; evidence: Evidence[]; note?: string };
export type SkillGroup = { id: string; label: string; summary: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    id: 'databases',
    label: 'Databases & Modelling',
    summary: 'Relational design, migrations and access control in PostgreSQL.',
    skills: [
      { name: 'SQL', evidence: ['Veyoraq', 'InvestTrack', 'Internship'] },
      { name: 'PostgreSQL', evidence: ['Veyoraq', 'InvestTrack'] },
      { name: 'Relational schema design', evidence: ['Veyoraq', 'InvestTrack'] },
      { name: 'Versioned SQL migrations', evidence: ['Veyoraq'] },
      { name: 'Row Level Security', evidence: ['Veyoraq'] },
      { name: 'SQL security tests', evidence: ['Veyoraq'] },
      { name: 'SQLAlchemy ORM', evidence: ['InvestTrack'] },
      { name: 'MySQL', evidence: ['Academic'] },
    ],
  },
  {
    id: 'integration',
    label: 'Data Integration & Quality',
    summary: 'Getting external data in safely and rejecting what does not fit.',
    skills: [
      { name: 'REST API integration', evidence: ['Veyoraq', 'InvestTrack'] },
      { name: 'Zod schema validation', evidence: ['Veyoraq'] },
      { name: 'Pydantic', evidence: ['InvestTrack'] },
      { name: 'Structured JSON output', evidence: ['Veyoraq'] },
      { name: 'Rate limiting & input checks', evidence: ['Veyoraq'] },
      { name: 'Automated testing (Vitest)', evidence: ['Veyoraq'] },
    ],
  },
  {
    id: 'analysis',
    label: 'Data Analysis & BI',
    summary: 'Cleaning, exploring and presenting data.',
    skills: [
      { name: 'Python', evidence: ['Capstone', 'Internship', 'InvestTrack'] },
      { name: 'Pandas', evidence: ['Capstone'] },
      { name: 'NumPy', evidence: ['Capstone'] },
      { name: 'Matplotlib', evidence: ['Academic'] },
      { name: 'Exploratory data analysis', evidence: ['Internship', 'Capstone'] },
      { name: 'Data cleaning & preprocessing', evidence: ['Internship', 'Capstone'] },
      { name: 'Power BI', evidence: ['Capstone'] },
      { name: 'Tableau', evidence: ['Capstone'] },
      { name: 'Excel', evidence: ['Internship'] },
    ],
  },
  {
    id: 'ml',
    label: 'Machine Learning & AI',
    summary: 'Forecasting models and LLM integration with validated output.',
    skills: [
      { name: 'Linear Regression', evidence: ['Capstone'] },
      { name: 'Random Forest', evidence: ['Capstone'] },
      { name: 'LSTM', evidence: ['Capstone'] },
      { name: 'Model evaluation', evidence: ['Internship', 'Capstone'] },
      { name: 'Gemini API (text & image input)', evidence: ['Veyoraq'] },
    ],
  },
  {
    id: 'web',
    label: 'Programming & Backend',
    summary: 'Languages and frameworks used to build the applications around the data.',
    skills: [
      { name: 'TypeScript', evidence: ['Veyoraq'] },
      { name: 'JavaScript', evidence: ['InvestTrack'] },
      { name: 'FastAPI', evidence: ['InvestTrack'] },
      { name: 'Next.js', evidence: ['Veyoraq'] },
      { name: 'React', evidence: ['Veyoraq', 'InvestTrack'] },
      { name: 'JWT authentication', evidence: ['InvestTrack'] },
      { name: 'Django', evidence: ['Academic'] },
      { name: 'Java · Java EE (Servlets, JSP)', evidence: ['Academic', 'Certification'] },
      { name: 'C', evidence: ['Academic'] },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & Tools',
    summary: 'Where the projects run, and the tools used to build them.',
    skills: [
      { name: 'Supabase (Postgres, Auth, Edge Functions)', evidence: ['Veyoraq', 'InvestTrack'] },
      { name: 'Vercel', evidence: ['Veyoraq', 'InvestTrack'] },
      { name: 'Git & GitHub', evidence: ['Veyoraq', 'InvestTrack'] },
      { name: 'AWS', evidence: ['Certification'], note: 'Foundational' },
      { name: 'Google Cloud', evidence: ['Certification'], note: 'Foundational' },
    ],
  },
];

export const evidenceLabel: Record<Evidence, string> = {
  Veyoraq: 'Veyoraq project',
  InvestTrack: 'InvestTrack project',
  Capstone: 'Air quality capstone',
  Internship: 'Virtual internship',
  Academic: 'Academic project',
  Certification: 'Certification',
};

/* ---------- Projects ---------- */

export type ArchNode = { id: string; label: string; sub: string; col: number; row: number };
export type ArchEdge = { from: string; to: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  kind: string;
  period: string;
  summary: string;
  live: string;
  repo?: string;
  /** Optional real screenshot in /public/projects (e.g. '/projects/veyoraq.webp'). Leave undefined until one exists. */
  screenshot?: string;
  /** The project's own brand colour, used as its accent here. */
  brand: { light: string; dark: string };
  stack: string[];
  highlights: string[];
  problem: string;
  architecture: { nodes: ArchNode[]; edges: ArchEdge[]; caption: string };
  implementation: { title: string; text: string }[];
  decisions: string[];
  role: string;
};

export const projects: Project[] = [
  {
    slug: 'veyoraq',
    name: 'Veyoraq',
    tagline: 'AI-powered personal styling platform',
    kind: 'Personal project',
    period: '10/2026 – Present',
    summary:
      'A full-stack styling web app: style quiz, colour analysis, fit guidance and photo-based outfit advice, with AI output that is schema-validated before anyone sees it and saved data protected by Row Level Security.',
    live: 'https://veyoraq.vercel.app',
    repo: 'https://github.com/chirumamillakeerthi22/Veyoraq',
    brand: { light: '#7d3948', dark: '#e3a3ad' },
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Row Level Security', 'Gemini API', 'Zod', 'Vitest', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Gemini text and image input with structured JSON output, validated against Zod schemas',
      'PostgreSQL tables with versioned migrations, RLS and SQL security tests',
      'Same-origin checks, per-visitor rate limits, file-type and size checks',
      'Email/password and Google sign-in with Supabase Auth',
    ],
    problem:
      'Styling advice is personal, and AI output is unpredictable. The app has to turn a quiz and an optional photo into structured, trustworthy recommendations, reject anything malformed, and keep each person’s saved outfits, wishlists and colour reports private to them.',
    architecture: {
      nodes: [
        { id: 'ui', label: 'Next.js UI', sub: 'Quiz · photo upload', col: 0, row: 1 },
        { id: 'api', label: 'API routes', sub: 'Origin · rate limits', col: 1, row: 1 },
        { id: 'zod', label: 'Zod schemas', sub: 'Request + AI output', col: 2, row: 0 },
        { id: 'ai', label: 'Gemini API', sub: 'Structured JSON', col: 3, row: 0 },
        { id: 'auth', label: 'Supabase Auth', sub: 'Email · Google', col: 1, row: 2 },
        { id: 'db', label: 'PostgreSQL', sub: 'RLS · migrations', col: 2, row: 2 },
      ],
      edges: [
        { from: 'ui', to: 'api' },
        { from: 'api', to: 'zod' },
        { from: 'zod', to: 'ai' },
        { from: 'ui', to: 'auth' },
        { from: 'auth', to: 'db' },
      ],
      caption: 'Requests pass origin, rate-limit and schema checks before reaching Gemini; per-user data lives in PostgreSQL behind Row Level Security.',
    },
    implementation: [
      {
        title: 'Validated AI pipeline',
        text: 'Server-side Next.js API routes call the Gemini API with text and image input and request structured JSON. Every request and every AI response is checked against a Zod schema, so malformed data is rejected before it reaches the user.',
      },
      {
        title: 'Data model & security',
        text: 'PostgreSQL tables in Supabase for saved outfits, wishlists and colour reports, created through versioned SQL migrations. Row Level Security policies restrict each row to its owner, and SQL test scripts check per-user access, size limits and row caps.',
      },
      {
        title: 'Hardened API layer',
        text: 'Same-origin checks, per-visitor rate limits, input size and file-type checks, and secrets kept on the server. The code base has a Vitest suite across 49 test files.',
      },
      {
        title: 'Accounts',
        text: 'Email/password and Google sign-in with Supabase Auth, so saved looks and colour reports are stored per user account.',
      },
    ],
    decisions: [
      'Treat AI output as untrusted input: validate it like any external API response.',
      'Enforce access in the database with RLS, not only in application code.',
      'Write SQL tests that try to read and write other users’ rows and expect to fail.',
    ],
    role: 'Designed, built, tested and deployed the application end to end.',
  },
  {
    slug: 'investtrack',
    name: 'InvestTrack',
    tagline: 'Stock portfolio platform',
    kind: 'Personal project',
    period: '08/2026 – 09/2026',
    summary:
      'A stock portfolio tracker with holdings, watchlist and wishlist, live quotes, company search and price-history charts. Market-data API keys stay server-side in Supabase Edge Functions.',
    live: 'https://invest-track-flame.vercel.app',
    repo: 'https://github.com/chirumamillakeerthi22/investTrack',
    brand: { light: '#155eef', dark: '#84a9ff' },
    stack: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Edge Functions', 'Finnhub API', 'Twelve Data API', 'Recharts', 'React Router', 'FastAPI', 'SQLAlchemy', 'JWT', 'Vercel'],
    highlights: [
      'Finnhub quotes and company search through Supabase Edge Functions',
      'Holdings with portfolio value and profit/loss; price-history charts',
      'User portfolios stored in Supabase PostgreSQL',
      'Registration, login, password reset and protected routes',
    ],
    problem:
      'Tracking investments needs live market data, but market-data API keys must never be exposed in a browser app. Portfolio positions also need exact arithmetic: floating-point rounding is not acceptable for money.',
    architecture: {
      nodes: [
        { id: 'ui', label: 'React + Vite', sub: 'Dashboard · Recharts', col: 0, row: 1 },
        { id: 'auth', label: 'Supabase Auth', sub: 'Login · reset · JWT', col: 1, row: 0 },
        { id: 'fn', label: 'Edge Functions', sub: 'quote/search/history', col: 1, row: 2 },
        { id: 'db', label: 'PostgreSQL', sub: 'Holdings · watchlist', col: 2, row: 0 },
        { id: 'mkt', label: 'Market data APIs', sub: 'Finnhub · Twelve Data', col: 2, row: 2 },
        { id: 'py', label: 'FastAPI', sub: 'SQLAlchemy · JWT', col: 3, row: 1 },
      ],
      edges: [
        { from: 'ui', to: 'auth' },
        { from: 'ui', to: 'fn' },
        { from: 'auth', to: 'db' },
        { from: 'fn', to: 'mkt' },
        { from: 'py', to: 'db' },
      ],
      caption: 'The browser never holds a market-data key: three Edge Functions proxy the external APIs. Portfolios live in Supabase PostgreSQL, modelled with SQLAlchemy in the FastAPI backend.',
    },
    implementation: [
      {
        title: 'Server-side API integration',
        text: 'Three Supabase Edge Functions (stock quote, company search, price history) call the external market-data APIs, so the API keys stay on the server. Quotes and company search come from the Finnhub REST API; the price-history function uses the Twelve Data time-series API.',
      },
      {
        title: 'Portfolio features',
        text: 'Holdings, watchlist and wishlist, with portfolio value and profit/loss calculations and price-history charts in a React dashboard built with Recharts.',
      },
      {
        title: 'Data model',
        text: 'User portfolios are stored in Supabase PostgreSQL. Users, stocks and holdings are modelled with SQLAlchemy using exact Numeric types, and the FastAPI backend verifies Supabase-issued JWTs.',
      },
      {
        title: 'Authentication',
        text: 'Registration, login, password reset and protected routes with Supabase Auth and React Router. The front end is deployed on Vercel.',
      },
    ],
    decisions: [
      'Proxy every third-party API call through a server function instead of shipping keys to the client.',
      'Use exact Numeric(18, 6) columns for quantities and prices.',
      'Let the Python backend trust Supabase-issued JWTs rather than run a second login system.',
    ],
    role: 'Designed and built the front end, Edge Functions, data model and backend.',
  },
];

export const otherProjects = [
  {
    name: 'Air Quality and Pollution Forecasting',
    kind: 'Academic capstone',
    text: 'Forecast pollution levels by comparing Linear Regression, Random Forest and LSTM models, with data preparation in Pandas and NumPy. Forecasts and AQI calculations visualised in Power BI and Tableau.',
    stack: ['Python', 'Pandas', 'NumPy', 'Power BI', 'Tableau'],
  },
  {
    name: 'Hospital Management System',
    kind: 'Academic project',
    text: 'Authentication, patient records, scheduling and billing modules.',
    stack: ['Python', 'Django', 'MySQL'],
  },
  {
    name: 'Employee Management System',
    kind: 'Academic project',
    text: 'Attendance, payroll and role-based access.',
    stack: ['Java EE', 'Servlets', 'JSP', 'MySQL'],
  },
];

/* ---------- GitHub ---------- */

// Public repositories, checked on GitHub on 2 Nov 2026. No stars or commit counts are shown on purpose.
export const repositories = [
  {
    name: 'Veyoraq',
    href: 'https://github.com/chirumamillakeerthi22/Veyoraq',
    description: 'AI styling platform: Next.js API routes, Gemini, Zod, Supabase migrations and SQL security tests.',
    language: 'TypeScript',
    live: 'https://veyoraq.vercel.app',
  },
  {
    name: 'investTrack',
    href: 'https://github.com/chirumamillakeerthi22/investTrack',
    description: 'Stock portfolio platform: React/Vite front end, Supabase Edge Functions, FastAPI + SQLAlchemy backend.',
    language: 'JavaScript',
    live: 'https://invest-track-flame.vercel.app',
  },
  {
    name: 'Stock-Portfolio',
    href: 'https://github.com/chirumamillakeerthi22/Stock-Portfolio',
    description: 'Stock portfolio app with a React front end and a FastAPI, SQLAlchemy and Alembic backend on PostgreSQL.',
    language: 'JavaScript',
    live: 'https://stock-portfolio-weld-three.vercel.app',
  },
];

/* ---------- Certifications & education ---------- */

export const certifications = [
  { name: 'Google Cloud Practitioner', issuer: 'Google Cloud', date: '07/2024' },
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '12/2023' },
  { name: 'Red Hat Enterprise Application Development (Java EE)', issuer: 'Red Hat', date: '08/2023' },
] as { name: string; issuer: string; date: string; credentialUrl?: string }[];

export const education = [
  {
    degree: 'M.Sc. Web and Data Science',
    school: 'University of Koblenz',
    place: 'Koblenz, Germany',
    period: '10/2025 – Present',
  },
  {
    degree: 'B.Tech, Computer Science Engineering',
    school: 'KL University',
    place: 'India',
    period: '08/2021 – 05/2025',
    detail: 'CGPA 9.35',
  },
];

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const;
