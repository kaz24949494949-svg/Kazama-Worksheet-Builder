"use strict";

(() => {
  const TYPE = "fraction-to-division";
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
    [2,3],[5,2],[1,4],[8,3],
    [4,5],[7,9],[9,5],[3,7],
    [8,7],[1,6],[3,2],[5,8],
    [9,8],[5,4],[4,9],[7,2]
  ];

  function isCurrent(){
    return typeSelect.value === TYPE;
  }

  function circledNumber(number){
    return String.fromCodePoint(0x2460 + number - 1);
  }

  function createFraction(numerator, denominator){
    const fraction = document.createElement("span");
    fraction.className = "fraction-to-division-expression";
    const top = document.createElement("span");
    top.className = "fraction-to-division-numerator";
    top.textContent = String(numerator);
    const bottom = document.createElement("span");
    bottom.className = "fraction-to-division-denominator";
    bottom.textContent = String(denominator);
    fraction.append(top, bottom);
    return fraction;
  }

  function enableMode(){
    problemPage.classList.add("fraction-box-page");
    answerPage.classList.add("fraction-box-answer-page");
    questions.classList.add("fraction-box-questions");
    answers.classList.add("fraction-box-answers");
  }

  function clearOwnMode(){
    if (isCurrent()) return;
    problemPage.classList.remove("fraction-to-division-page");
    answerPage.classList.remove("fraction-to-division-answer-page");
    questions.classList.remove("fraction-to-division-questions");
    answers.classList.remove("fraction-to-division-answers");
  }

  function updateControls(){
    enableMode();
    problemPage.classList.add("fraction-to-division-page");
    answerPage.classList.add("fraction-to-division-answer-page");
    questions.classList.add("fraction-to-division-questions");
    answers.classList.add("fraction-to-division-answers");

    countSelect.replaceChildren();
    const option = document.createElement("option");
    option.value = "16";
    option.textContent = "16問";
    option.selected = true;
    countSelect.appendChild(option);

    difficultySelect.value = "basic";
    problemTitle.textContent = "問題";
    answerTitle.textContent = "解答";
    instruction.textContent = "● 次の分数を、わり算の式になおしましょう。";
    answerNote.textContent = "";
    countGuide.textContent = "16問・2列×8段の固定レイアウトです。";
    difficultyTitle.textContent = "固定";
    difficultyDescription.textContent = "分数を、分子÷分母のわり算の式に変換します。";
    worksheetDifficulty.textContent = "";
    worksheetCount.textContent = "";
    questions.textContent = "まだ問題はありません。";
    answers.textContent = "まだ解答はありません。";
    statusMessage.textContent = "分数→わり算 16問に切り替えました。";
  }

  function makeWorksheet(){
    const questionFragment = document.createDocumentFragment();
    const answerFragment = document.createDocumentFragment();

    ITEMS.forEach(([numerator, denominator], index) => {
      const number = index + 1;

      const problem = document.createElement("div");
      problem.className = "fraction-box-question-item fraction-to-division-item";
      const problemNumber = document.createElement("span");
      problemNumber.className = "fraction-box-number";
      problemNumber.textContent = circledNumber(number);
      const equals = document.createElement("span");
      equals.className = "fraction-to-division-equals";
      equals.textContent = "＝";
      problem.append(problemNumber, createFraction(numerator, denominator), equals);
      questionFragment.appendChild(problem);

      const answer = document.createElement("div");
      answer.className = "fraction-box-answer-item fraction-to-division-answer-item";
      const answerNumber = document.createElement("span");
      answerNumber.className = "fraction-box-number";
      answerNumber.textContent = circledNumber(number);
      const answerValue = document.createElement("span");
      answerValue.className = "fraction-to-division-answer-value";
      answerValue.textContent = `${numerator}÷${denominator}`;
      answer.append(answerNumber, answerValue);
      answerFragment.appendChild(answer);
    });

    questions.replaceChildren(questionFragment);
    answers.replaceChildren(answerFragment);
    statusMessage.textContent = "分数→わり算 16問を作成しました。";
    problemPage.scrollIntoView({behavior:"smooth", block:"start"});
  }

  typeSelect.addEventListener("change", (event) => {
    if (event.target.value === TYPE){
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
