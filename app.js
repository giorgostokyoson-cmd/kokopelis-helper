const BASE = {
  abilities:{STR:20,DEX:16,CON:18,INT:14,WIS:16,CHA:16},
  savingProf:['STR','CON','WIS'],
  proficientSkills:['Animal Handling','Athletics','Intimidation','Persuasion','Survival','Perception'],
  fightingStyles:['Great Weapon Fighting','Defense'],
  feats:[
    ['Mobile','+10 ft speed. Dash ignores difficult terrain cost. Creatures you attack cannot make opportunity attacks against you for the rest of that turn.'],
    ['Shadow Touched','Invisibility plus one 1st-level Illusion/Necromancy spell. The selected spell remains editable.'],
    ['Polearm Master','Bonus-action polearm strike and reaction attack when a creature enters your reach.'],
    ['Sentinel','Opportunity attacks reduce speed to 0; Disengage does not protect from your opportunity attacks; reaction attack when a nearby foe attacks another target.'],
    ['Resilient (Wisdom)','Wisdom saving throw proficiency. WIS 16 is treated as your final supplied score.']
  ],
  maneuvers:[
    ['Trip Attack','On a weapon hit, spend a superiority die and add it to damage. Large or smaller target makes STR save or falls prone.'],
    ['Disarming Attack','On a weapon hit, spend a superiority die and add it to damage. Target makes STR save or drops one held item.'],
    ['Menacing Attack','On a weapon hit, spend a superiority die and add it to damage. Target makes WIS save or is frightened until end of your next turn.'],
    ["Commander's Strike",'Forgo one attack and use a bonus action to direct an ally to attack with its reaction; add the superiority die to the ally’s damage on hit.'],
    ['Goading Attack','On a weapon hit, spend a superiority die and add it to damage. Target makes WIS save or has disadvantage attacking targets other than you.'],
    ['Commanding Presence','Add a superiority die to an Intimidation, Performance, or Persuasion check.']
  ],
  resources:{
    secondWind:{label:'Second Wind',max:1,reset:'short',note:'Fighter resource'},
    actionSurge:{label:'Action Surge',max:1,reset:'short',note:'Fighter 15'},
    indomitable:{label:'Indomitable',max:2,reset:'long',note:'Fighter 15'},
    superiority:{label:'Superiority Dice',max:6,reset:'short',note:'6d10'},
    rage:{label:'Rage',max:5,reset:'long',note:'Homebrew Bear Totem • 5 uses per long rest • while active: advantage on attacks +5 damage'},
    unleash:{label:'Unleash Incarnation',max:4,reset:'long',note:'CON modifier uses'},
    shadowAvatar:{label:'Shadow Avatar',max:4,reset:'long',note:'CON modifier uses'},
    shadowMartyr:{label:'Shadow Martyr',max:1,reset:'short',note:'Reaction'},
    reclaim:{label:'Reclaim Potential',max:4,reset:'long',note:'2d6 + CON temp HP'},
    shadowCritical:{label:'Shadow Critical',max:1,reset:'short',note:'Recharges on a short or long rest'},
    sweepingStrike:{label:'Sweeping Strike',max:1,reset:'short',note:'Quicksilver/Spear combat mode • short/long rest'},
    shadowAgent:{label:'Designate Shadow Agent',max:1,reset:'long',note:'Spear of Kings upgrade'},
    dailyNova:{label:'Oath Nova Combo',max:1,reset:'long',note:'1/day • Action Surge + servant attack + 9d8 smite • critical package'}
  },
  homebrew:[
    ['Eins’ Domain','At will','Access Eins’ Domain, communicate with Eins and previous holders of the Star.'],
    ['Teleport Attack','Attack','Fused spear attack from another angle; attack is made with advantage.'],
    ['Shadow Critical','Recharge','Force a critical using the homebrew teleport sequence.'],
    ['Oath of Devotion','Damage','5d8 radiant + 1d8 piercing + 1d4 fire.'],
    ['Divine Punishment','Bonus Action','Mark a target; at 5% HP the homebrew thunder strike executes it.'],
    ['Legendary Defence','Passive','Natural AC 18. Misses that land between natural AC and current AC retaliate with 1d4 lightning per point of difference.']
  ],
  docs:[
    ['Character Sheet','assets/sheet.jpg'],['Kokopelis Abilities','assets/abilities.jpg'],['Quicksilver','assets/quicksilver.jpg'],['Spear of Kings','assets/spear.jpg'],
    ['Shadow Clone / Echo','assets/echo.jpg'],['Shadow Extraction','assets/extraction.jpg'],['Lord of Two Pacts','assets/lord-two-pacts.jpg']
  ]
};
const skillMap={'Acrobatics':'DEX','Animal Handling':'WIS','Arcana':'INT','Athletics':'STR','Deception':'CHA','History':'INT','Insight':'WIS','Intimidation':'CHA','Investigation':'INT','Medicine':'WIS','Nature':'INT','Perception':'WIS','Performance':'CHA','Persuasion':'CHA','Religion':'INT','Sleight of Hand':'DEX','Stealth':'DEX','Survival':'WIS'};
const ALL_SKILLS=Object.keys(skillMap);
const SUMMONS={
  arkham:{name:'Arkham, the Cursed Blade',img:'assets/arkham.jpg',ac:16,speed:'40 ft',stats:{STR:14,DEX:20,CON:18,INT:12,WIS:14,CHA:16},traits:['Sun Form: advantage on attack rolls; Shadow Veil 1/long rest.','Moon Form: weapon attacks automatically deal double damage; Double Strike 1/long rest.','Sneak Attack: +4d6 once per turn when conditions are met.','Cunning Action: Dash, Disengage or Hide as bonus action.'],actions:[
    {name:'Shadow Blade',text:'+9 to hit • 2d6+5 slashing + 2d6 necrotic',attack:9,roll:'2d6+5+2d6'},
    {name:'Sneak Attack',text:'+4d6 once per turn',roll:'4d6'},
    {name:'Shadow Step',text:'Recharge 6 • teleport up to 60 ft; next melee attack before end of turn has advantage',recharge:6},
    {name:'Shadow Veil',text:'Sun Form • invisible for 3 rounds or until broken',resource:{key:'veil',max:1,reset:'long'}},
    {name:'Double Strike',text:'Moon Form • double total attack damage again; Arkham suffers the extra damage',resource:{key:'double',max:1,reset:'long'}}
  ]},
  barbarossa:{name:'Barbarossa, Shadow Pirate Captain',img:'assets/barbarossa.jpg',ac:17,speed:'30 ft',stats:{STR:16,DEX:14,CON:18,INT:12,WIS:12,CHA:16},traits:['Shadow Stride: bonus action teleport 20 ft in dim light/darkness.','Shadowy Presence: allies within 10 ft have advantage against frightened.'],actions:[
    {name:'Shadow Cutlass',text:'+7 to hit • 2d6+4 slashing + 2d6 necrotic',attack:7,roll:'2d6+4+2d6'},
    {name:'Shadow Pistol',text:'+6 to hit • 2d10+2 piercing + 1d10 necrotic',attack:6,roll:'2d10+2+1d10'},
    {name:'Commander’s Grit',text:'Recharge 5–6 • up to three allies gain 10 temp HP and advantage on next attack',recharge:5},
    {name:'Captain’s Order',text:'One ally within 30 ft uses its reaction to attack or move half speed without provoking.'},
    {name:'Necrotic Wave',text:'Recharge 5–6 • DC 15 CON • 4d8 necrotic, half on success',roll:'4d8',half:true,recharge:5}
  ]},
  entelques:{name:'Entelques, the Scorching Ascendant',img:'assets/entelques.jpg',ac:16,speed:'30 ft • fly 60 ft',stats:{STR:10,DEX:16,CON:18,INT:20,WIS:14,CHA:24},traits:['Spell Save DC 22 • Spell Attack +14.','Pyromancer’s Mantle: add CHA +7 to one damage roll of every fire spell.','Fire spell of 1st–5th level creates a protective flame aura; melee attackers take 10 fire damage until start of next turn.'],actions:[
    {name:'Font of Fire',text:'Spend 3 Sorcery Points • Recharge 4 • next damaging fire spell ≤5th ignores resistance and deals maximum dice damage',recharge:4,spCost:3,special:'fontFire'},
    {name:'Quick Cast',text:'Legendary Action • cast a cantrip.'},
    {name:'Flame Surge',text:'Legendary Action • 10-ft radius • DC 18 DEX • 4d8 fire',roll:'4d8'},
    {name:'Inferno Pulse',text:'Legendary Action (cost 2) • cast Scorching Ray or Burning Hands without spending a slot.'}
  ],legendaryMax:3,spMax:7,slots:{1:2,2:2,3:2,4:2,5:2,9:1},spells:[
    {name:'Fire Bolt',level:0,text:'Cantrip • ranged spell attack +14 • fire damage',attack:14,roll:'3d10+7'},
    {name:'Control Flames',level:0,text:'Cantrip • utility'},
    {name:'Create Bonfire',level:0,text:'Cantrip • concentration • fire effect'},
    {name:'Burning Hands',level:1,text:'DC 22 DEX • 3d6 fire • half on save',roll:'3d6+7',half:true},
    {name:'Hellish Rebuke',level:1,text:'Reaction • DC 22 DEX • 2d10 fire • half on save',roll:'2d10+7',half:true},
    {name:'Scorching Ray',level:2,text:'3 rays • +14 spell attack • 2d6 fire per ray',special:'rays'},
    {name:'Flame Blade',level:2,text:'Melee spell attack • 3d6 fire on hit',attack:14,roll:'3d6+7'},
    {name:'Fireball',level:3,text:'DC 22 DEX • 8d6 fire • half on save',roll:'8d6+7',half:true},
    {name:'Flame Arrows',level:3,text:'Concentration • ammunition deals +1d6 fire; tracked as reference.'},
    {name:'Wall of Fire',level:4,text:'DC 22 DEX • 5d8 fire when applicable',roll:'5d8+7',half:true},
    {name:'Fire Shield',level:4,text:'No concentration • retaliatory 2d8 fire/cold when hit in melee',roll:'2d8+7'},
    {name:'Immolation',level:5,text:'DC 22 DEX • initial 8d6 fire on failed save',roll:'8d6+7'},
    {name:'Flame Strike',level:5,text:'DC 22 DEX • 4d6 fire + 4d6 radiant • half on save',roll:'8d6+7',half:true},
    {name:'Meteor Swarm',level:9,text:'DC 22 DEX • 20d6 fire + 20d6 bludgeoning • half on save',roll:'40d6+7',half:true}
  ]},
  jack:{name:'Jack the Reaper',img:'assets/jack.jpg',ac:17,speed:'40 ft',stats:{STR:12,DEX:18,CON:16,INT:14,WIS:12,CHA:16},traits:['Shadow Step: bonus action teleport 30 ft in dim light or darkness.','Assassin’s Precision: if he surprises a creature, first attack is an automatic critical.','Shapeshifter: physically mimic a humanoid he has seen.'],actions:[
    {name:'Shadow Dagger',text:'+8 to hit • 2d8+4 piercing + 2d8 necrotic',attack:8,roll:'2d8+4+2d8'},
    {name:'Sneak Attack',text:'+4d6 when conditions are met',roll:'4d6'},
    {name:'Reaper’s Mark',text:'Recharge 5–6 • 1 minute • advantage vs marked target • crit range 18–20',recharge:5},
    {name:'Death’s Embrace',text:'Qualifying melee target makes DC 15 CON or is paralyzed until end of next turn.'}
  ]},
  magnus:{name:'Magnus the Mountain',img:'assets/magnus.jpg',ac:25,speed:'20 ft',stats:{STR:24,DEX:8,CON:27,INT:6,WIS:16,CHA:12},traits:['Indomitable Fortress: cannot be moved against his will or knocked prone.','Taunting Presence: DC 18 WIS; disadvantage attacking anyone other than Magnus.','Siege Frame: double damage to objects and structures.'],actions:[
    {name:'Titan Slam',text:'+14 to hit • 2d8+7 bludgeoning • DC 22 STR or prone',attack:14,roll:'2d8+7'},
    {name:'Shield Crush',text:'1/day • 15-ft cone • DC 22 CON • 8d8 bludgeoning; stunned on fail, half/no stun on success',roll:'8d8',half:true,resource:{key:'shieldCrush',max:1,reset:'long'}},
    {name:'Damage Magnet',text:'1/day • reaction • redirect up to 200 damage dealt to creatures within 15 ft',resource:{key:'damageMagnet',max:1,reset:'long'}},
    {name:'Stand Firm',text:'Legendary Action • cannot be moved until end of next turn.'},
    {name:'Zone Lockdown',text:'Legendary Action cost 2 • DC 22 STR or restrained until end of next turn.'},
    {name:'Taunt Again',text:'Legendary Action cost 2 • reuse Taunting Presence.'}
  ],legendaryMax:3},
  mantris:{name:'Mantris — Dhampir Blood Hunter',img:'assets/mantris.jpg',ac:16,speed:'35 ft • climb 35 ft',stats:{STR:14,DEX:18,CON:18,INT:12,WIS:14,CHA:16},traits:['Spider Climb: difficult surfaces and ceilings without an ability check.','Sunlight Sensitivity: disadvantage on attacks and sight-based Perception in sunlight.','Regeneration: regain 10 HP at start of turn if eligible; shared pool can be restored manually.','Undead Nature: does not need to breathe.'],actions:[
    {name:'Hand Crossbow',text:'+8 to hit • 1d6+4 piercing + 1d8 necrotic',attack:8,roll:'1d6+4+1d8'},
    {name:'Vampiric Bite',text:'+8 to hit • 1d10+4 piercing • regain HP equal to half damage dealt',attack:8,roll:'1d10+4',healHalf:true},
    {name:'Blood Curse of Binding',text:'2/day • target within 30 ft makes DC 12 STR or restrained',resource:{key:'bloodCurse',max:2,reset:'long'}},
    {name:'Crimson Rite',text:'Costs 5 HP/shared mana to activate • weapon deals +1d8 fire, cold or necrotic',special:'rite'}
  ]},
  twopacts:{name:'Lord of Two Pacts',img:'assets/lord-two-pacts.jpg',ac:23,speed:'40 ft',special:true,stats:{STR:30,DEX:22,CON:30,INT:18,WIS:18,CHA:20},traits:['PB +6 • Initiative +6 • Dual-Wielding Master.','Resistance: Radiant, Necrotic, Fire • advantage vs Charmed and Frightened • Darkvision 120 ft.','Heavenly and Hellish pact swords are magical manifestations and cannot be permanently disarmed.','Extra Attack: three attacks when taking the Attack action.'],actions:[
    {name:'Angelic Blade',text:'+16 to hit • 1d10+10 slashing + 1d8 radiant',attack:16,roll:'1d10+10+1d8',streak:'angelic'},
    {name:'Hellish Blade',text:'+16 to hit • 1d10+10 slashing + 1d8 fire or necrotic. Demonic damage doubles in shadows per sheet.',attack:16,roll:'1d10+10+1d8',streak:'hellish'},
    {name:'Skyfall',text:'1/short rest • teleport 60 ft, make four weapon attacks, then creatures other than you within 10 ft make DC 24 STR or fall prone',special:'skyfall',resource:{key:'skyfall',max:1,reset:'short'}},
    {name:'Meditate',text:'Combat: regain 2d8 mana per turn. Out of combat sheet notes 1d100 regeneration and then no more use for the rest of day.',special:'meditate'},
    {name:'Indomitable',text:'3/long rest • reroll a failed saving throw and use the new result',resource:{key:'indomitable',max:3,reset:'long'}},
    {name:'Legendary Endurance',text:'1/long rest • when mana reaches 0 while Kokopelis is below 20% HP, becomes immune and damage no longer drains mana; ultimate becomes available',resource:{key:'legendaryEndurance',max:1,reset:'long'}},
    {name:'Chosen of Hell',text:'1/month • placeholder ability TBD',monthly:'hell'},
    {name:'Herald of Heaven',text:'1/month • placeholder ability TBD',monthly:'heaven'}
  ]}
};
const SUMMON_SAVE_BONUSES={
  arkham:{STR:2,DEX:9,CON:8,INT:1,WIS:6,CHA:3},
  barbarossa:{STR:3,DEX:2,CON:4,INT:1,WIS:1,CHA:3},
  entelques:{STR:0,DEX:10,CON:11,INT:5,WIS:2,CHA:14},
  jack:{STR:1,DEX:7,CON:3,INT:5,WIS:1,CHA:6},
  magnus:{STR:14,DEX:-1,CON:15,INT:-2,WIS:10,CHA:1},
  mantris:{STR:2,DEX:8,CON:8,INT:1,WIS:2,CHA:7},
  twopacts:{STR:16,DEX:12,CON:16,INT:4,WIS:10,CHA:11}
};
const SUMMON_DAMAGE_TYPES={
  arkham:{'Shadow Blade':'slashing + necrotic','Sneak Attack':'extra weapon damage'},
  barbarossa:{'Shadow Cutlass':'slashing + necrotic','Shadow Pistol':'piercing + necrotic','Necrotic Wave':'necrotic'},
  entelques:{'Flame Surge':'fire'},
  jack:{'Shadow Dagger':'piercing + necrotic','Sneak Attack':'extra weapon damage'},
  magnus:{'Titan Slam':'bludgeoning','Shield Crush':'bludgeoning'},
  mantris:{'Hand Crossbow':'piercing + necrotic','Vampiric Bite':'piercing'},
  twopacts:{'Angelic Blade':'slashing + radiant','Hellish Blade':'slashing + fire/necrotic'}
};
const SPELL_DAMAGE_TYPES={'Fire Bolt':'fire','Create Bonfire':'fire','Burning Hands':'fire','Hellish Rebuke':'fire','Scorching Ray':'fire','Flame Blade':'fire','Fireball':'fire','Wall of Fire':'fire','Fire Shield':'fire/cold','Immolation':'fire','Flame Strike':'fire + radiant','Meteor Swarm':'fire + bludgeoning'};
const KEY='kokopelis_companion_v3';
const OLD_KEY='kokopelis_companion_v2';
const clone=x=>JSON.parse(JSON.stringify(x));
const mod=s=>Math.floor((Number(s)-10)/2);
const signed=n=>Number(n)>=0?`+${Number(n)}`:`${Number(n)}`;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

