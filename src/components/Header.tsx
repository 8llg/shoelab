import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useLang } from '../hooks/useLang';
import { useWishlist } from '../hooks/useWishlist';
import { Logo } from './Logo';
import { Drawer } from './ui/Overlay';
import { Icon } from './ui/Icon';
import { ButtonLink } from './ui/Button';

export const NAV = [
  { to: '/shop', label: { en: 'Shop', ar: 'المتجر' } },
  { to: '/customize', label: { en: 'Design Your Own', ar: 'صمّم حذاءك' } },
  { to: '/how-it-works', label: { en: 'How It Works', ar: 'طريقة العمل' } },
  { to: '/about', label: { en: 'About', ar: 'من نحن' } },
  { to: '/store', label: { en: 'Store', ar: 'المعرض' } },
];

export function Header({ dark }: { dark: boolean }) {
  const { t, toggle, lang } = useLang();
  const { totals, setDrawer } = useCart();
  const { ids } = useWishlist();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const count = totals().count;

  useEffect(() => setMenu(false), [location.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const shell = dark
    ? `text-white ${scrolled ? 'bg-ink/88 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-xl' : 'bg-ink'}`
    : `text-ink ${scrolled ? 'bg-paper/88 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl' : 'bg-paper'}`;
  const hover = dark ? 'hover:bg-white/10' : 'hover:bg-ink/6';

  return (
    <header className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${shell}`}>
      <div className="container-x flex h-[68px] items-center gap-4">
        <Logo />
        <nav aria-label={t({ en: 'Main', ar: 'القائمة الرئيسية' })} className="ms-8 hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-full px-3.5 py-2 text-[0.93rem] font-semibold transition-colors ${isActive ? (dark ? 'bg-white/12' : 'bg-ink/7') : `${dark ? 'text-white/75' : 'text-ink/70'} ${hover}`}`
                  }
                >
                  {t(item.label)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ms-auto flex items-center gap-1">
          <button type="button" onClick={toggle} className={`inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-2.5 text-sm font-bold sm:px-3 ${hover}`} aria-label={lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}>
            <Icon name="globe" size={18} />
            <span lang={lang === 'en' ? 'ar' : 'en'} className="hidden sm:inline">{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>
          <Link to="/wishlist" className={`relative grid size-11 place-items-center rounded-full ${hover}`} aria-label={t({ en: `Wishlist, ${ids.length} items`, ar: `المفضلة، ${ids.length} منتجات` })}>
            <Icon name="heart" />
            {ids.length > 0 && <span className="absolute end-1 top-1 grid min-w-[18px] place-items-center rounded-full bg-orange px-1 text-[11px] font-bold leading-[18px] text-white">{ids.length}</span>}
          </Link>
          <button type="button" onClick={() => setDrawer(true)} className={`relative grid size-11 place-items-center rounded-full ${hover}`} aria-label={t({ en: `Cart, ${count} items`, ar: `السلة، ${count} منتجات` })}>
            <Icon name="bag" />
            {count > 0 && <span className="absolute end-1 top-1 grid min-w-[18px] place-items-center rounded-full bg-orange px-1 text-[11px] font-bold leading-[18px] text-white">{count}</span>}
          </button>
          <span className="ms-2 hidden md:block">
            <ButtonLink to="/customize" size="sm">
              {t({ en: 'Design Your Own', ar: 'صمّم حذاءك' })}
            </ButtonLink>
          </span>
          <button type="button" onClick={() => setMenu(true)} className={`grid size-11 place-items-center rounded-full xl:hidden ${hover}`} aria-label={t({ en: 'Open menu', ar: 'فتح القائمة' })} aria-expanded={menu}>
            <Icon name="menu" />
          </button>
        </div>
      </div>
      <Drawer open={menu} onClose={() => setMenu(false)} title={t({ en: 'Menu', ar: 'القائمة' })}>
        <nav aria-label={t({ en: 'Mobile', ar: 'قائمة الجوال' })}>
          <ul className="grid gap-1">
            {[...NAV, { to: '/faq', label: { en: 'FAQ', ar: 'الأسئلة الشائعة' } }, { to: '/contact', label: { en: 'Contact', ar: 'تواصل معنا' } }].map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => `flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-bold ${isActive ? 'bg-paper' : 'hover:bg-paper'}`}>
                  {t(item.label)}
                  <Icon name="chevronRight" size={18} className="rtl:rotate-180" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink to="/customize" size="lg" className="mt-6 w-full">
          {t({ en: 'Design Your Own', ar: 'صمّم حذاءك' })}
        </ButtonLink>
      </Drawer>
    </header>
  );
}
