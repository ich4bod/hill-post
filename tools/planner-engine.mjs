import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const fixture=JSON.parse(readFileSync(new URL('./levels.json',import.meta.url)));
if(process.argv[2]==='facts'){
 const cost=(l,p)=>p.slice(1).reduce((a,id,i)=>{const e=l.edges.find(e=>e.includes(id)&&e.includes(p[i]));assert(e);return [a[0]+e[2],a[1]+Math.max(0,l.nodes.find(n=>n.id===id).height-l.nodes.find(n=>n.id===p[i]).height)];},[0,0]);
 assert.deepEqual(cost(fixture[0],['s','a','b','c','t']),[8,1]);assert.deepEqual(cost(fixture[0],['s','h','t']),[4,4]);assert.deepEqual(cost(fixture[2],['s','p','q','r','t']),[4,4]);assert.deepEqual(cost(fixture[2],['s','a','b','t']),[6,1]);console.log('three delivery maps separate distance from cumulative climb');
}else{
 const root=process.env.HILL_REFERENCE||new URL('../site/',import.meta.url).pathname;
 const {levels}=await import(pathToFileURL(root+'levels.mjs'));assert.deepEqual(levels,fixture);
 const {create,move,undo,restart}=await import(pathToFileURL(root+'engine.mjs'));
 assert.throws(()=>create('missing'),RangeError);
 for(const [id,route,dist,climb] of [['contour',['a','b','c','t'],8,1],['ridge',['h','t'],4,4],['two-hills',['a','b','t'],6,1]]){
 let s=create(id);assert.deepEqual(s,{levelId:id,path:['s'],distance:0,climb:0,status:'riding'});assert.equal(undo(s),s);assert.equal(move(s,'missing'),s);assert.equal(move(s,'t'),s);
 const before=JSON.stringify(s);const next=move(s,route[0]);assert.equal(JSON.stringify(s),before);s=next;for(const node of route.slice(1))s=move(s,node);assert.equal(s.distance,dist);assert.equal(s.climb,climb);assert.equal(s.status,'delivered');assert.equal(move(s,route.at(-2)),s);assert.equal(undo(s).status,'riding');assert.deepEqual(restart(s),create(id));
 }
 let s=move(create('contour'),'h');assert.equal(s.status,'over-budget');assert.equal(s.climb,4);s=move(s,'s');assert.equal(s.climb,4);s=move(s,'h');assert.equal(s.climb,8);assert.equal(s.distance,6);s=undo(s);assert.equal(s.climb,4);assert.equal(s.distance,4);
 s=move(move(create('contour'),'h'),'t');assert.equal(s.status,'over-budget');assert.equal(move(s,'h'),s);assert.equal(undo(s).path.at(-1),'h');
 console.log('delivery engine preserves uphill cost, undo and both budgets');
}
