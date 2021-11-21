import React, { useCallback } from "react";
import { ExerciseCourse } from "@library/settings/exercise";
import { useAppContext } from "@components/Context";
import styled from "styled-components";
import CourseItem from "@components/CourseItem";
import useIpcListener from "@hooks/useIpcListener";

const { openEditOptions } = window.electronOnly;

const CourseList = (): JSX.Element => {
  const { deleteCourse, courses } = useAppContext();

  const onOpenNativeMenu = useCallback((course: ExerciseCourse) => {
    openEditOptions(course);
  }, []);

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
        <CourseItem
          key={course.id}
          course={course}
          onClick={() => onOpenNativeMenu(course)}
        />
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
