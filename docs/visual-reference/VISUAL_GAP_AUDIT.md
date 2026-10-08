# Official visual target / v0.0.57

Reference: `official-visual-target.png` (8 GitBlog hubs). This is a **design target**, not an actual browser screenshot.

## Navigation integrity
- [x] 8 main hubs: Profile, Career, Projects, Portfolio, GitHub, Expertise, Training, Archive
- [x] Sidebar uses the same data as WebGL overlay
- [x] 3D topology has eight anchors and local orbit configurations
- [ ] Confirm actual GitBlog destinations and routing (currently hash placeholders)

## Visual gap (requires real browser screenshots)
- [ ] Hub structures should resemble detailed orbital stations
- [ ] Energy rivers need more dimensional filament lighting
- [ ] Background should contain coherent mini-infrastructure instead of random fragments
- [ ] Contrast and lighting need reference-image comparison
- [ ] Responsive and runtime FPS validation

**Never claim visual parity without screenshots and runtime testing.**


### v0.0.61 Relay silhouette
- Changed: bare diamond visual replaced by a designed orbital relay satellite near each hub.
- Still to verify: actual projected scale, overlaps, FPS and cinematic target similarity in a browser.


### v0.0.62 silhouette audit
- Implemented: six-sided relay hardware replaces ambiguous tilted square; station ribs, colored strips, relay placement and reduced shell clutter.
- Still open: target image shows much more elaborate orbital docks, atmospheric light rivers and background infrastructure.
- Status: code-level change verified, screenshot parity and browser runtime **not yet verified**.


### v0.0.63 River material audit
- Changed: fourth hot filament, hub-tinted backbone, stronger centerline contrast.
- Remaining: station metallic materials, actual screenshot comparison, volumetric pulse wake and measured performance.
- Status: source implementation only; not visually verified in browser.

## v0.0.64 — user screenshot audit (2026-10-08)

| Component | Observed in v0.0.63 screenshot | v0.0.64 source change | Browser recheck |
|---|---|---|---|
| Hub station | Eight similarly shaped spherical wireframes | Menu-specific dock arms and metal chassis | Pending |
| Relay | Tiny icon-like satellites | Larger relay, moved outward | Pending |
| Background | Dense squares/fragment clutter | Reduced local sparks and struts; global field still needs optimization | Pending |
| River | Some silver cable-like backbones | Deferred to targeted river geometry/material audit | Pending |
| Labels | Text intersects structures | Requires camera projection/overlay work in v0.0.67 | Pending |
| FPS | HUD shows 14 | Do not claim improvement; measure and profile in v0.0.65 | Pending |
| Turbopack | Internal panic reported | Webpack default for dev/build | Local confirmation pending |


## v0.0.65 — Performance audit

The user screenshot for v0.0.63 showed 14 FPS in the HUD. This release introduces tier-dependent GPU/CPU workload reductions; actual improvement must be measured on the same machine and viewport. Record FPS, draw calls, triangles, quality tier and browser. The LOW tier intentionally sacrifices background debris and postprocessing while keeping the eight main stations and navigation intact.


## v0.0.68 — Target image versus v0.0.63 user screenshot (source-backed corrective pass)

| Area | Target | User's v0.0.63 screenshot | v0.0.68 corrective action | Verified in browser? |
|---|---|---|---|---|
| Eight menus | Profile, Career, Projects, Portfolio, GitHub, Expertise, Training, Archive | Eight stations visible | Navigation retained | No |
| Station architecture | Dense recognizable orbital docks | Relatively thin ring structures | Prior v0.0.64 dock arm variations retained; major fidelity gap remains | No |
| Portfolio glyph | Legible portfolio symbol | Ambiguous tilted wireframe diamonds | Replaced three wireframe squares with solid stacked data panels | No |
| Energy rivers | Strong chromatic braided energy | Silver/grey backbone appearance | Reduce body width/opacity, raise colored filament/core and lower white mix | No |
| Background | Structured sci-fi infrastructure | Excess fragments and wireframes | Prior LOW/BALANCED quality optimization retained; composition gap remains | No |
| Performance | Smooth real-time interaction | 14 FPS shown in HUD | Prior quality-tier controls retained; no benchmark available | No |

This is an evidence-limited comparison: the target image and prior user screenshot were available in the conversation, but no automated side-by-side pixel evaluation or live v0.0.68 browser screenshot has been obtained.


## v0.0.70 — Screenshot-based audit vs official target

| Element | Official target | v0.0.69 screenshot | v0.0.70 change | Browser proof |
|---|---|---|---|---|
| Hub labels | Compact floating text beside stations | Opaque cards cover station centers | Cards removed, titles above stations | Pending |
| Selection | Main core unobstructed | Center overlay obscures AI core | Right drawer on explicit selection | Pending |
| Lower HUD | Four differentiated dense instrumentation panels | Four tiny sparse panels | Larger circular FPS/frame/calls/triangles; network traffic; real resource bars; active context | Pending |
| Station geometry | Highly detailed physical metallic platforms | Sparse low-poly rings | Not addressed; next geometry pass | Pending |
| River | Bright chromatic braided energy | Silver-grey cables | Not addressed; next river pass | Pending |
| Performance | Smooth 60fps concept | LOW mode ~18-20 FPS shown | No performance improvement claimed; profiling remains P0 | Pending |

