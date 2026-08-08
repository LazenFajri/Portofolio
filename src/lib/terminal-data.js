// Static content rendered by the FAJRI-OS terminal.

export const bootSequence = [
  { text: '', delay: 0, skip: true },
  { text: '[FAJRI-OS // ASTRO ENGINE INITIALIZED]', delay: 0, cls: 'highlight-purple' },
  { text: 'STATUS: ONLINE // PORT: 4321 // <span class="success">200 OK</span>', delay: 0, cls: 'highlight' },
  { text: '', delay: 80, skip: true },
  { text: 'BOOTING TERMINAL … ██████████ (100%)', delay: 0, cls: 'highlight-cyan' },
  { text: 'INITIALIZING HUD… CYBERPUNK THEME ACTIVE', delay: 0, cls: 'success' },
  { text: 'MOUNTING /assets/ — 7 files indexed', delay: 0, cls: 'highlight-pink' },
  { text: 'CONNECTING TO GITHUB.COM/LAZENFAJRI …', delay: 0, cls: 'highlight' },
  { text: 'CONNECTION ESTABLISHED // TLS 1.3 // SECURE', delay: 0, cls: 'success' },
  { text: '', delay: 80, skip: true },
  { text: '[SYS_PROFILE]', delay: 0, cls: 'tag-sys' },
  { text: 'AGENT_ID  : <span class="highlight-pink">FAJRI-OS [v2026.08]</span>', delay: 0 },
  { text: 'HOST_NAME : <span class="highlight">Muhammad Fajri Setyawan (LazenFajri)</span>', delay: 0 },
  { text: 'MAJOR     : <span class="highlight">Teknik Informatika @ UDINUS</span>', delay: 0 },
  { text: 'ALUMNUS   : <span class="highlight">SMKN 7 Semarang</span>', delay: 0 },
  { text: '', delay: 80, skip: true },
  { text: '[SYSTEM READY] — Interactive mode. Type a command.', delay: 0, cls: 'success' },
];

export const skillsData = {
  title: '[01 // SKILLS]',
  tag: 'tag-sys',
  lines: [
    '',
    '<span class="dim">TECH_STACK & PROFICIENCY</span>',
    '',
    'After Effects (VFX/Motion)      <span class="highlight-pink">[SEMI-PRO]</span>',
    'Agent Prompting        <span class="highlight-cyan">[SEMI-PRO]</span>',
    'Coding Fundamentals           <span class="highlight-purple">[BASIC]</span>',
    '',
    'Proficiency: [SEMI-PRO] ████████░░ 80%  |  [BASIC] ████░░░░░░ 40%',
  ],
};

export const assetsData = {
  title: '[02 // ASSETS / LICENSE]',
  tag: 'tag-asset',
  lines: [
    '',
    '<span class="dim">LOCAL ASTRO ASSETS DIRECTORY — VERIFIED & MOUNTED</span>',
    '',
    '<span class="highlight">Location:</span> <span class="dim">/assets/ (public mount)</span>',
    '<span class="highlight">Status:</span>  <span class="success">VERIFIED & MOUNTED</span>',
    '',
  ],
};

export const assetFiles = [
  { name: 'CCNA License.pdf', icon: '📄', size: '371.4 KB' },
  { name: 'Java Fundametals license.pdf', icon: '📄', size: '91.4 KB' },
  { name: 'PC, Hardware, and Software License.pdf', icon: '📄', size: '215.4 KB' },
  { name: 'MyLogo.png', icon: '🖼️', size: '97.5 KB' },
  { name: 'Muhammad Fajri Setyawan.png', icon: '🖼️', size: '3.8 MB' },
  { name: 'LinkedIn_icon.svg', icon: '🎨', size: '1.1 KB' },
  { name: 'Octicons-mark-github.svg', icon: '🎨', size: '968 B' },
  { name: 'Youtube_logo.png', icon: '🎨', size: '9.6 KB' },
];

export const linksData = {
  title: '[03 // LINKS]',
  tag: 'tag-prof',
  lines: [
    '',
    '<span class="dim">EXTERNAL NODES</span>',
    '',
  ],
};

export const linkItems = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/muhammad-fajri-setyawan-51100726b', icon: '💼' },
  { name: 'GitHub', url: 'https://github.com/LazenFajri', icon: '🐙' },
  { name: 'YouTube', url: 'https://youtube.com/@fajriaep580?si=5w38K4YjcdZ-uHCX', icon: '▶️' },
];

export const foods = [
  '🍜 Ramen', '🍕 Pizza', '🍔 Burger', '🍣 Sushi', '🌮 Tacos',
  '🍝 Pasta', '🍗 Fried Chicken', '🥘 Nasi Goreng', '🍩 Donuts', '🍰 Cake',
];

export const helpLines = [
  '  [1] SKILLS           — View tech stack & proficiency',
  '  [2] ASSETS/LICENSE   — Browse local Astro assets',
  '  [3] LINKS            — Social & GitHub nodes',
  "  [4] PROFILE          — Fajri's profile card",
  '  [makan]              — Personal hobby (food!)',
  '  [clear]              — Clear terminal',
  '  [help]               — This help',
];

export const TAG_LABELS = {
  'tag-sys': '[SYS_INFO]',
  'tag-prof': '[USER_PROFILE]',
  'tag-asset': '[ASTRO_ASSETS]',
  'tag-ok': '[OK]',
  'tag-warn': '[WARN]',
};

export const MAX_LINE_DELAY_INDEX = 15;

export function getSkillDefs(isGui) {
  return [
    { name: 'After Effects', level: 'SEMI-PRO', pct: 80, className: isGui ? 'ae' : '', color: isGui ? 'var(--nb-coral)' : 'var(--accent-pink)' },
    { name: 'Agent Prompting', level: 'SEMI-PRO', pct: 80, className: isGui ? 'hermes' : '', color: isGui ? 'var(--nb-sky)' : 'var(--accent-cyan)' },
    { name: 'Coding Fundamentals', level: 'BASIC', pct: 40, className: isGui ? 'coding' : '', color: isGui ? 'var(--nb-lavender)' : 'var(--accent-purple)' },
  ];
}
