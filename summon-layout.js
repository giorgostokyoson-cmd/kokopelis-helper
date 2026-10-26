// V5.5 — persistent draggable summon layout with per-card locks
(function(){
  const STORAGE_KEY='kokopelis-summon-layout-v1';
  const IDS=['arkham','barbarossa','entelques','jack','magnus','mantris','twopacts'];
  const NAMES={
    arkham:'Arkham, the Cursed Blade',
    barbarossa:'Barbarossa, Shadow Pirate Captain',
    entelques:'Entelques, the Scorching Ascendant',
    jack:'Jack the Reaper',
    magnus:'Magnus the Mountain',
    mantris:'Mantris — Dhampir Blood Hunter',
    twopacts:'Lord of Two Pacts'
  };

  let drag=null;

  function defaultState(){
    return {order:[...IDS],locked:Object.fromEntries(IDS.map(id=>[id,true]))};
  }

  function loadLayout(){
    try{
      const raw=JSON.parse(localStorage.getItem(STORAGE_KEY));
      if(!raw)return defaultState();
      const order=Array.isArray(raw.order)?raw.order.filter(id=>IDS.includes(id)):[];
      IDS.forEach(id=>{if(!order.includes(id))order.push(id)});
      const locked={};
      IDS.forEach(id=>locked[id]=raw.locked?.[id]!==false);
      return {order,locked};
    }catch(e){return defaultState()}
  }

  let layout=loadLayout();
  function saveLayout(){localStorage.setItem(STORAGE_KEY,JSON.stringify(layout))}

  function cardId(card,index){
    if(card.dataset.summonId)return card.dataset.summonId;
    const name=(card.querySelector('h2')?.textContent||'').trim();
    const byName=IDS.find(id=>NAMES[id]===name);
    return byName||IDS[index]||'';
  }

  function ensureHint(root){
    const toolbar=root.querySelector('.summon-toolbar');
    if(!toolbar||root.querySelector('.summon-layout-hint'))return;
    const hint=document.createElement('div');
    hint.className='summon-layout-hint';
    hint.textContent='Layout: Unlock the two summon cards you want to reposition, then drag one using ☰. Lock them again when finished.';
    toolbar.appendChild(hint);
  }

  function updateControls(card,id){
    const controls=card.querySelector('.summon-layout-controls');
    if(!controls)return;
    const locked=layout.locked[id]!==false;
    const move=controls.querySelector('.summon-move-handle');
    const lock=controls.querySelector('.summon-lock-btn');
    if(move){move.disabled=locked;move.title=locked?'Unlock this summon before moving it':'Drag to swap position with another unlocked summon'}
    if(lock){
      lock.textContent=locked?'🔓 Unlock':'🔒 Lock';
      lock.classList.toggle('locked',locked);
      lock.classList.toggle('unlocked',!locked);
      lock.title=locked?'Unlock layout position':'Lock layout position';
    }
  }

  function decorateCard(card,id){
    if(!id)return;
    card.dataset.summonId=id;
    const info=card.querySelector('.summon-info');
    if(!info)return;
    let controls=info.querySelector('.summon-layout-controls');
    if(!controls){
      controls=document.createElement('div');
      controls.className='summon-layout-controls';
      controls.innerHTML='<button class="summon-layout-btn summon-move-handle" type="button" aria-label="Move summon">☰</button><button class="summon-layout-btn summon-lock-btn" type="button"></button>';
      info.appendChild(controls);
      const move=controls.querySelector('.summon-move-handle');
      const lock=controls.querySelector('.summon-lock-btn');
      lock.addEventListener('click',e=>{
        e.preventDefault();e.stopPropagation();
        layout.locked[id]=!layout.locked[id];
        saveLayout();
        updateControls(card,id);
      });
      move.addEventListener('pointerdown',e=>startDrag(e,card,id));
    }
    updateControls(card,id);
  }

  function applyOrder(grid){
    const cards=[...grid.querySelectorAll(':scope > .summon-card')];
    const map=new Map(cards.map(card=>[card.dataset.summonId,card]));
    layout.order.forEach(id=>{const card=map.get(id);if(card)grid.appendChild(card)});
  }

  function setup(){
    const root=document.getElementById('summons');
    if(!root)return;
    const grid=root.querySelector('.summon-grid');
    if(!grid)return;
    ensureHint(root);
    const cards=[...grid.querySelectorAll(':scope > .summon-card')];
    cards.forEach((card,index)=>decorateCard(card,cardId(card,index)));
    applyOrder(grid);
  }

  function createGhost(card,x,y){
    const ghost=document.createElement('div');
    ghost.className='summon-drag-ghost';
    ghost.textContent='Moving '+(card.querySelector('h2')?.textContent||'Summon');
    ghost.style.left=x+'px';ghost.style.top=y+'px';
    document.body.appendChild(ghost);
    return ghost;
  }

  function clearDropTargets(){document.querySelectorAll('.summon-card.layout-drop-target').forEach(x=>x.classList.remove('layout-drop-target'))}

  function startDrag(e,card,id){
    if(layout.locked[id]!==false)return;
    if(e.button!==undefined&&e.button!==0)return;
    e.preventDefault();e.stopPropagation();
    clearDropTargets();
    const handle=e.currentTarget;
    try{handle.setPointerCapture(e.pointerId)}catch(_){ }
    card.classList.add('layout-dragging');
    const ghost=createGhost(card,e.clientX,e.clientY);
    drag={id,card,handle,pointerId:e.pointerId,ghost,target:null};
    handle.addEventListener('pointermove',onDragMove);
    handle.addEventListener('pointerup',onDragEnd,{once:true});
    handle.addEventListener('pointercancel',onDragCancel,{once:true});
  }

  function candidateAt(x,y){
    const el=document.elementFromPoint(x,y);
    const card=el?.closest?.('.summon-card');
    if(!card||!drag||card===drag.card)return null;
    const id=card.dataset.summonId;
    if(!id||layout.locked[id]!==false)return null;
    return card;
  }

  function onDragMove(e){
    if(!drag)return;
    drag.ghost.style.left=e.clientX+'px';drag.ghost.style.top=e.clientY+'px';
    const target=candidateAt(e.clientX,e.clientY);
    if(target!==drag.target){
      clearDropTargets();
      drag.target=target;
      if(target)target.classList.add('layout-drop-target');
    }
  }

  function swapOrder(a,b){
    const ia=layout.order.indexOf(a),ib=layout.order.indexOf(b);
    if(ia<0||ib<0)return;
    [layout.order[ia],layout.order[ib]]=[layout.order[ib],layout.order[ia]];
    saveLayout();
  }

  function finishDrag(cancelled){
    if(!drag)return;
    const {id,card,handle,ghost,target}=drag;
    handle.removeEventListener('pointermove',onDragMove);
    card.classList.remove('layout-dragging');
    clearDropTargets();
    ghost.remove();
    drag=null;
    if(!cancelled&&target){
      swapOrder(id,target.dataset.summonId);
      setup();
    }
  }

  function onDragEnd(){finishDrag(false)}
  function onDragCancel(){finishDrag(true)}

  // Reapply controls/order after every existing summon render.
  const originalRender=window.renderSummons;
  if(typeof originalRender==='function'){
    window.renderSummons=function(){
      const result=originalRender.apply(this,arguments);
      setup();
      return result;
    };
  }

  const root=document.getElementById('summons');
  if(root){
    let scheduled=false;
    new MutationObserver(()=>{
      if(scheduled)return;
      scheduled=true;
      requestAnimationFrame(()=>{scheduled=false;setup()});
    }).observe(root,{childList:true,subtree:true});
  }

  setup();
  window.resetSummonLayout=function(){layout=defaultState();saveLayout();setup()};
})();
