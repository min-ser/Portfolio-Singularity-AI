# AI Network Portfolio

> **실시간 3D 우주 환경으로 탐색하는 인터랙티브 기술 포트폴리오**  
> Next.js · React · TypeScript · Three.js · React Three Fiber · WebGL

**현재 개발 버전: `v0.0.126` | 상태: 개발 및 시각 검증 진행 중**

AI Network Portfolio는 기존의 목록형 포트폴리오를 우주 공간에 배치된 **8개 궤도 허브(Hub)**로 재해석한 웹 애플리케이션입니다. 화면 중앙에는 거대한 블랙홀인 **Singularity Core**가 있고, 각 허브에서 출발한 빛과 입자가 중력 흐름을 따라 중앙으로 이동합니다. 사용자는 허브 또는 탐색 메뉴를 통해 프로필, 경력, 프로젝트, 기술 역량 등의 영역을 살펴볼 수 있습니다.

단순한 배경 영상이나 정적 시안이 아니라, **Three.js 기반 3D 지오메트리·GPU 셰이더·실시간 애니메이션**을 중심으로 장면을 구성하는 것을 목표로 합니다. 다만 일부 시각 참고 자료와 배경 리소스가 프로젝트에 포함되어 있으므로 모든 화면 픽셀이 실시간 생성되는 것은 아닙니다.

> ⚠️ **개발 상태 안내:** 소스 회귀 검사가 통과했다고 해서 목표 시안과의 시각적 일치, 모든 브라우저의 정상 렌더링, 특정 GPU의 FPS 또는 GitHub Pages 배포까지 검증된 것은 아닙니다. 실제 브라우저·기기별 검증은 별도로 진행해야 합니다.

## 1. 프로젝트 핵심 기능

| 기능 | 설명 |
| --- | --- |
| **Singularity Core** | 중앙 블랙홀, 사건의 지평선, 강착원반, 나선형 먼지·플라즈마 흐름을 표현하는 시각화 |
| **8개 Orbital Hub** | Profile, Career, Projects, Portfolio, GitHub, Expertise, Training, Archive의 독립된 3D 구조 |
| **투명 구체 및 행성 고리** | 내부 시설을 보여주는 투명 외피와 기울어진 토성형 다층 고리 |
| **동적 우주 배경** | 별, 성운, 파티클, 소행성, 공간 깊이 효과 |
| **보조 블랙홀** | 화면 우측의 미니 강착원반 및 물질 이동 효과 |
| **우주 정거장** | 거주 링, 태양광 패널, 도킹 구조와 부유·회전 애니메이션 |
| **탐색 UI / HUD** | 사이드바, ACTIVE CONTEXT, 렌더링 메트릭 및 네트워크 시각화 |
| **품질 설정** | AUTO / LOW / BALANCED / HIGH의 렌더링 수준 구분 |
| **정적 배포** | Next.js `output: 'export'`를 이용한 GitHub Pages 배포 구성 |

### 8개 허브 구성

| 번호 | 허브 | 목적 | 시각적 표현 방향 |
| --- | --- | --- | --- |
| 01 | **Profile** | 소개와 정체성 | 인물·신원 코어 |
| 02 | **Career** | 경력과 성장 | 타워 및 상승 구조 |
| 03 | **Projects** | 프로젝트 경험 | 조립식 모듈·시설 |
| 04 | **Portfolio** | 구현 결과와 데모 | 전시용 디스플레이 |
| 05 | **GitHub** | 소스와 활동 | 브랜치·병합 네트워크 |
| 06 | **Expertise** | 기술 전문성 | 지식 코어·방사형 노드 |
| 07 | **Training** | 학습과 성장 | 교육 시설·학습 구조 |
| 08 | **Archive** | 자료와 기록 | 계층형 데이터 보관 시설 |

허브에 연결된 콘텐츠의 정의는 `components/portfolioContent.ts`에서 관리합니다. 기본 링크는 `#profile`과 같은 앵커 형식이므로 외부 GitBlog에 동일한 앵커가 존재하는지 확인해야 합니다.

