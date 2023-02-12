import { useState } from "react";
import Question from "./components/Question/Question";
import SelectCategory from "./components/SelectCategory/SelectCategory";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [queryValues, setQueryValues] = useState("");

  const setQueryValuesHandler = function (value: string) {
    setIsStarted(true);
    setQueryValues(value);
  };

  return (
    <>
      {!isStarted && (
        <SelectCategory setQueryValuesHandler={setQueryValuesHandler} />
      )}
      {isStarted && <Question query={queryValues} />}
    </>
  );
}

export default App;
