# Trading Web 개발 및 설계 가이드

## 프로젝트 개요

Trading Web은 가상자산 거래 화면을 구현한 클라이언트 사이드 React 애플리케이션입니다. 현재는 단일 화면 데모이며 시장, 오더북, 차트, 주문, 포지션 UI가 로컬 데이터와 컴포넌트 상태로 동작합니다.

## 기본 기술 스택

| 영역 | 기술 | 현재 버전/설정 |
| --- | --- | --- |
| UI | React | `19.1.1` |
| 언어 | TypeScript | `5.8.x`, strict mode |
| 빌드·개발 서버 | Vite | `7.1.x` |
| React 빌드 플러그인 | `@vitejs/plugin-react` | `5.0.x` |
| 스타일 | Sass/SCSS | `1.92.x` |
| DOM 렌더링 | React DOM | `19.1.1`, `createRoot` |
| 모듈 | ES Modules | `package.json`의 `"type": "module"` |
| 브라우저 기준 | ES2022 + DOM | `tsconfig.app.json` |

현재 설치되어 있지 않은 항목:

- 라우터
- 서버 상태/API 클라이언트
- 전역 상태 관리 라이브러리
- 폼 라이브러리
- 차트 라이브러리
- 테스트 프레임워크
- ESLint/Prettier 스크립트

따라서 문서나 코드에서 위 도구가 이미 있다고 가정하면 안 됩니다. 도입할 때는 해결하려는 문제와 운영 비용을 먼저 합의합니다.

## 실행 명령어

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

| 명령 | 역할 |
| --- | --- |
| `npm run dev` | Vite 개발 서버 실행 |
| `npm run typecheck` | TypeScript 프로젝트 검사 |
| `npm run build` | 타입 검사 후 프로덕션 번들 생성 |
| `npm run preview` | 생성된 번들 로컬 확인 |

## 애플리케이션 진입 구조

```text
index.html
└─ src/main.tsx
   └─ React.StrictMode
      └─ LocaleProvider
         └─ App
            ├─ TradingHeader
            ├─ trade
            │  ├─ MarketPanel
            │  ├─ MobileTradingNav
            │  ├─ TradeChart
            │  ├─ OrderBook
            │  ├─ OrderForm
            │  └─ PositionsPanel
            └─ StatusBar
```

`main.tsx`에서 전역 SCSS를 한 번 불러오고 전체 앱을 `LocaleProvider`로 감쌉니다. 별도 라우터는 없으며 `App`이 현재 화면 구성과 화면 간 공유 상태를 담당합니다.

## 폴더 구조

```text
src/
├─ assets/images/        # React 앱에서 사용하는 이미지
├─ components/
│  ├─ icons/             # SVG React 컴포넌트
│  ├─ layout/            # 헤더, 상태 바, 모바일 내비게이션
│  ├─ trading/           # 거래 도메인 컴포넌트와 데모 차트
│  └─ ui/                # 도메인 독립 공통 UI
├─ i18n/
│  └─ Locale.tsx         # 번역 데이터, Context, hook
├─ styles/
│  ├─ _tokens.scss       # 크기·간격·레이어·모션 토큰
│  ├─ _color-token.scss  # 색상 토큰
│  ├─ _mixins.scss       # flex와 반응형 믹스인
│  ├─ _reset.scss        # 폰트와 전역 초기화
│  ├─ _components.scss   # 공통 UI 스타일
│  ├─ _layout.scss       # 화면과 거래 도메인 스타일
│  └─ main.scss          # 스타일 진입점
├─ App.tsx               # 화면 조합과 공유 UI 상태
└─ main.tsx              # React 진입점
```

루트의 `assets/`에는 별도 정적 SCSS, CSS, JS, 폰트, 이미지가 있습니다. React 앱의 실제 진입점은 `src/styles/main.scss`입니다. 두 스타일 체계를 섞어 수정하기 전에 해당 파일이 현재 앱에서 import되는지 확인합니다.

## 컴포넌트 설계 원칙

### 역할에 따른 배치

- 여러 도메인에서 재사용하는 순수 UI: `components/ui`
- 거래 기능과 데이터 표현: `components/trading`
- 페이지 골격과 전역 내비게이션: `components/layout`
- 재사용 SVG 아이콘: `components/icons`

