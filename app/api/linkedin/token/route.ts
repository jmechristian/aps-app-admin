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

  // Comprehensive logging
  console.log('=== LinkedIn Token Exchange Request ===');
  console.log('Client ID:', clientId);
  console.log('Client ID matches expected:', clientId === '777zbuyll96931');
  console.log('Client Secret exists:', !!clientSecret);
  console.log('Client Secret length:', clientSecret?.length);
  console.log('Client Secret first 5 chars:', clientSecret?.substring(0, 5));
  console.log(
    'Client Secret last 5 chars:',
    clientSecret?.substring((clientSecret?.length || 0) - 5)
  );
  console.log(
    'Client Secret has whitespace:',
    clientSecret?.includes(' ') ||
      clientSecret?.includes('\n') ||
      clientSecret?.includes('\t')
  );
  console.log('Client Secret (JSON):', JSON.stringify(clientSecret));

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'LinkedIn client credentials are not configured' },
      { status: 500 }
    );
  }

  // VERIFYING REDIRECT URI MATCH - ADD THIS NEW SECTION
  console.log('=== VERIFYING REDIRECT URI MATCH ===');
  console.log('redirectUri received from app:', redirectUri);
  console.log(
    'Expected redirectUri:',
    'https://aps-app-admin.vercel.app/api/linkedin/callback'
  );
  console.log(
    'Exact match:',
    redirectUri === 'https://aps-app-admin.vercel.app/api/linkedin/callback'
  );
  console.log('Length match:', redirectUri.length === 54);
  console.log('Character-by-character check:');
  const expected = 'https://aps-app-admin.vercel.app/api/linkedin/callback';
  for (let i = 0; i < Math.max(redirectUri.length, expected.length); i++) {
    if (redirectUri[i] !== expected[i]) {
      console.log(
        `Mismatch at position ${i}: got '${
          redirectUri[i] || '(end)'
        }' (${redirectUri.charCodeAt(i)}), expected '${
          expected[i] || '(end)'
        }' (${expected.charCodeAt(i)})`
      );
      break;
    }
  }

  // Log raw values before encoding
  console.log('=== Raw values before encoding ===');
  console.log('redirectUri (raw):', redirectUri);
  console.log('redirectUri (JSON):', JSON.stringify(redirectUri));
  console.log('redirectUri length:', redirectUri.length);
  console.log('clientId (raw):', clientId);
  console.log('clientSecret (raw):', clientSecret);
  console.log('code length:', code.length);
  console.log('codeVerifier (raw):', codeVerifier);
  console.log('codeVerifier length:', codeVerifier.length);

  // Manually construct body to have full control over encoding
  const bodyParts = [
    `grant_type=authorization_code`,
    `code=${encodeURIComponent(code)}`,
    `redirect_uri=${encodeURIComponent(redirectUri)}`,
    `client_id=${clientId}`, // Don't encode - send raw
    `client_secret=${clientSecret}`, // Don't encode - send raw (including ==)
    `code_verifier=${encodeURIComponent(codeVerifier)}`,
  ];

  const bodyString = bodyParts.join('&');

  console.log('=== Manual body construction ===');
  console.log(
    'Body (secret hidden):',
    bodyString.replace(/client_secret=[^&]+/, 'client_secret=***')
  );

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

  console.log('=== LinkedIn Response ===');
  console.log('Status:', response.status);
  console.log('Status Text:', response.statusText);
  console.log(
    'Response Headers:',
    Object.fromEntries(response.headers.entries())
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('=== LinkedIn Token Exchange Error ===');
    console.error('Raw Error Response:', errorText);

    let errorBody;
    try {
      errorBody = JSON.parse(errorText);
      console.error('Parsed Error:', JSON.stringify(errorBody, null, 2));
    } catch {
      console.error('Error response is not JSON');
      errorBody = { error: errorText || 'Unknown error' };
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

  const data = (await response.json()) as TokenResponse;
  console.log('=== Token Exchange Success ===');
  console.log('Access token received (length):', data.access_token?.length);
  console.log('Token type:', data.token_type);
  console.log('Expires in:', data.expires_in);
  console.log('Scope:', data.scope);

  return NextResponse.json(data);
}
