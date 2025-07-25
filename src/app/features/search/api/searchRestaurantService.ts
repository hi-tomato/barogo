interface SearchParams {
  query: string;
  lat?: number;
  lng?: number;
  useLocation?: boolean;
}

export const searchRestaurants = async ({
  query,
  lat,
  lng,
  useLocation,
}: SearchParams) => {
  if (!query.trim()) return [];

  const url = `/api/search-restaurants?q=${encodeURIComponent(query)}${
    lat && lng ? `&lat=${lat}&lng=${lng}` : ''
  }${useLocation ? `&useLocation=true` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('검색 요청 실패');
  }

  const data = await response.json();
  return data.documents || [];
};
