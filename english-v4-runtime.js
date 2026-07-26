"use strict";

// Route the past-participle series through the existing English ordering renderer.
worksheetDefinitions["make-past-participle-order"].type = "english-order";

appendEnglishAnswer = function appendEnglishAnswerV4Runtime(fragment, question, number, type) {
  const item = document.createElement("div");
  item.className = "english-answer-item";

  const answer = document.createElement("p");
  answer.innerHTML = `<b>${number}. ${question.answer}</b>`;

  const structure = document.createElement("p");
  structure.className = "answer-explanation";

  if (type === "english-rewrite") {
    structure.textContent = `空欄：${question.blanks}`;
  } else {
    const isPastParticiple = worksheetTypeSelect.value === "make-past-participle-order";
    const complement = isPastParticiple ? "過去分詞" : "形容詞";
    structure.textContent = `主語＋make／makes／made＋目的語＋${complement}${question.unused ? `（不要語：${question.unused}）` : ""}`;
  }

  item.append(answer, structure);
  fragment.appendChild(item);
};

syncDifficultyOptions();
updateControls();
