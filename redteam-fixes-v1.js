"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const patchLibrary = (contexts) => {
    if (!Array.isArray(contexts)) return;
    const item = contexts.find((x) => x && x.id === "library");
    if (!item) return;
    item.base = "図書館が所蔵している本";
    item.compared = "貸し出されている本";
  };

  if (typeof rateWordContexts !== "undefined") patchLibrary(rateWordContexts);
  if (typeof rateBridgeContexts !== "undefined") patchLibrary(rateBridgeContexts);
  if (typeof rateCompleteContexts !== "undefined") patchLibrary(rateCompleteContexts);
  if (typeof rateDrawContexts !== "undefined") patchLibrary(rateDrawContexts);
  if (typeof rateSelfContexts !== "undefined") patchLibrary(rateSelfContexts);
  if (typeof rateSelectContexts !== "undefined") patchLibrary(rateSelectContexts);

  if (typeof rateTwoStepContexts !== "undefined") {
    const item = rateTwoStepContexts.find((x) => x && x.id === "library");
    if (item) {
      item.base = "図書館が所蔵している本";
      item.compared = "物語の本";
      item.baseParts = ["A書庫で管理している本", "B書庫で管理している本"];
      item.comparedParts = ["A書庫で管理している物語の本", "B書庫で管理している物語の本"];
    }
  }

  if (typeof worksheetDefinitions !== "undefined" && worksheetDefinitions["rate-percent"]?.difficulties?.advanced) {
    worksheetDefinitions["rate-percent"].difficulties.advanced.description = "5％・10％刻みに限らない割合や、100％をこえる割合も扱います。";
  }

  if (typeof buildRateDecimalPool === "function") {
    const original = buildRateDecimalPool;
    buildRateDecimalPool = (settings) => {
      const seen = new Set();
      return original(settings).filter((q) => {
        const key = `${q.base}:${q.compared}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    };
  }
});
