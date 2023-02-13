import SectionHeading from "../UI/SectionHeading";
import Grid from "../UI/Grid";
import Tile from "../Tile/Tile";

import styles from "./CurrentQuestion.module.css";

function CurrentQuestion(props: any) {
  const { currentQuestion, toggleAnswerHandler, isAvalaible } = props;

  const answerElements = currentQuestion.answers.map((answer: string) => (
    <Tile
      element={"radio"}
      type={"answer"}
      toggleHandler={toggleAnswerHandler}
      key={answer || 0 + Math.random()}
      item={answer}
      name={"answer"}
      showCorrect={!isAvalaible}
      correct={currentQuestion?.correctAnswer}
    />
  ));

  return (
    <>
      <section>
        <span
          className={`${styles["difficulty-el"]} ${
            styles[currentQuestion?.difficulty || ""]
          }`}
        >
          {currentQuestion?.difficulty}
        </span>

        <SectionHeading content={currentQuestion?.category} />

        <p className={styles["question-el"]}>{currentQuestion?.question}</p>
      </section>

      <section className={styles.answers}>
        <Grid>{answerElements}</Grid>
      </section>
    </>
  );
}

export default CurrentQuestion;
