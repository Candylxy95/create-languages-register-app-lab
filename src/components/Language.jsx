import React from "react";

const Language = (props) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <p id={props.id} className="mb-3">
          {props.language}
        </p>
        <button
          className="mb-3"
          onClick={() => props.delLanguage(props.language)}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default Language;
