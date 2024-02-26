import { useState, useEffect, useContext, createContext } from "react";

const AnswerContext = createContext();
const AnswerProvider = ({ children }) => {
  const [answers, setAnswers] = useState([{
    question_id:" ",  
    ans:null
  }])

  return (
    <AnswerContext.Provider value={[answers, setAnswers]}>
      {children}
    </AnswerContext.Provider>
  );
};

const useAnswer = () => useContext(AnswerContext);

export { useAnswer, AnswerProvider };