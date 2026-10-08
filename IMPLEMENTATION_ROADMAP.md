# AI Network Portfolio — 전체 누적 개발 로드맵 (v0.0.1 ~ v0.0.126)

> **원칙:** 이 문서는 프로젝트 초기 버전부터 현재까지의 개발 기록을 시간순으로 누적 보존합니다. 이전 버전 항목을 삭제하거나 최신 계획으로 대체하지 않습니다.
>
> **근거:** 각 버전별 원본 ZIP의 `IMPLEMENTATION_ROADMAP.md` / `CHANGELOG.md` / `README.md`에서 추출한 기록입니다. 기록이 없는 부분은 추측해 채우지 않습니다.
>
> **상태 주의:** 과거 문서의 `[x]`는 당시 소스 구현 체크이며, 실제 브라우저·성능·배포 검증 완료를 뜻하지 않을 수 있습니다.

## 현재 기준 및 다음 통합 업데이트

## 변경하지 않을 설계 원칙
- 기존 Next.js / React Three Fiber / Three.js 기반을 유지하고 정적 이미지로 3D를 대체하지 않습니다.
- 중앙 블랙홀 + 8개 Hub + HUD + 클릭 탐색을 보존합니다.
- Hub 시설은 투명 구체 **내부**에 배치하며 토성형 고리는 납작한 적도면을 따릅니다.
- 우측 미니 블랙홀은 강착원반 전체가 도는 것이 아니라 물질만 흡입·회전합니다.
- 우주 정거장은 구조적으로 규모가 큰 동적 시설이며 LOW에서도 실루엣을 유지합니다.
- GTX 660을 고려해 입자·세부 모듈·광원 수를 품질별로 관리합니다.

## 버전별 통합 체크리스트

### v0.0.126 — Orbital Cinematic Quality (이번 통합 업데이트)
- [x] 미니 블랙홀: 시간 기반 셰이더의 나선형 방출광·먼지 흐름 추가
- [x] 미니 블랙홀: 강착원반 기하의 방향 고정, 입자만 회전·흡입
- [x] 미니 블랙홀: 중복 필라멘트 발광 감소, 중심 암흑부 유지
- [x] 우주 정거장: 대형 보조 거주 링·산업용 트러스 추가
- [x] 우주 정거장: 다중 도킹 포트·추진 모듈·광원 강조
- [x] Hub: 투명 외피 내부 시설을 가리지 않는 얇은 가장자리 조명
- [x] LOW/BALANCED/HIGH에 따라 정거장 도킹 수·고리 분할·셰이더 강도 차등
- [x] 통합 로드맵 최신화 및 이전 이력 아카이브
- [ ] 실제 브라우저에서 미니 블랙홀/정거장 크기·가시성 확인
- [ ] Next.js 프로덕션 빌드·TypeScript 타입 검사
- [ ] GTX 660의 품질별 FPS 실측

### v0.0.127 — Scene, UX & Runtime Integration (다음 통합 업데이트)
- [ ] 목표 시안과 화면 구도·성운·중앙 강착원반·8개 Hub 가독성 비교 후 수정
- [ ] 우측 블랙홀/정거장과 Hub·HUD의 화면 겹침 방지 (16:9, 21:9, 모바일)
- [ ] 8개 Hub 클릭·ACTIVE CONTEXT·사이드바 동기화 및 키보드 접근성
- [ ] AUTO/LOW/BALANCED/HIGH 품질 전환·WebGL 자원 해제·FPS 계측 검증
- [ ] Next.js 빌드·TypeScript 오류 해결 및 정적 export 설정 확인

### v0.1.0 — Release Acceptance
- [ ] 목표 시안과 실제 캡처 비교 통과
- [ ] 8개 Hub, HUD, 품질 전환의 브라우저 통합 검증
- [ ] LOW 사양 성능 확인 및 최적화
- [ ] GitHub Pages 정적 배포 검증
- [ ] README/CHANGELOG/최종 전체 ZIP 정리

## 완료 판정
- **코드 반영:** 기능 구현과 정적 검사가 끝남
- **기능 검증:** 실제 브라우저에서 동작 확인
- **시각 검증:** 사용자가 제공한 목표 시안과 비교
- **배포 검증:** Next.js 빌드 및 GitHub Pages 실제 확인

소스 검사가 통과해도 화면 품질이나 FPS가 검증됐다고 표시하지 않습니다.


---

## 버전별 누적 개발 이력 (오래된 순서부터)

### v0.0.1

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.1.zip`_


독립형 인터랙티브 AI 네트워크 메인 화면 프로토타입입니다.

## 핵심 기능
- 100dvh 단일 화면 / 스크롤 없음
- 자동으로 흐르는 Particle Network 및 Data Stream
- 중앙 AI Core pulse / rotating rings
- Azure / Fabric / AKS / Data / Projects / Expertise / AI Study 노드
- 포인터가 노드에 접근하면 자동으로 상세 HUD 표시
- 반응형 Desktop / Notebook / Mobile 레이아웃
- Next.js static export 지원

## 실행
```bash
npm install
npm run dev
```

## 빌드
```bash
npm run build
```

정적 결과는 `out/`에 생성됩니다.

## v0.0.2 후보
- 실제 페이지 URL 연결
- 곡선별 유량/색상/속도 차등
- 노드 클릭 시 camera focus 연출
- WebGL/Three.js shader 기반 depth 확장
- 실제 content metadata 기반 HUD 카운트
- 모바일 전용 네트워크 재배치

### v0.0.2

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.2.zip`_


High-density autonomous AI/data network portfolio prototype.

## v0.0.2
- Scene engine layer redesign
- 620 deep particles + 115 autonomous micro nodes
- 18-path curved data-stream bundle per major node
- travelling energy packets
- multi-orbit AI core and expanding pulse
- depth grid, scanline/noise layers, enhanced glow
- proximity information HUD retained
- responsive 100dvh/no-scroll layout

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Roadmap
v0.0.3 will focus on denser particle fields, local particle clustering and foreground/background depth separation.

### v0.0.3

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.3.zip`_



- [x] Background / Midground / Foreground Particle Layer 분리
- [x] Particle 수량 1,280개로 고도화
- [x] 개별 Particle drift / velocity 적용
- [x] 근접 Particle 간 동적 Local Link
- [x] 18개 Cluster 기반 국소 Network 구성
- [x] AI Core 및 주요 영역 주변 시각 밀도 강화
- [x] Main Scene 전역의 dead-space 감소
- [x] Depth별 opacity / size / speed 차등화
- [x] Foreground Particle glow 적용
- [x] HUD 영역 가독성 유지

### v0.0.4

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.4.zip`_



- [x] AI Core ↔ Main Node별 독립 Stream Bundle 정의
- [x] Stream 수량/폭/곡률의 노드별 차별화
- [x] 다중 Bezier 경로를 유기적인 Ribbon Flow로 확장
- [x] Energy Packet 속도/밝기/크기 다양화
- [x] Core에서 발산하고 Node에서 수렴하는 방향성 표현
- [x] Stream 주변 Dust/Trail 효과
- [x] 교차 Stream의 발광 계층 강화
- [x] Background Network와 Main Stream의 시각적 계층 분리
- [x] Autonomous traffic burst / idle cycle
- [x] 은하수형 데이터 흐름 밀도 강화

### v0.0.5

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.5.zip`_


## Topology / Anchor System

v0.0.4의 Data Stream Engine을 유지하면서 Node/Stream의 좌표 불일치를 구조적으로 수정한 버전입니다.

### Changes
- Main Node의 normalized center를 단일 topology anchor로 사용
- DOM diamond icon 중심과 Canvas stream target 중심 통합
- Stream은 AI Core 중심이 아니라 Core shell에서 시작
- Stream은 Node 중심을 관통하지 않고 Node shell 경계에서 종료
- River / Lane / Packet / Tail / Dust가 같은 endpoint를 공유
- Pointer proximity도 같은 node center 사용
- Responsive CSS에서도 anchor 정렬 유지
- IMPLEMENTATION_ROADMAP.md를 v0.0.24까지 확장

### Run
```bash
npm install
npm run dev
```

브라우저에서 표시된 실제 화면을 기준으로 다음 버전 품질을 검수합니다.

### v0.0.6

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.6.zip`_



- [x] 기존 Next.js / DOM HUD 유지
- [x] Three.js + React Three Fiber 도입
- [x] DOM HUD와 WebGL Scene 분리
- [x] Perspective Camera 도입
- [x] 실제 Z축을 가진 Main Hub 배치
- [x] 3D Core 기본 Geometry 구축
- [x] TubeGeometry 기반 Spatial Stream 기반 구축
- [x] 3D Micro Node Field 구축
- [x] Point Light / Fog 적용
- [x] Bloom + Vignette Postprocessing 도입
- [x] 기존 Portfolio Label/HUD Overlay 유지

### v0.0.7

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.7.zip`_



- [x] Core 내부 900-point Particle Sphere
- [x] Inner / Outer Energy Shell 분리
- [x] 4중 Orbit Ring을 서로 다른 축/속도로 회전
- [x] 이중 Pulse Wave / Corona Sparkles 적용
- [x] Core 주변 고밀도 Energy Particle 적용
- [x] Core 광원 계층 강화 및 Bloom 재조정
- [x] Stream 시작점을 Core 외곽으로 이동해 중심부 관통 감소
- [x] 좌측 Expertise Hub clipping 완화
- [x] AI Core가 Scene의 명확한 시각적 중심이 되도록 구조 변경

### v0.0.8

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.8.zip`_



- [x] 모든 Hub가 동일 Diamond Geometry를 사용하던 구조 제거
- [x] Azure: Cloud/Infrastructure 계열 Octa Hub
- [x] Fabric: 이중 Data Platform Block Hub
- [x] AKS: Container/Orchestration 계열 Dodeca + Knot Hub
- [x] Data: Database Cylinder Hub
- [x] Projects: Layered Cube Hub
- [x] Expertise: Polyhedral Knowledge Hub
- [x] AI Study: Open-book 형태 Hub
- [x] Main Hub별 6개 Local Sub-node 배치
- [x] Hub ↔ Sub-node Local Link 추가
- [x] Hub Platform / Local Particle Field 유지 및 강화
- [x] Stream 종점을 Hub 외곽 Anchor로 보정
- [x] 좌측 Expertise Hub를 Sidebar 안전 영역 안으로 이동
- [x] 오른쪽 Fabric/Data 상세 패널을 노드 왼쪽으로 자동 배치
- [x] 상세 패널 viewport clamp 적용
- [x] DOM hover 의존도를 낮추고 화면 좌표 기반 proximity 판정 추가
- [x] Keyboard focus에서도 Node 상세 정보 표시
- [x] v0.0.7 AI Core가 실제 WebGL 렌더 트리에 유지되는지 코드 기준 재검수

### v0.0.9

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.9.zip`_



- [x] 방사형 단일 케이블을 7 Hub × 14 braided lane으로 확장
- [x] Quadratic 단일 곡선을 Catmull-Rom 3D Data Highway로 변경
- [x] Lane별 Z-depth 차등화
- [x] Stream 폭/곡률/속도/opacity 다양화
- [x] 이동 Packet + Tail 구현
- [x] Core↔Hub 중간 Junction / collector 시각화
- [x] 일부 Stream을 Sub-node topology에 연결
- [x] Hub 간 저광량 Cross-link 추가
- [x] 7방향 완전 대칭을 lane별 편차로 완화
- [x] 기존 3D Core / Hub / Interaction 유지

### v0.0.10

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.10.zip`_



- [x] Main Hub → Sub Hub → Micro Node 3단계 topology 구축
- [x] 7개 Hub마다 6개 명시적 Domain Sub-node 정의
- [x] 각 Sub-node마다 4개 Micro Node 생성
- [x] Hub ↔ Sub ↔ Micro 연결선 계층화
- [x] Data Highway collector를 Sub-node까지 분기
- [x] Micro branch feed를 별도 곡선으로 연결
- [x] Hub 주변 Ecosystem Cluster 추가
- [x] 무작위 Micro Node 비중을 줄이고 의미 있는 topology 비중 확대
- [x] Hub 간 perimeter Cross-link 확장
- [x] 기존 Core / Main Hub / Spatial Highway 유지

### v0.0.11

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.11.zip`_



- [x] 각 Hub 주변에 24개 infrastructure object 배치
- [x] compute / storage / gateway / relay 4종 구조물 구현
- [x] Hub별 local platform / perimeter ring 추가
- [x] 전체 Network floor / concentric grid 추가
- [x] Cluster 간 secondary highway 추가
- [x] secondary highway junction 시각화
- [x] 기존 random particle 외에 의미 있는 environment object 비중 확대
- [x] 중심부와 외곽의 빈 공간을 infrastructure cluster로 보강
- [x] 기존 Core / Hub / Hierarchical Network / Spatial Highway 유지

### v0.0.12

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.12.zip`_



