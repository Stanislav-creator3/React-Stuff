export type TCategory = {
  id: string;
  name: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
};

export type TCart = {
  id: number;
  images: string[];
  title: string;
  category: TCategory;
  description: string;
  creationAt: Date;
  updatedAt: Date;
  price: number;
  quantity: number;
};

export type TCurrentUser = {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
  creationAt: Date;
  updatedAt: Date;
};

export type TState = {
  currentUser: null | TCurrentUser;
  cart: TCart[] | [];
  isLoading: boolean;
  showForm: boolean;
  formType: string;
};

export type TUpdateUser = {
  id?: number;
  name: string;
  password: string;
  email: string;
  avatar: string;
};

export type TLoginUser = {
  password: string;
  email: string;
};

export type TCreateUser = {
  name: string;
  password: string;
  email: string;
  avatar: string;
};