"use strict";

// Version 28: comprehensive audit corrections across English data and rate word problems.
(() => {
  const addTokenIfMissing = (question, token, requiredCount) => {
    if (!question?.words) return;
    const count = question.words.filter((word) => word === token).length;
    for (let i = count; i < requiredCount; i += 1) question.words.push(token);
  };

  // make + O + past participle: hard #11 needs three occurrences of "the".
  addTokenIfMissing(makePastParticipleQuestions?.hard?.[10], "the", 3);

  // keep + person + from + V-ing: hard #5 needs two occurrences of "from".
  addTokenIfMissing(keepFromIngQuestions?.hard?.[4], "from", 2);

  // prevent + person + from + V-ing: hard #5 needs two "from"; hard #7 needs "with".
  addTokenIfMissing(preventFromIngQuestions?.hard?.[4], "from", 2);
  addTokenIfMissing(preventFromIngQuestions?.hard?.[6], "with", 1);

  // cause / force: hard #8 needs two occurrences of "the" in "The flaws in the system ...".
  addTokenIfMissing(causeToQuestions?.hard?.[7], "the", 2);
  addTokenIfMissing(forceToQuestions?.hard?.[7], "the", 2);

  // remind + O + of: make Japanese, answer and word bank match exactly.
  if (remindOfQuestions?.hard?.[0]) {
    remindOfQuestions.hard[0] = {
      ja: "この古い写真を見ると、私は家族と初めて海外旅行をしたころを思い出します。",
      answer: "This old photograph reminds me of when I first traveled abroad with my family.",
      words: ["abroad", "family", "first", "I", "me", "my", "of", "old", "photograph", "reminds", "this", "traveled", "when", "with", "although"],
      unused: "although"
    };
  }
  if (remindOfQuestions?.hard?.[6]) {
    remindOfQuestions.hard[6] = {
      ja: "この古い手紙を見ると、私は長い間連絡を取っていない友人と過ごした学生時代を思い出します。",
      answer: "This old letter reminds me of the school days I spent with a friend whom I have not been in touch with for years.",
      words: ["a", "been", "days", "for", "friend", "have", "I", "I", "in", "letter", "me", "not", "of", "old", "reminds", "school", "spent", "the", "this", "touch", "with", "with", "years", "whom", "although"],
      unused: "although"
    };
  }

  // make rewrite: preserve semantic equivalence (change, not maintenance of an existing state).
  if (makeAdjectiveRewriteQuestions?.standard?.[2]) {
    makeAdjectiveRewriteQuestions.standard[2] = {
      source: "We became healthier because of the daily exercise.",
      prompt: "The daily exercise（　　　）（　　　）（　　　）.",
      blanks: "made / us / healthier",
      answer: "The daily exercise made us healthier."
    };
  }

  // Remove the "inanimate-subject construction" label from mixed-subject series.
  const relabel = (value, definitionKey, label, title, optionText) => {
    const definition = worksheetDefinitions?.[definitionKey];
    if (definition) {
      definition.label = label;
      definition.title = title;
    }
    const option = worksheetTypeSelect?.querySelector(`option[value="${value}"]`);
    if (option) option.textContent = optionText;
  };

  relabel(
    "make-past-participle-order",
    "make-past-participle-order",
    "make（目的語＋過去分詞・整序英作文）",
    "make＋O＋過去分詞　整序英作文",
    "make（目的語＋過去分詞）― 整序英作文"
  );
  relabel(
    "prevent-from-ing-order",
    "prevent-from-ing-order",
    "prevent（人＋from＋V-ing・整序英作文）",
    "prevent＋人＋from＋V-ing　整序英作文",
    "prevent（人＋from＋V-ing）― 整序英作文"
  );

  // "Self equation" rate word problems: only use part/whole wording in part contexts.
  // Comparison contexts must not say "全部で...そのうち...".
  if (typeof rateSelfWordProblem === "function" && typeof pickRateSelf === "function") {
    rateSelfWordProblem = function rateSelfWordProblemV28(q) {
      const c = q.context;
      if (q.kind === "rate") {
        const comparisonSafe = [
          `${c.base}は${q.base}${c.unit}、${c.compared}は${q.compared}${c.unit}です。${c.compared}は${c.base}のどれだけにあたるか、小数で表しましょう。`,
          `${c.compared}が${q.compared}${c.unit}、${c.base}が${q.base}${c.unit}です。${c.compared}の${c.base}に対する割合を小数で求めましょう。`
        ];
        if (c.mode === "part") {
          return pickRateSelf([
            ...comparisonSafe,
            `${c.base}は全部で${q.base}${c.unit}です。そのうち、${c.compared}は${q.compared}${c.unit}です。このときの割合を小数で求めましょう。`
          ]);
        }
        return pickRateSelf(comparisonSafe);
      }
      if (q.kind === "compared") {
        return pickRateSelf([
          `${c.base}は${q.base}${c.unit}です。${c.compared}は${c.base}の${q.rate}倍にあたります。${c.compared}を求めましょう。`,
          `${c.base}は${q.base}${c.unit}です。${c.compared}は、その${q.rate}倍にあたります。${c.compared}は何${c.unit}ですか。`,
          `${c.compared}は、${q.base}${c.unit}ある${c.base}の${q.rate}倍です。${c.compared}は何${c.unit}になりますか。`
        ]);
      }
      return pickRateSelf([
        `${c.compared}は${q.compared}${c.unit}です。これは${c.base}の${q.rate}倍にあたります。${c.base}を求めましょう。`,
        `${c.compared}は${q.compared}${c.unit}で、${c.base}の${q.rate}倍にあたります。${c.base}は何${c.unit}ですか。`,
        `${c.base}の${q.rate}倍が、${q.compared}${c.unit}の${c.compared}にあたります。${c.base}は何${c.unit}ですか。`
      ]);
    };
  }

  // Defensive validation for all hard English ordering pools with an explicit unused word.
  // This does not alter content; it logs any future token-count mismatch during development.
  const normalizeToken = (token) => String(token).toLowerCase().replace(/[.,!?;:”“"'’()]/g, "");
  const answerTokens = (answer) => answer.split(/\s+/).map(normalizeToken).filter(Boolean);
  const validateHardPool = (name, pool) => {
    if (!Array.isArray(pool)) return;
    pool.forEach((question, index) => {
      if (!question?.unused || !Array.isArray(question.words)) return;
      const bank = question.words.map(normalizeToken);
      const unused = normalizeToken(question.unused);
      const unusedIndex = bank.indexOf(unused);
      if (unusedIndex >= 0) bank.splice(unusedIndex, 1);
      const target = answerTokens(question.answer);
      const bankCounts = new Map();
      const targetCounts = new Map();
      bank.forEach((t) => bankCounts.set(t, (bankCounts.get(t) || 0) + 1));
      target.forEach((t) => targetCounts.set(t, (targetCounts.get(t) || 0) + 1));
      const same = bank.size === target.length &&
        [...new Set([...bankCounts.keys(), ...targetCounts.keys()])].every((t) => bankCounts.get(t) === targetCounts.get(t));
      if (!same) console.warn(`[V28 audit] ${name} hard #${index + 1}: word bank may not match answer exactly.`);
    });
  };

  validateHardPool("make-past-participle", makePastParticipleQuestions?.hard);
  validateHardPool("keep-from-ing", keepFromIngQuestions?.hard);
  validateHardPool("prevent-from-ing", preventFromIngQuestions?.hard);
  validateHardPool("cause-to", causeToQuestions?.hard);
  validateHardPool("force-to", forceToQuestions?.hard);
  validateHardPool("remind-of", remindOfQuestions?.hard);

  if (typeof syncDifficultyOptions === "function") syncDifficultyOptions();
  if (typeof updateControls === "function") updateControls();
})();
