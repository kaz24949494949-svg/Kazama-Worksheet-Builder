"use strict";

(() => {
  const TYPE_ID = "word-solution-rate";
  const TYPE_PATTERNS = ["compared","base","rate","compared","rate","base","compared","rate","base","compared"];
  const CONTEXTS = [
    {baseName:"定員",compName:"バスに乗っている人数",unit:"人",bases:[40,50,60,80]},
    {baseName:"本の全体",compName:"読んだページ数",unit:"ページ",bases:[120,160,200,240]},
    {baseName:"畑の面積",compName:"野菜を植えた面積",unit:"m²",bases:[100,150,200,250]},
    {baseName:"水そうの水",compName:"使った水の量",unit:"L",bases:[40,50,60,80]},
    {baseName:"学年全体",compName:"委員の人数",unit:"人",bases:[40,50,60,80]},
    {baseName:"代金",compName:"支払った金額",unit:"円",bases:[1000,1600,2000,2400]}
  ];
  const RATES = [25,40,50,60,75,80,125,140];

  const esc = (s) => String(s).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const fmt = (n) => Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2)));
  const line = (x1,y1,x2,y2,w=3) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#222" stroke-width="${w}" stroke-linecap="square"/>`;
  const tick = (x,y,h=9) => line(x,y-h,x,y+h,2);
  const text = (x,y,s,a="start",size=14,weight=600,color="#222") => `<text x="${x}" y="${y}" text-anchor="${a}" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(s)}</text>`;
  const wrap = (inner) => `<svg viewBox="0 0 720 190" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;

  function makeProblem(index){
    const kind = TYPE_PATTERNS[index % TYPE_PATTERNS.length];
    const c = CONTEXTS[index % CONTEXTS.length];
    const rate = RATES[(index*3 + 2) % RATES.length];
    let base = c.bases[(index + 1) % c.bases.length];
    let compared = base * rate / 100;
    if(!Number.isInteger(compared)){
      base = c.bases.find(v => Number.isInteger(v*rate/100)) || base;
      compared = base * rate / 100;
    }
    const r = rate/100;
    if(kind === "compared"){
      return {
        kind,c,base,compared,rate,
        q:`${c.baseName}は${base}${c.unit}です。${c.baseName}の${rate}％にあたる${c.compName}は何${c.unit}ですか。`,
        answer:`${fmt(compared)}${c.unit}`, calc:`${base}×${r}＝${fmt(compared)}`,
        extracted:[`${base}${c.unit}`,`${rate}％`,`何${c.unit}`],
        role:{base:`${base}${c.unit}`,rate:`${rate}％`,comp:`□${c.unit}`}
      };
    }
    if(kind === "base"){
      return {
        kind,c,base,compared,rate,
        q:`${c.compName}${fmt(compared)}${c.unit}が、${c.baseName}の${rate}％にあたります。${c.baseName}は何${c.unit}ですか。`,
        answer:`${base}${c.unit}`, calc:`${fmt(compared)}÷${r}＝${base}`,
        extracted:[`${fmt(compared)}${c.unit}`,`${rate}％`,`何${c.unit}`],
        role:{base:`□${c.unit}`,rate:`${rate}％`,comp:`${fmt(compared)}${c.unit}`}
      };
    }
    return {
      kind,c,base,compared,rate,
      q:`${c.baseName}${base}${c.unit}のうち、${c.compName}は${fmt(compared)}${c.unit}です。${c.compName}は${c.baseName}の何％ですか。`,
      answer:`${rate}％`, calc:`${fmt(compared)}÷${base}＝${r}＝${rate}％`,
      extracted:[`${base}${c.unit}`,`${fmt(compared)}${c.unit}`,`何％`],
      role:{base:`${base}${c.unit}`,rate:`□％`,comp:`${fmt(compared)}${c.unit}`}
    };
  }

  function scaffold(diff){
    if(diff === "basic") return {code:"A 導入",choice:true,showBaseOnDiagram:true,show100:true,showRelationCue:true};
    if(diff === "standard") return {code:"B 標準",choice:false,showBaseOnDiagram:false,show100:true,showRelationCue:true};
    return {code:"C 自立",choice:false,showBaseOnDiagram:false,show100:false,showRelationCue:false};
  }

  function diagram(p,sc){
    const x0=105, span=520, y1=60, y2=135;
    const ratio=p.rate/100, max=Math.max(1,ratio), x100=x0+span/max, xr=x0+span*ratio/max;
    let z=text(16,65,"実際の数・量",undefined,16,800)+line(x0,y1,x0+span,y1)+tick(x0,y1);
    z+=text(16,140,"割合",undefined,16,800)+line(x0,y2,x0+span,y2)+tick(x0,y2);
    if(sc.show100){ z+=tick(x100,y2)+text(x100,168,"100％","middle",12,600); }
    if(sc.showBaseOnDiagram){
      z+=tick(x100,y1)+text(x100,39,p.kind==="base"?`□${p.c.unit}`:`${p.base}${p.c.unit}`,"middle",12,600);
    }
    if(p.kind === "compared"){
      z+=tick(xr,y1)+text(xr,39,`□${p.c.unit}`,"middle",12,700);
      if(sc.show100){ z+=tick(xr,y2)+text(xr,168,`${p.rate}％`,"middle",12,700); }
    }else if(p.kind === "base"){
      z+=tick(xr,y1)+text(xr,39,`${fmt(p.compared)}${p.c.unit}`,"middle",12,600);
      if(sc.show100){ z+=tick(xr,y2)+text(xr,168,`${p.rate}％`,"middle",12,700); }
    }else{
      const xc=x0+span*(p.compared/p.base);
      z+=tick(xc,y1)+text(xc,39,`${fmt(p.compared)}${p.c.unit}`,"middle",12,600);
      z+=tick(x100,y1)+text(x100,39,`${p.base}${p.c.unit}`,"middle",12,600);
      if(sc.show100){ z+=tick(x100,y2); }
      z+=tick(xc,y2)+text(xc,168,"□％","middle",12,700);
    }
    if(!sc.show100) z+=text(360,181,"100％の位置も自分で決めよう","middle",11,400,"#666");
    return wrap(z);
  }

  function pickCards(p,sc){
    return p.extracted.map((v,i)=>`<div class="wps-pick-card"><b>数・量 ${i+1}</b>${sc.code.startsWith("A")?`<span>${esc(v)}</span>`:`<span class="wps-pick-line"></span>`}</div>`).join("");
  }

  function sortRows(p){
    return [
      ["もとにする量",p.role.base],
      ["割合",p.role.rate],
      ["比べる量",p.role.comp]
    ].map(([lab,val])=>`<div class="wps-sort-row"><span>${lab}</span><i></i>${""}</div>`).join("");
  }

  function baseCheck(p,sc){
    if(sc.choice){
      const a=p.kind==="base"?`□${p.c.unit}`:`${p.base}${p.c.unit}`;
      const b=p.kind==="compared"?`□${p.c.unit}`:`${fmt(p.compared)}${p.c.unit}`;
      return `<div class="wps-choice"><span><i class="wps-circle"></i>${esc(a)}</span><span><i class="wps-circle"></i>${esc(b)}</span></div>`;
    }
    if(sc.code.startsWith("B")) return `100％にあたる量：<span class="wps-write-line"></span>`;
    return `問題文の「もとにする量」に印をつけ、100％の位置を自分で決めよう。`;
  }

  function relationBlock(p,sc){
    let relation="";
    if(p.kind === "compared") relation=`<span class="wps-inlineblank"></span>${esc(p.c.unit)} の <span class="wps-inlineblank"></span>％ → <span class="wps-inlineblank"></span>${esc(p.c.unit)}`;
    else if(p.kind === "base") relation=`<span class="wps-inlineblank"></span>${esc(p.c.unit)} の <span class="wps-inlineblank"></span>％ → ${fmt(p.compared)}${esc(p.c.unit)}`;
    else relation=`${p.base}${esc(p.c.unit)} のうち ${fmt(p.compared)}${esc(p.c.unit)} → <span class="wps-inlineblank"></span>％`;
    const support=(p.kind!=="rate"&&sc.showRelationCue)?`<div class="wps-kazama-mini"><b>【カザマ式 補強】</b> 「もとにする量 の 割合」では「の」→「×」として式につなげる</div>`:"";
    return `<div class="wps-link-row">${relation}</div>${support}`;
  }

  function checkText(p){
    if(p.kind === "compared"){
      const bigger=p.rate>100;
      return `${p.rate}％は100％より　大きい・小さい　→　だから答えは${p.base}${p.c.unit}より　多い・少ない`;
    }
    if(p.kind === "base"){
      const baseGreater=p.rate<100;
      return `${p.rate}％と100％を比べる　→　もとにする量は${fmt(p.compared)}${p.c.unit}より　${baseGreater?"大きいはず":"小さいはず"}`;
    }
    const bigger=p.compared>p.base;
    return `${fmt(p.compared)}${p.c.unit}は${p.base}${p.c.unit}より　${bigger?"大きい":"小さい"}　→　割合は100％より　大きい・小さい`;
  }

  function sheet(p,index,diff){
    const sc=scaffold(diff);
    return `<section class="wps-thinking-sheet">
      <header><h3>割合の文章題 <span class="wps-stage-badge">${sc.code}</span></h3><b>問題 ${index+1}</b></header>
      <div class="wps-thinking-meta"><span>型：${p.kind==="compared"?"比べる量":p.kind==="base"?"もとにする量":"割合"}を求める</span><span>名前（　　　　　　　　　　　）</span></div>
      <div class="wps-stage wps-thinking-problem"><h4>① 読む</h4><p>${esc(p.q)}</p><div class="wps-read-note">／で区切る → 声に出して読む → 求めるものに○</div></div>
      <div class="wps-stage wps-pick"><h4>② 拾う</h4><div class="wps-pick-grid">${pickCards(p,sc)}</div></div>
      <div class="wps-stage wps-sort"><h4>③ 分ける</h4>${sortRows(p)}</div>
      <div class="wps-stage wps-basecheck"><h4>④ 基準を決める</h4>${baseCheck(p,sc)}</div>
      <div class="wps-stage wps-thinking-diagram"><h4>⑤ 線分図を完成させる</h4><div>${diagram(p,sc)}</div></div>
      <div class="wps-stage wps-link"><h4>⑥ 関係 → 式</h4>${relationBlock(p,sc)}</div>
      <div class="wps-stage wps-calc-check"><h4>⑦ たしかめ → 答え</h4><div class="wps-calc-row"><span>式</span><i></i></div><div class="wps-calc-row"><span>計算</span><i></i></div><div class="wps-check-row">${esc(checkText(p))}</div><div class="wps-check-row">答え　<span class="wps-answerline"></span></div></div>
      <footer>文章題解決｜割合　${sc.code}</footer>
    </section>`;
  }

  function buildThinkingRate(){
    const diff=document.getElementById("difficulty")?.value || "basic";
    const count=Number(document.getElementById("count")?.value || 1);
    const questions=document.getElementById("questions"), answers=document.getElementById("answers");
    const status=document.getElementById("statusMessage"), title=document.getElementById("problemTitle"), inst=document.getElementById("instruction"), note=document.getElementById("answerNote");
    const wDiff=document.getElementById("worksheetDifficulty"), wCount=document.getElementById("worksheetCount");
    const selected=Array.from({length:count},(_,i)=>makeProblem(i));
    document.body.classList.add("word-problem-solution-mode");
    document.querySelector(".problem-page")?.classList.add("wps-host");
    questions.innerHTML=selected.map((p,i)=>sheet(p,i,diff)).join("");
    answers.innerHTML=selected.map((p,i)=>`<p class="wps-answer-item"><span>${i+1}</span><b>${esc(p.answer)}</b><small>${esc(p.calc)}</small></p>`).join("");
    title.textContent="割合の文章題｜考える7段階";
    inst.textContent="読む→拾う→分ける→基準→線分図→関係→たしかめ の順で考えます。";
    note.textContent="答えだけでなく、100％の基準・線分図・式のつながりを確認します。";
    const label=diff==="basic"?"A 導入":diff==="standard"?"B 標準":"C 自立";
    if(wDiff) wDiff.textContent=`段階：${label}`; if(wCount) wCount.textContent=`問題数：${count}問`;
    if(status) status.textContent=`文章題解決｜割合（${label}）を${count}問作成しました。`;
    document.querySelector(".problem-page")?.scrollIntoView({behavior:"smooth",block:"start"});
  }

  document.addEventListener("click",(event)=>{
    const btn=event.target.closest?.("#createButton");
    const type=document.getElementById("worksheetType");
    if(!btn || type?.value!==TYPE_ID) return;
    event.preventDefault(); event.stopImmediatePropagation();
    buildThinkingRate();
  },true);
})();
