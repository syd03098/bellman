import React, { useCallback } from "react";
import { ExerciseCourse } from "@library/settings/exercise";
import { ExerciseEmoji } from "@library/emoji";
import { useAppContext } from "@components/Context";
import useIpcListener from "@hooks/useIpcListener";
import styled from "styled-components";
import Item from "@components/Item";

const { openEditOptions } = window.electronOnly;

const CourseList = (): JSX.Element => {
  const { deleteCourse, courses } = useAppContext();

  const onDeleteCourse = useCallback(
    ({ id }: ExerciseCourse) => {
      deleteCourse(id);
    },
    [deleteCourse]
  );

  useIpcListener({
    channel: "delete-course",
    handler: onDeleteCourse,
  });

  return (
    <Contents>
      {courses.map((course) => (
        <Item
          key={course.id}
          emoji={ExerciseEmoji[course.exercise]}
          onClick={() => openEditOptions(course)}
        >
          {course.exerciseName} ({course.repeat}회)
        </Item>
      ))}
    </Contents>
  );
};

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default CourseList;
