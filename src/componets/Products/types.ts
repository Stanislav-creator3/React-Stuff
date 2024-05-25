import { TCategory } from "../../features/products/types";

export type TProduct = {
  id: number,
  images: string[];
  title: string;
  price: number;
  description: string;
  category: TCategory;
}

export type TProducts = {
  title: string;
  style?: object;
  products: [] | TProduct[];
  amount: number;

};

