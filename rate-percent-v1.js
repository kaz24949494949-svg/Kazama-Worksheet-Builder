"use strict";

worksheetDefinitions["rate-percent"] = {
  label: "割合（百分率）",
  title: "割合を百分率で求める問題",
  instruction: "もとにする量と比べる量から、割合を百分率で求めましょう。",
  answerNote: "割合＝比べる量÷もとにする量です。小数で求めた割合を100倍して、％を付けます。",
  type: "math",
  difficulties: {
    basic: {
      label: "基礎",
      percentages: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      multipliers: [1, 2, 3, 4, 5],
      counts: [5, 10, 15],
      description: "10％刻みの割合を、百分率で求めます。"
    },
    standard: {
      label: "標準",
      percentages: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
      multipliers: [1, 2, 3, 4, 5, 6],
      counts: [5, 10, 15, 20],
      description: "5％刻みを含む割合を、百分率で求めます。"
    },
    advanced: {
      label: "発展",
      percentages: [12, 18, 24, 32, 48, 72, 105, 125, 150, 175, 225],
      multipliers: [1, 2, 3, 4, 5, 6],
      counts: [5, 10, 15, 20],
      description: "1％刻みの割合や、100％をこえる割合も扱います。"
    }
  }
};

function gcdRatePercent(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

function formatPercentDecimal(percentage) {
  return (percentage / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function buildRatePercentPool(settings) {
  const pool = [];

  settings.percentages.forEach((percentage) => {
    const divisor = gcdRatePercent(percentage, 100);
    const baseUnit = 100 / divisor;
    const comparedUnit = percentage / divisor;

    settings.multipliers.forEach((multiplier) => {
      const base = baseUnit * multiplier;
      const compared = comparedUnit * multiplier;

      if (!Number.isInteger(base) || !Number.isInteger(compared) || base <= 0 || compared <= 0) return;

      pool.push({
        base,
        compared,
        percentage,
        decimalRate: formatPercentDecimal(percentage)
      });
    });
  });

  return pool;
}

function makeRatePercentWorksheet() {
  const definition = worksheetDefinitions["rate-percent"];
  const settings = definition.difficulties[difficultySelect.value];
  const count = Number(countSelect.value);
  const pool = shuffle(buildRatePercentPool(settings));

  if (!Number.isInteger(count) || count <= 0 || pool.length < count) {
    statusMessage.textContent = "この設定では指定した問題数を作成できません。";
    return;
  }

  const selected = [];
  const seen = new Set();

  for (const question of pool) {
    const key = `${question.base}:${question.compared}`;
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
    problem.textContent = `${number}. もとにする量 ${question.base}、比べる量 ${question.compared}　百分率 □％`;
    questionFragment.appendChild(problem);

    const answer = document.createElement("p");
    const main = document.createElement("b");
    main.textContent = `${number}. ${question.percentage}％`;

    const explanation = document.createElement("span");
    explanation.className = "answer-explanation";
    explanation.textContent =
      `解説：割合＝比べる量÷もとにする量なので、` +
      `${question.compared}÷${question.base}＝${question.decimalRate}。` +
      `${question.decimalRate}×100＝${question.percentage}より、${question.percentage}％。`;

    answer.append(main, document.createElement("br"), explanation);
    answerFragment.appendChild(answer);
  });

  questionsElement.replaceChildren(questionFragment);
  answersElement.replaceChildren(answerFragment);
  worksheetDifficulty.textContent = `難易度：${settings.label}`;
  worksheetCount.textContent = `問題数：${count}問`;
  statusMessage.textContent = `割合（百分率）・${settings.label}を${count}問、重複なしで作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({ behavior: "smooth", block: "start" });
}

createButton.addEventListener("click", (event) => {
  if (worksheetTypeSelect.value !== "rate-percent") return;
  event.stopImmediatePropagation();
  makeRatePercentWorksheet();
}, true);
