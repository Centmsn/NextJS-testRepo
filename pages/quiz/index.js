import styled from "styled-components";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Link from "next/link";

const Quiz = () => {
  const minuteArrowRef = useRef(null);
  const hourArrowRef = useRef(null);

  useEffect(() => {
    const hourArrow = hourArrowRef.current;
    const minuteArrow = minuteArrowRef.current;

    gsap.to(hourArrow, {
      rotation: 360,
      duration: 20,
      ease: "none",
      transformOrigin: "left 50%",
      repeat: -1,
    });
    gsap.to(minuteArrow, {
      rotation: 360,
      duration: 5,
      ease: "none",
      repeat: -1,
      transformOrigin: "left center",
    });
  }, []);

  return (
    <div>
      <QuizInfo>
        <p>
          Quiz jest ograniczony czasowo - Twój czas to 60 minut na wszystkie
          pytania.
        </p>
        <p>Wyniki oraz poprawne odpowiedzi poznasz po zakończeniu quizu.</p>
        <p>Wszystkie pytania mają tylko jedną poprawną odpowiedź.</p>
        <p>Na górze ekranu będzie widoczny pozostały czas.</p>
      </QuizInfo>

      <Clock>
        <ClockMiddle></ClockMiddle>
        <ClockArrow ref={minuteArrowRef}></ClockArrow>
        <HourArrow ref={hourArrowRef}></HourArrow>
      </Clock>

      <Link href="/quiz/question">
        <Button>Wszystko wiem, zaczynamy!</Button>
      </Link>
    </div>
  );
};

const QuizInfo = styled.div`
  font-size: 1.5rem;
  text-align: center;

  background: ${({ theme }) => theme.colors.main};
  color: white;
`;

const Button = styled.a`
  position: absolute;
  bottom: 2rem;
  left: 50%;

  transform: translate(-50%, -50%);

  box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.main};

  text-align: center;
  font-size: 2rem;
  font-family: "Cairo", sans-serif;

  color: ${({ theme }) => theme.colors.main};

  cursor: pointer;
  padding: 0 1rem;
  transition: 300ms;

  &:hover {
    background: ${({ theme }) => theme.colors.main};
    color: white;
  }
`;

const Clock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 300px;
  height: 300px;

  transform: translate(-50%, -50%);

  border: 1rem solid ${({ theme }) => theme.colors.main};
  box-shadow: inset 0 0 4px 0 black, 0 0 4px 0 black;
  border-radius: 50%;
`;

const ClockArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 45%;
  height: 0.5rem;

  transform: translate(0, -50%);
  transform-origin: center bottom;

  box-shadow: 0 0 3px 0 black;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  background: ${({ theme }) => theme.colors.lightBlue};
`;

const HourArrow = styled(ClockArrow)`
  left: 50%;

  background: white;
`;

const ClockMiddle = styled.div`
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;

  width: 2rem;
  height: 2rem;

  box-shadow: 0 0 3px 0 black;
  border-radius: inherit;

  background: ${({ theme }) => theme.colors.main};

  transform: translate(-50%, -50%);
`;

export default Quiz;
