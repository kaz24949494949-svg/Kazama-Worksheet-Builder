"use strict";

// 暗記用例文96：原文を変更せず、難易度別に整序英作文化。
const memorization96OrderQuestions = {
  basic: [
    { ja: "私の姉は外国人と結婚した。", answer: "My sister married a foreigner.", words: ["a foreigner", "married", "my sister"] },
    { ja: "牛は我々に牛乳を供給する。", answer: "Cows provide us with milk.", words: ["with milk", "provide", "cows", "us"] },
    { ja: "私はその手紙を昨日出したことを覚えている。", answer: "I remember posting the letter yesterday.", words: ["posting the letter", "yesterday", "I", "remember"] },
    { ja: "彼はいすに座った。", answer: "He seated himself on the chair.", words: ["himself", "on the chair", "seated", "he"] },
    { ja: "この時計は修理する必要がある。", answer: "This watch needs repairing.", words: ["repairing", "this watch", "needs"] },
    { ja: "ベッドに横になりたい気分だ。", answer: "I feel like lying on the bed.", words: ["lying on the bed", "feel like", "I"] },
    { ja: "お母さんによろしく。", answer: "Please remember me to your mother.", words: ["to your mother", "please", "remember me"] },
    { ja: "男の子が通りを横切るのが見えた。", answer: "I saw a boy cross the street.", words: ["a boy", "cross the street", "saw", "I"] },
    { ja: "私には住む家がない。", answer: "I have no house to live in.", words: ["to live in", "no house", "have", "I"] },
    { ja: "遅れないように注意しなさい。", answer: "Be careful not to be late.", words: ["not to be late", "be careful"] },
    { ja: "この絵をどう思いますか。", answer: "What do you think of this picture?", words: ["of this picture", "what", "do you think"] },
    { ja: "私は1日おきに入浴する。", answer: "I take a bath every other day.", words: ["every other day", "take a bath", "I"] }
  ],
  standard: [
    { ja: "彼は目覚めてみると有名になっていた。", answer: "He awoke to find himself famous.", words: ["he", "awoke", "to", "find", "himself", "famous"] },
    { ja: "彼がカメラを列車に置いてきたのは不注意だった。", answer: "It was careless of him to leave his camera in the train.", words: ["it", "was", "careless", "of", "him", "to", "leave", "his", "camera", "in", "the", "train"] },
    { ja: "そのかばんは重すぎてメアリーには運べない。", answer: "The bag is too heavy for Mary to carry.", words: ["the", "bag", "is", "too", "heavy", "for", "Mary", "to", "carry"] },
    { ja: "そのかばんは軽いのでメアリーでも運べる。", answer: "The bag is light enough for Mary to carry.", words: ["the", "bag", "is", "light", "enough", "for", "Mary", "to", "carry"] },
    { ja: "そんな所で彼に会うとは思ってもみなかった。", answer: "He was the last man I expected to meet there.", words: ["he", "was", "the", "last", "man", "I", "expected", "to", "meet", "there"] },
    { ja: "私は彼が6時までに来ることを確信している。", answer: "I am sure of his coming by six o'clock.", words: ["I", "am", "sure", "of", "his", "coming", "by", "six", "o'clock"] },
    { ja: "彼を待つより仕方がない。", answer: "There is nothing for it but to wait for him.", words: ["there", "is", "nothing", "for", "it", "but", "to", "wait", "for", "him"] },
    { ja: "彼はどうしてよいかわからず途方にくれた。", answer: "He was at a loss what to do.", words: ["he", "was", "at", "a", "loss", "what", "to", "do"] },
    { ja: "私は自分の名前が呼ばれるのを聞いた。", answer: "I heard my name called.", words: ["I", "heard", "my", "name", "called"] },
    { ja: "君は英語で話が通じますか。", answer: "Can you make yourself understood in English?", words: ["can", "you", "make", "yourself", "understood", "in", "English"] },
    { ja: "私は部屋を白く塗ってほしい。", answer: "I want my room painted white.", words: ["I", "want", "my", "room", "painted", "white"] },
    { ja: "彼は目を閉じて音楽に耳を傾けた。", answer: "He listened to the music with his eyes closed.", words: ["he", "listened", "to", "the", "music", "with", "his", "eyes", "closed"] }
  ],
  hard: [
    { ja: "彼はクラスで一番背の高い少年だ。", answer: "He is taller than any other boy in his class.", words: ["he", "is", "taller", "than", "any", "other", "boy", "in", "his", "class"] },
    { ja: "金づちが泳げないのと同じように私は全く泳げない。", answer: "I can no more swim than a hammer can.", words: ["I", "can", "no", "more", "swim", "than", "a", "hammer", "can"] },
    { ja: "彼は学者というよりむしろ詩人だ。", answer: "He is not so much a scholar as a poet.", words: ["he", "is", "not", "so", "much", "a", "scholar", "as", "a", "poet"] },
    { ja: "健康ほど貴重なものはない。", answer: "Nothing is so precious as health.", words: ["nothing", "is", "so", "precious", "as", "health"] },
    { ja: "彼は私の3倍の切手を持っている。", answer: "He has three times as many stamps as I have.", words: ["he", "has", "three", "times", "as", "many", "stamps", "as", "I", "have"] },
    { ja: "彼は2人の少年たちのうち背の高い方だ。", answer: "He is the taller of the two boys.", words: ["he", "is", "the", "taller", "of", "the", "two", "boys"] },
    { ja: "彼女は彼が欠点を持っているのでますます彼を愛した。", answer: "She loved him all the more for his faults.", words: ["she", "loved", "him", "all", "the", "more", "for", "his", "faults"] },
    { ja: "我々が高く登れば登るほど、ますます寒くなった。", answer: "The higher we climbed, the colder it became.", words: ["the", "higher", "we", "climbed", "the", "colder", "it", "became"] },
    { ja: "彼は口ごたえするほどばかではない。", answer: "He knows better than to answer back.", words: ["he", "knows", "better", "than", "to", "answer", "back"] },
    { ja: "彼は金持ちだったにちがいない。", answer: "He must have been rich.", words: ["he", "must", "have", "been", "rich"] },
    { ja: "君はあの映画を見るべきだったのに。", answer: "You should have seen that movie.", words: ["you", "should", "have", "seen", "that", "movie"] },
    { ja: "もし君の助けがなかったら、私は成功できなかったろう。", answer: "Had it not been for your help, I could not have succeeded.", words: ["had", "it", "not", "been", "for", "your", "help", "I", "could", "not", "have", "succeeded"] }
  ]
};

