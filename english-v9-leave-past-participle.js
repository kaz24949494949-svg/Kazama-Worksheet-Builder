"use strict";

// Version 9: finalized inanimate-subject leave + object + past participle ordering worksheets.
const leavePastParticipleQuestions = {
  basic: [
    { ja: "その報告書では、いくつかの重要な疑問が未回答のままでした。", answer: "The report left several important questions unanswered.", words: ["several important questions", "the report", "unanswered", "left"] },
    { ja: "その停電で、仕事は終わらないままになりました。", answer: "The power failure left the work unfinished.", words: ["the work", "the power failure", "unfinished", "left"] },
    { ja: "その話し合いでは、その問題は未解決のままでした。", answer: "The discussion left the issue unresolved.", words: ["the issue", "the discussion", "unresolved", "left"] },
    { ja: "その公式発表では、彼の名前には触れられませんでした。", answer: "The official announcement left his name unmentioned.", words: ["his name", "the official announcement", "unmentioned", "left"] },
    { ja: "その短い説明では、事故の原因は説明されないままでした。", answer: "The brief explanation left the cause of the accident unexplained.", words: ["the cause of the accident", "the brief explanation", "unexplained", "left"] },
    { ja: "その突然の予算削減で、いくつかの請求書が未払いのままになりました。", answer: "The sudden budget cut left several bills unpaid.", words: ["several bills", "the sudden budget cut", "unpaid", "left"] },
    { ja: "その会議の後も、その件は未決定のままでした。", answer: "The meeting left the matter undecided.", words: ["the matter", "the meeting", "undecided", "left"] },
    { ja: "その急いで行われた点検では、いくつかの安全上の問題が発見されないままでした。", answer: "The hurried inspection left several safety problems undetected.", words: ["several safety problems", "the hurried inspection", "undetected", "left"] },
    { ja: "その土砂崩れで、道路はふさがれたままになりました。", answer: "The landslide left the road blocked.", words: ["the road", "the landslide", "blocked", "left"] },
    { ja: "その制度の廃止により、多くの家庭が保護されない状態になりました。", answer: "The abolition of the system left many families unprotected.", words: ["many families", "the abolition of the system", "unprotected", "left"] },
    { ja: "その長い遅れにより、記事は未発表のままになりました。", answer: "The long delay left the article unpublished.", words: ["the article", "the long delay", "unpublished", "left"] },
    { ja: "その報告書では、誰に責任があるのかが明言されないままでした。", answer: "The report left it unsaid who was responsible.", words: ["who was responsible", "the report", "it", "unsaid", "left"] }
  ],
  standard: [
    { ja: "その調査では、いくつかの重要な疑問が未回答のままでした。", answer: "The investigation left several important questions unanswered.", words: ["several important questions", "the investigation", "left", "unanswered"] },
    { ja: "突然の機械故障により、作業の一部が未完成のままになりました。", answer: "The sudden machine failure left part of the work unfinished.", words: ["part of the work", "the sudden machine failure", "unfinished", "left"] },
    { ja: "その話し合いでは、最も重要な問題が未解決のままでした。", answer: "The discussion left the most important issue unresolved.", words: ["the most important issue", "unresolved", "the discussion", "left"] },
    { ja: "その最終報告書では、事故の正確な原因が説明されないままでした。", answer: "The final report left the exact cause of the accident unexplained.", words: ["the exact cause of the accident", "the final report", "unexplained", "left"] },
    { ja: "その突然の方針変更により、いくつかの事業が中断されたままになりました。", answer: "The sudden change in policy left several projects suspended.", words: ["several projects", "the sudden change in policy", "suspended", "left"] },
    { ja: "その激しい嵐により、多くの道路が倒木や岩でふさがれたままになりました。", answer: "The violent storm left many roads blocked by fallen trees and rocks.", words: ["many roads", "the violent storm", "blocked", "by fallen trees and rocks", "left"] },
    { ja: "その契約の曖昧な表現により、責任の分担が明確に定められないままになりました。", answer: "The vague wording of the contract left the division of responsibility undefined.", words: ["the division of responsibility", "the vague wording of the contract", "undefined", "left"] },
    { ja: "その急な閉鎖により、多くの予約が未処理のままになりました。", answer: "The sudden closure left many reservations unprocessed.", words: ["many reservations", "the sudden closure", "unprocessed", "left"] },
    { ja: "その記事では、彼が述べた重要な点がいくつか取り上げられないままでした。", answer: "The article left several important points he had made unmentioned.", words: ["several important points he had made", "the article", "unmentioned", "left"] },
    { ja: "その裁判所の判断では、いくつかの法的な問題が未決定のままでした。", answer: "The court’s decision left several legal issues undecided.", words: ["several legal issues", "the court’s decision", "undecided", "left"] },
    { ja: "その短い声明では、計画変更の理由が明らかにされないままでした。", answer: "The brief statement left the reason for the change of plan unexplained.", words: ["the reason for the change of plan", "the brief statement", "unexplained", "left"] },
    { ja: "その公式声明では、誰が最終決定を下し、なぜその決定を下したのかが明言されないままでした。", answer: "The official statement left it unsaid who had made the final decision and why.", words: ["who had made the final decision and why", "the official statement", "it", "unsaid", "left"] }
  ],
  advanced: [
    { ja: "その最終報告書でも、事故がどのように起きたのかという疑問は未回答のままでした。", answer: "The final report left the question of how the accident had occurred unanswered.", words: ["the question of how the accident had occurred", "unanswered", "the final report", "left"] },
    { ja: "橋の突然の崩落により、数百人の住民が一時的に孤立した状態になりました。", answer: "The sudden collapse of the bridge left hundreds of residents temporarily isolated.", words: ["temporarily isolated", "the sudden collapse of the bridge", "hundreds of residents", "left"] },
    { ja: "その裁判所の判断でも、法律をどのように適用すべきかという問題は未解決のままでした。", answer: "The court’s ruling left the question of how the law should be applied unresolved.", words: ["unresolved", "the question of how the law should be applied", "the court’s ruling", "left"] },
    { ja: "報告書から重要な証拠が抜けていたため、いくつかの重大な問題が十分に検討されないままになりました。", answer: "The omission of key evidence from the report left several serious issues insufficiently examined.", words: ["several serious issues", "the omission of key evidence from the report", "insufficiently examined", "left"] },
    { ja: "その大規模なサイバー攻撃により、多くの利用者が重要なオンラインサービスから切り離された状態になりました。", answer: "The massive cyberattack left many users disconnected from essential online services.", words: ["disconnected from essential online services", "the massive cyberattack", "many users", "left"] },
    { ja: "主要な支援者が突然撤退したことで、その計画は無期限に中断されたままになりました。", answer: "The sudden withdrawal of a major supporter left the project suspended indefinitely.", words: ["the sudden withdrawal of a major supporter", "suspended indefinitely", "the project", "left"] },
    { ja: "その条約の曖昧な表現により、両国の正確な義務が明確に定められないままになりました。", answer: "The ambiguous wording of the treaty left the precise obligations of both countries undefined.", words: ["the precise obligations of both countries", "the ambiguous wording of the treaty", "undefined", "left"] },
    { ja: "洪水によって鉄道が寸断され、多くの旅行者が遠く離れた駅で足止めされた状態になりました。", answer: "The disruption of the railway by the flood left many travelers stranded at remote stations.", words: ["stranded at remote stations", "the disruption of the railway by the flood", "many travelers", "left"] },
    { ja: "十分な証拠がなかったため、彼に対する疑惑の多くが証明されないままになりました。", answer: "The lack of sufficient evidence left many of the allegations against him unproven.", words: ["many of the allegations against him", "the lack of sufficient evidence", "unproven", "left"] },
    { ja: "改訂された指針でも、例外的な事例をどのように扱うべきかは説明されないままでした。", answer: "The revised guidelines left it unexplained how exceptional cases should be handled.", words: ["it", "the revised guidelines", "unexplained", "left", "how exceptional cases should be handled"] },
    { ja: "長時間の停電により、保管されていた大量の食品が傷んだ状態になりました。", answer: "The prolonged power outage left a large quantity of stored food spoiled.", words: ["a large quantity of stored food", "spoiled", "the prolonged power outage", "left"] },
    { ja: "その小説の最終章でも、主人公のその後の運命は明かされないままでした。", answer: "The final chapter of the novel left the fate of the main character undisclosed.", words: ["the fate of the main character", "undisclosed", "the final chapter of the novel", "left"] }
  ],
  hard: [
    { ja: "その最終調査報告書でも、事故の本当の原因はいまだに説明されないままでした。", answer: "The final investigation report left the actual cause of the accident unexplained.", words: ["accident", "actual", "although", "cause", "final", "investigation", "left", "of", "report", "the", "the", "the", "unexplained"], unused: "although" },
    { ja: "主要な供給業者が突然撤退したため、いくつかの建設計画が無期限に中断されたままになりました。", answer: "The withdrawal of a major supplier left several construction projects suspended indefinitely.", words: ["a", "construction", "indefinitely", "left", "major", "of", "projects", "several", "supplier", "suspended", "the", "unless", "withdrawal"], unused: "unless" },
    { ja: "契約書の曖昧な表現により、損害の責任を誰が負うのかは確定しないままになりました。", answer: "The vague wording of the contract left it undetermined who was liable for the damage.", words: ["contract", "damage", "for", "it", "left", "liable", "of", "the", "the", "the", "undetermined", "vague", "was", "whereas", "who", "wording"], unused: "whereas" },
    { ja: "重要な証拠が提出されなかったため、その主張のいくつかは証明されないままになりました。", answer: "The failure to present key evidence left several of the allegations unproven.", words: ["allegations", "because", "evidence", "failure", "key", "left", "of", "present", "several", "the", "the", "to", "unproven"], unused: "because" },
    { ja: "突然の通信障害により、遠隔地の多くの地域社会が外部との連絡を断たれた状態になりました。", answer: "The sudden communications failure left many remote communities cut off from the outside world.", words: ["communications", "communities", "cut", "failure", "from", "left", "many", "off", "outside", "remote", "sudden", "the", "the", "though", "world"], unused: "though" },
    { ja: "その判決でも、新しい法律を過去の事例に適用できるかどうかは決着しないままでした。", answer: "The ruling left it unsettled whether the new law could be applied to earlier cases.", words: ["applied", "be", "cases", "could", "earlier", "it", "law", "left", "new", "ruling", "the", "the", "to", "unsettled", "whether", "while"], unused: "while" },
    { ja: "予想外の資金削減により、研究の重要な部分が完成しないままになりました。", answer: "The unexpected funding reduction left a key part of the research unfinished.", words: ["a", "funding", "key", "left", "of", "part", "reduction", "research", "the", "the", "unexpected", "unfinished", "when"], unused: "when" },
    { ja: "その大規模な洪水により、いくつかの地域が数日間完全に孤立した状態になりました。", answer: "The large-scale flood left several regions completely isolated for days.", words: ["completely", "days", "flood", "for", "isolated", "large-scale", "left", "regions", "several", "the", "unless"], unused: "unless" },
    { ja: "複数の目撃証言が報告書から省かれていたため、重要な事実の一部が文書に記録されないままになりました。", answer: "The omission of several witness accounts from the report left some important facts undocumented.", words: ["accounts", "facts", "from", "important", "left", "of", "omission", "report", "several", "some", "the", "the", "undocumented", "whereas", "witness"], unused: "whereas" },
    { ja: "その公式声明では、なぜ交渉が突然打ち切られたのかが明言されないままでした。", answer: "The official statement left it unsaid why the negotiations had ended abruptly.", words: ["abruptly", "ended", "had", "it", "left", "negotiations", "official", "statement", "the", "the", "though", "unsaid", "why"], unused: "though" },
    { ja: "安全検査が不十分だったため、いくつかの重大な欠陥が発見されないままになりました。", answer: "The inadequate safety inspection left several serious defects undetected.", words: ["defects", "inadequate", "inspection", "left", "several", "serious", "safety", "the", "undetected", "until"], unused: "until" },
    { ja: "委員会の最終決定でも、被害を受けた住民にどのように補償するかという問題は未解決のままでした。", answer: "The committee’s final decision left the issue of how to compensate the affected residents unresolved.", words: ["affected", "committee’s", "compensate", "decision", "final", "how", "issue", "left", "of", "residents", "the", "the", "the", "to", "unresolved", "whenever"], unused: "whenever" }
  ]
};

