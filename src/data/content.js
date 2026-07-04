// ─────────────────────────────────────────────────────────────
// All the text, links and content for the site lives here.
// Edit this file to make the site yours — no need to touch
// any component code for basic personalization.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Farham Asgari',
  handle: 'Farham Asgari',
  role: 'Software Developer',
  traits: ['A developer', 'Interested in the world', 'Sensitive to beauty'],
  photo: '/photo-hero.jpg', // place your photo in /public
  location: 'Tehran, Iran',
  tips: [
    'Scroll, or use the trail on the left, to move around.',
    'Press ↑ / ↓ to move between sections.',
    'Press Space to jump to the next stop.',
  ],
}

export const terminalLines = [
  { type: 'command', text: 'whoami' },
  { type: 'output', text: 'farham_asgari — software developer' },
  { type: 'command', text: 'cat about.txt' },
  { type: 'output', text: '> a developer' },
  { type: 'output', text: '> interested in the world' },
  { type: 'output', text: '> sensitive to beauty' },
  { type: 'command', text: 'status --current' },
  { type: 'output', text: 'building things, one quiet commit at a time' },
  { type: 'command', text: 'open photo.jpg' },
  { type: 'output', text: 'displaying portrait →' },
  { type: 'command', text: 'help --navigate' },
  { type: 'output', text: 'scroll, or ↑ / ↓, or space to jump to the next section' },
]

export const timeline = [
  {
    id: 'born',
    date: '2003.11',
    title: 'Born',
    photo: '/photo-hero.jpg',
    description:
      'Raised in Tehran within a well-resourced, tech-forward environment during the rapid evolution of computer technologies, which fostered a lasting passion and foundational aptitude for the tech industry.',
  },
  {
    id: 'first-line',
    date: '2015.01',
    title: 'Innate Passion for Tech',
    description:
      'First lines of code, first broken computers, first fixed computers. What started as curiosity about how things work slowly turned into a habit of building things that work better.',
  },
  {
    id: 'self-taught',
    date: '2019.06',
    title: 'The Self-Taught Years',
    description:
      'Deep dives into web fundamentals, long nights with documentation, and a growing library of small projects that never shipped — but taught everything that mattered.',
  },
  {
    id: 'first-job',
    date: '2022.03',
    title: 'First Step, Professionally',
    description:
      'Joined a team for the first time, traded solo late-night debugging for code review and shared standards, and learned that good software is a team sport.',
  },
  {
    id: 'today',
    date: 'Today',
    title: 'Still Climbing',
    description:
      'Building thoughtful products, exploring new ideas, and still finding time to chase quiet, beautiful views — on mountains, and in well-written code.',
  },
]

export const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'Go'],
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'Express', 'PostgreSQL', 'REST / GraphQL APIs'],
  tools: ['Git', 'Docker', 'Figma', 'Linux'],
}

export const projectCategories = [
  { id: 'embedded', label: 'Embedded Systems' },
  { id: 'ai', label: 'AI & Data' },
  { id: 'web', label: 'Web' },
  { id: 'university', label: 'University' },
]

export const projects = [
  {
    id: 'atmega64-morse-code-generator',
    title: 'ATmega64 Morse Code Generator',
    year: '2024',
    category: 'embedded',
    summary: 'An embedded-systems project that encodes text into Morse code and outputs it on an ATmega64 microcontroller.',
    highlights: [
      'Low-level C programming directly on AVR hardware, no OS in between.',
      'Timing-accurate signal generation for correct Morse dots and dashes.',
      'A hands-on exercise in embedded systems and microcontroller programming.',
    ],
    tags: ['C', 'AVR', 'Embedded Systems'],
    href: 'https://github.com/fa-rh-am/atmega64-morse-code-generator',
    kind: 'GitHub',
  },
  {
    id: 'project-two',
    title: 'Project Two',
    year: '2024',
    category: 'web',
    summary: 'Another project — what problem it solves, and the part you are proudest of.',
    highlights: [
      'The main feature that makes this project useful.',
      'A technical decision you made and why.',
      'What you would do differently next time.',
    ],
    tags: ['TypeScript', 'Next.js'],
    href: 'https://github.com/fa-rh-am/project-two',
    kind: 'GitHub',
  },
  {
    id: 'project-three',
    title: 'Project Three',
    year: '2024',
    category: 'ai',
    summary: 'A live product or experiment worth linking to directly.',
    highlights: [
      'Why you built it and who it is for.',
      'What makes it different from similar tools.',
      'The stack that powers it end to end.',
    ],
    tags: ['Python', 'FastAPI'],
    href: 'https://your-live-project.com',
    kind: 'Live',
  },
  {
    id: 'project-four',
    title: 'Project Four',
    year: '2023',
    category: 'university',
    summary: 'Room for one more — swap this for your latest work.',
    highlights: [
      'One line on scope.',
      'One line on your role.',
      'One line on the result.',
    ],
    tags: ['Go', 'Docker'],
    href: 'https://github.com/fa-rh-am/project-four',
    kind: 'GitHub',
  },
]

export const contact = {
  email: 'hello@example.com', // ← replace with your real email address
  message:
    "Have a project in mind, or just want to talk shop? I'm always glad to hear from people who care about building things well.",
  links: [
    { label: 'GitHub', href: 'https://github.com/fa-rh-am' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/farham-asgari-011290365/' },
    { label: 'Telegram', href: 'https://t.me/Farham_Asgari' },
  ],
}
