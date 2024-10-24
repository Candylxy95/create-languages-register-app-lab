import React, { useState, useEffect, useRef } from "react";
import User from "./User";
import styles from "./Userprofile.module.css";
import AddProfile from "./AddProfile";

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
    <div className={styles.help}>
      <AddProfile
        nameRef={nameRef}
        ageRef={ageRef}
        countryRef={countryRef}
        addUsers={addUsers}
      />
      <div className="mb-4"></div>
      <h1 className="text-center">USER PROFILE</h1>
      <div className={styles.container}>
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
      </div>
    </div>
  );
};

export default Profile;
