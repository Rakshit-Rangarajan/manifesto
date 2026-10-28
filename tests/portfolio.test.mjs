import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (path) => readFileSync(new URL("../"+path, import.meta.url), "utf8");
test("flagship project pages and links",()=>{ const gallery=read("components/portfolio-showcase.tsx"); const page=read("app/projects/[slug]/page.tsx"); for(const slug of ["aero","athena","promptflow-studio"]){ assert.ok(gallery.includes(slug)); assert.ok(page.includes(slug)); } });
test("case study evidence and static paths",()=>{const c=read("app/projects/[slug]/page.tsx"); assert.match(c,/Evidence policy/); assert.match(c,/generateStaticParams/);});
test("AI metadata has no obsolete placeholders",()=>{const c=read("app/layout.tsx");assert.match(c,/AI Problem Solver/);assert.doesNotMatch(c,/weaponize AI|google-site-verification-code|YOUR_CLOUDFLARE_TOKEN/);});
test("proof section labels unverified outcomes",()=>{const c=read("components/impact-and-proof.tsx");assert.match(c,/Measure results/);assert.doesNotMatch(c,/\\d+%/);});
