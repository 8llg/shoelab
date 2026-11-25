import { useId } from 'react';
import type { Material, Parts, ShoeType } from '../data/catalog';

export type View = 'side' | 'top' | 'back';

type Shape = {
  sole: string;
  mid: string;
  upper: string;
  tongue?: string;
  panels: string[];
  heel: string;
  tab: string;
  laces: [number, number][];
  laceSize: number;
  stitch: string;
  initials: { x: number; y: number; r: number; size: number };
  topScale: number;
};

const SHAPES: Record<ShoeType, Shape> = {
  sneakers: {
    sole: 'M40 228 Q38 262 74 262 L536 262 Q572 262 570 230 Z',
    mid: 'M42 230 L570 230 Q574 206 552 198 L64 202 Q40 206 42 230 Z',
    upper: 'M64 204 C52 166 56 124 92 102 C116 88 148 90 176 104 C204 118 238 118 266 106 L300 92 C342 104 384 130 426 150 C478 170 534 170 556 198 Z',
    tongue: 'M262 108 L292 66 Q304 56 318 64 L344 82 L330 118 Z',
    panels: ['M150 202 C196 156 300 134 430 152 C380 162 300 178 262 204 Z', 'M468 160 C510 168 542 178 556 198 L462 203 C452 186 454 170 468 160 Z'],
    heel: 'M64 204 C54 170 58 136 84 112 C104 132 116 170 118 204 Z',
    tab: 'M84 108 L74 78 Q72 70 80 70 L96 74 L100 104 Z',
    laces: [[294, 94], [322, 108], [351, 121]],
    laceSize: 1,
    stitch: 'M152 196 C196 156 290 140 412 154',
    initials: { x: 92, y: 180, r: -8, size: 28 },
    topScale: 1,
  },
  running: {
    sole: 'M48 236 Q46 266 80 264 L530 258 Q566 254 572 226 Z',
    mid: 'M50 238 L572 226 Q578 204 554 198 L74 196 Q46 198 50 238 Z',
    upper: 'M74 198 C60 160 66 118 102 96 C126 84 156 90 180 104 C206 118 236 116 262 102 L304 84 C350 98 398 126 440 146 C492 168 540 172 556 198 Z',
    tongue: 'M258 104 L292 60 Q306 50 320 60 L346 78 L330 114 Z',
    panels: ['M136 196 C220 148 330 118 470 160 C380 150 270 168 190 198 Z', 'M230 198 C300 170 390 162 478 170 C400 176 330 186 284 198 Z', 'M482 166 C522 172 546 182 556 198 L476 199 C470 186 472 174 482 166 Z'],
    heel: 'M74 198 C62 164 68 128 96 104 C110 132 122 168 126 198 Z',
    tab: 'M96 100 L88 66 Q88 58 96 58 L112 64 L112 96 Z',
    laces: [[290, 88], [318, 101], [346, 114], [374, 127]],
    laceSize: 0.95,
    stitch: 'M140 190 C220 146 330 124 456 158',
    initials: { x: 100, y: 172, r: -10, size: 26 },
    topScale: 0.94,
  },
  casual: {
    sole: 'M44 236 Q42 262 76 262 L534 262 Q568 262 566 236 Z',
    mid: 'M46 238 L566 238 Q568 222 552 216 L66 216 Q44 218 46 238 Z',
    upper: 'M66 216 C58 186 62 150 94 134 C118 124 150 128 176 136 C206 146 240 146 270 136 L306 124 C350 134 392 152 432 168 C480 186 536 190 552 216 Z',
    tongue: 'M268 138 L296 104 Q308 96 320 104 L344 120 L332 150 Z',
    panels: ['M460 178 C506 186 540 196 552 216 L452 218 C446 202 448 188 460 178 Z', 'M118 214 C200 196 330 190 452 198 L452 207 C330 200 200 206 122 220 Z'],
    heel: 'M66 216 C60 190 62 162 84 144 C100 160 108 190 110 216 Z',
    tab: 'M86 140 L80 118 Q80 112 86 112 L98 116 L100 138 Z',
    laces: [[296, 128], [324, 140], [352, 152]],
    laceSize: 0.9,
    stitch: 'M120 204 C210 186 330 182 448 190',
    initials: { x: 90, y: 194, r: -6, size: 24 },
    topScale: 0.96,
  },
  comfort: {
    sole: 'M42 226 Q40 264 80 264 L530 264 Q570 264 568 226 Z',
    mid: 'M44 228 L568 228 Q572 194 548 186 L66 190 Q40 194 44 228 Z',
    upper: 'M66 192 C54 150 60 110 96 92 C120 80 152 84 178 98 C206 112 238 112 264 100 L300 88 C344 98 390 120 430 140 C486 160 532 164 548 186 Z',
    tongue: 'M262 102 L288 64 Q300 56 314 62 L340 80 L328 114 Z',
    panels: ['M140 190 C200 158 300 146 420 158 C360 168 290 176 250 190 Z', 'M470 150 C510 158 538 170 548 186 L462 190 C454 174 458 160 470 150 Z'],
    heel: 'M66 192 C56 158 60 124 88 100 C108 124 118 160 120 192 Z',
    tab: 'M88 96 L80 66 Q80 58 88 58 L102 62 L104 92 Z',
    laces: [[290, 90], [318, 104], [346, 117]],
    laceSize: 1,
    stitch: 'M142 184 C200 154 296 142 410 154',
    initials: { x: 94, y: 168, r: -8, size: 28 },
    topScale: 1.08,
  },
  formal: {
    sole: 'M56 236 L56 262 Q56 266 62 266 L126 266 Q130 266 130 260 L132 246 L536 246 Q566 246 572 232 Z',
    mid: 'M56 236 L572 232 Q572 224 560 222 L70 226 Q56 228 56 236 Z',
    upper: 'M70 226 C60 196 62 156 92 136 C114 122 146 124 172 134 C206 146 244 146 274 136 L312 126 C362 138 410 162 456 184 C510 206 556 206 566 224 Z',
    tongue: 'M276 138 L300 116 Q310 110 320 116 L338 128 L326 150 Z',
    panels: ['M470 192 C512 204 552 208 566 224 L460 226 C452 212 456 200 470 192 Z', 'M150 226 C170 190 220 160 290 150 C302 168 302 186 294 200 C252 204 214 212 192 226 Z'],
    heel: 'M70 226 C62 200 64 170 86 150 C102 170 110 200 112 226 Z',
    tab: 'M88 144 L84 128 Q84 122 90 122 L100 126 L100 142 Z',
    laces: [[302, 128], [322, 137], [342, 146]],
    laceSize: 0.62,
    stitch: 'M154 220 C176 188 222 162 286 154',
    initials: { x: 92, y: 202, r: -6, size: 20 },
    topScale: 0.82,
  },
};

