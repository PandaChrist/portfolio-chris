import * as THREE from "three";

/**
 * Sphere maths for the globe. Importing this module pulls in three, so only 3D
 * components should touch it — plain country data lives in places.ts.
 */

/** Lat/lon in degrees -> point on a sphere of the given radius. */
export function latLonToVector3(lat: number, lon: number, radius = 1): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/**
 * Rotation that brings the given coordinates round to face the camera on +Z.
 *
 * Expressed as a quaternion rather than Euler angles so it stays independent of
 * rotation order — the drag handler then layers its own yaw/pitch on a parent
 * group without the two interfering.
 */
export function facingQuaternion(lat: number, lon: number): THREE.Quaternion {
  const direction = latLonToVector3(lat, lon, 1).normalize();
  return new THREE.Quaternion().setFromUnitVectors(direction, new THREE.Vector3(0, 0, 1));
}

/**
 * A great-circle-ish arc between two coordinates, lifted off the surface so it
 * reads as a connection rather than a line drawn on the sphere.
 */
export function arcPoints(
  from: { lat: number; lon: number },
  to: { lat: number; lon: number },
  radius = 1,
  segments = 64,
): THREE.Vector3[] {
  const start = latLonToVector3(from.lat, from.lon, radius);
  const end = latLonToVector3(to.lat, to.lon, radius);
  const lift = 0.12 + start.angleTo(end) * 0.18;

  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = new THREE.Vector3().copy(start).lerp(end, t);
    // Re-project onto the sphere, then bulge outward with a sine so both
    // endpoints stay exactly on the surface.
    point.normalize().multiplyScalar(radius * (1 + Math.sin(Math.PI * t) * lift));
    points.push(point);
  }
  return points;
}
