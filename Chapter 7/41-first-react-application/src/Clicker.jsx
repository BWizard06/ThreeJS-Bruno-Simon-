import { useEffect, useState, useRef } from "react";

export default function Clicker({ increment, keyName, color = "cyan" }) {
  // Hooks
  const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0));
  const buttonRef = useRef();
  
  // Second parameter is empty of useEffect, so it the function only renders on the first render
  useEffect(() => {

	buttonRef.current.style.backgroundColor = 'papayawhip'
	buttonRef.current.style.color = 'salmon'

    return () => {
      localStorage.removeItem(keyName);
    };
  }, []);


  useEffect(() => {
    localStorage.setItem(keyName, count);
  }, [count]);


  // Function
  const buttonClick = () => {
    setCount(count + 1);
    increment();
  };


  return <>
      <p style={{ color: color }}>Click count: {count}</p>
      <button ref={buttonRef} onClick={buttonClick}>
        Click me
      </button>
    </>
  ;
}


