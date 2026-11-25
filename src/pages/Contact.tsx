import { useState, type FormEvent } from 'react';
import { PageHero } from '../components/PageHero';
import { Button } from '../components/ui/Button';
import { Input, Select, Textarea } from '../components/ui/Field';
import { Icon } from '../components/ui/Icon';
import { useLang } from '../hooks/useLang';
import { useToast } from '../hooks/useToast';

const TOPICS = [
  { id: 'order', name: { en: 'My order', ar: 'طلبي' } },
  { id: 'size', name: { en: 'Sizes and fit', ar: 'المقاسات' } },
  { id: 'design', name: { en: 'Custom design', ar: 'التصميم المخصص' } },
  { id: 'other', name: { en: 'Something else', ar: 'شي ثاني' } },
];

export function Contact() {
  const { t } = useLang();
  const { push } = useToast();
  const [form, setForm] = useState({ name: '', email: '', topic: 'order', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = t({ en: 'Please enter your name.', ar: 'اكتب اسمك.' });
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = t({ en: 'Please enter a valid email.', ar: 'اكتب بريد إلكتروني صحيح.' });
    if (form.message.trim().length < 10) next.message = t({ en: 'Please write at least 10 characters.', ar: 'اكتب 10 أحرف على الأقل.' });
    setErrors(next);
    if (Object.keys(next).length) return;
    setForm({ name: '', email: '', topic: 'order', message: '' });
    push(t({ en: 'Message sent', ar: 'تم إرسال رسالتك' }), t({ en: 'Thank you! We usually reply within one day.', ar: 'شكرًا لك! عادة نرد خلال يوم.' }));
  };

  return (
    <>
      <PageHero eyebrow={t({ en: 'Contact', ar: 'تواصل معنا' })} title={t({ en: 'We are here to help', ar: 'حاضرين للمساعدة' })} text={t({ en: 'Questions about sizes, orders or designs? Send us a message.', ar: 'عندك سؤال عن المقاسات أو الطلبات أو التصميم؟ أرسل لنا.' })} />
      <section className="container-x grid items-start gap-8 pb-24 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={submit} noValidate className="grid gap-5 rounded-[var(--radius-card)] bg-white p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label={t({ en: 'Name', ar: 'الاسم' })} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} autoComplete="name" />
            <Input label={t({ en: 'Email', ar: 'البريد الإلكتروني' })} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} autoComplete="email" dir="ltr" />
          </div>
          <Select label={t({ en: 'Topic', ar: 'الموضوع' })} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
            {TOPICS.map((x) => (
              <option key={x.id} value={x.id}>
                {t(x.name)}
              </option>
            ))}
          </Select>
          <Textarea label={t({ en: 'Message', ar: 'الرسالة' })} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} error={errors.message} />
          <Button type="submit" size="lg" className="sm:justify-self-start">
            {t({ en: 'Send message', ar: 'إرسال' })}
          </Button>
        </form>
        <div className="grid gap-4">
          {[
            { icon: 'mail' as const, title: { en: 'Email', ar: 'البريد' }, value: 'hello@shoelab.demo' },
            { icon: 'phone' as const, title: { en: 'Phone', ar: 'الهاتف' }, value: '+966 11 000 0000' },
            { icon: 'clock' as const, title: { en: 'Hours', ar: 'الأوقات' }, value: t({ en: 'Every day, 10 AM – 12 AM', ar: 'يوميًا، 10 ص – 12 م' }) },
          ].map((c) => (
            <div key={c.title.en} className="flex items-center gap-4 rounded-[var(--radius-card)] bg-white p-5">
              <span className="grid size-12 place-items-center rounded-2xl bg-orange/10 text-orange">
                <Icon name={c.icon} />
              </span>
              <div>
                <p className="text-sm text-soft">{t(c.title)}</p>
                <p className="font-bold" dir={c.icon === 'clock' ? undefined : 'ltr'}>
                  {c.value}
                </p>
              </div>
            </div>
          ))}
          <p className="px-2 text-sm text-soft">{t({ en: 'Demo store: messages are not sent anywhere.', ar: 'متجر تجريبي: الرسائل ما تنرسل لأي مكان.' })}</p>
        </div>
      </section>
    </>
  );
}