컴포넌트가 커지면 “보이는 영역”이 아니라 상태 책임을 기준으로 나눕니다. 상위 컴포넌트는 조합과 공유 상태를, 하위 컴포넌트는 한 기능의 렌더링과 로컬 상호작용을 담당합니다.

### Props

- Props 타입은 컴포넌트 가까이에 선언합니다.
- 외부에서도 데이터 계약으로 쓰는 타입만 `export`합니다.
- 제어 가능한 컴포넌트는 `value/onChange`, `open/onOpenChange`처럼 값과 변경 콜백을 짝지어 사용합니다.
- boolean props는 `isCollapsed`, `isExpanded`처럼 상태가 분명한 이름을 사용합니다.
- DOM 이벤트보다 도메인 값을 콜백으로 전달합니다.

### 상태 소유권

현재 `App`이 다음 공유 상태를 가집니다.

- 로딩 상태
- 수량 단위
- 입금 UI 열림 상태
- 포지션 패널 접힘 상태
- 선택 시장
- 모바일 활성 화면

차트 탭, 주문 값처럼 한 컴포넌트 안에서만 사용하는 상태는 해당 컴포넌트에 둡니다. 두 개 이상의 형제 컴포넌트가 같은 상태를 읽거나 변경할 때 가장 가까운 공통 부모로 올립니다.

`App`의 상태와 전달 단계가 계속 늘어나면 Context 또는 전역 상태 도구 도입을 검토하되, 서버 데이터와 UI 상태를 구분합니다.

## 데이터 설계

현재 시장, 오더북, 캔들, 깊이, 펀딩 데이터는 프론트엔드 내부의 데모 데이터입니다. 네트워크 요청, 인증, WebSocket 연결은 구현되어 있지 않습니다.

실제 데이터 연동 시 권장 경계:

```text
API/WebSocket
  ↓
transport client
  ↓
runtime validation / normalization
  ↓
domain model
  ↓
query or stream state
  ↓
view component props
```

- API 응답 타입을 화면 컴포넌트에 직접 퍼뜨리지 않습니다.
- 가격, 수량, 비율의 원 단위와 표시 단위를 타입 또는 이름으로 구분합니다.
- 금액 계산에 JavaScript 부동소수점을 그대로 사용할지 검토하고 정밀도 정책을 정합니다.
- WebSocket 데이터는 구독 해제, 재연결, 스냅샷과 증분 순서, 오래된 데이터 표시를 설계합니다.
- 로딩, 빈 데이터, 오류, 재시도, 연결 끊김 상태를 모든 주요 패널에 정의합니다.

## 상태 설계 확장안

기능 확장 시 상태를 다음처럼 분리합니다.

| 상태 종류 | 예시 | 권장 위치 |
| --- | --- | --- |
| 로컬 UI | 탭, 툴팁, 입력 포커스 | 해당 컴포넌트 |
| 화면 공유 UI | 선택 시장, 표시 단위 | 공통 부모 또는 Context |
| 서버 스냅샷 | 시장 목록, 계정 정보 | 서버 상태 계층 |
| 실시간 스트림 | 호가, 체결, 가격 | 전용 구독 계층 |
| URL 상태 | 시장 심볼, 화면 탭 | 라우터 도입 후 URL |
| 영속 설정 | 언어, 표시 환경 | 저장소 어댑터 |

현재 언어는 새로고침하면 한국어로 초기화됩니다. 사용자 설정으로 취급하려면 저장·복원 정책을 추가해야 합니다.

## 스타일 아키텍처

`src/styles/main.scss`는 reset, components, layout을 불러옵니다. 각 SCSS 파일은 토큰과 색상, 믹스인을 `@use`합니다.

- 전역 초기화와 폰트: `_reset.scss`
- 공통 버튼·패널·툴팁 등: `_components.scss`
- 화면/도메인 레이아웃: `_layout.scss`
- 클래스 네이밍: BEM 형태 + `is-*` 상태
- 반응형: `_mixins.scss`의 `desktop`, `tablet`, `mobile`

React 컴포넌트에서 인라인 스타일은 데이터에 따라 좌표나 크기가 변하는 경우에만 사용합니다. 고정된 시각 규칙은 SCSS와 토큰에 둡니다.

