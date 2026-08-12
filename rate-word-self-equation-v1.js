"use strict";

worksheetDefinitions["rate-word-self-equation"]={
  label:"割合の文章題→自力で式",
  title:"割合の文章題 → 自力で式",
  instruction:"文章を読んで、何を求める問題かを自分で判断し、式を書いて答えを求めましょう。必要なら余白に図やメモを書いてもかまいません。",
  answerNote:"線分図などの補助はありません。文章から、もとにする量・比べる量・割合を自分で判断して式を立てます。",
  type:"math",
  difficulties:{
    basic:{label:"基礎",rateHundredths:[20,30,40,50,60,70,80,90],multipliers:[1,2,3,4,5],counts:[5,10],description:"小数第1位までの割合で、文章だけから3用法を判断して式を立てます。"},
    standard:{label:"標準",rateHundredths:[15,25,35,45,55,65,75,85,95],multipliers:[1,2,3,4,5,6],counts:[5,10,15],description:"小数第2位までの割合を含む3用法を、補助図なしで判断します。"},
    advanced:{label:"発展",rateHundredths:[12,18,24,32,48,72,105,125,150,175,225],multipliers:[1,2,3,4,5,6],counts:[5,10,15],description:"1をこえる割合も含め、文章だけから関係と演算を判断します。"}
  }
};

const rateSelfContexts=[
  {id:"library",mode:"part",base:"図書館にある本",compared:"貸し出されている本",unit:"冊"},
  {id:"flower",mode:"part",base:"花だんに植えた花",compared:"赤い花",unit:"株"},
  {id:"class",mode:"part",base:"クラスの児童",compared:"めがねをかけている児童",unit:"人"},
  {id:"ball",mode:"part",base:"箱に入っているボール",compared:"赤いボール",unit:"個"},
  {id:"tank",mode:"part",base:"水そうに入る水の量",compared:"今入っている水の量",unit:"L"},
  {id:"steps",mode:"comparison",base:"ある日の目標歩数",compared:"実際に歩いた歩数",unit:"歩"},
  {id:"cans",mode:"comparison",base:"去年集めた空き缶の数",compared:"今年集めた空き缶の数",unit:"個"},
  {id:"books-week",mode:"comparison",base:"先週読んだ本の数",compared:"今週読んだ本の数",unit:"冊"},
  {id:"distance",mode:"comparison",base:"昨日走った距離",compared:"今日走った距離",unit:"km"},
  {id:"pages",mode:"comparison",base:"昨日読んだページ数",compared:"今日読んだページ数",unit:"ページ"}
];

function gcdRateSelf(a,b){let x=Math.abs(a),y=Math.abs(b);while(y!==0)[x,y]=[y,x%y];return x}
function formatRateSelf(r){return(r/100).toFixed(2).replace(/0+$/,"").replace(/\.$/,"")}
function pickRateSelf(arr){return arr[Math.floor(Math.random()*arr.length)]}

function buildRateSelfPool(settings){
  const relations=[];
  settings.rateHundredths.forEach(rh=>{
    const d=gcdRateSelf(rh,100),bu=100/d,cu=rh/d,numericRate=rh/100,rate=formatRateSelf(rh);
    settings.multipliers.forEach(m=>{
      const base=bu*m,compared=cu*m;
      if(!Number.isInteger(base)||!Number.isInteger(compared)||base<=0||compared<=0)return;
      if(Math.abs(compared/base-numericRate)>1e-9||Math.abs(base*numericRate-compared)>1e-9||Math.abs(compared/numericRate-base)>1e-9)return;
      relations.push({base,compared,rate,numericRate,relationKey:`${base}:${compared}:${rate}`});
    });
  });
  return shuffle(relations);
}

function rateSelfTargets(count){
  const kinds=shuffle(["rate","compared","base"]),t={rate:Math.floor(count/3),compared:Math.floor(count/3),base:Math.floor(count/3)};
  for(let i=0;i<count%3;i++)t[kinds[i]]++;
  return t;
}

function chooseRateSelfContext(numericRate,usage){
  const eligible=rateSelfContexts.filter(c=>numericRate>1?c.mode==="comparison":true);
  const min=Math.min(...eligible.map(c=>usage.get(c.id)||0));
  const choices=eligible.filter(c=>(usage.get(c.id)||0)===min);
  const chosen=choices[Math.floor(Math.random()*choices.length)];
  usage.set(chosen.id,(usage.get(chosen.id)||0)+1);
  return chosen;
}

function selectRateSelfQuestions(relations,count){
  const targets=rateSelfTargets(count),kinds=[];
  Object.keys(targets).forEach(k=>{for(let i=0;i<targets[k];i++)kinds.push(k)});
  const selected=[],seen=new Set(),usage=new Map();let pos=0;
  for(const kind of shuffle(kinds)){
    while(pos<relations.length&&seen.has(relations[pos].relationKey))pos++;
    if(pos>=relations.length)return[];
    const relation=relations[pos++];seen.add(relation.relationKey);
    selected.push({...relation,kind,context:chooseRateSelfContext(relation.numericRate,usage)});
  }
  return shuffle(selected);
}

