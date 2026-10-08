# 블랙홀 수학 모델과 Three.js 구현 연결

> 이 문서는 `components/WebGLScene.tsx` v0.0.126의 실제 수식과 코드에 근거합니다. 일반상대론 기반 정확한 광선 추적 또는 유체 시뮬레이션이 아니라 **시네마틱 근사 시각화**입니다.

## 물리량과 장면 상수

| 상수 | 코드 값 | 의미 |
| --- | --- | --- |
| `RS` | `0.65` | 장면 내 슈바르츠실트 기준 반지름 |
| `PHOTON_ORBIT` | `1.5 * RS` | 슈바르츠실트 광자 구면 기준 |
| `ISCO` | `3.0 * RS` | 비회전 블랙홀의 안정 원궤도 하한 기준 |
| `INFALL_OUTER` | `4.10` | 입자 유입 시작 반지름 |
| `INFALL_INNER` | `RS * 1.012` | 입자 유입 종료 반지름 |
| `GM_SCENE` | `1.15` | 회전 속도 조절용 장면 계수 |
| `DISK_INCLINATION` | `1.08` | 원반 기울기(라디안) |
| `DISK_ROLL` | `-0.40` | 원반 화면 회전(라디안) |

실제 물리학의 `r_s = 2GM/c²`, `r_photon = 1.5 r_s`, `r_ISCO = 3 r_s` 비율을 참조하지만, 장면의 `GM_SCENE`과 `RS`는 동일한 단위계로 묶인 값이 아니므로 실제 천체의 물리량으로 해석하면 안 됩니다.

## 1. 반지름 감소: `spiralRadius()`

가정: `dr/dt = -k / sqrt(r)` (`k > 0`). 양변을 적분하면 `r^(3/2)`가 시간에 대해 선형으로 감소합니다. 진행률 `p ∈ [0,1]`에 대해:

```text
q0 = r_outer^(3/2)
q1 = r_inner^(3/2)
q(p) = q0 + (q1 - q0) * p
r(p) = q(p)^(2/3)
```

코드는 `Math.pow(outer+(inner-outer)*p,2/3)`을 사용합니다. 이는 일반상대론적 유체 이류의 정확한 해가 아닙니다.

## 2. 나선 각도: `spiralAngle()`

회전 속도는 케플러 근사 `omega(r) ∝ sqrt(GM/r³)`를 따르도록 설계했습니다. 위 `q = r^(3/2)`에 대해 `omega ∝ 1/q`이고, `q`가 선형으로 변화할 때 누적 각도는 로그 형태가 됩니다.

```text
q0 = INFALL_OUTER ** 1.5
q1 = INFALL_INNER ** 1.5
q  = q0 + (q1 - q0) * p
winding = 4.3 * sqrt(GM_SCENE) * log(q0 / q) / (q0 - q1) * q0
theta = phase - winding
```

`4.3`과 `q0/(q0-q1)`은 장면의 회전량을 조절하는 스케일링 계수입니다. **로그 함수의 사용은 위 가정과 일관되지만 실제 각속도·시간의 엄밀한 물리 단위와는 별개입니다.**

## 3. 3차원 원반 변환: `infallPosition()`

```text
x0 = r * cos(theta)
y0 = r * sin(theta)
y  = y0 * cos(inclination) - height * sin(inclination)
z  = y0 * sin(inclination) + height * cos(inclination)
x' = x0 * cos(roll) - y * sin(roll)
y' = x0 * sin(roll) + y * cos(roll)
position = (x', y', z)
```

이 변환은 원반의 기울기와 3D 공간 배치를 담당하며 중력 자체를 계산하지 않습니다.

## 4. 약한 장 렌즈 근사: `lensDeflection()`

슈바르츠실트 블랙홀의 약한 장 빛 편향 근사:

```text
alpha ≈ 4GM / (c² b) = 2 r_s / b
```

코드는 `b = max(impact, PHOTON_ORBIT * 1.025)`로 최소값을 제한하고, `alpha = min(1.10, 2 * RS / b)`로 상한을 둡니다. `lensedFarSidePoint()`에서 이 각도를 이용해 먼 쪽 원반의 화면상 높이를 조정합니다. **광자 구면 부근의 실제 강한 중력 렌즈나 블랙홀 그림자의 정확한 형태는 계산하지 않습니다.**

## 5. GPU 강착원반: `ACCRETION_FRAGMENT`

```glsl
float omega = pow(max(r, 0.32), -1.5);
float azimuth = theta + time * omega;
float swirl = azimuth * 8.0 - 30.0 * log(max(r, 0.32));
float turbulence = noise(vec2(azimuth * 9.0 + r * 3.0,
                              r * 39.0 - time * 2.1 + uLayer * 3.7));
float filament = pow(.5 + .5 * sin(swirl + 3.3 * turbulence), 7.0);
```

`omega ∝ r^(-3/2)`는 안쪽 회전이 빠른 모습을 표현하고, 로그 항은 나선팔의 감김을 표현합니다. 노이즈와 색상 혼합, `beaming` 값은 사실적 인상을 위한 아트 디렉션입니다. 색상으로 실제 온도나 복사전달을 계산하지 않습니다.

## 6. 미니 블랙홀: `MINI_ACCRETION_FRAGMENT`

```glsl
float flow = a * 5.0 - r * 23.0 + uTime * (.70 + 1.6 / (r + .5));
float bands = pow(.5 + .5 * sin(flow), 3.0);
```

작은 강착원반은 원반 지오메트리 전체를 한꺼번에 회전시키기보다, `uTime`에 따라 셰이더 내부 패턴이 변화하도록 구현했습니다. 독립 입자 시스템과 합성되므로 실제 입자 유체 해석과는 다릅니다.

## 7. 정확도와 확장 가능성

현재 모델에 **포함되지 않은 것**: 아인슈타인 장방정식의 수치해, 널 측지선 적분, Kerr 블랙홀의 프레임 드래깅, GRMHD 강착유동, 실제 도플러/중력 적색편이 복사전달.

향후 물리 기반 모드가 필요하다면 화면 연출용 모델과 별도 계층으로 구현해야 합니다. 기존 시각화 상수와 물리적 SI 단위를 혼용하지 않는 것이 중요합니다.

## 참고 자료 (이론 배경, 현재 코드의 정확도 보증 아님)

- Schwarzschild radius: https://en.wikipedia.org/wiki/Schwarzschild_radius
- Photon sphere: https://en.wikipedia.org/wiki/Photon_sphere
- Innermost stable circular orbit: https://en.wikipedia.org/wiki/Innermost_stable_circular_orbit
- Gravitational lensing: https://en.wikipedia.org/wiki/Gravitational_lens

관련 소스: [`../../components/WebGLScene.tsx`](../../components/WebGLScene.tsx)
