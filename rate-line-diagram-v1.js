"use strict";

worksheetDefinitions["rate-line-diagram"] = {
  label: "割合の線分図",
  title: "割合の線分図 ― 3つの関係を読む",
  instruction: "線分図を見て、□に入る数を求めましょう。上の線をもとにする量、下の線を比べる量として考えます。",
  answerNote: "線分図の関係から、割合＝比べる量÷もとにする量、比べる量＝もとにする量×割合、もとにする量＝比べる量÷割合、を使い分けます。",
  type: "math",
  difficulties: {
    basic: { label: "基礎", rateHundredths: [20,30,40,50,60,70,80,90], multipliers: [1,2,3,4,5], counts: [4,6], description: "小数第1位までの割合を、線分図で読み取ります。" },
    standard: { label: "標準", rateHundredths: [15,25,35,45,55,65,75,85,95], multipliers: [1,2,3,4,5,6], counts: [4,6,8], description: "小数第2位までの割合で、3つの求め方を混合します。" },
    advanced: { label: "発展", rateHundredths: [12,18,24,32,48,72,105,125,150,175,225], multipliers: [1,2,3,4,5,6], counts: [4,6,8], description: "1をこえる割合も含め、線分の長さの関係から判断します。" }
  }
};

function gcdRateLine(a,b){ let x=Math.abs(a), y=Math.abs(b); while(y!==0){ [x,y]=[y,x%y]; } return x; }
function formatRateLine(r){ return (r/100).toFixed(2).replace(/0+$/,"").replace(/\.$/,""); }

function buildRateLinePool(settings){
  const relations=[];
  settings.rateHundredths.forEach((rh)=>{
    const d=gcdRateLine(rh,100), bu=100/d, cu=rh/d, numericRate=rh/100, rate=formatRateLine(rh);
    settings.multipliers.forEach((m)=>{
      const base=bu*m, compared=cu*m;
      if(!Number.isInteger(base)||!Number.isInteger(compared)||base<=0||compared<=0) return;
      if(Math.abs(compared/base-numericRate)>1e-9||Math.abs(base*numericRate-compared)>1e-9||Math.abs(compared/numericRate-base)>1e-9) return;
      relations.push({base,compared,rate,numericRate,relationKey:`${base}:${compared}:${rate}`});
    });
  });
  return shuffle(relations);
}

function rateLineTargets(count){
  const kinds=shuffle(["rate","compared","base"]);
  const targets={rate:Math.floor(count/3),compared:Math.floor(count/3),base:Math.floor(count/3)};
  for(let i=0;i<count%3;i+=1) targets[kinds[i]]+=1;
  return targets;
}

function selectRateLineQuestions(relations,count){
  const targets=rateLineTargets(count), kinds=[];
  Object.keys(targets).forEach((kind)=>{ for(let i=0;i<targets[kind];i+=1) kinds.push(kind); });
  const selected=[], seenRelations=new Set(); let position=0;
  for(const kind of shuffle(kinds)){
    while(position<relations.length&&seenRelations.has(relations[position].relationKey)) position+=1;
    if(position>=relations.length) return [];
    const relation=relations[position++];
    seenRelations.add(relation.relationKey);
    selected.push({...relation,kind});
  }
  return shuffle(selected);
}

function makeSvgElement(tag,attributes={},text=""){
  const node=document.createElementNS("http://www.w3.org/2000/svg",tag);
  Object.entries(attributes).forEach(([key,value])=>node.setAttribute(key,String(value)));
  if(text!=="") node.textContent=text;
  return node;
}

function rateLineValueText(question,field){
  if(question.kind===field) return "□";
  if(field==="base") return String(question.base);
  if(field==="compared") return String(question.compared);
  return String(question.rate);
}

