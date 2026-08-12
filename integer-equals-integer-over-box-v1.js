"use strict";

(() => {
  const TYPE = "integer-equals-integer-over-box";
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
  const answerTitle = answerPage.querySelector(".worksheet-heading h2");

  const ITEMS = [
    { integer: 1, numerator: 2, answer: 2 },
    { integer: 1, numerator: 3, answer: 3 },
    { integer: 2, numerator: 10, answer: 5 },
    { integer: 3, numerator: 12, answer: 4 },
    { integer: 4, numerator: 28, answer: 7 },
    { integer: 5, numerator: 30, answer: 6 },
    { integer: 6, numerator: 48, answer: 8 },
    { integer: 7, numerator: 21, answer: 3 },
    { integer: 8, numerator: 72, answer: 9 },
    { integer: 9, numerator: 36, answer: 4 },
    { integer: 6, numerator: 42, answer: 7 },
    { integer: 5, numerator: 40, answer: 8 },
    { integer: 6, numerator: 66, answer: 11 },
    { integer: 8, numerator: 80, answer: 10 },
    { integer: 8, numerator: 104, answer: 13 },
    { integer: 10, numerator: 120, answer: 12 }
  ];

  function isCurrent() {
    return typeSelect.value === TYPE;
  }

  function circledNumber(number) {
    return String.fromCodePoint(0x2460 + number - 1);
  }

  function createFraction(numerator) {
    const fraction = document.createElement("span");
    fraction.className = "integer-over-box-expression";

    const top = document.createElement("span");
    top.className = "integer-over-box-numerator";
    top.textContent = String(numerator);

    const bottom = document.createElement("span");
    bottom.className = "integer-over-box-denominator";
    bottom.textContent = "□";

    fraction.append(top, bottom);
    return fraction;
  }

  function clearSiblingModes() {
    problemPage.classList.remove("fraction-box-base-page", "integer-times-box-page", "integer-equals-fraction-page");
    answerPage.classList.remove("integer-equals-fraction-answer-page");
    questions.classList.remove("integer-equals-fraction-questions");
    answers.classList.remove("integer-equals-fraction-answers");
  }

  function enableMode() {
    clearSiblingModes();
    problemPage.classList.add("fraction-box-page", "integer-over-box-page");
    answerPage.classList.add("fraction-box-answer-page", "integer-over-box-answer-page");
    questions.classList.add("fraction-box-questions", "integer-over-box-questions");
    answers.classList.add("fraction-box-answers", "integer-over-box-answers");
  }

  function clearOwnMode() {
    problemPage.classList.remove("integer-over-box-page");
    answerPage.classList.remove("integer-over-box-answer-page");
    questions.classList.remove("integer-over-box-questions");
    answers.classList.remove("integer-over-box-answers");
  }

  function updateControls() {
    enableMode();
    countSelect.replaceChildren();
    const option = document.createElement("option");
    option.value = "16";
    option.textContent = "16問";
    option.selected = true;
    countSelect.appendChild(option);

    difficultySelect.value = "basic";
    problemTitle.textContent = "問題";
    answerTitle.textContent = "解答";
    instruction.textContent = "● 次の□に入る数を求めましょう。";
    answerNote.textContent = "";
    countGuide.textContent = "16問・2列×8段の固定レイアウトです。";
    difficultyTitle.textContent = "固定";
    difficultyDescription.textContent = "整数＝整数／□の形から、分母に入る整数を求めます。";
    worksheetDifficulty.textContent = "";
    worksheetCount.textContent = "";
    questions.textContent = "まだ問題はありません。";
    answers.textContent = "まだ解答はありません。";
    statusMessage.textContent = "整数＝整数／□ 16問に切り替えました。";
  }

  function makeWorksheet() {
    const questionFragment = document.createDocumentFragment();
    const answerFragment = document.createDocumentFragment();

    ITEMS.forEach((item, index) => {
      const number = index + 1;

      const problem = document.createElement("div");
      problem.className = "fraction-box-question-item integer-over-box-item";

      const problemNumber = document.createElement("span");
      problemNumber.className = "fraction-box-number";
      problemNumber.textContent = circledNumber(number);

      const equation = document.createElement("span");
      equation.className = "integer-over-box-equation";

      const integerPart = document.createElement("span");
      integerPart.className = "integer-over-box-integer";
      integerPart.textContent = `${item.integer}＝`;

      equation.append(integerPart, createFraction(item.numerator));

      const response = document.createElement("span");
      response.className = "fraction-box-response integer-over-box-response";
      response.textContent = "□＝";

      problem.append(problemNumber, equation, response);
      questionFragment.appendChild(problem);

      const answer = document.createElement("div");
      answer.className = "fraction-box-answer-item integer-over-box-answer-item";

      const answerNumber = document.createElement("span");
      answerNumber.className = "fraction-box-number";
      answerNumber.textContent = circledNumber(number);

      const answerValue = document.createElement("span");
      answerValue.className = "integer-over-box-answer-value";
      answerValue.textContent = `□＝${item.answer}`;

      answer.append(answerNumber, answerValue);
      answerFragment.appendChild(answer);
    });

    questions.replaceChildren(questionFragment);
    answers.replaceChildren(answerFragment);
    statusMessage.textContent = "整数＝整数／□ 16問を作成しました。";
    problemPage.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  typeSelect.addEventListener("change", (event) => {
    if (event.target.value === TYPE) {
      event.stopImmediatePropagation();
      updateControls();
    } else {
      clearOwnMode();
    }
  }, true);

  difficultySelect.addEventListener("change", (event) => {
    if (!isCurrent()) return;
    event.stopImmediatePropagation();
    difficultySelect.value = "basic";
  }, true);

  createButton.addEventListener("click", (event) => {
    if (!isCurrent()) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    makeWorksheet();
  }, true);
})();
