import React from "react";
import styles from "./Button.module.css";

const Language = (props) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <p id={props.id} className="mb-3">
          {props.language}
        </p>
        <button
          className={styles.btn}
          onClick={() => props.delLanguage(props.language)}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default Language;
