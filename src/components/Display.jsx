import React, { useState, useEffect, useRef } from "react";
import Language from "./Language";
import styles from "./Button.module.css";

const Display = () => {
  const [languages, setLanguages] = useState([]);
  const languageRef = useRef();

  const getData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");

      if (!res.ok) {
        throw new Error("getting data error");
      }
      const data = await res.json();
      setLanguages(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addLanguage = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageRef.current.value,
      }),
    });
    if (!res.ok) {
      throw new Error("Language can't be added");
    }
    getData();
    languageRef.current.value = "";
  };

  const delLanguage = async (language) => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/languages/" + language,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      throw new Error("language can't be deleted");
    }
    getData();
  };

  useEffect(() => {
    getData();
  }, []); //run on mount

  return (
    <>
      <div className="container d-flex justify-content-center text-center">
        <div className="col-md-9 align-items-center">
          <h1>Trending Languages</h1>
          <h3 style={{ fontStyle: "italic" }}>
            What would you like to learn today?
          </h3>
          <br />
          {languages.map((language, idx) => {
            return (
              <Language
                key={idx}
                id={idx}
                language={language.language}
                delLanguage={delLanguage}
              />
            );
          })}
        </div>
      </div>
      <br />
      <div className="container text-center">
        <p>
          Got a language you want to learn? <br />
          Contribute to our language list
        </p>
      </div>
      <div className="container text-center">
        <input
          type="text"
          ref={languageRef}
          placeholder="Add new language?"
          className="col-md-3"
        />
        <button className={styles.btn} onClick={addLanguage}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Display;
