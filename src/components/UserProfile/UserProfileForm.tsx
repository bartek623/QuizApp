import { useState } from "react";
import styles from "./UserProfileForm.module.css";

function UserProfileForm(props: any) {
  const [usernameInputValue, setUsernameInputValue] = useState("");

  const inputChangeHandler = function (e: any) {
    setUsernameInputValue(e.target.value);
  };

  const submitHandler = function (e: any) {
    e.preventDefault();

    if (usernameInputValue) {
      props.setUsername(usernameInputValue);
      localStorage.setItem("username", usernameInputValue);
    }

    setUsernameInputValue("");
    props.changeUsername(false);
  };

  return (
    <form className={styles["username-box"]} onSubmit={submitHandler}>
      <input
        onChange={inputChangeHandler}
        value={usernameInputValue}
        className={styles["username-input"]}
        type="text"
        autoFocus
      />
      <button
        type="submit"
        className={`material-symbols-outlined ${styles["done-btn"]}`}
      >
        {usernameInputValue ? "done" : "close"}
      </button>
    </form>
  );
}

export default UserProfileForm;
