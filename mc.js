'use strict';

/* =====================================================================
 *  Midnight Commander mimic, rendered into a real terminal (xterm.js)
 *  Everything runs in your browser. No server, no PTY, no socket.
 * ===================================================================== */

/* ------------------------ Fake filesystem -------------------------- */

const FS = {
  '/': [
    { n: 'bin', t: 'd' },
    { n: 'boot', t: 'd' },
    { n: 'dev', t: 'd' },
    { n: 'etc', t: 'd' },
    { n: 'home', t: 'd' },
    { n: 'lib', t: 'd' },
    { n: 'lib64', t: 'd' },
    { n: 'proc', t: 'd' },
    { n: 'root', t: 'd' },
    { n: 'run', t: 'd' },
    { n: 'sbin', t: 'd' },
    { n: 'tmp', t: 'd' },
    { n: 'usr', t: 'd' },
    { n: 'var', t: 'd' },
    { n: 'initrd.img', t: 'f', size: 26214400, date: 'Apr 10 2024' },
  ],
  '/bin': [
    { n: 'bash', t: 'x', size: 1208000, date: 'Feb 12 2025' },
    { n: 'ls', t: 'x', size: 142384, date: 'Feb 12 2025' },
    { n: 'mv', t: 'x', size: 131072, date: 'Feb 12 2025' },
    { n: 'sh', t: 'x', size: 131072, date: 'Feb 12 2025' },
  ],
  '/etc': [
    { n: 'hostname', t: 'f', size: 12, date: 'Jan 09 2025' },
    { n: 'hosts', t: 'f', size: 352, date: 'Jan 09 2025' },
    { n: 'passwd', t: 'f', size: 2100, date: 'Apr 03 2025' },
    { n: 'fstab', t: 'f', size: 512, date: 'Mar 11 2024' },
    { n: 'mc', t: 'd' },
  ],
  '/etc/mc': [
    { n: 'cedit.menu', t: 'f', size: 1280, date: 'Feb 08 2023' },
    { n: 'filehighlight.ini', t: 'f', size: 896, date: 'Feb 08 2023' },
    { n: 'ini', t: 'f', size: 2048, date: 'Feb 08 2023' },
    { n: 'cedit.ini', t: 'f', size: 400, date: 'Feb 08 2023' },
  ],
  '/home': [{ n: 'demo', t: 'd' }],
  '/home/demo': [
    { n: 'Documents', t: 'd' },
    { n: 'Downloads', t: 'd' },
    { n: 'Projects', t: 'd' },
    { n: '.config', t: 'd' },
    { n: '.bashrc', t: 'f', size: 3521, date: 'Mar 02 2025' },
    { n: 'notes.txt', t: 'f', size: 128, date: 'May 10 2025' },
    { n: 'hello.sh', t: 'x', size: 89, date: 'Jan 15 2025' },
    { n: 'latest.tar.gz', t: 'l', tgt: '/home/demo/Projects/mc-demo.tar.gz', size: 33, date: 'May 12 2026' },
  ],
  '/home/demo/Documents': [
    { n: 'letter.odt', t: 'f', size: 18842, date: 'Apr 14 2025' },
    { n: 'todo.md', t: 'f', size: 240, date: 'May 03 2025' },
    { n: 'archive', t: 'd' },
  ],
  '/home/demo/Documents/archive': [
    { n: '2024.zip', t: 'f', size: 104857600, date: 'Dec 31 2024' },
  ],
  '/home/demo/Downloads': [
    { n: 'image.png', t: 'f', size: 4096000, date: 'May 01 2025' },
    { n: 'setup.run', t: 'x', size: 25001984, date: 'Apr 18 2025' },
  ],
  '/home/demo/Projects': [
    { n: 'mc-demo.tar.gz', t: 'f', size: 4096, date: 'May 12 2026' },
    { n: 'static-site', t: 'd' },
  ],
  '/home/demo/Projects/static-site': [
    { n: 'index.html', t: 'f', size: 842, date: 'May 12 2026' },
    { n: 'mc.js', t: 'f', size: 13500, date: 'May 12 2026' },
  ],
  '/home/demo/.config': [{ n: 'mc', t: 'd' }],
  '/home/demo/.config/mc': [
    { n: 'ini', t: 'f', size: 1200, date: 'Feb 09 2024' },
    { n: 'panels.ini', t: 'f', size: 644, date: 'Feb 09 2024' },
  ],
  '/usr': [
    { n: 'bin', t: 'd' },
    { n: 'lib', t: 'd' },
    { n: 'share', t: 'd' },
    { n: 'local', t: 'd' },
  ],
  '/usr/share': [
    { n: 'mc', t: 'd' },
    { n: 'man', t: 'd' },
    { n: 'doc', t: 'd' },
  ],
  '/usr/share/mc': [
    { n: 'skins', t: 'd' },
    { n: 'syntax', t: 'd' },
    { n: 'help.hlp', t: 'f', size: 98304, date: 'Feb 08 2023' },
  ],
  '/usr/share/mc/skins': [
    { n: 'default.ini', t: 'f', size: 8192, date: 'Feb 08 2023' },
    { n: 'featured.ini', t: 'f', size: 2048, date: 'Feb 08 2023' },
  ],
  '/var': [
    { n: 'log', t: 'd' },
    { n: 'tmp', t: 'd' },
    { n: 'www', t: 'd' },
  ],
  '/var/log': [
    { n: 'syslog', t: 'f', size: 524288, date: 'May 12 2026' },
    { n: 'auth.log', t: 'f', size: 98304, date: 'May 11 2026' },
    { n: 'kern.log', t: 'f', size: 163840, date: 'May 10 2026' },
  ],
};

