import { describe, expect, it } from 'vitest';

import {
  bounceVelocity,
  escapeHtml,
  fmtTime,
  hostnameOf,
  isTagClass,
  lineDelayIndex,
  modeToggleLabels,
  nextMode,
  normalizeCommand,
  pad2,
  parseSpeed,
  pickRandom,
  repel,
  resolveCommand,
  scrollTransform,
  shapeTransform,
  tagLabel,
} from '../src/lib/terminal-utils.js';
import { foods, MAX_LINE_DELAY_INDEX } from '../src/lib/terminal-data.js';

describe('normalizeCommand', () => {
  it('trims and lowercases', () => {
    expect(normalizeCommand('  SkIlLs \n')).toBe('skills');
  });

  it('treats null and undefined as empty', () => {
    expect(normalizeCommand(null)).toBe('');
    expect(normalizeCommand(undefined)).toBe('');
  });
});

describe('resolveCommand', () => {
  const cases = [
    ['', 'help'],
    ['   ', 'help'],
    ['help', 'help'],
    ['H', 'help'],
    ['?', 'help'],
    ['1', 'skills'],
    ['skills', 'skills'],
    ['SKILL', 'skills'],
    ['2', 'assets'],
    ['assets', 'assets'],
    ['license', 'assets'],
    ['cert', 'assets'],
    ['3', 'links'],
    ['links', 'links'],
    ['social', 'links'],
    ['connect', 'links'],
    ['4', 'profile'],
    ['profile', 'profile'],
    ['about', 'profile'],
    ['whoami', 'profile'],
    ['makan', 'makan'],
    ['hobby', 'makan'],
    ['eat', 'makan'],
    ['4321', 'port'],
    ['port', 'port'],
    ['clear', 'clear'],
    ['cls', 'clear'],
  ];

  it.each(cases)('maps %j to %s', (input, expected) => {
    expect(resolveCommand(input)).toBe(expected);
  });

  it('falls back to unknown', () => {
    expect(resolveCommand('rm -rf /')).toBe('unknown');
    expect(resolveCommand('5')).toBe('unknown');
  });

  it('does not resolve inherited Object.prototype keys', () => {
    expect(resolveCommand('constructor')).toBe('unknown');
    expect(resolveCommand('toString')).toBe('unknown');
  });
});

describe('escapeHtml', () => {
  it('escapes html-significant characters', () => {
    expect(escapeHtml('<script>alert("x")</script>'))
      .toBe('&lt;script&gt;alert("x")&lt;/script&gt;');
  });

  it('escapes ampersands before entities', () => {
    expect(escapeHtml('&lt;')).toBe('&amp;lt;');
  });

  it('handles empty input', () => {
    expect(escapeHtml('')).toBe('');
    expect(escapeHtml(null)).toBe('');
  });
});

