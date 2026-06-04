import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { ErrorBoundary } from "./error-boundary";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Locum Hero",
  description: "Locum Hero - Healthcare staffing management platform",
  icons: {
    icon: "/assets/svg/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col max-width">
        <ErrorBoundary>
          <ReduxProvider>{children}</ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
