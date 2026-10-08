# AI Network Portfolio — Integrated Roadmap

## v0.0.124 — Orbital Detail & Visibility (source implemented)
- [x] Mini black hole spiral streams and accretion detail
- [x] Dynamic station metal structure, solar arrays, beacon and antenna
- [x] Viewport-relative positioning instead of fixed x coordinate
- [x] LOW/BALANCED/HIGH detail budgets
- [x] Source regression test
- [ ] Verify browser visibility at 16:9 and mobile ratios
- [ ] Full Next.js build and TypeScript type check
- [ ] GTX 660 performance profiling

## v0.1.0 — Acceptance
- [ ] Compare actual screenshot to cinematic target reference
- [ ] Verify eight hub navigation and active context
- [ ] Verify quality switch and performance
- [ ] GitHub Pages production deployment and smoke tests

---

# AI Network Portfolio — 목표 시안 기준 통합 로드맵

**기준 버전: v0.0.120 | 작성일: 2026-10-08 | 다음 개발 버전: v0.0.120**

> 이 문서가 현재 유효한 개발 계획의 단일 기준입니다. 하단의 기존 이력은 아카이브로 보존합니다. 버전 증가만으로 완료를 선언하지 않으며, 소스 검사 / 실제 렌더링 / 브라우저 기능 / 성능 / 배포 검증을 구분합니다.

## 1. 목표 시안과 현재 화면의 차이 (2026-10-08 사용자 캡처 기준)

| 항목 | 목표 시안 | 현재 화면 문제 | 판정 |
|---|---|---|---|
| 8개 Hub | 유리 같은 투명 구체 **내부**에 독립적인 3D 시설, 멀리서도 인식 가능 | 내부 시설이 흐릿하고 평면 엠블럼·색상 면에 묻힘 | ❌ 불일치 |
| Hub 정체성 | Profile 인물/도시, Career 빌딩, Projects 모듈, Portfolio 디스플레이, GitHub 브랜치, Expertise 지식 코어, Training 교육, Archive 데이터 보관 시설 | 구조별 입체감과 크기 차이가 부족함 | ❌ 불일치 |
| 행성 고리 | 토성처럼 얇고 납작한 동심원 띠, 구체 앞뒤 깊이 관계 | 여러 궤도·장식이 겹치며 내부를 가림 | ⚠️ 부분 구현 |
| 중심 블랙홀 | 어두운 사건지평선과 강한 강착 원반·플라즈마 흡수 | 기본 인상은 유지되지만 과도한 입자와 주변 Hub가 경쟁 | ⚠️ 재균형 필요 |
| 화면 구도 | 8개 Hub와 중앙 Core가 균형 잡힌 16:9 구성 | 상단 Hub가 잘리고 일부 영역이 과밀 | ❌ 불일치 |
| 배경 | 심도 있는 성운·별, 주 피사체와 구분되는 저채도 환경 | 전경 점광원·기하 파편이 많아 시각적 노이즈 | ❌ 불일치 |
| HUD/레이블 | 좌측 탐색, 하단 지표 패널, 우측 ACTIVE CONTEXT, 각 Hub 제목 | 사용자 캡처에서는 UI가 보이지 않거나 프레이밍에서 제외 | ❓ 별도 검증 필요 |
| 성능·배포 | LOW에서도 식별성 확보, 품질별 안정적 동작, 정적 배포 | 실제 빌드·FPS·클릭·배포 미검증 | ⏳ 미검증 |

**디자인 불변 조건:** 블랙홀/플라즈마의 기본 구상, 8개 메뉴와 연결 관계, Saturn ring 컨셉, 기존 GitBlog 연동, WebGL/Next.js 정적 배포 방향을 보존합니다. 3D 시설을 구체 밖으로 빼거나 정면에 평면 로고를 붙여 가독성을 확보하는 우회 방식은 목표 구현으로 인정하지 않습니다.

## 2. 버전별 통합 계획 (총 3단계)

| 버전 | 단계 | 묶어서 처리할 작업 | 완료 게이트 | 상태 |
|---|---|---|---|---|
| **v0.0.120** | **Hub Visual Rebuild** | 8개 내부 시설 재모델링 + 투명 구체 셰이딩 + Saturn 링 깊이/밀도 + Hub 조명/LOD + 위성·파편 정리 | 실제 브라우저 캡처에서 8개 Hub가 **구체 안에 선명히 보이고** 정체성이 구분됨 | 🟡 코드 재구성 완료 / 시각 검증 대기 |
| **v0.0.120** | **Scene & Runtime Integration** | 전체 구도·Core/Plasma·HUD·레이블·클릭/ACTIVE CONTEXT·반응형·품질/성능·Next.js 빌드 오류 통합 수정 | 화면 구성·8개 탐색·품질 전환·프로덕션 빌드가 검증됨 | ⏳ 예정 |
| **v0.1.0** | **Acceptance & Release** | 시안 비교·E2E·GPU FPS·브라우저별 확인·GitHub Pages 정적 배포·문서·최종 ZIP | 시각/기능/성능/배포의 모든 필수 게이트 통과 | ⏳ 목표 |

## 3. v0.0.120 — Hub Visual Rebuild (통합 작업 체크리스트)

- [x] 8개 Hub 공통 좌표계·내부 공간·깊이 순서 재설계: **외피 안에 3D 구조물 배치**
- [x] 반투명 구체 외피의 투과율·거칠기·Fresnel/림 라이트 조정, 내부 시설을 덮는 어두운 단색 면 제거
- [x] 내부 시설이 정면/측면에서 보이도록 불투명 본체·발광 포인트·금속 리브의 명암 대비 확보
- [x] Profile: 인물/신원 데이터 코어, Career: 수직 성장형 스카이라인, Projects: 모듈 조립 시설
- [ ] Portfolio: 디스플레이 갤러리, GitHub: 분기/병합 네트워크, Expertise: 방사형 지식/기술 코어
- [ ] Training: 교육/학습 상징 구조, Archive: 계층형 데이터 저장 시설
- [x] 전면 평면 엠블럼은 보조 요소로 축소하거나 제거하고 내부 시설을 주 시각 대상으로 설정
- [x] 토성형 링을 단일 기울어진 적도면의 얇은 다층 띠로 통일, 후면 가림과 전면 통과 깊이 처리
- [x] Hub 주변 위성·궤도·파편·보조 발광의 중복을 정리해 실루엣 가독성 확보
- [x] LOW/BALANCED/HIGH별 링·시설·위성의 LOD와 GPU 비용 정리, LOW에서 핵심 시설 보존
- [ ] TSX/TypeScript/소스 회귀 검사 실행 및 실제 브라우저 8개 Hub 캡처 비교

**수용 조건:** 코드 재구성 완료. 실제 브라우저 렌더링 비교는 미검증이므로 시각적 수용은 아직 보류. 8개 중 하나라도 구조물이 구체 밖에 떠 있거나, 구체 외피에 가려 내부 시설을 식별하기 어렵거나, 링이 도넛/수직 궤도로 보이면 완료 처리하지 않음.

## 4. v0.0.120 — Scene & Runtime Integration (통합 작업 체크리스트)

- [ ] 16:9 FHD 기준 8개 Hub가 화면 밖으로 잘리지 않도록 배치·카메라·Safe Zone 재조정
- [ ] 중앙 Core의 사건지평선·강착 원반·렌즈 효과 및 Hub→Core 플라즈마 흐름 시각 계층 조정
- [ ] 배경 성운/별과 전경 발광 입자·기하 파편의 밀도/밝기 분리, 피사체 대비 확보
- [ ] 좌측 탐색/하단 HUD/우측 ACTIVE CONTEXT/상단 상태 라벨의 표시·겹침·가독성 확인
- [ ] 8개 Hub 클릭과 메뉴 클릭이 동일한 선택 상태·링크/경로를 사용하도록 정리
- [ ] Hover/Focus/Click/Reset/키보드/모바일 터치 및 ACTIVE CONTEXT 동기화 검증
- [ ] AUTO/LOW/BALANCED/HIGH 변경 시 시각 요소·DPR·파티클·후처리 비용의 일관성 검증
- [ ] FHD/QHD/울트라와이드/모바일 화면 비율 및 HUD safe zone 검증
- [ ] GPU 리소스 dispose/instancing/geometry budget·렌더 루프 갱신량 최적화
- [ ] `npm run verify:all`, TypeScript 검사, `npm run build`를 실제 실행해 오류 수정

**수용 조건:** 정적 소스 검사 통과만으로 완료하지 않음. 프로덕션 빌드, 8개 Hub 실제 클릭, 화면 비율별 렌더링 증거가 필요.

## 5. v0.1.0 — Acceptance & Release (통합 작업 체크리스트)

- [ ] 공식 목표 시안과 실제 화면을 동일 화면 비율에서 나란히 비교해 8개 Hub·Core·고리·HUD 판정
- [ ] 전체 8개 Hub/메뉴 이동·ACTIVE CONTEXT·모달/외부 링크 E2E 확인
- [ ] 실제 장비(가능하면 GTX 660급)에서 LOW/BALANCED/HIGH FPS·프레임 타임 측정 및 허용 기준 확정
- [ ] 브라우저 콘솔/WebGL 오류, 장시간 실행, 품질 전환 후 메모리·렌더 리소스 확인
- [ ] GitHub Pages `basePath`, `assetPrefix`, static export, 직접 URL 진입/새로고침 검증
- [ ] 회사·고객사·리소스 식별자 비식별화 점검
- [ ] README·CHANGELOG·설계 결정·버전 이력·배포/롤백/테스트 가이드 정리
- [ ] 최종 전체 ZIP 하나 생성, ZIP 무결성·빌드 산출물·검증 결과 기록

**릴리스 차단 조건:** 목표 시안의 Hub 내부 가독성 불일치, Hub 탐색 장애, 프로덕션 빌드 실패, 정적 배포 실패가 있으면 v0.1.0 완료 선언 금지.

## 6. 완료 표기 원칙

- `[x]`는 실제 작업과 해당 검증 근거가 모두 있을 때만 사용한다.
- 소스 회귀 테스트는 **구조적 안전성**만 입증한다. 목표 시안과 일치하는 시각 품질을 증명하지 않는다.
- 시각 검수는 사용자 제공 스크린샷과 목표 시안을 기준으로 비교하며, 직접 렌더링하지 않은 결과를 검증 완료로 표시하지 않는다.
- 연관된 모델링/셰이딩/LOD/조명 수정은 같은 통합 버전에서 완료한다. 자잘한 수정으로 버전을 추가하지 않는다.
- 이력은 유지하되 현재 계획은 이 문서 최상단의 통합 계획을 우선한다.

