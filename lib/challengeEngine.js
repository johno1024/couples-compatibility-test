/* Uses the existing results object; never recalculates compatibility. */
(function(){
function list(v){return Array.isArray(v)?v:[v]}
function fits(ch,r,intensity){
 if(intensity!=='surprise'&&ch.intensity.indexOf(intensity)<0)return false;
 if(ch.loveDifference&&!r.loveDifferent)return false;
 if(ch.loveLanguage&&r.loveLanguages.indexOf(ch.loveLanguage)<0)return false;
 var cats=ch.applicableResultCategories||['*'];
 var target=ch.slot==='strength'?r.strongest:ch.slot==='grow'?r.lowest:ch.slot==='difference'?r.differenceCategory:null;
 if(target&&cats.indexOf('*')<0&&cats.indexOf(target)<0)return false;
 return true;
}
function score(ch,r,slot,usedMedia){var s=0;if(ch.slot===slot)s+=8;if(ch.slot==='any')s+=2;if(usedMedia.indexOf(ch.mediaType)<0)s+=3;if(ch.loveLanguage&&r.loveLanguages.indexOf(ch.loveLanguage)>=0)s+=5;if(ch.loveDifference&&r.loveDifferent)s+=6;return s+Math.random()}
function text(ch,r){var other=r.partnerNames[0]+' and '+r.partnerNames[1];return ch.instructions.replace(/\{strength\}/g,r.strongest).replace(/\{growth\}/g,r.lowest).replace(/\{difference\}/g,r.differenceCategory||r.lowest).replace(/\{other\}/g,other)}
function why(ch,r){if(ch.slot==='strength')return r.strongest+' was one of your strongest matches ('+r.scores[r.strongest]+'%).';if(ch.slot==='difference')return 'Your answers showed an interesting difference around '+(r.differenceCategory||r.lowest)+'.';if(ch.slot==='grow')return r.lowest+' is a Growth Opportunity at '+r.scores[r.lowest]+'%—worth understanding, not judging.';if(ch.loveLanguage)return ch.loveLanguage+' showed up in your love-language results.';if(ch.category==='JUST FOR FUN')return 'Your results support making room for play, novelty, and shared memories.';return 'This fits patterns in your combined Couple Check results.'}
function choose(r,intensity,count,exclude,slots){var bank=window.COUPLE_CHALLENGES||[],out=[],usedMedia=[];exclude=exclude||[];slots=slots||['strength','difference','know','fun','grow'];for(var n=0;n<count;n++){var slot=slots[n]||'any',pool=bank.filter(function(ch){return exclude.indexOf(ch.id)<0&&out.every(function(x){return x.id!==ch.id})&&fits(ch,r,intensity)&&(ch.slot===slot||ch.slot==='any')});if(!pool.length)pool=bank.filter(function(ch){return exclude.indexOf(ch.id)<0&&out.every(function(x){return x.id!==ch.id})&&fits(ch,r,'surprise')&&(ch.slot===slot||ch.slot==='any')});pool.sort(function(a,b){return score(b,r,slot,usedMedia)-score(a,r,slot,usedMedia)});if(pool[0]){var c=Object.assign({},pool[0]);c.instructions=text(c,r);c.why=why(c,r);out.push(c);usedMedia.push(c.mediaType)}}return out}
window.CoupleChallengeEngine={generate:function(r,intensity){return choose(r,intensity||'surprise',5,[],['strength','difference','know','fun','grow'])},drawAnother:function(r,intensity,exclude){return choose(r,intensity||'surprise',1,exclude||[],['any'])[0]||choose(r,'surprise',1,exclude||[],['any'])[0]}};
})();