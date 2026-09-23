"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import Backdrop from "./Backdrop";
import {
  CodeBrackets,
  ContainerStack,
  DatabaseStack,
  Dust,
  GitGraph,
  HelmWheel,
  PaymentCard,
  ServiceMesh,
  Terminal,
} from "./DevObjects";

/**
 * Tilts the whole cluster toward the pointer and pushes it away as the hero
 * scrolls out of frame, so the scene hands the page over instead of just
 * disappearing behind it.
 */
function Rig({ children, tier }: { children: React.ReactNode; tier: "low" | "high" }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Portrait screens put the headline on top of the cluster, so it shrinks and
  // recentres rather than being cropped by the right edge.
  const portrait = viewport.aspect < 1;
  const scale = portrait ? 0.58 : Math.min(1, viewport.aspect / 1.6);
  const offsetX = portrait ? 0 : 0.6;

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;

    const damp = Math.min(1, delta * 2.4);
    const scrolled = typeof window === "undefined" ? 0 : window.scrollY / window.innerHeight;
    const fade = Math.min(1, Math.max(0, scrolled));

    group.current.rotation.y += (pointer.x * 0.26 - group.current.rotation.y) * damp;
    group.current.rotation.x += (-pointer.y * 0.16 - group.current.rotation.x) * damp;
    group.current.position.z += (fade * -6 - group.current.position.z) * damp;
    group.current.position.y += (fade * 1.4 - group.current.position.y) * damp;
  });

  return (
    <group ref={group} position={[offsetX, 0, 0]} scale={tier === "low" ? scale * 0.9 : scale}>
      {children}
    </group>
  );
}

function Scene({ tier }: { tier: "low" | "high" }) {
  const high = tier === "high";

  return (
    <>
      <Backdrop />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 6]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -2, 3]} intensity={26} color="#f5b301" distance={14} decay={2} />
      <pointLight position={[5, 3, -2]} intensity={16} color="#5b7cff" distance={16} decay={2} />

      {/* Reflections come from lightformers rather than a downloaded HDRI —
          the metal reads correctly and nothing leaves the bundle. */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[3, 3, 4]} scale={[6, 6, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.4} position={[-4, 1, 2]} scale={[5, 5, 1]} color="#f5b301" />
        <Lightformer form="ring" intensity={1.1} position={[0, -3, -2]} scale={5} color="#4a5a8a" />
      </Environment>

      <Rig tier={tier}>
        <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.42}>
          <Terminal position={[2.1, 0.35, 0]} rotation={[0.04, -0.38, 0.02]} />
        </Float>

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.55}>
          <PaymentCard position={[3.3, -1.25, 1.1]} rotation={[0.2, -0.55, -0.16]} scale={0.72} />
        </Float>

        <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.35}>
          <ContainerStack position={[1.35, -2.05, -1.1]} rotation={[0.1, 0.55, 0]} scale={0.68} />
        </Float>

        <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.4}>
          <HelmWheel position={[4.15, 1.75, -2.6]} scale={0.5} />
        </Float>

        <Float speed={1.0} rotationIntensity={0.24} floatIntensity={0.45}>
          <DatabaseStack position={[-5.4, -2.0, -4.2]} scale={0.5} />
        </Float>

        {high ? (
          <>
            <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.5}>
              <ServiceMesh position={[-5.0, 2.05, -3.6]} scale={0.7} />
            </Float>

            <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
              <GitGraph position={[4.55, -2.3, -3.4]} scale={0.66} />
            </Float>

            <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
              <CodeBrackets position={[1.0, 2.15, -2.6]} rotation={[0, 0.3, 0]} scale={0.46} />
            </Float>
          </>
        ) : null}

        <Dust count={high ? 260 : 110} />
      </Rig>
    </>
  );
}

export default function HeroCanvas({ tier = "high" }: { tier?: "low" | "high" }) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={tier === "low" ? [1, 1.4] : [1, 1.9]}
      gl={{ antialias: tier === "high", powerPreference: "high-performance", alpha: false }}
      camera={{ position: [0, 0, 9], fov: 35, near: 0.1, far: 40 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <Scene tier={tier} />
    </Canvas>
  );
}
