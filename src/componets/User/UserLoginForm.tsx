/// <reference types="vite-plugin-svgr/client" />
import { FC, useState } from "react";
import style from "../../styles/User.module.scss";
import CloseIcon from "../../../public/cancel_close_delete_icon.svg?react";
import {
  BasicFormTypeValuesLogin,
  TFormLogin,
  TUseSingupForm,
  initialFormValuesLogin,
} from "./types";
import { useAppDispatch } from "../../hooks/redux";
import { loginUser } from "../../features/user/userSlice";

const UserLoginForm: FC<TUseSingupForm> = ({ closeForm, toggleCurrentFormType }) => {
  const [values, setValues] = useState<TFormLogin>(initialFormValuesLogin);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value: BasicFormTypeValuesLogin = event.target.value;
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;
    dispatch(loginUser(values));
    closeForm();
  };

  return (
    <div className={style.wrapper}>
      <div className={style.close} onClick={closeForm}>
        <CloseIcon className="icon" />
      </div>
      <div className={style.title}>Sing Up</div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.group}>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.link} onClick={() => toggleCurrentFormType("signup")}>Create an account</div>
        <button className={style.submit} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;