const FILE_CONTENTS = {
  '/home/demo/notes.txt':
    'Welcome to this static Midnight Commander mimic.\n\n' +
    'It runs as a real terminal in your browser (xterm.js) but with\n' +
    'no server, PTY or websocket — the panels are drawn by JavaScript\n' +
    'using ANSI escape sequences and box-drawing characters.\n',
  '/home/demo/.bashrc':
    '# ~/.bashrc — mock snippet\nalias ll="ls -alF"\nexport EDITOR=mcedit\nPS1="\\u@\\h:\\w\\$ "\n',
  '/home/demo/hello.sh': '#!/usr/bin/env bash\necho "Hello from hello.sh"\n',
  '/home/demo/Documents/todo.md': '# Demo\n\n- [ ] Fancy skins\n- [x] Navigate with arrows\n',
  '/home/demo/Projects/static-site/index.html':
    '<!DOCTYPE html>\n<html lang="en">\n<title>tiny</title>\n<body>hello</body>\n</html>\n',
  '/etc/passwd':
    'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\ndemo:x:1000:1000:/home/demo:/bin/bash\n',
  '/etc/hosts': '127.0.0.1 localhost\n::1 localhost ip6-localhost\n',
  '/etc/hostname': 'vibing-demo\n',
  '/etc/fstab': '# fstab demo\n/dev/sda1 / ext4 defaults 0 1\n',
};

/* ---------------------------- ANSI helpers --------------------------- */

const ESC = '\x1b';
const CSI = ESC + '[';

const sgr = (...codes) => `${CSI}${codes.join(';')}m`;
const RESET = sgr(0);
const moveTo = (row, col) => `${CSI}${row};${col}H`;
const clearScreen = `${CSI}2J${CSI}H`;
const hideCursor = `${CSI}?25l`;
const showCursor = `${CSI}?25h`;
const useAltScreen = `${CSI}?1049h`;
const enableMouse = `${CSI}?1000h${CSI}?1006h`; // X10 + SGR encoding
const disableMouse = `${CSI}?1000l${CSI}?1006l`;

/* MC default skin (modarin / classic): blue panels, cyan dirs, etc. */
const COL = {
  base:        sgr(0, 37, 44),     // reset, light grey on blue
  panelBg:     sgr(0, 37, 44),     // blue background, foreground reset
  // Frame for inactive panels: explicitly turn off bold (22) so it never
  // inherits the active panel's bold-white attribute and renders as
  // bright white instead of the intended silver/light-grey.
  frame:       sgr(22, 37, 44),    // light grey frame on blue
  frameActive: sgr(1, 97, 44),     // bold white frame on blue
  title:       sgr(1, 97, 44),  // bold white on blue
  pathFocus:   sgr(30, 47),     // black on white
  header:      sgr(1, 93, 44),  // bold yellow on blue
  hint:        sgr(1, 97, 44),  // bold white on blue
  rowFile:     sgr(37, 44),     // grey on blue
  rowDir:      sgr(1, 97, 44),  // bold white on blue (mc dirs)
  rowExec:     sgr(1, 92, 44),  // bold green
  rowLink:     sgr(1, 96, 44),  // bold cyan
  rowSpecial:  sgr(1, 95, 44),  // bold magenta
  selBase:     sgr(1, 97, 46),  // bold white on cyan (selected)
  selDir:      sgr(1, 97, 46),
  selExec:     sgr(1, 93, 46),  // bright yellow on cyan
  selLink:     sgr(1, 95, 46),
  status:      sgr(30, 46),     // black on cyan
  // MC's classic menus and dialogs use a teal (cyan) background, with the
  // hot letter highlighted in yellow and the current item in white-on-blue.
  menubar:     sgr(22, 30, 46),     // black on teal
  menubarHot:  sgr(1, 93, 46),      // bold yellow on teal
  menuBg:      sgr(22, 30, 46),     // black on teal (dropdown body)
  menuHot:     sgr(1, 93, 46),      // bold yellow on teal (hot letter)
  menuSel:     sgr(1, 97, 44),      // bold white on blue (selected item)
  fkeyNum:     sgr(37, 40),     // grey on black
  fkeyLbl:     sgr(30, 46),     // black on cyan
  shadow:      sgr(30, 40),     // black on black for drop-shadow
  dialog:      sgr(30, 47),     // black on grey
  dialogTitle: sgr(1, 31, 47),
  command:     sgr(37, 40),     // grey on black for command line
};

const BOX = {
  h: '─', v: '│',
  tl: '┌', tr: '┐', bl: '└', br: '┘',
  tee_l: '├', tee_r: '┤', tee_t: '┬', tee_b: '┴', cross: '┼',
  // doubles for active panel
  H: '═', V: '║', TL: '╔', TR: '╗', BL: '╚', BR: '╝',
  TEE_L: '╠', TEE_R: '╣', TEE_T: '╦', TEE_B: '╩',
};

/* ---------------------------- App state ----------------------------- */

const state = {
  /** @type {'left'|'right'} */ active: 'left',
  left:  { path: '/home/demo', index: 0, top: 0 },
  right: { path: '/etc',       index: 0, top: 0 },
  cols: 80, rows: 24,
  modal: null,        // { title, lines }
  menuOpenIdx: -1,    // index into MENU_TITLES
  menuItemIdx: 0,
  /** Click pairing for "first click selects, second click opens" */
  lastClick: '',
  /** layout cache for hit testing */
  layout: null,
};

