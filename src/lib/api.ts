/*
 * Wraps BOCRA API calls for frontend authentication and account flows.
 */
import { toast } from "@/components/ui/sonner";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1").replace(/\/$/, "");

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

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  username?: string;
  password: string;
  forenames: string;
  surname: string;
  middleNames?: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "NON_BINARY" | "PREFER_NOT_TO_SAY" | "OTHER";
  nationality: string;
  nationalIdType: "OMANG" | "PASSPORT" | "DRIVERS_LICENSE" | "RESIDENCE_PERMIT" | "OTHER";
  nationalIdNumber: string;
  passportNumber?: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  residentialAddressLine1: string;
  residentialAddressLine2?: string;
  city: string;
  district: string;
  country: string;
  postalCode?: string;
  occupation?: string;
  organizationName?: string;
  profilePhotoUrl?: string;
};

export type UserProfileResponse = {
  user: {
    uuid: string;
    username?: string | null;
    email: string;
    role: string;
    accountStatus: string;
    emailVerifiedAt?: string | null;
    enabled: boolean;
  };
  person: {
    uuid: string;
    forenames: string;
    surname: string;
  } | null;
};

export type RegisterResponse = {
  message: string;
  verificationTokenExpiresAt: string;
  emailVerificationRequired: boolean;
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

export async function verifyEmail(token: string) {
  return request("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export function persistSession(loginResponse: LoginResponse) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("bocra.accessToken", loginResponse.accessToken);
  window.localStorage.setItem("bocra.refreshToken", loginResponse.refreshToken);
  window.localStorage.setItem("bocra.user", JSON.stringify(loginResponse.user));
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
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
}

function stripEmpty<T extends Record<string, unknown>>(payload: T): T {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== "" && value !== null && value !== undefined)) as T;
}
