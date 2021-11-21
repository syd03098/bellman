import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Exercise, ExerciseSubmitType } from "@library/settings/exercise";
import Popover, { PopOverProps } from "@components/Popover";
import { SelectOption } from "@components/select/types";
import ReactSelect from "@components/select";
import styled from "styled-components";
import Button from "@components/button";
import Input from "@components/Input";

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
    const string = e.target.value;
    const formatted = string.replace(/^0+/, "").replace(/[^0-9]/g, "");

    if (Number(formatted) > 30) {
      setInput(30);
    } else {
      setInput(Number(formatted));
    }
  }, []);

  const disabled = useMemo(
    () => !exercise || input <= 0 || input > 30,
    [exercise, input]
  );

  const onChange = useCallback((option: SelectOption<T>) => {
    setExercise(option);
  }, []);

  const onFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (exercise) {
        const form: ExerciseSubmitType = {
          exercise: exercise.value as Exercise,
          exerciseName: exercise.label,
          repeat: input,
        };

        onSubmitHandler(form);
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
        <Input autoComplete="off" value={input} onChange={onInputChange} />
        <Button type="submit" variant="primary" size="md" disabled={disabled}>
          {buttonMessage}
        </Button>
      </Form>
    </Popover>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 8px;
`;

export default CourseEditPopover;
