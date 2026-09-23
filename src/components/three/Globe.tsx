"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { landDots } from "@/lib/land-mask";
import { arcPoints, facingQuaternion, latLonToVector3 } from "@/lib/geo";
import { places, type PlaceId } from "@/lib/places";

const ACCENT = "#f5b301";
const RADIUS = 1;

/* ------------------------------------------------------------- land dots */

const CAMERA_Z = 3.5;

const dotsVertexShader = /* glsl */ `
  #define CAMERA_Z ${CAMERA_Z.toFixed(1)}

  uniform float uSize;
  uniform float uPixelRatio;
  varying float vFacing;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    // uSize is the dot's width in CSS pixels at the globe's centre; CAMERA_Z
    // normalises the perspective divide so the far limb shrinks and the near
    // face doesn't balloon.
    gl_PointSize = uSize * uPixelRatio * (CAMERA_Z / -mv.z);

    // On a unit sphere the surface normal is the position itself.
    vFacing = normalize(normalMatrix * normalize(position)).z;
  }
`;

const dotsFragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  varying float vFacing;

  void main() {
    // Square points -> round dots.
    vec2 offset = gl_PointCoord - 0.5;
    if (dot(offset, offset) > 0.25) discard;

    // Fade out around the limb instead of popping at the silhouette.
    float alpha = smoothstep(-0.05, 0.45, vFacing);
    if (alpha < 0.02) discard;

    gl_FragColor = vec4(uColor, alpha * 0.9);
  }
`;

function LandDots({ size = 2.6 }: { size?: number }) {
  const { gl } = useThree();

  const positions = useMemo(() => {
    const dots = landDots();
    const array = new Float32Array((dots.length / 2) * 3);
    for (let i = 0; i < dots.length / 2; i++) {
      const point = latLonToVector3(dots[i * 2], dots[i * 2 + 1], RADIUS * 1.002);
      array[i * 3] = point.x;
      array[i * 3 + 1] = point.y;
      array[i * 3 + 2] = point.z;
    }
    return array;
  }, []);

  const uniforms = useMemo(
    () => ({
      uSize: { value: size },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uColor: { value: new THREE.Color("#cfcbc2") },
    }),
    [gl, size],
  );

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={dotsVertexShader}
        fragmentShader={dotsFragmentShader}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------- atmosphere */

const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const atmosphereFragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    // Fresnel: bright only where the surface turns away from the viewer.
    float rim = pow(1.0 - abs(dot(vNormal, vView)), 3.2);
    gl_FragColor = vec4(uColor, rim * 0.3);
  }
`;

