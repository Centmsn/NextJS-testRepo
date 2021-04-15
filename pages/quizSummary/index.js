import { useContext } from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import quizContext from "../../context/QuizContext";

const renderQuestion = q => {
  const code = q.match(/<code>.*<\/code>/i);

  if (!code) return <div>{q}</div>;

  const codeFormatted = (
    <SyntaxHighlighter language="javascript" style={dark} wrapLines={true}>
      {code[0].slice(6, -7)}
    </SyntaxHighlighter>
  );

  return (
    <span>
      {q.slice(0, code.index)} {codeFormatted}{" "}
      {q.slice(code.index + code[0].length)}
    </span>
  );
};

const QuizSummary = () => {
  const { points, userAnswers, maxPoints } = useContext(quizContext);

  const renderListOfAnswers = () => {
    const list = [];

    userAnswers.forEach(answer =>
      list.push(
        <ListElement>
          <h3>{renderQuestion(answer.question)}</h3>
          <CorrectAnswer>poprawna odpowiedź: {answer.correct}</CorrectAnswer>
          <UserAnswer>zaznaczona odpowiedź: {answer.answer}</UserAnswer>
        </ListElement>
      )
    );

    return list;
  };

  return (
    <Container>
      <Title>Twój wynik: {Math.floor((points / maxPoints) * 100)}%</Title>

      <ul>{renderListOfAnswers()}</ul>
    </Container>
  );
};

const Title = styled.h1`
  border-bottom: 4px solid white;

  text-align: center;

  color: white;
`;

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.main};
`;

const ListElement = styled.li`
  margin-bottom: 2rem;

  text-align: center;

  background: ${({ theme }) => theme.colors.lightViolet};
  color: white;
`;

const CorrectAnswer = styled.p`
  color: rgb(149, 232, 111);
`;

const UserAnswer = styled.p``;

export default QuizSummary;
