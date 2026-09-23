"use client";

import { Canvas } from "@react-three/fiber";
import Globe from "./Globe";
import type { PlaceId } from "@/lib/places";

export default function GlobeCanvas({
  placeIds,
  tier = "high",
}: {
  placeIds: PlaceId[];
  tier?: "low" | "high";
}) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={tier === "low" ? [1, 1.4] : [1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 3.5], fov: 34, near: 0.1, far: 12 }}
    >
      {/* Lit from the upper right so the terminator falls across the sphere and
          the dotted continents read as curved rather than flat. */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 4]} intensity={1.3} />
      <pointLight position={[-3, -1, 2]} intensity={12} color="#f5b301" distance={9} decay={2} />

      <Globe placeIds={placeIds} tier={tier} />
    </Canvas>
  );
}