---

# 과거 개발 이력 (아카이브)

> 아래는 이전 개발 과정의 기록입니다. 현재 계획과 완료 기준은 위의 **통합 로드맵**이 우선합니다. 이전 버전의 완료 표시는 코드 반영 당시의 상태이며 목표 시안의 시각적 승인이나 실제 브라우저 검증을 뜻하지 않습니다.

## v0.0.108 — 8개 Hub 디자인 통합 업데이트
- [x] Profile/Career/Projects/Portfolio/GitHub/Expertise/Training/Archive 개별 구조물 구현
- [x] Hub 공통 궤도 경사 조정, 8개 노드/클릭 구조 유지
- [x] LOW 단계에서 정점/장식 복잡도 절감
- [ ] 사용자 실행 화면 검수: 실루엣 구분, 클릭, FPS, WebGL 오류
- [ ] 필요시 사용자 피드백 기반 정거장 형태/재질 2차 개선

## v0.0.94 — Continuous sphere capture into event horizon
- [x] Continue each visible Hub sphere beyond the animated highway endpoint into a clockwise contracting capture spiral.
- [x] Blend highway tangent into the capture segment; eliminate the abrupt endpoint respawn.
- [x] Fade spheres as they cross the opaque event horizon, with depth testing enabled.
- [x] Add `npm run verify:capture` source checks and independent monotone-radius test.
- [ ] Production build and real-browser GPU visual acceptance remain outstanding.

---

## v0.0.93 — Visible Hub Infall Spheres
- [x] Large luminous colored spheres on all eight hub-to-core highway backbones.
- [x] Share `deformRiverPoint` with visible route geometry; add synchronized trailing lights.
- [x] Low/Balanced/High 2/3/4 spheres per hub, instanced meshes, gravity-dependent travel speed.
- [x] Add source-level regression check `verify-visible-infall`.
- [ ] Browser visual review: sphere visibility, path alignment and frame rate.
- [ ] Seamless final transition from backbone endpoint into event horizon.

---

## v0.0.91 — Lens ribbon visual fidelity pass
- [x] Replace line-like lensed far-side arcs with 3D mesh ribbons
- [x] Add GPU turbulence, feathered boundaries, asymmetric emission
- [x] Remove decorative black-hole containment rings/blocks
- [x] Add source-level fidelity regression test
- [ ] Complete Next.js production build
- [ ] Visually compare actual rendered scene against official target
- [ ] Benchmark LOW/BALANCED/HIGH on GTX 660-class hardware
- [ ] Decide final black-hole acceptance and user-run readiness

# AI Network Portfolio — Implementation Roadmap

> 목표: 레퍼런스 시안 수준의 고밀도·고품질 AI/Data Network 인터랙티브 포트폴리오 메인 화면.
>
> 버전 정책: `0.0.x` 누적 개발 → Production Ready 시 `0.0.100`.
>
> 관리 규칙: **0.0.1부터 모든 버전을 한 표에서 순차 관리한다.** 계획 변경/긴급 수정도 버전을 삭제하거나 덮어쓰지 않고 실제 수행 내용을 기록한다. 완료 표시는 기능 존재가 아니라 실제 구현 완료 기준이다.

## 전체 버전 이력 및 로드맵

| 상태 | 버전 | 실제 구현 / 계획 | 핵심 결과 및 변경 흔적 |
|---|---:|---|---|
| ✅ | 0.0.1 | Canvas Prototype | AI Core, 7 Main Node, 기본 연결선, HUD, 100dvh 기반 초기 화면 |
| ✅ | 0.0.2 | Scene Engine | Full viewport 좌표/레이어/애니메이션 기반 재설계 |
| ✅ | 0.0.3 | Particle Field | 다중 depth particle / cluster / local link 도입 |
| ✅ | 0.0.4 | Data Stream Engine | Multi-lane stream, packet, tail, arrival 효과 |
| ✅ | 0.0.5 | Topology / Anchor System | Node/Hit Area/Stream endpoint를 동일 topology anchor로 통합 |
| ✅ | 0.0.6 | WebGL Scene Foundation | 목표 품질 한계로 Canvas 중심 구조에서 Three.js/R3F WebGL 기반으로 전환. 원래 AI Core 2.0은 0.0.7로 이관 |
| ✅ | 0.0.7 | AI Core 2.0 / 3D Core | Particle Sphere, 다중 Orbit Ring, Pulse, Energy 구조 |
| ✅ | 0.0.8 | Node 2.0 / 3D Main Node | 영역별 3D Hub 구조와 Interaction 기반 추가 |
| ✅ | 0.0.9 | Spatial Data Stream | Stream Geometry 확장, 공간 곡률/3D 연결 구조 |
| ✅ | 0.0.10 | Hierarchical Network | Main → Sub → Micro topology 계층 확장 |
| ✅ | 0.0.11 | Environment / City Density | Hub 주변 Network ecosystem / infrastructure 밀도 추가 |
| ✅ | 0.0.12 | Camera / Depth + Guard I | Perspective/Depth/Camera 도입. 부하 확인으로 성능 최적화 조기 시작 |
| ✅ | 0.0.13 | Lighting / Bloom + Guard II | Lighting/Bloom 계층. 과노출/후처리 비용 보정 |
| ✅ | 0.0.14 | Regression Fix + Autonomous Motion + Guard III | White Scene 회귀 복구, 입력 없이 움직이는 Scene 적용 |
| ✅ | 0.0.15 | Layout Safe-Zone + Guard IV | 하단 HUD 가림 및 렌더 부하 긴급 대응 |
| ✅ | 0.0.16 | Proximity Interaction | Main Hub 접근 시 focus 및 Network 반응 |
| ✅ | 0.0.17 | Information Architecture + Projection Fix + Guard V | Screen-space hit 위치 보정, 정보 구조와 telemetry 도입 |
| ✅ | 0.0.18 | Information HUD + HUD 2.0 + Guard VI | Proximity 상세 패널 및 고밀도 HUD |
| ✅ | 0.0.19 | Navigation System + Guard VII | 7 Hub를 Portfolio route/navigation 대상으로 연결 |
| ✅ | 0.0.20 | Dynamic Stream Deformation + Guard VIII | Packet만 이동하던 구조 보완. Stream 줄기 자체가 변형되는 Flow Field 추가 |
| ✅ | 0.0.21 | Responsive Engine + Guard IX | FHD/QHD/4K/UltraWide/Laptop viewport profile |
| ✅ | 0.0.22 | Composition Rebalance + Stream Visual Pass II + Guard X | Main Network가 하단으로 처진 구도 보정, Stream 색/움직임 강화 |
| ✅ | 0.0.23 | Mobile Scene + Guard XI | Portrait/Landscape 전용 UI/topology 및 mobile render budget |
| ✅ | 0.0.24 | Performance / LOD II + Guard XII | AUTO/HIGH/BALANCED/LOW adaptive quality, DPR/particle/stream LOD |
| ✅ | 0.0.25 | Visual Polish + Content Integration + Guard XIII | Portfolio-safe data source, 색상/광량 계층, 콘텐츠 연결 기반 |
| ✅ | 0.0.26 | Visual Gap Audit I + Dynamic River + Guard XIV | 가장 밝은 River Backbone 자체를 동적 geometry로 전환 |
| ✅ | 0.0.27 | Visual Gap Audit II + Guard XV | River/Strand/Packet motion hierarchy 및 Micro Network instancing |
| ⚠️ | 0.0.28 | Global Orbital Topology 실험 | 7 Hub ecosystem 전체를 AI 중심으로 공전. 실제 화면에서 구도 붕괴/몰림 문제 확인 |
| ⚠️ | 0.0.29 | Independent Orbital Topology | Hub별 독립 궤도 적용. Icon만 이동하고 Local Network가 남는 binding 문제 확인 |
| ⚠️ | 0.0.30 | Orbital Ecosystem Binding / Dynamic Reflow | Hub + Local ecosystem을 함께 이동하도록 수정. River endpoint도 live anchor 추적 |
| ⚠️ | 0.0.31 | Dynamic-Only Network / No Static World | 정적 Network 제거, variable orbit, collision guard. 대규모 중앙 공전 자체가 Portfolio 구도를 불안정하게 함을 확인 |
| ✅ | 0.0.32 | Local Orbital Motion + Dynamic Ambient Field | AI 중심 대규모 공전 폐기. 각 Hub가 자기 기준 자리 주변에서 국소 공전. 동적 배경 field 추가 |
| ✅ | 0.0.33 | Visual Quality Pass II / Hub System 2.0 | Hub Energy Shell, Wireframe, Multi Ring, Local Spark/Satellite 계층. 구버전 UI metadata 잔존 문제 발견 |
| ✅ | 0.0.34 | Dynamic Environment 2.0 + Local Moon System + Guard XIX | 버전 단일 소스화. 7 Hub 각각 3개 Local Moon, Distant Orbital Colony, 배경 밀도 확장 |
| ✅ | **0.0.35** | **Energy River 3.0 + Roadmap Rebase + Guard XX** | Roadmap을 0.0.1부터 실제 순서로 재작성. River를 Halo/Body/White-hot Core 3계층으로 강화하고 각 계층이 서로 다른 위상으로 동적 변형 |
| ✅ | **0.0.36** | **Core & Hub Material Pass + Guard XXI** | Core corona/shell 재질 강화, Hub clearcoat/emissive shell, orbital station 구조물, ring/spark 계층 강화 |
| ✅ | **0.0.37** | **Composition & Depth Pass + Guard XXII** | Fore/Mid/Deep depth band, foreground parallax object, mid relay field, Core focal hierarchy 및 fog/depth 재조정 |
| ✅ | **0.0.38** | **Performance Optimization II + Guard XXIII** | River/Packet/Ambient/Relay의 update budget을 품질 Tier와 연결하고 Dynamic River sample budget을 단계화. 시각 계층은 유지하면서 CPU-side geometry/transform 갱신 비용 절감 |
| ✅ | **0.0.39** | **Visual Gap Audit III + Guard XXIV** | 목표 시안 대비 River 존재감·배경 음영 밀도·Depth hierarchy를 최종 보정. Energy Knot / moving Halo Arc 추가, 기존 Dynamic-only 원칙 유지 |
| 🟡 | **0.0.40** | **Production Validation I + Guard XXV** | Source/version/static-export/basePath 정합성 검증 완료. 실제 캡처 검수에서 시각 계층/노이즈/위성 식별성/River 재질 보정 필요 확인 |
| ✅ | **0.0.41** | **Visual Hierarchy Cleanup + Guard XXVI** | 실제 0.0.40 캡처 기준 배경 파편 밀도/명도 정리, Foreground/Relay 감쇠, Moon 식별성 강화, Hub shell 노이즈 완화, River white-core 비중 축소 |
| ✅ | **0.0.42** | **AI Core Detail 3.0 + Guard XXVII** | Core Heart/Lattice/Arc Band/다층 Shell/Corona/Glow를 정교화하고 중앙 AI의 focal hierarchy 강화 |
| ✅ | **0.0.43** | **Hub Identity Pass I + Guard XXVIII** | Azure / Projects / Fabric / Data에 서로 다른 구조 언어를 적용: Azure orbital cloud cradle, Projects modular cube cluster, Fabric ribbon pillars, Data stacked storage rings |
| ✅ | **0.0.44** | **Hub Identity Pass II + Guard XXIX** | AKS control-plane wheel, AI Study open-book/neural nucleus, Expertise knowledge nexus를 추가하고 7 Hub의 공통 shell/ring/moon 언어는 유지 |
| ✅ | **0.0.45** | **Moon & Satellite System 2.0 + Guard XXX** | Hub별 Moon/위성 실루엣·크기·재질·궤도·Trail·종류 차별화, eccentric local orbit 적용 |
| ✅ | **0.0.46** | **Energy River 4.0 + Runtime Stability** | 회색 케이블 인상 제거, 투명 Energy Body/컬러 Core/Strand/Packet/Knot 정교화 |
| ✅ | **0.0.47** | **Micro Network Detail** | Local Node/Relay/데이터 이동 관계를 의미 있는 작은 시스템으로 정리 |
| ✅ | **0.0.48** | **Particle & Energy FX Polish + Guard XXXII** | River 이동 광원을 Aura/Glow/White-hot Core/Comet Trail 4계층으로 강화하고 Primary Pulse와 기존 Secondary Packet을 역할 분리. 확대 화면에서도 에너지 흐름이 식별되도록 개선 |
| ✅ | **0.0.49** | **Depth & Lighting 2.0 + Guard XXXIII** | Key/Rim/Core/Deep 조명 분리, Fore/Mid/Deep 명도·Fog·Bloom 계층 재조정 |
| ✅ | **0.0.50** | **HUD Detail Pass** | HUD/Telemetry/Panel/Border를 3D world와 동일한 디자인 시스템으로 정리 |
| ✅ | **0.0.51** | **Typography & Label Pass** | Core/Hub title/subtitle의 거리별 가독성과 typography hierarchy 개선 |
| ✅ | **0.0.52** | **Motion Choreography** | Orbit/Rotation/Pulse 속도와 위상 재조정, 기계적 동기화 제거 |
| ✅ | **0.0.53** | **Interaction Detail 2.0** | Hover/Proximity/Click에 Hub/Moon/River/HUD Local Ecosystem 연동 |
| ✅ | **0.0.54** | **Composition Fine Tuning** | 7 Hub 위치/크기/간격/River 곡률/Core 비율을 실제 캡처 기준 미세 조정 |
| ✅ | **0.0.55** | **Responsive Detail Pass** | Mobile portrait/landscape 카메라 거리·씬 스케일·HUD safe-zone·작은 화면 터치 영역 및 laptop 배율 보정. 실기기 검증은 별도 필요 |
| ⏳ | **0.0.56** | **Performance Polish III** | Detail Pass 비용 회수. Instancing/LOD/update budget 최종 조정 |
| ✅ | **0.0.57** | **Navigation Architecture Correction** | GitBlog 8개 메뉴와 Hub 일치, 공식 목표 이미지 기준 확정 |
| ✅ | **0.0.58** | **GitBlog Navigation Integration** | 가짜 hash 제거, 외부 GitBlog URL 설정 지원 |
| ✅ | **0.0.59** | **Hub Ordinal & Key Stability** | 01–08 라벨 및 LocalTopology 중복 key 수정 |
| ✅ | **0.0.60** | **Orbital Station Architecture I** | 기본 플랫폼·회전 링·메뉴별 엠블럼 |
| ✅ | **0.0.61** | **Orbital Relay Satellite** | 허공의 마름모를 통신 중계 위성으로 교체 |
| ✅ | **0.0.62** | **Station Silhouette Cleanup** | 릴레이 육각형 프레임·금속 리브·시각적 노이즈 감소 |
| ✅ | **0.0.63** | **Energy River Material Detail** | 네 번째 에너지 필라멘트 및 색상 대비 조정 |
| ✅ | **0.0.64** | **Hub Architecture Detail III / Screenshot Response** | 8개 도킹 실루엣, Relay 확대, 파편 감소, Webpack 기본 설정; 실측 FPS 미검증 |
| ✅ | **0.0.65** | **Performance & Background Infrastructure** | 사용자 캡처의 14 FPS 진단, 품질 단계별 비용/배경 인프라 최적화 |
| ✅ | **0.0.66** | **Cinematic Lighting & FX** | 에너지 발광 계층, 정거장 입체 조명 개선 |
| ⏳ | **0.0.67** | **HUD & Interaction Integration** | 3D/레이블 충돌 및 실제 링크 검증 |
| ⏳ | **0.0.68** | **Visual Gap Audit & Correction** | 목표 이미지와 브라우저 캡처 정밀 비교 |
| ⏳ | **0.0.69** | **Runtime & Performance Validation** | 실제 브라우저 FPS·메모리·화면 크기 검증 |
| ⏳ | **0.0.70** | **GitHub Pages Deployment Validation** | static export 및 경로 검증 |
| 🎯 | **0.0.100** | **Production Release** | Detail/Validation 완료 후 실제 Portfolio 메인으로 승격 |

