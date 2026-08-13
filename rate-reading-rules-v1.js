"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const formula = "もとにする量 × 割合 ＝ 比べる量";
  const noRule = "割合の表現『もとにする量 の 割合』では、『の』は『×』を表します。";
  const ids = [
    "rate-word-problems",
    "rate-line-diagram",
    "rate-word-line-equation",
    "rate-word-complete-line-equation",
    "rate-word-draw-line-equation",
    "rate-word-self-equation",
    "rate-word-select-info-equation",
    "rate-word-two-step"
  ];

  ids.forEach((id) => {
    const def = typeof worksheetDefinitions !== "undefined" ? worksheetDefinitions[id] : null;
    if (!def) return;
    const base = def.answerNote || "";
    if (!base.includes(formula)) {
      def.answerNote = `${base}${base ? " " : ""}【カザマ式 補強】${formula}。${noRule}`;
    }
  });
});
