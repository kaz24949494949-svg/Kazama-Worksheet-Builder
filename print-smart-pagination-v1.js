"use strict";

(() => {
  const detailedTypes = new Set([
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

  function applyPrintFlowMode() {
    const type = typeSelect?.value || "";
    const count = Number(countSelect?.value || 0);

    /*
     * Five or more detailed word problems commonly occupy more than one
     * problem page. For those layouts, let the answer section flow into the
     * unused remainder of the final problem page instead of forcing page 3.
     */
    document.body.classList.toggle(
      "print-smart-flow",
      detailedTypes.has(type) && count >= 5
    );
  }

  function clearPrintFlowMode() {
    document.body.classList.remove("print-smart-flow");
  }

  window.addEventListener("beforeprint", applyPrintFlowMode);
  window.addEventListener("afterprint", clearPrintFlowMode);

  const media = window.matchMedia?.("print");
  if (media?.addEventListener) {
    media.addEventListener("change", (event) => {
      if (event.matches) applyPrintFlowMode();
      else clearPrintFlowMode();
    });
  }
})();
