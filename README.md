## Bellman

* `electron` 기반 gui 프로그램
* `electron-builder` 로 빌드
* `React` `Typescript` `Reakit` `styled-components`
* 재택근무자를 위한 스트레칭 & 운동 유도 어플리케이션
  * 현재는 숨쉬기 운동, 간단한 스쿼트, 옆구리 운동을 지원하고있어요! 
* Scripts
  * `npm run build:renderer` : React 엔트리 포인트와 `preload.js`를 production 환경에서 빌드합니다.
  * `npm run build:main`: main 프로세스의 엔트리포인트 `index.js`를 production 환경에서 빌드합니다.
  * `npm run release`: `dist`에 renderer 프로세스 의 산출물과 main 프로세스의 산출물을 exe, dmg 바이너리 파일로 패키징 합니다.
  <br />
  
> darwin(macos), win32(windows) 환경에서만 바이너리 파일을 빌드할 수 있어요.

> ❗ 내장 웹캠, 외부 웹캠에 대한 권한이 필요합니다!

## Bellman-canvas 
  * `mediapipe`기반으로 제작 
  * 운동 시행시 사용자의 동작을 웹캠을 통해 실시간으로 감지, 운동을 정확히 수행했는지 카운트를 수행해줍니다.
  * https://github.com/leegwae/bellman-canvas

## 주요화면
<p float="left">
 <img width="320" alt="첫 화면" src="https://user-images.githubusercontent.com/50237150/144289115-79a2586e-9c0f-4b08-8d05-95bc09ecab69.png" />
 <img width="320" alt="설정창" src="https://user-images.githubusercontent.com/50237150/144289157-966e48cf-7af4-4fa1-bcf5-b89b2ff3eace.png" />
 <img width="320" alt="결과 화면" src="https://user-images.githubusercontent.com/50237150/144291312-cdcc448d-4e05-45be-be06-df752760ffe8.png" />
</p>

