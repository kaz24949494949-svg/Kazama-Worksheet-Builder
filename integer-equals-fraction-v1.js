"use strict";

(() => {
  const TYPE = "integer-equals-fraction";
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

  const ITEMS = [
    { integer: 1, denominator: 2, answer: 2 },
    { integer: 2, denominator: 3, answer: 6 },
    { integer: 3, denominator: 4, answer: 12 },
    { integer: 4, denominator: 5, answer: 20 },
    { integer: 5, denominator: 6, answer: 30 },
    { integer: 1, denominator: 3, answer: 3 },
    { integer: 2, denominator: 5, answer: 10 },
    { integer: 3, denominator: 7, answer: 21 },
    { integer: 5, denominator: 3, answer: 15 },
    { integer: 7, denominator: 4, answer: 28 },
    { integer: 8, denominator: 5, answer: 40 },
    { integer: 10, denominator: 7, answer: 70 },
    { integer: 11, denominator: 8, answer: 88 },
    { integer: 4, denominator: 9, answer: 36 },
    { integer: 13, denominator: 10, answer: 130 },
    { integer: 6, denominator: 11, answer: 66 }
  ];

  function isCurrent() {
    return typeSelect.value === TYPE;
  }

  function circledNumber(number) {
    return String.fromCodePoint(0x2460 + number - 1);
  }

  function createBlankFraction(denominator) {
    const fraction = document.createElement("span");
    fraction.className = "integer-equals-fraction-expression";

    const top = document.createElement("span");
    top.className = "integer-equals-fraction-numerator";
    top.textContent = "□";

    const bottom = document.createElement("span");
    bottom.className = "integer-equals-fraction-denominator";
    bottom.textContent = String(denominator);

    fraction.append(top, bottom);
    return fraction;
  }

  function enableMode() {
    problemPage.classList.add("fraction-box-page", "integer-equals-fraction-page");
    answerPage.classList.add("fraction-box-answer-page", "integer-equals-fraction-answer-page");
    questions.classList.add("fraction-box-questions", "integer-equals-fraction-questions");
    answers.classList.add("fraction-box-answers", "integer-equals-fraction-answers");
  }

  function clearOwnMode() {
    problemPage.classList.remove("integer-equals-fraction-page");
    answerPage.classList.remove("integer-equals-fraction-answer-page");
    questions.classList.remove("integer-equals-fraction-questions");
    answers.classList.remove("integer-equals-fraction-answers");
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
    instruction.textContent = "● 次の□に入る数を求めましょう。";
    answerNote.textContent = "";
    countGuide.textContent = "16問・2列×8段の固定レイアウトです。";
    difficultyTitle.textContent = "固定";
    difficultyDescription.textContent = "整数＝□／整数の形から、分子に入る整数を求めます。";
    worksheetDifficulty.textContent = "";
    worksheetCount.textContent = "";
    questions.textContent = "まだ問題はありません。";
    answers.textContent = "まだ解答はありません。";
    statusMessage.textContent = "整数＝□／整数 16問に切り替えました。";
  }

  function makeWorksheet() {
    const questionFragment = document.createDocumentFragment();
    const answerFragment = document.createDocumentFragment();

    ITEMS.forEach((item, index) => {
      const number = index + 1;

      const problem = document.createElement("div");
      problem.className = "fraction-box-question-item integer-equals-fraction-item";

      const problemNumber = document.createElement("span");
      problemNumber.className = "fraction-box-number";
      problemNumber.textContent = circledNumber(number);

      const equation = document.createElement("span");
      equation.className = "integer-equals-fraction-equation";

      const integerPart = document.createElement("span");
      integerPart.className = "integer-equals-fraction-integer";
      integerPart.textContent = `${item.integer}＝`;

      equation.append(integerPart, createBlankFraction(item.denominator));

      const response = document.createElement("span");
      response.className = "fraction-box-response integer-equals-fraction-response";
      response.textContent = "□＝";

      problem.append(problemNumber, equation, response);
      questionFragment.appendChild(problem);

      const answer = document.createElement("div");
      answer.className = "fraction-box-answer-item integer-equals-fraction-answer-item";

      const answerNumber = document.createElement("span");
      answerNumber.className = "fraction-box-number";
      answerNumber.textContent = circledNumber(number);

      const answerValue = document.createElement("span");
      answerValue.className = "integer-equals-fraction-answer-value";
      answerValue.textContent = String(item.answer);

      answer.append(answerNumber, answerValue);
      answerFragment.appendChild(answer);
    });

    questions.replaceChildren(questionFragment);
    answers.replaceChildren(answerFragment);
    statusMessage.textContent = "整数＝□／整数 16問を作成しました。";
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
