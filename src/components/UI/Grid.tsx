import styles from "./Grid.module.css";

function Grid(props: any) {
  return <div className={styles.grid}>{props.children}</div>;
}

export default Grid;