## 2. 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| 프레임워크 | **Next.js 16.0.1**, React 19.2.0 |
| 언어 | TypeScript |
| 3D / WebGL | Three.js, `@react-three/fiber`, `@react-three/drei` |
| 후처리 | `@react-three/postprocessing`, `postprocessing` |
| 스타일 | CSS (`app/globals.css`) |
| 검증 | Node.js 기반 소스 회귀 검사 (`scripts/`) |
| 배포 | GitHub Actions, GitHub Pages, Next.js static export |

이 프로젝트의 블랙홀과 중력 효과는 **실시간 인터랙티브 시각화를 위한 근사 표현**입니다. 물리학적으로 정확한 일반상대론 광선 추적이나 천체 시뮬레이터를 표방하지 않습니다.

## 3. 블랙홀 수학 모델과 구현 공식

> **이 프로젝트의 핵심 구현 내용:** 블랙홀은 단순히 회전하는 이미지가 아니라, 극좌표·중력에 따른 회전 속도 근사·반지름 방향 이류(advection)·3D 좌표 변환·GLSL 셰이더로 구성된 **실시간 시각화**입니다. 아래 공식은 `components/WebGLScene.tsx`의 실제 구현과 대응합니다. **일반상대성이론을 정확히 푸는 시뮬레이션은 아닙니다.**

### 3.1 물리적 기준 반지름

질량 `M`의 회전하지 않는 슈바르츠실트 블랙홀에서 사건의 지평선 기준 반지름은 다음과 같습니다.

$$
r_s=\frac{2GM}{c^2}
$$

여기서 `G`는 중력상수, `c`는 빛의 속도입니다. 슈바르츠실트 시공간에서 광자 구면과 가장 안쪽 안정 원궤도(ISCO)의 반지름은 각각 다음과 같습니다.

$$
r_{\mathrm{photon}}=\frac{3}{2}r_s, \qquad r_{\mathrm{ISCO}}=3r_s
$$

**실제 코드:** `RS = 0.65`, `PHOTON_ORBIT = 1.5 * RS`, `ISCO = 3.0 * RS`. `RS`는 **실제 천체의 미터 단위 반지름이 아닌 장면 단위의 기준값**입니다. 코드의 `GM_SCENE = 1.15` 역시 시각화용 정규화 상수로, `RS`와 독립적으로 조정되므로 이 값들로 실제 블랙홀 질량을 계산할 수 없습니다.

### 3.2 강착 물질의 반지름 감소

입자가 바깥에서 안쪽으로 접근하는 경로는 `spiralRadius(progress)`가 계산합니다. 진행률 `p`는 0에서 1 사이입니다.

$$
r(p)=\left[(1-p)r_{\mathrm{out}}^{3/2}+p\,r_{\mathrm{in}}^{3/2}\right]^{2/3}
$$

이 모델은 **반지름 방향 속도**를 `dr/dt ∝ −r^(−1/2)`로 가정한 결과를 진행률에 따라 보간한 것입니다. 중심에 가까워질수록 반지름 감소 속도가 커지는 모습을 표현합니다. 실제 구현값은 `INFALL_OUTER = 4.10`, `INFALL_INNER = RS * 1.012`입니다.

### 3.3 회전 속도와 나선 각도

뉴턴 역학의 케플러 회전 관계를 시각적 근사로 사용합니다.

$$
\omega(r)\propto\sqrt{\frac{GM}{r^3}}
$$

이 관계는 안쪽 입자가 바깥쪽보다 빠르게 회전하는 **차등 회전**을 설명합니다. 실제 `spiralAngle(progress, phase)`는 반지름의 `3/2`제곱 보간값 `q`와 로그 함수를 사용합니다.

$$
q(p)=(1-p)r_{\mathrm{out}}^{3/2}+p\,r_{\mathrm{in}}^{3/2}
$$

$$
\theta(p)=\phi-4.3\sqrt{GM_{\mathrm{scene}}}\;\frac{q_0}{q_0-q_1}\ln\left(\frac{q_0}{q(p)}\right)
$$

`φ`는 입자별 초기 위상입니다. 계수 `4.3`은 시각적 회전량을 조절하기 위한 값으로 **물리적으로 유도된 보편 상수가 아닙니다.** 이 경로는 정확한 상대론적 측지선이 아닙니다.

### 3.4 나선 궤도를 3D 원반으로 변환