/* ----------------------- Filesystem helpers ------------------------- */

function rowsForDir(cwd) {
  const out = [{ raw: { n: '..', t: 'd' } }];
  const bucket = FS[cwd];
  if (!bucket) {
    out.push({ ghost: true, raw: { n: '(no scripted entries here)', t: 'f' } });
    return out;
  }
  for (const r of bucket) out.push({ raw: r });
  return out;
}

function parentPath(p) {
  const x = p.replace(/\/$/, '') || '/';
  if (x === '/') return '/';
  const i = x.lastIndexOf('/');
  return i <= 0 ? '/' : x.slice(0, i);
}

function joinPath(dir, name) {
  const s = name.replace(/\/+$/, '');
  return dir === '/' ? '/' + s : `${dir}/${s}`;
}

function rowDisplayName(row) {
  const r = row.raw;
  if (row.ghost) return r.n;
  if (r.n === '..') return '/..';
  if (r.t === 'd') return '/' + r.n;
  if (r.t === 'x') return '*' + r.n;
  if (r.t === 'l') return '@' + r.n;
  return ' ' + r.n;
}

function rowColor(row, selected) {
  if (selected) {
    if (row.raw.t === 'd' || row.raw.n === '..') return COL.selDir;
    if (row.raw.t === 'x') return COL.selExec;
    if (row.raw.t === 'l') return COL.selLink;
    return COL.selBase;
  }
  if (row.raw.t === 'd' || row.raw.n === '..') return COL.rowDir;
  if (row.raw.t === 'x') return COL.rowExec;
  if (row.raw.t === 'l') return COL.rowLink;
  return COL.rowFile;
}

function formatSize(v) {
  if (v == null || v === '') return '';
  const n = Number(v);
  if (!Number.isFinite(n)) return String(v);
  if (n < 1024) return String(n);
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}K`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)}M`;
  return `${(n / 1024 / 1024 / 1024).toFixed(1)}G`;
}

function padRight(s, w) {
  s = String(s ?? '');
  if (s.length > w) return s.slice(0, Math.max(0, w - 1)) + '~';
  return s + ' '.repeat(w - s.length);
}
function padLeft(s, w) {
  s = String(s ?? '');
  if (s.length > w) return s.slice(s.length - w);
  return ' '.repeat(w - s.length) + s;
}
function center(s, w) {
  s = String(s ?? '');
  if (s.length >= w) return s.slice(0, w);
  const left = Math.floor((w - s.length) / 2);
  return ' '.repeat(left) + s + ' '.repeat(w - s.length - left);
}

/* ============================ Renderer ============================== */

/** Pick a font size that lets the full MC layout fit horizontally. */
function pickFontSize() {
  // Target at least 80 columns of usable width.
  // xterm cells are ~0.6 of font size for monospace; pad for borders/scrollbars.
  const TARGET_COLS = 80;
  const CELL_RATIO = 0.6;
  const padding = 16; // matches #term padding (6px each side) + a little slack
  const w = Math.max(180, window.innerWidth - padding);
  const ideal = Math.floor(w / (TARGET_COLS * CELL_RATIO));
  // Clamp: never bigger than 15 (desktop), never smaller than 8 (very small phones)
  return Math.max(8, Math.min(15, ideal));
}

const term = new Terminal({
  fontSize: pickFontSize(),
  fontFamily: 'ui-monospace, "DejaVu Sans Mono", "Cascadia Mono", Menlo, Consolas, monospace',
  lineHeight: 1.0,
  letterSpacing: 0,
  theme: {
    background: '#000000',
    foreground: '#c8c8c8',
    cursor: '#c8c8c8',
    black: '#000000',     red: '#aa0000',     green: '#00aa00',     yellow: '#aa5500',
    blue: '#0000aa',      magenta: '#aa00aa', cyan: '#00aaaa',      white: '#aaaaaa',
    brightBlack: '#555555', brightRed: '#ff5555', brightGreen: '#55ff55',
    brightYellow: '#ffff55', brightBlue: '#5555ff', brightMagenta: '#ff55ff',
    brightCyan: '#55ffff', brightWhite: '#ffffff',
  },
  allowProposedApi: true,
  scrollback: 0,
  convertEol: false,
  disableStdin: false,
  cursorBlink: false,
});

const fit = new FitAddon.FitAddon();
term.loadAddon(fit);
term.open(document.getElementById('term'));
fit.fit();
term.write(useAltScreen + hideCursor + enableMouse);

/**
 * Touch devices focus xterm's hidden textarea on every tap, which makes the
 * on-screen keyboard pop up. We don't accept text input from mobile users
 * here (the UI is fully driven by clicks/taps), so disable that behavior.
 */
const IS_TOUCH = window.matchMedia?.('(pointer: coarse)').matches
              || ('ontouchstart' in window);

function suppressSoftKeyboard() {
  // The textarea is xterm's input target. Make it inert and unfocusable.
  const ta = term.element?.querySelector('.xterm-helper-textarea');
  if (ta) {
    ta.setAttribute('readonly', 'readonly');
    ta.setAttribute('inputmode', 'none');
    ta.setAttribute('aria-hidden', 'true');
    ta.tabIndex = -1;
    ta.style.display = 'none';
  }
  // If anything in the terminal tree gets focus, immediately blur it.
  term.element?.addEventListener('focusin', (e) => {
    if (e.target && typeof e.target.blur === 'function') e.target.blur();
  }, true);
  // Swallow taps from raising focus on iOS/Android.
  term.element?.addEventListener('touchstart', (e) => {
    // Don't preventDefault — we still want our SGR mouse handler to receive
    // the click. Just ensure focus doesn't land on the textarea.
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur?.();
    }
  }, { passive: true });
}