## 이전 버전 — v0.0.39

- [x] Visual Gap Audit III: Core / Hub / River / Moon / Background / HUD / Depth 재검수
- [x] Energy River에 저비용 Dynamic Energy Knot 계층 추가 — 굵은 River 내부의 흐름 가독성 강화
- [x] 빈 공간에 움직이는 Ambient Halo Arc 추가 — 정적 장식 없이 Mid/Deep depth 밀도 보강
- [x] Halo / Body / White-hot Core / Strand / Packet / Energy Knot의 River motion hierarchy 유지
- [x] 7 Hub Local Orbit + Hub당 3 Moon + Dynamic Ambient / Relay / Colony / Foreground 누적 유지
- [x] `STATIC WORLD = 0` 원칙 유지
- [x] AUTO/HIGH/BALANCED/LOW 품질 Tier에 신규 효과 개수/update budget 연동
- [x] Performance Guard XXIV 적용
- [ ] 실제 FHD/QHD/4K 브라우저 FPS 및 목표 시안 체감 비교 — 사용자 환경 최종 확인 필요

## 이전 검증 기준 — v0.0.40 Production Validation I

- [x] 실제 브라우저 캡처 확보 및 Detail Phase 기준점 고정
- [x] 주요 문제 확인: 배경 파편 과밀, Hub/배경 명도 경쟁, Moon 식별성 부족, River white/gray cable 인상
- [x] 0.0.100 즉시 승격 중단 및 Detail Polish Roadmap 0.0.41~0.0.59 확정

## 이전 버전 — v0.0.41 Visual Hierarchy Cleanup

- [x] 실제 0.0.40 캡처 기준 배경 노이즈와 Hub 경쟁 명도 정리
- [x] Moon 식별성 강화 및 River white-core 비중 축소
- [x] Detail Polish Phase 진입

## 이전 버전 — v0.0.42 AI Core Detail 3.0

- [x] Energy Heart / Energy Lattice / Arc Band / 다층 Shell / Corona 정교화
- [x] 중앙 AI를 최상위 focal object로 강화

## 이전 버전 — v0.0.43 Hub Identity Pass I

- [x] Azure — orbital cloud cradle / arc 구조
- [x] Projects — modular cube cluster / dual ring 구조
- [x] Fabric — ribbon pillar 구조
- [x] Data — stacked storage ring / data port 구조
- [x] 공통 Hub shell / Local Orbit / Moon / Micro Network 유지

## 이전 버전 — v0.0.44 Hub Identity Pass II

- [x] AKS — 6개 workload cell이 scheduler core를 둘러싼 control-plane wheel 실루엣
- [x] AI Study — paired knowledge panel + neural nucleus의 open-book 학습 구조
- [x] Expertise — 6개 specialist facet이 중앙 knowledge nexus에 연결되는 구조
- [x] 7 Hub 모두 서로 다른 내부 실루엣 확보
- [x] 공통 Shell / Ring / Local Orbit / Moon을 유지해 동일 세계관의 디자인 언어 보존
- [x] `STATIC WORLD = 0`, Dynamic River, Autonomous Motion 유지
- [x] Version source/package/Roadmap `0.0.44` 정합화
- [ ] 실제 브라우저 캡처에서 글자를 가려도 7 Hub가 시각적으로 구분되는지 확인

## 다음 단계

- **0.0.45 — Moon & Satellite System 2.0**: 현재 공통형 3 Moon을 Hub별 고유 위성군으로 발전시키고 크기·재질·궤도·Trail을 차별화한다.
- 이후 0.0.46~0.0.59는 위 순차 표를 변경 이력과 함께 그대로 누적한다.
- Detail 단계에서는 오브젝트 수 증가만으로 완료 처리하지 않는다. 실제 캡처에서 개선이 확인되어야 완료다.

## 품질 운영 원칙

