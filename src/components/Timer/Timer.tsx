import { useEffect, useRef } from "react";
import styles from "./Timer.module.css";

const TIME_TO_ANSWER = 10000;

function Timer(props: any) {
  const { skipHandler } = props;
  const skipHandlerRef = useRef(() => {});

  // Updates function responsible for skipping question
  useEffect(() => {
    skipHandlerRef.current = skipHandler;
  }, [skipHandler]);

  useEffect(() => {
    // sets new timeout when component mounts
    const timer = setTimeout(() => skipHandlerRef.current(), TIME_TO_ANSWER);
    // clears timeout when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return <div className={styles.timer}></div>;
}

export default Timer;
