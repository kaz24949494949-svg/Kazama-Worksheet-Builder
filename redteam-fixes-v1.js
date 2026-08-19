"use strict";

(() => {
  const BRIDGE_TYPES = {
    "multiple-rate-bridge-01": { level: 1, label: "接続編①｜AはBの○倍→式", title: "倍数視覚化ワーク　接続編①　文章題から式を作ろう（レベル1）" },
    "multiple-rate-bridge-02": { level: 2, label: "接続編②｜具体名→式", title: "倍数視覚化ワーク　接続編②　文章題から式を作ろう（レベル2）" },
    "multiple-rate-bridge-03": { level: 3, label: "接続編③｜基準数値を式へ", title: "倍数視覚化ワーク　接続編③　文章題から式を作ろう（レベル3）" },
    "multiple-rate-bridge-04": { level: 4, label: "接続編④｜式を自力生成", title: "倍数視覚化ワーク　接続編④　文章題から式を作ろう（レベル4）" },
    "multiple-rate-bridge-05": { level: 5, label: "接続編⑤｜式＋答え", title: "倍数視覚化ワーク　接続編⑤　文章題から式と答えを作ろう（レベル5）" },
    "multiple-rate-bridge-06": { level: 6, label: "接続編⑥｜くらべる量・もとにする量", title: "倍数視覚化ワーク　接続編⑥　くらべる量・もとにする量を見つけよう（レベル6）" },
    "multiple-rate-bridge-07": { level: 7, label: "接続編⑦｜具体式→役割の式", title: "倍数視覚化ワーク　接続編⑦　具体的な式を、量の役割を表す式に変えよう（レベル7）" },
    "multiple-rate-bridge-08": { level: 8, label: "接続編⑧｜役割の式→倍の文", title: "倍数視覚化ワーク　接続編⑧　役割の式を、倍の文に変えよう（レベル8）" },
    "multiple-rate-bridge-09": { level: 9, label: "接続編⑨｜倍の文↔役割の式", title: "倍数視覚化ワーク　接続編⑨　倍の文と役割の式を行き来しよう（レベル9）" },
    "multiple-rate-bridge-10": { level: 10, label: "接続編⑩｜式の中の割合", title: "倍数視覚化ワーク　接続編⑩　式の中の「割合」を見つけよう（レベル10）" },
    "multiple-rate-bridge-11": { level: 11, label: "接続編⑪｜割合1", title: "倍数視覚化ワーク　接続編⑪　割合が1のときを考えよう（レベル11）" },
    "multiple-rate-bridge-12": { level: 12, label: "接続編⑫｜割合0.5", title: "倍数視覚化ワーク　接続編⑫　割合が0.5のときを考えよう（レベル12）" }
  };

  const type = document.getElementById("worksheetType");
  if (!type) return;

  if (!type.querySelector('option[value="multiple-rate-bridge-01"]')) {
    const group = document.createElement("optgroup");
    group.label = "算数｜倍数→割合 接続";
    Object.entries(BRIDGE_TYPES).forEach(([value, cfg]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = `${String(cfg.level).padStart(2, "0")} ${cfg.label}`;
      group.appendChild(option);
    });
    type.appendChild(group);
  }

  if (!document.getElementById("multiple-rate-bridge-style")) {
    const style = document.createElement("style");
    style.id = "multiple-rate-bridge-style";
    style.textContent = `
      .multiple-rate-bridge-page .student-info{display:none!important}
      .multiple-rate-bridge-list{display:grid;gap:8px}
      .multiple-rate-bridge-item{border-bottom:1px solid #bbb;padding:7px 4px 10px;break-inside:avoid}
      .multiple-rate-bridge-qline,.multiple-rate-bridge-workline{display:flex;align-items:center;gap:10px;line-height:1.6}
      .multiple-rate-bridge-qline{font-size:15px;margin-bottom:4px}
      .multiple-rate-bridge-workline{font-size:15px;padding-left:34px;min-height:32px}
      .multiple-rate-bridge-num{font-weight:700;min-width:28px}
      .multiple-rate-bridge-box{display:inline-flex;align-items:center;justify-content:center;border:1.5px solid #222;min-width:58px;height:31px;padding:0 8px;background:#fff}
      .multiple-rate-bridge-wide{min-width:180px}.multiple-rate-bridge-long{min-width:250px}
      .multiple-rate-bridge-role{display:grid;grid-template-columns:auto 1fr auto 1fr;gap:8px 10px;align-items:center;padding-left:34px;font-size:14px}
      .multiple-rate-bridge-answer{font-size:15px;line-height:1.6;margin:0;padding:5px 0;border-bottom:1px solid #ddd}
      @media print{.multiple-rate-bridge-item{padding:5px 2px 7px}.multiple-rate-bridge-qline,.multiple-rate-bridge-workline{font-size:12.5pt}.multiple-rate-bridge-role,.multiple-rate-bridge-answer{font-size:11.5pt}}
    `;
    document.head.appendChild(style);
  }

  const byId = (id) => document.getElementById(id);
  const diff = byId("difficulty"), count = byId("count"), create = byId("createButton");
  const qs = byId("questions"), answers = byId("answers"), title = byId("problemTitle"), inst = byId("instruction"), note = byId("answerNote");
  const guide = byId("countGuide"), dTitle = byId("difficultyTitle"), dDesc = byId("difficultyDescription"), wDiff = byId("worksheetDifficulty"), wCount = byId("worksheetCount"), status = byId("statusMessage");
  const pPage = document.querySelector(".problem-page"), aPage = document.querySelector(".answer-page");
  const isBridge = (v = type.value) => Object.hasOwn(BRIDGE_TYPES, v);

  const M = [2,3,4,5,6,7,8,9,10,3];
  const CONTEXTS = [
    { sentence:(m)=>`みかんは4こあります。りんごは、みかんの${m}倍あります。`, compare:"りんごの数", base:"みかんの数", target:"りんご", baseName:"みかん", baseValue:4, unit:"こ" },
    { sentence:(m)=>`青いテープは5cmです。赤いテープは、青いテープの${m}倍の長さです。`, compare:"赤いテープの長さ", base:"青いテープの長さ", target:"赤いテープ", baseName:"青いテープ", baseValue:5, unit:"cm" },
    { sentence:(m)=>`弟はカードを6枚持っています。兄は、弟の${m}倍の枚数を持っています。`, compare:"兄のカードの枚数", base:"弟のカードの枚数", target:"兄のカード", baseName:"弟のカード", baseValue:6, unit:"枚" },
    { sentence:(m)=>`小さい箱は3kgです。大きい箱は、小さい箱の${m}倍の重さです。`, compare:"大きい箱の重さ", base:"小さい箱の重さ", target:"大きい箱", baseName:"小さい箱", baseValue:3, unit:"kg" },
    { sentence:(m)=>`昨日は4ページ読みました。今日は、昨日の${m}倍のページ数を読みました。`, compare:"今日読んだページ数", base:"昨日読んだページ数", target:"今日", baseName:"昨日", baseValue:4, unit:"ページ" },
    { sentence:(m)=>`白いリボンは2cmです。赤いリボンは、白いリボンの${m}倍の長さです。`, compare:"赤いリボンの長さ", base:"白いリボンの長さ", target:"赤いリボン", baseName:"白いリボン", baseValue:2, unit:"cm" },
    { sentence:(m)=>`ねこは3kgです。犬は、ねこの${m}倍の重さです。`, compare:"犬の体重", base:"ねこの体重", target:"犬", baseName:"ねこ", baseValue:3, unit:"kg" },
    { sentence:(m)=>`小さい水そうには2Lの水があります。大きい水そうには、その${m}倍の水があります。`, compare:"大きい水そうの水の量", base:"小さい水そうの水の量", target:"大きい水そう", baseName:"小さい水そう", baseValue:2, unit:"L" },
    { sentence:(m)=>`短いひもは3cmです。長いひもは、短いひもの${m}倍の長さです。`, compare:"長いひもの長さ", base:"短いひもの長さ", target:"長いひも", baseName:"短いひも", baseValue:3, unit:"cm" },
    { sentence:(m)=>`女子は5人います。男子は、女子の${m}倍います。`, compare:"男子の人数", base:"女子の人数", target:"男子", baseName:"女子", baseValue:5, unit:"人" }
  ];

  function bridgeCopy(level) {
    return {
      1:["つぎの文を読んで、式を作りましょう。※計算はしません。","「○倍」→「×○」の対応を確認します。"],
      2:["つぎの文を読んで、式を作りましょう。※計算はしません。","具体的な対象名を保ったまま式にします。"],
      3:["つぎの文を読んで、式を作りましょう。※計算はしません。","基準となる数値と倍数を式に入れます。"],
      4:["つぎの文を読んで、式を作りましょう。※計算はしません。","式の骨組みも自分で作ります。"],
      5:["つぎの文を読んで、式を作り、答えを出しましょう。","文章→式→答えまでを一連で処理します。"],
      6:["つぎの文を読んで、2つの量の役割を見つけましょう。","対象名ではなく「数・長さ・重さ・人数」まで量として書きます。"],
      7:["上の式と同じ関係になるように、下の式の□に入る数を書きましょう。","上の式の左側が「くらべる量」、右側が「もとにする量」です。"],
      8:["上の式を見て、下の文の□に入る数を書きましょう。","×の後ろの数が「何倍か」を表すことを確認します。"],
      9:["上の文または式を見て、下の□に入る数を書きましょう。","文と式の両方で同じ「何倍か」を表しています。"],
      10:["上の式を見て、「割合」にあたる数を□に書きましょう。","「くらべる量＝もとにする量×数」と表したとき、この数を「割合」といいます。"],
      11:["文や式を見て、□に入る数やことばを書きましょう。","くらべる量ともとにする量が同じ大きさのとき、割合は1です。"],
      12:["文や式を見て、□に入る数やことばを書きましょう。","「半分」と「0.5」が同じ関係を表すことを確かめます。"]
    }[level];
  }

  function clearBridge() {
    pPage?.classList.remove("multiple-rate-bridge-page"); aPage?.classList.remove("multiple-rate-bridge-page");
    qs?.classList.remove("multiple-rate-bridge-list"); answers?.classList.remove("multiple-rate-bridge-answers");
    if (diff) diff.disabled = false;
  }

  function controls() {
    const cfg = BRIDGE_TYPES[type.value], [instruction, answerNote] = bridgeCopy(cfg.level);
    clearBridge(); diff.disabled = true;
    count.replaceChildren(); const o=document.createElement("option"); o.value="10"; o.textContent="10問（固定）"; count.appendChild(o);
    title.textContent=cfg.title; inst.textContent=instruction; note.textContent=answerNote;
    dTitle.textContent=`レベル${cfg.level}`; dDesc.textContent="固定済みの段階設計です。難易度変更は行いません。";
    guide.textContent="固定版：10問。問題と解答を別ページで印刷できます。"; wDiff.textContent=`段階：レベル${cfg.level}`; wCount.textContent="問題数：10問";
    qs.textContent="まだ問題はありません。"; answers.textContent="まだ解答はありません。";
    qs.className="multiple-rate-bridge-list"; answers.className="multiple-rate-bridge-answers"; pPage.classList.add("multiple-rate-bridge-page"); aPage.classList.add("multiple-rate-bridge-page");
    status.textContent=`${cfg.label}に切り替えました。`;
  }

  function box(text="", extra="") { const s=document.createElement("span"); s.className=`multiple-rate-bridge-box ${extra}`.trim(); s.textContent=text; return s; }
  function item(i, topText) { const sec=document.createElement("section"); sec.className="multiple-rate-bridge-item"; const top=document.createElement("div"); top.className="multiple-rate-bridge-qline"; const n=document.createElement("span"); n.className="multiple-rate-bridge-num"; n.textContent=`${i+1}.`; const t=document.createElement("span"); t.textContent=topText; top.append(n,t); sec.appendChild(top); return sec; }
  function line(parts) { const d=document.createElement("div"); d.className="multiple-rate-bridge-workline"; parts.forEach((p)=>d.append(p instanceof Node?p:document.createTextNode(p))); return d; }
  function answer(i, value) { const p=document.createElement("p"); p.className="multiple-rate-bridge-answer"; const strong=document.createElement("strong"); strong.textContent=`${i+1}. `; p.append(strong,document.createTextNode(value)); return p; }

  function makeBridge() {
    const level=BRIDGE_TYPES[type.value].level, qf=document.createDocumentFragment(), af=document.createDocumentFragment();
    if (level===1) M.forEach((m,i)=>{const s=item(i,`AはBの${m}倍です。`);s.append(line(["式：A＝B×",box()]));qf.append(s);af.append(answer(i,`A＝B×${m}`));});
    else if (level===2) CONTEXTS.forEach((c,i)=>{const m=M[i], texts=[`りんごの数は、みかんの数の${m}倍です。`,`赤いテープの長さは、青いテープの長さの${m}倍です。`,`兄のカードの枚数は、弟のカードの枚数の${m}倍です。`,`大きい箱の重さは、小さい箱の重さの${m}倍です。`,`今日読んだページ数は、昨日読んだページ数の${m}倍です。`,`赤いリボンの長さは、白いリボンの長さの${m}倍です。`,`犬の体重は、ねこの体重の${m}倍です。`,`大きい水そうの水の量は、小さい水そうの水の量の${m}倍です。`,`長いひもの長さは、短いひもの長さの${m}倍です。`,`男子の人数は、女子の人数の${m}倍です。`],s=item(i,texts[i]);s.append(line([`式：${c.target}＝${c.baseName}×`,box()]));qf.append(s);af.append(answer(i,`${c.target}＝${c.baseName}×${m}`));});
    else if ([3,4,5].includes(level)) CONTEXTS.forEach((c,i)=>{const m=M[i],s=item(i,c.sentence(m)),eq=`${c.target}＝${c.baseValue}×${m}`;if(level===3)s.append(line([`式：${c.target}＝`,box(),"×",box()]));if(level===4)s.append(line(["式：",box("","multiple-rate-bridge-long")]));if(level===5)s.append(line(["式：",box("","multiple-rate-bridge-wide"),"　答え：",box()]));qf.append(s);af.append(answer(i,level===5?`${eq}　答え：${c.baseValue*m}${c.unit}`:eq));});
    else if (level===6) CONTEXTS.forEach((c,i)=>{const s=item(i,c.sentence(M[i])),r=document.createElement("div");r.className="multiple-rate-bridge-role";r.append(document.createTextNode("くらべる量："),box("","multiple-rate-bridge-wide"),document.createTextNode("もとにする量："),box("","multiple-rate-bridge-wide"));s.append(r);qf.append(s);af.append(answer(i,`くらべる量：${c.compare}　／　もとにする量：${c.base}`));});
    else if (level===7) CONTEXTS.forEach((c,i)=>{const m=M[i],s=item(i,`${c.compare} ＝ ${c.base} × ${m}`);s.append(line(["くらべる量 ＝ もとにする量 ×",box()]));qf.append(s);af.append(answer(i,`くらべる量＝もとにする量×${m}`));});
    else if (level===8) M.forEach((m,i)=>{const s=item(i,`くらべる量 ＝ もとにする量 × ${m}`);s.append(line(["くらべる量は、もとにする量の",box(),"倍です。"]));qf.append(s);af.append(answer(i,`${m}倍`));});
    else if (level===9) {const dirs=["文式","文式","式文","文式","式文","式文","文式","式文","文式","式文"];M.forEach((m,i)=>{const forward=dirs[i]==="文式",s=item(i,forward?`くらべる量は、もとにする量の${m}倍です。`:`くらべる量 ＝ もとにする量 × ${m}`);s.append(line(forward?["くらべる量 ＝ もとにする量 ×",box()]:["くらべる量は、もとにする量の",box(),"倍です。"]));qf.append(s);af.append(answer(i,String(m)));});}
    else if (level===10) M.forEach((m,i)=>{const s=item(i,`くらべる量 ＝ もとにする量 × ${m}`);s.append(line(["割合 ＝",box()]));qf.append(s);af.append(answer(i,`割合＝${m}`));});
    else if (level===11) {const kinds=["same","ratio","same","same","ratio","same","ratio","same","same","ratio"],texts=["りんごの数は、みかんの数と同じです。","","兄のカードの枚数は、弟のカードの枚数と同じです。","大きい箱の重さは、小さい箱の重さと同じです。","","赤いリボンの長さは、白いリボンの長さと同じです。","","大きい水そうの水の量は、小さい水そうの水の量と同じです。","長いひもの長さは、短いひもの長さと同じです。",""];kinds.forEach((k,i)=>{const same=k==="same",s=item(i,same?texts[i]:"くらべる量 ＝ もとにする量 × 1");s.append(line(same?["くらべる量 ＝ もとにする量 ×",box()]:["くらべる量ともとにする量の大きさは",box("","multiple-rate-bridge-wide"),"です。"]));qf.append(s);af.append(answer(i,same?"1":"同じ"));});}
    else if (level===12) {const kinds=["half","ratio","half","half","ratio","half","ratio","half","half","ratio"],texts=["りんごの数は、みかんの数の半分です。","","赤いテープの長さは、青いテープの長さの半分です。","兄のカードの枚数は、弟のカードの枚数の半分です。","","大きい箱の重さは、小さい箱の重さの半分です。","","今日読んだページ数は、昨日読んだページ数の半分です。","男子の人数は、女子の人数の半分です。",""];kinds.forEach((k,i)=>{const half=k==="half",s=item(i,half?texts[i]:"くらべる量 ＝ もとにする量 × 0.5");s.append(line(half?["くらべる量 ＝ もとにする量 ×",box()]:["くらべる量は、もとにする量の",box("","multiple-rate-bridge-wide"),"です。"]));qf.append(s);af.append(answer(i,half?"0.5":"半分"));});}
    qs.replaceChildren(qf);answers.replaceChildren(af);status.textContent=`${BRIDGE_TYPES[type.value].label}を固定版10問で作成しました。`;pPage.scrollIntoView({behavior:"smooth",block:"start"});
  }

  type.addEventListener("change",(e)=>{if(isBridge(e.target.value)){e.stopImmediatePropagation();controls();}else clearBridge();},true);
  create?.addEventListener("click",(e)=>{if(!isBridge())return;e.preventDefault();e.stopImmediatePropagation();makeBridge();},true);
})();

