"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line, RoundedBox } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

/**
 * Procedural 3D props from the developer's own vocabulary — a terminal, a
 * container stack, the Kubernetes helm, a database, a service mesh, a Git
 * graph, a payment card.
 *
 * Everything is generated from primitives: no glTF to download, no texture to
 * decode, and the whole set tree-shakes down to geometry maths. That matters on
 * a site that has to stay fast on the connections its author builds for.
 */

export const PALETTE = {
  graphite: "#1a1a20",
  steel: "#33333d",
  accent: "#f5b301",
  accentDim: "#8a6604",
  paper: "#f4f2ee",
};

type GroupProps = ThreeElements["group"];

/** Deterministic PRNG so the "random" code lines are identical on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Body({
  color = PALETTE.graphite,
  metalness = 0.75,
  roughness = 0.28,
}: {
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  return <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />;
}

function Glow({ color = PALETTE.accent, intensity = 1.6 }: { color?: string; intensity?: number }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={intensity}
      roughness={0.4}
      metalness={0}
      toneMapped={false}
    />
  );
}

/* ------------------------------------------------------------------ terminal */

/** A code editor window: chrome, traffic lights, a caret and syntax-coloured rows. */
export function Terminal(props: GroupProps) {
  const caret = useRef<THREE.Mesh>(null);

  // Rows of "code": each is a run of indented tokens of varying width, with the
  // first token in a row occasionally accented so it reads as a keyword.
  const rows = useMemo(() => {
    const rand = mulberry32(7);
    return Array.from({ length: 9 }, (_, row) => {
      const indent = rand() < 0.45 ? 0.16 : 0;
      const tokens: { width: number; x: number; accent: boolean }[] = [];
      let x = -1.28 + indent;
      const count = 2 + Math.floor(rand() * 3);
      for (let i = 0; i < count; i++) {
        const width = 0.16 + rand() * 0.5;
        tokens.push({ width, x: x + width / 2, accent: i === 0 && rand() < 0.55 });
        x += width + 0.08;
        if (x > 1.0) break;
      }
      return { y: 0.62 - row * 0.16, tokens };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!caret.current) return;
    // Square-wave blink at ~1.4Hz, like a real terminal caret.
    caret.current.visible = Math.sin(clock.elapsedTime * 4.4) > 0;
  });

  return (
    <group {...props}>
      <RoundedBox args={[3.1, 2.05, 0.16]} radius={0.07} smoothness={4}>
        <Body color={PALETTE.graphite} />
      </RoundedBox>

      {/* Screen recess */}
      <mesh position={[0, -0.09, 0.085]}>
        <planeGeometry args={[2.86, 1.66]} />
        <meshStandardMaterial color="#04040a" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Title bar */}
      <mesh position={[0, 0.86, 0.086]}>
        <planeGeometry args={[2.86, 0.22]} />
        <meshStandardMaterial color={PALETTE.steel} metalness={0.5} roughness={0.5} />
      </mesh>
      {[-1.3, -1.16, -1.02].map((x, index) => (
        <mesh key={x} position={[x, 0.86, 0.095]}>
          <circleGeometry args={[0.035, 16]} />
          <Glow color={index === 0 ? PALETTE.accent : PALETTE.steel} intensity={index === 0 ? 1.4 : 0} />
        </mesh>
      ))}

      {/* Code */}
      {rows.map((row) =>
        row.tokens.map((token, index) => (
          <mesh key={`${row.y}-${index}`} position={[token.x, row.y - 0.09, 0.092]}>
            <planeGeometry args={[token.width, 0.045]} />
            <meshStandardMaterial
              color={token.accent ? PALETTE.accent : "#54545f"}
              emissive={token.accent ? PALETTE.accent : "#2a2a33"}
              emissiveIntensity={token.accent ? 0.9 : 0.35}
              toneMapped={false}
            />
          </mesh>
        )),
      )}

      <mesh ref={caret} position={[-1.2, -0.85, 0.092]}>
        <planeGeometry args={[0.05, 0.075]} />
        <Glow intensity={2} />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------------- helm wheel */

/** The Kubernetes helm: a ring, a hub and seven spokes. */
export function HelmWheel(props: GroupProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.22;
  });

  const spokes = Array.from({ length: 7 }, (_, i) => (i / 7) * Math.PI * 2);

  return (
    <group {...props}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[1, 0.085, 16, 64]} />
          <Body color={PALETTE.steel} metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.3, 0.07, 14, 40]} />
          <Body color={PALETTE.steel} metalness={0.9} roughness={0.2} />
        </mesh>
        {spokes.map((angle) => (
          <group key={angle} rotation={[0, 0, angle]}>
            <mesh position={[0, 0.66, 0]}>
              <boxGeometry args={[0.1, 0.72, 0.1]} />
              <Body color={PALETTE.steel} metalness={0.9} roughness={0.25} />
            </mesh>
            {/* Spoke tip beyond the ring, the detail that makes it read as a helm */}
            <mesh position={[0, 1.12, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.16, 0.16, 0.1]} />
              <Glow intensity={0.8} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ----------------------------------------------------------- container stack */

/** Docker-style containers stacked and slightly offset, one of them accented. */
export function ContainerStack(props: GroupProps) {
  const layers = [
    { y: -0.44, x: 0, accent: false },
    { y: 0, x: 0.12, accent: true },
    { y: 0.44, x: -0.08, accent: false },
  ];

  return (
    <group {...props}>
      {layers.map((layer) => (
        <group key={layer.y} position={[layer.x, layer.y, 0]}>
          <RoundedBox args={[1.9, 0.38, 1.1]} radius={0.05} smoothness={3}>
            <Body color={layer.accent ? PALETTE.steel : PALETTE.graphite} />
          </RoundedBox>
          {/* Corrugation: the ridges that make a box read as a shipping container */}
          {[-0.6, -0.3, 0, 0.3, 0.6].map((x) => (
            <mesh key={x} position={[x, 0, 0.56]}>
              <boxGeometry args={[0.06, 0.3, 0.02]} />
              <meshStandardMaterial
                color={layer.accent ? PALETTE.accent : PALETTE.steel}
                emissive={layer.accent ? PALETTE.accentDim : "#000000"}
                emissiveIntensity={layer.accent ? 1 : 0}
                metalness={0.7}
                roughness={0.35}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/* --------------------------------------------------------------- database */

/** The canonical stacked-cylinder database, with a lit status ring. */
export function DatabaseStack(props: GroupProps) {
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const material = ring.current.material as THREE.MeshStandardMaterial;
    // Slow pulse, as if a query were running.
    material.emissiveIntensity = 0.7 + Math.sin(clock.elapsedTime * 2.1) * 0.5;
  });

  return (
    <group {...props}>
      {[0.52, 0, -0.52].map((y) => (
        <group key={y} position={[0, y, 0]}>
          <mesh>
            <cylinderGeometry args={[0.72, 0.72, 0.42, 48]} />
            <Body color={PALETTE.graphite} metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.72, 0.028, 10, 48]} />
            <Body color={PALETTE.steel} metalness={0.95} roughness={0.15} />
          </mesh>
        </group>
      ))}
      <mesh ref={ring} position={[0, -0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.745, 0.022, 10, 48]} />
        <Glow intensity={1} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------ service mesh */

/** Nodes on a sphere wired to their neighbours — services talking to services. */
export function ServiceMesh({ nodeCount = 14, ...props }: GroupProps & { nodeCount?: number }) {
  const ref = useRef<THREE.Group>(null);

  const { nodes, edges } = useMemo(() => {
    // Fibonacci sphere: evenly spread points without clustering at the poles.
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius));
    }

    // Wire each node to its two nearest neighbours, deduplicated.
    const seen = new Set<string>();
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    points.forEach((point, i) => {
      const nearest = points
        .map((other, j) => ({ j, distance: point.distanceTo(other) }))
        .filter((entry) => entry.j !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 2);

      nearest.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        pairs.push([point, points[j]]);
      });
    });

    return { nodes: points, edges: pairs };
  }, [nodeCount]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.16;
    ref.current.rotation.x += delta * 0.05;
  });

  return (
    <group ref={ref} {...props}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node}>
          <icosahedronGeometry args={[index % 4 === 0 ? 0.095 : 0.06, 0]} />
          {index % 4 === 0 ? <Glow intensity={1.5} /> : <Body color={PALETTE.paper} metalness={0.2} roughness={0.5} />}
        </mesh>
      ))}
      {edges.map(([from, to], index) => (
        <Line
          key={index}
          points={[from, to]}
          color={PALETTE.steel}
          lineWidth={1}
          transparent
          opacity={0.7}
        />
      ))}
    </group>
  );
}

