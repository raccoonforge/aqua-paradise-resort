import { details } from "../components/map/destinations";
export type Point = readonly [number, number];
export type Mode = "walk" | "shuttle";
export type Place = {
  id: string;
  name: string;
  category: string;
  description: string;
  point: Point;
  link?: string;
};
// Registration: normalized illustration coordinates, x/1536 and y/1024.
// This is an authored resort plan, not a surveyed geographic/GPS map.
const anchors: [string, number, number][] = [
  ["paradise-boulevard", 42, 79],
  ["paradise-market", 43, 63],
  ["eden-gardens", 43, 43],
  ["little-paradise", 65, 63],
  ["serenity-spa", 17, 55],
  ["pirates-cove", 68, 39],
  ["atlantis-realm", 17, 32],
  ["adrenaline-peak", 47, 14],
  ["ocean-bay", 67, 15],
  ["grand-hotel", 23, 16],
];
export const categories: Record<string, string> = {
  all: "Все места",
  zones: "Тематические зоны",
  hotel: "Отель",
  transport: "Транспорт",
};
export const places: Place[] = anchors.map(([id, x, y], i) => ({
  id,
  point: [x, y],
  name: details[i].name,
  description: details[i].description,
  category: i === 9 ? "hotel" : "zones",
  link: i === 9 ? "#/hotel" : `#/zones?zone=${id}`,
}));
places.push(
  {
    id: "gateway",
    name: "Главный вход",
    category: "transport",
    description: "Входная площадь Paradise Boulevard.",
    point: [42, 86],
  },
  {
    id: "cable",
    name: "Ocean Wings · канатная дорога",
    category: "transport",
    description: "Станция прибытия с материка.",
    point: [29, 78],
  },
  {
    id: "jetty",
    name: "Морской причал",
    category: "transport",
    description: "Прибытие на паромах и катерах.",
    point: [33, 90],
  },
);
export type Edge = {
  from: string;
  to: string;
  mode: Mode;
  points: Point[];
  weight: number;
};
export const edges: Edge[] = [];
const positions = new Map<string, Point>(places.map((p) => [p.id, p.point]));
// Route endpoints are public entrances, separate from the building-centred label pins.
const entrances: Record<string, Point> = {
  "paradise-boulevard": [42, 83],
  "paradise-market": [43, 69],
  "eden-gardens": [43, 51],
  "little-paradise": [58, 64],
  "serenity-spa": [23, 53],
  "pirates-cove": [60, 48],
  "atlantis-realm": [24, 38],
  "adrenaline-peak": [45, 23],
  "ocean-bay": [58, 23],
  "grand-hotel": [35, 18],
  cable: [29, 80],
  jetty: [33, 89],
};
for (const [id, p] of Object.entries(entrances)) positions.set(id, p);
function connect(
  from: string,
  to: string,
  via: Point[] = [],
  mode: Mode = "walk",
) {
  const points = [positions.get(from)!, ...via, positions.get(to)!];
  const weight = points
    .slice(1)
    .reduce(
      (sum, p, i) =>
        sum + Math.hypot((p[0] - points[i][0]) * 1.5, p[1] - points[i][1]),
      0,
    );
  edges.push({ from, to, points, mode, weight });
}
// Road junctions are also actual boarding nodes. One geometry feeds roads and routing.
const stops: [string, string, Point][] = [
  ["south", "Paradise Boulevard", [56.5, 71]],
  ["market", "Paradise Market", [54, 53]],
  ["gardens", "Eden Gardens", [56.5, 32.5]],
  ["ocean", "Ocean Bay", [56.5, 21.5]],
  ["peak", "Adrenaline Peak", [36, 20.5]],
  ["atlantis", "Atlantis Realm", [24, 40]],
  ["spa", "Serenity Spa", [29.3, 52.5]],
  ["west", "Paradise Loop Central Station", [28, 70.5]],
];
for (const [id, name, point] of stops) {
  const key = `stop:${id}`;
  positions.set(key, point);
  places.push({
    id: key,
    name: `Paradise Loop · ${name}`,
    point,
    category: "transport",
    description:
      "Остановка бесплатного кольцевого электрошаттла. Посадка и выход на пешеходную дорожку.",
  });
}
const bends: Point[][] = [
  [
    [55, 69],
    [54, 65],
    [53, 62],
    [52, 59],
    [52, 56],
  ],
  [
    [52, 51],
    [54, 48],
    [54, 46],
    [53, 43],
    [54, 40],
    [54, 36],
  ],
  [
    [54, 30],
    [57, 28],
    [61, 26],
    [60, 24],
  ],
  [
    [52, 23],
    [47, 23],
    [43, 23],
    [39, 21],
  ],
  [
    [35, 24],
    [36, 27],
    [33, 29],
    [30, 30],
    [29, 33],
    [28, 36],
    [25, 37],
  ],
  [
    [24, 43],
    [26, 47],
    [29, 50],
  ],
  [
    [30, 56],
    [30, 60],
    [28, 64],
    [26, 67],
    [26, 69],
  ],
  [
    [28, 73],
    [32, 72],
    [35, 71],
    [39, 70],
    [43, 69],
    [48, 70],
    [52, 72],
    [55, 72],
  ],
];
for (let i = 0; i < stops.length; i++) {
  const a = `stop:${stops[i][0]}`,
    b = `stop:${stops[(i + 1) % stops.length][0]}`;
  connect(a, b, bends[i]);
  connect(a, b, bends[i], "shuttle");
}
connect("gateway", "paradise-boulevard");
connect("gateway", "cable", [
  [38, 85],
  [34, 83],
  [31, 82],
]);
connect("gateway", "jetty", [
  [38, 88],
  [35, 88],
]);
connect("paradise-boulevard", "stop:south", [
  [46, 82],
  [49, 79],
  [52, 76],
  [55, 74],
]);
connect("paradise-boulevard", "stop:west", [
  [38, 82],
  [35, 80],
  [32, 77],
  [29, 74],
]);
connect("paradise-market", "stop:market", [
  [48, 70],
  [52, 72],
  [55, 72],
  [55, 69],
  [54, 65],
  [53, 62],
  [52, 59],
  [52, 56],
]);
connect("eden-gardens", "stop:spa", [
  [39, 52],
  [36, 54],
  [33, 55],
  [30, 54],
]);
connect("eden-gardens", "stop:gardens", [
  [48, 52],
  [52, 51],
  [54, 48],
  [54, 45],
  [53, 43],
  [54, 39],
  [54, 35],
]);
connect("serenity-spa", "stop:spa", [[26, 53]]);
connect("atlantis-realm", "stop:atlantis");
connect("adrenaline-peak", "stop:peak", [
  [41, 23],
  [38, 22],
]);
connect("ocean-bay", "stop:ocean", [[57, 23]]);
connect("pirates-cove", "stop:market", [
  [57, 49],
  [54, 48],
  [52, 51],
]);
connect("little-paradise", "stop:market", [
  [56, 61],
  [54, 58],
  [52, 56],
]);
// Hotel access terminates at reception; no public road through the villa campus.
connect("grand-hotel", "stop:peak");
export type Route = { edges: Edge[]; transfers: number; fallback: boolean };
export function findRoute(from: string, to: string, mode: Mode): Route | null {
  if (!positions.has(from) || !positions.has(to)) return null;
  // State includes whether the loop has been used, so transport mode includes a ride.
  const start = `${from}|0`,
    dist = new Map([[start, 0]]),
    previous = new Map<string, { key: string; edge: Edge }>(),
    visited = new Set<string>();
  let end: string | undefined;
  while (true) {
    const next = [...dist]
      .filter(([key]) => !visited.has(key))
      .sort((a, b) => a[1] - b[1])[0];
    if (!next) break;
    const [key, cost] = next;
    const [node, used] = key.split("|");
    if (node === to && (mode === "walk" || used === "1" || from === to)) {
      end = key;
      break;
    }
    visited.add(key);
    for (const edge of edges) {
      if (mode === "walk" && edge.mode === "shuttle") continue;
      const target =
        edge.from === node ? edge.to : edge.to === node ? edge.from : null;
      if (!target) continue;
      const reverse = edge.to === node;
      const step = reverse
        ? {
            ...edge,
            from: node,
            to: target,
            points: [...edge.points].reverse(),
          }
        : edge;
      const state = `${target}|${used === "1" || edge.mode === "shuttle" ? 1 : 0}`;
      const weight =
        cost +
        edge.weight * (edge.mode === "shuttle" ? 0.35 : 1) +
        (edge.mode === "shuttle" && used === "0" ? 3 : 0);
      if (weight < (dist.get(state) ?? Infinity)) {
        dist.set(state, weight);
        previous.set(state, { key, edge: step });
      }
    }
  }
  if (!end) {
    if (mode === "shuttle") {
      const walk = findRoute(from, to, "walk");
      return walk ? { ...walk, fallback: true } : null;
    }
    return null;
  }
  const result: Edge[] = [];
  let cursor: string = end;
  while (cursor !== start) {
    const prior: { key: string; edge: Edge } = previous.get(cursor)!;
    result.unshift(prior.edge);
    cursor = prior.key;
  }
  const boardings = result.filter(
    (e, i) =>
      e.mode === "shuttle" && (i === 0 || result[i - 1].mode !== "shuttle"),
  ).length;
  return {
    edges: result,
    transfers: Math.max(0, boardings - 1),
    fallback: false,
  };
}
export const pathData = (points: readonly Point[]) =>
  points.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
