import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [dots, setDots] = useState([]);

  const [cashe, setCashe] = useState([]);

  function draw(e) {
    const { clientX, clientY } = e;

    setDots([...dots, { x: clientX, y: clientY }]);
  }

  function undo() {
    if (dots.length > 0) {
      const newDots = [...dots];

      const lastDot = newDots.pop();

      setCashe([...cashe, lastDot]);
      setDots(newDots);
    }
  }

  function redo() {
    if (cashe.length > 0) {
      const newCashe = [...cashe];
      const newCasheItem = newCashe.pop();
      setCashe(newCashe);
      setDots([...dots, newCasheItem]);
    }
  }

  return (
    <div className="app">
      <div id="button-wrapper">
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
      <div className="click-area" onClick={draw}>
        {dots.map(({ x, y }, i) => (
          <div
            key={`dot-${i}`}
            className="dot"
            style={{ left: x, top: y }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
