export type L = { en: string; ar: string };

export type ShoeType = 'casual' | 'sneakers' | 'running' | 'comfort' | 'formal';
export type Category = ShoeType | 'special';
export type Material = 'canvas' | 'suede' | 'leather' | 'italian';
export type Width = 'narrow' | 'normal' | 'wide' | 'xwide';
export type PartKey = 'upper' | 'panel' | 'sole' | 'laces' | 'heel';
export type Parts = Record<PartKey, string>;

export const TYPE_PRICE: Record<ShoeType, number> = {
  casual: 599,
  sneakers: 699,
  running: 799,
  comfort: 899,
  formal: 999,
};

export const MATERIAL_PRICE: Record<Material, number> = {
  canvas: 0,
  suede: 200,
  leather: 400,
  italian: 700,
};

export const EXTRA_FIT_PRICE = 99;
export const VAT_RATE = 0.15;
export const FREE_DELIVERY_FROM = 500;
export const STANDARD_DELIVERY = 25;
export const EXPRESS_DELIVERY = 79;
export const PROMO_CODE = 'STUDENT10';
export const PROMO_RATE = 0.1;

export const SIZES = Array.from({ length: 15 }, (_, i) => 36 + i);
export const isExtraSize = (size: number) => size <= 38 || size >= 48;
export const needsExtraFit = (left: number, right: number, width: Width) => isExtraSize(left) || isExtraSize(right) || width === 'xwide';

export function shoePrice(type: ShoeType, material: Material, left: number, right: number, width: Width) {
  return TYPE_PRICE[type] + MATERIAL_PRICE[material] + (needsExtraFit(left, right, width) ? EXTRA_FIT_PRICE : 0);
}

export const TYPES: { id: ShoeType; name: L; blurb: L }[] = [
  { id: 'casual', name: { en: 'Casual', ar: 'كاجوال' }, blurb: { en: 'Easy shoes for every day.', ar: 'أحذية مريحة لكل يوم.' } },
  { id: 'sneakers', name: { en: 'Custom Sneakers', ar: 'سنيكرز مخصص' }, blurb: { en: 'Your colors, your initials.', ar: 'ألوانك وحروفك أنت.' } },
  { id: 'running', name: { en: 'Sports & Running', ar: 'رياضة وجري' }, blurb: { en: 'Light and strong for training.', ar: 'خفيف وقوي للتمرين.' } },
  { id: 'comfort', name: { en: 'Comfort & Support', ar: 'راحة ودعم' }, blurb: { en: 'Soft soles for long days.', ar: 'نعل ناعم للأيام الطويلة.' } },
  { id: 'formal', name: { en: 'Formal', ar: 'رسمي' }, blurb: { en: 'Smart shoes for work and events.', ar: 'أحذية أنيقة للعمل والمناسبات.' } },
];

export const CATEGORIES: { id: Category; name: L; blurb: L }[] = [
  ...TYPES,
  { id: 'special', name: { en: 'Special Sizes', ar: 'مقاسات خاصة' }, blurb: { en: 'EU 36 to 50 and extra wide.', ar: 'من 36 إلى 50 وعرض إضافي.' } },
];

