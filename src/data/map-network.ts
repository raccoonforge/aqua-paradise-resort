import { details } from "../components/map/destinations";
import island from "./island-map-v0.4.json" with { type: "json" };
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
/** Orthographic, isotropic v0.4 projection. East is right, north is up. */
export const projectPlan = ([x, y]: readonly number[]): Point => [
  50 + x * 0.028,
  48 - y * 0.028,
];
export const categories: Record<string, string> = {
  all: "Все места",
  zones: "Тематические зоны",
  hotel: "Отель",
  transport: "Транспорт",
};
export const places: Place[] = island.pins.map((pin, i) => ({
  id: i === 8 ? "ocean-bay" : i === 9 ? "grand-hotel" : pin.id,
  name: details[i].name,
  description: details[i].description,
  point: projectPlan(pin.point),
  category: i === 9 ? "hotel" : "zones",
  link:
    i === 9
      ? "#/hotel"
      : `#/zones?zone=${pin.id === "ocean-bay-onshore" ? "ocean-bay" : pin.id}`,
}));
places.push(
  {
    id: "gateway",
    name: "Главный вход",
    category: "transport",
    description: "Южная входная площадь Paradise Boulevard.",
    point: [50, 90],
  },
  {
    id: "cable",
    name: "Ocean Wings · канатная дорога",
    category: "transport",
    description: "Станция прибытия с материка у южного входа.",
    point: [43, 88],
  },
  {
    id: "jetty",
    name: "Морской причал",
    category: "transport",
    description: "Прибытие на паромах и катерах. Пешеходный доступ по причалу.",
    point: [57, 94],
  },
);
export type Edge = {
  from: string;
  to: string;
  mode: Mode;
  points: Point[];
  weight: number;
  secondary?: boolean;
};
export const edges: Edge[] = [];
const positions = new Map<string, Point>(places.map((p) => [p.id, p.point]));
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
      (sum, p, i) => sum + Math.hypot(p[0] - points[i][0], p[1] - points[i][1]),
      0,
    );
  edges.push({ from, to, points, mode, weight });
}
const stops: [string, string, Point][] = [
  ["south", "Paradise Boulevard", [53, 81]],
  ["market", "Paradise Market", [57, 71]],
  ["pirate", "Pirate’s Cove", [71, 47]],
  ["ocean", "Ocean Bay", [66, 29]],
  ["peak", "Adrenaline Peak", [49, 32]],
  ["atlantis", "Atlantis Realm", [26, 46]],
  ["gardens", "Eden Gardens", [40, 58]],
  ["spa", "Serenity Spa", [31, 69]],
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
    [57, 78],
    [60, 76],
  ],
  [
    [64, 69],
    [71, 66],
    [75, 59],
    [75, 53],
  ],
  [
    [73, 40],
    [72, 34],
  ],
  [
    [61, 29],
    [56, 32],
  ],
  [
    [41, 33],
    [34, 34],
    [28, 33],
    [23, 36],
    [23, 41],
  ],
  [
    [28, 51],
    [32, 55],
    [36, 57],
  ],
  [
    [36, 62],
    [33, 66],
  ],
  [
    [36, 75],
    [41, 80],
    [47, 82],
  ],
];
for (let i = 0; i < stops.length; i++) {
  const a = `stop:${stops[i][0]}`,
    b = `stop:${stops[(i + 1) % stops.length][0]}`;
  connect(a, b, bends[i]);
  connect(a, b, bends[i], "shuttle");
}
connect("gateway", "paradise-boulevard", [[49, 85]]);
connect("gateway", "cable", [[46, 89]]);
connect("gateway", "jetty", [[55, 92]]);
connect("paradise-boulevard", "stop:south");
connect("paradise-boulevard", "paradise-market", [[48, 77]]);
connect("paradise-market", "eden-gardens", [
  [48, 67],
  [47, 62],
]);
connect("paradise-market", "stop:market", [[52, 73]]);
connect("eden-gardens", "stop:gardens", [[44, 58]]);
connect("serenity-spa", "stop:spa", [[30, 66]]);
connect("atlantis-realm", "stop:atlantis", [[28, 43]]);
connect("adrenaline-peak", "stop:peak", [[49, 29]]);
connect("ocean-bay", "stop:ocean", [[64, 24]]);
connect("pirates-cove", "stop:pirate", [[68, 45]]);
connect("little-paradise", "stop:market", [
  [63, 65],
  [60, 68],
]);
// Hotel access terminates at its reception plaza. No route crosses private villas.
connect("grand-hotel", "stop:peak", [
  [34, 29],
  [37, 31],
  [42, 32],
]);
// Secondary public promenades are real graph edges, not decorative shortcuts.
// Original anchors, primary approaches and all eight shuttle stops stay unchanged.
function connectSecondary(from: string, to: string, via: Point[]) {
  connect(from, to, via);
  edges.at(-1)!.secondary = true;
}
connectSecondary("eden-gardens", "stop:peak", [
  [44, 56],
  [41, 54],
  [40.5, 50],
  [40, 46],
  [43, 43],
  [45, 38],
]);
connectSecondary("atlantis-realm", "stop:gardens", [
  [35, 43],
  [36, 46],
  [34, 51],
  [35, 54],
]);
connectSecondary("serenity-spa", "stop:gardens", [
  [30, 61],
  [30, 57],
  [34, 59],
]);
connectSecondary("little-paradise", "stop:pirate", [
  [65.5, 62],
  [65.5, 58],
  [68, 54],
  [70, 50],
]);
connectSecondary("paradise-market", "stop:spa", [
  [46.2, 75.3],
  [41, 75.5],
  [37, 73],
  [34, 71],
]);
connectSecondary("ocean-bay", "stop:ocean", [
  [68, 20],
  [69, 22],
  [68, 25],
]);
connectSecondary("pirates-cove", "stop:pirate", [
  [70, 42],
  [70.5, 44],
]);
connectSecondary("adrenaline-peak", "stop:peak", [
  [48, 26],
  [46, 28],
  [46, 30],
]);

