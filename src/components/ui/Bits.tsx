import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLang } from '../../hooks/useLang';
import { useToast } from '../../hooks/useToast';
import { Icon } from './Icon';

export function Badge({ children, tone = 'orange', className = '' }: { children: ReactNode; tone?: 'orange' | 'peach' | 'dark' | 'light' | 'success'; className?: string }) {
  const tones = {
    orange: 'bg-orange text-white',
    peach: 'bg-peach text-ink',
    dark: 'bg-ink text-white',
    light: 'bg-white text-ink shadow-[inset_0_0_0_1px_var(--color-line)]',
    success: 'bg-success/12 text-success',
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${tones[tone]} ${className}`}>{children}</span>;
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton rounded-2xl ${className}`} aria-hidden="true" />;
}

export function SectionHead({ title, text, action, light = false, center = false }: { title: string; text?: string; action?: ReactNode; light?: boolean; center?: boolean }) {
  return (
    <div className={`mb-10 flex gap-6 sm:mb-14 ${center ? 'flex-col items-center text-center' : 'flex-wrap items-end justify-between'}`}>
      <div className={`grid max-w-2xl gap-3 ${center ? 'justify-items-center' : ''}`}>
        <h2 className="text-h2">{title}</h2>
        {text && <p className={`text-lead ${light ? 'text-mute' : 'text-soft'}`}>{text}</p>}
      </div>
      {action}
    </div>
  );
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 22 }} animate={seen ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 500);
      const e = 1 - Math.pow(1 - p, 3);
      const v = a + (value - a) * e;
      setShown(v);
      from.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className="tabular">{format(shown)}</span>;
}

export function Toaster() {
  const { toasts, dismiss } = useToast();
  const { t } = useLang();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-start sm:ps-6" role="status" aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl bg-ink p-4 text-white shadow-[var(--shadow-float)]"
          >
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-orange">
              <Icon name="check" size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold">{toast.title}</p>
              {toast.body && <p className="mt-0.5 text-sm text-mute">{toast.body}</p>}
            </div>
            <button type="button" onClick={() => dismiss(toast.id)} className="-m-1 grid size-8 place-items-center rounded-full text-mute hover:bg-white/10 hover:text-white" aria-label={t({ en: 'Dismiss', ar: 'إخفاء' })}>
              <Icon name="close" size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function Swatch({ hex, label, selected, onSelect, size = 'md' }: { hex: string; label: string; selected: boolean; onSelect: () => void; size?: 'sm' | 'md' }) {
  const s = size === 'sm' ? 'size-8' : 'size-10';
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={label}
      aria-pressed={selected}
      title={label}
      className={`${s} shrink-0 rounded-full transition-[box-shadow,transform] duration-200 hover:scale-105 ${
        selected ? 'shadow-[0_0_0_2px_var(--sw-ring-gap,#fff),0_0_0_4.5px_var(--color-orange)]' : 'shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)]'
      }`}
      style={{ background: hex }}
    />
  );
}

export function Choice({ selected, onSelect, children, className = '', dark = false }: { selected: boolean; onSelect: () => void; children: ReactNode; className?: string; dark?: boolean }) {
  const idle = dark ? 'bg-ink-2 text-white shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.1)] hover:shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.3)]' : 'bg-white text-ink shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]';
  const on = dark ? 'bg-orange/15 text-white shadow-[inset_0_0_0_2px_var(--color-orange)]' : 'bg-orange/8 text-ink shadow-[inset_0_0_0_2px_var(--color-orange)]';
  return (
    <button type="button" aria-pressed={selected} onClick={onSelect} className={`rounded-[var(--radius-field)] px-4 py-3 text-start transition-[box-shadow,background-color] duration-200 ${selected ? on : idle} ${className}`}>
      {children}
    </button>
  );
}

export function Qty({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  const { t } = useLang();
  return (
    <div className="inline-flex items-center rounded-full shadow-[inset_0_0_0_1.5px_var(--color-line)]" role="group" aria-label={label}>
      <button type="button" className="grid size-10 place-items-center rounded-full hover:bg-paper disabled:opacity-30" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label={t({ en: 'Decrease quantity', ar: 'تقليل الكمية' })}>
        <Icon name="minus" size={16} />
      </button>
      <span className="w-7 text-center font-bold tabular" aria-live="polite">
        {value}
      </span>
      <button type="button" className="grid size-10 place-items-center rounded-full hover:bg-paper disabled:opacity-30" onClick={() => onChange(value + 1)} disabled={value >= 9} aria-label={t({ en: 'Increase quantity', ar: 'زيادة الكمية' })}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
