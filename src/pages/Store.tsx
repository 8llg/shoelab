import { PageHero } from '../components/PageHero';
import { ButtonLink } from '../components/ui/Button';
import { Icon, type IconName } from '../components/ui/Icon';
import { useLang } from '../hooks/useLang';

const SERVICES: { icon: IconName; title: { en: string; ar: string }; text: { en: string; ar: string } }[] = [
  { icon: 'scan', title: { en: 'Free foot scan in store', ar: 'قياس قدم مجاني في المعرض' }, text: { en: 'Our scanner measures length and width of both feet in under a minute.', ar: 'جهازنا يقيس طول وعرض القدمين في أقل من دقيقة.' } },
  { icon: 'palette', title: { en: 'Material wall', ar: 'جدار الخامات' }, text: { en: 'Touch every material and see every color in real light.', ar: 'المس كل خامة وشوف كل لون على الطبيعة.' } },
  { icon: 'foot', title: { en: 'Try sample sizes', ar: 'جرّب المقاسات' }, text: { en: 'Try on sample pairs in every width before you order.', ar: 'جرّب أزواج تجريبية بكل العروض قبل الطلب.' } },
];

export function Store() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        eyebrow={t({ en: 'Visit us', ar: 'زورونا' })}
        title={t({ en: 'ShoeLab Studio, Riyadh Park Mall', ar: 'استوديو شو لاب، الرياض بارك مول' })}
        text={t({ en: 'Come and design with our team, get a free foot scan and feel the materials.', ar: 'تعال صمّم مع فريقنا، وخذ قياس قدم مجاني، وجرب الخامات بيدك.' })}
      />
      <section className="container-x grid gap-6 pb-24 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#e7e6e1]" role="img" aria-label={t({ en: 'Map showing the studio at Riyadh Park Mall (placeholder)', ar: 'خريطة توضح موقع المعرض في الرياض بارك مول (توضيحية)' })}>
          <svg viewBox="0 0 800 520" className="h-full min-h-[320px] w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="800" height="520" fill="#e7e6e1" />
            <g stroke="#ffffff" strokeLinecap="round">
              <path d="M-20 140 L820 90" strokeWidth="26" />
              <path d="M-20 360 L820 410" strokeWidth="34" />
              <path d="M220 -20 L280 540" strokeWidth="22" />
              <path d="M560 -20 L520 540" strokeWidth="18" />
              <path d="M-20 250 C200 230 400 280 820 240" strokeWidth="12" />
            </g>
            <g fill="#d8d7d0">
              <rect x="320" y="150" width="160" height="80" rx="12" />
              <rect x="40" y="170" width="140" height="60" rx="12" />
              <rect x="600" y="280" width="150" height="90" rx="12" />
              <rect x="300" y="290" width="190" height="50" rx="12" />
              <rect x="40" y="420" width="160" height="70" rx="12" />
              <rect x="600" y="130" width="160" height="70" rx="12" />
            </g>
            <rect x="330" y="160" width="140" height="60" rx="10" fill="#c9c8c0" />
            <circle cx="400" cy="190" r="34" fill="#FF5A1F" opacity="0.18" />
            <circle cx="400" cy="190" r="14" fill="#FF5A1F" />
            <circle cx="400" cy="190" r="5" fill="#fff" />
          </svg>
          <div className="absolute start-4 top-4 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <p className="font-bold">ShoeLab Studio</p>
            <p className="text-sm text-soft">{t({ en: 'Riyadh Park Mall · Map placeholder', ar: 'الرياض بارك مول · خريطة توضيحية' })}</p>
          </div>
        </div>
        <div className="grid content-start gap-5">
          <div className="rounded-[var(--radius-card)] bg-ink p-7 text-white">
            <dl className="grid gap-5">
              <div className="flex items-start gap-3">
                <Icon name="clock" className="mt-0.5 text-orange" />
                <div>
                  <dt className="text-sm text-mute">{t({ en: 'Opening hours', ar: 'ساعات العمل' })}</dt>
                  <dd className="text-lg font-bold">{t({ en: 'Every day, 10 AM – 12 AM', ar: 'يوميًا، 10 صباحًا – 12 منتصف الليل' })}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="pin" className="mt-0.5 text-orange" />
                <div>
                  <dt className="text-sm text-mute">{t({ en: 'Address', ar: 'العنوان' })}</dt>
                  <dd className="text-lg font-bold">{t({ en: 'Riyadh Park Mall, Ground floor (demo)', ar: 'الرياض بارك مول، الدور الأرضي (تجريبي)' })}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="scan" className="mt-0.5 text-orange" />
                <div>
                  <dt className="text-sm text-mute">{t({ en: 'In the store', ar: 'في المعرض' })}</dt>
                  <dd className="text-lg font-bold">{t({ en: 'Free foot scan in store', ar: 'قياس قدم مجاني' })}</dd>
                </div>
              </div>
            </dl>
          </div>
          <ButtonLink to="/contact" variant="ghost" size="lg">
            {t({ en: 'Ask us a question', ar: 'اسألنا' })}
          </ButtonLink>
        </div>
        <div className="grid gap-5 sm:grid-cols-3 lg:col-span-2">
          {SERVICES.map((s) => (
            <article key={s.title.en} className="rounded-[var(--radius-card)] bg-white p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-orange/10 text-orange">
                <Icon name={s.icon} />
              </span>
              <h2 className="text-h3 mt-5">{t(s.title)}</h2>
              <p className="mt-2 text-soft">{t(s.text)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
