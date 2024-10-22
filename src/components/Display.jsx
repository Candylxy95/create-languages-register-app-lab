import React, { useState, useEffect, useRef } from "react";
import Language from "./Language";

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
      <div className="container text-center">
        <input
          type="text"
          ref={languageRef}
          placeholder="Add a language"
          className="col-md-3"
        />
        <button className="col-md-3" onClick={addLanguage}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Display;
