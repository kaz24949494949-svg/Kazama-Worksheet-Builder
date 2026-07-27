"use strict";

// Version 6: finalized keep + object + present participle ordering worksheets.
const keepPresentParticipleQuestions = {
  basic: [
    { ja: "その先生は私たちを一生懸命勉強させ続けました。", answer: "The teacher kept us studying hard.", words: ["studying hard", "the teacher", "us", "kept"] },
    { ja: "母は私を台所で待たせておきました。", answer: "My mother kept me waiting in the kitchen.", words: ["waiting in the kitchen", "my mother", "me", "kept"] },
    { ja: "そのおもしろい話は、みんなを笑わせ続けました。", answer: "The funny story kept everyone laughing.", words: ["everyone", "the funny story", "laughing", "kept"] },
    { ja: "その悲しい映画は、彼女を泣かせ続けました。", answer: "The sad movie kept her crying.", words: ["crying", "her", "kept", "the sad movie"] },
    { ja: "彼は一晩中エンジンを動かしたままにしていました。", answer: "He kept the engine running all night.", words: ["all night", "he", "kept", "running", "the engine"] },
    { ja: "その音楽は、子どもたちを踊らせ続けました。", answer: "The music kept the children dancing.", words: ["dancing", "the children", "the music", "kept"] },
    { ja: "コーチは選手たちを運動場で走らせ続けました。", answer: "The coach kept the players running on the field.", words: ["running on the field", "the coach", "the players", "kept"] },
    { ja: "その質問は、私を長い間考え続けさせました。", answer: "The question kept me thinking for a long time.", words: ["thinking for a long time", "the question", "me", "kept"] },
    { ja: "彼女は水を流したままにしていました。", answer: "She kept the water running.", words: ["running", "she", "the water", "kept"] },
    { ja: "その仕事は、父を夜遅くまで働かせ続けました。", answer: "The job kept my father working until late at night.", words: ["working until late at night", "my father", "the job", "kept"] },
    { ja: "先生は生徒たちに、授業中ずっとその問題について話し合いを続けさせました。", answer: "The teacher kept the students discussing the problem during the lesson.", words: ["discussing the problem during the lesson", "kept", "the students", "the teacher"] },
    { ja: "そのゲームは私たちを何時間も遊ばせ続けました。", answer: "The game kept us playing for hours.", words: ["playing for hours", "the game", "us", "kept"] }
  ],
  standard: [
    { ja: "その長い会議は、私たちを何時間も座らせ続けました。", answer: "The long meeting kept us sitting for hours.", words: ["for hours", "kept", "the long meeting", "us sitting"] },
    { ja: "その難しい問題は、彼を夜遅くまで考え続けさせました。", answer: "The difficult problem kept him thinking until late at night.", words: ["him thinking", "kept", "the difficult problem", "until late at night"] },
    { ja: "その強い風は、旗を激しくはためかせ続けました。", answer: "The strong wind kept the flag flapping violently.", words: ["kept", "the flag flapping violently", "the strong wind"] },
    { ja: "先生は、生徒たちに英語で話し続けさせました。", answer: "The teacher kept the students speaking in English.", words: ["in English", "kept", "the students speaking", "the teacher"] },
    { ja: "その故障は、警報を一晩中鳴らし続けました。", answer: "The fault kept the alarm ringing all night.", words: ["all night", "kept", "ringing", "the alarm", "the fault"] },
    { ja: "彼女は客を長い間待たせてしまいました。", answer: "She kept the guest waiting for a long time.", words: ["for a long time", "kept", "she", "the guest waiting"] },
    { ja: "その知らせは、私たちをその理由について考え続けさせました。", answer: "The news kept us thinking about the reason.", words: ["about", "kept", "news", "reason", "the", "the", "thinking", "us"] },
    { ja: "コーチは、選手たちを試合が終わるまで走らせ続けました。", answer: "The coach kept the players running until the game ended.", words: ["coach", "game", "kept", "players", "running", "the", "the", "the", "until", "ended"] },
    { ja: "その明るい照明は、植物を冬の間も成長させ続けました。", answer: "The bright lights kept the plants growing through the winter.", words: ["bright", "growing", "kept", "lights", "plants", "the", "the", "the", "through", "winter"] },
    { ja: "その音楽は、公演中ずっと観客にリズムに合わせて体を動かし続けさせました。", answer: "The music kept the audience moving to the rhythm throughout the performance.", words: ["audience", "kept", "moving", "music", "performance", "rhythm", "the", "the", "the", "throughout", "to"] },
    { ja: "彼の説明は、私たちをその可能性について議論し続けさせました。", answer: "His explanation kept us discussing the possibility.", words: ["discussing", "explanation", "his", "kept", "possibility", "the", "us"] },
    { ja: "その新しい課題は、チームに解決策について話し合いを続けさせました。", answer: "The new task kept the team discussing solutions.", words: ["discussing", "kept", "new", "solutions", "task", "team", "the", "the"] }
  ],
  advanced: [
    { ja: "その予想外の結果は、研究者たちに原因を調べ続けさせました。", answer: "The unexpected result kept the researchers examining the cause.", words: ["cause", "examining", "kept", "researchers", "result", "the", "the", "the", "unexpected"] },
    { ja: "その活発な議論は、生徒たちにさまざまな可能性を考え続けさせました。", answer: "The active discussion kept the students considering various possibilities.", words: ["active", "considering", "discussion", "kept", "possibilities", "students", "the", "the", "various"] },
    { ja: "その深刻な問題は、地域社会に解決策を探し続けさせました。", answer: "The serious problem kept the local community looking for solutions.", words: ["community", "for", "kept", "local", "looking", "problem", "solutions", "serious", "the", "the"] },
    { ja: "その新しい証拠は、警察に事件をさらに詳しく調べ続けさせました。", answer: "The new evidence kept the police examining the case further.", words: ["case", "evidence", "examining", "further", "kept", "new", "police", "the", "the", "the"] },
    { ja: "その刺激的な講演は、聴衆に社会の変化について考え続けさせました。", answer: "The stimulating lecture kept the audience thinking about social changes.", words: ["audience", "changes", "kept", "lecture", "social", "stimulating", "the", "the", "thinking", "about"] },
    { ja: "その厳しい日程は、チームを強いプレッシャーの中で働かせ続けました。", answer: "The strict schedule kept the team working under pressure.", words: ["kept", "pressure", "schedule", "strict", "team", "the", "the", "under", "working"] },
    { ja: "その複雑な質問は、彼女に自分の立場を見直し続けさせました。", answer: "The complex question kept her reconsidering her position.", words: ["complex", "her", "kept", "position", "question", "reconsidering", "the", "her"] },
    { ja: "その経済的不安は、多くの家庭に支出を切り詰め続けさせました。", answer: "The economic uncertainty kept many families cutting back on spending.", words: ["back", "cutting", "economic", "families", "kept", "many", "on", "spending", "the", "uncertainty"] },
    { ja: "その継続的な支援は、若い選手たちに目標に向かって努力し続けさせました。", answer: "The continuous support kept the young athletes working toward their goals.", words: ["athletes", "continuous", "goals", "kept", "support", "the", "the", "their", "toward", "working", "young"] },
    { ja: "その急速な技術の進歩は、企業に戦略を更新し続けさせました。", answer: "The rapid technological advances kept companies updating their strategies.", words: ["advances", "companies", "kept", "rapid", "strategies", "technological", "their", "the", "updating"] },
    { ja: "その長引く議論は、委員会に代替案を検討し続けさせました。", answer: "The prolonged debate kept the committee considering alternative proposals.", words: ["alternative", "committee", "considering", "debate", "kept", "prolonged", "proposals", "the", "the"] },
    { ja: "その絶え間ない変化は、従業員たちに新しい状況へ適応し続けさせました。", answer: "The constant changes kept the employees adapting to new situations.", words: ["adapting", "changes", "employees", "kept", "new", "situations", "the", "the", "to", "constant"] }
  ],
  hard: [
    { ja: "その予期せぬ発見は、研究チームに自分たちが見落としていた点を再検討し続けさせました。", answer: "The unexpected discovery kept the research team reconsidering what they had missed.", words: ["although", "discovery", "had", "kept", "missed", "reconsidering", "research", "team", "the", "the", "they", "unexpected", "what"], unused: "although" },
    { ja: "絶え間ない市場の変化は、企業に長期戦略を修正し続けさせています。", answer: "Constant market shifts keep companies revising their long-term strategies.", words: ["companies", "constant", "keep", "long-term", "market", "revising", "shifts", "strategies", "their", "unless"], unused: "unless" },
    { ja: "その未解決の問題は、専門家たちに複数の説明を比較し続けさせました。", answer: "The unresolved issue kept the experts comparing several alternative explanations.", words: ["alternative", "comparing", "experts", "explanations", "issue", "kept", "several", "the", "the", "unresolved", "whereas"], unused: "whereas" },
    { ja: "急速な人口減少は、地方自治体に公共サービスを見直し続けさせています。", answer: "Rapid population decline keeps local authorities reconsidering public services.", words: ["authorities", "because", "decline", "keeps", "local", "population", "public", "rapid", "reconsidering", "services"], unused: "because" },
    { ja: "その長期にわたる不確実性は、投資家たちに自分たちがどれほどの損失を被る可能性があるかを見積もり続けさせました。", answer: "The prolonged uncertainty kept investors estimating how much they might lose.", words: ["estimating", "how", "investors", "kept", "lose", "might", "much", "prolonged", "the", "they", "uncertainty", "whether"], unused: "whether" },
    { ja: "その研究結果は、政策立案者たちに自分たちの前提が妥当かどうかを問い直し続けさせました。", answer: "The research findings kept policymakers questioning whether their assumptions were valid.", words: ["assumptions", "despite", "findings", "kept", "policymakers", "questioning", "research", "the", "their", "valid", "were", "whether"], unused: "despite" },
    { ja: "相次ぐ技術革新は、教育機関に指導方法を更新し続けさせています。", answer: "Successive technological innovations keep educational institutions updating their methods of instruction.", words: ["educational", "institutions", "innovations", "instruction", "keep", "methods", "of", "successive", "technological", "their", "updating", "whenever"], unused: "whenever" },
    { ja: "その激しい社会的圧力は、政府に改革案を検討し続けさせました。", answer: "The intense social pressure kept the government considering reform proposals.", words: ["considering", "government", "intense", "kept", "pressure", "proposals", "reform", "social", "the", "the", "whose"], unused: "whose" },
    { ja: "継続的な国際的緊張は、各国政府に現在の防衛体制が十分かどうかを再評価し続けさせています。", answer: "Ongoing international tensions keep governments reassessing whether existing defenses are sufficient.", words: ["are", "defenses", "existing", "governments", "international", "keep", "ongoing", "reassessing", "since", "sufficient", "tensions", "whether"], unused: "since" },
    { ja: "その複雑な法的問題は、委員会のメンバーに提案の文言を修正し続けさせました。", answer: "The complex legal issue kept committee members revising the wording of the proposal.", words: ["committee", "complex", "if", "issue", "kept", "legal", "members", "of", "proposal", "revising", "the", "the", "the", "wording"], unused: "if" },
    { ja: "急速な温暖化は、科学者たちにどの生物種が最も大きな影響を受けるかを予測し続けさせています。", answer: "Rapid warming keeps scientists predicting which species will be most affected.", words: ["affected", "be", "keep", "most", "predicting", "rapid", "scientists", "species", "warming", "which", "whose", "will"], unused: "whose" },
    { ja: "その予測困難な状況は、経営陣に最善の対応方法を検討し続けさせました。", answer: "The unpredictable situation kept the executives considering how best to respond.", words: ["although", "best", "considering", "executives", "how", "kept", "respond", "situation", "the", "the", "to", "unpredictable"], unused: "although" }
  ]
};

