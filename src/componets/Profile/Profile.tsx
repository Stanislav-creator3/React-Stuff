import { FC, useEffect, useState } from "react";

import style from "../../styles/Profile.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BasicFormTypeValues, TForm, initialFormValues } from "../User/types";
import { updateUser } from "../../features/user/userSlice";

const Profile: FC = () => {
  const [values, setValues] = useState<TForm>(initialFormValues);
  const { currentUser } = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value: BasicFormTypeValues = event.target.value;
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  useEffect(() => {
    if(!currentUser) return
    setValues(currentUser)
  }, [currentUser])

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;
    dispatch(updateUser(values));
  };
  return (
    <section className={style.profile}>
      {!currentUser ? (
        <span>You need to login</span>
      ) : (
        <form className={style.form} onSubmit={handleSubmit}>
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
              type="avatar"
              name="avatar"
              placeholder="Your avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
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
          <button className={style.submit} type="submit">
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
