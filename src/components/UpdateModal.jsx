import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Overlay = (props) => {
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();

  const updateUser = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users",

      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: props.id,
          name: nameRef.current.value,
          age: ageRef.current.value,
          country: countryRef.current.value,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("cannot update User");
    }

    props.getData();
    props.setShowUpdateModal(false);
  };
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <br />
        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Name</div>
          <input
            ref={nameRef}
            type="text"
            className="col-md-3"
            defaultValue={props.name}
            placeholder="Enter new name"
          />
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Age</div>
          <input
            ref={ageRef}
            type="text"
            className="col-md-3"
            defaultValue={props.age}
            placeholder="Enter new age"
          />
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Country</div>
          <input
            ref={countryRef}
            type="text"
            className="col-md-3"
            defaultValue={props.country}
            placeholder="Enter new text"
          />
        </div>
        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <button className="col-md-3" onClick={updateUser}>
              update
            </button>
            <button
              className="col-md-3"
              onClick={() => props.setShowUpdateModal(false)}
            >
              cancel
            </button>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  //when click on update, updateModal will pop up
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          id={props.id}
          name={props.name}
          age={props.age}
          country={props.country}
          getData={props.getData}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
      ;
    </>
  );
};

export default UpdateModal;
