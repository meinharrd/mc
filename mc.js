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
  '/home': [{ n: 'meinhard', t: 'd' }],
  '/home/meinhard': [
    { n: 'Desktop', t: 'd' },
    { n: 'Documents', t: 'd' },
    { n: 'Downloads', t: 'd' },
    { n: 'Projects', t: 'd' },
    { n: '.config', t: 'd' },
    { n: '.bashrc', t: 'f', size: 3521, date: 'Mar 02 2025' },
    { n: 'notes.txt', t: 'f', size: 128, date: 'May 10 2025' },
    { n: 'hello.sh', t: 'x', size: 89, date: 'Jan 15 2025' },
    { n: 'latest.tar.gz', t: 'l', tgt: '/home/meinhard/Projects/mc-demo.tar.gz', size: 33, date: 'May 12 2026' },
  ],
  '/home/meinhard/Desktop': [
    { n: 'readme.txt', t: 'f', size: 256, date: 'May 13 2026' },
    { n: 'screenshot.png', t: 'f', size: 184320, date: 'May 12 2026' },
  ],
  '/home/meinhard/Documents': [
    { n: 'letter.odt', t: 'f', size: 18842, date: 'Apr 14 2025' },
    { n: 'todo.md', t: 'f', size: 240, date: 'May 03 2025' },
    { n: 'archive', t: 'd' },
  ],
  '/home/meinhard/Documents/archive': [
    { n: '2024.zip', t: 'f', size: 104857600, date: 'Dec 31 2024' },
  ],
  '/home/meinhard/Downloads': [
    { n: 'image.png', t: 'f', size: 4096000, date: 'May 01 2025' },
    { n: 'setup.run', t: 'x', size: 25001984, date: 'Apr 18 2025' },
  ],
  '/home/meinhard/Projects': [
    { n: 'mc-demo.tar.gz', t: 'f', size: 4096, date: 'May 12 2026' },
    { n: 'static-site', t: 'd' },
  ],
  '/home/meinhard/Projects/static-site': [
    { n: 'index.html', t: 'f', size: 842, date: 'May 12 2026' },
    { n: 'mc.js', t: 'f', size: 13500, date: 'May 12 2026' },
  ],
  '/home/meinhard/.config': [{ n: 'mc', t: 'd' }],
  '/home/meinhard/.config/mc': [
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
  '/home/meinhard/notes.txt':
    'Welcome to this static Midnight Commander mimic.\n\n' +
    'It runs as a real terminal in your browser (xterm.js) but with\n' +
    'no server, PTY or websocket — the panels are drawn by JavaScript\n' +
    'using ANSI escape sequences and box-drawing characters.\n',
  '/home/meinhard/.bashrc':
    '# ~/.bashrc — mock snippet\nalias ll="ls -alF"\nexport EDITOR=mcedit\nPS1="\\u@\\h:\\w\\$ "\n',
  '/home/meinhard/hello.sh': '#!/usr/bin/env bash\necho "Hello from hello.sh"\n',
  '/home/meinhard/Documents/todo.md': '# Demo\n\n- [ ] Fancy skins\n- [x] Navigate with arrows\n',
  '/home/meinhard/Desktop/readme.txt':
    'This is a demo desktop file.\nFeel free to look around.\n',
  '/home/meinhard/Projects/static-site/index.html':
    '<!DOCTYPE html>\n<html lang="en">\n<title>tiny</title>\n<body>hello</body>\n</html>\n',
  '/etc/passwd':
    'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nmeinhard:x:1000:1000:/home/meinhard:/bin/bash\n',
  '/etc/hosts': '127.0.0.1 localhost\n::1 localhost ip6-localhost\n',
  '/etc/hostname': 'benn\n',
  '/etc/fstab': '# fstab demo\n/dev/sda1 / ext4 defaults 0 1\n',
};

/* Identity used in the prompt and elsewhere. */
const HOME = '/home/meinhard';
const USER = 'meinhard';
const HOSTNAME = 'benn';

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

/* MC default (modarin/classic) skin — these values match the ANSI output of
 * `mc` running in xterm with TERM=xterm-256color. Note that real MC's default
 * skin uses regular weights almost everywhere; the brightness comes from the
 * `9x` "bright" foreground codes, NOT from the `1` (bold) attribute. */
