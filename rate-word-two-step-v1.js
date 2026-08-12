"use strict";

worksheetDefinitions["rate-word-two-step"]={
  label:"割合の文章題→2段階で解く",
  title:"割合の文章題 → 2段階で解く",
  instruction:"文章を読み、まず必要な合計を求めましょう。次に、その結果を使って割合の式を立て、答えを求めましょう。",
  answerNote:"①で必要な量をまとめ、②で割合の3用法（割合・比べる量・もとにする量）の式を立てます。",
  type:"math",
  difficulties:{
    basic:{label:"基礎",rateHundredths:[20,30,40,50,60,70,80,90],multipliers:[2,3,4,5,6],counts:[3,4],description:"小数第1位まで。合計を1回求めてから、割合の式を立てます。"},
    standard:{label:"標準",rateHundredths:[15,25,35,45,55,65,75,85,95],multipliers:[2,3,4,5,6,7],counts:[3,5,6],description:"小数第2位までを含み、2段階の数量関係を整理して解きます。"},
    advanced:{label:"発展",rateHundredths:[12,18,24,32,48,72,105,125,150,175,225],multipliers:[2,3,4,5,6,7],counts:[3,5,6],description:"1をこえる割合も含め、合計→3用法の2段階で解きます。"}
  }
};

const rateTwoStepContexts=[
  {id:"flower",mode:"part",base:"花だんに植えた花",compared:"赤い花",unit:"株",baseParts:["A区画に植えた花","B区画に植えた花"],comparedParts:["A区画の赤い花","B区画の赤い花"]},
  {id:"ball",mode:"part",base:"箱に入っているボール",compared:"赤いボール",unit:"個",baseParts:["上の段にあるボール","下の段にあるボール"],comparedParts:["上の段の赤いボール","下の段の赤いボール"]},
  {id:"library",mode:"part",base:"2つの棚にある本",compared:"貸し出されている本",unit:"冊",baseParts:["上の棚にある本","下の棚にある本"],comparedParts:["上の棚から貸し出されている本","下の棚から貸し出されている本"]},
  {id:"steps",mode:"comparison",base:"昨日歩いた歩数",compared:"今日歩いた歩数",unit:"歩",baseParts:["昨日の午前に歩いた歩数","昨日の午後に歩いた歩数"],comparedParts:["今日の午前に歩いた歩数","今日の午後に歩いた歩数"]},
  {id:"pages",mode:"comparison",base:"昨日読んだページ数",compared:"今日読んだページ数",unit:"ページ",baseParts:["昨日の午前に読んだページ数","昨日の午後に読んだページ数"],comparedParts:["今日の午前に読んだページ数","今日の午後に読んだページ数"]},
  {id:"distance",mode:"comparison",base:"昨日走った距離",compared:"今日走った距離",unit:"km",baseParts:["昨日の午前に走った距離","昨日の午後に走った距離"],comparedParts:["今日の午前に走った距離","今日の午後に走った距離"]}
];

function gcdRateTwoStep(a,b){let x=Math.abs(a),y=Math.abs(b);while(y!==0)[x,y]=[y,x%y];return x}
function formatRateTwoStep(r){return(r/100).toFixed(2).replace(/0+$/,"").replace(/\.$/,"")}

function buildRateTwoStepPool(settings){
  const relations=[];
  settings.rateHundredths.forEach(rh=>{
    const d=gcdRateTwoStep(rh,100),bu=100/d,cu=rh/d,numericRate=rh/100,rate=formatRateTwoStep(rh);
    settings.multipliers.forEach(m=>{
      const base=bu*m,compared=cu*m;
      if(!Number.isInteger(base)||!Number.isInteger(compared)||base<2||compared<2)return;
      if(Math.abs(compared/base-numericRate)>1e-9||Math.abs(base*numericRate-compared)>1e-9||Math.abs(compared/numericRate-base)>1e-9)return;
      relations.push({base,compared,rate,numericRate,relationKey:`${base}:${compared}:${rate}`});
    });
  });
  return shuffle(relations);
}

function rateTwoStepTargets(count){
  const kinds=shuffle(["rate","compared","base"]),targets={rate:Math.floor(count/3),compared:Math.floor(count/3),base:Math.floor(count/3)};
  for(let i=0;i<count%3;i++)targets[kinds[i]]++;
  return targets;
}

function chooseRateTwoStepContext(numericRate,usage){
  const eligible=rateTwoStepContexts.filter(c=>numericRate>1?c.mode==="comparison":true);
  const min=Math.min(...eligible.map(c=>usage.get(c.id)||0));
  const choices=eligible.filter(c=>(usage.get(c.id)||0)===min);
  const chosen=choices[Math.floor(Math.random()*choices.length)];
  usage.set(chosen.id,(usage.get(chosen.id)||0)+1);
  return chosen;
}

function splitRateTwoStep(total,seed){
  if(total<2)return null;
  const min=1,max=total-1,span=max-min+1;
  let first=min+((seed*7+total*3)%span);
  let second=total-first;
  if(first<=0||second<=0){first=1;second=total-1}
  return [first,second];
}