worksheetDefinitions["leave-past-participle-order"] = {
  label: "物主構文 leave（目的語＋過去分詞・整序英作文）",
  title: "物主構文 leave＋目的語＋過去分詞　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。",
  answerNote: "語順は「物主語＋leave／leaves／left＋目的語＋過去分詞」です。",
  type: "english-order",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "未回答・未完成・未解決など、状態が残るleave＋目的語＋過去分詞の基本を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "高校初級語彙。修飾語を含む目的語やleave it unsaidを扱います。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "英検準2級程度。長い目的語、疑問節、複雑な原因表現を含みます。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト程度。単語単位に分割し、不要語を1語加えます。" }
  }
};

const preventFromOptionV9 = worksheetTypeSelect.querySelector('option[value="prevent-from-ing-order"]');
if (preventFromOptionV9 && !worksheetTypeSelect.querySelector('option[value="leave-past-participle-order"]')) {
  const option = document.createElement("option");
  option.value = "leave-past-participle-order";
  option.textContent = "物主構文 leave（目的語＋過去分詞）― 整序英作文";
  preventFromOptionV9.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV9Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV9LeavePastParticiple() {
  if (worksheetTypeSelect.value === "leave-past-participle-order") {
    return leavePastParticipleQuestions[difficultySelect.value];
  }
  return buildQuestionPoolV9Previous();
};

const appendEnglishAnswerV9Previous = appendEnglishAnswer;
appendEnglishAnswer = function appendEnglishAnswerV9(fragment, question, number, type) {
  if (worksheetTypeSelect.value !== "leave-past-participle-order") {
    appendEnglishAnswerV9Previous(fragment, question, number, type);
    return;
  }
  const item = document.createElement("div");
  item.className = "english-answer-item";
  const answer = document.createElement("p");
  answer.innerHTML = `<b>${number}. ${question.answer}</b>`;
  const structure = document.createElement("p");
  structure.className = "answer-explanation";
  structure.textContent = `物主語＋leave／leaves／left＋目的語＋過去分詞${question.unused ? `（不要語：${question.unused}）` : ""}`;
  item.append(answer, structure);
  fragment.appendChild(item);
};

syncDifficultyOptions();
updateControls();
