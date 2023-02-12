import styles from "./SubmitButton.module.css";

function SubmitButton(props: any) {
  return (
    <button onClick={props.onClickHandler} className={styles.btn}>
      {props.text}
    </button>
  );
}

export default SubmitButton;
