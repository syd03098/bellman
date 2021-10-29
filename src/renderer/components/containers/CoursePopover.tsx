import React, { useCallback } from "react";
import { usePopoverState } from "reakit/Popover";
import { useAppContext } from "@components/Context";
import { getUniqueKey } from "@library/utils";
import { ExerciseSubmitType } from "@library/settings/exercise";
import PlusIcon from "@icons/PlusIcon";
import Button from "@components/button";
import styled from "styled-components";
import CourseEditPopover from "@components/CourseEditPopover";
import CourseList from "@components/containers/CourseList";

const CoursePopover = (): JSX.Element => {
  const { courseOptions, pushCourse } = useAppContext();
  const props = usePopoverState({ placement: "bottom-end" });

  const defaultCourseOptions = courseOptions.map(
    ({ exercise, exerciseName }) => {
      return {
        label: exerciseName,
        value: exercise,
      };
    }
  );

  const onSubmit = useCallback(
    ({ exercise, exerciseName, repeat }: ExerciseSubmitType) => {
      pushCourse({
        id: getUniqueKey(),
        exercise,
        exerciseName,
        repeat,
      });

      props.hide();
    },
    [props, pushCourse]
  );

  return (
    <FlexFull>
      <Top>
        <Title>코스 추가</Title>
        <CourseEditPopover
          aria-label="course editor"
          options={defaultCourseOptions}
          usePopoverState={props}
          onSubmitHandler={onSubmit}
          buttonMessage="Add Course"
          disclosure={
            <Button>
              <PlusIcon size={24} />
            </Button>
          }
        />
      </Top>
      <CourseList />
    </FlexFull>
  );
};

const FlexFull = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.bold};
  margin: 0;
`;

export default CoursePopover;
