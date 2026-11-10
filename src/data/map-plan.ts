/** Original top-down landscape plan. All coordinates share the network's 100×100 world. */
export const coastPath =
  "M 48 8 C 57 7 63 11 68 13 C 74 14 81 13 83 17 C 84 20 78 21 75 24 C 71 28 76 31 80 30 C 86 29 88 36 86 42 C 89 48 85 53 83 58 C 82 66 76 69 72 73 C 67 78 63 81 60 86 C 57 90 55 94 50 94 C 45 94 42 89 39 85 C 35 81 32 77 28 73 C 22 69 20 63 18 57 C 15 52 15 46 18 42 C 15 38 16 33 20 30 C 22 27 19 23 23 20 C 27 17 31 19 34 16 C 38 12 41 9 48 8 Z";
export type Footprint = {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: "pavilion" | "hotel" | "villa" | "terminal";
};
export const footprints: Footprint[] = [
  { x: 28, y: 20, w: 3, h: 1.4, kind: "hotel" },
  { x: 31.5, y: 19, w: 6, h: 1.6, kind: "hotel" },
  { x: 38, y: 20, w: 2, h: 3, kind: "hotel" },
  ...[
    [26, 23],
    [25, 26],
    [28, 28],
    [37, 24],
    [39, 26],
  ].map(([x, y]) => ({ x, y, w: 1.3, h: 1.1, kind: "villa" as const })),
  { x: 43, y: 24, w: 2, h: 1.6, kind: "pavilion" },
  { x: 52, y: 26, w: 2, h: 1.2, kind: "pavilion" },
  { x: 62, y: 18, w: 2, h: 1.2, kind: "pavilion" },
  { x: 69.5, y: 28, w: 2, h: 1, kind: "pavilion" },
  { x: 26, y: 37, w: 1.6, h: 2.6, kind: "pavilion" },
  { x: 32, y: 44, w: 2.4, h: 1.4, kind: "pavilion" },
  { x: 64, y: 39, w: 2, h: 1.4, kind: "pavilion" },
  { x: 74, y: 48, w: 2.8, h: 1.8, kind: "pavilion" },
  { x: 42, y: 51, w: 2, h: 2, kind: "pavilion" },
  { x: 50, y: 57, w: 2, h: 1.6, kind: "pavilion" },
  { x: 24, y: 58, w: 2.5, h: 1.6, kind: "pavilion" },
  { x: 26, y: 66, w: 1.6, h: 1.2, kind: "pavilion" },
  { x: 63, y: 59, w: 1.8, h: 1.2, kind: "pavilion" },
  { x: 72, y: 65.6, w: 2, h: 1.2, kind: "pavilion" },
  ...[
    [43, 70],
    [43, 73],
    [51, 68],
    [52, 75],
  ].map(([x, y]) => ({ x, y, w: 2.2, h: 1.3, kind: "pavilion" as const })),
  { x: 43, y: 82.6, w: 2, h: 1.4, kind: "pavilion" },
  { x: 51, y: 85, w: 2, h: 1.2, kind: "pavilion" },
  { x: 40, y: 88, w: 2, h: 1.5, kind: "terminal" },
  { x: 55, y: 90, w: 2, h: 1, kind: "terminal" },
];
export const pools = [
  { x: 30, y: 25, rx: 2, ry: 1.3 },
  { x: 55.5, y: 24, rx: 2, ry: 1.5 },
  { x: 31, y: 39, rx: 2, ry: 1.6 },
  { x: 52, y: 52, rx: 2.6, ry: 3 },
  { x: 38, y: 50, rx: 1.4, ry: 2.5 },
  { x: 27, y: 62, rx: 2.4, ry: 1.5 },
  { x: 69, y: 60, rx: 2.5, ry: 2 },
  { x: 77, y: 43, rx: 3.5, ry: 4 },
];
export const groves = [
  "M35 16Q42 8 51 12Q61 12 64 17L60 21Q51 17 45 20Q39 23 35 16Z",
  "M20 31Q22 27 25 29L28 33L24 38Q19 39 20 31Z",
  "M39 36Q46 32 53 37Q60 33 65 37L62 44Q57 45 55 49L49 47Q42 48 38 43Z",
  "M20 47Q24 47 24 52L23 56L20 55Z",
  "M33 48Q36 43 40 46L41 52L38 55L34 53Z",
  "M56 51Q60 46 66 49L68 54L64 58L58 57Z",
  "M34 63Q39 60 42 64L43 69L39 73L35 71Z",
  "M73 59Q79 56 79 62L75 67L72 66Z",
  "M33 77L38 79L41 83L40 86L36 83Z",
  "M59 79L65 77L62 83L58 87L56 86Z",
];