- [x] Pointer 기반 미세 camera parallax
- [x] Autonomous camera breathing / drift
- [x] Sidebar / HUD 고정, WebGL scene만 공간 반응
- [x] Perspective 기반 Z-depth 체감 강화
- [x] Infrastructure 168개를 개별 Mesh에서 InstancedMesh 4종으로 통합
- [x] Infrastructure 개별 PointLight 제거 — emissive/Bloom으로 시각 품질 유지
- [x] Junction 다중 PointLight 제거
- [x] DPR 상한 1.60 → 1.25로 조정
- [x] WebGL high-performance powerPreference 적용
- [x] R3F performance guard 설정 추가
- [x] Stars 1,800 → 1,400으로 조정하되 Scene density는 Infrastructure로 유지
- [x] UI 버전 표기를 v0.0.12로 수정
- [x] 기존 Core / Hub / Hierarchical Network / Spatial Highway 유지

### v0.0.13

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.13.zip`_



- [x] 모든 오브젝트가 동일 cyan으로 뭉개지는 현상 완화
- [x] Core / Main Hub / Sub / Micro / Environment 밝기 계층 분리
- [x] Cyan / Blue / White 중심 + 제한적 warm/violet accent light 추가
- [x] Main Hub emissive와 local light budget 하향 조정
- [x] Sub/Micro topology opacity 계층화
- [x] Infrastructure emissive budget 하향 — Main Hub보다 밝지 않도록 조정
- [x] Bloom threshold `0.08 → 0.42`, intensity `1.8 → 1.18`로 재조정
- [x] EffectComposer multisampling 0 적용으로 후처리 GPU 비용 억제
- [x] Brightness/Contrast + saturation 보정
- [x] Depth fog / vignette 재조정
- [x] 기존 Instanced Infrastructure / DPR Guard 유지

### v0.0.14

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.14.zip`_



- [x] WebGL renderer를 opaque(`alpha:false`)로 전환해 흰 배경 노출 차단
- [x] renderer clear color + scene background를 `#00050d`로 이중 고정
- [x] CSS fallback background를 추가해 Canvas 초기화/복구 순간에도 white flash 방지
- [x] BrightnessContrast / HueSaturation 후처리를 제거해 색상 회귀 가능성 축소
- [x] Bloom threshold/intensity를 재조정해 전체 cyan 과발광 억제
- [x] Main Hub / Infrastructure emissive와 local light budget 재조정
- [x] Deep Space < City < Micro < Sub < Stream < Main Hub < AI Core 밝기 계층 유지
- [x] Autonomous relay pulse 추가
- [x] Camera breathing / drift를 pointer parallax와 충돌하지 않도록 저주기 분리
- [x] Core / Hub 기존 motion cadence 유지
- [x] DPR 상한 `1.25 → 1.20`, antialias/stencil 비활성화로 GPU 비용 추가 억제
- [x] Star count `1400 → 1250` 조정 — City topology 밀도는 유지
- [x] 기존 Instanced Infrastructure / Spatial Highway / Hierarchical Network 유지

### v0.0.15

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.15.zip`_



- [x] AI STUDY / AKS / DATA 하단 Main Hub를 HUD safe-zone 위로 재배치
- [x] DOM interaction stage에 HUD safe-zone 적용
- [x] 정보 패널 최대 높이를 safe-zone 기준으로 제한
- [x] 하단 WebGL→HUD 경계에 dark fade guard 추가
- [x] 98개 Stream Lane의 개별 `useFrame` 제거
- [x] Lane별 Packet/Tail 196개 개별 animated mesh 제거
- [x] Packet을 1개 `InstancedMesh` + 단일 animation loop로 batching
- [x] Stream Tube segment 72→56, radial segment 5→4 최적화
- [x] Hub의 `Float + useFrame` 이중 animation 제거
- [x] Hub별 PointLight 7개 제거 — emissive hierarchy 유지
- [x] Hub별 Sparkles 제거 — Core/Network density는 유지
- [x] Core Sparkles 345→250, Stars 1250→1050 조정
- [x] DPR 상한 1.20→1.10 조정
- [x] warm/violet 보조 PointLight 2개 제거
- [x] Dark Scene / City Density / 98 Stream Lane 자체는 유지
- [x] DOM proximity 시 비활성 Hub dim 처리 기반 추가

### v0.0.16

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.16.zip`_



Hub에 접근했을 때 단순 HTML 정보창만 뜨는 것이 아니라 **해당 Hub와 AI Core 사이의 Network가 시각적으로 우선순위를 갖는다.** 선택되지 않은 Network는 사라지지 않고 배경 topology로 남아 전체 밀도를 유지한다.

### v0.0.17

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.17.zip`_



사용자가 보는 3D Hub와 실제 Proximity 판정 중심이 동일 screen-space 좌표를 사용한다. Information Panel은 Domain/Capability/Evidence 계층을 표현하고, 성능 판단은 작업 관리자 추정뿐 아니라 Scene 내부 telemetry로 함께 검증할 수 있다.

### v0.0.18

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.18.zip`_



Information Architecture가 선택 Node의 상세 패널뿐 아니라 하단 HUD context에도 연결된다. HUD 밀도를 높이되 기존 Scene safe-zone과 WebGL draw-call budget을 악화시키지 않는다. 개발용 성능 계측은 필요할 때만 펼치는 별도 PERF UI로 분리한다.

### v0.0.19

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.19.zip`_



사용자는 Hub에 접근해 정보를 탐색하고, 클릭 또는 Keyboard Enter로 명시적으로 destination을 선택할 수 있다. 아직 실제 Portfolio route가 연결되지 않은 영역은 안전한 hash placeholder로 동작하여 dead link/404를 만들지 않는다. Navigation 기능 자체는 WebGL draw call을 추가하지 않는다.

### v0.0.20

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.20.zip`_



정지 화면에서는 기존 Data Highway의 방향성이 유지되고, 수 초간 관찰하면 Packet만 움직이는 것이 아니라 Stream 줄기 자체가 명확하게 굽이치고 서로 벌어졌다 모이는 움직임이 보여야 한다. Core와 Hub endpoint는 흔들리지 않는다.

### v0.0.21

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.21.zip`_



동일 소스가 16:9 FHD/QHD/4K, 16:10 Laptop, 21:9 UltraWide에서 No Scroll을 유지하고 Sidebar/HUD가 Main Hub를 침범하지 않아야 한다. 화면비가 달라져도 Dynamic Stream endpoint와 projected interaction anchor는 동일 topology에서 파생되어야 한다.

### v0.0.22

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.22.zip`_



실제 FHD 화면에서 AI Core와 7개 Main Hub의 시각 중심이 하단 HUD 쪽으로 처져 보이지 않아야 한다. Stream은 Packet이 없어도 줄기 자체의 변형을 육안으로 확인할 수 있어야 하며, Core/Hub endpoint와 Interaction anchor는 상향 보정 후에도 일치해야 한다.

### v0.0.23

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.23.zip`_



모바일 Portrait/Landscape에서 `100dvh`와 No Scroll을 유지하며 Core와 Main Hub가 HUD/상단 navigation에 가려지지 않아야 한다. 첫 tap은 정보 확인, 두 번째 tap은 navigation이어야 하며, Dynamic Stream의 생동감은 유지하되 데스크톱과 동일한 렌더 부하를 강제하지 않는다.

### v0.0.24

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.24.zip`_



성능이 낮은 장치에서 시각 구조 전체를 제거하는 대신 고비용 보조 계층과 Dynamic Stream update budget부터 단계적으로 낮춰야 한다. AUTO는 짧은 순간의 FPS 하락으로 즉시 품질을 변경하지 않으며, 사용자는 PERF 패널에서 Tier를 고정할 수 있어야 한다.

### v0.0.25

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.25.zip`_



- Visual Polish: **구현 완료 / 실제 브라우저 Gap Audit에서 추가 보정 가능**
- Content Integration foundation: **완료**
- Performance: **Carry-over** — 실제 장치 FPS는 v0.0.26 Gap Audit에서 함께 검수

### v0.0.26

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.26.zip`_



- 가장 눈에 띄는 굵은 Stream 자체가 5~10초 관찰 시 명확히 휘고 호흡해야 한다.
- Dynamic Strand는 빠르고 복잡하게, River Backbone은 느리고 큰 곡률로 움직여 서로 다른 motion hierarchy가 보여야 한다.
- 밝은 leader Packet은 정적 원본 Curve가 아니라 변형된 River를 따라가야 한다.
- 새 동적 Geometry 때문에 Adaptive Performance가 급격히 회귀하지 않아야 한다.

### v0.0.27

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.27.zip`_



- 굵은 River와 가는 Strand 모두 정지된 케이블이 아니라 서로 다른 속도로 살아 움직여야 한다.
- 정적 98 lane은 topology 구조를 보존하되 Dynamic layer보다 먼저 눈에 띄지 않아야 한다.
- HIGH 품질에서 Micro Network 정보 밀도를 유지하면서 draw call이 이전보다 감소해야 한다.
- Core / Main Hub / River / City / HUD의 밝기 계층이 화면 캡처에서도 구분되어야 한다.
- Production Validation 전에 새로운 대형 기능을 추가하지 않는다.

### v0.0.28

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.28.zip`_



- 7 Main Hub가 AI Core를 중심으로 10~20초 관찰 시 천천히 위치가 변하는 것이 인지되어야 한다.
- AI Core는 중앙에 유지되고 주변 topology만 공전해야 한다.
- Hub와 연결된 River/Strand/Packet/Local Network가 따로 떨어지지 않고 함께 이동해야 한다.
- 공전 중에도 Node label과 proximity hit area가 실제 보이는 Hub를 추종해야 한다.
- Node focus 중에는 공전 속도가 크게 낮아져 정보 확인을 방해하지 않아야 한다.
- 신규 공전 기능 때문에 draw call / geometry 수가 증가하지 않아야 한다.

### v0.0.29

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.29.zip`_


Interactive AI/Data Network portfolio main scene.

## v0.0.27 — Visual Gap Audit I / Dynamic River Backbone

- 7개 Main River Backbone을 정적 Tube에서 **동적 Ribbon Geometry**로 교체했습니다.
- Backbone 양 끝 topology anchor는 유지하고 중간 구간만 slow wave / breathing / shear / depth motion으로 변형합니다.
- 밝고 굵은 River가 24Hz geometry budget 안에서 직접 움직입니다.
- leader Packet은 동일 `deformRiverPoint()`를 공유하여 순간적으로 변형된 River 경로를 따라갑니다.
- 기존 98 Spatial Highway / Dynamic Strand / Packet / Adaptive Quality는 누적 유지합니다.
- Performance Guard XIV: 동적 굵은 River는 7개로 제한하고 34 samples / 24Hz로 budget을 고정합니다.


## v0.0.25

- Visual Polish pass: Core / Hub / Stream brightness hierarchy and restrained bloom
- Data River visual hierarchy: 7 River Backbones + 98 spatial lanes + dynamic strands + packet flow
- Portfolio-safe content integration via `components/portfolioContent.ts`
- Node IA / HUD / navigation use the shared content source
- Existing responsive/mobile scene and Adaptive Performance tiers retained
- Performance Guard XIII: visual density is added selectively instead of multiplying all geometry

## Run

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run build
npm run start
```

> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.30

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.30.zip`_



`Main Hub icon만 이동`하면 실패다. Hub가 이동할 때 주변 Platform / Ring / Local Infrastructure / Local Topology가 함께 이동해야 하며, AI Core에서 해당 Hub로 이어지는 Dynamic River / Strand / Packet은 현재 orbital endpoint를 향해 계속 재구성되어야 한다.

### v0.0.31

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.31.zip`_


- [ ] In a 10–20 second observation, no scene-space element should read as a frozen decorative image.
- [ ] Seven hubs must visibly have different orbital timing; they must not look synchronized.
- [ ] Hub ecosystems must not collapse into a single cluster during normal orbit.
- [ ] River geometry, strands and packets must remain visibly dynamic while endpoints follow the moving ecosystems.
- [ ] The scene must read in the order `AI Core → Dynamic River → Main Hub → Local Ecosystem → Micro Detail`.
- [ ] Browser telemetry must be checked before Production Validation.