function initialSummonState(id,data){
  const resources={};
  for(const a of data.actions||[]) if(a.resource) resources[a.resource.key]={max:a.resource.max,current:a.resource.max,reset:a.resource.reset};
  if(data.legendaryMax) resources.legendary={max:data.legendaryMax,current:data.legendaryMax,reset:'round'};
  const st={active:false,agent:false,resources};
  if(id==='entelques'){
    st.sorcery={max:data.spMax,current:data.spMax}; st.slots={}; st.scorchingRays=0; st.scorchingMantle=true; st.fontOfFireActive=false; st.scorchingMaxDamage=false; st.scorchingCastLevel=2;
    Object.entries(data.slots).forEach(([lvl,mx])=>st.slots[lvl]={max:mx,current:mx});
  }
  if(id==='twopacts') Object.assign(st,{weaponDie:'1d10',angelicStreak:0,hellishStreak:0,frenzyUsed:false,chosenHellUsedAt:0,heraldHeavenUsedAt:0});
  return st;
}
function fresh(){
  const resources={}; Object.entries(BASE.resources).forEach(([k,v])=>resources[k]={...v,current:v.max});
  const summons={}; Object.entries(SUMMONS).forEach(([id,d])=>summons[id]=initialSummonState(id,d));
  return {version:4.92,settings:{level:15,abilities:clone(BASE.abilities),profSkills:[...BASE.proficientSkills],fightingStyles:[...BASE.fightingStyles],maneuvers:clone(BASE.maneuvers),maxHp:171,currentHp:171,tempHp:0,naturalAc:18,currentAc:24,tempAc:24,maxMana:555,currentMana:555,speed:40,weaponEnhancement:8,weaponDamageFlat:10,weaponReach:15,hitDiceMax:15,hitDice:15,rageActive:false,inspiration:0,shadowTouchedSpell:'Not selected',notes:''},resources,summons,death:{success:0,fail:0},log:[],summonLog:[]};
}
function loadState(){
  try{const now=JSON.parse(localStorage.getItem(KEY));if(now)return now;}catch(e){}
  let st=fresh();
  try{
    const old=JSON.parse(localStorage.getItem(OLD_KEY));
    if(old){
      if(old.settings){Object.assign(st.settings,old.settings);st.settings.weaponEnhancement=8;st.settings.maxHp=171;st.settings.naturalAc=18;st.settings.currentAc=24;st.settings.maxMana=555;if(st.settings.currentMana==null)st.settings.currentMana=555;}
      if(old.resources)Object.entries(st.resources).forEach(([k,v])=>{if(old.resources[k])st.resources[k].current=Math.min(v.max,old.resources[k].current??v.max)});
    }
  }catch(e){}
  return st;
}
let state=loadState();
function migrate(){
  state.version=4.9;state.settings.weaponEnhancement=state.settings.weaponEnhancement==null?8:Number(state.settings.weaponEnhancement);
  if(state.settings.weaponDamageFlat==null)state.settings.weaponDamageFlat=10;
  if(state.settings.tempAc==null)state.settings.tempAc=Number(state.settings.currentAc||24);
  if(state.settings.hitDiceMax==null)state.settings.hitDiceMax=15;if(state.settings.hitDice==null)state.settings.hitDice=state.settings.hitDiceMax;if(state.settings.rageActive==null)state.settings.rageActive=false;if(state.settings.inspiration==null)state.settings.inspiration=0;
  if(!state.resources.dailyNova)state.resources.dailyNova={...BASE.resources.dailyNova,current:BASE.resources.dailyNova.max};
  for(const [k,v] of Object.entries(BASE.resources)){if(!state.resources[k])state.resources[k]={...v,current:v.max};else{state.resources[k].label=state.resources[k].label||v.label;state.resources[k].reset=state.resources[k].reset||v.reset;state.resources[k].note=state.resources[k].note||v.note;if(state.resources[k].max==null)state.resources[k].max=v.max;if(state.resources[k].current==null)state.resources[k].current=state.resources[k].max;}}
  if(state.settings.weaponEnhancement===5) state.settings.weaponEnhancement=8;
  if(!state.summonLog)state.summonLog=[];
  if(!state.summons)state.summons={};
  for(const [id,d] of Object.entries(SUMMONS)){
    const def=initialSummonState(id,d);if(!state.summons[id])state.summons[id]=def;
    const s=state.summons[id];if(!s.resources)s.resources={};
    for(const [k,v] of Object.entries(def.resources||{}))if(!s.resources[k])s.resources[k]=v;
    if(id==='entelques'){
      if(!s.sorcery)s.sorcery=def.sorcery;if(!s.slots)s.slots=def.slots;if(s.scorchingRays==null)s.scorchingRays=0;if(s.scorchingMantle==null)s.scorchingMantle=true;if(s.fontOfFireActive==null)s.fontOfFireActive=false;if(s.scorchingMaxDamage==null)s.scorchingMaxDamage=false;if(s.scorchingCastLevel==null)s.scorchingCastLevel=2;
      for(const [l,v] of Object.entries(def.slots))if(!s.slots[l])s.slots[l]=v;
    }
    if(id==='twopacts'){
      if(!s.weaponDie||s.weaponDie==='1d8')s.weaponDie='1d10';
      for(const [k,v] of Object.entries({angelicStreak:0,hellishStreak:0,frenzyUsed:false,chosenHellUsedAt:0,heraldHeavenUsedAt:0}))if(s[k]===undefined)s[k]=v;
    }
  }
  save();
}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
migrate();

