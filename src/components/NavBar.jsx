import React from "react";
import { Link } from "react-router-dom";
import styles from "./Link.module.css";

const NavBar = () => {
  return (
    <nav>
      <ul className={styles.ul}>
        <li>
          <Link to="/" className={styles.li}>
            See what's trending
          </Link>
        </li>
        <li>
          <Link to="/sign-up" className={styles.li}>
            Join us today
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
