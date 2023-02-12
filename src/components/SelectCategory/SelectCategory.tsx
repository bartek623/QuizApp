import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../UI/Card";
import Container from "../UI/Container";

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

  return (
    <Container>
      <Card>
        <div>Categories</div>
        <div>Difficulty</div>
      </Card>
    </Container>
  );
}

export default SelectCategory;
