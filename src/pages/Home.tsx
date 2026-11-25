import { motion } from 'framer-motion';
import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Shoe } from '../components/Shoe';
import { Badge, Reveal, SectionHead } from '../components/ui/Bits';
import { Button, ButtonLink } from '../components/ui/Button';
import { Icon, type IconName } from '../components/ui/Icon';
import { CATEGORIES, MATERIAL_PRICE, MATERIALS, TYPE_PRICE, type Category, type Parts, type ShoeType } from '../data/catalog';
import { bestSellers } from '../data/products';
import { useLang } from '../hooks/useLang';
import { useToast } from '../hooks/useToast';

const HERO_PARTS: Parts = { upper: '#FF5A1F', panel: '#FFFFFF', sole: '#FFFFFF', laces: '#FFFFFF', heel: '#1E1F23' };

const TILE: Record<Category, { type: ShoeType; parts: Parts; from: number }> = {
  sneakers: { type: 'sneakers', parts: { upper: '#FF5A1F', panel: '#FFFFFF', sole: '#FFFFFF', laces: '#FFFFFF', heel: '#1E1F23' }, from: TYPE_PRICE.sneakers },
  casual: { type: 'casual', parts: { upper: '#D9C3A0', panel: '#FFFFFF', sole: '#FFFFFF', laces: '#FFFFFF', heel: '#7A4B2A' }, from: TYPE_PRICE.casual },
  running: { type: 'running', parts: { upper: '#1F2E57', panel: '#FF5A1F', sole: '#FFFFFF', laces: '#FFFFFF', heel: '#FF5A1F' }, from: TYPE_PRICE.running },
  comfort: { type: 'comfort', parts: { upper: '#9A9EA6', panel: '#FFFFFF', sole: '#FFFFFF', laces: '#FFFFFF', heel: '#FF5A1F' }, from: TYPE_PRICE.comfort },
  formal: { type: 'formal', parts: { upper: '#7A4B2A', panel: '#5e3820', sole: '#1E1F23', laces: '#7A4B2A', heel: '#5e3820' }, from: TYPE_PRICE.formal },
  special: { type: 'sneakers', parts: { upper: '#1E1F23', panel: '#FFB38F', sole: '#FFFFFF', laces: '#FFFFFF', heel: '#FFB38F' }, from: TYPE_PRICE.casual + 99 },
};

const STEPS: { icon: IconName; title: { en: string; ar: string }; text: { en: string; ar: string } }[] = [
  { icon: 'sparkle', title: { en: 'Pick a style', ar: 'اختر الستايل' }, text: { en: 'Start from five shoe types.', ar: 'ابدأ من خمسة أنواع أحذية.' } },
  { icon: 'ruler', title: { en: 'Get your fit', ar: 'حدد مقاسك' }, text: { en: 'Size for each foot and your width.', ar: 'مقاس لكل قدم وعرض يناسبك.' } },
  { icon: 'palette', title: { en: 'Make it yours', ar: 'خلّه لك' }, text: { en: 'Colors, materials and your initials.', ar: 'ألوان وخامات وحروف اسمك.' } },
  { icon: 'truck', title: { en: 'We make & deliver', ar: 'نصنعه ونوصله' }, text: { en: 'At your door in 2–3 weeks.', ar: 'عند بابك خلال 2–3 أسابيع.' } },
];

const HIGHLIGHTS: { icon: IconName; title: { en: string; ar: string }; text: { en: string; ar: string } }[] = [
  { icon: 'ruler', title: { en: 'Made to your size', ar: 'مصنوع على مقاسك' }, text: { en: 'EU 36 to 50, four widths.', ar: 'من 36 إلى 50 وأربعة عروض.' } },
  { icon: 'scan', title: { en: 'Free foot scan', ar: 'قياس قدم مجاني' }, text: { en: 'In our Riyadh studio.', ar: 'في معرضنا بالرياض.' } },
  { icon: 'clock', title: { en: '2–3 week delivery', ar: 'توصيل خلال 2–3 أسابيع' }, text: { en: 'Made to order, just for you.', ar: 'يُصنع عند الطلب لك أنت.' } },
  { icon: 'truck', title: { en: 'Free delivery', ar: 'توصيل مجاني' }, text: { en: 'On orders over SAR 500.', ar: 'للطلبات فوق 500 ر.س.' } },
];

