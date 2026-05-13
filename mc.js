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

  // Menubar in closed state: plain black on cyan with no hot letter highlight.
  menubar:     sgr(22, 30, 46),
  // When ANY menu is open, the bar's text switches to bright white on cyan,
  // hot letters are yellow on cyan, and the *opened* title is shown on a
  // black strip (with surrounding spaces also on black).
  menubarOpen:    sgr(22, 97, 46),
  menubarOpenHot: sgr(22, 93, 46),
  menuTitleSel:    sgr(22, 97, 40),
  menuTitleSelHot: sgr(22, 93, 40),
  // Dropdown body: non-selected items render white on cyan with yellow
  // hot letters; selected items invert to white on black with yellow hot.
  menuBg:      sgr(22, 97, 46),    // dropdown body (non-selected) + frame
  menuHot:     sgr(22, 93, 46),    // hot letter on a non-selected item
  menuSel:     sgr(22, 97, 40),    // selected item body
  menuSelHot:  sgr(22, 93, 40),    // hot letter on a selected item

  fkeyNum:     sgr(22, 97, 40),    // bright white on black
  fkeyLbl:     sgr(22, 30, 46),    // black on cyan
  shadow:      sgr(22, 90, 40),    // bright-black (dim grey) on black — see-through shadow
  dialog:      sgr(22, 30, 47),
  dialogTitle: sgr(1, 31, 47),

  // Hint and command strip use the same dark-grey as the page background,
  // so the terminal "floats" without a visible seam. F-keys row stays
  // pure black via SGR 40.
  hint:        sgr(22, 97, 48, 2, 0x14, 0x14, 0x14),
  command:     sgr(22, 97, 48, 2, 0x14, 0x14, 0x14),
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
  prompt: null,       // { title, message, buffer, onSubmit }
  menuOpenIdx: -1,    // index into MENU_TITLES
  menuItemIdx: 0,
  /** Full-screen file viewer. Shape: { path, label, lines, top, wrap }. */
  viewer: null,
  /** Click pairing for "first click selects, second click opens" */
  lastClick: '',
  /** layout cache for hit testing */
  layout: null,
};

/* ----------------------- Filesystem helpers ------------------------- */

