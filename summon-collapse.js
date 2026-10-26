// V5.3.1 — robust summon collapse/expand behavior
(function(){
  function applySummonCollapse(){
    const root=document.getElementById('summons');
    if(!root)return;
    root.querySelectorAll('.summon-card').forEach(card=>{
      const isActive=!!card.querySelector('.tag-active');
      card.classList.toggle('summon-collapsed',!isActive);
      card.classList.toggle('summon-expanded',isActive);
      Array.from(card.children).forEach((child,index)=>{
        if(index===0)return; // keep .summon-hero visible
        child.style.display=isActive?'':'none';
      });
    });
  }

  // Wrap the existing renderer so every re-render immediately reapplies the compact state.
  const originalRender=window.renderSummons;
  if(typeof originalRender==='function'){
    window.renderSummons=function(){
      const result=originalRender.apply(this,arguments);
      applySummonCollapse();
      return result;
    };
  }

  // Also observe DOM changes as a fallback, including updates caused by the existing summon logic.
  const root=document.getElementById('summons');
  if(root){
    const observer=new MutationObserver(()=>applySummonCollapse());
    observer.observe(root,{childList:true,subtree:true});
  }

  // Apply immediately if the Summons page has already rendered.
  applySummonCollapse();
  window.applySummonCollapse=applySummonCollapse;
})();
