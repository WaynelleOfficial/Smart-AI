import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Whoops! Please enter a goal: ' }, { status: 400 });
    }

    const backendApiUrl = 'http://127.0.0.1:8000/chat/model/chat/anthropic.claude-v2/invoke';

    const backendResponse = await fetch(backendApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      console.error('Error from backend:', errorData);
      return NextResponse.json(
        { error: `Failed to fetch from backend: ${backendResponse.status} - ${errorData?.detail || backendResponse.statusText}` },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    // console.log('route.js: Data received from backend:', data);
    // console.log('Response from backend:', data);
    const frontendResponse = { response: data.completion };
    // console.log('route.js: Response sent to frontend:', frontendResponse);
    return NextResponse.json(frontendResponse);
    

  } catch (error) {
    console.error('Error in Next.js API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}