if (IS_TOUCH) suppressSoftKeyboard();

function reflowTerminal() {
  const desired = pickFontSize();
  if (term.options.fontSize !== desired) {
    term.options.fontSize = desired;
  }
  fit.fit();
  state.cols = term.cols;
  state.rows = term.rows;
  render();
}

window.addEventListener('resize', reflowTerminal);
window.addEventListener('orientationchange', () => {
  // Wait for layout to settle on iOS / Android
  setTimeout(reflowTerminal, 150);
});
// Re-fit once after fonts load (xterm measures the cell from the canvas)
document.fonts?.ready?.then(reflowTerminal).catch(() => {});
state.cols = term.cols;
state.rows = term.rows;

/* ------------------------ Top menu definitions ---------------------- */

const MENU_TITLES = [
  { label: 'Left', hot: 0, key: 'left' },
  { label: 'File', hot: 0, key: 'file' },
  { label: 'Command', hot: 0, key: 'command' },
  { label: 'Options', hot: 0, key: 'options' },
  { label: 'Right', hot: 0, key: 'right' },
];

const MENUS = {
  left: [
    { label: 'Listing mode...',        action: () => placeholder('Left → Listing mode') },
    { label: 'Sort order...',          action: () => placeholder('Left → Sort order') },
    { label: 'Filter...',              action: () => placeholder('Left → Filter') },
    { label: 'Rescan          C-r',    action: () => render() },
  ],
  file: [
    { label: 'View              F3',  action: () => handleF(3) },
    { label: 'Edit              F4',  action: () => handleF(4) },
    { label: 'Copy              F5',  action: () => handleF(5) },
    { label: 'Rename/Move       F6',  action: () => handleF(6) },
    { label: 'Make directory    F7',  action: () => handleF(7) },
    { label: 'Delete            F8',  action: () => handleF(8) },
    { label: 'Quit             F10',  action: () => handleF(10) },
  ],
  command: [
    { label: 'User menu        F2',   action: () => handleF(2) },
    { label: 'Find file       M-?',   action: () => placeholder('Command → Find') },
    { label: 'Compare directories',   action: () => placeholder('Command → Compare') },
    { label: 'Directory tree',        action: () => placeholder('Command → Tree') },
  ],
  options: [
    { label: 'Configuration...',      action: () => placeholder('Options → Configuration') },
    { label: 'Layout...',             action: () => placeholder('Options → Layout') },
    { label: 'Panel options...',      action: () => placeholder('Options → Panels') },
    { label: 'Appearance...',         action: () => placeholder('Options → Appearance') },
  ],
  right: [
    { label: 'Listing mode...',        action: () => placeholder('Right → Listing mode') },
    { label: 'Sort order...',          action: () => placeholder('Right → Sort order') },
    { label: 'Filter...',              action: () => placeholder('Right → Filter') },
    { label: 'Rescan          C-r',    action: () => render() },
  ],
};

const FKEYS = [
  ['1', 'Help'], ['2', 'Menu'], ['3', 'View'],   ['4', 'Edit'],   ['5', 'Copy'],
  ['6', 'RenMov'], ['7', 'Mkdir'], ['8', 'Delete'], ['9', 'PullDn'], ['10', 'Quit'],
];

/* ------------------------- Layout / drawing ------------------------- */

function buildLayout() {
  const cols = state.cols;
  const rows = state.rows;
  const menubarRow = 1;
  const panelTop = 2;
  const panelBottom = rows - 3; // rows-2: command line, rows-1: hint?  rows: fkeys
  const panelHeight = panelBottom - panelTop + 1;
  const splitCol = Math.floor(cols / 2);
  const leftPanel  = { row: panelTop, col: 1,             w: splitCol,            h: panelHeight };
  const rightPanel = { row: panelTop, col: splitCol + 1,  w: cols - splitCol,     h: panelHeight };
  const hintRow    = rows - 2;
  const cmdRow     = rows - 1;
  const fkeysRow   = rows;

  // Compute menu title positions (cells)
  const titles = [];
  let x = 2;
  for (const m of MENU_TITLES) {
    titles.push({ ...m, x, w: m.label.length });
    x += m.label.length + 2;
  }

  return { cols, rows, menubarRow, leftPanel, rightPanel, hintRow, cmdRow, fkeysRow, titles };
}

function drawMenubar(L) {
  let line = COL.menubar;
  // fill the whole menubar row with light grey on grey
  line += moveTo(L.menubarRow, 1) + COL.menubar + ' '.repeat(L.cols);
  for (let i = 0; i < L.titles.length; i++) {
    const t = L.titles[i];
    const open = state.menuOpenIdx === i;
    const baseAttr = open ? COL.menuSel : COL.menubar;
    line += moveTo(L.menubarRow, t.x);
    // Highlight the hot letter. When the menu is open, keep the hot letter
    // bright yellow but on the same blue background as the title bar so it
    // visually ties together with the dropdown's selection bar.
    const hotAttr = open ? sgr(1, 93, 44) : COL.menubarHot;
    for (let ci = 0; ci < t.label.length; ci++) {
      const ch = t.label[ci];
      if (ci === t.hot) {
        line += hotAttr + ch + baseAttr;
      } else {
        line += baseAttr + ch;
      }
    }
  }
  return line;
}

