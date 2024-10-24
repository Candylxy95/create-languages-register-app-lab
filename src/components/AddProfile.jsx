import React from "react";
import styles from "./Userprofile.module.css";

const AddProfile = (props) => {
  return (
    <div className={styles.form}>
      <h1 style={{ fontFamily: "Tourney" }}>Join our 5 Users today</h1>
      <div className="container row">
        <div className="col-md-3">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            ref={props.nameRef}
          />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <label htmlFor="age">Age: </label>
          <input type="text" name="age" placeholder="Age" ref={props.ageRef} />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <label htmlFor="country">Country: </label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            ref={props.countryRef}
          />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <div className="mb-4"></div>
          <button className={styles.profilebtn} onClick={props.addUsers}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProfile;