먼저 극좌표를 평면 직교좌표로 변환합니다.

$$
x=r\cos\theta,\qquad y_0=r\sin\theta
$$

그다음 원반 기울기 `i = DISK_INCLINATION`과 두께 오프셋 `h`를 적용합니다.

$$
y=y_0\cos i-h\sin i,\qquad z=y_0\sin i+h\cos i
$$

마지막으로 `DISK_ROLL`만큼 화면 내에서 회전합니다. 코드의 `infallPosition()`은 이 과정을 `THREE.Vector3`로 반환합니다. 기본 기울기는 `DISK_INCLINATION = 1.08`라디안, 롤은 `DISK_ROLL = -0.40`라디안입니다.

### 3.5 빛 휘어짐과 강착원반 셰이더

먼 쪽 강착원반이 블랙홀 위로 휘어 보이는 효과는 약한 중력장에서의 편향 근사식을 **제한된 시각 효과**로 사용합니다.

$$
\alpha\approx\frac{4GM}{c^2b}=\frac{2r_s}{b}
$$

`b`는 충돌 매개변수입니다. 실제 `lensDeflection()`은 `b`의 최소값을 광자 궤도 부근으로 제한하고 편향각을 최대 `1.10`라디안으로 자릅니다. **광자 구면 부근의 강한 중력 렌즈를 정확히 계산하지 않습니다.**

GPU 강착원반 셰이더 `ACCRETION_FRAGMENT`는 다음 관계를 사용해 차등 회전과 나선 무늬를 생성합니다.

```glsl
float omega = pow(max(r, 0.32), -1.5);
float azimuth = theta + time * omega;
float swirl = azimuth * 8.0 - 30.0 * log(max(r, 0.32));
```

여기에 노이즈, 온도에 따른 색상 변화, 시야 방향 밝기 보정(`beaming`)을 합성합니다. **색상은 물리적 복사전달 계산이나 실제 온도(K)를 나타내지 않습니다.** 우측 미니 블랙홀은 별도의 `MINI_ACCRETION_FRAGMENT` 셰이더로 물질 흐름을 애니메이션 처리합니다.

### 3.6 수식과 코드 대응표

| 수학·시각화 요소 | 코드 위치 (`components/WebGLScene.tsx`) | 정확도 및 한계 |
| --- | --- | --- |
| 사건의 지평선·광자 궤도·ISCO | `RS`, `PHOTON_ORBIT`, `ISCO` | 슈바르츠실트 반지름 비율만 반영 |
| 반지름 방향 이류 | `spiralRadius()` | 정규화된 시각화용 감소 모델 |
| 차등 회전·나선 각도 | `spiralAngle()` | 케플러 관계 기반 근사 + 임의 시각 계수 |
| 3D 원반 기울기 | `infallPosition()` | 기하학적 회전 변환 |
| 먼 쪽 원반 렌즈 효과 | `lensDeflection()`, `lensedFarSidePoint()` | 약한 장 근사, 편향 상한 적용 |
| 강착원반 밀도·발광 | `ACCRETION_FRAGMENT` | GLSL 절차적 노이즈와 색상 보정 |
| 미니 블랙홀 물질 흐름 | `MINI_ACCRETION_FRAGMENT` | 독립된 절차적 시각화 |

공식의 **유도 과정, 코드 단위 설명, 정확한 물리 모형과의 차이**는 [`docs/physics/BLACK_HOLE_MATHEMATICS.md`](./docs/physics/BLACK_HOLE_MATHEMATICS.md)에 추가로 정리했습니다.

---

## 4. 프로젝트 구조

