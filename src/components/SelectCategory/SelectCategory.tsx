import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../UI/Card";
import Container from "../UI/Container";
import Grid from "../UI/Grid";
import Loading from "../UI/Loading";
import CategoryTile from "./CategoryTile";

import styles from "./SelectCategory.module.css";

function SelectCategory() {
  const [categories, setCategories] = useState<any[]>([]);
  const [difficulties, setDifficulties] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
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
    setSelected((prev: string[]) =>
      prev.includes(category)
        ? prev.filter((el: string) => el !== category)
        : [...prev, category]
    );
  };

  const categoryElements = categories.map((category) => (
    <CategoryTile
      toggleHandler={toggleCategoryHandler}
      key={category[0]}
      category={category}
    />
  ));

  const difficultyElements = difficulties.map((category) => (
    <CategoryTile
      toggleHandler={toggleCategoryHandler}
      key={category[0]}
      category={category}
    />
  ));

  return (
    <Container>
      <Card>
        {isLoading && <Loading />}
        {!isLoading && (
          <div className={styles.container}>
            <section>
              <h4 className={styles["category-heading"]}>Categories</h4>
              <Grid>{categoryElements}</Grid>
            </section>

            <section>
              <h4 className={styles["category-heading"]}>Difficulty</h4>
              <Grid>{difficultyElements}</Grid>
            </section>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default SelectCategory;
