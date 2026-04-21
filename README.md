# DevBlog(React)
React를 사용하여 제작한 개발자 블로그 애플리케이션입니다.

## 1. 프로젝트 개요

### 1-1. React 핵심 개념
- **SPA** <br/>
React Router을 활용하여 페이지 전환 시 전체 새로고침 없이 컴포넌트만 교체합니다. `<Routes>`를 선언하여 경로를 지정하고, 인증 여부에 따라 `<PrivateRoute />`와 `<PublicOnlyRoute>`로 접근을 제어합니다.

- **컴포넌트 기반 설계** <br/>
UI는 `components/`폴더 하위에 각각 `layout`, `section`, `common`, `comment`, `post`로 구분하고, 비즈니스 로직은 `hooks/`로 분리했습니다. API 통신은 `api/` 폴더에 모아두어 뷰 컴포넌트가 HTTP 구현에 의존하지 않도록 설계했습니다.

- **REST API** <br/>
Axios 인스턴스를 중앙에서 관리하며, 요청 인터셉터로 JWT 토큰을 자동 첨부하고 응답 인터셉터로 401 만료 시 자동 로그아웃 처리를 구현했습니다.

### 1-2. React를 선택한 이유

## 2. 기술 스택

## 3. 핵심 기능

## 4. 트러블 슈팅

## 5. 개선 사항
