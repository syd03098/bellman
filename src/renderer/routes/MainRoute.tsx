import React, { useMemo } from "react";
import { ExerciseEmoji, Sigh } from "@library/emoji";
import { useAppContext } from "@components/Context";
import { CssPropsType } from "@library/global";
import styled, { css } from "styled-components";
import PersonalLog from "@components/PersonalLog";

interface Props {
  cssProps: CssPropsType;
}

const NoRecords = ({ cssProps: cssFlexFull }: Props) => {
  const emoji = useMemo(
    () => Sigh[Math.floor(Math.random() * Sigh.length)],
    []
  );

  return (
    <div
      css={css`
        ${cssFlexFull};
        align-items: center;
        justify-content: center;
      `}
    >
      <Emoji>{emoji}</Emoji>
      <AlertMessage>운동을 수행한 기록이 없어요.</AlertMessage>
    </div>
  );
};

const MainRoute = ({ cssProps: cssFlexFull }: Props): JSX.Element => {
  const { results } = useAppContext();

  if (results.length === 0) {
    return <NoRecords cssProps={cssFlexFull} />;
  }

  return (
    <section css={cssFlexFull}>
      <Title>Personal Logs 🔥</Title>
      <Scroll>
        {results.map((result) => (
          <PersonalLog
            key={result.date}
            emoji={ExerciseEmoji[result.exercise]}
            result={result}
            disabled
          />
        ))}
      </Scroll>
    </section>
  );
};

const Title = styled.h1`
  font-size: 1rem;
  margin-top: 8px;
  margin-bottom: 16px;
  font-weight: 500;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.text.plain};
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 348px;
  overflow-y: auto;
  gap: 8px;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 16px;
    background-color: ${({ theme }) => theme.text.smoke};
  }
`;

const Contents = styled.div`
  flex: 1 1 auto;
  margin: 0;

  span {
    color: ${({ theme }) => theme.text.smoke};
    font-size: 12px;
    letter-spacing: -0.3px;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 24px;
  height: 100%;
`;

const Emoji = styled.h2`
  font-size: 28px;
  line-height: normal;
  margin: 0;
`;

const AlertMessage = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.bold};
`;

export default MainRoute;
