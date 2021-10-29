import React, { memo } from "react";
import { ExerciseCourse } from "@library/settings/exercise";
import styled from "styled-components";

interface ItemProps {
  course: ExerciseCourse;
  onClick: () => void;
}

const CourseItem = ({ course, onClick }: ItemProps): JSX.Element => {
  return (
    <ItemWrap onClick={onClick}>
      <Left>💪</Left>
      <Divider />
      <Summary>
        {course.exerciseName} ({course.repeat}회 실시)
      </Summary>
    </ItemWrap>
  );
};

export default memo(CourseItem);

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.button.white};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border.white};
  padding: 8px;
  user-select: none;
  cursor: pointer;
`;

const Left = styled.div`
  flex: 0 0 auto;
  padding-right: 8px;
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  margin-right: 8px;
  background-color: ${({ theme }) => theme.border.white};
`;

const Summary = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-align: left;
  font-size: 14px;
  color: ${({ theme }) => theme.text.plain};
  margin: 0;
`;
