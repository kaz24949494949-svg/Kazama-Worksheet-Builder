"use strict";

worksheetDefinitions.proportion = {
  label: "比例式",
  title: "比例式の□を求める問題",
  instruction: "比例式が成り立つように、□にあてはまる数を書きましょう。",
  answerNote: "比例式では、外項の積と内項の積が等しくなります。積を計算し、□にかかっている数で割って求めます。",
  type: "math",
  difficulties: {
    basic: {
      label: "基礎",
      baseMin: 2,
      baseMax: 9,
      factors: [2, 3, 4, 5],
      missingPositions: [3],
      counts: [5, 10, 15],
      description: "右端の□を、外項の積＝内項の積を使って求めます。"
    },
    standard: {
      label: "標準",
      baseMin: 2,
      baseMax: 12,
      factors: [2, 3, 4, 5, 6],
      missingPositions: [1, 2, 3],
      counts: [5, 10, 15, 20],
      description: "内項または右の外項にある□を、積と割り算で求めます。"
    },
    advanced: {
      label: "発展",
      baseMin: 3,
      baseMax: 15,
      factors: [3, 4, 5, 6, 8, 10],
      missingPositions: [0, 1, 2, 3],
      counts: [5, 10, 15, 20],
      description: "4つの位置のどこにでも□が入り、比例式を立てて求めます。"
    }
  }
};

function isValidProportionQuestion(question) {
  const [a, b, c, d] = question.values;
  return (
    Number.isInteger(question.answer) &&
    question.answer > 0 &&
    a * d === b * c &&
    question.values[question.missingIndex] === question.answer
  );
}

function buildProportionPool(settings) {
  const pool = [];
  const used = new Set();

  for (let left = settings.baseMin; left <= settings.baseMax; left += 1) {
    for (let right = settings.baseMin; right <= settings.baseMax; right += 1) {
      if (left === right || gcd(left, right) !== 1) continue;

      settings.factors.forEach((factor) => {
        settings.missingPositions.forEach((missingIndex) => {
          const values = [left, right, left * factor, right * factor];
          const question = {
            values,
            missingIndex,
            answer: values[missingIndex],
            factor
          };
          const key = `${values.join(":")}:${missingIndex}`;

          if (isValidProportionQuestion(question) && !used.has(key)) {
            used.add(key);
            pool.push(question);
          }
        });
      });
    }
  }

  return pool;
}

function proportionText(question, showAnswer = false) {
  const values = question.values.map((value, index) => {
    if (index !== question.missingIndex) return String(value);
    return showAnswer ? String(question.answer) : "□";
  });
  return `${values[0]}：${values[1]} ＝ ${values[2]}：${values[3]}`;
}

function buildProportionExplanation(question) {
  const [a, b, c, d] = question.values;
  const answer = question.answer;

  switch (question.missingIndex) {
    case 0: {
      const product = b * c;
      return `外項の積＝内項の積より、□×${d}＝${b}×${c}＝${product}。したがって、□＝${product}÷${d}＝${answer}。`;
    }
    case 1: {
      const product = a * d;
      return `外項の積＝内項の積より、${a}×${d}＝□×${c}。${a}×${d}＝${product}なので、□＝${product}÷${c}＝${answer}。`;
    }
    case 2: {
      const product = a * d;
      return `外項の積＝内項の積より、${a}×${d}＝${b}×□。${a}×${d}＝${product}なので、□＝${product}÷${b}＝${answer}。`;
    }
    case 3: {
      const product = b * c;
      return `外項の積＝内項の積より、${a}×□＝${b}×${c}＝${product}。したがって、□＝${product}÷${a}＝${answer}。`;
    }
    default:
      return "外項の積と内項の積が等しくなることを使って求めます。";
  }
}

function makeProportionWorksheet() {
  const definition = worksheetDefinitions.proportion;
  const settings = definition.difficulties[difficultySelect.value];
  const count = Number(countSelect.value);
  const pool = shuffle(buildProportionPool(settings));

  if (!Number.isInteger(count) || count <= 0 || pool.length < count) {
    statusMessage.textContent = "この設定では指定した問題数を作成できません。";
    return;
  }

  const selected = pool.slice(0, count);
  const allValid = selected.every(isValidProportionQuestion);
  if (!allValid) {
    statusMessage.textContent = "比例式の生成内容を確認できませんでした。もう一度作成してください。";
    return;
  }

  const questionFragment = document.createDocumentFragment();
  const answerFragment = document.createDocumentFragment();

  selected.forEach((question, index) => {
    const number = index + 1;

    const problem = document.createElement("p");
    problem.textContent = `${number}. ${proportionText(question)}`;
    questionFragment.appendChild(problem);

    const answer = document.createElement("p");
    const main = document.createElement("b");
    main.textContent = `${number}. ${proportionText(question, true)}`;

    const explanation = document.createElement("span");
    explanation.className = "answer-explanation";
    explanation.textContent = `解説：${buildProportionExplanation(question)}`;

    answer.append(main, document.createElement("br"), explanation);
    answerFragment.appendChild(answer);
  });

  questionsElement.replaceChildren(questionFragment);
  answersElement.replaceChildren(answerFragment);
  worksheetDifficulty.textContent = `難易度：${settings.label}`;
  worksheetCount.textContent = `問題数：${count}問`;
  statusMessage.textContent = `比例式・${settings.label}を${count}問、計算確認済み・重複なしで作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

createButton.addEventListener("click", (event) => {
  if (worksheetTypeSelect.value !== "proportion") return;
  event.stopImmediatePropagation();
  makeProportionWorksheet();
}, true);
