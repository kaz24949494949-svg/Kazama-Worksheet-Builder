"use strict";

// Version 30: consolidated finalized corrections.
// This replaces the layered v27/v28 audit patch files with one maintainable module.
(() => {
  const relabel = (value, definitionKey, label, title, optionText) => {
    const definition = worksheetDefinitions?.[definitionKey];
    if (definition) {
      definition.label = label;
      definition.title = title;
    }
    const option = worksheetTypeSelect?.querySelector(`option[value="${value}"]`);
    if (option) option.textContent = optionText;
  };

  const addTokenIfMissing = (question, token, requiredCount) => {
    if (!question?.words) return;
    const currentCount = question.words.filter((word) => word === token).length;
    for (let i = currentCount; i < requiredCount; i += 1) question.words.push(token);
  };

  // Mixed-subject series: use construction names rather than calling them all inanimate-subject constructions.
  relabel("make-adjective-order", "make-adjective-order", "make（目的語＋形容詞・整序英作文）", "make＋O＋形容詞　整序英作文", "make（目的語＋形容詞）― 整序英作文");
  relabel("make-bare-infinitive-order", "make-bare-infinitive-order", "make（目的語＋動詞の原形・整序英作文）", "make＋O＋動詞の原形　整序英作文", "make（目的語＋動詞の原形）― 整序英作文");
  relabel("make-past-participle-order", "make-past-participle-order", "make（目的語＋過去分詞・整序英作文）", "make＋O＋過去分詞　整序英作文", "make（目的語＋過去分詞）― 整序英作文");
  relabel("keep-adjective-order", "keep-adjective-order", "keep（目的語＋形容詞・整序英作文）", "keep＋O＋形容詞　整序英作文", "keep（目的語＋形容詞）― 整序英作文");
  relabel("keep-present-participle-order", "keep-present-participle-order", "keep（目的語＋現在分詞・整序英作文）", "keep＋O＋現在分詞　整序英作文", "keep（目的語＋現在分詞）― 整序英作文");
  relabel("keep-from-ing-order", "keep-from-ing-order", "keep（人＋from＋V-ing・整序英作文）", "keep＋人＋from＋V-ing　整序英作文", "keep（人＋from＋V-ing）― 整序英作文");
  relabel("prevent-from-ing-order", "prevent-from-ing-order", "prevent（人＋from＋V-ing・整序英作文）", "prevent＋人＋from＋V-ing　整序英作文", "prevent（人＋from＋V-ing）― 整序英作文");

  // cause: keep causation distinct from force/coercion in the Japanese prompts.
  if (causeToQuestions?.advanced?.[4]) {
    causeToQuestions.advanced[4].ja = "その大規模な停電により、病院は一部の手術を延期することになりました。";
  }
  if (causeToQuestions?.hard?.[2]) {
    causeToQuestions.hard[2].ja = "その新たな証拠により、研究者たちは以前の結論を再検討することになりました。";
  }

  // force: finalized natural hard-level wording.
  if (forceToQuestions?.hard?.[2]) {
    forceToQuestions.hard[2] = {
      ja: "その新しい証拠により、研究者たちは、それまで広く受け入れられていた説明を根本から見直さざるを得ませんでした。",
      answer: "The new evidence forced the researchers to fundamentally reconsider the explanation that had previously been widely accepted.",
      words: ["accepted", "been", "evidence", "explanation", "forced", "fundamentally", "had", "new", "previously", "reconsider", "researchers", "that", "the", "the", "to", "widely", "although"],
      unused: "although"
    };
  }
  if (forceToQuestions?.hard?.[9]) {
    forceToQuestions.hard[9] = {
      ja: "その交渉の決裂により、両国は当初は検討していなかった代替案まで検討せざるを得ませんでした。",
      answer: "The breakdown of the negotiations forced both countries to consider alternatives they had not originally considered.",
      words: ["alternatives", "both", "breakdown", "consider", "considered", "countries", "forced", "had", "negotiations", "not", "of", "originally", "the", "the", "they", "to", "unless"],
      unused: "unless"
    };
  }

  // remind: finalized standard wording.
  if (remindOfQuestions?.standard?.[6]) {
    remindOfQuestions.standard[6] = {
      ja: "この料理の味を感じると、私たちは子どものころに家族で囲んだ夕食を思い出します。",
      answer: "The taste of this dish reminds us of the family dinners we had when we were children.",
      words: ["us", "the taste of this dish", "of the family dinners we had when we were children", "reminds"]
    };
  }
  if (remindOfQuestions?.standard?.[9]) {
    remindOfQuestions.standard[9] = {
      ja: "その町の雰囲気に、彼は若いころ暮らしていた場所を思い出しました。",
      answer: "The atmosphere of the town reminded him of the place where he lived when he was young.",
      words: ["him", "the atmosphere of the town", "of the place where he lived when he was young", "reminded"]
    };
  }

  // keep + person + from + V-ing: hard mode uses word-level ordering and exactly one unused word.
  if (keepFromIngQuestions?.hard) {
    keepFromIngQuestions.hard = [
      { ja: "直前に届いた警告のおかげで、私たちは危険な区域に入らずに済みました。", answer: "The warning that arrived at the last minute kept us from entering the dangerous area.", words: ["area", "arrived", "at", "dangerous", "entering", "from", "kept", "last", "minute", "the", "the", "the", "that", "us", "warning", "although"], unused: "although" },
      { ja: "彼がどれほど疲れていたとしても、責任感が彼に仕事を途中で投げ出させませんでした。", answer: "However tired he was, his sense of responsibility kept him from abandoning the task halfway through.", words: ["abandoning", "from", "halfway", "he", "him", "his", "however", "kept", "of", "responsibility", "sense", "task", "the", "through", "tired", "was", "unless"], unused: "unless" },
      { ja: "その情報が事前に共有されていれば、何人かの参加者が同じ間違いをするのを防げたかもしれません。", answer: "That information could have kept several participants from making the same mistake if it had been shared in advance.", words: ["advance", "been", "could", "from", "had", "have", "if", "in", "information", "it", "kept", "making", "mistake", "participants", "same", "several", "shared", "that", "the", "despite"], unused: "despite" },
      { ja: "新たに導入された規則は、研究者が必要なデータを自由に利用するのを妨げかねません。", answer: "The newly introduced regulations may well keep researchers from accessing the necessary data freely.", words: ["accessing", "data", "freely", "from", "introduced", "keep", "may", "necessary", "newly", "regulations", "researchers", "the", "the", "well", "whereas"], unused: "whereas" },
      { ja: "周囲からの激しい批判でさえ、彼女が自分の判断に従って行動するのを止めることはできませんでした。", answer: "Even the severe criticism from those around her could not keep her from acting according to her own judgment.", words: ["according", "acting", "around", "could", "criticism", "even", "from", "from", "her", "her", "judgment", "keep", "not", "own", "severe", "the", "those", "to", "because"], unused: "because" },
      { ja: "もし安全確認が適切に行われていなかったら、その装置でも作業員が重大な事故を起こすのを防げなかったかもしれません。", answer: "Even the device might not have kept the workers from causing a serious accident if the safety checks had not been carried out properly.", words: ["a", "accident", "been", "carried", "causing", "checks", "device", "even", "from", "had", "have", "if", "kept", "might", "not", "not", "out", "properly", "safety", "serious", "the", "the", "the", "workers", "whenever"], unused: "whenever" },
      { ja: "長年にわたって身につけた経験が、予期せぬ事態に直面しても彼に冷静さを失わせませんでした。", answer: "The experience he had gained over the years kept him from losing his composure when faced with the unexpected situation.", words: ["composure", "experience", "faced", "from", "gained", "had", "he", "him", "his", "kept", "losing", "over", "situation", "the", "the", "the", "unexpected", "when", "with", "years", "whether"], unused: "whether" },
      { ja: "予算がさらに削減されれば、学校は、それを必要とする生徒に十分な支援を提供できなくなるでしょう。", answer: "Further budget cuts will keep the school from providing adequate support for students who need it.", words: ["adequate", "budget", "cuts", "for", "from", "further", "it", "keep", "need", "providing", "school", "students", "support", "the", "who", "will", "whose"], unused: "whose" },
      { ja: "彼が事実を隠そうとしたことも、私たちが何かがおかしいと疑うのを止めることはできませんでした。", answer: "His attempt to hide the facts did not keep us from suspecting that something was wrong.", words: ["attempt", "did", "facts", "from", "hide", "his", "keep", "not", "something", "suspecting", "that", "the", "to", "us", "was", "wrong", "since"], unused: "since" },
      { ja: "計画の徹底的な見直しが実施されていれば、担当者は同じ判断ミスを繰り返さずに済んだかもしれません。", answer: "A thorough review of the plan might have kept the officials in charge from repeating the same error in judgment if it had been carried out.", words: ["a", "been", "carried", "charge", "error", "from", "had", "have", "if", "in", "in", "it", "judgment", "kept", "might", "of", "officials", "out", "plan", "repeating", "review", "same", "the", "the", "the", "thorough", "although"], unused: "although" },
      { ja: "彼女の冷静な態度のおかげで、他のメンバーは感情的に反応せずに済みました。", answer: "Her calm attitude kept the other members from reacting emotionally.", words: ["attitude", "calm", "emotionally", "from", "her", "kept", "members", "other", "reacting", "the", "unless"], unused: "unless" },
      { ja: "たとえ法律が改正されたとしても、それだけでは企業が同じ慣行を続けるのを防ぐには十分でないかもしれません。", answer: "Even if the law is revised, that alone may not be enough to keep companies from continuing the same practice.", words: ["alone", "be", "companies", "continuing", "enough", "even", "from", "if", "is", "keep", "law", "may", "not", "practice", "revised", "same", "that", "the", "the", "to", "despite"], unused: "despite" }
    ];
    worksheetDefinitions["keep-from-ing-order"].instruction = "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。";
    worksheetDefinitions["keep-from-ing-order"].difficulties.hard.description = "高校卒業・共通テスト程度。単語単位に分割し、不要語を1語加えます。";
  }

  // Remaining word-bank corrections from the full audit.
  addTokenIfMissing(makePastParticipleQuestions?.hard?.[10], "the", 3);
  addTokenIfMissing(preventFromIngQuestions?.hard?.[4], "from", 2);
  addTokenIfMissing(preventFromIngQuestions?.hard?.[6], "with", 1);
  addTokenIfMissing(causeToQuestions?.hard?.[7], "the", 2);
  addTokenIfMissing(forceToQuestions?.hard?.[7], "the", 2);

  // remind hard: preserve "old" and exact one-unused-word behavior.
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

  // make rewrite: source and rewritten sentence must be genuinely equivalent.
  if (makeAdjectiveRewriteQuestions?.standard?.[2]) {
    makeAdjectiveRewriteQuestions.standard[2] = {
      source: "We became healthier because of the daily exercise.",
      prompt: "The daily exercise（　　　）（　　　）（　　　）.",
      blanks: "made / us / healthier",
      answer: "The daily exercise made us healthier."
    };
  }

  // Rate self-equation: reserve part/whole wording for part contexts only.
  if (typeof rateSelfWordProblem === "function" && typeof pickRateSelf === "function") {
    rateSelfWordProblem = function rateSelfWordProblemV30(q) {
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

  // keep-from answer note: show the unused word in hard mode without another standalone patch file.
  const previousAppendEnglishAnswer = appendEnglishAnswer;
  appendEnglishAnswer = function appendEnglishAnswerV30(fragment, question, number, type) {
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

  if (typeof syncDifficultyOptions === "function") syncDifficultyOptions();
  if (typeof updateControls === "function") updateControls();
})();
