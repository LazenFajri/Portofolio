import { describe, expect, it } from 'vitest';

import {
  assetFiles,
  assetsData,
  bootSequence,
  foods,
  getSkillDefs,
  helpLines,
  linkItems,
  linksData,
  skillsData,
  TAG_LABELS,
} from '../src/lib/terminal-data.js';
import { hostnameOf } from '../src/lib/terminal-utils.js';

describe('bootSequence', () => {
  it('only uses tags that have a label', () => {
    for (const entry of bootSequence) {
      if (entry.cls && entry.cls.startsWith('tag-')) {
        expect(TAG_LABELS).toHaveProperty(entry.cls);
      }
    }
  });

  it('gives every entry a numeric delay', () => {
    for (const entry of bootSequence) {
      expect(typeof entry.delay).toBe('number');
    }
  });

  it('has no printable text on skipped spacer entries', () => {
    for (const entry of bootSequence.filter((e) => e.skip)) {
      expect(entry.text).toBe('');
    }
  });

  it('ends by announcing the system is ready', () => {
    expect(bootSequence.at(-1).text).toContain('[SYSTEM READY]');
  });
});

describe('section data', () => {
  it.each([
    ['skills', skillsData],
    ['assets', assetsData],
    ['links', linksData],
  ])('%s has a numbered title and a known tag', (_name, data) => {
    expect(data.title).toMatch(/^\[0\d \/\/ .+\]$/);
    expect(TAG_LABELS).toHaveProperty(data.tag);
    expect(Array.isArray(data.lines)).toBe(true);
  });
});

describe('assetFiles', () => {
  it('matches the file count announced during boot', () => {
    const mountLine = bootSequence.find((e) => e.text.startsWith('MOUNTING /assets/'));
    const pdfCount = assetFiles.filter((f) => f.name.endsWith('.pdf')).length;
    expect(mountLine.text).toContain('7 files indexed');
    expect(pdfCount).toBe(3);
  });

  it('describes every file with a name, icon and size', () => {
    for (const file of assetFiles) {
      expect(file.name).toBeTruthy();
      expect(file.icon).toBeTruthy();
      expect(file.size).toMatch(/^[\d.]+ (B|KB|MB)$/);
    }
  });
});

describe('linkItems', () => {
  it('uses absolute https urls', () => {
    for (const link of linkItems) {
      expect(link.url.startsWith('https://')).toBe(true);
      expect(() => hostnameOf(link.url)).not.toThrow();
    }
  });

  it('has unique names', () => {
    expect(new Set(linkItems.map((l) => l.name)).size).toBe(linkItems.length);
  });
});

describe('getSkillDefs', () => {
  it('keeps names, levels and percentages stable across modes', () => {
    const terminal = getSkillDefs(false);
    const gui = getSkillDefs(true);
    expect(terminal.map((s) => [s.name, s.level, s.pct]))
      .toEqual(gui.map((s) => [s.name, s.level, s.pct]));
  });

  it('uses css classes in gui mode and inline colours in terminal mode', () => {
    expect(getSkillDefs(true).map((s) => s.className)).toEqual(['ae', 'hermes', 'coding']);
    expect(getSkillDefs(false).map((s) => s.className)).toEqual(['', '', '']);
    for (const skill of getSkillDefs(false)) {
      expect(skill.color).toMatch(/^var\(--accent-/);
    }
    for (const skill of getSkillDefs(true)) {
      expect(skill.color).toMatch(/^var\(--nb-/);
    }
  });

  it('keeps percentages in range and consistent with the level', () => {
    for (const skill of getSkillDefs(false)) {
      expect(skill.pct).toBeGreaterThan(0);
      expect(skill.pct).toBeLessThanOrEqual(100);
      expect(skill.pct).toBe(skill.level === 'SEMI-PRO' ? 80 : 40);
    }
  });

  it('returns a fresh array each call', () => {
    expect(getSkillDefs(false)).not.toBe(getSkillDefs(false));
  });
});

describe('helpLines and foods', () => {
  it('documents every user-facing command', () => {
    const help = helpLines.join('\n');
    for (const label of ['[1] SKILLS', '[2] ASSETS', '[3] LINKS', '[4] PROFILE', '[makan]', '[clear]', '[help]']) {
      expect(help).toContain(label);
    }
  });

  it('offers a non-empty food list', () => {
    expect(foods.length).toBeGreaterThan(0);
    expect(new Set(foods).size).toBe(foods.length);
  });
});
