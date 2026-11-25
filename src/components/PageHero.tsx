import type { ReactNode } from 'react';

export function PageHero({ eyebrow, title, text, children }: { eyebrow?: string; title: string; text?: string; children?: ReactNode }) {
  return (
    <section className="container-x pb-12 pt-12 sm:pb-16 sm:pt-20">
      {eyebrow && <p className="mb-4 font-bold text-orange">{eyebrow}</p>}
      <h1 className="text-h1 max-w-4xl">{title}</h1>
      {text && <p className="text-lead mt-5 max-w-2xl text-soft">{text}</p>}
      {children}
    </section>
  );
}
