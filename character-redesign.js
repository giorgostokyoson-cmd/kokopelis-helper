/* V6.0 — compact Character page + dedicated Skills & Saving Throws tab */
(function(){
  const SAVE_ORDER=['STR','DEX','CON','INT','WIS','CHA'];
  const SAVE_NAMES={STR:'Strength',DEX:'Dexterity',CON:'Constitution',INT:'Intelligence',WIS:'Wisdom',CHA:'Charisma'};
  const SKILL_MARK={
    'Acrobatics':'ACR','Animal Handling':'ANM','Arcana':'ARC','Athletics':'ATH','Deception':'DEC','History':'HIS',
    'Insight':'INS','Intimidation':'INT','Investigation':'INV','Medicine':'MED','Nature':'NAT','Perception':'PER',
    'Performance':'PRF','Persuasion':'PRS','Religion':'REL','Sleight of Hand':'SOH','Stealth':'STL','Survival':'SUR'
  };
  const sign=n=>Number(n)>=0?`+${Number(n)}`:`${Number(n)}`;

  function profileHtml(){
    const a=abilities();
    const score=(key)=>`<div class="kokopelis-ability"><label>${key}</label><input type="number" value="${a[key]}" onchange="setAbilityScore('${key}',this.value)" aria-label="${SAVE_NAMES[key]}"><b>${sign(abilityMod(key))}</b></div>`;
    return `<section class="kokopelis-profile">
      <div class="kokopelis-profile-hero">
        <img src="icons/kokopelis-face-512.jpg" alt="Kokopelis portrait">
        <div class="kokopelis-profile-title"><h1>Kokopelis</h1><p>Half Elf • Fighter Level ${level()}</p></div>
      </div>
      <div class="kokopelis-profile-stats">${SAVE_ORDER.map(score).join('')}</div>
      <div class="kokopelis-profile-meta">
        <div class="kokopelis-meta-box"><span>Hit Points</span><b>${state.settings.currentHp} / ${state.settings.maxHp}</b></div>
        <div class="kokopelis-meta-box"><span>Armor Class</span><b>${state.settings.currentAc}</b></div>
        <div class="kokopelis-meta-box"><span>Speed</span><b>${state.settings.speed} ft</b></div>
        <div class="kokopelis-meta-box"><span>Initiative</span><b>${sign(abilityMod('DEX'))}</b></div>
        <div class="kokopelis-meta-box"><span>Proficiency</span><b>${sign(pb())}</b></div>
        <div class="kokopelis-meta-box"><span>Inspiration</span><b>${state.settings.inspiration||0}</b></div>
      </div>
    </section>`;
  }

  function applyCharacterRedesign(){
    const host=document.getElementById('character');
    if(!host)return;
    const oldSheet=host.querySelector('.sheet-shell');
    if(oldSheet){
      const wrap=document.createElement('div');
      wrap.innerHTML=profileHtml();
      oldSheet.replaceWith(wrap.firstElementChild);
    }
    const oldSkills=host.querySelector('#skillsCard');
    if(oldSkills)oldSkills.remove();
  }

  function renderSkillsSaves(){
    const host=document.getElementById('skills-saves');
    if(!host)return;
    const skills=ALL_SKILLS.map(s=>{
      const prof=profSkills().includes(s);
      const bonus=skillBonus(s);
      return `<div class="ss-skill ${prof?'prof':''}">
        <div class="ss-skill-icon">${SKILL_MARK[s]||'✦'}</div>
        <div class="ss-skill-name"><b>${esc(s)}${prof?'<span class="ss-prof-tag">PROF</span>':''}</b><span>${skillMap[s]}</span></div>
        <span class="ss-bonus">${sign(bonus)}</span>
        <button class="btn ss-roll" onclick="rollD20(${JSON.stringify(s)},${bonus})">Roll</button>
      </div>`;
    }).join('');

    const saves=SAVE_ORDER.map(key=>{
      const bonus=saveBonus(key);
      const prof=BASE.savingProf.includes(key);
      return `<div class="ss-save">
        <div class="abbr">${key}</div>
        <b>${SAVE_NAMES[key]}</b>
        <small>${prof?'Proficient save':'Saving throw'}</small>
        <span class="ss-bonus">${sign(bonus)}</span><br>
        <button class="btn ss-roll" onclick="rollD20('${key} Save',${bonus})">Roll</button>
      </div>`;
    }).join('');

    host.innerHTML=`<div class="skills-saves-page">
      <div class="ss-page-head">
        <div><h1>Skills & Saving Throws</h1><p>Kokopelis • Half Elf • Fighter Level ${level()} • click any Roll button to use the existing d20 popup.</p></div>
        <div class="ss-passive">Passive Perception <b>${10+skillBonus('Perception')}</b></div>
      </div>
      <section class="ss-panel">
        <div class="ss-panel-head"><div class="ss-panel-emblem">✦</div><div><h2>Skill Checks</h2><small>Current modifier is calculated from your live ability scores and proficiencies.</small></div></div>
        <div class="ss-skills-grid">${skills}</div>
      </section>
      <section class="ss-panel">
        <div class="ss-panel-head"><div class="ss-panel-emblem">◆</div><div><h2>Saving Throws</h2><small>Strength, Constitution and Wisdom currently include proficiency.</small></div></div>
        <div class="ss-saves-grid">${saves}</div>
      </section>
    </div>`;
  }

  const previousRenderCharacter=window.renderCharacter;
  if(typeof previousRenderCharacter==='function'){
    window.renderCharacter=function(){
      const result=previousRenderCharacter.apply(this,arguments);
      applyCharacterRedesign();
      renderSkillsSaves();
      return result;
    };
  }

  const previousRenderCurrent=window.renderCurrent;
  if(typeof previousRenderCurrent==='function'){
    window.renderCurrent=function(){
      const id=document.querySelector('.page.active')?.id||'character';
      if(id==='skills-saves'){
        renderSkillsSaves();
        return;
      }
      const result=previousRenderCurrent.apply(this,arguments);
      if(id==='character')applyCharacterRedesign();
      return result;
    };
  }

  const previousActivatePage=window.activatePage;
  if(typeof previousActivatePage==='function'){
    window.activatePage=function(page){
      if(page==='skills-saves')renderSkillsSaves();
      return previousActivatePage.apply(this,arguments);
    };
  }

  window.renderSkillsSaves=renderSkillsSaves;
  applyCharacterRedesign();
  renderSkillsSaves();
})();
