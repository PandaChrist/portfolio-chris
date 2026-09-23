"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  CodeBrackets,
  ContainerStack,
  DatabaseStack,
  HelmWheel,
  PaymentCard,
  ServiceMesh,
  Terminal,
} from "./DevObjects";
import type { SkillGroup } from "@/content/site";

/**
 * Scales its child in when selected and out when not, so switching groups reads
 * as one object being swapped for another rather than a hard cut.
 */
function Slot({ active, children }: { active: boolean; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const target = active ? 1 : 0;
    const next = THREE.MathUtils.damp(group.current.scale.x, target, 6, delta);
    group.current.scale.setScalar(next);
    // Below this the object is a speck; skip drawing it and its children.
    group.current.visible = next > 0.01;

    // Sway rather than spin: several of these glyphs are flat, and a full
    // rotation would edge them on to the camera half the time.
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.45) * 0.55;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.32) * 0.14;
  });

  return (
    <group ref={group} scale={0}>
      {children}
    </group>
  );
}

const objects: Record<SkillGroup["icon"], React.ReactNode> = {
  code: <CodeBrackets scale={1.15} />,
  layout: <Terminal scale={0.62} rotation={[0.05, -0.25, 0]} />,
  server: <ServiceMesh scale={1.2} />,
  database: <DatabaseStack scale={0.95} />,
  payment: <PaymentCard scale={1.0} rotation={[0.12, -0.3, -0.05]} />,
  cloud: (
    <group>
      <ContainerStack scale={0.62} position={[0, -0.5, 0]} rotation={[0.1, 0.5, 0]} />
      <HelmWheel scale={0.5} position={[0.1, 0.9, -0.3]} />
    </group>
  ),
};

export default function SkillsCanvas({
  icons,
  active,
}: {
  icons: SkillGroup["icon"][];
  active: number;
}) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 38 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <pointLight position={[-4, -2, 2]} intensity={18} color="#f5b301" distance={12} decay={2} />

      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2} position={[2, 3, 4]} scale={[5, 5, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-3, 0, 2]} scale={[4, 4, 1]} color="#f5b301" />
      </Environment>

      {icons.map((icon, index) => (
        <Slot key={icon} active={index === active}>
          {objects[icon]}
        </Slot>
      ))}
    </Canvas>
  );
}
