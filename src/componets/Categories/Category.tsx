import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/Api/apiSlice";

import style from "../../styles/Category.module.scss";
import Products from "../Products/Products";
import { BasicFormTypeValues, TFormCategory, initialFormValues } from "./types";
import { useAppSelector } from "../../hooks/redux";
import { TProduct } from "../Products/types";

const Category: FC = () => {
  const { id } = useParams();
  const { list } = useAppSelector(({ categories }) => categories);

  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...initialFormValues,
  };
  const [params, setParams] = useState(defaultParams);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const [values, setValues] = useState<TFormCategory>(initialFormValues);
  const [cat, setCat] = useState("");
  const [items, setItems] = useState<TProduct[] | []>([]);

  const { data, isLoading, isSuccess } = useGetProductsQuery(params);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value: BasicFormTypeValues = event.target.value;
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isLoading) return;

    if (!data.length) return setIsEnd(true);

    const products: TProduct[] = Object.values(data);

    if (!products.length) return;
    setItems((_items): TProduct[] => [..._items, ...products]);
  }, [data, isLoading]);

  useEffect(() => {
    if (!id) return;

    setValues(initialFormValues);
    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  useEffect(() => {
    if (!id || !list.length) return;
    const category = list.find((item) => item.id === Number(id) * 1);
    if (category) setCat(category.name);
  }, [list, id]);
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, ...values });
  };
  const handleReset = () => {
    setValues(initialFormValues);
    setParams(defaultParams);
    setIsEnd(false);
  };

  return (
    <section className={style.wrapper}>
      <h2 className={style.title}>{cat}</h2>
      <form className={style.filters} onSubmit={handleSubmit}>
        <div className={style.filter}>
          <input
            type="text"
            name="title"
            placeholder="product name"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className={style.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            onChange={handleChange}
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={style.filter}>
          <input
            type="number"
            name="price_max"
            placeholder="0"
            onChange={handleChange}
            value={values.price_max}
          />
          <span>Price to</span>
        </div>
        <button type="submit" hidden></button>
      </form>
      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={style.back}>
          <span>Not results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}
      {!isEnd && (
        <div className={style.more}>
          <button
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        </div>
      )}
    </section>
  );
};

export default Category;
