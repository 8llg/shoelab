import { PageHero } from '../components/PageHero';
import { ProductCard } from '../components/ProductCard';
import { ButtonLink } from '../components/ui/Button';
import { products } from '../data/products';
import { useLang } from '../hooks/useLang';
import { useWishlist } from '../hooks/useWishlist';

export function Wishlist() {
  const { t } = useLang();
  const { ids } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));
  return (
    <>
      <PageHero title={t({ en: 'Your wishlist', ar: 'المفضلة' })} text={t({ en: 'Shoes you saved for later. Saved on this device.', ar: 'الأحذية اللي حفظتها لبعدين. محفوظة على هذا الجهاز.' })} />
      <section className="container-x pb-24">
        {saved.length === 0 ? (
          <div className="grid justify-items-center gap-4 rounded-[var(--radius-card)] bg-white px-6 py-20 text-center">
            <p className="text-h3">{t({ en: 'Nothing saved yet', ar: 'ما حفظت شي للحين' })}</p>
            <p className="text-soft">{t({ en: 'Tap the heart on any shoe to save it here.', ar: 'اضغط القلب على أي حذاء عشان تحفظه هنا.' })}</p>
            <ButtonLink to="/shop">{t({ en: 'Browse shoes', ar: 'تصفح الأحذية' })}</ButtonLink>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-x-5 gap-y-10 min-[440px]:grid-cols-2 lg:grid-cols-4">
            {saved.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