### v0.0.32

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.32.zip`_


Interactive AI/Data Network portfolio main scene.

## v0.0.27 — Visual Gap Audit I / Dynamic River Backbone

- 7개 Main River Backbone을 정적 Tube에서 **동적 Ribbon Geometry**로 교체했습니다.
- Backbone 양 끝 topology anchor는 유지하고 중간 구간만 slow wave / breathing / shear / depth motion으로 변형합니다.
- 밝고 굵은 River가 24Hz geometry budget 안에서 직접 움직입니다.
- leader Packet은 동일 `deformRiverPoint()`를 공유하여 순간적으로 변형된 River 경로를 따라갑니다.
- 기존 98 Spatial Highway / Dynamic Strand / Packet / Adaptive Quality는 누적 유지합니다.
- Performance Guard XIV: 동적 굵은 River는 7개로 제한하고 34 samples / 24Hz로 budget을 고정합니다.


## v0.0.25

- Visual Polish pass: Core / Hub / Stream brightness hierarchy and restrained bloom
- Data River visual hierarchy: 7 River Backbones + 98 spatial lanes + dynamic strands + packet flow
- Portfolio-safe content integration via `components/portfolioContent.ts`
- Node IA / HUD / navigation use the shared content source
- Existing responsive/mobile scene and Adaptive Performance tiers retained
- Performance Guard XIII: visual density is added selectively instead of multiplying all geometry

## Run

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run build
npm run start
```

> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.33

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.33.zip`_



- [x] 기존 Local Orbital Motion 유지 — Hub 기준 위치를 잃지 않음
- [x] 7 Hub에 반투명 Energy Shell 추가
- [x] Hub별 wireframe outer shell 추가
- [x] 서로 다른 축/속도로 회전하는 Multi Orbital Ring 추가
- [x] Hub별 3개 Local Satellite 추가 및 독립 회전
- [x] Hub 주변 Local Spark 계층 추가
- [x] 기존 HubGlyph를 중심 구조물로 유지하여 영역별 식별성 보존
- [x] 기존 LocalTopology / OrbitalEcosystem / Dynamic River endpoint 추적 누적 유지
- [x] `STATIC WORLD = 0` 유지 — 신규 Satellite/Ring/Spark도 모두 autonomous motion 보유
- [x] 신규 시각 요소는 Main Core보다 낮은 emissive hierarchy로 제한
- [ ] 실제 브라우저에서 Hub가 단순 polygon이 아니라 하나의 작은 시스템으로 읽히는지 검수
- [ ] Hub detail 증가 후 FPS/메모리 회귀 검수

### v0.0.34

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.34.zip`_



> 0.0.33 실제 브라우저 검수에서 화면 버전 메타데이터가 0.0.28로 남아 있던 패키징 정합성 문제를 확인했다. 0.0.34부터 화면/패키지 버전은 `components/version.ts`를 단일 기준으로 사용한다.

- [x] `package.json` / 화면 Footer / 상단 Runtime Hint 버전 정합성 수정
- [x] `components/version.ts` 단일 Runtime Version Source 추가
- [x] 7개 Main Hub 각각에 3개의 Local Moon/Satellite 추가
- [x] Moon마다 독립 반경 / phase / inclination / angular velocity 적용
- [x] 일부 Moon 역방향 공전으로 반복감 완화
- [x] Main Hub의 Local Orbital Motion과 Moon Orbit을 계층적으로 결합
- [x] Dynamic Ambient shard/body 밀도 확대
- [x] 원거리 Distant Orbital Colony 계층 추가
- [x] 원거리 Colony도 drift/orbit/rotation 적용 — 정적 Scene Object 금지 유지
- [x] HIGH/BALANCED/LOW 품질별 Environment 개수 LOD 유지
- [x] v0.0.33의 Hub System 2.0 / Dynamic River / Proximity / HUD 누적 유지

### v0.0.35

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.35.zip`_


**Release:** Energy River 3.0 + Roadmap Rebase

## 이번 버전

- `IMPLEMENTATION_ROADMAP.md`를 0.0.1부터 현재까지 단일 순차 이력으로 전면 정리했습니다.
- 실패/수정이 있었던 0.0.28~0.0.31도 삭제하지 않고 변경 흔적으로 보존했습니다.
- Dynamic River를 Halo / Energy Body / White-hot Core 3계층으로 확장했습니다.
- 세 계층은 서로 다른 phase로 변형되어 하나의 고정된 굵은 선처럼 보이지 않습니다.
- 기존 Local Orbit, 3 Local Moons per Hub, Dynamic Ambient Field, Adaptive Quality를 유지합니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 확인합니다.

## 검수 포인트

1. 좌측 하단 release가 `v0.0.35 · ENERGY RIVER 3.0 + ROADMAP REBASE`인지 확인합니다.
2. AI Core와 각 Hub 사이 굵은 River가 Halo/Body/Core의 복수 광량 계층으로 보이는지 확인합니다.
3. River 전체가 천천히 굽고 호흡하면서 그 위의 가는 Strand/Packet은 더 빠르게 움직이는지 확인합니다.
4. 각 Hub가 원래 자리 주변에서만 Local Orbit하고 3개의 Moon이 서로 다른 궤도로 도는지 확인합니다.
5. `IMPLEMENTATION_ROADMAP.md`의 0.0.1~0.0.35 이력이 순차적으로 존재하는지 확인합니다.

### v0.0.36

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.36.zip`_


## Core + Hub Material Pass

이번 버전은 목표 시안과의 재질/광량 격차를 줄이는 Visual Quality 단계입니다.

- AI Core corona / energy atmosphere / clearcoat material 강화
- 7 Main Hub emissive shell / clearcoat / local light 강화
- Hub 주변 orbital station infrastructure 추가
- Main ring / secondary ring / spark hierarchy 강화
- 기존 Local Moon 3개 / Local Orbit / Energy River 3.0 / Dynamic Ambient 누적 유지
- STATIC WORLD = 0 원칙 유지
- Performance Guard XXI

실행:

```bash
npm install
npm run dev
```

다음 버전은 `0.0.37 Composition & Depth Pass`입니다.

### v0.0.37

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.37.zip`_


## Composition + Depth Pass

이번 버전은 목표 시안과의 재질/광량 격차를 줄이는 Visual Quality 단계입니다.

- AI Core corona / energy atmosphere / clearcoat material 강화
- 7 Main Hub emissive shell / clearcoat / local light 강화
- Hub 주변 orbital station infrastructure 추가
- Main ring / secondary ring / spark hierarchy 강화
- 기존 Local Moon 3개 / Local Orbit / Energy River 3.0 / Dynamic Ambient 누적 유지
- STATIC WORLD = 0 원칙 유지
- Performance Guard XXI

실행:

```bash
npm install
npm run dev
```

다음 버전은 `0.0.37 Composition & Depth Pass`입니다.

### v0.0.38

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.38.zip`_


## Performance Optimization II + Performance Guard XXIII

`v0.0.33~0.0.37`에서 올린 시각 품질을 유지하면서 CPU-side animation/update 비용을 줄이는 최적화 버전입니다.

### 주요 변경
- Dynamic River sample/update budget을 HIGH/BALANCED/LOW와 연동
- Packet instance density 및 update rate 단계화
- Ambient / Foreground / Mid Relay transform update throttling
- 기존 Local Orbit, Hub Moon System, Energy River 3.0, Dynamic Background 유지
- 기존 Adaptive Quality / DPR LOD 유지

### 실행
```bash
npm install
npm run dev
```

PERF 패널에서 AUTO/HIGH/BALANCED/LOW별 FPS, frame time, draw calls, triangles를 비교할 수 있습니다.

### v0.0.39

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.39.zip`_


## Visual Gap Audit III + Performance Guard XXIII

`v0.0.33~0.0.37`에서 올린 시각 품질을 유지하면서 CPU-side animation/update 비용을 줄이는 최적화 버전입니다.

### 주요 변경
- Dynamic River sample/update budget을 HIGH/BALANCED/LOW와 연동
- Packet instance density 및 update rate 단계화
- Ambient / Foreground / Mid Relay transform update throttling
- 기존 Local Orbit, Hub Moon System, Energy River 3.0, Dynamic Background 유지
- 기존 Adaptive Quality / DPR LOD 유지

### 실행
```bash
npm install
npm run dev
```

PERF 패널에서 AUTO/HIGH/BALANCED/LOW별 FPS, frame time, draw calls, triangles를 비교할 수 있습니다.


## v0.0.39 Visual Gap Audit III
- Dynamic Energy Knot layer added to the seven main Energy Rivers.
- Moving Ambient Halo Arcs fill negative space without static scenery.
- Existing Core / Hub / Moon / Dynamic-only environment and adaptive performance remain cumulative.
- Next: v0.0.40 Production Validation.

### v0.0.40

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.40.zip`_


## Production Validation + Performance Guard XXV

`v0.0.39`의 시각 품질을 유지하면서 Production 배포 경로와 버전 정합성을 고정하는 검증 버전입니다.

### 이번 버전
- `package.json` / UI version source / README / Roadmap을 `0.0.40`으로 정합화
- `NEXT_PUBLIC_BASE_PATH` 기반 GitHub Pages 하위 경로 지원
- `basePath`와 `assetPrefix`를 동일 값으로 관리
- `output: 'export'`, `trailingSlash`, `images.unoptimized` 유지
- dependency-free `npm run validate` 검증 스크립트 추가
- 기존 AI Core / 7 Hub / Local Moon / Energy River / Dynamic Environment / Adaptive Quality 유지
- Performance Guard XXV

### 로컬 실행
```bash
npm install
npm run validate
npm run dev
```

### Production build
루트 배포:
```bash
npm run build
```

GitHub Pages 하위 경로 배포 예시:
```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

Windows PowerShell:
```powershell
$env:NEXT_PUBLIC_BASE_PATH='/portfolio'

> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.41

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.41.zip`_


## Production Validation + Performance Guard XXV

`v0.0.39`의 시각 품질을 유지하면서 Production 배포 경로와 버전 정합성을 고정하는 검증 버전입니다.

### 이번 버전
- `package.json` / UI version source / README / Roadmap을 `0.0.41`으로 정합화
- `NEXT_PUBLIC_BASE_PATH` 기반 GitHub Pages 하위 경로 지원
- `basePath`와 `assetPrefix`를 동일 값으로 관리
- `output: 'export'`, `trailingSlash`, `images.unoptimized` 유지
- dependency-free `npm run validate` 검증 스크립트 추가
- 기존 AI Core / 7 Hub / Local Moon / Energy River / Dynamic Environment / Adaptive Quality 유지
- Performance Guard XXV

### 로컬 실행
```bash
npm install
npm run validate
npm run dev
```

### Production build
루트 배포:
```bash
npm run build
```

GitHub Pages 하위 경로 배포 예시:
```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

Windows PowerShell:
```powershell
$env:NEXT_PUBLIC_BASE_PATH='/portfolio'

> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.42

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.42.zip`_


## Production Validation + Performance Guard XXV

`v0.0.39`의 시각 품질을 유지하면서 Production 배포 경로와 버전 정합성을 고정하는 검증 버전입니다.

### 이번 버전
- `package.json` / UI version source / README / Roadmap을 `0.0.42`으로 정합화
- `NEXT_PUBLIC_BASE_PATH` 기반 GitHub Pages 하위 경로 지원
- `basePath`와 `assetPrefix`를 동일 값으로 관리
- `output: 'export'`, `trailingSlash`, `images.unoptimized` 유지
- dependency-free `npm run validate` 검증 스크립트 추가
- 기존 AI Core / 7 Hub / Local Moon / Energy River / Dynamic Environment / Adaptive Quality 유지
- Performance Guard XXV

### 로컬 실행
```bash
npm install
npm run validate
npm run dev
```

### Production build
루트 배포:
```bash
npm run build
```

GitHub Pages 하위 경로 배포 예시:
```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

Windows PowerShell:
```powershell
$env:NEXT_PUBLIC_BASE_PATH='/portfolio'

> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.43

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.43.zip`_


## Production Validation + Performance Guard XXV

`v0.0.39`의 시각 품질을 유지하면서 Production 배포 경로와 버전 정합성을 고정하는 검증 버전입니다.

### 이번 버전
- `package.json` / UI version source / README / Roadmap을 `0.0.43`으로 정합화
- `NEXT_PUBLIC_BASE_PATH` 기반 GitHub Pages 하위 경로 지원
- `basePath`와 `assetPrefix`를 동일 값으로 관리
- `output: 'export'`, `trailingSlash`, `images.unoptimized` 유지
- dependency-free `npm run validate` 검증 스크립트 추가
- 기존 AI Core / 7 Hub / Local Moon / Energy River / Dynamic Environment / Adaptive Quality 유지
- Performance Guard XXV

### 로컬 실행
```bash
npm install
npm run validate
npm run dev
```

### Production build
루트 배포:
```bash
npm run build
```

GitHub Pages 하위 경로 배포 예시:
```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

Windows PowerShell:
```powershell
$env:NEXT_PUBLIC_BASE_PATH='/portfolio'

> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.44

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.44.zip`_


## Production Validation + Performance Guard XXV

`v0.0.39`의 시각 품질을 유지하면서 Production 배포 경로와 버전 정합성을 고정하는 검증 버전입니다.

