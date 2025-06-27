# 📝 커밋 메시지 컨벤션

## 🏷️ 커밋 타입

| 타입       | 설명                                  | 예시                                 |
| ---------- | ------------------------------------- | ------------------------------------ |
| `feat`     | 새로운 기능 추가                      | `feat: 바로팟 생성 기능 추가`        |
| `fix`      | 버그 수정                             | `fix: 로그인 시 에러 발생 문제 해결` |
| `docs`     | 문서 수정                             | `docs: README 업데이트`              |
| `style`    | 코드 포맷팅, 세미콜론 누락 등         | `style: 코드 포맷팅 수정`            |
| `refactor` | 코드 리팩토링                         | `refactor: 컴포넌트 분리`            |
| `test`     | 테스트 코드 추가/수정                 | `test: 바로팟 생성 테스트 추가`      |
| `chore`    | 빌드 업무 수정, 패키지 매니저 수정 등 | `chore: 패키지 의존성 업데이트`      |

## 📋 커밋 메시지 구조

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 예시

```
feat(baropot): 바로팟 상세 조회 기능 추가

- 바로팟 상세 페이지 컴포넌트 생성
- API 연동 및 상태 관리 구현
- 로딩/에러 상태 처리 추가

Closes #12
```

## 🔗 이슈 연결

### 이슈 닫기

```
Closes #12
Fixes #12
Resolves #12
```

### 이슈 참조

```
Related to #12
See also #12
```

## 📝 작성 규칙

### Subject (제목)

- 50자 이내로 작성
- 첫 글자는 소문자로 시작
- 마침표로 끝내지 않음
- 명령형으로 작성 (과거형 X)

### Body (본문)

- 72자 이내로 줄바꿈
- 무엇을, 왜 변경했는지 설명
- 선택사항이지만 권장

### Footer (바닥글)

- 이슈 번호 연결
- Breaking Changes 설명
- 선택사항

## ✅ 좋은 예시

```
feat: 바로팟 참가 기능 구현

- 바로팟 참가 API 연동
- 참가 상태에 따른 UI 변경
- 참가자 수 실시간 업데이트

Closes #15
```

```
fix: 로그인 후 리다이렉트 문제 해결

로그인 성공 후 메인 페이지로 리다이렉트되지 않는
문제를 해결했습니다.

Fixes #8
```

## ❌ 나쁜 예시

```
수정함
```

```
bug fix
```

```
바로팟 기능 추가
```

## 🏷️ 스코프 (선택사항)

스코프는 변경사항의 범위를 나타냅니다:

- `feat(auth)`: 인증 관련 기능
- `fix(ui)`: UI 관련 버그 수정
- `refactor(api)`: API 관련 리팩토링
- `test(baropot)`: 바로팟 관련 테스트

## 🔄 브랜치 네이밍

```
feature/기능명
bugfix/버그명
hotfix/긴급수정명
refactor/리팩토링명
```

### 예시

```
feature/baropot-detail
bugfix/login-redirect
hotfix/critical-error
refactor/component-structure
```
