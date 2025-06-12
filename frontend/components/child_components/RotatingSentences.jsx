import { useState, useEffect } from "react";

function RotatingSentence() {
  const messages = [
    "Start selling your unused stuff right now!",
    "Reach over 15,000,000 people",
    "What are you waiting for? Capture it and post it!",
  ];

  const [index, setIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsChanging(true); 
    }, 4500); 

    const changeTextTimer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % messages.length);
      setIsChanging(false); 
    }, 5000); 

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(changeTextTimer);
    }; 
  }, [index, messages.length]); 

  return (
    <span
      className={`inline-block transition-opacity duration-500 ${
        isChanging ? "opacity-0" : "opacity-100"
      }`}
    >
      {messages[index]}
    </span>
  );
}

export default RotatingSentence;
