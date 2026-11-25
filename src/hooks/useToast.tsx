import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

export type Toast = { id: number; title: string; body?: string; tone: 'success' | 'info' };

type ToastValue = {
  toasts: Toast[];
  push: (title: string, body?: string, tone?: Toast['tone']) => void;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const next = useRef(1);

  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((t) => t.id !== id)), []);

  const push = useCallback(
    (title: string, body?: string, tone: Toast['tone'] = 'success') => {
      const id = next.current++;
      setToasts((list) => [...list.slice(-2), { id, title, body, tone }]);
      window.setTimeout(() => dismiss(id), 3600);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss]);
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
