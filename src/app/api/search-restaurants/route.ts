export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return Response.json({ error: "검색어가 필요합니다." }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        query
      )}&category_group_code=FD6&size=15`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`카카오 API 오류: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("카카오 검색 API 에러:", error);
    return Response.json(
      { error: "검색 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
