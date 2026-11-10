import { edges, estateEdges, type Point } from "./map-network";
import { footprints, pools, type Footprint } from "./map-plan";
export type District =
  | "hotel"
  | "peak"
  | "ocean"
  | "atlantis"
  | "eden"
  | "pirate"
  | "spa"
  | "market"
  | "little"
  | "boulevard";
export type DetailBuilding = Footprint & {
  district: District;
  roof: "villa" | "gallery" | "glass" | "temple" | "spa" | "tower" | "service";
};
export type DetailPool = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  district: District;
};
// These are subordinate architectural masses, not new catalogue POIs.
// Placement is deterministic and checks the complete public and guest-only circulation.
const roads = [...edges.filter((e) => e.mode === "walk"), ...estateEdges];
const buckets = new Map<string, Point[]>();
for (const road of roads)
  for (let i = 1; i < road.points.length; i++) {
    const a = road.points[i - 1],
      b = road.points[i],
      n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 0.09);
    for (let k = 0; k <= n; k++) {
      const p: Point = [
        a[0] + ((b[0] - a[0]) * k) / n,
        a[1] + ((b[1] - a[1]) * k) / n,
      ];
      const key = `${Math.floor(p[0] / 2)},${Math.floor(p[1] / 2)}`;
      const cell = buckets.get(key) ?? [];
      cell.push(p);
      buckets.set(key, cell);
    }
  }
function nearby(x: number, y: number, r: number) {
  const points: Point[] = [];
  for (let a = Math.floor((x - r) / 2); a <= Math.floor((x + r) / 2); a++)
    for (let b = Math.floor((y - r) / 2); b <= Math.floor((y + r) / 2); b++)
      points.push(...(buckets.get(`${a},${b}`) ?? []));
  return points;
}
const poolCandidates: [District, number, number, number, number][] = [
  ["hotel", 32.1, 23.9, 0.6, 1],
  ["hotel", 26.8, 28.4, 0.6, 0.45],
  ["hotel", 38.4, 27.7, 0.7, 0.45],
  ["hotel", 29, 21.9, 0.7, 0.35],
  ["peak", 44, 27, 1.1, 0.65],
  ["peak", 51.3, 23.4, 1.1, 0.7],
  ["peak", 57.7, 25.4, 0.8, 0.7],
  ["peak", 47.3, 23.3, 0.65, 0.75],
  ["atlantis", 34.1, 39, 1, 1.3],
  ["atlantis", 28.2, 40.4, 0.55, 0.8],
  ["atlantis", 31, 36.2, 1.6, 0.35],
  ["eden", 55.3, 48.7, 1.1, 0.8],
  ["eden", 57, 51.8, 1.3, 1.1],
  ["eden", 45.8, 49.5, 0.7, 1],
  ["eden", 35.8, 48.8, 0.7, 1.2],
  ["spa", 24.3, 62.6, 0.65, 1.1],
  ["spa", 28.3, 58.9, 0.65, 1.1],
  ["spa", 25.1, 64.6, 0.9, 0.6],
  ["spa", 28.2, 65.3, 0.6, 0.7],
  ["little", 61.5, 61.5, 1.7, 1],
  ["little", 69, 56.5, 1, 0.7],
  ["little", 71.8, 61.8, 0.55, 1],
  ["pirate", 79, 48.1, 1.2, 0.6],
  ["pirate", 78.8, 36.5, 1.6, 0.8],
  ["boulevard", 45.9, 79.5, 0.6, 0.6],
  ["boulevard", 51.2, 78.4, 0.65, 0.6],
  ["market", 41.2, 71.6, 0.45, 0.45],
  ["market", 53.5, 70.8, 0.45, 0.45],
];
export const detailPools: DetailPool[] = [];
for (const [district, x, y, rx, ry] of poolCandidates) {
  if (
    nearby(x, y, Math.max(rx, ry) + 0.6).some(
      (p) =>
        ((p[0] - x) / (rx + 0.52)) ** 2 + ((p[1] - y) / (ry + 0.52)) ** 2 <= 1,
    )
  )
    continue;
  if (
    footprints.some(
      (b) =>
        x + rx + 0.12 > b.x &&
        x - rx - 0.12 < b.x + b.w &&
        y + ry + 0.12 > b.y &&
        y - ry - 0.12 < b.y + b.h,
    )
  )
    continue;
  if (
    [...pools, ...detailPools].some(
      (p) =>
        Math.hypot(
          (p.x - x) / (p.rx + rx + 0.2),
          (p.y - y) / (p.ry + ry + 0.2),
        ) < 1,
    )
  )
    continue;
  detailPools.push({ district, x, y, rx, ry });
}
const candidates: DetailBuilding[] = [];
function block(
  district: District,
  roof: DetailBuilding["roof"],
  x: number,
  y: number,
  w: number,
  h: number,
) {
  candidates.push({
    district,
    roof,
    x,
    y,
    w,
    h,
    kind: roof === "villa" ? "villa" : "pavilion",
  });
}
// Hotel campus: long guest wings, villa courts, garden lodges and back-of-house.
for (const [x, y, w, h] of [
  [31.8, 18, 5.7, 0.6],
  [38.4, 18, 1.8, 0.9],
  [27, 20.1, 0.7, 1.1],
  [29.4, 22.5, 1.5, 0.8],
  [35.8, 20.9, 1, 0.6],
  [40.2, 20, 1, 1.5],
  [24, 22, 1.1, 1],
  [23.3, 25, 1, 0.9],
  [25.6, 29.7, 1.2, 0.8],
  [28, 30.2, 1.1, 0.8],
  [30.2, 29, 1.1, 0.9],
  [32, 28.5, 1.3, 0.7],
  [36.5, 26.4, 1.1, 0.8],
  [38.8, 24.1, 1.1, 0.8],
  [42, 22.3, 1.1, 0.9],
  [43, 26.4, 0.9, 1.1],
  [40, 29.5, 1.2, 0.7],
])
  block("hotel", w > 3 ? "gallery" : "villa", x, y, w, h);
