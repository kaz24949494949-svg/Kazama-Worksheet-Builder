"use strict";

// Version 12: finalized inanimate-subject force + object + to-infinitive ordering worksheets.
const forceToQuestions = {
  basic: [
    { ja: "その大雪のため、私たちは旅行を中止せざるを得ませんでした。", answer: "The heavy snow forced us to cancel the trip.", words: ["us", "the heavy snow", "to cancel the trip", "forced"] },
    { ja: "その事故のため、彼は仕事を休まざるを得ませんでした。", answer: "The accident forced him to miss work.", words: ["him", "the accident", "to miss work", "forced"] },
    { ja: "その大雨のため、彼らは試合を延期せざるを得ませんでした。", answer: "The heavy rain forced them to postpone the game.", words: ["them", "the heavy rain", "to postpone the game", "forced"] },
    { ja: "その故障のため、私たちは別の機械を使わざるを得ませんでした。", answer: "The breakdown forced us to use another machine.", words: ["us", "the breakdown", "to use another machine", "forced"] },
    { ja: "その強風のため、飛行機は別の空港に着陸せざるを得ませんでした。", answer: "The strong wind forced the plane to land at another airport.", words: ["the plane", "the strong wind", "to land at another airport", "forced"] },
    { ja: "その病気のため、彼女は旅行を中止せざるを得ませんでした。", answer: "The illness forced her to cancel the trip.", words: ["her", "the illness", "to cancel the trip", "forced"] },
    { ja: "その停電のため、店は早く閉めざるを得ませんでした。", answer: "The power failure forced the store to close early.", words: ["the store", "the power failure", "to close early", "forced"] },
    { ja: "その新しい規則のため、生徒たちは計画を変えざるを得ませんでした。", answer: "The new rule forced the students to change their plan.", words: ["the students", "the new rule", "to change their plan", "forced"] },
    { ja: "その道路の閉鎖のため、私たちは別の道を通らざるを得ませんでした。", answer: "The road closure forced us to take another route.", words: ["us", "the road closure", "to take another route", "forced"] },
    { ja: "その資金不足のため、その団体は活動を減らさざるを得ませんでした。", answer: "The lack of funds forced the organization to reduce its activities.", words: ["the organization", "the lack of funds", "to reduce its activities", "forced"] },
    { ja: "その問題のため、彼は予定を変更せざるを得ませんでした。", answer: "The problem forced him to change his schedule.", words: ["him", "the problem", "to change his schedule", "forced"] },
    { ja: "その悪天候のため、私たちは家にとどまらざるを得ませんでした。", answer: "The bad weather forced us to stay home.", words: ["us", "the bad weather", "to stay home", "forced"] }
  ],
  standard: [
    { ja: "その大雪のため、多くの通勤者は別の交通手段を使わざるを得ませんでした。", answer: "The heavy snow forced many commuters to use alternative transportation.", words: ["many commuters", "the heavy snow", "to use alternative transportation", "forced"] },
    { ja: "その突然の停電のため、病院は一部の手術を延期せざるを得ませんでした。", answer: "The sudden power outage forced the hospital to postpone some operations.", words: ["the hospital", "the sudden power outage", "to postpone some operations", "forced"] },
    { ja: "その道路工事のため、運転手たちは遠回りをせざるを得ませんでした。", answer: "The road construction forced drivers to take a detour.", words: ["drivers", "the road construction", "to take a detour", "forced"] },
    { ja: "その予期せぬ費用の増加により、その会社は計画を見直さざるを得ませんでした。", answer: "The unexpected increase in costs forced the company to revise its plan.", words: ["the company", "the unexpected increase in costs", "to revise its plan", "forced"] },
    { ja: "その悪天候により、主催者は屋外イベントを中止せざるを得ませんでした。", answer: "The bad weather forced the organizers to cancel the outdoor event.", words: ["the organizers", "the bad weather", "to cancel the outdoor event", "forced"] },
    { ja: "その厳しい規則のため、多くの企業は手続きを変更せざるを得ませんでした。", answer: "The strict regulations forced many companies to change their procedures.", words: ["many companies", "the strict regulations", "to change their procedures", "forced"] },
    { ja: "その資金不足のため、研究チームは実験の規模を縮小せざるを得ませんでした。", answer: "The lack of funds forced the research team to reduce the scale of the experiment.", words: ["the research team", "the lack of funds", "to reduce the scale of the experiment", "forced"] },
    { ja: "その事故による渋滞のため、私たちは予定を変更せざるを得ませんでした。", answer: "The traffic jam caused by the accident forced us to change our plans.", words: ["us", "the traffic jam caused by the accident", "to change our plans", "forced"] },
    { ja: "その急な気温低下により、農家は作物を早めに収穫せざるを得ませんでした。", answer: "The sudden drop in temperature forced farmers to harvest their crops early.", words: ["farmers", "the sudden drop in temperature", "to harvest their crops early", "forced"] },
    { ja: "その設備の故障により、工場は一時的に生産を停止せざるを得ませんでした。", answer: "The equipment failure forced the factory to stop production temporarily.", words: ["the factory", "the equipment failure", "to stop production temporarily", "forced"] },
    { ja: "その新しい証拠により、警察は捜査方針を変更せざるを得ませんでした。", answer: "The new evidence forced the police to change the course of the investigation.", words: ["the police", "the new evidence", "to change the course of the investigation", "forced"] },
    { ja: "その長引く交渉のため、両社は当初の条件を再検討せざるを得ませんでした。", answer: "The prolonged negotiations forced both companies to reconsider the original terms.", words: ["both companies", "the prolonged negotiations", "to reconsider the original terms", "forced"] }
  ],
  advanced: [
    { ja: "その長期間の干ばつにより、多くの農家は栽培する作物を変えざるを得ませんでした。", answer: "The prolonged drought forced many farmers to change the crops they grew.", words: ["many farmers", "the prolonged drought", "to change the crops they grew", "forced"] },
    { ja: "その予期せぬシステム障害により、利用者は別の方法でデータを保存せざるを得ませんでした。", answer: "The unexpected system failure forced users to save their data in another way.", words: ["users", "the unexpected system failure", "to save their data in another way", "forced"] },
    { ja: "その新しい証拠により、研究者たちは従来の説明を根本から見直さざるを得ませんでした。", answer: "The new evidence forced researchers to fundamentally reconsider the conventional explanation.", words: ["researchers", "the new evidence", "to fundamentally reconsider the conventional explanation", "forced"] },
    { ja: "原材料価格の急騰により、その会社は生産計画を大幅に変更せざるを得ませんでした。", answer: "The sharp rise in raw material prices forced the company to revise its production plan substantially.", words: ["the company", "the sharp rise in raw material prices", "to revise its production plan substantially", "forced"] },
    { ja: "その大規模な停電により、病院は緊急でない手術を延期せざるを得ませんでした。", answer: "The widespread power outage forced the hospital to postpone non-emergency operations.", words: ["the hospital", "the widespread power outage", "to postpone non-emergency operations", "forced"] },
    { ja: "世論からの強い批判により、政府は当初の政策を再検討せざるを得ませんでした。", answer: "Strong criticism from the public forced the government to reconsider its original policy.", words: ["the government", "strong criticism from the public", "to reconsider its original policy", "forced"] },
    { ja: "主要道路の閉鎖により、多くの通勤者は通常よりかなり長い経路を利用せざるを得ませんでした。", answer: "The closure of the main road forced many commuters to take a much longer route than usual.", words: ["many commuters", "the closure of the main road", "to take a much longer route than usual", "forced"] },
    { ja: "急激な需要の落ち込みにより、その企業は生産規模を縮小せざるを得ませんでした。", answer: "The sudden decline in demand forced the company to scale back production.", words: ["the company", "the sudden decline in demand", "to scale back production", "forced"] },
    { ja: "その誤った情報が広まったため、当局は公式な説明を出さざるを得ませんでした。", answer: "The spread of false information forced the authorities to issue an official explanation.", words: ["the authorities", "the spread of false information", "to issue an official explanation", "forced"] },
    { ja: "その大幅な予算削減により、研究チームは計画の一部を断念せざるを得ませんでした。", answer: "The substantial budget cuts forced the research team to abandon part of the project.", words: ["the research team", "the substantial budget cuts", "to abandon part of the project", "forced"] },
    { ja: "交渉が長引いたため、両社は最終決定を数か月延期せざるを得ませんでした。", answer: "The prolonged negotiations forced both companies to delay the final decision for several months.", words: ["both companies", "the prolonged negotiations", "to delay the final decision for several months", "forced"] },
    { ja: "その新たな証拠により、警察は捜査の進め方を全面的に見直さざるを得ませんでした。", answer: "The new evidence forced the police to completely rethink how they were conducting the investigation.", words: ["the police", "the new evidence", "to completely rethink how they were conducting the investigation", "forced"] }
  ],
  hard: [
    { ja: "その予期せぬ市場の変化により、多くの企業が長期戦略を見直さざるを得なくなりました。", answer: "The sudden market change forced many businesses to reconsider their long-term strategies.", words: ["businesses", "change", "forced", "long-term", "many", "market", "reconsider", "strategies", "sudden", "the", "their", "to", "whereas"], unused: "whereas" },
    { ja: "十分な安全対策が取られていなかったため、作業員たちは予定より早く作業を中止せざるを得ませんでした。", answer: "The lack of sufficient safety measures forced the workers to stop work earlier than planned.", words: ["earlier", "forced", "lack", "measures", "of", "planned", "safety", "stop", "sufficient", "than", "the", "the", "to", "work", "workers", "although"], unused: "although" },
    { ja: "その新しい証拠により、研究者たちは、それまで広く受け入れられていた説明を根本から見直さざるを得ませんでした。", answer: "The new evidence forced the researchers to fundamentally reconsider the explanation that had previously been widely accepted.", words: ["accepted", "been", "evidence", "explanation", "forced", "fundamentally", "had", "new", "previously", "reconsider", "researchers", "that", "the", "the", "the", "to", "widely", "although"], unused: "although" },
    { ja: "その突然の規制変更により、いくつかの企業はすでに発表していた投資計画を延期せざるを得ませんでした。", answer: "The sudden change in regulation forced several companies to delay their already announced investment plans.", words: ["already", "announced", "change", "companies", "delay", "forced", "in", "investment", "plans", "regulation", "several", "sudden", "the", "their", "to", "unless"], unused: "unless" },
    { ja: "その誤解を招く報道により、政府は当初予定していたよりも早く公式声明を出さざるを得なくなりました。", answer: "The misleading reports forced the government to issue an official statement earlier than originally planned.", words: ["earlier", "forced", "government", "issue", "misleading", "official", "planned", "reports", "statement", "than", "the", "the", "to", "originally", "an", "whereas"], unused: "whereas" },
    { ja: "その長期間の通信障害により、救助隊は遠隔地との連絡手段を全面的に変更せざるを得ませんでした。", answer: "The prolonged communication failure forced rescue teams to completely change how they communicated with remote areas.", words: ["change", "communication", "completely", "failure", "forced", "how", "prolonged", "remote", "rescue", "teams", "the", "they", "to", "with", "areas", "communicated", "although"], unused: "although" },
    { ja: "その急激な物価上昇により、多くの家庭は生活必需品への支出さえ減らさざるを得ませんでした。", answer: "The sudden rise in prices forced many families to cut even their spending on basic necessities.", words: ["basic", "cut", "even", "families", "forced", "in", "many", "necessities", "on", "prices", "rise", "spending", "sudden", "the", "their", "to", "whereas"], unused: "whereas" },
    { ja: "その制度上の不備により、本来支援を受けられるはずの人々まで申請をやり直さざるを得なくなりました。", answer: "The flaws in the system forced even people who were eligible for assistance to resubmit their applications.", words: ["applications", "assistance", "eligible", "even", "flaws", "for", "forced", "in", "people", "resubmit", "system", "the", "the", "their", "to", "were", "who", "although"], unused: "although" },
    { ja: "そのデータの重大な誤りにより、研究チームは分析全体を最初からやり直さざるを得ませんでした。", answer: "The major errors in the data forced the research team to restart the entire analysis from the beginning.", words: ["analysis", "beginning", "data", "entire", "errors", "forced", "from", "in", "major", "research", "restart", "team", "the", "the", "the", "the", "the", "to", "whereas"], unused: "whereas" },
    { ja: "その交渉の決裂により、両国は当初は検討していなかった代替案まで検討せざるを得ませんでした。", answer: "The breakdown of the negotiations forced both countries to consider alternatives they had not originally considered.", words: ["alternatives", "both", "breakdown", "consider", "considered", "countries", "forced", "had", "negotiations", "not", "of", "originally", "the", "the", "they", "to", "unless"], unused: "unless" },
    { ja: "その新しい証拠がもっと早く発見されていれば、警察は捜査全体の進め方を変えざるを得なかったでしょう。", answer: "If the new evidence had been found earlier, it would have forced the police to change their approach to the entire investigation.", words: ["approach", "been", "change", "earlier", "entire", "evidence", "forced", "found", "had", "have", "if", "investigation", "it", "new", "police", "the", "the", "the", "their", "to", "to", "would", "although"], unused: "although" },
    { ja: "長引く不確実性により、投資家たちは本来ならすでに下していたはずの最終決定を延期せざるを得ませんでした。", answer: "The prolonged uncertainty forced investors to delay their final decision, which they would otherwise have already made.", words: ["already", "decision", "delay", "final", "forced", "have", "investors", "made", "prolonged", "the", "their", "to", "uncertainty", "would", "otherwise", "which", "they", "whereas"], unused: "whereas" }
  ]
};

