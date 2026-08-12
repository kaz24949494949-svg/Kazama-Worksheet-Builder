"use strict";

worksheetDefinitions["rate-word-problems"] = {
  label: "割合の文章題",
  title: "割合の文章題 ― 何を求めるか見分けよう",
  instruction: "文章を読んで、□に入る数を求めましょう。もとにする量・比べる量・割合の関係を考えて式を選びましょう。",
  answerNote: "文章の中から、もとにする量・比べる量・割合を見つけます。割合＝比べる量÷もとにする量、比べる量＝もとにする量×割合、もとにする量＝比べる量÷割合、を使い分けます。",
  type: "math",
  difficulties: {
    basic: {
      label: "基礎",
      rateHundredths: [20, 30, 40, 50, 60, 70, 80, 90],
      multipliers: [1, 2, 3, 4, 5],
      counts: [5, 10],
      description: "短い文章から、もとにする量・比べる量・割合を見つけます。"
    },
    standard: {
      label: "標準",
      rateHundredths: [15, 25, 35, 45, 55, 65, 75, 85, 95],
      multipliers: [1, 2, 3, 4, 5, 6],
      counts: [5, 10, 15],
      description: "小数第2位までの割合を含む文章題で、3つの求め方を使い分けます。"
    },
    advanced: {
      label: "発展",
      rateHundredths: [12, 18, 24, 32, 48, 72, 105, 125, 150, 175, 225],
      multipliers: [1, 2, 3, 4, 5, 6],
      counts: [5, 10, 15],
      description: "1をこえる割合も含む文章題で、関係を自分で判断します。"
    }
  }
};

const rateWordContexts = [
  { id: "library", mode: "part", base: "図書館にある本", compared: "貸し出されている本", unit: "冊" },
  { id: "flower", mode: "part", base: "花だんに植えた花", compared: "赤い花", unit: "株" },
  { id: "class", mode: "part", base: "クラスの児童", compared: "めがねをかけている児童", unit: "人" },
  { id: "ball", mode: "part", base: "箱に入っているボール", compared: "赤いボール", unit: "個" },
  { id: "vegetable", mode: "part", base: "畑でとれた野菜の重さ", compared: "出荷した野菜の重さ", unit: "kg" },
  { id: "tank", mode: "part", base: "水そうに入る水の量", compared: "今入っている水の量", unit: "L" },
  { id: "steps", mode: "comparison", base: "ある日の目標歩数", compared: "実際に歩いた歩数", unit: "歩" },
  { id: "cans", mode: "comparison", base: "去年集めた空き缶の数", compared: "今年集めた空き缶の数", unit: "個" },
  { id: "books-week", mode: "comparison", base: "先週読んだ本の数", compared: "今週読んだ本の数", unit: "冊" },
  { id: "distance", mode: "comparison", base: "昨日走った距離", compared: "今日走った距離", unit: "km" }
];

