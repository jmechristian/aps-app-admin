type CognitoStatusUser = {
  UserStatus?: string | null;
  Attributes?: Array<{ Name?: string; Value?: string }> | null;
};

/** Cognito status, including the attribute form ListUsers sometimes returns. */
export function cognitoUserStatus(user: CognitoStatusUser): string | null {
  if (user.UserStatus) return user.UserStatus;
  return (
    user.Attributes?.find((item) => item.Name === 'cognito:user_status')?.Value ??
    null
  );
}

/**
 * True once the person has finished first sign-in and has their own password.
 * FORCE_CHANGE_PASSWORD is still the admin temporary password — those people
 * have not logged in, even though Cognito describes that state as confirmed.
 */
export function cognitoStatusHasSignedIn(status?: string | null): boolean {
  return (
    status === 'CONFIRMED' ||
    status === 'RESET_REQUIRED' ||
    status === 'COMPROMISED' ||
    status === 'EXTERNAL_PROVIDER'
  );
}
