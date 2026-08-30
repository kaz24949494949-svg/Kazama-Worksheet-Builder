"use strict";
(() => {
  const TYPES = {
    "word-solution-rate": { key: "rate", label: "文章題解決｜割合", title: "割合の文章題" },
    "word-solution-ratio": { key: "ratio", label: "文章題解決｜比", title: "比の文章題" },
    "word-solution-speed": { key: "speed", label: "文章題解決｜速さ", title: "速さの文章題" }
  };

  Object.entries(TYPES).forEach(([id, meta]) => {
    worksheetDefinitions[id] = {
      label: meta.label,
      title: meta.title,
      instruction: "／を入れて区切る → 声に出して読む → 情報整理 → 線分図 → 式・計算",
      answerNote: "線分図の数量関係と式・答えを確認します。",
      type: "math",
      difficulties: {
        basic: { label: "基礎", counts: [1, 3, 5, 10], description: "基本構造を1つずつ見抜く問題です。" },
        standard: { label: "標準", counts: [1, 3, 5, 10], description: "基本から発展までを混ぜて出題します。" },
        advanced: { label: "発展", counts: [1, 3, 5, 10], description: "複数段階・関係の連結を含む問題です。" }
      }
    };
  });

  const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const mix = (a) => a.map(v => [Math.random(), v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  const choice = (a) => a[Math.floor(Math.random() * a.length)];
  const fmt = (n) => Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2)));
  const gcd = (a,b) => b ? gcd(b, a % b) : Math.abs(a);

  function svgLine(x1,y1,x2,y2,w=3){ return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#222" stroke-width="${w}" stroke-linecap="square"/>`; }
  function svgTick(x,y,h=10){ return svgLine(x,y-h,x,y+h,2); }
  function svgText(x,y,s,a="start",size=15,weight=600,color="#222"){ return `<text x="${x}" y="${y}" text-anchor="${a}" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(s)}</text>`; }
  function wrapSvg(inner, vb="0 0 720 230"){ return `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid meet">${inner}</svg>`; }

  const rateContexts = [
    ["定員", "人", "バスに乗っている人数"], ["本の全体", "ページ", "読んだページ数"], ["畑の面積", "m²", "野菜を植えた面積"],
    ["水そうの水", "L", "使った水の量"], ["学年全体", "人", "委員の人数"], ["代金", "円", "支払った金額"]
  ];

  function rateBasic(kind){
    const [baseName, unit, compName] = choice(rateContexts);
    const rate = choice([25,30,35,40,45,50,60,65,70,75,80,125,140]);
    const r = rate / 100;
    let base = choice([40,50,60,80,120,160,200,240]);
    if(unit === "円") base *= 10;
    let comp = base * r;
    if(!Number.isInteger(comp)){ base = 200; comp = base*r; }
    if(kind === "compared") return { c:"基本① 比べる量", q:`${baseName}は${base}${unit}です。その${rate}％にあたる${compName}は何${unit}ですか。`, fields:["もとにする量","割合","比べる量"], calc:`${base}×${r}＝${fmt(comp)}`, a:`${fmt(comp)}${unit}`, support:true, d:{type:"rate-basic",base,comp:null,rate,unit} };
    if(kind === "base") return { c:"基本② もとにする量", q:`${compName}${fmt(comp)}${unit}が、${baseName}の${rate}％にあたります。${baseName}は何${unit}ですか。`, fields:["もとにする量","割合","比べる量"], calc:`${fmt(comp)}÷${r}＝${base}`, a:`${base}${unit}`, support:true, d:{type:"rate-basic",base:null,comp,rate,unit} };
    return { c:"基本③ 割合", q:`${baseName}${base}${unit}のうち、${compName}は${fmt(comp)}${unit}です。${compName}は${baseName}の何％ですか。`, fields:["もとにする量","比べる量","求める割合"], calc:`${fmt(comp)}÷${base}＝${r}＝${rate}％`, a:`${rate}％`, d:{type:"rate-unknown",base,comp,unit} };
  }

  function rateAdvanced(){
    const kind = choice(["fraction","change","remain","two"]);
    if(kind === "fraction"){
      const [num,den] = choice([[2,3],[3,5],[4,7]]), base = choice([210,300,350,375,420]), val = base*num/den;
      return { c:"発展① 分数割合", q:`${base}個の${num}/${den}にあたる個数は何個ですか。`, fields:["もとにする量","割合","比べる量"], calc:`${base}×${num}/${den}＝${fmt(val)}`, a:`${fmt(val)}個`, support:true, d:{type:"rate-fraction",base,ratio:num/den,label:`${num}/${den}`} };
    }
    if(kind === "change"){
      const base=choice([2000,3000,4000]), p=choice([10,15,20,25]), up=Math.random()<0.5, factor=up?1+p/100:1-p/100, val=base*factor;
      return { c:"発展② 増加・減少", q:`${base}円の商品を${p}％${up?"増し":"引き"}にしました。変化後の金額はいくらですか。`, fields:["もとの量","増減の割合","変化後の割合","求める量"], calc:`${base}×${factor}＝${fmt(val)}`, a:`${fmt(val)}円`, d:{type:"rate-change",factor,p,up} };
    }
    if(kind === "remain"){
      const p=choice([25,35,40]), remain=choice([60,90,104,120]), rr=1-p/100, total=remain/rr;
      if(!Number.isInteger(total)) return rateAdvanced();
      return { c:"発展③ 残りの割合", q:`全体の${p}％を使ったところ、残りは${remain}個でした。全体は何個ですか。`, fields:["もとにする量","使った割合","残りの割合","求める量"], calc:`1－${p/100}＝${rr}、${remain}÷${rr}＝${total}`, a:`${total}個`, d:{type:"rate-remain",p:p/100} };
    }
    const total=choice([300,400,500]), p1=choice([25,30,40]), p2=choice([20,40,50]), rem=total*(1-p1/100)*(1-p2/100);
    return { c:"発展④ 2段階割合", q:`${total}個あります。1回目に全体の${p1}％を使い、2回目に残りの${p2}％を使いました。最後に何個残りますか。`, fields:["はじめの量","1段階目の割合","2段階目の割合","最後に求める量"], calc:`${total}×${1-p1/100}×${1-p2/100}＝${fmt(rem)}`, a:`${fmt(rem)}個`, d:{type:"rate-two",r1:1-p1/100,r2:(1-p1/100)*(1-p2/100)} };
  }

  function rateQuestion(diff){
    if(diff === "basic") return rateBasic(choice(["compared","base","rate"]));
    if(diff === "advanced") return rateAdvanced();
    return Math.random()<0.6 ? rateBasic(choice(["compared","base","rate"])) : rateAdvanced();
  }

  function rateDiagram(q){
    const x0=125, span=500, d=q.d;
    if(d.type === "rate-unknown"){
      const x1=x0+span, xc=x0+span*d.comp/d.base;
      let z=svgText(18,56,"実際の数・量")+svgLine(x0,52,x1,52)+svgTick(x0,52)+svgTick(xc,52)+svgTick(x1,52);
      z+=svgText(xc,30,`${fmt(d.comp)}${d.unit}`,"middle",12)+svgText(x1,30,`${fmt(d.base)}${d.unit}`,"middle",12);
      z+=svgText(18,145,"割合")+svgLine(x0,141,x1,141)+svgTick(x0,141)+svgTick(xc,141)+svgTick(x1,141)+svgText(xc,174,"□％","middle",13)+svgText(x1,174,"100％","middle",12);
      return wrapSvg(z+svgText(360,218,"既知の2数量の位置をそろえよう","middle",12,400,"#666"));
    }
    if(d.type === "rate-remain"){
      const cut=x0+span*d.p,x1=x0+span; let z=svgText(18,52,"全体")+svgLine(x0,48,x1,48)+svgTick(x0,48)+svgTick(cut,48)+svgTick(x1,48);
      z+=svgText((x0+cut)/2,78,"使った部分","middle",12)+svgText((cut+x1)/2,78,"残り","middle",12)+svgText(18,145,"割合")+svgLine(x0,141,x1,141)+svgTick(x0,141)+svgTick(cut,141)+svgTick(x1,141)+svgText(x1,174,"100％","middle",12);
      return wrapSvg(z+svgText(360,218,"残りの割合は自分で考えよう","middle",12,400,"#666"));
    }
    if(d.type === "rate-two"){
      let z=""; [[1,45,"はじめ"],[d.r1,112,"1段階目の後"],[d.r2,179,"2段階目の後"]].forEach(([v,y,l])=>{const x2=x0+span*v;z+=svgText(18,y+5,l)+svgLine(x0,y,x2,y)+svgTick(x0,y)+svgTick(x2,y);});
      return wrapSvg(z+svgText(360,218,"段階ごとの残りを同じ左端から比べよう","middle",12,400,"#666"));
    }
    const ratio=d.ratio ?? d.factor ?? d.rate/100, max=Math.max(1,ratio), x100=x0+span/max, xr=x0+span*ratio/max, x1=x0+span;
    let z=svgText(18,58,"実際の数・量")+svgLine(x0,54,x1,54)+svgTick(x0,54)+svgTick(x100,54)+svgTick(xr,54)+svgText(18,148,"割合")+svgLine(x0,144,x1,144)+svgTick(x0,144)+svgTick(x100,144)+svgTick(xr,144)+svgText(x100,178,"100％","middle",12);
    if(d.label) z+=svgText(xr,178,d.label,"middle",12); else if(d.rate) z+=svgText(xr,178,`${d.rate}％`,"middle",12);
    return wrapSvg(z+svgText(360,218,"100％と割合の位置をそろえよう","middle",12,400,"#666"));
  }

  function ratioBasic(kind){
    const [a,b]=choice([[2,3],[3,5],[4,7],[5,8],[4,9]]), unit=choice(["個","円","cm"]), k=choice([5,8,10,20]);
    if(kind==="given") return { c:"基本① 比から数量", q:`AとBの数量の比は${a}：${b}です。Bが${b*k}${unit}のとき、Aは何${unit}ですか。`, fields:["わかっている比","わかっている数","1目盛り分","求める量"], calc:`${b*k}÷${b}×${a}＝${a*k}`, a:`${a*k}${unit}`, d:{type:"ratio-units",parts:[a,b]} };
    if(kind==="split"){
      const total=(a+b)*k; return { c:"基本② 2項比例配分", q:`${total}${unit}を${a}：${b}の比に分けます。大きい方は何${unit}ですか。`, fields:["全体","2つの比","1目盛り分","求める量"], calc:`${total}÷${a+b}×${Math.max(a,b)}＝${Math.max(a,b)*k}`, a:`${Math.max(a,b)*k}${unit}`, d:{type:"ratio-units",parts:[a,b]} };
    const x=a*k,y=b*k,g=gcd(x,y); return { c:"基本③ 数量から比", q:`Aは${x}${unit}、Bは${y}${unit}です。AとBの比を最も簡単な整数の比で表しなさい。`, fields:["数量A","数量B","簡単にする前の比"], calc:`${x}：${y}＝${x/g}：${y/g}`, a:`${x/g}：${y/g}`, d:{type:"ratio-pair",x,y} };
  }

  function ratioAdvanced(){
    const kind=choice(["three","link","change"]);
    if(kind==="three"){
      const p=choice([[2,3,4],[3,2,5],[3,4,5]]),k=choice([20,30,40]),total=p.reduce((a,b)=>a+b,0)*k,largest=Math.max(...p)*k;
      return { c:"発展① 3項比例配分", q:`${total}個を${p.join("：")}の比に分けます。最も多い部分は何個ですか。`, fields:["全体","3つの比","1目盛り分","求める量"], calc:`${total}÷${p.reduce((a,b)=>a+b,0)}×${Math.max(...p)}＝${largest}`, a:`${largest}個`, d:{type:"ratio-units",parts:p} };
    }
    if(kind==="link") return { c:"発展② 比の連結", q:"A：B＝4：7、A：C＝6：5です。Bが8400円のとき、Cはいくらですか。", fields:["比①","共通する量","比②","求める量"], calc:"8400÷7×4＝4800、4800÷6×5＝4000", a:"4000円", d:{type:"ratio-link",r1:[4,7],r2:[6,5]} };
    return { c:"発展③ 構造変化", q:"赤玉と白玉が72個あり、赤：白＝5：4です。白玉を全て青玉に替えると赤：青＝2：3になりました。青玉は何個ですか。", fields:["はじめの比","変わらない量","変化後の比","求める量"], calc:"72÷9×5＝40、40÷2×3＝60", a:"60個", d:{type:"ratio-link",r1:[5,4],r2:[2,3]} };
  }

  function ratioQuestion(diff){ return diff==="basic"?ratioBasic(choice(["given","split","make"])):diff==="advanced"?ratioAdvanced():Math.random()<0.65?ratioBasic(choice(["given","split","make"])):ratioAdvanced(); }
  function ratioDiagram(q){
    const d=q.d,x0=95;
    if(d.type==="ratio-units"){
      const total=d.parts.reduce((a,b)=>a+b,0),u=540/total,y=110; let z="",cur=x0;
      d.parts.forEach(v=>{const st=cur;for(let i=0;i<v;i++){z+=svgTick(cur,y,15);cur+=u;}z+=svgTick(cur,y,15)+svgText((st+cur)/2,70,`${v}目盛り`,"middle",13);});
      return wrapSvg(z+svgLine(x0,y,x0+540,y,3.5)+svgText(360,205,"すべての1目盛りを同じ幅にする","middle",12,400,"#666"));
    }
    if(d.type==="ratio-pair"){
      const max=Math.max(d.x,d.y),span=490; let z=svgText(18,65,"数量A")+svgLine(130,60,130+span*d.x/max,60)+svgTick(130,60)+svgTick(130+span*d.x/max,60);
      z+=svgText(18,155,"数量B")+svgLine(130,150,130+span*d.y/max,150)+svgTick(130,150)+svgTick(130+span*d.y/max,150);
      return wrapSvg(z+svgText(360,215,"同じ1目盛りの大きさで区切ろう","middle",12,400,"#666"));
    }
    const r1=d.r1,r2=d.r2,common=Math.max(r1[0],r2[0]),unit=420/common; let z="";
    [[r1,65,"比①"],[r2,155,"比②"]].forEach(([r,y,l])=>{z+=svgText(18,y+5,l);let cur=130;r.forEach((v,i)=>{const x2=cur+v*unit;z+=svgLine(cur,y,x2,y)+svgTick(cur,y)+svgTick(x2,y)+svgText((cur+x2)/2,y-18,i===0?"共通量":"相手","middle",12);cur=x2;});});
    return wrapSvg(z+svgText(360,215,"共通する量の長さを同じにそろえる","middle",12,400,"#666"));
  }

  function speedBasic(kind){
    if(kind==="distance"){
      const s=choice([36,48,50,60,72]),t=choice([2,3,4,5]),d=s*t; return { c:"1-A 道のりを求める", q:`時速${s}kmで${t}時間進みました。道のりは何kmですか。`, fields:["速さ","時間","道のり","求めるもの"], calc:`${s}×${t}＝${d}`, a:`${d}km`, d:{type:"speed",speed:s,time:t,dist:d,unit:"km",base:"時間",unknown:"dist"} };
    }
    if(kind==="time"){
      const s=choice([35,40,45,48]),t=choice([4,5,6,7]),d=s*t; return { c:"2-A 時間を求める", q:`${d}kmの道のりを時速${s}kmで進みます。何時間かかりますか。`, fields:["速さ","時間","道のり","求めるもの"], calc:`${d}÷${s}＝${t}`, a:`${t}時間`, d:{type:"speed",speed:s,time:t,dist:d,unit:"km",base:"時間",unknown:"time"} };
    }
    const t=choice([3,4,5]),s=choice([50,60,70]),d=s*t; return { c:"3-A 速さを求める", q:`${d}kmの道のりを${t}時間で進みました。速さは時速何kmですか。`, fields:["速さ","時間","道のり","求めるもの"], calc:`${d}÷${t}＝${s}`, a:`時速${s}km`, d:{type:"speed",speed:s,time:t,dist:d,unit:"km",base:"時間",unknown:"speed"} };
  }

  function speedAdvanced(){
    const kind=choice(["round","required","seconds"]);
    if(kind==="round") return { c:"4 往復", q:"家から店まで600mです。行きは分速120m、帰りは分速50mで歩きました。往復に何分かかりますか。", fields:["片道の道のり","行きの速さ","帰りの速さ","往復の時間"], calc:"600÷120＝5、600÷50＝12、5＋12＝17", a:"17分", d:{type:"round",dist:600,s1:120,s2:50} };
    if(kind==="required") return { c:"5 必要な時速", q:"時速5kmで2時間かかる道のりを、30分以内に進むには時速何km以上必要ですか。", fields:["もとの速さ","もとの時間","同じ道のり","目標時間"], calc:"5×2＝10、10÷0.5＝20", a:"時速20km以上", d:{type:"required",speed:5,t1:2,t2:.5} };
    const s=choice([120,180,240]),sec=choice([30,45,90,150]),dist=s*sec/60; return { c:"1-B 分速×分秒", q:`分速${s}mで${sec}秒進みました。道のりは何mですか。`, fields:["速さ","時間","道のり","求めるもの"], calc:`${s}×${sec}/60＝${fmt(dist)}`, a:`${fmt(dist)}m`, d:{type:"speed",speed:s,time:sec/60,dist,unit:"m",base:"分",unknown:"dist"} };
  }

  function speedQuestion(diff){ return diff==="basic"?speedBasic(choice(["distance","time","speed"])):diff==="advanced"?speedAdvanced():Math.random()<0.7?speedBasic(choice(["distance","time","speed"])):speedAdvanced(); }
  function speedDiagram(q){
    const d=q.d,x0=130,span=490;
    if(d.type==="round"){
      const t1=d.dist/d.s1,t2=d.dist/d.s2,x1=620; let z=svgText(18,30,"行き",undefined,16,800)+svgText(75,55,"道のり","end",13)+svgLine(140,50,x1,50)+svgTick(140,50)+svgTick(x1,50)+svgText(x1,34,`${d.dist}m`,"middle",12);
      z+=svgText(75,90,"時間","end",13)+svgLine(140,85,x1,85)+svgTick(140,85)+svgTick(x1,85)+svgText(x1,108,"□分","middle",12);
      z+=svgText(18,145,"帰り",undefined,16,800)+svgText(75,170,"道のり","end",13)+svgLine(140,165,x1,165)+svgTick(140,165)+svgTick(x1,165)+svgText(x1,149,`${d.dist}m`,"middle",12)+svgText(75,205,"時間","end",13)+svgLine(140,200,x1,200)+svgTick(140,200)+svgTick(x1,200)+svgText(x1,223,"□分","middle",12);
      return wrapSvg(z,"0 0 720 240");
    }
    if(d.type==="required"){
      const dist=d.speed*d.t1,xGoal=130+490*d.t2; let z=svgText(18,55,"現在")+svgLine(130,50,xGoal,50)+svgTick(130,50)+svgTick(xGoal,50)+svgText(xGoal,32,"□km","middle",12)+svgText(18,145,"目標")+svgLine(130,140,xGoal,140)+svgTick(130,140)+svgTick(xGoal,140)+svgText(xGoal,122,"同じ道のり","middle",12);
      z+=svgText(360,215,"同じ道のりにかかる時間を比べる","middle",12,400,"#666"); return wrapSvg(z);
    }
    const max=Math.max(1,d.time),xb=x0+span/max,xt=x0+span*d.time/max,x1=x0+span; let z=svgText(18,60,"道のり")+svgLine(x0,56,x1,56)+svgTick(x0,56)+svgTick(xb,56)+svgTick(xt,56)+svgText(18,150,"時間")+svgLine(x0,146,x1,146)+svgTick(x0,146)+svgTick(xb,146)+svgTick(xt,146);
    z+=svgText(xb,35,d.unknown==="speed"?`□${d.unit}`:`${d.speed}${d.unit}`,"middle",12)+svgText(xt,35,d.unknown==="dist"?`□${d.unit}`:`${d.dist}${d.unit}`,"middle",12)+svgText(xb,180,`1${d.base}`,"middle",12);
    if(d.unknown==="time") z+=svgText(xt,180,`□${d.base}`,"middle",12); else if(d.time!==1) z+=svgText(xt,180,d.time<1?`${Math.round(d.time*60)}/60${d.base}`:`${d.time}${d.base}`,"middle",12);
    return wrapSvg(z+svgText(360,215,"上下の同じ位置をそろえて考えよう","middle",12,400,"#666"));
  }

  function makeQuestion(key,diff){ return key==="rate"?rateQuestion(diff):key==="ratio"?ratioQuestion(diff):speedQuestion(diff); }
  function diagram(key,q){ return key==="rate"?rateDiagram(q):key==="ratio"?ratioDiagram(q):speedDiagram(q); }

  function sheetHtml(key,q,index,title){
    const fields=q.fields.map(s=>`<div class="wps-field"><span>${esc(s)}</span><i></i></div>`).join("");
    const support=key==="rate"&&q.support?`<div class="wps-kazama"><b>【カザマ式 補強】もとにする量 × 割合 ＝ 比べる量</b><span>「もとにする量 の 割合」では、「の」→「×」として式につなげる</span></div>`:"";
    return `<section class="wps-sheet"><header><h3>${title}</h3><b>問題 ${index+1}</b></header><div class="wps-meta">分類：${esc(q.c)}<span>名前（　　　　　　　　　　　）</span></div><div class="wps-read"><strong>① 読む　／を入れて区切る → 声に出して読む</strong><small>区切る目安：は・が・で・に・へ・を／句読点</small></div><div class="wps-box wps-problem"><b>問題文</b><p>${esc(q.q)}</p></div><div class="wps-box wps-info"><b>② 使う情報を整理しよう</b>${fields}${support}</div><div class="wps-box wps-diagram"><b>③ 線分図をかこう</b><div>${diagram(key,q)}</div></div><div class="wps-box wps-calc"><b>④ 式・計算</b><i></i><i></i><i></i><i></i></div><div class="wps-answerblank"><b>答え</b><i></i></div></section>`;
  }

  function build(id){
    const meta=TYPES[id],def=worksheetDefinitions[id],diff=difficultySelect.value,count=Number(countSelect.value);
    const selected=Array.from({length:count},()=>makeQuestion(meta.key,diff));
    document.body.classList.add("word-problem-solution-mode");
    document.querySelector(".problem-page")?.classList.add("wps-host");
    questionsElement.innerHTML=selected.map((q,i)=>sheetHtml(meta.key,q,i,meta.title)).join("");
    answersElement.innerHTML=selected.map((q,i)=>`<p class="wps-answer-item"><span>${i+1}</span><b>${esc(q.a)}</b><small>${esc(q.calc)}</small></p>`).join("");
    problemTitle.textContent=meta.title; instruction.textContent="固定版の認知手順で解きます。"; answerNote.textContent="式・計算と答えを確認しましょう。";
    worksheetDifficulty.textContent=`難易度：${def.difficulties[diff].label}`; worksheetCount.textContent=`問題数：${count}問`;
    statusMessage.textContent=`${meta.label}を${count}問作成しました。`;
    document.querySelector(".problem-page")?.scrollIntoView({behavior:"smooth",block:"start"});
  }

  worksheetTypeSelect.addEventListener("change",()=>{
    if(!TYPES[worksheetTypeSelect.value]){
      document.body.classList.remove("word-problem-solution-mode");
      document.querySelector(".problem-page")?.classList.remove("wps-host");
    }
  });
  createButton.addEventListener("click",(event)=>{
    const id=worksheetTypeSelect.value; if(!TYPES[id]) return;
    event.stopImmediatePropagation(); build(id);
  },true);
})();