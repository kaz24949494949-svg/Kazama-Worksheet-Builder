"use strict";

// Version 6: finalized keep + object + adjective ordering worksheets.
const keepAdjectiveQuestions = {
  basic: [
    { ja: "このコートは私を暖かく保ってくれます。", answer: "This coat keeps me warm.", words: ["me", "this coat", "warm", "keeps"] },
    { ja: "毎日の運動は彼女を活動的に保ちます。", answer: "Daily exercise keeps her active.", words: ["active", "daily exercise", "her", "keeps"] },
    { ja: "運動は私たちの体を強く保ちます。", answer: "Exercise keeps our bodies strong.", words: ["our bodies", "exercise", "strong", "keeps"] },
    { ja: "この箱は食べ物を冷たいままに保ちます。", answer: "This box keeps the food cold.", words: ["the food", "cold", "this box", "keeps"] },
    { ja: "その音楽は私を落ち着いた状態に保ってくれます。", answer: "The music keeps me calm.", words: ["calm", "the music", "me", "keeps"] },
    { ja: "彼女はいつも自分の部屋をきれいにしています。", answer: "She keeps her room clean.", words: ["her room", "she", "clean", "keeps"] },
    { ja: "私たちは教室を静かにしておかなければなりません。", answer: "We must keep the classroom quiet.", words: ["quiet", "the classroom", "must", "keep", "we"] },
    { ja: "このふたは飲み物を温かいままに保ちます。", answer: "This lid keeps the drink warm.", words: ["warm", "the drink", "keeps", "this lid"] },
    { ja: "その窓は部屋を明るく保っています。", answer: "The window keeps the room bright.", words: ["bright", "the window", "the room", "keeps"] },
    { ja: "十分な睡眠は私たちを健康に保ちます。", answer: "Enough sleep keeps us healthy.", words: ["enough sleep", "healthy", "us", "keeps"] },
    { ja: "この明かりは玄関を明るく保ちます。", answer: "This light keeps the entrance bright.", words: ["bright", "keeps", "the entrance", "this light"] },
    { ja: "彼はいつも机をきれいにしています。", answer: "He keeps his desk tidy.", words: ["his desk", "he", "tidy", "keeps"] }
  ],
  standard: [
    { ja: "この厚いカーテンは部屋を暖かく保ちます。", answer: "This thick curtain keeps the room warm.", words: ["keeps", "the room warm", "this thick curtain"] },
    { ja: "規則正しい運動は私たちの体を健康に保ちます。", answer: "Regular exercise keeps our bodies healthy.", words: ["regular exercise", "our bodies healthy", "keeps"] },
    { ja: "彼女は難しい状況でも自分自身を冷静に保ちました。", answer: "She kept herself calm even in a difficult situation.", words: ["even in a difficult situation", "herself calm", "kept", "she"] },
    { ja: "その知らせは彼を一晩中目覚めたままにしました。", answer: "The news kept him awake all night.", words: ["the news", "kept", "him awake", "all night"] },
    { ja: "この容器は野菜を新鮮なまま保ちます。", answer: "This container keeps the vegetables fresh.", words: ["keeps", "this container", "the vegetables fresh"] },
    { ja: "先生は授業中、生徒たちを静かにさせておきました。", answer: "The teacher kept the students quiet during the lesson.", words: ["the students quiet", "during the lesson", "kept", "the teacher"] },
    { ja: "他の人との交流によって、私たちは異なる考え方を受け入れる姿勢を保てます。", answer: "Our interaction with others keeps us open to different ideas.", words: ["different", "ideas", "interaction", "keeps", "open", "others", "our", "to", "us", "with"] },
    { ja: "新しい制度は選考過程を公平に保ちます。", answer: "The new system keeps the selection process fair.", words: ["fair", "keeps", "new", "process", "selection", "system", "the", "the"] },
    { ja: "彼女は緊急事態の間も、落ち着いた声を保ちました。", answer: "She kept her voice calm during the emergency.", words: ["calm", "during", "emergency", "her", "kept", "she", "the", "voice"] },
    { ja: "定期的な点検は機械を安全な状態に保ちます。", answer: "Regular checks keep the machine safe.", words: ["checks", "keep", "machine", "regular", "safe", "the"] },
    { ja: "その指示によって、作業員たちは危険を意識し続けました。", answer: "The instructions kept the workers aware of the danger.", words: ["aware", "danger", "instructions", "kept", "of", "the", "the", "workers"] },
    { ja: "入念な準備のおかげで、チームは自信を保てます。", answer: "Careful preparation keeps the team confident.", words: ["careful", "confident", "keeps", "preparation", "team", "the"] }
  ],
  advanced: [
    { ja: "定期的な話し合いは、チーム内の意思疎通を円滑に保ちます。", answer: "Regular discussions keep communication within the team smooth.", words: ["communication", "discussions", "keep", "regular", "smooth", "team", "the", "within"] },
    { ja: "この仕組みは、個人情報を安全な状態に保ちます。", answer: "This system keeps personal information safe.", words: ["information", "keeps", "personal", "safe", "system", "this"] },
    { ja: "その地域の伝統は、住民同士の関係を強く保っています。", answer: "The local tradition keeps relationships among residents strong.", words: ["among", "keeps", "local", "relationships", "residents", "strong", "the", "tradition"] },
    { ja: "十分な休息は、私たちの集中力を高い状態に保ちます。", answer: "Enough rest keeps our concentration level high.", words: ["concentration", "enough", "high", "keeps", "level", "our", "rest"] },
    { ja: "厳しい基準は、その会社の製品の品質を一定に保ちます。", answer: "Strict standards keep the company’s product quality consistent.", words: ["company’s", "consistent", "keep", "product", "quality", "standards", "strict", "the"] },
    { ja: "明確な目標によって、生徒たちは学ぶ意欲を持ち続けられます。", answer: "Clear goals keep students eager to learn.", words: ["clear", "eager", "goals", "keep", "learn", "students", "to"] },
    { ja: "定期的な更新によって、そのウェブサイトは利用者にとって便利な状態に保たれています。", answer: "Regular updates keep the website convenient for users.", words: ["convenient", "for", "keep", "regular", "the", "updates", "users", "website"] },
    { ja: "十分な情報は、人々を不必要な不安から解放された状態に保ちます。", answer: "Sufficient information keeps people free from unnecessary anxiety.", words: ["anxiety", "free", "from", "information", "keeps", "people", "sufficient", "unnecessary"] },
    { ja: "適切な管理は、公共の場所を清潔で安全な状態に保ちます。", answer: "Proper management keeps public spaces clean and safe.", words: ["and", "clean", "keeps", "management", "proper", "public", "safe", "spaces"] },
    { ja: "地域社会からの支援は、その小さな事業を安定した状態に保ちました。", answer: "Support from the community kept the small business stable.", words: ["business", "community", "from", "kept", "small", "stable", "support", "the", "the"] },
    { ja: "異なる意見に触れることは、私たちの考え方を柔軟に保ちます。", answer: "Exposure to different ideas keeps our thinking flexible.", words: ["different", "exposure", "flexible", "ideas", "keeps", "our", "thinking", "to"] },
    { ja: "適切な判断は、困難な状況でも計画を現実的なものに保ちます。", answer: "Sound judgment keeps plans realistic even in difficult situations.", words: ["difficult", "even", "in", "judgment", "keeps", "plans", "realistic", "situations", "sound"] }
  ],
  hard: [
    { ja: "明確な指針は、意思決定の過程を透明な状態に保ちます。", answer: "Clear guidelines keep the process of decision-making transparent.", words: ["although", "clear", "decision-making", "guidelines", "keep", "of", "process", "the", "transparent"], unused: "although" },
    { ja: "定期的な監査は、電子的に保存された取引記録を正確な状態に保ちます。", answer: "Regular audits keep electronically stored transaction records accurate.", words: ["accurate", "audits", "electronically", "keep", "records", "regular", "stored", "transaction", "unless"], unused: "unless" },
    { ja: "率直な意思疎通によって、双方は協力する姿勢を保てます。", answer: "Open communication keeps both sides willing to cooperate.", words: ["both", "communication", "cooperate", "keeps", "open", "sides", "to", "whereas", "willing"], unused: "whereas" },
    { ja: "独立した監督は、それぞれの評価を公平なものに保ちます。", answer: "Independent oversight keeps each evaluation impartial.", words: ["despite", "each", "evaluation", "impartial", "independent", "keeps", "oversight"], unused: "despite" },
    { ja: "継続的な見直しは、その方針を変化する状況に適したものに保ちます。", answer: "Constant review keeps the policy relevant to changing conditions.", words: ["because", "changing", "conditions", "constant", "keeps", "policy", "relevant", "review", "the", "to"], unused: "because" },
    { ja: "信頼できるデータは、公共政策をめぐる議論を客観的なものに保ちます。", answer: "Reliable data keeps the debate over public policy objective.", words: ["data", "debate", "keeps", "objective", "over", "policy", "public", "reliable", "the", "whether"], unused: "whether" },
    { ja: "慎重な計画は、そのプロジェクトを財政的に実行可能な状態に保ちます。", answer: "Careful planning keeps the project financially viable.", words: ["careful", "financially", "keeps", "planning", "project", "the", "viable", "whenever"], unused: "whenever" },
    { ja: "強力な安全対策は、機密性の高いデータを安全な状態に保ちます。", answer: "Strong safeguards keep highly sensitive data secure.", words: ["data", "highly", "keep", "safeguards", "secure", "sensitive", "strong", "whose"], unused: "whose" },
    { ja: "一貫した指導力は、私たちの戦略上の優先事項を明確な状態に保ちます。", answer: "Consistent leadership keeps our strategic priorities clear.", words: ["clear", "consistent", "keeps", "leadership", "our", "priorities", "since", "strategic"], unused: "since" },
    { ja: "柔軟な規則は、その制度を変化する必要に適応できる状態に保ちます。", answer: "Flexible rules keep the system adaptable to changing needs.", words: ["adaptable", "changing", "flexible", "if", "keep", "needs", "rules", "system", "the", "to"], unused: "if" },
    { ja: "定期的な整備は、重要なサービスを完全に稼働できる状態に保ちます。", answer: "Regular maintenance keeps essential services fully operational.", words: ["essential", "fully", "keeps", "maintenance", "operational", "regular", "services", "while"], unused: "while" },
    { ja: "幅広い参加は、政策決定の過程を包摂的なものに保ちます。", answer: "Broad participation keeps the process of policy-making inclusive.", words: ["broad", "inclusive", "keeps", "of", "participation", "policy-making", "process", "the", "unless"], unused: "unless" }
  ]
};

