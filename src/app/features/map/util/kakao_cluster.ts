export const KAKAO_MAP_CLUSTER_STYLES = [
  {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #1076dd 0%, #1C4E80 100%)',
    borderRadius: '50%',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(16, 118, 221, 0.3)',
    border: '2px solid #fff',
    fontFamily: 'SUIT, sans-serif',
  },
  {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #1C4E80 0%, #154360 100%)',
    borderRadius: '50%',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: '600',
    boxShadow: '0 6px 16px rgba(28, 78, 128, 0.35)',
    border: '2px solid #fff',
    fontFamily: 'SUIT, sans-serif',
  },
  {
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, #154360 0%, #0E3A5F 100%)',
    borderRadius: '50%',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: '700',
    boxShadow: '0 8px 20px rgba(21, 67, 96, 0.4)',
    border: '2px solid #fff',
    fontFamily: 'SUIT, sans-serif',
  },
  {
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #0E3A5F 0%, #0A2E4A 100%)',
    borderRadius: '50%',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: '700',
    boxShadow: '0 10px 24px rgba(14, 58, 95, 0.45)',
    border: '2px solid #fff',
    fontFamily: 'SUIT, sans-serif',
  },
];

export const KAKAO_MAP_DEFAULT_CENTER = {
  lat: 37.5665,
  lng: 126.978,
};

export const KAKAO_MAP_CURRENT_CENTER = (
  latitude: number,
  longitude: number
) => {
  return latitude && longitude
    ? { lat: latitude, lng: longitude }
    : KAKAO_MAP_DEFAULT_CENTER;
};
