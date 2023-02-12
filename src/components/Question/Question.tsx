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
      getData(url, setQuestions);
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
      toggleHandler={toggleAnswerHandler}
      key={answer || 0 + Math.random()}
      item={answer}
      name={"answer"}
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
      console.log(questions?.length);
      if ((questions?.length || 0) < 2) getQuestions();
    }, 800);
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
      </Card>
    </Container>
  );
}

export default Question;
