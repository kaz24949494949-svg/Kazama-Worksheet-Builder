"use strict";

worksheetDefinitions["rate-word-line-equation"] = {
  label: "割合の文章題→線分図で確認→式",
  title: "割合の文章題 → 線分図で確認 → 式",
  instruction: "文章を読んで、線分図で関係を確かめ、式を書いて答えを求めましょう。",
  answerNote: "文章 → 線分図で確認 → 式の順に、もとにする量・比べる量・割合の関係を整理します。",
  type: "math",
  difficulties: {
    basic: { label: "基礎", rateHundredths: [20,30,40,50,60,70,80,90], multipliers: [1,2,3,4,5], counts: [3,4], description: "短い文章を読み、線分図で関係を確かめて、小数第1位までの割合で式を立てます。" },
    standard: { label: "標準", rateHundredths: [15,25,35,45,55,65,75,85,95], multipliers: [1,2,3,4,5,6], counts: [3,4,5], description: "小数第2位までの割合を含む3用法を、文章→線分図で確認→式の流れで整理します。" },
    advanced: { label: "発展", rateHundredths: [12,18,24,32,48,72,105,125,150,175,225], multipliers: [1,2,3,4,5,6], counts: [3,4,5], description: "1をこえる割合も含め、文章・線分図・式を対応させて関係を判断します。" }
  }
};

const rateBridgeContexts = [
  { id:"library", mode:"part", base:"図書館にある本", compared:"貸し出されている本", unit:"冊" },
  { id:"flower", mode:"part", base:"花だんに植えた花", compared:"赤い花", unit:"株" },
  { id:"class", mode:"part", base:"クラスの児童", compared:"めがねをかけている児童", unit:"人" },
  { id:"ball", mode:"part", base:"箱に入っているボール", compared:"赤いボール", unit:"個" },
  { id:"tank", mode:"part", base:"水そうに入る水の量", compared:"今入っている水の量", unit:"L" },
  { id:"steps", mode:"comparison", base:"ある日の目標歩数", compared:"実際に歩いた歩数", unit:"歩" },
  { id:"cans", mode:"comparison", base:"去年集めた空き缶の数", compared:"今年集めた空き缶の数", unit:"個" },
  { id:"books-week", mode:"comparison", base:"先週読んだ本の数", compared:"今週読んだ本の数", unit:"冊" },
  { id:"distance", mode:"comparison", base:"昨日走った距離", compared:"今日走った距離", unit:"km" }
];

function gcdRateBridge(a,b){ let x=Math.abs(a), y=Math.abs(b); while(y!==0){ [x,y]=[y,x%y]; } return x; }
function formatRateBridge(r){ return (r/100).toFixed(2).replace(/0+$/,"").replace(/\.$/,""); }

function buildRateBridgePool(settings){
  const relations=[];
  settings.rateHundredths.forEach((rh)=>{
    const d=gcdRateBridge(rh,100), bu=100/d, cu=rh/d, numericRate=rh/100, rate=formatRateBridge(rh);
    settings.multipliers.forEach((m)=>{
      const base=bu*m, compared=cu*m;
      if(!Number.isInteger(base)||!Number.isInteger(compared)||base<=0||compared<=0) return;
      if(Math.abs(compared/base-numericRate)>1e-9||Math.abs(base*numericRate-compared)>1e-9||Math.abs(compared/numericRate-base)>1e-9) return;
      relations.push({base,compared,rate,numericRate,relationKey:`${base}:${compared}:${rate}`});
    });
  });
  return shuffle(relations);
}

function rateBridgeTargets(count){
  const kinds=shuffle(["rate","compared","base"]);
  const t={rate:Math.floor(count/3),compared:Math.floor(count/3),base:Math.floor(count/3)};
  for(let i=0;i<count%3;i+=1) t[kinds[i]]+=1;
  return t;
}

function chooseRateBridgeContext(numericRate, usage){
  const eligible=rateBridgeContexts.filter((c)=>numericRate>1 ? c.mode==="comparison" : true);
  const min=Math.min(...eligible.map((c)=>usage.get(c.id)||0));
  const choices=eligible.filter((c)=>(usage.get(c.id)||0)===min);
  const chosen=choices[Math.floor(Math.random()*choices.length)];
  usage.set(chosen.id,(usage.get(chosen.id)||0)+1);
  return chosen;
}

function selectRateBridgeQuestions(relations,count){
  const targets=rateBridgeTargets(count), kinds=[];
  Object.keys(targets).forEach((k)=>{ for(let i=0;i<targets[k];i+=1) kinds.push(k); });
  const selected=[], seen=new Set(), usage=new Map(); let pos=0;
  for(const kind of shuffle(kinds)){
    while(pos<relations.length&&seen.has(relations[pos].relationKey)) pos+=1;
    if(pos>=relations.length) return [];
    const relation=relations[pos++]; seen.add(relation.relationKey);
    selected.push({...relation,kind,context:chooseRateBridgeContext(relation.numericRate,usage)});
  }
  return shuffle(selected);
}

function rateBridgeWordProblem(q){
  const c=q.context;
  if(q.kind==="rate") return `${c.base}は${q.base}${c.unit}です。${c.compared}は${q.compared}${c.unit}です。${c.compared}の、${c.base}に対する割合を小数で求めましょう。`;
  if(q.kind==="compared") return `${c.base}は${q.base}${c.unit}です。${c.compared}は、その${q.rate}倍です。${c.compared}は何${c.unit}ですか。`;
  return `${c.compared}は${q.compared}${c.unit}で、これは${c.base}の${q.rate}倍です。${c.base}は何${c.unit}ですか。`;
}

