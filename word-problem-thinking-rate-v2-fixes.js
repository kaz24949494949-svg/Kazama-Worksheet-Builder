"use strict";
(() => {
  const FIXED_ID="word-solution-rate";
  function syncFixedCounts(){
    const type=document.getElementById("worksheetType"),diff=document.getElementById("difficulty"),count=document.getElementById("count");
    if(type?.value!==FIXED_ID||!count) return;
    const wanted=diff?.value==="basic"?[1,3,5,10,18]:diff?.value==="advanced"?[1,3,5,10,12]:[1,3,5,10,30];
    const before=Number(count.value)||wanted[0];
    count.replaceChildren(...wanted.map(n=>{const o=document.createElement("option");o.value=String(n);o.textContent=`${n}問`;return o;}));
    count.value=wanted.includes(before)?String(before):String(wanted[wanted.length-1]);
    const guide=document.getElementById("countGuide");
    if(guide) guide.textContent=diff?.value==="basic"?"固定DB No.1〜18（基本）":diff?.value==="advanced"?"固定DB No.19〜30（発展）":"固定DB 全30問";
  }
  document.addEventListener("change",event=>{
    if(event.target?.id==="difficulty"||event.target?.id==="worksheetType") queueMicrotask(syncFixedCounts);
  });
  queueMicrotask(syncFixedCounts);
})();
