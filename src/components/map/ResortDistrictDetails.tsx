import {
  detailBuildings,
  detailPools,
  freeLandscape,
  type District,
} from "../../data/map-detail-plan";
const districts: District[] = [
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
function Roofs({ district }: { district: District }) {
  return (
    <g className="pm-secondary-roofs" data-district-buildings={district}>
      {detailBuildings
        .filter((b) => b.district === district)
        .map((b, i) => (
          <g key={i}>
            <rect
              data-detail-building="true"
              data-obstacle="building"
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={b.roof === "spa" ? 0.2 : 0.06}
              fill={
                district === "hotel"
                  ? "#d9d1ac"
                  : district === "atlantis"
                    ? "#c2ac7b"
                    : district === "market"
                      ? "#b99b79"
                      : district === "pirate"
                        ? "#b7ac83"
                        : district === "eden"
                          ? "#a3bdb0"
                          : district === "spa"
                            ? "#e2dfc5"
                            : district === "little"
                              ? "#d8bca6"
                              : "#d8d3b3"
              }
              stroke="#8e9271"
              strokeWidth=".08"
            />
            <path
              d={`M${b.x + 0.13} ${b.y + 0.13}h${Math.max(0.1, b.w - 0.26)}v${Math.max(0.1, b.h - 0.26)}h${-Math.max(0.1, b.w - 0.26)}Z`}
              fill="none"
              stroke={b.roof === "glass" ? "#879f99" : "#c4b696"}
              strokeWidth=".045"
            />
            {b.roof === "glass" ? (
              <path
                d={`M${b.x + b.w / 2} ${b.y}v${b.h}M${b.x} ${b.y + b.h / 3}h${b.w}M${b.x} ${b.y + (b.h * 2) / 3}h${b.w}`}
                stroke="#839e96"
                strokeWidth=".045"
              />
            ) : b.roof === "tower" ? (
              <path
                d={`M${b.x + 0.18} ${b.y + 0.18}l${b.w - 0.36} ${b.h - 0.36}m${-b.w + 0.36} 0l${b.w - 0.36} ${-b.h + 0.36}`}
                fill="none"
                stroke="#b09d77"
                strokeWidth=".05"
              />
            ) : (
              <path
                d={`M${b.x + 0.1} ${b.y + b.h * 0.5}h${b.w - 0.2}`}
                stroke="#c5b897"
                strokeWidth=".045"
              />
            )}
            {b.roof === "gallery" && (
              <path
                className="pm-fine-detail"
                d={Array.from(
                  { length: Math.max(2, Math.floor(b.w / 0.4)) },
                  (_, j) =>
                    `M${b.x + 0.2 + j * 0.35} ${b.y + 0.1}v${b.h - 0.2}`,
                ).join("")}
                fill="none"
                stroke="#c1b18b"
                strokeWidth=".035"
              />
            )}
          </g>
        ))}
    </g>
  );
}
function WaterGardens({ district }: { district: District }) {
  return (
    <g data-district-pools={district}>
      {detailPools
        .filter((p) => p.district === district)
        .map((p, i) => (
          <g key={i}>
            <ellipse
              cx={p.x}
              cy={p.y}
              rx={p.rx + 0.16}
              ry={p.ry + 0.16}
              fill="#e4d9bd"
              stroke="#c4b58f"
              strokeWidth=".045"
            />
            <ellipse
              data-detail-pool="true"
              data-obstacle="water"
              cx={p.x}
              cy={p.y}
              rx={p.rx}
              ry={p.ry}
              fill={
                district === "spa"
                  ? "#93bda5"
                  : district === "little"
                    ? "#80b4ac"
                    : "#70a79f"
              }
              stroke="#fbf6e9"
              strokeWidth=".1"
            />
            <ellipse
              className="pm-fine-detail"
              cx={p.x}
              cy={p.y}
              rx={p.rx * 0.77}
              ry={p.ry * 0.72}
              fill="none"
              stroke="#d0dfd8"
              strokeWidth=".04"
            />
          </g>
        ))}
    </g>
  );
}
function Loungers({ sites }: { sites: number[][] }) {
  return (
    <g fill="#f1e5c9" stroke="#b8a780" strokeWidth=".045">
      {sites
        .filter(([x, y]) => freeLandscape(x, y, 0.32))
        .map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width=".24" height=".57" rx=".045" />
            <path d={`M${x} ${y + 0.18}h.24`} strokeWidth=".04" />
            {i % 3 === 0 && (
              <circle cx={x + 0.45} cy={y + 0.2} r=".22" fill="#dfd0ad" />
            )}
          </g>
        ))}
    </g>
  );
}
const beachSeats = Array.from({ length: 24 }, (_, i) => [
  70.9 + (i % 3) * 0.62 + Math.floor(i / 3) * 0.2,
  18.7 + Math.floor(i / 3) * 0.85,
]);
const spaSeats = Array.from({ length: 10 }, (_, i) => [
  23.1 + (i % 2) * 0.55,
  61 + Math.floor(i / 2) * 0.75,
]);
const hotelSeats = Array.from({ length: 10 }, (_, i) => [
  28.4 + i * 0.36,
  23.25,
]);
function CafeCourts() {
  const sites = [
    [40.6, 70.2],
    [41.5, 70.6],
    [42.4, 71],
    [43.3, 71.6],
    [44.1, 72],
    [52.5, 69.5],
    [53.5, 70.2],
    [53.7, 71.8],
    [50.8, 74.6],
    [51.8, 74.6],
    [52.3, 76.2],
    [26.3, 60.4],
    [29, 29.2],
    [33, 24.5],
    [71.6, 21.6],
  ];
  return (
    <g
      className="pm-fine-detail"
      data-feature="cafe-courtyards"
      fill="#f2ead9"
      stroke="#b9a886"
      strokeWidth=".045"
    >
      {sites
        .filter(([x, y]) => freeLandscape(x, y, 0.19))
        .map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r=".16" />
            <path
              d={`M${x - 0.1} ${y - 0.27}h.2M${x - 0.1} ${y + 0.27}h.2M${x - 0.27} ${y - 0.1}v.2M${x + 0.27} ${y - 0.1}v.2`}
              fill="none"
            />
          </g>
        ))}
    </g>
  );
}
/** Hero silhouettes are legible at overview; secondary room-bay linework recedes. */
function SignatureComplexes() {
  return (
    <g
      data-layer="signature-complexes"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <g data-signature="hotel" fill="none" stroke="#d9c594" strokeWidth=".16">
        <path d="M28 21Q32 20.6 36.7 21.4Q40.9 22.7 40.7 27.7M27.4 29Q31.2 30.6 33 28.5" />
        <path
          d="M31.8 18.2H37.2M31.8 19.7H37.2M38.5 20.4V22.6"
          stroke="#eae4c9"
          strokeWidth=".14"
        />
      </g>
      <g data-signature="peak" fill="none" stroke="#c8c7a5" strokeWidth=".12">
        <path d="M40.7 20Q48 16.6 55.5 19M40.3 19.4Q48.5 15.9 56 18.4" />
        <path
          d="M43 24.5Q42.2 26.7 44 27M54 22Q57.6 20.4 58.4 23"
          stroke="#eae4c9"
          strokeWidth=".16"
        />
      </g>
      <g data-signature="ocean" fill="none" stroke="#f1e8cd" strokeWidth=".14">
        <path d="M75 16.9Q71 20.7 72 24.9Q73.2 27.5 77.8 28.2M75.7 17.3Q72 21 73 24.7Q74.6 26.9 78 27.4" />
      </g>
      <g
        data-signature="atlantis"
        fill="none"
        stroke="#d8cc9d"
        strokeWidth=".28"
      >
        <path d="M28.3 36.4H33.7V41.4H32.6M28.4 40.9V37.5" />
        <path d="M29 37.1H33V40.7" stroke="#6b9a8e" strokeWidth=".12" />
      </g>
      <g
        data-signature="eden"
        fill="#c8dcc6"
        stroke="#507e6c"
        strokeWidth=".13"
      >
        <path d="M46.5 50.8Q42.2 51.3 43.7 47.8Q47 47.4 46.5 50.8Z" />
        <path d="M46.5 50.8Q45.8 46.4 49 47.9Q49.8 51 46.5 50.8Z" />
        <path d="M46.5 50.8Q50.8 50.5 49.1 53.4Q46 54 46.5 50.8Z" />
        <path d="M46.5 50.8Q46.7 55 43.7 53.1Q43.2 50.3 46.5 50.8Z" />
        <path
          d="M43.7 47.8L49.1 53.4M49 47.9L43.7 53.1M44 49L48 52.8M47.8 48.1L44.3 52.9"
          fill="none"
          stroke="#f2f0cf"
          strokeWidth=".1"
        />
        <circle cx="46.5" cy="50.8" r=".52" fill="#6b9b82" stroke="#e8d6a6" />
      </g>
      <g data-signature="pirate" fill="none" stroke="#ddc796" strokeWidth=".18">
        <path d="M74.3 38.7H79.6V46.4H78.5M80.4 40.4V44.6" />
        <path
          d="M76.8 40.8V45M75.9 42.2H77.7M76 43.6H77.6"
          stroke="#efe6c6"
          strokeWidth=".11"
        />
      </g>
      <g data-signature="spa" fill="none" stroke="#e7e4bf" strokeWidth=".18">
        <ellipse cx="27" cy="62" rx="2.9" ry="2" />
        <path d="M24 62Q24.5 58.7 28.2 59M25 64.1Q28.2 66 30 63.2" />
      </g>
      <g data-signature="market" fill="none" stroke="#eee2b8" strokeWidth=".18">
        <path d="M39.8 68.6H45V72.6M40 73.3H44.8M50.7 68.4H54.9V71.1M52.4 75.4H55.4" />
        <path
          d="M40.6 69.4H44.2V72M51.4 69.2H54.1"
          stroke="#9d8058"
          strokeWidth=".1"
        />
      </g>
      <g data-signature="little" fill="none" stroke="#e8d0ae" strokeWidth=".23">
        <path d="M66.5 58.8Q68.3 56.2 70.7 58.9M67.6 61.2Q69.3 63.1 71 61M60.6 61.4Q62 63.4 63 61.4" />
      </g>
      <g
        data-signature="boulevard"
        fill="none"
        stroke="#d5c28a"
        strokeWidth=".16"
      >
        <path d="M44.6 83.3Q49 80.3 53.7 83.6M45.2 83.8Q49.3 81.3 53.2 84M47.3 89.5H48.5M51.5 89.5H52.7" />
        <circle cx="46.5" cy="85.7" r="1.5" stroke="#e9d9ae" />
      </g>
    </g>
  );
}
export default function ResortDistrictDetails() {
  return (
    <g
      data-layer="district-details"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {districts.map((d) => (
        <g data-district={d} key={d}>
          <title>{d} · архитектурный план</title>
          <WaterGardens district={d} />
          <Roofs district={d} />
        </g>
      ))}
      {/* The hotel campus: reception court, long colonnades, pool terraces and villa gardens. */}
      <g
        data-feature="hotel-estate"
        fill="none"
        stroke="#c2b38e"
        strokeWidth=".065"
      >
        <path d="M31.8 17.8H37.5M32.1 17.6H37.1M28.4 18H30M38.5 17.7H40.3M28 21.8H30.4M35.8 21.6H37" />
        <path
          className="pm-fine-detail"
          d={Array.from(
            { length: 12 },
            (_, i) => `M${32 + i * 0.45} 18.1v.4M${31.3 + i * 0.51} 19.2v1.15`,
          ).join("")}
        />
        <ellipse cx="30" cy="25" rx="2.3" ry="1.6" />
        <ellipse cx="30" cy="25" rx="2.55" ry="1.85" />
      </g>
      <Loungers sites={hotelSeats} />
      {/* Plan-view ride channels. Each launch platform and landing basin has its own layout. */}
      <g
        data-feature="peak-flumes"
        fill="none"
        stroke="#e7dfca"
        strokeWidth=".62"
      >
        <path d="M42.9 21.4C40.5 22 41 25 43 25.8Q44.8 25.5 44 27M46.3 21.8C48.3 22 45.7 24 47.3 24M53 20.7C52 22 50 21.2 51.3 23.4M58 22.1C60.7 21.8 60.7 25.5 55.5 24" />
      </g>
      <g fill="none" stroke="#4f8889" strokeWidth=".27">
        <path d="M42.9 21.4C40.5 22 41 25 43 25.8Q44.8 25.5 44 27M46.3 21.8C48.3 22 45.7 24 47.3 24M53 20.7C52 22 50 21.2 51.3 23.4M58 22.1C60.7 21.8 60.7 25.5 55.5 24" />
        <path
          d="M44.5 21.7C45.2 23.8 41.2 23.3 42 25.2M54.1 21.2C56.9 20.2 59.2 22 56 23.8"
          stroke="#b8a578"
          strokeWidth=".16"
        />
      </g>
      {/* The natural sea bay is retained; terraced furniture sits behind its sandy edge. */}
      <g
        data-feature="ocean-terraces"
        fill="none"
        stroke="#c1b18b"
        strokeWidth=".07"
      >
        <path d="M69.8 17.8Q73 18.4 73.8 20.7M70.2 18.2Q72.7 18.9 73.4 20.8M71.5 24Q72.1 25.9 74 27.3M71.2 24.3Q72 26.5 73.8 27.7" />
      </g>
      <Loungers sites={beachSeats} />
      {/* Atlantis courts: colonnades, axial sanctuaries and water-garden mosaics. */}
      <g
        data-feature="atlantis-colonnades"
        fill="none"
        stroke="#c2b18b"
        strokeWidth=".09"
      >
        <path d="M28 35H34.5V41M28.1 35.4H34.1V40.7M28.4 40.8H29.8M30.1 41.7H32M32.5 42.1H34" />
        <path
          className="pm-fine-detail"
          d={Array.from(
            { length: 13 },
            (_, i) => `M${28.3 + i * 0.44} 35v.45`,
          ).join("")}
        />
      </g>
      {/* Conservatories have glazed roof plans, formal beds and cascades, never domes. */}
      <g
        data-feature="eden-botanical"
        fill="none"
        stroke="#9dad98"
        strokeWidth=".07"
      >
        <path d="M42.2 51.2h1.6v1.6h-1.6ZM42.2 52h1.6M43 51.2v1.6M44 48.4h5M44 49h5M44 49.6h5M50.3 47.1v.4h1.1v-.4" />
        <path
          d="M54.5 47.8Q55 48.8 55.3 48.7M55.4 49.6Q55.2 50.8 56.4 51.2"
          stroke="#96b4b0"
          strokeWidth=".32"
        />
        <path
          d="M54.8 48.2l.65-.1M54.9 48.45l.65-.1M55 48.7l.65-.1M55.5 50.1l.5-.15M55.65 50.35l.5-.15"
          stroke="#edf2e6"
          strokeWidth=".1"
        />
      </g>
      {/* Harbour quays, boat hull and deck plan. These structures are not transit routes. */}
      <g
        data-feature="pirate-harbour"
        fill="none"
        stroke="#987d57"
        strokeWidth=".12"
      >
        <path d="M74 38.5H79.7V46.7H78.3M80.2 40H81.1V44.5M79.8 40.8H78.5M79.8 42H78.7M79.8 44H78.6" />
        <path
          className="pm-fine-detail"
          d={Array.from(
            { length: 13 },
            (_, i) => `M75.8 ${41.1 + i * 0.3}h2`,
          ).join("")}
          strokeWidth=".055"
        />
        <path d="M76.8 40.7V45M76.1 41.9h1.5M76 43.7h1.6" strokeWidth=".09" />
      </g>
      {/* Spa courts and thermal terraces; no public route crosses a treatment pavilion. */}
      <g
        data-feature="spa-courts"
        fill="none"
        stroke="#b4b59a"
        strokeWidth=".08"
      >
        <ellipse cx="27" cy="62" rx="2.7" ry="1.8" />
        <path d="M22.5 60.1v1.6M23 60.1v1.6M24 65.5h1.6v1.4M27.8 56.5h1.2" />
      </g>
      <Loungers sites={spaSeats} />
      {/* Market arcades, shaded restaurant courtyards and café furniture. */}
      <g
        data-feature="market-courts"
        fill="none"
        stroke="#bdac87"
        strokeWidth=".08"
      >
        <path d="M39 67.7H45.5V70M39 67.4H45.8M39.1 73.9H42.3M50.1 69.7H54.6V71.6M54 74.6H56.2M42.7 69.8H45.5M42.7 73.5H45.5" />
        <path
          className="pm-fine-detail"
          d={Array.from(
            { length: 13 },
            (_, i) => `M${39.25 + i * 0.5} 67.4v.4M${50.25 + i * 0.32} 69.7v.4`,
          ).join("")}
        />
      </g>
      {/* Child-scale splash structures, shallow play gardens and sheltered family courts. */}
      <g
        data-feature="family-water-play"
        fill="none"
        stroke="#a7826b"
        strokeWidth=".16"
      >
        <path d="M70.9 55.7C73.4 55 73.4 58.3 70.5 59.1M69 55.7C66.7 54.5 66.7 57.4 68.8 58.6M61 59.4Q59.6 60.5 61.5 61.5" />
        <path
          d="M60.7 60.9h1.6M61.5 60.8v1.5M68.4 56.2h1.2M69 55.9v1.3"
          strokeWidth=".1"
        />
      </g>
      {/* Arrival plaza has actual open space: double fountains, axial palms, gate colonnades. */}
      <g
        data-feature="arrival-square"
        fill="none"
        stroke="#bba87f"
        strokeWidth=".08"
      >
        <path d="M44.1 83.8Q46.5 81.8 48.2 83M50.3 83Q53.5 82.2 54 84.5M47.6 89.1v1.3M48.3 89.1v1.3M51.8 89.1v1.3M52.5 89.1v1.3M40.3 88.2h1.4M40.3 88.7h1.4" />
        <circle cx="46.5" cy="85.7" r="1.3" />
        <circle className="pm-fine-detail" cx="46.5" cy="85.7" r=".27" />
      </g>
      <CafeCourts />
      <SignatureComplexes />
    </g>
  );
}
