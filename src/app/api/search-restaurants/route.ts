export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const category = searchParams.get("category");
  const radius = searchParams.get("radius");

  console.log("query:", query);
  console.log("y:", lat);
  console.log("x:", lng);
  console.log("category:", category);
  console.log("radius:", radius);

  if (!query) {
    return Response.json({ error: "검색어가 필요합니다." }, { status: 400 });
  }

  try {
    const URL = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&category_group_code=FD6&size=10${
      lat && lng ? `&x=${lng}&y=${lat}&radius=${5000}&sort=distance` : ""
    }`;
    const response = await fetch(URL, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    });

    const data = await response.json();
    console.log("data: ", data);
    return Response.json(data);
  } catch (error) {
    console.error("맛집 검색 API 오류:", error);
    return Response.json({ error: "검색에 실패했습니다" }, { status: 500 });
  }
}