for (const [x, y] of [
  [23.8, 27.7],
  [26.7, 21.5],
  [29.5, 28.1],
  [36, 24.5],
  [38.8, 28.6],
  [41.6, 19],
])
  block("hotel", "service", x, y, 0.6, 0.5);
// Distinct launch compounds and equipment houses rather than oversized ride icons.
for (const [x, y, w, h] of [
  [42.2, 20.1, 1.3, 1.3],
  [45.8, 20.8, 0.9, 1.1],
  [48.8, 20.4, 1, 1],
  [52.5, 19.7, 1.3, 1.1],
  [57.5, 21.4, 0.9, 1.2],
  [59, 24.3, 1.3, 0.9],
  [43.2, 28.3, 1.1, 0.7],
  [50.9, 27.6, 1, 0.8],
  [54.2, 26.4, 0.8, 0.7],
  [46, 24.7, 0.65, 0.65],
])
  block("peak", "tower", x, y, w, h);
// Beach crescent: pavilion terraces and compact service structures set back from water.
for (const [x, y, w, h] of [
  [66.2, 16.7, 1.3, 0.8],
  [68.5, 17.5, 1.2, 0.7],
  [70.7, 18.5, 0.9, 0.7],
  [71.8, 20, 1, 0.7],
  [70.3, 23.7, 0.9, 0.7],
  [71.7, 26.3, 1.4, 0.8],
  [67.8, 27.5, 0.8, 0.6],
  [62.2, 21, 0.8, 0.9],
  [65.1, 18.1, 0.6, 0.6],
])
  block("ocean", "gallery", x, y, w, h);
