// DOM builders for the FAJRI-OS terminal output.

import { assetFiles, linkItems } from './terminal-data.js';
import { fmtTime, hostnameOf, isTagClass, tagLabel } from './terminal-utils.js';

function doc(document) {
  return document || globalThis.document;
}

export function createLine(text, cls, delayIdx, document) {
  const d = doc(document);
  const line = d.createElement('div');
  line.className = 'line line-delay-' + delayIdx;
  if (cls) {
    if (isTagClass(cls)) {
      const tag = d.createElement('span');
      tag.className = cls;
      tag.textContent = tagLabel(cls);
      line.appendChild(tag);
    } else {
      line.classList.add(cls);
    }
  }
  if (text) { line.innerHTML += text; }
  return line;
}

export function createPrompt(now = new Date(), document) {
  const prompt = doc(document).createElement('div');
  prompt.className = 'line';
  prompt.innerHTML = '<span class="dim">[' + fmtTime(now) + ']</span> <span class="input-prompt">fajri$</span> <span class="dim">Ketik [1] SKILLS | [2] ASSETS/LICENSE | [3] LINKS | [4] PROFILE</span>';
  return prompt;
}

export function createDivider(document) {
  const div = doc(document).createElement('div');
  div.className = 'divider';
  div.textContent = '----------------------------------------';
  return div;
}

export function createEcho(escapedCmd, document) {
  const echo = doc(document).createElement('div');
  echo.className = 'line';
  echo.innerHTML = '<span class="highlight-pink">fajri$</span> ' + escapedCmd;
  return echo;
}

export function createSkillBar(skill, isGui, document) {
  const d = doc(document);
  const wrapper = d.createElement('div');
  wrapper.className = 'skill-bar';
  wrapper.innerHTML = '<div class="skill-name"><span>' + skill.name + '</span><span class="level-label">[' + skill.level + '] ' + skill.pct + '%</span></div>';
  const track = d.createElement('div');
  track.className = 'skill-track';
  const fill = d.createElement('div');
  fill.className = 'skill-fill' + (skill.className ? ' ' + skill.className : '');
  fill.style.width = '0%';
  if (!isGui) { fill.style.backgroundColor = skill.color; }
  const barText = d.createElement('span');
  barText.className = 'bar-text';
  barText.textContent = skill.pct + '%';
  fill.appendChild(barText);
  track.appendChild(fill);
  wrapper.appendChild(track);
  return { wrapper, fill };
}

export function createAssetGrid(files = assetFiles, document) {
  const d = doc(document);
  const grid = d.createElement('div');
  grid.className = 'asset-grid';
  files.forEach((file) => {
    const item = d.createElement('div');
    item.className = 'asset-item';
    item.innerHTML = '<span class="asset-icon">' + file.icon + '</span><span class="asset-name">' + file.name + '</span><span class="asset-size dim">' + file.size + '</span>';
    grid.appendChild(item);
  });
  return grid;
}

export function createLinkGrid(items = linkItems, document) {
  const d = doc(document);
  const grid = d.createElement('div');
  grid.className = 'link-grid';
  items.forEach((link) => {
    const item = d.createElement('a');
    item.className = 'link-item';
    item.href = link.url;
    item.target = '_blank';
    item.rel = 'noopener noreferrer';
    item.innerHTML = '<span class="link-icon">' + link.icon + '</span><span class="link-text">' + link.name + '</span><span class="link-url dim">' + hostnameOf(link.url) + '</span>';
    grid.appendChild(item);
  });
  return grid;
}

export function createNote(html, document) {
  const note = doc(document).createElement('div');
  note.className = 'line';
  note.innerHTML = html;
  return note;
}

export function createProfileGrid(document) {
  const grid = doc(document).createElement('div');
  grid.className = 'profile-grid';
  grid.innerHTML =
    '<img src="/assets/Muhammad Fajri Setyawan.png" alt="Muhammad Fajri Setyawan" class="profile-pic" width="120" height="120" loading="eager" decoding="async" />' +
    '<div class="profile-details">' +
      '<div><span class="label">Nama Lengkap</span><br/><span class="value highlight">Muhammad Fajri Setyawan</span></div>' +
      '<div><span class="label">Username</span><br/><span class="value highlight-pink">LazenFajri</span> <span class="badge badge-coder">CODER</span></div>' +
      '<div><span class="label">Status</span><br/><span class="value">Undergraduate Student (Mahasiswa)</span> <span class="badge badge-student">STUDENT</span></div>' +
      '<div><span class="label">Institution</span><br/><span class="value">Universitas Dian Nuswarmantoro (UDINUS)</span></div>' +
      '<div><span class="label">Major</span><br/><span class="value">Teknik Informatika (Informatics Engineering)</span></div>' +
      '<div><span class="label">Prior Education</span><br/><span class="value">SMK Negeri 7 Semarang</span></div>' +
      '<div><span class="label">Hobby</span><br/><span class="value makan">Food &amp; Culinary Exploration ("Makan") 🍲</span></div>' +
      '<div><span class="label">Agent</span><br/><span class="value dim">FAJRI-OS v2026.08 — AI Terminal Agent</span></div>' +
    '</div>';
  return grid;
}

export function appendAndScroll(body, el) {
  body.appendChild(el);
  body.scrollTop = body.scrollHeight;
  return el;
}
