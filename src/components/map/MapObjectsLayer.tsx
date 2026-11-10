import { places as registry, type Place } from "../../data/map-network";
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
            {p.id.startsWith("stop:")
              ? "S"
              : p.id === "jetty"
                ? "М"
                : p.id === "cable"
                  ? "К"
                  : p.id === "gateway"
                    ? "В"
                    : String(registry.indexOf(p) + 1).padStart(2, "0")}
          </span>
          <b>{p.name}</b>
        </button>
      ))}
    </div>
  );
}
