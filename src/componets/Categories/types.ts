type TProduct = {
    id: number;
    image: string;
    name: string;
  };
  
  export type TCategories = {
    title: string;
    products: [] | TProduct[];
    amount: number;
  };
  
  export type TFormCategory = {
    title: string;
    price_min: number;
    price_max: number
  };
  
  export type BasicFormTypeValues = TFormCategory[keyof TFormCategory];
  
  export const initialFormValues: TFormCategory = {
    title: "",
    price_min: 0,
    price_max: 0,
  };

  export type TParams = {
    title: string;
    price_min: number;
    price_max: number
    categoryId: number | undefined,

  };
