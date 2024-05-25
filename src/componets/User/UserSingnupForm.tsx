/// <reference types="vite-plugin-svgr/client" />
import { FC, useState } from "react";
import style from "../../styles/User.module.scss";
import CloseIcon from "../../../public/cancel_close_delete_icon.svg?react";
import {
  BasicFormTypeValues,
  TForm,
  TUseSingupForm,
  initialFormValues,
} from "./types";
import { useAppDispatch } from "../../hooks/redux";
import { createUser } from "../../features/user/userSlice";

const UserSingnupForm: FC<TUseSingupForm> = ({ closeForm, toggleCurrentFormType}) => {
  const [values, setValues] = useState<TForm>(initialFormValues);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value: BasicFormTypeValues = event.target.value;
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;
    dispatch(createUser(values))
    closeForm()
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
            type="name"
            name="name"
            placeholder="Your name"
            value={values.name}
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

        <div className={style.group}>
          <input
            type="avatar"
            name="avatar"
            placeholder="Your avatar"
            value={values.avatar}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.link} onClick={() => toggleCurrentFormType("login")}>I already have an account</div>
        <button className={style.submit} type="submit">
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSingnupForm;
