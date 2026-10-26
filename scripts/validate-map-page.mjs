// Run: node scripts/validate-map-page.mjs
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8')
const map=JSON.parse(read('src/data/island-map-v0.4.json'))
const canonical=JSON.parse(read('docs/data/island-map-landuse-v0.4.json'))
const points=JSON.parse(read('docs/data/island-map-markers-v0.4.json'))
assert.equal(map.schema,canonical.schema)
assert.equal(map.cellSizeM,20)
assert.deepEqual(map.runs,canonical.runs)
assert.deepEqual(map.classes.map(x=>x.id),canonical.classes.map(x=>x.id))
assert.equal(map.pins.length,10)
assert.deepEqual(map.pins.map(x=>x.id),points.pins.map(x=>x.id))
for(const p of map.pins){
  const idx=map.classes.findIndex(z=>z.id===p.id)
  assert(idx>=0,'Unknown pin id')
  const key=p.point.join(',')
  const found=map.runs.some(([x,y,t,n])=>t===idx&&p.point[1]===y+10&&p.point[0]>=x+10&&p.point[0]<x+20*n&&((p.point[0]-x-10)%20===0))
  assert(found,'Pin outside zone cell: '+p.id+' ('+key+')')
}
console.log('PASS: map model matches canonical v0.4 and all ten markers lie in assigned zones')
