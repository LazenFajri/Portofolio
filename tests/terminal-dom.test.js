import { beforeEach, describe, expect, it } from 'vitest';

import {
  appendAndScroll,
  createAssetGrid,
  createDivider,
  createEcho,
  createLine,
  createLinkGrid,
  createNote,
  createProfileGrid,
  createPrompt,
  createSkillBar,
} from '../src/lib/terminal-dom.js';
import { assetFiles, getSkillDefs, linkItems } from '../src/lib/terminal-data.js';
import { escapeHtml } from '../src/lib/terminal-utils.js';

describe('createLine', () => {
  it('applies the delay class for the given index', () => {
    const line = createLine('hello', null, 3);
    expect(line.className).toBe('line line-delay-3');
    expect(line.textContent).toBe('hello');
  });

  it('renders html markup contained in the text', () => {
    const line = createLine('STATUS: <span class="success">200 OK</span>', null, 0);
    expect(line.querySelector('span.success').textContent).toBe('200 OK');
  });

  it('adds a plain class as a css class', () => {
    const line = createLine('boot', 'highlight-purple', 0);
    expect(line.classList.contains('highlight-purple')).toBe(true);
    expect(line.querySelector('span')).toBeNull();
  });

  it('prepends a labelled badge for tag- classes', () => {
    const line = createLine('', 'tag-warn', 0);
    const badge = line.querySelector('span.tag-warn');
    expect(badge.textContent).toBe('[WARN]');
  });

  it('keeps the badge when text is appended after it', () => {
    const line = createLine('boom', 'tag-sys', 0);
    expect(line.querySelector('span.tag-sys').textContent).toBe('[SYS_INFO]');
    expect(line.textContent).toBe('[SYS_INFO]boom');
  });

  it('renders an empty line when there is no text or class', () => {
    const line = createLine('', null, 0);
    expect(line.innerHTML).toBe('');
  });
});

describe('createPrompt', () => {
  it('shows the timestamp and the command hint', () => {
    const prompt = createPrompt(new Date(2026, 7, 8, 9, 8, 7));
    expect(prompt.className).toBe('line');
    expect(prompt.textContent).toContain('[09:08:07]');
    expect(prompt.querySelector('.input-prompt').textContent).toBe('fajri$');
  });
});

describe('createDivider', () => {
  it('renders a fixed-width rule', () => {
    const divider = createDivider();
    expect(divider.className).toBe('divider');
    expect(divider.textContent).toBe('-'.repeat(40));
  });
});

describe('createEcho', () => {
  it('echoes the command after the prompt without executing markup', () => {
    const echo = createEcho(escapeHtml('<img onerror=alert(1)>'));
    expect(echo.querySelector('img')).toBeNull();
    expect(echo.textContent).toBe('fajri$ <img onerror=alert(1)>');
  });
});

describe('createSkillBar', () => {
  it('starts the fill at zero width and labels the level', () => {
    const [skill] = getSkillDefs(false);
    const { wrapper, fill } = createSkillBar(skill, false);
    expect(wrapper.querySelector('.skill-name').textContent)
      .toBe('After Effects[SEMI-PRO] 80%');
    expect(fill.style.width).toBe('0%');
    expect(fill.querySelector('.bar-text').textContent).toBe('80%');
  });

  it('colours the fill inline in terminal mode', () => {
    const [skill] = getSkillDefs(false);
    const { fill } = createSkillBar(skill, false);
    expect(fill.style.backgroundColor).toBe('var(--accent-pink)');
    expect(fill.className).toBe('skill-fill');
  });

  it('defers colouring to the css class in gui mode', () => {
    const [skill] = getSkillDefs(true);
    const { fill } = createSkillBar(skill, true);
    expect(fill.style.backgroundColor).toBe('');
    expect(fill.className).toBe('skill-fill ae');
  });
});

describe('createAssetGrid', () => {
  it('renders one item per asset with icon, name and size', () => {
    const grid = createAssetGrid();
    const items = grid.querySelectorAll('.asset-item');
    expect(items).toHaveLength(assetFiles.length);
    expect(items[0].querySelector('.asset-name').textContent).toBe('CCNA License.pdf');
    expect(items[0].querySelector('.asset-size').textContent).toBe('371.4 KB');
  });

  it('renders nothing for an empty list', () => {
    expect(createAssetGrid([]).children).toHaveLength(0);
  });
});

describe('createLinkGrid', () => {
  it('renders safe external anchors showing the hostname', () => {
    const grid = createLinkGrid();
    const anchors = grid.querySelectorAll('a.link-item');
    expect(anchors).toHaveLength(linkItems.length);
    for (const anchor of anchors) {
      expect(anchor.target).toBe('_blank');
      expect(anchor.rel).toBe('noopener noreferrer');
    }
    expect(anchors[1].getAttribute('href')).toBe('https://github.com/LazenFajri');
    expect(anchors[1].querySelector('.link-url').textContent).toBe('github.com');
  });
});

describe('createNote', () => {
  it('renders the note markup on a line', () => {
    const note = createNote('<span class="dim">hint</span>');
    expect(note.className).toBe('line');
    expect(note.querySelector('.dim').textContent).toBe('hint');
  });
});

describe('createProfileGrid', () => {
  it('renders the avatar and the profile fields', () => {
    const grid = createProfileGrid();
    expect(grid.className).toBe('profile-grid');
    expect(grid.querySelector('img.profile-pic').getAttribute('src'))
      .toBe('/assets/Muhammad Fajri Setyawan.png');
    expect(grid.querySelectorAll('.profile-details > div')).toHaveLength(8);
    expect(grid.textContent).toContain('Muhammad Fajri Setyawan');
  });
});

describe('appendAndScroll', () => {
  let body;

  beforeEach(() => {
    body = document.createElement('div');
    Object.defineProperty(body, 'scrollHeight', { value: 512, configurable: true });
  });

  it('appends the element and pins the scroll to the bottom', () => {
    const line = createLine('x', null, 0);
    expect(appendAndScroll(body, line)).toBe(line);
    expect(body.lastElementChild).toBe(line);
    expect(body.scrollTop).toBe(512);
  });
});
