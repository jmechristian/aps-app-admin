import { NextRequest, NextResponse } from 'next/server';
// OR for Pages Router:
// import type { NextApiRequest, NextApiResponse } from 'next';

// App Router version:
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    // Redirect to app with error
    return NextResponse.redirect(
      `autopacksummitapp://redirect?error=${encodeURIComponent(error)}`
    );
  }

  if (!code) {
    return NextResponse.redirect('autopacksummitapp://redirect?error=no_code');
  }

  // Redirect to deep link with code and state
  return NextResponse.redirect(
    `autopacksummitapp://redirect?code=${encodeURIComponent(
      code
    )}&state=${encodeURIComponent(state || '')}`
  );
}