function buildRateLineSvg(question){
  const svg=makeSvgElement("svg",{viewBox:"0 0 620 150",class:"rate-line-svg",role:"img","aria-label":"割合の線分図"});
  const startX=145, maxLength=390, scale=maxLength/Math.max(1,question.numericRate);
  const baseLength=scale, comparedLength=scale*question.numericRate;
  const baseEnd=startX+baseLength, comparedEnd=startX+comparedLength;
  const baseY=45, comparedY=100;

  svg.append(
    makeSvgElement("text",{x:15,y:baseY+5,class:"line-name"},"もとにする量"),
    makeSvgElement("text",{x:15,y:comparedY+5,class:"line-name"},"比べる量"),
    makeSvgElement("line",{x1:startX,y1:baseY,x2:baseEnd,y2:baseY,class:"main-line"}),
    makeSvgElement("line",{x1:startX,y1:comparedY,x2:comparedEnd,y2:comparedY,class:"main-line"})
  );

  [[startX,baseY],[baseEnd,baseY],[startX,comparedY],[comparedEnd,comparedY]].forEach(([x,y])=>{
    svg.append(makeSvgElement("line",{x1:x,y1:y-8,x2:x,y2:y+8,class:"tick-line"}));
  });

  svg.append(
    makeSvgElement("text",{x:(startX+baseEnd)/2,y:baseY-12,"text-anchor":"middle",class:"value-label"},rateLineValueText(question,"base")),
    makeSvgElement("text",{x:(startX+comparedEnd)/2,y:comparedY-12,"text-anchor":"middle",class:"value-label"},rateLineValueText(question,"compared"))
  );

  const rateBoxX=545;
  svg.append(
    makeSvgElement("text",{x:rateBoxX,y:67,class:"rate-caption"},"割合"),
    makeSvgElement("text",{x:rateBoxX,y:89,class:"rate-label"},rateLineValueText(question,"rate"))
  );

  return svg;
}

function rateLineAnswer(question){
  if(question.kind==="rate") return {label:"割合",answer:question.rate,explanation:`割合＝比べる量÷もとにする量なので、${question.compared}÷${question.base}＝${question.rate}。`};
  if(question.kind==="compared") return {label:"比べる量",answer:question.compared,explanation:`比べる量＝もとにする量×割合なので、${question.base}×${question.rate}＝${question.compared}。`};
  return {label:"もとにする量",answer:question.base,explanation:`もとにする量＝比べる量÷割合なので、${question.compared}÷${question.rate}＝${question.base}。`};
}

function makeRateLineDiagramWorksheet(){
  const definition=worksheetDefinitions["rate-line-diagram"], settings=definition.difficulties[difficultySelect.value], count=Number(countSelect.value);
  if(!Number.isInteger(count)||count<=0){ statusMessage.textContent="問題数を正しく選んでください。"; return; }
  const selected=selectRateLineQuestions(buildRateLinePool(settings),count);
  if(selected.length<count){ statusMessage.textContent="この設定では重複なしで指定した問題数を作成できません。"; return; }

  const questionFragment=document.createDocumentFragment(), answerFragment=document.createDocumentFragment();
  selected.forEach((question,index)=>{
    const number=index+1, wrapper=document.createElement("div"), prompt=document.createElement("p");
    wrapper.className="rate-line-question"; prompt.className="rate-line-prompt"; prompt.textContent=`${number}. □に入る数を求めましょう。`;
    wrapper.append(prompt,buildRateLineSvg(question)); questionFragment.appendChild(wrapper);

    const data=rateLineAnswer(question), answer=document.createElement("p"), main=document.createElement("b"), explanation=document.createElement("span");
    main.textContent=`${number}. ${data.label} ${data.answer}`; explanation.className="answer-explanation"; explanation.textContent=`解説：${data.explanation}`;
    answer.append(main,document.createElement("br"),explanation); answerFragment.appendChild(answer);
  });

  questionsElement.replaceChildren(questionFragment); answersElement.replaceChildren(answerFragment);
  worksheetDifficulty.textContent=`難易度：${settings.label}`; worksheetCount.textContent=`問題数：${count}問`;
  statusMessage.textContent=`割合の線分図・${settings.label}を${count}問、重複なしで作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({behavior:"smooth",block:"start"});
}

createButton.addEventListener("click",(event)=>{
  if(worksheetTypeSelect.value!=="rate-line-diagram") return;
  event.stopImmediatePropagation();
  makeRateLineDiagramWorksheet();
},true);
