import { useLang } from '../hooks/useLang';

export const SIZE_ROWS = [
  [36, 22.5, 3.5, 5],
  [37, 23.5, 4, 6],
  [38, 24, 5, 7],
  [39, 25, 6, 8],
  [40, 25.5, 6.5, 8.5],
  [41, 26.5, 7.5, 9.5],
  [42, 27, 8, 10],
  [43, 28, 9, 11],
  [44, 28.5, 9.5, 11.5],
  [45, 29.5, 10.5, 12.5],
  [46, 30, 11, 13],
  [47, 31, 12, 14],
  [48, 31.5, 12.5, 14.5],
  [49, 32.5, 13.5, 15.5],
  [50, 33, 14, 16],
];

export function SizeTable() {
  const { t } = useLang();
  return (
    <div className="overflow-x-auto rounded-2xl shadow-[inset_0_0_0_1px_var(--color-line)]">
      <table className="w-full min-w-[420px] text-center text-sm">
        <caption className="sr-only">{t({ en: 'Shoe size conversion', ar: 'جدول تحويل المقاسات' })}</caption>
        <thead className="bg-paper">
          <tr>
            {[t({ en: 'EU', ar: 'أوروبي' }), t({ en: 'Foot length (cm)', ar: 'طول القدم (سم)' }), t({ en: 'UK', ar: 'بريطاني' }), t({ en: 'US', ar: 'أمريكي' })].map((h) => (
              <th key={h} scope="col" className="px-3 py-3 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SIZE_ROWS.map(([eu, cm, uk, us]) => (
            <tr key={eu} className="border-t border-line">
              <th scope="row" className="px-3 py-2.5 font-bold">
                {eu}
                {(eu <= 38 || eu >= 48) && <span className="ms-1.5 rounded-full bg-peach px-1.5 py-0.5 text-[10px] font-bold">+99</span>}
              </th>
              <td className="px-3 py-2.5 tabular">{cm}</td>
              <td className="px-3 py-2.5 tabular">{uk}</td>
              <td className="px-3 py-2.5 tabular">{us}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MeasureSteps() {
  const { t } = useLang();
  const steps = [
    { en: 'Stand on a sheet of paper with your heel against a wall.', ar: 'قف على ورقة وخلي كعبك ملاصق للجدار.' },
    { en: 'Mark the tip of your longest toe.', ar: 'حط علامة عند طرف أطول إصبع.' },
    { en: 'Measure from the wall to the mark in cm. Do both feet.', ar: 'قس من الجدار للعلامة بالسنتيمتر. سوها للقدمين.' },
    { en: 'Use the bigger number, or order a different size for each foot.', ar: 'استخدم الرقم الأكبر، أو اطلب مقاس مختلف لكل قدم.' },
  ];
  return (
    <ol className="grid gap-3">
      {steps.map((s, i) => (
        <li key={s.en} className="flex gap-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">{i + 1}</span>
          <span className="pt-0.5">{t(s)}</span>
        </li>
      ))}
    </ol>
  );
}
