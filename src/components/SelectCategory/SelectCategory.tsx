import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../UI/Card";
import Container from "../UI/Container";
import Grid from "../UI/Grid";
import CategoryTile from "./CategoryTile";

function SelectCategory() {
  const [categories, setcategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { isLoading, error, getData } = useFetch();

  useEffect(() => {
    const url = "https://the-trivia-api.com/api/metadata";

    const applyData = function (data: any) {
      setcategories(Object.entries(data.byCategory));
    };

    getData(url, applyData);
  }, []);

  const categoryElements = categories.map((category) => (
    <CategoryTile category={category} />
  ));

  console.log(categories);

  return (
    <Container>
      <Card>
        {!isLoading && (
          <div>
            <h4>Categories</h4>
            <Grid>{categoryElements}</Grid>
          </div>
        )}
        <div>
          <h4>Difficulty</h4>
        </div>
      </Card>
    </Container>
  );
}

export default SelectCategory;
