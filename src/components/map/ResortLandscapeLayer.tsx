import { detailBuildings } from "../../data/map-detail-plan";
import {
  forestBatches,
  palmPath,
  flowerBeds,
  rocks,
  treeCount,
  palmCount,
} from "../../data/map-landscape";
export default function ResortLandscapeLayer({ clipId }: { clipId: string }) {
  return (
    <g
      data-layer="landscape-detail"
      clipPath={`url(#${clipId})`}
      data-tree-count={treeCount}
      data-palm-count={palmCount}
    >
      <g data-feature="private-gardens">
        {detailBuildings
          .filter((b) => b.roof === "villa" || b.roof === "spa")
          .map((b, i) => (
            <g key={i}>
              <rect
                x={b.x - 0.22}
                y={b.y - 0.22}
                width={b.w + 0.44}
                height={b.h + 0.44}
                rx=".23"
                fill="#d1d8c1"
              />
              <path
                d={`M${b.x - 0.28} ${b.y + b.h + 0.25}h${b.w + 0.5}v${-b.h - 0.45}`}
                fill="none"
                stroke="#a6b595"
                strokeWidth=".065"
              />
            </g>
          ))}
      </g>
      {forestBatches.map((b, i) => (
        <g key={i}>
          <path d={b.d} fill={b.fill} stroke="#527565" strokeWidth=".035" />
          <path
            d={b.veins}
            fill="none"
            stroke="#d7dfbd"
            strokeWidth=".055"
            opacity=".8"
          />
        </g>
      ))}
      <path d={palmPath} fill="#467d69" stroke="#3d6e5a" strokeWidth=".025" />
      {flowerBeds.map((b, i) => (
        <g key={i}>
          <ellipse
            cx={b.x}
            cy={b.y}
            rx={b.rx}
            ry={b.ry}
            fill="#b4c09f"
            stroke="#9eae8c"
            strokeWidth=".05"
          />
          <path d={b.d} fill={i % 2 ? "#c6b298" : "#c7b5ac"} />
        </g>
      ))}
      <g data-feature="rock-formations">
        {rocks.map((r, i) => (
          <g key={i}>
            <path
              d={r.d}
              fill={i % 3 ? "#c0bda9" : "#b3b5a3"}
              stroke="#a3a692"
              strokeWidth=".05"
            />
            <path
              className="pm-fine-detail"
              d={r.contour}
              fill="none"
              stroke="#e1dcc7"
              strokeWidth=".055"
            />
          </g>
        ))}
      </g>
    </g>
  );
}
