import styles from "./ErrorMessage.module.css";

function ErrorMessage(props: any) {
  return <div className={styles["error-box"]}>{props.error}</div>;
}

export default ErrorMessage;
