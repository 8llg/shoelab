import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Skeleton } from '../components/ui/Bits';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { Drawer } from '../components/ui/Overlay';
import { CATEGORIES, COLOR_FILTERS, MATERIALS, WIDTHS, type Category, type L, type Material, type Width } from '../data/catalog';
import { fromPrice, products } from '../data/products';
import { useLang } from '../hooks/useLang';

type Sort = 'popular' | 'low' | 'high' | 'new';

const PRICES: { id: string; name: L; min: number; max: number }[] = [
  { id: 'p1', name: { en: 'Under SAR 700', ar: 'أقل من 700 ر.س' }, min: 0, max: 699 },
  { id: 'p2', name: { en: 'SAR 700 – 900', ar: '700 – 900 ر.س' }, min: 700, max: 900 },
  { id: 'p3', name: { en: 'SAR 901 – 1,200', ar: '901 – 1,200 ر.س' }, min: 901, max: 1200 },
  { id: 'p4', name: { en: 'Over SAR 1,200', ar: 'أكثر من 1,200 ر.س' }, min: 1201, max: 99999 },
];

const SORTS: { id: Sort; name: L }[] = [
  { id: 'popular', name: { en: 'Most popular', ar: 'الأكثر شعبية' } },
  { id: 'low', name: { en: 'Price: low to high', ar: 'السعر: من الأقل' } },
  { id: 'high', name: { en: 'Price: high to low', ar: 'السعر: من الأعلى' } },
  { id: 'new', name: { en: 'Newest', ar: 'الأحدث' } },
];

const toggleIn = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function Group({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <fieldset className="border-b border-line py-5 first:pt-0">
      <legend className="contents">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between text-start font-bold">
          {title}
          <Icon name="chevronDown" size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </legend>
      {open && <div className="mt-4 grid gap-2.5">{children}</div>}
    </fieldset>
  );
}

function Check({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[0.95rem]">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="grid size-5 shrink-0 place-items-center rounded-md bg-white text-white shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-colors peer-checked:bg-ink peer-checked:shadow-none peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-orange">
        {checked && <Icon name="check" size={14} strokeWidth={3} />}
      </span>
      {children}
    </label>
  );
}

