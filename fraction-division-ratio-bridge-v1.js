"use strict";

(() => {
  const typeSelect = document.getElementById("worksheetType");
  const difficultySelect = document.getElementById("difficulty");
  const countSelect = document.getElementById("count");
  const createButton = document.getElementById("createButton");
  const questions = document.getElementById("questions");
  const answers = document.getElementById("answers");
  const problemTitle = document.getElementById("problemTitle");
  const instruction = document.getElementById("instruction");
  const answerNote = document.getElementById("answerNote");
  const countGuide = document.getElementById("countGuide");
  const difficultyTitle = document.getElementById("difficultyTitle");
  const difficultyDescription = document.getElementById("difficultyDescription");
  const worksheetDifficulty = document.getElementById("worksheetDifficulty");
  const worksheetCount = document.getElementById("worksheetCount");
  const statusMessage = document.getElementById("statusMessage");
  const problemPage = document.querySelector(".problem-page");
  const answerPage = document.querySelector(".answer-page");
  const answerTitle = answerPage?.querySelector(".worksheet-heading h2");

  if (!typeSelect || !difficultySelect || !countSelect || !createButton || !questions || !answers) return;

  const TYPES = {
    "bridge-fraction-to-division": {
      step: 1,
      title: "① 分数 → わり算",
      instruction: "次の分数を、分子÷分母のわり算で表しましょう。",
      description: "分数を『分子÷分母』へ変換します。",
      mode: "fraction-to-division",
      long: false
    },
    "bridge-division-to-fraction": {
      step: 2,
      title: "② わり算 → 分数",
      instruction: "次のわり算を分数で表しましょう。約分はしません。",
      description: "わり算を『分子／分母』へ逆変換します。",
      mode: "division-to-fraction",
      long: false
    },
    "bridge-division-to-fraction-reduce": {
      step: 3,
      title: "③ わり算 → 分数 → 約分",
      instruction: "わり算を分数に直したあと、約分しましょう。",
      description: "表現変換と約分を2段階に分けて処理します。",
      mode: "division-to-fraction-reduce",
      long: false
    },
    "bridge-ratio-to-fraction": {
      step: 4,
      title: "④ 比 → 比の値（分数）",
      instruction: "次の比の値を分数で表しましょう。前の数が分子、後ろの数が分母です。",
      description: "A：Bの比の値をA／Bとして表します。",
      mode: "ratio-to-fraction",
      long: false
    },
    "bridge-ratio-to-fraction-reduce": {
      step: 5,
      title: "⑤ 比 → 比の値 → 約分",
      instruction: "比の値を分数にしたあと、約分しましょう。",
      description: "比→分数→約分の順で処理します。",
      mode: "ratio-to-fraction-reduce",
      long: false
    },
    "bridge-three-representations-guided": {
      step: 6,
      title: "⑥ わり算・分数・比の値をつなぐ",
      instruction: "わり算を分数に直し、同じA：Bの比の値とつながることを確かめましょう。",
      description: "比を提示したまま、わり算＝分数＝比の値を統合します。",
      mode: "three-guided",
      long: true
    },
    "bridge-three-representations-open": {
      step: 7,
      title: "⑦ わり算・分数・比の値を自力でつなぐ",
      instruction: "わり算と同じ値になる分数と比を書き、3つの表し方をつなぎましょう。",
      description: "分数だけでなく、同じ値を表す比まで自力で生成します。",
      mode: "three-open",
      long: true
    }
  };

  const FRACTION_TO_DIVISION = [
    [2,3],[3,4],[4,5],[5,6],[7,8],[2,5],[3,7],[5,9],[4,7],[6,11],
    [7,3],[8,3],[10,3],[11,4],[13,4],[15,4],[17,4],[19,5],[21,5],[23,6],
    [25,6],[29,6],[31,7],[33,7],[37,8],[41,8],[43,9],[47,9],[49,10],[53,10]
  ];

  const DIVISION_NO_REDUCE = [
    [2,3],[3,4],[4,5],[5,6],[7,8],[8,9],[2,5],[3,7],[5,8],[7,9],
    [7,3],[8,3],[10,3],[11,3],[14,3],[11,4],[13,4],[15,4],[17,4],[19,4],
    [14,5],[16,5],[17,5],[18,5],[19,5],[17,6],[19,6],[23,6],[25,6],[29,6]
  ];

  const DIVISION_REDUCE = [
    [6,4],[8,6],[9,6],[10,6],[12,8],[14,10],[15,10],[16,12],[18,12],[20,12],
    [21,14],[22,14],[24,16],[25,15],[26,18],[27,18],[28,20],[30,18],[32,24],[33,22],
    [34,26],[35,25],[36,24],[38,26],[39,26],[40,28],[42,30],[44,28],[45,30],[46,34]
  ];

  const RATIO_NO_REDUCE = [
    [2,3],[3,4],[4,5],[5,6],[7,8],[2,5],[3,7],[5,8],[7,9],[8,11],
    [5,3],[7,4],[8,5],[10,7],[11,8],[13,10],[14,11],[15,13],[17,12],[19,14],
    [12,7],[13,8],[14,9],[15,11],[16,13],[17,14],[19,15],[20,17],[21,16],[23,18]
  ];

  const RATIO_REDUCE = [
    [4,6],[6,8],[8,10],[9,12],[10,14],[12,16],[14,18],[15,20],[16,24],[18,24],
    [20,28],[21,30],[22,26],[24,30],[25,35],[26,34],[27,36],[28,42],[30,44],[32,40],
    [33,45],[34,46],[35,49],[36,48],[38,50],[39,52],[40,56],[42,54],[44,60],[45,63]
  ];

  const isBridgeType = (value = typeSelect.value) => Object.hasOwn(TYPES, value);

  function gcd(a, b) {
    let x = Math.abs(a), y = Math.abs(b);
    while (y !== 0) [x, y] = [y, x % y];
    return x;
  }

  function reduce(a, b) {
    const d = gcd(a, b);
    return [a / d, b / d];
  }

  function makeNumber(number) {
    const span = document.createElement("span");
    span.className = "bridge-number";
    span.textContent = String(number);
    return span;
  }

  function makeFraction(numerator, denominator, blank = false) {
    const fraction = document.createElement("span");
    fraction.className = `bridge-fraction${blank ? " bridge-fraction-blank" : ""}`;
    const top = document.createElement("span");
    top.className = "bridge-fraction-top";
    const bottom = document.createElement("span");
    bottom.className = "bridge-fraction-bottom";
    top.textContent = blank ? "" : String(numerator);
    bottom.textContent = blank ? "" : String(denominator);
    fraction.append(top, bottom);
    return fraction;
  }

  function text(value, className = "") {
    const span = document.createElement("span");
    if (className) span.className = className;
    span.textContent = value;
    return span;
  }

  function makeRatioBlank() {
    const wrap = document.createElement("span");
    wrap.className = "bridge-ratio-blank";
    const a = document.createElement("span");
    a.className = "bridge-small-box";
    const b = document.createElement("span");
    b.className = "bridge-small-box";
    wrap.append(a, text("："), b);
    return wrap;
  }

  function dataFor(mode) {
    if (mode === "fraction-to-division") return FRACTION_TO_DIVISION;
    if (mode === "division-to-fraction") return DIVISION_NO_REDUCE;
    if (mode === "division-to-fraction-reduce") return DIVISION_REDUCE;
    if (mode === "ratio-to-fraction") return RATIO_NO_REDUCE;
    if (mode === "ratio-to-fraction-reduce") return RATIO_REDUCE;
    return RATIO_NO_REDUCE;
  }

  function configure() {
    const def = TYPES[typeSelect.value];
    if (!def) return;

    problemPage.classList.add("fraction-ratio-bridge-page");
    answerPage.classList.add("fraction-ratio-bridge-answer-page");
    questions.classList.add("fraction-ratio-bridge-questions");
    answers.classList.add("fraction-ratio-bridge-answers");
    questions.classList.toggle("bridge-long", def.long);

    countSelect.replaceChildren();
    [10, 20, 30].forEach((count) => {
      const option = document.createElement("option");
      option.value = String(count);
      option.textContent = `${count}問`;
      if (count === 30) option.selected = true;
      countSelect.appendChild(option);
    });

    difficultySelect.value = "basic";
    problemTitle.textContent = def.title;
    if (answerTitle) answerTitle.textContent = "解答";
    instruction.textContent = def.instruction;
    answerNote.textContent = "同じ数量関係を、わり算・分数・比の値という別の表し方へ変換して確認します。";
    countGuide.textContent = "10問・20問・30問から選べます。段階⑥・⑦は2列で表示します。";
    difficultyTitle.textContent = `接続シリーズ ${def.step}/7`;
    difficultyDescription.textContent = def.description;
    worksheetDifficulty.textContent = `段階：${def.step}/7`;
    worksheetCount.textContent = `問題数：${countSelect.value}問`;
    questions.textContent = "まだ問題はありません。";
    answers.textContent = "まだ解答はありません。";
    statusMessage.textContent = `${def.title} に切り替えました。`;
  }

  function buildProblem(mode, a, b) {
    const line = document.createElement("span");
    line.className = "bridge-expression";

    if (mode === "fraction-to-division") {
      line.append(makeFraction(a, b), text("＝"), text("　　　　", "bridge-write-line"));
    } else if (mode === "division-to-fraction") {
      line.append(text(`${a} ÷ ${b} ＝`), makeFraction(null, null, true));
    } else if (mode === "division-to-fraction-reduce") {
      line.append(text(`${a} ÷ ${b} ＝`), makeFraction(a, b), text("＝"), makeFraction(null, null, true));
    } else if (mode === "ratio-to-fraction") {
      line.append(text(`${a}：${b} の比の値 ＝`), makeFraction(null, null, true));
    } else if (mode === "ratio-to-fraction-reduce") {
      line.append(text(`${a}：${b} の比の値 ＝`), makeFraction(a, b), text("＝"), makeFraction(null, null, true));
    } else if (mode === "three-guided") {
      line.append(text(`${a} ÷ ${b} ＝`), makeFraction(null, null, true), text(`＝ ${a}：${b} の比の値`));
    } else {
      line.append(text(`${a} ÷ ${b} ＝`), makeFraction(null, null, true), text("＝"), makeRatioBlank(), text("の比の値"));
    }
    return line;
  }

  function answerTextFor(mode, a, b) {
    const [ra, rb] = reduce(a, b);
    if (mode === "fraction-to-division") return `${a}÷${b}`;
    if (mode === "division-to-fraction") return `${a}/${b}`;
    if (mode === "division-to-fraction-reduce") return `${a}/${b}＝${ra}/${rb}`;
    if (mode === "ratio-to-fraction") return `${a}/${b}`;
    if (mode === "ratio-to-fraction-reduce") return `${a}/${b}＝${ra}/${rb}`;
    if (mode === "three-guided") return `${a}÷${b}＝${a}/${b}＝${a}：${b}の比の値`;
    return `${a}÷${b}＝${a}/${b}＝${a}：${b}の比の値`;
  }

  function makeWorksheet() {
    const def = TYPES[typeSelect.value];
    if (!def) return;
    const count = Number(countSelect.value);
    const source = dataFor(def.mode);
    if (![10,20,30].includes(count) || source.length < count) {
      statusMessage.textContent = "指定した問題数を作成できません。";
      return;
    }

    const qf = document.createDocumentFragment();
    const af = document.createDocumentFragment();
    source.slice(0, count).forEach(([a, b], index) => {
      const item = document.createElement("div");
      item.className = "bridge-item";
      item.append(makeNumber(index + 1), buildProblem(def.mode, a, b));
      qf.appendChild(item);

      const ans = document.createElement("div");
      ans.className = "bridge-answer-item";
      ans.append(makeNumber(index + 1), text(answerTextFor(def.mode, a, b), "bridge-answer-value"));
      af.appendChild(ans);
    });

    questions.replaceChildren(qf);
    answers.replaceChildren(af);
    worksheetCount.textContent = `問題数：${count}問`;
    statusMessage.textContent = `${def.title}を${count}問作成しました。`;
    problemPage.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  typeSelect.addEventListener("change", (event) => {
    if (!isBridgeType(event.target.value)) return;
    event.stopImmediatePropagation();
    configure();
  }, true);

  difficultySelect.addEventListener("change", (event) => {
    if (!isBridgeType()) return;
    event.stopImmediatePropagation();
    difficultySelect.value = "basic";
  }, true);

  countSelect.addEventListener("change", (event) => {
    if (!isBridgeType()) return;
    worksheetCount.textContent = `問題数：${countSelect.value}問`;
  }, true);

  createButton.addEventListener("click", (event) => {
    if (!isBridgeType()) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    makeWorksheet();
  }, true);
})();
