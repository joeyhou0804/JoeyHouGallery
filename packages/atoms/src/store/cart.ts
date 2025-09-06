import { atom } from 'jotai';

export type CartItem = {
  id: string;
  title: string;
  price: number; // cents
  qty: number;
};

export const cartAtom = atom<CartItem[]>([]);

export const cartCountAtom = atom((get) => get(cartAtom).reduce((n, i) => n + i.qty, 0));

export const cartTotalAtom = atom((get) =>
  get(cartAtom).reduce((sum, i) => sum + i.price * i.qty, 0)
);

