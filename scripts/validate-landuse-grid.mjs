// Aqua Paradise concept land-use grid checks (Node.js 20+).
// Run: node scripts/validate-landuse-grid.mjs
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const data = JSON.parse(readFileSync(new URL("../docs/data/island-landuse-grid-study-v0.3.json", import.meta.url),"utf8"));
const size = data.cellSizeM, area = size*size/10000;
const lookup = new Map();
const tally=Array(data.classification.length).fill(0);
for (const [x,y,type,length] of data.runs) {
  assert(Number.isInteger(type) && type>=0 && type<tally.length, "Unknown classification");
  assert(Number.isInteger(length) && length>0, "Invalid run length");
  for(let i=0;i<length;i++) {
    const key=`${x+i*size},${y}`;
    assert(!lookup.has(key), `Cell collision: ${key}`);
    lookup.set(key,type);tally[type]++;
  }
}
assert.equal(lookup.size,data.totalCells,"Grid cell count");
const summary = data.classification.map((classInfo,i)=>{
  const expected = classInfo.rasterHa, actual=tally[i]*area;
  assert(Math.abs(expected-actual)<0.00001, `Area mismatch: ${classInfo.id}`);
  const visited=new Set(),clusters=[];
  for(const [key,type] of lookup) {
    if(type!==i||visited.has(key))continue;
    const queue=[key];visited.add(key);
    for(let cursor=0;cursor<queue.length;cursor++){
      const [x,y]=queue[cursor].split(",").map(Number);
      for(const neighbor of [`${x-size},${y}`,`${x+size},${y}`,`${x},${y-size}`,`${x},${y+size}`]){
        if(lookup.get(neighbor)===i&&!visited.has(neighbor)){visited.add(neighbor);queue.push(neighbor);}
      }
    }
    clusters.push(queue.length);
  }
  clusters.sort((a,b)=>b-a);
  return {id:classInfo.id,areaHa:actual,components:clusters.length,largestComponentHa:(clusters[0]||0)*area,disconnectedHa:clusters.slice(1).reduce((a,b)=>a+b,0)*area};
});
console.table(summary);
console.log(`Total modeled land: ${(lookup.size*area).toFixed(2)} ha; 20m grid; raster shoreline approximation only.`);
const disjointZones=summary.filter(x=>x.components>1&&x.id!=="nature-buffers-reserve"&&x.id!=="shared-infrastructure");
if(disjointZones.length){console.error("NOT READY for /map: visitor zones fragmented: "+disjointZones.map(x=>x.id).join(", "));process.exitCode=1;}
