import { edges, pathData, type Route } from "../../data/map-network";
export default function MapRouteLayer({
  route,
  stops,
}: {
  route: Route | null;
  stops: boolean;
}) {
  return (
    <svg
      className="pm-roads"
      data-layer="transport-and-route"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {stops && (
        <g
          data-loop="true"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {edges
            .filter((e) => e.mode === "shuttle")
            .map((e, i) => (
              <g key={i}>
                <path
                  d={pathData(e.points)}
                  stroke="#4d6d61"
                  strokeWidth=".68"
                />
                <path
                  d={pathData(e.points)}
                  stroke="#d7b77a"
                  strokeWidth=".36"
                />
              </g>
            ))}
        </g>
      )}
      {route?.edges.map((e, i) => (
        <g
          key={i}
          data-route-mode={e.mode}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={pathData(e.points)} stroke="#fff9e8" strokeWidth="1.75" />
          <path d={pathData(e.points)} stroke="#214d44" strokeWidth="1.35" />
          <path
            d={pathData(e.points)}
            stroke={e.mode === "walk" ? "#f6eed5" : "#ecc67f"}
            strokeWidth=".77"
            strokeDasharray={e.mode === "walk" ? ".8 .45" : undefined}
          />
        </g>
      ))}
    </svg>
  );
}
