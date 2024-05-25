/// <reference types="vite-plugin-svgr/client" />
import { FC, useEffect, useState } from "react";
import style from "../../styles/Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/router";
import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";
import Sprite from "../../../public/sprite.svg?react";
import Heart from "../../../public/heart.svg?react";
import Basket from "../../../public/basket.svg?react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/Api/apiSlice";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser, cart } = useAppSelector(({ user }) => user);
  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  const handleSearch = ({
    target: { value },
  }: {
    target: HTMLInputElement;
  }) => {
    setSearchValue(value);
  };

  return (
    <div className={style.header}>
      <div className={style.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>
      <div className={style.info}>
        <div className={style.user} onClick={handleClick}>
          <div
            className={style.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          ></div>
          <div className={style.username}>{values.name}</div>
        </div>
        <form className={style.form}>
          <div className={style.icon}>
            <Sprite className="icon" />
          </div>
          <div className={style.input}>
            <input
              type="search"
              name="search"
              placeholder="Search for anyting..."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          {searchValue && (
            <div className={style.box}>
              {isLoading
                ? "Loading..."
                : !data.length
                ? "No results"
                : data.map(
                    ({
                      title,
                      images,
                      id,
                    }: {
                      title: string;
                      images: string[];
                      id: number;
                    }) => {
                      return (
                        <Link
                          key={id}
                          onClick={() => setSearchValue("")}
                          className={style.item}
                          to={`/products/${id}`}
                          title={title}
                        >
                          <div
                            className={style.image}
                            style={{ backgroundImage: `url(${images[0]})` }}
                          />
                          <div className={style.title}>{title}</div>
                        </Link>
                      );
                    }
                  )}
            </div>
          )}
        </form>
        <div className={style.account}>
          <Link to={ROUTES.CART} className={style.favourites}>
            <Heart className={style["icon-fav"]} />
          </Link>
          <Link to={ROUTES.CART} className={style.cart}>
            <Basket className={style["icon-cart"]} />
            {!!cart.length && <span className={style.count}>{cart.length}</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
