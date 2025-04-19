import ConvexClientProvider from "@/components/convex-client-provider";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "RunNow",
  description: "A workout tracker application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-hidden`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
