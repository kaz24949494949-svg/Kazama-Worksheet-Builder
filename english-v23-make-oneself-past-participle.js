"use strict";

// Focused practice: make + oneself + past participle (understood / heard).
const makeOneselfPastParticipleQuestions = {
  basic: [
    { ja: "私は英語で自分の言いたいことを理解してもらいました。", answer: "I made myself understood in English.", words: ["myself", "understood", "in English", "made", "I"] },
    { ja: "彼女は大きな声で話して、自分の声を聞いてもらいました。", answer: "She made herself heard by speaking loudly.", words: ["herself", "heard", "by speaking loudly", "made", "she"] },
    { ja: "彼は簡単な言葉を使って、自分の言いたいことを理解してもらいました。", answer: "He made himself understood by using simple words.", words: ["himself", "understood", "by using simple words", "made", "he"] },
    { ja: "私たちは騒がしい部屋で、自分たちの声を聞いてもらいました。", answer: "We made ourselves heard in the noisy room.", words: ["ourselves", "heard", "in the noisy room", "made", "we"] },
    { ja: "彼女は身振りを使って、自分の言いたいことを理解してもらいました。", answer: "She made herself understood with gestures.", words: ["herself", "understood", "with gestures", "made", "she"] },
    { ja: "彼は群衆の中で、自分の声を聞いてもらいました。", answer: "He made himself heard in the crowd.", words: ["himself", "heard", "in the crowd", "made", "he"] },
    { ja: "私はゆっくり話して、自分の言いたいことを理解してもらいました。", answer: "I made myself understood by speaking slowly.", words: ["myself", "understood", "by speaking slowly", "made", "I"] },
    { ja: "彼女たちは会議で、自分たちの声を聞いてもらいました。", answer: "They made themselves heard at the meeting.", words: ["themselves", "heard", "at the meeting", "made", "they"] },
    { ja: "彼女は短い文を使って、自分の言いたいことを理解してもらいました。", answer: "She made herself understood with short sentences.", words: ["herself", "understood", "with short sentences", "made", "she"] },
    { ja: "私はマイクを使って、自分の声を聞いてもらいました。", answer: "I made myself heard with a microphone.", words: ["myself", "heard", "with a microphone", "made", "I"] },
    { ja: "彼は図を使って、自分の言いたいことを理解してもらいました。", answer: "He made himself understood with a diagram.", words: ["himself", "understood", "with a diagram", "made", "he"] },
    { ja: "私たちはもっと大きな声で話して、自分たちの声を聞いてもらいました。", answer: "We made ourselves heard by speaking louder.", words: ["ourselves", "heard", "by speaking louder", "made", "we"] }
  ],
  standard: [
    { ja: "私は限られた語彙でも、自分の言いたいことを理解してもらいました。", answer: "I made myself understood with my limited vocabulary.", words: ["I", "made", "myself", "understood", "with", "my", "limited", "vocabulary"] },
    { ja: "彼女は騒音の中でも、自分の声を聞いてもらいました。", answer: "She made herself heard over the noise.", words: ["she", "made", "herself", "heard", "over", "the", "noise"] },
    { ja: "彼は例を挙げることで、自分の考えを理解してもらいました。", answer: "He made himself understood by giving examples.", words: ["he", "made", "himself", "understood", "by", "giving", "examples"] },
    { ja: "私たちは活発な議論の中で、自分たちの意見を聞いてもらいました。", answer: "We made ourselves heard during the lively discussion.", words: ["we", "made", "ourselves", "heard", "during", "the", "lively", "discussion"] },
    { ja: "彼女は図表を使って、自分の説明を理解してもらいました。", answer: "She made herself understood by using charts.", words: ["she", "made", "herself", "understood", "by", "using", "charts"] },
    { ja: "彼は会場の後ろまで自分の声を届かせました。", answer: "He made himself heard at the back of the hall.", words: ["he", "made", "himself", "heard", "at", "the", "back", "of", "the", "hall"] },
    { ja: "私は言い換えることで、自分の意図を理解してもらいました。", answer: "I made myself understood by rephrasing my point.", words: ["I", "made", "myself", "understood", "by", "rephrasing", "my", "point"] },
    { ja: "彼女たちは公開討論で、自分たちの声を十分に聞いてもらいました。", answer: "They made themselves clearly heard in the public debate.", words: ["they", "made", "themselves", "clearly", "heard", "in", "the", "public", "debate"] },
    { ja: "彼女は簡潔に話して、自分の考えを理解してもらいました。", answer: "She made herself understood by speaking briefly.", words: ["she", "made", "herself", "understood", "by", "speaking", "briefly"] },
    { ja: "私は会議の最後に、自分の意見を聞いてもらいました。", answer: "I made myself heard at the end of the meeting.", words: ["I", "made", "myself", "heard", "at", "the", "end", "of", "the", "meeting"] },
    { ja: "彼は専門用語を避けて、自分の説明を理解してもらいました。", answer: "He made himself understood without technical terms.", words: ["he", "made", "himself", "understood", "without", "technical", "terms"] },
    { ja: "私たちは司会者に合図して、自分たちの声を聞いてもらいました。", answer: "We made ourselves heard by signaling to the chairperson.", words: ["we", "made", "ourselves", "heard", "by", "signaling", "to", "the", "chairperson"] }
  ],
  advanced: [
    { ja: "私は専門的な内容でしたが、具体例を使って自分の言いたいことを理解してもらいました。", answer: "I made myself understood by using concrete examples despite the technical subject.", words: ["I", "made", "myself", "understood", "by", "using", "concrete", "examples", "despite", "the", "technical", "subject"] },
    { ja: "彼女は絶え間ない騒音の中でも、自分の声を聞いてもらいました。", answer: "She made herself heard above the constant noise.", words: ["she", "made", "herself", "heard", "above", "the", "constant", "noise"] },
    { ja: "彼は複雑な考えを言い換えることで、自分の意図を理解してもらいました。", answer: "He made himself understood by rephrasing the complex idea.", words: ["he", "made", "himself", "understood", "by", "rephrasing", "the", "complex", "idea"] },
    { ja: "私たちは反対意見が多い会議でも、自分たちの声を聞いてもらいました。", answer: "We made ourselves heard even in a meeting full of opposition.", words: ["we", "made", "ourselves", "heard", "even", "in", "a", "meeting", "full", "of", "opposition"] },
    { ja: "彼女は重要な点を繰り返すことで、自分の考えを理解してもらいました。", answer: "She made herself understood by repeating the key point.", words: ["she", "made", "herself", "understood", "by", "repeating", "the", "key", "point"] },
    { ja: "彼は騒がしい抗議集会の中でも、自分の声を聞いてもらいました。", answer: "He made himself heard amid the noisy protest.", words: ["he", "made", "himself", "heard", "amid", "the", "noisy", "protest"] },
    { ja: "私は言葉だけでなく図も使って、自分の意図を理解してもらいました。", answer: "I made myself understood by using diagrams as well as words.", words: ["I", "made", "myself", "understood", "by", "using", "diagrams", "as", "well", "as", "words"] },
    { ja: "彼女たちは何度も発言を求め、自分たちの声を聞いてもらいました。", answer: "They made themselves heard by repeatedly asking to speak.", words: ["they", "made", "themselves", "heard", "by", "repeatedly", "asking", "to", "speak"] },
    { ja: "彼女は曖昧な表現を避けることで、自分の立場を理解してもらいました。", answer: "She made herself understood by avoiding ambiguous expressions.", words: ["she", "made", "herself", "understood", "by", "avoiding", "ambiguous", "expressions"] },
    { ja: "私は広い講堂でも、自分の声をはっきり聞いてもらいました。", answer: "I made myself clearly heard throughout the large auditorium.", words: ["I", "made", "myself", "clearly", "heard", "throughout", "the", "large", "auditorium"] },
    { ja: "彼は結論を先に述べることで、自分の主張を理解してもらいました。", answer: "He made himself understood by stating his conclusion first.", words: ["he", "made", "himself", "understood", "by", "stating", "his", "conclusion", "first"] },
    { ja: "私たちは激しい議論の最中でも、自分たちの声を聞いてもらいました。", answer: "We made ourselves heard even during the heated argument.", words: ["we", "made", "ourselves", "heard", "even", "during", "the", "heated", "argument"] }
  ],
  hard: [
    { ja: "私は専門英語を十分に使えませんでしたが、自分の言いたいことを理解してもらいました。", answer: "I made myself understood despite my limited command of technical English.", words: ["I", "made", "myself", "understood", "despite", "my", "limited", "command", "of", "technical", "English", "understanding"], unused: "understanding" },
    { ja: "彼女は機械の絶え間ない騒音の中でも、自分の声を聞いてもらいました。", answer: "She made herself heard over the constant noise of the machinery.", words: ["she", "made", "herself", "heard", "over", "the", "constant", "noise", "of", "the", "machinery", "hearing"], unused: "hearing" },
    { ja: "彼は前提を明示することで、自分の議論を理解してもらいました。", answer: "He made himself understood by stating his assumptions explicitly.", words: ["he", "made", "himself", "understood", "by", "stating", "his", "assumptions", "explicitly", "understanding"], unused: "understanding" },
    { ja: "私たちは激しい反対にもかかわらず、自分たちの声を聞いてもらいました。", answer: "We made ourselves heard despite strong opposition.", words: ["we", "made", "ourselves", "heard", "despite", "strong", "opposition", "hearing"], unused: "hearing" },
    { ja: "彼女は論点を慎重に整理して、自分の立場を明確に理解してもらいました。", answer: "She made herself clearly understood by carefully organizing her points.", words: ["she", "made", "herself", "clearly", "understood", "by", "carefully", "organizing", "her", "points", "clarity"], unused: "clarity" },
    { ja: "彼は大勢が同時に話す中でも、自分の声をはっきり聞いてもらいました。", answer: "He made himself clearly heard while many others were speaking.", words: ["he", "made", "himself", "clearly", "heard", "while", "many", "others", "were", "speaking", "hearing"], unused: "hearing" },
    { ja: "私は複雑な手順を段階ごとに説明して、自分の意図を理解してもらいました。", answer: "I made myself understood by explaining the complex procedure step by step.", words: ["I", "made", "myself", "understood", "by", "explaining", "the", "complex", "procedure", "step", "by", "step", "understanding"], unused: "understanding" },
    { ja: "彼女たちは公開討論の中で、反対派にも自分たちの声を聞いてもらいました。", answer: "They made themselves heard even by their opponents in the public debate.", words: ["they", "made", "themselves", "heard", "even", "by", "their", "opponents", "in", "the", "public", "debate", "hearing"], unused: "hearing" },
    { ja: "彼女は専門用語を日常的な表現に置き換えて、自分の説明を理解してもらいました。", answer: "She made herself understood by replacing technical terms with everyday expressions.", words: ["she", "made", "herself", "understood", "by", "replacing", "technical", "terms", "with", "everyday", "expressions", "understanding"], unused: "understanding" },
    { ja: "私は騒々しい会場の後方まで、自分の声を聞いてもらいました。", answer: "I made myself heard even at the back of the noisy hall.", words: ["I", "made", "myself", "heard", "even", "at", "the", "back", "of", "the", "noisy", "hall", "hearing"], unused: "hearing" },
    { ja: "彼は論理関係を明示することで、自分の主張を正確に理解してもらいました。", answer: "He made himself accurately understood by making the logical connections explicit.", words: ["he", "made", "himself", "accurately", "understood", "by", "making", "the", "logical", "connections", "explicit", "accuracy"], unused: "accuracy" },
    { ja: "私たちは時間が限られていましたが、重要な点について自分たちの声を聞いてもらいました。", answer: "We made ourselves heard on the key points despite the limited time.", words: ["we", "made", "ourselves", "heard", "on", "the", "key", "points", "despite", "the", "limited", "time", "hearing"], unused: "hearing" }
  ]
};

