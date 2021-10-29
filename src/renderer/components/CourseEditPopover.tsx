import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Exercise, ExerciseSubmitType } from "@library/settings/exercise";
import { SelectOption } from "@components/select/types";
import Popover, { PopOverProps } from "@components/Popover";
import ReactSelect from "@components/select";
import Input from "@components/Input";
import Button from "@components/button";
import styled from "styled-components";

type CourseEditPopoverProps<T extends string | number> = {
  options: SelectOption<T>[];
  onSubmitHandler: (value: ExerciseSubmitType) => void;
  buttonMessage: string;
} & PopOverProps;

function CourseEditPopover<T extends string | number>({
  options,
  onSubmitHandler,
  buttonMessage,
  ...props
}: CourseEditPopoverProps<T>): JSX.Element {
  const [exercise, setExercise] = useState<SelectOption<T> | null>(null);

  const [input, setInput] = useState<number>(0);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(Number(e.target.value.replace(/[^0-9]/g, "")));
  }, []);

  const onChange = useCallback((option: SelectOption<T>) => {
    setExercise(option);
  }, []);

  const onFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (exercise !== null) {
        onSubmitHandler({
          exercise: exercise.value as Exercise,
          exerciseName: exercise.label,
          repeat: input,
        });
      }
    },
    [exercise, input, onSubmitHandler]
  );

  return (
    <Popover {...props}>
      <Form onSubmit={onFormSubmit}>
        <ReactSelect<T>
          options={options}
          value={exercise}
          onChange={onChange}
        />
        <Input
          autoComplete="off"
          placeholder="횟수(1~99)"
          value={input}
          onChange={onInputChange}
        />
        <Button type="submit" variant="primary" size="md">
          {buttonMessage}
        </Button>
      </Form>
    </Popover>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default CourseEditPopover;
