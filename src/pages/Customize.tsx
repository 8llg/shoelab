import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Shoe, type View } from '../components/Shoe';
import { AnimatedNumber, Badge, Choice, Swatch } from '../components/ui/Bits';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import {
  EXTRA_FIT_PRICE,
  MATERIAL_PRICE,
  MATERIALS,
  PALETTE,
  PART_NAMES,
  SIZES,
  TYPE_PRICE,
  TYPES,
  WIDTHS,
  colorName,
  needsExtraFit,
  shoePrice,
  type PartKey,
} from '../data/catalog';
import { useCart, type Design } from '../hooks/useCart';
import { useLang } from '../hooks/useLang';
import { useToast } from '../hooks/useToast';

const DEFAULT: Design = {
  type: 'sneakers',
  category: 'sneakers',
  parts: { upper: '#FF5A1F', panel: '#FFFFFF', sole: '#FFFFFF', laces: '#FFFFFF', heel: '#1E1F23' },
  material: 'canvas',
  sizeLeft: 42,
  sizeRight: 42,
  width: 'normal',
  initials: '',
};

const TABS = [
  { id: 'type', name: { en: 'Type', ar: 'النوع' } },
  { id: 'colors', name: { en: 'Colors', ar: 'الألوان' } },
  { id: 'material', name: { en: 'Material', ar: 'الخامة' } },
  { id: 'fit', name: { en: 'Fit', ar: 'المقاس' } },
  { id: 'initials', name: { en: 'Initials', ar: 'الحروف' } },
] as const;

type Tab = (typeof TABS)[number]['id'];

const VIEWS: { id: View; name: { en: string; ar: string } }[] = [
  { id: 'side', name: { en: 'Side', ar: 'جانب' } },
  { id: 'top', name: { en: 'Top', ar: 'أعلى' } },
  { id: 'back', name: { en: 'Back', ar: 'خلف' } },
];

const PARTS: PartKey[] = ['upper', 'panel', 'sole', 'laces', 'heel'];

