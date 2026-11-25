import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../../hooks/useLang';
import { Icon } from './Icon';

function useLock(open: boolean, onClose: () => void) {
  const last = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    last.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      last.current?.focus?.();
    };
  }, [open, onClose]);
}

function useTrap(open: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    if (!el) return;
    const focusable = () => [...el.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((n) => !n.hasAttribute('disabled'));
    window.setTimeout(() => (focusable()[0] ?? el).focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const list = focusable();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [open]);
  return ref;
}

export function Modal({ open, onClose, title, children, wide = false }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  const { t } = useLang();
  useLock(open, onClose);
  const ref = useTrap(open);
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] grid place-items-center p-4">
          <motion.div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className={`relative max-h-[calc(100dvh-2rem)] w-full overflow-y-auto rounded-[var(--radius-card)] bg-white p-6 text-ink shadow-[var(--shadow-float)] sm:p-8 ${wide ? 'max-w-3xl' : 'max-w-lg'}`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <h2 className="text-h3">{title}</h2>
              <button type="button" onClick={onClose} aria-label={t({ en: 'Close', ar: 'إغلاق' })} className="-me-2 -mt-1 grid size-10 shrink-0 place-items-center rounded-full hover:bg-paper">
                <Icon name="close" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  side = 'end',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: 'end' | 'bottom';
}) {
  const { t, dir } = useLang();
  useLock(open, onClose);
  const ref = useTrap(open);
  const fromX = dir === 'rtl' ? '-100%' : '100%';
  const bottom = side === 'bottom';
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <motion.div className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className={
              bottom
                ? 'absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-[1.75rem] bg-white text-ink shadow-[var(--shadow-float)]'
                : 'absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-white text-ink shadow-[var(--shadow-float)]'
            }
            initial={bottom ? { y: '100%' } : { x: fromX }}
            animate={bottom ? { y: 0 } : { x: 0 }}
            exit={bottom ? { y: '100%' } : { x: fromX }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {bottom && <span className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-line" aria-hidden="true" />}
            <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
              <h2 className="text-lg font-extrabold">{title}</h2>
              <button type="button" onClick={onClose} aria-label={t({ en: 'Close', ar: 'إغلاق' })} className="-me-2 grid size-10 place-items-center rounded-full hover:bg-paper">
                <Icon name="close" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
            {footer && <div className="border-t border-line bg-white px-6 py-5">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
