"use strict";

// Version 10: finalized inanimate-subject enable + object + to-infinitive ordering worksheets.
const enableToQuestions = {
  basic: [
    { ja: "このアプリのおかげで、私たちは簡単に英語を学ぶことができます。", answer: "This app enables us to learn English easily.", words: ["us", "this app", "enables", "to learn English easily"] },
    { ja: "インターネットのおかげで、私たちはすぐに情報を得ることができます。", answer: "The Internet enables us to get information quickly.", words: ["to get information quickly", "the Internet", "us", "enables"] },
    { ja: "この機械によって、作業員は重い箱を持ち上げることができます。", answer: "This machine enables the workers to lift heavy boxes.", words: ["the workers", "this machine", "to lift heavy boxes", "enables"] },
    { ja: "この地図のおかげで、私たちは駅を見つけることができました。", answer: "This map enabled us to find the station.", words: ["enabled", "the station", "this map", "us", "to find"] },
    { ja: "この新しい道路によって、人々はより速く町へ行くことができます。", answer: "This new road enables people to reach the town faster.", words: ["people", "to reach the town faster", "enables", "this new road"] },
    { ja: "このボタンを使えば、利用者はウィンドウを簡単に閉じることができます。", answer: "This button enables users to close the window easily.", words: ["users", "this button", "to close the window easily", "enables"] },
    { ja: "その説明のおかげで、私は問題を理解することができました。", answer: "The explanation enabled me to understand the problem.", words: ["the problem", "enabled", "the explanation", "me", "to understand"] },
    { ja: "この橋によって、人々は川を安全に渡ることができます。", answer: "This bridge enables people to cross the river safely.", words: ["people", "to cross the river safely", "this bridge", "enables"] },
    { ja: "このカメラを使えば、私たちは暗い場所でも写真を撮ることができます。", answer: "This camera enables us to take pictures even in dark places.", words: ["this camera", "us", "enables", "to take pictures even in dark places"] },
    { ja: "その奨学金のおかげで、彼女は大学で勉強することができました。", answer: "The scholarship enabled her to study at university.", words: ["her", "the scholarship", "to study at university", "enabled"] },
    { ja: "このソフトウェアによって、私たちは文書をすばやく作成できます。", answer: "This software enables us to create documents quickly.", words: ["enables", "to create documents quickly", "this software", "us"] },
    { ja: "その新しい制度によって、多くの子どもたちが教育を受けられるようになりました。", answer: "The new system enabled many children to receive an education.", words: ["many children", "the new system", "to receive an education", "enabled"] }
  ],
  standard: [
    { ja: "この新しい技術によって、医師は病気をより早く発見できるようになります。", answer: "This new technology enables doctors to detect diseases earlier.", words: ["doctors", "this new technology", "to detect diseases earlier", "enables"] },
    { ja: "オンライン授業のおかげで、生徒たちは自宅で学習を続けることができました。", answer: "Online classes enabled the students to continue studying at home.", words: ["the students", "online classes", "enabled", "to continue studying at home"] },
    { ja: "この翻訳機を使えば、旅行者は現地の人々と意思を伝え合うことができます。", answer: "This translation device enables travelers to communicate with local people.", words: ["travelers", "this translation device", "to communicate with local people", "enables"] },
    { ja: "その詳しい説明のおかげで、私たちは機械を安全に操作することができました。", answer: "The detailed explanation enabled us to operate the machine safely.", words: ["us", "the detailed explanation", "to operate the machine safely", "enabled"] },
    { ja: "この検索機能を使えば、利用者は必要な情報をすぐに見つけることができます。", answer: "This search function enables users to find the information they need quickly.", words: ["users", "this search function", "to find the information they need quickly", "enables"] },
    { ja: "その財政支援のおかげで、その団体は活動を続けることができました。", answer: "The financial support enabled the organization to continue its activities.", words: ["the organization", "the financial support", "to continue its activities", "enabled"] },
    { ja: "この安全装置によって、作業員は危険な機械を離れた場所から操作できます。", answer: "This safety device enables the workers to operate dangerous machinery from a distance.", words: ["the workers", "this safety device", "to operate dangerous machinery from a distance", "enables"] },
    { ja: "交通網の改善によって、住民は市の中心部へより簡単に行けるようになりました。", answer: "The improved transportation network enabled residents to reach the city center more easily.", words: ["residents", "the improved transportation network", "to reach the city center more easily", "enabled"] },
    { ja: "このオンラインサービスを使えば、顧客はいつでも予約を変更できます。", answer: "This online service enables customers to change their reservations at any time.", words: ["customers", "this online service", "to change their reservations at any time", "enables"] },
    { ja: "その奨学金制度によって、経済的に余裕のない学生も海外で学ぶことができるようになりました。", answer: "The scholarship program enabled students with limited financial resources to study abroad.", words: ["students with limited financial resources", "the scholarship program", "to study abroad", "enabled"] },
    { ja: "このデータによって、研究者たちは二つの現象の関係を詳しく分析できます。", answer: "This data enables researchers to analyze the relationship between the two phenomena in detail.", words: ["researchers", "this data", "to analyze the relationship between the two phenomena in detail", "enables"] },
    { ja: "遠隔医療の発達によって、地方に住む患者も専門医の診察を受けられるようになりました。", answer: "The development of telemedicine enabled even patients living in rural areas to receive medical care from specialists.", words: ["even patients living in rural areas", "the development of telemedicine", "to receive medical care from specialists", "enabled"] }
  ],
  advanced: [
    { ja: "この高度な画像処理技術によって、医師は初期段階の異常をより正確に発見できるようになります。", answer: "This advanced imaging technology enables doctors to detect abnormalities more accurately at an early stage.", words: ["doctors", "this advanced imaging technology", "to detect abnormalities more accurately at an early stage", "enables"] },
    { ja: "大量のデータを利用できたことで、研究チームはその傾向を長期的に分析することができました。", answer: "Access to a large amount of data enabled the research team to analyze the trend over the long term.", words: ["the research team", "access to a large amount of data", "to analyze the trend over the long term", "enabled"] },
    { ja: "この自動翻訳システムを使えば、異なる言語を話す人々もほぼ即座に意思疎通できます。", answer: "This automatic translation system enables people who speak different languages to communicate almost instantly.", words: ["people who speak different languages", "this automatic translation system", "to communicate almost instantly", "enables"] },
    { ja: "政府からの追加支援により、その地域は損傷した公共施設を予定より早く再建することができました。", answer: "Additional support from the government enabled the region to rebuild its damaged public facilities ahead of schedule.", words: ["the region", "additional support from the government", "to rebuild its damaged public facilities ahead of schedule", "enabled"] },
    { ja: "この新しいデータベースによって、利用者は複数の情報源を同時に比較できるようになります。", answer: "This new database enables users to compare information from multiple sources at the same time.", words: ["users", "this new database", "to compare information from multiple sources at the same time", "enables"] },
    { ja: "衛星技術の進歩によって、科学者たちは遠隔地の環境変化を継続的に観測できるようになりました。", answer: "Advances in satellite technology enabled scientists to monitor environmental changes in remote areas continuously.", words: ["scientists", "advances in satellite technology", "to monitor environmental changes in remote areas continuously", "enabled"] },
    { ja: "この柔軟な勤務制度によって、従業員は仕事と家庭での責任をよりうまく両立できます。", answer: "This flexible work arrangement enables employees to balance their work and family responsibilities more effectively.", words: ["employees", "this flexible work arrangement", "to balance their work and family responsibilities more effectively", "enables"] },
    { ja: "オンライン上で資料が公開されたことで、世界中の学生がその貴重な研究成果を利用できるようになりました。", answer: "The publication of the materials online enabled students around the world to access the valuable research findings.", words: ["students around the world", "the publication of the materials online", "to access the valuable research findings", "enabled"] },
    { ja: "この精密な測定装置によって、技術者は人間の目では確認できないほど小さな変化を検出できます。", answer: "This precise measuring device enables engineers to detect changes too small to be seen by the human eye.", words: ["engineers", "this precise measuring device", "to detect changes too small to be seen by the human eye", "enables"] },
    { ja: "地域社会からの継続的な支援のおかげで、その団体は支援を必要とする人々に活動を広げることができました。", answer: "Continued support from the local community enabled the organization to expand its services to people in need.", words: ["the organization", "continued support from the local community", "to expand its services to people in need", "enabled"] },
    { ja: "この新しい分析手法によって、研究者たちは以前は無関係だと考えられていた二つの要因の関連性を明らかにできます。", answer: "This new analytical method enables researchers to identify a connection between two factors previously thought to be unrelated.", words: ["researchers", "this new analytical method", "to identify a connection between two factors previously thought to be unrelated", "enables"] },
    { ja: "通信インフラの整備によって、災害時でも遠隔地の住民が緊急情報を迅速に受け取れるようになりました。", answer: "Improvements to communication infrastructure enabled residents in remote areas to receive emergency information quickly even during disasters.", words: ["residents in remote areas", "improvements to communication infrastructure", "to receive emergency information quickly even during disasters", "enabled"] }
  ],
  hard: [
    { ja: "新たに開発された検査方法によって、医師は症状が現れる前に病気を発見できるようになります。", answer: "The newly developed testing method enables doctors to detect diseases before symptoms appear.", words: ["appear", "before", "detect", "developed", "diseases", "doctors", "enables", "method", "newly", "symptoms", "testing", "the", "to", "whereas"], unused: "whereas" },
    { ja: "十分な資金が提供されていれば、その研究チームは予定どおり調査を完了できたでしょう。", answer: "If adequate funding had been provided, it would have enabled the research team to complete the study on schedule.", words: ["adequate", "although", "been", "complete", "enabled", "funding", "had", "have", "if", "it", "on", "provided", "research", "schedule", "study", "team", "the", "the", "to", "would"], unused: "although" },
    { ja: "この高度な通信システムによって、救助隊は通常なら到達するのが難しい地域にいる人々とも連絡を取ることができます。", answer: "This advanced communication system enables rescue teams to communicate with people in areas that would be difficult to reach.", words: ["advanced", "areas", "be", "communication", "communicate", "difficult", "enables", "in", "people", "reach", "rescue", "system", "teams", "that", "this", "to", "to", "unless", "with", "would"], unused: "unless" },
    { ja: "その法律の改正により、これまで公的サービスの利用を認められなかった人々も、それらを利用できるようになりました。", answer: "The amendment enabled even people who had previously been denied access to public services to access them.", words: ["access", "access", "amendment", "been", "denied", "enabled", "even", "had", "people", "previously", "public", "services", "the", "them", "to", "to", "whereas", "who"], unused: "whereas" },
    { ja: "人工知能の利用によって、研究者は人間だけでは処理できないほど大量のデータを分析できます。", answer: "The use of artificial intelligence enables researchers to analyze enormous amounts of data that humans could not process unaided.", words: ["although", "analyze", "artificial", "amounts", "could", "data", "enables", "enormous", "humans", "intelligence", "not", "of", "of", "process", "researchers", "that", "the", "to", "unaided", "use"], unused: "although" },
    { ja: "その装置が適切に設置されていなければ、作業員は機械を安全に操作できなかったかもしれません。", answer: "If the device had not been installed properly, it might not have enabled the workers to operate the machinery safely.", words: ["been", "device", "enabled", "had", "have", "if", "installed", "it", "machinery", "might", "not", "not", "operate", "properly", "safely", "the", "the", "the", "to", "unless", "workers"], unused: "unless" },
    { ja: "オンライン資料が無料で公開されたことで、遠隔地に住む学生も最新の研究成果を利用できるようになりました。", answer: "Making online materials freely available enabled even students living in remote areas to access the latest research findings.", words: ["access", "although", "areas", "available", "enabled", "even", "findings", "freely", "in", "latest", "living", "making", "materials", "online", "remote", "research", "students", "the", "to"], unused: "although" },
    { ja: "衛星から送られる情報によって、科学者は気候のわずかな変化でさえ長期間にわたって追跡できます。", answer: "The data sent from satellites enables scientists to track even minor climate changes over long periods.", words: ["changes", "climate", "data", "enables", "even", "from", "long", "minor", "over", "periods", "satellites", "scientists", "sent", "the", "to", "track", "unless"], unused: "unless" },
    { ja: "その新しい教育制度によって、生徒は自分の関心に応じて学習内容を選択できるようになります。", answer: "The new learning system enables students to choose what they study according to their own interests.", words: ["according", "although", "choose", "enables", "interests", "learning", "new", "own", "students", "study", "system", "the", "their", "they", "to", "to", "what"], unused: "although" },
    { ja: "政府が規制を緩和したことで、小規模企業も以前は参入できなかった市場で事業を行えるようになりました。", answer: "The government’s relaxation of regulations enabled small businesses to operate in markets they had previously been unable to enter.", words: ["although", "been", "businesses", "enabled", "enter", "government’s", "had", "in", "markets", "of", "operate", "previously", "regulations", "relaxation", "small", "the", "they", "to", "to", "unable"], unused: "although" },
    { ja: "この分析手法を用いることによって初めて、研究者は二つの現象の隠れた関係を特定することができました。", answer: "Only the use of this analytical method enabled researchers to identify the hidden relationship between the two phenomena.", words: ["analytical", "between", "enabled", "hidden", "identify", "method", "of", "only", "phenomena", "researchers", "relationship", "the", "the", "the", "this", "to", "two", "use", "whereas"], unused: "whereas" },
    { ja: "通信インフラのさらなる改善によって、災害時でも孤立した地域の住民が必要な情報を即座に受け取れるようになるでしょう。", answer: "Further improvements in communication infrastructure will enable residents in isolated regions to receive necessary information immediately even during disasters.", words: ["communication", "disasters", "during", "enable", "even", "further", "immediately", "improvements", "in", "in", "information", "infrastructure", "isolated", "necessary", "receive", "regions", "residents", "to", "whereas", "will"], unused: "whereas" }
  ]
};

