import { NextRequest, NextResponse } from 'next/server';

type TokenResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

export async function POST(req: NextRequest) {
  const { code, redirectUri, codeVerifier } = await req.json();

  if (!code || !redirectUri || !codeVerifier) {
    return NextResponse.json(
      { error: 'Missing code, redirectUri, or codeVerifier' },
      { status: 400 }
    );
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'LinkedIn client credentials are not configured' },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
    code_verifier: codeVerifier,
  });

  const response = await fetch(
    'https://www.linkedin.com/oauth/v2/accessToken',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    }
  );

  if (!response.ok) {
    const errorBody = await safeJson(response);
    return NextResponse.json(
      { error: 'Failed to exchange token', details: errorBody },
      {
        status:
          response.status >= 400 && response.status < 500
            ? response.status
            : 400,
      }
    );
  }

  const data = (await response.json()) as TokenResponse;

  return NextResponse.json(data);
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return await res.text();
  }
}
