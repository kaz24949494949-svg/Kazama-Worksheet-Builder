"use strict";

// Version 5: finalized make + object + bare infinitive ordering worksheets.
const makeBareInfinitiveQuestions = {
  basic: [
    { ja: "その先生は私たちに一生懸命勉強させました。", answer: "The teacher made us study hard.", words: ["study hard", "the teacher", "us", "made"] },
    { ja: "母は私に部屋を掃除させました。", answer: "My mother made me clean my room.", words: ["clean my room", "my mother", "me", "made"] },
    { ja: "その映画は私を泣かせました。", answer: "The movie made me cry.", words: ["cry", "the movie", "me", "made"] },
    { ja: "その冗談はみんなを笑わせました。", answer: "The joke made everyone laugh.", words: ["everyone", "the joke", "laugh", "made"] },
    { ja: "父は私を早く起きさせました。", answer: "My father made me get up early.", words: ["get up early", "my father", "me", "made"] },
    { ja: "その知らせは彼女を不安な気持ちにさせました。", answer: "The news made her feel nervous.", words: ["feel nervous", "the news", "her", "made"] },
    { ja: "その雨のため、私たちは家にいなければなりませんでした。", answer: "The rain made us stay home.", words: ["stay home", "the rain", "us", "made"] },
    { ja: "そのベルの音で、生徒たちは立ち上がりました。", answer: "The bell made the students stand up.", words: ["stand up", "the students", "the bell", "made"] },
    { ja: "先生は彼にその英文をもう一度読ませました。", answer: "The teacher made him read the English sentence again.", words: ["read the English sentence again", "the teacher", "him", "made"] },
    { ja: "彼の言葉のおかげで、私はもう一度挑戦しました。", answer: "His words made me try again.", words: ["try again", "his words", "me", "made"] },
    { ja: "その音楽を聞いて、私たちは踊りたくなりました。", answer: "The music made us want to dance.", words: ["want to dance", "the music", "us", "made"] },
    { ja: "コーチは選手たちを毎日走らせました。", answer: "The coach made the players run every day.", words: ["run every day", "the coach", "the players", "made"] }
  ],
  standard: [
    { ja: "先生は私たちに自分たちの意見を説明させました。", answer: "The teacher made us explain our opinions.", words: ["explain our opinions", "the teacher", "us", "made"] },
    { ja: "その知らせを聞いて、彼女は計画を変更しました。", answer: "The news made her change her plan.", words: ["change her plan", "the news", "her", "made"] },
    { ja: "その経験をきっかけに、彼は自分の将来について考えました。", answer: "The experience made him think about his future.", words: ["think about his future", "the experience", "him", "made"] },
    { ja: "その警告を受けて、私たちはすぐに行動しました。", answer: "The warning made us act at once.", words: ["act at once", "the warning", "us", "made"] },
    { ja: "その質問を受けて、彼女は自分の答えを考え直しました。", answer: "The question made her reconsider her answer.", words: ["reconsider her answer", "the question", "her", "made"] },
    { ja: "その暑さのため、私たちは窓を開けました。", answer: "The heat made us open the windows.", words: ["open the windows", "the heat", "us", "made"] },
    { ja: "その映画を見て、彼は家族のありがたさを実感しました。", answer: "The film made him appreciate his family.", words: ["appreciate", "family", "film", "his", "him", "made", "the"] },
    { ja: "その失敗のため、彼女は以前より注意深く仕事をしました。", answer: "The failure made her work more carefully.", words: ["carefully", "failure", "her", "made", "more", "the", "work"] },
    { ja: "その騒音のため、私は仕事を中断しました。", answer: "The noise made me stop working.", words: ["made", "me", "noise", "stop", "the", "working"] },
    { ja: "彼女の説明を聞いて、私たちはその考えを受け入れました。", answer: "Her explanation made us accept the idea.", words: ["accept", "explanation", "her", "idea", "made", "the", "us"] },
    { ja: "その出来事によって、彼は自分の決断を後悔しました。", answer: "The event made him regret his decision.", words: ["decision", "event", "him", "made", "regret", "the", "his"] },
    { ja: "その新しい規則によって、従業員たちは働き方を変えました。", answer: "The new rule made the employees change the way they worked.", words: ["change", "employees", "made", "new", "rule", "the", "the", "the", "they", "way", "worked"] }
  ],
  advanced: [
    { ja: "その経験によって、彼女は自分の能力に気づきました。", answer: "The experience made her realize her own abilities.", words: ["abilities", "her", "her", "made", "own", "realize", "the", "experience"] },
    { ja: "その記事を読んで、私たちはその問題を別の視点から考えました。", answer: "The article made us consider the problem from a different perspective.", words: ["article", "consider", "different", "from", "made", "perspective", "problem", "the", "the", "us", "a"] },
    { ja: "その証拠によって、彼は自分の間違いを認めました。", answer: "The evidence made him admit his mistake.", words: ["admit", "evidence", "him", "made", "mistake", "his", "the"] },
    { ja: "その突然の変化によって、会社は計画を見直しました。", answer: "The sudden change made the company reconsider its plans.", words: ["change", "company", "its", "made", "plans", "reconsider", "sudden", "the", "the"] },
    { ja: "その出来事によって、彼女は社会の小さな変化に気づきました。", answer: "The event made her notice small changes in society.", words: ["changes", "event", "her", "made", "notice", "small", "society", "the", "in"] },
    { ja: "彼の正直な態度によって、私たちは彼の説明を受け入れました。", answer: "His honest attitude made us accept his explanation.", words: ["accept", "attitude", "explanation", "his", "honest", "made", "us", "his"] },
    { ja: "海外での経験によって、彼は異なる文化を尊重するようになりました。", answer: "The overseas experience made him respect different cultures.", words: ["cultures", "different", "experience", "him", "made", "overseas", "respect", "the"] },
    { ja: "その深刻な事故によって、地域の人々は環境を守るために行動しました。", answer: "The serious accident made the local people act to protect the environment.", words: ["accident", "act", "environment", "local", "made", "people", "protect", "serious", "the", "the", "the", "to"] },
    { ja: "先生の助言によって、彼女は学習方法を改善しました。", answer: "The teacher’s advice made her improve her study methods.", words: ["advice", "her", "her", "improve", "made", "methods", "study", "teacher’s", "the"] },
    { ja: "その成功をきっかけに、チームは困難な状況でも努力を続けました。", answer: "The success made the team continue to work even in a difficult situation.", words: ["continue", "difficult", "even", "made", "situation", "success", "team", "the", "the", "to", "work", "in", "a"] },
    { ja: "その報告書によって、政府はすぐに行動を起こしました。", answer: "The report made the government take immediate action.", words: ["action", "government", "made", "report", "take", "the", "the", "immediate"] },
    { ja: "その発見によって、研究者たちは以前の考えを疑いました。", answer: "The discovery made the researchers doubt their previous beliefs.", words: ["beliefs", "doubt", "made", "previous", "researchers", "their", "the", "the", "discovery"] }
  ],
  hard: [
    { ja: "その調査結果によって、委員会は従来の方針を見直しました。", answer: "The findings made the committee reconsider its existing policy.", words: ["although", "committee", "existing", "findings", "made", "policy", "reconsider", "the", "the", "its"], unused: "although" },
    { ja: "その突然の発表によって、多くの投資家は自分たちの判断を疑いました。", answer: "The sudden announcement made many investors doubt their decisions.", words: ["although", "announcement", "decisions", "doubt", "investors", "made", "many", "sudden", "the", "their"], unused: "although" },
    { ja: "その新しい証拠によって、研究者たちは以前の仮説を再検討しました。", answer: "The new evidence made the researchers reexamine their previous hypothesis.", words: ["although", "evidence", "hypothesis", "made", "new", "previous", "reexamine", "researchers", "the", "the", "their"], unused: "although" },
    { ja: "その経験を通して、彼女は自分が強く信じてきた価値観を見直しました。", answer: "The experience made her reconsider her deeply held values.", words: ["deeply", "experience", "held", "her", "her", "made", "reconsider", "the", "unless", "values"], unused: "unless" },
    { ja: "その批判を受けて、会社は製品の安全基準を改善しました。", answer: "The criticism made the company improve its product safety standards.", words: ["because", "company", "criticism", "improve", "made", "product", "safety", "standards", "the", "the", "its"], unused: "because" },
    { ja: "その出来事によって、地域住民は災害への備えを強化しました。", answer: "The event made local residents strengthen their disaster preparedness.", words: ["disaster", "event", "local", "made", "preparedness", "residents", "strengthen", "the", "their", "whenever"], unused: "whenever" },
    { ja: "その政策変更によって、多くの企業は長期戦略を修正しました。", answer: "The policy change made many businesses modify their long-term strategies.", words: ["businesses", "change", "long-term", "made", "many", "modify", "policy", "since", "strategies", "the", "their"], unused: "since" },
    { ja: "その報道によって、一般の人々は問題の深刻さを認識しました。", answer: "The media coverage made the public recognize the seriousness of the issue.", words: ["coverage", "issue", "made", "media", "of", "public", "recognize", "seriousness", "the", "the", "the", "the", "unless"], unused: "unless" },
    { ja: "その失敗によって、彼は自分の判断の限界を受け入れました。", answer: "The failure made him accept the limitations of his judgment.", words: ["accept", "despite", "failure", "him", "his", "judgment", "limitations", "made", "of", "the", "the"], unused: "despite" },
    { ja: "その国際的な議論によって、複数の政府が共通の解決策を模索しました。", answer: "The international debate made governments seek a common solution.", words: ["a", "common", "debate", "governments", "international", "made", "seek", "solution", "the", "whether"], unused: "whether" },
    { ja: "その長期的な変化によって、若者たちは働き方を再考しました。", answer: "The long-term change made young people rethink the way they worked.", words: ["change", "long-term", "made", "people", "rethink", "the", "the", "they", "way", "whereas", "worked", "young"], unused: "whereas" },
    { ja: "その予期せぬ結果によって、専門家たちは自分たちの根本的な前提を問い直しました。", answer: "The unexpected result made the experts question their fundamental assumptions.", words: ["assumptions", "experts", "fundamental", "made", "question", "result", "the", "the", "their", "unexpected", "whose"], unused: "whose" }
  ]
};