const COL = {
  base:        sgr(0, 37, 44),     // light grey on blue
  panelBg:     sgr(0, 37, 44),
  frame:       sgr(22, 37, 44),    // light grey on blue (both panels)
  title:       sgr(22, 30, 47),    // black on white/light-grey (panel path tab)
  header:      sgr(22, 93, 44),    // bright yellow on blue (column headers)

  rowFile:     sgr(22, 37, 44),    // light grey on blue
  rowDir:      sgr(22, 97, 44),    // bright white on blue (no bold!)
  rowExec:     sgr(22, 92, 44),    // bright green on blue
  rowLink:     sgr(22, 96, 44),    // bright cyan on blue
  rowSpecial:  sgr(22, 95, 44),    // bright magenta on blue

  // Selection bar: every row type collapses to black-on-cyan when selected,
  // matching the live MC output.
  selBase:     sgr(22, 30, 46),
  selDir:      sgr(22, 30, 46),
  selExec:     sgr(22, 30, 46),
  selLink:     sgr(22, 30, 46),

  // Menubar: plain black on cyan with no special highlight on hot letters.
  menubar:     sgr(22, 30, 46),
  menubarHot:  sgr(22, 30, 46),    // same as menubar; hot letter only stands out in dropdowns
  menuBg:      sgr(22, 30, 46),
  menuHot:     sgr(22, 93, 46),    // dropdown hot letter is yellow on cyan
  menuSel:     sgr(22, 97, 44),    // dropdown selected item: bright white on blue

  fkeyNum:     sgr(22, 97, 40),    // bright white on black
  fkeyLbl:     sgr(22, 30, 46),    // black on cyan
  shadow:      sgr(22, 30, 40),
  dialog:      sgr(22, 30, 47),
  dialogTitle: sgr(1, 31, 47),

  // Hint and command strip use the same dark-grey as the page background,
  // so the terminal "floats" without a visible seam. F-keys row stays
  // pure black via SGR 40.
  hint:        sgr(22, 97, 48, 2, 0x1c, 0x1c, 0x1c),
  command:     sgr(22, 97, 48, 2, 0x1c, 0x1c, 0x1c),
  cmdMarker:   sgr(22, 37, 44),    // light grey on blue
  diskInfo:    sgr(22, 37, 44),    // light grey on blue (inherits frame style)
};

const BOX = {
  h: '─', v: '│',
  tl: '┌', tr: '┐', bl: '└', br: '┘',
  tee_l: '├', tee_r: '┤', tee_t: '┬', tee_b: '┴', cross: '┼',
};

/* Demo-only filesystem usage figures shown at the bottom of each panel. */
const DISK_INFO = { free: '63G', total: '193G', usedPct: 32 };

/* ---------------------------- App state ----------------------------- */

