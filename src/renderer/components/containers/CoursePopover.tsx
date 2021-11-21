import React, { useCallback } from "react";
import { flexSpaceBetween, OptionTitle } from "@library/styleFunctions";
import { ExerciseSubmitType } from "@library/settings/exercise";
import { usePopoverState } from "reakit/Popover";
import { useAppContext } from "@components/Context";
import CourseEditPopover from "@components/CourseEditPopover";
import CourseList from "@components/containers/CourseList";
import PlusIcon from "@icons/PlusIcon";
import Button from "@components/button";
import styled from "styled-components";

const CoursePopover = (): JSX.Element => {
  const { courseOptions, pushCourse, courses } = useAppContext();
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
    (submitted: ExerciseSubmitType) => {
      pushCourse(submitted);

      props.hide();
    },
    [props, pushCourse]
  );

  return (
    <FlexFull>
      <Top>
        <OptionTitle>코스 추가</OptionTitle>
        <CourseEditPopover
          aria-label="course editor"
          options={defaultCourseOptions}
          usePopoverState={props}
          onSubmitHandler={onSubmit}
          buttonMessage="Add Course"
          disclosure={
            <Button disabled={courses.length !== 0}>
              <PlusIcon size={24} />
            </Button>
          }
        />
      </Top>
      <CourseList />
    </FlexFull>
  );
};

const FlexFull = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const Top = styled.div`
  ${flexSpaceBetween};
  padding: 16px 0;
`;

export default CoursePopover;