worksheetDefinitions["make-bare-infinitive-order"] = {
  label: "物主構文 make（目的語＋動詞の原形・整序英作文）",
  title: "物主構文 make＋O＋動詞の原形　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。",
  answerNote: "語順は「主語＋make／makes／made＋目的語＋動詞の原形」です。makeの後の目的語が、その動作を行います。",
  type: "english-order",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "中学修了語彙。語句単位を中心に、make＋O＋動詞の原形の語順を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "高校初級語彙。語句単位6問と単語単位6問を混在させます。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "英検準2級程度。全問を単語単位に分割します。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト程度。全問を単語単位にし、不要語を1語加えます。" }
  }
};

const pastParticipleOption = worksheetTypeSelect.querySelector('option[value="make-past-participle-order"]');
if (pastParticipleOption && !worksheetTypeSelect.querySelector('option[value="make-bare-infinitive-order"]')) {
  const bareInfinitiveOption = document.createElement("option");
  bareInfinitiveOption.value = "make-bare-infinitive-order";
  bareInfinitiveOption.textContent = "物主構文 make（目的語＋動詞の原形）― 整序英作文";
  pastParticipleOption.insertAdjacentElement("afterend", bareInfinitiveOption);
}

const buildQuestionPoolV4 = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV5() {
  if (worksheetTypeSelect.value === "make-bare-infinitive-order") {
    return makeBareInfinitiveQuestions[difficultySelect.value];
  }
  return buildQuestionPoolV4();
};

appendEnglishAnswer = function appendEnglishAnswerV5(fragment, question, number, type) {
  const item = document.createElement("div");
  item.className = "english-answer-item";

  const answer = document.createElement("p");
  answer.innerHTML = `<b>${number}. ${question.answer}</b>`;

  const structure = document.createElement("p");
  structure.className = "answer-explanation";

  if (type === "english-rewrite") {
    structure.textContent = `空欄：${question.blanks}`;
  } else {
    const selectedType = worksheetTypeSelect.value;
    let complement = "形容詞";
    if (selectedType === "make-past-participle-order") complement = "過去分詞";
    if (selectedType === "make-bare-infinitive-order") complement = "動詞の原形";
    structure.textContent = `主語＋make／makes／made＋目的語＋${complement}${question.unused ? `（不要語：${question.unused}）` : ""}`;
  }

  item.append(answer, structure);
  fragment.appendChild(item);
};

syncDifficultyOptions();
updateControls();