/* --------------------------------------------------------------- git graph */

/** A branch diverging from trunk and merging back — the shape every dev reads instantly. */
export function GitGraph(props: GroupProps) {
  const trunk = useMemo(
    () => [
      new THREE.Vector3(0, -1.2, 0),
      new THREE.Vector3(0, -0.4, 0),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(0, 1.2, 0),
    ],
    [],
  );

  const branch = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.4, 0),
      new THREE.Vector3(0.62, -0.05, 0.08),
      new THREE.Vector3(0.62, 0.45, 0.08),
      new THREE.Vector3(0, 0.9, 0),
    ]);
    return curve.getPoints(48);
  }, []);

  return (
    <group {...props}>
      <Line points={trunk} color={PALETTE.steel} lineWidth={2} />
      <Line points={branch} color={PALETTE.accent} lineWidth={2} />
      {trunk.map((point, index) => (
        <mesh key={`t${index}`} position={point}>
          <sphereGeometry args={[0.085, 20, 20]} />
          <Body color={PALETTE.paper} metalness={0.2} roughness={0.5} />
        </mesh>
      ))}
      {[branch[16], branch[32]].map((point, index) => (
        <mesh key={`b${index}`} position={point}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <Glow intensity={1.4} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------- payment card */

/** A payment card with a chip and contactless arcs — the Mobile Money thread. */
export function PaymentCard(props: GroupProps) {
  return (
    <group {...props}>
      <RoundedBox args={[1.9, 1.2, 0.06]} radius={0.09} smoothness={4}>
        <Body color={PALETTE.graphite} metalness={0.8} roughness={0.22} />
      </RoundedBox>

      {/* Chip */}
      <RoundedBox args={[0.32, 0.26, 0.02]} radius={0.03} smoothness={3} position={[-0.55, 0.18, 0.04]}>
        <Body color={PALETTE.accent} metalness={0.95} roughness={0.2} />
      </RoundedBox>
      {[-0.06, 0.06].map((offset) => (
        <mesh key={offset} position={[-0.55, 0.18 + offset, 0.052]}>
          <planeGeometry args={[0.3, 0.012]} />
          <meshStandardMaterial color={PALETTE.graphite} />
        </mesh>
      ))}

      {/* Contactless arcs */}
      {[0.16, 0.24, 0.32].map((radius, index) => (
        <mesh key={radius} position={[-0.05, 0.2, 0.041]} rotation={[0, 0, -Math.PI / 2]}>
          <ringGeometry args={[radius, radius + 0.022, 32, 1, 0, Math.PI * 0.55]} />
          <Glow intensity={1.2 - index * 0.25} />
        </mesh>
      ))}

      {/* Masked card number */}
      {[-0.62, -0.18, 0.26, 0.7].map((x) => (
        <mesh key={x} position={[x, -0.3, 0.041]}>
          <planeGeometry args={[0.3, 0.05]} />
          <meshStandardMaterial color="#4a4a55" emissive="#22222a" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------------------------------------------------------- brackets */

/** An oversized `</>` built from beams. Pure signage. */
export function CodeBrackets(props: GroupProps) {
  const beam = (
    key: string,
    position: [number, number, number],
    rotation: [number, number, number],
    accent = false,
  ) => (
    <mesh key={key} position={position} rotation={rotation}>
      <boxGeometry args={[0.13, 0.86, 0.13]} />
      {accent ? <Glow intensity={1.1} /> : <Body color={PALETTE.paper} metalness={0.3} roughness={0.4} />}
    </mesh>
  );

  return (
    <group {...props}>
      {/* Left chevron "<": the beams meet on the left, so the top one leans
          right and the bottom one leans left. */}
      {beam("l1", [-0.72, 0.3, 0], [0, 0, -0.62])}
      {beam("l2", [-0.72, -0.3, 0], [0, 0, 0.62])}
      {/* Slash */}
      {beam("s", [0, 0, 0], [0, 0, 0.4], true)}
      {/* Right chevron ">" */}
      {beam("r1", [0.72, 0.3, 0], [0, 0, 0.62])}
      {beam("r2", [0.72, -0.3, 0], [0, 0, -0.62])}
    </group>
  );
}

/* ------------------------------------------------------------------- dust */

/** Drifting specks that give the empty space between objects some depth. */
export function Dust({ count = 260, radius = 9 }: { count?: number; radius?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const rand = mulberry32(21);
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      array[i * 3] = (rand() - 0.5) * radius * 2;
      array[i * 3 + 1] = (rand() - 0.5) * radius * 1.2;
      array[i * 3 + 2] = (rand() - 0.5) * radius;
    }
    return array;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color={PALETTE.paper}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
