import { freeLandscape } from "./map-detail-plan";
/** Seeded once at module load: no random geometry or repeated work during pan/zoom. */
let seed = 71931;
const random = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};
const fmt = (n: number) => n.toFixed(3);
function crown(x: number, y: number, r: number, lobes: number) {
  const pts = Array.from({ length: lobes * 2 }, (_, i) => {
    const a = (i * Math.PI) / lobes;
    const radius = r * (i % 2 ? 0.78 : 0.9 + random() * 0.15);
    return [x + Math.cos(a) * radius, y + Math.sin(a) * radius];
  });
  let d = `M${fmt((pts[0][0] + pts.at(-1)![0]) / 2)},${fmt((pts[0][1] + pts.at(-1)![1]) / 2)}`;
  pts.forEach((p, i) => {
    const next = pts[(i + 1) % pts.length];
    d += `Q${fmt(p[0])},${fmt(p[1])} ${fmt((p[0] + next[0]) / 2)},${fmt((p[1] + next[1]) / 2)}`;
  });
  return d + "Z";
}
export const forestBatches = ["#9eaf93", "#aab99e", "#93a88d", "#b5c1a6"].map(
  (fill) => ({ fill, d: "", veins: "" }),
);
const occupied = new Map<string, { x: number; y: number; r: number }[]>();
export let treeCount = 0;
const clusters = [
  [47, 16, 10, 3.7, 145],
  [57, 17, 7, 3.5, 85],
  [49, 40, 13, 7.6, 260],
  [61, 52, 6, 4.5, 90],
  [38, 67, 3.9, 5, 55],
  [21.5, 35, 2.7, 5, 45],
  [80, 55, 2.3, 8, 60],
  [21, 51, 2.3, 5, 35],
  [36, 81, 3, 2.7, 28],
  [61, 82.3, 3.2, 3.5, 35],
  [35, 48, 3.2, 5, 55],
  [29, 56, 3, 2, 25],
];
for (const [cx, cy, rx, ry, count] of clusters)
  for (let i = 0; i < count * 3; i++) {
    const angle = random() * Math.PI * 2,
      spread = Math.sqrt(random()),
      x = cx + Math.cos(angle) * rx * spread,
      y = cy + Math.sin(angle) * ry * spread,
      r = 0.23 + random() * 0.37;
    if (!freeLandscape(x, y, r)) continue;
    let close = false;
    for (let a = Math.floor(x) - 1; a <= Math.floor(x) + 1; a++)
      for (let b = Math.floor(y) - 1; b <= Math.floor(y) + 1; b++)
        if (
          (occupied.get(`${a},${b}`) ?? []).some(
            (p) => Math.hypot(p.x - x, p.y - y) < (p.r + r) * 0.8,
          )
        )
          close = true;
    if (close) continue;
    const key = `${Math.floor(x)},${Math.floor(y)}`;
    const cell = occupied.get(key) ?? [];
    cell.push({ x, y, r });
    occupied.set(key, cell);
    const batch = forestBatches[Math.floor(random() * forestBatches.length)];
    batch.d += crown(x, y, r, 5 + Math.floor(random() * 4));
    batch.veins += `M${fmt(x - r * 0.22)},${fmt(y + r * 0.25)}q${fmt(r * 0.6)},${fmt(-r * 0.2)} ${fmt(r * 0.55)},${fmt(-r * 0.65)}`;
    treeCount++;
  }
function palm(x: number, y: number, r: number, turn: number) {
  let d = "";
  const count = 7;
  for (let i = 0; i < count; i++) {
    const a = turn + (i * Math.PI * 2) / count,
      l = r * (0.8 + random() * 0.25);
    const tx = x + Math.cos(a) * l,
      ty = y + Math.sin(a) * l;
    const nx = -Math.sin(a) * l * 0.25,
      ny = Math.cos(a) * l * 0.25;
    d += `M${fmt(x)},${fmt(y)}Q${fmt((x + tx) / 2 + nx)},${fmt((y + ty) / 2 + ny)} ${fmt(tx)},${fmt(ty)}Q${fmt((x + tx) / 2 - nx * 0.3)},${fmt((y + ty) / 2 - ny * 0.3)} ${fmt(x)},${fmt(y)}Z`;
  }
  return d;
}
export let palmPath = "",
  palmCount = 0;
