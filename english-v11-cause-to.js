"use strict";

// Version 11: finalized inanimate-subject cause + object + to-infinitive ordering worksheets.
const causeToQuestions = {
  basic: [
    { ja: "その大雨で、川があふれました。", answer: "The heavy rain caused the river to overflow.", words: ["the river", "the heavy rain", "to overflow", "caused"] },
    { ja: "その事故のため、彼は予定を変更しました。", answer: "The accident caused him to change his plans.", words: ["him", "the accident", "to change his plans", "caused"] },
    { ja: "その大きな音で、赤ちゃんが泣き出しました。", answer: "The loud noise caused the baby to cry.", words: ["the baby", "the loud noise", "to cry", "caused"] },
    { ja: "その知らせで、彼女はその旅行を中止しました。", answer: "The news caused her to cancel the trip.", words: ["her", "the news", "to cancel the trip", "caused"] },
    { ja: "その強風で、木が倒れました。", answer: "The strong wind caused the tree to fall.", words: ["the tree", "the strong wind", "to fall", "caused"] },
    { ja: "その病気のため、彼は学校を休みました。", answer: "The illness caused him to miss school.", words: ["him", "the illness", "to miss school", "caused"] },
    { ja: "その停電で、機械が止まりました。", answer: "The power failure caused the machines to stop.", words: ["the machines", "the power failure", "to stop", "caused"] },
    { ja: "その質問で、私は考え直しました。", answer: "The question caused me to think again.", words: ["me", "the question", "to think again", "caused"] },
    { ja: "その雪のため、試合の開始が遅れました。", answer: "The snow caused the game to start late.", words: ["the game", "the snow", "to start late", "caused"] },
    { ja: "その故障で、列車は止まりました。", answer: "The breakdown caused the train to stop.", words: ["the train", "the breakdown", "to stop", "caused"] },
    { ja: "その新しい規則のため、生徒たちは計画を変えました。", answer: "The new rule caused the students to change their plan.", words: ["the students", "the new rule", "to change their plan", "caused"] },
    { ja: "その遅れのため、私たちは会議に出られませんでした。", answer: "The delay caused us to miss the meeting.", words: ["us", "the delay", "to miss the meeting", "caused"] }
  ],
  standard: [
    { ja: "その大雨のため、川の水位が急に上がりました。", answer: "The heavy rain caused the water level of the river to rise suddenly.", words: ["the water level of the river", "the heavy rain", "to rise suddenly", "caused"] },
    { ja: "その事故のため、彼は旅行の予定を変更しました。", answer: "The accident caused him to change his travel plans.", words: ["him", "the accident", "to change his travel plans", "caused"] },
    { ja: "その突然の知らせで、彼女はしばらく黙り込んでしまいました。", answer: "The sudden news caused her to fall silent for a while.", words: ["her", "the sudden news", "to fall silent for a while", "caused"] },
    { ja: "その強い地震によって、いくつかの古い建物が倒壊しました。", answer: "The strong earthquake caused several old buildings to collapse.", words: ["several old buildings", "the strong earthquake", "to collapse", "caused"] },
    { ja: "その長い遅れのため、私たちは別の交通手段を探すことになりました。", answer: "The long delay caused us to look for another means of transportation.", words: ["us", "the long delay", "to look for another means of transportation", "caused"] },
    { ja: "その故障によって、工場は一時的に生産を停止しました。", answer: "The breakdown caused the factory to stop production temporarily.", words: ["the factory", "the breakdown", "to stop production temporarily", "caused"] },
    { ja: "その予想外の質問で、彼は自分の答えを考え直しました。", answer: "The unexpected question caused him to reconsider his answer.", words: ["him", "the unexpected question", "to reconsider his answer", "caused"] },
    { ja: "その悪天候のため、多くの便が欠航しました。", answer: "The bad weather caused many flights to be canceled.", words: ["many flights", "the bad weather", "to be canceled", "caused"] },
    { ja: "その新しい規則によって、いくつかの会社は方針を変更することになりました。", answer: "The new regulation caused several companies to change their policies.", words: ["several companies", "the new regulation", "to change their policies", "caused"] },
    { ja: "その情報不足のため、私たちは判断を遅らせることになりました。", answer: "The lack of information caused us to delay our decision.", words: ["us", "the lack of information", "to delay our decision", "caused"] },
    { ja: "その道路工事のため、交通が大きく混乱しました。", answer: "The road construction caused traffic to be seriously disrupted.", words: ["traffic", "the road construction", "to be seriously disrupted", "caused"] },
    { ja: "その急激な気温低下によって、湖の表面が凍りました。", answer: "The sudden drop in temperature caused the surface of the lake to freeze.", words: ["the surface of the lake", "the sudden drop in temperature", "to freeze", "caused"] }
  ],
  advanced: [
    { ja: "その長期間の干ばつによって、多くの農家が作物の栽培方法を変えることになりました。", answer: "The prolonged drought caused many farmers to change the way they grew their crops.", words: ["many farmers", "the prolonged drought", "to change the way they grew their crops", "caused"] },
    { ja: "その予期せぬシステム障害により、利用者は重要なデータにアクセスできなくなりました。", answer: "The unexpected system failure caused users to lose access to important data.", words: ["users", "the unexpected system failure", "to lose access to important data", "caused"] },
    { ja: "その研究結果は、科学者たちに従来の理論を見直させました。", answer: "The research findings caused scientists to reconsider the conventional theory.", words: ["scientists", "the research findings", "to reconsider the conventional theory", "caused"] },
    { ja: "急激な原材料価格の上昇により、その会社は製品価格を引き上げることになりました。", answer: "The sharp rise in raw material prices caused the company to raise the prices of its products.", words: ["the company", "the sharp rise in raw material prices", "to raise the prices of its products", "caused"] },
    { ja: "その大規模な停電により、病院は一部の手術を延期せざるを得なくなりました。", answer: "The widespread power outage caused the hospital to postpone some operations.", words: ["the hospital", "the widespread power outage", "to postpone some operations", "caused"] },
    { ja: "その強い批判を受けて、政府は当初の方針を再検討することになりました。", answer: "The strong criticism caused the government to reconsider its original policy.", words: ["the government", "the strong criticism", "to reconsider its original policy", "caused"] },
    { ja: "その道路の閉鎖により、多くの通勤者が別の経路を利用することになりました。", answer: "The closure of the road caused many commuters to use alternative routes.", words: ["many commuters", "the closure of the road", "to use alternative routes", "caused"] },
    { ja: "その急激な需要の増加により、その会社は生産能力を拡大することになりました。", answer: "The sudden increase in demand caused the company to expand its production capacity.", words: ["the company", "the sudden increase in demand", "to expand its production capacity", "caused"] },
    { ja: "その誤った情報の拡散により、多くの人々が状況を誤解しました。", answer: "The spread of false information caused many people to misunderstand the situation.", words: ["many people", "the spread of false information", "to misunderstand the situation", "caused"] },
    { ja: "その予算削減により、研究チームは計画の一部を中止することになりました。", answer: "The budget cuts caused the research team to abandon part of the project.", words: ["the research team", "the budget cuts", "to abandon part of the project", "caused"] },
    { ja: "その長引く交渉のため、最終決定が数か月遅れることになりました。", answer: "The prolonged negotiations caused the final decision to be delayed for several months.", words: ["the final decision", "the prolonged negotiations", "to be delayed for several months", "caused"] },
    { ja: "その新しい証拠によって、警察は事件の捜査方針を変更することになりました。", answer: "The new evidence caused the police to change the course of the investigation.", words: ["the police", "the new evidence", "to change the course of the investigation", "caused"] }
  ],
  hard: [
    { ja: "その予期せぬ市場の変化により、多くの企業が長期計画を見直すことになりました。", answer: "The sudden market change caused many businesses to reconsider their long-term plans.", words: ["businesses", "caused", "change", "long-term", "many", "market", "plans", "reconsider", "sudden", "the", "their", "to", "whereas"], unused: "whereas" },
    { ja: "十分な安全対策が取られていなかったことが、その事故をさらに深刻なものにしました。", answer: "The lack of sufficient safety measures caused the accident to become more serious.", words: ["accident", "become", "caused", "lack", "measures", "more", "of", "serious", "safety", "sufficient", "the", "the", "to", "whereas"], unused: "whereas" },
    { ja: "その新たな証拠により、研究者たちは以前の結論を再検討せざるを得なくなりました。", answer: "The new evidence caused researchers to reconsider their previous conclusions.", words: ["caused", "conclusions", "evidence", "new", "previous", "researchers", "reconsider", "the", "their", "to", "although"], unused: "although" },
    { ja: "その突然の規制変更により、いくつかの企業は予定していた投資を延期することになりました。", answer: "The sudden change in regulation caused several companies to delay their planned investments.", words: ["caused", "change", "companies", "delay", "in", "investments", "planned", "regulation", "several", "sudden", "the", "their", "to", "unless"], unused: "unless" },
    { ja: "その誤解を招く報道により、多くの人々が状況を実際より深刻だと思い込みました。", answer: "The misleading reports caused many people to believe the situation was more serious than it actually was.", words: ["actually", "believe", "caused", "it", "many", "misleading", "more", "people", "reports", "serious", "situation", "than", "the", "the", "to", "was", "was", "whereas"], unused: "whereas" },
    { ja: "その長期間の通信障害により、救助隊は遠隔地との連絡方法を変更することになりました。", answer: "The prolonged communication failure caused rescue teams to change how they communicated with remote areas.", words: ["areas", "caused", "change", "communicated", "communication", "failure", "how", "prolonged", "remote", "rescue", "teams", "the", "they", "to", "with", "although"], unused: "although" },
    { ja: "その急激な物価上昇により、多くの家庭が支出を大幅に減らすことになりました。", answer: "The sudden rise in prices caused many families to cut their spending sharply.", words: ["caused", "cut", "families", "in", "many", "prices", "rise", "sharply", "spending", "sudden", "the", "their", "to", "whereas"], unused: "whereas" },
    { ja: "その制度上の不備により、本来支援を受けられるはずの人々まで、申請をやり直すことになりました。", answer: "The flaws in the system caused even people who were eligible for assistance to resubmit their applications.", words: ["applications", "assistance", "caused", "eligible", "even", "flaws", "for", "in", "people", "resubmit", "system", "the", "their", "to", "were", "who", "although"], unused: "although" },
    { ja: "そのデータの誤りにより、研究チームは分析を最初からやり直すことになりました。", answer: "The errors in the data caused the research team to restart the analysis from the beginning.", words: ["analysis", "beginning", "caused", "data", "errors", "from", "in", "research", "restart", "team", "the", "the", "the", "the", "the", "to", "whereas"], unused: "whereas" },
    { ja: "その交渉の決裂により、両国は代替案を検討することになりました。", answer: "The breakdown of the negotiations caused both countries to consider alternative options.", words: ["alternative", "both", "breakdown", "caused", "consider", "countries", "negotiations", "of", "options", "the", "the", "to", "unless"], unused: "unless" },
    { ja: "その新しい証拠がもっと早く発見されていれば、警察は捜査方針を変えることになっていたでしょう。", answer: "If the new evidence had been found earlier, it would have caused the police to change their approach to the investigation.", words: ["although", "approach", "been", "caused", "change", "earlier", "evidence", "found", "had", "have", "if", "investigation", "it", "new", "police", "the", "the", "the", "their", "to", "to", "would"], unused: "although" },
    { ja: "その長引く不確実性により、投資家たちは最終決定を先延ばしにすることになりました。", answer: "The prolonged uncertainty caused investors to delay their final decision.", words: ["caused", "decision", "delay", "final", "investors", "prolonged", "the", "their", "to", "uncertainty", "whereas"], unused: "whereas" }
  ]
};

