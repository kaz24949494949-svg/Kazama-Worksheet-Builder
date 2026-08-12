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
    "fraction-to-division-page",
    "multiple-page"
  ];

  const answerClasses = [
    "fraction-box-answer-page",
    "integer-equals-fraction-answer-page",
    "integer-over-box-answer-page",
    "fraction-to-division-answer-page",
    "multiple-answer-page"
  ];

  const questionClasses = [
    "fraction-box-questions",
    "integer-equals-fraction-questions",
    "integer-over-box-questions",
    "fraction-to-division-questions",
    "multiple-questions",
    "english-questions"
  ];

  const answerListClasses = [
    "fraction-box-answers",
    "integer-equals-fraction-answers",
    "integer-over-box-answers",
    "fraction-to-division-answers",
    "multiple-answers",
    "english-answers"
  ];

  function clearWorksheetModes() {
    problemPage.classList.remove(...problemClasses);
    answerPage.classList.remove(...answerClasses);
    questions.classList.remove(...questionClasses);
    answers.classList.remove(...answerListClasses);
  }

  // This file is loaded before every worksheet-specific script. Capturing the
  // change event on document makes the cleanup run before later handlers that
  // may stop propagation while switching worksheet types.
  document.addEventListener("change", (event) => {
    if (event.target === typeSelect) clearWorksheetModes();
  }, true);
})();