1. `0.0.34~0.0.39`는 버전 증가 자체를 품질 향상으로 간주하지 않는다. 실제 브라우저 렌더가 목표 시안에 가까워져야 완료다.
2. Scene 내부의 의미 있는 오브젝트는 정지 이미지로 남기지 않는다. HUD/Sidebar 같은 screen-space UI만 고정 가능하다.
3. `AI Core → Energy River → Main Hub → Local Moon/Sub Node → Ambient Field`의 시각 계층을 유지한다.
4. Particle 수만 늘려 밀도를 만들지 않는다. 전경/중경/후경과 의미 있는 topology로 밀도를 만든다.
5. Stream은 Packet만 움직이는 선이 아니라 geometry 자체가 지속적으로 변형되어야 한다.
6. 7 Hub는 자기 기준 위치를 유지하는 Local Orbit을 사용한다. 대규모 AI 중심 공전은 사용하지 않는다.
7. `100dvh`, No Scroll, Autonomous Motion, Proximity Navigation을 유지한다.
8. 품질 상승으로 성능 회귀가 발생하면 다음 기능보다 Performance Guard를 우선하되 로드맵 이력을 삭제하지 않는다.

## Definition of Done — v0.0.100

- [ ] 목표 레퍼런스 수준의 시각적 밀도/깊이/재질감
- [ ] AI Core / River / 7 Hub / Local Moon / Ambient의 명확한 계층
- [ ] 모든 Stream과 Hub가 live topology anchor로 구조적으로 결합
- [ ] Autonomous Motion / Dynamic-only Scene
- [ ] Proximity 기반 탐색/정보 표시
- [ ] Portfolio Navigation 실사용
- [ ] FHD/QHD/4K/UltraWide 대응
- [ ] Mobile Scene
- [ ] Adaptive Performance
- [ ] GitHub Pages Static Export 검증
- [ ] Production 안정성 검증


## 이전 버전 — v0.0.46 Energy River 4.0 + Runtime Stability

- [x] 7 Hub 각각 3개의 local satellite 유지
- [x] Hub별 satellite family 실루엣 차별화
- [x] 위성별 radius / speed / direction / inclination / phase / eccentricity 분리
- [x] Local orbit trail 추가
- [x] 배경 shard와 Moon의 시각적 역할 분리
- [x] Version source / package / Roadmap `0.0.45` 정합화
- [x] 0.0.46 Runtime crash guard + Energy River 4.0
- [x] 0.0.47에서 Micro Network Detail로 진행


### 0.0.46 Runtime regression fix
- 0.0.43에서 실제 브라우저 실행 중 `DistantOrbitalColonies.useFrame`의 `cfg[i]`가 undefined가 되는 오류가 확인되었다.
- 원인: Adaptive Quality로 `count`가 감소한 뒤 `groups.current`에 이전 ref가 남아 `cfg` 길이보다 많은 인덱스를 순회했다.
- 조치: variable-count ref loop에 bounds guard를 추가하고 unmount 시 stale ref를 제거한다.
- Build/TypeScript 성공과 runtime frame-loop 검증을 별도 검증 항목으로 관리한다.


## 이전 버전 — v0.0.47 Micro Network Detail

- [x] Local topology sub-node에 relay beacon ring 추가
- [x] Sub-node → micro-node edge에 움직이는 data pulse 추가
- [x] Hub별 tone을 그대로 사용해 local ecosystem identity 유지
- [x] InstancedMesh 1개/Hub 구조로 draw/update 비용 억제
- [x] Micro traffic update budget 30Hz 적용
- [x] 0.0.46 runtime stale-ref guard 유지
- [x] Version source / package / Roadmap `0.0.47` 정합화
- [ ] 실제 브라우저에서 micro traffic 식별성과 FPS 확인

## 이전 버전 — v0.0.48 Particle & Energy FX Polish

- [x] 실제 확대 캡처에서 확인된 River 이동 광원 약화 문제를 기준점으로 수정
- [x] Primary Energy Pulse를 Wide Aura → Colored Glow → White-hot Core 3계층으로 구성
- [x] Pulse 진행 방향을 따르는 Comet Trail 추가
- [x] Hub tone을 Pulse Aura/Glow/Trail에 반영
- [x] Primary Pulse와 기존 Secondary Packet / Energy Knot 역할 분리
- [x] HIGH/BALANCED/LOW별 Pulse 수와 update budget 적용
- [x] 기존 0.0.46 runtime stale-ref guard 유지
- [x] Version source / package / Roadmap `0.0.48` 정합화
- [ ] 실제 브라우저 확대 화면에서 Pulse 식별성 및 FPS 확인

## 이전 버전 — v0.0.49 Depth & Lighting 2.0

- [x] Key / Rim / Core / Deep fill 조명을 역할별로 분리
- [x] Ambient light 감소로 Core/Hub emissive hierarchy 강화
- [x] Foreground silhouette 명도/opacity 감쇠
- [x] Mid-depth Relay halo/명도 감쇠
- [x] Distant Colony emissive/ring/satellite 감쇠
- [x] Fog near/far 재조정으로 depth band 분리
- [x] Bloom threshold/smoothing 재조정으로 white clipping 완화
- [x] 0.0.46 runtime guard 및 0.0.48 Energy Pulse 유지
- [x] Version source / package / Roadmap `0.0.49` 정합화
- [ ] 실제 브라우저에서 Fore/Mid/Deep 분리감 및 FPS 확인

## 현재 버전 — v0.0.54 Composition Fine Tuning

- [x] Sidebar / Bottom HUD / Info Panel을 동일한 clipped-glass HUD 언어로 통합
- [x] HUD panel corner accent / telemetry line / grid hierarchy 추가
- [x] System Status FPS ring 내부 detail 및 상태 텍스트 대비 개선
- [x] Data Flow waveform grid / baseline / glow detail 개선
- [x] Network Activity bar와 metric hierarchy 개선
- [x] Active Context path indicator 및 정보 계층 강화
- [x] Hub label letter-spacing / subtitle readability 미세 조정
- [x] Mobile/Reduced Motion 기존 동작 유지
- [x] 0.0.46 runtime guard / 0.0.48 Energy Pulse / 0.0.49 Depth Lighting 유지
- [x] Version source / package / Roadmap `0.0.53` 정합화
- [ ] 실제 브라우저에서 FHD/QHD HUD 가독성 및 3D 가림 여부 확인

### 다음 단계

- **0.0.51 — Typography & Label Pass**: AI/Hub/Subtitle/Telemetry의 거리별 가독성과 hierarchy를 세밀하게 조정한다.


## v0.0.52 Preliminary Target Gap Audit

비교 기준: 초기 목표 시안(고밀도 cinematic AI network dashboard)과 0.0.40 실제 브라우저 캡처, 이후 0.0.41~0.0.52 누적 변경.

- Composition / topology: 약 80~85% 도달. 중앙 AI + 7 Hub + 방사형 River 구조는 목표와 같은 문법에 진입.
- Object detail: 약 65~70%. Hub identity는 분리됐지만 목표 시안의 건축물/장치 수준 micro-detail은 아직 부족.
- Energy River: 약 65~70%. 다층 Pulse/Trail은 개선됐으나 목표의 braided luminous river와 volumetric light density에는 미달.
- Background world density: 약 60~65%. 동적 객체는 많지만 목표처럼 의미 있는 infrastructure/network architecture로 읽히는 비율이 낮음.
- Lighting / cinematic depth: 약 70~75%. depth 계층은 생겼으나 목표의 강한 bloom contrast, local illumination, atmospheric scattering이 부족.
- HUD / information density: 약 65~70%. 디자인 언어는 맞지만 목표의 실제 dashboard 수준 정보량/정돈도는 아직 부족.
- Motion / interaction: 약 75~80%. autonomous/local motion은 충분하지만 interaction choreography는 0.0.53에서 추가 개선 필요.

### 추가 Detail Pass 필요성
현재 상태에서 0.0.59 이후 바로 0.0.100으로 승격하지 않는다. Visual Gap Audit IV 결과에 따라 아래 보강 버전을 공식 후보로 추가한다.

| 상태 | 버전 | 단계 | 목적 |
|---|---:|---|---|
| ⏳ | **0.0.60** | **Hub Architecture Detail 3.0** | 7 Hub를 단순 glyph/shell에서 miniature infrastructure/station 수준으로 강화 |
| ⏳ | **0.0.61** | **Energy River Material 4.1** | braided filament, local illumination, volumetric aura, pulse wake 정교화 |
| ⏳ | **0.0.62** | **World Infrastructure Pass** | 랜덤 파편 비중을 줄이고 relay tower/data beacon/orbital structure 등 의미 있는 배경 구조 강화 |
| ⏳ | **0.0.63** | **Cinematic FX & Lighting 3.0** | local bloom hierarchy, atmospheric scattering, focal glow, depth sparkle 정교화 |
| ↪ | **0.0.64** | **Legacy plan (superseded): HUD Information Density 2.0** | 목표 시안 수준의 dashboard 정보 밀도와 visual rhythm 보강 |
| ↪ | **0.0.65** | **Legacy plan (superseded): Production Validation III** | 추가 Detail Pass 이후 최종 build/runtime/resolution/performance 검증 |
| 🎯 | **0.0.100** | **Production Release** | 실제 시각 품질과 검증을 모두 통과했을 때만 승격 |


## v0.0.53 Interaction Detail 2.0 — 구현 기록
- Focus Hub의 Local Ecosystem에 2개의 회전하는 Energy Focus Ring과 광학 Aura를 추가.
- 선택 상태 진입/해제 시 매 프레임 damping으로 크기가 부드럽게 변화하며 정지된 오브젝트를 추가하지 않음.
- 기존 Moon/Local Topology/River의 activeId 연동 및 HUD Context 유지.
- 남은 과제: River의 국소 광량 변화와 Moon 반응의 개별 애니메이션은 실브라우저 시각 검증 후 후속 개선.
- 검증 상태: 정적 소스 검증 수행; 브라우저 hover/click/성능 실측은 별도 필요.


## v0.0.54 Composition Fine Tuning — 구현 기록

- 기존 0.0.1~0.0.53 이력 보존. 0.0.54 항목 완료 표시.
- 실제 v0.0.40 캡처에서 확인된 중앙 AI/Study 간격과 좌측 Hub 군집, 우측 상하 간격을 기준으로 7개 Hub 앵커를 소폭 재배치.
- Hub 앵커를 사용하는 Local Orbit, River endpoint, ProjectionBridge가 같은 위치 기준을 공유하도록 기존 구조 유지.
- 중앙 Core scale 1.07 → 1.045, scene vertical offset 0.62 → 0.56으로 화면 내 시각적 간섭 완화.
- 실제 FHD/QHD/모바일 브라우저 검증은 미완료이며 다음 0.0.55에서 확인 필요.


