export type Project = { name: string; when: string; summary: string; tags: string[]; status?: string; href?: string }

// Placeholders until there are real projects to list.
export const projects: Project[] = [
  {
    name: 'sam-resendez',
    when: '2026',
    summary: "The site you're reading: React, a small SQLite API, and a Noctis-themed tabline.",
    tags: ['react', 'sqlite'],
    status: 'active',
  },
  {
    name: 'dotfiles',
    when: 'ongoing',
    summary: 'Neovim, zsh and tmux config, tuned well past the point of usefulness.',
    tags: ['lua', 'shell'],
  },
]
