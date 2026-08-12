"use strict";

// Version 27 follow-up: keep-from-ing hard mode now has one unused word,
// so show it in the answer explanation just like the later English series.
(() => {
  const previousAppendEnglishAnswer = appendEnglishAnswer;
  appendEnglishAnswer = function appendEnglishAnswerV27KeepFrom(fragment, question, number, type) {
    if (worksheetTypeSelect.value !== "keep-from-ing-order") {
      previousAppendEnglishAnswer(fragment, question, number, type);
      return;
    }

    const item = document.createElement("div");
    item.className = "english-answer-item";
    const answer = document.createElement("p");
    answer.innerHTML = `<b>${number}. ${question.answer}</b>`;
    const structure = document.createElement("p");
    structure.className = "answer-explanation";
    structure.textContent = `主語＋keep／keeps／kept＋人＋from＋V-ing${question.unused ? `（不要語：${question.unused}）` : ""}`;
    item.append(answer, structure);
    fragment.appendChild(item);
  };
})();
