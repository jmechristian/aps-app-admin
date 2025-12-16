'use client';

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsExports from '@/src/aws-exports';

let configured = false;

export function ensureAmplifyConfigured() {
  if (configured) return;
  Amplify.configure(awsExports);
  configured = true;
}

// Configure immediately on import so any module-level generateClient() usage is safe.
ensureAmplifyConfigured();

export const graphqlClient = generateClient();


