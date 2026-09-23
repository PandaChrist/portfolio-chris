"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Value-noise fbm drives a slow smoke over the ink, plus a soft accent bloom
 * that drifts toward the pointer. The faint horizontal ticks are there to hint
 * at a scanline without ever resolving into one.
 */
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uPointer;
  uniform vec3 uAccent;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.02;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;

    float n = fbm(uv * 3.2 + vec2(uTime * 0.026, uTime * 0.017));
    float n2 = fbm(uv * 7.0 - vec2(uTime * 0.012, 0.0));

    vec2 centre = vec2(0.5) + uPointer * 0.14;
    float glow = smoothstep(0.62, 0.0, distance(uv * vec2(1.6, 1.0), centre * vec2(1.6, 1.0)));

    vec3 base = mix(vec3(0.028, 0.028, 0.035), vec3(0.062, 0.058, 0.074), n);
    base += vec3(0.02, 0.018, 0.03) * n2;
    base += uAccent * glow * 0.17 * (0.55 + 0.45 * n);

    // Vignette, so the type over the top always keeps its contrast.
    float vignette = smoothstep(1.15, 0.25, distance(uv, vec2(0.5)));
    base *= 0.35 + 0.65 * vignette;

    // Sparse scan ticks.
    base += uAccent * 0.012 * step(0.986, fract(uv.y * 150.0 + uTime * 0.08));

    gl_FragColor = vec4(base, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/**
 * Full-viewport shader plane sitting behind everything else in the scene.
 * Placed at a fixed depth and resized to exactly fill the frustum there, so it
 * covers the canvas at any aspect ratio without a second camera or a render pass.
 */
export default function Backdrop({ depth = -8 }: { depth?: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { camera, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uAccent: { value: new THREE.Color("#f5b301") },
    }),
    [],
  );

  // Plane dimensions that exactly fill the camera frustum at `depth`.
  const scale = useMemo<[number, number, number]>(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    const distance = perspective.position.z - depth;
    const height = 2 * Math.tan((perspective.fov * Math.PI) / 360) * distance;
    return [height * (size.width / size.height), height, 1];
  }, [camera, depth, size.width, size.height]);

  useFrame(({ clock, pointer }, delta) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = clock.elapsedTime;

    const target = material.current.uniforms.uPointer.value as THREE.Vector2;
    // Damped so the bloom lags the cursor instead of snapping to it.
    target.x += (pointer.x - target.x) * Math.min(1, delta * 2.2);
    target.y += (pointer.y - target.y) * Math.min(1, delta * 2.2);
  });

  return (
    <mesh position={[0, 0, depth]} scale={scale} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  );
}
