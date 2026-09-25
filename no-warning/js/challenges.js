export const challengeBank=[
{id:'voice-after-hours',media:'🎙️ Voice',tags:['attraction','flirting','tension'],title:'AFTER HOURS',text:'Send a 10–20 second voice note telling them something about them you find attractive but have not directly told them yet. End with: “Your turn.”'},
{id:'photo-no-caption',media:'📸 Photo',tags:['attraction','affection','spontaneity'],title:'NO CAPTION',text:'Send a photo—something you are wearing, somewhere you are, an object, or anything else—that represents the vibe you would want for your next time together. No explanation initially. They have to guess what you mean before you reveal it.'},
{id:'text-different-now',media:'💬 Text',tags:['connection','mental','flirting'],title:'DIFFERENT NOW',text:'Send: “Tell me which answer made you look at me differently, include how and why. I’ll tell you mine after.”'},
{id:'video-read-my-face',media:'🎥 Video',tags:['tension','flirting','spontaneity'],title:'READ MY FACE',text:'Send a 5–10 second selfie video showing your reaction to one of their answers. No talking. Do not identify the answer. They get three guesses. After they guess correctly or use all three attempts, explain the reaction.'},
{id:'music-soundtrack-us',media:'🎵 Song',tags:['connection','affection','mental'],title:'SOUNDTRACK US',text:'Send one song representing the chemistry between you right now. Do not explain it initially. Ask them to respond with 🔥 😏 ❤️ 👀 or 🤔, then explain why you chose it.'},
{id:'gif-first-move',media:'GIF',tags:['flirting','tension'],title:'FIRST MOVE ENERGY',text:'Send a GIF that captures how you would react if they made the first move right now. No caption until they respond.'},
{id:'emoji-code',media:'Emoji',tags:['flirting','spontaneity'],title:'DECODE THIS',text:'Send exactly five emojis that describe the chemistry between you. They have to interpret each one before you explain.'},
{id:'voice-one-thing',media:'🎙️ Voice',tags:['connection','mental'],title:'ONE THING I NOTICED',text:'Send a short voice note naming one answer of theirs that surprised you in a good way and why it changed your read on them.'},
{id:'text-finish-line',media:'💬 Text',tags:['tension','flirting'],title:'FINISH THE LINE',text:'Send: “If we stopped overthinking the chemistry for one night, I think we would…” Then stop. Let them finish it first.'},
{id:'photo-vibe-check',media:'📸 Photo',tags:['affection','connection'],title:'NEXT-TIME VIBE',text:'Send a non-explicit photo of an outfit detail, place, drink, playlist screen, or object that captures the mood you would want for your next hangout. Make them guess the plan.'},
{id:'video-three-seconds',media:'🎥 Video',tags:['attraction','tension'],title:'THREE-SECOND LOOK',text:'Send a silent 3–5 second selfie video giving them the look you would give if they said something that matched one of your favorite answers.'},
{id:'music-switch-up',media:'🎵 Song',tags:['mental','connection'],title:'THE SWITCH-UP',text:'Send a song that fits one of your biggest differences. Tell them only: “This somehow makes sense for us.” Explain after they react.'},
{id:'emoji-blind-draw',media:'Emoji',tags:['spontaneity'],title:'NO WARNING CODE',text:'Without context, send one of these: 😏👀🔥 / ❤️🧠✨ / 🎲😈📱. Let them choose which set fits you two best, then say whether you agree.'},
{id:'gif-tension',media:'GIF',tags:['tension','attraction'],title:'TOO ACCURATE',text:'Find a reaction GIF that captures the moment you realized the chemistry might be mutual. Send it with no explanation.'}
];

export function selectChallenges(dimensions,count=5,exclude=[]){
 const ranked=Object.entries(dimensions).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([k])=>k);
 const pool=challengeBank.filter(c=>!exclude.includes(c.id)).map(c=>({...c,score:c.tags.reduce((s,t)=>s+(ranked.includes(t)?dimensions[t]||0:0),0)+Math.random()*25})).sort((a,b)=>b.score-a.score);
 const picked=[];const media=new Set();
 for(const c of pool){if(picked.length>=count)break;if(!media.has(c.media)||picked.length>=3){picked.push(c);media.add(c.media)}}
 for(const c of pool){if(picked.length>=count)break;if(!picked.some(p=>p.id===c.id))picked.push(c)}
 return picked.slice(0,count);
}

export function drawChallenge(dimensions,exclude=[]){return selectChallenges(dimensions,1,exclude)[0]||challengeBank[Math.floor(Math.random()*challengeBank.length)];}