worksheetDefinitions["force-to-order"] = {
  label: "物主構文 force（目的語＋to do・整序英作文）",
  title: "物主構文 force＋目的語＋to do　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。",
  answerNote: "語順は「物主語＋force／forces／forced＋目的語＋to do」です。",
  type: "english-order",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "出来事や状況が人・組織に行動を強いる force＋目的語＋to do の基本です。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "少し長い目的語・不定詞句を含む force の表現を扱います。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "政策・経済・研究など高校英語レベルの文脈で force を使います。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "単語単位に分割し、不要語を1語加えます。" }
  }
};

const causeToOptionV12 = worksheetTypeSelect.querySelector('option[value="cause-to-order"]');
if (causeToOptionV12 && !worksheetTypeSelect.querySelector('option[value="force-to-order"]')) {
  const option = document.createElement("option");
  option.value = "force-to-order";
  option.textContent = "物主構文 force（目的語＋to do）― 整序英作文";
  causeToOptionV12.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV12Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV12ForceTo() {
  if (worksheetTypeSelect.value === "force-to-order") return forceToQuestions[difficultySelect.value];
  return buildQuestionPoolV12Previous();
};

const appendEnglishAnswerV12Previous = appendEnglishAnswer;
appendEnglishAnswer = function appendEnglishAnswerV12(fragment, question, number, type) {
  if (worksheetTypeSelect.value !== "force-to-order") {
    appendEnglishAnswerV12Previous(fragment, question, number, type);
    return;
  }
  const item = document.createElement("div");
  item.className = "english-answer-item";
  const answer = document.createElement("p");
  answer.innerHTML = `<b>${number}. ${question.answer}</b>`;
  const structure = document.createElement("p");
  structure.className = "answer-explanation";
  structure.textContent = `物主語＋force／forces／forced＋目的語＋to do${question.unused ? `（不要語：${question.unused}）` : ""}`;
  item.append(answer, structure);
  fragment.appendChild(item);
};

syncDifficultyOptions();
updateControls();