function drawPanel(side, P) {
  const isActive = state.active === side;
  const pan = state[side];
  const rows = rowsForDir(pan.path);
  // ensure index in range
  pan.index = Math.max(0, Math.min(pan.index, rows.length - 1));

  // Reserve 2 rows for borders, 1 for column header, 1 for mini-status
  const innerH = P.h - 2;
  const listH = innerH - 2; // -1 col header, -1 mini status
  // Scroll window
  if (pan.index < pan.top) pan.top = pan.index;
  if (pan.index >= pan.top + listH) pan.top = pan.index - listH + 1;
  if (pan.top < 0) pan.top = 0;

  const frameAttr = isActive ? COL.frameActive : COL.frame;
  const tl = isActive ? BOX.TL : BOX.tl;
  const tr = isActive ? BOX.TR : BOX.tr;
  const bl = isActive ? BOX.BL : BOX.bl;
  const br = isActive ? BOX.BR : BOX.br;
  const hb = isActive ? BOX.H  : BOX.h;
  const vb = isActive ? BOX.V  : BOX.v;

  // Always start the panel from a clean SGR state. This prevents any
  // attribute bleed (most importantly the 'bold' bit) from a previously
  // drawn region — that's what made inactive single-line frames render
  // as bright white instead of light grey.
  let out = RESET + frameAttr;

  // Top border with title (path).
  // Use the panel's own frame attribute for the title too, so an inactive
  // panel never shows a grey-on-white strip while the rest of its border
  // is blue. Active panels keep the highlighted "white on cyan" title.
  const title = ' ' + truncTitle(pan.path, P.w - 4) + ' ';
  const dashLeft = Math.floor((P.w - 2 - title.length) / 2);
  const dashRight = P.w - 2 - title.length - dashLeft;
  const titleAttr = isActive ? sgr(1, 30, 46) : COL.title; // bold white on blue when inactive
  out += moveTo(P.row, P.col) + frameAttr + tl + hb.repeat(dashLeft) +
         titleAttr + title +
         frameAttr + hb.repeat(dashRight) + tr;

  // Inner rows: column header + listing rows + mini status
  // Always use the panel's own frame color for inner column separators,
  // even on inactive panels, so nothing leaks between sides.
  const innerSepAttr = COL.frame; // single light grey '│' for inner column rules
  const innerSep = COL.frame + BOX.v;

  // Column header
  const headerY = P.row + 1;
  const colNameW = P.w - 2 - 9 - 1 - 13 - 1; // name | size(8) | date(12) plus seps
  const headerLine = COL.header + padRight(' Name', colNameW) +
                     innerSep +
                     COL.header + center('Size', 9) +
                     innerSep +
                     COL.header + center('Modify time', 13);
  out += moveTo(headerY, P.col) + frameAttr + vb + headerLine + frameAttr + vb;

  // Listing rows
  for (let i = 0; i < listH; i++) {
    const dataIdx = pan.top + i;
    const y = headerY + 1 + i;
    out += moveTo(y, P.col) + frameAttr + vb;
    if (dataIdx >= rows.length) {
      // Empty row: still draw the column separators so the panel reads
      // like a real MC listing instead of fading to a flat blue field.
      out += COL.panelBg + ' '.repeat(colNameW) +
             innerSep +
             COL.panelBg + ' '.repeat(9) +
             innerSep +
             COL.panelBg + ' '.repeat(13);
    } else {
      const row = rows[dataIdx];
      const selected = dataIdx === pan.index && isActive;
      const focused  = dataIdx === pan.index && !isActive; // dim selection on inactive panel
      const attr = selected ? rowColor(row, true)
                  : focused  ? sgr(0, 36, 44) // dim cyan on blue
                  : rowColor(row, false);

      const name = rowDisplayName(row);
      const size = row.raw.t === 'd' && row.raw.n !== '..' ? '<DIR>'
                 : row.raw.n === '..'                       ? 'UP--DIR'
                 : formatSize(row.raw.size);
      const date = row.raw.date ?? '';

      out += attr + padRight(name, colNameW) +
             innerSep +
             attr + padLeft(size, 9) +
             innerSep +
             attr + center(date, 13);
    }
    out += frameAttr + vb;
  }

  // Mini status. Inactive panels keep the same blue background so the
  // panel reads as one consistent block instead of half-blue, half-grey.
  const statusY = headerY + 1 + listH;
  const cur = rows[pan.index];
  const statusText = ' ' + truncTitle(cur ? rowDisplayName(cur) : '', P.w - 4) + ' ';
  const statusAttr = isActive ? sgr(1, 97, 46) : sgr(1, 97, 44);
  out += moveTo(statusY, P.col) + frameAttr + vb +
         statusAttr + padRight(statusText, P.w - 2) +
         frameAttr + vb;

  // Bottom border
  out += moveTo(P.row + P.h - 1, P.col) + frameAttr + bl + hb.repeat(P.w - 2) + br;

  // Reset attributes when we leave the panel so subsequent draws (the
  // other panel, the hint line, the F-keys, etc.) start from a clean slate.
  out += RESET;
  return out;
}

function truncTitle(s, w) {
  s = String(s ?? '');
  if (s.length <= w) return s;
  return '…' + s.slice(s.length - w + 1);
}

