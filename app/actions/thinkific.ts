'use server';

export type ThinkificEnrollment = {
  id: number;
  course_id: number;
  course_name: string;
  percentage_completed: string;
  expired: boolean;
  user_id?: number;
};

type ThinkificUser = {
  id: number;
};

type ThinkificEnrollmentResponse = {
  items?: ThinkificEnrollment[];
  meta?: {
    pagination?: {
      current_page?: number | null;
      next_page?: number | null;
      total_pages?: number | null;
    } | null;
  } | null;
};

type ThinkificUserResponse = {
  items?: ThinkificUser[];
};

export type ThinkificRegistrantSummary = {
  isThinkificUser: boolean;
  thinkificUserId: number | null;
  enrollmentCount: number;
  apcEnrollmentCount: number;
  apcProgramProgress: number;
  error?: string;
};

export type ThinkificEnrollmentCounts = {
  enrollmentCount: number;
  apcEnrollmentCount: number;
  error?: string;
};

const THINKIFIC_BASE_URL = 'https://api.thinkific.com/api/public/v1/enrollments';
const THINKIFIC_USERS_URL = 'https://api.thinkific.com/api/public/v1/users';
const APC_TOTAL_COURSES = 10;
const APC_PRIORITY_PROGRESS_COURSE_ID = 699298;
const APC_COMPLETION_COURSE_IDS = new Set([591574]);
const APC_COMPLETION_COURSE_NAME_PATTERNS = ['APC FINAL ASSESSMENT'];

function getThinkificCredentials() {
  const apiKey =
    process.env.THINKIFIC_API_KEY ||
    process.env.NEXT_THINKIFIC_API_KEY ||
    process.env.NEXT_THINKIFIC_PUBLIC_API_KEY ||
    process.env.NEXT_PUBLIC_API_KEY ||
    null;
  const subdomain =
    process.env.THINKIFIC_SUBDOMAIN ||
    process.env.NEXT_THINKIFIC_SUBDOMAIN ||
    process.env.NEXT_PUBLIC_THINKIFIC_SUBDOMAIN ||
    null;
  return { apiKey, subdomain };
}

type ThinkificAuthMode = 'header' | 'bearer';

function normalizePercentageToPercent(value: string): number {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return 0;
  return numeric <= 1 ? numeric * 100 : numeric;
}

function isApcCompletionEnrollment(enrollment: ThinkificEnrollment): boolean {
  const normalizedCourseName = enrollment.course_name.toUpperCase();
  const matchesCourseId = APC_COMPLETION_COURSE_IDS.has(enrollment.course_id);
  const matchesCourseNamePattern = APC_COMPLETION_COURSE_NAME_PATTERNS.some((pattern) =>
    normalizedCourseName.includes(pattern),
  );

  return matchesCourseId || matchesCourseNamePattern;
}

async function readErrorBody(res: Response): Promise<string> {
  try {
    const text = await res.text();
    if (!text) return 'No response body';
    try {
      const json = JSON.parse(text) as {
        error?: string;
        message?: string;
        errors?: unknown;
      };
      return json.error || json.message || JSON.stringify(json.errors) || text;
    } catch {
      return text;
    }
  } catch {
    return 'Unable to read error response';
  }
}

async function fetchThinkificWithAuth(
  url: string,
  credentials: { apiKey: string; subdomain: string },
  mode: ThinkificAuthMode | 'auto' = 'auto',
): Promise<{ res: Response; mode: ThinkificAuthMode }> {
  const primaryHeaders = {
    'X-Auth-API-Key': credentials.apiKey,
    'X-Auth-Subdomain': credentials.subdomain,
  };
  const fallbackHeaders = {
    Authorization: `Bearer ${credentials.apiKey}`,
    'X-Auth-Subdomain': credentials.subdomain,
  };

  if (mode === 'header') {
    return {
      res: await fetch(url, { headers: primaryHeaders, cache: 'no-store' }),
      mode: 'header',
    };
  }

  if (mode === 'bearer') {
    return {
      res: await fetch(url, { headers: fallbackHeaders, cache: 'no-store' }),
      mode: 'bearer',
    };
  }

  let res = await fetch(url, { headers: primaryHeaders, cache: 'no-store' });
  if (res.status !== 401) {
    return { res, mode: 'header' };
  }

  res = await fetch(url, { headers: fallbackHeaders, cache: 'no-store' });
  return { res, mode: 'bearer' };
}

