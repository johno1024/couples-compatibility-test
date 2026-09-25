const crypto=require('crypto');
const memory=global.__NO_WARNING_STORE__||(global.__NO_WARNING_STORE__=new Map());
const token=()=>crypto.randomBytes(24).toString('base64url');
const redisUrl=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL;
const redisToken=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;
const durable=Boolean(redisUrl&&redisToken);
async function command(...args){if(!durable)return null;const r=await fetch(redisUrl,{method:'POST',headers:{Authorization:`Bearer ${redisToken}`,'Content-Type':'application/json'},body:JSON.stringify(args)});if(!r.ok)throw new Error('Session storage unavailable.');const j=await r.json();return j.result}
async function put(s){if(durable){const value=JSON.stringify(s);await Promise.all([command('SET',`nw:id:${s.id}`,value),command('SET',`nw:share:${s.shareToken}`,value),command('SET',`nw:reveal:${s.revealToken}`,value)]);return}s.updatedAt=Date.now();memory.set(s.id,s);memory.set(`share:${s.shareToken}`,s);memory.set(`reveal:${s.revealToken}`,s)}
async function read(kind,value){if(durable){const raw=await command('GET',`nw:${kind}:${value}`);return raw?JSON.parse(raw):null}return kind==='id'?memory.get(value):memory.get(`${kind}:${value}`)}
function makeSession(name){return {id:token(),player1Token:token(),shareToken:token(),revealToken:token(),createdAt:Date.now(),player1:{name,answers:null,locked:false},player2:{name:null,answers:null,locked:false}}}
function publicStatus(s){return {completed:Boolean(s.player2.locked),revealToken:s.revealToken}}
module.exports={put,read,makeSession,publicStatus,durable};
