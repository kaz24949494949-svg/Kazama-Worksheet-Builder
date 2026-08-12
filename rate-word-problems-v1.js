"use strict";

worksheetDefinitions["rate-word-problems"] = {
  label: "割合の文章題",
  title: "割合の文章題 ― 何を求めるか見分けよう",
  instruction: "文章を読んで、□に入る数を求めましょう。もとにする量・比べる量・割合の関係を考えて式を選びましょう。",
  answerNote: "文章の中から、もとにする量・比べる量・割合を見つけます。割合＝比べる量÷もとにする量、比べる量＝もとにする量×割合、もとにする量＝比べる量÷割合、を使い分けます。",
  type: "math",
  difficulties: {
    basic: { label: "基礎", rateHundredths: [20,30,40,50,60,70,80,90], multipliers: [1,2,3,4,5], counts: [5,10], description: "短い文章から、もとにする量・比べる量・割合を見つけます。" },
    standard: { label: "標準", rateHundredths: [15,25,35,45,55,65,75,85,95], multipliers: [1,2,3,4,5,6], counts: [5,10,15], description: "小数第2位までの割合を含む文章題で、3つの求め方を使い分けます。" },
    advanced: { label: "発展", rateHundredths: [12,18,24,32,48,72,105,125,150,175,225], multipliers: [1,2,3,4,5,6], counts: [5,10,15], description: "1をこえる割合も含む文章題で、関係を自分で判断します。" }
  }
};

const rateWordContexts = [
  { base: "図書館にある本", compared: "貸し出されている本", unit: "冊" },
  { base: "花だんに植えた花", compared: "赤い花", unit: "本" },
  { base: "クラスの児童", compared: "めがねをかけている児童", unit: "人" },
  { base: "箱に入っているボール", compared: "赤いボール", unit: "個" },
  { base: "畑でとれた野菜", compared: "出荷した野菜", unit: "kg" },
  { base: "水そうに入る水", compared: "今入っている水", unit: "L" },
  { base: "ある日の目標歩数", compared: "実際に歩いた歩数", unit: "歩" },
  { base: "去年集めた空き缶", compared: "今年集めた空き缶", unit: "個" }
];

function gcdRateWord(a,b){ let x=Math.abs(a), y=Math.abs(b); while(y!==0){ [x,y]=[y,x%y]; } return x; }
function formatRateWord(r){ return (r/100).toFixed(2).replace(/0+$/,"").replace(/\.$/,""); }

function buildRateWordPool(settings){
  const relations=[];
  settings.rateHundredths.forEach((rh)=>{
    const d=gcdRateWord(rh,100), bu=100/d, cu=rh/d, rate=formatRateWord(rh);
    settings.multipliers.forEach((m)=>{
      const base=bu*m, compared=cu*m, numeric=rh/100;
      if(!Number.isInteger(base)||!Number.isInteger(compared)||base<=0||compared<=0) return;
      if(Math.abs(compared/base-numeric)>1e-9||Math.abs(base*numeric-compared)>1e-9||Math.abs(compared/numeric-base)>1e-9) return;
      relations.push({base,compared,rate,relationKey:`${base}:${compared}:${rate}`});
    });
  });
  return shuffle(relations);
}

function rateWordTargets(count){
  const kinds=shuffle(["rate","compared","base"]);
  const t={rate:Math.floor(count/3),compared:Math.floor(count/3),base:Math.floor(count/3)};
  for(let i=0;i<count%3;i+=1) t[kinds[i]]+=1;
  return t;
}

function selectRateWordQuestions(relations,count){
  const targets=rateWordTargets(count), kinds=[];
  Object.keys(targets).forEach((k)=>{ for(let i=0;i<targets[k];i+=1) kinds.push(k); });
  const shuffledKinds=shuffle(kinds), selected=[], seen=new Set();
  let pos=0;
  for(const kind of shuffledKinds){
    while(pos<relations.length && seen.has(relations[pos].relationKey)) pos+=1;
    if(pos>=relations.length) return [];
    const relation=relations[pos++];
    seen.add(relation.relationKey);
    selected.push({...relation,kind,context:rateWordContexts[Math.floor(Math.random()*rateWordContexts.length)]});
  }
  return selected;
}

function rateWordProblem(q){
  const c=q.context;
  if(q.kind==="rate") return `${c.base}は${q.base}${c.unit}です。そのうち、${c.compared}は${q.compared}${c.unit}です。${c.compared}は${c.base}の何倍ですか。□に小数で答えましょう。`;
  if(q.kind==="compared") return `${c.base}は${q.base}${c.unit}です。${c.compared}は、その${q.rate}倍です。${c.compared}は何${c.unit}ですか。`;
  return `${c.compared}は${q.compared}${c.unit}で、これは${c.base}の${q.rate}倍です。${c.base}は何${c.unit}ですか。`;
}

function rateWordAnswer(q){
  if(q.kind==="rate") return {label:"割合",answer:q.rate,explanation:`${q.compared}÷${q.base}＝${q.rate}`};
  if(q.kind==="compared") return {label:"比べる量",answer:`${q.compared}${q.context.unit}`,explanation:`${q.base}×${q.rate}＝${q.compared}`};
  return {label:"もとにする量",answer:`${q.base}${q.context.unit}`,explanation:`${q.compared}÷${q.rate}＝${q.base}`};
}

function makeRateWordWorksheet(){
  const definition=worksheetDefinitions["rate-word-problems"], settings=definition.difficulties[difficultySelect.value], count=Number(countSelect.value);
  if(!Number.isInteger(count)||count<=0){ statusMessage.textContent="問題数を正しく選んでください。"; return; }
  const selected=selectRateWordQuestions(buildRateWordPool(settings),count);
  if(selected.length<count){ statusMessage.textContent="この設定では重複なしで指定した問題数を作成できません。"; return; }
  const qf=document.createDocumentFragment(), af=document.createDocumentFragment();
  selected.forEach((q,i)=>{
    const n=i+1, p=document.createElement("p"); p.textContent=`${n}. ${rateWordProblem(q)}`; qf.appendChild(p);
    const data=rateWordAnswer(q), a=document.createElement("p"), main=document.createElement("b"), exp=document.createElement("span");
    main.textContent=`${n}. ${data.label} ${data.answer}`; exp.className="answer-explanation"; exp.textContent=`解説：${data.explanation}`;
    a.append(main,document.createElement("br"),exp); af.appendChild(a);
  });
  questionsElement.replaceChildren(qf); answersElement.replaceChildren(af);
  worksheetDifficulty.textContent=`難易度：${settings.label}`; worksheetCount.textContent=`問題数：${count}問`;
  statusMessage.textContent=`割合の文章題・${settings.label}を${count}問作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({behavior:"smooth",block:"start"});
}

createButton.addEventListener("click",(event)=>{
  if(worksheetTypeSelect.value!=="rate-word-problems") return;
  event.stopImmediatePropagation();
  makeRateWordWorksheet();
},true);
