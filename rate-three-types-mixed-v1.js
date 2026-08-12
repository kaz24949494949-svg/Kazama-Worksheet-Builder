"use strict";

worksheetDefinitions["rate-three-types-mixed"] = {
  label: "割合の3用法（混合）",
  title: "割合・比べる量・もとにする量を見分ける問題",
  instruction: "□に入る数を求めましょう。何を求める問題かを見分けて、式を選びましょう。",
  answerNote: "割合＝比べる量÷もとにする量、比べる量＝もとにする量×割合、もとにする量＝比べる量÷割合、の3つを使い分けます。",
  type: "math",
  difficulties: {
    basic: {
      label: "基礎",
      rateHundredths: [20, 30, 40, 50, 60, 70, 80, 90],
      multipliers: [1, 2, 3, 4, 5],
      counts: [5, 10, 15],
      description: "小数第1位までの割合で、3つの求め方を見分けます。"
    },
    standard: {
      label: "標準",
      rateHundredths: [15, 25, 35, 45, 55, 65, 75, 85, 95],
      multipliers: [1, 2, 3, 4, 5, 6],
      counts: [5, 10, 15, 20],
      description: "小数第2位までの割合で、3つの求め方を混合して出題します。"
    },
    advanced: {
      label: "発展",
      rateHundredths: [12, 18, 24, 32, 48, 72, 105, 125, 150, 175, 225],
      multipliers: [1, 2, 3, 4, 5, 6],
      counts: [5, 10, 15, 20],
      description: "1をこえる割合も含め、求める量を自分で判断します。"
    }
  }
};

function gcdRateMixed(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

function formatMixedRate(rateHundredths) {
  return (rateHundredths / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function buildRateThreeTypesPool(settings) {
  const groups = { rate: [], compared: [], base: [] };

  settings.rateHundredths.forEach((rateHundredths) => {
    const divisor = gcdRateMixed(rateHundredths, 100);
    const baseUnit = 100 / divisor;
    const comparedUnit = rateHundredths / divisor;
    const rate = formatMixedRate(rateHundredths);

    settings.multipliers.forEach((multiplier) => {
      const base = baseUnit * multiplier;
      const compared = comparedUnit * multiplier;
      if (!Number.isInteger(base) || !Number.isInteger(compared) || base <= 0 || compared <= 0) return;

      const numericRate = rateHundredths / 100;
      if (Math.abs(compared / base - numericRate) > 1e-9) return;
      if (Math.abs(base * numericRate - compared) > 1e-9) return;
      if (Math.abs(compared / numericRate - base) > 1e-9) return;

      const relationKey = `${base}:${compared}:${rate}`;
      groups.rate.push({ kind: "rate", base, compared, rate, relationKey });
      groups.compared.push({ kind: "compared", base, compared, rate, relationKey });
      groups.base.push({ kind: "base", base, compared, rate, relationKey });
    });
  });

  groups.rate = shuffle(groups.rate);
  groups.compared = shuffle(groups.compared);
  groups.base = shuffle(groups.base);
  return groups;
}

function mixedKindTargets(count) {
  const kinds = shuffle(["rate", "compared", "base"]);
  const targets = { rate: Math.floor(count / 3), compared: Math.floor(count / 3), base: Math.floor(count / 3) };
  for (let i = 0; i < count % 3; i += 1) {
    targets[kinds[i]] += 1;
  }
  return targets;
}

function selectBalancedMixedQuestions(groups, count) {
  const targets = mixedKindTargets(count);
  const selected = [];
  const seenRelations = new Set();
  const kindOrder = shuffle(["rate", "compared", "base"]);

  for (const kind of kindOrder) {
    let added = 0;
    for (const question of groups[kind]) {
      if (added >= targets[kind]) break;
      if (seenRelations.has(question.relationKey)) continue;
      seenRelations.add(question.relationKey);
      selected.push(question);
      added += 1;
    }
    if (added < targets[kind]) return [];
  }

  return shuffle(selected);
}

function mixedProblemText(question) {
  if (question.kind === "rate") {
    return `もとにする量 ${question.base}、比べる量 ${question.compared}　割合 □`;
  }
  if (question.kind === "compared") {
    return `もとにする量 ${question.base}、割合 ${question.rate}　比べる量 □`;
  }
  return `比べる量 ${question.compared}、割合 ${question.rate}　もとにする量 □`;
}

function mixedAnswerData(question) {
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
      answer: question.compared,
      explanation: `比べる量＝もとにする量×割合なので、${question.base}×${question.rate}＝${question.compared}。`
    };
  }
  return {
    label: "もとにする量",
    answer: question.base,
    explanation: `もとにする量＝比べる量÷割合なので、${question.compared}÷${question.rate}＝${question.base}。`
  };
}

function makeRateThreeTypesMixedWorksheet() {
  const definition = worksheetDefinitions["rate-three-types-mixed"];
  const settings = definition.difficulties[difficultySelect.value];
  const count = Number(countSelect.value);

  if (!Number.isInteger(count) || count <= 0) {
    statusMessage.textContent = "問題数を正しく選んでください。";
    return;
  }

  const groups = buildRateThreeTypesPool(settings);
  const selected = selectBalancedMixedQuestions(groups, count);

  if (selected.length < count) {
    statusMessage.textContent = "この設定では数値関係の重複なしで指定した問題数を作成できません。";
    return;
  }

  const questionFragment = document.createDocumentFragment();
  const answerFragment = document.createDocumentFragment();

  selected.forEach((question, index) => {
    const number = index + 1;
    const problem = document.createElement("p");
    problem.textContent = `${number}. ${mixedProblemText(question)}`;
    questionFragment.appendChild(problem);

    const data = mixedAnswerData(question);
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
  statusMessage.textContent = `割合の3用法（混合）・${settings.label}を${count}問、数値関係の重複なしで作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({ behavior: "smooth", block: "start" });
}

createButton.addEventListener("click", (event) => {
  if (worksheetTypeSelect.value !== "rate-three-types-mixed") return;
  event.stopImmediatePropagation();
  makeRateThreeTypesMixedWorksheet();
}, true);
