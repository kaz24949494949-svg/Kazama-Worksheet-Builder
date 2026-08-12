"use strict";

worksheetDefinitions["rate-word-complete-line-equation"] = {
  label: "割合の文章題→線分図を完成→式",
  title: "割合の文章題 → 線分図を完成 → 式",
  instruction: "文章を読んで、線分図の3つの空欄に、文章から分かる2つの数を書き、求める量のところには□を書きましょう。そのあと、式を書いて答えを求めましょう。",
  answerNote: "文章から、もとにする量・比べる量・割合を線分図へ対応させ、その後に式を立てます。",
  type: "math",
  difficulties: {
    basic: { label: "基礎", rateHundredths: [20,30,40,50,60,70,80,90], multipliers: [1,2,3,4,5], counts: [3,4], description: "文章から3つの量を線分図へ書き込み、小数第1位までの割合で式を立てます。" },
    standard: { label: "標準", rateHundredths: [15,25,35,45,55,65,75,85,95], multipliers: [1,2,3,4,5,6], counts: [3,4,5], description: "小数第2位までの割合を含む3用法で、文章→線分図の完成→式を行います。" },
    advanced: { label: "発展", rateHundredths: [12,18,24,32,48,72,105,125,150,175,225], multipliers: [1,2,3,4,5,6], counts: [3,4,5], description: "1をこえる割合も含め、文章から関係を取り出して線分図を完成させます。" }
  }
};

const rateCompleteContexts = [
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

function gcdRateComplete(a,b){ let x=Math.abs(a), y=Math.abs(b); while(y!==0){ [x,y]=[y,x%y]; } return x; }
function formatRateComplete(r){ return (r/100).toFixed(2).replace(/0+$/,"").replace(/\.$/,""); }

function buildRateCompletePool(settings){
  const relations=[];
  settings.rateHundredths.forEach((rh)=>{
    const d=gcdRateComplete(rh,100), bu=100/d, cu=rh/d, numericRate=rh/100, rate=formatRateComplete(rh);
    settings.multipliers.forEach((m)=>{
      const base=bu*m, compared=cu*m;
      if(!Number.isInteger(base)||!Number.isInteger(compared)||base<=0||compared<=0) return;
      if(Math.abs(compared/base-numericRate)>1e-9||Math.abs(base*numericRate-compared)>1e-9||Math.abs(compared/numericRate-base)>1e-9) return;
      relations.push({base,compared,rate,numericRate,relationKey:`${base}:${compared}:${rate}`});
    });
  });
  return shuffle(relations);
}

function rateCompleteTargets(count){
  const kinds=shuffle(["rate","compared","base"]);
  const t={rate:Math.floor(count/3),compared:Math.floor(count/3),base:Math.floor(count/3)};
  for(let i=0;i<count%3;i+=1) t[kinds[i]]+=1;
  return t;
}

function chooseRateCompleteContext(numericRate,usage){
  const eligible=rateCompleteContexts.filter((c)=>numericRate>1 ? c.mode==="comparison" : true);
  const min=Math.min(...eligible.map((c)=>usage.get(c.id)||0));
  const choices=eligible.filter((c)=>(usage.get(c.id)||0)===min);
  const chosen=choices[Math.floor(Math.random()*choices.length)];
  usage.set(chosen.id,(usage.get(chosen.id)||0)+1);
  return chosen;
}

function selectRateCompleteQuestions(relations,count){
  const targets=rateCompleteTargets(count), kinds=[];
  Object.keys(targets).forEach((k)=>{ for(let i=0;i<targets[k];i+=1) kinds.push(k); });
  const selected=[], seen=new Set(), usage=new Map(); let pos=0;
  for(const kind of shuffle(kinds)){
    while(pos<relations.length&&seen.has(relations[pos].relationKey)) pos+=1;
    if(pos>=relations.length) return [];
    const relation=relations[pos++]; seen.add(relation.relationKey);
    selected.push({...relation,kind,context:chooseRateCompleteContext(relation.numericRate,usage)});
  }
  return shuffle(selected);
}

function rateCompleteWordProblem(q){
  const c=q.context;
  if(q.kind==="rate") return `${c.base}は${q.base}${c.unit}です。${c.compared}は${q.compared}${c.unit}です。${c.compared}の、${c.base}に対する割合を小数で求めましょう。`;
  if(q.kind==="compared") return `${c.base}は${q.base}${c.unit}です。${c.compared}は、その${q.rate}倍です。${c.compared}は何${c.unit}ですか。`;
  return `${c.compared}は${q.compared}${c.unit}で、これは${c.base}の${q.rate}倍です。${c.base}は何${c.unit}ですか。`;
}

function makeRateCompleteSvgElement(tag,attrs={},text=""){
  const el=document.createElementNS("http://www.w3.org/2000/svg",tag);
  Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));
  if(text!=="") el.textContent=text;
  return el;
}

