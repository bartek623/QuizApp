import { useCallback, useEffect, useState } from "react";
import Container from "../UI/Container";
import Card from "../UI/Card";
import useFetch from "../../hooks/useFetch";
import Loading from "../UI/Loading";
import Grid from "../UI/Grid";
import SubmitButton from "../UI/SubmitButton";

import styles from "./Question.module.css";
import Tile from "../Tile/Tile";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Timer from "../Timer/Timer";

interface Question {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  type: string;
  difficulty: string;
  regions: string[];
  isNiche: boolean;
}

const TIME_TO_NEXT = 1000;

function Question(props: any) {
  const [questions, setQuestions] = useState<Question[]>();
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [points, setPoints] = useState(0);
  const { isLoading, error, getData } = useFetch();
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isAvalaible, setIsAvalaible] = useState(true);

  const currentQuestion = questions?.at(0);
  const answers = [
    ...(currentQuestion?.incorrectAnswers || []),
    currentQuestion?.correctAnswer,
  ].sort();

  const getQuestions = useCallback(
    function () {
      const url =
        "https://the-trivia-api.com/api/questions?limit=5" + props.query;
      getData(url, (data: Question[]) => {
        setQuestions(data);
      });
    },
    [getData]
  );

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  const toggleAnswerHandler = function (answer: string) {
    setSelectedAnswer(answer);
  };

  const answerElements = answers.map((answer) => (
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

  const nextQuestionHandler = function () {
    setIsAvalaible(false);
    setTotalQuestions((prev) => ++prev);

    if (selectedAnswer === currentQuestion?.correctAnswer)
      setPoints((prev) => ++prev);

    setTimeout(() => {
      setIsAvalaible(true);
      setQuestions((prev) => prev?.slice(1));

      if ((questions?.length || 0) < 2) getQuestions();
    }, TIME_TO_NEXT);
  };

  return (
    <Container>
      <Card>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <section>
              <span
                className={`${styles["difficulty-el"]} ${
                  styles[`${currentQuestion?.difficulty}`]
                }`}
              >
                {currentQuestion?.difficulty}
              </span>

              <span className={styles["category-el"]}>
                {currentQuestion?.category}
              </span>

              <p className={styles["question-el"]}>
                {currentQuestion?.question}
              </p>
            </section>

            <section className={styles.answers}>
              <Grid>{answerElements}</Grid>
            </section>

            <section>
              <Grid>
                <SubmitButton
                  onClickHandler={nextQuestionHandler}
                  text={"Next"}
                  isAvalaible={isAvalaible && !error}
                />
              </Grid>
            </section>

            <span
              className={styles.points}
            >{`${points} / ${totalQuestions}`}</span>
          </>
        )}
        {error && <ErrorMessage error={error} />}
        {!!currentQuestion && !isLoading && isAvalaible && (
          <Timer skipHandler={nextQuestionHandler} />
        )}
      </Card>
    </Container>
  );
}

export default Question;