## v0.0.55 Responsive Detail Pass — 구현 기록
- 기존 0.0.1~0.0.54 버전 이력 보존. viewport profile별 CameraRig와 3D projection/scene scale을 같은 값으로 동기화.
- Portrait/Landscape는 카메라 거리를 늘리고 장면 스케일을 낮춰 중심 객체 과밀을 완화. Laptop은 scene scale 0.93 적용.
- 좁은 화면의 HUD safe-zone, 짧은 landscape 높이, 380px 이하 nav/label을 별도 보정.
- 실제 FHD/QHD/4K/21:9/모바일 장치 캡처 및 FPS 실측은 아직 수행하지 않았으므로 검증 완료로 간주하지 않음.


## v0.0.56 Performance Polish III — 구현 기록
- 0.0.1~0.0.55 기존 기록 보존. DynamicRiver의 sampleCount별 typed array/index memo 의존성 수정(품질 단계 변경 시 버퍼 길이 일치).
- DynamicRiver ribbon 정점 계산에서 샘플당 Vector3 clone 2회와 normal 생성 1회를 제거하고 scratch normal 및 좌표 직접 대입으로 임시 객체 할당 감소.
- DynamicStarfield는 HIGH 30Hz / BALANCED 22Hz / LOW 14Hz로 업데이트 빈도 제한. 자율 움직임은 유지하며 프레임별 CPU/버퍼 업로드 부담을 줄이는 목적.
- 기존 InstancedMesh, 동적 River, Moon, Hub Identity 및 시각적 효과 유지.
- 검증 범위: 정적 버전 검사/ZIP 무결성. 실제 GPU/CPU/FPS 및 시각적 동등성은 브라우저 실측 전까지 미검증.
- 다음: 0.0.57 Visual Gap Audit IV.

## Visual target baseline (2026-10-08, documentation amendment)

- Official reference image: `docs/visual-reference/official-visual-target.png`.
- Mandatory comparison log: `docs/visual-reference/VISUAL_GAP_AUDIT.md`.
- Future versions must compare actual browser captures against the image and record both progress and regressions.
- **No code or version bump in this documentation amendment**; v0.0.56 remains the implementation baseline.


## v0.0.57 — Navigation Architecture Correction / Visual Gap Audit IV

- Corrected 7 technical-domain hubs to the 8 GitBlog menu hubs: Profile, Career, Projects, Portfolio, GitHub, Expertise, Training, Archive.
- Sidebar, overlay metadata, 3D anchor array and orbit map now share the same eight identities.
- The previously generated reference image was replaced with the corrected 8-hub official target.
- Existing historical roadmap entries retained.
- Still pending: verified live GitBlog URL mapping, real browser visual comparison, WebGL runtime/quality-switch tests.
- Next: v0.0.58 interaction and navigation route integration, then visual detail passes.


## 0.0.58 — GitBlog Navigation Integration (2026-10-08)
- Eight primary GitBlog hubs retained; hub/sidebar/detail panel share `portfolioHubs`.
- Removed fake `history.pushState` hash navigation that suggested nonexistent in-app routes.
- Added optional external GitBlog URL configuration and disabled link when unconfigured.
- Pending: verify actual GitBlog section URLs and run browser interaction/responsive tests.
- This version does not claim cinematic visual parity or full end-to-end validation.


## v0.0.59 — Hub Ordinal & Key Stability (2026-10-08)
- [x] React duplicate key warning in `LocalTopology`: repeated `PORTFOLIO` labels were used as sibling keys. Replaced with stable per-hub indexed keys (`${n.id}-topology-${i}`).
- [x] Display 01–08 on 3D hub labels, selected information heading and active context. Sidebar numbering retained.
- [x] Maintain the eight GitBlog hubs and the prior visual target.
- [ ] Browser runtime and screenshot regression test required; static validation is not a substitute.


## v0.0.60 — Orbital Station Architecture I (2026-10-08)

- Preserved all prior version history and eight GitBlog navigation hubs.
- Replaced legacy domain-specific inner hub glyphs with eight GitBlog-specific 3D emblems.
- Added layered metallic docking platforms, animated segmented luminous rings, antenna arrays and individual station rotors to each hub.
- Reduced opaque wireframe shell visual dominance; local moon, energy river, topology, motion and HUD remain.
- Official visual target remains `docs/visual-reference/official-visual-target.png`. This is an incremental visual convergence, not visual parity.
- Validation: source validator / ZIP integrity; browser FPS and rendering require local inspection.


## v0.0.61 — Orbital Station Architecture II / Orbital Relay Satellite
- Replaced the unexplained diamond-shaped silhouette with an identifiable animated relay: metallic frame, illuminated core, antennas, beacon and orbital loop.
- One relay per GitBlog hub (8 total), with independent local movement and hub-specific colors.
- Preserved prior roadmap history and the official visual reference.
- Runtime browser and FPS verification remain pending; source-level validation is not visual validation.


## v0.0.62 — Orbital Station Detail & Silhouette Cleanup (2026-10-08)
- [x] Replaced the former tilted square relay outline with a distinct six-sided mechanical communication relay.
- [x] Added six illuminated relay fins and eight station hull ribs with light strips.
- [x] Offset relay from hub shell to improve readability and avoid overlap with moon orbits.
- [x] Reduced visually noisy shell wireframe and local topology octahedrons.
- [x] Kept the official visual target and full historical roadmap; no redesign of navigation.
- [ ] Actual browser screenshots, FPS, and interactive runtime verification still required.


## v0.0.63 — Energy River & Station Material Detail (2026-10-08)
- [x] Added an independently phase-shifted fourth hot filament layer to each live River backbone.
- [x] Changed formerly white backbone lanes to hub-color-biased strands; adjusted strand widths and opacity.
- [x] Raised moving core contrast without increasing the number of WebGL objects per river beyond one extra ribbon.
- [x] Retained 8 GitBlog hubs, satellite stations, local orbits and official target image.
- [ ] Metallic station material pass and actual browser visual/FPS measurements remain pending; version title represents the planned combined focus, not full parity.

## v0.0.64 — Hub Architecture Detail III / Screenshot Response (2026-10-08)

- [x] User screenshot v0.0.63 reviewed: 8 hubs visible, gray river persists, satellite too icon-like, excessive debris and overlapping labels, HUD shows 14 FPS.
- [x] Station chassis revised to low-poly metallic dock with eight menu-specific arm counts/lengths and additional structure groups; do not claim full cinematic parity.
- [x] Relay size increased and offset; reduced local wireframe dominance, sparkles, and duplicate station struts.
- [x] Set `dev` and `build` to Webpack (`--webpack`) to work around reported Turbopack internal panic; this does not prove the original bug fixed.
- [x] Preserve official target and full version history; reconcile stale roadmap rows for 0.0.57–0.0.59.
- [ ] Measure real FPS on user machine and inspect latest screenshot for label occlusion, relay visibility, visual regressions and performance; 14 FPS is a screenshot observation, not a benchmark.
- [ ] Confirm production build, real GitBlog route targets, and browser behavior before 0.0.100.


## v0.0.65 — Performance & Background Optimization (2026-10-08)

- [x] Make LOW quality a meaningful render-budget tier: omit Bloom/Vignette, distant decorative fields, local hub topology and micro traffic while retaining the eight GitBlog hubs, AI core, satellites, rivers and navigation.
- [x] Reduce secondary river strands on BALANCED/LOW; preserve primary 8 river backbones and pulse trains.
- [x] Reduce core and hub sparkles, throttle projected label updates, and accelerate sustained-low-FPS AUTO fallback.
- [x] Keep Webpack dev/build workaround for Turbopack panic.
- [ ] Compare actual FPS, draw calls and triangles on the same computer in AUTO, BALANCED and LOW; screenshot from v0.0.63 showed 14 FPS, not an independently verified benchmark.
- [ ] v0.0.66: cinematic lighting without undoing LOW tier savings.
- [ ] v0.0.67: labels, interaction and HUD alignment.
- [ ] v0.0.68: side-by-side official visual target audit.
- [ ] v0.0.69: browser and responsive regression test.
- [ ] v0.0.70: GitHub Pages export and navigation validation.
- [ ] v0.0.100: first release after runtime acceptance.

## v0.0.66 — Cinematic Lighting & FX (2026-10-08)

- [x] Quality-aware key, rim and depth light hierarchy with metallic station readability in mind.
- [x] LOW removes both optional dynamic point lights; BALANCED uses one, HIGH uses two.
- [x] Raise bloom luminance threshold, lower bloom smoothing and vignette darkness to reduce overexposed haze.
- [x] Preserve eight GitBlog hubs, relay satellites, motion, energy rivers, Webpack fallback, official target image and previous roadmap.
- [ ] Measure real FPS / calls / triangles and capture HIGH, BALANCED, LOW screenshots on target Windows PC.
- [ ] v0.0.67: HUD/labels and interaction; v0.0.68: target-image comparison; v0.0.69: runtime acceptance; v0.0.70: deployment.


## v0.0.67 — HUD, Hub Labels & Interaction (2026-10-08)
- [x] Improve readability of 8 projected labels using centered translucent contrast-backed overlays, larger subtitles and focused outlines.
- [x] Remove the leftover CSS `hub:before` diamond decoration that was unrelated to the actual 3D Orbital Relay.
- [x] Pin selection when a hub or sidebar item is clicked, synchronize selected navigation styling, and provide an explicit close control.
- [x] Allow the detail panel to scroll rather than silently clipping domain and evidence rows.
- [x] Preserve eight GitBlog menus, 3D world, quality modes, Webpack fallback and official visual target.
- [ ] Run full Next.js production build and interactive browser regression; not confirmed in this packaging environment.
- [ ] v0.0.68: compare screenshot with official target and prioritize remaining visual differences.
- [ ] v0.0.69: browser and FPS acceptance tests.
- [ ] v0.0.70: GitHub Pages static export and verified real navigation routes.


