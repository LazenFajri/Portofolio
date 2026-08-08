/**
 * Shared DOM helpers for the terminal output pane.
 * Every writer goes through these so appending + autoscrolling stay in one place.
 */

const TAG_LABELS: Record<string, string> = {
  'tag-sys': '[SYS_INFO]',
  'tag-prof': '[USER_PROFILE]',
  'tag-asset': '[ASTRO_ASSETS]',
  'tag-ok': '[OK]',
  'tag-warn': '[WARN]',
};

const MAX_LINE_DELAY_INDEX = 15;

export function getTerminalBody(): HTMLElement {
  const body = document.getElementById('terminal-body');
  if (!body) throw new Error('#terminal-body is missing');
  return body;
}

export function scrollToBottom(el: HTMLElement = getTerminalBody()): void {
  el.scrollTop = el.scrollHeight;
}

/** Appends a node to the output pane and keeps the newest content in view. */
export function appendToBody<T extends Node>(node: T): T {
  const body = getTerminalBody();
  body.appendChild(node);
  scrollToBottom(body);
  return node;
}

export function createEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  html?: string,
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html !== undefined) el.innerHTML = html;
  return el;
}

export function escapeHtml(text: string): string {
  const holder = document.createElement('div');
  holder.textContent = text;
  return holder.innerHTML;
}

/**
 * Builds an output line. `cls` is either a `tag-*` class (rendered as a labelled
 * badge before the text) or a plain text class applied to the whole line.
 */
export function createLine(text?: string, cls?: string, delayIndex = 0): HTMLDivElement {
  const line = createEl('div', 'line');
  line.style.setProperty('--line-delay-index', `${Math.min(delayIndex, MAX_LINE_DELAY_INDEX)}`);
  if (cls) {
    if (cls.startsWith('tag-')) {
      const tag = createEl('span', cls);
      tag.textContent = TAG_LABELS[cls] ?? `[${cls}]`;
      line.appendChild(tag);
    } else {
      line.classList.add(cls);
    }
  }
  if (text) line.innerHTML += text;
  return line;
}

/** Appends an immediately visible output line. */
export function appendLine(text?: string, cls?: string): HTMLDivElement {
  const line = createLine(text, cls, 0);
  line.style.animationDelay = '0ms';
  return appendToBody(line);
}

export function appendDivider(char = '-', length = 40): HTMLDivElement {
  const divider = createEl('div', 'divider');
  divider.textContent = char.repeat(length);
  return appendToBody(divider);
}

/** Appends a grid container built from `items` via `renderItem`. */
export function appendGrid<T>(
  className: string,
  items: readonly T[],
  renderItem: (item: T) => HTMLElement,
): HTMLDivElement {
  const grid = createEl('div', className);
  for (const item of items) grid.appendChild(renderItem(item));
  return appendToBody(grid);
}

/** Appends an animated progress bar, growing to `pct` once mounted. */
export function appendSkillBar(options: {
  name: string;
  level: string;
  pct: number;
  fillClass?: string;
  fillColor?: string;
}): HTMLDivElement {
  const { name, level, pct, fillClass, fillColor } = options;
  const wrapper = createEl(
    'div',
    'skill-bar',
    `<div class="skill-name"><span>${name}</span>` +
      `<span class="level-label">[${level}] ${pct}%</span></div>`,
  );
  const track = createEl('div', 'skill-track');
  const fill = createEl('div', `skill-fill${fillClass ? ` ${fillClass}` : ''}`);
  fill.style.width = '0%';
  if (fillColor) fill.style.backgroundColor = fillColor;
  const barText = createEl('span', 'bar-text');
  barText.textContent = `${pct}%`;
  fill.appendChild(barText);
  track.appendChild(fill);
  wrapper.appendChild(track);
  appendToBody(wrapper);
  setTimeout(() => {
    fill.style.width = `${pct}%`;
  }, 100);
  return wrapper;
}

export function formatTime(date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
