"use strict";

worksheetDefinitions["rate-word-select-info-equation"]={
  label:"割合の文章題→必要な情報を選ぶ→式",
  title:"割合の文章題 → 必要な情報を選ぶ → 式",
  instruction:"文章の中から、答えを求めるために必要な2つの情報を選び、その2つを使って式を書きましょう。使わない情報も1つ入っています。",
  answerNote:"文章には必要な情報2つと、使わない情報1つがあります。まず情報を選び、そのあと3用法を判断して式を立てます。",
  type:"math",
  difficulties:{
    basic:{label:"基礎",rateHundredths:[20,30,40,50,60,70,80,90],multipliers:[1,2,3,4,5],counts:[4,6],description:"小数第1位まで。3つの情報から必要な2つを選んで立式します。"},
    standard:{label:"標準",rateHundredths:[15,25,35,45,55,65,75,85,95],multipliers:[1,2,3,4,5,6],counts:[5,8,10],description:"小数第2位までを含み、不要な情報に惑わされず3用法を判断します。"},
    advanced:{label:"発展",rateHundredths:[12,18,24,32,48,72,105,125,150,175,225],multipliers:[1,2,3,4,5,6],counts:[5,8,10],description:"1をこえる割合も含め、必要な情報の選択から立式まで自力で行います。"}
  }
};

const rateSelectContexts=[
  {id:"library",mode:"part",base:"図書館にある本",compared:"貸し出されている本",unit:"冊",extra:"新しく入った本",extraUnit:"冊",extraRule:"withinBase"},
  {id:"flower",mode:"part",base:"花だんに植えた花",compared:"赤い花",unit:"株",extra:"黄色い花",extraUnit:"株",extraRule:"remainder"},
  {id:"class",mode:"part",base:"クラスの児童",compared:"めがねをかけている児童",unit:"人",extra:"昨日欠席した児童",extraUnit:"人",extraRule:"withinBase"},
  {id:"ball",mode:"part",base:"箱に入っているボール",compared:"赤いボール",unit:"個",extra:"青いボール",extraUnit:"個",extraRule:"remainder"},
  {id:"tank",mode:"part",base:"水そうに入る水の量",compared:"今入っている水の量",unit:"L",extra:"朝に使った水の量",extraUnit:"L",extraRule:"withinBase"},
  {id:"steps",mode:"comparison",base:"ある日の目標歩数",compared:"実際に歩いた歩数",unit:"歩",extra:"前日に歩いた歩数",extraUnit:"歩",extraRule:"comparison"},
  {id:"cans",mode:"comparison",base:"去年集めた空き缶の数",compared:"今年集めた空き缶の数",unit:"個",extra:"先月集めた空き缶の数",extraUnit:"個",extraRule:"comparison"},
  {id:"books-week",mode:"comparison",base:"先週読んだ本の数",compared:"今週読んだ本の数",unit:"冊",extra:"来週読む予定の本",extraUnit:"冊",extraRule:"comparison"},
  {id:"distance",mode:"comparison",base:"昨日走った距離",compared:"今日走った距離",unit:"km",extra:"今週の目標距離",extraUnit:"km",extraRule:"comparison"},
  {id:"pages",mode:"comparison",base:"昨日読んだページ数",compared:"今日読んだページ数",unit:"ページ",extra:"明日読む予定のページ数",extraUnit:"ページ",extraRule:"comparison"}
];

function gcdRateSelect(a,b){let x=Math.abs(a),y=Math.abs(b);while(y!==0)[x,y]=[y,x%y];return x}
function formatRateSelect(r){return(r/100).toFixed(2).replace(/0+$/,"").replace(/\.$/,"")}

function buildRateSelectPool(settings){
  const relations=[];
  settings.rateHundredths.forEach(rh=>{
    const d=gcdRateSelect(rh,100),bu=100/d,cu=rh/d,numericRate=rh/100,rate=formatRateSelect(rh);
    settings.multipliers.forEach(m=>{
      const base=bu*m,compared=cu*m;
      if(!Number.isInteger(base)||!Number.isInteger(compared)||base<=0||compared<=0)return;
      if(Math.abs(compared/base-numericRate)>1e-9||Math.abs(base*numericRate-compared)>1e-9||Math.abs(compared/numericRate-base)>1e-9)return;
      relations.push({base,compared,rate,numericRate,relationKey:`${base}:${compared}:${rate}`});
    });
  });
  return shuffle(relations);
}

