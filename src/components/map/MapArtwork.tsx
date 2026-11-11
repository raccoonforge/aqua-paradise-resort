import { memo, useId } from "react";
import { coastPath, navigationZones, pools } from "../../data/map-plan";
import {
  edges,
  pathData,
  places,
  junctionNodes,
  type Point,
} from "../../data/map-network";

export function GeographyLayer({
  clipId,
  selected,
}: {
  clipId: string;
  selected?: string | null;
}) {
  return (
    <g data-layer="geography">
      <path d={coastPath} fill="none" stroke="#31666a" strokeWidth="2.1" />
      <path
        d={coastPath}
        data-coast="true"
        fill="#e1e5d5"
        stroke="#d6c79c"
        strokeWidth=".2"
      />
      <g clipPath={`url(#${clipId})`}>
        <path d={coastPath} fill="none" stroke="#eee2be" strokeWidth="1.2" />
        <g data-layer="territories">
          {navigationZones.map((zone) => (
            <path
              key={zone.id}
              data-territory={zone.id}
              data-anchor-x={places.find((p) => p.id === zone.id)!.point[0]}
              data-anchor-y={places.find((p) => p.id === zone.id)!.point[1]}
              data-selected={selected === zone.id ? "true" : undefined}
              d={zone.d}
              fill={zone.fill}
              stroke={selected === zone.id ? "#99733f" : "#829a80"}
              strokeWidth={selected === zone.id ? 0.42 : 0.16}
              strokeLinejoin="round"
            />
          ))}
        </g>
        {/* Only major water bodies provide geographic context. No decorative pools or buildings. */}
        {[3, 4, 7].map((i) => {
          const p = pools[i];
          return (
            <ellipse
              key={i}
              data-obstacle="water"
              cx={p.x}
              cy={p.y}
              rx={p.rx}
              ry={p.ry}
              fill="#8bb2ad"
              stroke="#f3efdb"
              strokeWidth=".18"
            />
          );
        })}
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
      <path
        d="M51 91L58.5 95.5M55.3 92.8L55.3 95.4M57 93.8L59 92.8"
        stroke="#b9aa82"
        strokeWidth="1.6"
      />
      <path
        d="M51 91L58.5 95.5M55.3 92.8L55.3 95.4M57 93.8L59 92.8"
        stroke="#f8f1dd"
        strokeWidth="1.1"
      />
      {edges
        .filter((e) => e.mode === "walk")
        .map((e, i) => (
          <g
            key={i}
            data-road="true"
            data-secondary={e.secondary ? "true" : undefined}
            data-pier={
              e.from === "jetty" || e.to === "jetty" ? "true" : undefined
            }
          >
            <path
              d={pathData(e.points)}
              stroke="#8e9d85"
              strokeWidth={e.secondary ? 0.82 : 1.12}
            />
            <path
              d={pathData(e.points)}
              stroke="#fff9e8"
              strokeWidth={e.secondary ? 0.52 : 0.8}
            />
          </g>
        ))}
      {junctionNodes.map((node) => (
        <circle
          key={node.id}
          data-junction={node.id}
          cx={node.point[0]}
          cy={node.point[1]}
          r=".68"
          fill="#fff9e8"
          stroke="#8e9d85"
          strokeWidth=".1"
        />
      ))}
      <path
        d="M43 88L29 106"
        stroke="#d8c590"
        strokeWidth=".22"
        strokeDasharray=".65 .5"
      />
    </g>
  );
}
function MapArtwork({
  focus,
  selected,
}: {
  focus?: Point;
  selected?: string | null;
}) {
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
          ? "Фрагмент навигационной карты"
          : "Навигационная карта девяти зон, отеля и южного транспортного узла Aqua Paradise"
      }
    >
      <defs>
        <clipPath id={id}>
          <path d={coastPath} />
        </clipPath>
      </defs>
      <GeographyLayer clipId={id} selected={selected} />
      <InfrastructureLayer />
    </svg>
  );
}
export default memo(MapArtwork);
