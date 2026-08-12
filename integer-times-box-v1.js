"use strict";

(() => {
  const TYPE = "integer-times-box";
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
    { multiplier: 2, result: 1, numerator: 1, denominator: 2 },
    { multiplier: 3, result: 2, numerator: 2, denominator: 3 },
    { multiplier: 4, result: 3, numerator: 3, denominator: 4 },
    { multiplier: 5, result: 4, numerator: 4, denominator: 5 },
    { multiplier: 6, result: 5, numerator: 5, denominator: 6 },
    { multiplier: 3, result: 1, numerator: 1, denominator: 3 },
    { multiplier: 5, result: 2, numerator: 2, denominator: 5 },
    { multiplier: 7, result: 3, numerator: 3, denominator: 7 },
    { multiplier: 3, result: 5, numerator: 5, denominator: 3 },
    { multiplier: 4, result: 7, numerator: 7, denominator: 4 },
    { multiplier: 5, result: 8, numerator: 8, denominator: 5 },
    { multiplier: 7, result: 10, numerator: 10, denominator: 7 },
    { multiplier: 8, result: 11, numerator: 11, denominator: 8 },
    { multiplier: 9, result: 4, numerator: 4, denominator: 9 },
    { multiplier: 10, result: 13, numerator: 13, denominator: 10 },
    { multiplier: 11, result: 6, numerator: 6, denominator: 11 }
  ];

  function isCurrent() {
    return typeSelect.value === TYPE;
  }

  function circledNumber(number) {
    return String.fromCodePoint(0x2460 + number - 1);
  }

  function createFraction(numerator, denominator) {
    const fraction = document.createElement("span");
    fraction.className = "fraction-box-answer-fraction";
    const top = document.createElement("span");
    top.className = "fraction-box-answer-numerator";
    top.textContent = String(numerator);
    const bottom = document.createElement("span");
    bottom.className = "fraction-box-answer-denominator";
    bottom.textContent = String(denominator);
    fraction.append(top, bottom);
    return fraction;
  }

  function enableMode() {
    problemPage.classList.add("fraction-box-page", "integer-times-box-page");
    answerPage.classList.add("fraction-box-answer-page");
    questions.classList.add("fraction-box-questions");
    answers.classList.add("fraction-box-answers");
  }

  function clearOwnMode() {
    // 共通の解答タイトルは他教材の updateControls / clearMode に任せる。
    // ここで変更すると、教材切替時のイベント順によって「解答」が
    // 「解答・解説」に上書きされるため、自分専用のクラスだけ外す。
    problemPage.classList.remove("integer-times-box-page");
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
    instruction.textContent = "● 次の□に入る数を、分数で答えましょう。";
    answerNote.textContent = "";
    countGuide.textContent = "16問・2列×8段の固定レイアウトです。";
    difficultyTitle.textContent = "固定";
    difficultyDescription.textContent = "整数×□＝整数の形から、□に入る分数を求めます。";
    worksheetDifficulty.textContent = "";
    worksheetCount.textContent = "";
    questions.textContent = "まだ問題はありません。";
    answers.textContent = "まだ解答はありません。";
    statusMessage.textContent = "整数×□＝整数（分数）16問に切り替えました。";
  }

  function makeWorksheet() {
    const questionFragment = document.createDocumentFragment();
    const answerFragment = document.createDocumentFragment();

    ITEMS.forEach((item, index) => {
      const number = index + 1;
      const problem = document.createElement("div");
      problem.className = "fraction-box-question-item";
      const problemNumber = document.createElement("span");
      problemNumber.className = "fraction-box-number";
      problemNumber.textContent = circledNumber(number);
      const equation = document.createElement("span");
      equation.className = "fraction-box-equation";
      equation.textContent = `${item.multiplier}×□＝${item.result}`;
      const response = document.createElement("span");
      response.className = "fraction-box-response";
      response.textContent = "□＝";
      problem.append(problemNumber, equation, response);
      questionFragment.appendChild(problem);

      const answer = document.createElement("div");
      answer.className = "fraction-box-answer-item";
      const answerNumber = document.createElement("span");
      answerNumber.className = "fraction-box-number";
      answerNumber.textContent = circledNumber(number);
      answer.append(answerNumber, createFraction(item.numerator, item.denominator));
      answerFragment.appendChild(answer);
    });

    questions.replaceChildren(questionFragment);
    answers.replaceChildren(answerFragment);
    statusMessage.textContent = "整数×□＝整数（分数）16問を作成しました。";
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