/** The entrance alley crosses the western loop corridor at grade. Connect that
 * physical junction in the walking graph; it is not an extra stop or catalogue POI. */
const westApproach = edges.find(
  (e) => e.mode === "walk" && e.from === "stop:spa" && e.to === "stop:south",
)!;
const entranceApproach = edges.find(
  (e) =>
    e.mode === "walk" && e.from === "gateway" && e.to === "paradise-boulevard",
)!;
const cross2 = (a: Point, b: Point) => a[0] * b[1] - a[1] * b[0];
const ja = westApproach.points.at(-2)!,
  jb = westApproach.points.at(-1)!,
  jc = entranceApproach.points.at(-2)!,
  jd = entranceApproach.points.at(-1)!;
const jr: Point = [jb[0] - ja[0], jb[1] - ja[1]],
  js: Point = [jd[0] - jc[0], jd[1] - jc[1]],
  jq: Point = [jc[0] - ja[0], jc[1] - ja[1]];
const jt = cross2(jq, js) / cross2(jr, js);
const arrivalJunction: Place = {
  id: "junction:arrival",
  name: "Перекрёсток входной аллеи",
  category: "junction",
  description: "Пешеходное пересечение у Paradise Boulevard.",
  point: [ja[0] + jr[0] * jt, ja[1] + jr[1] * jt],
};
export const junctionNodes: readonly Place[] = [arrivalJunction];
positions.set(arrivalJunction.id, arrivalJunction.point);
for (const original of [westApproach, entranceApproach]) {
  const cut = original.points.length - 2;
  const parts = [
    {
      from: original.from,
      to: arrivalJunction.id,
      points: [...original.points.slice(0, cut + 1), arrivalJunction.point],
    },
    {
      from: arrivalJunction.id,
      to: original.to,
      points: [arrivalJunction.point, original.points.at(-1)!],
    },
  ];
  edges.splice(
    edges.indexOf(original),
    1,
    ...parts.map((part) => ({
      ...original,
      ...part,
      weight: part.points
        .slice(1)
        .reduce(
          (sum, p, i) =>
            sum +
            Math.hypot(p[0] - part.points[i][0], p[1] - part.points[i][1]),
          0,
        ),
    })),
  );
}

/** Guest-only circulation is explicitly modelled and excluded from public routing. */
export const estateNodes: Record<string, Point> = {
  reception: places.find((p) => p.id === "grand-hotel")!.point,
  courtyard: [34, 21.8],
  eastGarden: [41.5, 24.5],
  eastVilla: [42, 28.5],
  poolCourt: [32.5, 26.8],
  westGarden: [27.5, 25.2],
  westVilla: [24.5, 28.5],
};
const estateLinks: [string, string, Point[]][] = [
  ["reception", "courtyard", [[35.5, 22.2]]],
  [
    "reception",
    "eastVilla",
    [
      [36, 27.5],
      [38, 28.5],
    ],
  ],
  ["eastGarden", "eastVilla", [[42.5, 26]]],
  [
    "reception",
    "poolCourt",
    [
      [33.6, 24.4],
      [33, 25.5],
    ],
  ],
  [
    "poolCourt",
    "westGarden",
    [
      [31.5, 27.3],
      [29.5, 27],
      [27.8, 26.5],
    ],
  ],
  [
    "westGarden",
    "westVilla",
    [
      [27.5, 26.2],
      [27, 27.5],
    ],
  ],
];
export const estateEdges = estateLinks.map(([from, to, via]) => {
  const points = [estateNodes[from], ...via, estateNodes[to]];
  return {
    from,
    to,
    mode: "walk" as const,
    access: "hotel-guests" as const,
    points,
    weight: points
      .slice(1)
      .reduce(
        (sum, p, i) =>
          sum + Math.hypot(p[0] - points[i][0], p[1] - points[i][1]),
        0,
      ),
  };
});
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
/** Round junction corners; roads and route highlights always use this same path. */
export const pathData = (points: readonly Point[]) => {
  if (!points.length) return "";
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i - 1],
      b = points[i],
      c = points[i + 1];
    const before = Math.hypot(b[0] - a[0], b[1] - a[1]),
      after = Math.hypot(c[0] - b[0], c[1] - b[1]);
    const r = Math.min(0.65, before / 3, after / 3);
    const x = b[0] + ((a[0] - b[0]) * r) / before,
      y = b[1] + ((a[1] - b[1]) * r) / before;
    const u = b[0] + ((c[0] - b[0]) * r) / after,
      v = b[1] + ((c[1] - b[1]) * r) / after;
    d += ` L${x},${y} Q${b[0]},${b[1]} ${u},${v}`;
  }
  const last = points.at(-1)!;
  return points.length > 1 ? d + ` L${last[0]},${last[1]}` : d;
};
