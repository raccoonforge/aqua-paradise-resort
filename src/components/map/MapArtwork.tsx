import { memo, useId } from "react";
import { coastPath, footprints, groves, pools } from "../../data/map-plan";
import {
  edges,
  estateEdges,
  pathData,
  places,
  type Point,
} from "../../data/map-network";

import ResortDistrictDetails from "./ResortDistrictDetails";
import ResortLandscapeLayer from "./ResortLandscapeLayer";

/** Botanical washes organise districts as coherent garden estates, not scattered plots. */
function BotanicalGrounds() {
  const districts = [
    [
      "hotel",
      "#dedcc0",
      "M23 22Q29 15 39 18Q43 20 43 28Q37 33 28 31Q22 29 23 22Z",
    ],
    [
      "peak",
      "#b8baa2",
      "M40 22Q48 18 57 20Q63 24 60 28Q54 31 46 30Q39 28 40 22Z",
    ],
    ["ocean", "#eadcb3", "M63 16Q71 14 77 19L75 29Q69 30 64 25Z"],
    [
      "atlantis",
      "#a9c5b4",
      "M25 36Q31 32 36 37L37 43Q33 48 27 46Q24 42 25 36Z",
    ],
    [
      "eden",
      "#a6c4a8",
      "M38 48Q46 43 53 47Q60 49 57 55Q52 59 45 57Q37 55 38 48Z",
    ],
    ["pirate", "#aec4b4", "M65 36Q76 32 82 38Q85 44 81 50Q72 53 66 47Z"],
    ["spa", "#c2d0b2", "M23 57Q28 54 33 59Q36 66 30 69Q24 69 22 64Z"],
    ["market", "#ddcca6", "M39 68Q46 64 55 68L57 74Q52 78 42 77Q38 74 39 68Z"],
    ["little", "#cec6af", "M60 56Q68 52 73 58Q75 63 69 67Q61 68 59 62Z"],
    ["boulevard", "#dedcc0", "M43 79Q49 76 55 80L56 88Q51 93 45 89Z"],
  ];
  return (
    <g data-layer="botanical-estates">
      {districts.map(([name, fill, d]) => (
        <path key={name} data-estate={name} d={d} fill={fill} stroke="none" />
      ))}
      <g fill="none" stroke="#a6b68c" strokeWidth=".1">
        <path d="M25 22Q29 19 33 21M25 29Q30 31 34 29M39 24Q41 25 40 28M23 60Q27 55 31 59M24 66Q28 68 31 66M40 69Q47 66 54 69M41 75Q48 77 54 74" />
      </g>
    </g>
  );
}