export async function getThinkificEnrollmentsByEmail(
  email: string | null | undefined,
): Promise<ThinkificEnrollment[]> {
  if (!email) return [];

  const { apiKey, subdomain } = getThinkificCredentials();
  if (!apiKey || !subdomain) {
    throw new Error('Thinkific credentials are missing in environment variables');
  }
  const credentials = { apiKey, subdomain };

  const buildUrl = (page: number) => {
    const url = new URL(THINKIFIC_BASE_URL);
    url.searchParams.set('page', String(page));
    url.searchParams.set('limit', '500');
    url.searchParams.set('query[email]', email);
    return url.toString();
  };

  const { res, mode } = await fetchThinkificWithAuth(buildUrl(1), credentials, 'auto');

  if (!res.ok) {
    const detail = await readErrorBody(res);
    throw new Error(
      `Thinkific enrollments fetch failed (${res.status}): ${detail}`,
    );
  }

  const firstPageData = (await res.json()) as ThinkificEnrollmentResponse;
  const allItems = [...(firstPageData.items ?? [])];

  let nextPage = firstPageData.meta?.pagination?.next_page ?? null;
  while (nextPage) {
    const { res: pageRes } = await fetchThinkificWithAuth(
      buildUrl(nextPage),
      credentials,
      mode,
    );
    if (!pageRes.ok) {
      const detail = await readErrorBody(pageRes);
      throw new Error(
        `Thinkific enrollments fetch failed on page ${nextPage} (${pageRes.status}): ${detail}`,
      );
    }

    const pageData = (await pageRes.json()) as ThinkificEnrollmentResponse;
    allItems.push(...(pageData.items ?? []));
    nextPage = pageData.meta?.pagination?.next_page ?? null;
  }

  return allItems;
}

export async function getThinkificUserIdByEmail(
  email: string | null | undefined,
): Promise<number | null> {
  if (!email) return null;

  const { apiKey, subdomain } = getThinkificCredentials();
  if (!apiKey || !subdomain) {
    throw new Error('Thinkific credentials are missing in environment variables');
  }
  const credentials = { apiKey, subdomain };

  const url = new URL(THINKIFIC_USERS_URL);
  url.searchParams.set('page', '1');
  url.searchParams.set('limit', '10');
  url.searchParams.set('query[email]', email);

  const { res } = await fetchThinkificWithAuth(url.toString(), credentials, 'auto');
  if (!res.ok) {
    const detail = await readErrorBody(res);
    throw new Error(`Thinkific user fetch failed (${res.status}): ${detail}`);
  }

  const data = (await res.json()) as ThinkificUserResponse;
  return data.items?.[0]?.id ?? null;
}

