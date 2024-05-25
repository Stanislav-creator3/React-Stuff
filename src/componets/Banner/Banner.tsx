import { FC } from "react";

import style from "../../styles/Home.module.scss";
import bannerImg from "../../images/banner.png";

const Banner: FC = () => {
  return (
    <section className={style.banner}>
      <div className={style.left}>
        <p className={style.content}>
          NEW YEAR
          <span>SALE</span>
        </p>
        <button className={style.more}>See more</button>
      </div>
      <div
        className={style.right}
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <p className={style.discount}> 
          save to up <span>50%</span>off
        </p>
      </div>
    </section>
  );
};

export default Banner;
