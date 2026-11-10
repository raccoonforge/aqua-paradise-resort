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
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {stops &&
        edges
          .filter((e) => e.mode === "shuttle")
          .map((e, i) => (
            <path
              key={i}
              d={pathData(e.points)}
              fill="none"
              stroke="#0d6670"
              strokeWidth=".3"
              strokeDasharray=".7 .5"
            />
          ))}
      {route?.edges.map((e, i) => (
        <g key={i}>
          <path
            d={pathData(e.points)}
            fill="none"
            stroke="#103d42"
            strokeWidth=".66"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathData(e.points)}
            fill="none"
            stroke={e.mode === "walk" ? "#f5d58f" : "#447d86"}
            strokeWidth=".36"
            strokeDasharray={e.mode === "shuttle" ? "1 .5" : undefined}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
      {route &&
        route.edges.length > 0 &&
        [route.edges[0].points[0], route.edges.at(-1)!.points.at(-1)!].map(
          ([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r=".65"
              fill="#fff2bd"
              stroke="#15463e"
              strokeWidth=".25"
            />
          ),
        )}
    </svg>
  );
}
