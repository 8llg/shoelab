import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Shoe, type View } from '../components/Shoe';
import { MeasureSteps, SizeTable } from '../components/SizeTable';
import { AnimatedNumber, Badge, Choice, SectionHead, Skeleton } from '../components/ui/Bits';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { Modal } from '../components/ui/Overlay';
import { CATEGORIES, EXTRA_FIT_PRICE, MATERIAL_PRICE, MATERIALS, SIZES, WIDTHS, isExtraSize, shoePrice, type Material, type Width } from '../data/catalog';
import { productById, products } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useLang } from '../hooks/useLang';
import { useToast } from '../hooks/useToast';
import { useWishlist } from '../hooks/useWishlist';
import { NotFound } from './NotFound';

const VIEWS: { id: View | 'detail'; name: { en: string; ar: string } }[] = [
  { id: 'side', name: { en: 'Side', ar: 'جانب' } },
  { id: 'top', name: { en: 'Top', ar: 'أعلى' } },
  { id: 'back', name: { en: 'Back', ar: 'خلف' } },
  { id: 'detail', name: { en: 'Detail', ar: 'تفاصيل' } },
];

export function ProductPage() {
  const { id = '' } = useParams();
  const product = productById(id);
  const { t, sar } = useLang();
  const { add, setDrawer } = useCart();
  const { has, toggle } = useWishlist();
  const { push } = useToast();
  const navigate = useNavigate();

  const [way, setWay] = useState(0);
  const [view, setView] = useState<View | 'detail'>('side');
  const [material, setMaterial] = useState<Material>(product?.material ?? 'canvas');
  const [size, setSize] = useState<number | null>(product?.size ?? null);
  const [width, setWidth] = useState<Width>(product?.width ?? 'normal');
  const [guide, setGuide] = useState(false);
  const [openMat, setOpenMat] = useState<string | null>('about');
  const [ready, setReady] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (!product) return;
    setWay(0);
    setView('side');
    setMaterial(product.material);
    setSize(product.size);
    setWidth(product.width);
    setReady(false);
    const timer = window.setTimeout(() => setReady(true), 300);
    return () => window.clearTimeout(timer);
  }, [product]);

  useEffect(() => {
    if (product) document.title = `${t(product.name)} – ShoeLab`;
  }, [product, t]);

  if (!product) return <NotFound />;

  const colorway = product.colorways[way];
  const category = CATEGORIES.find((c) => c.id === product.category)!;
  const chosenSize = size ?? product.size;
  const price = shoePrice(product.type, material, chosenSize, chosenSize, width);
  const related = products.filter((p) => p.id !== product.id && (p.category === product.category || p.type === product.type)).slice(0, 4);
  const liked = has(product.id);

  const design = {
    type: product.type,
    category: product.category,
    parts: colorway.parts,
    material,
    sizeLeft: chosenSize,
    sizeRight: chosenSize,
    width,
    initials: '',
  };

  const addToCart = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    add({ productId: product.id, name: product.name, custom: false, price, design });
    push(t({ en: 'Added to cart', ar: 'تمت الإضافة للسلة' }), `${t(product.name)} · ${t({ en: `EU ${size}`, ar: `مقاس ${size}` })}`);
    setDrawer(true);
  };

  return (
    <div className="pb-24">
      <div className="container-x pt-6">
        <nav aria-label={t({ en: 'Breadcrumb', ar: 'مسار الصفحة' })} className="text-sm text-soft">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="hover:text-ink">
                {t({ en: 'Home', ar: 'الرئيسية' })}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to={`/shop?category=${product.category}`} className="hover:text-ink">
                {t(category.name)}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-ink">
              {t(product.name)}
            </li>
          </ol>
        </nav>
      </div>

      <div className="container-x mt-6 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative grid aspect-[4/3.2] place-items-center overflow-hidden rounded-[2rem] bg-white">
            {!ready ? (
              <Skeleton className="absolute inset-6" />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${view}-${way}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid h-full w-full place-items-center ${view === 'detail' ? 'overflow-hidden' : 'p-8'}`}
                >
                  {view === 'detail' ? (
                    <Shoe type={product.type} parts={colorway.parts} material={material} className="w-[230%] max-w-none translate-x-[22%] rtl:translate-x-[22%]" label={t({ en: `${product.name.en}, close-up of the material`, ar: `${product.name.ar}، صورة قريبة للخامة` })} />
                  ) : (
                    <Shoe
                      type={product.type}
                      parts={colorway.parts}
                      material={material}
                      view={view}
                      className={`w-full ${view === 'side' ? '-rotate-6' : ''} drop-shadow-[0_24px_24px_rgb(0_0_0/0.12)]`}
                      label={t({ en: `${product.name.en} in ${colorway.name.en}, ${view} view`, ar: `${product.name.ar} باللون ${colorway.name.ar}` })}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            )}
            <button
              type="button"
              onClick={() => {
                const addedNow = toggle(product.id);
                push(addedNow ? t({ en: 'Saved to wishlist', ar: 'تمت الإضافة للمفضلة' }) : t({ en: 'Removed from wishlist', ar: 'تمت الإزالة من المفضلة' }), t(product.name));
              }}
              aria-pressed={liked}
              aria-label={t({ en: 'Save to wishlist', ar: 'حفظ في المفضلة' })}
              className={`absolute end-4 top-4 grid size-12 place-items-center rounded-full bg-paper ${liked ? 'text-orange' : 'hover:text-orange'}`}
            >
              <Icon name="heart" fill={liked ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3" role="group" aria-label={t({ en: 'Product views', ar: 'زوايا المنتج' })}>
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setView(v.id)}
                aria-pressed={view === v.id}
                className={`grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl bg-white transition-shadow ${view === v.id ? 'shadow-[inset_0_0_0_2px_var(--color-ink)]' : 'hover:shadow-[inset_0_0_0_1.5px_var(--color-line)]'}`}
              >
                <span className="sr-only">{t(v.name)}</span>
                {v.id === 'detail' ? (
                  <Shoe type={product.type} parts={colorway.parts} material={material} className="w-[220%] max-w-none translate-x-[20%]" />
                ) : (
                  <Shoe type={product.type} parts={colorway.parts} material={material} view={v.id} className="w-[84%]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="light">{t(category.name)}</Badge>
            {product.category === 'special' && <Badge tone="peach">{t({ en: 'Special size', ar: 'مقاس خاص' })}</Badge>}
          </div>
          <h1 className="text-h1 mt-4">{t(product.name)}</h1>
          <p className="mt-4 text-3xl font-extrabold">
            <AnimatedNumber value={price} format={sar} />
          </p>
          <p className="mt-1 text-sm text-soft">{t({ en: 'Price before VAT. Made to order.', ar: 'السعر قبل الضريبة. يُصنع عند الطلب.' })}</p>
          <p className="text-lead mt-6 text-soft">{t(product.description)}</p>

          <div className="mt-8 grid gap-7">
            <div>
              <p className="mb-3 font-bold">
                {t({ en: 'Color', ar: 'اللون' })}: <span className="font-normal text-soft">{t(colorway.name)}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {product.colorways.map((c, i) => (
                  <button
                    key={c.name.en}
                    type="button"
                    onClick={() => setWay(i)}
                    aria-pressed={i === way}
                    aria-label={t(c.name)}
                    className={`grid h-16 w-20 place-items-center rounded-2xl bg-white transition-shadow ${i === way ? 'shadow-[inset_0_0_0_2px_var(--color-ink)]' : 'shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-soft)]'}`}
                  >
                    <Shoe type={product.type} parts={c.parts} material={material} className="w-[86%]" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 font-bold">{t({ en: 'Material', ar: 'الخامة' })}</p>
              <div className="grid grid-cols-2 gap-2.5">
                {MATERIALS.filter((m) => product.materials.includes(m.id)).map((m) => (
                  <Choice key={m.id} selected={material === m.id} onSelect={() => setMaterial(m.id)}>
                    <span className="block font-bold">{t(m.name)}</span>
                    <span className="text-sm text-soft">{MATERIAL_PRICE[m.id] ? `+${sar(MATERIAL_PRICE[m.id])}` : t({ en: 'Included', ar: 'ضمن السعر' })}</span>
                  </Choice>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="font-bold" id="size-label">
                  {t({ en: 'Size (EU)', ar: 'المقاس (أوروبي)' })}
                </p>
                <button type="button" onClick={() => setGuide(true)} className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:text-orange">
                  <Icon name="ruler" size={16} />
                  {t({ en: 'Size guide', ar: 'دليل المقاسات' })}
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-8" role="radiogroup" aria-labelledby="size-label">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={size === s}
                    onClick={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                    className={`relative h-12 rounded-xl text-sm font-bold transition-[box-shadow,background-color] ${size === s ? 'bg-ink text-white' : 'bg-white shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]'}`}
                  >
                    {s}
                    {isExtraSize(s) && <span className="absolute end-1 top-1 size-1.5 rounded-full bg-orange" aria-hidden="true" />}
                  </button>
                ))}
              </div>
              <p className={`mt-2 text-sm ${sizeError ? 'font-semibold text-orange-dark' : 'text-soft'}`}>
                {sizeError
                  ? t({ en: 'Please choose a size.', ar: 'اختر المقاس لو سمحت.' })
                  : t({ en: `Sizes with a dot (36–38, 48–50) add ${sar(EXTRA_FIT_PRICE)}. Need a different size for each foot? Customize this shoe.`, ar: `المقاسات اللي عليها نقطة (36–38 و48–50) تضيف ${sar(EXTRA_FIT_PRICE)}. تبي مقاس مختلف لكل قدم؟ خصص الحذاء.` })}
              </p>
            </div>

            <div>
              <p className="mb-3 font-bold">{t({ en: 'Width', ar: 'العرض' })}</p>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {WIDTHS.filter((w) => product.widths.includes(w.id)).map((w) => (
                  <Choice key={w.id} selected={width === w.id} onSelect={() => setWidth(w.id)} className="text-center">
                    <span className="block font-bold">{t(w.name)}</span>
                    {w.id === 'xwide' && <span className="text-xs text-soft">+{EXTRA_FIT_PRICE}</span>}
                  </Choice>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button size="lg" onClick={addToCart}>
                <Icon name="bag" size={20} />
                {t({ en: 'Add to cart', ar: 'أضف للسلة' })}
              </Button>
              <Button size="lg" variant="ghost" onClick={() => navigate('/customize', { state: { design } })}>
                <Icon name="palette" size={20} />
                {t({ en: 'Customize this shoe', ar: 'خصّص هذا الحذاء' })}
              </Button>
            </div>

            <ul className="grid gap-3 rounded-[var(--radius-card)] bg-white p-5">
              {[
                { icon: 'truck' as const, text: { en: 'Free delivery on orders over SAR 500. Arrives in 2–3 weeks.', ar: 'توصيل مجاني للطلبات فوق 500 ر.س. يوصلك خلال 2–3 أسابيع.' } },
                { icon: 'factory' as const, text: { en: 'Made to order by our partner factory.', ar: 'يُصنع عند الطلب في مصنعنا الشريك.' } },
                { icon: 'shield' as const, text: { en: 'Free size exchange within 14 days.', ar: 'استبدال المقاس مجانًا خلال 14 يوم.' } },
              ].map((row) => (
                <li key={row.text.en} className="flex items-start gap-3 text-sm">
                  <Icon name={row.icon} size={20} className="mt-0.5 shrink-0 text-orange" />
                  {t(row.text)}
                </li>
              ))}
            </ul>

            <div className="divide-y divide-line rounded-[var(--radius-card)] bg-white">
              {[
                { id: 'about', title: { en: 'Material details', ar: 'تفاصيل الخامة' }, body: MATERIALS.find((m) => m.id === material)!.note },
                { id: 'care', title: { en: 'Care', ar: 'العناية' }, body: MATERIALS.find((m) => m.id === material)!.care },
                { id: 'features', title: { en: 'Features', ar: 'المميزات' }, body: { en: product.highlights.map((h) => h.en).join(' · '), ar: product.highlights.map((h) => h.ar).join(' · ') } },
              ].map((row) => (
                <div key={row.id}>
                  <h2>
                    <button type="button" onClick={() => setOpenMat(openMat === row.id ? null : row.id)} aria-expanded={openMat === row.id} className="flex w-full items-center justify-between px-5 py-4 text-start font-bold">
                      {t(row.title)}
                      <Icon name="chevronDown" size={18} className={`transition-transform ${openMat === row.id ? 'rotate-180' : ''}`} />
                    </button>
                  </h2>
                  {openMat === row.id && <p className="px-5 pb-5 text-soft">{t(row.body)}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-x mt-24">
          <SectionHead title={t({ en: 'You may also like', ar: 'قد يعجبك أيضًا' })} />
          <ul className="grid grid-cols-1 gap-x-5 gap-y-10 min-[440px]:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Modal open={guide} onClose={() => setGuide(false)} title={t({ en: 'Size guide', ar: 'دليل المقاسات' })} wide>
        <div className="grid gap-6 md:grid-cols-[1fr_1.3fr]">
          <div className="grid content-start gap-4">
            <h3 className="font-bold">{t({ en: 'How to measure', ar: 'طريقة القياس' })}</h3>
            <MeasureSteps />
            <p className="rounded-2xl bg-paper p-4 text-sm">{t({ en: 'Not sure? Get a free foot scan in our Riyadh studio.', ar: 'مو متأكد؟ سوّ قياس قدم مجاني في معرضنا بالرياض.' })}</p>
          </div>
          <SizeTable />
        </div>
      </Modal>
    </div>
  );
}
