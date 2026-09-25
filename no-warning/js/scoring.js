import {dimensionLabels} from './questions.js';

const clamp=n=>Math.max(0,Math.min(1,n));
const asSet=v=>new Set(Array.isArray(v)?v:[v]);

function jaccard(a,b){const A=asSet(a),B=asSet(b);const union=new Set([...A,...B]);if(!union.size)return 1;let i=0;A.forEach(x=>{if(B.has(x))i++});return i/union.size}
function complementScore(q,a,b){if(Array.isArray(a)||Array.isArray(b)) return 0;const pairs=q.complements||[];return pairs.some(([x,y])=>x===a&&y===b)?1:0}
function questionScore(q,a,b){const similarity=Array.isArray(a)||Array.isArray(b)?jaccard(a,b):(a===b?1:Math.max(0,1-Math.abs(Number(a)-Number(b))/Math.max(1,(q.options?.length||2)-1)));const comp=complementScore(q,a,b);return clamp(.7*similarity+.3*Math.max(comp, similarity*.35));}

export function scoreChemistry(questions,a1,a2){
 const dims={};Object.keys(dimensionLabels).forEach(k=>dims[k]={sum:0,w:0});
 let total=0,w=0;const details=[];
 for(const q of questions){const a=a1[q.id],b=a2[q.id];if(a==null||b==null)continue;const s=questionScore(q,a,b),qw=q.weight||1;total+=s*qw;w+=qw;for(const d of q.dimensions||[]){dims[d].sum+=s*qw;dims[d].w+=qw}details.push({questionId:q.id,score:s,similarity:Array.isArray(a)||Array.isArray(b)?jaccard(a,b):(a===b?1:0),complement:complementScore(q,a,b)});}
 const dimensionScores={};Object.entries(dims).forEach(([k,v])=>dimensionScores[k]=Math.round((v.w?v.sum/v.w:.5)*100));
 const overall=Math.round((w?total/w:.5)*100);
 return {overall,dimensions:dimensionScores,details,title:chemistryTitle(overall,dimensionScores)};
}

export function chemistryTitle(overall,d){
 const max=Object.entries(d).sort((a,b)=>b[1]-a[1])[0]?.[0];
 if(d.tension>=82&&d.flirting>=78)return 'THE TENSION IS REAL';
 if(d.mental>=84&&d.connection>=78)return 'MENTAL MAGNETISM';
 if(d.spontaneity>=82&&d.flirting>=75)return 'DANGEROUSLY PLAYFUL';
 if(d.connection>=84&&d.affection>=78)return 'SAME FREQUENCY';
 if(overall>=86)return 'FULL SIGNAL';
 if(overall>=74)return max==='attraction'?'MAGNETIC ENERGY':'LOCKED IN';
 if(overall>=60)return 'SLOW BURN';
 return 'CHEMISTRY IN PROGRESS';
}

export function buildNarrative(result,questions,a1,a2){
 const sorted=Object.entries(result.dimensions).sort((a,b)=>b[1]-a[1]);
 const strongest=sorted.slice(0,2).map(([k])=>dimensionLabels[k].replace(/^\S+\s/,''));
 const same=result.details.filter(x=>x.similarity>=.99).slice(0,3).map(x=>questions.find(q=>q.id===x.questionId));
 const comps=result.details.filter(x=>x.complement===1).slice(0,3).map(x=>questions.find(q=>q.id===x.questionId));
 const discovery=[...result.details].sort((a,b)=>Math.abs(.5-b.score)-Math.abs(.5-a.score))[0];
 return {dynamic:`Your strongest chemistry shows up through ${strongest.join(' and ')}. The overall score reflects both shared instincts and differences that can fit together naturally — not a prediction of relationship success.`,match:same.length?`You lined up strongly on ${same.map(q=>`“${q.prompt}”`).join(', ')}.`:'Your strongest match is more about overall pattern than identical answers.',switchUp:comps.length?`Some of your best matches came from opposite-but-compatible roles, especially around ${comps.map(q=>`“${q.prompt}”`).join(', ')}.`:'Your differences were mostly preference variations rather than clear role complements.',discovery:discovery?`One reveal worth talking about: “${questions.find(q=>q.id===discovery.questionId)?.prompt}” produced one of your more distinctive chemistry patterns.`:'Your reveal is balanced across the test.'};
}