worksheetDefinitions["keep-present-participle-order"] = {
  label: "物主構文 keep（目的語＋現在分詞・整序英作文）",
  title: "物主構文 keep＋O＋現在分詞　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。",
  answerNote: "語順は「主語＋keep／keeps／kept＋目的語＋現在分詞」です。",
  type: "english-order",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "中学修了語彙。語句単位を中心に、keep＋O＋現在分詞の語順を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "高校初級語彙。語句単位6問と単語単位6問を混在させます。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "英検準2級程度。全問を単語単位に分割します。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト程度。全問を単語単位にし、不要語を1語加えます。" }
  }
};

const keepAdjectiveOptionV6 = worksheetTypeSelect.querySelector('option[value="keep-adjective-order"]');
if (keepAdjectiveOptionV6 && !worksheetTypeSelect.querySelector('option[value="keep-present-participle-order"]')) {
  const option = document.createElement("option");
  option.value = "keep-present-participle-order";
  option.textContent = "物主構文 keep（目的語＋現在分詞）― 整序英作文";
  keepAdjectiveOptionV6.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV6Adjective = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV6KeepPresentParticiple() {
  if (worksheetTypeSelect.value === "keep-present-participle-order") {
    return keepPresentParticipleQuestions[difficultySelect.value];
  }
  return buildQuestionPoolV6Adjective();
};

appendEnglishAnswer = function appendEnglishAnswerV6(fragment, question, number, type) {
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
    if (selectedType === "keep-present-participle-order") complement = "現在分詞";
    structure.textContent = `主語＋${selectedType.startsWith("keep-") ? "keep／keeps／kept" : "make／makes／made"}＋目的語＋${complement}${question.unused ? `（不要語：${question.unused}）` : ""}`;
  }
  item.append(answer, structure);
  fragment.appendChild(item);
};

syncDifficultyOptions();
updateControls();
