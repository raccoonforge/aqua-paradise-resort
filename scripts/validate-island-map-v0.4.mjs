// Run: node scripts/validate-island-map-v0.4.mjs
import fs from "node:fs";
import assert from "node:assert/strict";
const m=JSON.parse(fs.readFileSync(new URL("../docs/data/island-map-landuse-v0.4.json",import.meta.url),"utf8"));
const size=m.cellSizeM, all=new Map(), totals=Array(m.classes.length).fill(0);
for(const [x,y,t,n] of m.runs){assert(Number.isInteger(n)&&n>0);for(let i=0;i<n;i++){const k=`${x+i*size},${y}`;assert(!all.has(k),"Overlapping cells");all.set(k,t);totals[t]++}}
assert.equal(all.size,m.totalCells);
function components(type){let seen=new Set(),cnt=0;for(const [start,t] of all){if(t!==type||seen.has(start))continue;cnt++;let q=[start];seen.add(start);for(let i=0;i<q.length;i++){const [x,y]=q[i].split(",").map(Number);for(let key of [`${x+size},${y}`,`${x-size},${y}`,`${x},${y+size}`,`${x},${y-size}`]){if(all.get(key)===type&&!seen.has(key)){seen.add(key);q.push(key)}}}}return cnt}
for(let i=0;i<m.classes.length;i++){let c=m.classes[i],actual=totals[i]*size*size/10000;assert(Math.abs(actual-c.targetHa)<=0.041,`Area incorrect ${c.id}`);assert.equal(components(i),c.connectedComponents,`Connectivity mismatch ${c.id}`);if(i<10)assert.equal(components(i),1,`Destination district fragmented ${c.id}`)}
console.log("PASS: "+all.size+" grid cells, named districts contiguous, areas within ±0.04 ha.");
