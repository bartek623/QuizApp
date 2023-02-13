import styles from "./SectionHeading.module.css";

function SectionHeading(props: any) {
  return <h3 className={styles.heading}>{props.content}</h3>;
}

export default SectionHeading;
