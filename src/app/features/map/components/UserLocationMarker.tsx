import { MapMarker } from "react-kakao-maps-sdk";

export default function UserLocationMarker({
  lat,
  lng,
}: {
  lat: number | null;
  lng: number | null;
}) {
  if (!lat || !lng) return null;
  return (
    <MapMarker position={{ lat, lng }}>
      <div className="text-center bg-blue-500 text-white px-3 py-1 rounded-full shadow-lg border-2 border-white text-[12px] font-medium">
        <span>📍 내 위치</span>
      </div>
    </MapMarker>
  );
}