function abilities(){return state.settings.abilities||BASE.abilities} function level(){return Number(state.settings.level||15)} function pb(){return 2+Math.floor((Math.max(1,level())-1)/4)} function abilityMod(a){return mod(abilities()[a])}
function profSkills(){return state.settings.profSkills||BASE.proficientSkills} function skillBonus(s){return abilityMod(skillMap[s])+(profSkills().includes(s)?pb():0)} function saveBonus(a){return abilityMod(a)+(BASE.savingProf.includes(a)?pb():0)}
function weaponAtk(){return pb()+abilityMod('STR')+Number(state.settings.weaponEnhancement||8)} function weaponDmgMod(){return Number(state.settings.weaponDamageFlat??10)} function rageDamage(){return state.settings.rageActive?5:0} function maneuverDC(){return 8+pb()+abilityMod('STR')}
function toggleRage(){
  if(state.settings.rageActive){state.settings.rageActive=false;addLog('Rage ended.',false);save();renderCurrent();showFx('RAGE','OFF','Rage bonuses ended.','attack',[0]);return}
  const r=state.resources.rage;if(!r||r.current<=0){showFx('RAGE','0','No Rage uses remaining.','crit',[0]);return}
  r.current--;state.settings.rageActive=true;addLog(`Rage activated: attack rolls have Advantage and attacks deal +5 damage. ${r.current}/${r.max} Rage uses remain.`,false);save();renderCurrent();showFx('RAGE','ON',`Advantage on attacks • +5 damage • ${r.current}/${r.max} uses left`,'crit',[20]);
}
function openTotemReference(){openModal('Barbarian • Path of the Totem Warrior — Bear',`<div class="totem-reference"><div class="notice"><b>Kokopelis Homebrew Rage</b><br>5 uses per long rest. Activating Rage spends 1 use. In this app, while Rage is active, Kokopelis makes his attack rolls with Advantage and adds <b>+5 damage to each attack</b>.</div><div class="feature-list"><div class="feature"><b>Bear • Totem Spirit</b><p>While raging, you have resistance to all damage except psychic damage.</p></div><div class="feature"><b>Bear • Aspect of the Beast</b><p>Your carrying capacity and maximum lift are doubled, and you have advantage on Strength checks to push, pull, lift, or break objects.</p></div><div class="feature"><b>Bear • Totemic Attunement</b><p>While raging, hostile creatures within 5 feet have disadvantage on attack rolls against targets other than you (or another character with the same feature), provided they can see or hear you and can be frightened.</p></div></div><div class="notice"><b>Manual effects:</b> Damage resistance and enemy disadvantage are reference-only; the app does not automatically halve incoming damage.</div><div class="btnrow" style="margin-top:12px"><button class="btn" onclick="window.open('https://dnd5e.wikidot.com/barbarian:totem-warrior','_blank')">Open Totem Warrior Reference</button><button class="btn" onclick="closeModal()">Close</button></div></div>`)}
function hpPct(){return Math.max(0,Math.min(100,(state.settings.currentHp/state.settings.maxHp)*100||0))} function manaPct(){return Math.max(0,Math.min(100,(state.settings.currentMana/state.settings.maxMana)*100||0))}
function rand(s){return Math.floor(Math.random()*s)+1}
function addLog(msg,render=true){state.log.unshift({t:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),msg});state.log=state.log.slice(0,100);save();if(render)renderCurrent()}
function rollFormula(expr,gwf=false){
  const parts=expr.replace(/\s/g,'').replace(/-/g,'+-').split('+').filter(Boolean);let total=0,detail=[],diceFaces=[];
  for(const p of parts){const m=p.match(/^(\d*)d(\d+)$/i);if(m){const n=Number(m[1]||1),s=Number(m[2]),rs=[];for(let i=0;i<n;i++){let r=rand(s),first=r;if(gwf&&r<=2)r=rand(s);rs.push(gwf&&first!==r?`${first}→${r}`:`${r}`);diceFaces.push(r);total+=r}detail.push(`${n}d${s}[${rs.join(', ')}]`)}else{const v=Number(p);if(!Number.isNaN(v)){total+=v;detail.push(signed(v))}}}
  return {total,detail:detail.join(' + '),diceFaces};
}
let fxTimer;
let pendingAttack=null;
let pendingSummonAttack=null;
function showFx(title,total,sub='',type='damage',faces=[]){
  const fx=document.getElementById('rollFx');clearTimeout(fxTimer);fx.className='roll-fx';void fx.offsetWidth;
  fx.innerHTML=`<div class="roll-title">${esc(title)}</div><div class="roll-total">${total}</div><div class="roll-sub">${esc(sub)}</div><div class="dice-burst">${(faces.length?faces.slice(0,14):[total]).map(x=>`<i><span>${x}</span></i>`).join('')}</div>`;
  fx.classList.add(type,'show');fxTimer=setTimeout(()=>fx.classList.remove('show'),5200);
}
function addSummonLog(who,action,result,type='',extra=''){
  state.summonLog.unshift({t:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),who,action,result,type,extra});
  state.summonLog=state.summonLog.slice(0,120);save();
}
function summonSaveBonus(id,a){const d=SUMMONS[id];return Number(SUMMON_SAVE_BONUSES[id]?.[a] ?? mod(d.stats?.[a]??10))}
function summonAbilityCheck(id,a){const d=SUMMONS[id],b=mod(d.stats[a]);rollD20(`${d.name} • ${a} Check`,b)}
function summonSavingThrow(id,a){const d=SUMMONS[id],b=summonSaveBonus(id,a);rollD20(`${d.name} • ${a} Save`,b)}
function startSummonAttack(id,label,bonus,damageExpr='',damageType='',opts={}){
  const a=rand(20),total=a+Number(bonus||0),detail=`d20 [${a}] ${signed(bonus)}`;
  pendingSummonAttack={id,label,bonus:Number(bonus||0),die:a,total,detail,damageExpr,damageType,half:!!opts.half,healHalf:!!opts.healHalf,streak:opts.streak||'',source:opts.source||'',maxDamage:opts.maxDamage??null,maxDamageLabel:opts.maxDamageLabel||''};
  addLog(`${SUMMONS[id].name} • ${label}: ${detail} = ${total} • waiting for hit confirmation`,false);
  showFx(a===20?'NATURAL 20':`${SUMMONS[id].name} • ${label}`,total,`${detail} • Confirm hit below`,a===20?'crit':'attack',[a]);save();renderSummons();
}
function resolveSummonDamage(){
  const p=pendingSummonAttack;if(!p)return;pendingSummonAttack=null;let expr=p.damageExpr||'';
  if(p.source==='scorchingRay'&&state.summons.entelques.scorchingMantle&&p.maxDamage==null){expr=expr?`${expr}+7`:'7';state.summons.entelques.scorchingMantle=false;}
  if(!expr){addSummonLog(SUMMONS[p.id].name,p.label,'HIT','','No damage roll');showFx(p.label,'HIT','No damage roll','attack',[p.die]);save();renderSummons();return}
  const type=p.damageType||'damage';
  if(p.maxDamage!=null){const total=Number(p.maxDamage),h=Math.floor(total/2);addSummonLog(SUMMONS[p.id].name,p.label,total,type,`Font of Fire MAX${p.half?` • Save half ${h}`:''}`);addLog(`${SUMMONS[p.id].name} • ${p.label}: FONT OF FIRE maximum = ${total} ${type} damage${p.half?` • save: ${h}`:''}.`,false);showFx(`${SUMMONS[p.id].name} • ${p.label}`,total,`FONT OF FIRE • MAX DAMAGE${p.half?` • save = ${h}`:''}`,'crit',[total]);if(p.streak)recordPactHit(p.streak);if(p.source==='scorchingRay'){state.summons.entelques.scorchingRays=Math.max(0,Number(state.summons.entelques.scorchingRays||0)-1);if(state.summons.entelques.scorchingRays===0)state.summons.entelques.scorchingMaxDamage=false;}save();renderAll();return}
  const r=rollFormula(expr,false),h=Math.floor(r.total/2);
  addSummonLog(SUMMONS[p.id].name,p.label,r.total,type,p.half?`Save half ${h}`:'');addLog(`${SUMMONS[p.id].name} • ${p.label}: ${r.total} ${type} damage (${r.detail})${p.half?` • save: ${h}`:''}`,false);
  showFx(`${SUMMONS[p.id].name} • ${p.label}`,r.total,`${type}${p.half?` • save = ${h}`:''} • ${r.detail}`,'damage',r.diceFaces);
  if(p.healHalf)state.settings.currentMana=Math.max(0,state.settings.currentMana+Math.floor(r.total/2));if(p.streak)recordPactHit(p.streak);
  if(p.source==='scorchingRay')state.summons.entelques.scorchingRays=Math.max(0,Number(state.summons.entelques.scorchingRays||0)-1);save();renderAll();
}
function summonAttackMiss(){const p=pendingSummonAttack;if(!p)return;addSummonLog(SUMMONS[p.id].name,p.label,'MISS','');addLog(`${SUMMONS[p.id].name} • ${p.label}: attack ${p.total} missed.`,false);if(p.source==='scorchingRay')state.summons.entelques.scorchingRays=Math.max(0,Number(state.summons.entelques.scorchingRays||0)-1);pendingSummonAttack=null;save();renderSummons();showFx(p.label,'MISS','No damage rolled','attack',[0])}
function rollSummonDamage(id,label,expr,half=false,type='damage'){const r=rollFormula(expr,false),h=Math.floor(r.total/2);addSummonLog(SUMMONS[id].name,label,r.total,type,half?`Save half ${h}`:'');addLog(`${SUMMONS[id].name} • ${label}: ${r.total} ${type} damage (${r.detail})${half?` • save: ${h}`:''}`,false);showFx(`${SUMMONS[id].name} • ${label}`,r.total,`${type}${half?` • save = ${h}`:''} • ${r.detail}`,'damage',r.diceFaces);save();renderSummons();return r.total}
function startScorchingRay(){const s=state.summons.entelques;if(!s.scorchingRays){showFx('SCORCHING RAY','0','Cast the spell first.','attack');return}const totalRays=3+Math.max(0,Number(s.scorchingCastLevel||2)-2),rayNo=totalRays-s.scorchingRays+1,max=s.scorchingMaxDamage?12:null;startSummonAttack('entelques',`Scorching Ray • Ray ${rayNo}/${totalRays}`,14,'2d6','fire',{source:'scorchingRay',maxDamage:max,maxDamageLabel:max!=null?'Font of Fire':''})}
function rollDamage(label,expr,half=false,gwf=false){const r=rollFormula(expr,gwf);const h=Math.floor(r.total/2);addLog(`${label}: ${r.total} (${r.detail})${half?` • save: ${h}`:''}`,false);showFx(label,r.total,`${r.detail}${half?` • save = ${h}`:''}`,'damage',r.diceFaces);save();renderCurrent();return r.total}
function rollD20(label,bonus=0,mode='normal'){const a=rand(20),b=rand(20),d=mode==='adv'?Math.max(a,b):mode==='dis'?Math.min(a,b):a,total=d+bonus;const detail=mode==='normal'?`d20 [${a}] ${signed(bonus)}`:`d20 [${a}, ${b}] → ${d} ${signed(bonus)}`;addLog(`${label}: ${detail} = ${total}`,false);showFx(label,total,detail,'attack',[a,...(mode==='normal'?[]:[b])]);save();renderCurrent();return total}
function mainAttack(mode='normal'){
  const effectiveMode=state.settings.rageActive?'adv':mode;
  const a=rand(20),b=rand(20),die=effectiveMode==='adv'?Math.max(a,b):effectiveMode==='dis'?Math.min(a,b):a,total=die+weaponAtk();
  const detail=effectiveMode==='normal'?`d20 [${a}] ${signed(weaponAtk())}`:`d20 [${a}, ${b}] → ${die} ${signed(weaponAtk())}${state.settings.rageActive?' • RAGE ADV':''}`;
  pendingAttack={total,die,mode:effectiveMode,detail};
  addLog(`Spear Attack: ${detail} = ${total} • waiting for DM hit confirmation`,false);
  showFx(die===20?'NATURAL 20':'SPEAR ATTACK',total,`${detail} • Confirm hit below`,die===20?'crit':'attack',[a,...(mode==='normal'?[]:[b])]);
  save();renderCurrent();
}
function resolveMainDamage(forceCrit=false){
  if(!pendingAttack&&!forceCrit){showFx('NO PENDING ATTACK','—','Roll the attack first.','attack');return}
  const isCrit=forceCrit||pendingAttack?.die===20; pendingAttack=null;
  if(isCrit){mainCrit();return}
  rollDamage('Spear Damage',`2d12+${weaponDmgMod()+rageDamage()}+1d6+1d6`,false,true);
}
function attackFailed(){if(!pendingAttack)return;addLog(`Spear Attack ${pendingAttack.total}: DM confirmed MISS.`,false);pendingAttack=null;save();renderCurrent();showFx('ATTACK FAILED','MISS','No damage rolled','attack',[0])}
function mainCrit(){const r=rollFormula(`2d12+${weaponDmgMod()+rageDamage()}+1d6+1d6`,true),extra=36,total=r.total+extra;addLog(`CRITICAL: normal damage ${r.total} (${r.detail}) + 36 max critical dice = ${total}${state.settings.rageActive?' • Rage +5 included':''}`,false);showFx('CRITICAL DAMAGE',total,`Normal ${r.total} + 36 critical max${state.settings.rageActive?' • Rage +5':''}`,'crit',r.diceFaces);save();renderCurrent()}
function dailyNova(){
  const required=['dailyNova','actionSurge','unleash','shadowCritical'];const missing=required.filter(k=>!state.resources[k]||state.resources[k].current<=0);
  if(missing.length){showFx('OATH NOVA','BLOCKED',`Missing: ${missing.map(k=>state.resources[k]?.label||k).join(', ')}`,'crit');return}
  required.forEach(k=>state.resources[k].current--);
  const rageFlat=state.settings.rageActive?30:0;
  const baseFlat=60+rageFlat;
  const r=rollFormula(`13d12+13d6+9d8+${baseFlat}`,true),extra=306,total=r.total+extra;
  addLog(`OATH NOVA CRITICAL: ${r.detail} = ${r.total}; +306 critical max = ${total}. Consumed Action Surge, Unleash Incarnation, Shadow Critical and Oath Nova Combo.${state.settings.rageActive?' Rage added +30 across the 6 attacks.':''}`,false);
  showFx('OATH NOVA • CRITICAL',total,`13d12 + 13d6 + 9d8 + ${baseFlat} = ${r.total}; +306 critical max${state.settings.rageActive?' • Rage +30':''}`,'crit',r.diceFaces);save();renderCurrent();
}
function pamDamage(){rollDamage('Polearm Master Damage',`1d4+${weaponDmgMod()+rageDamage()}+1d6+1d6`,false,true)}
function smite(){rollDamage('Oath of Devotion',`5d8+1d8+1d4+${rageDamage()}`,false,true)}
function enemyMiss(){state.settings.tempAc=Math.max(Number(state.settings.tempAc||state.settings.currentAc),Number(state.settings.currentAc))+1;addLog(`Enemy missed: Temp AC rises to ${state.settings.tempAc} until end of fight.`,false);save();renderCurrent();showFx('TEMP AC',state.settings.tempAc,'Enemy miss • +1 AC until fight ends','damage',[state.settings.tempAc])}
function resetFight(){state.settings.tempAc=Number(state.settings.currentAc);pendingAttack=null;save();renderAll();showFx('FIGHT RESET',state.settings.tempAc,'Temp AC returned to base AC','attack',[state.settings.tempAc])}
function legendaryDefence(){const defense=Number(state.settings.tempAc||state.settings.currentAc),atk=Number(prompt(`Enemy attack total? Current fight AC ${defense}.`,'20')||0),nat=Number(state.settings.naturalAc);if(atk>=defense){addLog(`Enemy attack ${atk} hits fight AC ${defense}.`,false);save();renderCurrent();return}const before=defense;enemyMiss();if(atk<nat){addLog(`Legendary Defence: attack ${atk} missed below Natural AC ${nat}; no lightning retaliation.`,false);return}const n=Math.max(0,before-atk);if(n)rollDamage(`Legendary Defence • ${n}d4 lightning`,`${n}d4`)}
function adjustHp(delta){state.settings.currentHp=Math.max(0,Number(state.settings.currentHp||0)+Number(delta||0));save();renderCurrent()}
function setHpInline(which,val){const n=Math.max(0,Number(val)||0);if(which==='current')state.settings.currentHp=n;else state.settings.maxHp=n;save();renderCurrent()}
function setManaInline(which,val){const n=Math.max(0,Number(val)||0);if(which==='current')state.settings.currentMana=n;else state.settings.maxMana=n;save();renderAll();checkLegendaryEndurance()}
function tempHp(){const n=Math.max(0,Number(prompt('Set temporary HP:','10')||0));state.settings.tempHp=n;save();renderCurrent()}
function changeMana(mode='damage'){
  const isDamage=mode==='damage';
  openModal(isDamage?'Spend / Damage Shared Mana':'Restore Shared Mana',`<div class="short-rest-panel"><div class="short-rest-summary"><div><span>Current Pool</span><b>${state.settings.currentMana}</b></div><div><span>Maximum</span><b>${state.settings.maxMana}</b></div></div><div class="field short-rest-field"><label>${isDamage?'How much Mana / Summon HP should be removed?':'How much Mana / Summon HP should be restored?'}</label><input id="manaChangeAmount" type="number" min="0" value="10"></div><div class="btnrow short-rest-actions"><button class="btn ${isDamage?'danger':'good'}" onclick="applyManaChange('${mode}')">${isDamage?'Apply Damage / Spend':'Restore'}</button><button class="btn" onclick="closeModal()">Cancel</button></div></div>`);
  setTimeout(()=>document.getElementById('manaChangeAmount')?.focus(),0);
}
function applyManaChange(mode){
  const el=document.getElementById('manaChangeAmount'),n=Math.max(0,Number(el?.value)||0);
  if(mode==='damage')state.settings.currentMana=Math.max(0,state.settings.currentMana-n);else state.settings.currentMana=Math.min(state.settings.maxMana,state.settings.currentMana+n);
  addLog(`Shared Mana / Summon HP: ${mode==='damage'?'-':'+'}${n} → ${state.settings.currentMana}/${state.settings.maxMana}.`,false);
  closeModal();save();renderAll();checkLegendaryEndurance();showFx(mode==='damage'?'SHARED POOL DAMAGE':'MANA RESTORED',state.settings.currentMana,`${mode==='damage'?'-':'+'}${n} • ${state.settings.currentMana}/${state.settings.maxMana}`,'damage',[n]);
}
function checkLegendaryEndurance(){if(state.settings.currentMana===0 && state.settings.currentHp/state.settings.maxHp<.2 && state.summons.twopacts?.active && state.summons.twopacts.resources.legendaryEndurance?.current>0)showFx('LEGENDARY ENDURANCE','READY','Mana 0 + Kokopelis below 20% HP','crit',[0])}
function spendMain(k,n=1){const r=state.resources[k];if(!r||r.current<n){showFx(r?.label||k,'0','No uses remaining','crit');return false}r.current-=n;addLog(`${r.label}: spent ${n}; ${r.current}/${r.max} left.`,false);save();renderCurrent();return true}
function useSecondWind(){
  const r=state.resources.secondWind;
  if(!r||r.current<=0){showFx('SECOND WIND','0','No uses remaining. Take a Short or Long Rest to restore it.','crit',[0]);return}
  const die=rand(10), fighterLevel=level(), healed=die+fighterLevel, before=Number(state.settings.currentHp||0);
  state.settings.currentHp=before+healed;
  r.current--;
  addLog(`Second Wind: d10 [${die}] + Fighter Level ${fighterLevel} = ${healed} healing. HP ${before} → ${state.settings.currentHp}. ${r.current}/${r.max} uses remain.`,false);
  save();renderCurrent();
  showFx('SECOND WIND',`+${healed} HP`,`d10 [${die}] + Fighter Level ${fighterLevel} • HP ${before} → ${state.settings.currentHp}`,'attack',[die]);
}
function resetMain(reset){Object.values(state.resources).forEach(r=>{if(r.reset===reset||(reset==='long'&&r.reset==='short'))r.current=r.max})}
function shortRest(){
  const con=abilityMod('CON'),available=Math.max(0,Number(state.settings.hitDice||0));
  openModal('Short Rest',`<div class="short-rest-panel"><div class="short-rest-summary"><div><span>Current HP</span><b>${state.settings.currentHp}</b></div><div><span>Hit Dice</span><b>${available}/${state.settings.hitDiceMax} d10</b></div><div><span>CON Modifier</span><b>${signed(con)}</b></div></div><div class="notice"><b>Automatically restored:</b> Second Wind, Action Surge, all Superiority Dice, Shadow Martyr, Shadow Critical and Sweeping Strike. Short-rest summon abilities are also restored.</div><div class="field short-rest-field"><label>How many d10 Hit Dice do you want to spend?</label><input id="shortRestDice" type="number" min="0" max="${available}" value="${available>0?1:0}"><div class="tiny muted">Each die heals 1d10 ${signed(con)}. Hit Dice are removed automatically from your tracker.</div></div><div class="btnrow short-rest-actions"><button class="btn primary" onclick="performShortRest()">Take Short Rest</button><button class="btn" onclick="closeModal()">Cancel</button></div></div>`);
}
function performShortRest(){
  const input=document.getElementById('shortRestDice');
  const available=Math.max(0,Number(state.settings.hitDice||0));
  const n=Math.max(0,Math.min(available,Number(input?.value||0)));
  let heal=0,faces=[],parts=[];const con=abilityMod('CON');
  for(let i=0;i<n;i++){const d=rand(10);faces.push(d);const h=Math.max(0,d+con);heal+=h;parts.push(`${d}${signed(con)}=${h}`)}
  state.settings.hitDice=Math.max(0,available-n);
  state.settings.currentHp=Math.max(0,Number(state.settings.currentHp||0)+heal);
  resetMain('short');resetSummons('short');
  addLog(`Short Rest: restored Second Wind, Action Surge, Superiority Dice, Shadow Martyr, Shadow Critical and Sweeping Strike. Spent ${n} Hit Dice${n?` [${parts.join(', ')}]`:''}; healed ${heal} HP; ${state.settings.hitDice}/${state.settings.hitDiceMax} d10 remain.`,false);
  closeModal();save();renderAll();showFx('SHORT REST',n?`+${heal} HP`:'RESTED',`${n}d10 spent • ${state.settings.hitDice}/${state.settings.hitDiceMax} Hit Dice remain`,'damage',faces.length?faces:[10]);
}
function setHitDiceInline(which,val){const n=Math.max(0,Number(val)||0);if(which==='current')state.settings.hitDice=Math.min(n,Number(state.settings.hitDiceMax||15));else{state.settings.hitDiceMax=n;if(state.settings.hitDice>n)state.settings.hitDice=n}save();renderCurrent()}
function adjustHitDice(delta){state.settings.hitDice=Math.max(0,Math.min(Number(state.settings.hitDiceMax||15),Number(state.settings.hitDice||0)+Number(delta||0)));save();renderCurrent()}
function longRest(){state.settings.currentHp=state.settings.maxHp;state.settings.tempHp=0;state.settings.currentMana=state.settings.maxMana;state.settings.tempAc=state.settings.currentAc;state.settings.hitDice=Math.min(state.settings.hitDiceMax,state.settings.hitDice+Math.floor(state.settings.hitDiceMax/2));state.settings.rageActive=false;state.death={success:0,fail:0};resetMain('long');resetSummons('long');addLog('Long Rest: HP, mana, Temp AC, Hit Dice and rest resources restored.',false);showFx('LONG REST','FULL','Resources restored','damage',[20]);save();renderAll()}
function resetSummons(kind){for(const [id,d] of Object.entries(SUMMONS)){const s=state.summons[id];Object.values(s.resources||{}).forEach(r=>{if(r.reset===kind||(kind==='long'&&r.reset==='short'))r.current=r.max});if(kind==='long'&&id==='entelques'){s.sorcery.current=s.sorcery.max;Object.values(s.slots).forEach(x=>x.current=x.max);s.fontOfFireActive=false;s.scorchingMaxDamage=false;s.scorchingRays=0}if(kind==='long'&&id==='twopacts'){s.angelicStreak=0;s.hellishStreak=0;s.frenzyUsed=false}}}
function resetOneSummon(id){const d=SUMMONS[id],s=state.summons[id];Object.values(s.resources||{}).forEach(r=>r.current=r.max);if(id==='entelques'){s.sorcery.current=s.sorcery.max;Object.values(s.slots).forEach(x=>x.current=x.max);s.fontOfFireActive=false;s.scorchingMaxDamage=false;s.scorchingRays=0}if(id==='twopacts'){s.angelicStreak=0;s.hellishStreak=0;s.frenzyUsed=false}save();renderSummons();showFx(`${d.name}`,'RESET','Rest-based abilities restored; monthly pact cooldowns unchanged.','damage',[20])}
function death(ok){if(ok)state.death.success=Math.min(3,state.death.success+1);else state.death.fail=Math.min(3,state.death.fail+1);save();renderCurrent()}
function consumeSuperiorityDie(source='Battle Master'){
  const r=state.resources.superiority;
  if(!r||r.current<=0){showFx('SUPERIORITY DICE','0','No d10s remaining','crit',[0]);return false}
  r.current--;
  addLog(`${source}: spent 1 Superiority Die; ${r.current}/${r.max} d10 remain.`,false);
  return true;
}
function maneuver(name){
  if(name==='Commanding Presence'){openCommandingPresence();return}
  if(!consumeSuperiorityDie(name))return;
  if(name==="Commander's Strike"){
    const r=rollFormula('1d10');
    addLog(`Commander's Strike: superiority die [${r.detail}] = ${r.total} bonus damage for the ally.`,false);
    showFx("COMMANDER'S STRIKE",r.total,`${r.detail} • add this to the ally's damage`,'damage',r.diceFaces);
    save();renderCurrent();return;
  }
  if(['Trip Attack','Disarming Attack','Menacing Attack','Goading Attack'].includes(name)){
    const expr=`2d12+${weaponDmgMod()+rageDamage()}+1d6+1d6+1d10`;
    const r=rollFormula(expr,true);
    addLog(`${name}: weapon damage + superiority = ${r.total} (${r.detail}).`,false);
    showFx(name.toUpperCase(),r.total,`${r.detail} • weapon damage + 1d10 superiority`,'damage',r.diceFaces);
    save();renderCurrent();return;
  }
  const r=rollFormula('1d10');
  addLog(`${name}: superiority die = ${r.total} (${r.detail}).`,false);
  showFx(name.toUpperCase(),r.total,r.detail,'damage',r.diceFaces);save();renderCurrent();
}
function openCommandingPresence(){
  if(!state.resources.superiority?.current){showFx('SUPERIORITY DICE','0','No d10s remaining','crit',[0]);return}
  openModal('Commanding Presence',`<div class="notice">Choose the Charisma check. The app rolls <b>d20 + your normal skill modifier + 1d10 Superiority Die</b>. The die is spent when you choose the check.</div><div class="btnrow" style="margin-top:14px"><button class="btn" onclick="commandingPresenceRoll('Intimidation')">Intimidation ${signed(skillBonus('Intimidation'))}</button><button class="btn" onclick="commandingPresenceRoll('Performance')">Performance ${signed(skillBonus('Performance'))}</button><button class="btn" onclick="commandingPresenceRoll('Persuasion')">Persuasion ${signed(skillBonus('Persuasion'))}</button></div>`);
}
function commandingPresenceRoll(skill){
  if(!consumeSuperiorityDie(`Commanding Presence • ${skill}`))return;
  closeModal();const d20=rand(20),d10=rand(10),bonus=skillBonus(skill),total=d20+bonus+d10;
  addLog(`Commanding Presence • ${skill}: d20 [${d20}] ${signed(bonus)} + d10 [${d10}] = ${total}.`,false);
  showFx(`COMMANDING PRESENCE • ${skill.toUpperCase()}`,total,`d20 ${d20} ${signed(bonus)} + d10 ${d10}`,'attack',[d20,d10]);save();renderCurrent();
}
function adjustInspiration(delta){
  state.settings.inspiration=Math.max(0,Number(state.settings.inspiration||0)+Number(delta||0));
  save();renderCurrent();
}
function scrollCard(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});const el=document.getElementById(id);if(el){el.animate([{boxShadow:'0 0 0 2px rgba(241,207,120,.9)'},{boxShadow:'0 10px 28px rgba(0,0,0,.22)'}],{duration:900})}}
function setSheetSetting(key,val){const num=Number(val);if(Number.isNaN(num))return;state.settings[key]=num;if(key==='currentAc'&&state.settings.tempAc<num)state.settings.tempAc=num;if(key==='maxMana')state.settings.currentMana=Math.min(state.settings.currentMana,num);save();if(key==='currentMana'||key==='maxMana')renderAll();else renderCurrent();if(key==='currentMana'||key==='maxMana')checkLegendaryEndurance()}
function setAbilityScore(a,val){const n=Number(val);if(Number.isNaN(n))return;state.settings.abilities[a]=n;save();renderCurrent()}
function toggleSheetSkill(skill){const arr=profSkills();const i=arr.indexOf(skill);if(i>=0)arr.splice(i,1);else arr.push(skill);state.settings.profSkills=arr;save();renderCurrent()}
function setTextList(key,val){state.settings[key]=String(val).split(',').map(x=>x.trim()).filter(Boolean);save();renderCurrent()}
function setManeuversInline(val){state.settings.maneuvers=String(val).split(/\n+/).map(line=>{const i=line.indexOf('::');return i>=0?[line.slice(0,i).trim(),line.slice(i+2).trim()]:[line.trim(),'Custom maneuver']}).filter(x=>x[0]);save();renderCurrent()}
function resourceHtml(k,r){if(k==='rage')return `<div class="resource rage-resource ${state.settings.rageActive?'rage-on':''}"><div class="resource-top"><span class="resource-name">Rage ${state.settings.rageActive?'<b class="rage-status">ACTIVE</b>':''}</span><div class="right"><span class="badge">${r.current}/${r.max}</span><button class="roll-mini rage-toggle" onclick="toggleRage()">${state.settings.rageActive?'End Rage':'Rage'}</button><button class="roll-mini" onclick="openTotemReference()">Read</button></div></div><div class="resource-note">${esc(r.note||'')} • Bear resistance/taunt effects are tracked manually.</div></div>`;if(k==='secondWind')return `<div class="resource"><div class="resource-top"><span class="resource-name">${esc(r.label)}</span><div class="right"><span class="badge">${r.current}/${r.max}</span><button class="roll-mini" onclick="useSecondWind()">Use</button></div></div><div class="resource-note">Heal <b>1d10 + Fighter Level</b> (${level()}) and automatically add it to current HP. Recharges on Short or Long Rest.</div></div>`;return `<div class="resource"><div class="resource-top"><span class="resource-name">${esc(r.label)}</span><div class="right"><span class="badge">${r.current}/${r.max}</span><button class="roll-mini" onclick="spendMain('${k}')">Use</button></div></div><div class="resource-note">${esc(r.note||'')}</div></div>`}
function hitDiceResourceHtml(){return `<div class="resource hit-dice-resource"><div class="resource-top"><span class="resource-name">Hit Dice</span><div class="right hit-dice-inline"><input type="number" min="0" max="${state.settings.hitDiceMax}" value="${state.settings.hitDice}" onchange="setHitDiceInline('current',this.value)"><span>/</span><input type="number" min="0" value="${state.settings.hitDiceMax}" onchange="setHitDiceInline('max',this.value)"><span class="badge">d10</span></div></div><div class="resource-note">Spent automatically when you take a Short Rest. Each die heals 1d10 + CON (${signed(abilityMod('CON'))}).</div><div class="btnrow hit-dice-buttons"><button class="roll-mini" onclick="adjustHitDice(-1)">−1</button><button class="roll-mini" onclick="adjustHitDice(1)">+1</button><button class="roll-mini" onclick="shortRest()">Short Rest</button></div></div>`}
function renderCharacter(){
  const skills=ALL_SKILLS.map(s=>`<div class="skill ${profSkills().includes(s)?'prof':''}"><button class="prof-toggle ${profSkills().includes(s)?'on':''}" onclick="toggleSheetSkill(${JSON.stringify(s)})" title="Toggle proficiency">${profSkills().includes(s)?'●':'○'}</button><div class="name"><b>${s}</b><span>${skillMap[s]}${profSkills().includes(s)?' • PROF':''}</span></div><span class="bonus">${signed(skillBonus(s))}</span><button class="roll-mini" onclick="rollD20('${s}',${skillBonus(s)})">Roll</button></div>`).join('');
  const resources=hitDiceResourceHtml()+Object.entries(state.resources).map(([k,r])=>resourceHtml(k,r)).join('');
  const maneuvers=(state.settings.maneuvers||BASE.maneuvers).map(([n,d])=>{const key=encodeURIComponent(n);return `<div class="maneuver"><b>${esc(n)}</b><p>${esc(d)}</p><button class="roll-mini" onclick="maneuver(decodeURIComponent('${key}'))">Use • Spend 1d10</button></div>`}).join('');
  const log=state.log.slice(0,18).map(x=>`<div class="logline"><b>${x.t}</b> ${esc(x.msg)}</div>`).join('')||'<span class="muted tiny">Rolls and resource changes appear here.</span>';
  const skillSheet=ALL_SKILLS.map((sk,i)=>{const top=23.30+i*1.365;return `<button class="sheet-skill-prof ${profSkills().includes(sk)?'on':''}" style="top:${top}%" onclick="toggleSheetSkill(${JSON.stringify(sk)})" title="Toggle ${esc(sk)} proficiency"></button><button class="sheet-skill-bonus" style="top:${top}%" onclick="rollD20('${sk}',${skillBonus(sk)})" title="Roll ${esc(sk)}">${signed(skillBonus(sk))}</button>`}).join('');
  const saveOrder=['STR','DEX','CON','INT','WIS','CHA'];
  const saveCenters=[10.55,15.02,19.45,23.82,28.28,32.72];
  const saveSheet=saveOrder.map((a,i)=>`<button class="sheet-save" style="left:${saveCenters[i]}%" onclick="rollD20('${a} Save',${saveBonus(a)})" title="Roll ${a} save">${signed(saveBonus(a))}</button>`).join('');
  const pending=pendingAttack?`<div class="pending-hit"><div><b>Attack Roll: ${pendingAttack.total}</b><span>${esc(pendingAttack.detail)}${pendingAttack.die===20?' • NAT 20':''}</span></div><div class="btnrow"><button class="btn good" onclick="resolveMainDamage()">${pendingAttack.die===20?'Critical Damage':'Roll Damage'}</button><button class="btn danger" onclick="attackFailed()">Attack Failed</button></div></div>`:'';
  document.getElementById('character').innerHTML=`<div class="character-layout">
    <div class="sheet-shell"><div class="sheet-frame"><img src="assets/sheet.jpg" alt="Kokopelis character sheet"><div class="sheet-glow"></div>
      <div class="sheet-live">
        <input class="sheet-field sf-level" value="Fighter ${level()}" onchange="setSheetSetting('level',this.value.replace(/\\D/g,''))" title="Level">
        <span class="sheet-pb">${pb()}</span>
        ${saveSheet}${skillSheet}
        <input class="sheet-stat sf-str" type="number" value="${abilities().STR}" onchange="setAbilityScore('STR',this.value)" title="Strength">
        <input class="sheet-stat sf-dex" type="number" value="${abilities().DEX}" onchange="setAbilityScore('DEX',this.value)" title="Dexterity">
        <input class="sheet-stat sf-con" type="number" value="${abilities().CON}" onchange="setAbilityScore('CON',this.value)" title="Constitution">
        <input class="sheet-stat sf-int" type="number" value="${abilities().INT}" onchange="setAbilityScore('INT',this.value)" title="Intelligence">
        <input class="sheet-stat sf-wis" type="number" value="${abilities().WIS}" onchange="setAbilityScore('WIS',this.value)" title="Wisdom">
        <input class="sheet-stat sf-cha" type="number" value="${abilities().CHA}" onchange="setAbilityScore('CHA',this.value)" title="Charisma">
        <span class="sheet-mod sm-str">${signed(abilityMod('STR'))}</span><span class="sheet-mod sm-dex">${signed(abilityMod('DEX'))}</span><span class="sheet-mod sm-con">${signed(abilityMod('CON'))}</span><span class="sheet-mod sm-int">${signed(abilityMod('INT'))}</span><span class="sheet-mod sm-wis">${signed(abilityMod('WIS'))}</span><span class="sheet-mod sm-cha">${signed(abilityMod('CHA'))}</span>
        <button class="sheet-roll sr-str" onclick="rollD20('STR Check',${abilityMod('STR')})"></button><button class="sheet-roll sr-dex" onclick="rollD20('DEX Check',${abilityMod('DEX')})"></button><button class="sheet-roll sr-con" onclick="rollD20('CON Check',${abilityMod('CON')})"></button><button class="sheet-roll sr-int" onclick="rollD20('INT Check',${abilityMod('INT')})"></button><button class="sheet-roll sr-wis" onclick="rollD20('WIS Check',${abilityMod('WIS')})"></button><button class="sheet-roll sr-cha" onclick="rollD20('CHA Check',${abilityMod('CHA')})"></button>
        <input class="sheet-vital sv-init" value="${signed(abilityMod('DEX'))}" readonly title="Initiative">
        <input class="sheet-vital sv-ac" type="number" value="${state.settings.currentAc}" onchange="setSheetSetting('currentAc',this.value)" title="Base AC">
        <input class="sheet-vital sv-tempac" type="number" value="${state.settings.tempAc}" onchange="setSheetSetting('tempAc',this.value)" title="Temp AC for this fight">
        <input class="sheet-vital sv-hp" type="number" value="${state.settings.currentHp}" onchange="setSheetSetting('currentHp',this.value)" title="Current HP">
        <input class="sheet-vital sv-maxhp" type="number" value="${state.settings.maxHp}" onchange="setSheetSetting('maxHp',this.value)" title="Max HP">
        <input class="sheet-vital sv-temphp" type="number" value="${state.settings.tempHp||0}" onchange="setSheetSetting('tempHp',this.value)" title="Temporary HP">
        <span class="sheet-speed">${state.settings.speed} ft</span><span class="sheet-hitdice">${state.settings.hitDice}d10</span>
        <button class="sheet-attack-row sa1" onclick="mainAttack()"><b>Quicksilver</b><span>${signed(weaponAtk())}</span><small>2d12 + ${weaponDmgMod()+rageDamage()} + 2d6${state.settings.rageActive?' • RAGE':''}</small></button>
        <button class="sheet-attack-row sa2" onclick="mainAttack('adv')"><b>Teleport Attack</b><span>${signed(weaponAtk())} ADV</span><small>2d12 + ${weaponDmgMod()+rageDamage()} + 2d6${state.settings.rageActive?' • RAGE':''}</small></button>
        <button class="sheet-attack-row sa3" onclick="pamDamage()"><b>Polearm Master</b><span>Damage</span><small>1d4 + ${weaponDmgMod()+rageDamage()} + 2d6${state.settings.rageActive?' • RAGE':''}</small></button>
        <button class="sheet-attack-row sa4 nova" onclick="dailyNova()"><b>Oath Nova</b><span>1/day</span><small>13d12 + 13d6 + 9d8 + 60 + 306 crit</small></button>
      </div>
    </div><div class="click-hint">Values on the sheet are live. Click a score/HP/AC to edit it; click saves, skills or attacks to roll.</div></div>
    <div class="combat-stack">
      <article id="vitalsCard" class="card"><div class="card-head"><h3>Fight Vitals</h3><span class="badge">PB +${pb()} • Speed ${state.settings.speed} ft</span></div><div class="card-body">
        <div class="vital-grid"><div class="vital hp-vital"><label>HP — edit directly</label><div class="inline-hp"><input type="number" value="${state.settings.currentHp}" onchange="setHpInline('current',this.value)" aria-label="Current HP"><span>/</span><input type="number" value="${state.settings.maxHp}" onchange="setHpInline('max',this.value)" aria-label="Maximum HP"></div></div><div class="vital"><label>Base AC</label><input class="inline-single" type="number" value="${state.settings.currentAc}" onchange="setSheetSetting('currentAc',this.value)"></div><div class="vital temp-ac"><label>Temp AC</label><input class="inline-single" type="number" value="${state.settings.tempAc}" onchange="setSheetSetting('tempAc',this.value)"></div><div class="vital"><label>Mana / Summon HP</label><input class="inline-single" type="number" value="${state.settings.currentMana}" onchange="setSheetSetting('currentMana',this.value)"></div></div>
        <div class="bar"><div class="fill" style="width:${hpPct()}%"></div></div><div class="vitals-action-row"><div class="btnrow"><button class="btn" onclick="enemyMiss()">Enemy Miss → +1 Temp AC</button><button class="btn" onclick="legendaryDefence()">Resolve Enemy Attack</button><button class="btn subtle" onclick="resetFight()">End Fight / Reset AC</button></div><div class="inspiration-meter"><span>✦ Inspiration</span><div class="inspiration-controls"><button class="inspiration-btn" onclick="adjustInspiration(-1)">−</button><b>${state.settings.inspiration||0}</b><button class="inspiration-btn" onclick="adjustInspiration(1)">+</button></div></div></div>
        <div class="mana" style="margin-top:10px"><div class="row"><span><strong>Shared Mana / Summon HP</strong></span><b>${state.settings.currentMana} / ${state.settings.maxMana}</b></div><div class="bar"><div class="fill" style="width:${manaPct()}%"></div></div><div class="btnrow"><button class="btn danger" onclick="changeMana('damage')">Spend / Damage</button><button class="btn good" onclick="changeMana('heal')">Restore</button></div></div>
      </div></article>
      <article id="attackCard" class="card"><div class="card-head"><h3>Quick Attack</h3><span class="badge">${signed(weaponAtk())} to hit • ${state.settings.weaponReach} ft</span></div><div class="card-body">
        <div class="attack-main"><div class="numbers"><b>2d12 + ${weaponDmgMod()+rageDamage()} piercing</b><br>+ 1d6 fire + 1d6 radiant<br><span class="tiny muted">Attack enhancement +${state.settings.weaponEnhancement}. Critical = normal roll +36.${state.settings.rageActive?' <b>RAGE ACTIVE:</b> attacks have Advantage and +5 damage.':''} <b>Great Weapon Fighting:</b> every damage die showing 1 or 2 is rerolled once.</span></div><div class="attack-buttons"><button class="btn ${state.settings.rageActive?'rage-active-btn':'rage-btn'}" onclick="toggleRage()">${state.settings.rageActive?'🔥 RAGE ON':'RAGE'}</button><button class="btn primary big-attack" onclick="mainAttack()">ATTACK ${signed(weaponAtk())}</button><button class="btn" onclick="mainAttack('adv')">Advantage</button><button class="btn" onclick="mainCrit()">Manual Critical</button></div></div>
        ${pending}
        <div class="btnrow" style="margin-top:9px"><button class="btn" onclick="mainAttack('adv')">Teleport Attack</button><button class="btn" onclick="pamDamage()">Polearm Master</button><button class="btn" onclick="mainAttack()">Quicksilver Bonus Attack</button><button class="btn" onclick="smite()">Oath of Devotion</button><button class="btn nova-btn" onclick="dailyNova()">☀ DAILY MAX COMBO</button></div>
        <div class="notice" style="margin-top:9px"><b>Daily Max Combo:</b> rolls 13d12 + 13d6 + 9d8 + ${state.settings.rageActive?90:60}, then adds <b>+306</b> critical max.${state.settings.rageActive?' Rage contributes +30 across the 6 attacks.':''} It consumes Oath Nova Combo, Action Surge, Unleash Incarnation and Shadow Critical together. The theoretical ceiling of this exact package is <b>${state.settings.rageActive?702:672}</b>.</div>
      </div></article>
      <article id="resourcesCard" class="card"><div class="card-head"><h3>Resources</h3><div class="btnrow"><button class="roll-mini" onclick="shortRest()">Short Rest</button><button class="roll-mini" onclick="longRest()">Long Rest</button></div></div><div class="card-body"><div class="resource-grid">${resources}</div></div></article>
      <article id="maneuversCard" class="card"><div class="card-head"><h3>Battle Master</h3><span class="badge">Save DC ${maneuverDC()} • ${state.resources.superiority.current}/${state.resources.superiority.max} d10</span></div><div class="card-body"><div class="maneuver-list">${maneuvers}</div></div></article>
      <article id="skillsCard" class="card"><div class="card-head"><h3>All Skills / Proficiencies</h3><span class="badge">Click ○/● to toggle proficiency • Passive Perception ${10+skillBonus('Perception')}</span></div><div class="card-body"><div class="skills-grid">${skills}</div></div></article>
      <article class="card"><div class="card-head"><h3>Advanced Inline Edit</h3><span class="badge">No pop-up</span></div><div class="card-body"><details class="inline-editor"><summary>Edit speed, mana, weapon & notes</summary><div class="settings-grid inline-settings"><div class="field"><label>Speed</label><input type="number" value="${state.settings.speed}" onchange="setSheetSetting('speed',this.value)"></div><div class="field"><label>Natural AC (Legendary Defence)</label><input type="number" value="${state.settings.naturalAc}" onchange="setSheetSetting('naturalAc',this.value)"></div><div class="field"><label>Max Mana</label><input type="number" value="${state.settings.maxMana}" onchange="setSheetSetting('maxMana',this.value)"></div><div class="field"><label>Current Mana</label><input type="number" value="${state.settings.currentMana}" onchange="setSheetSetting('currentMana',this.value)"></div><div class="field"><label>Weapon Enhancement (attack)</label><input type="number" value="${state.settings.weaponEnhancement}" onchange="setSheetSetting('weaponEnhancement',this.value)"></div><div class="field"><label>Weapon Flat Damage</label><input type="number" value="${state.settings.weaponDamageFlat}" onchange="setSheetSetting('weaponDamageFlat',this.value)"></div><div class="field"><label>Weapon Reach</label><input type="number" value="${state.settings.weaponReach}" onchange="setSheetSetting('weaponReach',this.value)"></div><div class="field" style="grid-column:1/-1"><label>Fighting Styles (comma separated)</label><input value="${esc((state.settings.fightingStyles||BASE.fightingStyles).join(', '))}" onchange="setTextList('fightingStyles',this.value)"></div><div class="field" style="grid-column:1/-1"><label>Maneuvers — Name :: Description, one per line</label><textarea onchange="setManeuversInline(this.value)">${esc((state.settings.maneuvers||BASE.maneuvers).map(x=>x.join(' :: ')).join('\n'))}</textarea></div><div class="field" style="grid-column:1/-1"><label>Notes</label><textarea onchange="state.settings.notes=this.value;save()">${esc(state.settings.notes||'')}</textarea></div></div><div class="btnrow"><button class="btn" onclick="exportSave()">Export Save</button><button class="btn" onclick="document.getElementById('importFile').click()">Import Save</button></div></details></div></article>
      <article class="card"><div class="card-head"><h3>Combat Log</h3><button class="roll-mini" onclick="state.log=[];save();renderCurrent()">Clear</button></div><div class="card-body"><div class="log">${log}</div></div></article>
    </div></div>`;
}