const OUTLINE = { stroke: 'rgba(0,0,0,0.28)', strokeWidth: 2.5, strokeLinejoin: 'round' as const };
const ease = { transition: 'fill 450ms cubic-bezier(0.22,1,0.36,1), stroke 450ms cubic-bezier(0.22,1,0.36,1)' };

function initialsColor(hex: string) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#121214' : '#FFFFFF';
}

function Texture({ id, material, clip }: { id: string; material: Material; clip: string }) {
  return (
    <g clipPath={`url(#${clip})`} style={{ pointerEvents: 'none' }}>
      {material === 'canvas' && <rect x="0" y="0" width="600" height="320" fill={`url(#${id}-weave)`} opacity="0.55" />}
      {material === 'suede' && <rect x="0" y="0" width="600" height="320" filter={`url(#${id}-nap)`} opacity="0.22" />}
      {material === 'leather' && (
        <>
          <rect x="0" y="0" width="600" height="320" filter={`url(#${id}-grain)`} opacity="0.1" />
          <rect x="0" y="0" width="600" height="320" fill={`url(#${id}-gloss)`} opacity="0.55" />
        </>
      )}
      {material === 'italian' && (
        <>
          <rect x="0" y="0" width="600" height="320" fill={`url(#${id}-gloss)`} opacity="0.95" />
          <rect x="0" y="0" width="600" height="320" fill={`url(#${id}-burnish)`} />
        </>
      )}
    </g>
  );
}

