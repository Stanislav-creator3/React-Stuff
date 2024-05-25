import { FC } from "react";

import style from "../../styles/Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

type Tlist = {
  id: number;
  name: string;
};

const Sidebar: FC = () => {
  const { list } = useAppSelector(({ categories }) => categories);
  const categories = list
    .reduce((o: Array<Tlist>, item: Tlist) => {
      if (!o.find((i: Tlist) => i.name === item.name)) {
        o.push(item);
      }
      return o;
    }, [])
    .filter((_, i) => i < 5);
  return (
    <section className={style.sidebar}>
      <div className={style.title}>CATEGORIES</div>
      <nav>
        <ul className={style.menu}>
          {categories.map(({ id, name }) => (
            <li key={id}>
              <NavLink
                className={({ isActive }) =>
                  `${style.link} ${isActive ? style.active : ""}`
                }
                to={`/categories/${id}`}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={style.footer}>
        <a href="/help" target="_blank" className={style.link}>
          Help
        </a>
        <a
          href="/terms"
          target="_blank"
          className={style.link}
          style={{ textDecoration: "underline" }}
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
