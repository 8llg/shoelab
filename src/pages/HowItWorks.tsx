import type { ReactNode } from 'react';
import { PageHero } from '../components/PageHero';
import { Shoe } from '../components/Shoe';
import { Reveal } from '../components/ui/Bits';
import { ButtonLink } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { PALETTE } from '../data/catalog';
import { useLang } from '../hooks/useLang';

const P = { upper: '#FF5A1F', panel: '#FFFFFF', sole: '#FFFFFF', laces: '#FFFFFF', heel: '#1E1F23' };

function Frame({ children }: { children: ReactNode }) {
  return <div className="grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl bg-paper p-5">{children}</div>;
}

export function HowItWorks() {
  const { t } = useLang();
  const steps: { title: { en: string; ar: string }; text: { en: string; ar: string }; art: ReactNode }[] = [
    {
      title: { en: 'Visit the store or website', ar: 'زُر المعرض أو الموقع' },
      text: { en: 'Start online, or come to our Riyadh studio for help and a free foot scan.', ar: 'ابدأ أونلاين، أو تعال معرضنا بالرياض للمساعدة وقياس قدم مجاني.' },
      art: (
        <div className="grid w-full grid-cols-2 gap-3">
          <div className="grid aspect-[4/3] place-items-center rounded-xl bg-white">
            <Icon name="globe" size={40} className="text-orange" />
          </div>
          <div className="grid aspect-[4/3] place-items-center rounded-xl bg-ink text-white">
            <Icon name="pin" size={40} />
          </div>
        </div>
      ),
    },
    {
      title: { en: 'Choose the shoe type', ar: 'اختر نوع الحذاء' },
      text: { en: 'Casual, sneakers, running, comfort or formal.', ar: 'كاجوال أو سنيكرز أو جري أو راحة أو رسمي.' },
      art: (
        <div className="grid w-full grid-cols-3 gap-2">
          {(['casual', 'sneakers', 'formal'] as const).map((k) => (
            <Shoe key={k} type={k} parts={P} className="w-full" />
          ))}
        </div>
      ),
    },
    {
      title: { en: 'Pick your size and width', ar: 'اختر المقاس والعرض' },
      text: { en: 'A size for each foot, from EU 36 to 50, and four widths.', ar: 'مقاس لكل قدم من 36 إلى 50، وأربعة عروض.' },
      art: (
        <div className="flex flex-wrap justify-center gap-2">
          {[38, 41, 42, 44, 48].map((s) => (
            <span key={s} className={`grid size-12 place-items-center rounded-xl font-bold ${s === 42 ? 'bg-ink text-white' : 'bg-white'}`}>
              {s}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: { en: 'Pick materials and colors', ar: 'اختر الخامات والألوان' },
      text: { en: 'Canvas, suede, leather or Italian leather, in ten colors.', ar: 'كانفس أو شامواه أو جلد أو جلد إيطالي، بعشرة ألوان.' },
      art: (
        <div className="flex flex-wrap justify-center gap-2.5">
          {PALETTE.map((c) => (
            <span key={c.hex} className="size-9 rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)]" style={{ background: c.hex }} />
          ))}
        </div>
      ),
    },
    {
      title: { en: 'Add your design', ar: 'أضف لمستك' },
      text: { en: 'Put your initials on the heel and make it yours.', ar: 'حط حروف اسمك على الكعب وخله لك.' },
      art: <Shoe type="sneakers" parts={P} view="back" initials="SL" className="h-full" />,
    },
    {
      title: { en: 'Preview in 3D', ar: 'شوفه من كل الزوايا' },
      text: { en: 'See your shoe from the side, top and back before you order.', ar: 'شوف حذاءك من الجانب والأعلى والخلف قبل الطلب.' },
      art: (
        <div className="grid w-full grid-cols-3 items-center gap-2">
          <Shoe type="sneakers" parts={P} view="side" className="w-full" />
          <Shoe type="sneakers" parts={P} view="top" className="w-full" />
          <Shoe type="sneakers" parts={P} view="back" className="w-full" />
        </div>
      ),
    },
    {
      title: { en: 'Confirm your order', ar: 'أكّد طلبك' },
      text: { en: 'Pay with card, Apple Pay, Mada or Tabby.', ar: 'ادفع بالبطاقة أو Apple Pay أو مدى أو تابي.' },
      art: (
        <span className="grid size-20 place-items-center rounded-full bg-orange text-white">
          <Icon name="check" size={40} strokeWidth={2.5} />
        </span>
      ),
    },
    {
      title: { en: 'Made by our partner', ar: 'يصنعه شريكنا' },
      text: { en: 'A partner factory in Turkey, Portugal or Italy makes your pair.', ar: 'مصنع شريك في تركيا أو البرتغال أو إيطاليا يصنع زوجك.' },
      art: <Icon name="factory" size={72} className="text-ink" strokeWidth={1.4} />,
    },
    {
      title: { en: 'Check and deliver', ar: 'نفحصه ونوصله' },
      text: { en: 'We check every detail, then deliver in 2–3 weeks.', ar: 'نفحص كل تفصيل، ثم نوصله خلال 2–3 أسابيع.' },
      art: <Icon name="truck" size={72} className="text-orange" strokeWidth={1.4} />,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t({ en: 'How it works', ar: 'طريقة العمل' })}
        title={t({ en: 'From your idea to your feet in nine steps.', ar: 'من فكرتك لين رجلك في تسع خطوات.' })}
        text={t({ en: 'Simple, clear and made around you. Here is the full journey.', ar: 'بسيطة وواضحة ومصممة حولك. هذي الرحلة كاملة.' })}
      />
      <section className="container-x pb-24">
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title.en} delay={(i % 3) * 0.06}>
              <li className="h-full rounded-[var(--radius-card)] bg-white p-5">
                <Frame>{s.art}</Frame>
                <div className="mt-5 flex items-start gap-4 px-1">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink font-extrabold text-white">{i + 1}</span>
                  <div>
                    <h2 className="text-lg font-extrabold">{t(s.title)}</h2>
                    <p className="mt-1 text-soft">{t(s.text)}</p>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/customize" size="lg">
            {t({ en: 'Start designing', ar: 'ابدأ التصميم' })}
          </ButtonLink>
          <ButtonLink to="/store" size="lg" variant="ghost">
            {t({ en: 'Book a foot scan', ar: 'احجز قياس قدم' })}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
