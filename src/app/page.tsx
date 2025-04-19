"use client";

import { Hero } from "@/components/landing-page/hero";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
  const { user } = useUser();

  return (
    <main>
      <Unauthenticated>
        <Hero />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <div>Logged in as {user?.fullName}</div>
      </Authenticated>
    </main>
  );
}
