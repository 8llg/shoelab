import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  FREE_DELIVERY_FROM,
  PROMO_CODE,
  PROMO_RATE,
  STANDARD_DELIVERY,
  VAT_RATE,
  type Category,
  type L,
  type Material,
  type Parts,
  type ShoeType,
  type Width,
} from '../data/catalog';
import { readStore, writeStore } from './storage';

export type Design = {
  type: ShoeType;
  category: Category;
  parts: Parts;
  material: Material;
  sizeLeft: number;
  sizeRight: number;
  width: Width;
  initials: string;
};

export type CartItem = {
  key: string;
  productId: string | null;
  name: L;
  custom: boolean;
  design: Design;
  price: number;
  qty: number;
};

export type Totals = {
  count: number;
  subtotal: number;
  discount: number;
  delivery: number;
  vat: number;
  total: number;
  freeDelivery: boolean;
};

type CartValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'key' | 'qty'>, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  promo: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  totals: (deliveryCost?: number) => Totals;
  drawer: boolean;
  setDrawer: (open: boolean) => void;
};

const CartContext = createContext<CartValue | null>(null);

const designKey = (productId: string | null, d: Design) =>
  [productId ?? 'custom', d.type, d.material, d.sizeLeft, d.sizeRight, d.width, d.initials, ...Object.values(d.parts)].join('|');

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStore<CartItem[]>('shoelab-cart', []));
  const [promo, setPromo] = useState<string | null>(() => readStore<string | null>('shoelab-promo', null));
  const [drawer, setDrawer] = useState(false);

  useEffect(() => writeStore('shoelab-cart', items), [items]);
  useEffect(() => writeStore('shoelab-promo', promo), [promo]);

  const add = useCallback((item: Omit<CartItem, 'key' | 'qty'>, qty = 1) => {
    const key = designKey(item.productId, item.design);
    setItems((list) => {
      const found = list.find((i) => i.key === key);
      if (found) return list.map((i) => (i.key === key ? { ...i, qty: Math.min(9, i.qty + qty) } : i));
      return [...list, { ...item, key, qty }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((list) => list.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(9, qty)) } : i)));
  }, []);

  const remove = useCallback((key: string) => setItems((list) => list.filter((i) => i.key !== key)), []);
  const clear = useCallback(() => {
    setItems([]);
    setPromo(null);
  }, []);

  const applyPromo = useCallback((code: string) => {
    const ok = code.trim().toUpperCase() === PROMO_CODE;
    if (ok) setPromo(PROMO_CODE);
    return ok;
  }, []);

  const removePromo = useCallback(() => setPromo(null), []);

  const totals = useCallback(
    (deliveryCost?: number): Totals => {
      const count = items.reduce((n, i) => n + i.qty, 0);
      const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
      const discount = promo ? Math.round(subtotal * PROMO_RATE) : 0;
      const freeDelivery = subtotal >= FREE_DELIVERY_FROM;
      const delivery = count === 0 ? 0 : deliveryCost ?? (freeDelivery ? 0 : STANDARD_DELIVERY);
      const vat = Math.round((subtotal - discount + delivery) * VAT_RATE);
      return { count, subtotal, discount, delivery, vat, total: subtotal - discount + delivery + vat, freeDelivery };
    },
    [items, promo],
  );

  const value = useMemo(
    () => ({ items, add, setQty, remove, clear, promo, applyPromo, removePromo, totals, drawer, setDrawer }),
    [items, add, setQty, remove, clear, promo, applyPromo, removePromo, totals, drawer],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