function rateSelectTargets(count){
  const kinds=shuffle(["rate","compared","base"]),t={rate:Math.floor(count/3),compared:Math.floor(count/3),base:Math.floor(count/3)};
  for(let i=0;i<count%3;i++)t[kinds[i]]++;
  return t;
}

function chooseRateSelectContext(numericRate,usage){
  const eligible=rateSelectContexts.filter(c=>numericRate>1?c.mode==="comparison":true);
  const min=Math.min(...eligible.map(c=>usage.get(c.id)||0));
  const choices=eligible.filter(c=>(usage.get(c.id)||0)===min);
  const chosen=choices[Math.floor(Math.random()*choices.length)];
  usage.set(chosen.id,(usage.get(chosen.id)||0)+1);
  return chosen;
}

function uniquePositiveRateSelect(values,q,maxValue=Infinity){
  const seen=new Set();
  return values.map(v=>Math.round(v)).filter(v=>{
    if(!Number.isInteger(v)||v<=0||v>maxValue)return false;
    if(v===q.base||v===q.compared||v===Number(q.rate)||seen.has(v))return false;
    seen.add(v);return true;
  });
}

function makeRateSelectDistractor(q,index){
  const rule=q.context.extraRule;
  let candidates=[];
  if(rule==="remainder"){
    const maxExtra=Math.max(1,q.base-q.compared);
    candidates=uniquePositiveRateSelect([
      Math.floor(maxExtra/2),Math.floor(maxExtra/3),Math.floor(maxExtra*2/3),maxExtra,maxExtra-1,1
    ],q,maxExtra);
  }else if(rule==="withinBase"){
    candidates=uniquePositiveRateSelect([
      Math.floor(q.base/4),Math.floor(q.base/3),Math.floor(q.base/2),Math.floor(q.base*2/3),q.base-1,1
    ],q,q.base);
  }else{
    const ref=Math.max(q.base,q.compared);
    candidates=uniquePositiveRateSelect([
      Math.floor(ref/2),Math.floor(ref*3/4),Math.ceil(ref*5/4),Math.ceil(ref*3/2),ref+1,Math.max(1,ref-1)
    ],q);
  }
  if(candidates.length===0){
    const fallbackMax=rule==="remainder"?Math.max(1,q.base-q.compared):(rule==="withinBase"?q.base:Math.max(q.base,q.compared)+10);
    for(let v=1;v<=fallbackMax;v++){
      if(v!==q.base&&v!==q.compared&&v!==Number(q.rate))candidates.push(v);
    }
  }
  return candidates[index%candidates.length];
}

function selectRateSelectQuestions(relations,count){
  const targets=rateSelectTargets(count),kinds=[];
  Object.keys(targets).forEach(k=>{for(let i=0;i<targets[k];i++)kinds.push(k)});
  const selected=[],seen=new Set(),usage=new Map();let pos=0;
  for(const kind of shuffle(kinds)){
    while(pos<relations.length&&seen.has(relations[pos].relationKey))pos++;
    if(pos>=relations.length)return[];
    const relation=relations[pos++];seen.add(relation.relationKey);
    selected.push({...relation,kind,context:chooseRateSelectContext(relation.numericRate,usage)});
  }
  return shuffle(selected).map((q,i)=>({...q,distractor:makeRateSelectDistractor(q,i)}));
}

function rateSelectFacts(q){
  const c=q.context,d=`${c.extra}は${q.distractor}${c.extraUnit}です。`;
  if(q.kind==="rate")return shuffle([
    `${c.base}は${q.base}${c.unit}です。`,
    `${c.compared}は${q.compared}${c.unit}です。`,
    d
  ]);
  if(q.kind==="compared")return shuffle([
    `${c.base}は${q.base}${c.unit}です。`,
    `${c.compared}は${c.base}の${q.rate}倍です。`,
    d
  ]);
  return shuffle([
    `${c.compared}は${q.compared}${c.unit}です。`,
    `${c.compared}は${c.base}の${q.rate}倍です。`,
    d
  ]);
}