function makeRateBridgeSvgElement(tag,attrs={},text=""){
  const el=document.createElementNS("http://www.w3.org/2000/svg",tag);
  Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));
  if(text!=="") el.textContent=text;
  return el;
}

function rateBridgeFieldText(q,field){
  if(q.kind===field) return "□";
  if(field==="base") return String(q.base);
  if(field==="compared") return String(q.compared);
  return String(q.rate);
}

function buildRateBridgeSvg(q){
  const svg=makeRateBridgeSvgElement("svg",{viewBox:"0 0 620 135",class:"rate-bridge-svg",role:"img","aria-label":"割合の線分図"});
  const startX=145,maxLength=370,scale=maxLength/Math.max(1,q.numericRate);
  const baseEnd=startX+scale,compEnd=startX+scale*q.numericRate,baseY=42,compY=94;
  svg.append(
    makeRateBridgeSvgElement("text",{x:12,y:baseY+5,class:"bridge-line-name"},"もとにする量"),
    makeRateBridgeSvgElement("text",{x:12,y:compY+5,class:"bridge-line-name"},"比べる量"),
    makeRateBridgeSvgElement("line",{x1:startX,y1:baseY,x2:baseEnd,y2:baseY,class:"bridge-main-line"}),
    makeRateBridgeSvgElement("line",{x1:startX,y1:compY,x2:compEnd,y2:compY,class:"bridge-main-line"})
  );
  [[startX,baseY],[baseEnd,baseY],[startX,compY],[compEnd,compY]].forEach(([x,y])=>svg.append(makeRateBridgeSvgElement("line",{x1:x,y1:y-7,x2:x,y2:y+7,class:"bridge-tick"})));
  svg.append(
    makeRateBridgeSvgElement("text",{x:(startX+baseEnd)/2,y:baseY-11,"text-anchor":"middle",class:"bridge-value"},rateBridgeFieldText(q,"base")),
    makeRateBridgeSvgElement("text",{x:(startX+compEnd)/2,y:compY-11,"text-anchor":"middle",class:"bridge-value"},rateBridgeFieldText(q,"compared")),
    makeRateBridgeSvgElement("text",{x:540,y:59,class:"bridge-rate-caption"},"割合"),
    makeRateBridgeSvgElement("text",{x:540,y:81,class:"bridge-rate-value"},rateBridgeFieldText(q,"rate"))
  );
  return svg;
}

function rateBridgeEquation(q){
  if(q.kind==="rate") return `${q.compared} ÷ ${q.base} ＝ ${q.rate}`;
  if(q.kind==="compared") return `${q.base} × ${q.rate} ＝ ${q.compared}`;
  return `${q.compared} ÷ ${q.rate} ＝ ${q.base}`;
}

function rateBridgeAnswer(q){
  if(q.kind==="rate") return {label:"割合",answer:q.rate};
  if(q.kind==="compared") return {label:"比べる量",answer:`${q.compared}${q.context.unit}`};
  return {label:"もとにする量",answer:`${q.base}${q.context.unit}`};
}

function makeRateBridgeWorksheet(){
  const def=worksheetDefinitions["rate-word-line-equation"], settings=def.difficulties[difficultySelect.value], count=Number(countSelect.value);
  if(!Number.isInteger(count)||count<=0){ statusMessage.textContent="問題数を正しく選んでください。"; return; }
  const selected=selectRateBridgeQuestions(buildRateBridgePool(settings),count);
  if(selected.length<count){ statusMessage.textContent="この設定では重複なしで指定した問題数を作成できません。"; return; }

  const qf=document.createDocumentFragment(), af=document.createDocumentFragment();
  selected.forEach((q,index)=>{
    const n=index+1, item=document.createElement("div"); item.className="rate-bridge-question";
    const prompt=document.createElement("p"); prompt.className="rate-bridge-prompt";
    const num=document.createElement("span"); num.className="question-number"; num.textContent=String(n);
    prompt.append(num,document.createTextNode(rateBridgeWordProblem(q)));
    const work=document.createElement("div"); work.className="rate-bridge-work";
    const eq=document.createElement("p"); eq.className="rate-bridge-equation-line"; eq.textContent="式：";
    const eqBlank=document.createElement("span"); eqBlank.className="rate-bridge-blank rate-bridge-equation-blank"; eq.appendChild(eqBlank);
    const ans=document.createElement("p"); ans.className="rate-bridge-answer-line"; ans.textContent="答え：";
    const ansBlank=document.createElement("span"); ansBlank.className="rate-bridge-blank rate-bridge-answer-blank"; ans.appendChild(ansBlank);
    work.append(buildRateBridgeSvg(q),eq,ans); item.append(prompt,work); qf.appendChild(item);

    const a=document.createElement("div"); a.className="rate-bridge-answer-item";
    const head=document.createElement("p"); const anum=document.createElement("span"); anum.className="question-number"; anum.textContent=String(n);
    const data=rateBridgeAnswer(q); head.append(anum,document.createTextNode(`${data.label} ${data.answer}`));
    const exp=document.createElement("p"); exp.className="answer-explanation"; exp.textContent=`式：${rateBridgeEquation(q)}`;
    a.append(head,exp); af.appendChild(a);
  });

  questionsElement.replaceChildren(qf); answersElement.replaceChildren(af);
  worksheetDifficulty.textContent=`難易度：${settings.label}`; worksheetCount.textContent=`問題数：${count}問`;
  statusMessage.textContent=`割合の文章題→線分図で確認→式・${settings.label}を${count}問作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({behavior:"smooth",block:"start"});
}

createButton.addEventListener("click",(event)=>{
  if(worksheetTypeSelect.value!=="rate-word-line-equation") return;
  event.stopImmediatePropagation();
  makeRateBridgeWorksheet();
},true);
