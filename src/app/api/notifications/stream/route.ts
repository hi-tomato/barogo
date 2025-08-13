// app/api/notifications/stream/route.ts (App Router 방식)
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new Response('Token is required', { status: 401 });
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL || 'https://api.backend-challenge.com'}/notifications/stream`;

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });

    if (!response.ok) {
      console.error('Backend SSE Error:', response.status, response.statusText);
      return new Response(`Backend Error: ${response.status}`, {
        status: response.status,
      });
    }

    // SSE 응답 헤더 설정
    const headers = new Headers({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Cache-Control',
    });

    // 백엔드의 SSE 스트림을 그대로 전달
    return new Response(response.body, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error('SSE Proxy Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// CORS 설정
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}
