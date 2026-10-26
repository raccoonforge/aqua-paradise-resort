import island from '../../data/island-map-v0.4.json'

export const WIDTH = 960
export const HEIGHT = 800
/** One affine projection for land, artwork and pins. Coordinates remain v0.4. */
export const project = ([x, y]: readonly number[]) => ({ x: 480 + x * .265 + y * .085, y: 405 - y * .185 + x * .045 })

/** Trace the actual cell union, including holes, without an invented shoreline. */
export function contourPath(classIndex?: number) {
  const cells = new Set<string>()
  for (const [x,y,t,n] of island.runs) {
    if (classIndex !== undefined && t !== classIndex) continue
    for (let k=0;k<n;k++) cells.add(`${x+k*20},${y}`)
  }
  const edges = new Map<string, string[]>()
  const edge = (x:number,y:number,a:number,b:number) => {
    const key = `${x},${y}`
    edges.set(key,[...(edges.get(key) ?? []),`${a},${b}`])
  }
  for (const cell of cells) {
    const [x,y]=cell.split(',').map(Number)
    if (!cells.has(`${x},${y-20}`)) edge(x,y,x+20,y)
    if (!cells.has(`${x+20},${y}`)) edge(x+20,y,x+20,y+20)
    if (!cells.has(`${x},${y+20}`)) edge(x+20,y+20,x,y+20)
    if (!cells.has(`${x-20},${y}`)) edge(x,y+20,x,y)
  }
  let path=''
  while(edges.size) {
    const start=edges.keys().next().value as string
    let current=start
    path+='M'
    do {
      const p=project(current.split(',').map(Number))
      path+=`${p.x.toFixed(2)},${p.y.toFixed(2)} `
      const source=current
      const destinations=edges.get(source)!
      current=destinations.pop()!
      if (!destinations.length) edges.delete(source)
      if (current===start) break
      path+='L'
    } while (edges.has(current))
    path+='Z '
  }
  return path
}
