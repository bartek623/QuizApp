import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../UI/Card";
import Container from "../UI/Container";
import Grid from "../UI/Grid";
import Loading from "../UI/Loading";
import Tile from "../Tile/Tile";
import SubmitButton from "../UI/SubmitButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import styles from "./SelectCategory.module.css";
import SectionHeading from "../UI/SectionHeading";
import UserProfile from "../UserProfile/UserProfile";

function SelectCategory(props: any) {
  const [categories, setCategories] = useState<any[]>([]);
  const [difficulties, setDifficulties] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const { isLoading, error, getData } = useFetch();

  useEffect(() => {
    const url = "https://the-trivia-api.com/api/metadata";

    const applyData = function (data: any) {
      setCategories(Object.entries(data.byCategory));
      setDifficulties(Object.entries(data.byDifficulty));
    };

    getData(url, applyData);
  }, [getData]);

  const toggleCategoryHandler = function (category: string) {
    setSelectedCategory((prev) => {
      if (prev.includes(category)) return prev.filter((el) => el !== category);
      else return [...prev, category];
    });
  };

  const toggleDifficultyHandler = function (diff: string) {
    setSelectedDifficulty(diff);
  };

  const categoryElements = categories.map((category) => (
    <Tile
      element={"checkbox"}
      type={"category"}
      toggleHandler={toggleCategoryHandler}
      key={category[0]}
      item={category}
      name={category[0]}
    />
  ));

  const difficultyElements = difficulties.map((category) => (
    <Tile
      element={"radio"}
      type={"category"}
      toggleHandler={toggleDifficultyHandler}
      key={category[0]}
      item={category}
      name={"difficulty"}
    />
  ));

  const startHandler = function () {
    let categoriesQuery = "";
    let difficultyQuery = "";

    if (selectedCategory.length > 0)
      categoriesQuery =
        "&categories=" +
        selectedCategory
          .join(",")
          .toLowerCase()
          .replaceAll(" ", "_")
          .replaceAll("&", "and");

    if (selectedDifficulty)
      difficultyQuery = "&difficulty=" + selectedDifficulty;

    props.setQueryValuesHandler(categoriesQuery + difficultyQuery);
  };

  return (
    <Container>
      <Card>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <div className={styles.container}>
              <section>
                <SectionHeading content={"Categories"} />
                <Grid fieldset={true}>{categoryElements}</Grid>
              </section>

              <section>
                <SectionHeading content={"Difficulty"} />
                <Grid fieldset={true}>{difficultyElements}</Grid>
              </section>

              <section className={styles.action}>
                <Grid>
                  <SubmitButton
                    onClickHandler={startHandler}
                    text={"Start quiz!"}
                    isAvalaible={!error}
                  />
                </Grid>
              </section>
            </div>
            <UserProfile />
          </>
        )}
        {error && <ErrorMessage error={error} />}
      </Card>
    </Container>
  );
}

export default SelectCategory;
