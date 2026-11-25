import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { ButtonLink } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { useLang } from '../hooks/useLang';

const QUESTIONS = [
  {
    q: { en: 'How long does it take to get my shoes?', ar: 'كم ياخذ وقت عشان يوصلني الحذاء؟' },
    a: { en: 'Every pair is made to order. Standard delivery takes 2–3 weeks. Express takes 10–14 days.', ar: 'كل زوج يُصنع عند الطلب. التوصيل العادي ياخذ 2–3 أسابيع، والسريع 10–14 يوم.' },
  },
  {
    q: { en: 'Can I order a different size for each foot?', ar: 'أقدر أطلب مقاس مختلف لكل قدم؟' },
    a: { en: 'Yes. In the studio you can pick a left size and a right size. There is no extra cost for different sizes.', ar: 'أكيد. في الاستوديو تختار مقاس للقدم اليسرى ومقاس لليمنى، وما فيه تكلفة إضافية لاختلاف المقاس.' },
  },
  {
    q: { en: 'Why do some sizes cost SAR 99 more?', ar: 'ليش بعض المقاسات تزيد 99 ر.س؟' },
    a: { en: 'Sizes 36–38, 48–50 and Extra Wide need special lasts and extra work. We add SAR 99 once per pair.', ar: 'المقاسات 36–38 و48–50 والعريض جدًا تحتاج قوالب خاصة وشغل إضافي، فنضيف 99 ر.س مرة وحدة للزوج.' },
  },
  {
    q: { en: 'How do I know my size?', ar: 'كيف أعرف مقاسي؟' },
    a: { en: 'Use our size guide, or visit the studio for a free foot scan that measures both feet.', ar: 'استخدم دليل المقاسات، أو زُر المعرض لقياس مجاني للقدمين.' },
  },
  {
    q: { en: 'Can I return custom shoes?', ar: 'أقدر أرجع الحذاء المخصص؟' },
    a: { en: 'If the size is wrong, we exchange it for free within 14 days. Custom designs cannot be returned for a refund unless there is a defect.', ar: 'إذا كان المقاس غلط نبدله مجانًا خلال 14 يوم. التصاميم المخصصة ما تنرجع إلا إذا فيها عيب.' },
  },
  {
    q: { en: 'Which payment methods do you accept?', ar: 'وش طرق الدفع المتاحة؟' },
    a: { en: 'Card, Apple Pay, Mada and Tabby. This website is a demo, so no real payment is taken.', ar: 'البطاقة وApple Pay ومدى وتابي. هذا الموقع تجريبي، فما يتم أخذ أي مبلغ حقيقي.' },
  },
  {
    q: { en: 'Where are the shoes made?', ar: 'وين تنصنع الأحذية؟' },
    a: { en: 'We design in Riyadh. Our partner factories in Turkey, Portugal and Italy make the shoes.', ar: 'نصمم في الرياض، ومصانعنا الشريكة في تركيا والبرتغال وإيطاليا تصنع الأحذية.' },
  },
  {
    q: { en: 'Do you have a promo code?', ar: 'عندكم كود خصم؟' },
    a: { en: 'Students can use STUDENT10 for 10% off. It is a demo code for this website.', ar: 'الطلاب يقدرون يستخدمون STUDENT10 لخصم 10%. هو كود تجريبي لهذا الموقع.' },
  },
];

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero eyebrow={t({ en: 'Help', ar: 'المساعدة' })} title={t({ en: 'Frequently asked questions', ar: 'الأسئلة الشائعة' })} text={t({ en: 'Quick answers about sizes, delivery and custom orders.', ar: 'إجابات سريعة عن المقاسات والتوصيل والطلبات المخصصة.' })} />
      <section className="container-x pb-24">
        <div className="mx-auto max-w-3xl divide-y divide-line rounded-[var(--radius-card)] bg-white">
          {QUESTIONS.map((item, i) => (
            <div key={item.q.en}>
              <h2>
                <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`faq-${i}`} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-start text-lg font-bold">
                  {t(item.q)}
                  <span className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors ${open === i ? 'bg-orange text-white' : 'bg-paper'}`}>
                    <Icon name={open === i ? 'minus' : 'plus'} size={18} />
                  </span>
                </button>
              </h2>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
                    <p className="px-6 pb-6 text-soft">{t(item.a)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] bg-ink p-7 text-white">
          <p className="text-lg font-bold">{t({ en: 'Still have a question?', ar: 'عندك سؤال ثاني؟' })}</p>
          <ButtonLink to="/contact">{t({ en: 'Contact us', ar: 'تواصل معنا' })}</ButtonLink>
        </div>
      </section>
    </>
  );
}
