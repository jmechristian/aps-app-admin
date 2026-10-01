import { unstable_noStore as noStore } from 'next/cache';
import { connection } from 'next/server';
import EmailsClient from './ui';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const maxDuration = 300;

export default async function EmailsPage() {
  noStore();
  await connection();
  return <EmailsClient />;
}
