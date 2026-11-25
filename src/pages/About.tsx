import { PageHero } from '../components/PageHero';
import { Shoe } from '../components/Shoe';
import { Reveal, SectionHead } from '../components/ui/Bits';
import { ButtonLink } from '../components/ui/Button';
import { Icon, type IconName } from '../components/ui/Icon';
import { useLang } from '../hooks/useLang';

const VALUES: { icon: IconName; title: { en: string; ar: string }; text: { en: string; ar: string } }[] = [
  { icon: 'foot', title: { en: 'Fit first', ar: 'المقاس أولًا' }, text: { en: 'Every foot is different. We make shoes for the foot you have, not an average one.', ar: 'كل قدم مختلفة. نصنع الحذاء لقدمك أنت، مو لمقاس متوسط.' } },
  { icon: 'palette', title: { en: 'Your design', ar: 'تصميمك' }, text: { en: 'You choose the colors, materials and details. We make it real.', ar: 'أنت تختار الألوان والخامات والتفاصيل. وإحنا نحولها لحقيقة.' } },
  { icon: 'factory', title: { en: 'Made to order', ar: 'يُصنع عند الطلب' }, text: { en: 'We only make what people order, so there is less waste.', ar: 'نصنع فقط اللي ينطلب، عشان نقلل الهدر.' } },
];

const FACTORIES = [
  { country: { en: 'Turkey', ar: 'تركيا' }, city: { en: 'Istanbul', ar: 'إسطنبول' }, text: { en: 'Sneakers, running and comfort shoes.', ar: 'السنيكرز وأحذية الجري والراحة.' } },
  { country: { en: 'Portugal', ar: 'البرتغال' }, city: { en: 'Porto', ar: 'بورتو' }, text: { en: 'Suede and real leather work.', ar: 'الشامواه والجلد الطبيعي.' } },
  { country: { en: 'Italy', ar: 'إيطاليا' }, city: { en: 'Marche', ar: 'ماركي' }, text: { en: 'Formal shoes in premium Italian leather.', ar: 'الأحذية الرسمية بالجلد الإيطالي الفاخر.' } },
];

const TEAM = [
  { name: 'SAAD ALTWAIGRI', initials: 'SA', parts: { upper: '#FF5A1F', panel: '#FFFFFF', sole: '#FFFFFF', laces: '#FFFFFF', heel: '#1E1F23' } },
  { name: 'SAUD ALRASHED', initials: 'SR', parts: { upper: '#1F2E57', panel: '#FFB38F', sole: '#FFFFFF', laces: '#FFFFFF', heel: '#FFB38F' } },
  { name: 'ABDULLAH ALMEATAQ', initials: 'AM', parts: { upper: '#1E1F23', panel: '#D9C3A0', sole: '#FFFFFF', laces: '#D9C3A0', heel: '#D9C3A0' } },
];

export function About() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        eyebrow={t({ en: 'About ShoeLab', ar: 'عن شو لاب' })}
        title={t({ en: 'We started ShoeLab because shoes should fit the person, not the other way around.', ar: 'بدأنا شو لاب لأن الحذاء لازم يناسب الشخص، مو العكس.' })}
        text={t({
          en: 'Many people in Riyadh cannot find their size, need a wider fit, or have one foot bigger than the other. Others just want something nobody else has. ShoeLab makes custom shoes for all of them.',
          ar: 'ناس كثير في الرياض ما يلقون مقاسهم، أو يحتاجون عرض أكبر، أو عندهم قدم أكبر من الثانية. وناس ثانيين بس يبون شي ما عند أحد. شو لاب يصنع أحذية مخصصة لهم كلهم.',
        })}
      />

      <section className="bg-ink py-20 text-white sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-bold text-peach">{t({ en: 'Our mission', ar: 'رسالتنا' })}</p>
            <h2 className="text-h2 mt-4">{t({ en: 'Make great-fitting, personal shoes simple and fair for everyone in Saudi Arabia.', ar: 'نخلي الحذاء المريح والشخصي سهل ومتاح لكل الناس في السعودية.' })}</h2>
            <p className="text-lead mt-5 text-mute">{t({ en: 'Design online or in our studio, get measured for free, and receive your pair in two to three weeks.', ar: 'صمّم أونلاين أو في معرضنا، خذ قياس مجاني، واستلم حذاءك خلال أسبوعين لثلاثة.' })}</p>
          </div>
          <Shoe type="running" parts={{ upper: '#FF5A1F', panel: '#1E1F23', sole: '#FFFFFF', laces: '#1E1F23', heel: '#FFB38F' }} className="w-full -rotate-6 drop-shadow-[0_40px_40px_rgb(0_0_0/0.5)]" label={t({ en: 'An orange running shoe', ar: 'حذاء جري برتقالي' })} />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHead title={t({ en: 'What we believe', ar: 'اللي نؤمن فيه' })} />
          <div className="grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title.en} delay={i * 0.06}>
                <article className="h-full rounded-[var(--radius-card)] bg-white p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-orange/10 text-orange">
                    <Icon name={v.icon} />
                  </span>
                  <h3 className="text-h3 mt-5">{t(v.title)}</h3>
                  <p className="mt-2 text-soft">{t(v.text)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <SectionHead title={t({ en: 'Partner factories in Turkey, Portugal and Italy', ar: 'مصانع شريكة في تركيا والبرتغال وإيطاليا' })} text={t({ en: 'We design in Riyadh and work with skilled shoe makers who check every pair by hand.', ar: 'نصمم في الرياض ونشتغل مع صنّاع أحذية محترفين يفحصون كل زوج باليد.' })} />
          <div className="grid gap-5 md:grid-cols-3">
            {FACTORIES.map((f) => (
              <article key={f.country.en} className="rounded-[var(--radius-card)] bg-paper p-7">
                <Icon name="pin" className="text-orange" />
                <h3 className="text-h3 mt-4">{t(f.country)}</h3>
                <p className="text-sm font-bold text-soft">{t(f.city)}</p>
                <p className="mt-3 text-soft">{t(f.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHead title={t({ en: 'The founders', ar: 'المؤسسون' })} text={t({ en: 'Three friends from Riyadh who wanted shoes that fit.', ar: 'ثلاثة أصدقاء من الرياض كانوا يبون أحذية تناسبهم.' })} />
          <ul className="grid gap-5 sm:grid-cols-3">
            {TEAM.map((m) => (
              <li key={m.name} className="rounded-[var(--radius-card)] bg-white p-7">
                <div className="grid aspect-[16/10] place-items-center rounded-2xl bg-paper">
                  <Shoe type="sneakers" parts={m.parts} initials={m.initials} className="w-[88%]" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold tracking-wide" dir="ltr">
                  {m.name}
                </h3>
                <p className="text-sm text-soft">{t({ en: 'Co-founder', ar: 'شريك مؤسس' })}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14 flex flex-wrap gap-3">
            <ButtonLink to="/customize">{t({ en: 'Design your pair', ar: 'صمّم زوجك' })}</ButtonLink>
            <ButtonLink to="/store" variant="ghost">
              {t({ en: 'Visit the studio', ar: 'زُر المعرض' })}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
