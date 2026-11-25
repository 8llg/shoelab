import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { Logo } from './Logo';
import { Icon } from './ui/Icon';

const groups = [
  {
    title: { en: 'Shop', ar: 'تسوّق' },
    links: [
      { to: '/shop', label: { en: 'All shoes', ar: 'كل الأحذية' } },
      { to: '/shop?category=sneakers', label: { en: 'Custom Sneakers', ar: 'سنيكرز مخصص' } },
      { to: '/shop?category=running', label: { en: 'Sports & Running', ar: 'رياضة وجري' } },
      { to: '/shop?category=special', label: { en: 'Special Sizes', ar: 'مقاسات خاصة' } },
      { to: '/customize', label: { en: 'Design Your Own', ar: 'صمّم حذاءك' } },
    ],
  },
  {
    title: { en: 'Help', ar: 'المساعدة' },
    links: [
      { to: '/size-guide', label: { en: 'Size guide', ar: 'دليل المقاسات' } },
      { to: '/shipping', label: { en: 'Shipping & returns', ar: 'الشحن والإرجاع' } },
      { to: '/faq', label: { en: 'FAQ', ar: 'الأسئلة الشائعة' } },
      { to: '/contact', label: { en: 'Contact us', ar: 'تواصل معنا' } },
    ],
  },
  {
    title: { en: 'ShoeLab', ar: 'شو لاب' },
    links: [
      { to: '/about', label: { en: 'About us', ar: 'من نحن' } },
      { to: '/how-it-works', label: { en: 'How it works', ar: 'طريقة العمل' } },
      { to: '/store', label: { en: 'Visit the store', ar: 'زُر المعرض' } },
    ],
  },
];

const socials = [
  { name: 'tiktok' as const, label: 'TikTok' },
  { name: 'instagram' as const, label: 'Instagram' },
  { name: 'snapchat' as const, label: 'Snapchat' },
];

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-ink text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.3fr_2fr]">
        <div className="grid content-start gap-5">
          <Logo />
          <p className="max-w-xs text-lg font-bold">{t({ en: 'ShoeLab – Made for Your Feet. Designed by You.', ar: 'شو لاب – مصنوع لقدمك. ومن تصميمك.' })}</p>
          <ul className="flex gap-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label={s.label} className="grid size-11 place-items-center rounded-full bg-white/8 transition-colors hover:bg-orange">
                  <Icon name={s.name} size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title.en}>
              <h2 className="mb-4 text-sm font-bold text-mute">{t(g.title)}</h2>
              <ul className="grid gap-2.5">
                {g.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-white/85 transition-colors hover:text-peach">
                      {t(l.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-6 text-sm text-mute">
          <p>{t({ en: '© 2026 ShoeLab, Riyadh', ar: '© 2026 شو لاب، الرياض' })}</p>
          <p>{t({ en: 'Student project – demo store', ar: 'مشروع طلابي – متجر تجريبي' })}</p>
        </div>
      </div>
    </footer>
  );
}
