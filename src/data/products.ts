import type { Category, L, Material, Parts, ShoeType, Width } from './catalog';
import { shoePrice } from './catalog';

export type Colorway = { name: L; filter: string; parts: Parts };

export type Product = {
  id: string;
  name: L;
  category: Category;
  type: ShoeType;
  material: Material;
  materials: Material[];
  colorways: Colorway[];
  widths: Width[];
  size: number;
  width: Width;
  added: string;
  popularity: number;
  description: L;
  highlights: L[];
};

const ALL_WIDTHS: Width[] = ['narrow', 'normal', 'wide', 'xwide'];

const cw = (en: string, ar: string, filter: string, upper: string, panel: string, sole: string, laces: string, heel: string): Colorway => ({
  name: { en, ar },
  filter,
  parts: { upper, panel, sole, laces, heel },
});

export const products: Product[] = [
  {
    id: 'najd-low',
    name: { en: 'Najd Low', ar: 'نجد لو' },
    category: 'casual',
    type: 'casual',
    material: 'canvas',
    materials: ['canvas', 'suede'],
    colorways: [
      cw('Sand', 'رملي', 'sand', '#D9C3A0', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#7A4B2A'),
      cw('Olive', 'زيتي', 'olive', '#6B7340', '#D9C3A0', '#FFFFFF', '#FFFFFF', '#1E1F23'),
      cw('Black', 'أسود', 'black', '#1E1F23', '#1E1F23', '#FFFFFF', '#FFFFFF', '#FF5A1F'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-10-02',
    popularity: 88,
    description: {
      en: 'A clean low-top for everyday life. Light canvas, a soft insole and a sole that bends with your step.',
      ar: 'حذاء منخفض بسيط للحياة اليومية. قماش خفيف وفرشة ناعمة ونعل ينثني مع خطوتك.',
    },
    highlights: [
      { en: 'Breathable canvas', ar: 'قماش يسمح بمرور الهواء' },
      { en: 'Soft cushioned insole', ar: 'فرشة داخلية مبطنة' },
    ],
  },
  {
    id: 'diriyah-slip',
    name: { en: 'Diriyah Slip-On', ar: 'الدرعية سليب أون' },
    category: 'casual',
    type: 'casual',
    material: 'suede',
    materials: ['canvas', 'suede', 'leather'],
    colorways: [
      cw('Brown', 'بني', 'brown', '#7A4B2A', '#7A4B2A', '#D9C3A0', '#D9C3A0', '#1E1F23'),
      cw('Navy', 'كحلي', 'navy', '#1F2E57', '#1F2E57', '#FFFFFF', '#FFFFFF', '#FF5A1F'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-08-14',
    popularity: 71,
    description: {
      en: 'Easy on, easy off. Soft suede and a flexible sole for long days around the city.',
      ar: 'سهل اللبس والخلع. شامواه ناعم ونعل مرن لأيام طويلة في المدينة.',
    },
    highlights: [
      { en: 'Soft suede upper', ar: 'جزء علوي من الشامواه الناعم' },
      { en: 'Flexible rubber sole', ar: 'نعل مطاطي مرن' },
    ],
  },
  {
    id: 'weekend-lace',
    name: { en: 'Weekend Lace', ar: 'ويكند ليس' },
    category: 'casual',
    type: 'casual',
    material: 'canvas',
    materials: ['canvas', 'suede'],
    colorways: [
      cw('White', 'أبيض', 'white', '#FFFFFF', '#FFB38F', '#FFFFFF', '#FF5A1F', '#FF5A1F'),
      cw('Gray', 'رمادي', 'gray', '#9A9EA6', '#FFFFFF', '#FFFFFF', '#1E1F23', '#1E1F23'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-11-05',
    popularity: 64,
    description: {
      en: 'A bright, simple lace-up for weekends and travel. Pick your colors and make it yours.',
      ar: 'حذاء برباط بسيط ومشرق لعطلة الأسبوع والسفر. اختر ألوانك وخله لك.',
    },
    highlights: [
      { en: 'Light for travel', ar: 'خفيف للسفر' },
      { en: 'Easy to clean', ar: 'سهل التنظيف' },
    ],
  },
  {
    id: 'lab-one',
    name: { en: 'Lab One', ar: 'لاب ون' },
    category: 'sneakers',
    type: 'sneakers',
    material: 'canvas',
    materials: ['canvas', 'suede', 'leather', 'italian'],
    colorways: [
      cw('Signature Orange', 'برتقالي مميز', 'orange', '#FF5A1F', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#1E1F23'),
      cw('Night', 'ليلي', 'black', '#1E1F23', '#FF5A1F', '#FFFFFF', '#FFFFFF', '#FF5A1F'),
      cw('Cloud', 'غيمة', 'white', '#FFFFFF', '#D9C3A0', '#FFFFFF', '#FFFFFF', '#FF5A1F'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-09-20',
    popularity: 100,
    description: {
      en: 'Our signature sneaker and the best place to start. Every part can be changed in the customizer.',
      ar: 'السنيكرز المميز حقنا وأفضل بداية. تقدر تغيّر كل جزء فيه من صفحة التصميم.',
    },
    highlights: [
      { en: 'Fully customizable', ar: 'قابل للتخصيص بالكامل' },
      { en: 'Initials on the heel', ar: 'حروفك على الكعب' },
    ],
  },
  {
    id: 'lab-one-leather',
    name: { en: 'Lab One Leather', ar: 'لاب ون جلد' },
    category: 'sneakers',
    type: 'sneakers',
    material: 'leather',
    materials: ['leather', 'italian'],
    colorways: [
      cw('White', 'أبيض', 'white', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#1F2E57'),
      cw('Black', 'أسود', 'black', '#1E1F23', '#1E1F23', '#1E1F23', '#1E1F23', '#FF5A1F'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-10-28',
    popularity: 93,
    description: {
      en: 'The Lab One in real leather. Clean lines, strong stitching and a look that works with everything.',
      ar: 'لاب ون بالجلد الطبيعي. خطوط نظيفة وخياطة قوية وشكل يناسب كل شي.',
    },
    highlights: [
      { en: 'Full-grain leather', ar: 'جلد طبيعي كامل' },
      { en: 'Padded collar', ar: 'حافة مبطنة' },
    ],
  },
  {
    id: 'riyadh-court',
    name: { en: 'Riyadh Court', ar: 'رياض كورت' },
    category: 'sneakers',
    type: 'sneakers',
    material: 'suede',
    materials: ['canvas', 'suede', 'leather'],
    colorways: [
      cw('Navy', 'كحلي', 'navy', '#1F2E57', '#D9C3A0', '#FFFFFF', '#FFFFFF', '#D9C3A0'),
      cw('Burgundy', 'عنابي', 'brown', '#8E1F2C', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#1E1F23'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-07-11',
    popularity: 79,
    description: {
      en: 'A court-style sneaker in soft suede with a contrast side panel.',
      ar: 'سنيكرز بستايل الملاعب من الشامواه الناعم مع لوحة جانبية بلون مختلف.',
    },
    highlights: [
      { en: 'Soft suede', ar: 'شامواه ناعم' },
      { en: 'Contrast side panel', ar: 'لوحة جانبية بلون مختلف' },
    ],
  },
  {
    id: 'dune-runner',
    name: { en: 'Dune Runner', ar: 'دون رنر' },
    category: 'running',
    type: 'running',
    material: 'canvas',
    materials: ['canvas', 'suede'],
    colorways: [
      cw('Orange Glow', 'برتقالي متوهج', 'orange', '#FF5A1F', '#1E1F23', '#FFFFFF', '#1E1F23', '#FFB38F'),
      cw('Sand Storm', 'عاصفة رملية', 'sand', '#D9C3A0', '#FF5A1F', '#FFFFFF', '#FFFFFF', '#FF5A1F'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-11-12',
    popularity: 97,
    description: {
      en: 'A light running shoe with a high-bounce sole. Made for early morning runs and the gym.',
      ar: 'حذاء جري خفيف بنعل مرن. مصمم للجري الصباحي والنادي.',
    },
    highlights: [
      { en: 'High-bounce sole', ar: 'نعل عالي الارتداد' },
      { en: 'Light breathable upper', ar: 'جزء علوي خفيف يتنفس' },
    ],
  },
  {
    id: 'tuwaiq-trail',
    name: { en: 'Tuwaiq Trail', ar: 'طويق ترايل' },
    category: 'running',
    type: 'running',
    material: 'suede',
    materials: ['canvas', 'suede'],
    colorways: [
      cw('Olive', 'زيتي', 'olive', '#6B7340', '#D9C3A0', '#1E1F23', '#FF5A1F', '#FF5A1F'),
      cw('Brown', 'بني', 'brown', '#7A4B2A', '#1E1F23', '#1E1F23', '#D9C3A0', '#D9C3A0'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-06-03',
    popularity: 74,
    description: {
      en: 'Strong grip for desert trails and weekend hikes, with extra support around the heel.',
      ar: 'قبضة قوية لمسارات الصحراء والهايكنج مع دعم إضافي حول الكعب.',
    },
    highlights: [
      { en: 'Strong grip sole', ar: 'نعل بقبضة قوية' },
      { en: 'Heel support', ar: 'دعم للكعب' },
    ],
  },
  {
    id: 'night-sprint',
    name: { en: 'Night Sprint', ar: 'نايت سبرنت' },
    category: 'running',
    type: 'running',
    material: 'canvas',
    materials: ['canvas', 'suede'],
    colorways: [
      cw('Black', 'أسود', 'black', '#1E1F23', '#9A9EA6', '#1E1F23', '#FF5A1F', '#FF5A1F'),
      cw('Navy', 'كحلي', 'navy', '#1F2E57', '#FFB38F', '#FFFFFF', '#FFFFFF', '#FFB38F'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-10-19',
    popularity: 82,
    description: {
      en: 'A fast, low-profile trainer for evening runs and short races.',
      ar: 'حذاء تمرين سريع ومنخفض للجري المسائي والسباقات القصيرة.',
    },
    highlights: [
      { en: 'Low and fast', ar: 'منخفض وسريع' },
      { en: 'Bright details for the night', ar: 'تفاصيل لامعة لليل' },
    ],
  },
  {
    id: 'cloud-walk',
    name: { en: 'Cloud Walk', ar: 'كلاود ووك' },
    category: 'comfort',
    type: 'comfort',
    material: 'canvas',
    materials: ['canvas', 'suede', 'leather'],
    colorways: [
      cw('Gray', 'رمادي', 'gray', '#9A9EA6', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FF5A1F'),
      cw('Peach', 'خوخي', 'orange', '#FFB38F', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FF5A1F'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-09-02',
    popularity: 90,
    description: {
      en: 'Our softest sole. Made for people who stand or walk all day.',
      ar: 'أنعم نعل عندنا. مصمم للي يوقفون أو يمشون طول اليوم.',
    },
    highlights: [
      { en: 'Extra thick soft sole', ar: 'نعل سميك وناعم' },
      { en: 'Arch support', ar: 'دعم لقوس القدم' },
    ],
  },
  {
    id: 'daily-support',
    name: { en: 'Daily Support', ar: 'ديلي سبورت' },
    category: 'comfort',
    type: 'comfort',
    material: 'leather',
    materials: ['leather', 'italian'],
    colorways: [
      cw('Black', 'أسود', 'black', '#1E1F23', '#1E1F23', '#FFFFFF', '#1E1F23', '#9A9EA6'),
      cw('Brown', 'بني', 'brown', '#7A4B2A', '#D9C3A0', '#FFFFFF', '#7A4B2A', '#D9C3A0'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'wide',
    added: '2026-05-21',
    popularity: 68,
    description: {
      en: 'A leather comfort shoe with a firm heel and a removable insole for your own support.',
      ar: 'حذاء جلد مريح بكعب ثابت وفرشة تنشال عشان تحط دعمك الخاص.',
    },
    highlights: [
      { en: 'Removable insole', ar: 'فرشة قابلة للإزالة' },
      { en: 'Firm heel cup', ar: 'كعب ثابت' },
    ],
  },
  {
    id: 'majlis-soft',
    name: { en: 'Majlis Soft', ar: 'مجلس سوفت' },
    category: 'comfort',
    type: 'comfort',
    material: 'suede',
    materials: ['suede', 'leather'],
    colorways: [
      cw('Sand', 'رملي', 'sand', '#D9C3A0', '#D9C3A0', '#FFFFFF', '#7A4B2A', '#7A4B2A'),
      cw('Olive', 'زيتي', 'olive', '#6B7340', '#6B7340', '#D9C3A0', '#D9C3A0', '#D9C3A0'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-11-01',
    popularity: 61,
    description: {
      en: 'Warm suede and a cushioned sole. Smart enough for visits, soft enough for all day.',
      ar: 'شامواه دافئ ونعل مبطن. أنيق للزيارات ومريح طول اليوم.',
    },
    highlights: [
      { en: 'Cushioned sole', ar: 'نعل مبطن' },
      { en: 'Smart casual look', ar: 'شكل أنيق ويومي' },
    ],
  },
  {
    id: 'salon-oxford',
    name: { en: 'Salon Oxford', ar: 'صالون أكسفورد' },
    category: 'formal',
    type: 'formal',
    material: 'leather',
    materials: ['leather', 'italian'],
    colorways: [
      cw('Black', 'أسود', 'black', '#1E1F23', '#2b2b30', '#1E1F23', '#1E1F23', '#1E1F23'),
      cw('Brown', 'بني', 'brown', '#7A4B2A', '#5e3820', '#1E1F23', '#7A4B2A', '#5e3820'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-08-30',
    popularity: 85,
    description: {
      en: 'A classic oxford with a clean toe cap. Ready for the office, weddings and big meetings.',
      ar: 'أكسفورد كلاسيكي بمقدمة نظيفة. جاهز للمكتب والزواجات والاجتماعات المهمة.',
    },
    highlights: [
      { en: 'Classic toe cap', ar: 'مقدمة كلاسيكية' },
      { en: 'Leather sole', ar: 'نعل جلد' },
    ],
  },
  {
    id: 'capital-derby',
    name: { en: 'Capital Derby', ar: 'كابيتال ديربي' },
    category: 'formal',
    type: 'formal',
    material: 'italian',
    materials: ['leather', 'italian'],
    colorways: [
      cw('Burgundy', 'عنابي', 'brown', '#8E1F2C', '#6e1520', '#1E1F23', '#8E1F2C', '#6e1520'),
      cw('Navy', 'كحلي', 'navy', '#1F2E57', '#16213f', '#1E1F23', '#1F2E57', '#16213f'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-11-15',
    popularity: 77,
    description: {
      en: 'Premium Italian leather with a rich color and a soft shine. Our finest formal shoe.',
      ar: 'جلد إيطالي فاخر بلون غني ولمعة ناعمة. أفخم حذاء رسمي عندنا.',
    },
    highlights: [
      { en: 'Premium Italian leather', ar: 'جلد إيطالي فاخر' },
      { en: 'Hand-finished edges', ar: 'حواف مشطبة يدويًا' },
    ],
  },
  {
    id: 'evening-loafer',
    name: { en: 'Evening Loafer', ar: 'إيفننق لوفر' },
    category: 'formal',
    type: 'formal',
    material: 'italian',
    materials: ['suede', 'leather', 'italian'],
    colorways: [
      cw('Black', 'أسود', 'black', '#1E1F23', '#1E1F23', '#1E1F23', '#1E1F23', '#D9C3A0'),
      cw('Sand', 'رملي', 'sand', '#D9C3A0', '#7A4B2A', '#7A4B2A', '#D9C3A0', '#7A4B2A'),
    ],
    widths: ALL_WIDTHS,
    size: 42,
    width: 'normal',
    added: '2026-10-07',
    popularity: 66,
    description: {
      en: 'A soft formal shoe for dinners and events. Light, smart and easy to wear.',
      ar: 'حذاء رسمي ناعم للعزايم والمناسبات. خفيف وأنيق وسهل اللبس.',
    },
    highlights: [
      { en: 'Light and soft', ar: 'خفيف وناعم' },
      { en: 'Smart for events', ar: 'أنيق للمناسبات' },
    ],
  },
  {
    id: 'lab-one-wide',
    name: { en: 'Lab One Wide', ar: 'لاب ون عريض' },
    category: 'special',
    type: 'sneakers',
    material: 'canvas',
    materials: ['canvas', 'suede', 'leather'],
    colorways: [
      cw('Orange', 'برتقالي', 'orange', '#FF5A1F', '#1E1F23', '#FFFFFF', '#FFFFFF', '#1E1F23'),
      cw('White', 'أبيض', 'white', '#FFFFFF', '#9A9EA6', '#FFFFFF', '#1E1F23', '#FF5A1F'),
    ],
    widths: ['wide', 'xwide'],
    size: 44,
    width: 'xwide',
    added: '2026-09-28',
    popularity: 84,
    description: {
      en: 'The Lab One on an extra wide last. More room for the toes and no pressure on the sides.',
      ar: 'لاب ون على قالب عريض جدًا. مساحة أكبر للأصابع وبدون ضغط على الجوانب.',
    },
    highlights: [
      { en: 'Extra wide last', ar: 'قالب عريض جدًا' },
      { en: 'Room for orthotics', ar: 'مساحة لفرشة طبية' },
    ],
  },
  {
    id: 'grand-runner',
    name: { en: 'Grand Runner', ar: 'قراند رنر' },
    category: 'special',
    type: 'running',
    material: 'canvas',
    materials: ['canvas', 'suede'],
    colorways: [
      cw('Navy', 'كحلي', 'navy', '#1F2E57', '#FF5A1F', '#FFFFFF', '#FFFFFF', '#FF5A1F'),
      cw('Gray', 'رمادي', 'gray', '#9A9EA6', '#1E1F23', '#FFFFFF', '#1E1F23', '#1E1F23'),
    ],
    widths: ALL_WIDTHS,
    size: 49,
    width: 'normal',
    added: '2026-07-25',
    popularity: 70,
    description: {
      en: 'Big sizes made right. Our running shoe in EU 48 to 50, built on a longer last.',
      ar: 'المقاسات الكبيرة بالشكل الصحيح. حذاء الجري حقنا بمقاسات 48 إلى 50 على قالب أطول.',
    },
    highlights: [
      { en: 'EU 48 to 50', ar: 'مقاسات 48 إلى 50' },
      { en: 'Longer last', ar: 'قالب أطول' },
    ],
  },
  {
    id: 'easy-fit',
    name: { en: 'Easy Fit Comfort', ar: 'إيزي فت كمفورت' },
    category: 'special',
    type: 'comfort',
    material: 'canvas',
    materials: ['canvas', 'suede', 'leather'],
    colorways: [
      cw('Sand', 'رملي', 'sand', '#D9C3A0', '#FFFFFF', '#FFFFFF', '#7A4B2A', '#7A4B2A'),
      cw('Black', 'أسود', 'black', '#1E1F23', '#9A9EA6', '#FFFFFF', '#FFFFFF', '#9A9EA6'),
    ],
    widths: ['wide', 'xwide'],
    size: 42,
    width: 'xwide',
    added: '2026-06-18',
    popularity: 73,
    description: {
      en: 'Extra wide and extra soft. Made for wide feet, swollen feet and long shifts.',
      ar: 'عريض جدًا وناعم جدًا. مصمم للقدم العريضة والقدم المتورمة والدوامات الطويلة.',
    },
    highlights: [
      { en: 'Extra wide fit', ar: 'مقاس عريض جدًا' },
      { en: 'Soft thick sole', ar: 'نعل سميك وناعم' },
    ],
  },
  {
    id: 'petite-casual',
    name: { en: 'Petite Casual', ar: 'بيتيت كاجوال' },
    category: 'special',
    type: 'casual',
    material: 'canvas',
    materials: ['canvas', 'suede'],
    colorways: [
      cw('Peach', 'خوخي', 'orange', '#FFB38F', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FF5A1F'),
      cw('White', 'أبيض', 'white', '#FFFFFF', '#D9C3A0', '#FFFFFF', '#FFFFFF', '#D9C3A0'),
    ],
    widths: ['narrow', 'normal'],
    size: 37,
    width: 'narrow',
    added: '2026-10-24',
    popularity: 62,
    description: {
      en: 'Small sizes with a proper fit. EU 36 to 38 on a narrow last, so your foot does not slide.',
      ar: 'مقاسات صغيرة بمقاس مضبوط. من 36 إلى 38 على قالب ضيق عشان ما تتحرك قدمك.',
    },
    highlights: [
      { en: 'EU 36 to 38', ar: 'مقاسات 36 إلى 38' },
      { en: 'Narrow last', ar: 'قالب ضيق' },
    ],
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);

export const fromPrice = (p: Product) => shoePrice(p.type, p.material, p.size, p.size, p.width);

export const bestSellers = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 8);