describe('fmtTime', () => {
  it('zero-pads hours, minutes and seconds', () => {
    expect(fmtTime(new Date(2026, 7, 8, 4, 5, 6))).toBe('04:05:06');
  });

  it('uses 24 hour clock', () => {
    expect(fmtTime(new Date(2026, 7, 8, 23, 59, 59))).toBe('23:59:59');
  });

  it('defaults to now', () => {
    expect(fmtTime()).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it('pads single digits only', () => {
    expect(pad2(7)).toBe('07');
    expect(pad2(17)).toBe('17');
  });
});

describe('tag helpers', () => {
  it('detects tag classes', () => {
    expect(isTagClass('tag-sys')).toBe(true);
    expect(isTagClass('highlight')).toBe(false);
    expect(isTagClass(undefined)).toBe(false);
  });

  it('maps known tags to labels', () => {
    expect(tagLabel('tag-sys')).toBe('[SYS_INFO]');
    expect(tagLabel('tag-warn')).toBe('[WARN]');
  });

  it('brackets unknown tags', () => {
    expect(tagLabel('tag-custom')).toBe('[tag-custom]');
  });
});

describe('lineDelayIndex', () => {
  it('passes through indices within range', () => {
    expect(lineDelayIndex(0)).toBe(0);
    expect(lineDelayIndex(MAX_LINE_DELAY_INDEX)).toBe(MAX_LINE_DELAY_INDEX);
  });

  it('clamps beyond the last delay class', () => {
    expect(lineDelayIndex(99)).toBe(MAX_LINE_DELAY_INDEX);
  });
});

describe('hostnameOf', () => {
  it('extracts the hostname', () => {
    expect(hostnameOf('https://github.com/LazenFajri')).toBe('github.com');
    expect(hostnameOf('https://youtube.com/@fajriaep580?si=abc')).toBe('youtube.com');
  });

  it('throws on invalid urls', () => {
    expect(() => hostnameOf('not-a-url')).toThrow();
  });
});

describe('mode helpers', () => {
  it('toggles between modes', () => {
    expect(nextMode('terminal')).toBe('gui');
    expect(nextMode('gui')).toBe('terminal');
  });

  it('treats an unset mode as terminal', () => {
    expect(nextMode(undefined)).toBe('gui');
  });

  it('returns matching toggle labels', () => {
    expect(modeToggleLabels('gui')).toEqual({ icon: '▣', label: 'TERM' });
    expect(modeToggleLabels('terminal')).toEqual({ icon: '□', label: 'GUI' });
  });
});

describe('parseSpeed', () => {
  it('parses numeric attribute values', () => {
    expect(parseSpeed('0.15', 0.1)).toBeCloseTo(0.15);
    expect(parseSpeed('-0.2', 0.1)).toBeCloseTo(-0.2);
  });

  it('falls back for missing, zero or invalid values', () => {
    expect(parseSpeed(null, 0.05)).toBe(0.05);
    expect(parseSpeed('abc', 0.05)).toBe(0.05);
    expect(parseSpeed('0', 0.05)).toBe(0.05);
  });
});

describe('transforms', () => {
  it('builds the mousemove shape transform', () => {
    expect(shapeTransform(100, 50, 0.5))
      .toBe('translate3d(20px, 10px, 0) rotate(2deg)');
  });

  it('builds an inverted scroll transform', () => {
    expect(scrollTransform(200, 0.05)).toBe('translate3d(0, -10px, 0)');
    expect(scrollTransform(0, 0.05)).toBe('translate3d(0, 0px, 0)');
  });
});

describe('pickRandom', () => {
  it('picks by random position', () => {
    expect(pickRandom(['a', 'b', 'c'], () => 0)).toBe('a');
    expect(pickRandom(['a', 'b', 'c'], () => 0.99)).toBe('c');
  });

  it('never overflows the list', () => {
    for (const r of [0, 0.5, 0.999999]) {
      expect(foods).toContain(pickRandom(foods, () => r));
    }
  });
});

describe('bounceVelocity', () => {
  it('inverts velocity outside the bounds', () => {
    expect(bounceVelocity(-1, 0.7, 100)).toBeCloseTo(-0.7);
    expect(bounceVelocity(101, -0.7, 100)).toBeCloseTo(0.7);
  });

  it('keeps velocity inside the bounds', () => {
    expect(bounceVelocity(50, 0.7, 100)).toBeCloseTo(0.7);
  });
});

describe('repel', () => {
  it('pushes the particle away from a nearby pointer', () => {
    const moved = repel({ x: 10, y: 0 }, 20, 0);
    expect(moved.x).toBeCloseTo(7.5);
    expect(moved.y).toBeCloseTo(0);
  });

  it('leaves distant particles untouched', () => {
    expect(repel({ x: 0, y: 0 }, 500, 500)).toEqual({ x: 0, y: 0 });
  });

  it('leaves a particle under the pointer untouched', () => {
    expect(repel({ x: 42, y: 7 }, 42, 7)).toEqual({ x: 42, y: 7 });
  });
});
