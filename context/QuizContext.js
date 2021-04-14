import { createContext, useState } from "react";

const QuizContext = createContext({ points: 0, addPoint: () => {} });

export const QuizStore = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const setAnswer = answer => {
    setUserAnswers(prev => [...prev, answer]);
  };

  const addPoint = () => {
    setPoints(prev => prev + 1);
  };

  const handleMaxPoints = value => {
    if (typeof value !== "number" || isNaN(value)) {
      throw new Error(
        `MaxPoints should be typeof number. Instead got ${typeof value}`
      );
    }
    setMaxPoints(value);
  };

  return (
    <QuizContext.Provider
      value={{
        points,
        addPoint,
        maxPoints,
        handleMaxPoints,
        userAnswers,
        addAnswer: setAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