function drawHint(L) {
  const cur = currentRow();
  const txt = cur ? `Hint: ${rowDisplayName(cur).slice(1)}` : '';
  return moveTo(L.hintRow, 1) + COL.hint + padRight(txt, L.cols);
}

function drawCommand(L) {
  const sub = state[state.active].path;
  const prompt = `[demo@localhost ${sub}]$ `;
  const line = COL.command + prompt + sgr(7) + ' ' + sgr(0) + COL.command;
  return moveTo(L.cmdRow, 1) + COL.command + ' '.repeat(L.cols) +
         moveTo(L.cmdRow, 1) + line;
}

function drawFkeys(L) {
  let out = moveTo(L.fkeysRow, 1) + COL.fkeyLbl + ' '.repeat(L.cols);
  out += moveTo(L.fkeysRow, 1);
  // Try to fit ten "N Label " slots into cols
  const slotW = Math.max(7, Math.floor(L.cols / 10));
  let x = 1;
  for (let i = 0; i < 10 && x + slotW <= L.cols + 1; i++) {
    const [n, lbl] = FKEYS[i];
    const cell = ' ' + n + ' ' + lbl;
    out += moveTo(L.fkeysRow, x) +
           COL.fkeyNum + padLeft(n, 2) +
           COL.fkeyLbl + padRight(lbl, slotW - 2);
    x += slotW;
  }
  return out;
}

function drawDropdown(L) {
  if (state.menuOpenIdx < 0) return '';
  const t = L.titles[state.menuOpenIdx];
  const items = MENUS[t.key];
  const w = Math.max(...items.map(i => i.label.length)) + 4;
  const x = Math.max(1, Math.min(t.x, L.cols - w));
  const y = L.menubarRow + 1;
  // Always start the dropdown from a clean state so previous panel
  // attributes (notably background colors) can't leak in.
  let out = RESET + COL.menuBg;

  // Top border
  out += moveTo(y, x) + COL.menuBg + BOX.tl + BOX.h.repeat(w - 2) + BOX.tr;
  for (let i = 0; i < items.length; i++) {
    const sel = i === state.menuItemIdx;
    const rowAttr = sel ? COL.menuSel : COL.menuBg;
    // Build the inner content as one attribute run, then explicitly switch
    // back to COL.menuBg before drawing the right border so a selected row
    // never bleeds its background past the menu's interior.
    const content = ' ' + padRight(items[i].label, w - 4) + ' ';
    out += moveTo(y + 1 + i, x) +
           COL.menuBg + BOX.v +
           rowAttr + content +
           COL.menuBg + BOX.v +
           COL.shadow + ' ';
  }
  out += moveTo(y + 1 + items.length, x) +
         COL.menuBg + BOX.bl + BOX.h.repeat(w - 2) + BOX.br +
         COL.shadow + ' ';
  // bottom shadow
  out += moveTo(y + 2 + items.length, x + 1) + COL.shadow + ' '.repeat(w);
  // Reset before leaving so subsequent draws aren't affected by shadow attr.
  out += RESET;
  // remember layout for hit testing
  state.layout.menu = { x, y, w, items: items.length };
  return out;
}

function drawModal(L) {
  const m = state.modal;
  if (!m) return '';
  const lines = m.lines;
  const w = Math.min(L.cols - 4, Math.max(20, ...lines.map(l => l.length), m.title.length + 4) + 4);
  const h = Math.min(L.rows - 4, lines.length + 4);
  const x = Math.floor((L.cols - w) / 2) + 1;
  const y = Math.floor((L.rows - h) / 2) + 1;
  let out = '';
  out += moveTo(y, x) + COL.dialog + BOX.tl + BOX.h.repeat(w - 2) + BOX.tr;
  // Title
  const title = ' ' + m.title + ' ';
  const tx = x + Math.floor((w - title.length) / 2);
  out += moveTo(y, tx) + COL.dialogTitle + title + COL.dialog;
  for (let i = 0; i < h - 2; i++) {
    const text = lines[i] ?? '';
    out += moveTo(y + 1 + i, x) + COL.dialog + BOX.v +
           ' ' + padRight(text, w - 4) + ' ' + BOX.v;
  }
  out += moveTo(y + h - 1, x) + COL.dialog + BOX.bl + BOX.h.repeat(w - 2) + BOX.br;
  // OK button
  const btn = ' [ OK ] ';
  out += moveTo(y + h - 2, x + Math.floor((w - btn.length) / 2)) + sgr(1, 30, 46) + btn + COL.dialog;
  state.layout.modal = { x, y, w, h, btn: { x: x + Math.floor((w - btn.length) / 2), y: y + h - 2, w: btn.length } };
  return out;
}

function render() {
  state.cols = term.cols;
  state.rows = term.rows;
  const L = buildLayout();
  state.layout = { L, menu: null, modal: null };

  let out = COL.base + clearScreen;
  out += drawMenubar(L);
  out += drawPanel('left', L.leftPanel);
  out += drawPanel('right', L.rightPanel);
  out += drawHint(L);
  out += drawCommand(L);
  out += drawFkeys(L);
  out += drawDropdown(L);
  out += drawModal(L);
  out += RESET;
  term.write(out);
}

/* ----------------------------- Actions ------------------------------ */

function currentRow() {
  const pan = state[state.active];
  const rows = rowsForDir(pan.path);
  return rows[Math.max(0, Math.min(pan.index, rows.length - 1))];
}

