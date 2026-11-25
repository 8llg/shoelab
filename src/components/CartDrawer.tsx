import { Link, useNavigate } from 'react-router-dom';
import { FREE_DELIVERY_FROM } from '../data/catalog';
import { useCart } from '../hooks/useCart';
import { useLang } from '../hooks/useLang';
import { DesignSummary } from './DesignSummary';
import { Shoe } from './Shoe';
import { Button, ButtonLink } from './ui/Button';
import { Qty } from './ui/Bits';
import { Icon } from './ui/Icon';
import { Drawer } from './ui/Overlay';

export function CartDrawer() {
  const { items, drawer, setDrawer, setQty, remove, totals } = useCart();
  const { t, sar } = useLang();
  const navigate = useNavigate();
  const tot = totals();
  const left = Math.max(0, FREE_DELIVERY_FROM - tot.subtotal);
  const close = () => setDrawer(false);

  return (
    <Drawer
      open={drawer}
      onClose={close}
      title={t({ en: `Your cart (${tot.count})`, ar: `سلتك (${tot.count})` })}
      footer={
        items.length > 0 ? (
          <div className="grid gap-4">
            <div className="flex items-center justify-between text-lg font-extrabold">
              <span>{t({ en: 'Subtotal', ar: 'المجموع' })}</span>
              <span className="tabular">{sar(tot.subtotal)}</span>
            </div>
            <p className="-mt-2 text-sm text-soft">{t({ en: 'VAT and delivery are added at checkout.', ar: 'تُضاف الضريبة والتوصيل عند الدفع.' })}</p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="ghost"
                onClick={() => {
                  close();
                  navigate('/cart');
                }}
              >
                {t({ en: 'View cart', ar: 'عرض السلة' })}
              </Button>
              <Button
                onClick={() => {
                  close();
                  navigate('/checkout');
                }}
              >
                {t({ en: 'Checkout', ar: 'إتمام الطلب' })}
              </Button>
            </div>
          </div>
        ) : undefined
      }
    >
      {items.length === 0 ? (
        <div className="grid justify-items-center gap-4 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-paper">
            <Icon name="bag" size={28} />
          </span>
          <p className="text-lg font-bold">{t({ en: 'Your cart is empty', ar: 'سلتك فاضية' })}</p>
          <p className="max-w-xs text-soft">{t({ en: 'Find a shoe you like or design your own pair.', ar: 'اختر حذاء يعجبك أو صمّم زوجك الخاص.' })}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <span onClick={close}>
              <ButtonLink to="/shop" variant="ghost">
                {t({ en: 'Shop now', ar: 'تسوّق الآن' })}
              </ButtonLink>
            </span>
            <span onClick={close}>
              <ButtonLink to="/customize">{t({ en: 'Design your own', ar: 'صمّم حذاءك' })}</ButtonLink>
            </span>
          </div>
        </div>
      ) : (
        <div className="grid gap-5">
          <div className="rounded-2xl bg-paper p-4">
            <p className="text-sm font-semibold">
              {left > 0
                ? t({ en: `Add ${sar(left)} more for free delivery.`, ar: `أضف ${sar(left)} للحصول على توصيل مجاني.` })
                : t({ en: 'You get free delivery.', ar: 'التوصيل مجاني لطلبك.' })}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-orange transition-[width] duration-500" style={{ width: `${Math.min(100, (tot.subtotal / FREE_DELIVERY_FROM) * 100)}%` }} />
            </div>
          </div>
          <ul className="grid gap-5">
            {items.map((item) => (
              <li key={item.key} className="flex gap-4">
                <div className="grid size-24 shrink-0 place-items-center rounded-2xl bg-paper">
                  <Shoe type={item.design.type} parts={item.design.parts} material={item.design.material} className="w-[88%]" />
                </div>
                <div className="grid min-w-0 flex-1 gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      {item.productId ? (
                        <Link to={`/product/${item.productId}`} onClick={close} className="font-bold hover:text-orange">
                          {t(item.name)}
                        </Link>
                      ) : (
                        <p className="font-bold">{t(item.name)}</p>
                      )}
                    </div>
                    <p className="shrink-0 font-bold tabular">{sar(item.price * item.qty)}</p>
                  </div>
                  <DesignSummary design={item.design} compact />
                  <div className="flex items-center justify-between">
                    <Qty value={item.qty} onChange={(n) => setQty(item.key, n)} label={t({ en: 'Quantity', ar: 'الكمية' })} />
                    <button type="button" onClick={() => remove(item.key)} className="text-sm font-semibold text-soft underline-offset-4 hover:text-ink hover:underline">
                      {t({ en: 'Remove', ar: 'حذف' })}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Drawer>
  );
}
