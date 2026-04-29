"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { GlobalErrorToast } from "@/components/shared/global-error-toast";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GlobalErrorToast />
      {children}
    </Provider>
  );
}
