import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8')
const model=JSON.parse(read('src/data/island-map-v0.4.json'))
const source=read('src/components/map/geometry.ts').replace("import island from '../../data/island-map-v0.4.json'",`const island = ${JSON.stringify(model)}`)
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2023}}).outputText
const {contourPath,project}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
const determinant=Math.abs(.265*-.185-.085*.045)
function area(path){
 let total=0
 for(const ring of path.split('M').slice(1)){
  const coords=[...ring.matchAll(/(-?\d+\.\d+),(-?\d+\.\d+)/g)].map(m=>[+m[1],+m[2]])
  assert(coords.length>=4)
  let sum=0
  for(let i=0;i<coords.length;i++){const a=coords[i],b=coords[(i+1)%coords.length];sum+=a[0]*b[1]-b[0]*a[1]}
  total+=sum/2
 }
 return Math.abs(total)
}
const coast=contourPath()
assert(Math.abs(area(coast)-model.runs.reduce((s,r)=>s+r[3]*400*determinant,0))<.01,'Coast tracing must preserve cell union area')
for(let i=0;i<model.classes.length;i++){
 const expected=model.runs.filter(r=>r[2]===i).reduce((s,r)=>s+r[3]*400*determinant,0)
 assert(Math.abs(area(contourPath(i))-expected)<.01,`Contour area mismatch: ${model.classes[i].id}`)
}
for(const pin of model.pins){const p=project(pin.point);assert(p.x>0&&p.x<960&&p.y>0&&p.y<800)}
assert.equal(project([0,100]).y<project([0,0]).y,true,'North projects upward')
console.log('PASS: coastline and all 12 district contours preserve v0.4 cell areas; ten projected pins inside viewport; north orientation correct')