const palmSites: number[][] = [];
for (let y = 75.8; y < 88; y += 1.1) palmSites.push([46.1, y], [50.5, y]);
for (let y = 58; y < 72; y += 1.5) palmSites.push([45.7, y], [49.8, y]);
for (let i = 0; i < 13; i++) palmSites.push([67.5 + i * 0.34, 17.8 + i * 0.67]);
for (let i = 0; i < 9; i++)
  palmSites.push([23.5 + i * 1.7, 22], [26.8 + i * 1.5, 29.8]);
for (const [x, y] of [
  [65.8, 19.5],
  [69.6, 23],
  [70.6, 27.6],
  [59, 58.4],
  [58.7, 59.8],
  [59.2, 62.3],
  [61, 64.8],
  [24, 60.5],
  [23, 65.7],
  [26, 68.6],
  [28, 69.5],
  [34, 22.5],
  [36, 23],
  [39.6, 24],
  [41, 26.8],
  [40.8, 27.8],
  [27, 22.3],
  [29, 29.2],
  [32, 29],
  [34, 30],
  [40.2, 70.7],
  [42, 71.2],
  [44.5, 72.7],
  [53.1, 72],
  [54.8, 71.5],
  [44.1, 83.4],
  [45.7, 86.6],
  [52.2, 87],
  [52.8, 85.3],
])
  palmSites.push([x, y]);
for (const [x, y] of palmSites)
  if (freeLandscape(x, y, 0.31)) {
    palmPath += palm(x, y, 0.29 + random() * 0.1, random() * Math.PI);
    palmCount++;
  }
export const flowerBeds: {
  x: number;
  y: number;
  rx: number;
  ry: number;
  d: string;
}[] = [];
for (const [x, y] of [
  [43, 49],
  [45, 51.4],
  [48.8, 51.3],
  [49.2, 48.2],
  [54.1, 50.6],
  [36.3, 47],
  [26.2, 64.9],
  [28.1, 60.5],
  [32.8, 24.8],
  [39.7, 23.6],
  [42, 70.2],
  [53.2, 69.9],
  [45.3, 84.5],
  [52.7, 84.3],
]) {
  if (!freeLandscape(x, y, 0.55)) continue;
  let d = "";
  for (let i = 0; i < 7; i++) {
    const a = (i * Math.PI * 2) / 7;
    d += crown(x + Math.cos(a) * 0.32, y + Math.sin(a) * 0.22, 0.09, 4);
  }
  flowerBeds.push({ x, y, rx: 0.55, ry: 0.37, d });
}
export const rocks: {
  x: number;
  y: number;
  r: number;
  d: string;
  contour: string;
}[] = [];
for (const [cx, cy, n] of [
  [45, 15, 12],
  [52, 16, 12],
  [59, 18.5, 10],
  [20, 40, 7],
  [82, 35, 9],
  [20.6, 59, 7],
  [76.5, 68, 9],
  [37, 84.5, 5],
])
  for (let i = 0; i < n; i++) {
    const x = cx + (random() - 0.5) * 3,
      y = cy + (random() - 0.5) * 2,
      r = 0.22 + random() * 0.48;
    if (!freeLandscape(x, y, r)) continue;
    rocks.push({
      x,
      y,
      r,
      d: crown(x, y, r, 3 + Math.floor(random() * 3)),
      contour: `M${fmt(x - r * 0.3)},${fmt(y + r * 0.3)}q${fmt(r * 0.55)},${fmt(-r * 0.7)} ${fmt(r * 0.8)},${fmt(-r * 0.2)}`,
    });
  }
