import { Link } from 'react-router-dom';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-end gap-[3px] text-2xl font-extrabold tracking-[-0.04em] ${className}`} aria-label="ShoeLab" dir="ltr">
      ShoeLab
      <span className="mb-[7px] size-[9px] rounded-full bg-orange" aria-hidden="true" />
    </Link>
  );
}
