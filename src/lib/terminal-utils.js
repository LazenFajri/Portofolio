// Pure helpers backing the FAJRI-OS terminal UI.

import { TAG_LABELS, MAX_LINE_DELAY_INDEX } from './terminal-data.js';

const COMMAND_ALIASES = Object.assign(Object.create(null), {
  '': 'help',
  'help': 'help',
  'h': 'help',
  '?': 'help',
  '1': 'skills',
  'skills': 'skills',
  'skill': 'skills',
  '2': 'assets',
  'assets': 'assets',
  'license': 'assets',
  'cert': 'assets',
  '3': 'links',
  'links': 'links',
  'social': 'links',
  'connect': 'links',
  '4': 'profile',
  'profile': 'profile',
  'about': 'profile',
  'whoami': 'profile',
  'makan': 'makan',
  'hobby': 'makan',
  'eat': 'makan',
  '4321': 'port',
  'port': 'port',
  'clear': 'clear',
  'cls': 'clear',
});

export function normalizeCommand(cmd) {
  return String(cmd ?? '').trim().toLowerCase();
}

export function resolveCommand(cmd) {
  return COMMAND_ALIASES[normalizeCommand(cmd)] || 'unknown';
}

export function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function pad2(n) {
  return n.toString().padStart(2, '0');
}

export function fmtTime(date = new Date()) {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

export function isTagClass(cls) {
  return typeof cls === 'string' && /^tag-/.test(cls);
}

export function tagLabel(cls) {
  return TAG_LABELS[cls] || '[' + cls + ']';
}

export function lineDelayIndex(index) {
  return Math.min(index, MAX_LINE_DELAY_INDEX);
}

export function hostnameOf(url) {
  return new URL(url).hostname;
}

export function nextMode(mode) {
  return mode === 'gui' ? 'terminal' : 'gui';
}

export function modeToggleLabels(mode) {
  return mode === 'gui' ? { icon: '▣', label: 'TERM' } : { icon: '□', label: 'GUI' };
}

export function parseSpeed(value, fallback) {
  const speed = parseFloat(value);
  return Number.isFinite(speed) && speed !== 0 ? speed : fallback;
}

export function shapeTransform(mouseX, mouseY, speed) {
  return `translate3d(${mouseX * speed * 0.4}px, ${mouseY * speed * 0.4}px, 0) rotate(${mouseX * 0.02}deg)`;
}

export function scrollTransform(scrolled, speed) {
  return `translate3d(0, ${-(scrolled * speed)}px, 0)`;
}

export function pickRandom(items, random = Math.random) {
  return items[Math.floor(random() * items.length)];
}

export function bounceVelocity(position, velocity, max) {
  return position < 0 || position > max ? -velocity : velocity;
}

export function repel(particle, mouseX, mouseY, radius = 130, strength = 2.5) {
  const dx = mouseX - particle.x;
  const dy = mouseY - particle.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist >= radius || dist === 0) return { x: particle.x, y: particle.y };
  return {
    x: particle.x - (dx / dist) * strength,
    y: particle.y - (dy / dist) * strength,
  };
}
