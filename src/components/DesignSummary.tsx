import { colorName, MATERIALS, PART_NAMES, WIDTHS, type PartKey } from '../data/catalog';
import type { Design } from '../hooks/useCart';
import { useLang } from '../hooks/useLang';

export function DesignSummary({ design, compact = false }: { design: Design; compact?: boolean }) {
  const { t } = useLang();
  const material = MATERIALS.find((m) => m.id === design.material)!;
  const width = WIDTHS.find((w) => w.id === design.width)!;
  const sizes =
    design.sizeLeft === design.sizeRight
      ? t({ en: `EU ${design.sizeLeft}`, ar: `مقاس ${design.sizeLeft}` })
      : t({ en: `L ${design.sizeLeft} · R ${design.sizeRight}`, ar: `يسار ${design.sizeLeft} · يمين ${design.sizeRight}` });
  return (
    <div className="grid gap-1.5 text-sm text-soft">
      <p>
        {t(material.name)} · {sizes} · {t(width.name)}
        {design.initials && <> · {t({ en: 'Initials', ar: 'الحروف' })} <span dir="ltr" className="font-bold text-ink">{design.initials}</span></>}
      </p>
      {!compact && (
        <ul className="flex flex-wrap gap-x-3 gap-y-1">
          {(Object.keys(design.parts) as PartKey[]).map((k) => (
            <li key={k} className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.2)]" style={{ background: design.parts[k] }} />
              {t(PART_NAMES[k])}: {t(colorName(design.parts[k]))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