worksheetDefinitions["enable-to-order"] = {
  label: "物主構文 enable（目的語＋to do・整序英作文）",
  title: "物主構文 enable＋目的語＋to do　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。",
  answerNote: "語順は「物主語＋enable／enables／enabled＋目的語＋to do」です。",
  type: "english-order",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "身近な道具・制度を主語にしたenable＋目的語＋to doの基本を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "高校初級語彙。修飾語を含む目的語や不定詞句を扱います。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "英検準2級程度。長い目的語、関係詞、受動表現を含みます。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト程度。単語単位に分割し、不要語を1語加えます。" }
  }
};

const leavePastParticipleOptionV10 = worksheetTypeSelect.querySelector('option[value="leave-past-participle-order"]');
if (leavePastParticipleOptionV10 && !worksheetTypeSelect.querySelector('option[value="enable-to-order"]')) {
  const option = document.createElement("option");
  option.value = "enable-to-order";
  option.textContent = "物主構文 enable（目的語＋to do）― 整序英作文";
  leavePastParticipleOptionV10.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV10Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV10EnableTo() {
  if (worksheetTypeSelect.value === "enable-to-order") {
    return enableToQuestions[difficultySelect.value];
  }
  return buildQuestionPoolV10Previous();
};

const appendEnglishAnswerV10Previous = appendEnglishAnswer;
appendEnglishAnswer = function appendEnglishAnswerV10(fragment, question, number, type) {
  if (worksheetTypeSelect.value !== "enable-to-order") {
    appendEnglishAnswerV10Previous(fragment, question, number, type);
    return;
  }
  const item = document.createElement("div");
  item.className = "english-answer-item";
  const answer = document.createElement("p");
  answer.innerHTML = `<b>${number}. ${question.answer}</b>`;
  const structure = document.createElement("p");
  structure.className = "answer-explanation";
  structure.textContent = `物主語＋enable／enables／enabled＋目的語＋to do${question.unused ? `（不要語：${question.unused}）` : ""}`;
  item.append(answer, structure);
  fragment.appendChild(item);
};

syncDifficultyOptions();
updateControls();