function activate(side) {
  const pan = state[side];
  const rows = rowsForDir(pan.path);
  const row = rows[pan.index];
  if (!row || row.ghost) return;
  if (row.raw.n === '..') {
    pan.path = parentPath(pan.path);
    pan.index = 0; pan.top = 0;
    return;
  }
  if (row.raw.t === 'd') {
    const target = joinPath(pan.path, row.raw.n);
    if (FS[target] !== undefined) { pan.path = target; pan.index = 0; pan.top = 0; }
    return;
  }
  if (row.raw.t === 'l') {
    showModal('Symbolic link', [
      `${row.raw.n}`, '',
      row.raw.tgt ? `→ ${row.raw.tgt}` : '(target not scripted)',
    ]);
    return;
  }
  viewFile(joinPath(pan.path, row.raw.n), row.raw.n);
}

function viewFile(abs, label) {
  const body = FILE_CONTENTS[abs] ?? `[Preview not scripted for "${label}".]`;
  showModal(label, body.split('\n'));
}

function showModal(title, lines) {
  state.modal = { title, lines };
}
function closeModal() { state.modal = null; }

function placeholder(msg) { showModal('Menu action', [msg]); }

function handleF(n) {
  if (n === 1)  return showModal('Help', [
    'Mouse:',
    '  • First click on a row → select',
    '  • Second click on the same row → open',
    '  • Click a menu title → pulldown (click again to close)',
    '',
    'Keyboard:',
    '  ↑/↓ Home End PgUp PgDn   move',
    '  Tab / ←/→                switch panel',
    '  Enter                    open',
    '  F1..F10                  function keys',
    '  Esc                      close menu/dialog',
  ]);
  if (n === 2)  return showModal('User menu', ['Static mimic — scripted entries only.']);
  if (n === 3) {
    const r = currentRow();
    if (!r || r.ghost || r.raw.n === '..' || r.raw.t === 'd')
      return showModal('View', ['Select a plain file row first.']);
    if (r.raw.t === 'l') return activate(state.active);
    return viewFile(joinPath(state[state.active].path, r.raw.n), r.raw.n);
  }
  if (n === 4)  return showModal('Edit', ['No embedded editor in this static demo.']);
  if (n >= 5 && n <= 9) return showModal(`F${n}`, ['File operation placeholder.']);
  if (n === 10) return showModal('Quit', ['This is just a webpage — close the tab to exit.']);
}

/* ----------------------- Pulldown navigation ------------------------ */

function openMenu(i) {
  state.menuOpenIdx = i;
  // No pre-selected item — matches MC's mouse-open behavior where the
  // dropdown is shown but no entry is highlighted until the user navigates.
  state.menuItemIdx = -1;
}
function closeMenu() { state.menuOpenIdx = -1; state.menuItemIdx = -1; }
function chooseMenuItem() {
  const t = MENU_TITLES[state.menuOpenIdx];
  const items = MENUS[t.key];
  const idx = state.menuItemIdx;
  if (idx < 0) { closeMenu(); return; }
  const item = items[idx];
  closeMenu();
  if (item) item.action();
}

/* ------------------------------ Input -------------------------------- */

function pageStep() {
  const L = buildLayout();
  return Math.max(1, L.leftPanel.h - 4);
}

function clampIndex(side, delta) {
  const n = rowsForDir(state[side].path).length;
  state[side].index = Math.max(0, Math.min(state[side].index + delta, n - 1));
}

function focusPane(side) {
  state.active = side;
  state.lastClick = '';
}

term.attachCustomKeyEventHandler((e) => {
  // Let xterm’s default selection (with mouse) work, but never echo keys
  return false;
});

term.onData((data) => {
  // Modal: any key closes it
  if (state.modal) {
    if (data === '\r' || data === '\n' || data === ' ' || data === '\x1b') {
      closeModal(); render();
    }
    return;
  }

  // Menu open
  if (state.menuOpenIdx >= 0) {
    if (data === '\x1b') { closeMenu(); render(); return; }
    if (data === '\r')   { chooseMenuItem(); render(); return; }
    if (data === '\x1b[A' || data === '\x1bOA') {
      const items = MENUS[MENU_TITLES[state.menuOpenIdx].key];
      // First arrow press jumps to the last/first item; subsequent presses wrap.
      state.menuItemIdx = state.menuItemIdx < 0
        ? items.length - 1
        : (state.menuItemIdx - 1 + items.length) % items.length;
      render(); return;
    }
    if (data === '\x1b[B' || data === '\x1bOB') {
      const items = MENUS[MENU_TITLES[state.menuOpenIdx].key];
      state.menuItemIdx = state.menuItemIdx < 0
        ? 0
        : (state.menuItemIdx + 1) % items.length;
      render(); return;
    }
    if (data === '\x1b[D' || data === '\x1bOD') {
      state.menuOpenIdx = (state.menuOpenIdx - 1 + MENU_TITLES.length) % MENU_TITLES.length;
      state.menuItemIdx = -1;
      render(); return;
    }
    if (data === '\x1b[C' || data === '\x1bOC') {
      state.menuOpenIdx = (state.menuOpenIdx + 1) % MENU_TITLES.length;
      state.menuItemIdx = -1;
      render(); return;
    }
    return;
  }

  // F1–F12 (xterm sends \x1bOP… and \x1b[15~ etc)
  const fnum = parseFKey(data);
  if (fnum) { handleF(fnum); render(); return; }

  // Navigation
  switch (data) {
    case '\r': case '\n':
      activate(state.active); state.lastClick = ''; render(); return;
    case '\t':
      focusPane(state.active === 'left' ? 'right' : 'left'); render(); return;
    case '\x1b':
      // Esc on its own does nothing destructive
      render(); return;
    case '\x1b[A': case '\x1bOA':
      clampIndex(state.active, -1); state.lastClick = ''; render(); return;
    case '\x1b[B': case '\x1bOB':
      clampIndex(state.active, 1);  state.lastClick = ''; render(); return;
    case '\x1b[D': case '\x1bOD':
      focusPane('left'); render(); return;
    case '\x1b[C': case '\x1bOC':
      focusPane('right'); render(); return;
    case '\x1b[H': case '\x1b[1~': // Home
      state[state.active].index = 0; state.lastClick = ''; render(); return;
    case '\x1b[F': case '\x1b[4~': // End
      state[state.active].index = rowsForDir(state[state.active].path).length - 1;
      state.lastClick = ''; render(); return;
    case '\x1b[5~': // PgUp
      clampIndex(state.active, -pageStep()); state.lastClick = ''; render(); return;
    case '\x1b[6~': // PgDn
      clampIndex(state.active,  pageStep()); state.lastClick = ''; render(); return;
  }
});