```text
ai-network-portfolio/
├── .github/workflows/
│   └── deploy-pages.yml           # GitHub Pages 자동 배포
├── app/
│   ├── globals.css                # 공통 UI·HUD 스타일
│   ├── layout.tsx                 # Next.js 루트 레이아웃
│   └── page.tsx                   # 메인 페이지
├── components/
│   ├── WebGLScene.tsx             # 우주 공간·블랙홀·Hub 3D 장면
│   ├── NetworkScene.tsx           # UI/장면 연결
│   ├── portfolioContent.ts        # 8개 Hub 콘텐츠 및 링크
│   ├── graphicsQuality.ts         # 품질 설정
│   └── version.ts                 # 화면 표시 버전
├── docs/
│   ├── visual-reference/          # 시안·비교 자료 (권리 확인 필요)
│   ├── ROADMAP_HISTORY_THROUGH_v0.0.125.md
│   └── physics/BLACK_HOLE_MATHEMATICS.md # 블랙홀 수학 모델과 코드 대응
├── public/images/                # 웹에서 사용하는 이미지 리소스
├── scripts/                      # 소스·구조 회귀 검사
├── .env.example                  # 환경 변수 예시
├── .gitignore
├── IMPLEMENTATION_ROADMAP.md     # 최신 개발 계획
├── CHANGELOG.md                  # 주요 변경 내역
├── LICENSE                       # 소스 코드 MIT 라이선스
├── next.config.ts                # 정적 내보내기 설정
├── package.json
└── README.md
```

## 5. 로컬 실행 방법

**사전 준비:** Node.js 22 권장, npm, WebGL을 지원하는 최신 브라우저. GPU 드라이버와 브라우저의 하드웨어 가속이 활성화되어 있어야 합니다.

```bash
# 1. 저장소 내려받기
git clone https://github.com/<YOUR_USERNAME>/ai-network-portfolio.git
cd ai-network-portfolio

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 **http://localhost:3000** 에 접속합니다. 현재 개발 스크립트는 `next dev --webpack`을 사용합니다.

### 환경 변수

`.env.example`을 참고하여 필요한 경우 `.env.local` 파일을 생성합니다.

```dotenv
NEXT_PUBLIC_GITBLOG_URL=https://min-ser.github.io/
```

`NEXT_PUBLIC_GITBLOG_URL`은 외부 GitBlog로 이동하는 기능에 사용하는 주소입니다. 배포 경로 설정용 `NEXT_PUBLIC_BASE_PATH`는 GitHub Actions에서 저장소 이름으로 자동 지정합니다.

**주의:** `NEXT_PUBLIC_` 접두사의 환경 변수는 클라이언트에 노출될 수 있습니다. 비밀번호, API 키, 토큰 등 비밀 정보를 입력하지 마세요.

## 6. 화면 탐색 및 그래픽 품질

- **허브 선택:** 3D 허브 또는 좌측 메뉴에서 원하는 영역을 선택합니다.
- **ACTIVE CONTEXT:** 현재 선택한 항목의 컨텍스트를 표시합니다.
- **HUD:** FPS, 프레임 시간, 렌더링 자원 관련 정보를 표시합니다. 실제 측정값과 내부 표시용 값은 구분해서 해석해야 합니다.
- **AUTO / LOW / BALANCED / HIGH:** 그래픽 수준에 따라 입자·시설 디테일·광원 등의 구성을 조정합니다.

| 모드 | 권장 용도 | 설계 방향 |
| --- | --- | --- |
| AUTO | 기본 사용 | 실행 환경을 고려한 자동 품질 선택 |
| LOW | 구형 GPU / 저사양 | 입자·보조 디테일 축소, 주요 실루엣 유지 |
| BALANCED | 일반 데스크톱 | 효과와 성능의 균형 |
| HIGH | 고성능 환경 | 나선형 먼지·우주 시설·발광 효과 확대 |

**GTX 660 등 구형 GPU를 고려한 설계가 포함되어 있지만**, 특정 프레임레이트 달성은 아직 실측으로 보장되지 않습니다.

## 7. 검증 및 빌드

```bash
# 프로젝트의 소스 회귀 검사
npm run verify:all

# 프로젝트의 기본 검증
npm run validate