function summonState(id){return state.summons[id]}
function shadowActive(){return Object.entries(SUMMONS).filter(([id,d])=>!d.special&&state.summons[id]?.active).length}
function toggleSummon(id){const d=SUMMONS[id],s=state.summons[id];if(!s.active&&!d.special&&shadowActive()>=5){showFx('SHADOW LIMIT','5','Dismiss a servant first','crit');return}s.active=!s.active;if(!s.active)s.agent=false;addLog(`${d.name}: ${s.active?'summoned':'dismissed'}.`,false);save();renderSummons()}
function makeAgent(id){const d=SUMMONS[id],s=state.summons[id];if(d.special){showFx('PACT SUMMON','—','This summon is not a Shadow Agent.','attack');return}if(!s.active){showFx('SUMMON FIRST','—',d.name,'crit');return}if(!spendMain('shadowAgent'))return;Object.entries(SUMMONS).forEach(([k,v])=>{if(!v.special)state.summons[k].agent=false});s.agent=true;addLog(`${d.name} designated Shadow Agent.`,false);save();renderSummons()}
function spendSummonResource(id,key,n=1){const r=state.summons[id].resources[key];if(!r||r.current<n){showFx('NO USES','0',`${SUMMONS[id].name} • ${key}`,'crit');return false}r.current-=n;save();return true}
function recharge(name,threshold){const r=rand(6);addLog(`${name} recharge: d6 [${r}] → ${r>=threshold?'RECHARGED':'not recharged'}`,false);showFx(`${name} Recharge`,r,r>=threshold?'RECHARGED':'Not recharged',r>=threshold?'damage':'attack',[r]);save();renderSummons()}
function summonAction(id,index){const d=SUMMONS[id],a=d.actions[index],s=state.summons[id];
  if(a.resource&&!spendSummonResource(id,a.resource.key))return;
  if(a.special==='fontFire'){
    if(s.fontOfFireActive){showFx('FONT OF FIRE','READY','Already active for the next damaging fire spell','crit',[6]);return}
    if(!s.sorcery||s.sorcery.current<3){showFx('FONT OF FIRE','0','Needs 3 Sorcery Points','crit');return}
    s.sorcery.current-=3;s.fontOfFireActive=true;addSummonLog(d.name,'Font of Fire','ACTIVE','','Next damaging fire spell ≤5th is maximized');addLog(`${d.name} • Font of Fire activated: -3 Sorcery Points. Next damaging fire spell of 5th level or lower deals maximum dice damage.`,false);save();renderSummons();showFx('FONT OF FIRE','ACTIVE',`3 Sorcery Points spent • ${s.sorcery.current}/${s.sorcery.max} left`,'crit',[6,6,6]);return;
  }
  if(a.spCost){if(!s.sorcery||s.sorcery.current<a.spCost){showFx('SORCERY POINTS','0','Not enough points','crit');return}s.sorcery.current-=a.spCost;}
  if(a.special==='rite'){if(state.settings.currentMana<5){showFx('SHARED POOL','0','Not enough HP/Mana','crit');return}state.settings.currentMana-=5;showFx('CRIMSON RITE','-5','Shared HP / Mana','damage',[5]);addLog(`${d.name}: Crimson Rite activated; shared pool -5.`,false);save();renderAll();return}
  if(a.special==='skyfall'){openSkyfall();return}
  if(a.special==='meditate'){const v=rollSummonDamage(id,'Meditate','2d8',false,'mana restored');state.settings.currentMana=Math.max(0,state.settings.currentMana+v);save();renderAll();return}
  if(a.monthly){useMonthly(id,a.monthly,a.name);return}
  const dtype=SUMMON_DAMAGE_TYPES[id]?.[a.name]||'damage';
  if(a.attack!=null)startSummonAttack(id,a.name,a.attack,a.roll||'',dtype,{half:a.half,healHalf:a.healHalf,streak:a.streak});
  else if(a.roll)rollSummonDamage(id,a.name,a.roll,a.half,dtype);
  else {showFx(a.name,'USED',a.text,'attack',[20]);addLog(`${d.name} • ${a.name}: ${a.text}`,false);save();renderSummons()}
}
function recordPactHit(type){const s=state.summons.twopacts;s[type+'Streak']=(s[type+'Streak']||0)+1;save();if(s.angelicStreak>=10&&s.hellishStreak>=10&&!s.frenzyUsed)showFx('FRENZY','READY','10 Angelic + 10 Hellish hits without taking damage','crit',[10,10]);renderSummons()}
function resetPactStreak(){const s=state.summons.twopacts;s.angelicStreak=0;s.hellishStreak=0;save();renderSummons();showFx('FRENZY STREAK','RESET','Lord of Two Pacts took damage','attack',[0])}
function useFrenzy(option){const s=state.summons.twopacts;if(s.angelicStreak<10||s.hellishStreak<10||s.frenzyUsed){showFx('FRENZY','NOT READY','Need 10 + 10 damaging hits and unused frenzy','crit');return}s.frenzyUsed=true;addLog(`Lord of Two Pacts Frenzy used: ${option===1?'3 Skyfalls in a row, maximum damage':'extra action to all clones for 1 turn'}.`,false);showFx('FRENZY','ACTIVE',option===1?'3 max-damage Skyfalls':'Extra action to all clones','crit',[10,10]);save();renderSummons()}
function monthlyReady(ts){return !ts||(Date.now()-ts)>=30*24*3600*1000} function monthlyText(ts){if(monthlyReady(ts))return 'READY';const days=Math.ceil((30*24*3600*1000-(Date.now()-ts))/(24*3600*1000));return `${days}d`}
function useMonthly(id,kind,name){const s=state.summons[id],key=kind==='hell'?'chosenHellUsedAt':'heraldHeavenUsedAt';if(!monthlyReady(s[key])){showFx(name,'LOCKED',`${monthlyText(s[key])} remaining`,'crit');return}s[key]=Date.now();save();showFx(name,'USED','30-day cooldown started','damage',[30]);renderSummons()}
function resetLegendary(id){const r=state.summons[id].resources.legendary;if(r)r.current=r.max;save();renderSummons()}
function useLegendary(id,cost=1,label='Legendary Action'){const r=state.summons[id].resources.legendary;if(!r||r.current<cost){showFx(label,'0','Not enough legendary actions','crit');return false}r.current-=cost;save();renderSummons();showFx(label,cost,`${r.current}/${r.max} left`,'attack',[cost]);return true}
function slotToggle(id,lvl){const sl=state.summons[id].slots[lvl];if(sl.current>0)sl.current--;else sl.current=sl.max;save();renderSummons()}
function entelquesSpellProfile(sp,castLevel){
  const l=Number(castLevel||sp.level||0),name=sp.name;let dice='',rays=0;
  if(name==='Fire Bolt')dice='3d10';
  else if(name==='Create Bonfire')dice='3d8';
  else if(name==='Burning Hands')dice=`${3+Math.max(0,l-1)}d6`;
  else if(name==='Hellish Rebuke')dice=`${2+Math.max(0,l-1)}d10`;
  else if(name==='Scorching Ray')rays=3+Math.max(0,l-2);
  else if(name==='Flame Blade')dice=`${3+Math.floor(Math.max(0,l-2)/2)}d6`;
  else if(name==='Fireball')dice=`${8+Math.max(0,l-3)}d6`;
  else if(name==='Wall of Fire')dice=`${5+Math.max(0,l-4)}d8`;
  else if(name==='Fire Shield')dice='2d8';
  else if(name==='Immolation')dice='8d6';
  else if(name==='Flame Strike')dice='8d6';
  else if(name==='Meteor Swarm')dice='40d6';
  return {dice,rays};
}
function maxDiceValue(expr){let total=0;for(const part of String(expr||'').replace(/\s/g,'').split('+')){const m=part.match(/^(\d*)d(\d+)$/i);if(m)total+=Number(m[1]||1)*Number(m[2]);else if(part&&Number.isFinite(Number(part)))total+=Number(part)}return total}
function openEntelquesCast(index){
  const sp=SUMMONS.entelques.spells[index],s=state.summons.entelques;
  if(!sp.level){castEntelquesAt(index,0);return}
  if(sp.level>5){castEntelquesAt(index,sp.level);return}
  const levels=[];for(let l=sp.level;l<=5;l++){const slot=s.slots[String(l)]||s.slots[l];levels.push(`<button class="btn ${slot?.current>0?'':'subtle'}" ${slot?.current>0?'':`disabled`} onclick="castEntelquesAt(${index},${l})">Level ${l}<br><small>${slot?.current||0}/${slot?.max||0} slots</small></button>`)}
  openModal(`${sp.name} • Cast Level`, `<div class="notice">Choose the spell-slot level. Upcasting is calculated automatically up to level 5.</div><div class="btnrow" style="margin-top:14px">${levels.join('')}</div>${s.fontOfFireActive?'<div class="notice" style="margin-top:12px"><b>🔥 Font of Fire ACTIVE:</b> the next damaging fire spell of 5th level or lower will deal maximum dice damage.</div>':''}`);
}
function castEntelques(index){openEntelquesCast(index)}
function castEntelquesAt(index,castLevel){
  const d=SUMMONS.entelques,sp=d.spells[index],s=state.summons.entelques,l=Number(castLevel||sp.level||0);
  if(l>0){const slot=s.slots[String(l)]||s.slots[l];if(!slot||slot.current<=0){showFx('NO SLOT',l,`${sp.name} needs an available level ${l} slot`,'crit');return}slot.current--;}
  closeModal();const dtype=SPELL_DAMAGE_TYPES[sp.name]||'spell damage',profile=entelquesSpellProfile(sp,l),fontEligible=l<=5&&!!profile.dice||sp.special==='rays'&&l<=5;
  const useFont=!!s.fontOfFireActive&&fontEligible;
  if(sp.special==='rays'){
    s.scorchingRays=profile.rays||3;s.scorchingCastLevel=l||2;s.scorchingMantle=!useFont;s.scorchingMaxDamage=useFont;if(useFont)s.fontOfFireActive=false;
    addLog(`Entelques cast Scorching Ray at level ${l}: ${s.scorchingRays} ray attacks ready${useFont?' • Font of Fire MAX damage active for all rays':''}.`,false);save();renderSummons();startScorchingRay();return;
  }
  const expr=profile.dice?(useFont?profile.dice:`${profile.dice}+7`):(sp.roll||'');
  const maxDamage=useFont?maxDiceValue(profile.dice):null;if(useFont)s.fontOfFireActive=false;
  if(sp.attack!=null){startSummonAttack('entelques',`${sp.name}${l?` L${l}`:''}`,sp.attack,expr,dtype,{half:sp.half,maxDamage});save();return}
  if(profile.dice){
    if(maxDamage!=null){const h=Math.floor(maxDamage/2);addSummonLog(d.name,`${sp.name}${l?` L${l}`:''}`,maxDamage,dtype,`Font of Fire MAX${sp.half?` • Save half ${h}`:''}`);addLog(`${d.name} • ${sp.name}${l?` L${l}`:''}: FONT OF FIRE maximum = ${maxDamage} ${dtype} damage${sp.half?` • save: ${h}`:''}.`,false);showFx(`${d.name} • ${sp.name}`,maxDamage,`FONT OF FIRE • MAX DAMAGE${sp.half?` • save = ${h}`:''}`,'crit',[maxDamage]);save();renderSummons();return}
    rollSummonDamage('entelques',`${sp.name}${l?` L${l}`:''}`,expr,sp.half,dtype);return;
  }
  showFx(sp.name,'CAST',`${sp.text}${l?` • Level ${l}`:''}`,'attack',[l]);addLog(`Entelques cast ${sp.name}${l?` using level ${l} slot`:''}.`,false);save();renderSummons();
}
function sorcery(delta){const s=state.summons.entelques.sorcery;s.current=Math.max(0,Math.min(s.max,s.current+delta));save();renderSummons()}
function openSkyfall(){const body=`<div class="notice">Skyfall: teleport up to 60 ft, then make <b>four weapon attacks</b>. After landing, other creatures within 10 ft make DC 24 STR or fall prone.</div><div class="btnrow" style="margin-top:10px"><button class="btn" onclick="skyfallRoll('angelic')">4 Angelic</button><button class="btn" onclick="skyfallRoll('hellish')">4 Hellish</button><button class="btn" onclick="skyfallMixed()">2 Angelic + 2 Hellish</button></div>`;openModal('Skyfall',body)}
function skyfallRoll(type){closeModal();for(let i=0;i<4;i++)setTimeout(()=>startSummonAttack('twopacts',`Skyfall ${type} attack ${i+1}`,16,'1d10+10+1d8',type==='angelic'?'slashing + radiant':'slashing + fire/necrotic',{streak:type}),i*650)}
function skyfallMixed(){closeModal();for(let i=0;i<4;i++)setTimeout(()=>{const type=i<2?'angelic':'hellish';startSummonAttack('twopacts',`Skyfall ${type} attack ${i+1}`,16,'1d10+10+1d8',type==='angelic'?'slashing + radiant':'slashing + fire/necrotic',{streak:type})},i*650)}

