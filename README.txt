I am trying to create the most amazing fireworks simulator that can be viewed in a browser. It should be hosted locally, allowing the user to go their localhost and use the application. Below is the example file structure, feel free to adjust as needed.

├── 📄 .gitignore
├── 📄 index.html             # Main HTML file, contains the canvas
├── 📄 package.json          # Project dependencies (three, vite, etc.)
├── 📄 README.md
|
├── 📁 public/                 # Static assets that are copied as-is
│   ├── 📁 audio/
│   │   ├── 🔉 launch-whistle.mp3
│   │   ├── 🔉 explosion-1.mp3
│   │   ├── 🔉 explosion-2.mp3
│   │   └── 🔉 crackle.mp3
│   └── 📁 textures/
│       └── 🖼️ smoke.png
│
└── 📁 src/                    # Main application source code
    |
    ├── 📁 app/                # Core application logic
    │   ├── 📜 main.js          # Entry point, initializes the world
    │   └── 📜 World.js         # Manages scene, camera, renderer, update loop
    |
    ├── 📁 experience/         # The 3D experience components
    │   ├── 📜 Experience.js    # Main class that holds all 3D components
    │   ├── 📜 Controls.js      # User input handling (e.g., mouse, UI)
    │   ├── 📜 Environment.js   # Manages lighting, background, fog
    │   └── 📜 PostProcessing.js # Sets up the EffectComposer and passes (Bloom)
    |
    ├── 📁 fireworks/          # Specific logic for fireworks simulation
    │   ├── 📜 FireworksController.js # Manages launching and tracking fireworks
    │   └── 📜 Firework.js            # Class representing a single firework
    |
    ├── 📁 particles/          # Our custom GPU particle system
    │   ├── 📜 ParticleSystem.js # The main class to manage the particle geometry/material
    │   └── 📁 shaders/
    │       ├── 📜 particles.vertex.glsl   # Vertex shader for particle physics
    │       └── 📜 particles.fragment.glsl # Fragment shader for particle color/alpha
    |
    └── 📁 utils/                # Reusable helper modules
        ├── 📜 Sizes.js         # Manages viewport size and resize events
        ├── 📜 Time.js          # Manages the main requestAnimationFrame loop
        └── 📜 assets.js         # Preloader for textures and other assets