## 다국어

`LocaleProvider`가 `lang`, `setLang`, `t`를 Context로 제공합니다.

```ts
const { lang, setLang, t } = useLocale();
```

- 언어 타입: `ko | en | ja | zh | vi | fr`
- 번역 키는 한국어 객체의 키를 기준으로 타입이 결정됩니다.
- 새 문구는 모든 언어 객체에 같은 키로 추가합니다.
- 사용자 노출 문자열과 `aria-label`을 하드코딩하지 않습니다.
- 날짜·시간·숫자도 현재 언어의 로케일을 사용합니다.

현재 소스 일부에 깨진 한글 문자열이 보입니다. 기능 추가와 별개로 파일 인코딩을 UTF-8로 통일하고 번역 원문을 검수해야 합니다.

## 접근성과 상호작용

- 네이티브 `button`, `input`, `details` 등 의미 있는 HTML을 우선합니다.
- 모든 폼 컨트롤에 이름을 제공합니다.
- 마우스 전용 상호작용은 키보드와 터치 동작을 함께 설계합니다.
- 열림, 선택, 확장 상태는 적절한 ARIA 속성으로 노출합니다.
- Portal 툴팁처럼 전역 이벤트를 등록하는 컴포넌트는 cleanup을 보장합니다.
- 실시간 데이터 영역은 불필요하게 전체 컴포넌트를 다시 렌더링하지 않도록 경계를 나눕니다.

## 성능 고려사항

거래 화면은 실시간 갱신 빈도가 높아질 수 있습니다.

- 정적 데이터와 계산 결과는 필요할 때만 메모이제이션합니다.
- 고빈도 스트림마다 전체 `App` 상태를 갱신하지 않습니다.
- 오더북과 체결 목록은 업데이트 범위와 렌더링 행 수를 제한합니다.
- 차트 포인터 이벤트는 필요하면 `requestAnimationFrame`으로 조절합니다.
- 성능 최적화 전 React Profiler와 브라우저 성능 도구로 병목을 측정합니다.

## 오류와 보안

실제 주문 기능을 붙일 때 다음 원칙을 적용합니다.

- 프론트엔드 검증만 신뢰하지 않고 서버에서 주문을 다시 검증합니다.
- API 키, 서명 키, 비밀 값은 클라이언트 번들에 포함하지 않습니다.
- 주문 요청에는 중복 제출 방지와 명확한 진행 상태를 둡니다.
- 표시 가격과 실제 체결 가능 가격의 시점 차이를 사용자에게 알립니다.
- 전역 Error Boundary와 패널별 오류 복구 UI를 설계합니다.
- 환경 변수는 공개 가능한 값만 Vite의 클라이언트 환경 변수로 노출합니다.

## 테스트 전략

현재 자동 테스트 도구는 없습니다. 기능이 실제 데이터와 주문 흐름으로 확장되기 전에 다음 계층 도입을 권장합니다.

- 단위 테스트: 포맷터, 계산, 데이터 정규화
- 컴포넌트 테스트: 주문 입력, 선택 메뉴, 탭, 로딩·오류 상태
- 통합 테스트: 시장 변경, 단위 동기화, 주문 제출
- E2E 테스트: 로그인부터 주문 확인까지의 핵심 경로
- 시각 회귀 테스트: 데스크톱·태블릿·모바일과 6개 언어

현재 변경의 최소 검증은 다음과 같습니다.

```bash
npm run typecheck
npm run build
```

UI 변경은 위 명령만으로 충분하지 않으므로 실제 브라우저에서 반응형, 키보드, 긴 문자열을 확인합니다.

## 개발 작업 체크리스트

- 코드가 올바른 폴더와 책임 경계에 있는가
- 타입 우회 없이 strict TypeScript를 통과하는가
- 데모 데이터와 실제 데이터 계약을 혼동하지 않았는가
- 공통 토큰·UI 컴포넌트·번역 체계를 재사용했는가
- 로딩, 빈 값, 오류, 연결 끊김 상태를 고려했는가
- Desktop, Tablet, Mobile에서 동작하는가
- 키보드와 보조 기술에서 사용할 수 있는가
- 이벤트 리스너, 타이머, 구독을 정리하는가
- `npm run typecheck`와 `npm run build`가 통과하는가