## v0.0.68 — Official Visual Gap Audit & Correction I (2026-10-08)
- [x] Preserve the eight-menu GitBlog navigation and all previously implemented structures.
- [x] Correct the Portfolio emblem's remaining stacked 45-degree wireframe diamonds: replace with solid metallic content panels and thin lit header rails. This is distinct from the CSS pseudo-element removed in v0.0.67.
- [x] Rebalance Energy River materials: reduce wide body opacity and thickness; emphasize narrow hub-colored core and offset filament; reduce whitening of the core.
- [x] Preserve LOW quality performance tier and Webpack fallback.
- [x] Preserve `docs/visual-reference/official-visual-target.png` and append gap-audit record.
- [ ] Real side-by-side screenshot comparison: target image is available but no v0.0.68 browser capture has been produced in this environment. Do not mark parity as complete.
- [ ] v0.0.69: browser acceptance, FPS and responsive validation (including 14 FPS regression).
- [ ] v0.0.70: GitHub Pages static export and actual URL validation.
- [ ] v0.0.100: release only after validated acceptance.


## v0.0.69 — Runtime Acceptance Instrumentation (2026-10-08)
- [x] Add 20-second local FPS, p95 frame-time, draw-call and triangle sampling inside PERF panel.
- [x] Provide JSON report copy for reproducible comparison between HIGH, BALANCED and LOW.
- [x] Cancel active measurement when the selected quality mode changes to avoid mixed manual-tier results.
- [x] Document repeatable desktop/mobile viewport, navigation, console-error and visual-target acceptance steps.
- [x] Preserve original 0.0.1–0.0.68 roadmap and official target image.
- [ ] Run actual Windows browser 20-second captures for each tier; 14 FPS regression unresolved until measured.
- [ ] Verify successful Next.js Webpack build and all eight interactive destinations.
- [ ] v0.0.70: GitHub Pages export, routing and live navigation verification.
- [ ] v0.0.100: release only after runtime acceptance and visual parity review.


## v0.0.70 — Visual fidelity and HUD reconstruction (2026-10-08)
- [x] Compare v0.0.69 screenshots with packaged official visual target.
- [x] Replace blocking hub cards with compact labels above station silhouettes.
- [x] Move node details to right-side drawer; show only after explicit selection.
- [x] Rebuild bottom HUD as four functional sections (real-time metrics, network traffic, render resource, active context).
- [x] Use observed WebGL FPS/frame/calls/triangles/geometry/texture data, not invented CPU/GPU readings.
- [ ] Local browser screenshot acceptance (user environment).
- [ ] Webpack production build and FPS improvement confirmation.
- [ ] Future: v0.0.71 GPU/CPU profiling, v0.0.72 rivers, v0.0.73 station silhouette, v0.0.74 environment, v0.0.75 visual gap audit, v0.0.76 validation, v0.0.77 GitHub Pages deployment, v0.0.100 release.


## v0.0.71 — Hub identity and HUD collision fix (2026-10-08)
- [x] Replace generic front-of-hub emblems with eight unique 3D geometric symbols: person, career tower, modules, portfolio layers, git branches, neural nodes, graduation cap, archive cabinet.
- [x] Fix REAL-TIME METRICS collision: legacy `.hudStatus` two-column grid was conflicting with new four-ring layout.
- [x] Keep the official reference image, all historical roadmap entries and eight-menu information architecture.
- [ ] Windows browser and Webpack production build validation required.
- [ ] Next: v0.0.72 energy rivers; v0.0.73 materials; v0.0.74 performance; v0.0.75 visual gap; v0.0.76 acceptance; v0.0.77 Pages deployment.


## v0.0.72 — Performance Foundation & Luminous Rivers (2026-10-08)
- [x] Replaced repeated 24-per-hub peripheral infrastructure meshes with a single InstancedMesh per hub (HIGH/BALANCED).
- [x] LOW quality avoids all OrbitalEcosystem peripheral infrastructure and 8 per-hub point lights.
- [x] LOW quality omits the secondary DynamicStreamField and RiverEnergyKnots while preserving 8 main DynamicRiver backbones and RiverPulseTrain.
- [x] Reduced secondary dynamic highway sampling in BALANCED/HIGH.
- [x] Boosted colored energy ribbon width, core intensity and hub emissive visibility for non-bloom LOW mode.
- [ ] Measure FPS, GPU use, Draw Calls and frame-time on GTX 660 (2GB) and RX 7900 GRE; performance gain is NOT yet verified.
- [ ] Confirm actual browser visuals against docs/visual-reference/official-visual-target.png and check readability.
- [ ] v0.0.73: station metal material and differentiated structural silhouettes; v0.0.74: further profiling and visual cleanup; v0.0.75: visual audit.


## v0.0.73 — Singularity Core Phase I (implemented; browser review pending)

- [x] Replace blue AI sphere with opaque event horizon and multiple accretion bands.
- [x] Add photon ring and mechanical containment assembly.
- [x] Add click-to-activate local luminosity / rotation response.
- [x] Remove oversized `AI` center text; show `SINGULARITY CORE` beneath the model.
- [x] Preserve eight GitBlog navigation hubs and the performance quality modes.
- [ ] Verify Webpack build and TypeScript on an installed dependency tree.
- [ ] Browser visual acceptance versus official black-hole reference, including GTX 660 LOW.
- [ ] Phase II: curved photon trajectories, front/back disk depth, textured metallic housing.
- [ ] Phase III: optimized fiber network and richer distant cosmic backdrop.

**Release gate:** Do not call the black hole visually complete until a screenshot comparison and performance check pass.


## v0.0.74 — Singularity Core Phase II: orbital lights and luminous accretion (2026-10-08)
- [x] Set the latest user-approved cinematic singularity composition as the official reference image.
- [x] Replace uniform dark torus-stack disk with a lightweight animated spiral/radial accretion shader.
- [x] Preserve small lights; transform them into slowly orbiting elliptical photon/energy particles (one Points draw call).
- [x] Reinforce black event horizon and crisp photon rim; reduce distracting outer mechanical rings.
- [x] Keep click activation localized to the singularity and orbital lights.
- [ ] Verify real GTX 660 browser FPS and screenshot versus new official image.
- [ ] Continue improving disk depth, front/back occlusion, station materials and cosmic background without hiding the 8 GitBlog hubs.


## v0.0.75 — Singularity Core Phase III: accretion depth and lensing (2026-10-08)
- [x] Rework accretion shader into non-uniform turbulent spiral filaments with cyan/ice/violet color transitions and asymmetric disk lighting.
- [x] Increase accretion disk footprint and tilt to avoid a flat target-like ring stack.
- [x] Add two low-cost partial gravitational lens arcs; no ray-tracing or postprocessing required in LOW.
- [x] Retain and improve orbital light particles with varied ellipse inclinations, 46 LOW / 84 BALANCED / 124 HIGH, batched as a single Points draw call.
- [x] Preserve official user-approved reference image and eight navigation hubs.
- [ ] Actual Windows GTX 660 screenshot / FPS and browser build validation required.
- [ ] v0.0.76: compare with official reference, improve metallic containment, verify shader transparency/depth and performance.


## v0.0.76 — Spiral Infall & Target Reset (2026-10-08)
- [x] Replace the official visual target with the user-approved cinematic spiral-infall black-hole image (`docs/visual-reference/official-visual-target.png`).
- [x] Preserve the pre-existing slow orbital lights (46/84/124 by quality).
- [x] Add **112/208/320** separate inbound light particles for LOW/BALANCED/HIGH, batched in one THREE.Points draw call.
- [x] Each new particle spirals inward, accelerates angularly as its radius shrinks, and recycles outside the disk rather than disappearing permanently.
- [x] Reorient the accretion shader toward flowing spiral filaments; maintain click activation boost.
- [x] Preserve eight GitBlog menus and cumulative roadmap.
- [ ] Browser screenshot and FPS verification on GTX 660; assess CPU cost of per-frame particle position updates.

### Revised visual-first roadmap / acceptance gates
- **0.0.77**: black-hole shader geometry and front/back disk depth; verify center looks like a vortex, not a white ring.
- **0.0.78**: improve 8 orbital station metalwork and distinct high-contrast symbols; preserve performance budget.
- **0.0.79**: replace gray cable rivers with directional, thin, colored fiber flows that visually converge toward the vortex.
- **0.0.80**: cinematic deep-space environment: nebula layers, asteroids, parallax depth; remove random clutter.
- **0.0.81**: compare browser screenshot side-by-side with official reference and record concrete gaps; GTX 660 LOW benchmark.
- **0.0.82**: interactive quality controls, accessibility, mobile layout and WebGL fallback.
- **0.0.83**: Next.js production build and GitHub Pages deployment verification.
- **0.0.100**: release only after visual, functional and performance gates pass.

**Important:** The new official reference is cinematic concept art, not an assertion that browser rendering already matches it.


## v0.0.77 — Directional Infall Acceptance (2026-10-08)
- [x] Preserve orbit lights and use matching positive angular motion for orbit, spiral particles, accretion disk.
- [x] Replace poorly visible inbound particles with 168/280/420 larger points on LOW/BALANCED/HIGH.
- [x] Add 3/4 visible inward spiral lanes and enforce monotonically decreasing radius during each particle lifetime.
- [x] Verify mathematically that angular motion is positive and radius decreases before recycling.
- [ ] Browser visual and performance verification on GTX 660; check projected apparent direction, shader motion, clipping and visibility.
- [ ] Compare real screenshot with official target; concept art is not a browser render.

### Revised gates
- **0.0.78**: real screenshot review, black-hole disk depth and controlled particle trails.
- **0.0.79**: station geometry, individual symbols and material fidelity.
- **0.0.80**: replace thick gray energy cables with slim colored directional fibers.
- **0.0.81**: background nebulae, asteroid depth and performance tuning.
- **0.0.82**: integrated screenshot-to-target comparison and GTX 660 benchmark.
- **0.0.83**: accessibility, responsive and production export verification.


## v0.0.78 — Clockwise Gravitational Infall (implemented; visual acceptance pending)
- Clockwise screen-space angular motion unified across orbital lights, inward particles, accretion shader and disk rotation.
- Outer infall radius expanded from 2.48 to 4.05 world units; 3.4 inward turns.
- GPU point sprites vary particle size, brightness and color; large foreground bodies are preserved.
- Particle density: LOW 208, BALANCED 320, HIGH 480, plus original orbiters.
- Eight hub-colored gravitational fragments migrate from each station toward the core.
- Subtle hub motion hints at tidal pull without destroying menu positions.
- Mathematical direction, contraction and count verification in scripts/verify-spiral.mjs.
- **Pending**: real browser visual verification and GTX 660 FPS, official target gap closure.

