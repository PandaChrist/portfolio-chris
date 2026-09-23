import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2] ?? ".";
const gj = JSON.parse(fs.readFileSync(path.join(dir, "land.geojson"), "utf8"));

// Flatten to a list of rings grouped per polygon, with bboxes for fast rejection.
const polys = [];
for (const f of gj.features) {
  const g = f.geometry;
  const list = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
  for (const rings of list) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [x, y] of rings[0]) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    polys.push({ rings, minX, minY, maxX, maxY });
  }
}

function inRing(ring, x, y) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function isLand(lon, lat) {
  for (const p of polys) {
    if (lon < p.minX || lon > p.maxX || lat < p.minY || lat > p.maxY) continue;
    if (!inRing(p.rings[0], lon, lat)) continue;
    let hole = false;
    for (let h = 1; h < p.rings.length; h++) {
      if (inRing(p.rings[h], lon, lat)) { hole = true; break; }
    }
    if (!hole) return true;
  }
  return false;
}

// Equal-area-ish candidate grid: latitude bands, longitude count scaled by cos(lat).
// MUST stay byte-for-byte identical to the runtime reconstruction in src/lib/land-mask.ts.
const STEP = 1.2;
const bands = [];
let total = 0;
for (let lat = -90 + STEP / 2; lat < 90; lat += STEP) {
  const count = Math.max(1, Math.round((360 * Math.cos((lat * Math.PI) / 180)) / STEP));
  bands.push({ lat, count });
  total += count;
}

const bytes = new Uint8Array(Math.ceil(total / 8));
let idx = 0;
let landCount = 0;
for (const b of bands) {
  for (let i = 0; i < b.count; i++) {
    const lon = -180 + (360 * (i + 0.5)) / b.count;
    if (isLand(lon, b.lat)) {
      bytes[idx >> 3] |= 1 << (idx & 7);
      landCount++;
    }
    idx++;
  }
}

console.log("STEP", STEP, "candidates", total, "land dots", landCount, "bytes", bytes.length);
fs.writeFileSync(path.join(dir, "mask.b64"), Buffer.from(bytes).toString("base64"));
console.log("base64 length", Buffer.from(bytes).toString("base64").length);
