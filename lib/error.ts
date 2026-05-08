import { AxiosError } from "axios";

interface ErrorPayload {
  error?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

export type ApiError = AxiosError<ErrorPayload>;

export function getErrorMessage(error: unknown): string | null {
  const apiError = error as ApiError;

  if (apiError.response?.status === 401) return null;

  if (apiError.code === AxiosError.ERR_NETWORK) {
    return "Network connection failed. Please check your internet.";
  }

  if (apiError.code === AxiosError.ETIMEDOUT) {
    return "Request timed out. Please try again.";
  }

  if (apiError.code === AxiosError.ECONNABORTED) {
    return "Request was cancelled.";
  }

  if (apiError.response?.data?.error) {
    return apiError.response.data.error;
  }

  if (apiError.response?.data?.message) {
    return apiError.response.data.message;
  }

  if (apiError.response?.data?.errors) {
    return "Form validation errors.";
  }

  switch (apiError.response?.status) {
    case 400:
      return "Invalid request. Please check your input.";
    case 403:
      return "You don't have permission to perform this action.";
    case 404:
      return "Resource not found.";
    case 409:
      return "Conflict with existing data.";
    case 422:
      return "Validation failed. Please check your input.";
    case 429:
      return "Too many requests. Please try again later.";
    case 500:
      return "Server error. Please try again later.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
}
