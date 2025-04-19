"use client";

import { UserButton } from "@clerk/clerk-react";
import { Logo } from "./logo";

export const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="my-3 mx-12 flex flex-row justify-between">
        <div className="flex flex-row items-center justify-center gap-3">
          <Logo className="text-black cursor-pointer text-xl" />
          <p className="text-sm text-muted-foreground">
            - The only tracker you'll need
          </p>
        </div>
        <UserButton />
      </div>
    </header>
  );
};
