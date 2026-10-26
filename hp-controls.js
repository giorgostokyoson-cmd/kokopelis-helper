// V5.4 — quick HP Damage / Heal controls using the existing in-app modal
(function(){
  function injectHpControls(){
    const card=document.getElementById('vitalsCard');
    if(!card || card.querySelector('.hp-quick-controls')) return;
    const body=card.querySelector('.card-body');
    if(!body) return;
    const hpBar=body.querySelector('.bar');
    if(!hpBar) return;

    const controls=document.createElement('div');
    controls.className='btnrow hp-quick-controls';
    controls.style.marginTop='8px';
    controls.innerHTML=`<button class="btn danger" onclick="changeHp('damage')">Damage</button><button class="btn good" onclick="changeHp('heal')">Heal</button>`;
    hpBar.insertAdjacentElement('afterend',controls);
  }

  window.changeHp=function(mode='damage'){
    const isDamage=mode==='damage';
    openModal(isDamage?'Damage HP':'Heal HP',`<div class="short-rest-panel"><div class="short-rest-summary"><div><span>Current HP</span><b>${state.settings.currentHp}</b></div><div><span>Maximum</span><b>${state.settings.maxHp}</b></div></div><div class="field short-rest-field"><label>${isDamage?'How much HP should be removed?':'How much HP should be restored?'}</label><input id="hpChangeAmount" type="number" min="0" value="10"></div><div class="btnrow short-rest-actions"><button class="btn ${isDamage?'danger':'good'}" onclick="applyHpChange('${mode}')">${isDamage?'Damage':'Heal'}</button><button class="btn" onclick="closeModal()">Cancel</button></div></div>`);
    setTimeout(()=>document.getElementById('hpChangeAmount')?.focus(),0);
  };

  window.applyHpChange=function(mode){
    const el=document.getElementById('hpChangeAmount');
    const n=Math.max(0,Number(el?.value)||0);
    if(mode==='damage') state.settings.currentHp=Math.max(0,Number(state.settings.currentHp||0)-n);
    else state.settings.currentHp=Number(state.settings.currentHp||0)+n; // intentionally uncapped above max HP

    addLog(`HP: ${mode==='damage'?'-':'+'}${n} → ${state.settings.currentHp}/${state.settings.maxHp}.`,false);
    closeModal();
    save();
    renderCurrent();
    if(typeof checkLegendaryEndurance==='function') checkLegendaryEndurance();
    showFx(mode==='damage'?'HP DAMAGE':'HP HEALED',state.settings.currentHp,`${mode==='damage'?'-':'+'}${n} • ${state.settings.currentHp}/${state.settings.maxHp}`,'damage',[n]);
  };

  const originalRenderCharacter=window.renderCharacter;
  if(typeof originalRenderCharacter==='function'){
    window.renderCharacter=function(){
      const result=originalRenderCharacter.apply(this,arguments);
      injectHpControls();
      return result;
    };
  }

  const root=document.getElementById('character');
  if(root){
    const observer=new MutationObserver(()=>injectHpControls());
    observer.observe(root,{childList:true,subtree:true});
  }

  injectHpControls();
  window.injectHpControls=injectHpControls;
})();