/** Original vector plan. No raster images, perspective transforms or image fills. */
export function GeographyLayer({ clipId }: { clipId: string }) {
  return (
    <g data-layer="geography">
      <path d={coastPath} fill="none" stroke="#286264" strokeWidth="3" />
      <path d={coastPath} fill="none" stroke="#558e83" strokeWidth="1.25" />
      <path
        d={coastPath}
        data-coast="true"
        fill="#becaa7"
        stroke="#dbd1ad"
        strokeWidth=".18"
      />
      <g clipPath={`url(#${clipId})`}>
        <path d={coastPath} fill="none" stroke="#e5d5a9" strokeWidth="1.55" />
        <path
          d="M39 18Q49 10 60 18Q65 22 59 27Q50 21 42 28Q36 28 39 18Z"
          fill="#a8b396"
        />
        <path
          d="M41 18Q50 13 58 18M42 20Q50 16 58 20M43 22Q50 19 57 22"
          fill="none"
          stroke="#91a184"
          strokeWidth=".16"
        />
        {groves.map((d, i) => (
          <path
            key={i}
            d={d}
            fill={i % 3 === 0 ? "#93ae8b" : "#a1b891"}
            stroke="none"
          />
        ))}
        <path
          d="M73 18Q69 21 70 25Q71 29 77 30"
          fill="none"
          stroke="#d9c9a4"
          strokeWidth="2.1"
        />
        <path
          d="M73 18Q69 21 70 25Q71 29 77 30"
          fill="none"
          stroke="#f9f2df"
          strokeWidth=".7"
        />
        <BotanicalGrounds />
        {pools.map((p, i) => {
          const organic = i === 3 || i === 4;
          const shoreline = `M${p.x - p.rx * 0.95} ${p.y - p.ry * 0.1} C${p.x - p.rx * 0.85} ${p.y - p.ry * 0.85} ${p.x + p.rx * 0.05} ${p.y - p.ry} ${p.x + p.rx * 0.55} ${p.y - p.ry * 0.7} C${p.x + p.rx * 0.95} ${p.y - p.ry * 0.5} ${p.x + p.rx} ${p.y + p.ry * 0.2} ${p.x + p.rx * 0.6} ${p.y + p.ry * 0.6} C${p.x + p.rx * 0.1} ${p.y + p.ry} ${p.x - p.rx * 0.5} ${p.y + p.ry * 0.8} ${p.x - p.rx * 0.75} ${p.y + p.ry * 0.45} Q${p.x - p.rx} ${p.y + p.ry * 0.2} ${p.x - p.rx * 0.95} ${p.y - p.ry * 0.1}Z`;
          return (
            <g key={i}>
              {organic && (
                <defs>
                  <clipPath id={`${clipId}-pond-${i}`}>
                    <path d={shoreline} />
                  </clipPath>
                </defs>
              )}
              {/* The physical ellipse remains a conservative clearance envelope; the garden shoreline is organic. */}
              <ellipse
                data-obstacle="water"
                cx={p.x}
                cy={p.y}
                rx={p.rx}
                ry={p.ry}
                fill={
                  [
                    "#74a79c",
                    "#72a6a7",
                    "#65a19a",
                    "#82b09b",
                    "#86b89c",
                    "#8eb9a3",
                    "#88bcb1",
                    "#619c98",
                  ][i]
                }
                stroke="#f9f6ec"
                strokeWidth=".22"
                clipPath={organic ? `url(#${clipId}-pond-${i})` : undefined}
              />
              {organic && (
                <path
                  data-natural-pond="true"
                  d={shoreline}
                  fill="none"
                  stroke="#e9ebd0"
                  strokeWidth=".16"
                />
              )}
            </g>
          );
        })}
        <path
          d="M49 48Q46 47 44 49Q43 52 46 53Q48 53 49 50Z"
          fill="#9cb894"
          stroke="#779a7b"
          strokeWidth=".16"
        />
        <path
          d="M44 49Q46 50 47 48M44 51Q47 50 48 51"
          fill="none"
          stroke="#f8f3e7"
          strokeWidth=".2"
        />
        <g fill="none" stroke="#c0b69b" strokeWidth=".15">
          <ellipse cx="46" cy="50.5" rx="4.8" ry="4.6" />
          <ellipse cx="46" cy="50.5" rx="5.6" ry="5.4" />
        </g>
      </g>
    </g>
  );
}
export function InfrastructureLayer() {
  return (
    <g
      data-layer="infrastructure"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Deck and terminal approach; public routes never continue into the sea. */}
      <path
        d="M51 91L58.5 95.5M55.3 92.8L55.3 95.4M57 93.8L59 92.8"
        stroke="#cbbd98"
        strokeWidth="1.7"
      />
      <path
        d="M51 91L58.5 95.5M55.3 92.8L55.3 95.4M57 93.8L59 92.8"
        stroke="#f4eddd"
        strokeWidth="1.2"
      />
      {[...edges.filter((e) => e.mode === "walk"), ...estateEdges].map(
        (e, i) => (
          <g
            key={i}
            data-road="true"
            data-access={"access" in e ? e.access : "public"}
            data-secondary={
              "secondary" in e && e.secondary ? "true" : undefined
            }
            data-pier={
              e.from === "jetty" || e.to === "jetty" ? "true" : undefined
            }
          >
            <path
              d={pathData(e.points)}
              stroke="#9ead8b"
              strokeWidth={"access" in e ? 0.5 : e.secondary ? 0.68 : 0.95}
            />
            <path
              d={pathData(e.points)}
              stroke="#e9e6cf"
              strokeWidth={"access" in e ? 0.28 : e.secondary ? 0.44 : 0.65}
            />
          </g>
        ),
      )}
      <path
        d="M43 88L29 106M42.5 87.6L28.5 105.6"
        stroke="#bca777"
        strokeWidth=".13"
        strokeDasharray=".8 .5"
      />
      <g fill="#eee4c9" stroke="#aa996e" strokeWidth=".1">
        <rect x="38.5" y="92.5" width=".8" height="1.1" />
        <rect x="34.6" y="97.5" width=".8" height="1.1" />
      </g>
      {places
        .filter((p) => !p.id.startsWith("stop:"))
        .map((p) => (
          <circle
            key={p.id}
            cx={p.point[0]}
            cy={p.point[1]}
            r={p.category === "zones" ? 0.9 : 0.7}
            stroke="#d5c7a3"
            strokeWidth=".16"
            fill="#f8f3e6"
          />
        ))}
    </g>
  );
}
export function ArchitectureLayer() {
  return (
    <g data-layer="architecture">
      {footprints.map((b, i) => (
        <g key={i}>
          <rect
            data-obstacle="building"
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx=".12"
            fill={
              b.kind === "hotel"
                ? "#587667"
                : b.x > 40 && b.x < 58 && b.y > 66 && b.y < 78
                  ? "#b89d7c"
                  : b.y > 35 && b.y < 46 && b.x < 38
                    ? "#c9b885"
                    : "#e8e4c9"
            }
            stroke="#8b946e"
            strokeWidth=".15"
          />
          <path
            d={`M${b.x + 0.25} ${b.y + b.h / 2}h${b.w - 0.5}`}
            stroke="#dad8b7"
            strokeWidth=".1"
          />
        </g>
      ))}
      {/* Flat architectural symbols: courts, colonnades, landscape pools and ride flumes. */}
      <g fill="none" stroke="#608e8b" strokeWidth=".23">
        <path d="M44 22C40 24 43 27 46 27M46 21C43 23 47 25 46 27M53 20C58 19 60 23 57 25" />
        <path d="M65 59C62 57 64 55 66 57S69 56 70 58M67 61Q66 58 64 61" />
        <rect x="28.2" y="36.2" width="5.6" height="5.7" rx="1.8" />
      </g>
      <g fill="#d0c4a5">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={28.8 + i * 1.2} y="36" width=".45" height=".55" />
        ))}
      </g>
      <g stroke="#8b795d" strokeWidth=".14">
        <path
          d="M76.8 40.3Q79.3 42.5 76.8 45.7Q74.8 43.1 76.8 40.3Z"
          fill="#bb9974"
        />
        <path d="M76.8 41.1V44.8M75.8 42.5H77.8" fill="none" />
      </g>
      <g fill="none" stroke="#b6ac7b" strokeWidth=".14">
        <circle cx="46.5" cy="85.7" r="1" />
        <circle cx="46.5" cy="85.7" r=".5" />
        <path d="M45 77h1.5M51 77h1.5M45 78h1.5M51 78h1.5" />
      </g>
      <g fill="#d8c9a4">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={70.5 + i * 0.6}
            y={17.2 + i * 0.35}
            width=".3"
            height=".65"
            rx=".08"
          />
        ))}
      </g>
    </g>
  );
}
function MapArtwork({ focus }: { focus?: Point }) {
  const id = useId().replaceAll(":", "");
  return (
    <svg
      className={focus ? "pm-detail-plan" : "pm-base"}
      viewBox={
        focus ? `${focus[0] - 13} ${focus[1] - 10} 26 20` : "0 0 100 100"
      }
      preserveAspectRatio={focus ? "xMidYMid slice" : "xMidYMid meet"}
      role="img"
      aria-label={
        focus
          ? "Фрагмент архитектурного плана"
          : "Авторский план Aqua Paradise. Вид сверху: отель на северо-западе, Ocean Bay на северо-востоке, вход на юге."
      }
    >
      <defs>
        <clipPath id={id}>
          <path d={coastPath} />
        </clipPath>
        <pattern
          id={`${id}-grain`}
          patternUnits="userSpaceOnUse"
          width="1.8"
          height="1.6"
        >
          <path
            d="M.15 .3h.16M1.1 1.2l.13-.05M.45 1.1h.08"
            stroke="#f5efd9"
            strokeWidth=".04"
            opacity=".28"
          />
        </pattern>
      </defs>
      <GeographyLayer clipId={id} />
      <path d={coastPath} fill={`url(#${id}-grain)`} pointerEvents="none" />
      <ResortLandscapeLayer clipId={id} />
      <InfrastructureLayer />
      <ArchitectureLayer />
      <g clipPath={`url(#${id})`}>
        <ResortDistrictDetails />
      </g>
    </svg>
  );
}

export default memo(MapArtwork);