The reference is a concept illustration, not a literal performance or GPU/CPU telemetry specification. Metrics displayed in the actual app are derived from WebGL renderer instrumentation, not synthetic device usage percentages.


### v0.0.72 audit — performance-first brightness correction
Observed v0.0.71 screenshots on GTX 660 (2GB): LOW ~17–19 FPS, ~1,600+ draw calls; this is a screenshot observation, not a controlled benchmark. Repeated peripheral infrastructure and secondary river layers are now gated or instanced; 8 colored core energy backbones are brightened for LOW without bloom. Target visual fidelity is not yet met: station geometry, detailed metallic surfaces and semantic hub silhouettes still need work.


## v0.0.73 — Official Singularity reference gap

The updated official target is `official-visual-target.png` (black-hole composition).
- Implemented: black event horizon, blue/white accretion bands, containment rings, core activation interaction.
- Open: physically convincing lensing, complex metallic station body, illuminated plasma wisps, rich cinematic environment, and visual quality verification.
- Prior screenshot baseline: GTX 660 LOW 25 FPS / 1,193 calls (v0.0.72); v0.0.73 not yet benchmarked.


## v0.0.74 — Approved cinematic singularity target
- Official reference replaced with the user-approved high-detail singularity scene.
- Actual v0.0.73 screenshot: flat dark circle, thin rings, little plasma; the reference is **not** yet achieved.
- v0.0.74 code adds a GPU-shaded luminous spiral disk, bright photon rim and slow orbiting lights; actual browser comparison remains pending.
- Still missing: physically convincing gravitational lensing, thick luminous disk depth, metallic installation detail, rich star/nebula background, eight detailed station models, fine fiber connections.


### v0.0.75 inspection targets (pending browser verification)
- Accretion disk should read as a bright turbulent spiral, not concentric flat hoops.
- Event horizon must remain truly black and distinguishable from surrounding light.
- Orbiting light particles must remain visible and travel slowly rather than being removed.
- LOW profile must be measured on GTX 660; static checks cannot confirm visual fidelity or FPS.
- The eight stations, cosmic background and energy fibers remain incomplete relative to the approved target; do not declare the whole composition complete.


## v0.0.76 — New official target: spiral inflow
Reference replaced with the user-approved image depicting a high-energy black-hole vortex and numerous luminous fragments spiraling toward the center. Current implementation adds inbound GPU-batched Points, but still lacks volumetric nebulae, polished orbital stations, and the target's braided multicolor streams. Browser comparison pending.


## v0.0.77 — Spiral flow gap
- Previous: infall particle phase and shader advection were not explicitly aligned; points were too small to read in LOW.
- Implemented: unified positive XY angular convention, larger batched points, 3/4 distinct spiral guide lanes, and radial contraction.
- Pending: actual browser screenshot and time-series validation; visual match to concept art NOT yet confirmed.


## v0.0.78 audit (implementation, not visual sign-off)
- Addressed: counterclockwise orbit mismatch, tiny uniform lights, insufficient outer particle spread, and lack of hub-origin gravitational debris.
- Still open: low visual density of stations/background, grey cable energy rivers, cinematic black-hole depth, actual browser motion and low-end FPS.
- Official reference image retained unchanged; no new image generated.


## v0.0.79 audit — inward fiber network
- Changed all eight energy rivers from outward gray cables to hub-colored, clockwise inward spirals.
- Geometry now begins at each hub and ends in the central capture zone.
- Pulse, knot and packet progression follows that same direction; live hub deformation now anchors the beginning of each curve.
- Still requires browser visual inspection against `official-visual-target.png`, including motion, overlap, clipping and GTX 660 FPS.
- Other outstanding gaps: hub station materials, unique silhouettes, environment density and black-hole depth.

## v0.0.81 visual gap review
- **Official target inspected:** high-density blue/amber nebula, asteroids and bright orbital structures around a luminous 3D accretion flow.
- **v0.0.80 user screenshot:** mostly near-black empty right/left space, minimal backdrop, flat-looking central ring and simple 8 station blocks.
- **Implemented:** procedural nebula background and small distant relays, especially on the right, with restrained contrast and GPU quality tiers.
- **Still open:** target-level central disk volumetrics, eight unique station sculptures, warm/cool energy fibers, and target-level material richness.
- **Validation status:** code-level checks only; no claim of screenshot parity or GTX 660 FPS acceptance.


## v0.0.90 — black-hole acceptance status

**Not visually approved.** Source changes: integrated infall travel clock, cached 8 hub anchors, removed one artificial halo ring, reduced proxy lens arcs and limited static guide lanes to HIGH.

**Evidence:** numerical/static checks pass. `npm install` timed out in this environment; production build, browser shader compilation, screenshots and real GPU FPS remain unverified.

**Next acceptance gate:** successful production build, actual browser screenshot versus official reference, and 20-second metrics on LOW/BALANCED/HIGH. If any fail, continue v0.0.91 before asking user to run the final candidate.