document.addEventListener("DOMContentLoaded", () => {
  const patchLibrary = (contexts) => {
    if (!Array.isArray(contexts)) return;
    const item = contexts.find((x) => x && x.id === "library");
    if (!item) return;
    item.base = "図書館が所蔵している本";
    item.compared = "貸し出されている本";
  };

  if (typeof rateWordContexts !== "undefined") patchLibrary(rateWordContexts);
  if (typeof rateBridgeContexts !== "undefined") patchLibrary(rateBridgeContexts);
  if (typeof rateCompleteContexts !== "undefined") patchLibrary(rateCompleteContexts);
  if (typeof rateDrawContexts !== "undefined") patchLibrary(rateDrawContexts);
  if (typeof rateSelfContexts !== "undefined") patchLibrary(rateSelfContexts);
  if (typeof rateSelectContexts !== "undefined") patchLibrary(rateSelectContexts);

  if (typeof rateTwoStepContexts !== "undefined") {
    const item = rateTwoStepContexts.find((x) => x && x.id === "library");
    if (item) {
      item.base = "図書館が所蔵している本";
      item.compared = "物語の本";
      item.baseParts = ["A書庫で管理している本", "B書庫で管理している本"];
      item.comparedParts = ["A書庫で管理している物語の本", "B書庫で管理している物語の本"];
    }
  }

  if (typeof worksheetDefinitions !== "undefined" && worksheetDefinitions["rate-percent"]?.difficulties?.advanced) {
    worksheetDefinitions["rate-percent"].difficulties.advanced.description = "5％・10％刻みに限らない割合や、100％をこえる割合も扱います。";
  }

  if (typeof buildRateDecimalPool === "function") {
    const original = buildRateDecimalPool;
    buildRateDecimalPool = (settings) => {
      const seen = new Set();
      return original(settings).filter((q) => {
        const key = `${q.base}:${q.compared}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    };
  }
});
