import { useMemo } from 'react';

const palms = [
[17,43],[21,37],[25,58],[30,63],[34,48],[38,34],[43,61],[47,44],[53,35],[57,58],[61,47],[65,37],[72,54],[76,63],[70,72],[59,74],[38,72],[31,79],[23,68],[18,53],[80,45],[69,30],[36,24],[47,23],[58,24],[75,34],[29,35],[54,66],[42,55],[63,63],[28,48],[77,48],[52,79],[43,81]
] as const;
const gardenFlowers = [[43,48],[46,43],[53,45],[57,49],[44,58],[56,56],[51,61],[39,53],[60,53],[49,38]] as const;
const reef = [[11,26],[13,73],[87,23],[88,69],[19,86],[80,85],[8,51],[92,44]] as const;
function Palm({x,y,i}:{x:number;y:number;i:number}) {return <g transform={`translate(${x} ${y}) rotate(${i*43%100-50})`} opacity=".94"><path d="M0 1.8 L0 -1" stroke="#715f39" strokeWidth=".55" strokeLinecap="round"/><path d="M0 -1 Q-3 -4 -4.2 -2 M0 -1 Q-1 -5 1 -5 M0 -1 Q3 -4 4.3 -2 M0 -1 Q4 1 4 2 M0 -1 Q-4 1 -4 2" stroke={i%3===0?'#c0d28a':'#315f43'} strokeWidth="1.05" fill="none" strokeLinecap="round"/></g>}
function Building({x,y,w=7,h=5,roof='#d8a26b'}:{x:number;y:number;w?:number;h?:number;roof?:string}){return <g transform={`translate(${x} ${y})`}><rect x={-w/2} y={-h/2+1} width={w} height={h} rx=".55" fill="#fff1d0" stroke="#9d8d69" strokeWidth=".4"/><path d={`M${-w/2-1} ${-h/2+1} L0 ${-h/2-1.4} L${w/2+1} ${-h/2+1} Z`} fill={roof} stroke="#806d4d" strokeWidth=".35"/>{[-1,0,1].map(n=><rect key={n} x={n*w/4-.45} y="0" width=".9" height="1.7" fill="#54898b"/>)}</g>}
export default function MapArtwork(){
const trees=useMemo(()=>palms.map(([x,y],i)=><Palm key={i} x={x} y={y} i={i}/>),[]);
return <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="apr-map-artwork" aria-hidden="true">
<defs>
 <radialGradient id="sea"><stop stopColor="#2c9eaa"/><stop offset=".68" stopColor="#087080"/><stop offset="1" stopColor="#083f54"/></radialGradient>
 <linearGradient id="land" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#91b77b"/><stop offset=".5" stopColor="#4f966f"/><stop offset="1" stopColor="#387b65"/></linearGradient>
 <linearGradient id="sand"><stop stopColor="#fff1cc"/><stop offset="1" stopColor="#d7b77d"/></linearGradient>
 <radialGradient id="lagoon"><stop stopColor="#7ee1d6"/><stop offset="1" stopColor="#1c9ea9"/></radialGradient>
 <filter id="shadow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="1.2"/></filter>
 <pattern id="waves" width="11" height="10" patternUnits="userSpaceOnUse"><path d="M0 6 Q2 4 4 6 T8 6" stroke="#c2eee4" strokeOpacity=".18" strokeWidth=".18" fill="none"/></pattern>
 <clipPath id="island"><path d="M49 11 C56 8 63 12 69 14 C78 12 84 17 83 25 C91 30 90 39 86 47 C93 56 88 67 81 71 C79 80 70 85 59 86 C54 92 46 92 41 87 C29 87 22 81 19 72 C11 67 10 57 15 49 C9 40 14 30 21 27 C23 18 33 15 40 15 C43 12 46 11 49 11 Z"/></clipPath>
</defs>
<rect width="100" height="100" fill="url(#sea)"/><rect width="100" height="100" fill="url(#waves)"/>
{reef.map(([x,y],i)=><g key={i} opacity=".36"><ellipse cx={x} cy={y} rx="4.5" ry="2.2" fill="#6cc9bd"/><path d={`M${x-4} ${y} Q${x} ${y-2.8} ${x+4} ${y}`} stroke="#dbf4e5" strokeWidth=".45" fill="none"/></g>)}
<path d="M49 11 C56 8 63 12 69 14 C78 12 84 17 83 25 C91 30 90 39 86 47 C93 56 88 67 81 71 C79 80 70 85 59 86 C54 92 46 92 41 87 C29 87 22 81 19 72 C11 67 10 57 15 49 C9 40 14 30 21 27 C23 18 33 15 40 15 C43 12 46 11 49 11 Z" fill="#032d39" opacity=".5" transform="translate(1 1.5)" filter="url(#shadow)"/>
<path d="M49 11 C56 8 63 12 69 14 C78 12 84 17 83 25 C91 30 90 39 86 47 C93 56 88 67 81 71 C79 80 70 85 59 86 C54 92 46 92 41 87 C29 87 22 81 19 72 C11 67 10 57 15 49 C9 40 14 30 21 27 C23 18 33 15 40 15 C43 12 46 11 49 11 Z" fill="url(#sand)" stroke="#e9e5c5" strokeWidth=".9"/>
<g clipPath="url(#island)">
<path d="M49 14 C59 12 67 17 75 19 C82 27 84 34 80 44 C89 54 82 68 74 74 C65 82 53 88 42 83 C30 84 20 73 20 61 C15 47 23 32 32 24 C39 19 42 16 49 14" fill="url(#land)"/>
<path d="M16 42 Q27 24 43 32 Q51 38 59 26 Q71 17 85 35 L87 48 Q69 42 65 51 Q55 59 43 50 Q27 55 15 62Z" fill="#2e6d57" opacity=".48"/>
<path d="M25 23 Q33 17 42 22 Q45 28 40 34 L28 35Z" fill="#4d8067"/>
<path d="M44 26 Q48 12 54 15 Q59 18 62 27 L55 34 L47 34Z" fill="#71886e"/>
<path d="M44 27 L50 15 L57 28Z" fill="#839182" stroke="#526d67" strokeWidth=".5"/><path d="M50 15 L53 27 L57 28" fill="#a7a89a" opacity=".7"/>
<path d="M63 18 Q78 14 82 26 Q78 36 68 34 Q61 30 63 18Z" fill="url(#sand)"/>
<path d="M67 20 Q78 18 79 26 Q77 31 70 31 Q64 29 67 20Z" fill="url(#lagoon)" stroke="#e9f4d9" strokeWidth=".9"/>
<path d="M21 35 Q32 28 37 40 Q36 49 25 52 Q18 47 21 35Z" fill="#235c67"/>
<path d="M23 37 Q30 32 34 40 Q32 47 25 48Z" fill="#2c98ad" stroke="#b2e1cf" strokeWidth=".4"/>
<path d="M19 59 Q27 52 37 61 Q38 72 29 75 Q20 72 19 59Z" fill="#a8c89d" opacity=".65"/>
<path d="M61 57 Q71 50 79 60 Q77 72 68 74 Q61 70 61 57Z" fill="#9fcb89"/>
<path d="M38 38 Q50 31 61 40 Q68 53 59 63 Q44 69 37 58 Q31 46 38 38Z" fill="#4f9a70" stroke="#c6d29e" strokeWidth=".7"/>
<path d="M44 42 Q49 38 54 42 Q57 48 53 53 Q46 55 43 50Z" fill="#8ac5a4"/>
<g stroke="#f4dcb0" strokeWidth="1.25" strokeLinecap="round" fill="none" opacity=".95">
<path d="M49 83 Q48 77 48 73 Q47 65 49 54 Q39 57 31 65 M49 54 Q59 57 68 64 M49 54 Q61 48 70 45 Q74 35 69 26 M49 54 Q48 41 50 30 M49 54 Q38 46 29 45 Q28 36 33 27"/>
<path d="M31 65 Q25 57 29 45 Q30 34 33 27 Q43 20 50 30 Q60 25 69 26 Q80 37 70 45 Q77 58 68 64 Q58 78 49 83" strokeWidth=".7" strokeDasharray="1.4 1.1"/>
</g>
{trees}
{gardenFlowers.map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="1.8" fill={i%2?'#e7a9b5':'#f1c8cd'} opacity=".9"/><circle cx={x} cy={y} r=".7" fill="#fff0cd"/></g>)}
{/* Northwest secluded hotel */}
<path d="M24 21 Q32 17 39 22 L38 31 Q31 35 25 29Z" fill="#d5c4a3" opacity=".55" stroke="#f6e7c9" strokeWidth=".5" strokeDasharray="1 .6"/>
<Building x={32} y={26} w={10} h={5} roof="#e4cf9c"/><Building x={27} y={22} w={4} h={3} roof="#c7a774"/><Building x={37} y={22} w={4} h={3} roof="#c7a774"/>
<ellipse cx="32" cy="30" rx="4.5" ry="1.1" fill="#65c9c4" stroke="#fff4d5" strokeWidth=".4"/>
{/* Adrenaline slides */}
{[0,1,2,3].map((n)=><path key={n} d={`M${47+n*2} 23 Q${44+n*3} 27 ${47+n*2} 30 T${44+n*3} 35`} stroke={['#f4a83e','#e96d56','#4dbfcb','#f3d063'][n]} strokeWidth="1.2" fill="none" strokeLinecap="round"/>)}
<path d="M46 23 L49 17 L53 23" stroke="#ede1c4" strokeWidth=".7" fill="none"/>
{/* Atlantis */}
{[25,29,33].map((x,i)=><g key={i}><ellipse cx={x} cy={43+i%2*2} rx="3" ry="2.4" fill="#42b8c4" stroke="#b6e6d5" strokeWidth=".45"/><path d={`M${x-2} ${43+i%2*2} L${x-1.5} ${39+i%2*2} L${x+1.5} ${39+i%2*2} L${x+2} ${43+i%2*2}`} fill="#74c8d0" stroke="#d4eadb" strokeWidth=".5"/></g>)}
{/* Pirate port */}
<Building x={73} y={42} w={8} h={5} roof="#a66c4a"/><path d="M76 47 L81 50 L75 50Z" fill="#82553a"/><path d="M78 46 L78 51" stroke="#f3e1b9" strokeWidth=".5"/><path d="M78 47 L81 49 L78 49" fill="#f0d7a5"/>
{/* Spa */}
<ellipse cx="29" cy="65" rx="7.2" ry="4.4" fill="#b7d6bb"/><ellipse cx="29" cy="65" rx="5.1" ry="2.5" fill="#70c6bd" stroke="#f5e9cc" strokeWidth=".6"/><Building x={29} y={61} w={7} h={3} roof="#b4a277"/>
{/* Children */}
{[0,1,2].map((i)=><g key={i}><ellipse cx={65+i*3} cy={67-i} rx="2.5" ry="2" fill="#5dcbd3"/><path d={`M${65+i*3} ${62-i} Q${63+i*3} ${65-i} ${66+i*3} ${67-i}`} stroke={['#eec568','#e98592','#7e9cda'][i]} strokeWidth="1.1" fill="none"/></g>)}
{/* Garden pavilion */}
<ellipse cx="49" cy="51" rx="5.8" ry="3.5" fill="#b0d6b5" stroke="#e8ebc8" strokeWidth=".6"/><path d="M44 51 Q49 43 54 51 M49 46 L49 54 M45 49 L53 49" fill="none" stroke="#e9f5e1" strokeWidth=".6"/><ellipse cx="49" cy="56" rx="2.1" ry="1.2" fill="#62b9bc" stroke="#e9ddbd" strokeWidth=".4"/>
{/* Market and entrance */}
{[40,45,51,56].map((x,i)=><Building key={i} x={x} y={72+(i%2)*2} w={5} h={3} roof={i%2?'#d68c61':'#e7b47b'}/>)}
<Building x={49} y={82} w={13} h={5} roof="#e4bb7b"/><path d="M46 84 L46 79 Q49 76 52 79 L52 84" stroke="#fff0c8" strokeWidth=".8" fill="none"/>
</g>
{/* Southern arrivals */}
<path d="M49 84 L49 96 M44 88 L39 95 M54 88 L59 95" stroke="#d7c8a6" strokeWidth=".8" fill="none"/>
<path d="M39 95 L43 94 L45 96 M55 96 L58 94 L61 95" stroke="#e4dfc6" strokeWidth=".5" fill="none"/>
<path d="M49 94 L28 99" stroke="#d4e2d9" strokeWidth=".5" strokeDasharray="2 .8"/><rect x="46" y="91" width="6" height="2.1" rx=".4" fill="#eee7d3"/>
<g transform="translate(17 17)" fill="none" stroke="#f4dfb1" strokeWidth=".45"><circle r="3.5"/><path d="M0 -5 V5 M-5 0 H5"/><path d="M0 -4 L1 0 L0 4 L-1 0Z" fill="#f4dfb1"/></g>
<text x="17" y="10.8" fontFamily="Georgia,serif" fontSize="2.8" textAnchor="middle" fill="#f4dfb1" letterSpacing=".45">N</text>
</svg>;
}
