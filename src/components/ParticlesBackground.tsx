import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Box } from "@mui/material";
import { useThemeMode } from "@/contexts/ThemeModeContext";
import { OutMode } from "@tsparticles/engine";

export function ParticlesBackground() {
  const [ready, setReady] = useState(false);
  const { mode } = useThemeMode();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -9999,
        pointerEvents: "none",
      }}
    >
      <Particles
        id="tsparticles"
        options={{
          background: { color: { value: mode === "dark" ? "#121212" : "#f9f9f9" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              grab: {
                distance: 120,
                links: {
                  opacity: 0.3,
                },
              },
            },
          },
          particles: {
            color: { value: mode === "dark" ? "#aaa" : "#999" },
            links: {
              color: mode === "dark" ? "#888" : "#999",
              distance: 120,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              outModes: { default: OutMode.bounce },
            },
            number: { value: 50, density: { enable: true } },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />
    </Box>
  );
}
