/// <reference types="vite-plugin-svgr/client" />

import { FC } from "react";

import style from "../../styles/Footer.module.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/router";
import LOGO from "../../images/logo.svg";
import InstagramIcon from "../../../public/instagram.svg?react";
import FaceBookIcon from "../../../public/facebook.svg?react";
import YouTubeIcon from "../../../public/youtube.svg?react";

const Footer: FC = () => {
  return (
    <section className={style.footer}>
      <div className={style.logo}>
        <Link to={ROUTES.HOME}></Link>
        <img src={LOGO} alt="Stuff" />
      </div>
      <div className={style.rights}>
        <a href="#" target="_blank" rel="noreferrer">
          GitHab
        </a>
      </div>
      <div className={style.socials}>
        <a href="#" target="_blank" rel="noreferrer"><YouTubeIcon className="icon"/></a>
        <a href="#" target="_blank" rel="noreferrer">
          <InstagramIcon className="icon" />
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          <FaceBookIcon className="icon" />
        </a>
      </div>
    </section>
  );
};

export default Footer;