const state = {
  /** @type {'left'|'right'} */ active: 'left',
  left:  { path: '/home/meinhard/Desktop', index: 0, top: 0 },
  right: { path: '/home/meinhard',         index: 0, top: 0 },
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

/** Render a path the way MC's title bar does: $HOME becomes "~" and
 *  subpaths of $HOME become "~/foo/bar". Everything else is unchanged. */
function displayPath(p) {
  if (p === HOME) return '~';
  if (p.startsWith(HOME + '/')) return '~' + p.slice(HOME.length);
  return p;
}

function joinPath(dir, name) {
  const s = name.replace(/\/+$/, '');
  return dir === '/' ? '/' + s : `${dir}/${s}`;
}

function rowTypeGlyph(row) {
  const r = row.raw;
  if (row.ghost) return ' ';
  if (r.n === '..' || r.t === 'd') return '/';
  if (r.t === 'x') return '*';
  if (r.t === 'l') return '@';
  return ' ';
}

function rowBareName(row) {
  return row.raw.n === '..' ? '..' : row.raw.n;
}

function rowDisplayName(row) {
  if (row.ghost) return row.raw.n;
  return rowTypeGlyph(row) + rowBareName(row);
}

function rowColor(row, selected) {
  // Real MC default skin collapses all selected rows to black-on-cyan
  // (regardless of file type). Non-selected rows use type-specific bright
  // foregrounds on the panel-blue background, with NO bold attribute.
  if (selected) return COL.selBase;
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
const TERM_COLS = 80;
const TERM_ROWS = 25;

function pickFontSize() {
  // Pick the largest font that still fits an 80x25 grid inside the viewport,
  // biased a bit smaller than the strict max so the grid doesn't fill the
  // entire window edge-to-edge.
  const CELL_W_RATIO = 0.6;
  const CELL_H_RATIO = 1.0; // matches term lineHeight
  const padding = 4; // small slack now that #term has no padding
  const w = Math.max(120, window.innerWidth - padding);
  const h = Math.max(120, window.innerHeight - padding);
  const byW = Math.floor(w / (TERM_COLS * CELL_W_RATIO));
  const byH = Math.floor(h / (TERM_ROWS * CELL_H_RATIO));
  const ideal = Math.min(byW, byH) - 2; // a bit smaller than the strict fit
  return Math.max(8, Math.min(15, ideal));
}

const term = new Terminal({
  fontSize: pickFontSize(),
  fontFamily: 'ui-monospace, "DejaVu Sans Mono", "Cascadia Mono", Menlo, Consolas, monospace',
  lineHeight: 1.0,
  letterSpacing: 0,
  theme: {
    background: '#1c1c1c',
    foreground: '#c8c8c8',
    cursor: '#c8c8c8',
    black: '#000000',     red: '#aa0000',     green: '#00aa00',     yellow: '#aa5500',
    blue: '#0000aa',      magenta: '#aa00aa', cyan: '#00aaaa',      white: '#c0c0c0',
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

term.open(document.getElementById('term'));
term.resize(TERM_COLS, TERM_ROWS);
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
  term.resize(TERM_COLS, TERM_ROWS);
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

  // Real MC menubar: 2 leading spaces, then titles separated by 5 spaces.
  // This matches the byte-exact output captured from `mc` on a Linux host.
  const titles = [];
  const MENUBAR_LEAD = 3;       // column where the first title starts (1-indexed)
  const MENUBAR_GAP  = 5;       // spaces between titles
  let x = MENUBAR_LEAD;
  for (const m of MENU_TITLES) {
    titles.push({ ...m, x, w: m.label.length });
    x += m.label.length + MENUBAR_GAP;
  }

  return { cols, rows, menubarRow, leftPanel, rightPanel, hintRow, cmdRow, fkeysRow, titles };
}

function drawMenubar(L) {
  // Real MC paints the whole menubar row in black-on-cyan with no
  // hot-letter highlighting. When the user opens a menu, the open title
  // gets a white-on-blue "selected" bar; otherwise everything is uniform.
  let line = moveTo(L.menubarRow, 1) + COL.menubar + ' '.repeat(L.cols);
  for (let i = 0; i < L.titles.length; i++) {
    const t = L.titles[i];
    const open = state.menuOpenIdx === i;
    const attr = open ? COL.menuSel : COL.menubar;
    line += moveTo(L.menubarRow, t.x) + attr + t.label;
  }
  return line;
}

/* Column widths inside a panel body (between the side frames). */
const COL_SIZE_W = 7;
const COL_DATE_W = 12;

/* Fallback mtime shown when a directory entry in our scripted FS has no
 * own `date` field. Real MC shows the directory inode mtime; we don't
 * have one, so just borrow a plausible recent date. */
const DEFAULT_DIR_DATE = 'May 13 14:30';

function rowSizeText(row) {
  if (row.raw.n === '..') return 'UP--DIR';
  if (row.raw.t === 'd')  return '4096';
  return formatSize(row.raw.size);
}

function rowDateText(row) {
  const d = row.raw.date || (row.raw.t === 'd' ? DEFAULT_DIR_DATE : '');
  return formatMcDate(d);
}

/** Normalise an `Mon DD <year-or-time>` string to MC's fixed 12-cell format:
 *    `Mon DD HH:MM`  → unchanged (already 12 chars)
 *    `Mon DD YYYY`   → `Mon DD  YYYY` (year right-aligned to col 12)
 */
function formatMcDate(d) {
  if (!d) return '';
  const m = /^([A-Z][a-z]{2}) ([ 0-9]\d) (\d{4})$/.exec(d);
  if (m) return `${m[1]} ${m[2]}  ${m[3]}`; // pad with an extra space before the year
  return d;
}

function drawPanel(side, P) {
  const isActive = state.active === side;
  const pan = state[side];
  const rows = rowsForDir(pan.path);
  pan.index = Math.max(0, Math.min(pan.index, rows.length - 1));

  // Reserve 2 rows for borders, 1 col header, 1 horizontal separator,
  // 1 mini-status. Disk info is inlaid into the bottom border (no extra row).
  const innerH = P.h - 2;
  const listH = innerH - 3;
  if (pan.index < pan.top) pan.top = pan.index;
  if (pan.index >= pan.top + listH) pan.top = pan.index - listH + 1;
  if (pan.top < 0) pan.top = 0;

  // Real MC default skin: both panels use the same frame styling. The
  // active panel is signaled by (a) the highlighted selection bar AND
  // (b) the path title being shown on a light-grey "tab" instead of
  // blending into the frame.
  const frameAttr = COL.frame;
  let out = RESET + frameAttr;

  // ---- Top border: ┌<─ <title> ──...── .[^]>┐ -----------------------
  // Real MC layout (byte-exact): the title sits left-aligned right after
  // `┌<─`, then dashes fill the remainder until the `.[^]>` right marker.
  const leftMarker  = '<';
  const rightMarker = '.[^]>';
  const innerW = P.w - 2;
  const title = ' ' + truncTitle(displayPath(pan.path), P.w - 9) + ' ';
  const remaining = innerW - leftMarker.length - 1 - title.length - rightMarker.length;
  const dashRight = Math.max(1, remaining);
  const titleAttr = isActive ? COL.title : frameAttr;
  out += moveTo(P.row, P.col) +
         frameAttr + BOX.tl + leftMarker + BOX.h +
         titleAttr + title +
         frameAttr + BOX.h.repeat(dashRight) +
         rightMarker + BOX.tr;

  // ---- Column header (.n + Name | Size | Modify time) ---------------
  const innerSep = frameAttr + BOX.v;
  const colNameW = P.w - 2 - COL_SIZE_W - 1 - COL_DATE_W - 1;

  const headerY = P.row + 1;
  // Real MC header: ".n" sits at the far left of the name column and
  // "Name" is centered in the remaining width.
  const nameAfter = colNameW - 2; // chars left after ".n"
  const nameLabel = center('Name', nameAfter);
  const nameHeader = '.n' + nameLabel;
  const headerLine = COL.header + nameHeader +
                     innerSep +
                     COL.header + center('Size', COL_SIZE_W) +
                     innerSep +
                     COL.header + center('Modify time', COL_DATE_W);
  out += moveTo(headerY, P.col) + frameAttr + BOX.v + headerLine + frameAttr + BOX.v;

  // ---- Listing rows -------------------------------------------------
  for (let i = 0; i < listH; i++) {
    const dataIdx = pan.top + i;
    const y = headerY + 1 + i;
    out += moveTo(y, P.col) + frameAttr + BOX.v;
    if (dataIdx >= rows.length) {
      out += COL.panelBg + ' '.repeat(colNameW) +
             innerSep +
             COL.panelBg + ' '.repeat(COL_SIZE_W) +
             innerSep +
             COL.panelBg + ' '.repeat(COL_DATE_W);
    } else {
      const row = rows[dataIdx];
      const selected = dataIdx === pan.index && isActive;
      const attr = selected ? rowColor(row, true) : rowColor(row, false);
      // When the row is selected, the inner column separators also take the
      // selection color so the cyan strip is contiguous across the row.
      const sep = selected ? attr + BOX.v : innerSep;

      out += attr + padRight(rowDisplayName(row), colNameW) +
             sep +
             attr + padLeft(rowSizeText(row), COL_SIZE_W) +
             sep +
             attr + padRight(rowDateText(row), COL_DATE_W);
    }
    out += frameAttr + BOX.v;
  }

  // ---- Horizontal separator between the list and the mini-status ----
  const sepY = headerY + 1 + listH;
  out += moveTo(sepY, P.col) +
         frameAttr + BOX.tee_l + BOX.h.repeat(P.w - 2) + BOX.tee_r;

  // ---- Mini status --------------------------------------------------
  // Match real MC: show "UP--DIR" for the ".." row, otherwise the display
  // name (type glyph + filename). No padding between the left frame and
  // the text — real MC butts the glyph right up against the "│".
  const statusY = sepY + 1;
  const cur = rows[pan.index];
  const statusName = !cur ? ''
                   : cur.ghost ? cur.raw.n
                   : cur.raw.n === '..' ? 'UP--DIR'
                   : rowDisplayName(cur);
  out += moveTo(statusY, P.col) + frameAttr + BOX.v +
         frameAttr + padRight(truncTitle(statusName, P.w - 2), P.w - 2) +
         frameAttr + BOX.v;

  // ---- Bottom border with disk info inlaid --------------------------
  // Real MC right-aligns the disk text with exactly one trailing dash
  // before the bottom-right corner.
  const disk = ` ${DISK_INFO.free} / ${DISK_INFO.total} (${DISK_INFO.usedPct}%) `;
  const bdashL = Math.max(1, P.w - 2 - disk.length - 1);
  out += moveTo(P.row + P.h - 1, P.col) +
         frameAttr + BOX.bl + BOX.h.repeat(bdashL) +
         COL.diskInfo + disk +
         frameAttr + BOX.h + BOX.br;

  out += RESET;
  return out;
}

function truncTitle(s, w) {
  s = String(s ?? '');
  if (s.length <= w) return s;
  return '…' + s.slice(s.length - w + 1);
}

function drawHint(L) {
  const txt = 'Hint: Tab changes your current panel.';
  // Real MC writes the hint with default fg/bg (no SGR). Reset first so we
  // don't inherit a blue background from the panels above.
  return moveTo(L.hintRow, 1) + RESET + COL.hint + padRight(txt, L.cols);
}

function drawCommand(L) {
  const sub = displayPath(state[state.active].path);
  const prompt = `${USER}@${HOSTNAME}:${sub}$ `;
  const marker = '[^]';
  return moveTo(L.cmdRow, 1) + RESET + COL.command + ' '.repeat(L.cols) +
         moveTo(L.cmdRow, 1) + COL.command + prompt + sgr(7) + ' ' + sgr(0) +
         moveTo(L.cmdRow, L.cols - marker.length + 1) + COL.cmdMarker + marker;
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
  return Math.max(1, L.leftPanel.h - 5);
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
      const listH = innerH - 3;
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
