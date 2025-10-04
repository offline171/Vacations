# Tasks: Homely Vacation Rating Site

**Input**: Design documents from `/specs/001-i-am-building/`
**Prerequisites**: plan.md (required)

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Extract: tech stack, libraries, structure
2. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, endpoints
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
3. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
4. Number tasks sequentially (T001, T002...)
5. Generate dependency graph
6. Create parallel execution examples
7. Validate task completeness
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Phase 3.1: Setup
- [X] T001 Create backend and frontend project structure per implementation plan
- [X] T002 Initialize Node.js backend with Express, Passport, pg dependencies
- [X] T003 Initialize EJS frontend and public assets directory
- [X] T004 [P] Configure linting and formatting tools (e.g., ESLint, Prettier)

## Phase 3.2: Tests First (TDD)
- [X] T005 [P] Contract test POST /api/users in backend/tests/contract/test_users_post.js
- [X] T006 [P] Contract test POST /api/vacations in backend/tests/contract/test_vacations_post.js
- [X] T007 [P] Contract test POST /api/bookmarks in backend/tests/contract/test_bookmarks_post.js
- [X] T008 [P] Contract test POST /api/ratings in backend/tests/contract/test_ratings_post.js
- [X] T009 [P] Integration test user registration in backend/tests/integration/test_registration.js
- [X] T010 [P] Integration test vacation spot viewing in backend/tests/integration/test_vacation_view.js
- [X] T011 [P] Integration test bookmarking flow in backend/tests/integration/test_bookmark.js
- [X] T012 [P] Integration test rating flow in backend/tests/integration/test_rating.js

## Phase 3.3: Core Implementation
- [X] T013 [P] User model in backend/src/models/user.js
- [X] T014 [P] VacationSpot model in backend/src/models/vacationSpot.js
- [X] T015 [P] Bookmark model in backend/src/models/bookmark.js
- [X] T016 [P] Rating model in backend/src/models/rating.js
- [X] T017 UserService CRUD in backend/src/services/userService.js
- [X] T018 VacationService CRUD in backend/src/services/vacationService.js
- [X] T019 BookmarkService CRUD in backend/src/services/bookmarkService.js
- [X] T020 RatingService CRUD in backend/src/services/ratingService.js
- [X] T021 POST /api/users endpoint in backend/src/api/users.js
- [X] T022 POST /api/vacations endpoint in backend/src/api/vacations.js
- [X] T023 POST /api/bookmarks endpoint in backend/src/api/bookmarks.js
- [X] T024 POST /api/ratings endpoint in backend/src/api/ratings.js
- [X] T025 Input validation and error handling in backend/src/api/middleware/validation.js
- [X] T026 Logging middleware in backend/src/api/middleware/logging.js

## Phase 3.4: Integration
- [X] T027 Connect services to PostgreSQL DB in backend/src/services/db.js
- [X] T028 Auth middleware using Passport in backend/src/api/middleware/auth.js
- [X] T029 Request/response logging in backend/src/api/middleware/logging.js
- [X] T030 CORS and security headers in backend/src/api/middleware/security.js

## Phase 3.5: Polish
- [ ] T031 [P] Unit tests for validation in backend/tests/unit/test_validation.js
- [ ] T032 [P] Unit tests for models in backend/tests/unit/test_models.js
- [ ] T033 [P] Performance tests in backend/tests/performance/test_performance.js
- [ ] T034 [P] Update documentation in specs/001-i-am-building/docs/api.md
- [ ] T035 [P] Manual UI review and polish in frontend/views/

## Dependencies
- Tests (T005-T012) before implementation (T013-T026)
- Models (T013-T016) before services (T017-T020)
- Services before endpoints (T021-T024)
- Implementation before polish (T031-T035)

## Parallel Example
```
# Launch T005-T012 together:
Task: "Contract test POST /api/users in backend/tests/contract/test_users_post.js"
Task: "Contract test POST /api/vacations in backend/tests/contract/test_vacations_post.js"
Task: "Contract test POST /api/bookmarks in backend/tests/contract/test_bookmarks_post.js"
Task: "Contract test POST /api/ratings in backend/tests/contract/test_ratings_post.js"
Task: "Integration test registration in backend/tests/integration/test_registration.js"
Task: "Integration test vacation spot viewing in backend/tests/integration/test_vacation_view.js"
Task: "Integration test bookmarking flow in backend/tests/integration/test_bookmark.js"
Task: "Integration test rating flow in backend/tests/integration/test_rating.js"
```

## Validation Checklist
- [x] All contracts have corresponding tests
- [x] All entities have model tasks
- [x] All tests come before implementation
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
