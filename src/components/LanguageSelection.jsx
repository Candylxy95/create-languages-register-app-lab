import React, { useState, useRef, useEffect } from "react";
import styles from "./Userprofile.module.css";

const LanguageSelection = (props) => {
  const [languages, setLanguages] = useState([]);
  const languageRef = useRef();

  const getData = async () => {
    //get all available languages to populate in option values
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
  const addUserLanguage = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: props.id,
          language: languageRef.current.value,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("Language can't be added");
    }

    console.log(props.id);
    getData();
  };

  useEffect(() => {
    getData();
  }, [languages]);

  return (
    <>
      <select name="language-option" ref={languageRef}>
        {languages.map((language, idx) => {
          return (
            <option key={idx} value={language.language}>
              {language.language}
            </option>
          );
        })}
      </select>
      <br />
      <button onClick={addUserLanguage} className={styles.petitbtn}>
        Add
      </button>
    </>
  );
};

export default LanguageSelection;
