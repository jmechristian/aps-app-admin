import fs from 'fs';
import path from 'path';

const awsExportsPath = path.join(process.cwd(), 'src', 'aws-exports.js');

if (!fs.existsSync(awsExportsPath)) {
  console.error('Missing src/aws-exports.js');
  process.exit(1);
}

const contents = fs.readFileSync(awsExportsPath, 'utf8');
const get = (key) => {
  const match = contents.match(new RegExp(`"${key}"\\s*:\\s*"([^"]+)"`));
  return match?.[1] ?? '';
};

const env = {
  NEXT_PUBLIC_AWS_REGION: get('aws_project_region'),
  NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT: get('aws_appsync_graphqlEndpoint'),
  NEXT_PUBLIC_AWS_APPSYNC_REGION: get('aws_appsync_region'),
  NEXT_PUBLIC_AWS_APPSYNC_AUTHENTICATION_TYPE: get('aws_appsync_authenticationType'),
  NEXT_PUBLIC_AWS_APPSYNC_API_KEY: get('aws_appsync_apiKey'),
  NEXT_PUBLIC_AWS_USER_POOLS_ID: get('aws_user_pools_id'),
  NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID: get('aws_user_pools_web_client_id'),
  NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID: get('aws_cognito_identity_pool_id'),
  NEXT_PUBLIC_AWS_USER_FILES_S3_BUCKET: get('aws_user_files_s3_bucket'),
  NEXT_PUBLIC_AWS_USER_FILES_S3_BUCKET_REGION: get('aws_user_files_s3_bucket_region'),
};

console.log('# Copy these into your hosting environment:\n');
for (const [key, value] of Object.entries(env)) {
  if (!value) continue;
  console.log(`${key}=${value}`);
}