function gcdRateWord(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

function formatRateWord(rateHundredths) {
  return (rateHundredths / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function buildRateWordPool(settings) {
  const relations = [];

  settings.rateHundredths.forEach((rateHundredths) => {
    const divisor = gcdRateWord(rateHundredths, 100);
    const baseUnit = 100 / divisor;
    const comparedUnit = rateHundredths / divisor;
    const rate = formatRateWord(rateHundredths);
    const numericRate = rateHundredths / 100;

    settings.multipliers.forEach((multiplier) => {
      const base = baseUnit * multiplier;
      const compared = comparedUnit * multiplier;

      if (!Number.isInteger(base) || !Number.isInteger(compared) || base <= 0 || compared <= 0) return;
      if (Math.abs(compared / base - numericRate) > 1e-9) return;
      if (Math.abs(base * numericRate - compared) > 1e-9) return;
      if (Math.abs(compared / numericRate - base) > 1e-9) return;

      relations.push({
        base,
        compared,
        rate,
        numericRate,
        relationKey: `${base}:${compared}:${rate}`
      });
    });
  });

  return shuffle(relations);
}

function rateWordTargets(count) {
  const kinds = shuffle(["rate", "compared", "base"]);
  const targets = {
    rate: Math.floor(count / 3),
    compared: Math.floor(count / 3),
    base: Math.floor(count / 3)
  };

  for (let i = 0; i < count % 3; i += 1) {
    targets[kinds[i]] += 1;
  }
  return targets;
}

function eligibleRateWordContexts(numericRate) {
  if (numericRate > 1) {
    return rateWordContexts.filter((context) => context.mode === "comparison");
  }
  return rateWordContexts;
}

function chooseBalancedRateWordContext(numericRate, usage) {
  const eligible = eligibleRateWordContexts(numericRate);
  const minimumUse = Math.min(...eligible.map((context) => usage.get(context.id) || 0));
  const leastUsed = eligible.filter((context) => (usage.get(context.id) || 0) === minimumUse);
  const context = leastUsed[Math.floor(Math.random() * leastUsed.length)];
  usage.set(context.id, (usage.get(context.id) || 0) + 1);
  return context;
}

function selectRateWordQuestions(relations, count) {
  const targets = rateWordTargets(count);
  const kinds = [];
  Object.keys(targets).forEach((kind) => {
    for (let i = 0; i < targets[kind]; i += 1) kinds.push(kind);
  });

  const shuffledKinds = shuffle(kinds);
  const selected = [];
  const seenRelations = new Set();
  const contextUsage = new Map();
  let position = 0;

  for (const kind of shuffledKinds) {
    while (position < relations.length && seenRelations.has(relations[position].relationKey)) {
      position += 1;
    }
    if (position >= relations.length) return [];

    const relation = relations[position];
    position += 1;
    seenRelations.add(relation.relationKey);

    const context = chooseBalancedRateWordContext(relation.numericRate, contextUsage);
    selected.push({ ...relation, kind, context });
  }

  return selected;
}

function rateWordProblem(question) {
  const context = question.context;

  if (question.kind === "rate") {
    return `${context.base}は${question.base}${context.unit}です。${context.compared}は${question.compared}${context.unit}です。${context.compared}は${context.base}の何倍ですか。小数で答えましょう。`;
  }

  if (question.kind === "compared") {
    return `${context.base}は${question.base}${context.unit}です。${context.compared}は、その${question.rate}倍です。${context.compared}は何${context.unit}ですか。`;
  }

  return `${context.compared}は${question.compared}${context.unit}で、これは${context.base}の${question.rate}倍です。${context.base}は何${context.unit}ですか。`;
}

function rateWordAnswer(question) {
  if (question.kind === "rate") {
    return {
      label: "割合",
      answer: question.rate,
      explanation: `割合＝比べる量÷もとにする量なので、${question.compared}÷${question.base}＝${question.rate}。`
    };
  }

  if (question.kind === "compared") {
    return {
      label: "比べる量",
      answer: `${question.compared}${question.context.unit}`,
      explanation: `比べる量＝もとにする量×割合なので、${question.base}×${question.rate}＝${question.compared}。`
    };
  }

  return {
    label: "もとにする量",
    answer: `${question.base}${question.context.unit}`,
    explanation: `もとにする量＝比べる量÷割合なので、${question.compared}÷${question.rate}＝${question.base}。`
  };
}

function makeRateWordWorksheet() {
  const definition = worksheetDefinitions["rate-word-problems"];
  const settings = definition.difficulties[difficultySelect.value];
  const count = Number(countSelect.value);

  if (!Number.isInteger(count) || count <= 0) {
    statusMessage.textContent = "問題数を正しく選んでください。";
    return;
  }

  const selected = selectRateWordQuestions(buildRateWordPool(settings), count);
  if (selected.length < count) {
    statusMessage.textContent = "この設定では重複なしで指定した問題数を作成できません。";
    return;
  }

  const questionFragment = document.createDocumentFragment();
  const answerFragment = document.createDocumentFragment();

  selected.forEach((question, index) => {
    const number = index + 1;

    const problem = document.createElement("p");
    problem.textContent = `${number}. ${rateWordProblem(question)}`;
    questionFragment.appendChild(problem);

    const data = rateWordAnswer(question);
    const answer = document.createElement("p");
    const main = document.createElement("b");
    main.textContent = `${number}. ${data.label} ${data.answer}`;

    const explanation = document.createElement("span");
    explanation.className = "answer-explanation";
    explanation.textContent = `解説：${data.explanation}`;

    answer.append(main, document.createElement("br"), explanation);
    answerFragment.appendChild(answer);
  });

  questionsElement.replaceChildren(questionFragment);
  answersElement.replaceChildren(answerFragment);
  worksheetDifficulty.textContent = `難易度：${settings.label}`;
  worksheetCount.textContent = `問題数：${count}問`;
  statusMessage.textContent = `割合の文章題・${settings.label}を${count}問、場面の整合性を保って作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({ behavior: "smooth", block: "start" });
}

createButton.addEventListener("click", (event) => {
  if (worksheetTypeSelect.value !== "rate-word-problems") return;
  event.stopImmediatePropagation();
  makeRateWordWorksheet();
}, true);
