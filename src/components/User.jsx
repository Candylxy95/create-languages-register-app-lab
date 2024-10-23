import React, { useState } from "react";
import UpdateModal from "./UpdateModal";
import UserLanguage from "./UserLanguage";
import LanguageSelection from "./LanguageSelection";

const User = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <>
      {showUpdateModal && (
        <UpdateModal
          id={props.id}
          name={props.name}
          age={props.age}
          country={props.country}
          getData={props.getData}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}
      <div key={props.id} id={props.id}>
        <h4>{props.name}</h4>
        <p>Age: {props.age}</p>
        <p>Country: {props.country}</p>
        <h5>
          Known Languages: <LanguageSelection id={props.id} />
          <UserLanguage id={props.id} />
        </h5>
        <button onClick={() => props.deleteUsers(props.id)}>Remove User</button>
        <button
          onClick={() => {
            setShowUpdateModal(true);
          }}
        >
          Update Profile
        </button>
      </div>
    </>
  );
};

export default User;