// Atlantis: stepped temple courts, colonnaded water gardens and ruin fragments.
for (const [x, y, w, h] of [
  [28.3, 35.1, 2.4, 0.8],
  [32, 34.8, 2.1, 1.1],
  [35.1, 36.9, 1.1, 1.6],
  [26.7, 40.4, 1, 0.7],
  [28.6, 43.8, 1.4, 0.8],
  [32.2, 41.5, 1.5, 0.7],
  [34.2, 46.3, 0.8, 1],
  [29.3, 46.1, 1.1, 0.8],
  [25, 34.2, 0.8, 0.7],
  [35.1, 40.7, 0.8, 0.6],
  [31.8, 37.2, 0.6, 0.5],
])
  block("atlantis", "temple", x, y, w, h);
// Botanical conservatories, nursery wings, shaded garden pavilions and gazebos.
for (const [x, y, w, h] of [
  [44, 47.9, 1.5, 2.3],
  [46.3, 47.5, 1.4, 2.7],
  [48.2, 48.2, 1.4, 1.8],
  [53.8, 54.8, 1.7, 1.1],
  [55.5, 52.9, 1.2, 0.8],
  [50.2, 46.9, 1.4, 0.8],
  [37, 53.1, 0.9, 0.9],
  [42.5, 44.8, 1.1, 0.9],
  [44, 42, 1, 0.7],
  [59, 48.1, 1.1, 0.8],
  [47.4, 52.3, 0.7, 0.7],
  [35, 50.8, 0.8, 0.7],
])
  block("eden", "glass", x, y, w, h);
// Harbour warehouses, courtyards and lookout pavilions; the ship stays a plan-view hull.
for (const [x, y, w, h] of [
  [75.1, 36.7, 2, 0.9],
  [79, 38.8, 1.3, 1.2],
  [80.3, 41, 1, 1.4],
  [80, 45.4, 1.7, 0.9],
  [77.8, 49.5, 1.8, 0.9],
  [73.6, 43.8, 0.8, 1.1],
  [66.1, 40.1, 0.7, 0.7],
  [65.1, 45.8, 1.3, 0.8],
  [72, 35.5, 0.8, 0.8],
  [68.3, 38.9, 1.4, 0.7],
])
  block("pirate", "gallery", x, y, w, h);
for (const [x, y, w, h] of [
  [65.1, 34.8, 2.7, 0.9],
  [68.5, 35.5, 1.1, 1.6],
  [64.5, 36.3, 0.7, 1.5],
  [66.5, 37.5, 1.4, 0.8],
  [81.4, 46.3, 1, 1.4],
  [81.7, 40, 1.1, 1.8],
  [81, 37.6, 1.4, 0.8],
])
  block("pirate", "temple", x, y, w, h);
// Quiet spa courts: treatment pavilions, thermal rooms, individual garden cabanas.
for (const [x, y, w, h] of [
  [22.7, 60.1, 1.3, 1.5],
  [24.2, 65.7, 1.3, 1],
  [27.8, 56.7, 1.2, 0.9],
  [31.3, 57.8, 1.1, 0.8],
  [29.2, 64.4, 0.6, 0.7],
  [25.3, 60.3, 0.7, 0.5],
  [22.8, 63.5, 0.6, 0.7],
  [27.8, 68.2, 0.8, 0.6],
  [33.7, 61.3, 0.7, 0.7],
  [25, 67.7, 0.8, 0.6],
  [31.8, 61.7, 0.7, 0.6],
])
  block("spa", "spa", x, y, w, h);
// Market is composed as galleries around several courtyards, not a random city grid.
for (const [x, y, w, h] of [
  [39.3, 68, 2.6, 0.7],
  [39.3, 69, 0.7, 1.4],
  [42.5, 67.2, 2.7, 0.8],
  [44.9, 68.7, 0.7, 1.5],
  [39.4, 73, 2.4, 0.7],
  [41.3, 69.2, 0.8, 0.6],
  [41.5, 72.6, 0.7, 0.6],
  [50.3, 70, 2.1, 0.8],
  [53, 68.5, 2, 0.7],
  [54.5, 69.5, 0.7, 1.4],
  [51, 72, 0.8, 0.6],
  [54, 74.8, 2, 0.8],
  [50.4, 76.3, 0.8, 0.7],
  [44.4, 76.2, 1, 0.6],
  [42.1, 74.6, 0.7, 0.6],
  [55.8, 72.9, 0.9, 0.7],
])
  block("market", "gallery", x, y, w, h);
