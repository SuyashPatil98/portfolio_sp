"use client";

import * as React from "react";
import { ToastProps } from "@/components/ui/toast";

type Toast = ToastProps & { id: string };
type ToastState = { toasts: Toast[] };

const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

function genId() {
  return Math.random().toString(36).substring(2, 9);
}

function dispatch(toasts: Toast[]) {
  memoryState = { toasts };
  listeners.forEach((listener) => listener(memoryState));
}

export function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  const toast = React.useCallback((props: ToastProps) => {
    const newToast = { ...props, id: genId() };
    dispatch([newToast, ...memoryState.toasts]);
    setTimeout(
      () => dispatch(memoryState.toasts.filter((t) => t.id !== newToast.id)),
      3000
    );
  }, []);

  return { ...state, toast };
}
