const paths = {
  compass: 'M16 1l2.8 12.2L31 16l-12.2 2.8L16 31l-2.8-12.2L1 16l12.2-2.8L16 1ZM7 7l6.2 6.2m5.6 5.6L25 25m0-18-6.2 6.2m-5.6 5.6L7 25',
  clock: 'M16 3a13 13 0 1 0 0 26 13 13 0 0 0 0-26Zm0 6v7l5 3',
  arch: 'M3 29h26M5 29V13a11 11 0 0 1 22 0v16M10 29V14a6 6 0 0 1 12 0v15M5 20h5m12 0h5M16 2v6',
  palm: 'M3 28c8-4 18-4 26 0M13 25c.3-7 3.4-12 8-17M20 9c-2-5-7-6-11-3 4 0 7 1 10 4m2-2c3-5 7-4 10 0-4-1-7-1-10 1m-1 0c-6-1-10 2-11 7 3-3 6-4 11-6m1-1c5 1 7 5 6 8-2-3-4-5-6-7',
  fountain: 'M3 23c1.8 4 6.1 6 13 6s11.2-2 13-6H3Zm13-4V4M5 17c0-5 5-7 8-2m14 2c0-5-5-7-8-2M10 7c2-3 4-3 6-3s4 0 6 3',
  market: 'M6 12v16h20V12M3 12l3-8h20l3 8c-1 4-5 5-8 2-3 3-7 3-10 0-3 3-7 2-8-2Zm8 2 2-10m8 10-2-10M10 28v-8h12v8',
  dining: 'M7 3v12m-4-12v8a4 4 0 0 0 8 0V3m-4 12v14M24 3c-5 3-6 8-6 14h6m0-14v26',
  lantern: 'M16 2v4m-7 5 7-5 7 5H9Zm1 0 1.5 14h9L22 11M10 25h12l2 4H8l2-4Zm6-12v9',
  leaf: 'M5 26C2 11 11 6 27 4c1 13-4 22-17 22m-7 3C9 20 15 14 23 8m-11 12v-7m0 7h8',
  butterfly: 'M16 12C10 3 3 3 3 9c0 5 4 7 8 8-7-1-8 6-4 8 4 2 7-2 9-5m0-8C22 3 29 3 29 9c0 5-4 7-8 8 7-1 8 6 4 8-4 2-7-2-9-5m0-8v10m0-10-4-6m4 6 4-6',
  waves: 'M2 9c5 0 5-3 9-3s5 3 9 3 5-3 10-3M2 17c5 0 5-3 9-3s5 3 9 3 5-3 10-3M2 25c5 0 5-3 9-3s5 3 9 3 5-3 10-3',
  slide: 'M2 27h28M4 26v-6c13 0 13-12 20-15h4v21M7 26c10-1 11-14 19-17m-7 7v10',
  lotus: 'M16 23c-7-8-5-14 0-20 5 6 7 12 0 20Zm0 0C9 23 5 17 4 10c5 0 7 2 8 4m4 9c7 0 11-6 12-13-5 0-7 2-8 4M9 17c-2 0-5 1-7 3 5 8 23 8 28 0-2-2-5-3-7-3',
  sail: 'M2 24h28l-5 5H7l-5-5Zm14 0V2L6 20h10m2-15 9 15h-9',
  ring: 'M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28Zm0 8a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM6 6l6 6m8 8 6 6M26 6l-6 6m-8 8-6 6',
  moon: 'M25 20A11 11 0 0 1 12 4a12 12 0 1 0 13 16Zm-2-9 2-4 2 4 4 2-4 2-2 4-2-4-4-2 4-2Z',
  flag: 'M7 30V3m0 2c6-6 12 5 19 0v15c-7 5-13-6-19 0M7 9l6 2v4m0-4 6 2v4m0-4 6 2m-12 0-6-2m12 4-6-2',
  peak: 'm2 27 12-22 7 12 4-8 5 18H2Zm7-13 5 4 4-5m6 0 3 3',
  shield: 'M16 2l11 5v9c0 6-4 11-11 14C9 27 5 22 5 16V7l11-5Zm-5 14 4 4 6-8',
} as const;

export type AtlasIconName = keyof typeof paths;

export default function AtlasIcon({ name }: { name: AtlasIconName }) {
  return <svg className="atlas-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor"
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
