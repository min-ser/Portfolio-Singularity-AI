# v0.0.97 — Official target comparison and validation gate

## Evidence
- Target: `official-visual-target.png` (concept illustration, not actual rendered app).
- Observed baseline: user-supplied v0.0.91 screenshot (1677×887, BALANCED, FPS HUD ≈31).
- This release's browser screenshot: **not captured**. Do not report visual parity.

| Feature | Target concept | Last observed screenshot | v0.0.97 response | Status |
|---|---|---|---|---|
| Black-hole silhouette | Deep, irregularly lit dark throat | Nearly circular dark portal with concentric white rings | Preserve opaque shadow; add asymmetric swept emission | Code only |
| Accretion streams | Long intertwined cyan/violet/amber spirals | Thin cyan-white concentric loops | Single GPU caustic sheet with four logarithmic spiral ridges | Code only |
| Color variation | Hot amber, violet, cyan around disk | Primarily cyan-white | Azimuthal amber/violet/blue gas variation | Code only |
| Hub-to-core spheres | Recognizable large traveling luminous objects | Many dots; directional travel not obvious in still | v0.0.94 capture path retained | Motion not verified |
| Hub separation | Core clear, hubs outside plasma | Core overlaps near hub trails | v0.0.92 radial separation retained | Layout not verified |
| Environment | Deep structured nebula and asteroid field | Mostly flat dark background | Deferred; core priority | Gap |
| Runtime performance | Smooth interactive reference (concept) | HUD ≈31 FPS on supplied capture | No new FPS measurement | Unknown |

## Acceptance gate
1. `npm install` + `npm run build` succeeds.
2. Browser screenshot at 1677×887 BALANCED and HIGH is compared against official target.
3. Record FPS, calls, triangles and clipping after 30s warm-up.
4. Observe one full Hub→horizon sphere trajectory (not just a static screenshot).
5. Resolve failed items before marking black hole complete.

The v0.0.97 shader is an artistic approximation, not geodesic ray tracing or a real fluid solver.
