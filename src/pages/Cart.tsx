import { Link } from 'react-router-dom';
import { DesignSummary } from '../components/DesignSummary';
import { Shoe } from '../components/Shoe';
import { TotalsBox } from '../components/Summary';
import { Badge, Qty } from '../components/ui/Bits';
import { ButtonLink } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { FREE_DELIVERY_FROM } from '../data/catalog';
import { useCart } from '../hooks/useCart';
import { useLang } from '../hooks/useLang';

export function Cart() {
  const { items, setQty, remove, totals } = useCart();
  const { t, sar } = useLang();
  const tot = totals();

  if (items.length === 0) {
    return (
      <div className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
        <div className="grid justify-items-center gap-5">
          <span className="grid size-20 place-items-center rounded-full bg-white">
            <Icon name="bag" size={34} />
          </span>
          <h1 className="text-h2">{t({ en: 'Your cart is empty', ar: 'سلتك فاضية' })}</h1>
          <p className="max-w-md text-soft">{t({ en: 'Find a shoe you like in the shop, or design your own pair in the studio.', ar: 'اختر حذاء يعجبك من المتجر، أو صمّم زوجك في الاستوديو.' })}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink to="/shop" variant="ghost">
              {t({ en: 'Shop now', ar: 'تسوّق الآن' })}
            </ButtonLink>
            <ButtonLink to="/customize">{t({ en: 'Design your own', ar: 'صمّم حذاءك' })}</ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x pb-24 pt-10 sm:pt-14">
      <h1 className="text-h1">{t({ en: 'Your cart', ar: 'سلتك' })}</h1>
      <p className="mt-2 text-soft">{t({ en: `${tot.count} items`, ar: `${tot.count} منتجات` })}</p>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_400px]">
        <ul className="grid gap-4">
          {items.map((item) => (
            <li key={item.key} className="grid gap-5 rounded-[var(--radius-card)] bg-white p-5 sm:grid-cols-[180px_1fr] sm:p-6">
              <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-paper">
                <Shoe type={item.design.type} parts={item.design.parts} material={item.design.material} initials={item.design.initials} className="w-[90%]" />
              </div>
              <div className="grid gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    {item.custom && (
                      <Badge tone="peach" className="mb-2">
                        {t({ en: 'Your design', ar: 'تصميمك' })}
                      </Badge>
                    )}
                    <h2 className="text-lg font-bold">
                      {item.productId ? (
                        <Link to={`/product/${item.productId}`} className="hover:text-orange">
                          {t(item.name)}
                        </Link>
                      ) : (
                        t(item.name)
                      )}
                    </h2>
                  </div>
                  <p className="text-lg font-extrabold tabular">{sar(item.price * item.qty)}</p>
                </div>
                <DesignSummary design={item.design} />
                <div className="mt-1 flex items-center justify-between">
                  <Qty value={item.qty} onChange={(n) => setQty(item.key, n)} label={t({ en: 'Quantity', ar: 'الكمية' })} />
                  <button type="button" onClick={() => remove(item.key)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-soft hover:text-ink">
                    <Icon name="close" size={16} />
                    {t({ en: 'Remove', ar: 'حذف' })}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="grid gap-4 lg:sticky lg:top-24">
          <TotalsBox totals={tot}>
            <ButtonLink to="/checkout" size="lg" className="w-full">
              {t({ en: 'Go to checkout', ar: 'إتمام الطلب' })}
            </ButtonLink>
          </TotalsBox>
          <p className="flex items-center gap-2 px-2 text-sm text-soft">
            <Icon name="truck" size={18} />
            {tot.freeDelivery
              ? t({ en: 'Your order gets free delivery.', ar: 'طلبك يحصل على توصيل مجاني.' })
              : t({ en: `Free delivery from ${sar(FREE_DELIVERY_FROM)}.`, ar: `توصيل مجاني من ${sar(FREE_DELIVERY_FROM)}.` })}
          </p>
        </div>
      </div>
    </div>
  );
}