function Atmosphere() {
  const uniforms = useMemo(() => ({ uColor: { value: new THREE.Color("#7fa6ff") } }), []);

  return (
    <mesh scale={1.1}>
      <sphereGeometry args={[RADIUS, 48, 48]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------- graticule */

/** Latitude and longitude circles — quiet, but they sell the sphere. */
function Graticule() {
  const rings = useMemo(() => {
    const lines: THREE.Vector3[][] = [];

    for (let lat = -60; lat <= 60; lat += 30) {
      const points: THREE.Vector3[] = [];
      for (let lon = -180; lon <= 180; lon += 4) {
        points.push(latLonToVector3(lat, lon, RADIUS * 1.001));
      }
      lines.push(points);
    }

    for (let lon = -180; lon < 180; lon += 30) {
      const points: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 4) {
        points.push(latLonToVector3(lat, lon, RADIUS * 1.001));
      }
      lines.push(points);
    }

    return lines;
  }, []);

  return (
    <>
      {rings.map((points, index) => (
        <Line key={index} points={points} color="#2a2a34" lineWidth={1} transparent opacity={0.55} />
      ))}
    </>
  );
}

/* ---------------------------------------------------------------- markers */

function Marker({ place }: { place: (typeof places)[PlaceId] }) {
  const rings = useRef<THREE.Group>(null);
  const position = useMemo(
    () => latLonToVector3(place.lat, place.lon, RADIUS * 1.01),
    [place.lat, place.lon],
  );

  useFrame(({ clock }) => {
    if (!rings.current) return;
    rings.current.children.forEach((child, index) => {
      // Two rings a half-period apart, so one is always expanding.
      const t = (clock.elapsedTime * 0.55 + index * 0.5) % 1;
      const scale = 0.4 + t * 2.6;
      child.scale.setScalar(scale);
      const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      material.opacity = (1 - t) * 0.55;
    });
  });

  return (
    <group
      position={position}
      // +Z of the group points back at the globe's centre, so anything drawn in
      // its XY plane lies flat on the surface.
      onUpdate={(self) => self.lookAt(0, 0, 0)}
    >
      <mesh>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshBasicMaterial color={ACCENT} toneMapped={false} />
      </mesh>

      <group ref={rings}>
        {[0, 1].map((index) => (
          <mesh key={index}>
            <ringGeometry args={[0.03, 0.038, 40]} />
            <meshBasicMaterial color={ACCENT} transparent opacity={0.5} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
        ))}
      </group>

      {/* A short stalk lifting the marker off the surface. */}
      <mesh position={[0, 0, -0.045]}>
        <cylinderGeometry args={[0.004, 0.004, 0.09, 6]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.6} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** A connection between two places, with a packet running along it. */
function Arc({ from, to }: { from: PlaceId; to: PlaceId }) {
  const packet = useRef<THREE.Mesh>(null);

  const points = useMemo(
    () => arcPoints(places[from], places[to], RADIUS, 72),
    [from, to],
  );

  useFrame(({ clock }) => {
    if (!packet.current) return;
    const t = (clock.elapsedTime * 0.28) % 1;
    const index = Math.floor(t * (points.length - 1));
    const next = Math.min(points.length - 1, index + 1);
    packet.current.position.lerpVectors(points[index], points[next], t * (points.length - 1) - index);
  });

  return (
    <>
      <Line points={points} color={ACCENT} lineWidth={1.4} transparent opacity={0.4} />
      <mesh ref={packet}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshBasicMaterial color={ACCENT} toneMapped={false} />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ globe */

/**
 * The globe itself.
 *
 * Two nested groups: the outer one carries the viewer's drag and the idle
 * auto-spin, the inner one carries a fixed quaternion that brings the project's
 * primary country round to face the camera. Keeping them separate means the
 * drag never has to undo the framing.
 */
export default function Globe({
  placeIds,
  tier = "high",
}: {
  placeIds: PlaceId[];
  tier?: "low" | "high";
}) {
  const spin = useRef<THREE.Group>(null);
  const [dragging, setDragging] = useState(false);

  const drag = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 });

  const framing = useMemo(() => {
    const primary = places[placeIds[0]];
    return facingQuaternion(primary.lat, primary.lon);
  }, [placeIds]);

  const arcs = useMemo(
    () => placeIds.slice(1).map((id) => [placeIds[0], id] as const),
    [placeIds],
  );

  useFrame(({ clock }, delta) => {
    if (!spin.current) return;
    const state = drag.current;

    if (!dragging) {
      // Coast on whatever velocity the drag left behind...
      state.vx *= 0.94;
      state.vy *= 0.94;
      state.x += state.vx;
      state.y += state.vy;

      // ...then ease back to the framed view. A continuous spin would carry the
      // project's own country off the far side within a few seconds, which is
      // the one thing this globe exists to show. The residual sway keeps it
      // from looking frozen.
      const rest = Math.sin(clock.elapsedTime * 0.22) * 0.1;
      const pull = Math.min(1, delta * 0.9);
      state.x += (rest - state.x) * pull;
      state.y += (0 - state.y) * pull;
    }

    // Never let the viewer flip the globe past its poles.
    state.y = THREE.MathUtils.clamp(state.y, -0.7, 0.7);

    spin.current.rotation.y = state.x;
    spin.current.rotation.x = state.y;
  });

  // The drag starts on the globe but continues wherever the pointer goes, so
  // once it is under way the window owns the move and release events. Tracking
  // them on the 3D object instead would stall the spin the moment the cursor
  // left the sphere.
  useEffect(() => {
    if (!dragging) return;

    const onMove = (event: PointerEvent) => {
      const state = drag.current;
      const dx = (event.clientX - state.lastX) * 0.006;
      const dy = (event.clientY - state.lastY) * 0.006;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.x += dx;
      state.y = THREE.MathUtils.clamp(state.y + dy, -0.7, 0.7);
      state.vx = dx;
      state.vy = dy;
    };

    const onUp = () => setDragging(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging]);

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    drag.current.lastX = event.clientX;
    drag.current.lastY = event.clientY;
    drag.current.vx = 0;
    drag.current.vy = 0;
    setDragging(true);
  };

  return (
    <group onPointerDown={onPointerDown}>
      {/* Invisible grab surface, so the pointer doesn't have to land on a dot. */}
      <mesh visible={false}>
        <sphereGeometry args={[RADIUS * 1.2, 16, 16]} />
        <meshBasicMaterial />
      </mesh>

      <Atmosphere />

      <group ref={spin}>
        <group quaternion={framing}>
          {/* Opaque core: gives the globe a body and depth-occludes the far side. */}
          <mesh>
            <sphereGeometry args={[RADIUS * 0.992, 64, 64]} />
            <meshStandardMaterial color="#0c0c12" roughness={0.9} metalness={0.1} />
          </mesh>

          <Graticule />
          <LandDots size={tier === "low" ? 2.2 : 2.8} />

          {placeIds.map((id) => (
            <Marker key={id} place={places[id]} />
          ))}

          {arcs.map(([from, to]) => (
            <Arc key={`${from}-${to}`} from={from} to={to} />
          ))}
        </group>
      </group>
    </group>
  );
}
