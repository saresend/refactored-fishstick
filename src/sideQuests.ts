export type SideQuest = { name: string; href: string; meta: string; summary: string; tags: string[] }

export const sideQuests: SideQuest[] = [
  {
    name: 'vega1-seg',
    href: 'https://saresend.github.io/vega1-seg/',
    meta: 'demo',
    summary: 'Text-prompted video segmentation that runs entirely in the browser: describe an object and get a per-frame mask.',
    tags: ['rust', 'wasm'],
  },
]
