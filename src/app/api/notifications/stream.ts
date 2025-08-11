export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  const response = await fetch(
    `https://api.backend-challenge.com/notifications/stream`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'text/event-stream',
      },
    }
  );

  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
