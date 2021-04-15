import styled from "styled-components";
import { useRouter } from "next/router";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { connectToDB } from "../../utils/connectToDb";
import { useState, useEffect, useContext } from "react";
import quizContext from "../../context/QuizContext";

const Question = ({ questions }) => {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const { handleMaxPoints, addPoint, addAnswer } = useContext(quizContext);
  const router = useRouter();

  useEffect(() => {
    handleMaxPoints(questions.length);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const handleSubmitAnswer = index => {
    const current = questions[currentQuestionNumber];

    addAnswer({
      index,
      answer: current.answers[index],
      correct: current.answers[current.correct * 1],
      question: current.question,
    });

    if (index === current.correct * 1) {
      addPoint();
    }

    if (currentQuestionNumber + 1 >= questions.length) {
      router.push("/quizSummary");
      return;
    }

    setCurrentQuestionNumber(prev => prev + 1);
  };

  const renderAnswers = () => {
    const currentQuestion = questions[currentQuestionNumber];
    const answerButtons = [];

    for (let i = 0; i < Object.keys(currentQuestion.answers).length; i++) {
      let questionSign;
      switch (i) {
        case 0:
          questionSign = "A";
          break;
        case 1:
          questionSign = "B";
          break;
        case 2:
          questionSign = "C";
          break;
        case 3:
          questionSign = "D";
          break;
      }

      answerButtons.push(
        <Answer
          key={i}
          onClick={() => handleSubmitAnswer(i)}
          questionLetter={questionSign}
        >
          <span>{currentQuestion.answers[i]}</span>
        </Answer>
      );
    }

    return answerButtons;
  };

  const renderQuestion = () => {
    const q = questions[currentQuestionNumber].question;
    const code = q.match(/<code>.*<\/code>/i);

    if (!code) return <div>{q}</div>;
    const codeString = code[0].replace(/[;]/gi, "\n");

    const codeFormatted = (
      <SyntaxHighlighter
        language="javascript"
        style={docco}
        wrapLines={true}
        showLineNumbers={true}
        customStyle={{ fontSize: "1rem" }}
      >
        {codeString.slice(6, -7)}
      </SyntaxHighlighter>
    );

    return (
      <div>
        {q.slice(0, code.index)} {codeFormatted}{" "}
        {q.slice(code.index + code[0].length)}
      </div>
    );
  };

  const width = ((100 / 3600) * timeLeft).toFixed(2) + "%";
  const time = `Pozostały czas: ${Math.floor(timeLeft / 60)} : ${Math.floor(
    timeLeft % 60
  )}`;
  return (
    <Container>
      <TimeBar time={time} width={width} />
      <QuestionNumber>
        Pytanie {currentQuestionNumber + 1} z {questions.length}
      </QuestionNumber>
      <QuestionContainer>{renderQuestion()}</QuestionContainer>
      <AnswersContainer>{renderAnswers()}</AnswersContainer>
    </Container>
  );
};

export const getStaticProps = async () => {
  const client = await connectToDB();
  const questionsCollection = client.db().collection("questions");
  const questions = await questionsCollection.find().toArray();

  const converted = questions.map(question => ({
    ...question,
    _id: question._id.toString(),
  }));

  client.close();
  return {
    props: {
      questions: converted,
    },
  };
};

const QuestionNumber = styled.span`
  position: absolute;
  top: 2rem;
  left: 50%;

  transform: translate(-50%, -50%);

  font-size: 1.5rem;
`;

const TimeBar = styled.div.attrs(({ width }) => ({
  style: {
    width,
  },
}))`
  grid-area: 1/1/2/-1;
  height: 1rem;

  background: ${({ theme }) => theme.colors.main};

  &:after {
    content: "${({ time, width }) => time} ";
    z-index: 999;
    position: absolute;

    left: 1rem;
    top: 2rem;

    width: 20vw;
    height: 10vh;

    transform: translateY(-100%);

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    box-shadow: 0 0 5px 0 black,
      inset 0 0 5px 0 ${({ theme }) => theme.colors.main};

    font-size: 1.5rem;

    color: white;
    background: ${({ theme }) => theme.colors.lightBlue};

    padding: 1rem;
    transition: 300ms;
    opacity: 0;
  }

  &:hover:after {
    transform: translate(0);

    opacity: 1;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.lightBlue};
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);

  overflow: hidden;
`;

const QuestionContainer = styled.div`
  grid-area: 2/2/6/12;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  box-shadow: 0 0 0 4px white, 0 0 0 8px ${({ theme }) => theme.colors.main};

  font-size: 1.25rem;

  color: white;
  background: ${({ theme }) => theme.colors.main};

  padding: 1rem;
`;

const AnswersContainer = styled.div`
  grid-area: 7/2/-1/12;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const Answer = styled.button`
  position: relative;
  flex-basis: 49.5%;
  height: 45%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  font-size: 1.25rem;

  color: white;
  background: ${({ theme }) => theme.colors.main};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #7777e9;
    clip-path: circle(0 at left center);
    transition: 0.4s linear;
    opacity: 0.25;
  }

  &::before {
    content: ${({ questionLetter }) => `"${questionLetter}."`};
    position: absolute;
    top: 0;
    left: 0.25rem;

    line-height: 3rem;
    font-size: 3rem;
  }

  &:hover::after {
    clip-path: circle(50% at center center);
  }

  span {
    z-index: 999;
  }
`;

export default Question;