export function Customize() {
  const { t, sar } = useLang();
  const { add, setDrawer } = useCart();
  const { push } = useToast();
  const location = useLocation();
  const start = (location.state as { design?: Design } | null)?.design;
  const [design, setDesign] = useState<Design>(() => (start ? { ...start, category: start.type } : DEFAULT));
  const [tab, setTab] = useState<Tab>('type');
  const [part, setPart] = useState<PartKey>('upper');
  const [view, setView] = useState<View>('side');

  const update = (patch: Partial<Design>) => setDesign((d) => ({ ...d, ...patch }));
  const price = shoePrice(design.type, design.material, design.sizeLeft, design.sizeRight, design.width);
  const extraFit = needsExtraFit(design.sizeLeft, design.sizeRight, design.width);
  const typeInfo = TYPES.find((x) => x.id === design.type)!;
  const materialInfo = MATERIALS.find((m) => m.id === design.material)!;

  const lines = useMemo(
    () => [
      { label: t(typeInfo.name), value: TYPE_PRICE[design.type] },
      { label: t(materialInfo.name), value: MATERIAL_PRICE[design.material] },
      ...(extraFit ? [{ label: t({ en: 'Extra size / width', ar: 'مقاس أو عرض إضافي' }), value: EXTRA_FIT_PRICE }] : []),
    ],
    [t, typeInfo, materialInfo, design.type, design.material, extraFit],
  );

  const addToCart = () => {
    add({
      productId: null,
      name: { en: `Custom ${typeInfo.name.en}`, ar: `${typeInfo.name.ar} بتصميمك` },
      custom: true,
      price,
      design: { ...design, category: design.type },
    });
    push(t({ en: 'Your design is in the cart', ar: 'تصميمك صار في السلة' }), `${t(typeInfo.name)} · ${sar(price)}`);
    setDrawer(true);
  };

  const surprise = () => {
    const pick = () => PALETTE[Math.floor(Math.random() * PALETTE.length)].hex;
    update({ parts: { upper: pick(), panel: pick(), sole: Math.random() > 0.5 ? '#FFFFFF' : pick(), laces: pick(), heel: pick() } });
  };

  const panel = (
    <AnimatePresence mode="wait">
      <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="grid gap-4">
        {tab === 'type' && (
          <>
            <h2 className="text-lg font-extrabold">{t({ en: 'Choose a shoe type', ar: 'اختر نوع الحذاء' })}</h2>
            <div className="grid grid-cols-2 gap-2.5">
              {TYPES.map((x) => (
                <Choice key={x.id} dark selected={design.type === x.id} onSelect={() => update({ type: x.id, category: x.id })} className={x.id === 'formal' ? 'col-span-2 sm:col-span-1' : ''}>
                  <span className="mb-1 grid h-14 place-items-center">
                    <Shoe type={x.id} parts={design.parts} material={design.material} className="h-full" />
                  </span>
                  <span className="block font-bold">{t(x.name)}</span>
                  <span className="text-sm text-mute">{sar(TYPE_PRICE[x.id])}</span>
                </Choice>
              ))}
            </div>
          </>
        )}

        {tab === 'colors' && (
          <>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold">{t({ en: 'Pick your colors', ar: 'اختر ألوانك' })}</h2>
              <button type="button" onClick={surprise} className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-2 text-sm font-bold hover:bg-white/14">
                <Icon name="sparkle" size={16} />
                {t({ en: 'Surprise me', ar: 'فاجئني' })}
              </button>
            </div>
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="tablist" aria-label={t({ en: 'Shoe parts', ar: 'أجزاء الحذاء' })}>
              {PARTS.map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={part === k}
                  onClick={() => setPart(k)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-bold transition-colors ${part === k ? 'bg-white text-ink' : 'bg-white/8 text-white hover:bg-white/14'}`}
                >
                  <span className="size-3.5 rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.25)]" style={{ background: design.parts[k] }} />
                  {t(PART_NAMES[k])}
                </button>
              ))}
            </div>
            <p className="text-sm text-mute">
              {t(PART_NAMES[part])}: <span className="font-bold text-white">{t(colorName(design.parts[part]))}</span>
            </p>
            <div className="flex flex-wrap gap-3 [--sw-ring-gap:var(--color-card)]">
              {PALETTE.map((c) => (
                <Swatch key={c.hex} hex={c.hex} label={`${t(PART_NAMES[part])}: ${t(c.name)}`} selected={design.parts[part].toLowerCase() === c.hex.toLowerCase()} onSelect={() => update({ parts: { ...design.parts, [part]: c.hex } })} />
              ))}
            </div>
          </>
        )}

        {tab === 'material' && (
          <>
            <h2 className="text-lg font-extrabold">{t({ en: 'Choose a material', ar: 'اختر الخامة' })}</h2>
            <div className="grid gap-2.5">
              {MATERIALS.map((m) => (
                <Choice key={m.id} dark selected={design.material === m.id} onSelect={() => update({ material: m.id })}>
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-bold">{t(m.name)}</span>
                    <span className="text-sm font-bold text-peach">{MATERIAL_PRICE[m.id] ? `+${sar(MATERIAL_PRICE[m.id])}` : t({ en: 'Included', ar: 'ضمن السعر' })}</span>
                  </span>
                  <span className="mt-1 block text-sm text-mute">{t(m.note)}</span>
                </Choice>
              ))}
            </div>
          </>
        )}

        {tab === 'fit' && (
          <>
            <h2 className="text-lg font-extrabold">{t({ en: 'Your size and width', ar: 'مقاسك وعرضك' })}</h2>
            <div className="grid grid-cols-2 gap-3">
              {(['sizeLeft', 'sizeRight'] as const).map((k) => (
                <label key={k} className="grid gap-2">
                  <span className="text-sm font-bold text-mute">{k === 'sizeLeft' ? t({ en: 'Left foot (EU)', ar: 'القدم اليسرى' }) : t({ en: 'Right foot (EU)', ar: 'القدم اليمنى' })}</span>
                  <span className="relative">
                    <select
                      value={design[k]}
                      onChange={(e) => update({ [k]: Number(e.target.value) } as Partial<Design>)}
                      className="h-12 w-full appearance-none rounded-[var(--radius-field)] bg-ink-2 pe-10 ps-4 font-bold text-white shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.12)] focus:outline-none focus:shadow-[inset_0_0_0_2px_var(--color-orange)]"
                    >
                      {SIZES.map((s) => (
                        <option key={s} value={s}>
                          EU {s}
                        </option>
                      ))}
                    </select>
                    <Icon name="chevronDown" size={16} className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-mute" />
                  </span>
                </label>
              ))}
            </div>
            <AnimatePresence>
              {design.sizeLeft !== design.sizeRight && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <Badge tone="peach">{t({ en: 'Different sizes – no problem!', ar: 'مقاسات مختلفة – ولا يهمك!' })}</Badge>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="mt-1 text-sm font-bold text-mute">{t({ en: 'Width', ar: 'العرض' })}</p>
            <div className="grid grid-cols-2 gap-2.5">
              {WIDTHS.map((w) => (
                <Choice key={w.id} dark selected={design.width === w.id} onSelect={() => update({ width: w.id })} className="text-center">
                  <span className="font-bold">{t(w.name)}</span>
                  {w.id === 'xwide' && <span className="block text-xs text-peach">+{EXTRA_FIT_PRICE}</span>}
                </Choice>
              ))}
            </div>
            <p className="text-sm text-mute">{t({ en: `Sizes 36–38 and 48–50, or Extra Wide, add ${sar(EXTRA_FIT_PRICE)}.`, ar: `المقاسات 36–38 و48–50 أو العرض الإضافي تضيف ${sar(EXTRA_FIT_PRICE)}.` })}</p>
          </>
        )}

        {tab === 'initials' && (
          <>
            <h2 className="text-lg font-extrabold">{t({ en: 'Add your initials', ar: 'أضف حروف اسمك' })}</h2>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-mute">{t({ en: 'Up to 3 letters, shown on the heel', ar: 'حتى 3 حروف إنجليزية، تظهر على الكعب' })}</span>
              <input
                value={design.initials}
                onChange={(e) => update({ initials: e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase() })}
                maxLength={3}
                autoComplete="off"
                placeholder="SA"
                dir="ltr"
                className="h-14 rounded-[var(--radius-field)] bg-ink-2 px-5 text-2xl font-extrabold uppercase tracking-[0.25em] text-white shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.12)] placeholder:tracking-normal placeholder:text-white/25 focus:outline-none focus:shadow-[inset_0_0_0_2px_var(--color-orange)]"
              />
            </label>
            <p className="text-sm text-mute">{t({ en: 'Free. The color changes with the heel tab so it is always easy to read.', ar: 'مجانًا. لون الحروف يتغير مع لون لسان الكعب عشان تكون واضحة دائمًا.' })}</p>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );

  const tabIndex = TABS.findIndex((x) => x.id === tab);

  return (
    <div className="bg-ink text-white lg:h-[calc(100dvh-68px)] lg:overflow-hidden">
      <div className="grid grid-cols-[minmax(0,1fr)] lg:h-full lg:grid-cols-[minmax(0,1fr)_440px]">
        <section className="sticky top-[68px] z-10 bg-ink lg:static lg:flex lg:flex-col" aria-label={t({ en: 'Preview', ar: 'المعاينة' })}>
          <div className="container-x flex items-center justify-between gap-3 pt-4 lg:w-auto lg:px-10 lg:pt-8">
            <div className="min-w-0">
              <h1 className="truncate text-lg font-extrabold sm:text-3xl">{t({ en: 'ShoeLab Studio', ar: 'استوديو شو لاب' })}</h1>
              <p className="hidden text-sm text-mute sm:block">{t({ en: 'Every change shows live. Prices before VAT.', ar: 'كل تغيير يظهر مباشرة. الأسعار قبل الضريبة.' })}</p>
            </div>
            <div className="inline-flex shrink-0 rounded-full bg-white/8 p-1" role="group" aria-label={t({ en: 'View', ar: 'الزاوية' })}>
              {VIEWS.map((v) => (
                <button key={v.id} type="button" onClick={() => setView(v.id)} aria-pressed={view === v.id} className={`h-9 rounded-full px-2.5 text-sm font-bold transition-colors sm:px-4 ${view === v.id ? 'bg-white text-ink' : 'text-mute hover:text-white'}`}>
                  {t(v.name)}
                </button>
              ))}
            </div>
          </div>
          <div className="relative grid h-[30vh] min-h-[190px] place-items-center px-4 sm:h-[38vh] lg:h-auto lg:flex-1 lg:px-14">
            <div className="pointer-events-none absolute inset-x-[10%] bottom-[12%] top-[20%] rounded-full bg-orange/18 blur-[90px]" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, rotateY: -35, scale: 0.92 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 35, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: 1200 }}
                className="relative h-full w-full max-w-[860px]"
              >
                <Shoe
                  type={design.type}
                  parts={design.parts}
                  material={design.material}
                  initials={design.initials}
                  view={view}
                  className="h-full w-full drop-shadow-[0_40px_40px_rgb(0_0_0/0.5)]"
                  label={t({ en: `Your custom ${typeInfo.name.en}, ${view} view`, ar: `${typeInfo.name.ar} بتصميمك` })}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden px-10 pb-8 lg:block">
            <ul className="flex flex-wrap gap-2 text-sm">
              {PARTS.map((k) => (
                <li key={k} className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-mute">
                  <span className="size-3 rounded-full shadow-[inset_0_0_0_1px_rgb(255_255_255/0.25)]" style={{ background: design.parts[k] }} />
                  {t(PART_NAMES[k])}
                </li>
              ))}
              <li className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-mute">{t(materialInfo.name)}</li>
              <li className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-mute">
                {design.sizeLeft === design.sizeRight ? `EU ${design.sizeLeft}` : `L ${design.sizeLeft} · R ${design.sizeRight}`}
              </li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col bg-card lg:h-full lg:min-h-0 lg:rounded-s-[2rem]" aria-label={t({ en: 'Design options', ar: 'خيارات التصميم' })}>
          <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-white/8 px-4 pt-4 sm:px-6" role="tablist" aria-label={t({ en: 'Steps', ar: 'الخطوات' })}>
            {TABS.map((x, i) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={tab === x.id}
                onClick={() => setTab(x.id)}
                className={`relative shrink-0 px-3 pb-3 pt-1 text-sm font-bold transition-colors ${tab === x.id ? 'text-white' : 'text-mute hover:text-white'}`}
              >
                <span className="me-1.5 text-xs text-peach">{i + 1}</span>
                {t(x.name)}
                {tab === x.id && <motion.span layoutId="tab-line" className="absolute inset-x-2 bottom-0 h-[3px] rounded-full bg-orange" />}
              </button>
            ))}
          </div>
          <div className="flex-1 px-4 py-6 sm:px-6 lg:min-h-0 lg:overflow-y-auto">{panel}</div>
          <div className="px-4 pb-4 sm:px-6">
            <div className="flex gap-2">
              <Button variant="dark" size="sm" className="flex-1" disabled={tabIndex === 0} onClick={() => setTab(TABS[tabIndex - 1].id)}>
                <Icon name="back" size={16} className="rtl:rotate-180" />
                {t({ en: 'Back', ar: 'السابق' })}
              </Button>
              <Button variant="dark" size="sm" className="flex-1" disabled={tabIndex === TABS.length - 1} onClick={() => setTab(TABS[tabIndex + 1].id)}>
                {t({ en: 'Next step', ar: 'الخطوة التالية' })}
                <Icon name="arrow" size={16} className="rtl:rotate-180" />
              </Button>
            </div>
          </div>
          <div className="sticky bottom-0 border-t border-white/8 bg-card/95 px-4 py-4 backdrop-blur sm:px-6 lg:static">
            <details className="group mb-3 text-sm text-mute">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 font-semibold hover:text-white">
                {t({ en: 'Price breakdown', ar: 'تفاصيل السعر' })}
                <Icon name="chevronDown" size={14} className="transition-transform group-open:rotate-180" />
              </summary>
              <ul className="mt-2 grid gap-1">
                {lines.map((l) => (
                  <li key={l.label} className="flex justify-between">
                    <span>{l.label}</span>
                    <span className="tabular">{l.value ? sar(l.value) : t({ en: 'Included', ar: 'ضمن السعر' })}</span>
                  </li>
                ))}
              </ul>
            </details>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-mute">{t({ en: 'Your price · before VAT', ar: 'سعرك · قبل الضريبة' })}</p>
                <p className="text-2xl font-extrabold sm:text-3xl" aria-live="polite">
                  <AnimatedNumber value={price} format={sar} />
                </p>
              </div>
              <Button size="lg" onClick={addToCart} className="px-6 sm:px-8">
                <Icon name="bag" size={20} />
                {t({ en: 'Add to cart', ar: 'أضف للسلة' })}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
