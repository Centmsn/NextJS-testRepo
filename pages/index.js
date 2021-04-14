import Link from "next/link";

import { useContext } from "react";
import styled from "styled-components";

import QuizContext from "../context/QuizContext";

const Home = () => {
  const { points } = useContext(QuizContext);

  return (
    <Container>
      <Title>Javascript - quiz</Title>
      <Link href="/quiz">
        <StartBtn>Zacznij quiz!</StartBtn>
      </Link>
    </Container>
  );
};

const StartBtn = styled.a`
  position: relative;
  flex-basis: 50%;

  box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.main};

  text-align: center;
  font-size: 2rem;
  font-family: "Cairo", sans-serif;

  color: ${({ theme }) => theme.colors.main};

  padding: 0.5rem 0;
  transition: 300ms;

  &::after {
    content: "Przygotuj się! Test jest ograniczony czasowo, a po jego rozpoczęciu nie można zatrzymać czasu.";
    position: absolute;
    top: 0;
    left: 15%;
    right: 15%;

    transform: translateY(-50%);

    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.main};

    opacity: 0;
    padding: 0.25rem;
    transition: 300ms;
  }

  &:hover::after {
    transform: translateY(-125%);
    color: ${({ theme }) => theme.colors.main};
    opacity: 1;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.main};
    color: white;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  flex-basis: 100%;

  font-size: 5rem;
  text-align: center;

  background: ${({ theme }) => theme.colors.main};
  color: white;
`;

export default Home;
