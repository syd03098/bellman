import React from "react";
import styled from "@theme/styled";
import Button from "@components/button";

const SubToolbar = (): JSX.Element => {
  return (
    <Wrap>
      <Right>
        <Button variant="primary" size="sm">
          Exercise now
        </Button>
        <Button variant="smoke" size="sm">
          Start Timer
        </Button>
      </Right>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.layout.subHeader};
  border-top: 1px solid ${({ theme }) => theme.border.white};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0 -4px;
`;

export default SubToolbar;