worksheetDefinitions["cause-to-order"] = {
  label: "物主構文 cause（目的語＋to do・整序英作文）",
  title: "物主構文 cause＋目的語＋to do　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。",
  answerNote: "語順は「物主語＋cause／causes／caused＋目的語＋to do」です。",
  type: "english-order",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "原因となる出来事＋cause＋目的語＋to do の基本を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "目的語や不定詞部分を少し長くし、受動態も扱います。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "高校英語レベルの語彙と複雑な原因・結果表現を扱います。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "単語単位に分割し、不要語を1語加えます。" }
  }
};

const enableToOptionV11 = worksheetTypeSelect.querySelector('option[value="enable-to-order"]');
if (enableToOptionV11 && !worksheetTypeSelect.querySelector('option[value="cause-to-order"]')) {
  const option = document.createElement("option");
  option.value = "cause-to-order";
  option.textContent = "物主構文 cause（目的語＋to do）― 整序英作文";
  enableToOptionV11.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV11Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV11CauseTo() {
  if (worksheetTypeSelect.value === "cause-to-order") return causeToQuestions[difficultySelect.value];
  return buildQuestionPoolV11Previous();
};

const appendEnglishAnswerV11Previous = appendEnglishAnswer;
appendEnglishAnswer = function appendEnglishAnswerV11(fragment, question, number, type) {
  if (worksheetTypeSelect.value !== "cause-to-order") {
    appendEnglishAnswerV11Previous(fragment, question, number, type);
    return;
  }
  const item = document.createElement("div");
  item.className = "english-answer-item";
  const answer = document.createElement("p");
  answer.innerHTML = `<b>${number}. ${question.answer}</b>`;
  const structure = document.createElement("p");
  structure.className = "answer-explanation";
  structure.textContent = `物主語＋cause／causes／caused＋目的語＋to do${question.unused ? `（不要語：${question.unused}）` : ""}`;
  item.append(answer, structure);
  fragment.appendChild(item);
};

syncDifficultyOptions();
updateControls();