### 이번 버전
- `package.json` / UI version source / README / Roadmap을 `0.0.44`으로 정합화
- `NEXT_PUBLIC_BASE_PATH` 기반 GitHub Pages 하위 경로 지원
- `basePath`와 `assetPrefix`를 동일 값으로 관리
- `output: 'export'`, `trailingSlash`, `images.unoptimized` 유지
- dependency-free `npm run validate` 검증 스크립트 추가
- 기존 AI Core / 7 Hub / Local Moon / Energy River / Dynamic Environment / Adaptive Quality 유지
- Performance Guard XXV

### 로컬 실행
```bash
npm install
npm run validate
npm run dev
```

### Production build
루트 배포:
```bash
npm run build
```

GitHub Pages 하위 경로 배포 예시:
```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

Windows PowerShell:
```powershell
$env:NEXT_PUBLIC_BASE_PATH='/portfolio'

> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.45

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.45.zip`_


## Production Validation + Performance Guard XXV

`v0.0.39`의 시각 품질을 유지하면서 Production 배포 경로와 버전 정합성을 고정하는 검증 버전입니다.

### 이번 버전
- `package.json` / UI version source / README / Roadmap을 `0.0.44`으로 정합화
- `NEXT_PUBLIC_BASE_PATH` 기반 GitHub Pages 하위 경로 지원
- `basePath`와 `assetPrefix`를 동일 값으로 관리
- `output: 'export'`, `trailingSlash`, `images.unoptimized` 유지
- dependency-free `npm run validate` 검증 스크립트 추가
- 기존 AI Core / 7 Hub / Local Moon / Energy River / Dynamic Environment / Adaptive Quality 유지
- Performance Guard XXV

### 로컬 실행
```bash
npm install
npm run validate
npm run dev
```

### Production build
루트 배포:
```bash
npm run build
```

GitHub Pages 하위 경로 배포 예시:
```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

Windows PowerShell:
```powershell
$env:NEXT_PUBLIC_BASE_PATH='/portfolio'

> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.46

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.46.zip`_


- 0.0.43에서 실제 브라우저 실행 중 `DistantOrbitalColonies.useFrame`의 `cfg[i]`가 undefined가 되는 오류가 확인되었다.
- 원인: Adaptive Quality로 `count`가 감소한 뒤 `groups.current`에 이전 ref가 남아 `cfg` 길이보다 많은 인덱스를 순회했다.
- 조치: variable-count ref loop에 bounds guard를 추가하고 unmount 시 stale ref를 제거한다.
- Build/TypeScript 성공과 runtime frame-loop 검증을 별도 검증 항목으로 관리한다.

### v0.0.47

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.47.zip`_


## Production Validation + Performance Guard XXV

`v0.0.39`의 시각 품질을 유지하면서 Production 배포 경로와 버전 정합성을 고정하는 검증 버전입니다.

### 이번 버전
- `package.json` / UI version source / README / Roadmap을 `0.0.44`으로 정합화
- `NEXT_PUBLIC_BASE_PATH` 기반 GitHub Pages 하위 경로 지원
- `basePath`와 `assetPrefix`를 동일 값으로 관리
- `output: 'export'`, `trailingSlash`, `images.unoptimized` 유지
- dependency-free `npm run validate` 검증 스크립트 추가
- 기존 AI Core / 7 Hub / Local Moon / Energy River / Dynamic Environment / Adaptive Quality 유지
- Performance Guard XXV

### 로컬 실행
```bash
npm install
npm run validate
npm run dev
```

### Production build
루트 배포:
```bash
npm run build
```

GitHub Pages 하위 경로 배포 예시:
```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

Windows PowerShell:
```powershell
$env:NEXT_PUBLIC_BASE_PATH='/portfolio'

> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.48

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.48.zip`_


## Production Validation + Performance Guard XXV

`v0.0.39`의 시각 품질을 유지하면서 Production 배포 경로와 버전 정합성을 고정하는 검증 버전입니다.

### 이번 버전
- `package.json` / UI version source / README / Roadmap을 `0.0.44`으로 정합화
- `NEXT_PUBLIC_BASE_PATH` 기반 GitHub Pages 하위 경로 지원
- `basePath`와 `assetPrefix`를 동일 값으로 관리
- `output: 'export'`, `trailingSlash`, `images.unoptimized` 유지
- dependency-free `npm run validate` 검증 스크립트 추가
- 기존 AI Core / 7 Hub / Local Moon / Energy River / Dynamic Environment / Adaptive Quality 유지
- Performance Guard XXV

### 로컬 실행
```bash
npm install
npm run validate
npm run dev
```

### Production build
루트 배포:
```bash
npm run build
```

GitHub Pages 하위 경로 배포 예시:
```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

Windows PowerShell:
```powershell
$env:NEXT_PUBLIC_BASE_PATH='/portfolio'

> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.49

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.49.zip`_


## Depth & Lighting 2.0 + Performance Guard XXXIII

`v0.0.48`의 Particle & Energy FX를 유지하면서 전경/중경/후경이 같은 밝기로 겹쳐 보이는 문제를 정리하는 Detail Polish 버전입니다.

### 이번 버전
- Key / Rim / Core / Deep fill을 분리한 Lighting Hierarchy 2.0
- 전체 ambient light를 낮춰 Core와 Hub의 자체 emissive identity 강화
- Foreground silhouette는 더 어둡게 만들어 시차는 유지하되 콘텐츠를 가리지 않도록 조정
- Mid-depth Relay의 명도와 halo를 낮춰 Main Hub와 경쟁하지 않도록 조정
- Distant Colony의 emissive/ring/satellite 명도를 낮춰 Deep Background로 후퇴
- Fog near/far 재조정으로 Main Network와 Deep Background 분리
- Bloom threshold/smoothing 재조정으로 흰색 뭉침을 줄이고 밝은 FX의 중심부를 보존
- 0.0.46 runtime stale-ref guard와 0.0.48 Primary Energy Pulse 유지

### 로컬 실행
```powershell
npm install
npm run validate
npm run build
npm run dev
```

브라우저: `http://localhost:3000`

캐시 초기화가 필요하면:
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

### 다음 단계
`v0.0.50 — HUD Detail Pass`: 3D World와 HUD/Label/Telemetry의 선, 테두리, 정보 밀도와 시각 언어를 통합합니다.

### v0.0.50

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.50.zip`_


## HUD Detail Pass + Performance Guard XXXIII

`v0.0.48`의 Particle & Energy FX를 유지하면서 전경/중경/후경이 같은 밝기로 겹쳐 보이는 문제를 정리하는 Detail Polish 버전입니다.

### 이번 버전
- Key / Rim / Core / Deep fill을 분리한 Lighting Hierarchy 2.0
- 전체 ambient light를 낮춰 Core와 Hub의 자체 emissive identity 강화
- Foreground silhouette는 더 어둡게 만들어 시차는 유지하되 콘텐츠를 가리지 않도록 조정
- Mid-depth Relay의 명도와 halo를 낮춰 Main Hub와 경쟁하지 않도록 조정
- Distant Colony의 emissive/ring/satellite 명도를 낮춰 Deep Background로 후퇴
- Fog near/far 재조정으로 Main Network와 Deep Background 분리
- Bloom threshold/smoothing 재조정으로 흰색 뭉침을 줄이고 밝은 FX의 중심부를 보존
- 0.0.46 runtime stale-ref guard와 0.0.48 Primary Energy Pulse 유지

### 로컬 실행
```powershell
npm install
npm run validate
npm run build
npm run dev
```

브라우저: `http://localhost:3000`

캐시 초기화가 필요하면:
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

### 다음 단계
`v0.0.50 — HUD Detail Pass`: 3D World와 HUD/Label/Telemetry의 선, 테두리, 정보 밀도와 시각 언어를 통합합니다.



> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.51

_출처: 해당 버전 원본 ZIP을 확인할 수 없어 기록을 복원하지 못했습니다. · `원본 미확인`_



### v0.0.52

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.52.zip`_



비교 기준: 초기 목표 시안(고밀도 cinematic AI network dashboard)과 0.0.40 실제 브라우저 캡처, 이후 0.0.41~0.0.52 누적 변경.

- Composition / topology: 약 80~85% 도달. 중앙 AI + 7 Hub + 방사형 River 구조는 목표와 같은 문법에 진입.
- Object detail: 약 65~70%. Hub identity는 분리됐지만 목표 시안의 건축물/장치 수준 micro-detail은 아직 부족.
- Energy River: 약 65~70%. 다층 Pulse/Trail은 개선됐으나 목표의 braided luminous river와 volumetric light density에는 미달.
- Background world density: 약 60~65%. 동적 객체는 많지만 목표처럼 의미 있는 infrastructure/network architecture로 읽히는 비율이 낮음.
- Lighting / cinematic depth: 약 70~75%. depth 계층은 생겼으나 목표의 강한 bloom contrast, local illumination, atmospheric scattering이 부족.
- HUD / information density: 약 65~70%. 디자인 언어는 맞지만 목표의 실제 dashboard 수준 정보량/정돈도는 아직 부족.
- Motion / interaction: 약 75~80%. autonomous/local motion은 충분하지만 interaction choreography는 0.0.53에서 추가 개선 필요.

### v0.0.53

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.53.zip`_


- Focus Hub의 Local Ecosystem에 2개의 회전하는 Energy Focus Ring과 광학 Aura를 추가.
- 선택 상태 진입/해제 시 매 프레임 damping으로 크기가 부드럽게 변화하며 정지된 오브젝트를 추가하지 않음.
- 기존 Moon/Local Topology/River의 activeId 연동 및 HUD Context 유지.
- 남은 과제: River의 국소 광량 변화와 Moon 반응의 개별 애니메이션은 실브라우저 시각 검증 후 후속 개선.
- 검증 상태: 정적 소스 검증 수행; 브라우저 hover/click/성능 실측은 별도 필요.

### v0.0.54

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.54.zip`_



- 기존 0.0.1~0.0.53 이력 보존. 0.0.54 항목 완료 표시.
- 실제 v0.0.40 캡처에서 확인된 중앙 AI/Study 간격과 좌측 Hub 군집, 우측 상하 간격을 기준으로 7개 Hub 앵커를 소폭 재배치.
- Hub 앵커를 사용하는 Local Orbit, River endpoint, ProjectionBridge가 같은 위치 기준을 공유하도록 기존 구조 유지.
- 중앙 Core scale 1.07 → 1.045, scene vertical offset 0.62 → 0.56으로 화면 내 시각적 간섭 완화.
- 실제 FHD/QHD/모바일 브라우저 검증은 미완료이며 다음 0.0.55에서 확인 필요.

### v0.0.55

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.55.zip`_


- 기존 0.0.1~0.0.54 버전 이력 보존. viewport profile별 CameraRig와 3D projection/scene scale을 같은 값으로 동기화.
- Portrait/Landscape는 카메라 거리를 늘리고 장면 스케일을 낮춰 중심 객체 과밀을 완화. Laptop은 scene scale 0.93 적용.
- 좁은 화면의 HUD safe-zone, 짧은 landscape 높이, 380px 이하 nav/label을 별도 보정.
- 실제 FHD/QHD/4K/21:9/모바일 장치 캡처 및 FPS 실측은 아직 수행하지 않았으므로 검증 완료로 간주하지 않음.

### v0.0.56

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.56.zip`_


- 0.0.1~0.0.55 기존 기록 보존. DynamicRiver의 sampleCount별 typed array/index memo 의존성 수정(품질 단계 변경 시 버퍼 길이 일치).
- DynamicRiver ribbon 정점 계산에서 샘플당 Vector3 clone 2회와 normal 생성 1회를 제거하고 scratch normal 및 좌표 직접 대입으로 임시 객체 할당 감소.
- DynamicStarfield는 HIGH 30Hz / BALANCED 22Hz / LOW 14Hz로 업데이트 빈도 제한. 자율 움직임은 유지하며 프레임별 CPU/버퍼 업로드 부담을 줄이는 목적.
- 기존 InstancedMesh, 동적 River, Moon, Hub Identity 및 시각적 효과 유지.
- 검증 범위: 정적 버전 검사/ZIP 무결성. 실제 GPU/CPU/FPS 및 시각적 동등성은 브라우저 실측 전까지 미검증.
- 다음: 0.0.57 Visual Gap Audit IV.

### v0.0.57

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.57.zip`_



- Corrected 7 technical-domain hubs to the 8 GitBlog menu hubs: Profile, Career, Projects, Portfolio, GitHub, Expertise, Training, Archive.
- Sidebar, overlay metadata, 3D anchor array and orbit map now share the same eight identities.
- The previously generated reference image was replaced with the corrected 8-hub official target.
- Existing historical roadmap entries retained.
- Still pending: verified live GitBlog URL mapping, real browser visual comparison, WebGL runtime/quality-switch tests.
- Next: v0.0.58 interaction and navigation route integration, then visual detail passes.

