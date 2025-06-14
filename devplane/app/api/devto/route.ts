import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://dev.to/api/articles?top=30', {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }

    const articles = await res.json();
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
