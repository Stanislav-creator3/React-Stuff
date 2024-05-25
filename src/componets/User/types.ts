export type TForm = {
  name: string;
  password: string;
  email: string;
  avatar: string;
};

export type TFormLogin = {
  password: string;
  email: string;
};

export type BasicFormTypeValues = TForm[keyof TForm];
export type BasicFormTypeValuesLogin = TFormLogin[keyof TFormLogin];

export const initialFormValues: TForm = {
  name: "",
  password: "",
  email: "",
  avatar: "",
};

export const initialFormValuesLogin: TFormLogin = {
  password: "",
  email: "",
};

export type TUseSingupForm = {
  closeForm: () => void;
  toggleCurrentFormType: (type : string) => { payload: string; type: "user/toggleFormType"; };
};
