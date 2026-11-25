import { useState, type FormEvent, type ReactNode } from 'react';
import { PROMO_CODE, type L } from '../data/catalog';
import { useCart, type Totals } from '../hooks/useCart';
import { useLang } from '../hooks/useLang';
import { Icon } from './ui/Icon';

export function TotalsBox({ totals, children, deliveryLabel }: { totals: Totals; children?: ReactNode; deliveryLabel?: L }) {
  const { t, sar } = useLang();
  const { promo, applyPromo, removePromo } = useCart();
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    if (applyPromo(code)) {
      setMsg({ ok: true, text: t({ en: '10% off applied.', ar: 'تم تطبيق خصم 10%.' }) });
      setCode('');
    } else {
      setMsg({ ok: false, text: t({ en: 'This code is not valid.', ar: 'الكود غير صحيح.' }) });
    }
  };

  const row = (label: ReactNode, value: ReactNode, strong = false) => (
    <div className={`flex items-center justify-between gap-4 ${strong ? 'text-lg font-extrabold' : ''}`}>
      <dt className={strong ? '' : 'text-soft'}>{label}</dt>
      <dd className="tabular font-semibold">{value}</dd>
    </div>
  );

  return (
    <div className="grid gap-5 rounded-[var(--radius-card)] bg-white p-6">
      <h2 className="text-lg font-extrabold">{t({ en: 'Order summary', ar: 'ملخص الطلب' })}</h2>
      <form onSubmit={submit} className="grid gap-2">
        <label htmlFor="promo" className="text-sm font-bold">
          {t({ en: 'Promo code', ar: 'كود الخصم' })}
        </label>
        {promo ? (
          <div className="flex items-center justify-between rounded-[var(--radius-field)] bg-success/10 px-4 py-3 text-sm font-bold text-success">
            <span className="inline-flex items-center gap-2">
              <Icon name="check" size={16} />
              {PROMO_CODE} · {t({ en: '10% off', ar: 'خصم 10%' })}
            </span>
            <button type="button" onClick={removePromo} className="text-ink underline underline-offset-4">
              {t({ en: 'Remove', ar: 'إزالة' })}
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              id="promo"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t({ en: 'Enter code', ar: 'اكتب الكود' })}
              dir="ltr"
              className="h-11 min-w-0 flex-1 rounded-[var(--radius-field)] bg-paper px-4 uppercase placeholder:normal-case focus:outline-none focus:shadow-[inset_0_0_0_2px_var(--color-orange)]"
            />
            <button type="submit" className="h-11 rounded-full bg-ink px-5 text-sm font-bold text-white hover:bg-card">
              {t({ en: 'Apply', ar: 'تطبيق' })}
            </button>
          </div>
        )}
        {msg && !promo && <p className={`text-sm font-semibold ${msg.ok ? 'text-success' : 'text-orange-dark'}`}>{msg.text}</p>}
        {!promo && <p className="text-xs text-soft">{t({ en: 'Demo code: STUDENT10', ar: 'كود تجريبي: STUDENT10' })}</p>}
      </form>
      <dl className="grid gap-2.5 border-t border-line pt-5 text-[0.95rem]">
        {row(t({ en: 'Subtotal', ar: 'المجموع الفرعي' }), sar(totals.subtotal))}
        {totals.discount > 0 && row(t({ en: 'Discount (STUDENT10)', ar: 'الخصم (STUDENT10)' }), `−${sar(totals.discount)}`)}
        {row(deliveryLabel ? t(deliveryLabel) : t({ en: 'Delivery', ar: 'التوصيل' }), totals.delivery === 0 ? t({ en: 'Free', ar: 'مجاني' }) : sar(totals.delivery))}
        {row(t({ en: 'VAT (15%)', ar: 'ضريبة القيمة المضافة (15%)' }), sar(totals.vat))}
        <div className="my-1 border-t border-line" />
        {row(t({ en: 'Total', ar: 'الإجمالي' }), sar(totals.total), true)}
      </dl>
      {children}
    </div>
  );
}
