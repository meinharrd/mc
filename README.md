# mc — Midnight Commander, in your browser

A small static page that mimics GNU Midnight Commander using a real
terminal emulator (xterm.js) running entirely in the browser. There is
no server, no PTY, no websocket — the panels, menus, dialogs and
function key bar are drawn with ANSI escape sequences and box-drawing
characters by [`mc.js`](mc.js).

## Run it

It's a static site. Just serve the folder, or open `index.html` directly
in a modern browser:

```bash
python3 -m http.server 8765
# then visit http://localhost:8765/
```

## Controls

- **Mouse / touch**
  - First click on a row → select
  - Second click on the same row → open
  - Click a top menu title → pulldown (click again to close)
  - Click outside a dialog or its `[ OK ]` button → close
  - Click an `F1`–`F10` slot at the bottom → run the function
- **Keyboard**
  - `↑`/`↓` `Home` `End` `PgUp` `PgDn` — move highlight
  - `Tab` / `←` / `→` — switch active panel
  - `Enter` — open
  - `F1`..`F10` — function keys
  - `Esc` — close menu or dialog

## What's emulated

- Twin-panel layout with classic MC blue chrome
- Active panel uses the double-line frame; inactive uses single-line
- Column header `Name | Size | Modify time` with vertical separators
- Mini status line under each panel
- Top menubar with pulldowns (Left / File / Command / Options / Right)
- Modal dialogs with `[ OK ]` button
- Hint line, command prompt with reverse-video cursor block, F-key bar
- Mobile-aware: scales the cell font down to fit ~80 columns and
  suppresses the soft keyboard on touch devices

## Files

- [`index.html`](index.html) — loads xterm.js + addon-fit from a CDN and
  hosts the `#term` element.
- [`mc.js`](mc.js) — the entire VTUI: fake filesystem, renderer, mouse
  hit-testing, keyboard handler.

## License

MIT.
