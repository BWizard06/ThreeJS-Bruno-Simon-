import { useState, useMemo } from "react";
import Clicker from "./Clicker.jsx";
import People from "./People.jsx";

export default function App({ clickersCount, children }) {
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);

  const changeVisible = () => {
    setIsVisible(!isVisible);
  };

  const increment = () => {
    setCount(count + 1);
  };

  // the second paramter of useMemo says, when the part in the function should be re-rendered, if its empty
  // the function never re-renders, so the colors for the Clickers stay the same, but we want to call the 
  // function when clickersCount changes because then we need more colors 
  const colors = useMemo(() => {
    const colors = [];
    for (let i = 0; i < clickersCount; i++) {
      colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`);
    }
    return colors
  }, [ clickersCount ]);

  // makes an array with chlickerscount-many undefined entries
  // const tempArray = [...Array(clickersCount)]

  return <>
      {children}
      <p>Total Count: {count}</p>

      <button onClick={changeVisible}>
        {isVisible ? "Hide" : "Show"} clicker
      </button>

      {isVisible && <>
          {[...Array(clickersCount)].map((value, index) => 
              <Clicker
                key={index}
                increment={increment}
                keyName={`count${index}`}
                color={colors[index]}
              />
          )}
      </>}

      <People />
  </> 
}
