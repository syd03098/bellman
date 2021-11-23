import React, { useMemo } from "react";
import LogItem, { ItemProps } from "@components/Item";
import { getDateFromNow } from "@library/utils";
import { ExerciseName } from "@library/settings/exercise";
import { Result } from "@library/settings/reulsts";
import styled from "styled-components";
import format from "date-fns/format";

type PersonalLogType = {
  result: Result;
} & ItemProps;

const PersonalLog = ({ result, ...rest }: PersonalLogType) => {
  const exerciseName = ExerciseName[result.exercise];
  const formattedDate = getDateFromNow(result.date);
  const icon = result.hadSucceeded ? "✔" : "❓";
  const tooltipTitle = `${format(result.date, "yyyy-MM-dd kk:mm")}, ${
    result.hadSucceeded ? "성공" : "에러"
  }`;

  const logs = useMemo(
    () => (
      <>
        {exerciseName}&nbsp;<span>{formattedDate}</span>
      </>
    ),
    [exerciseName, formattedDate]
  );

  return (
    <LogItem {...rest}>
      <Logs>{logs}</Logs>
      <Right title={tooltipTitle}>{icon}</Right>
    </LogItem>
  );
};

const Logs = styled.p`
  color: ${({ theme }) => theme.text.plain};
  font-size: 14px;
  text-align: left;
  width: 100%;
  margin: 0;

  span {
    color: ${({ theme }) => theme.text.smoke};
    font-size: 10px;
  }
`;

const Right = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

export default PersonalLog;
