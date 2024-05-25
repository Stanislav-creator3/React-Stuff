export type TProduct = {
  id: number;
  title: string;
  price: number;
  category: TCategory;
  images: string[];
  description: string;
  creationAt: Date;
  updatedAt: Date;
};

export type TCategory = {
  id: number;
  name: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
};

export type TState = {
    list: TProduct[] | [],
    filtered: TProduct[] | [],
    related: TProduct[] | [],
    isLoading: boolean,

}