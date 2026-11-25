import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'light';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap select-none transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.97] disabled:opacity-45 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-orange text-white hover:bg-orange-dark hover:shadow-[0_12px_30px_-10px_rgb(255_90_31/0.7)]',
  secondary: 'bg-ink text-white hover:bg-card',
  ghost: 'bg-transparent text-current shadow-[inset_0_0_0_1.5px_currentColor] hover:bg-ink/5',
  dark: 'bg-transparent text-white shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.28)] hover:bg-white/10',
  light: 'bg-white text-ink hover:bg-paper',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-8 text-base',
};

export const buttonClass = (variant: Variant = 'primary', size: Size = 'md', extra = '') => `${base} ${variants[variant]} ${sizes[size]} ${extra}`;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; children: ReactNode };

export function Button({ variant = 'primary', size = 'md', className = '', type = 'button', ...rest }: Props) {
  return <button type={type} className={buttonClass(variant, size, className)} {...rest} />;
}

export function ButtonLink({ to, variant = 'primary', size = 'md', className = '', children }: { to: string; variant?: Variant; size?: Size; className?: string; children: ReactNode }) {
  return (
    <Link to={to} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}

export function IconButton({ label, className = '', children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return (
    <button type="button" aria-label={label} title={label} className={`relative inline-grid size-11 place-items-center rounded-full transition-colors duration-200 ${className}`} {...rest}>
      {children}
    </button>
  );
}
