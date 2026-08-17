"use strict";

worksheetDefinitions["rate-decimal"] = {
  label: "割合（小数）",
  title: "割合を小数で求める問題",
  instruction: "もとにする量と比べる量から、割合を小数で求めましょう。",
  answerNote: "割合＝比べる量÷もとにする量です。答えは小数で表します。",
  type: "math",
  difficulties: {
    basic: {
      label: "基礎",
      rateHundredths: [20, 30, 40, 50, 60, 70, 80, 90],
      multipliers: [1, 2, 3, 4, 5],
      counts: [5, 10, 15],
      description: "答えが小数第1位までの、1より小さい割合を求めます。"
    },
    standard: {
      label: "標準",
      rateHundredths: [15, 25, 35, 45, 55, 65, 75, 85, 95],
      multipliers: [1, 2, 3, 4, 5, 6],
      counts: [5, 10, 15, 20],
      description: "答えが小数第2位までの、1より小さい割合を求めます。"
    },
    advanced: {
      label: "発展",
      rateHundredths: [12, 18, 24, 32, 48, 72, 125, 150, 175, 225],
      multipliers: [1, 2, 3, 4, 5, 6],
      counts: [5, 10, 15, 20],
      description: "小数第2位までの割合と、1をこえる割合を含みます。"
    }
  }
};

function gcdRate(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

function formatRateDecimal(rateHundredths) {
  return (rateHundredths / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function buildRateDecimalPool(settings) {
  const pool = [];

  settings.rateHundredths.forEach((rateHundredths) => {
    const divisor = gcdRate(rateHundredths, 100);
    const baseUnit = 100 / divisor;
    const comparedUnit = rateHundredths / divisor;

    settings.multipliers.forEach((multiplier) => {
      const base = baseUnit * multiplier;
      const compared = comparedUnit * multiplier;
      const rate = formatRateDecimal(rateHundredths);

      if (!Number.isInteger(base) || !Number.isInteger(compared) || base <= 0 || compared <= 0) return;
      pool.push({ base, compared, rate, rateHundredths });
    });
  });

  const seen = new Set();
  return pool.filter((question) => {
    const key = `${question.base}:${question.compared}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function makeRateDecimalProblem(question, number) {
  const item = document.createElement("section");
  item.className = "rate-decimal-question";

  const numberNode = document.createElement("span");
  numberNode.className = "rate-decimal-number";
  numberNode.textContent = String(number);

  const body = document.createElement("div");
  body.className = "rate-decimal-body";

  const data = document.createElement("div");
  data.className = "rate-decimal-data";

  const baseLabel = document.createElement("span");
  baseLabel.className = "rate-decimal-label";
  baseLabel.textContent = "もとにする量";
  const baseValue = document.createElement("span");
  baseValue.className = "rate-decimal-value";
  baseValue.textContent = String(question.base);

  const comparedLabel = document.createElement("span");
  comparedLabel.className = "rate-decimal-label";
  comparedLabel.textContent = "比べる量";
  const comparedValue = document.createElement("span");
  comparedValue.className = "rate-decimal-value";
  comparedValue.textContent = String(question.compared);

  data.append(baseLabel, baseValue, comparedLabel, comparedValue);

  const answerRow = document.createElement("div");
  answerRow.className = "rate-decimal-answer-row";
  const answerLabel = document.createElement("span");
  answerLabel.textContent = "割合";
  const answerBox = document.createElement("span");
  answerBox.className = "rate-decimal-answer-box";
  answerBox.setAttribute("aria-label", "割合の答えを書く欄");
  answerRow.append(answerLabel, answerBox);

  body.append(data, answerRow);
  item.append(numberNode, body);
  return item;
}

function makeRateDecimalWorksheet() {
  const definition = worksheetDefinitions["rate-decimal"];
  const settings = definition.difficulties[difficultySelect.value];
  const count = Number(countSelect.value);
  const pool = shuffle(buildRateDecimalPool(settings));

  if (!Number.isInteger(count) || count <= 0 || pool.length < count) {
    statusMessage.textContent = "この設定では指定した問題数を作成できません。";
    return;
  }

  const selected = pool.slice(0, count);
  const questionFragment = document.createDocumentFragment();
  const answerFragment = document.createDocumentFragment();

  selected.forEach((question, index) => {
    const number = index + 1;
    questionFragment.appendChild(makeRateDecimalProblem(question, number));

    const answer = document.createElement("p");
    const main = document.createElement("b");
    main.textContent = `${number}. ${question.rate}`;

    const explanation = document.createElement("span");
    explanation.className = "answer-explanation";
    explanation.textContent = `解説：割合＝比べる量÷もとにする量なので、${question.compared}÷${question.base}＝${question.rate}。`;

    answer.append(main, document.createElement("br"), explanation);
    answerFragment.appendChild(answer);
  });

  questionsElement.replaceChildren(questionFragment);
  questionsElement.classList.add("rate-decimal-questions");
  answersElement.replaceChildren(answerFragment);
  worksheetDifficulty.textContent = `難易度：${settings.label}`;
  worksheetCount.textContent = `問題数：${count}問`;
  statusMessage.textContent = `割合（小数）・${settings.label}を${count}問、重複なしで作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({ behavior: "smooth", block: "start" });
}

worksheetTypeSelect.addEventListener("change", () => {
  if (worksheetTypeSelect.value !== "rate-decimal") questionsElement.classList.remove("rate-decimal-questions");
});

createButton.addEventListener("click", (event) => {
  if (worksheetTypeSelect.value !== "rate-decimal") return;
  event.stopImmediatePropagation();
  makeRateDecimalWorksheet();
}, true);
