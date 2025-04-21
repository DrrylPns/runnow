import ConvexClientProvider from "@/components/convex-client-provider";
import type { Metadata } from "next";
import "../../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "RunNow - Workouts",
  description: "A workout tracker application.",
};

export default function WorkoutsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-hidden">
      <Header />
      {children}
    </div>
  );
}
