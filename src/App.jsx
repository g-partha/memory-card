import { useState } from "react";
import "./App.css";
import CardGrid from "./card-grid";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  console.log(`score: ${score}`);
  console.log(`highScore: ${highScore}`);
  return (
    <>
      <CardGrid score={score} highScore={highScore} setScore={setScore} setHighScore={setHighScore} />
    </>
  );
}

export default App;
