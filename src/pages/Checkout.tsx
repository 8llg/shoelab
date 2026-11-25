import { AnimatePresence, motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { DesignSummary } from '../components/DesignSummary';
import { Shoe } from '../components/Shoe';
import { TotalsBox } from '../components/Summary';
import { Button } from '../components/ui/Button';
import { Choice } from '../components/ui/Bits';
import { Input, Select, Textarea } from '../components/ui/Field';
import { Icon } from '../components/ui/Icon';
import { EXPRESS_DELIVERY, FREE_DELIVERY_FROM, STANDARD_DELIVERY, type L } from '../data/catalog';
import { useCart } from '../hooks/useCart';
import { useLang } from '../hooks/useLang';
import { writeStore } from '../hooks/storage';

type Ship = { name: string; phone: string; email: string; city: string; district: string; street: string; notes: string };
type Delivery = 'standard' | 'express';
type Pay = 'card' | 'applepay' | 'mada' | 'tabby';

export type SavedOrder = {
  number: string;
  date: string;
  name: string;
  city: string;
  delivery: Delivery;
  payment: Pay;
  count: number;
  total: number;
};

const STEPS: L[] = [
  { en: 'Shipping', ar: 'العنوان' },
  { en: 'Delivery', ar: 'التوصيل' },
  { en: 'Payment', ar: 'الدفع' },
  { en: 'Review', ar: 'المراجعة' },
];

export const CITIES: L[] = [
  { en: 'Riyadh', ar: 'الرياض' },
  { en: 'Jeddah', ar: 'جدة' },
  { en: 'Dammam', ar: 'الدمام' },
  { en: 'Makkah', ar: 'مكة المكرمة' },
  { en: 'Madinah', ar: 'المدينة المنورة' },
  { en: 'Khobar', ar: 'الخبر' },
  { en: 'Abha', ar: 'أبها' },
  { en: 'Qassim', ar: 'القصيم' },
];

export const PAYMENTS: { id: Pay; name: L }[] = [
  { id: 'card', name: { en: 'Card', ar: 'بطاقة' } },
  { id: 'applepay', name: { en: 'Apple Pay', ar: 'Apple Pay' } },
  { id: 'mada', name: { en: 'Mada', ar: 'مدى' } },
  { id: 'tabby', name: { en: 'Tabby', ar: 'تابي' } },
];

export const DELIVERIES: Record<Delivery, { name: L; time: L }> = {
  standard: { name: { en: 'Standard delivery', ar: 'توصيل عادي' }, time: { en: '2–3 weeks', ar: '2–3 أسابيع' } },
  express: { name: { en: 'Express making & delivery', ar: 'صناعة وتوصيل سريع' }, time: { en: '10–14 days', ar: '10–14 يوم' } },
};

export function Checkout() {
  const { items, totals, clear } = useCart();
  const { t, sar } = useLang();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [ship, setShip] = useState<Ship>({ name: '', phone: '', email: '', city: 'Riyadh', district: '', street: '', notes: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Ship, string>>>({});
  const [delivery, setDelivery] = useState<Delivery>('standard');
  const [pay, setPay] = useState<Pay | null>(null);
  const [placing, setPlacing] = useState(false);

  const base = totals();
  const deliveryCost = delivery === 'express' ? EXPRESS_DELIVERY : base.subtotal >= FREE_DELIVERY_FROM ? 0 : STANDARD_DELIVERY;
  const tot = totals(deliveryCost);

  if (items.length === 0 && !placing) return <Navigate to="/cart" replace />;

  const set = (k: keyof Ship) => (e: { target: { value: string } }) => setShip((s) => ({ ...s, [k]: e.target.value }));

  const submitShipping = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Ship, string>> = {};
    if (ship.name.trim().length < 2) next.name = t({ en: 'Please enter your full name.', ar: 'اكتب اسمك الكامل.' });
    if (!/^(05\d{8}|\+9665\d{8})$/.test(ship.phone.replace(/\s/g, ''))) next.phone = t({ en: 'Use a Saudi mobile number, like 05XXXXXXXX.', ar: 'اكتب رقم جوال سعودي مثل 05XXXXXXXX.' });
    if (!/^\S+@\S+\.\S+$/.test(ship.email)) next.email = t({ en: 'Please enter a valid email.', ar: 'اكتب بريد إلكتروني صحيح.' });
    if (!ship.district.trim()) next.district = t({ en: 'Please enter your district.', ar: 'اكتب اسم الحي.' });
    if (!ship.street.trim()) next.street = t({ en: 'Please enter your street and building.', ar: 'اكتب الشارع ورقم المبنى.' });
    setErrors(next);
    if (Object.keys(next).length === 0) setStep(1);
  };

  const place = () => {
    setPlacing(true);
    const number = `SL-${Math.floor(100000 + Math.random() * 900000)}`;
    const order: SavedOrder = {
      number,
      date: new Date().toISOString(),
      name: ship.name.trim().split(' ')[0],
      city: ship.city,
      delivery,
      payment: pay ?? 'card',
      count: tot.count,
      total: tot.total,
    };
    writeStore('shoelab-last-order', order);
    window.setTimeout(() => {
      clear();
      navigate(`/order/${number}`, { replace: true });
    }, 700);
  };

  const city = CITIES.find((c) => c.en === ship.city) ?? CITIES[0];

  return (
    <div className="container-x pb-24 pt-10 sm:pt-14">
      <h1 className="text-h1">{t({ en: 'Checkout', ar: 'إتمام الطلب' })}</h1>
      <ol className="mt-8 grid grid-cols-4 gap-2" aria-label={t({ en: 'Checkout steps', ar: 'خطوات الطلب' })}>
        {STEPS.map((s, i) => (
          <li key={s.en} aria-current={i === step ? 'step' : undefined}>
            <button type="button" disabled={i > step} onClick={() => i < step && setStep(i)} className="grid w-full gap-2 text-start disabled:cursor-default">
              <span className={`h-1.5 rounded-full transition-colors duration-300 ${i <= step ? 'bg-orange' : 'bg-line'}`} />
              <span className={`text-xs font-bold sm:text-sm ${i === step ? 'text-ink' : 'text-soft'}`}>
                <span className="hidden sm:inline">{i + 1}. </span>
                {t(s)}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_400px]">
        <div className="rounded-[var(--radius-card)] bg-white p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
              {step === 0 && (
                <form onSubmit={submitShipping} noValidate className="grid gap-5">
                  <h2 className="text-h3">{t({ en: 'Where should we send your shoes?', ar: 'وين نرسل حذاءك؟' })}</h2>
                  <Input label={t({ en: 'Full name', ar: 'الاسم الكامل' })} value={ship.name} onChange={set('name')} error={errors.name} autoComplete="name" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input label={t({ en: 'Mobile number', ar: 'رقم الجوال' })} value={ship.phone} onChange={set('phone')} error={errors.phone} inputMode="tel" autoComplete="tel" placeholder="05XXXXXXXX" dir="ltr" />
                    <Input label={t({ en: 'Email', ar: 'البريد الإلكتروني' })} type="email" value={ship.email} onChange={set('email')} error={errors.email} autoComplete="email" dir="ltr" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Select label={t({ en: 'City', ar: 'المدينة' })} value={ship.city} onChange={set('city')}>
                      {CITIES.map((c) => (
                        <option key={c.en} value={c.en}>
                          {t(c)}
                        </option>
                      ))}
                    </Select>
                    <Input label={t({ en: 'District', ar: 'الحي' })} value={ship.district} onChange={set('district')} error={errors.district} />
                  </div>
                  <Input label={t({ en: 'Street and building number', ar: 'الشارع ورقم المبنى' })} value={ship.street} onChange={set('street')} error={errors.street} autoComplete="street-address" />
                  <Textarea label={t({ en: 'Delivery notes (optional)', ar: 'ملاحظات للتوصيل (اختياري)' })} value={ship.notes} onChange={set('notes')} />
                  <Button type="submit" size="lg" className="sm:justify-self-end">
                    {t({ en: 'Continue to delivery', ar: 'التالي: التوصيل' })}
                    <Icon name="arrow" size={18} className="rtl:rotate-180" />
                  </Button>
                </form>
              )}

              {step === 1 && (
                <div className="grid gap-5">
                  <h2 className="text-h3">{t({ en: 'Choose delivery', ar: 'اختر التوصيل' })}</h2>
                  <div className="grid gap-3" role="radiogroup" aria-label={t({ en: 'Delivery options', ar: 'خيارات التوصيل' })}>
                    {(['standard', 'express'] as Delivery[]).map((d) => {
                      const cost = d === 'express' ? EXPRESS_DELIVERY : base.subtotal >= FREE_DELIVERY_FROM ? 0 : STANDARD_DELIVERY;
                      return (
                        <Choice key={d} selected={delivery === d} onSelect={() => setDelivery(d)} className="flex items-center justify-between gap-4 p-5">
                          <span>
                            <span className="block font-bold">{t(DELIVERIES[d].name)}</span>
                            <span className="text-sm text-soft">{t(DELIVERIES[d].time)}</span>
                          </span>
                          <span className="font-bold">{cost === 0 ? t({ en: 'Free', ar: 'مجاني' }) : sar(cost)}</span>
                        </Choice>
                      );
                    })}
                  </div>
                  <p className="text-sm text-soft">{t({ en: `Standard delivery is free on orders over ${sar(FREE_DELIVERY_FROM)}.`, ar: `التوصيل العادي مجاني للطلبات فوق ${sar(FREE_DELIVERY_FROM)}.` })}</p>
                  <div className="flex flex-wrap justify-between gap-3">
                    <Button variant="ghost" onClick={() => setStep(0)}>
                      <Icon name="back" size={18} className="rtl:rotate-180" />
                      {t({ en: 'Back', ar: 'رجوع' })}
                    </Button>
                    <Button size="lg" onClick={() => setStep(2)}>
                      {t({ en: 'Continue to payment', ar: 'التالي: الدفع' })}
                      <Icon name="arrow" size={18} className="rtl:rotate-180" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-5">
                  <h2 className="text-h3">{t({ en: 'How would you like to pay?', ar: 'كيف تبي تدفع؟' })}</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {PAYMENTS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setPay(p.id);
                          setStep(3);
                        }}
                        className={`h-16 rounded-[var(--radius-field)] text-lg font-extrabold transition-shadow ${pay === p.id ? 'shadow-[inset_0_0_0_2px_var(--color-orange)]' : 'shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]'}`}
                      >
                        {t(p.name)}
                      </button>
                    ))}
                  </div>
                  <p className="flex items-start gap-2 rounded-2xl bg-paper p-4 text-sm text-soft">
                    <Icon name="shield" size={18} className="mt-0.5 shrink-0" />
                    {t({ en: 'This is a demo store. Choosing a method just continues. No payment details are asked for or taken.', ar: 'هذا متجر تجريبي. اختيار طريقة الدفع ينقلك للخطوة التالية فقط. ما نطلب أو نأخذ أي بيانات دفع.' })}
                  </p>
                  <Button variant="ghost" className="justify-self-start" onClick={() => setStep(1)}>
                    <Icon name="back" size={18} className="rtl:rotate-180" />
                    {t({ en: 'Back', ar: 'رجوع' })}
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-6">
                  <h2 className="text-h3">{t({ en: 'Review your order', ar: 'راجع طلبك' })}</h2>
                  <dl className="grid gap-4 sm:grid-cols-3">
                    {[
                      { label: { en: 'Ship to', ar: 'العنوان' }, value: `${ship.name} · ${ship.district}, ${t(city)}`, to: 0 },
                      { label: { en: 'Delivery', ar: 'التوصيل' }, value: `${t(DELIVERIES[delivery].name)} · ${t(DELIVERIES[delivery].time)}`, to: 1 },
                      { label: { en: 'Payment', ar: 'الدفع' }, value: t(PAYMENTS.find((p) => p.id === pay)?.name ?? PAYMENTS[0].name), to: 2 },
                    ].map((r) => (
                      <div key={r.label.en} className="rounded-2xl bg-paper p-4">
                        <dt className="flex items-center justify-between text-sm font-bold text-soft">
                          {t(r.label)}
                          <button type="button" onClick={() => setStep(r.to)} className="text-xs text-ink underline underline-offset-4">
                            {t({ en: 'Edit', ar: 'تعديل' })}
                          </button>
                        </dt>
                        <dd className="mt-1 font-semibold">{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <ul className="grid gap-4">
                    {items.map((item) => (
                      <li key={item.key} className="flex gap-4">
                        <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-paper">
                          <Shoe type={item.design.type} parts={item.design.parts} material={item.design.material} className="w-[88%]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-3">
                            <p className="font-bold">
                              {t(item.name)} <span className="font-normal text-soft">× {item.qty}</span>
                            </p>
                            <p className="font-bold tabular">{sar(item.price * item.qty)}</p>
                          </div>
                          <DesignSummary design={item.design} compact />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap justify-between gap-3">
                    <Button variant="ghost" onClick={() => setStep(2)}>
                      <Icon name="back" size={18} className="rtl:rotate-180" />
                      {t({ en: 'Back', ar: 'رجوع' })}
                    </Button>
                    <Button size="lg" onClick={place} disabled={placing}>
                      {placing ? t({ en: 'Placing order…', ar: 'جاري تأكيد الطلب…' }) : t({ en: `Place order · ${sar(tot.total)}`, ar: `تأكيد الطلب · ${sar(tot.total)}` })}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="lg:sticky lg:top-24">
          <TotalsBox totals={tot} deliveryLabel={step >= 1 ? DELIVERIES[delivery].name : undefined} />
        </div>
      </div>
    </div>
  );
}