### v0.0.58

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.58.zip`_


- Eight primary GitBlog hubs retained; hub/sidebar/detail panel share `portfolioHubs`.
- Removed fake `history.pushState` hash navigation that suggested nonexistent in-app routes.
- Added optional external GitBlog URL configuration and disabled link when unconfigured.
- Pending: verify actual GitBlog section URLs and run browser interaction/responsive tests.
- This version does not claim cinematic visual parity or full end-to-end validation.

### v0.0.59

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.59.zip`_


- [x] React duplicate key warning in `LocalTopology`: repeated `PORTFOLIO` labels were used as sibling keys. Replaced with stable per-hub indexed keys (`${n.id}-topology-${i}`).
- [x] Display 01–08 on 3D hub labels, selected information heading and active context. Sidebar numbering retained.
- [x] Maintain the eight GitBlog hubs and the prior visual target.
- [ ] Browser runtime and screenshot regression test required; static validation is not a substitute.

### v0.0.60

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.60.zip`_



- Preserved all prior version history and eight GitBlog navigation hubs.
- Replaced legacy domain-specific inner hub glyphs with eight GitBlog-specific 3D emblems.
- Added layered metallic docking platforms, animated segmented luminous rings, antenna arrays and individual station rotors to each hub.
- Reduced opaque wireframe shell visual dominance; local moon, energy river, topology, motion and HUD remain.
- Official visual target remains `docs/visual-reference/official-visual-target.png`. This is an incremental visual convergence, not visual parity.
- Validation: source validator / ZIP integrity; browser FPS and rendering require local inspection.

### v0.0.61

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.61.zip`_


- Replaced the unexplained diamond-shaped silhouette with an identifiable animated relay: metallic frame, illuminated core, antennas, beacon and orbital loop.
- One relay per GitBlog hub (8 total), with independent local movement and hub-specific colors.
- Preserved prior roadmap history and the official visual reference.
- Runtime browser and FPS verification remain pending; source-level validation is not visual validation.

### v0.0.62

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.62.zip`_


- [x] Replaced the former tilted square relay outline with a distinct six-sided mechanical communication relay.
- [x] Added six illuminated relay fins and eight station hull ribs with light strips.
- [x] Offset relay from hub shell to improve readability and avoid overlap with moon orbits.
- [x] Reduced visually noisy shell wireframe and local topology octahedrons.
- [x] Kept the official visual target and full historical roadmap; no redesign of navigation.
- [ ] Actual browser screenshots, FPS, and interactive runtime verification still required.

### v0.0.63

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.63.zip`_


- [x] Added an independently phase-shifted fourth hot filament layer to each live River backbone.
- [x] Changed formerly white backbone lanes to hub-color-biased strands; adjusted strand widths and opacity.
- [x] Raised moving core contrast without increasing the number of WebGL objects per river beyond one extra ribbon.
- [x] Retained 8 GitBlog hubs, satellite stations, local orbits and official target image.
- [ ] Metallic station material pass and actual browser visual/FPS measurements remain pending; version title represents the planned combined focus, not full parity.

### v0.0.64

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.64.zip`_



- [x] User screenshot v0.0.63 reviewed: 8 hubs visible, gray river persists, satellite too icon-like, excessive debris and overlapping labels, HUD shows 14 FPS.
- [x] Station chassis revised to low-poly metallic dock with eight menu-specific arm counts/lengths and additional structure groups; do not claim full cinematic parity.
- [x] Relay size increased and offset; reduced local wireframe dominance, sparkles, and duplicate station struts.
- [x] Set `dev` and `build` to Webpack (`--webpack`) to work around reported Turbopack internal panic; this does not prove the original bug fixed.
- [x] Preserve official target and full version history; reconcile stale roadmap rows for 0.0.57–0.0.59.
- [ ] Measure real FPS on user machine and inspect latest screenshot for label occlusion, relay visibility, visual regressions and performance; 14 FPS is a screenshot observation, not a benchmark.
- [ ] Confirm production build, real GitBlog route targets, and browser behavior before 0.1.0.

### v0.0.65

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.65.zip`_



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
- [ ] v0.1.0: first release after runtime acceptance.

### v0.0.66

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.66.zip`_



- [x] Quality-aware key, rim and depth light hierarchy with metallic station readability in mind.
- [x] LOW removes both optional dynamic point lights; BALANCED uses one, HIGH uses two.
- [x] Raise bloom luminance threshold, lower bloom smoothing and vignette darkness to reduce overexposed haze.
- [x] Preserve eight GitBlog hubs, relay satellites, motion, energy rivers, Webpack fallback, official target image and previous roadmap.
- [ ] Measure real FPS / calls / triangles and capture HIGH, BALANCED, LOW screenshots on target Windows PC.
- [ ] v0.0.67: HUD/labels and interaction; v0.0.68: target-image comparison; v0.0.69: runtime acceptance; v0.0.70: deployment.

### v0.0.67

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.67.zip`_


- [x] Improve readability of 8 projected labels using centered translucent contrast-backed overlays, larger subtitles and focused outlines.
- [x] Remove the leftover CSS `hub:before` diamond decoration that was unrelated to the actual 3D Orbital Relay.
- [x] Pin selection when a hub or sidebar item is clicked, synchronize selected navigation styling, and provide an explicit close control.
- [x] Allow the detail panel to scroll rather than silently clipping domain and evidence rows.
- [x] Preserve eight GitBlog menus, 3D world, quality modes, Webpack fallback and official visual target.
- [ ] Run full Next.js production build and interactive browser regression; not confirmed in this packaging environment.
- [ ] v0.0.68: compare screenshot with official target and prioritize remaining visual differences.
- [ ] v0.0.69: browser and FPS acceptance tests.
- [ ] v0.0.70: GitHub Pages static export and verified real navigation routes.

### v0.0.68

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.68.zip`_


- [x] Preserve the eight-menu GitBlog navigation and all previously implemented structures.
- [x] Correct the Portfolio emblem's remaining stacked 45-degree wireframe diamonds: replace with solid metallic content panels and thin lit header rails. This is distinct from the CSS pseudo-element removed in v0.0.67.
- [x] Rebalance Energy River materials: reduce wide body opacity and thickness; emphasize narrow hub-colored core and offset filament; reduce whitening of the core.
- [x] Preserve LOW quality performance tier and Webpack fallback.
- [x] Preserve `docs/visual-reference/official-visual-target.png` and append gap-audit record.
- [ ] Real side-by-side screenshot comparison: target image is available but no v0.0.68 browser capture has been produced in this environment. Do not mark parity as complete.
- [ ] v0.0.69: browser acceptance, FPS and responsive validation (including 14 FPS regression).
- [ ] v0.0.70: GitHub Pages static export and actual URL validation.
- [ ] v0.1.0: release only after validated acceptance.

### v0.0.69

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.69.zip`_


- [x] Add 20-second local FPS, p95 frame-time, draw-call and triangle sampling inside PERF panel.
- [x] Provide JSON report copy for reproducible comparison between HIGH, BALANCED and LOW.
- [x] Cancel active measurement when the selected quality mode changes to avoid mixed manual-tier results.
- [x] Document repeatable desktop/mobile viewport, navigation, console-error and visual-target acceptance steps.
- [x] Preserve original 0.0.1–0.0.68 roadmap and official target image.
- [ ] Run actual Windows browser 20-second captures for each tier; 14 FPS regression unresolved until measured.
- [ ] Verify successful Next.js Webpack build and all eight interactive destinations.
- [ ] v0.0.70: GitHub Pages export, routing and live navigation verification.
- [ ] v0.1.0: release only after runtime acceptance and visual parity review.

### v0.0.70

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.70.zip`_


- [x] Compare v0.0.69 screenshots with packaged official visual target.
- [x] Replace blocking hub cards with compact labels above station silhouettes.
- [x] Move node details to right-side drawer; show only after explicit selection.
- [x] Rebuild bottom HUD as four functional sections (real-time metrics, network traffic, render resource, active context).
- [x] Use observed WebGL FPS/frame/calls/triangles/geometry/texture data, not invented CPU/GPU readings.
- [ ] Local browser screenshot acceptance (user environment).
- [ ] Webpack production build and FPS improvement confirmation.
- [ ] Future: v0.0.71 GPU/CPU profiling, v0.0.72 rivers, v0.0.73 station silhouette, v0.0.74 environment, v0.0.75 visual gap audit, v0.0.76 validation, v0.0.77 GitHub Pages deployment, v0.1.0 release.

### v0.0.71

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.71.zip`_


- [x] Replace generic front-of-hub emblems with eight unique 3D geometric symbols: person, career tower, modules, portfolio layers, git branches, neural nodes, graduation cap, archive cabinet.
- [x] Fix REAL-TIME METRICS collision: legacy `.hudStatus` two-column grid was conflicting with new four-ring layout.
- [x] Keep the official reference image, all historical roadmap entries and eight-menu information architecture.
- [ ] Windows browser and Webpack production build validation required.
- [ ] Next: v0.0.72 energy rivers; v0.0.73 materials; v0.0.74 performance; v0.0.75 visual gap; v0.0.76 acceptance; v0.0.77 Pages deployment.

### v0.0.72

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.72.zip`_


- [x] Replaced repeated 24-per-hub peripheral infrastructure meshes with a single InstancedMesh per hub (HIGH/BALANCED).
- [x] LOW quality avoids all OrbitalEcosystem peripheral infrastructure and 8 per-hub point lights.
- [x] LOW quality omits the secondary DynamicStreamField and RiverEnergyKnots while preserving 8 main DynamicRiver backbones and RiverPulseTrain.
- [x] Reduced secondary dynamic highway sampling in BALANCED/HIGH.
- [x] Boosted colored energy ribbon width, core intensity and hub emissive visibility for non-bloom LOW mode.
- [ ] Measure FPS, GPU use, Draw Calls and frame-time on GTX 660 (2GB) and RX 7900 GRE; performance gain is NOT yet verified.
- [ ] Confirm actual browser visuals against docs/visual-reference/official-visual-target.png and check readability.
- [ ] v0.0.73: station metal material and differentiated structural silhouettes; v0.0.74: further profiling and visual cleanup; v0.0.75: visual audit.

### v0.0.73

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.73.zip`_



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

### v0.0.74

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.74.zip`_


- [x] Set the latest user-approved cinematic singularity composition as the official reference image.
- [x] Replace uniform dark torus-stack disk with a lightweight animated spiral/radial accretion shader.
- [x] Preserve small lights; transform them into slowly orbiting elliptical photon/energy particles (one Points draw call).
- [x] Reinforce black event horizon and crisp photon rim; reduce distracting outer mechanical rings.
- [x] Keep click activation localized to the singularity and orbital lights.
- [ ] Verify real GTX 660 browser FPS and screenshot versus new official image.
- [ ] Continue improving disk depth, front/back occlusion, station materials and cosmic background without hiding the 8 GitBlog hubs.

### v0.0.75

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.75.zip`_


- [x] Rework accretion shader into non-uniform turbulent spiral filaments with cyan/ice/violet color transitions and asymmetric disk lighting.
- [x] Increase accretion disk footprint and tilt to avoid a flat target-like ring stack.
- [x] Add two low-cost partial gravitational lens arcs; no ray-tracing or postprocessing required in LOW.
- [x] Retain and improve orbital light particles with varied ellipse inclinations, 46 LOW / 84 BALANCED / 124 HIGH, batched as a single Points draw call.
- [x] Preserve official user-approved reference image and eight navigation hubs.
- [ ] Actual Windows GTX 660 screenshot / FPS and browser build validation required.
- [ ] v0.0.76: compare with official reference, improve metallic containment, verify shader transparency/depth and performance.

### v0.0.76

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.76.zip`_


- [x] Replace the official visual target with the user-approved cinematic spiral-infall black-hole image (`docs/visual-reference/official-visual-target.png`).
- [x] Preserve the pre-existing slow orbital lights (46/84/124 by quality).
- [x] Add **112/208/320** separate inbound light particles for LOW/BALANCED/HIGH, batched in one THREE.Points draw call.
- [x] Each new particle spirals inward, accelerates angularly as its radius shrinks, and recycles outside the disk rather than disappearing permanently.
- [x] Reorient the accretion shader toward flowing spiral filaments; maintain click activation boost.
- [x] Preserve eight GitBlog menus and cumulative roadmap.
- [ ] Browser screenshot and FPS verification on GTX 660; assess CPU cost of per-frame particle position updates.

### v0.0.77

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.77.zip`_