function buildRateCompleteSvg(q){
  const svg=makeRateCompleteSvgElement("svg",{viewBox:"0 0 620 145",class:"rate-complete-svg",role:"img","aria-label":"書き込み式の割合の線分図"});
  const startX=145,maxLength=350,scale=maxLength/Math.max(1,q.numericRate);
  const baseEnd=startX+scale,compEnd=startX+scale*q.numericRate,baseY=43,compY=98;
  svg.append(
    makeRateCompleteSvgElement("text",{x:12,y:baseY+5,class:"complete-line-name"},"もとにする量"),
    makeRateCompleteSvgElement("text",{x:12,y:compY+5,class:"complete-line-name"},"比べる量"),
    makeRateCompleteSvgElement("line",{x1:startX,y1:baseY,x2:baseEnd,y2:baseY,class:"complete-main-line"}),
    makeRateCompleteSvgElement("line",{x1:startX,y1:compY,x2:compEnd,y2:compY,class:"complete-main-line"})
  );
  [[startX,baseY],[baseEnd,baseY],[startX,compY],[compEnd,compY]].forEach(([x,y])=>svg.append(makeRateCompleteSvgElement("line",{x1:x,y1:y-7,x2:x,y2:y+7,class:"complete-tick"})));

  const baseMid=(startX+baseEnd)/2, compMid=(startX+compEnd)/2;
  svg.append(
    makeRateCompleteSvgElement("rect",{x:baseMid-42,y:baseY-30,width:84,height:22,rx:3,class:"complete-entry-box"}),
    makeRateCompleteSvgElement("rect",{x:compMid-42,y:compY-30,width:84,height:22,rx:3,class:"complete-entry-box"}),
    makeRateCompleteSvgElement("text",{x:530,y:62,class:"complete-rate-caption"},"割合"),
    makeRateCompleteSvgElement("rect",{x:525,y:70,width:72,height:24,rx:3,class:"complete-entry-box"})
  );
  return svg;
}

function rateCompleteEquation(q){
  if(q.kind==="rate") return `${q.compared} ÷ ${q.base} ＝ ${q.rate}`;
  if(q.kind==="compared") return `${q.base} × ${q.rate} ＝ ${q.compared}`;
  return `${q.compared} ÷ ${q.rate} ＝ ${q.base}`;
}

function rateCompleteAnswer(q){
  if(q.kind==="rate") return {label:"割合",answer:q.rate};
  if(q.kind==="compared") return {label:"比べる量",answer:`${q.compared}${q.context.unit}`};
  return {label:"もとにする量",answer:`${q.base}${q.context.unit}`};
}

function rateCompleteDiagramNote(q){
  const unknown=q.kind==="rate" ? "割合＝□" : q.kind==="compared" ? "比べる量＝□" : "もとにする量＝□";
  return `線分図：もとにする量 ${q.base}、比べる量 ${q.compared}、割合 ${q.rate}（問題では ${unknown} と書き込む）`;
}

function makeRateCompleteWorksheet(){
  const def=worksheetDefinitions["rate-word-complete-line-equation"], settings=def.difficulties[difficultySelect.value], count=Number(countSelect.value);
  if(!Number.isInteger(count)||count<=0){ statusMessage.textContent="問題数を正しく選んでください。"; return; }
  const selected=selectRateCompleteQuestions(buildRateCompletePool(settings),count);
  if(selected.length<count){ statusMessage.textContent="この設定では重複なしで指定した問題数を作成できません。"; return; }

  const qf=document.createDocumentFragment(), af=document.createDocumentFragment();
  selected.forEach((q,index)=>{
    const n=index+1,item=document.createElement("div"); item.className="rate-complete-question";
    const prompt=document.createElement("p"); prompt.className="rate-complete-prompt";
    const num=document.createElement("span"); num.className="question-number"; num.textContent=String(n);
    prompt.append(num,document.createTextNode(rateCompleteWordProblem(q)));
    const guide=document.createElement("p"); guide.className="rate-complete-guide"; guide.textContent="線分図の3つの空欄に、文章から分かる2つの数を書き、求める量のところには□を書きましょう。";
    const eq=document.createElement("p"); eq.className="rate-complete-equation-line"; eq.textContent="式：";
    const eqBlank=document.createElement("span"); eqBlank.className="rate-complete-blank rate-complete-equation-blank"; eq.appendChild(eqBlank);
    const ans=document.createElement("p"); ans.className="rate-complete-answer-line"; ans.textContent="答え：";
    const ansBlank=document.createElement("span"); ansBlank.className="rate-complete-blank rate-complete-answer-blank"; ans.appendChild(ansBlank);
    item.append(prompt,guide,buildRateCompleteSvg(q),eq,ans); qf.appendChild(item);

    const a=document.createElement("div"); a.className="rate-complete-answer-item";
    const head=document.createElement("p"), anum=document.createElement("span"); anum.className="question-number"; anum.textContent=String(n);
    const data=rateCompleteAnswer(q); head.append(anum,document.createTextNode(`${data.label} ${data.answer}`));
    const diagram=document.createElement("p"); diagram.className="answer-explanation"; diagram.textContent=rateCompleteDiagramNote(q);
    const exp=document.createElement("p"); exp.className="answer-explanation"; exp.textContent=`式：${rateCompleteEquation(q)}`;
    a.append(head,diagram,exp); af.appendChild(a);
  });

  questionsElement.replaceChildren(qf); answersElement.replaceChildren(af);
  worksheetDifficulty.textContent=`難易度：${settings.label}`; worksheetCount.textContent=`問題数：${count}問`;
  statusMessage.textContent=`割合の文章題→線分図を完成→式・${settings.label}を${count}問作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({behavior:"smooth",block:"start"});
}

createButton.addEventListener("click",(event)=>{
  if(worksheetTypeSelect.value!=="rate-word-complete-line-equation") return;
  event.stopImmediatePropagation();
  makeRateCompleteWorksheet();
},true);
