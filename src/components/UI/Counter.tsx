// components/NewYearCountdown.tsx
import React from "react";
import styled from "styled-components";

interface TimeDisplayValuesType {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CounterType {
  displayValue: number;
  label: string;
}

document.documentElement.style.setProperty("--color-bg", "#22262E");
document.documentElement.style.setProperty("--color-heading", "#798EB0");
document.documentElement.style.setProperty("--color-counter", "#8973FD");
document.documentElement.style.setProperty("--font-family-heading", "Mukta");

const AppStyled = styled.div`
  background-image: linear-gradient(15deg, #1a1a1a, var(--color-bg));
  color: var(--color-text);
  display: flex;
`;

const ContainerStyled = styled.section`
  margin: auto;
  padding: 1rem;


`;

const WrapperStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 35.5em) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0 2rem;
  }
`;

const DateStyled = styled.header`
  margin-bottom: 2rem;

  & h1 {
    color: var(--color-heading);
    font-family: var(--font-family-heading);
    font-size: 40px;
    font-weight: 300;
    letter-spacing: 0.1875em;
    margin: unset;
    text-align: center;
    text-transform: uppercase;
  }
`;

const CounterStyled = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border-radius: 1rem;
  color: var(--color-counter);
  display: flex;
  flex-direction: column;
  font-family: "JetBrains Mono", mono;
  font-size: 50px;
  font-weight: 100;
  line-height: 1;
  padding: 2vw;
  text-align: center;

  h2 {
    color: var(--color-heading);
    font-family: var(--font-family-heading);
    font-size: clamp(1rem, 2vw, 99rem);
    font-weight: 300;
    letter-spacing: 0.1875em;
    margin: 1.25rem 0 0;
    order: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
    width: 100%;
  }
`;

const generateTimeDisplay = (): TimeDisplayValuesType => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const juneFirst = new Date(`June 1, ${currentYear} 00:00:00`);
    const nowTime = now.getTime();
    const targetTime = juneFirst.getTime();
  
    const runway = targetTime - nowTime;
  
    if (runway <= 0) {
      // Return all zeros if June 1st has passed
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  
    return {
      days: Math.floor(runway / (1000 * 60 * 60 * 24)),
      hours: Math.floor((runway % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((runway % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((runway % (1000 * 60)) / 1000),
    };
  };
  
  
const Counter = ({ displayValue, label }: CounterType) => (
  <CounterStyled>
    <h2>{label}</h2>
    {displayValue}
  </CounterStyled>
);

const NewYearCountdown = () => {
  const [timeDisplay, setTimeDisplay] = React.useState<TimeDisplayValuesType>(
    generateTimeDisplay
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeDisplay(generateTimeDisplay());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppStyled>
      <ContainerStyled>
        <DateStyled>
          <h1>🎉 Book USDC level today for free 🎉</h1>
        </DateStyled>
        <WrapperStyled>
          <Counter displayValue={timeDisplay.days} label="Days" />
          <Counter displayValue={timeDisplay.hours} label="Hours" />
          <Counter displayValue={timeDisplay.minutes} label="Minutes" />
          <Counter displayValue={timeDisplay.seconds} label="Seconds" />
        </WrapperStyled>
      </ContainerStyled>
    </AppStyled>
  );
};

export default NewYearCountdown;
