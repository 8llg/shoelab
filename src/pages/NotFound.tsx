import { Shoe } from '../components/Shoe';
import { ButtonLink } from '../components/ui/Button';
import { useLang } from '../hooks/useLang';

export function NotFound() {
  const { t } = useLang();
  return (
    <section className="container-x grid min-h-[70vh] place-items-center py-16 text-center">
      <div className="grid justify-items-center gap-5">
        <Shoe type="sneakers" parts={{ upper: '#FFB38F', panel: '#FFFFFF', sole: '#FFFFFF', laces: '#FF5A1F', heel: '#FF5A1F' }} className="w-64 rotate-[18deg]" />
        <p className="text-display text-orange">404</p>
        <h1 className="text-h2">{t({ en: 'This page walked away', ar: 'هذي الصفحة مشت وراحت' })}</h1>
        <p className="max-w-md text-soft">{t({ en: 'We could not find the page you are looking for.', ar: 'ما لقينا الصفحة اللي تدورها.' })}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink to="/">{t({ en: 'Back to home', ar: 'الرجوع للرئيسية' })}</ButtonLink>
          <ButtonLink to="/shop" variant="ghost">
            {t({ en: 'Shop shoes', ar: 'تسوّق الأحذية' })}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
