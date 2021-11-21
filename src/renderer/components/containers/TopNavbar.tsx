import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { getFormattedDate } from "@library/utils";
import { CssPropsType } from "@library/global";
import Backward from "@icons/ArrowLeftIcon";
import Setting from "@icons/SettingIcon";
import styled from "styled-components";

interface Props {
  cssProps: CssPropsType;
}

const TopNavbar = ({ cssProps: cssFlexSpaceBetween }: Props): JSX.Element => {
  const { pathname } = useLocation();
  const dateFormatted = useMemo(() => getFormattedDate(), []);

  const locationChangeButton = useMemo(() => {
    switch (pathname) {
      case "/":
        return (
          <StyledLink to="/settings" replace>
            <Setting />
          </StyledLink>
        );
      case "/settings":
        return (
          <StyledLink to="/" replace>
            <Backward />
          </StyledLink>
        );
      default:
        return <></>;
    }
  }, [pathname]);

  return (
    <section css={cssFlexSpaceBetween}>
      <>{locationChangeButton}</>
      <DateArea>{dateFormatted}</DateArea>
    </section>
  );
};

const StyledLink = styled(Link)`
  font-size: 0;
  line-height: 0;
  color: ${({ theme }) => theme.text.plain};
`;

const DateArea = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  user-select: none;

  border-radius: 4px;
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.border.white};
  background-color: ${({ theme }) => theme.button.white};
  color: ${({ theme }) => theme.text.plain};
`;

export default TopNavbar;
