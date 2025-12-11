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

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
    code_verifier: codeVerifier,
  });

  // Log URLSearchParams result
  console.log('=== URLSearchParams result ===');
  console.log('redirect_uri in params:', params.get('redirect_uri'));
  console.log('client_id in params:', params.get('client_id'));
  console.log('code_verifier in params:', params.get('code_verifier'));
  console.log(
    'Full body (secret hidden):',
    params.toString().replace(/client_secret=[^&]+/, 'client_secret=***')
  );

  // TEMPORARY: Log full params with secret for debugging (remove after!)
  console.log('=== FULL PARAMS TO LINKEDIN (DEBUG) ===');
  console.log('Full params string:', params.toString());

  console.log('=== Sending request to LinkedIn ===');
  console.log('URL: https://www.linkedin.com/oauth/v2/accessToken');
  console.log('Method: POST');
  console.log('Content-Type: application/x-www-form-urlencoded');

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
