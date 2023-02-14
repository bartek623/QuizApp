import { useCallback, useEffect, useState } from "react";
import Container from "../UI/Container";
import Card from "../UI/Card";
import useFetch from "../../hooks/useFetch";
import Loading from "../UI/Loading";
import Grid from "../UI/Grid";
import SubmitButton from "../UI/SubmitButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Timer from "../Timer/Timer";
import CurrentQuestion from "./CurrentQuestion";

import styles from "./Questions.module.css";

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
  const [isReady, setIsReady] = useState(true);
  const isAvalaible = isReady && !error && !isLoading;

  const currentQuestion = {
    ...questions?.at(0),
    get answers(): (string | undefined)[] {
      return [...(this?.incorrectAnswers || []), this?.correctAnswer].sort();
    },
  };

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

  const nextQuestionHandler = function () {
    setIsReady(false);
    setTotalQuestions((prev) => ++prev);

    if (selectedAnswer === currentQuestion?.correctAnswer)
      setPoints((prev) => ++prev);

    setTimeout(() => {
      setIsReady(true);
      setQuestions((prev) => prev?.slice(1));

      if ((questions?.length || 0) < 2) getQuestions();
    }, TIME_TO_NEXT);
  };

  return (
    <Container>
      <Card>
        {isLoading && <Loading />}

        {!isLoading && (
          <CurrentQuestion
            nextQuestionHandler={nextQuestionHandler}
            currentQuestion={currentQuestion}
            toggleAnswerHandler={setSelectedAnswer}
            isAvalaible={isAvalaible}
          />
        )}

        {error && <ErrorMessage error={error} />}

        <Grid>
          <SubmitButton
            onClickHandler={nextQuestionHandler}
            text={"Next"}
            isAvalaible={isAvalaible}
          />
        </Grid>
        <span className={styles.points}>{`${points} / ${totalQuestions}`}</span>

        {!!currentQuestion && isAvalaible && (
          <Timer skipHandler={nextQuestionHandler} />
        )}
      </Card>
    </Container>
  );
}

export default Question;
