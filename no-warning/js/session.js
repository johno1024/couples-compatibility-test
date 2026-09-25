const api=async(path,options={})=>{try{const r=await fetch(path,{headers:{'Content-Type':'application/json'},...options});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.error||'Network request failed.');return data}catch(err){throw new Error(err.message||'Network failure.')}};

export const sessionClient={
 create:name=>api('/api/no-warning/create-session',{method:'POST',body:JSON.stringify({name})}),
 submitPlayer1:(sessionId,token,name,answers)=>api('/api/no-warning/submit-player1',{method:'POST',body:JSON.stringify({sessionId,token,name,answers})}),
 loadShare:shareToken=>api(`/api/no-warning/share-status?shareToken=${encodeURIComponent(shareToken)}`),
 submitPlayer2:(shareToken,name,answers)=>api('/api/no-warning/submit-player2',{method:'POST',body:JSON.stringify({shareToken,name,answers})}),
 loadReveal:revealToken=>api(`/api/no-warning/reveal?revealToken=${encodeURIComponent(revealToken)}`)
};

export async function nativeShare(title,text,url){if(navigator.share){try{await navigator.share({title,text,url});return true}catch(e){if(e?.name==='AbortError')return false}}await navigator.clipboard.writeText(url);return true}
export async function copyText(text){await navigator.clipboard.writeText(text)}
export function tokenFromPath(kind){const u=new URL(location.href);return u.searchParams.get(kind)}
