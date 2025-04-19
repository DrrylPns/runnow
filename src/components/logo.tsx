import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <h1 className={cn("text-3xl font-semibold text-white", className)}>
      Run<span className="text-sky-500">Now</span>
    </h1>
  );
}