function rateSelectQuestionText(q){
  const c=q.context,facts=rateSelectFacts(q).join("");
  if(q.kind==="rate")return `${facts}${c.compared}の${c.base}に対する割合を小数で求めましょう。`;
  if(q.kind==="compared")return `${facts}${c.compared}は何${c.unit}ですか。`;
  return `${facts}${c.base}は何${c.unit}ですか。`;
}

function rateSelectEquation(q){
  if(q.kind==="rate")return`${q.compared} ÷ ${q.base} ＝ ${q.rate}`;
  if(q.kind==="compared")return`${q.base} × ${q.rate} ＝ ${q.compared}`;
  return`${q.compared} ÷ ${q.rate} ＝ ${q.base}`;
}
function rateSelectAnswer(q){
  const c=q.context;
  if(q.kind==="rate")return{label:"割合",answer:q.rate,needed:`${c.compared} ${q.compared}${c.unit}・${c.base} ${q.base}${c.unit}`};
  if(q.kind==="compared")return{label:"比べる量",answer:`${q.compared}${c.unit}`,needed:`${c.base} ${q.base}${c.unit}・割合 ${q.rate}`};
  return{label:"もとにする量",answer:`${q.base}${c.unit}`,needed:`${c.compared} ${q.compared}${c.unit}・割合 ${q.rate}`};
}

function makeRateSelectWorksheet(){
  const def=worksheetDefinitions["rate-word-select-info-equation"],settings=def.difficulties[difficultySelect.value],count=Number(countSelect.value);
  if(!Number.isInteger(count)||count<=0){statusMessage.textContent="問題数を正しく選んでください。";return}
  const selected=selectRateSelectQuestions(buildRateSelectPool(settings),count);
  if(selected.length<count){statusMessage.textContent="この設定では重複なしで指定した問題数を作成できません。";return}
  const qf=document.createDocumentFragment(),af=document.createDocumentFragment();
  selected.forEach((q,index)=>{
    const n=index+1,item=document.createElement("div");item.className="rate-select-question";
    const prompt=document.createElement("p");prompt.className="rate-select-prompt";
    const num=document.createElement("span");num.className="question-number";num.textContent=String(n);
    prompt.append(num,document.createTextNode(rateSelectQuestionText(q)));
    const choose=document.createElement("p");choose.className="rate-select-choice-line";choose.textContent="使う2つの情報：";
    const chooseBlank=document.createElement("span");chooseBlank.className="rate-select-blank rate-select-choice-blank";choose.appendChild(chooseBlank);
    const eq=document.createElement("p");eq.className="rate-select-equation-line";eq.textContent="式：";
    const eqBlank=document.createElement("span");eqBlank.className="rate-select-blank rate-select-equation-blank";eq.appendChild(eqBlank);
    const ans=document.createElement("p");ans.className="rate-select-answer-line";ans.textContent="答え：";
    const ansBlank=document.createElement("span");ansBlank.className="rate-select-blank rate-select-answer-blank";ans.appendChild(ansBlank);
    item.append(prompt,choose,eq,ans);qf.appendChild(item);

    const a=document.createElement("div");a.className="rate-select-answer-item";
    const head=document.createElement("p"),anum=document.createElement("span");anum.className="question-number";anum.textContent=String(n);
    const data=rateSelectAnswer(q);head.append(anum,document.createTextNode(`${data.label} ${data.answer}`));
    const needed=document.createElement("p");needed.className="answer-explanation";needed.textContent=`使う情報：${data.needed}`;
    const exp=document.createElement("p");exp.className="answer-explanation";exp.textContent=`式：${rateSelectEquation(q)}`;
    a.append(head,needed,exp);af.appendChild(a);
  });
  questionsElement.replaceChildren(qf);answersElement.replaceChildren(af);
  worksheetDifficulty.textContent=`難易度：${settings.label}`;worksheetCount.textContent=`問題数：${count}問`;
  statusMessage.textContent=`割合の文章題→必要な情報を選ぶ→式・${settings.label}を${count}問作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({behavior:"smooth",block:"start"});
}

createButton.addEventListener("click",event=>{
  if(worksheetTypeSelect.value!=="rate-word-select-info-equation")return;
  event.stopImmediatePropagation();
  makeRateSelectWorksheet();
},true);
