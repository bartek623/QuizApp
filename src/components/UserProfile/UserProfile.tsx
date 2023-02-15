import { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import UserProfileForm from "./UserProfileForm";

interface User {
  name: string;
  totalPoints: number;
}

const defaultUser = {
  name: "User",
  totalPoints: 0,
};

function UserProfile() {
  const [username, setUsername] = useState(defaultUser.name);
  const [totalPoints, setTotalPoints] = useState(defaultUser.totalPoints);
  const [changeUsername, setChangeUsername] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const points = localStorage.getItem("points") || 0;

    if (!storedUsername) return;

    setTotalPoints(+points);
    setUsername(storedUsername);
  }, []);

  const changeUsernameHandler = function () {
    setChangeUsername(true);
  };

  return (
    <div className={styles["profile-container"]}>
      {changeUsername && (
        <UserProfileForm
          setUsername={setUsername}
          changeUsername={setChangeUsername}
        />
      )}

      {!changeUsername && (
        <div className={styles["username-box"]}>
          <span className={styles.username}>{username}</span>
          <button
            onClick={changeUsernameHandler}
            type="button"
            className={`material-symbols-outlined ${styles["edit-btn"]}`}
          >
            edit
          </button>
        </div>
      )}

      <div className={styles["points-box"]}>
        Points: <span className={styles.points}>{totalPoints}</span>
      </div>
    </div>
  );
}

export default UserProfile;
