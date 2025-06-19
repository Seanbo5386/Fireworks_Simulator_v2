# Fireworks_Simulator_v2

This project is a Three.js based fireworks simulator. The code is structured around an **Experience** class which manages the renderer, camera, and other components. The key folders are:

- `src/app` – entry point (`main.js`) and world setup (`World.js`).
- `src/experience` – shared 3D experience classes (`Experience.js`, `Controls.js`, `Environment.js`, `PostProcessing.js`).
- `src/fireworks` – logic specific to the fireworks simulation.
- `src/particles` – simple GPU‑less particle system with shader placeholders.
- `src/utils` – utilities for resize and timing events.

Use `npm run dev` to start the Vite development server or `npm run build` to create a production build.
