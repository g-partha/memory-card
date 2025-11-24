import { useState } from "react";
import "./App.css";
import CardGrid from "./card-grid";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <>
      <div className="header">
        <h1>Memory Card Game</h1>
        <div className="score-container">
          <div>Score:<span>{score}</span></div>
          <div>High Score: <span>{highScore}</span></div>
        </div>
      </div>
      <CardGrid
        key="card-grid"
        score={score}
        highScore={highScore}
        setScore={setScore}
        setHighScore={setHighScore}
      />
    </>
  );
}

export default App;
