"use strict";

// Version 14: finalized inanimate-subject deprive + object + of + noun ordering worksheets.
const depriveOfQuestions = {
  basic: [
    { ja: "その事故で、彼は視力を失いました。", answer: "The accident deprived him of his sight.", words: ["him", "the accident", "of his sight", "deprived"] },
    { ja: "その病気で、彼女は自由に歩く力を失いました。", answer: "The illness deprived her of the ability to walk freely.", words: ["her", "the illness", "of the ability to walk freely", "deprived"] },
    { ja: "その火事で、その家族は家を失いました。", answer: "The fire deprived the family of their home.", words: ["the family", "the fire", "of their home", "deprived"] },
    { ja: "そのけがで、彼は試合に出る機会を失いました。", answer: "The injury deprived him of the chance to play.", words: ["him", "the injury", "of the chance to play", "deprived"] },
    { ja: "その停電で、住民は電気を使えなくなりました。", answer: "The blackout deprived residents of electricity.", words: ["residents", "the blackout", "of electricity", "deprived"] },
    { ja: "その洪水で、多くの人々は安全な飲み水を使えなくなりました。", answer: "The flood deprived many people of safe drinking water.", words: ["many people", "the flood", "of safe drinking water", "deprived"] },
    { ja: "その長い病気で、彼は十分な睡眠を取れなくなりました。", answer: "The long illness deprived him of enough sleep.", words: ["him", "the long illness", "of enough sleep", "deprived"] },
    { ja: "その閉鎖で、子どもたちは遊ぶ場所を失いました。", answer: "The closure deprived the children of a place to play.", words: ["the children", "the closure", "of a place to play", "deprived"] },
    { ja: "その盗難で、彼女は大切な持ち物を失いました。", answer: "The theft deprived her of valuable possessions.", words: ["her", "the theft", "of valuable possessions", "deprived"] },
    { ja: "その嵐で、その村は外部との連絡手段を失いました。", answer: "The storm deprived the village of communication with the outside world.", words: ["the village", "the storm", "of communication with the outside world", "deprived"] },
    { ja: "その予算削減で、生徒たちは必要な教材を使えなくなりました。", answer: "The budget cut deprived students of necessary materials.", words: ["students", "the budget cut", "of necessary materials", "deprived"] },
    { ja: "その道路閉鎖で、住民は町への直接の交通手段を失いました。", answer: "The road closure deprived residents of direct access to the town.", words: ["residents", "the road closure", "of direct access to the town", "deprived"] }
  ],
  standard: [
    { ja: "その深刻な干ばつで、その地域は十分な水を失いました。", answer: "The severe drought deprived the region of enough water.", words: ["the severe drought", "the region", "of enough water", "deprived"] },
    { ja: "その工場の閉鎖で、多くの住民は安定した仕事を失いました。", answer: "The factory closure deprived many residents of stable jobs.", words: ["many residents", "the factory closure", "of stable jobs", "deprived"] },
    { ja: "その資金削減で、研究チームは必要な設備を使えなくなりました。", answer: "The funding cut deprived the research team of necessary equipment.", words: ["the research team", "the funding cut", "of necessary equipment", "deprived"] },
    { ja: "その新しい規則で、利用者は一部のサービスを利用できなくなりました。", answer: "The new rule deprived users of access to some services.", words: ["users", "the new rule", "of access to some services", "deprived"] },
    { ja: "長年の紛争によって、多くの子どもたちは教育の機会を失いました。", answer: "Years of conflict deprived many children of educational opportunities.", words: ["many children", "years of conflict", "of educational opportunities", "deprived"] },
    { ja: "その度重なる遅れで、地域社会は早い段階で対応する機会を失いました。", answer: "The repeated delays deprived the community of an early opportunity to respond.", words: ["the community", "the repeated delays", "of an early opportunity to respond", "deprived"] },
    { ja: "その激しい嵐で、何千もの世帯が電気を使えなくなりました。", answer: "The severe storm deprived thousands of households of electricity.", words: ["deprived", "electricity", "households", "of", "of", "severe", "storm", "the", "thousands"] },
    { ja: "その方針変更で、一部の労働者は重要な手当を失いました。", answer: "The policy change deprived some workers of important benefits.", words: ["benefits", "change", "deprived", "important", "of", "policy", "some", "the", "workers"] },
    { ja: "情報不足のため、意思決定者は明確な判断材料を得られませんでした。", answer: "The lack of information deprived decision-makers of a clear basis.", words: ["a", "basis", "clear", "decision-makers", "deprived", "information", "lack", "of", "of", "the"] },
    { ja: "橋の破壊によって、いくつかの村は町への主要な交通路を失いました。", answer: "The destruction of the bridge deprived several villages of their main route to town.", words: ["bridge", "deprived", "destruction", "main", "of", "of", "route", "several", "the", "the", "their", "to", "town", "villages"] },
    { ja: "その長い孤立で、子どもたちは友人との定期的な交流を失いました。", answer: "The long isolation deprived the children of regular contact with friends.", words: ["children", "contact", "deprived", "friends", "isolation", "long", "of", "regular", "the", "the", "with"] },
    { ja: "その裁判所の判断で、会社は計画を進める法的権限を失いました。", answer: "The court decision deprived the company of legal authority to proceed.", words: ["authority", "company", "court", "decision", "deprived", "legal", "of", "proceed", "the", "the", "to"] }
  ],
  advanced: [
    { ja: "長引く干ばつによって、その地域は利用可能な水の多くを失いました。", answer: "The prolonged drought deprived the region of much of its water.", words: ["deprived", "drought", "its", "much", "of", "of", "prolonged", "region", "the", "the", "water"] },
    { ja: "突然の閉鎖によって、地元住民は医療を受ける手段を失いました。", answer: "The sudden closure deprived local residents of access to medical care.", words: ["access", "care", "closure", "deprived", "local", "medical", "of", "residents", "sudden", "the", "to"] },
    { ja: "資金削減によって、研究チームはその計画に必要な資源を失いました。", answer: "The funding cut deprived the research team of the resources needed for the project.", words: ["cut", "deprived", "for", "funding", "needed", "of", "project", "research", "resources", "team", "the", "the", "the"] },
    { ja: "新しい規制によって、小規模企業は事業を拡大する機会を失いました。", answer: "The new restrictions deprived small businesses of opportunities to expand.", words: ["businesses", "deprived", "expand", "new", "of", "opportunities", "restrictions", "small", "the", "to"] },
    { ja: "長年の紛争によって、多くの子どもたちは教育を定期的に受ける機会を失いました。", answer: "Years of conflict deprived many children of regular access to education.", words: ["access", "children", "conflict", "deprived", "education", "many", "of", "of", "regular", "to", "years"] },
    { ja: "度重なる遅れによって、地域社会は素早く対応する機会を失いました。", answer: "The repeated delays deprived the community of an opportunity to respond quickly.", words: ["an", "community", "delays", "deprived", "of", "opportunity", "quickly", "repeated", "respond", "the", "the", "to"] },
    { ja: "長引く熱波によって、多くの住民は夜の安眠を失いました。", answer: "The prolonged heat wave deprived many residents of restful sleep at night.", words: ["at", "deprived", "heat", "many", "night", "of", "prolonged", "residents", "restful", "sleep", "the", "wave"] },
    { ja: "そのサイバー攻撃によって、従業員は会社の重要なシステムを利用できなくなりました。", answer: "The cyberattack deprived employees of access to essential company systems.", words: ["access", "company", "cyberattack", "deprived", "employees", "essential", "of", "systems", "the", "to"] },
    { ja: "湿地の破壊によって、渡り鳥は重要な餌場を失いました。", answer: "The destruction of wetlands deprived migratory birds of important feeding grounds.", words: ["birds", "deprived", "destruction", "feeding", "grounds", "important", "migratory", "of", "of", "the", "wetlands"] },
    { ja: "深刻な人手不足によって、患者は適時に医療を受けられなくなりました。", answer: "Severe staff shortages deprived patients of timely medical attention.", words: ["attention", "deprived", "medical", "of", "patients", "severe", "shortages", "staff", "timely"] },
    { ja: "厳しい検閲によって、市民は独立した報道機関の情報を得られなくなりました。", answer: "Strict censorship deprived citizens of access to independent news sources.", words: ["access", "censorship", "citizens", "deprived", "independent", "news", "of", "sources", "strict", "to"] },
    { ja: "交通の混乱によって、遠隔地の地域社会は食料や医薬品の定期的な供給を失いました。", answer: "The transport disruption deprived remote communities of regular supplies of food and medicine.", words: ["and", "communities", "deprived", "disruption", "food", "medicine", "of", "of", "regular", "remote", "supplies", "the", "transport"] }
  ],
  hard: [
    { ja: "長引く干ばつによって、その地域は利用可能な水の多くを失いました。", answer: "The prolonged drought deprived the region of much of its available water.", words: ["although", "available", "deprived", "drought", "its", "much", "of", "of", "prolonged", "region", "the", "the", "water"], unused: "although" },
    { ja: "突然の閉鎖によって、地元住民は必要不可欠な医療サービスを利用できなくなりました。", answer: "The sudden closure deprived local residents of access to essential medical services.", words: ["access", "closure", "deprived", "essential", "local", "medical", "of", "residents", "services", "sudden", "the", "to", "unless"], unused: "unless" },
    { ja: "資金の喪失によって、研究チームはその計画を継続するために必要な資源を失いました。", answer: "The loss of funding deprived the research team of the resources needed to continue the project.", words: ["continue", "deprived", "funding", "loss", "needed", "of", "of", "project", "research", "resources", "team", "the", "the", "the", "the", "to", "whereas"], unused: "whereas" },
    { ja: "新しい規制によって、多くの小規模企業は海外市場へ進出する機会を失いました。", answer: "The new restrictions deprived many small businesses of opportunities to expand into overseas markets.", words: ["businesses", "deprived", "expand", "into", "many", "markets", "new", "of", "opportunities", "overseas", "restrictions", "small", "the", "to", "although"], unused: "although" },
    { ja: "長年の紛争によって、一世代全体が安定して教育を受ける機会を失いました。", answer: "Years of conflict deprived an entire generation of stable access to education.", words: ["access", "an", "conflict", "deprived", "education", "entire", "generation", "of", "of", "stable", "to", "years", "because"], unused: "because" },
    { ja: "度重なる遅れによって、地域社会は状況が悪化する前に対応する機会を失いました。", answer: "The repeated delays deprived the community of the chance to respond before the situation worsened.", words: ["before", "chance", "community", "delays", "deprived", "of", "repeated", "respond", "situation", "the", "the", "the", "the", "to", "worsened", "unless"], unused: "unless" },
    { ja: "長引く停電によって、病院は重要な機器を動かすために必要な安定した電力を失いました。", answer: "Prolonged power outages deprived hospitals of the reliable electricity needed to operate critical equipment.", words: ["although", "critical", "deprived", "electricity", "equipment", "hospitals", "needed", "of", "operate", "outages", "power", "prolonged", "reliable", "the", "to"], unused: "although" },
    { ja: "そのプラットフォームの突然の停止によって、小規模な販売者は頼りにしていた収入を失いました。", answer: "The sudden shutdown of the platform deprived small sellers of the income they had come to depend on.", words: ["although", "come", "depend", "deprived", "had", "income", "of", "of", "on", "platform", "sellers", "shutdown", "small", "sudden", "the", "the", "the", "they", "to"], unused: "although" },
    { ja: "根強い誤情報によって、有権者は適切な判断をするために必要な信頼できる情報を得られなくなりました。", answer: "Persistent misinformation deprived voters of the reliable information needed to make informed choices.", words: ["choices", "deprived", "information", "informed", "make", "misinformation", "needed", "of", "persistent", "reliable", "the", "to", "voters", "whereas"], unused: "whereas" },
    { ja: "鉄道の閉鎖によって、いくつかの町は地方の中心都市への主要な交通手段を失いました。", answer: "The closure of the railway deprived several towns of their main connection to the regional capital.", words: ["capital", "closure", "connection", "deprived", "main", "of", "of", "railway", "regional", "several", "the", "the", "the", "their", "to", "towns", "unless"], unused: "unless" },
    { ja: "長年の生息地破壊によって、その種は生存を頼っていた領域の多くを失いました。", answer: "Years of habitat destruction deprived the species of much of the territory on which it depended.", words: ["although", "depended", "deprived", "destruction", "habitat", "it", "much", "of", "of", "of", "on", "species", "territory", "the", "the", "which", "years"], unused: "although" },
    { ja: "その規制上の決定によって、その団体は事業を継続するために必要だった法的権限を失いました。", answer: "The regulatory decision deprived the organization of the legal authority it needed to continue the program.", words: ["authority", "continue", "decision", "deprived", "it", "legal", "needed", "of", "organization", "program", "regulatory", "the", "the", "the", "the", "to", "whereas"], unused: "whereas" }
  ]
};

