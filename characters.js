/* Characters tab — local notes + team grouping */
(function(){
  const KEY='kokopelis-characters-v1';
  let data=load();

  function load(){
    try{
      const parsed=JSON.parse(localStorage.getItem(KEY));
      if(parsed&&Array.isArray(parsed.characters)) return parsed;
    }catch(e){}
    return {characters:[]};
  }
  function persist(){localStorage.setItem(KEY,JSON.stringify(data));}
  function esc(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}
  function id(){return 'c_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8);}
  function find(idValue){return data.characters.find(c=>c.id===idValue);}
  function normalizedTeam(v){return String(v||'').trim();}

  function render(){
    const host=document.getElementById('characters');
    if(!host) return;
    const chars=[...data.characters].sort((a,b)=>String(a.name||'').localeCompare(String(b.name||''),undefined,{sensitivity:'base'}));
    const groups=new Map();
    chars.forEach(c=>{
      const team=normalizedTeam(c.team);
      const key=team?team.toLocaleLowerCase():'__ungrouped__';
      if(!groups.has(key)) groups.set(key,{label:team||'Ungrouped',items:[]});
      groups.get(key).items.push(c);
    });
    const ordered=[...groups.values()].sort((a,b)=>{
      if(a.label==='Ungrouped') return 1;
      if(b.label==='Ungrouped') return -1;
      return a.label.localeCompare(b.label,undefined,{sensitivity:'base'});
    });

    host.innerHTML=`<div class="characters-page">
      <div class="characters-toolbar">
        <div><h2>Characters</h2><p>Character notes, grouped by team and sorted alphabetically.</p></div>
        <button class="btn primary" onclick="openCharacterNotes()">+ Add Character</button>
      </div>
      ${chars.length?ordered.map(g=>`<section class="character-team">
        <div class="character-team-head"><h3>${esc(g.label)}</h3><span>${g.items.length} character${g.items.length===1?'':'s'}</span></div>
        <div class="character-tabs">${g.items.map(c=>`<button class="character-mini-tab" onclick="openCharacterNotes('${c.id}')">${esc(c.name)}</button>`).join('')}</div>
      </section>`).join(''):`<div class="characters-empty">No characters yet.<br><br><button class="btn primary" onclick="openCharacterNotes()">+ Add your first character</button></div>`}
    </div>`;
  }

  function ensureModal(){
    let modal=document.getElementById('characterNotesModal');
    if(modal) return modal;
    modal=document.createElement('div');
    modal.id='characterNotesModal';
    modal.className='character-notes-modal';
    modal.innerHTML=`<div class="character-notes-card" onclick="event.stopPropagation()">
      <div class="character-notes-head"><strong id="characterNotesTitle">Character Notes</strong><button class="character-notes-close" onclick="closeCharacterNotes()">✕</button></div>
      <div id="characterNotesBody" class="character-notes-body"></div>
    </div>`;
    modal.addEventListener('click',()=>closeCharacterNotes());
    document.body.appendChild(modal);
    return modal;
  }

  window.openCharacterNotes=function(charId){
    const modal=ensureModal();
    const existing=charId?find(charId):null;
    document.getElementById('characterNotesTitle').textContent=existing?existing.name:'Add Character';
    document.getElementById('characterNotesBody').innerHTML=`
      <div class="character-fields">
        <div class="character-field"><label>Name</label><input id="characterNameInput" value="${esc(existing?.name||'')}" placeholder="Character name"></div>
        <div class="character-field"><label>Team</label><input id="characterTeamInput" value="${esc(existing?.team||'')}" placeholder="Optional team name"></div>
        <div class="character-field notes"><label>Notes</label><textarea id="characterNotesInput" placeholder="Write your notes for this character...">${esc(existing?.notes||'')}</textarea></div>
      </div>
      <div class="character-modal-actions">
        <div>${existing?`<button class="btn character-danger" onclick="deleteCharacterNote('${existing.id}')">Delete Character</button>`:''}</div>
        <div class="right"><span id="characterSaveStatus" class="character-save-status"></span><button class="btn primary" onclick="saveCharacterNote('${existing?.id||''}')">Save</button></div>
      </div>`;
    modal.classList.add('open');
    setTimeout(()=>document.getElementById(existing?'characterNotesInput':'characterNameInput')?.focus(),30);
  };

  window.closeCharacterNotes=function(){document.getElementById('characterNotesModal')?.classList.remove('open');};

  window.saveCharacterNote=function(charId){
    const name=String(document.getElementById('characterNameInput')?.value||'').trim();
    const team=normalizedTeam(document.getElementById('characterTeamInput')?.value);
    const notes=String(document.getElementById('characterNotesInput')?.value||'');
    if(!name){
      const status=document.getElementById('characterSaveStatus');
      if(status){status.textContent='Name is required.';status.style.color='#f2aaa3';}
      document.getElementById('characterNameInput')?.focus();
      return;
    }
    if(charId){
      const c=find(charId);
      if(c){c.name=name;c.team=team;c.notes=notes;c.updatedAt=Date.now();}
    }else{
      data.characters.push({id:id(),name,team,notes,updatedAt:Date.now()});
    }
    persist();render();closeCharacterNotes();
  };

  window.deleteCharacterNote=function(charId){
    const c=find(charId); if(!c) return;
    if(!confirm(`Delete ${c.name}?`)) return;
    data.characters=data.characters.filter(x=>x.id!==charId);
    persist();render();closeCharacterNotes();
  };

  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('characterNotesModal')?.classList.contains('open')){e.stopPropagation();closeCharacterNotes();}});
  window.renderCharactersPage=render;
  render();
})();
