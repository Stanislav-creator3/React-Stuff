import { FC } from "react";

import style from "../../styles/Categories.module.scss"
import { Link } from "react-router-dom";
import { TCategories } from "./types";

const Categories: FC<TCategories> = ({ title, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={style.section}>
<h2>{title}</h2>
<div className={style.list}>
    {list.map(({id, name, image}) => (
        <Link className={style.item} to={`/categories/${id}`} key={id}>
        <div  style={{background: `url(${image})`, backgroundSize: "cover"}} className={style.image}>
        </div>
        <h3 className={style.title}>{name}</h3>
        </Link>
    ))}
</div>
    </section>
  );
};

export default Categories;
