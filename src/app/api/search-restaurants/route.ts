export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!query) {
    return Response.json({ error: "검색어가 필요합니다." }, { status: 400 });
  }

  try {
    const URL = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&category_group_code=FD6&size=10${
      lat && lng ? `&x=${lng}&y=${lat}&radius=5000&sort=distance` : ""
    }`;
    console.log("카카오 API URL:", URL);

    const response = await fetch(URL, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("카카오 API 요청 실패");
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("맛집 검색 API 오류:", error);
    return Response.json({ error: "검색에 실패했습니다" }, { status: 500 });
  }
}