// Family water gardens with dispersed shelters, changing rooms and play platforms.
for (const [x, y, w, h] of [
  [59.1, 58.1, 1.5, 0.9],
  [60.2, 63.1, 1.1, 0.8],
  [63, 62.3, 0.7, 0.7],
  [67.1, 55.3, 0.7, 0.8],
  [70.5, 54.8, 1.1, 0.9],
  [72, 58, 0.8, 1],
  [71.3, 63.8, 0.8, 0.6],
  [67.5, 65.2, 0.8, 0.7],
  [61.2, 57.1, 0.8, 0.6],
  [59.6, 60, 0.7, 0.7],
  [63.1, 56.1, 0.8, 0.6],
])
  block("little", "service", x, y, w, h);
// Arrival sequence: gate piers, plaza galleries, terminal lounges and service pavilions.
for (const [x, y, w, h] of [
  [43.3, 84.8, 1.3, 0.8],
  [44.5, 87, 1.3, 0.7],
  [47.6, 89.1, 0.7, 1.3],
  [51.8, 89.1, 0.7, 1.3],
  [53.2, 86.6, 1.4, 0.8],
  [51.1, 83.5, 1.2, 0.7],
  [44.7, 81, 1.2, 0.7],
  [44, 78.7, 1, 0.7],
  [51.8, 76.3, 0.8, 0.6],
  [40.2, 85.8, 1.4, 0.7],
  [41.2, 87.1, 0.7, 0.6],
  [54.6, 88.7, 0.9, 0.6],
  [46.3, 83.2, 0.7, 0.7],
])
  block("boulevard", "gallery", x, y, w, h);
export const detailBuildings: DetailBuilding[] = [];
for (const b of candidates) {
  const cx = b.x + b.w / 2,
    cy = b.y + b.h / 2;
  if (
    nearby(cx, cy, Math.max(b.w, b.h) / 2 + 0.6).some(
      (p) =>
        p[0] > b.x - 0.53 &&
        p[0] < b.x + b.w + 0.53 &&
        p[1] > b.y - 0.53 &&
        p[1] < b.y + b.h + 0.53,
    )
  )
    continue;
  if (
    [...footprints, ...detailBuildings].some(
      (r) =>
        b.x + b.w + 0.13 > r.x &&
        b.x - 0.13 < r.x + r.w &&
        b.y + b.h + 0.13 > r.y &&
        b.y - 0.13 < r.y + r.h,
    )
  )
    continue;
  if (
    [...pools, ...detailPools].some(
      (p) =>
        Math.hypot(
          (cx - p.x) / (p.rx + b.w / 2 + 0.15),
          (cy - p.y) / (p.ry + b.h / 2 + 0.15),
        ) < 1,
    )
  )
    continue;
  detailBuildings.push(b);
}
/** Shared clearance query keeps canopies, rocks and small garden furniture off the paths. */
export function freeLandscape(x: number, y: number, r: number) {
  if (
    nearby(x, y, r + 0.65).some(
      (p) => Math.hypot(p[0] - x, p[1] - y) < r + 0.62,
    )
  )
    return false;
  if (
    [...footprints, ...detailBuildings].some(
      (b) =>
        x + r > b.x - 0.12 &&
        x - r < b.x + b.w + 0.12 &&
        y + r > b.y - 0.12 &&
        y - r < b.y + b.h + 0.12,
    )
  )
    return false;
  if (
    [...pools, ...detailPools].some(
      (p) =>
        Math.hypot(
          (x - p.x) / (p.rx + r + 0.15),
          (y - p.y) / (p.ry + r + 0.15),
        ) < 1,
    )
  )
    return false;
  return true;
}
export const detailDistricts: District[] = [
  "hotel",
  "peak",
  "ocean",
  "atlantis",
  "eden",
  "pirate",
  "spa",
  "market",
  "little",
  "boulevard",
];
