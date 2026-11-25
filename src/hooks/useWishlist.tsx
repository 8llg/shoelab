import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { readStore, writeStore } from './storage';

type WishlistValue = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => readStore<string[]>('shoelab-wishlist', []));

  useEffect(() => writeStore('shoelab-wishlist', ids), [ids]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const toggle = useCallback(
    (id: string) => {
      const adding = !ids.includes(id);
      setIds((list) => (adding ? [...list, id] : list.filter((x) => x !== id)));
      return adding;
    },
    [ids],
  );

  const value = useMemo(() => ({ ids, has, toggle }), [ids, has, toggle]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
