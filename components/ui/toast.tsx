"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  title?: string;
  description?: string;
}

export function Toast({ title, description }: ToastProps) {
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 min-w-[260px] max-w-sm rounded-lg bg-neutral-900 px-4 py-3 text-white shadow-lg"
      )}
    >
      {title && <p className="text-lg md:text-xl font-semibold">{title}</p>}
      {description && (
        <p className="mt-1 text-sm text-neutral-300">{description}</p>
      )}
    </div>
  );
}
