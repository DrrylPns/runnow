"use client";

import { SignInButton } from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { Logo } from "../logo";

export function Hero() {
  return (
    <div className="relative h-dvh">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/landing-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 container w-full h-dvh max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center mb-3">
          <Logo />
          <p className="text-base text-white">A workout tracker application.</p>
        </div>
        <SignInButton mode="modal">
          <Button>Track now!</Button>
        </SignInButton>
      </div>
    </div>
  );
}