function Defs({ id, clipPaths }: { id: string; clipPaths: string[] }) {
  return (
    <defs>
      <pattern id={`${id}-weave`} width="7" height="7" patternUnits="userSpaceOnUse">
        <path d="M0 3.5H7M3.5 0V7" stroke="rgba(0,0,0,0.16)" strokeWidth="1" />
      </pattern>
      <filter id={`${id}-nap`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="3" seed="9" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.18" stopColor="#fff" stopOpacity="0.42" />
        <stop offset="0.46" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${id}-burnish`} cx="0.55" cy="0.4" r="0.6">
        <stop offset="0.55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.28" />
      </radialGradient>
      <clipPath id={`${id}-clip`}>
        {clipPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </clipPath>
    </defs>
  );
}

function laceMarks(centers: [number, number][], s: number) {
  const w = 12 * s;
  const h = 10 * s;
  const cross = centers.map(([x, y]) => `M${x - w} ${y + h}L${x + w} ${y - h}M${x - w} ${y - h}L${x + w} ${y + h}`).join('');
  const [fx, fy] = centers[0];
  const bow = `M${fx + 2 * s} ${fy - 10 * s}C${fx - 10 * s} ${fy - 30 * s} ${fx - 32 * s} ${fy - 30 * s} ${fx - 34 * s} ${fy - 16 * s}`;
  return cross + bow;
}

function Side({ shape, parts, material, id }: { shape: Shape; parts: Parts; material: Material; id: string }) {
  const eyelets = shape.laces.flatMap(([x, y]) => [
    [x - 14 * shape.laceSize, y + 10 * shape.laceSize],
    [x + 14 * shape.laceSize, y - 10 * shape.laceSize],
  ]);
  const clip = [shape.upper, ...(shape.tongue ? [shape.tongue] : []), ...shape.panels, shape.heel, shape.tab];
  return (
    <>
      <Defs id={id} clipPaths={clip} />
      <ellipse cx="305" cy="276" rx="250" ry="12" fill="rgba(0,0,0,0.22)" />
      <path d={shape.sole} style={{ fill: parts.sole, ...ease }} {...OUTLINE} />
      <path d={shape.mid} style={{ fill: parts.sole, filter: 'brightness(0.9)', ...ease }} {...OUTLINE} />
      <path d={shape.sole} fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="2" strokeDasharray="0" />
      <path d={shape.tab} style={{ fill: parts.heel, ...ease }} {...OUTLINE} />
      <path d={shape.upper} style={{ fill: parts.upper, ...ease }} {...OUTLINE} />
      {shape.tongue && <path d={shape.tongue} style={{ fill: parts.upper, filter: 'brightness(0.9)', ...ease }} {...OUTLINE} />}
      {shape.panels.map((d, i) => (
        <path key={i} d={d} style={{ fill: parts.panel, ...ease }} {...OUTLINE} />
      ))}
      <path d={shape.heel} style={{ fill: parts.heel, ...ease }} {...OUTLINE} />
      <Texture id={id} material={material} clip={`${id}-clip`} />
      <path d={shape.stitch} fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeDasharray="6 7" />
      <path d={laceMarks(shape.laces, shape.laceSize)} fill="none" style={{ stroke: parts.laces, ...ease }} strokeWidth={7 * shape.laceSize} strokeLinecap="round" />
      {eyelets.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4 * shape.laceSize} fill="#1c1d21" />
      ))}
    </>
  );
}

function Top({ shape, parts, material, id }: { shape: Shape; parts: Parts; material: Material; id: string }) {
  const k = shape.topScale;
  const tf = `translate(0 ${150 - 150 * k}) scale(1 ${k})`;
  const upper = 'M84 150 C84 102 136 84 222 84 L438 86 C510 88 556 112 556 150 C556 188 510 212 438 214 L222 216 C136 216 84 198 84 150 Z';
  const heelPanel = 'M84 150 C84 112 110 94 150 88 L176 212 C112 204 84 186 84 150 Z';
  const toePanel = 'M470 92 C528 102 556 124 556 150 C556 176 528 198 470 208 C490 176 490 124 470 92 Z';
  const tongue = 'M220 126 L400 120 Q420 150 400 180 L220 174 Q210 150 220 126 Z';
  const tab = 'M70 138 L88 136 L88 164 L70 162 Z';
  return (
    <>
      <Defs id={id} clipPaths={[upper, heelPanel, toePanel]} />
      <g transform={tf}>
        <path d="M70 150 C70 92 130 70 220 70 L440 72 C520 74 572 104 572 150 C572 196 520 226 440 228 L220 230 C130 230 70 208 70 150 Z" style={{ fill: parts.sole, ...ease }} {...OUTLINE} />
        <path d={upper} style={{ fill: parts.upper, ...ease }} {...OUTLINE} />
        <path d={heelPanel} style={{ fill: parts.heel, ...ease }} {...OUTLINE} />
        <path d={toePanel} style={{ fill: parts.panel, ...ease }} {...OUTLINE} />
        <Texture id={id} material={material} clip={`${id}-clip`} />
        <ellipse cx="168" cy="150" rx="54" ry="40" fill="#1c1d21" />
        <path d={tongue} style={{ fill: parts.upper, filter: 'brightness(0.9)', ...ease }} {...OUTLINE} />
        <path d={tab} style={{ fill: parts.heel, ...ease }} {...OUTLINE} />
        <path
          d="M242 126V174M276 124V176M310 123V177M344 122V178M378 121V179M242 126L276 176M276 124L310 177M310 123L344 178M344 122L378 179"
          fill="none"
          style={{ stroke: parts.laces, ...ease }}
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>
    </>
  );
}

function Back({ parts, material, id }: { parts: Parts; material: Material; id: string }) {
  const upper = 'M228 222 C220 170 226 120 250 92 Q300 70 350 92 C374 120 380 170 372 222 Z';
  const left = 'M228 222 C222 190 224 160 236 136 C246 170 248 200 250 222 Z';
  const right = 'M372 222 C378 190 376 160 364 136 C354 170 352 200 350 222 Z';
  const tab = 'M274 98 L326 98 L328 206 L272 206 Z';
  return (
    <>
      <Defs id={id} clipPaths={[upper, left, right, tab]} />
      <ellipse cx="300" cy="276" rx="110" ry="10" fill="rgba(0,0,0,0.22)" />
      <path d="M216 236 L384 236 L384 252 Q384 270 364 270 L236 270 Q216 270 216 252 Z" style={{ fill: parts.sole, ...ease }} {...OUTLINE} />
      <path d="M220 238 L380 238 L376 218 L224 218 Z" style={{ fill: parts.sole, filter: 'brightness(0.9)', ...ease }} {...OUTLINE} />
      <path d={upper} style={{ fill: parts.upper, ...ease }} {...OUTLINE} />
      <path d={left} style={{ fill: parts.panel, ...ease }} {...OUTLINE} />
      <path d={right} style={{ fill: parts.panel, ...ease }} {...OUTLINE} />
      <path d="M288 98 L288 72 Q300 62 312 72 L312 98" fill="none" style={{ stroke: parts.heel, ...ease }} strokeWidth="9" strokeLinecap="round" />
      <path d={tab} style={{ fill: parts.heel, ...ease }} {...OUTLINE} />
      <Texture id={id} material={material} clip={`${id}-clip`} />
      <path d="M256 98 Q300 84 344 98 Q340 112 300 114 Q260 112 256 98 Z" fill="#1c1d21" />
      <path d="M266 94 Q300 82 334 94" fill="none" style={{ stroke: parts.laces, ...ease }} strokeWidth="6" strokeLinecap="round" />
    </>
  );
}

export function Shoe({
  type,
  parts,
  material = 'canvas',
  initials = '',
  view = 'side',
  label,
  className,
}: {
  type: ShoeType;
  parts: Parts;
  material?: Material;
  initials?: string;
  view?: View;
  label?: string;
  className?: string;
}) {
  const raw = useId();
  const id = `s${raw.replace(/[^a-zA-Z0-9]/g, '')}`;
  const shape = SHAPES[type];
  const textFill = initialsColor(parts.heel);
  return (
    <svg viewBox="0 0 600 300" className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {view === 'side' && <Side shape={shape} parts={parts} material={material} id={id} />}
      {view === 'top' && <Top shape={shape} parts={parts} material={material} id={id} />}
      {view === 'back' && <Back parts={parts} material={material} id={id} />}
      {initials && view === 'side' && (
        <text
          x={shape.initials.x}
          y={shape.initials.y}
          transform={`rotate(${shape.initials.r} ${shape.initials.x} ${shape.initials.y})`}
          textAnchor="middle"
          fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
          fontWeight="800"
          fontSize={shape.initials.size}
          fill={textFill}
          direction="ltr"
        >
          {initials}
        </text>
      )}
      {initials && view === 'back' && (
        <text x="300" y="164" textAnchor="middle" dominantBaseline="middle" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif" fontWeight="800" fontSize="22" fill={textFill} direction="ltr">
          {initials}
        </text>
      )}
      {initials && view === 'top' && (
        <text x="79" y="150" textAnchor="middle" dominantBaseline="middle" transform="rotate(-90 79 150)" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif" fontWeight="800" fontSize="13" fill={textFill} direction="ltr">
          {initials}
        </text>
      )}
    </svg>
  );
}