export function Shop() {
  const { t } = useLang();
  const [params, setParams] = useSearchParams();
  const initialCat = params.get('category') as Category | null;
  const [cats, setCats] = useState<Category[]>(initialCat && CATEGORIES.some((c) => c.id === initialCat) ? [initialCat] : []);
  const [prices, setPrices] = useState<string[]>([]);
  const [mats, setMats] = useState<Material[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [widths, setWidths] = useState<Width[]>([]);
  const [sort, setSort] = useState<Sort>('popular');
  const [sheet, setSheet] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const c = params.get('category') as Category | null;
    if (c && CATEGORIES.some((x) => x.id === c)) setCats([c]);
  }, [params]);

  const list = useMemo(() => {
    const filtered = products.filter((p) => {
      const price = fromPrice(p);
      if (cats.length && !cats.includes(p.category)) return false;
      if (prices.length && !PRICES.filter((r) => prices.includes(r.id)).some((r) => price >= r.min && price <= r.max)) return false;
      if (mats.length && !p.materials.some((m) => mats.includes(m))) return false;
      if (colors.length && !p.colorways.some((c) => colors.includes(c.filter))) return false;
      if (widths.length && !p.widths.some((w) => widths.includes(w))) return false;
      return true;
    });
    const sorted = [...filtered];
    if (sort === 'popular') sorted.sort((a, b) => b.popularity - a.popularity);
    if (sort === 'low') sorted.sort((a, b) => fromPrice(a) - fromPrice(b));
    if (sort === 'high') sorted.sort((a, b) => fromPrice(b) - fromPrice(a));
    if (sort === 'new') sorted.sort((a, b) => b.added.localeCompare(a.added));
    return sorted;
  }, [cats, prices, mats, colors, widths, sort]);

  const active = cats.length + prices.length + mats.length + colors.length + widths.length;
  const clear = () => {
    setCats([]);
    setPrices([]);
    setMats([]);
    setColors([]);
    setWidths([]);
    if (params.get('category')) setParams({});
  };

  const filters = (
    <div>
      <Group title={t({ en: 'Category', ar: 'الفئة' })}>
        {CATEGORIES.map((c) => (
          <Check key={c.id} checked={cats.includes(c.id)} onChange={() => setCats((l) => toggleIn(l, c.id))}>
            {t(c.name)}
          </Check>
        ))}
      </Group>
      <Group title={t({ en: 'Price', ar: 'السعر' })}>
        {PRICES.map((p) => (
          <Check key={p.id} checked={prices.includes(p.id)} onChange={() => setPrices((l) => toggleIn(l, p.id))}>
            {t(p.name)}
          </Check>
        ))}
      </Group>
      <Group title={t({ en: 'Material', ar: 'الخامة' })}>
        {MATERIALS.map((m) => (
          <Check key={m.id} checked={mats.includes(m.id)} onChange={() => setMats((l) => toggleIn(l, m.id))}>
            {t(m.name)}
          </Check>
        ))}
      </Group>
      <Group title={t({ en: 'Color', ar: 'اللون' })}>
        <div className="flex flex-wrap gap-2.5">
          {COLOR_FILTERS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setColors((l) => toggleIn(l, c.id))}
              aria-pressed={colors.includes(c.id)}
              aria-label={t(c.name)}
              title={t(c.name)}
              className={`size-9 rounded-full transition-shadow ${colors.includes(c.id) ? 'shadow-[0_0_0_2px_var(--color-paper),0_0_0_4px_var(--color-ink)]' : 'shadow-[inset_0_0_0_1px_rgb(0_0_0/0.18)]'}`}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </Group>
      <Group title={t({ en: 'Width', ar: 'العرض' })}>
        {WIDTHS.map((w) => (
          <Check key={w.id} checked={widths.includes(w.id)} onChange={() => setWidths((l) => toggleIn(l, w.id))}>
            {t(w.name)}
          </Check>
        ))}
      </Group>
    </div>
  );

  return (
    <div className="container-x pb-24 pt-10 sm:pt-14">
      <div className="mb-10 grid gap-3">
        <h1 className="text-h1">{t({ en: 'Shop all shoes', ar: 'كل الأحذية' })}</h1>
        <p className="text-lead max-w-2xl text-soft">{t({ en: 'Every pair is made to order in your size and width. Start here or design from scratch.', ar: 'كل زوج يُصنع عند الطلب بمقاسك وعرضك. ابدأ من هنا أو صمّم من الصفر.' })}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block" aria-label={t({ en: 'Filters', ar: 'الفلاتر' })}>
          <div className="sticky top-24">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-extrabold">{t({ en: 'Filters', ar: 'الفلاتر' })}</h2>
              {active > 0 && (
                <button type="button" onClick={clear} className="text-sm font-semibold text-soft underline underline-offset-4 hover:text-ink">
                  {t({ en: 'Clear all', ar: 'مسح الكل' })}
                </button>
              )}
            </div>
            {filters}
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold text-soft" aria-live="polite">
              {t({ en: `${list.length} shoes`, ar: `${list.length} حذاء` })}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSheet(true)}>
                <Icon name="filter" size={18} />
                {t({ en: 'Filters', ar: 'الفلاتر' })}
                {active > 0 && <span className="grid size-5 place-items-center rounded-full bg-orange text-[11px] text-white">{active}</span>}
              </Button>
              <label className="relative">
                <span className="sr-only">{t({ en: 'Sort by', ar: 'ترتيب حسب' })}</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-10 appearance-none rounded-full bg-white pe-10 ps-4 text-sm font-bold shadow-[inset_0_0_0_1.5px_var(--color-line)] focus:outline-none focus:shadow-[inset_0_0_0_2px_var(--color-orange)]">
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {t(s.name)}
                    </option>
                  ))}
                </select>
                <Icon name="chevronDown" size={16} className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2" />
              </label>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 min-[440px]:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="grid gap-3">
                  <Skeleton className="aspect-[4/3.4] rounded-[var(--radius-card)]" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : list.length === 0 ? (
            <div className="grid justify-items-center gap-4 rounded-[var(--radius-card)] bg-white px-6 py-20 text-center">
              <p className="text-h3">{t({ en: 'No shoes match these filters', ar: 'ما فيه أحذية تطابق الفلاتر' })}</p>
              <p className="text-soft">{t({ en: 'Try removing a filter, or design your own pair.', ar: 'جرّب تشيل فلتر، أو صمّم زوجك الخاص.' })}</p>
              <Button variant="secondary" onClick={clear}>
                {t({ en: 'Clear filters', ar: 'مسح الفلاتر' })}
              </Button>
            </div>
          ) : (
            <motion.ul layout className="grid grid-cols-1 gap-x-5 gap-y-10 min-[440px]:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {list.map((p) => (
                  <motion.li key={p.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
                    <ProductCard product={p} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </div>

      <Drawer
        open={sheet}
        onClose={() => setSheet(false)}
        side="bottom"
        title={t({ en: 'Filters', ar: 'الفلاتر' })}
        footer={
          <div className="grid grid-cols-2 gap-3">
            <Button variant="ghost" onClick={clear}>
              {t({ en: 'Clear all', ar: 'مسح الكل' })}
            </Button>
            <Button onClick={() => setSheet(false)}>{t({ en: `Show ${list.length} shoes`, ar: `عرض ${list.length} حذاء` })}</Button>
          </div>
        }
      >
        {filters}
      </Drawer>
    </div>
  );
}