function rateSelfWordProblem(q){
  const c=q.context;
  if(q.kind==="rate"){
    return pickRateSelf([
      `${c.base}は${q.base}${c.unit}、${c.compared}は${q.compared}${c.unit}です。${c.compared}は${c.base}のどれだけにあたるか、小数で表しましょう。`,
      `${c.base}は全部で${q.base}${c.unit}です。そのうち、${c.compared}は${q.compared}${c.unit}です。このときの割合を小数で求めましょう。`,
      `${c.compared}が${q.compared}${c.unit}、${c.base}が${q.base}${c.unit}です。${c.compared}の${c.base}に対する割合を小数で求めましょう。`
    ]);
  }
  if(q.kind==="compared"){
    return pickRateSelf([
      `${c.base}は${q.base}${c.unit}です。${c.compared}は${c.base}の${q.rate}倍にあたります。${c.compared}を求めましょう。`,
      `${c.base}は${q.base}${c.unit}です。${c.compared}は、その${q.rate}倍にあたります。${c.compared}は何${c.unit}ですか。`,
      `${c.compared}は、${q.base}${c.unit}ある${c.base}の${q.rate}倍です。${c.compared}は何${c.unit}になりますか。`
    ]);
  }
  return pickRateSelf([
    `${c.compared}は${q.compared}${c.unit}です。これは${c.base}の${q.rate}倍にあたります。${c.base}を求めましょう。`,
    `${c.compared}は${q.compared}${c.unit}で、${c.base}の${q.rate}倍にあたります。${c.base}は何${c.unit}ですか。`,
    `${c.base}の${q.rate}倍が、${q.compared}${c.unit}の${c.compared}にあたります。${c.base}は何${c.unit}ですか。`
  ]);
}

function rateSelfEquation(q){
  if(q.kind==="rate")return`${q.compared} ÷ ${q.base} ＝ ${q.rate}`;
  if(q.kind==="compared")return`${q.base} × ${q.rate} ＝ ${q.compared}`;
  return`${q.compared} ÷ ${q.rate} ＝ ${q.base}`;
}

function rateSelfAnswer(q){
  if(q.kind==="rate")return{label:"割合",answer:q.rate};
  if(q.kind==="compared")return{label:"比べる量",answer:`${q.compared}${q.context.unit}`};
  return{label:"もとにする量",answer:`${q.base}${q.context.unit}`};
}

function makeRateSelfWorksheet(){
  const def=worksheetDefinitions["rate-word-self-equation"],settings=def.difficulties[difficultySelect.value],count=Number(countSelect.value);
  if(!Number.isInteger(count)||count<=0){statusMessage.textContent="問題数を正しく選んでください。";return}
  const selected=selectRateSelfQuestions(buildRateSelfPool(settings),count);
  if(selected.length<count){statusMessage.textContent="この設定では重複なしで指定した問題数を作成できません。";return}
  const qf=document.createDocumentFragment(),af=document.createDocumentFragment();
  selected.forEach((q,index)=>{
    const n=index+1,item=document.createElement("div");item.className="rate-self-question";
    const prompt=document.createElement("p");prompt.className="rate-self-prompt";
    const num=document.createElement("span");num.className="question-number";num.textContent=String(n);
    prompt.append(num,document.createTextNode(rateSelfWordProblem(q)));
    const work=document.createElement("div");work.className="rate-self-work";
    const eq=document.createElement("p");eq.className="rate-self-equation-line";eq.textContent="式：";
    const eqBlank=document.createElement("span");eqBlank.className="rate-self-blank rate-self-equation-blank";eq.appendChild(eqBlank);
    const ans=document.createElement("p");ans.className="rate-self-answer-line";ans.textContent="答え：";
    const ansBlank=document.createElement("span");ansBlank.className="rate-self-blank rate-self-answer-blank";ans.appendChild(ansBlank);
    work.append(eq,ans);item.append(prompt,work);qf.appendChild(item);
    const a=document.createElement("div");a.className="rate-self-answer-item";
    const head=document.createElement("p"),anum=document.createElement("span");anum.className="question-number";anum.textContent=String(n);
    const data=rateSelfAnswer(q);head.append(anum,document.createTextNode(`${data.label} ${data.answer}`));
    const exp=document.createElement("p");exp.className="answer-explanation";exp.textContent=`式：${rateSelfEquation(q)}`;
    a.append(head,exp);af.appendChild(a);
  });
  questionsElement.replaceChildren(qf);answersElement.replaceChildren(af);
  worksheetDifficulty.textContent=`難易度：${settings.label}`;worksheetCount.textContent=`問題数：${count}問`;
  statusMessage.textContent=`割合の文章題→自力で式・${settings.label}を${count}問作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({behavior:"smooth",block:"start"});
}

createButton.addEventListener("click",event=>{
  if(worksheetTypeSelect.value!=="rate-word-self-equation")return;
  event.stopImmediatePropagation();
  makeRateSelfWorksheet();
},true);
