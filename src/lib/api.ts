/*
 * Centralizes BOCRA API requests, DTOs, and browser-session helpers for the frontend.
 */
import { toast } from "@/components/ui/sonner";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1").replace(/\/$/, "");

export type UserType = "INDIVIDUAL" | "ORGANIZATION" | "ADMIN";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

export type ErrorResponse = {
  success: boolean;
  message: string;
  errorCode: string;
  fieldErrors?: Record<string, string>;
  timestamp: string;
};

export type UserSummary = {
  uuid: string;
  username: string;
  email: string;
  userType: UserType;
  role: string;
  accountStatus: string;
  profileCompleted: boolean;
  emailVerifiedAt?: string | null;
  enabled: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PersonProfile = {
  uuid: string;
  userUuid: string;
  forenames: string;
  surname: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  nationalIdType: string;
  identityNumber: string;
  phoneNumber: string;
  alternatePhoneNumber?: string | null;
  residentialAddressLine1: string;
  residentialAddressLine2?: string | null;
  city: string;
  district: string;
  country: string;
  postalCode?: string | null;
  occupation?: string | null;
  organizationName?: string | null;
  profilePhotoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OrganizationContact = {
  uuid: string;
  forenames: string;
  surname: string;
  email?: string | null;
  phoneNumber?: string | null;
  jobTitle?: string | null;
  primaryContact: boolean;
  linkedUserUuid?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OrganizationProfile = {
  uuid: string;
  ownerUserUuid: string;
  displayName: string;
  tradingName?: string | null;
  registrationNumber?: string | null;
  taxIdentifier?: string | null;
  contactEmail?: string | null;
  contactPhoneNumber?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  district?: string | null;
  country?: string | null;
  postalCode?: string | null;
  logoUrl?: string | null;
  contacts: OrganizationContact[];
  createdAt: string;
  updatedAt: string;
};

export type UserProfileResponse = {
  user: UserSummary;
  person: PersonProfile | null;
  organization: OrganizationProfile | null;
};

export type RegisterPayload = {
  email: string;
  username: string;
  password: string;
  userType: Exclude<UserType, "ADMIN">;
  organizationDisplayName?: string;
};

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
  user: UserProfileResponse;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  user: UserProfileResponse;
};

export type UpdatePersonPayload = Omit<PersonProfile, "uuid" | "userUuid" | "createdAt" | "updatedAt">;
export type UpdateOrganizationPayload = Omit<OrganizationProfile, "uuid" | "ownerUserUuid" | "contacts" | "createdAt" | "updatedAt">;
export type UpsertOrganizationContactPayload = Omit<OrganizationContact, "uuid" | "linkedUserUuid" | "createdAt" | "updatedAt">;

const ACCESS_TOKEN_KEY = "bocra.accessToken";
const REFRESH_TOKEN_KEY = "bocra.refreshToken";
const USER_KEY = "bocra.user";

export async function register(payload: RegisterPayload) {
  return request<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(stripEmpty(payload)),
  });
}

export async function login(payload: LoginPayload) {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchCurrentUser() {
  const response = await request<{ user: UserProfileResponse }>("/auth/me", {
    method: "GET",
    headers: authHeaders(),
  });
  return response.user;
}

export async function getPersonProfile() {
  return request<PersonProfile>("/persons/me", { method: "GET", headers: authHeaders() });
}

export async function updatePersonProfile(payload: UpdatePersonPayload) {
  return request<PersonProfile>("/persons/me", {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(stripEmpty(payload)),
  });
}

export async function getOrganizationProfile() {
  return request<OrganizationProfile>("/organizations/me", { method: "GET", headers: authHeaders() });
}

export async function updateOrganizationProfile(payload: UpdateOrganizationPayload) {
  return request<OrganizationProfile>("/organizations/me", {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(stripEmpty(payload)),
  });
}

export async function listOrganizationContacts() {
  return request<OrganizationContact[]>("/organizations/me/contacts", { method: "GET", headers: authHeaders() });
}

export async function addOrganizationContact(payload: UpsertOrganizationContactPayload) {
  return request<OrganizationContact>("/organizations/me/contacts", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(stripEmpty(payload)),
  });
}

export async function updateOrganizationContact(contactUuid: string, payload: UpsertOrganizationContactPayload) {
  return request<OrganizationContact>(`/organizations/me/contacts/${contactUuid}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(stripEmpty(payload)),
  });
}

export async function listUsers() {
  return request<UserSummary[]>("/users", { method: "GET", headers: authHeaders() });
}

export function persistSession(loginResponse: LoginResponse) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, loginResponse.accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, loginResponse.refreshToken);
  window.localStorage.setItem(USER_KEY, JSON.stringify(loginResponse.user));
}

export function readStoredUser(): UserProfileResponse | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as UserProfileResponse;
  } catch {
    clearSession();
    return null;
  }
}

export function readAccessToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

export function authHeaders() {
  const token = readAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      const error = payload as ErrorResponse | null;
      if (error?.fieldErrors) {
        Object.values(error.fieldErrors).forEach((message) => toast.error(message));
      }
      throw new Error(error?.message ?? "Request failed.");
    }

    return (payload as ApiResponse<T>).data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(`Unable to reach the BOCRA API at ${API_BASE_URL}. Check that the backend is running and CORS allows this frontend origin.`);
    }
    throw error;
  }
}

function stripEmpty<T extends Record<string, unknown>>(payload: T): T {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== "" && value !== null && value !== undefined)) as T;
}
