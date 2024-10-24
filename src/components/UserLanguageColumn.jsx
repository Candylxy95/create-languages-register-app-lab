import React, { useEffect, useRef, useState } from "react";
import styles from "./Userprofile.module.css";

const UserLanguageColumn = (props) => {
  const [languages, setLanguages] = useState([]); //available languages
  const languageRef = useRef(); //store value of selection
  const [userLanguages, setUserLanguages] = useState([]);

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

  const getUserLanguages = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/users/languages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: props.id,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("getting data error");
      }
      const data = await res.json();
      setUserLanguages(data);
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
    getUserLanguages(); //get userLanguage data instead.
    console.log(props.id);
  };

  const delUserLanguage = async (idx) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/users/languages",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: props.id,
            language: userLanguages[idx],
          }),
        }
      );
      if (!res.ok) {
        throw new Error("getting data error");
      }
      const data = await res.json();
      setUserLanguages(data);
    } catch (error) {
      console.error(error.message);
    }
    getUserLanguages();
    console.log(userLanguages);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getUserLanguages();
  }, []);

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
      <button
        onClick={() => {
          if (!userLanguages.includes(languageRef.current.value)) {
            addUserLanguage();
          } else {
            alert("Language has already been selected");
          }
        }}
        className={styles.petitbtn}
      >
        Add
      </button>
      <div className="mb-5"></div>
      <p className={styles.boldfont}>Currently Learning</p>

      {Array.isArray(userLanguages) && userLanguages.length > 0 ? (
        userLanguages.map((userLanguage, idx) => {
          return (
            <div key={idx} className={styles.languagelist}>
              {userLanguage}
              <button
                type="button"
                onClick={() => delUserLanguage(idx)}
                className={styles.petitbtn}
              >
                Remove
              </button>
              <div className="mb-4"></div>
            </div>
          );
        })
      ) : (
        <p>No languages found</p>
      )}
    </>
  );
};

export default UserLanguageColumn;
