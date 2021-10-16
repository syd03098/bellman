// 팔레트, 주로 사용하게될 색상들
export interface Theme {
  color: {
    // background 컬러
    background: string;
    // 하단 footer의 배경색
    subHeader: string;
    // 주로 button의 border 색깔
    border: string;
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
  button: {
    // 무색 버튼 배경색
    default: string;
    // 연한 gray색 버튼 배경
    smoke: string;
    // primary(짙은 파랑) 버튼 배경
    primary: string;
  };
}
