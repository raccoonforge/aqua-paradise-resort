import { useId } from "react";
import { coastPath, footprints, groves, pools } from "../../data/map-plan";
import { edges, pathData, places, type Point } from "../../data/map-network";

/** Original vector plan. No raster images, perspective transforms or image fills. */
export function GeographyLayer({ clipId }: { clipId: string }) {
  return (
    <g data-layer="geography">
      <path d={coastPath} fill="none" stroke="#214b5b" strokeWidth="4" />
      <path d={coastPath} fill="none" stroke="#315968" strokeWidth="1.6" />
      <path
        d={coastPath}
        data-coast="true"
        fill="#eee8d8"
        stroke="#d0bf92"
        strokeWidth=".18"
      />
      <g clipPath={`url(#${clipId})`}>
        <path d={coastPath} fill="none" stroke="#dcd4b8" strokeWidth="1.8" />
        <path
          d="M39 18Q49 10 60 18Q65 22 59 27Q50 21 42 28Q36 28 39 18Z"
          fill="#d6d7c3"
        />
        <path
          d="M41 18Q50 13 58 18M42 20Q50 16 58 20M43 22Q50 19 57 22"
          fill="none"
          stroke="#b6b99e"
          strokeWidth=".16"
        />
        {groves.map((d, i) => (
          <path
            key={i}
            d={d}
            fill={i % 3 === 0 ? "#b1bda5" : "#c2cbb4"}
            stroke="#9da98f"
            strokeWidth=".12"
          />
        ))}
        <path
          d="M38 37Q46 34 52 39Q59 36 63 39M40 40Q47 37 53 42Q58 39 62 41M36 65Q39 63 41 66"
          fill="none"
          stroke="#a2af94"
          strokeWidth=".15"
        />
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
        {pools.map((p, i) => (
          <ellipse
            data-obstacle="water"
            key={i}
            cx={p.x}
            cy={p.y}
            rx={p.rx}
            ry={p.ry}
            fill="#a7bec0"
            stroke="#f9f6ec"
            strokeWidth=".35"
          />
        ))}
        <path
          d="M49 48Q46 47 44 49Q43 52 46 53Q48 53 49 50Z"
          fill="#d3d9bf"
          stroke="#9fab91"
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
      {edges
        .filter((e) => e.mode === "walk")
        .map((e, i) => (
          <g
            key={i}
            data-road="true"
            data-pier={
              e.from === "jetty" || e.to === "jetty" ? "true" : undefined
            }
          >
            <path d={pathData(e.points)} stroke="#b6b39b" strokeWidth=".95" />
            <path d={pathData(e.points)} stroke="#fcf8ed" strokeWidth=".65" />
          </g>
        ))}
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
            fill={b.kind === "hotel" ? "#e2d4b2" : "#f8f4e9"}
            stroke="#9f987c"
            strokeWidth=".15"
          />
          <path
            d={`M${b.x + 0.25} ${b.y + b.h / 2}h${b.w - 0.5}`}
            stroke="#c9bd9d"
            strokeWidth=".1"
          />
        </g>
      ))}
      {/* Flat architectural symbols: courts, colonnades, landscape pools and ride flumes. */}
      <g fill="none" stroke="#8ca5a5" strokeWidth=".23">
        <path d="M44 22C40 24 43 27 46 27M46 21C43 23 47 25 46 27M53 20C58 19 60 23 57 25" />
        <path d="M65 59C62 57 64 55 66 57S69 56 70 58M67 61Q66 58 64 61" />
        <rect x="28.2" y="36.2" width="5.6" height="5.7" rx="1.8" />
      </g>
      <g fill="#d0c4a5">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={28.8 + i * 1.2} y="36" width=".45" height=".55" />
        ))}
      </g>
      <g stroke="#9e9274" strokeWidth=".14">
        <path
          d="M76.8 40.3Q79.3 42.5 76.8 45.7Q74.8 43.1 76.8 40.3Z"
          fill="#e3d6b5"
        />
        <path d="M76.8 41.1V44.8M75.8 42.5H77.8" fill="none" />
      </g>
      <g fill="none" stroke="#a9b096" strokeWidth=".14">
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
export default function MapArtwork({ focus }: { focus?: Point }) {
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
      </defs>
      <GeographyLayer clipId={id} />
      <InfrastructureLayer />
      <ArchitectureLayer />
    </svg>
  );
}
