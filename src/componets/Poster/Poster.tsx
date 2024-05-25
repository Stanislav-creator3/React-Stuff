import { FC } from "react";

import style from "../../styles/Home.module.scss";
import BG from "../../images/computer.png";

const Poster: FC = () => {
  return (
    <section className={style.home}>
      <div className={style.title}>BIG SALE 20%</div>
      <div className={style.product}>
        <div className={style.text}>
          <div className={style.subtitle}>the bestseller if 2024</div>
          <h1 className={style.head}>LENNON r2d2 with NVIDIA 5090 TI</h1>
          <button className={style.button}>Shop Now</button>
        </div>
        <div className={style.image}>
          <img src={BG} alt="bg" />
        </div>
      </div>
    </section>
  );
};

export default Poster;
