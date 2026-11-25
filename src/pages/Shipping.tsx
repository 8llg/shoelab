import { PageHero } from '../components/PageHero';
import { Icon, type IconName } from '../components/ui/Icon';
import { EXPRESS_DELIVERY, FREE_DELIVERY_FROM, STANDARD_DELIVERY } from '../data/catalog';
import { useLang } from '../hooks/useLang';

export function Shipping() {
  const { t, sar } = useLang();
  const blocks: { icon: IconName; title: { en: string; ar: string }; items: { en: string; ar: string }[] }[] = [
    {
      icon: 'truck',
      title: { en: 'Delivery', ar: 'التوصيل' },
      items: [
        { en: `Standard: 2–3 weeks. Free on orders over ${sar(FREE_DELIVERY_FROM)}, otherwise ${sar(STANDARD_DELIVERY)}.`, ar: `عادي: 2–3 أسابيع. مجاني للطلبات فوق ${sar(FREE_DELIVERY_FROM)}، وإلا ${sar(STANDARD_DELIVERY)}.` },
        { en: `Express making and delivery: 10–14 days for ${sar(EXPRESS_DELIVERY)}.`, ar: `صناعة وتوصيل سريع: 10–14 يوم بـ ${sar(EXPRESS_DELIVERY)}.` },
        { en: 'We deliver to all main cities in Saudi Arabia.', ar: 'نوصل لكل المدن الرئيسية في السعودية.' },
        { en: 'You get a tracking link when your shoes ship.', ar: 'يوصلك رابط تتبع لما ينشحن حذاءك.' },
      ],
    },
    {
      icon: 'rotate',
      title: { en: 'Exchanges', ar: 'الاستبدال' },
      items: [
        { en: 'Wrong size? We remake it in your new size for free within 14 days.', ar: 'المقاس غلط؟ نعيد صناعته بمقاسك الجديد مجانًا خلال 14 يوم.' },
        { en: 'Shoes must be clean and not worn outside.', ar: 'لازم يكون الحذاء نظيف وما انلبس برا.' },
      ],
    },
    {
      icon: 'shield',
      title: { en: 'Returns', ar: 'الإرجاع' },
      items: [
        { en: 'Custom designs are made just for you, so we can only refund them if there is a defect.', ar: 'التصاميم المخصصة مصنوعة لك أنت، فما نقدر نسترجع مبلغها إلا إذا فيها عيب.' },
        { en: 'Shop items in standard sizes can be returned within 14 days.', ar: 'منتجات المتجر بالمقاسات العادية تنرجع خلال 14 يوم.' },
        { en: 'Every pair has a 6-month warranty for making defects.', ar: 'كل زوج عليه ضمان 6 شهور ضد عيوب التصنيع.' },
      ],
    },
  ];
  return (
    <>
      <PageHero eyebrow={t({ en: 'Help', ar: 'المساعدة' })} title={t({ en: 'Shipping & returns', ar: 'الشحن والإرجاع' })} text={t({ en: 'Clear and simple rules, made for custom shoes.', ar: 'قواعد واضحة وبسيطة، مصممة للأحذية المخصصة.' })} />
      <section className="container-x grid gap-5 pb-24 md:grid-cols-3">
        {blocks.map((b) => (
          <article key={b.title.en} className="rounded-[var(--radius-card)] bg-white p-7">
            <span className="grid size-12 place-items-center rounded-2xl bg-orange/10 text-orange">
              <Icon name={b.icon} />
            </span>
            <h2 className="text-h3 mt-5">{t(b.title)}</h2>
            <ul className="mt-4 grid gap-3">
              {b.items.map((i) => (
                <li key={i.en} className="flex gap-2.5 text-soft">
                  <Icon name="check" size={18} className="mt-1 shrink-0 text-orange" />
                  {t(i)}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}
