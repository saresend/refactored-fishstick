---
title: Terminal chic
date: 2026-10-20
tags: design, css
summary: Borrowing the discipline of terminal interfaces, the grid, the palette, the status line, without turning it into a costume.
---

Terminals have a design language most of us absorb without noticing: a fixed grid, a small palette doing a lot of work, and status lines that pack a surprising amount of state into a single row. It's an aesthetic built entirely out of constraints, and I find it calming.

When I started redesigning this site I wanted to borrow that discipline without turning it into a costume. No fake boot sequence, no cursor that blinks forever. Just the parts that make good terminal UIs good.

## What I kept

- **Density with hierarchy.** A status line is a dozen facts in one row, and it's still easy to read because every segment has a place.
- **Color as meaning.** Green means ok, red means trouble. Nothing is colored just to be decorative.
- **Keyboard first.** Every view is one keypress away, and the mouse still works.

## The palette

Everything here comes from [Noctis](https://terminalcolors.com/themes/noctis/default/), a 16-color scheme with a deep teal background. Sixteen colors turn out to be plenty when each one has a job:

```css theme.css
:root {
  --bg:     #03191b;
  --fg:     #b2cacd;
  --accent: #49d6e9;  /* cyan: links, focus */
  --ok:     #49e9a6;  /* green: success */
  --warn:   #e4b781;  /* yellow: dates, metadata */
}
```

## How this page is made

Posts are plain markdown files in `content/posts/`. At build time, Vite gathers them with `import.meta.glob`, and each one becomes a page under [/writing](/writing):

```ts src/posts.ts
const files = import.meta.glob<string>('/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})
```

> Adding a post means adding a file. No CMS, no database, nothing to deploy but the site itself.

## What's next

More writing, mostly. The site is intentionally small: an about page, a list of posts, and room to grow. If the terminal is where you're most comfortable too, you'll feel at home here.