export const MATERIALS: { id: Material; name: L; note: L; care: L }[] = [
  {
    id: 'canvas',
    name: { en: 'Canvas', ar: 'قماش كانفس' },
    note: { en: 'Light, breathable cotton. Great for hot days.', ar: 'قطن خفيف يسمح بمرور الهواء. ممتاز للأيام الحارة.' },
    care: { en: 'Wipe with a damp cloth. Air dry.', ar: 'امسحه بقطعة قماش رطبة واتركه يجف بالهواء.' },
  },
  {
    id: 'suede',
    name: { en: 'Suede', ar: 'شامواه' },
    note: { en: 'Soft, matte leather with a warm feel.', ar: 'جلد ناعم مطفي بملمس دافئ.' },
    care: { en: 'Use a suede brush. Keep away from water.', ar: 'استخدم فرشاة الشامواه وأبعده عن الماء.' },
  },
  {
    id: 'leather',
    name: { en: 'Real Leather', ar: 'جلد طبيعي' },
    note: { en: 'Strong full-grain leather that lasts for years.', ar: 'جلد طبيعي قوي يدوم لسنوات.' },
    care: { en: 'Clean, then use leather cream once a month.', ar: 'نظّفه ثم استخدم كريم الجلد مرة في الشهر.' },
  },
  {
    id: 'italian',
    name: { en: 'Premium Italian Leather', ar: 'جلد إيطالي فاخر' },
    note: { en: 'Smooth, rich leather with a soft shine.', ar: 'جلد ناعم وفاخر بلمعة خفيفة.' },
    care: { en: 'Polish gently and store with shoe trees.', ar: 'لمّعه بلطف واحفظه مع قالب الحذاء.' },
  },
];

export const WIDTHS: { id: Width; name: L }[] = [
  { id: 'narrow', name: { en: 'Narrow', ar: 'ضيق' } },
  { id: 'normal', name: { en: 'Normal', ar: 'عادي' } },
  { id: 'wide', name: { en: 'Wide', ar: 'عريض' } },
  { id: 'xwide', name: { en: 'Extra Wide', ar: 'عريض جدًا' } },
];

export const PALETTE: { hex: string; name: L }[] = [
  { hex: '#FF5A1F', name: { en: 'Orange', ar: 'برتقالي' } },
  { hex: '#1E1F23', name: { en: 'Black', ar: 'أسود' } },
  { hex: '#FFFFFF', name: { en: 'White', ar: 'أبيض' } },
  { hex: '#9A9EA6', name: { en: 'Gray', ar: 'رمادي' } },
  { hex: '#D9C3A0', name: { en: 'Sand', ar: 'رملي' } },
  { hex: '#7A4B2A', name: { en: 'Brown', ar: 'بني' } },
  { hex: '#1F2E57', name: { en: 'Navy', ar: 'كحلي' } },
  { hex: '#6B7340', name: { en: 'Olive', ar: 'زيتي' } },
  { hex: '#FFB38F', name: { en: 'Peach', ar: 'خوخي' } },
  { hex: '#8E1F2C', name: { en: 'Burgundy', ar: 'عنابي' } },
];

export const colorName = (hex: string): L => PALETTE.find((p) => p.hex.toLowerCase() === hex.toLowerCase())?.name ?? { en: hex, ar: hex };

export const PART_NAMES: Record<PartKey, L> = {
  upper: { en: 'Upper', ar: 'الجزء العلوي' },
  panel: { en: 'Side panel', ar: 'اللوحة الجانبية' },
  sole: { en: 'Sole', ar: 'النعل' },
  laces: { en: 'Laces', ar: 'الأربطة' },
  heel: { en: 'Heel tab', ar: 'لسان الكعب' },
};

export const COLOR_FILTERS: { id: string; hex: string; name: L }[] = [
  { id: 'black', hex: '#1E1F23', name: { en: 'Black', ar: 'أسود' } },
  { id: 'white', hex: '#FFFFFF', name: { en: 'White', ar: 'أبيض' } },
  { id: 'orange', hex: '#FF5A1F', name: { en: 'Orange', ar: 'برتقالي' } },
  { id: 'brown', hex: '#7A4B2A', name: { en: 'Brown', ar: 'بني' } },
  { id: 'navy', hex: '#1F2E57', name: { en: 'Navy', ar: 'كحلي' } },
  { id: 'sand', hex: '#D9C3A0', name: { en: 'Sand', ar: 'رملي' } },
  { id: 'gray', hex: '#9A9EA6', name: { en: 'Gray', ar: 'رمادي' } },
  { id: 'olive', hex: '#6B7340', name: { en: 'Olive', ar: 'زيتي' } },
];
