/// <reference types="vite-plugin-svgr/client" />

import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import style from "../../styles/Cart.module.scss";
import MinusIcon from "../../../public/211863_minus_round_icon 1.svg?react";
import AddIcon from "../../../public/134224_add_plus_new_icon 1.svg?react";
import CloseIcon from "../../../public/392517_close_delete_remove_icon 1.svg?react";
import { sumBy } from "../../utils/common";
import { addItemToCart, removeItemCart } from "../../features/user/userSlice";
import { TCart } from "../../features/user/types";
import { Link } from "react-router-dom";

const Cart: FC = () => {
  const { cart } = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();
  const changeQuantity = (item: TCart, quantity: number) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };
  const removeItem = (item: TCart) => {
    dispatch(removeItemCart(item.id));
  };

  return (
    <section className={style.cart}>
      <h2 className={style.title}>You cart</h2>
      {!cart.length ? (
        <div className={style.empty}>Here is empty</div>
      ) : (
        <>
          <div className={style.list}>
            {cart.map((item) => {
              const { title, price, quantity, images, id, category } = item;
              return (
                <div className={style.item} key={id}>
                  <div
                    className={style.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <Link to={`/products/${id}`}>
                    <div className={style.info}>
                      <h3 className={style.name}>{title}</h3>
                      <div className={style.category}>{category.name}</div>
                    </div>
                  </Link>

                  <div className={style.price}>{price}$</div>

                  <div className={style.quantity}>
                    <div
                      className={style.minus}
                      onClick={() => {
                        changeQuantity(item, Math.max(1, quantity - 1));
                      }}
                    >
                      <MinusIcon className="icon" />
                    </div>
                    <span>{quantity}</span>
                    <div
                      className={style.plus}
                      onClick={() => {
                        changeQuantity(item, Math.max(1, quantity + 1));
                      }}
                    >
                      <AddIcon className="icon" />
                    </div>
                  </div>
                  <div className={style.total}>{price * quantity}$</div>
                  <div className={style.close} onClick={() => removeItem(item)}>
                    <CloseIcon />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={style.actions}>
            <div className={style.total}>
              Total price{" "}
              <span>
                {sumBy(cart.map((item) => item.price * item.quantity))}$
              </span>
            </div>

            <button className={style.proceed}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
