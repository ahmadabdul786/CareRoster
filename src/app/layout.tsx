import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { ErrorBoundary } from "./error-boundary";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400"],
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
      className={`${poppins.variable} ${roboto.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col max-width">
        <ErrorBoundary>
          <ReduxProvider>{children}</ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
