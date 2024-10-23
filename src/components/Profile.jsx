import React, { useState, useEffect, useRef } from "react";
import User from "./User";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();

  const getData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users");

      if (!res.ok) {
        throw new Error("getting user data error");
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addUsers = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        age: ageRef.current.value,
        country: countryRef.current.value,
      }),
    });
    if (!res.ok) {
      throw new Error("user can't be added");
    }
    getData();
    nameRef.current.value = "";
    ageRef.current.value = "";
    countryRef.current.value = "";
  };

  const deleteUsers = async (id) => {
    const res = await fetch(import.meta.env.VITE_SERVER + `/lab/users/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: id,
      }),
    });
    if (!res.ok) {
      throw new Error("lUser can't be deleted");
    }
    getData();
  };

  useEffect(() => {
    getData();
  }, []); //run on mount

  return (
    <div>
      <h1>USER PROFILE</h1>
      {users.map((user) => {
        return (
          <User
            key={user.id}
            id={user.id}
            name={user.name}
            age={user.age}
            country={user.country}
            getData={getData}
            deleteUsers={deleteUsers}
          />
        );
      })}
      <h3>Add a profile</h3>
      <div className="container row">
        <div className="col-md-3">
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" placeholder="Name" ref={nameRef} />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <label htmlFor="Age">Age: </label>
          <input type="text" name="age" placeholder="Age" ref={ageRef} />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <label htmlFor="Country">Country: </label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            ref={countryRef}
          />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <button onClick={addUsers}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
