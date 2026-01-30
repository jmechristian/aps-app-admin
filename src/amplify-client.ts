'use client';

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';

let configured = false;

function buildAmplifyConfigFromEnv() {
  const region = process.env.NEXT_PUBLIC_AWS_REGION;
  const appsyncEndpoint = process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT;
  const appsyncRegion = process.env.NEXT_PUBLIC_AWS_APPSYNC_REGION || region;
  const appsyncAuthType =
    process.env.NEXT_PUBLIC_AWS_APPSYNC_AUTHENTICATION_TYPE || 'API_KEY';
  const appsyncApiKey = process.env.NEXT_PUBLIC_AWS_APPSYNC_API_KEY;
  const userPoolId = process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID;
  const userPoolClientId = process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID;
  const identityPoolId = process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID;
  const s3Bucket = process.env.NEXT_PUBLIC_AWS_USER_FILES_S3_BUCKET;
  const s3Region =
    process.env.NEXT_PUBLIC_AWS_USER_FILES_S3_BUCKET_REGION || region;

  if (!region || !appsyncEndpoint) return null;

  return {
    aws_project_region: region,
    aws_appsync_graphqlEndpoint: appsyncEndpoint,
    aws_appsync_region: appsyncRegion || region,
    aws_appsync_authenticationType: appsyncAuthType,
    aws_appsync_apiKey: appsyncApiKey,
    aws_cognito_identity_pool_id: identityPoolId,
    aws_cognito_region: region,
    aws_user_pools_id: userPoolId,
    aws_user_pools_web_client_id: userPoolClientId,
    oauth: {},
    aws_cognito_username_attributes: ['EMAIL'],
    aws_cognito_social_providers: [],
    aws_cognito_signup_attributes: ['EMAIL'],
    aws_cognito_mfa_configuration: 'OFF',
    aws_cognito_mfa_types: ['SMS'],
    aws_cognito_password_protection_settings: {
      passwordPolicyMinLength: 8,
      passwordPolicyCharacters: [],
    },
    aws_cognito_verification_mechanisms: ['EMAIL'],
    aws_user_files_s3_bucket: s3Bucket,
    aws_user_files_s3_bucket_region: s3Region,
  };
}

export function ensureAmplifyConfigured() {
  if (configured) return;
  const cfg = buildAmplifyConfigFromEnv();
  if (!cfg) {
    throw new Error(
      'Missing Amplify client config. Set NEXT_PUBLIC_AWS_* env vars to configure Amplify.'
    );
  }
  Amplify.configure(cfg);
  configured = true;
}

// Configure immediately on import so any module-level generateClient() usage is safe.
ensureAmplifyConfigured();

export const graphqlClient = generateClient();