# 정적 사이트 빌드
npm run build
```

빌드가 성공하면 `out/` 디렉터리에 GitHub Pages용 정적 파일이 생성됩니다. 배포 전에는 브라우저에서 8개 허브 탐색, 품질 모드 전환, 화면 크기별 UI, WebGL 콘솔 오류 및 실제 FPS를 별도로 확인해야 합니다.

**현재 알려진 검증 범위:** 기존 프로젝트의 소스 검사·TSX 구문 검사는 수행된 이력이 있으나, 이 문서화 패키지에 대해 전체 의존성 설치·프로덕션 빌드·실제 브라우저 검증을 새로 완료한 상태는 아닙니다.

## 8. GitHub Pages 배포

이 저장소에는 `.github/workflows/deploy-pages.yml`이 포함되어 있습니다. `main` 브랜치에 푸시하면 GitHub Actions가 정적 사이트 빌드 및 Pages 배포를 시도합니다.

1. GitHub에서 **`ai-network-portfolio`**라는 새 **Public** 저장소를 만듭니다.
2. GitHub 웹에서 README나 라이선스를 자동 생성하지 말고, 이 프로젝트의 전체 파일을 저장소 루트에 업로드합니다.
3. **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
4. **Actions** 탭에서 `Deploy Next.js static site to GitHub Pages` 워크플로 실행 결과를 확인합니다.
5. 배포 성공 시 `https://<YOUR_USERNAME>.github.io/ai-network-portfolio/`에서 확인합니다.

현재 `next.config.ts`는 `NEXT_PUBLIC_BASE_PATH`를 읽어 `basePath` 및 `assetPrefix`에 적용합니다. GitHub Actions가 저장소 이름을 자동 전달하므로 일반적인 프로젝트 저장소 경로에서 사용할 수 있습니다. 사용자명·저장소명 변경 시 URL도 달라집니다.

### 로컬에서 직접 GitHub에 올리는 방법

```bash
git init
git branch -M main
git add .
git commit -m "docs: initialize AI Network Portfolio GitHub repository"
git remote add origin https://github.com/<YOUR_USERNAME>/ai-network-portfolio.git
git push -u origin main
```

`<YOUR_USERNAME>`은 자신의 GitHub 계정명으로 변경합니다. 기존 저장소에서 작업 중이라면 `git init`과 `git remote add origin`은 다시 실행하지 않습니다.

## 9. 현재 개발 로드맵

| 버전 | 범위 | 상태 |
| --- | --- | --- |
| **v0.0.126** | 미니 블랙홀·우주 정거장·Hub 조명·품질별 디테일 | 코드 반영, 실제 시각 검증 대기 |
| **v0.0.127** | 전체 화면 구도·탐색·반응형·성능·빌드 통합 안정화 | 예정 |
| **v0.1.0** | 시안 최종 비교·브라우저 통합 검증·GitHub Pages 배포 승인 | 목표 |

상세한 체크리스트는 [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md), 이전 개발 이력은 `docs/ROADMAP_HISTORY_THROUGH_v0.0.125.md`를 참고하세요.

## 10. 라이선스 및 에셋 사용 주의

프로젝트의 **직접 작성한 소스 코드**는 [MIT License](./LICENSE)를 적용합니다. 단, `docs/visual-reference/`의 목표 시안·참고 이미지 및 `public/images/`의 이미지 파일은 **출처와 재배포 권한을 별도로 확인해야 하며, 이 저장소의 MIT 라이선스가 자동으로 적용된다고 간주하지 않습니다.**

GitHub에 공개하기 전에 외부 제공 이미지, 생성 이미지, 제3자 코드·폰트의 이용 조건을 확인하고, 권리가 불명확한 자료는 공개 저장소에서 제외하거나 적절한 권리 표기를 추가하세요. 이 README에 기재한 라이선스는 제3자 저작물에 대한 권리를 부여하지 않습니다.

## 11. 프로젝트 운영 원칙

- 정적인 스크린샷을 3D 구현 결과로 대체하지 않습니다.
- 기존 소스에 기능을 누적 반영하고 변경 이력을 기록합니다.
- 작은 시각 조정보다 연관된 기능을 묶어 통합 업데이트합니다.
- **소스 검사 통과 ≠ 실제 화면 검수 완료**를 명확히 구분합니다.
- 공개 포트폴리오에 내부 고객사·사내 리소스명·접근 정보·비밀값을 포함하지 않습니다.

---

**AI Network Portfolio** — 우주를 탐색하듯 기술과 경험을 연결하는 인터랙티브 3D 포트폴리오.


## 개발 이력 및 누적 로드맵

초기 버전 **v0.0.1부터 v0.0.126까지**의 버전별 변경 사항과 체크리스트는 [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md)에서 시간순으로 확인할 수 있습니다. 과거 원문 및 복원 근거는 `docs/`에 보관합니다.
