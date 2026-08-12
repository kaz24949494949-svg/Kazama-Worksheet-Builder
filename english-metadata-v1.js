"use strict";

// Centralized display metadata for mixed-subject English constructions.
(() => {
  const setMetadata = (value, label, title, optionText) => {
    const definition = worksheetDefinitions[value];
    if (definition) {
      definition.label = label;
      definition.title = title;
    }
    const option = worksheetTypeSelect.querySelector(`option[value="${value}"]`);
    if (option) option.textContent = optionText;
  };

  setMetadata(
    "make-bare-infinitive-order",
    "make（目的語＋動詞の原形・整序英作文）",
    "make＋O＋動詞の原形　整序英作文",
    "make（目的語＋動詞の原形）― 整序英作文"
  );

  setMetadata(
    "keep-adjective-order",
    "keep（目的語＋形容詞・整序英作文）",
    "keep＋O＋形容詞　整序英作文",
    "keep（目的語＋形容詞）― 整序英作文"
  );

  setMetadata(
    "keep-present-participle-order",
    "keep（目的語＋現在分詞・整序英作文）",
    "keep＋O＋現在分詞　整序英作文",
    "keep（目的語＋現在分詞）― 整序英作文"
  );
})();