"use client";

import { Provider } from "react-redux";
import { AuthListener } from "@/redux/components/AuthListener";
import { store } from "./store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthListener>{children}</AuthListener>
    </Provider>
  );
}
