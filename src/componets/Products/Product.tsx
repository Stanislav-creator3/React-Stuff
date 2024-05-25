import { FC, useEffect, useState } from "react";
import style from "../../styles/Product.module.scss";
import { TProduct } from "./types";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/router";
import { useAppDispatch } from "../../hooks/redux";
import { addItemToCart } from "../../features/user/userSlice";

const Product: FC<TProduct> = (item) => {
  const { images, title, price, description } = item;
  const dispatch = useAppDispatch();

  const sizes = [4, 4.5, 5];
  const [currentImage, setCurrentImages] = useState("");
  const [currentSize, setCurrentSize] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    setCurrentImages(images[0]);
  }, [images]);
  const addToCart = () => {
    dispatch(addItemToCart(item));
  };
  return (
    <section className={style.product}>
      <div className={style.images}>
        <div
          className={style.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={style["images-list"]}>
          {images.map((image, i) => (
            <div
              key={i}
              className={style.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImages(image)}
            />
          ))}
        </div>
      </div>
      <div className={style.info}>
        <h1 className={style.title}>{title}</h1>
        <div className={style.price}>{price}$</div>
        <div className={style.color}>
          <span>Color:</span> Green
        </div>
        <div className={style.sizes}>
          <span>Sizes:</span>
          <div className={style.list}>
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => setCurrentSize(size)}
                className={`${style.size} ${
                  currentSize === size ? style.active : ""
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <p className={style.description}>{description}</p>
        <div className={style.actions}>
          <button
            onClick={addToCart}
            className={style.add}
            disabled={!currentSize}
          >
            Add to cart
          </button>
          <button className={style.favourite}>Add to favourite</button>
        </div>
        <div className={style.bottom}>
          <div className={style.purchases}>19 people purchased</div>
          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
