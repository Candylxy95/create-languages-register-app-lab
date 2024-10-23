import React from "react";

const AddProfile = (props) => {
  return (
    <div>
      <h3>Add a profile</h3>
      <div className="container row">
        <div className="col-md-3">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            ref={props.nameRef}
          />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <label htmlFor="Age">Age: </label>
          <input type="text" name="age" placeholder="Age" ref={props.ageRef} />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <label htmlFor="Country">Country: </label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            ref={props.countryRef}
          />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <button onClick={props.addUsers}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddProfile;
