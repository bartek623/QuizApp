import styles from "./Grid.module.css";

function Grid(props: any) {
  if (props.fieldset)
    return <fieldset className={styles.grid}>{props.children}</fieldset>;

  return <div className={styles.grid}>{props.children}</div>;
}

export default Grid;
