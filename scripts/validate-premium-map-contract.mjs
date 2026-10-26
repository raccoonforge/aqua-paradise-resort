import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'))
const canonical=read('docs/data/island-map-landuse-v0.4.json')
const runtime=read('src/data/island-map-v0.4.json')
const markers=read('docs/data/island-map-markers-v0.4.json')
assert.equal(runtime.schema,canonical.schema)
assert.deepEqual(runtime.runs,canonical.runs)
assert.deepEqual(runtime.classes.map(c=>c.id),canonical.classes.map(c=>c.id))
assert.deepEqual(runtime.pins.map(p=>p.id),markers.pins.map(p=>p.id))
const ids=new Set(runtime.classes.map(c=>c.id))
assert.equal(ids.size,12)
assert.equal(runtime.pins.length,10)
for(const pin of runtime.pins){assert(ids.has(pin.id),'Unexpected pin '+pin.id);assert(pin.point.every(Number.isFinite))}
console.log('PASS premium-map data contract: canonical district IDs, all 10 pins and land-use cells match.')