worksheetDefinitions["deprive-of-order"] = {
  label: "物主構文 deprive（目的語＋of＋名詞・整序英作文）",
  title: "物主構文 deprive＋O＋of＋名詞　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。",
  answerNote: "語順は「物主語＋deprive／deprives／deprived＋目的語＋of＋名詞」です。deprive A of B は『AからBを奪う』を表します。",
  type: "english-order",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "高校基本。短い語句単位で deprive＋O＋of＋名詞 の意味と語順を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "高校標準。前半は語句単位、後半は単語単位で、抽象名詞を含む表現を扱います。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "高校発展。全問を単語単位に分割し、長い主語や抽象的な内容を扱います。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト上位程度。全問を単語単位にし、不要語を1語加えます。" }
  }
};

const remindOfOptionV14 = worksheetTypeSelect.querySelector('option[value="remind-of-order"]');
if (remindOfOptionV14 && !worksheetTypeSelect.querySelector('option[value="deprive-of-order"]')) {
  const option = document.createElement("option");
  option.value = "deprive-of-order";
  option.textContent = "物主構文 deprive（目的語＋of＋名詞）― 整序英作文";
  remindOfOptionV14.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV14Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV14DepriveOf() {
  if (worksheetTypeSelect.value === "deprive-of-order") return depriveOfQuestions[difficultySelect.value];
  return buildQuestionPoolV14Previous();
};

const appendEnglishAnswerV14Previous = appendEnglishAnswer;
appendEnglishAnswer = function appendEnglishAnswerV14(fragment, question, number, type) {
  if (worksheetTypeSelect.value !== "deprive-of-order") {
    appendEnglishAnswerV14Previous(fragment, question, number, type);
    return;
  }
  const item = document.createElement("div");
  item.className = "english-answer-item";
  const answer = document.createElement("p");
  answer.innerHTML = `<b>${number}. ${question.answer}</b>`;
  const structure = document.createElement("p");
  structure.className = "answer-explanation";
  structure.textContent = `物主語＋deprive／deprives／deprived＋目的語＋of＋名詞${question.unused ? `（不要語：${question.unused}）` : ""}`;
  item.append(answer, structure);
  fragment.appendChild(item);
};

syncDifficultyOptions();
updateControls();
