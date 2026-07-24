export interface SectionMeta {
  id: string
  index: number
  moduleId: string
  label: string
  hue: number
  route?: string
}

export const sections: SectionMeta[] = [
  { id: 'boot', index: 0, moduleId: 'SYS/00', label: 'BOOT', hue: 45 },
  { id: 'orbit', index: 1, moduleId: 'SYS/01', label: 'ORBIT', hue: 205, route: '/orbit' },
  { id: 'pipelines', index: 2, moduleId: 'SYS/02', label: 'PIPELINES', hue: 175 },
  { id: 'products', index: 3, moduleId: 'SYS/03', label: 'PRODUCTS', hue: 260 },
  { id: 'signal', index: 4, moduleId: 'SYS/04', label: 'SIGNAL', hue: 320 },
  { id: 'trajectory', index: 5, moduleId: 'SYS/05', label: 'TRAJECTORY', hue: 235 },
  { id: 'connect', index: 6, moduleId: 'SYS/06', label: 'CONNECT', hue: 40 },
]
