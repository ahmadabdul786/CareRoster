import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { setError } from "../features/error/errorSlice";

/**
 * Global error handling middleware for RTK Query
 * Catches all rejected actions and dispatches them to the error slice
 */
export const errorHandlingMiddleware: Middleware =
  (store) => (next) => (action) => {
    // Check if the action is a rejected RTK Query action
    if (isRejectedWithValue(action)) {
      const { payload } = action;

      let errorMessage = "An unexpected error occurred";
      let statusCode: number | undefined;

      // Extract error details from RTK Query error payload
      if (payload && typeof payload === "object") {
        if ("status" in payload) {
          statusCode = payload.status as number;
        }

        if ("data" in payload && payload.data) {
          const data = payload.data as any;
          errorMessage = data.message || data.error || errorMessage;
        } else if ("error" in payload) {
          errorMessage = String(payload.error);
        }
      }

      // Dispatch error to the error slice
      store.dispatch(
        setError({
          message: errorMessage,
          statusCode,
        })
      );

      // Log error in development
      if (process.env.NODE_ENV === "development") {
        console.error("RTK Query Error:", {
          message: errorMessage,
          statusCode,
          payload,
        });
      }
    }

    return next(action);
  };
