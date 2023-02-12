import styles from "./Tile.module.css";

function Tile(props: any) {
  if (!props.item || props.item[0] === "null") return <></>;

  if (typeof props.item === "string") {
    const toggleActiveHandler = function () {
      props.toggleHandler(props.item);
    };

    return (
      <div>
        <label className={styles.tile} htmlFor={props.item}>
          <input
            onChange={toggleActiveHandler}
            className={styles.box}
            type={props.element}
            id={props.item}
            value={props.item}
            name={props.name}
          />
          <span className={styles.name}>{props.item}</span>
        </label>
      </div>
    );
  }

  const toggleActiveHandler = function () {
    props.toggleHandler(props.item[0]);
  };

  return (
    <div>
      <label className={styles.tile} htmlFor={props.item[0]}>
        <input
          onChange={toggleActiveHandler}
          className={styles.box}
          type={props.element}
          id={props.item[0]}
          value={props.item[0]}
          name={props.name}
        />
        <span className={styles.name}>{props.item[0]}</span>
        <span className={styles.quantity}>[{props.item[1]}]</span>
      </label>
    </div>
  );
}

export default Tile;
