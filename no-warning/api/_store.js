const crypto=require('crypto');
const memory=global.__NO_WARNING_STORE__||(global.__NO_WARNING_STORE__=new Map());
const token=()=>crypto.randomBytes(24).toString('base64url');
function getStore(){return memory}
function makeSession(name){const id=token(),player1Token=token(),shareToken=token(),revealToken=token();return {id,player1Token,shareToken,revealToken,createdAt:Date.now(),player1:{name,answers:null,locked:false},player2:{name:null,answers:null,locked:false}}}
function publicStatus(s){return {completed:Boolean(s.player2.locked),revealToken:s.revealToken}}
module.exports={getStore,makeSession,publicStatus};
