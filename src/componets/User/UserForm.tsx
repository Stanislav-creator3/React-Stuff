import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import UserSingnupForm from "./UserSingnupForm";
import style from "../../styles/User.module.scss";
import { toggleForm, toggleFormType } from "../../features/user/userSlice";
import UserLoginForm from "./UserLoginForm";
const UserForm: FC = () => {
  const dispatch = useAppDispatch();
  const { showForm, formType } = useAppSelector(({ user }) => user);

  const closeForm = () => dispatch(toggleForm(false));
  const toggleCurrentFormType = (type: string) =>
    dispatch(toggleFormType(type));
  return showForm ? (
    <>
      <div className={style.overlay} onClick={closeForm} />
      {formType === "signup" ? (
        <UserSingnupForm
          closeForm={closeForm}
          toggleCurrentFormType={toggleCurrentFormType}
        />
      ) : (
        <UserLoginForm
          closeForm={closeForm}
          toggleCurrentFormType={toggleCurrentFormType}
        />
      )}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