worksheetDefinitions["keep-adjective-order"] = {
  label: "keep（目的語＋形容詞・整序英作文）",
  title: "keep＋O＋形容詞　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。",
  answerNote: "語順は「主語＋keep／keeps／kept＋目的語＋形容詞」です。",
  type: "english-order",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "中学修了語彙。語句単位を中心に、keep＋O＋形容詞の語順を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "高校初級語彙。語句単位6問と単語単位6問を混在させます。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "英検準2級程度。全問を単語単位に分割します。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト程度。全問を単語単位にし、不要語を1語加えます。" }
  }
};

const bareInfinitiveOptionV6 = worksheetTypeSelect.querySelector('option[value="make-bare-infinitive-order"]');
if (bareInfinitiveOptionV6 && !worksheetTypeSelect.querySelector('option[value="keep-adjective-order"]')) {
  const option = document.createElement("option");
  option.value = "keep-adjective-order";
  option.textContent = "keep（目的語＋形容詞）― 整序英作文";
  bareInfinitiveOptionV6.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV5ForKeep = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV6KeepAdjective() {
  if (worksheetTypeSelect.value === "keep-adjective-order") {
    return keepAdjectiveQuestions[difficultySelect.value];
  }
  return buildQuestionPoolV5ForKeep();
};
