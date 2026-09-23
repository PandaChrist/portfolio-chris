"use client";

/**
 * Single entry point for every WebGL scene.
 *
 * All three canvases are dynamically imported through this one module on
 * purpose. Pointing `next/dynamic` at three separate files produced three
 * separate chunks, each carrying its own full copy of three.js — roughly 1.6 MB
 * for what is one 550 kB library. Funnelling them through a shared module gives
 * every scene the same chunk, so the second one costs nothing and a visitor
 * moving from the home page to a case study never downloads three twice.
 */

export { default as HeroCanvas } from "./HeroCanvas";
export { default as SkillsCanvas } from "./SkillsCanvas";
export { default as GlobeCanvas } from "./GlobeCanvas";
