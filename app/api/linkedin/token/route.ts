import { NextRequest, NextResponse } from 'next/server';

type TokenResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

export async function POST(req: NextRequest) {
  const { code, redirectUri } = await req.json();

  if (!code || !redirectUri) {
    return NextResponse.json(
      { error: 'Missing code or redirectUri' },
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

  // CRITICAL: The redirect_uri MUST match exactly what was used in the authorization request
  const expectedRedirectUri =
    'https://aps-app-admin.vercel.app/api/linkedin/callback';

  console.log('=== LinkedIn Token Exchange (standard OAuth, no PKCE) ===');
  console.log('Redirect URI received:', redirectUri);
  console.log('Expected redirect URI:', expectedRedirectUri);
  console.log('Match:', redirectUri === expectedRedirectUri);
  console.log('Code length:', code.length);
  console.log('Client ID:', clientId);
  console.log('Client Secret length:', clientSecret.length);

  // Standard LinkedIn OAuth - no PKCE, just client_id and client_secret
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);

  const bodyString = params.toString();

  console.log('=== Request Body (secret hidden) ===');
  console.log(bodyString.replace(/client_secret=[^&]+/, 'client_secret=***'));

  const response = await fetch(
    'https://www.linkedin.com/oauth/v2/accessToken',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyString,
    }
  );

  const responseText = await response.text();
  console.log('=== LinkedIn Response ===');
  console.log('Status:', response.status);
  console.log('Response:', responseText);

  if (!response.ok) {
    let errorBody;
    try {
      errorBody = JSON.parse(responseText);
    } catch {
      errorBody = { error: responseText || 'Unknown error' };
    }

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

  const data = JSON.parse(responseText) as TokenResponse;
  return NextResponse.json(data);
}