export async function getThinkificRegistrantSummaryByEmail(
  email: string | null | undefined,
): Promise<ThinkificRegistrantSummary> {
  if (!email) {
    return {
      isThinkificUser: false,
      thinkificUserId: null,
      enrollmentCount: 0,
      apcEnrollmentCount: 0,
      apcProgramProgress: 0,
    };
  }

  try {
    const enrollments = await getThinkificEnrollmentsByEmail(email);
    const priorityProgressEnrollment = enrollments.find(
      (enrollment) => enrollment.course_id === APC_PRIORITY_PROGRESS_COURSE_ID,
    );
    const priorityProgressPercent = priorityProgressEnrollment
      ? Math.min(
          100,
          Math.max(
            0,
            normalizePercentageToPercent(priorityProgressEnrollment.percentage_completed),
          ),
        )
      : null;
    const apcEnrollments = enrollments.filter((enrollment) =>
      enrollment.course_name.toUpperCase().includes('APC'),
    );
    const completedFinalAssessment = apcEnrollments.some(
      (enrollment) =>
        isApcCompletionEnrollment(enrollment) &&
        Math.min(
          100,
          Math.max(0, normalizePercentageToPercent(enrollment.percentage_completed)),
        ) >= 100,
    );
    const bestProgressByApcCourse = new Map<number, number>();
    for (const enrollment of apcEnrollments) {
      const courseProgress = Math.min(
        100,
        Math.max(0, normalizePercentageToPercent(enrollment.percentage_completed)),
      );
      const existing = bestProgressByApcCourse.get(enrollment.course_id) ?? 0;
      if (courseProgress > existing) {
        bestProgressByApcCourse.set(enrollment.course_id, courseProgress);
      }
    }

    const apcProgressTotal = Array.from(bestProgressByApcCourse.values()).reduce(
      (sum, value) => sum + value,
      0,
    );
    const apcProgramProgress = Math.min(
      100,
      apcProgressTotal / APC_TOTAL_COURSES,
    );

    let thinkificUserId = enrollments[0]?.user_id ?? null;
    if (!thinkificUserId) {
      thinkificUserId = await getThinkificUserIdByEmail(email);
    }

    return {
      isThinkificUser: Boolean(thinkificUserId),
      thinkificUserId,
      enrollmentCount: enrollments.length,
      apcEnrollmentCount: apcEnrollments.length,
      apcProgramProgress:
        priorityProgressPercent ?? (completedFinalAssessment ? 100 : apcProgramProgress),
    };
  } catch (error) {
    return {
      isThinkificUser: false,
      thinkificUserId: null,
      enrollmentCount: 0,
      apcEnrollmentCount: 0,
      apcProgramProgress: 0,
      error: error instanceof Error ? error.message : 'Thinkific lookup failed.',
    };
  }
}

export async function getThinkificRegistrantSummariesByEmails(
  emails: string[],
): Promise<Record<string, ThinkificRegistrantSummary>> {
  const uniqueEmails = Array.from(
    new Set(
      emails
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    ),
  );

  const results: Record<string, ThinkificRegistrantSummary> = {};
  const concurrency = 5;
  let cursor = 0;

  const worker = async () => {
    while (cursor < uniqueEmails.length) {
      const index = cursor;
      cursor += 1;
      const email = uniqueEmails[index];
      results[email] = await getThinkificRegistrantSummaryByEmail(email);
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, uniqueEmails.length) }, () =>
      worker(),
    ),
  );

  return results;
}

export async function getThinkificEnrollmentCountsByEmails(
  emails: string[],
): Promise<Record<string, ThinkificEnrollmentCounts>> {
  const uniqueEmails = Array.from(
    new Set(
      emails
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    ),
  );

  const results: Record<string, ThinkificEnrollmentCounts> = {};
  const concurrency = 5;
  let cursor = 0;

  const worker = async () => {
    while (cursor < uniqueEmails.length) {
      const index = cursor;
      cursor += 1;
      const email = uniqueEmails[index];
      try {
        const enrollments = await getThinkificEnrollmentsByEmail(email);
        const apcEnrollmentCount = enrollments.filter((enrollment) =>
          enrollment.course_name.toUpperCase().includes('APC'),
        ).length;
        results[email] = {
          enrollmentCount: enrollments.length,
          apcEnrollmentCount,
        };
      } catch (error) {
        results[email] = {
          enrollmentCount: 0,
          apcEnrollmentCount: 0,
          error:
            error instanceof Error ? error.message : 'Thinkific enrollment lookup failed.',
        };
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, uniqueEmails.length) }, () =>
      worker(),
    ),
  );

  return results;
}
