import styles from "./CategoryTile.module.css";

function CategoryTile(props: any) {
  return (
    <div className={`${styles.tile} ${props.active && styles.active}`}>
      <span className={styles.name}>{props.category[0]}</span>
      <span className={styles.quantity}>[{props.category[1]}]</span>
    </div>
  );
}

export default CategoryTile;
