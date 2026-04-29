import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://jsonplaceholder.typicode.com",
  prepareHeaders: (headers) => {
    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;

    // Handle different error status codes globally
    switch (status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem("token");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        break;

      case 403:
        // Forbidden - user doesn't have permission
        console.error("Access forbidden");
        break;

      case 404:
        // Not found
        console.error("Resource not found");
        break;

      case 500:
      case 502:
      case 503:
        // Server errors
        console.error("Server error occurred");
        break;

      default:
        console.error("An error occurred:", result.error);
    }
  }

  return result;
};
