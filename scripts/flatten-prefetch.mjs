import fs from "node:fs";
import path from "node:path";

/**
 * Next 16's static export writes the per-segment RSC prefetch payloads into
 * nested directories:
 *
 *   out/fr/__next.$d$lang/__PAGE__.txt
 *
 * but the client asks for the same payload with the separators flattened into
 * dots:
 *
 *   /fr/__next.$d$lang.__PAGE__.txt
 *
 * On a server with rewrites that difference is invisible; on GitHub Pages,
 * which serves files exactly as named, every <Link> prefetch 404s and the
 * router falls back to a full document load.
 *
 * This copies each payload to the flattened name the client actually requests.
 * It is additive: the nested files stay, so if a future Next release lines the
 * two up, the extra copies are simply never asked for.
 */

const OUT = path.resolve(process.argv[2] ?? "out");

if (!fs.existsSync(OUT)) {
  console.error(`flatten-prefetch: ${OUT} does not exist — run the build first.`);
  process.exit(1);
}

let written = 0;

/** Collect every .txt payload that sits under a `__next.*` directory. */
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.name.endsWith(".txt")) continue;

    const relative = path.relative(OUT, full).split(path.sep);
    const marker = relative.findIndex((segment) => segment.startsWith("__next."));

    // Only payloads *inside* a `__next.…` directory need flattening; the ones
    // already written as a single filename are requested as-is.
    if (marker === -1 || marker === relative.length - 1) continue;

    const flattened = [
      ...relative.slice(0, marker),
      relative.slice(marker).join("."),
    ];
    const target = path.join(OUT, ...flattened);

    if (fs.existsSync(target)) continue;
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(full, target);
    written++;
  }
}

walk(OUT);
console.log(`flatten-prefetch: wrote ${written} flattened prefetch payload(s)`);
