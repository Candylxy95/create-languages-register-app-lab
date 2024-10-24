import React, { useState } from "react";
import UpdateModal from "./UpdateModal";
import UserLanguage from "./UserLanguage";
import LanguageSelection from "./LanguageSelection";
import styles from "./Userprofile.module.css";
import UserLanguageColumn from "./UserLanguageColumn";

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
      <div key={props.id} id={props.id} className={styles.profileBox}>
        <div className="mb-4"></div>
        <h4>{props.name}</h4>
        <p>Age: {props.age}</p>
        <p>Country: {props.country}</p>
        <div className="d-flex justify-content-evenly">
          <button
            onClick={() => props.deleteUsers(props.id)}
            className={styles.profilebtn}
          >
            Remove User
          </button>
          <button
            onClick={() => {
              setShowUpdateModal(true);
            }}
            className={styles.profilebtn}
          >
            Update Profile
          </button>
        </div>
        <div className="mb-4"></div>
        <div className={styles.boldfont}>
          Add a new language: <UserLanguageColumn id={props.id} />
        </div>
      </div>
    </>
  );
};

export default User;

{
  /* <div className={styles.boldfont}>
Add a new language: <LanguageSelection id={props.id} />
<UserLanguage id={props.id} />
</div> */
}
