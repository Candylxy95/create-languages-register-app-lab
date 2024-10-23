import React, { useState, useEffect } from "react";
import styles from "./Userprofile.module.css";

const UserLanguage = (props) => {
  const [userLanguages, setUserLanguages] = useState([]);

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
  };

  useEffect(() => {
    getUserLanguages();
  }, [userLanguages]);

  return (
    <>
      <div className="mb-5"></div>
      <p className={styles.boldfont}>Currently Learning</p>
      {userLanguages.map((userLanguage, idx) => {
        return (
          <div className={styles.languagelist}>
            <p key={idx}>{userLanguage} </p>
            <button
              onClick={() => delUserLanguage(idx)}
              className={styles.petitbtn}
            >
              Remove
            </button>
            <div className="mb-4"></div>
          </div>
        );
      })}
    </>
  );
};

export default UserLanguage;
