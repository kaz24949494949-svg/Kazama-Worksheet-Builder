"use strict";

(() => {
  const typeSelect = document.getElementById("worksheetType");
  const problemPage = document.querySelector(".problem-page");
  const answerPage = document.querySelector(".answer-page");
  const questions = document.getElementById("questions");
  const answers = document.getElementById("answers");

  if (!typeSelect || !problemPage || !answerPage || !questions || !answers) return;

  const problemClasses = [
    "fraction-box-page",
    "fraction-box-base-page",
    "integer-times-box-page",
    "integer-equals-fraction-page",
    "integer-over-box-page",
    "fraction-to-division-page"
  ];

  const answerClasses = [
    "fraction-box-answer-page",
    "integer-equals-fraction-answer-page",
    "integer-over-box-answer-page",
    "fraction-to-division-answer-page"
  ];

  const questionClasses = [
    "fraction-box-questions",
    "integer-equals-fraction-questions",
    "integer-over-box-questions",
    "fraction-to-division-questions"
  ];

  const answerListClasses = [
    "fraction-box-answers",
    "integer-equals-fraction-answers",
    "integer-over-box-answers",
    "fraction-to-division-answers"
  ];

  function clearFractionModes() {
    problemPage.classList.remove(...problemClasses);
    answerPage.classList.remove(...answerClasses);
    questions.classList.remove(...questionClasses);
    answers.classList.remove(...answerListClasses);
  }

  // 分数系列の各教材ハンドラより先に実行し、前教材の専用クラスを必ず除去する。
  // その後、選択された教材側が必要なクラスだけを再付与する。
  typeSelect.addEventListener("change", clearFractionModes, true);
})();