### Revised next milestones
- 0.0.79: cinematic depth and asymmetrical accretion disk; preserve clockwise motion.
- 0.0.80: station material/symbol upgrades and gravitational tethers.
- 0.0.81: replace grey cables with fine multicolor optical fibers.
- 0.0.82: layered deep-space background and HUD fidelity.
- 0.0.83: official reference comparison and low-end performance pass.
- 0.0.84: responsive, accessibility and interaction tests.
- 0.0.85: build/deployment verification; 0.0.100 only after acceptance.


## v0.0.79 — Hub-to-Core Clockwise Spiral Fibers (implemented; browser acceptance pending)
- [x] Replace old Core-to-Hub cable geometry with Hub-to-Core spiral paths for all 8 menus.
- [x] Align PacketSwarm, RiverEnergyKnots and RiverPulseTrain with increasing curve parameter from hub to singularity.
- [x] Spiral angular progression is clockwise in the front-facing XY plane (negative angular delta).
- [x] Live hub endpoint deformation corrected to use q=0, not q=1.
- [x] Reduce ribbon width and retain hub-colored filaments.
- [x] Add geometry regression test for start/end radii and clockwise winding.
- [ ] Visual review in browser: ensure all 8 rivers and pulses converge and do not appear to emit outward.
- [ ] Performance verification on GTX 660; capture FPS/draw calls and compare with v0.0.78.

### Updated next milestones
- **0.0.80:** refine the singularity disk and orbiting luminous bodies without losing inward flow.
- **0.0.81:** hub-specific station shapes, lighting and gravitational response.
- **0.0.82:** layered deep-space environment and HUD fidelity.
- **0.0.83:** side-by-side screenshot review against the official target; low-end GPU performance pass.
- **0.0.84–0.0.85:** interaction, responsiveness, build and GitHub Pages validation.
- **0.0.100:** release only after visual and performance acceptance.

## v0.0.80 — Physics-driven Singularity Reconstruction (code complete; visual acceptance pending)
- [x] Preserve full historical source, eight hub names and official visual reference.
- [x] Redesign particle motion in inclined 3D disk coordinates with finite vertical thickness.
- [x] Implement decreasing radius and Kepler-inspired increasing angular velocity toward horizon.
- [x] Keep clockwise projected motion convention and orbital lights.
- [x] Separate dark 3D event horizon, thinner photon ring, front and displaced rear lens arcs.
- [x] Add `scripts/verify-physics.mjs` mathematical regression test.
- [ ] Browser screenshot comparison: target visual reference and real implementation.
- [ ] GTX 660 / RX 7900 GRE runtime FPS and depth-order check.
- [ ] Verify all eight Hub-to-Core paths visually flow inward, not outward.

### Revised roadmap (priority: central black hole first)
- **0.0.81**: build a genuinely volumetric accretion disk with multiple height layers, better occlusion and emissive falloff.
- **0.0.82**: optimize gravitational lens approximation and tune central composition against approved image.
- **0.0.83**: 8 hubs receive restrained vertical depth and gravitational tidal response.
- **0.0.84**: layered distant space architecture and environmental depth.
- **0.0.85**: visual acceptance, low-end GPU benchmark and regression fixes.
- **0.0.86–0.0.87**: responsive UI, interaction, production build and GitHub Pages deployment verification.
- **0.0.100**: only after acceptance; do not infer acceptance from static checks.

## v0.0.81 — Deep Space Environment & Composition (implemented; browser review pending)
- [x] Reviewed official visual target (nebula, asteroid depth, lit station silhouettes) against user v0.0.80 screenshot.
- [x] Added quality-tiered procedural nebula backdrop with one DataTexture and one mesh.
- [x] Added muted remote orbital infrastructure to right-side and left-side negative space.
- [x] Kept central area darker to preserve black-hole contrast and 8 GitBlog menu nodes.
- [x] Kept previous 3D infall physics, hub-to-core pathways, and cumulative history.
- [ ] True volumetric accretion disk and lensing depth (v0.0.82).
- [ ] Screenshot parity comparison and real browser/GPU FPS check.

### Updated next releases
- 0.0.82: volumetric accretion disk, front/back occlusion and lensing.
- 0.0.83: distinctive eight hub sculptures, gravity response and depth.
- 0.0.84: refine remote space facilities, asteroid parallax and light balance.
- 0.0.85: official target visual audit and GTX 660 performance acceptance.
- 0.0.86–0.0.87: responsive interactions, deployment, regression and final validation.

## v0.0.82 — Adaptive Graphics Engine (implemented; browser QA pending)
- [x] GPU-independent device capability heuristic (WebGL2, display pixels, mobile, memory, CPU cores).
- [x] AUTO initial tier, conservative upgrade, prompt downgrade, 9-second hysteresis and warm-up.
- [x] Hidden-tab FPS exclusion; reset on visibility restore; manual HIGH/BALANCED/LOW override.
- [x] Preserve all eight GitBlog hubs and approved target image.
- [x] Add quality policy verification script.
- [ ] Browser-based GPU/VRAM profiling and real FPS verification on GTX 660 and RX 7900 GRE.
- [ ] Additional ULTRA tier after performance evidence; avoid untested heavy mode.
- **0.0.83**: true volumetric accretion disk and lens depth (core quality first).
- **0.0.84**: refine eight hub materials and 3D icon silhouettes.
- **0.0.85**: environment and official target image side-by-side acceptance.
- **0.0.86**: low/high hardware profiling, adaptive thresholds, build and deployment QA.


## v0.0.83 — Volumetric Accretion / High-tier Fidelity (2026-10-08)
- [x] Preserve official target reference and GitBlog eight-menu information architecture.
- [x] Layer the existing plasma shader in physical 3D depth; LOW 1 / BALANCED 2 / HIGH 5 sheets.
- [x] Tune per-sheet energy to reduce white clipping in HIGH.
- [x] Add distinct front/back high-quality gravitational lens arcs.
- [x] Increase HIGH-tier accretion particle and orbital detail while retaining LOW budgets.
- [x] Increase distant starfield and environment detail in HIGH only.
- [ ] Browser screenshot and objective target-image comparison pending.
- [ ] Benchmark FPS on GTX 660 and RX 7900 GRE; AUTO may downgrade HIGH.

### Updated next steps
- **0.0.84:** high-fidelity distinct eight hub silhouettes, material separation, 3D depth.
- **0.0.85:** improve river-to-core absorption and foreground/background occlusion.
- **0.0.86:** reference comparison, adaptive tier profiling and GPU benchmarks.
- **0.0.87:** browser interaction, responsive layout, production deployment checks.

## v0.0.84 — Eight Hub Identity Architecture (implementation complete; visual review pending)
- [x] Profile: recognizable head and shoulders.
- [x] Career: upward progression columns and milestone.
- [x] Projects: three connected deployment modules.
- [x] Portfolio: layered showcase documents.
- [x] GitHub: branching graph.
- [x] Expertise: neural knowledge graph.
- [x] Training: graduation cap with tassel.
- [x] Archive: two-drawer document vault.
- [x] Brighter metal orbital dock materials; retain eight fixed GitBlog categories.
- [x] Preserve original target image and all earlier roadmap history.
- [ ] Actual browser screenshot review for silhouette readability at 1080p.
- [ ] HIGH/LOW GPU performance comparison.
### Next milestones
- v0.0.85: improve black-hole 3D occlusion, infall paths, and station gravity interactions.
- v0.0.86: official target image visual gap audit with low/high GPU tests.
- v0.0.87: UI interaction, responsiveness, production build, deployment acceptance.

## v0.0.86 — Gravitational lens proxy (implemented; visual acceptance pending)
- [x] Radius-dependent bounded bending for rear disk arcs
- [x] Continuous projected lens paths replace hard-coded torus arcs
- [x] Reduce containment rings and square debris
- [x] Lensing sanity test
- [ ] Browser screenshot comparison and actual FPS verification (deferred until core completion)
### Upcoming black-hole-only milestones
- 0.0.87: 3D plasma turbulence and asymmetric brightness
- 0.0.88: uninterrupted hub-to-horizon accretion flow
- 0.0.89: click-activated gravity and infall response
- 0.0.90: black-hole visual acceptance, then notify user to run project

## v0.0.88 — Continuous hub-to-horizon infall (implemented; visual acceptance pending)
- [x] Source particle trajectories start at each of eight moving hubs
- [x] Smooth bridge into the core's shared 3D infall curve
- [x] Particle size extinction near the event horizon
- [x] GPU point sprites with quality-tier budgets
- [x] Static trajectory invariant test
- [ ] Real browser visual continuity, performance and Next.js build verification
- Next: v0.0.89 gravity activation; v0.0.90 visual acceptance.


## v0.0.89 — Activation-coupled gravitational infall (implemented; visual acceptance pending)
- [x] Central UI toggle coupled to hub-to-horizon particles
- [x] Smooth activation acceleration with a monotonic integrated phase clock
- [x] Bounded delta and reversible standby response
- [x] Short-lived activation wave, not permanent decorative rings
- [x] Dedicated activation wiring regression check
- [ ] Actual browser render, build and GPU FPS verification
- Next: v0.0.90 acceptance pass, then inform user when it is ready to run.


## v0.0.90 — Singularity acceptance gate (2026-10-08)

- [x] Integrated independent particle phase clock; activation now changes speed without phase jumps.
- [x] Cached moving hub anchors once per frame to avoid repeated Vector3 allocations.
- [x] Reduced concentric visual clutter (lens bands, redundant ring, non-HIGH spiral guide lines).
- [x] Added numerical physics/continuity regression gate.
- [ ] Run production Next.js build with installed dependencies.
- [ ] Capture HIGH/BALANCED/LOW browser screenshots, compare against official target.
- [ ] Record 20-second FPS and draw-call metrics on target hardware.
- [ ] Verify shader compilation and visual occlusion in live WebGL.

**Release verdict: source-level improvement only. Black hole NOT signed off as visually complete.**


### v0.0.92 — Black Hole Clearance & Validation
- [x] Increase radial spacing of all eight hub anchors by 10% while preserving angular layout and shared motion anchors.
- [x] Add hub-clearance regression check.
- [ ] Verify Next.js build and actual browser render (including clipping and FPS).
- [ ] Confirm black-hole visual acceptance against official target.