- [x] Preserve orbit lights and use matching positive angular motion for orbit, spiral particles, accretion disk.
- [x] Replace poorly visible inbound particles with 168/280/420 larger points on LOW/BALANCED/HIGH.
- [x] Add 3/4 visible inward spiral lanes and enforce monotonically decreasing radius during each particle lifetime.
- [x] Verify mathematically that angular motion is positive and radius decreases before recycling.
- [ ] Browser visual and performance verification on GTX 660; check projected apparent direction, shader motion, clipping and visibility.
- [ ] Compare real screenshot with official target; concept art is not a browser render.

### v0.0.78

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.78.zip`_


- Clockwise screen-space angular motion unified across orbital lights, inward particles, accretion shader and disk rotation.
- Outer infall radius expanded from 2.48 to 4.05 world units; 3.4 inward turns.
- GPU point sprites vary particle size, brightness and color; large foreground bodies are preserved.
- Particle density: LOW 208, BALANCED 320, HIGH 480, plus original orbiters.
- Eight hub-colored gravitational fragments migrate from each station toward the core.
- Subtle hub motion hints at tidal pull without destroying menu positions.
- Mathematical direction, contraction and count verification in scripts/verify-spiral.mjs.
- **Pending**: real browser visual verification and GTX 660 FPS, official target gap closure.

### v0.0.79

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.79.zip`_


- [x] Replace old Core-to-Hub cable geometry with Hub-to-Core spiral paths for all 8 menus.
- [x] Align PacketSwarm, RiverEnergyKnots and RiverPulseTrain with increasing curve parameter from hub to singularity.
- [x] Spiral angular progression is clockwise in the front-facing XY plane (negative angular delta).
- [x] Live hub endpoint deformation corrected to use q=0, not q=1.
- [x] Reduce ribbon width and retain hub-colored filaments.
- [x] Add geometry regression test for start/end radii and clockwise winding.
- [ ] Visual review in browser: ensure all 8 rivers and pulses converge and do not appear to emit outward.
- [ ] Performance verification on GTX 660; capture FPS/draw calls and compare with v0.0.78.

### v0.0.80

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.80.zip`_


- [x] Preserve full historical source, eight hub names and official visual reference.
- [x] Redesign particle motion in inclined 3D disk coordinates with finite vertical thickness.
- [x] Implement decreasing radius and Kepler-inspired increasing angular velocity toward horizon.
- [x] Keep clockwise projected motion convention and orbital lights.
- [x] Separate dark 3D event horizon, thinner photon ring, front and displaced rear lens arcs.
- [x] Add `scripts/verify-physics.mjs` mathematical regression test.
- [ ] Browser screenshot comparison: target visual reference and real implementation.
- [ ] GTX 660 / RX 7900 GRE runtime FPS and depth-order check.
- [ ] Verify all eight Hub-to-Core paths visually flow inward, not outward.

### v0.0.81

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.81.zip`_


- [x] Reviewed official visual target (nebula, asteroid depth, lit station silhouettes) against user v0.0.80 screenshot.
- [x] Added quality-tiered procedural nebula backdrop with one DataTexture and one mesh.
- [x] Added muted remote orbital infrastructure to right-side and left-side negative space.
- [x] Kept central area darker to preserve black-hole contrast and 8 GitBlog menu nodes.
- [x] Kept previous 3D infall physics, hub-to-core pathways, and cumulative history.
- [ ] True volumetric accretion disk and lensing depth (v0.0.82).
- [ ] Screenshot parity comparison and real browser/GPU FPS check.

### v0.0.82

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.82.zip`_


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

### v0.0.83

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.83.zip`_


- [x] Preserve official target reference and GitBlog eight-menu information architecture.
- [x] Layer the existing plasma shader in physical 3D depth; LOW 1 / BALANCED 2 / HIGH 5 sheets.
- [x] Tune per-sheet energy to reduce white clipping in HIGH.
- [x] Add distinct front/back high-quality gravitational lens arcs.
- [x] Increase HIGH-tier accretion particle and orbital detail while retaining LOW budgets.
- [x] Increase distant starfield and environment detail in HIGH only.
- [ ] Browser screenshot and objective target-image comparison pending.
- [ ] Benchmark FPS on GTX 660 and RX 7900 GRE; AUTO may downgrade HIGH.

### v0.0.84

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.84.zip`_


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

### v0.0.85

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.85.zip`_


- [x] Define horizon, photon orbit and ISCO in scene units.
- [x] Replace arbitrary radial easing with analytically integrated inward drift.
- [x] Integrate angular advance along inward trajectory; preserve clockwise projection.
- [x] Add radius-dependent differential rotation, turbulence and asymmetric brightness to disk shader.
- [x] Reduce decorative uniform concentric torus rings.
- [x] Fade captured particles near the horizon.
- [ ] Validate live rendering on GTX 660 and RX 7900 GRE.
- [ ] Full GR ray tracing (out of scope for this release).

### v0.0.86

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.86.zip`_


- [x] Radius-dependent bounded bending for rear disk arcs
- [x] Continuous projected lens paths replace hard-coded torus arcs
- [x] Reduce containment rings and square debris
- [x] Lensing sanity test
- [ ] Browser screenshot comparison and actual FPS verification (deferred until core completion)

### v0.0.87

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.87.zip`_


- [x] True 3D toroidal gas shell geometry with vertical thickness.
- [x] Three quality tiers: 1 / 2 / 3 volumetric shells.
- [x] Differential angular velocity, turbulent gas density and nonuniform emissivity shader.
- [x] Reduce flat emission-sheet alpha and overly white photon-ring dominance.
- [x] Preserve previous hub topology, inward flow, approved target image and complete history.
- [x] Add mathematical geometry and shader hook verification script.
- [ ] Browser visual validation and build (not yet completed in this environment).
- [ ] Screenshot comparison with approved black-hole target and performance tests.

### v0.0.88

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.88.zip`_


- [x] Source particle trajectories start at each of eight moving hubs
- [x] Smooth bridge into the core's shared 3D infall curve
- [x] Particle size extinction near the event horizon
- [x] GPU point sprites with quality-tier budgets
- [x] Static trajectory invariant test
- [ ] Real browser visual continuity, performance and Next.js build verification
- Next: v0.0.89 gravity activation; v0.0.90 visual acceptance.

### v0.0.89

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.89.zip`_


- [x] Central UI toggle coupled to hub-to-horizon particles
- [x] Smooth activation acceleration with a monotonic integrated phase clock
- [x] Bounded delta and reversible standby response
- [x] Short-lived activation wave, not permanent decorative rings
- [x] Dedicated activation wiring regression check
- [ ] Actual browser render, build and GPU FPS verification
- Next: v0.0.90 acceptance pass, then inform user when it is ready to run.

### v0.0.90

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.90.zip`_



- [x] Integrated independent particle phase clock; activation now changes speed without phase jumps.
- [x] Cached moving hub anchors once per frame to avoid repeated Vector3 allocations.
- [x] Reduced concentric visual clutter (lens bands, redundant ring, non-HIGH spiral guide lines).
- [x] Added numerical physics/continuity regression gate.
- [ ] Run production Next.js build with installed dependencies.
- [ ] Capture HIGH/BALANCED/LOW browser screenshots, compare against official target.
- [ ] Record 20-second FPS and draw-call metrics on target hardware.
- [ ] Verify shader compilation and visual occlusion in live WebGL.

**Release verdict: source-level improvement only. Black hole NOT signed off as visually complete.**

### v0.0.91

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.91.zip`_


- [x] Replace line-like lensed far-side arcs with 3D mesh ribbons
- [x] Add GPU turbulence, feathered boundaries, asymmetric emission
- [x] Remove decorative black-hole containment rings/blocks
- [x] Add source-level fidelity regression test
- [ ] Complete Next.js production build
- [ ] Visually compare actual rendered scene against official target
- [ ] Benchmark LOW/BALANCED/HIGH on GTX 660-class hardware
- [ ] Decide final black-hole acceptance and user-run readiness

### v0.0.92

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.92.zip`_


- [x] Increase radial spacing of all eight hub anchors by 10% while preserving angular layout and shared motion anchors.
- [x] Add hub-clearance regression check.
- [ ] Verify Next.js build and actual browser render (including clipping and FPS).
- [ ] Confirm black-hole visual acceptance against official target.

### v0.0.93

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.93.zip`_


- [x] Large luminous colored spheres on all eight hub-to-core highway backbones.
- [x] Share `deformRiverPoint` with visible route geometry; add synchronized trailing lights.
- [x] Low/Balanced/High 2/3/4 spheres per hub, instanced meshes, gravity-dependent travel speed.
- [x] Add source-level regression check `verify-visible-infall`.
- [ ] Browser visual review: sphere visibility, path alignment and frame rate.
- [ ] Seamless final transition from backbone endpoint into event horizon.

---

### v0.0.94

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.94.zip`_


- [x] Continue each visible Hub sphere beyond the animated highway endpoint into a clockwise contracting capture spiral.
- [x] Blend highway tangent into the capture segment; eliminate the abrupt endpoint respawn.
- [x] Fade spheres as they cross the opaque event horizon, with depth testing enabled.
- [x] Add `npm run verify:capture` source checks and independent monotone-radius test.
- [ ] Production build and real-browser GPU visual acceptance remain outstanding.

---

### v0.0.95

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.95.zip`_


- [x] Replace uniform emissive torus with procedural photon-ring shader.
- [x] Add angular beaming, turbulent arc brightness and soft radial skirts.
- [x] Reduce oversaturated inner accretion-sheet brightness and gas opacity.
- [x] Add photon emission regression check.
- [ ] Production Next.js build.
- [ ] Browser WebGL shader compilation and screenshot review.
- [ ] FPS verification on target GPU.
**Status: source updated; visual acceptance pending.**

### v0.0.96

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.96.zip`_


- [x] Fix capture bridge C1 continuity: squared-sine bow has zero tangent at both endpoints.
- [x] Add independent numeric junction continuity regression and aggregate source-level test runner.
- [x] Run all source-level regression scripts.
- [ ] `npm install` (registry DNS unavailable; offline cache incomplete).
- [ ] `npm run build` (blocked by missing dependencies).
- [ ] Live WebGL screenshot and shader compilation.
- [ ] HIGH/BALANCED/LOW FPS and draw-call measurements.
**Verdict:** source-level gate only; not a visually approved release.

### v0.0.97

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.97.zip`_

# v0.0.95 — Photon Shadow Fidelity

**Focus:** replace the uniform neon photon torus with a procedural, angularly variable emission ring; preserve opaque shadow and existing lensed disk, Hub routes and capture motion. This is a visual approximation, not GR ray tracing.

**Acceptance gate:** `npm run verify:photon`, existing regression checks, Next.js build, and real browser/WebGL render. Browser render remains **unverified** until a browser test is completed.

## v0.0.95 — Continuous Sphere Capture

Hub에서 출발하는 큰 발광 구체가 동일한 변형 광선 경로를 따라 이동한 후, 블랙홀의 시계방향 포획 나선으로 진입해 사건의 지평선 안쪽으로 사라집니다. 전환 접선 보간, 중심부 페이드, depth test 적용. 이 모델은 시각화용 근사이며 상대론적 광선 추적은 아닙니다.

검증: `npm run verify:capture`. 실제 Next.js 빌드 및 브라우저 렌더링은 별도 검증 필요.

## v0.0.95 — Visible Hub Infall Spheres

- Added 2/3/4 **large, colored, luminous 3D spheres per hub** for LOW/BALANCED/HIGH.
- The glowing sphere center and trailing light use **the same `deformRiverPoint` function as the animated highway backbone**, avoiding detached particles.
- Hub-to-core progress is monotonic within each loop; gravity activation increases the travel clock smoothly.
- Batched sphere cores, halos and trailing lights into three instanced draw calls; existing eight hubs and core preserved.
- This update makes the spheres travel along the visible hub-to-core highway; final transition from the highway endpoint into the event horizon is **not yet guaranteed continuous**. It is a known remaining visual gap.
- Static tests do not establish visual quality. Browser rendering and build remain separate acceptance gates.

Run `npm run verify:visible-infall` to check the shared-path wiring.

---

## v0.0.92 — Black Hole Visual Fidelity: Lens Ribbons

This version focuses exclusively on the Singularity Core; all eight navigation hubs remain intact.

- Replaced far-side thin line arcs with textured, triangulated light ribbons.
- Per-ribbon shader adds turbulent brightness, longitudinal streaks, edge feathering and asymmetric emission.
- Removed the decorative containment tori and blocks from the black-hole core.
- LOW/BALANCED/HIGH use 1/2/3 ribbons at 56/96/144 segments respectively.
- **Not a physically exact GR ray tracer.** Uses the existing bounded Schwarzschild-inspired lens proxy.
- Browser build and visual fidelity must still be reviewed before declaring completion.


> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.98

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.98.zip`_

# v0.0.95 — Photon Shadow Fidelity

**Focus:** replace the uniform neon photon torus with a procedural, angularly variable emission ring; preserve opaque shadow and existing lensed disk, Hub routes and capture motion. This is a visual approximation, not GR ray tracing.

**Acceptance gate:** `npm run verify:photon`, existing regression checks, Next.js build, and real browser/WebGL render. Browser render remains **unverified** until a browser test is completed.

## v0.0.95 — Continuous Sphere Capture

Hub에서 출발하는 큰 발광 구체가 동일한 변형 광선 경로를 따라 이동한 후, 블랙홀의 시계방향 포획 나선으로 진입해 사건의 지평선 안쪽으로 사라집니다. 전환 접선 보간, 중심부 페이드, depth test 적용. 이 모델은 시각화용 근사이며 상대론적 광선 추적은 아닙니다.

검증: `npm run verify:capture`. 실제 Next.js 빌드 및 브라우저 렌더링은 별도 검증 필요.

## v0.0.95 — Visible Hub Infall Spheres

- Added 2/3/4 **large, colored, luminous 3D spheres per hub** for LOW/BALANCED/HIGH.
- The glowing sphere center and trailing light use **the same `deformRiverPoint` function as the animated highway backbone**, avoiding detached particles.
- Hub-to-core progress is monotonic within each loop; gravity activation increases the travel clock smoothly.
- Batched sphere cores, halos and trailing lights into three instanced draw calls; existing eight hubs and core preserved.
- This update makes the spheres travel along the visible hub-to-core highway; final transition from the highway endpoint into the event horizon is **not yet guaranteed continuous**. It is a known remaining visual gap.
- Static tests do not establish visual quality. Browser rendering and build remain separate acceptance gates.

Run `npm run verify:visible-infall` to check the shared-path wiring.

---

## v0.0.92 — Black Hole Visual Fidelity: Lens Ribbons

This version focuses exclusively on the Singularity Core; all eight navigation hubs remain intact.

- Replaced far-side thin line arcs with textured, triangulated light ribbons.
- Per-ribbon shader adds turbulent brightness, longitudinal streaks, edge feathering and asymmetric emission.
- Removed the decorative containment tori and blocks from the black-hole core.
- LOW/BALANCED/HIGH use 1/2/3 ribbons at 56/96/144 segments respectively.
- **Not a physically exact GR ray tracer.** Uses the existing bounded Schwarzschild-inspired lens proxy.
- Browser build and visual fidelity must still be reviewed before declaring completion.


> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.99

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.99.zip`_

# v0.0.95 — Photon Shadow Fidelity

**Focus:** replace the uniform neon photon torus with a procedural, angularly variable emission ring; preserve opaque shadow and existing lensed disk, Hub routes and capture motion. This is a visual approximation, not GR ray tracing.

**Acceptance gate:** `npm run verify:photon`, existing regression checks, Next.js build, and real browser/WebGL render. Browser render remains **unverified** until a browser test is completed.

## v0.0.95 — Continuous Sphere Capture

Hub에서 출발하는 큰 발광 구체가 동일한 변형 광선 경로를 따라 이동한 후, 블랙홀의 시계방향 포획 나선으로 진입해 사건의 지평선 안쪽으로 사라집니다. 전환 접선 보간, 중심부 페이드, depth test 적용. 이 모델은 시각화용 근사이며 상대론적 광선 추적은 아닙니다.

검증: `npm run verify:capture`. 실제 Next.js 빌드 및 브라우저 렌더링은 별도 검증 필요.

## v0.0.95 — Visible Hub Infall Spheres

- Added 2/3/4 **large, colored, luminous 3D spheres per hub** for LOW/BALANCED/HIGH.
- The glowing sphere center and trailing light use **the same `deformRiverPoint` function as the animated highway backbone**, avoiding detached particles.
- Hub-to-core progress is monotonic within each loop; gravity activation increases the travel clock smoothly.
- Batched sphere cores, halos and trailing lights into three instanced draw calls; existing eight hubs and core preserved.
- This update makes the spheres travel along the visible hub-to-core highway; final transition from the highway endpoint into the event horizon is **not yet guaranteed continuous**. It is a known remaining visual gap.
- Static tests do not establish visual quality. Browser rendering and build remain separate acceptance gates.

Run `npm run verify:visible-infall` to check the shared-path wiring.

---

## v0.0.92 — Black Hole Visual Fidelity: Lens Ribbons

This version focuses exclusively on the Singularity Core; all eight navigation hubs remain intact.

- Replaced far-side thin line arcs with textured, triangulated light ribbons.
- Per-ribbon shader adds turbulent brightness, longitudinal streaks, edge feathering and asymmetric emission.
- Removed the decorative containment tori and blocks from the black-hole core.
- LOW/BALANCED/HIGH use 1/2/3 ribbons at 56/96/144 segments respectively.
- **Not a physically exact GR ray tracer.** Uses the existing bounded Schwarzschild-inspired lens proxy.
- Browser build and visual fidelity must still be reviewed before declaring completion.


> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.100

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.100.zip`_

# v0.0.95 — Photon Shadow Fidelity

**Focus:** replace the uniform neon photon torus with a procedural, angularly variable emission ring; preserve opaque shadow and existing lensed disk, Hub routes and capture motion. This is a visual approximation, not GR ray tracing.

**Acceptance gate:** `npm run verify:photon`, existing regression checks, Next.js build, and real browser/WebGL render. Browser render remains **unverified** until a browser test is completed.

## v0.0.95 — Continuous Sphere Capture

Hub에서 출발하는 큰 발광 구체가 동일한 변형 광선 경로를 따라 이동한 후, 블랙홀의 시계방향 포획 나선으로 진입해 사건의 지평선 안쪽으로 사라집니다. 전환 접선 보간, 중심부 페이드, depth test 적용. 이 모델은 시각화용 근사이며 상대론적 광선 추적은 아닙니다.

검증: `npm run verify:capture`. 실제 Next.js 빌드 및 브라우저 렌더링은 별도 검증 필요.

## v0.0.95 — Visible Hub Infall Spheres

- Added 2/3/4 **large, colored, luminous 3D spheres per hub** for LOW/BALANCED/HIGH.
- The glowing sphere center and trailing light use **the same `deformRiverPoint` function as the animated highway backbone**, avoiding detached particles.
- Hub-to-core progress is monotonic within each loop; gravity activation increases the travel clock smoothly.
- Batched sphere cores, halos and trailing lights into three instanced draw calls; existing eight hubs and core preserved.
- This update makes the spheres travel along the visible hub-to-core highway; final transition from the highway endpoint into the event horizon is **not yet guaranteed continuous**. It is a known remaining visual gap.
- Static tests do not establish visual quality. Browser rendering and build remain separate acceptance gates.

Run `npm run verify:visible-infall` to check the shared-path wiring.

---

## v0.0.92 — Black Hole Visual Fidelity: Lens Ribbons

This version focuses exclusively on the Singularity Core; all eight navigation hubs remain intact.

- Replaced far-side thin line arcs with textured, triangulated light ribbons.
- Per-ribbon shader adds turbulent brightness, longitudinal streaks, edge feathering and asymmetric emission.
- Removed the decorative containment tori and blocks from the black-hole core.
- LOW/BALANCED/HIGH use 1/2/3 ribbons at 56/96/144 segments respectively.
- **Not a physically exact GR ray tracer.** Uses the existing bounded Schwarzschild-inspired lens proxy.
- Browser build and visual fidelity must still be reviewed before declaring completion.


> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.101

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.101.zip`_

# v0.0.95 — Photon Shadow Fidelity

**Focus:** replace the uniform neon photon torus with a procedural, angularly variable emission ring; preserve opaque shadow and existing lensed disk, Hub routes and capture motion. This is a visual approximation, not GR ray tracing.

**Acceptance gate:** `npm run verify:photon`, existing regression checks, Next.js build, and real browser/WebGL render. Browser render remains **unverified** until a browser test is completed.

## v0.0.95 — Continuous Sphere Capture

Hub에서 출발하는 큰 발광 구체가 동일한 변형 광선 경로를 따라 이동한 후, 블랙홀의 시계방향 포획 나선으로 진입해 사건의 지평선 안쪽으로 사라집니다. 전환 접선 보간, 중심부 페이드, depth test 적용. 이 모델은 시각화용 근사이며 상대론적 광선 추적은 아닙니다.

검증: `npm run verify:capture`. 실제 Next.js 빌드 및 브라우저 렌더링은 별도 검증 필요.

## v0.0.95 — Visible Hub Infall Spheres

- Added 2/3/4 **large, colored, luminous 3D spheres per hub** for LOW/BALANCED/HIGH.
- The glowing sphere center and trailing light use **the same `deformRiverPoint` function as the animated highway backbone**, avoiding detached particles.
- Hub-to-core progress is monotonic within each loop; gravity activation increases the travel clock smoothly.
- Batched sphere cores, halos and trailing lights into three instanced draw calls; existing eight hubs and core preserved.
- This update makes the spheres travel along the visible hub-to-core highway; final transition from the highway endpoint into the event horizon is **not yet guaranteed continuous**. It is a known remaining visual gap.
- Static tests do not establish visual quality. Browser rendering and build remain separate acceptance gates.

Run `npm run verify:visible-infall` to check the shared-path wiring.

---

## v0.0.92 — Black Hole Visual Fidelity: Lens Ribbons

This version focuses exclusively on the Singularity Core; all eight navigation hubs remain intact.

- Replaced far-side thin line arcs with textured, triangulated light ribbons.
- Per-ribbon shader adds turbulent brightness, longitudinal streaks, edge feathering and asymmetric emission.
- Removed the decorative containment tori and blocks from the black-hole core.
- LOW/BALANCED/HIGH use 1/2/3 ribbons at 56/96/144 segments respectively.
- **Not a physically exact GR ray tracer.** Uses the existing bounded Schwarzschild-inspired lens proxy.
- Browser build and visual fidelity must still be reviewed before declaring completion.


> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.102

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.102.zip`_


- [x] Match GPU conduit vertex motion to CPU `deformRiverPoint` wave/breath/shear/depth terms.
- [x] Add per-vertex river normals and preserve hub-to-core direction.
- [ ] Browser shader compilation and moving hub/packet alignment visual verification.
- [ ] v0.0.103: glow stability across AUTO quality transitions.
- [ ] v0.0.104: build, screenshot, FPS, official-target comparison and acceptance.

### v0.0.103

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.103.zip`_


- Bundled thicker two-layer conduits, GPU pulse packets, braided instanced filaments, visible infall packets to horizon, and persistent LOW-mode bloom.
- Build and real browser comparison remain release gates; do not claim visual acceptance without screenshots.

### v0.0.104

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.104.zip`_


- [x] Tilt all eight inward spiral pathways progressively into an oblique 3D accretion plane without disconnecting moving hub anchors.
- [x] Accelerating packet travel and event-horizon fadeout; prevent abrupt visible reappearance at the capture point.
- [x] Improve core-side energy intensity and refine packet highlight shapes.
- [x] Reduce redundant overlapping dynamic stream meshes in BALANCED/LOW, keep high-detail accents in HIGH.
- [x] Reuse vectors and colors in braided strands to reduce garbage-collector pressure.
- [ ] Production Next.js build and browser shader compilation (dependencies unavailable locally).
- [ ] Actual screenshot comparison with official target across viewport ratios and HIGH/BALANCED/LOW.
- [ ] FPS/draw-call measurements on GTX 660 and AUTO transitions.
- [ ] Visual acceptance of 8 distinct stations, disk angle and energy conduits.

### v0.0.105

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.105.zip`_


- Replaced continuous bright conduit shells with irregular, angularly broken plasma coverage.
- Added per-vertex centerline attributes for tapered, turbulent GPU geometry; preserved live hub anchor and original 8 routes.
- Reduced shell radius, shader emission, opacity and braided-strand bulk; retained fast inward energy packets and existing composition.
- Visual acceptance remains pending actual browser/GPU rendering and comparison to reference screenshot.

### v0.0.106

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.106.zip`_



- `deformRiverPoint()`에 잘못 삽입된 `centers[vertex]` 참조 제거 (ReferenceError 해결).
- `PlasmaConduits()` TubeGeometry 생성 시 `aRiverCenter` 버텍스 좌표 실제 계산 및 할당.
- 신규 회귀 검사 `verify-plasma-runtime.mjs` 추가.
- 기존 시각 효과 및 8개 Hub 레이아웃 유지.

### v0.0.107

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.107.zip`_


- Preserve the eight GitBlog hubs and current cosmic composition.
- Reduce conduit hose silhouette: slimmer sheath, broken angular coverage, turbulent taper, controlled bloom.
- Fragment the regular braided strands and emphasize moving in-fall packets.
- NEXT PHASE: hub icon quality upgrade (distinct geometry, detail, material hierarchy, readable silhouettes and GPU budgets).
- Acceptance pending: actual browser render, LOW/AUTO switching, performance and visual comparison.

