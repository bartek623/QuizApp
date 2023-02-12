import { useState } from "react";
import styles from "./CategoryTile.module.css";

function CategoryTile(props: any) {
  const [isActive, setIsActive] = useState(false);

  const toggleActiveHandler = function () {
    setIsActive((prev) => !prev);
    props.toggleHandler(props.category[0]);
  };

  return (
    <button
      onClick={toggleActiveHandler}
      className={`${styles.tile} ${isActive && styles.active}`}
    >
      <span className={styles.name}>{props.category[0]}</span>
      <span className={styles.quantity}>[{props.category[1]}]</span>
    </button>
  );
}

export default CategoryTile;
