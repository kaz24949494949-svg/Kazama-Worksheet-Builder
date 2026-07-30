"use strict";

worksheetDefinitions["compared-amount-decimal"] = {
  label: "比べる量（小数）",
  title: "割合から比べる量を求める問題",
  instruction: "もとにする量と割合から、比べる量を求めましょう。",
  answerNote: "比べる量＝もとにする量×割合です。割合は小数のままかけます。",
  type: "math",
  difficulties: {
    basic: {
      label: "基礎",
      rateHundredths: [20, 30, 40, 50, 60, 70, 80, 90],
      multipliers: [1, 2, 3, 4, 5],
      counts: [5, 10, 15],
      description: "小数第1位までの割合を使って、比べる量を求めます。"
    },
    standard: {
      label: "標準",
      rateHundredths: [15, 25, 35, 45, 55, 65, 75, 85, 95],
      multipliers: [1, 2, 3, 4, 5, 6],
      counts: [5, 10, 15, 20],
      description: "小数第2位までの割合を使って、比べる量を求めます。"
    },
    advanced: {
      label: "発展",
      rateHundredths: [12, 18, 24, 32, 48, 72, 105, 125, 150, 175, 225],
      multipliers: [1, 2, 3, 4, 5, 6],
      counts: [5, 10, 15, 20],
      description: "小数第2位までの割合や、1をこえる割合を使って求めます。"
    }
  }
};

function gcdComparedAmount(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

function formatComparedRate(rateHundredths) {
  return (rateHundredths / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function buildComparedAmountDecimalPool(settings) {
  const pool = [];

  settings.rateHundredths.forEach((rateHundredths) => {
    const divisor = gcdComparedAmount(rateHundredths, 100);
    const baseUnit = 100 / divisor;
    const rate = formatComparedRate(rateHundredths);

    settings.multipliers.forEach((multiplier) => {
      const base = baseUnit * multiplier;
      const compared = (base * rateHundredths) / 100;

      if (!Number.isInteger(base) || !Number.isInteger(compared) || base <= 0 || compared <= 0) return;

      pool.push({ base, rate, compared, rateHundredths });
    });
  });

  return pool;
}

function makeComparedAmountDecimalWorksheet() {
  const definition = worksheetDefinitions["compared-amount-decimal"];
  const settings = definition.difficulties[difficultySelect.value];
  const count = Number(countSelect.value);
  const pool = shuffle(buildComparedAmountDecimalPool(settings));

  if (!Number.isInteger(count) || count <= 0 || pool.length < count) {
    statusMessage.textContent = "この設定では指定した問題数を作成できません。";
    return;
  }

  const selected = [];
  const seen = new Set();

  for (const question of pool) {
    const key = `${question.base}:${question.rate}`;
    if (seen.has(key)) continue;
    seen.add(key);
    selected.push(question);
    if (selected.length === count) break;
  }

  if (selected.length < count) {
    statusMessage.textContent = "この設定では重複なしで指定した問題数を作成できません。";
    return;
  }

  const questionFragment = document.createDocumentFragment();
  const answerFragment = document.createDocumentFragment();

  selected.forEach((question, index) => {
    const number = index + 1;

    const problem = document.createElement("p");
    problem.textContent = `${number}. もとにする量 ${question.base}、割合 ${question.rate}　比べる量 □`;
    questionFragment.appendChild(problem);

    const answer = document.createElement("p");
    const main = document.createElement("b");
    main.textContent = `${number}. ${question.compared}`;

    const explanation = document.createElement("span");
    explanation.className = "answer-explanation";
    explanation.textContent =
      `解説：比べる量＝もとにする量×割合なので、` +
      `${question.base}×${question.rate}＝${question.compared}。`;

    answer.append(main, document.createElement("br"), explanation);
    answerFragment.appendChild(answer);
  });

  questionsElement.replaceChildren(questionFragment);
  answersElement.replaceChildren(answerFragment);
  worksheetDifficulty.textContent = `難易度：${settings.label}`;
  worksheetCount.textContent = `問題数：${count}問`;
  statusMessage.textContent = `比べる量（小数）・${settings.label}を${count}問、重複なしで作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({ behavior: "smooth", block: "start" });
}

createButton.addEventListener("click", (event) => {
  if (worksheetTypeSelect.value !== "compared-amount-decimal") return;
  event.stopImmediatePropagation();
  makeComparedAmountDecimalWorksheet();
}, true);