### v0.0.108

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.108.zip`_


- [x] Profile/Career/Projects/Portfolio/GitHub/Expertise/Training/Archive 개별 구조물 구현
- [x] Hub 공통 궤도 경사 조정, 8개 노드/클릭 구조 유지
- [x] LOW 단계에서 정점/장식 복잡도 절감
- [ ] 사용자 실행 화면 검수: 실루엣 구분, 클릭, FPS, WebGL 오류
- [ ] 필요시 사용자 피드백 기반 정거장 형태/재질 2차 개선

### v0.0.109

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.109.zip`_


- [x] Eight distinct mechanical silhouettes, inset lighting and detail tiers.
- [x] Remove shared OrbitalStation from BALANCED/LOW to emphasize hub-specific identities.
- [x] Reduce secondary ring opacity and keep hub navigation unchanged.
- [ ] Browser build, TypeScript and WebGL runtime acceptance.
- [ ] Review all eight icons at LOW/BALANCED/HIGH and narrow viewport.
- [ ] Measure FPS, draw calls, AUTO transitions on target GTX 660.
- [ ] Final visual tuning, click/accessibility/mobile regression.

### v0.0.110

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.110.zip`_


- [x] Eight camera-side emblem silhouettes receive distinct hard-surface front assemblies.
- [x] Metallic trim / glass emissive layers separate form from color.
- [x] Universal orbital rings and ghost sphere attenuated to expose the emblems.
- [x] LOW retains primary silhouette; BALANCED/HIGH show optional details.
- [ ] Next.js production build / TypeScript validation in a dependency-equipped environment.
- [ ] User browser review of 8 hubs, clicking, AUTO/LOW/HIGH and FPS.
- [ ] Final layout, visual target and performance sign-off (candidate v0.0.111; conditional).

### v0.0.111

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.111.zip`_


- [x] Eight camera-side emblem silhouettes receive distinct hard-surface front assemblies.
- [x] Metallic trim / glass emissive layers separate form from color.
- [x] Universal orbital rings and ghost sphere attenuated to expose the emblems.
- [x] LOW retains primary silhouette; BALANCED/HIGH show optional details.
- [ ] Next.js production build / TypeScript validation in a dependency-equipped environment.
- [ ] User browser review of 8 hubs, clicking, AUTO/LOW/HIGH and FPS.
- [ ] Final layout, visual target and performance sign-off (candidate v0.0.111; conditional).

### v0.0.112

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.112.zip`_


- [x] Eight camera-side emblem silhouettes receive distinct hard-surface front assemblies.
- [x] Metallic trim / glass emissive layers separate form from color.
- [x] Universal orbital rings and ghost sphere attenuated to expose the emblems.
- [x] LOW retains primary silhouette; BALANCED/HIGH show optional details.
- [ ] Next.js production build / TypeScript validation in a dependency-equipped environment.
- [ ] User browser review of 8 hubs, clicking, AUTO/LOW/HIGH and FPS.
- [ ] Final layout, visual target and performance sign-off (candidate v0.0.112; conditional).

### v0.0.113

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.113.zip`_


- [x] Eight camera-side emblem silhouettes receive distinct hard-surface front assemblies.
- [x] Metallic trim / glass emissive layers separate form from color.
- [x] Universal orbital rings and ghost sphere attenuated to expose the emblems.
- [x] LOW retains primary silhouette; BALANCED/HIGH show optional details.
- [ ] Next.js production build / TypeScript validation in a dependency-equipped environment.
- [ ] User browser review of 8 hubs, clicking, AUTO/LOW/HIGH and FPS.
- [ ] Final layout, visual target and performance sign-off (candidate v0.0.113; conditional).

### v0.0.114

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.114.zip`_


- [x] Eight distinct identity details, machining and contrast treatment
- [x] Preserve Saturn ring plane and central black hole
- [ ] TypeScript and Next.js production build
- [ ] All eight Hub clicks and ACTIVE CONTEXT changes
- [ ] Browser appearance at LOW/BALANCED/HIGH and wide/mobile viewports
- [ ] GPU FPS stability and target-reference visual sign-off

### v0.0.115

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.115.zip`_


- [x] Eight distinct identity details, machining and contrast treatment
- [x] Preserve Saturn ring plane and central black hole
- [ ] TypeScript and Next.js production build
- [ ] All eight Hub clicks and ACTIVE CONTEXT changes
- [ ] Browser appearance at LOW/BALANCED/HIGH and wide/mobile viewports
- [ ] GPU FPS stability and target-reference visual sign-off

### v0.0.116

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.116.zip`_


- [x] Eight distinct identity details, machining and contrast treatment
- [x] Preserve Saturn ring plane and central black hole
- [ ] TypeScript and Next.js production build
- [ ] All eight Hub clicks and ACTIVE CONTEXT changes
- [ ] Browser appearance at LOW/BALANCED/HIGH and wide/mobile viewports
- [ ] GPU FPS stability and target-reference visual sign-off

### v0.0.117

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.117.zip`_


- [x] Eight distinct identity details, machining and contrast treatment
- [x] Preserve Saturn ring plane and central black hole
- [ ] TypeScript and Next.js production build
- [ ] All eight Hub clicks and ACTIVE CONTEXT changes
- [ ] Browser appearance at LOW/BALANCED/HIGH and wide/mobile viewports
- [ ] GPU FPS stability and target-reference visual sign-off

### v0.0.118

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.118.zip`_


- [x] Eight distinct identity details, machining and contrast treatment
- [x] Preserve Saturn ring plane and central black hole
- [ ] TypeScript and Next.js production build
- [ ] All eight Hub clicks and ACTIVE CONTEXT changes
- [ ] Browser appearance at LOW/BALANCED/HIGH and wide/mobile viewports
- [ ] GPU FPS stability and target-reference visual sign-off

### v0.0.119

_출처: 해당 버전 README · `AI-Network-Portfolio-v0.0.119.zip`_

> **현재 통합 개발 계획:** [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md) 상단의 v0.0.119 → v0.0.120 → v0.1.0 계획을 우선 적용합니다. v0.0.118은 시각 품질 승인 상태가 아닙니다.

## v0.0.108 — Eight distinct orbital hubs

- Rebuilt all eight section emblems as individually recognizable 3D structures: Profile, Career, Projects, Portfolio, GitHub, Expertise, Training, Archive.
- Changed shared ring inclination to an oblique docking plane; retained original hub positions, navigation, plasma and black hole.
- LOW/BALANCED/HIGH share silhouettes with quality-dependent geometry detail.
- Browser GPU verification is pending user-run screenshot.

# v0.0.95 — Photon Shadow Fidelity

**Focus:** replace the uniform neon photon torus with a procedural, angularly variable emission ring; preserve opaque shadow and existing lensed disk, Hub routes and capture motion. This is a visual approximation, not GR ray tracing.

**Acceptance gate:** `npm run verify:photon`, existing regression checks, Next.js build, and real browser/WebGL render. Browser render remains **unverified** until a browser test is completed.

## v0.0.95 — Continuous Sphere Capture

Hub에서 출발하는 큰 발광 구체가 동일한 변형 광선 경로를 따라 이동한 후, 블랙홀의 시계방향 포획 나선으로 진입해 사건의 지평선 안쪽으로 사라집니다. 전환 접선 보간, 중심부 페이드, depth test 적용. 이 모델은 시각화용 근사이며 상대론적 광선 추적은 아닙니다.

검증: `npm run verify:capture`. 실제 Next.js 빌드 및 브라우저 렌더링은 별도 검증 필요.

## v0.0.95 — Visible Hub Infall Spheres

- Added 2/3/4 **large, colored, luminous 3D spheres per hub** for LOW/BALANCED/HIGH.
- The glowing sphere center and trailing light use **the same `deformRiverPoint` function as the animated highway backbone**, avoiding detached particles.
- Hub-to-core progress is monotonic within each loop; gravity activation increases the travel clock smoothly.
- Batched sphere cores, halos and trailing lights into three instanced draw calls; existing eight hubs and core preserved.
- This update makes the spheres travel along the visible hub-to-core highway; final transition from the highway endpoint into the event horizon is **not yet guaranteed continuous**. It is a known remaining visual gap.
- Static tests do not establish visual quality. Browser rendering and build remain separate acceptance gates.

Run `npm run verify:visible-infall` to check the shared-path wiring.

---

## v0.0.92 — Black Hole Visual Fidelity: Lens Ribbons


> 원본 기록이 길어 앞부분 36줄만 발췌했습니다. 해당 버전 ZIP 원문을 참고하세요.

### v0.0.120

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.120.zip`_


- [x] GPU nebula/cloud/galaxy backdrop layer (procedural, camera-following)
- [x] Tilted, animated multi-color dust streams captured toward the event horizon
- [x] Sharper warm/cool accretion spiral shader
- [x] LOW/BALANCED/HIGH particle counts and reduced LOW animation
- [ ] Production Next.js build and full TypeScript typecheck
- [ ] Visual reference comparison in browser; corner and center composition
- [ ] FPS, interaction and GitHub Pages deployment validation

### v0.0.121

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.121.zip`_


- [x] GPU nebula/cloud/galaxy backdrop layer (procedural, camera-following)
- [x] Tilted, animated multi-color dust streams captured toward the event horizon
- [x] Sharper warm/cool accretion spiral shader
- [x] LOW/BALANCED/HIGH particle counts and reduced LOW animation
- [ ] Production Next.js build and full TypeScript typecheck
- [ ] Visual reference comparison in browser; corner and center composition
- [ ] FPS, interaction and GitHub Pages deployment validation

### v0.0.122

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.122.zip`_


- Added an animated mini accretion vortex in the upper-right: three spiral arms, moving particle ring, dark event horizon.
- Added a modular orbiting space station in the right-side negative space: solar panels, rotating antenna, beacon, gentle drift.
- Both effects are live Three.js geometry across LOW, BALANCED, HIGH, with tiered particle and panel budgets.
- No generated background images; existing navigation and central black hole are retained.
- Remaining: browser-side visual positioning, FPS profiling and full Next.js production build.

### v0.0.123

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.123.zip`_


- Added an animated mini accretion vortex in the upper-right: three spiral arms, moving particle ring, dark event horizon.
- Added a modular orbiting space station in the right-side negative space: solar panels, rotating antenna, beacon, gentle drift.
- Both effects are live Three.js geometry across LOW, BALANCED, HIGH, with tiered particle and panel budgets.
- No generated background images; existing navigation and central black hole are retained.
- Remaining: browser-side visual positioning, FPS profiling and full Next.js production build.

### v0.0.124

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.124.zip`_


- [x] Mini black hole spiral streams and accretion detail
- [x] Dynamic station metal structure, solar arrays, beacon and antenna
- [x] Viewport-relative positioning instead of fixed x coordinate
- [x] LOW/BALANCED/HIGH detail budgets
- [x] Source regression test
- [ ] Verify browser visibility at 16:9 and mobile ratios
- [ ] Full Next.js build and TypeScript type check
- [ ] GTX 660 performance profiling

### v0.0.125

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.125.zip`_


- Replaced the mini black hole with one accretion structure: removed rigid disk spin and duplicate ornamental ring; animated dust positions independently.
- The accretion plane keeps its orientation while particles spiral inward.
- Rebuilt the space station as a large radial habitat with 6/8/12 spokes, paired solar wings, command tower, docking pylons, navigation beacons, and a rotating antenna.
- Screen-relative placement for both features; LOW/BALANCED/HIGH geometry budgets.
- Automated source regression checks added. Browser visual confirmation and production build remain pending.

### v0.0.126

_출처: 해당 버전 로드맵 · `AI-Network-Portfolio-v0.0.126.zip`_


- [x] 미니 블랙홀: 시간 기반 셰이더의 나선형 방출광·먼지 흐름 추가
- [x] 미니 블랙홀: 강착원반 기하의 방향 고정, 입자만 회전·흡입
- [x] 미니 블랙홀: 중복 필라멘트 발광 감소, 중심 암흑부 유지
- [x] 우주 정거장: 대형 보조 거주 링·산업용 트러스 추가
- [x] 우주 정거장: 다중 도킹 포트·추진 모듈·광원 강조
- [x] Hub: 투명 외피 내부 시설을 가리지 않는 얇은 가장자리 조명
- [x] LOW/BALANCED/HIGH에 따라 정거장 도킹 수·고리 분할·셰이더 강도 차등
- [x] 통합 로드맵 최신화 및 이전 이력 아카이브
- [ ] 실제 브라우저에서 미니 블랙홀/정거장 크기·가시성 확인
- [ ] Next.js 프로덕션 빌드·TypeScript 타입 검사
- [ ] GTX 660의 품질별 FPS 실측