## v0.0.95 — Photon shadow fidelity (2026-10-08)
- [x] Replace uniform emissive torus with procedural photon-ring shader.
- [x] Add angular beaming, turbulent arc brightness and soft radial skirts.
- [x] Reduce oversaturated inner accretion-sheet brightness and gas opacity.
- [x] Add photon emission regression check.
- [ ] Production Next.js build.
- [ ] Browser WebGL shader compilation and screenshot review.
- [ ] FPS verification on target GPU.
**Status: source updated; visual acceptance pending.**

| 0.0.97 | Caustic accretion spiral shader, warm/cool gas asymmetry, target-image gap audit; browser/build gate still pending | Source-level implementation; not visually accepted |

| 0.0.100 | Thick inclined plasma conduits, directional shader streaks and instanced energy packets | Implemented; browser verification pending |


### v0.0.102 — Coherent plasma field
- [x] Match GPU conduit vertex motion to CPU `deformRiverPoint` wave/breath/shear/depth terms.
- [x] Add per-vertex river normals and preserve hub-to-core direction.
- [ ] Browser shader compilation and moving hub/packet alignment visual verification.
- [ ] v0.0.103: glow stability across AUTO quality transitions.
- [ ] v0.0.104: build, screenshot, FPS, official-target comparison and acceptance.

### v0.0.103 — Integrated Plasma Fidelity
- Bundled thicker two-layer conduits, GPU pulse packets, braided instanced filaments, visible infall packets to horizon, and persistent LOW-mode bloom.
- Build and real browser comparison remain release gates; do not claim visual acceptance without screenshots.


## v0.0.104 — Oblique Infall Integration (2026-10-08)
- [x] Tilt all eight inward spiral pathways progressively into an oblique 3D accretion plane without disconnecting moving hub anchors.
- [x] Accelerating packet travel and event-horizon fadeout; prevent abrupt visible reappearance at the capture point.
- [x] Improve core-side energy intensity and refine packet highlight shapes.
- [x] Reduce redundant overlapping dynamic stream meshes in BALANCED/LOW, keep high-detail accents in HIGH.
- [x] Reuse vectors and colors in braided strands to reduce garbage-collector pressure.
- [ ] Production Next.js build and browser shader compilation (dependencies unavailable locally).
- [ ] Actual screenshot comparison with official target across viewport ratios and HIGH/BALANCED/LOW.
- [ ] FPS/draw-call measurements on GTX 660 and AUTO transitions.
- [ ] Visual acceptance of 8 distinct stations, disk angle and energy conduits.


## v0.0.105 — Diffuse Plasma Streams (2026-10-08)
- Replaced continuous bright conduit shells with irregular, angularly broken plasma coverage.
- Added per-vertex centerline attributes for tapered, turbulent GPU geometry; preserved live hub anchor and original 8 routes.
- Reduced shell radius, shader emission, opacity and braided-strand bulk; retained fast inward energy packets and existing composition.
- Visual acceptance remains pending actual browser/GPU rendering and comparison to reference screenshot.


## v0.0.106 — Plasma Runtime Hotfix (2026-10-08)

- `deformRiverPoint()`에 잘못 삽입된 `centers[vertex]` 참조 제거 (ReferenceError 해결).
- `PlasmaConduits()` TubeGeometry 생성 시 `aRiverCenter` 버텍스 좌표 실제 계산 및 할당.
- 신규 회귀 검사 `verify-plasma-runtime.mjs` 추가.
- 기존 시각 효과 및 8개 Hub 레이아웃 유지.


## v0.0.107 — Plasma visual integration
- Preserve the eight GitBlog hubs and current cosmic composition.
- Reduce conduit hose silhouette: slimmer sheath, broken angular coverage, turbulent taper, controlled bloom.
- Fragment the regular braided strands and emphasize moving in-fall packets.
- NEXT PHASE: hub icon quality upgrade (distinct geometry, detail, material hierarchy, readable silhouettes and GPU budgets).
- Acceptance pending: actual browser render, LOW/AUTO switching, performance and visual comparison.


## v0.0.113 — Hub identity fidelity (2026-10-08)
- [x] Eight camera-side emblem silhouettes receive distinct hard-surface front assemblies.
- [x] Metallic trim / glass emissive layers separate form from color.
- [x] Universal orbital rings and ghost sphere attenuated to expose the emblems.
- [x] LOW retains primary silhouette; BALANCED/HIGH show optional details.
- [ ] Next.js production build / TypeScript validation in a dependency-equipped environment.
- [ ] User browser review of 8 hubs, clicking, AUTO/LOW/HIGH and FPS.
- [ ] Final layout, visual target and performance sign-off (candidate v0.0.113; conditional).

## v0.0.113 — Hub emblem readability (2026-10-08)
- [x] 8개 Hub 전면에 고유한 불투명 3D 식별 엠블럼 추가 (LOW 포함)
- [x] 본체를 가리던 공통 궤도/셸 불투명도 조정
- [x] 기존 블랙홀, 플라즈마 줄기, Hub 배치와 탐색 코드 보존
- [x] 소스 회귀 검사 + 전면 엠블럼 전용 검사
- [ ] Next.js 프로덕션 빌드 및 TypeScript 검사 (현재 환경 의존성 부재)
- [ ] 실제 브라우저에서 8개 Hub 클릭, 품질 전환, FPS와 화면 비율 검증
- [ ] 목표 시안과 최종 시각적 수용 확인

완성 판정: **보류**. v0.0.113은 목표 버전이며 실제 브라우저 검증 없이 완성 선언하지 않음.

## v0.0.113 status / remaining acceptance checklist
- [x] Eight distinct hub structures and opaque identity emblems
- [x] Reduce visual interference from shared orbit rings
- [x] Contrast backing for emblems, including LOW mode
- [x] Source-level regression suite and ZIP integrity
- [ ] Next.js production build + TypeScript check in environment with dependencies
- [ ] Browser: click all eight hubs and verify ACTIVE CONTEXT updates
- [ ] Browser: quality AUTO/LOW/BALANCED/HIGH and animation continuity
- [ ] Browser: wide/narrow viewport and GPU FPS measurement
- [ ] Compare actual rendering against the official target image

Completion version is not guaranteed until the remaining runtime checks pass.

## v0.0.113 — Saturn-style hub rings
- Replace crossed vertical torus ornaments with one tilted, layered, gapped ring plane per Hub.
- Use an opaque planet body with depth writing for correct front/back ring occlusion.
- Keep distinct Hub emblems, the black-hole accretion streams, navigation and HUD.
- Runtime WebGL rendering, interactions, and GPU performance require browser validation.


## v0.0.118 acceptance status
- [x] Eight distinct identity details, machining and contrast treatment
- [x] Preserve Saturn ring plane and central black hole
- [ ] TypeScript and Next.js production build
- [ ] All eight Hub clicks and ACTIVE CONTEXT changes
- [ ] Browser appearance at LOW/BALANCED/HIGH and wide/mobile viewports
- [ ] GPU FPS stability and target-reference visual sign-off

### v0.0.118 acceptance
- [x] Front-facing opaque emblem medallions (fixes edge-on cylinder geometry)
- [x] Saturn ring width and density reduced for hub readability
- [x] Eight unique identity icons preserved
- [ ] Next.js production build and TypeScript validation
- [ ] Verify all eight Hub clicks and ACTIVE CONTEXT in browser
- [ ] Check quality modes, FPS and screen ratios
- [ ] Compare against reference visual after actual rendering

### v0.0.118 acceptance gates
- [x] Correct rivet mesh transform (avoids invalid geometry rotation prop)
- [x] Eight semantic hub identities preserved
- [x] Saturn ring layers retained with lower overlay clutter
- [x] Source-level regression checks
- [ ] Next.js production build + TypeScript
- [ ] Browser interaction across all eight hubs
- [ ] Quality tiers, GPU FPS, narrow-screen layout and target-image comparison


## Integrated v0.0.118 status (visual quality)
- [x] 8 distinct hub silhouette backplates and raised visible 3D architecture
- [x] Opaque planet occludes Saturn-style ring rear sections
- [x] Ring band density, opacity and emblem contrast balanced
- [x] HIGH-only peripheral satellite traffic to protect BALANCED/LOW budgets
- [x] Source regression tests and version sync
- [ ] Production Next.js/TypeScript build with installed dependencies
- [ ] Real-browser comparison of all eight hubs and visual target
- [ ] GTX 660 FPS measurements and all quality modes
- [ ] Navigation/ACTIVE CONTEXT click testing, responsive layout and deployment (v0.0.118 and v0.1.0 gates)


### v0.0.118 visual correction
- [x] Remove opaque Hub shell hiding the 3D interior
- [x] Restore interior placement for eight differentiated 3D station models
- [x] Reposition foreground emblem inside transparent shell
- [x] Reduce peripheral particle clutter and satellite overlap
- [x] Add regression check against opaque shell
- [ ] Verify browser screenshot against reference and run Next.js production build

### v0.0.120 integrated acceptance
- [x] GPU nebula/cloud/galaxy backdrop layer (procedural, camera-following)
- [x] Tilted, animated multi-color dust streams captured toward the event horizon
- [x] Sharper warm/cool accretion spiral shader
- [x] LOW/BALANCED/HIGH particle counts and reduced LOW animation
- [ ] Production Next.js build and full TypeScript typecheck
- [ ] Visual reference comparison in browser; corner and center composition
- [ ] FPS, interaction and GitHub Pages deployment validation


### v0.0.123 — Dynamic right-side orbital environment
- Added an animated mini accretion vortex in the upper-right: three spiral arms, moving particle ring, dark event horizon.
- Added a modular orbiting space station in the right-side negative space: solar panels, rotating antenna, beacon, gentle drift.
- Both effects are live Three.js geometry across LOW, BALANCED, HIGH, with tiered particle and panel budgets.
- No generated background images; existing navigation and central black hole are retained.
- Remaining: browser-side visual positioning, FPS profiling and full Next.js production build.

### v0.0.123 follow-up
- [x] Station moved inside expected right-side frustum and given brighter panels
- [x] Mini vortex multi-arm 3D filament structure
- [ ] Verify station is visible at each viewport and quality tier in browser
- [ ] Verify mini vortex and station do not overlap navigation or Hub labels
- [ ] FPS profiling and Next.js production build
