"use strict";

(() => {
  const typeSelect = document.getElementById("worksheetType");
  if (typeSelect && !typeSelect.querySelector('option[value="word-solution-rate"]')) {
    const group = document.createElement("optgroup");
    group.label = "算数｜文章題解決";
    [
      ["word-solution-rate", "① 文章題解決｜割合"],
      ["word-solution-ratio", "② 文章題解決｜比"],
      ["word-solution-speed", "③ 文章題解決｜速さ"]
    ].forEach(([value, text]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      group.appendChild(option);
    });
    typeSelect.appendChild(group);
  }

  if (!document.querySelector('link[data-word-problem-solution]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "word-problem-solution-v1.css";
    link.dataset.wordProblemSolution = "v1";
    document.head.appendChild(link);
  }

  if (!document.querySelector('link[data-word-problem-thinking-rate]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "word-problem-thinking-rate-v1.css";
    link.dataset.wordProblemThinkingRate = "v1";
    document.head.appendChild(link);
  }

  if (!document.querySelector('script[data-word-problem-solution]')) {
    const script = document.createElement("script");
    script.src = "word-problem-solution-v1.js";
    script.async = false;
    script.dataset.wordProblemSolution = "v1";
    document.body.appendChild(script);
  }

  if (!document.querySelector('script[data-word-problem-thinking-rate]')) {
    const script = document.createElement("script");
    script.src = "word-problem-thinking-rate-v1.js";
    script.async = false;
    script.dataset.wordProblemThinkingRate = "v1";
    document.body.appendChild(script);
  }

  const version = document.querySelector(".version-label");
  if (version) version.textContent = "Version 61";
})();

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

  const detailedPrintTypes = new Set([
    "rate-word-problems",
    "rate-word-line-equation",
    "rate-word-complete-line-equation",
    "rate-word-draw-line-equation",
    "rate-word-self-equation",
    "rate-word-select-info-equation",
    "rate-word-two-step"
  ]);
  const typeSelect = document.getElementById("worksheetType");
  const countSelect = document.getElementById("count");
  const applyPrintFlowMode = () => {
    const type = typeSelect?.value || "";
    const count = Number(countSelect?.value || 0);
    document.body.classList.toggle("print-smart-flow", detailedPrintTypes.has(type) && count >= 5);
  };
  const clearPrintFlowMode = () => document.body.classList.remove("print-smart-flow");

  window.addEventListener("beforeprint", applyPrintFlowMode);
  window.addEventListener("afterprint", clearPrintFlowMode);
  const printMedia = window.matchMedia?.("print");
  if (printMedia?.addEventListener) {
    printMedia.addEventListener("change", (event) => {
      if (event.matches) applyPrintFlowMode();
      else clearPrintFlowMode();
    });
  }
});