worksheetDefinitions["memorization-96-order"] = {
  label: "暗記用例文96｜整序英作文",
  title: "暗記用例文96　整序英作文",
  instruction: "日本語に合うように語句を並べ替えなさい。解答の英文は原典の暗記用例文を一字一句変更していません。",
  answerNote: "原典『暗記用例文一覧』の英文をそのまま使用しています。語順を復元し、完成した英文を音読して定着させましょう。",
  type: "english-order",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "比較的短く、語順の骨格をつかみやすい原文12例を扱います。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "不定詞・知覚・補語・慣用構文を含む原文12例を扱います。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "比較・倒置・助動詞完了など、構造判断が必要な原文12例を扱います。" }
  }
};

const memorizationOption = document.createElement("option");
memorizationOption.value = "memorization-96-order";
memorizationOption.textContent = "暗記用例文96｜整序英作文";
const makeAnchor = worksheetTypeSelect.querySelector('option[value="make-adjective-order"]');
if (makeAnchor?.parentElement) {
  makeAnchor.parentElement.insertAdjacentElement("beforebegin", (() => {
    const group = document.createElement("optgroup");
    group.label = "英語｜暗記用例文";
    group.appendChild(memorizationOption);
    return group;
  })());
} else {
  worksheetTypeSelect.appendChild(memorizationOption);
}

const previousBuildQuestionPoolV24 = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV24() {
  if (worksheetTypeSelect.value === "memorization-96-order") {
    return memorization96OrderQuestions[difficultySelect.value];
  }
  return previousBuildQuestionPoolV24();
};

const previousAppendEnglishAnswerV24 = appendEnglishAnswer;
appendEnglishAnswer = function appendEnglishAnswerV24(fragment, question, number, type) {
  if (worksheetTypeSelect.value !== "memorization-96-order") {
    return previousAppendEnglishAnswerV24(fragment, question, number, type);
  }
  const item = document.createElement("div");
  item.className = "english-answer-item";
  const answer = document.createElement("p");
  answer.innerHTML = `<b>${number}. ${question.answer}</b>`;
  const structure = document.createElement("p");
  structure.className = "answer-explanation";
  structure.textContent = "原典例文どおり";
  item.append(answer, structure);
  fragment.appendChild(item);
};

if (typeof syncDifficultyOptions === "function") syncDifficultyOptions();
updateControls();
