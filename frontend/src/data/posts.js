import jsImage from "../assets/images/JS.png";

export const posts = [
  {
    id: 1,
    thumbnail: jsImage,
    title: "1. JavaScript: 기초",
    info: { date: "2개월 전", view: 10, comment: 15 },
    summary: "자바스크립트의 기본 문법과 변수 선언 방식에 대해 알아봅니다.",
    tag: ["css", "javascript", "react"],
    type: "post"
  },
  {
    id: 2,
    thumbnail: jsImage,
    title: "2. CSS: 기초",
    info: { date: "2개월 전", view: 2, comment: 15 },
    summary: "Flexbox와 Grid를 이용한 레이아웃 구성 방법입니다.",
    tag: ["react"],
    type: "post"
  },
  {
    id: 3,
    thumbnail: jsImage,
    title: "3. HTML: 기초",
    info: { date: "2개월 전", view: 6, comment: 15 },
    summary: "웹 표준을 준수하는 시맨틱 태그 활용법을 정리했습니다.",
    tag: ["css", "html", "vue"],
    type: "post"
  },
  {
    id: 4,
    thumbnail: jsImage,
    title: "4. User",
    info: { date: "2개월 전", view: 16, comment: 15 },
    summary: "Hi, my name is Kim. 프론트엔드 개발자 지망생입니다.",
    tag: ["css", "html", "vue"],
    type: "user"
  },
  {
    id: 5,
    thumbnail: jsImage,
    title: "5. HTML: 기초",
    info: { date: "2개월 전", view: 8, comment: 15 },
    summary: "안녕하세요, Kenny입니다. 오늘부터 블로그 시작합니다.",
    tag: ["css", "html", "vue"],
    type: "user"
  },
  {
    id: 6,
    thumbnail: jsImage,
    title: "6. React Query 시작하기",
    info: { date: "1개월 전", view: 80, comment: 5 },
    summary: "서버 상태 관리를 위한 효율적인 데이터 페칭 전략.",
    tag: ["react", "library"],
    type: "post"
  },
  {
    id: 7,
    thumbnail: jsImage,
    title: "7. TypeScript 입문 가이드",
    info: { date: "1개월 전", view: 120, comment: 22 },
    summary: "자바스크립트에 타입을 입히면 생기는 놀라운 변화들.",
    tag: ["typescript", "javascript"],
    type: "post"
  },
  {
    id: 8,
    thumbnail: jsImage,
    title: "8. Next.js App Router 이해",
    info: { date: "3주 전", view: 45, comment: 8 },
    summary: "서버 컴포넌트와 클라이언트 컴포넌트의 차이점.",
    tag: ["nextjs", "react"],
    type: "post"
  },
  {
    id: 9,
    thumbnail: jsImage,
    title: "9. Tailwind CSS 장단점",
    info: { date: "3주 전", view: 33, comment: 12 },
    summary: "클래스 기반 스타일링이 개발 속도를 얼마나 높여줄까?",
    tag: ["css", "design"],
    type: "post"
  },
  {
    id: 10,
    thumbnail: jsImage,
    title: "10. User Profile: Lee",
    info: { date: "2주 전", view: 19, comment: 3 },
    summary: "디자인과 코딩을 사랑하는 이씨입니다.",
    tag: ["figma", "ui"],
    type: "user"
  },
  {
    id: 11,
    thumbnail: jsImage,
    title: "11. Webpack vs Vite",
    info: { date: "2주 전", view: 55, comment: 14 },
    summary: "차세대 번들러 Vite가 왜 빠른지에 대한 기술적 분석.",
    tag: ["build-tool", "javascript"],
    type: "post"
  },
  {
    id: 12,
    thumbnail: jsImage,
    title: "12. Redux Toolkit 활용법",
    info: { date: "12일 전", view: 27, comment: 9 },
    summary: "보일러플레이트 없는 전역 상태 관리 코드 짜기.",
    tag: ["react", "redux"],
    type: "post"
  },
  {
    id: 13,
    thumbnail: jsImage,
    title: "13. 알고리즘: DFS와 BFS",
    info: { date: "10일 전", view: 92, comment: 30 },
    summary: "자바스크립트로 구현하는 그래프 탐색 알고리즘 기초.",
    tag: ["algorithm", "javascript"],
    type: "post"
  },
  {
    id: 14,
    thumbnail: jsImage,
    title: "14. Git Branch 전략 정리",
    info: { date: "9일 전", view: 41, comment: 6 },
    summary: "Git Flow vs Github Flow, 어떤 상황에 써야 할까?",
    tag: ["git", "collaboration"],
    type: "post"
  },
  {
    id: 15,
    thumbnail: jsImage,
    title: "15. User Profile: Park",
    info: { date: "8일 전", view: 11, comment: 2 },
    summary: "백엔드에서 프론트로 전향 중인 개발자입니다.",
    tag: ["node", "react"],
    type: "user"
  },
  {
    id: 16,
    thumbnail: jsImage,
    title: "16. 비동기 처리: async/await",
    info: { date: "7일 전", view: 64, comment: 18 },
    summary: "콜백 지옥에서 벗어나 깔끔한 비동기 코드를 작성하는 법.",
    tag: ["javascript", "es6"],
    type: "post"
  },
  {
    id: 17,
    thumbnail: jsImage,
    title: "17. 웹 접근성(A11y) 가이드",
    info: { date: "6일 전", view: 21, comment: 4 },
    summary: "모두를 위한 웹을 만드는 작은 습관들.",
    tag: ["html", "accessibility"],
    type: "post"
  },
  {
    id: 18,
    thumbnail: jsImage,
    title: "18. 브라우저 렌더링 원리",
    info: { date: "5일 전", view: 105, comment: 25 },
    summary: "HTML이 파싱되어 화면에 그려지기까지의 CRP 과정.",
    tag: ["browser", "performance"],
    type: "post"
  },
  {
    id: 19,
    thumbnail: jsImage,
    title: "19. SQL vs NoSQL 차이점",
    info: { date: "5일 전", view: 48, comment: 11 },
    summary: "데이터 구조에 따른 데이터베이스 선택 기준.",
    tag: ["database", "backend"],
    type: "post"
  },
  {
    id: 20,
    thumbnail: jsImage,
    title: "20. User: Dev_Min",
    info: { date: "4일 전", view: 7, comment: 0 },
    summary: "주니어 개발자 민입니다. 소통 환영해요!",
    tag: ["javascript", "study"],
    type: "user"
  },
  {
    id: 21,
    thumbnail: jsImage,
    title: "21. HTTP 헤더 완벽 정리",
    info: { date: "4일 전", view: 39, comment: 7 },
    summary: "CORS 설정부터 캐시 제어까지 중요한 헤더값 살펴보기.",
    tag: ["network", "http"],
    type: "post"
  },
  {
    id: 22,
    thumbnail: jsImage,
    title: "22. Docker 컨테이너 기초",
    info: { date: "3일 전", view: 56, comment: 13 },
    summary: "환경에 구애받지 않는 개발 환경 구축하기.",
    tag: ["devops", "docker"],
    type: "post"
  },
  {
    id: 23,
    thumbnail: jsImage,
    title: "23. React Hooks: useEffect",
    info: { date: "3일 전", view: 72, comment: 20 },
    summary: "의존성 배열을 잘못 쓰면 생기는 무한 루프 문제.",
    tag: ["react", "hooks"],
    type: "post"
  },
  {
    id: 24,
    thumbnail: jsImage,
    title: "24. 모던 자바스크립트 구조 분해",
    info: { date: "2일 전", view: 28, comment: 5 },
    summary: "객체와 배열을 다루는 가장 효율적인 문법들.",
    tag: ["javascript", "es6"],
    type: "post"
  },
  {
    id: 25,
    thumbnail: jsImage,
    title: "25. User: Creative_Choi",
    info: { date: "2일 전", view: 15, comment: 1 },
    summary: "웹 아트와 인터랙티브 디자인을 공부합니다.",
    tag: ["threejs", "design"],
    type: "user"
  },
  {
    id: 26,
    thumbnail: jsImage,
    title: "26. 단위 테스트 입문 (Jest)",
    info: { date: "1일 전", view: 31, comment: 6 },
    summary: "내가 짠 코드가 정상적으로 작동함을 증명하는 법.",
    tag: ["testing", "javascript"],
    type: "post"
  },
  {
    id: 27,
    thumbnail: jsImage,
    title: "27. 리액트 성능 최적화 기법",
    info: { date: "22시간 전", view: 88, comment: 19 },
    summary: "memo, useMemo, useCallback은 언제 써야 할까?",
    tag: ["react", "performance"],
    type: "post"
  },
  {
    id: 28,
    thumbnail: jsImage,
    title: "28. 가상 돔(Virtual DOM)이란?",
    info: { date: "15시간 전", view: 42, comment: 10 },
    summary: "리액트가 화면을 효율적으로 업데이트하는 내부 원리.",
    tag: ["react", "concept"],
    type: "post"
  },
  {
    id: 29,
    thumbnail: jsImage,
    title: "29. PWA로 앱처럼 만들기",
    info: { date: "5시간 전", view: 25, comment: 3 },
    summary: "웹 사이트를 모바일 앱처럼 설치하고 푸시 알림 보내기.",
    tag: ["pwa", "mobile"],
    type: "post"
  },
  {
    id: 30,
    thumbnail: jsImage,
    title: "30. User: Final_Boss",
    info: { date: "1시간 전", view: 100, comment: 99 },
    summary: "드디어 30번째 데이터를 완성했습니다! 🚀",
    tag: ["complete", "success"],
    type: "user"
  }
];