export function Home() {
  const { t, sar } = useLang();
  const { push } = useToast();
  const rail = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const scroll = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const rtl = document.documentElement.dir === 'rtl' ? -1 : 1;
    el.scrollBy({ left: dir * rtl * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(t({ en: 'Please enter a valid email.', ar: 'اكتب بريد إلكتروني صحيح.' }));
      return;
    }
    setError('');
    setEmail('');
    push(t({ en: 'You are on the list!', ar: 'تم اشتراكك!' }), t({ en: 'We will send you new drops and studio news.', ar: 'بنرسل لك الإصدارات الجديدة وأخبار المعرض.' }));
  };

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -end-40 top-10 size-[42rem] rounded-full bg-orange/20 blur-[120px]" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-8 pb-20 pt-10 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-20">
          <div className="order-2 lg:order-1">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-sm font-bold text-peach">
              <span className="size-2 rounded-full bg-orange" />
              {t({ en: 'Custom shoe studio · Riyadh', ar: 'استوديو أحذية مخصصة · الرياض' })}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }} className="text-display">
              {t({ en: 'Your style.', ar: 'ستايلك.' })}
              <br />
              {t({ en: 'Your size.', ar: 'مقاسك.' })}
              <br />
              <span className="text-orange">{t({ en: 'Your shoes.', ar: 'حذاءك.' })}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-lead mt-6 max-w-lg text-mute">
              {t({
                en: 'Design your own shoes in Riyadh. Pick the type, colors and materials, choose a size for each foot, and we make them just for you.',
                ar: 'صمّم حذاءك في الرياض. اختر النوع والألوان والخامات، وحدد مقاس كل قدم، وإحنا نصنعه لك أنت.',
              })}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/customize" size="lg">
                {t({ en: 'Design Your Own', ar: 'صمّم حذاءك' })}
                <Icon name="arrow" size={20} className="rtl:rotate-180" />
              </ButtonLink>
              <ButtonLink to="/shop" size="lg" variant="dark">
                {t({ en: 'Shop Now', ar: 'تسوّق الآن' })}
              </ButtonLink>
            </motion.div>
            <ul className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                [t({ en: 'EU 36–50', ar: '36–50' }), t({ en: 'Every size', ar: 'كل المقاسات' })],
                [t({ en: '4 widths', ar: '4 عروض' }), t({ en: 'Narrow to extra wide', ar: 'من ضيق لعريض جدًا' })],
                [t({ en: '2–3 weeks', ar: '2–3 أسابيع' }), t({ en: 'To your door', ar: 'لين بابك' })],
              ].map(([a, b]) => (
                <li key={a}>
                  <p className="text-xl font-extrabold">{a}</p>
                  <p className="text-sm text-mute">{b}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative order-1 px-2 py-6 sm:py-16 lg:order-2">
            <motion.div initial={{ opacity: 0, scale: 0.92, rotate: -14 }} animate={{ opacity: 1, scale: 1, rotate: -9 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                <Shoe type="sneakers" parts={HERO_PARTS} material="canvas" initials="SL" label={t({ en: 'An orange custom sneaker', ar: 'حذاء سنيكرز مخصص برتقالي' })} className="w-full drop-shadow-[0_50px_45px_rgb(0_0_0/0.55)]" />
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="absolute end-0 top-0 hidden rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md sm:block">
              <p className="text-xs text-mute">{t({ en: 'Left / Right', ar: 'يسار / يمين' })}</p>
              <p className="font-bold">EU 42 / 43</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.75, duration: 0.6 }} className="absolute bottom-0 start-0 hidden rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md sm:block">
              <p className="text-xs text-mute">{t({ en: 'Your price', ar: 'سعرك' })}</p>
              <p className="font-bold">{sar(TYPE_PRICE.sneakers)}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHead
            title={t({ en: 'Shop by category', ar: 'تسوّق حسب الفئة' })}
            text={t({ en: 'Six ways to start. Every shoe can be changed to fit you.', ar: 'ست طرق للبداية. وكل حذاء تقدر تعدله على مقاسك.' })}
            action={
              <ButtonLink to="/shop" variant="ghost">
                {t({ en: 'View all shoes', ar: 'كل الأحذية' })}
              </ButtonLink>
            }
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.05}>
                <Link to={`/shop?category=${c.id}`} className="group block overflow-hidden rounded-[var(--radius-card)] bg-white p-4 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] sm:p-7">
                  <div className="grid aspect-[16/9] place-items-center">
                    <Shoe type={TILE[c.id].type} parts={TILE[c.id].parts} className="w-full -rotate-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.06]" />
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-bold sm:text-xl">{t(c.name)}</h3>
                      <p className="mt-1 hidden text-sm text-soft sm:block">{t(c.blurb)}</p>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-orange">{t({ en: 'from', ar: 'من' })} {sar(TILE[c.id].from)}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <SectionHead center title={t({ en: 'How it works', ar: 'طريقة العمل' })} text={t({ en: 'Four simple steps from idea to your feet.', ar: 'أربع خطوات بسيطة من الفكرة لين رجلك.' })} />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title.en} delay={i * 0.08}>
                <li className="grid justify-items-center gap-3 text-center">
                  <span className="relative grid size-20 place-items-center rounded-full bg-paper text-orange">
                    <Icon name={s.icon} size={32} />
                    <span className="absolute -end-1 -top-1 grid size-7 place-items-center rounded-full bg-ink text-xs font-bold text-white">{i + 1}</span>
                  </span>
                  <h3 className="text-h3">{t(s.title)}</h3>
                  <p className="text-soft">{t(s.text)}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <ButtonLink to="/how-it-works" variant="ghost">
              {t({ en: 'See the full journey', ar: 'شوف الرحلة كاملة' })}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHead
            title={t({ en: 'Best sellers', ar: 'الأكثر مبيعًا' })}
            text={t({ en: 'The shoes people choose most. Change any of them in the studio.', ar: 'الأحذية الأكثر طلبًا. وتقدر تعدل أي واحد منها في الاستوديو.' })}
            action={
              <div className="flex gap-2">
                <button type="button" onClick={() => scroll(-1)} className="grid size-12 place-items-center rounded-full bg-white shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:bg-ink hover:text-white" aria-label={t({ en: 'Previous', ar: 'السابق' })}>
                  <Icon name="chevronLeft" className="rtl:rotate-180" />
                </button>
                <button type="button" onClick={() => scroll(1)} className="grid size-12 place-items-center rounded-full bg-white shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:bg-ink hover:text-white" aria-label={t({ en: 'Next', ar: 'التالي' })}>
                  <Icon name="chevronRight" className="rtl:rotate-180" />
                </button>
              </div>
            }
          />
        </div>
        <div ref={rail} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1.25rem,calc((100vw-1280px)/2))] pb-4">
          {bestSellers.map((p) => (
            <div key={p.id} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((1280px-60px)/4)]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge tone="peach">{t({ en: 'Made for every foot', ar: 'مصنوع لكل قدم' })}</Badge>
            <h2 className="text-h1 mt-5">{t({ en: 'No two feet are the same. Your shoes should not be either.', ar: 'ما فيه قدمين متشابهة. وحذاءك لازم يكون كذا.' })}</h2>
            <ul className="mt-10 grid gap-4">
              {[
                { title: { en: 'Extra sizes', ar: 'مقاسات إضافية' }, text: { en: 'From EU 36 to EU 50, built on the right last for each size.', ar: 'من 36 إلى 50، على القالب المناسب لكل مقاس.' } },
                { title: { en: 'Left and right sizes', ar: 'مقاس لكل قدم' }, text: { en: 'One foot bigger? Order a different size for each foot. No problem.', ar: 'قدم أكبر من الثانية؟ اطلب مقاس مختلف لكل قدم. عادي.' } },
                { title: { en: 'Four widths', ar: 'أربعة عروض' }, text: { en: 'Narrow, normal, wide and extra wide. Extra sizes add only SAR 99.', ar: 'ضيق وعادي وعريض وعريض جدًا. المقاسات الإضافية بـ 99 ر.س فقط.' } },
              ].map((f) => (
                <li key={f.title.en} className="flex gap-4 rounded-2xl bg-white/5 p-5">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-orange">
                    <Icon name="check" size={18} />
                  </span>
                  <div>
                    <h3 className="font-bold">{t(f.title)}</h3>
                    <p className="mt-1 text-mute">{t(f.text)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative grid gap-2 rounded-[2rem] bg-card p-8 sm:p-12">
            <div className="flex items-center justify-between text-sm text-mute">
              <span>{t({ en: 'Left · EU 41', ar: 'يسار · 41' })}</span>
              <span>{t({ en: 'Wide', ar: 'عريض' })}</span>
            </div>
            <Shoe type="sneakers" view="top" parts={{ upper: '#FF5A1F', panel: '#FFB38F', sole: '#FFFFFF', laces: '#FFFFFF', heel: '#1E1F23' }} className="w-[88%]" />
            <Shoe type="sneakers" view="top" parts={{ upper: '#FF5A1F', panel: '#FFB38F', sole: '#FFFFFF', laces: '#FFFFFF', heel: '#1E1F23' }} className="w-full" />
            <div className="flex items-center justify-between text-sm text-mute">
              <span>{t({ en: 'Right · EU 42', ar: 'يمين · 42' })}</span>
              <Badge tone="orange">{t({ en: 'Different sizes – no problem!', ar: 'مقاسات مختلفة – ولا يهمك!' })}</Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHead title={t({ en: 'Materials', ar: 'الخامات' })} text={t({ en: 'Four materials, from light canvas to premium Italian leather.', ar: 'أربع خامات، من الكانفس الخفيف للجلد الإيطالي الفاخر.' })} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MATERIALS.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.06}>
                <article className="h-full rounded-[var(--radius-card)] bg-white p-6">
                  <div className="grid aspect-[16/10] place-items-center rounded-2xl bg-paper">
                    <Shoe type={m.id === 'italian' || m.id === 'leather' ? 'formal' : 'sneakers'} material={m.id} parts={{ upper: '#7A4B2A', panel: '#5e3820', sole: m.id === 'canvas' || m.id === 'suede' ? '#FFFFFF' : '#1E1F23', laces: '#D9C3A0', heel: '#5e3820' }} className="w-[90%]" />
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold">{t(m.name)}</h3>
                    <span className="text-sm font-bold text-orange">{MATERIAL_PRICE[m.id] ? `+${MATERIAL_PRICE[m.id]}` : t({ en: 'Included', ar: 'ضمن السعر' })}</span>
                  </div>
                  <p className="mt-2 text-sm text-soft">{t(m.note)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title.en} className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-orange/10 text-orange">
                <Icon name={h.icon} />
              </span>
              <div>
                <h3 className="font-bold">{t(h.title)}</h3>
                <p className="text-sm text-soft">{t(h.text)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <div className="relative grid overflow-hidden rounded-[2rem] bg-orange text-white lg:grid-cols-[1.2fr_1fr]">
            <div className="relative z-10 p-8 sm:p-14">
              <h2 className="text-h1">{t({ en: 'Visit the ShoeLab studio', ar: 'زُر استوديو شو لاب' })}</h2>
              <p className="text-lead mt-4 max-w-md text-white/85">
                {t({ en: 'Riyadh Park Mall. Get a free foot scan, touch the materials and design with our team.', ar: 'الرياض بارك مول. قياس قدم مجاني، شوف الخامات بيدك، وصمّم مع فريقنا.' })}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink to="/store" variant="light" size="lg">
                  {t({ en: 'Plan your visit', ar: 'خطط لزيارتك' })}
                </ButtonLink>
                <span className="inline-flex items-center gap-2 font-semibold">
                  <Icon name="clock" size={20} />
                  {t({ en: 'Open daily 10 AM – 12 AM', ar: 'يوميًا من 10 ص إلى 12 م' })}
                </span>
              </div>
            </div>
            <div className="relative hidden min-h-[320px] lg:block">
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid size-72 place-items-center rounded-full bg-white/12">
                  <span className="grid size-48 place-items-center rounded-full bg-white/15">
                    <Icon name="scan" size={72} strokeWidth={1.4} />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div className="grid items-center gap-8 rounded-[2rem] bg-ink p-8 text-white sm:p-14 lg:grid-cols-2">
            <div>
              <h2 className="text-h2">{t({ en: 'Get new drops first', ar: 'كن أول من يعرف بالجديد' })}</h2>
              <p className="mt-3 text-mute">{t({ en: 'New colors, studio events and early access. No spam.', ar: 'ألوان جديدة وفعاليات المعرض ووصول مبكر. بدون إزعاج.' })}</p>
            </div>
            <form onSubmit={subscribe} noValidate className="grid gap-2">
              <label htmlFor="newsletter" className="sr-only">
                {t({ en: 'Email address', ar: 'البريد الإلكتروني' })}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t({ en: 'you@email.com', ar: 'you@email.com' })}
                  aria-invalid={error ? true : undefined}
                  className="h-14 flex-1 rounded-full bg-white/8 px-6 text-white placeholder:text-mute/70 shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.14)] focus:outline-none focus:shadow-[inset_0_0_0_2px_var(--color-orange)]"
                  dir="ltr"
                />
                <Button type="submit" size="lg">
                  {t({ en: 'Subscribe', ar: 'اشترك' })}
                </Button>
              </div>
              {error && <p className="ps-6 text-sm font-semibold text-peach">{error}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
