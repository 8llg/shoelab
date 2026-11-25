import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ButtonLink } from '../components/ui/Button';
import { Icon, type IconName } from '../components/ui/Icon';
import { readStore } from '../hooks/storage';
import { useLang } from '../hooks/useLang';
import { CITIES, DELIVERIES, PAYMENTS, type SavedOrder } from './Checkout';

const TIMELINE: { icon: IconName; title: { en: string; ar: string }; text: { en: string; ar: string } }[] = [
  { icon: 'check', title: { en: 'Received', ar: 'تم الاستلام' }, text: { en: 'We have your order and design.', ar: 'وصلنا طلبك وتصميمك.' } },
  { icon: 'factory', title: { en: 'In production', ar: 'قيد التصنيع' }, text: { en: 'Our partner factory makes your pair.', ar: 'مصنعنا الشريك يصنع زوجك.' } },
  { icon: 'shield', title: { en: 'Quality check', ar: 'فحص الجودة' }, text: { en: 'We check every detail and size.', ar: 'نتأكد من كل تفصيل ومقاس.' } },
  { icon: 'truck', title: { en: 'Shipped', ar: 'تم الشحن' }, text: { en: 'On the way to your door.', ar: 'في الطريق لبابك.' } },
];

export function Confirmation() {
  const { number = '' } = useParams();
  const { t, sar, lang } = useLang();
  const order = readStore<SavedOrder | null>('shoelab-last-order', null);
  const match = order && order.number === number ? order : null;
  const eta = match ? new Date(new Date(match.date).getTime() + (match.delivery === 'express' ? 14 : 21) * 86400000) : null;

  return (
    <div className="container-x pb-24 pt-12 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <div className="grid justify-items-center gap-5 text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }} className="grid size-20 place-items-center rounded-full bg-orange text-white">
            <Icon name="check" size={40} strokeWidth={2.5} />
          </motion.span>
          <h1 className="text-h1">{match ? t({ en: `Thank you, ${match.name}!`, ar: `شكرًا ${match.name}!` }) : t({ en: 'Thank you!', ar: 'شكرًا لك!' })}</h1>
          <p className="text-lead max-w-xl text-soft">{t({ en: 'Your order is received. Our partner factory will make your shoes.', ar: 'وصلنا طلبك. مصنعنا الشريك بيصنع حذاءك.' })}</p>
          <p className="rounded-full bg-white px-5 py-2.5 font-bold">
            {t({ en: 'Order number', ar: 'رقم الطلب' })}: <span dir="ltr" className="text-orange">{number}</span>
          </p>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-4">
          {TIMELINE.map((s, i) => (
            <li key={s.title.en} className={`relative rounded-[var(--radius-card)] p-5 ${i === 0 ? 'bg-ink text-white' : 'bg-white'}`}>
              <span className={`grid size-10 place-items-center rounded-full ${i === 0 ? 'bg-orange' : 'bg-paper text-soft'}`}>
                <Icon name={s.icon} size={20} />
              </span>
              <p className="mt-4 font-bold">{t(s.title)}</p>
              <p className={`mt-1 text-sm ${i === 0 ? 'text-mute' : 'text-soft'}`}>{t(s.text)}</p>
              {i === 0 && <span className="absolute end-4 top-4 rounded-full bg-orange px-2 py-0.5 text-[11px] font-bold">{t({ en: 'Now', ar: 'الآن' })}</span>}
            </li>
          ))}
        </ol>

        {match && (
          <dl className="mt-8 grid gap-4 rounded-[var(--radius-card)] bg-white p-6 sm:grid-cols-2">
            {[
              [t({ en: 'Delivery to', ar: 'التوصيل إلى' }), t(CITIES.find((c) => c.en === match.city) ?? CITIES[0])],
              [t({ en: 'Delivery', ar: 'التوصيل' }), `${t(DELIVERIES[match.delivery].name)} · ${t(DELIVERIES[match.delivery].time)}`],
              [t({ en: 'Payment', ar: 'الدفع' }), t(PAYMENTS.find((p) => p.id === match.payment)!.name)],
              [t({ en: 'Order total', ar: 'إجمالي الطلب' }), sar(match.total)],
              [t({ en: 'Expected by', ar: 'الموعد المتوقع' }), eta ? eta.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''],
              [t({ en: 'Items', ar: 'عدد المنتجات' }), String(match.count)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-sm font-bold text-soft">{k}</dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        )}

        <p className="mt-6 text-center text-sm text-soft">{t({ en: 'Demo store – student project. No payment was taken.', ar: 'متجر تجريبي – مشروع طلابي. ما تم أخذ أي مبلغ.' })}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/shop" variant="ghost">
            {t({ en: 'Keep shopping', ar: 'كمّل التسوق' })}
          </ButtonLink>
          <ButtonLink to="/customize">{t({ en: 'Design another pair', ar: 'صمّم زوج ثاني' })}</ButtonLink>
        </div>
      </div>
    </div>
  );
}
