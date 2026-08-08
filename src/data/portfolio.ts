/**
 * Single source of truth for portfolio content.
 * Consumed by both the Astro markup (GUI mode) and the client script (terminal mode).
 */

export const PROFILE = {
  fullName: 'Muhammad Fajri Setyawan',
  username: 'LazenFajri',
  location: 'Semarang, ID',
  institution: 'Universitas Dian Nuswantoro',
  institutionShort: 'UDINUS',
  major: 'Teknik Informatika',
  majorLong: 'Teknik Informatika (Informatics Engineering)',
  faculty: 'FIK',
  priorEducation: 'SMK Negeri 7 Semarang',
  statusId: 'Mahasiswa Baru FIK (UDINUS)',
  statusEn: 'Undergraduate Student (Mahasiswa)',
  hobbyId: 'Kulineran & Makan',
  hobbyEn: 'Food & Culinary Exploration ("Makan") 🍲',
  avatar: '/assets/Muhammad Fajri Setyawan.png',
  logo: '/assets/MyLogo.png',
  agent: 'FAJRI-OS',
  agentVersion: 'v2026.08',
  port: '4321',
} as const;

export interface Skill {
  /** Full label used in the GUI card. */
  name: string;
  /** Short label used in the terminal skill bars. */
  shortName: string;
  /** Material Symbols icon name (GUI). */
  icon: string;
  level: string;
  pct: number;
  /** Modifier class for the GUI progress fill. */
  guiFill: string;
  /** Modifier class for the terminal skill fill in GUI palette. */
  guiClass: string;
  /** CSS color used for the terminal skill fill. */
  cliColor: string;
  /** Highlight class used in the terminal skill listing. */
  cliHighlight: string;
}

export const SKILLS: readonly Skill[] = [
  {
    name: 'After Effects Video Editing',
    shortName: 'After Effects',
    icon: 'movie',
    level: 'SEMI-PRO',
    pct: 80,
    guiFill: 'coral',
    guiClass: 'ae',
    cliColor: 'var(--accent-pink)',
    cliHighlight: 'highlight-pink',
  },
  {
    name: 'Agent Prompting',
    shortName: 'Agent Prompting',
    icon: 'smart_toy',
    level: 'SEMI-PRO',
    pct: 80,
    guiFill: 'sky',
    guiClass: 'hermes',
    cliColor: 'var(--accent-cyan)',
    cliHighlight: 'highlight-cyan',
  },
  {
    name: 'Coding Fundamentals',
    shortName: 'Coding Fundamentals',
    icon: 'code',
    level: 'BASIC',
    pct: 40,
    guiFill: 'yellow',
    guiClass: 'coding',
    cliColor: 'var(--accent-purple)',
    cliHighlight: 'highlight-purple',
  },
];

export interface AssetFile {
  /** File name as served from public/assets/. */
  file: string;
  emoji: string;
  size: string;
  /** Present for downloadable certificates rendered in the GUI card. */
  certificate?: {
    title: string;
    description: string;
    icon: string;
  };
}

export const ASSET_FILES: readonly AssetFile[] = [
  {
    file: 'CCNA License.pdf',
    emoji: '📄',
    size: '371.4 KB',
    certificate: {
      title: 'CCNA License',
      description: 'Cisco Certified Network Associate (PDF)',
      icon: 'history_edu',
    },
  },
  {
    file: 'Java Fundametals license.pdf',
    emoji: '📄',
    size: '91.4 KB',
    certificate: {
      title: 'Java Fundamentals License',
      description: 'Oracle / Java Certification (PDF)',
      icon: 'terminal',
    },
  },
  {
    file: 'PC, Hardware, and Software License.pdf',
    emoji: '📄',
    size: '215.4 KB',
    certificate: {
      title: 'PC, Hardware, & Software License',
      description: 'IT Infrastructure & Hardware (PDF)',
      icon: 'build_circle',
    },
  },
  { file: 'MyLogo.png', emoji: '🖼️', size: '97.5 KB' },
  { file: 'Muhammad Fajri Setyawan.png', emoji: '🖼️', size: '3.8 MB' },
  { file: 'LinkedIn_icon.svg', emoji: '🎨', size: '1.1 KB' },
  { file: 'Octicons-mark-github.svg', emoji: '🎨', size: '968 B' },
  { file: 'Youtube_logo.png', emoji: '🎨', size: '9.6 KB' },
];

export const CERTIFICATES = ASSET_FILES.filter((asset) => asset.certificate);

export interface SocialLink {
  name: string;
  url: string;
  emoji: string;
  /** Logo served from public/assets/ (GUI). */
  logo: string;
  /** Label including the handle (GUI). */
  label: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: 'YouTube',
    url: 'https://youtube.com/@fajriaep580',
    emoji: '▶️',
    logo: '/assets/Youtube_logo.png',
    label: 'YouTube (@fajriaep580)',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/LazenFajri',
    emoji: '🐙',
    logo: '/assets/Octicons-mark-github.svg',
    label: 'GitHub (LazenFajri)',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/muhammad-fajri-setyawan',
    emoji: '💼',
    logo: '/assets/LinkedIn_icon.svg',
    label: 'LinkedIn (Fajri Setyawan)',
  },
];

export const LINKS_BY_NAME = Object.fromEntries(
  SOCIAL_LINKS.map((link) => [link.name, link]),
) as Record<SocialLink['name'], SocialLink>;

export interface InfoRow {
  label: string;
  value: string;
  /** Material Symbols icon rendered inline before the value. */
  icon?: string;
}

/** Profile rows for the GUI card (Indonesian). */
export const GUI_INFO_ROWS: readonly InfoRow[] = [
  { label: 'NAMA LENGKAP', value: PROFILE.fullName },
  { label: 'USERNAME', value: PROFILE.username },
  { label: 'STATUS', value: PROFILE.statusId },
  { label: 'INSTITUSI', value: PROFILE.institution },
  { label: 'PRODI', value: `${PROFILE.major} (S1)` },
  { label: 'PENDIDIKAN DAHULU', value: PROFILE.priorEducation },
  { label: 'HOBI & FAVORIT', value: PROFILE.hobbyId, icon: 'restaurant' },
];

export interface TerminalInfoRow {
  label: string;
  value: string;
  /** Extra class applied to the value span. */
  valueClass?: string;
  /** Optional badge rendered after the value. */
  badge?: { text: string; className: string };
}

/** Profile rows for the terminal profile card (English). */
export const TERMINAL_INFO_ROWS: readonly TerminalInfoRow[] = [
  { label: 'Nama Lengkap', value: PROFILE.fullName, valueClass: 'highlight' },
  {
    label: 'Username',
    value: PROFILE.username,
    valueClass: 'highlight-pink',
    badge: { text: 'CODER', className: 'badge-coder' },
  },
  {
    label: 'Status',
    value: PROFILE.statusEn,
    badge: { text: 'STUDENT', className: 'badge-student' },
  },
  { label: 'Institution', value: `${PROFILE.institution} (${PROFILE.institutionShort})` },
  { label: 'Major', value: PROFILE.majorLong },
  { label: 'Prior Education', value: PROFILE.priorEducation },
  { label: 'Hobby', value: PROFILE.hobbyEn, valueClass: 'makan' },
  {
    label: 'Agent',
    value: `${PROFILE.agent} ${PROFILE.agentVersion} — AI Terminal Agent`,
    valueClass: 'dim',
  },
];
