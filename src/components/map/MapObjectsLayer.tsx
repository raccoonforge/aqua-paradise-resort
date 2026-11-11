import { type Place } from "../../data/map-network";
function AtlasGlyph({ id }: { id: string }) {
  const paths: Record<string, string> = {
    "grand-hotel": "M4 20V8h16v12M8 8V4h8v4M9 20v-5h6v5M7 11h1m3 0h2m3 0h1",
    "adrenaline-peak": "M2 20L9 5l5 10 3-6 5 11M6 12l3 1 2-2",
    "ocean-bay": "M3 9q3-4 6 0t6 0t6 0M3 14q3-4 6 0t6 0t6 0M3 19h18",
    "atlantis-realm": "M3 6l9-4 9 4M4 8h16M6 9v9m6-9v9m6-9v9M3 20h18",
    "eden-gardens":
      "M12 21V10M12 15Q1 13 4 5q9 0 8 10ZM12 12Q12 3 21 4q1 9-9 8Z",
    "serenity-spa":
      "M12 20Q2 20 3 12q6 0 9 8ZM12 20q10 0 9-8-6 0-9 8ZM12 19Q6 10 12 3q6 7 0 16Z",
    "pirates-cove": "M3 16h18l-4 5H7ZM12 15V2l7 10H12M10 5L5 13h5",
    "little-paradise": "M12 2Q2 12 6 18q6 7 12 0 4-6-6-16ZM8 14q-1 4 3 5",
    "paradise-market":
      "M3 10l3-7h12l3 7M3 10q2 4 4 0 2 4 5 0 2 4 5 0 2 4 4 0M5 13v8h14v-8M10 21v-6h4v6",
    "paradise-boulevard":
      "M12 21V9M12 9Q2 7 2 13M12 9Q5 0 3 5M12 9q10-2 10 4M12 9q7-9 9-4M8 21h8",
    cable: "M3 4h18M9 4v5M6 9h12v11H6ZM7 14h10",
    jetty: "M12 3v17M9 6h6M3 13q0 8 9 8t9-8M3 13l-1 4m19-4 1 4",
    gateway: "M5 21V8a7 7 0 0 1 14 0v13M3 21h18M9 20V10h6v10",
    stop: "M5 17V7q0-3 7-3t7 3v10ZM5 11h14M8 17v3m8-3v3M8 14h1m6 0h1",
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={paths[id.startsWith("stop:") ? "stop" : id] ?? paths.gateway}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default function MapObjectsLayer({
  places,
  selected,
  scale,
  onChoose,
}: {
  places: Place[];
  selected: string | null;
  scale: number;
  onChoose: (id: string) => void;
}) {
  return (
    <div className="pm-objects" data-layer="objects">
      {places.map((p) => (
        <button
          key={p.id}
          className={`pm-pin ${p.category === "transport" ? "pm-pin-transport" : ""} ${selected === p.id ? "is-selected" : ""}`}
          style={{
            left: `${p.point[0]}%`,
            top: `${p.point[1]}%`,
            transform: `translate(-50%,-50%) scale(${1 / scale})`,
          }}
          aria-label={`Показать ${p.name}`}
          aria-pressed={selected === p.id}
          onClick={() => onChoose(p.id)}
        >
          <span>
            <AtlasGlyph id={p.id} />
          </span>
          <b>{p.name}</b>
        </button>
      ))}
    </div>
  );
}
