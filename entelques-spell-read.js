// V5.6 — Entelques spell Read references
(function(){
  const SPELLS={
    'Fire Bolt':{
      level:'Evocation cantrip',time:'1 action',range:'120 ft',components:'V, S',duration:'Instantaneous',source:'Player’s Handbook • D&D 5e Wikidot',
      effect:'Make a ranged spell attack against one creature or object in range. On a hit, it takes 1d10 fire damage. A flammable object hit by the spell catches fire if it is not being worn or carried.',
      upcast:'Cantrip scaling: 2d10 at character level 5, 3d10 at level 11, and 4d10 at level 17.'
    },
    'Control Flames':{
      level:'Transmutation cantrip',time:'1 action',range:'60 ft',components:'S',duration:'Instantaneous or 1 hour',source:'Xanathar’s Guide to Everything • D&D 5e Wikidot',
      effect:'Choose a nonmagical flame you can see that fits inside a 5-foot cube. Choose one effect: extend the flame up to 5 feet in one direction if fuel is present; extinguish the flame; double or halve its bright/dim light area and optionally change its color for 1 hour; or create simple animated shapes in the flame for 1 hour. You can have up to three non-instantaneous Control Flames effects active at once, and can dismiss one as an action.',
      upcast:'No spell-slot scaling.'
    },
    'Create Bonfire':{
      level:'Conjuration cantrip',time:'1 action',range:'60 ft',components:'V, S',duration:'Concentration, up to 1 minute',source:'Xanathar’s Guide to Everything • D&D 5e Wikidot',
      effect:'Create a bonfire filling a 5-foot cube on ground you can see. A creature in that space when the spell appears must make a Dexterity save or take 1d8 fire damage. The same save is required when a creature enters the bonfire for the first time on a turn or ends its turn there.',
      upcast:'Cantrip scaling: 2d8 at character level 5, 3d8 at level 11, and 4d8 at level 17.'
    },
    'Burning Hands':{
      level:'1st-level evocation',time:'1 action',range:'Self (15-ft cone)',components:'V, S',duration:'Instantaneous',source:'Player’s Handbook • D&D 5e Wikidot',
      effect:'Creatures in a 15-foot cone make a Dexterity saving throw. Failed save: 3d6 fire damage. Successful save: half damage. Flammable objects in the area ignite if they are not being worn or carried.',
      upcast:'Using a 2nd-level or higher slot adds +1d6 fire damage for every slot level above 1st.'
    },
    'Hellish Rebuke':{
      level:'1st-level evocation',time:'1 reaction',range:'60 ft',components:'V, S',duration:'Instantaneous',source:'Player’s Handbook • D&D 5e Wikidot',
      effect:'Reaction trigger: you are damaged by a creature within 60 feet that you can see. That creature makes a Dexterity saving throw. Failed save: 2d10 fire damage. Successful save: half damage.',
      upcast:'Using a 2nd-level or higher slot adds +1d10 fire damage for every slot level above 1st.'
    },
    'Scorching Ray':{
      level:'2nd-level evocation',time:'1 action',range:'120 ft',components:'V, S',duration:'Instantaneous',source:'Player’s Handbook • D&D 5e Wikidot',
      effect:'Create three fiery rays. You may aim them all at one target or split them among multiple targets. Make a separate ranged spell attack for each ray. Each ray that hits deals 2d6 fire damage.',
      upcast:'Using a 3rd-level or higher slot creates +1 additional ray for every slot level above 2nd.'
    },
    'Flame Blade':{
      level:'2nd-level evocation',time:'1 bonus action',range:'Self',components:'V, S, M',duration:'Concentration, up to 10 minutes',source:'Player’s Handbook • D&D 5e Wikidot',
      effect:'Create a fiery blade in your free hand. As an action, make a melee spell attack with it; on a hit it deals 3d6 fire damage. If you let go of the blade it disappears, but you can evoke it again as a bonus action while the spell lasts. It sheds bright light for 10 feet and dim light for another 10 feet.',
      upcast:'Damage increases by +1d6 for every two slot levels above 2nd (4d6 with a 4th/5th-level slot, 5d6 with a 6th/7th-level slot, etc.).'
    },
    'Fireball':{
      level:'3rd-level evocation',time:'1 action',range:'150 ft',components:'V, S, M',duration:'Instantaneous',source:'Player’s Handbook • D&D 5e Wikidot',
      effect:'Choose a point in range. Creatures in a 20-foot-radius sphere centered there make a Dexterity saving throw. Failed save: 8d6 fire damage. Successful save: half damage. The blast spreads around corners and ignites flammable objects that are not being worn or carried.',
      upcast:'Using a 4th-level or higher slot adds +1d6 fire damage for every slot level above 3rd.'
    },
    'Flame Arrows':{
      level:'3rd-level transmutation',time:'1 action',range:'Touch',components:'V, S',duration:'Concentration, up to 1 hour',source:'Xanathar’s Guide to Everything • D&D 5e Wikidot',
      effect:'Touch a quiver containing arrows or bolts. The next 12 pieces of ammunition drawn from it become magical for this effect. When one of those pieces hits with a ranged weapon attack, it deals an extra 1d6 fire damage. The magic on that piece ends whether the attack hits or misses, and the spell ends after 12 affected pieces have been drawn.',
      upcast:'Using a 4th-level or higher slot increases the number of affected ammunition pieces by +2 for every slot level above 3rd.'
    },
    'Wall of Fire':{
      level:'4th-level evocation',time:'1 action',range:'120 ft',components:'V, S, M',duration:'Concentration, up to 1 minute',source:'Player’s Handbook • D&D 5e Wikidot',
      effect:'Create an opaque wall of fire on a solid surface: up to 60 ft long, 20 ft high, and 1 ft thick, or a ring up to 20 ft in diameter with the same height/thickness. When it appears, creatures in its area make a Dexterity save: 5d8 fire damage on a failure, half on success. Choose one hot side of the wall. A creature takes 5d8 fire damage when it enters the wall for the first time on a turn, ends its turn inside it, or ends its turn within 10 ft of the hot side. The opposite side deals no proximity damage.',
      upcast:'Using a 5th-level or higher slot adds +1d8 fire damage for every slot level above 4th.'
    },
    'Fire Shield':{
      level:'4th-level evocation',time:'1 action',range:'Self',components:'V, S, M',duration:'10 minutes',source:'Player’s Handbook • D&D 5e Wikidot',
      effect:'Choose a warm shield or chill shield. Warm shield: resistance to cold damage, and a creature within 5 ft that hits you with a melee attack takes 2d8 fire damage. Chill shield: resistance to fire damage, and such a melee attacker takes 2d8 cold damage. The shield sheds bright light for 10 ft and dim light for another 10 ft. You can dismiss it early with an action. This spell does not require concentration.',
      upcast:'No spell-slot scaling.'
    },
    'Immolation':{
      level:'5th-level evocation',time:'1 action',range:'90 ft',components:'V',duration:'Concentration, up to 1 minute',source:'Xanathar’s Guide to Everything • D&D 5e Wikidot',
      effect:'One creature you can see makes a Dexterity saving throw. Failed save: 8d6 fire damage and the target catches fire for the spell’s duration. Successful save: half of the initial damage and no ongoing burn. A burning target repeats the save at the end of each of its turns; on a failure it takes 4d6 fire damage, and on a success the spell ends. The magical fire cannot be extinguished by nonmagical means. If this spell kills the target, its body is reduced to ash.',
      upcast:'No spell-slot scaling.'
    },
    'Flame Strike':{
      level:'5th-level evocation',time:'1 action',range:'60 ft',components:'V, S, M',duration:'Instantaneous',source:'Player’s Handbook • D&D 5e Wikidot',
      effect:'Choose a point in range. A vertical 10-foot-radius, 40-foot-high cylinder of divine fire appears there. Creatures in the cylinder make a Dexterity save. Failed save: 4d6 fire + 4d6 radiant damage. Successful save: half of both damage types.',
      upcast:'Using a 6th-level or higher slot adds +1d6 per slot level above 5th to either the fire damage or the radiant damage (your choice).'
    },
    'Meteor Swarm':{
      level:'9th-level evocation',time:'1 action',range:'1 mile',components:'V, S',duration:'Instantaneous',source:'Player’s Handbook • D&D 5e Wikidot',
      effect:'Choose four different points you can see within range. Each point erupts in a 40-foot-radius sphere. Creatures in a sphere make a Dexterity save. Failed save: 20d6 fire + 20d6 bludgeoning damage. Successful save: half damage. A creature inside overlapping blast areas is affected only once. The blasts spread around corners, damage objects, and ignite flammable objects that are not being worn or carried.',
      upcast:'9th-level spell; no higher slot exists.'
    }
  };

  function esc(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]))}

  function ensureOverlay(){
    let overlay=document.getElementById('spellReadOverlay');
    if(overlay)return overlay;
    overlay=document.createElement('div');
    overlay.id='spellReadOverlay';
    overlay.className='spell-read-overlay';
    overlay.innerHTML='<div class="spell-read-card" role="dialog" aria-modal="true"></div>';
    overlay.addEventListener('pointerdown',e=>{if(e.target===overlay)closeSpellRead()});
    document.body.appendChild(overlay);
    return overlay;
  }

  function openSpellRead(name){
    const d=SPELLS[name];if(!d)return;
    const overlay=ensureOverlay();
    const card=overlay.querySelector('.spell-read-card');
    card.innerHTML=`<div class="spell-read-head"><h3>${esc(name)}</h3><div class="spell-read-level">${esc(d.level)}</div></div><div class="spell-read-body"><div class="spell-read-meta"><div><span>Casting Time</span><b>${esc(d.time)}</b></div><div><span>Range</span><b>${esc(d.range)}</b></div><div><span>Components</span><b>${esc(d.components)}</b></div><div><span>Duration</span><b>${esc(d.duration)}</b></div></div><div class="spell-read-effect">${esc(d.effect)}</div><div class="spell-read-upcast"><b>Higher Levels / Scaling</b><br>${esc(d.upcast)}</div><div class="spell-read-source">Reference checked against ${esc(d.source)}</div><div class="spell-read-hint">Click anywhere outside this window to close</div></div>`;
    overlay.classList.add('open');
  }

  function closeSpellRead(){document.getElementById('spellReadOverlay')?.classList.remove('open')}

  function decorate(){
    const root=document.getElementById('summons');if(!root)return;
    const entelques=[...root.querySelectorAll('.summon-card')].find(card=>(card.querySelector('h2')?.textContent||'').includes('Entelques'));
    if(!entelques)return;
    entelques.querySelectorAll('.spell').forEach(spell=>{
      if(spell.querySelector('.entelques-read-btn'))return;
      const name=(spell.querySelector('b')?.textContent||'').trim();
      if(!SPELLS[name])return;
      const cast=spell.querySelector('button.roll-mini');
      if(!cast)return;
      let actions=spell.querySelector('.spell-read-actions');
      if(!actions){
        actions=document.createElement('div');actions.className='spell-read-actions';
        cast.parentNode.insertBefore(actions,cast);actions.appendChild(cast);
      }
      const read=document.createElement('button');
      read.type='button';read.className='entelques-read-btn';read.textContent='Read';
      read.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openSpellRead(name)});
      actions.insertBefore(read,cast);
    });
  }

  const root=document.getElementById('summons');
  if(root){
    let scheduled=false;
    new MutationObserver(()=>{
      if(scheduled)return;scheduled=true;
      requestAnimationFrame(()=>{scheduled=false;decorate()});
    }).observe(root,{childList:true,subtree:true});
  }
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSpellRead()});
  decorate();
  window.openSpellRead=openSpellRead;
  window.closeSpellRead=closeSpellRead;
})();
