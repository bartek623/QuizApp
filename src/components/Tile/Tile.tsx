import styles from "./Tile.module.css";

function Tile(props: any) {
  let item: string;
  if (!props.item || props.item[0] === "null") return <></>;

  // answer (question view)
  if (props.type === "answer") item = props.item;
  // category (select category view)
  else item = props.item[0];

  const toggleActiveHandler = function () {
    props.toggleHandler(item);
  };

  let answerTileStyle = "";
  if (props.showCorrect) {
    const isCorrect = props.correct === item;

    answerTileStyle = isCorrect ? styles.correct : styles.incorrect;
  }

  return (
    <div>
      <label className={`${styles.tile} ${answerTileStyle}`} htmlFor={item}>
        <input
          onChange={toggleActiveHandler}
          className={styles.box}
          type={props.element}
          id={item}
          value={item}
          name={props.name}
        />
        <span className={styles.name}>{item}</span>
        {props.type === "category" && (
          <span className={styles.quantity}>[{props.item[1]}]</span>
        )}
      </label>
    </div>
  );
}

export default Tile;
