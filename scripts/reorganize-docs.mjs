#!/usr/bin/env node
/**
 * Aqua Paradise documentation migration. Runs LOCALLY against a full git checkout.
 * Default is DRY RUN: node scripts/reorganize-docs.mjs
 * Apply only after reviewing report: node scripts/reorganize-docs.mjs --apply
 * Supports only documentation and historical artifacts; NEVER moves runtime source.
 */
import {existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const docs=path.join(root,'docs'),apply=process.argv.includes('--apply');
function git(...args){return execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim()}
if(apply && git('status','--porcelain'))throw new Error('Working tree is not clean: commit or stash changes first.');
const pages=['homepage','zones','attractions','map','hotel','visit','tickets','planner'];
const moves=new Map();
for(const page of pages)moves.set(`docs/aqua-paradise-${page}-blueprint.md`,`docs/pages/${page}.md`);
for(const file of ['project-bible.md','website-requirements.md','aqua-paradise-master-blueprint.md'])moves.set('docs/'+file,'docs/master/'+file);
for(const file of readdirSync(docs).filter(n=>n.endsWith('-site-plan.md')||n==='aqua-paradise-island-masterplan.md'||n==='aqua-paradise-geography-model.md'))moves.set('docs/'+file,'docs/island/'+file);
for(const file of readdirSync(path.join(docs,'data')).filter(n=>/v0\.[123]\.(json|svg)$/.test(n)))moves.set('docs/data/'+file,'docs/archive/data/'+file);
const missing=[...moves.keys()].filter(p=>!existsSync(path.join(root,p)));
if(missing.length)throw new Error('Missing expected files: '+missing.join(', '));
const entries=git('ls-files','-z').split('\0').filter(Boolean);
const transform=(text,oldFile,newFile)=>{
  // Markdown relative links: resolve against OLD location, then relativize to NEW location.
  return text.replace(/(\]\()([^)]*)(\))/g,(_,open,target,close)=>{
    if(/^(?:[a-z]+:|#|\/\/|mailto:)/i.test(target))return open+target+close;
    let [part,frag='']=target.split('#');if(!part)return open+target+close;
    const oldDest=path.posix.normalize(path.posix.join(path.posix.dirname(oldFile),part));
    const newDest=moves.get(oldDest)||oldDest;
    let rel=path.posix.relative(path.posix.dirname(newFile),newDest);if(!rel.startsWith('.'))rel='./'+rel;
    return open+rel+(frag?'#'+frag:'')+close;
  });
};
const textual=entries.filter(p=>/\.(md|mdx)$/.test(p));
const changes=new Map();
for(const file of textual){
 const src=readFileSync(path.join(root,file),'utf8'),dest=moves.get(file)||file,next=transform(src,file,dest);
 if(next!==src||dest!==file)changes.set(file,{dest,content:next});
}
console.log(JSON.stringify({mode:apply?'apply':'dry-run',moves:[...moves],rewrittenMarkdown:[...changes.keys()]},null,2));
if(!apply)process.exit(0);
for(const [src,dst] of moves){mkdirSync(path.dirname(path.join(root,dst)),{recursive:true});renameSync(path.join(root,src),path.join(root,dst));}
for(const {dest,content} of changes.values())writeFileSync(path.join(root,dest),content,'utf8');
console.log('Moves complete. BEFORE committing, review git diff, search stale path strings and run npm run build + map validator.');