function selectRateTwoStepQuestions(relations,count){
  const targets=rateTwoStepTargets(count),kinds=[];
  Object.keys(targets).forEach(k=>{for(let i=0;i<targets[k];i++)kinds.push(k)});
  const selected=[],seen=new Set(),usage=new Map();let pos=0;
  for(const kind of shuffle(kinds)){
    while(pos<relations.length&&seen.has(relations[pos].relationKey))pos++;
    if(pos>=relations.length)return[];
    const relation=relations[pos++];
    seen.add(relation.relationKey);
    selected.push({...relation,kind,context:chooseRateTwoStepContext(relation.numericRate,usage)});
  }
  return shuffle(selected).map((q,i)=>{
    const splitTotal=q.kind==="base"?q.compared:q.base;
    return {...q,parts:splitRateTwoStep(splitTotal,i+1)};
  });
}

function rateTwoStepQuestionText(q){
  const c=q.context,[a,b]=q.parts;
  if(q.kind==="rate"){
    return `${c.baseParts[0]}は${a}${c.unit}、${c.baseParts[1]}は${b}${c.unit}です。${c.compared}は${q.compared}${c.unit}です。${c.compared}の${c.base}に対する割合を小数で求めましょう。`;
  }
  if(q.kind==="compared"){
    return `${c.baseParts[0]}は${a}${c.unit}、${c.baseParts[1]}は${b}${c.unit}です。${c.compared}は${c.base}の${q.rate}倍です。${c.compared}は何${c.unit}ですか。`;
  }
  return `${c.comparedParts[0]}は${a}${c.unit}、${c.comparedParts[1]}は${b}${c.unit}です。${c.compared}は${c.base}の${q.rate}倍です。${c.base}は何${c.unit}ですか。`;
}

function rateTwoStepFirstEquation(q){
  const [a,b]=q.parts,total=q.kind==="base"?q.compared:q.base;
  return `${a} ＋ ${b} ＝ ${total}`;
}
function rateTwoStepSecondEquation(q){
  if(q.kind==="rate")return `${q.compared} ÷ ${q.base} ＝ ${q.rate}`;
  if(q.kind==="compared")return `${q.base} × ${q.rate} ＝ ${q.compared}`;
  return `${q.compared} ÷ ${q.rate} ＝ ${q.base}`;
}
function rateTwoStepAnswer(q){
  if(q.kind==="rate")return {label:"割合",answer:q.rate};
  if(q.kind==="compared")return {label:"比べる量",answer:`${q.compared}${q.context.unit}`};
  return {label:"もとにする量",answer:`${q.base}${q.context.unit}`};
}

function makeRateTwoStepWorksheet(){
  const def=worksheetDefinitions["rate-word-two-step"],settings=def.difficulties[difficultySelect.value],count=Number(countSelect.value);
  if(!Number.isInteger(count)||count<=0){statusMessage.textContent="問題数を正しく選んでください。";return}
  const selected=selectRateTwoStepQuestions(buildRateTwoStepPool(settings),count);
  if(selected.length<count||selected.some(q=>!q.parts)){statusMessage.textContent="この設定では指定した問題数を作成できません。";return}
  const qf=document.createDocumentFragment(),af=document.createDocumentFragment();
  selected.forEach((q,index)=>{
    const n=index+1,item=document.createElement("div");item.className="rate-two-step-question";
    const prompt=document.createElement("p");prompt.className="rate-two-step-prompt";
    const num=document.createElement("span");num.className="question-number";num.textContent=String(n);
    prompt.append(num,document.createTextNode(rateTwoStepQuestionText(q)));
    const first=document.createElement("p");first.className="rate-two-step-line";first.textContent="① 合計を求める式：";
    const firstBlank=document.createElement("span");firstBlank.className="rate-two-step-blank rate-two-step-first-blank";first.appendChild(firstBlank);
    const second=document.createElement("p");second.className="rate-two-step-line";second.textContent="② 割合を使う式：";
    const secondBlank=document.createElement("span");secondBlank.className="rate-two-step-blank rate-two-step-second-blank";second.appendChild(secondBlank);
    const ans=document.createElement("p");ans.className="rate-two-step-line";ans.textContent="答え：";
    const ansBlank=document.createElement("span");ansBlank.className="rate-two-step-blank rate-two-step-answer-blank";ans.appendChild(ansBlank);
    item.append(prompt,first,second,ans);qf.appendChild(item);

    const a=document.createElement("div");a.className="rate-two-step-answer-item";
    const head=document.createElement("p"),anum=document.createElement("span");anum.className="question-number";anum.textContent=String(n);
    const data=rateTwoStepAnswer(q);head.append(anum,document.createTextNode(`${data.label} ${data.answer}`));
    const exp1=document.createElement("p");exp1.className="answer-explanation";exp1.textContent=`① ${rateTwoStepFirstEquation(q)}`;
    const exp2=document.createElement("p");exp2.className="answer-explanation";exp2.textContent=`② ${rateTwoStepSecondEquation(q)}`;
    a.append(head,exp1,exp2);af.appendChild(a);
  });
  questionsElement.replaceChildren(qf);answersElement.replaceChildren(af);
  worksheetDifficulty.textContent=`難易度：${settings.label}`;worksheetCount.textContent=`問題数：${count}問`;
  statusMessage.textContent=`割合の文章題→2段階で解く・${settings.label}を${count}問作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({behavior:"smooth",block:"start"});
}

createButton.addEventListener("click",event=>{
  if(worksheetTypeSelect.value!=="rate-word-two-step")return;
  event.stopImmediatePropagation();
  makeRateTwoStepWorksheet();
},true);