worksheetDefinitions["make-oneself-past-participle-order"] = {
  label: "make＋oneself＋過去分詞（understood / heard）",
  title: "make＋oneself＋過去分詞　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。oneself は主語に合わせて myself / yourself / himself / herself / ourselves / themselves に変わります。難関編には不要語が1語あります。",
  answerNote: "基本構造は「主語＋make／makes／made＋oneself＋understood / heard」です。oneself と過去分詞の間には受け身の関係があります。",
  type: "english-order-past",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "myself / himself / herself / ourselves / themselves と understood / heard の基本語順を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "前置詞句や by＋V-ing を加え、make oneself understood / heard を安定させます。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "長めの修飾表現を含む文を単語単位で並べ替えます。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業程度。長い文を単語単位で処理し、不要語を1語除きます。" }
  }
};

const pastParticipleOptionV23 = worksheetTypeSelect.querySelector('option[value="make-past-participle-order"]');
if (pastParticipleOptionV23 && !worksheetTypeSelect.querySelector('option[value="make-oneself-past-participle-order"]')) {
  const option = document.createElement("option");
  option.value = "make-oneself-past-participle-order";
  option.textContent = "make＋oneself＋過去分詞（understood / heard）― 整序英作文";
  pastParticipleOptionV23.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV23Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV23MakeOneselfPastParticiple() {
  if (worksheetTypeSelect.value === "make-oneself-past-participle-order") {
    return makeOneselfPastParticipleQuestions[difficultySelect.value];
  }
  return buildQuestionPoolV23Previous();
};

syncDifficultyOptions();
updateControls();