function actionCard(id,a,i){const s=state.summons[id];let resource='';if(a.resource){const r=s.resources[a.resource.key];resource=`<span class="badge">${r.current}/${r.max}</span>`}if(a.recharge)resource+=`<button class="btn" onclick="recharge(${JSON.stringify(a.name)},${a.recharge})">Recharge d6</button>`;return `<div class="action-card"><h4>${esc(a.name)} ${resource}</h4><p>${esc(a.text)}</p><div class="btnrow"><button class="btn" onclick="summonAction('${id}',${i})">${a.attack!=null?'Attack':a.roll?'Roll Damage':'Use'}</button>${id==='twopacts'&&a.streak?`<button class="btn subtle" onclick="recordPactHit('${a.streak}')">Record hit only</button>`:''}</div></div>`}
function summonPendingHtml(id){const p=pendingSummonAttack;if(!p||p.id!==id)return '';return `<div class="pending-hit summon-pending"><div><b>${esc(p.label)} Attack: ${p.total}</b><span>${esc(p.detail)}${p.die===20?' • NAT 20':''}</span></div><div class="btnrow"><button class="btn good" onclick="resolveSummonDamage()">Roll Damage</button><button class="btn danger" onclick="summonAttackMiss()">Miss</button></div></div>`}
function summonStatsPanel(id,d){if(!d.stats)return '';const cells=Object.entries(d.stats).map(([a,v])=>`<div class="summon-stat"><button class="summon-stat-main" onclick="summonAbilityCheck('${id}','${a}')"><span>${a}</span><b>${v}</b><small>Check ${signed(mod(v))}</small></button><button class="summon-save" onclick="summonSavingThrow('${id}','${a}')">Save ${signed(summonSaveBonus(id,a))}</button></div>`).join('');return `<div class="summon-statblock"><div class="summon-stat-head"><strong>Stats & Saving Throws</strong><span>Click score = ability check • Save = saving throw</span></div><div class="summon-stat-grid">${cells}</div></div>`}
function entelquesSpells(){const s=state.summons.entelques,d=SUMMONS.entelques;const slots=Object.entries(s.slots).map(([lvl,v])=>`<div class="slot-group"><b>L${lvl}</b>${Array.from({length:v.max},(_,i)=>`<span class="slot-dot ${i<v.current?'on':''}" onclick="slotToggle('entelques','${lvl}')" title="Click to spend/reset"></span>`).join('')}<small>${v.current}/${v.max}</small></div>`).join('');const spells=d.spells.map((sp,i)=>`<div class="spell"><div><b>${sp.name}</b><small>${sp.level?`Level ${sp.level}`:'Cantrip'} • ${sp.text}</small></div><button class="roll-mini" onclick="castEntelques(${i})">Cast</button></div>`).join('');const rays=s.scorchingRays>0?`<div class="pending-hit"><div><b>Scorching Ray</b><span>${s.scorchingRays} ray attack${s.scorchingRays===1?'':'s'} remaining</span></div><button class="btn" onclick="startScorchingRay()">Attack Next Ray</button></div>`:'';return `<div class="spell-panel"><div class="slot-row"><span class="badge">Sorcery ${s.sorcery.current}/${s.sorcery.max}</span>${s.fontOfFireActive?'<span class="badge tag-special">🔥 FONT OF FIRE READY</span>':''}<button class="roll-mini" onclick="sorcery(-1)">-1 SP</button><button class="roll-mini" onclick="sorcery(1)">+1 SP</button>${slots}</div>${rays}<div class="spells">${spells}</div></div>`}
function summonCard(id,d){const s=state.summons[id];const statline=d.stats?Object.entries(d.stats).map(([a,v])=>`${a} ${v} (${signed(mod(v))})`).join(' • '):'';const traits=d.traits.map(t=>`<div class="tiny muted">• ${esc(t)}</div>`).join('');const actions=d.actions.map((a,i)=>actionCard(id,a,i)).join('');let extras='';if(id==='entelques')extras=entelquesSpells();if(id==='twopacts')extras=`<div class="spell-panel"><div class="row"><div><strong>Frenzy Streak</strong><div class="tiny muted">Must reach 10 Angelic + 10 Hellish damaging hits without taking damage.</div></div><div class="right"><span class="badge">A ${s.angelicStreak}/10</span><span class="badge">H ${s.hellishStreak}/10</span><button class="roll-mini" onclick="resetPactStreak()">Took Damage</button></div></div><div class="btnrow"><button class="btn" onclick="useFrenzy(1)">Frenzy: 3 Max Skyfalls</button><button class="btn" onclick="useFrenzy(2)">Frenzy: Clone Extra Action</button></div><div class="row" style="margin-top:8px"><span>Chosen of Hell</span><b>${monthlyText(s.chosenHellUsedAt)}</b></div><div class="row"><span>Herald of Heaven</span><b>${monthlyText(s.heraldHeavenUsedAt)}</b></div></div>`;if(d.legendaryMax)extras+=`<div class="spell-panel"><div class="row"><span><strong>Legendary Actions</strong></span><div class="right"><span class="badge">${s.resources.legendary.current}/${s.resources.legendary.max}</span><button class="roll-mini" onclick="resetLegendary('${id}')">New Round</button><button class="roll-mini" onclick="useLegendary('${id}',1,'${d.name} Legendary Action')">Spend 1</button></div></div></div>`;return `<article class="summon-card ${d.special?'special':''}"><div class="summon-hero"><div class="summon-img clickable-summon-img" onclick='openImageLightbox(${JSON.stringify(d.name)},${JSON.stringify(d.img)})' title="Click to open full statblock"><img src="${d.img}" alt="${esc(d.name)}"><span class="summon-image-hint">Click to view statblock</span></div><div class="summon-info"><h2>${esc(d.name)}</h2><div class="summon-meta">AC ${d.ac} • Speed ${d.speed}${d.special?' • SPECIAL PACT SUMMON':''}<br>${statline}</div><div class="summon-status"><span class="badge ${s.active?'tag-active':''}">${s.active?'ACTIVE':'RESERVE'}</span>${s.agent?'<span class="badge tag-agent">SHADOW AGENT</span>':''}${d.special?'<span class="badge tag-special">DOES NOT USE 5-SERVANT CAP</span>':''}<span class="badge">Shared HP ${state.settings.currentMana}/${state.settings.maxMana}</span></div>${traits}<div class="summon-actions"><button class="btn ${s.active?'danger':'good'}" onclick="toggleSummon('${id}')">${s.active?'Dismiss':'Summon'}</button>${d.special?'':`<button class="btn" onclick="makeAgent('${id}')">Shadow Agent</button>`}<button class="btn" onclick="resetOneSummon('${id}')">Reset Abilities</button><button class="btn" onclick='openImageLightbox(${JSON.stringify(d.name)},${JSON.stringify(d.img)})'>Original Statblock</button></div></div></div>${summonStatsPanel(id,d)}${summonPendingHtml(id)}<div class="ability-list">${actions}</div>${extras}</article>`}
function renderSummons(){const slog=(state.summonLog||[]).map(x=>`<div class="logline summon-log-line"><b>${x.t}</b> <strong>${esc(x.who)}</strong> — ${esc(x.action)} — <span>${esc(String(x.result))}${typeof x.result==='number'?' damage':''}${x.type?` (${esc(x.type)})`:''}</span>${x.extra?` <small>• ${esc(x.extra)}</small>`:''}</div>`).join('')||'<span class="muted tiny">Summon attacks and spell damage appear here.</span>';document.getElementById('summons').innerHTML=`<div class="summons-page"><div class="summon-toolbar"><div class="summon-title-block"><h1 style="margin:0;color:#f0cf77;font-variant:small-caps">Summons</h1><div class="muted tiny">${shadowActive()}/5 Shadow Servants active • Lord of Two Pacts tracked separately</div></div><div class="summon-pool-vital"><label>SHADOW HP / MANA — EDIT DIRECTLY</label><div class="inline-hp summon-pool-inputs"><input type="number" min="0" value="${state.settings.currentMana}" onchange="setManaInline('current',this.value)" aria-label="Current Shadow HP and Mana"><span>/</span><input type="number" min="0" value="${state.settings.maxMana}" onchange="setManaInline('max',this.value)" aria-label="Maximum Shadow HP and Mana"></div><div class="bar summon-pool-bar"><div class="fill" style="width:${manaPct()}%"></div></div></div><div class="btnrow"><button class="btn danger" onclick="changeMana('damage')">Shared Damage</button><button class="btn good" onclick="changeMana('heal')">Restore Pool</button><button class="btn" onclick="shortRest()">Short Rest</button><button class="btn" onclick="longRest()">Long Rest</button></div></div><div class="summon-grid">${Object.entries(SUMMONS).map(([id,d])=>summonCard(id,d)).join('')}</div><article class="card summon-combat-log"><div class="card-head"><h3>Summon Combat Log</h3><button class="roll-mini" onclick="state.summonLog=[];save();renderSummons()">Clear</button></div><div class="card-body"><div class="log">${slog}</div></div></article></div>`}

