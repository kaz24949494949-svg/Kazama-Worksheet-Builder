"use strict";

(() => {
  const FIXED_ID = "word-solution-rate";
  const AUTO_ID = "word-solution-rate-auto";
  const FIXED_DB = () => Array.isArray(window.WORD_SOLUTION_RATE_FIXED_30) ? window.WORD_SOLUTION_RATE_FIXED_30 : [];

  if (typeof worksheetDefinitions !== "undefined") {
    worksheetDefinitions[AUTO_ID] = {
      label: "文章題解決｜割合［類題自動生成］",
      title: "割合の文章題｜類題自動生成",
      instruction: "問題難易度と支援段階を別々に選びます。",
      answerNote: "100％の基準・線分図・式・答えを確認します。",
      type: "math",
      difficulties: {
        basic: {label:"基礎", counts:[1,3,5,10], description:"整数中心の基本3用法。"},
        standard: {label:"標準", counts:[1,3,5,10], description:"100％をこえる割合や小数を含む基本3用法。"},
        advanced: {label:"発展", counts:[1,3,5,10], description:"数値条件を広げた基本3用法。"}
      }
    };
  }

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const fmt = (n) => Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2)));
  const line = (x1,y1,x2,y2,w=3) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#222" stroke-width="${w}" stroke-linecap="square"/>`;
  const tick = (x,y,h=9) => line(x,y-h,x,y+h,2);
  const text = (x,y,s,a="start",size=14,weight=600,color="#222") => `<text x="${x}" y="${y}" text-anchor="${a}" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(s)}</text>`;
  const wrap = (inner, vb="0 0 720 190") => `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;

  function ensureSupportControl(){
    let select = document.getElementById("wpsSupportStage");
    if (select) return select;
    const difficulty = document.getElementById("difficulty");
    if (!difficulty) return null;
    const group = document.createElement("div");
    group.id = "wpsSupportStageGroup";
    group.className = "wps-support-control";
    group.innerHTML = `<label for="wpsSupportStage"><b>支援段階</b><small>問題の難しさとは別に選びます</small></label>
      <select id="wpsSupportStage">
        <option value="A">A 導入｜選択・基準提示</option>
        <option value="B">B 標準｜記述・100％提示</option>
        <option value="C">C 自立｜自分で構成</option>
      </select>`;
    const anchor = difficulty.closest(".control-group,.setting-group,.form-group") || difficulty.parentElement;
    anchor?.insertAdjacentElement("afterend", group);
    return group.querySelector("select");
  }

  function supportStage(){
    const code = ensureSupportControl()?.value || "A";
    return code === "B" ? {code:"B 標準",codeOnly:"B"} : code === "C" ? {code:"C 自立",codeOnly:"C"} : {code:"A 導入",codeOnly:"A"};
  }

  function configureCounts(id){
    const count = document.getElementById("count");
    if (!count) return;
    const wanted = id === FIXED_ID ? [1,3,5,10,30] : [1,3,5,10];
    const current = Number(count.value) || wanted[0];
    count.replaceChildren(...wanted.map(n => { const o=document.createElement("option"); o.value=String(n); o.textContent=`${n}問`; return o; }));
    count.value = wanted.includes(current) ? String(current) : String(wanted[0]);
  }

  function extractGivenTokens(q){
    const m = q.match(/\d+(?:\.\d+)?(?:％|m²|km|cm|mm|mL|L|円|人|個|問|ページ)?|\d+\/\d+/g) || [];
    return [...new Set(m)].slice(0,4);
  }
  function roleLabels(tool){
    const labels = String(tool).split("／").map(s => s.split("：")[0].trim()).filter(Boolean);
    return [...new Set(labels)].slice(0,4);
  }
  function fixedKind(p){
    if (p.kind && p.kind !== "advanced") return p.kind;
    if (/分数割合/.test(p.category)) return "fraction";
    if (/増加・減少/.test(p.category)) return "change";
    if (/残りの割合/.test(p.category)) return "remain";
    if (/2段階割合/.test(p.category)) return "two";
    return "advanced";
  }
  function parseFixedBasic(p){
    const tool=String(p.tool), unitMatch=tool.match(/(?:量|割合|残り)：[^／]*?([a-zA-Z²]+|人|円|個|ページ|問)/);
    const unit=unitMatch?.[1] || (p.question.match(/m²|km|cm|mm|mL|L|円|人|個|問|ページ/)?.[0] || "");
    const ratePct=tool.match(/割合：(\d+(?:\.\d+)?)％/)?.[1];
    const baseRaw=tool.match(/もとにする量：([^／]+)/)?.[1] || "";
    const compRaw=tool.match(/比べる量：([^／]+)/)?.[1] || "";
    const num=(s)=>{const m=String(s).match(/(?:＝)?(\d+(?:\.\d+)?)(?=[^\d]*$)/);return m?Number(m[1]):null;};
    let base=num(baseRaw), comp=num(compRaw);
    if (/^x/.test(baseRaw)) base=null;
    if (/^x/.test(compRaw)) comp=null;
    return {unit,rate:ratePct?Number(ratePct):null,base,comp,baseRaw,compRaw};
  }

  const AUTO_CONTEXTS = [
    {baseName:"定員",compName:"乗っている人数",unit:"人",bases:[40,50,60,80]},
    {baseName:"本の全体",compName:"読んだページ数",unit:"ページ",bases:[120,160,200,240]},
    {baseName:"畑の面積",compName:"使った面積",unit:"m²",bases:[100,150,200,250]},
    {baseName:"代金",compName:"支払った金額",unit:"円",bases:[1000,1600,2000,2400]}
  ];
  const AUTO_PATTERN=["compared","base","rate","compared","rate","base","compared","rate","base","compared"];
  function makeAuto(index,diff){
    const c=AUTO_CONTEXTS[index%AUTO_CONTEXTS.length], kind=AUTO_PATTERN[index%AUTO_PATTERN.length];
    const rates=diff==="basic"?[25,40,50,60,75,80]:diff==="standard"?[25,35,45,60,75,80,125,140]:[15,35,65,85,115,125,140,175];
    const rate=rates[(index*3+1)%rates.length];
    let base=c.bases[(index+1)%c.bases.length], compared=base*rate/100;
    if(!Number.isInteger(compared)){base=c.bases.find(v=>Number.isInteger(v*rate/100))||200;compared=base*rate/100;}
    const r=rate/100;
    if(kind==="compared") return {mode:"auto",no:index+1,category:"基本① 比べる量",kind,question:`${c.baseName}は${base}${c.unit}です。${c.baseName}の${rate}％にあたる${c.compName}は何${c.unit}ですか。`,tool:`もとにする量：${base}${c.unit}／割合：${rate}％＝${r}／比べる量：x${c.unit}`,calc:`${base}×${r}＝${fmt(compared)}`,answer:`${fmt(compared)}${c.unit}`};
    if(kind==="base") return {mode:"auto",no:index+1,category:"基本② もとにする量",kind,question:`${c.compName}${fmt(compared)}${c.unit}が、${c.baseName}の${rate}％にあたります。${c.baseName}は何${c.unit}ですか。`,tool:`もとにする量：x${c.unit}／割合：${rate}％＝${r}／比べる量：${fmt(compared)}${c.unit}`,calc:`${fmt(compared)}÷${r}＝${base}`,answer:`${base}${c.unit}`};
    return {mode:"auto",no:index+1,category:"基本③ 割合",kind,question:`${c.baseName}${base}${c.unit}のうち、${c.compName}は${fmt(compared)}${c.unit}です。${c.compName}は${c.baseName}の何％ですか。`,tool:`もとにする量：${base}${c.unit}／比べる量：${fmt(compared)}${c.unit}／割合：x`,calc:`${fmt(compared)}÷${base}＝${r}＝${rate}％`,answer:`${rate}％`};
  }

  function stagePick(p,sc){
    const tokens=extractGivenTokens(p.question), n=Math.max(3,tokens.length);
    return Array.from({length:n},(_,i)=>`<div class="wps-pick-card"><b>数・量 ${i+1}</b>${sc.codeOnly==="A"&&tokens[i]?`<span>${esc(tokens[i])}</span>`:`<span class="wps-pick-line"></span>`}</div>`).join("");
  }
  function stageSort(p){
    let labels=roleLabels(p.tool); if(labels.length<3) labels=["もとにする量","割合","比べる量"];
    return labels.map(l=>`<div class="wps-sort-row"><span>${esc(l)}</span><i></i></div>`).join("");
  }
  function stageBase(p,sc){
    const kind=fixedKind(p), info=parseFixedBasic(p);
    if(sc.codeOnly==="C") return `問題文の基準になる量に印をつけ、100％の位置を自分で決めよう。`;
    if(sc.codeOnly==="B" || !["compared","base","rate"].includes(kind)) return `100％にあたる量：<span class="wps-write-line"></span>`;
    const opts=[]; if(info.baseRaw) opts.push(info.baseRaw.replace(/＝.*$/,"")); if(info.compRaw) opts.push(info.compRaw.replace(/＝.*$/,"")); while(opts.length<2) opts.push("□");
    return `<div class="wps-choice">${opts.slice(0,2).map(v=>`<span><i class="wps-circle"></i>${esc(v)}</span>`).join("")}</div>`;
  }

  function basicDiagram(p,sc){
    const info=parseFixedBasic(p),kind=fixedKind(p),x0=105,span=520,y1=58,y2=132;
    if(sc.codeOnly==="C") return wrap(text(16,63,"実際の数・量",undefined,16,800)+line(x0,y1,x0+span,y1)+tick(x0,y1)+text(16,137,"割合",undefined,16,800)+line(x0,y2,x0+span,y2)+tick(x0,y2)+text(360,181,"位置・100％・数値を自分で書きこもう","middle",11,400,"#666"));
    const rate=(info.rate||100)/100,max=Math.max(1,rate),x100=x0+span/max,xr=x0+span*rate/max;
    let z=text(16,63,"実際の数・量",undefined,16,800)+line(x0,y1,x0+span,y1)+tick(x0,y1)+text(16,137,"割合",undefined,16,800)+line(x0,y2,x0+span,y2)+tick(x0,y2);
    z+=tick(x100,y2)+text(x100,162,"100％","middle",12,600);
    if(sc.codeOnly==="A") z+=tick(x100,y1)+text(x100,37,kind==="base"?`□${info.unit}`:(info.base!==null?`${info.base}${info.unit}`:"基準"),"middle",12,600);
    if(kind==="compared"){
      z+=tick(xr,y2)+text(xr,162,`${info.rate}％`,"middle",12,700); if(sc.codeOnly==="A") z+=tick(xr,y1)+text(xr,37,`□${info.unit}`,"middle",12,700);
    }else if(kind==="base"){
      z+=tick(xr,y2)+text(xr,162,`${info.rate}％`,"middle",12,700); if(sc.codeOnly==="A"&&info.comp!==null) z+=tick(xr,y1)+text(xr,37,`${info.comp}${info.unit}`,"middle",12,600);
    }else if(kind==="rate"&&info.base&&info.comp){
      const xc=x0+span*(info.comp/info.base); z+=tick(xc,y1)+text(xc,37,`${info.comp}${info.unit}`,"middle",12,600)+tick(xc,y2)+text(xc,162,"□％","middle",12,700); if(sc.codeOnly==="A") z+=tick(x100,y1)+text(x100,37,`${info.base}${info.unit}`,"middle",12,600);
    }
    return wrap(z+text(360,181,sc.codeOnly==="A"?"残りの位置を自分で完成させよう":"100％を基準に位置を考えよう","middle",11,400,"#666"));
  }
  function advancedDiagram(p,sc){
    const kind=fixedKind(p),x0=105,span=520;
    if(sc.codeOnly==="C") return wrap(text(16,63,"実際の数・量",undefined,16,800)+line(x0,58,x0+span,58)+tick(x0,58)+text(16,137,"割合・関係",undefined,16,800)+line(x0,132,x0+span,132)+tick(x0,132)+text(360,181,"基準・位置・必要な補助線を自分で決めよう","middle",11,400,"#666"));
    if(kind==="two"){
      let z=""; [58,120,176].forEach((y,i)=>{z+=text(16,y+5,["はじめ","1段階目の後","2段階目の後"][i],undefined,14,700)+line(150,y,625,y)+tick(150,y);}); return wrap(z,"0 0 720 205");
    }
    let z=text(16,63,"実際の数・量",undefined,16,800)+line(x0,58,x0+span,58)+tick(x0,58)+text(16,137,"割合・関係",undefined,16,800)+line(x0,132,x0+span,132)+tick(x0,132);
    if(sc.codeOnly==="A") z+=text(360,181,kind==="remain"?"使った割合と残りを分けて考えよう":kind==="change"?"100％から増減した後を考えよう":"1を基準に分数の位置を考えよう","middle",11,400,"#666");
    return wrap(z);
  }
  function stageDiagram(p,sc){ return ["compared","base","rate"].includes(fixedKind(p)) ? basicDiagram(p,sc) : advancedDiagram(p,sc); }
  function stageRelation(p,sc){
    const kind=fixedKind(p), support=(kind==="compared"||kind==="base"||kind==="fraction")&&sc.codeOnly!=="C";
    const prompt = kind==="rate" ? `もとにする量　＿＿＿＿　のうち　比べる量　＿＿＿＿　→　割合　＿＿＿＿` : `もとにする量　＿＿＿＿　の　割合　＿＿＿＿　→　比べる量　＿＿＿＿`;
    return `<div class="wps-link-row">${prompt}</div>${support?`<div class="wps-kazama-mini"><b>【カザマ式 補強】</b>「もとにする量 の 割合」では「の」→「×」として式につなげる</div>`:""}`;
  }
  function stageCheck(p){
    const kind=fixedKind(p);
    if(kind==="compared") return `割合は100％より　大きい・小さい　→　答えはもとにする量より　大きい・小さい`;
    if(kind==="base") return `割合と100％を比べる　→　もとにする量は比べる量より　大きい・小さい`;
    if(kind==="rate") return `比べる量ともとにする量を比べる　→　割合は100％より　大きい・小さい`;
    return `計算前に見積もった関係と、計算後の答えが　合っている・合っていない`;
  }

  function sheet(p,index,sc,mode){
    return `<section class="wps-thinking-sheet">
      <header><h3>割合の文章題 <span class="wps-stage-badge">${sc.code}</span></h3><b>${mode==="fixed"?`固定 No.${p.no}`:`問題 ${index+1}`}</b></header>
      <div class="wps-thinking-meta"><span>${mode==="fixed"?"固定問題DB":"類題自動生成"}｜${esc(p.category)}</span><span>名前（　　　　　　　　　　　）</span></div>
      <div class="wps-stage wps-thinking-problem"><h4>① 読む</h4><p>${esc(p.question)}</p><div class="wps-read-note">／で区切る → 声に出して読む → 求めるものに○</div></div>
      <div class="wps-stage wps-pick"><h4>② 拾う</h4><div class="wps-pick-grid">${stagePick(p,sc)}</div></div>
      <div class="wps-stage wps-sort"><h4>③ 分ける</h4>${stageSort(p)}</div>
      <div class="wps-stage wps-basecheck"><h4>④ 基準を決める</h4>${stageBase(p,sc)}</div>
      <div class="wps-stage wps-thinking-diagram"><h4>⑤ 線分図を完成させる</h4><div>${stageDiagram(p,sc)}</div></div>
      <div class="wps-stage wps-link"><h4>⑥ 関係 → 式</h4>${stageRelation(p,sc)}</div>
      <div class="wps-stage wps-calc-check"><h4>⑦ たしかめ → 答え</h4><div class="wps-calc-row"><span>式</span><i></i></div><div class="wps-calc-row"><span>計算</span><i></i></div><div class="wps-check-row">${stageCheck(p)}</div><div class="wps-check-row">答え　<span class="wps-answerline"></span></div></div>
      <footer>文章題解決｜割合　${sc.code}</footer>
    </section>`;
  }
  function fixedPool(diff){ const db=FIXED_DB(); if(diff==="basic") return db.filter(p=>p.no<=18); if(diff==="advanced") return db.filter(p=>p.no>=19); return db; }
  function build(id){
    const diff=document.getElementById("difficulty")?.value||"standard", count=Number(document.getElementById("count")?.value||1), sc=supportStage(), mode=id===FIXED_ID?"fixed":"auto";
    const pool=mode==="fixed"?fixedPool(diff):[];
    const selected=mode==="fixed"?pool.slice(0,Math.min(count,pool.length)):Array.from({length:count},(_,i)=>makeAuto(i,diff));
    const questions=document.getElementById("questions"),answers=document.getElementById("answers");
    document.body.classList.add("word-problem-solution-mode"); document.querySelector(".problem-page")?.classList.add("wps-host");
    questions.innerHTML=selected.map((p,i)=>sheet(p,i,sc,mode)).join("");
    answers.innerHTML=selected.map((p,i)=>`<p class="wps-answer-item"><span>${i+1}</span><b>${esc(p.answer)}</b><small>${esc(p.calc)}</small></p>`).join("");
    const problemTitle=document.getElementById("problemTitle"),instruction=document.getElementById("instruction"),answerNote=document.getElementById("answerNote"),status=document.getElementById("statusMessage"),wDiff=document.getElementById("worksheetDifficulty"),wCount=document.getElementById("worksheetCount");
    if(problemTitle) problemTitle.textContent=mode==="fixed"?"割合の文章題｜固定30問DB":"割合の文章題｜類題自動生成";
    if(instruction) instruction.textContent="問題難易度と支援段階を分け、7段階で考えます。";
    if(answerNote) answerNote.textContent="答えだけでなく、基準・線分図・式のつながりを確認します。";
    if(wDiff) wDiff.textContent=`問題難易度：${diff}／支援：${sc.code}`; if(wCount) wCount.textContent=`問題数：${selected.length}問`;
    if(status) status.textContent=`文章題解決｜割合［${mode==="fixed"?"固定問題":"類題自動生成"}］・${sc.code}を${selected.length}問作成しました。`;
    document.querySelector(".problem-page")?.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function activate(id){ const group=document.getElementById("wpsSupportStageGroup"); if(group) group.hidden=![FIXED_ID,AUTO_ID].includes(id); if([FIXED_ID,AUTO_ID].includes(id)) configureCounts(id); }
  ensureSupportControl();
  document.addEventListener("change",event=>{ if(event.target?.id==="worksheetType") activate(event.target.value); });
  document.addEventListener("click",event=>{ const btn=event.target.closest?.("#createButton"),type=document.getElementById("worksheetType"); if(!btn||![FIXED_ID,AUTO_ID].includes(type?.value)) return; event.preventDefault();event.stopImmediatePropagation();build(type.value); },true);
  activate(document.getElementById("worksheetType")?.value||"");
})();