function parseFKey(seq) {
  const map = {
    '\x1bOP': 1, '\x1bOQ': 2, '\x1bOR': 3, '\x1bOS': 4,
    '\x1b[11~': 1, '\x1b[12~': 2, '\x1b[13~': 3, '\x1b[14~': 4,
    '\x1b[15~': 5, '\x1b[17~': 6, '\x1b[18~': 7, '\x1b[19~': 8,
    '\x1b[20~': 9, '\x1b[21~': 10, '\x1b[23~': 11, '\x1b[24~': 12,
  };
  return map[seq] || null;
}

/* ----------------------------- Mouse -------------------------------- */

term.onBinary?.(() => {});
term.onSelectionChange?.(() => {});

term.element.addEventListener('contextmenu', (e) => e.preventDefault());

// xterm.js exposes parsed mouse events through onData with SGR encoding
// "\x1b[<b;x;yM" (press) / "\x1b[<b;x;ym" (release). We parse those here.
term.onData((data) => {
  const m = /^\x1b\[<(\d+);(\d+);(\d+)([Mm])$/.exec(data);
  if (!m) return;
  if (m[4] !== 'M') return; // only on press
  const button = parseInt(m[1], 10);
  const x = parseInt(m[2], 10);
  const y = parseInt(m[3], 10);
  if ((button & 0x40) !== 0) return; // ignore wheel
  if ((button & 3) !== 0) return;    // only left button (button code 0)
  handleClick(x, y);
});

function handleClick(x, y) {
  const L = state.layout?.L;
  if (!L) return;

  // Modal first
  if (state.modal) {
    const M = state.layout.modal;
    if (M && y === M.btn.y && x >= M.btn.x && x < M.btn.x + M.btn.w) {
      closeModal(); render(); return;
    }
    // Click outside dialog closes it too
    if (M && (y < M.y || y > M.y + M.h - 1 || x < M.x || x > M.x + M.w - 1)) {
      closeModal(); render(); return;
    }
    return;
  }

  // Menubar titles
  if (y === L.menubarRow) {
    for (let i = 0; i < L.titles.length; i++) {
      const t = L.titles[i];
      if (x >= t.x && x < t.x + t.w) {
        if (state.menuOpenIdx === i) closeMenu(); else openMenu(i);
        render(); return;
      }
    }
    closeMenu(); render(); return;
  }

  // Open dropdown items
  if (state.menuOpenIdx >= 0 && state.layout.menu) {
    const M = state.layout.menu;
    if (x > M.x && x < M.x + M.w - 1 && y > M.y && y <= M.y + M.items) {
      state.menuItemIdx = y - M.y - 1;
      chooseMenuItem(); render(); return;
    }
    closeMenu(); render(); return;
  }

  // F-keys at the bottom
  if (y === L.fkeysRow) {
    const slotW = Math.max(7, Math.floor(L.cols / 10));
    const idx = Math.floor((x - 1) / slotW);
    if (idx >= 0 && idx < 10) { handleF(idx + 1); render(); return; }
  }

  // Click inside a panel
  for (const side of ['left', 'right']) {
    const P = side === 'left' ? L.leftPanel : L.rightPanel;
    if (x >= P.col && x < P.col + P.w && y >= P.row && y < P.row + P.h) {
      // Translate to row index
      const headerY = P.row + 1;
      const innerH = P.h - 2;
      const listH = innerH - 2;
      const localRow = y - (headerY + 1);
      if (localRow >= 0 && localRow < listH) {
        const dataIdx = state[side].top + localRow;
        const rows = rowsForDir(state[side].path);
        if (dataIdx >= 0 && dataIdx < rows.length) {
          const key = `${side}:${dataIdx}`;
          const same = key === state.lastClick && state.active === side;
          state.active = side;
          state[side].index = dataIdx;
          if (same) {
            state.lastClick = '';
            activate(side);
          } else {
            state.lastClick = key;
          }
          render();
          return;
        }
      }
      // Click inside the panel body (not on a row) just focuses the pane
      focusPane(side);
      render();
      return;
    }
  }
}

/* ----------------------------- Boot --------------------------------- */

render();
// Only steal focus on devices with a real keyboard; on touch this would
// just pop up the on-screen keyboard with no useful effect.
if (!IS_TOUCH) term.focus();