function rowsForDir(cwd) {
  // Root has no parent, so no ".." entry there.
  const out = cwd === '/' ? [] : [{ raw: { n: '..', t: 'd' } }];
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

/* Only the F-keys that actually do something get a visible label. The
 * others render as a numbered slot with a blank label so the row layout
 * still matches real MC. */
const FKEYS = [
  ['1', 'Help'], ['2', ''],     ['3', 'View'], ['4', ''], ['5', ''],
  ['6', ''],     ['7', 'Mkdir'],['8', ''],     ['9', 'PullDn'], ['10', 'Quit'],
];

/** F-key labels shown along the bottom while the file viewer is open.
 *  Empty labels are slots that aren't implemented yet. */
function viewerFkeys(wrap) {
  return [
    ['1', 'Help'], ['2', wrap ? 'UnWrap' : 'Wrap'], ['3', 'Quit'],
    ['4', ''], ['5', ''], ['6', ''], ['7', ''], ['8', ''], ['9', ''],
    ['10', 'Quit'],
  ];
}

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
  const menuMode = state.menuOpenIdx >= 0;
  // In closed state: the whole bar is plain black on cyan and titles
  // render uniformly (no hot-letter highlight). In open state: the bar
  // becomes white on cyan, hot letters are yellow, and the opened title
  // sits inside a black strip that includes one space of padding.
  const barFill = menuMode ? COL.menubarOpen : COL.menubar;
  let line = moveTo(L.menubarRow, 1) + barFill + ' '.repeat(L.cols);

  for (let i = 0; i < L.titles.length; i++) {
    const t = L.titles[i];
    const isOpen = state.menuOpenIdx === i;

    if (!menuMode) {
      // Closed: just write the label in plain black-on-cyan.
      line += moveTo(L.menubarRow, t.x) + COL.menubar + t.label;
      continue;
    }

    if (isOpen) {
      // Selected title: black background pad-1 around the label.
      line += moveTo(L.menubarRow, t.x - 1) + COL.menuTitleSel + ' ';
      for (let ci = 0; ci < t.label.length; ci++) {
        const ch = t.label[ci];
        line += (ci === t.hot ? COL.menuTitleSelHot : COL.menuTitleSel) + ch;
      }
      line += COL.menuTitleSel + ' ';
    } else {
      // Other titles in open mode: white on cyan, hot letter yellow.
      line += moveTo(L.menubarRow, t.x);
      for (let ci = 0; ci < t.label.length; ci++) {
        const ch = t.label[ci];
        line += (ci === t.hot ? COL.menubarOpenHot : COL.menubarOpen) + ch;
      }
    }
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

function drawFkeys(L, keys = FKEYS) {
  let out = moveTo(L.fkeysRow, 1) + COL.fkeyLbl + ' '.repeat(L.cols);
  out += moveTo(L.fkeysRow, 1);
  const slotW = Math.max(7, Math.floor(L.cols / 10));
  let x = 1;
  for (let i = 0; i < 10 && x + slotW <= L.cols + 1; i++) {
    const [n, lbl] = keys[i];
    out += moveTo(L.fkeysRow, x) +
           COL.fkeyNum + padLeft(n, 2) +
           COL.fkeyLbl + padRight(lbl, slotW - 2);
    x += slotW;
  }
  return out;
}

/** Parse the subset of ANSI we emit (cursor positioning + SGR + plain text)
 *  into a 2D grid of the characters that would be visible. SGR codes are
 *  ignored — we only care about the underlying glyphs. */
function parseScreen(text, rows = TERM_ROWS, cols = TERM_COLS) {
  const buf = Array.from({ length: rows }, () => new Array(cols).fill(' '));
  let r = 1, c = 1;
  let i = 0;
  while (i < text.length) {
    if (text[i] === '\x1b' && text[i + 1] === '[') {
      let j = i + 2;
      while (j < text.length) {
        const code = text.charCodeAt(j);
        if (code >= 0x40 && code <= 0x7E) break;
        j++;
      }
      const cmd = text[j];
      const params = text.slice(i + 2, j);
      if (cmd === 'H') {
        const parts = params.split(';');
        r = parseInt(parts[0], 10) || 1;
        c = parseInt(parts[1], 10) || 1;
      } else if (cmd === 'J' && (params === '2' || params === '')) {
        for (let rr = 0; rr < rows; rr++) buf[rr].fill(' ');
        r = 1; c = 1;
      }
      i = j + 1;
      continue;
    }
    if (text[i] === '\n') { r++; c = 1; i++; continue; }
    if (text[i] === '\r') { c = 1; i++; continue; }
    if (r >= 1 && r <= rows && c >= 1 && c <= cols) {
      buf[r - 1][c - 1] = text[i];
    }
    c++;
    i++;
  }
  return buf;
}

/** Look up the underlying char at (row, col) 1-indexed in a parsed screen
 *  buffer; returns a single space if out of bounds. */
function bgChar(buf, row, col) {
  if (row < 1 || row > buf.length) return ' ';
  const r = buf[row - 1];
  if (col < 1 || col > r.length) return ' ';
  return r[col - 1];
}

function drawDropdown(L, bg) {
  if (state.menuOpenIdx < 0) return '';
  const t = L.titles[state.menuOpenIdx];
  const items = MENUS[t.key];
  const w = Math.max(...items.map(i => i.label.length)) + 4;
  // Anchor so the item text (which starts at +2 inside the frame) aligns
  // with the menubar title text column. Clamp into the screen.
  const x = Math.max(1, Math.min(t.x - 2, L.cols - w));
  const y = L.menubarRow + 1;
  let out = RESET;

  // Top border (white on cyan). No shadow above it.
  out += moveTo(y, x) + COL.menuBg + BOX.tl + BOX.h.repeat(w - 2) + BOX.tr;

  // ----- Item rows + right-side shadow (2 cells wide) -----
  for (let i = 0; i < items.length; i++) {
    const sel = i === state.menuItemIdx;
    const bodyAttr = sel ? COL.menuSel : COL.menuBg;
    const hotAttr  = sel ? COL.menuSelHot : COL.menuHot;
    const label = items[i].label;
    const hotIdx = items[i].hot ?? -1;
    const padW = w - 4 - label.length;

    out += moveTo(y + 1 + i, x) +
           COL.menuBg + BOX.v +
           bodyAttr + ' ';
    for (let ci = 0; ci < label.length; ci++) {
      const ch = label[ci];
      out += (ci === hotIdx ? hotAttr : bodyAttr) + ch;
    }
    out += bodyAttr + ' '.repeat(Math.max(0, padW)) +
           bodyAttr + ' ' +
           COL.menuBg + BOX.v +
           COL.shadow +
           bgChar(bg, y + 1 + i, x + w) +
           bgChar(bg, y + 1 + i, x + w + 1);
  }

  // ----- Bottom border + 2-cell right-side shadow -----
  const bottomRow = y + 1 + items.length;
  out += moveTo(bottomRow, x) +
         COL.menuBg + BOX.bl + BOX.h.repeat(w - 2) + BOX.br +
         COL.shadow +
         bgChar(bg, bottomRow, x + w) +
         bgChar(bg, bottomRow, x + w + 1);

  // ----- Bottom shadow row: offset +1 to the right, spans w+1 cells -----
  const shadowRow = bottomRow + 1;
  let bottomShadow = COL.shadow;
  for (let k = 0; k < w + 1; k++) {
    bottomShadow += bgChar(bg, shadowRow, x + 1 + k);
  }
  out += moveTo(shadowRow, x + 1) + bottomShadow;
  // Reset before leaving so subsequent draws aren't affected by shadow attr.
  out += RESET;
  // remember layout for hit testing
  state.layout.menu = { x, y, w, items: items.length };
  return out;
}

/* --------------------------- File viewer ---------------------------- */

/** Expand a single source line into one or more screen lines.
 *  - Tabs become 8-space stops.
 *  - When wrap is true, lines wider than `width` are broken at width.
 *  - When wrap is false, lines are truncated (with a trailing "$" marker). */
function wrapViewerLines(src, width, wrap) {
  const out = [];
  for (const raw of src) {
    const expanded = raw.replace(/\t/g, (_, i) => ' '.repeat(8 - (i % 8)));
    if (!wrap) {
      out.push(expanded.length > width ? expanded.slice(0, width - 1) + '$' : expanded);
      continue;
    }
    if (expanded.length === 0) { out.push(''); continue; }
    for (let off = 0; off < expanded.length; off += width) {
      out.push(expanded.slice(off, off + width));
    }
  }
  return out;
}

function drawViewer(L) {
  const v = state.viewer;
  if (!v) return '';

  const titleRow = 1;
  const bodyTop  = 2;
  const bodyBot  = L.rows - 1;
  const bodyH    = bodyBot - bodyTop + 1;
  const bodyW    = L.cols;

  const lines = wrapViewerLines(v.lines, bodyW, !!v.wrap);
  const maxTop = Math.max(0, lines.length - bodyH);
  if (v.top > maxTop) v.top = maxTop;
  if (v.top < 0) v.top = 0;

  let out = RESET + COL.base + clearScreen;

  // ---- Title bar: real MC uses black on cyan -------------------------
  // Format: "<path>   <cur>/<total>                 <percent>%"
  const totalLines = lines.length;
  const lastVisible = Math.min(totalLines, v.top + bodyH);
  const pos = totalLines === 0 ? '0/0' : `${lastVisible}/${totalLines}`;
  const percent = totalLines === 0 ? '0%'
                : (lastVisible >= totalLines ? '100%'
                : Math.floor((lastVisible / totalLines) * 100) + '%');
  const POS_PERCENT_GAP = 17;
  const rightChunk = pos + ' '.repeat(POS_PERCENT_GAP) + percent;
  // Real MC shows the full absolute path here (no ~ substitution).
  const pathLabel = v.path;
  const maxPathLen = Math.max(0, bodyW - rightChunk.length - 1);
  const shownPath = pathLabel.length > maxPathLen
    ? '…' + pathLabel.slice(pathLabel.length - maxPathLen + 1)
    : pathLabel;
  const leftGap = Math.max(0, bodyW - shownPath.length - rightChunk.length);
  const titleLine = shownPath + ' '.repeat(leftGap) + rightChunk;
  out += moveTo(titleRow, 1) + COL.menubar + padRight(titleLine, bodyW);

  // ---- Body lines: real MC uses light grey on blue, even empty rows --
  const bodyAttr = sgr(22, 37, 44);
  for (let i = 0; i < bodyH; i++) {
    const lineIdx = v.top + i;
    const text = lineIdx < lines.length ? lines[lineIdx] : '';
    out += moveTo(bodyTop + i, 1) + bodyAttr + padRight(text, bodyW);
  }

  // ---- F-keys footer (same colours as panel-mode F-keys) -------------
  out += drawFkeys({ ...L, fkeysRow: L.rows }, viewerFkeys(v.wrap));

  out += RESET;
  return out;
}

function openViewer(absPath, label) {
  const body = FILE_CONTENTS[absPath] ?? `[Preview not scripted for "${label}".]`;
  state.viewer = {
    path: absPath,
    label,
    lines: body.split('\n'),
    top: 0,
    wrap: true,
  };
}
function closeViewer() { state.viewer = null; }

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

function drawPrompt(L) {
  const p = state.prompt;
  if (!p) return '';
  const innerW = Math.min(L.cols - 6, Math.max(40, p.message.length + 4));
  const w = innerW + 4;
  const h = 6;
  const x = Math.floor((L.cols - w) / 2) + 1;
  const y = Math.floor((L.rows - h) / 2) + 1;
  let out = RESET;
  // Top border with centered title
  out += moveTo(y, x) + COL.dialog + BOX.tl + BOX.h.repeat(w - 2) + BOX.tr;
  const title = ' ' + p.title + ' ';
  const tx = x + Math.floor((w - title.length) / 2);
  out += moveTo(y, tx) + COL.dialogTitle + title + COL.dialog;
  // Body rows
  // row 1: message
  out += moveTo(y + 1, x) + COL.dialog + BOX.v +
         ' ' + padRight(p.message, w - 4) + ' ' + BOX.v;
  // row 2: input field (white on dark blue, with caret)
  const fieldW = w - 4;
  const fieldText = p.buffer.slice(-fieldW);
  const fieldAttr = sgr(22, 30, 46);
  out += moveTo(y + 2, x) + COL.dialog + BOX.v +
         ' ' + fieldAttr + padRight(fieldText, fieldW) + COL.dialog + ' ' + BOX.v;
  // row 3: spacer
  out += moveTo(y + 3, x) + COL.dialog + BOX.v + ' '.repeat(w - 2) + BOX.v;
  // row 4: OK / Cancel hint
  const hint = ' [ OK ]   [ Cancel ] ';
  out += moveTo(y + 4, x) + COL.dialog + BOX.v + ' '.repeat(w - 2) + BOX.v;
  out += moveTo(y + 4, x + Math.floor((w - hint.length) / 2)) + sgr(1, 30, 46) + hint + COL.dialog;
  // Bottom border
  out += moveTo(y + 5, x) + COL.dialog + BOX.bl + BOX.h.repeat(w - 2) + BOX.br;
  out += RESET;
  // Save layout for hit tests
  state.layout.prompt = { x, y, w, h, fieldY: y + 2 };
  return out;
}

function render() {
  state.cols = term.cols;
  state.rows = term.rows;
  const L = buildLayout();
  state.layout = { L, menu: null, modal: null, prompt: null };

  // The viewer takes over the entire screen when active.
  if (state.viewer) {
    term.write(drawViewer(L));
    return;
  }

  // ---- Pass 1: render the "base" (no dropdown) and capture chars ----
  const base = COL.base + clearScreen +
               drawMenubar(L) +
               drawPanel('left', L.leftPanel) +
               drawPanel('right', L.rightPanel) +
               drawHint(L) +
               drawCommand(L) +
               drawFkeys(L);
  const bg = parseScreen(base);

  // ---- Pass 2: dropdown + modal + prompt -----------------------------
  const out = base + drawDropdown(L, bg) + drawModal(L) + drawPrompt(L) + RESET;
  term.write(out);
}

/* ----------------------------- Actions ------------------------------ */

function currentRow() {
  const pan = state[state.active];
  const rows = rowsForDir(pan.path);
  return rows[Math.max(0, Math.min(pan.index, rows.length - 1))];
}

/** Remember the current cursor position for the panel's current path. */
function rememberPos(pan) {
  pan.memory ||= Object.create(null);
  pan.memory[pan.path] = { index: pan.index, top: pan.top };
}

/** Restore the cursor for `nextPath`. If we have a remembered position for
 *  that path, use it. Otherwise, when ascending via "..", select the child
 *  folder we just came from. Falls back to the first row. */
function restorePos(pan, nextPath, childName) {
  pan.memory ||= Object.create(null);
  const mem = pan.memory[nextPath];
  if (mem) {
    pan.index = mem.index;
    pan.top = mem.top;
    return;
  }
  if (childName) {
    const rows = rowsForDir(nextPath);
    const idx = rows.findIndex(r => !r.ghost && r.raw.n === childName);
    if (idx >= 0) { pan.index = idx; pan.top = 0; return; }
  }
  pan.index = 0; pan.top = 0;
}

function activate(side) {
  const pan = state[side];
  const rows = rowsForDir(pan.path);
  const row = rows[pan.index];
  if (!row || row.ghost) return;
  if (row.raw.n === '..') {
    rememberPos(pan);
    const childName = pan.path.split('/').pop() || '';
    pan.path = parentPath(pan.path);
    restorePos(pan, pan.path, childName);
    return;
  }
  if (row.raw.t === 'd') {
    const target = joinPath(pan.path, row.raw.n);
    if (FS[target] !== undefined) {
      rememberPos(pan);
      pan.path = target;
      restorePos(pan, target);
    }
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
  openViewer(abs, label);
}

function showModal(title, lines) {
  state.modal = { title, lines };
}
function closeModal() { state.modal = null; }

function showPrompt(title, message, onSubmit, initial = '') {
  state.prompt = { title, message, buffer: initial, onSubmit };
}
function closePrompt() { state.prompt = null; }

/** Add a freshly-created child directory to the in-memory FS at `parent`
 *  and seed its own entry list so it can be navigated into. */
function addDirectory(parent, name) {
  const newPath = joinPath(parent, name);
  // No-op if it already exists.
  if ((FS[parent] || []).some(r => r.n === name)) return false;
  const today = new Date();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const hh = String(today.getHours()).padStart(2, '0');
  const mm = String(today.getMinutes()).padStart(2, '0');
  const date = `${months[today.getMonth()]} ${String(today.getDate()).padStart(2, ' ')} ${hh}:${mm}`;
  FS[parent] = FS[parent] || [];
  FS[parent].push({ n: name, t: 'd', size: 4096, date });
  FS[newPath] = [];
  return true;
}

function mkdirInActivePanel() {
  const pan = state[state.active];
  showPrompt('Create a new directory', 'Enter directory name:', (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (trimmed === '.' || trimmed === '..' || trimmed.includes('/')) {
      showModal('Create a new directory', [`Invalid name: "${trimmed}"`]);
      return;
    }
    if (!addDirectory(pan.path, trimmed)) {
      showModal('Create a new directory', [`"${trimmed}" already exists.`]);
      return;
    }
    // Focus the freshly created directory.
    const rows = rowsForDir(pan.path);
    const idx = rows.findIndex(r => !r.ghost && r.raw.n === trimmed);
    if (idx >= 0) pan.index = idx;
  });
}

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
    '  F1, F3, F9, F10          function keys',
    '  Esc                      close menu/dialog',
  ]);
  if (n === 3) {
    const r = currentRow();
    if (!r || r.ghost || r.raw.n === '..' || r.raw.t === 'd')
      return showModal('View', ['Select a plain file row first.']);
    if (r.raw.t === 'l') return activate(state.active);
    return viewFile(joinPath(state[state.active].path, r.raw.n), r.raw.n);
  }
  if (n === 7)  return mkdirInActivePanel();
  if (n === 9)  return openMenu(0);
  if (n === 10) return showModal('Quit', ['This is just a webpage — close the tab to exit.']);
  // F2, F4..F6, F8: unimplemented — labels are hidden in FKEYS, so just no-op.
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

// xterm.js calls this BEFORE forwarding the key to its parser. Returning
// `false` blocks the key entirely (so onData never sees it). We want all
// keys to be translated to escape sequences and reach onData below, so we
// only intercept browser-level shortcuts we don't want to break.
term.attachCustomKeyEventHandler((e) => {
  if (e.type !== 'keydown') return true;
  // Never let the terminal hijack Cmd-R / Ctrl-R (page reload) or
  // Cmd-Shift-R / Ctrl-Shift-R (hard reload).
  if ((e.metaKey || e.ctrlKey) && (e.key === 'r' || e.key === 'R')) return false;
  return true;
});

function viewerPageStep() {
  // body height = total rows - 2 (title row + fkeys row)
  return Math.max(1, term.rows - 2);
}

term.onData((data) => {
  // ---- Prompt dialog: takes input until Enter/Esc ----------------
  if (state.prompt) {
    const p = state.prompt;
    if (data === '\x1b') { closePrompt(); render(); return; }
    if (data === '\r' || data === '\n') {
      const submit = p.onSubmit;
      const value = p.buffer;
      closePrompt();
      if (typeof submit === 'function') submit(value);
      render();
      return;
    }
    // Backspace (DEL 0x7F on most terminals, BS 0x08 on some)
    if (data === '\x7f' || data === '\b') {
      p.buffer = p.buffer.slice(0, -1);
      render(); return;
    }
    // Any printable single char (allow Unicode beyond ASCII too).
    if (data.length === 1 && data.charCodeAt(0) >= 0x20) {
      p.buffer += data;
      render(); return;
    }
    // Otherwise ignore (arrow keys, F-keys, etc.)
    return;
  }

  // ---- File viewer mode -------------------------------------------
  if (state.viewer) {
    const v = state.viewer;
    // F-keys recognised by the viewer
    const fnum = parseFKey(data);
    if (fnum === 1) {
      showModal('Viewer help', [
        'Keyboard:',
        '  ↑/↓ PgUp PgDn Home End  scroll',
        '  F2                       toggle line wrap',
        '  F3 / F10 / Esc           quit viewer',
      ]);
      render(); return;
    }
    if (fnum === 2) { v.wrap = !v.wrap; v.top = 0; render(); return; }
    if (fnum === 3 || fnum === 10) { closeViewer(); render(); return; }

    switch (data) {
      case '\x1b':
        closeViewer(); render(); return;
      case '\x1b[A': case '\x1bOA':
        v.top -= 1; render(); return;
      case '\x1b[B': case '\x1bOB':
        v.top += 1; render(); return;
      case '\x1b[5~':
        v.top -= viewerPageStep(); render(); return;
      case '\x1b[6~':
      case ' ':
        v.top += viewerPageStep(); render(); return;
      case '\x1b[H': case '\x1b[1~':
        v.top = 0; render(); return;
      case '\x1b[F': case '\x1b[4~':
        v.top = Number.MAX_SAFE_INTEGER; render(); return; // clamped in drawViewer
    }
    return;
  }

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

  // Viewer takes over the screen — only the bottom F-keys row is clickable.
  if (state.viewer) {
    if (y === L.rows) {
      const slotW = Math.max(7, Math.floor(L.cols / 10));
      const idx = Math.floor((x - 1) / slotW);
      const n = idx + 1;
      if (n === 1) { showModal('Viewer help', ['F2 wrap | F3/F10/Esc quit | arrows scroll']); render(); return; }
      if (n === 2) { state.viewer.wrap = !state.viewer.wrap; state.viewer.top = 0; render(); return; }
      if (n === 3 || n === 10) { closeViewer(); render(); return; }
    }
    return;
  }

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
