import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';

const control =
  'w-full h-12 rounded-[var(--radius-field)] bg-white px-4 text-[0.98rem] text-ink shadow-[inset_0_0_0_1.5px_var(--color-line)] placeholder:text-soft/70 transition-shadow duration-200 focus:outline-none focus:shadow-[inset_0_0_0_2px_var(--color-orange)]';

function Wrap({ label, hint, error, id, children }: { label: string; hint?: string; error?: string; id: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-bold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} className="text-sm font-semibold text-orange-dark">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="text-sm text-soft">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ label, hint, error, className = '', ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string }) {
  const id = useId();
  return (
    <Wrap label={label} hint={hint} error={error} id={id}>
      <input id={id} aria-invalid={error ? true : undefined} aria-describedby={hint || error ? `${id}-msg` : undefined} className={`${control} ${className}`} {...rest} />
    </Wrap>
  );
}

export function Textarea({ label, hint, error, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string; error?: string }) {
  const id = useId();
  return (
    <Wrap label={label} hint={hint} error={error} id={id}>
      <textarea id={id} aria-invalid={error ? true : undefined} className={`${control} h-36 resize-y py-3`} {...rest} />
    </Wrap>
  );
}

export function Select({ label, hint, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; hint?: string; children: ReactNode }) {
  const id = useId();
  return (
    <Wrap label={label} hint={hint} id={id}>
      <div className="relative">
        <select id={id} className={`${control} appearance-none pe-10 font-semibold`} {...rest}>
          {children}
        </select>
        <svg className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-soft" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </Wrap>
  );
}
