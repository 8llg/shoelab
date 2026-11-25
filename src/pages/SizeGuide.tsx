import { PageHero } from '../components/PageHero';
import { MeasureSteps, SizeTable } from '../components/SizeTable';
import { ButtonLink } from '../components/ui/Button';
import { WIDTHS } from '../data/catalog';
import { useLang } from '../hooks/useLang';

const WIDTH_TEXT = {
  narrow: { en: 'Slim feet that slide in normal shoes.', ar: 'للقدم النحيفة اللي تتحرك في الأحذية العادية.' },
  normal: { en: 'Most people. Our standard fit.', ar: 'لأغلب الناس. المقاس الأساسي عندنا.' },
  wide: { en: 'A little more room across the toes.', ar: 'مساحة أكبر شوي عند الأصابع.' },
  xwide: { en: 'Lots of room for wide or swollen feet. +SAR 99.', ar: 'مساحة كبيرة للقدم العريضة أو المتورمة. +99 ر.س.' },
};

export function SizeGuide() {
  const { t } = useLang();
  return (
    <>
      <PageHero eyebrow={t({ en: 'Help', ar: 'المساعدة' })} title={t({ en: 'Size guide', ar: 'دليل المقاسات' })} text={t({ en: 'Find your size in two minutes, or get a free foot scan in our studio.', ar: 'اعرف مقاسك في دقيقتين، أو خذ قياس مجاني في معرضنا.' })} />
      <section className="container-x grid items-start gap-8 pb-24 lg:grid-cols-[1fr_1.4fr]">
        <div className="grid gap-6">
          <div className="rounded-[var(--radius-card)] bg-white p-7">
            <h2 className="text-h3 mb-5">{t({ en: 'How to measure your foot', ar: 'طريقة قياس القدم' })}</h2>
            <MeasureSteps />
          </div>
          <div className="rounded-[var(--radius-card)] bg-white p-7">
            <h2 className="text-h3 mb-5">{t({ en: 'Widths', ar: 'العروض' })}</h2>
            <dl className="grid gap-4">
              {WIDTHS.map((w) => (
                <div key={w.id} className="flex gap-4">
                  <dt className="w-28 shrink-0 font-bold">{t(w.name)}</dt>
                  <dd className="text-soft">{t(WIDTH_TEXT[w.id])}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ButtonLink to="/store" variant="ghost">
            {t({ en: 'Book a free foot scan', ar: 'احجز قياس قدم مجاني' })}
          </ButtonLink>
        </div>
        <div className="rounded-[var(--radius-card)] bg-white p-4 sm:p-7">
          <h2 className="text-h3 mb-5 px-2 sm:px-0">{t({ en: 'Size chart', ar: 'جدول المقاسات' })}</h2>
          <SizeTable />
          <p className="mt-4 px-2 text-sm text-soft sm:px-0">{t({ en: 'Sizes marked +99 use special lasts. Between two sizes? Pick the bigger one.', ar: 'المقاسات المعلّمة بـ +99 تستخدم قوالب خاصة. بين مقاسين؟ اختر الأكبر.' })}</p>
        </div>
      </section>
    </>
  );
}
