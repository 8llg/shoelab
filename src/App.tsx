import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Toaster } from './components/ui/Bits';
import { useLang } from './hooks/useLang';
import { Home } from './pages/Home';

const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Cart = lazy(() => import('./pages/Cart').then((m) => ({ default: m.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then((m) => ({ default: m.Checkout })));
const Confirmation = lazy(() => import('./pages/Confirmation').then((m) => ({ default: m.Confirmation })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Customize = lazy(() => import('./pages/Customize').then((m) => ({ default: m.Customize })));
const Faq = lazy(() => import('./pages/Faq').then((m) => ({ default: m.Faq })));
const HowItWorks = lazy(() => import('./pages/HowItWorks').then((m) => ({ default: m.HowItWorks })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));
const ProductPage = lazy(() => import('./pages/Product').then((m) => ({ default: m.ProductPage })));
const Shipping = lazy(() => import('./pages/Shipping').then((m) => ({ default: m.Shipping })));
const Shop = lazy(() => import('./pages/Shop').then((m) => ({ default: m.Shop })));
const SizeGuide = lazy(() => import('./pages/SizeGuide').then((m) => ({ default: m.SizeGuide })));
const Store = lazy(() => import('./pages/Store').then((m) => ({ default: m.Store })));
const Wishlist = lazy(() => import('./pages/Wishlist').then((m) => ({ default: m.Wishlist })));

const DARK = ['/', '/customize'];

const TITLES: Record<string, { en: string; ar: string }> = {
  '/': { en: 'ShoeLab – Design Your Own Shoes', ar: 'شو لاب – صمّم حذاءك' },
  '/shop': { en: 'Shop – ShoeLab', ar: 'المتجر – شو لاب' },
  '/customize': { en: 'Design Your Own – ShoeLab', ar: 'صمّم حذاءك – شو لاب' },
  '/cart': { en: 'Cart – ShoeLab', ar: 'السلة – شو لاب' },
  '/checkout': { en: 'Checkout – ShoeLab', ar: 'إتمام الطلب – شو لاب' },
  '/about': { en: 'About – ShoeLab', ar: 'من نحن – شو لاب' },
  '/how-it-works': { en: 'How It Works – ShoeLab', ar: 'طريقة العمل – شو لاب' },
  '/store': { en: 'Store – ShoeLab', ar: 'المعرض – شو لاب' },
  '/faq': { en: 'FAQ – ShoeLab', ar: 'الأسئلة الشائعة – شو لاب' },
  '/size-guide': { en: 'Size Guide – ShoeLab', ar: 'دليل المقاسات – شو لاب' },
  '/contact': { en: 'Contact – ShoeLab', ar: 'تواصل معنا – شو لاب' },
  '/shipping': { en: 'Shipping & Returns – ShoeLab', ar: 'الشحن والإرجاع – شو لاب' },
  '/wishlist': { en: 'Wishlist – ShoeLab', ar: 'المفضلة – شو لاب' },
};

export function App() {
  const location = useLocation();
  const { t } = useLang();
  const dark = DARK.includes(location.pathname);
  const studio = location.pathname === '/customize';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/product/')) return;
    const title = location.pathname.startsWith('/order/') ? { en: 'Order received – ShoeLab', ar: 'تم استلام الطلب – شو لاب' } : TITLES[location.pathname];
    document.title = title ? t(title) : t({ en: 'Page not found – ShoeLab', ar: 'الصفحة غير موجودة – شو لاب' });
  }, [location.pathname, t]);

  return (
    <div className={`flex min-h-dvh flex-col ${studio ? 'bg-ink' : 'bg-paper'}`}>
      <a href="#main" className="sr-only z-[100] rounded-full bg-orange px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
        {t({ en: 'Skip to content', ar: 'تخطَّ إلى المحتوى' })}
      </a>
      <Header dark={dark} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={location.pathname}
          className="flex-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
            <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:number" element={<Confirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/store" element={<Store />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      {!studio && <Footer />}
      <CartDrawer />
      <Toaster />
    </div>
  );
}