function openModal(title,body){document.getElementById('modalTitle').textContent=title;document.getElementById('modalBody').innerHTML=body;document.getElementById('modal').classList.add('open')}
function closeModal(){document.getElementById('modal').classList.remove('open')}
function openImageLightbox(title,path){const box=document.getElementById('imageLightbox'),img=document.getElementById('imageLightboxImg');document.getElementById('imageLightboxTitle').textContent=title;img.src=path;img.alt=title;box.classList.add('open')}
function closeImageLightbox(){const box=document.getElementById('imageLightbox');box.classList.remove('open');document.getElementById('imageLightboxImg').src=''}
function openImage(title,path){openImageLightbox(title,path)}
function openCodex(){openModal('Kokopelis Codex',`<div class="codex-grid">${BASE.docs.map(([n,p])=>`<div class="codex-item"><img class="codex-preview" src="${p}" alt="${esc(n)}" title="Click to enlarge" onclick='openImageLightbox(${JSON.stringify(n)},${JSON.stringify(p)})'><button onclick='openImageLightbox(${JSON.stringify(n)},${JSON.stringify(p)})'>${esc(n)}</button></div>`).join('')}</div>`)}
function openSettingsLegacy(){const s=state.settings;openModal('Edit Kokopelis',`<div class="settings-grid"><div class="field"><label>Level</label><input id="setLevel" type="number" value="${s.level}"></div><div class="field"><label>Speed</label><input id="setSpeed" type="number" value="${s.speed}"></div><div class="field"><label>Max HP</label><input id="setMaxHp" type="number" value="${s.maxHp}"></div><div class="field"><label>Current HP</label><input id="setCurHp" type="number" value="${s.currentHp}"></div><div class="field"><label>Natural AC</label><input id="setNatAc" type="number" value="${s.naturalAc}"></div><div class="field"><label>Current AC</label><input id="setCurAc" type="number" value="${s.currentAc}"></div><div class="field"><label>Max Mana / Summon HP</label><input id="setMaxMana" type="number" value="${s.maxMana}"></div><div class="field"><label>Current Mana / Summon HP</label><input id="setCurMana" type="number" value="${s.currentMana}"></div><div class="field"><label>Weapon Enhancement</label><input id="setEnh" type="number" value="${s.weaponEnhancement}"></div><div class="field"><label>Weapon Reach</label><input id="setReach" type="number" value="${s.weaponReach}"></div>${Object.entries(abilities()).map(([a,v])=>`<div class="field"><label>${a}</label><input id="set${a}" type="number" value="${v}"></div>`).join('')}<div class="field" style="grid-column:1/-1"><label>Proficient Skills (comma separated)</label><input id="setSkills" value="${esc(profSkills().join(', '))}"></div><div class="field" style="grid-column:1/-1"><label>Fighting Styles</label><input id="setStyles" value="${esc((s.fightingStyles||BASE.fightingStyles).join(', '))}"></div><div class="field" style="grid-column:1/-1"><label>Maneuvers — Name :: Description, one per line</label><textarea id="setManeuvers">${esc((s.maneuvers||BASE.maneuvers).map(x=>x.join(' :: ')).join('\n'))}</textarea></div><div class="field" style="grid-column:1/-1"><label>Notes</label><textarea id="setNotes">${esc(s.notes||'')}</textarea></div></div><div class="btnrow" style="margin-top:10px"><button class="btn primary" onclick="saveSettings()">Save Changes</button><button class="btn" onclick="exportSave()">Export Save</button><button class="btn" onclick="document.getElementById('importFile').click()">Import Save</button></div>`)}
function saveSettings(){const s=state.settings;s.level=Number(setLevel.value);s.speed=Number(setSpeed.value);s.maxHp=Number(setMaxHp.value);s.currentHp=Number(setCurHp.value);s.naturalAc=Number(setNatAc.value);s.currentAc=Number(setCurAc.value);s.maxMana=Number(setMaxMana.value);s.currentMana=Number(setCurMana.value);s.weaponEnhancement=Number(setEnh.value);s.weaponReach=Number(setReach.value);s.abilities={STR:Number(setSTR.value),DEX:Number(setDEX.value),CON:Number(setCON.value),INT:Number(setINT.value),WIS:Number(setWIS.value),CHA:Number(setCHA.value)};s.profSkills=setSkills.value.split(',').map(x=>x.trim()).filter(Boolean);s.fightingStyles=setStyles.value.split(',').map(x=>x.trim()).filter(Boolean);s.maneuvers=setManeuvers.value.split(/\n+/).map(line=>{const i=line.indexOf('::');return i>=0?[line.slice(0,i).trim(),line.slice(i+2).trim()]:[line.trim(),'Custom maneuver']}).filter(x=>x[0]);s.notes=setNotes.value;save();closeModal();renderAll();showFx('SAVED','✓','Character values updated','damage',[20])}
function exportSave(){const b=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='kokopelis-v4.8-save.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function importSave(file){const r=new FileReader();r.onload=()=>{try{state=JSON.parse(r.result);migrate();save();renderAll();closeModal();showFx('IMPORTED','✓','Save loaded','damage',[20])}catch(e){alert('Invalid Kokopelis save file.')}};r.readAsText(file)}

function renderAll(){renderCharacter();renderSummons()}
function renderCurrent(){const id=document.querySelector('.page.active')?.id||'character';if(id==='summons')renderSummons();else renderCharacter()}
document.querySelectorAll('.page-tab').forEach(b=>b.onclick=()=>{activatePage(b.dataset.page);window.scrollTo({top:0,behavior:'smooth'})});
document.getElementById('importFile').onchange=e=>e.target.files[0]&&importSave(e.target.files[0]);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(document.getElementById('imageLightbox')?.classList.contains('open'))closeImageLightbox();else closeModal()}});


