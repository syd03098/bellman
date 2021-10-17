import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    layout: {
      // background 컬러
      background: string;
      // 하단 footer의 배경색
      subHeader: string;
    };
    text: {
      // 강조 text
      bold: string;
      // 보통 text
      plain: string;
      // 연한 text
      smoke: string;
      // 주로 primary(짙은 파랑) 버튼내 글씨 색으로 사용됨
      primary: string;
      // 하늘색 text
      blue: string;
    };
    border: {
      white: string;
      smoke: string;
      primary: string;
    };
    button: {
      // 흰색 버튼 배경
      white: string;
      // 연한 gray색 버튼 배경
      smoke: string;
      // primary(짙은 파랑) 버튼 배경
      primary: string;
    };
  }
}
