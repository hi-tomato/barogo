### 2025.07.25 브랜치 병합 계획

#### 병합 대상 브랜치

| 브랜치명                          | 생성일     | 주요 변경사항           | 의존성 |
| --------------------------------- | ---------- | ----------------------- | ------ |
| `feature/main-page`               | 2025-07-22 | 메인 페이지 UI 개선     | 없음   |
| `feature/fix-create-baropot`      | 2025-07-23 | 바로팟 생성 버그 수정   | 없음   |
| `feature/style-kakao-map`         | 2025-07-24 | 카카오맵 스타일링       | 없음   |
| `feature/style-restaurant-detail` | 2025-07-25 | 식당 상세 페이지 스타일 | 없음   |
| `feature/style-search-modal`      | 2025-07-25 | 검색 모달 스타일        | 없음   |

#### 병합 순서

1. `feature/main-page` (기본 UI)
2. `feature/fix-create-baropot` (버그 수정)
3. `feature/style-kakao-map` (맵 스타일)
4. `feature/style-restaurant-detail` (상세 페이지)
5. `feature/style-search-modal` (검색 모달)

#### 주의사항

- 모든 브랜치가 독립적이므로 순서 무관
- 스타일 관련 브랜치들이 많으므로 CSS 충돌 주의
- 테스트 후 `develop` 병합 예정

#### 완료 체크리스트

- [ ] 각 브랜치 병합 완료
- [ ] 충돌 해결 완료
- [ ] 전체 테스트 통과
- [ ] 코드 리뷰 완료
- [ ] `develop` 병합 승인
