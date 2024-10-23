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

  useEffect(() => {
    getUserLanguages();
  }, [userLanguages]);

  return (
    <>
      <p>{userLanguages}</p>
    </>
  );
};

export default UserLanguage;