// V5 PWA / mobile helpers
let deferredInstallPrompt=null;
function inStandaloneMode(){return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone===true}
function isIosDevice(){return /iphone|ipad|ipod/i.test(navigator.userAgent)}
function updateInstallButton(){document.querySelectorAll('.install-app-btn').forEach(b=>{b.hidden=inStandaloneMode() || (!deferredInstallPrompt && !isIosDevice())})}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;updateInstallButton()});
window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;updateInstallButton();showFx('KOKOPELIS','INSTALLED','Added to your home screen','damage',[20])});
async function installApp(){
  if(inStandaloneMode()){showFx('KOKOPELIS','INSTALLED','Already running as an app','damage',[20]);return}
  if(deferredInstallPrompt){deferredInstallPrompt.prompt();try{await deferredInstallPrompt.userChoice}catch(e){}deferredInstallPrompt=null;updateInstallButton();return}
  if(isIosDevice()){
    openModal('Install Kokopelis on iPhone / iPad',`<div class="notice"><b>Safari:</b><br>1. Tap the Share button <b>□↑</b>.<br>2. Choose <b>Add to Home Screen</b>.<br>3. Tap <b>Add</b>.<br><br>The app will then open from your Home Screen in standalone mode.</div><div class="btnrow" style="margin-top:12px"><button class="btn" onclick="closeModal()">Close</button></div>`);return;
  }
  openModal('Install Kokopelis',`<div class="notice">Open this page from its <b>HTTPS hosted address</b> in Chrome or Edge. Then use the browser menu and choose <b>Install app</b> or <b>Add to Home screen</b>.</div><div class="btnrow" style="margin-top:12px"><button class="btn" onclick="closeModal()">Close</button></div>`);
}
function activatePage(page){
  document.querySelectorAll('.page-tab').forEach(x=>x.classList.toggle('active',x.dataset.page===page));
  document.querySelectorAll('.page').forEach(x=>x.classList.toggle('active',x.id===page));
  renderCurrent();
}
function mobileGo(target){
  if(target==='summons'){activatePage('summons');window.scrollTo({top:0,behavior:'smooth'});return}
  activatePage('character');
  setTimeout(()=>{
    if(target==='combat')scrollCard('vitalsCard');
    else if(target==='resources')scrollCard('resourcesCard');
    else if(target==='sheet')document.querySelector('.sheet-shell')?.scrollIntoView({behavior:'smooth',block:'start'});
  },30);
}
if('serviceWorker' in navigator && (location.protocol==='https:' || location.hostname==='localhost' || location.hostname==='127.0.0.1')){
  navigator.serviceWorker.register('./sw.js').catch(()=>{});
}
updateInstallButton();

renderAll();
