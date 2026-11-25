import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, MATERIALS, shoePrice } from '../data/catalog';
import { fromPrice, type Product } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useLang } from '../hooks/useLang';
import { useToast } from '../hooks/useToast';
import { useWishlist } from '../hooks/useWishlist';
import { Shoe } from './Shoe';
import { Badge } from './ui/Bits';
import { Icon } from './ui/Icon';

const NEW_AFTER = '2026-10-15';

export function ProductCard({ product }: { product: Product }) {
  const { t, sar } = useLang();
  const { add, setDrawer } = useCart();
  const { has, toggle } = useWishlist();
  const { push } = useToast();
  const [way, setWay] = useState(0);
  const colorway = product.colorways[way];
  const category = CATEGORIES.find((c) => c.id === product.category)!;
  const material = MATERIALS.find((m) => m.id === product.material)!;
  const liked = has(product.id);

  const quickAdd = () => {
    add({
      productId: product.id,
      name: product.name,
      custom: false,
      price: shoePrice(product.type, product.material, product.size, product.size, product.width),
      design: {
        type: product.type,
        category: product.category,
        parts: colorway.parts,
        material: product.material,
        sizeLeft: product.size,
        sizeRight: product.size,
        width: product.width,
        initials: '',
      },
    });
    push(t({ en: 'Added to cart', ar: 'تمت الإضافة للسلة' }), `${t(product.name)} · ${t({ en: `EU ${product.size}`, ar: `مقاس ${product.size}` })}`);
    setDrawer(true);
  };

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-white">
        <Link to={`/product/${product.id}`} className="block" aria-label={t(product.name)}>
          <div className="aspect-[4/3.4] p-6">
            <motion.div className="grid h-full place-items-center transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.07]">
              <Shoe type={product.type} parts={colorway.parts} material={product.material} className="w-full -rotate-6 drop-shadow-[0_16px_18px_rgb(0_0_0/0.14)]" />
            </motion.div>
          </div>
        </Link>
        <div className="pointer-events-none absolute start-4 top-4 flex gap-2">
          {product.added >= NEW_AFTER && <Badge tone="dark">{t({ en: 'New', ar: 'جديد' })}</Badge>}
          {product.category === 'special' && <Badge tone="peach">{t({ en: 'Special size', ar: 'مقاس خاص' })}</Badge>}
        </div>
        <button
          type="button"
          onClick={() => {
            const added = toggle(product.id);
            push(added ? t({ en: 'Saved to wishlist', ar: 'تمت الإضافة للمفضلة' }) : t({ en: 'Removed from wishlist', ar: 'تمت الإزالة من المفضلة' }), t(product.name));
          }}
          aria-pressed={liked}
          aria-label={liked ? t({ en: `Remove ${product.name.en} from wishlist`, ar: `إزالة ${product.name.ar} من المفضلة` }) : t({ en: `Save ${product.name.en} to wishlist`, ar: `حفظ ${product.name.ar} في المفضلة` })}
          className={`absolute end-3 top-3 grid size-11 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-colors ${liked ? 'text-orange' : 'text-ink hover:text-orange'}`}
        >
          <Icon name="heart" fill={liked ? 'currentColor' : 'none'} />
        </button>
        <button
          type="button"
          onClick={quickAdd}
          className="absolute inset-x-3 bottom-3 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink text-sm font-bold text-white opacity-100 transition-all duration-300 hover:bg-orange md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100"
        >
          <Icon name="plus" size={18} />
          {t({ en: `Quick add · EU ${product.size}`, ar: `إضافة سريعة · مقاس ${product.size}` })}
        </button>
      </div>
      <div className="mt-4 grid gap-1.5 px-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1.05rem] font-bold leading-tight">
            <Link to={`/product/${product.id}`} className="hover:text-orange">
              {t(product.name)}
            </Link>
          </h3>
          <p className="shrink-0 font-bold tabular">{sar(fromPrice(product))}</p>
        </div>
        <p className="text-sm text-soft">
          {t(category.name)} · {t(material.name)}
        </p>
        <div className="mt-1 flex items-center gap-2" role="group" aria-label={t({ en: 'Colors', ar: 'الألوان' })}>
          {product.colorways.map((c, i) => (
            <button
              key={c.name.en}
              type="button"
              onClick={() => setWay(i)}
              aria-label={t(c.name)}
              aria-pressed={i === way}
              className={`size-6 rounded-full transition-shadow ${i === way ? 'shadow-[0_0_0_2px_var(--color-paper),0_0_0_3.5px_var(--color-ink)]' : 'shadow-[inset_0_0_0_1px_rgb(0_0_0/0.18)]'}`}
              style={{ background: `linear-gradient(135deg, ${c.parts.upper} 50%, ${c.parts.panel} 50%)` }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
