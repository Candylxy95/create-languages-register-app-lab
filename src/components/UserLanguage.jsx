import React, { useState, useEffect } from "react";

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
      {userLanguages.map((userLanguage, idx) => {
        return (
          <p key={idx}>
            {userLanguage}
            <button onClick={() => delUserLanguage(idx)}>Delete</button>
          </p>
        );
      })}
    </>
  );
};

export default UserLanguage;
