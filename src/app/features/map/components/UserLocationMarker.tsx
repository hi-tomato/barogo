import { MapMarker } from 'react-kakao-maps-sdk';

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
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-blue-400 opacity-40" />
        <div
          className="absolute h-16 w-16 animate-ping rounded-full bg-blue-400 opacity-30"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute h-12 w-12 animate-ping rounded-full bg-blue-400 opacity-20"
          style={{ animationDelay: '2s' }}
        />

        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
          <span className="h-6 w-6 rounded-full bg-blue-500" />
        </div>
      </div>
    </MapMarker>
  );
}
