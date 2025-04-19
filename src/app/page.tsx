"use client";

import { Hero } from "@/components/landing-page/hero";
import { useUser } from "@clerk/clerk-react";
import { Unauthenticated, useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && isAuthenticated) {
      router.push("/workouts");
    }
  }, [user, router]);

  return (
    <main className="overflow-hidden">
      <Unauthenticated>
        <Hero />
      </Unauthenticated>
    </main>
  );
}
