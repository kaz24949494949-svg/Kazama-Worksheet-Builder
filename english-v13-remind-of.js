"use strict";

// Version 13: finalized inanimate-subject remind + object + of ordering worksheets.
const remindOfQuestions = {
  basic: [
    { ja: "この写真を見ると、私は子どものころを思い出します。", answer: "This picture reminds me of my childhood.", words: ["me", "this picture", "of my childhood", "reminds"] },
    { ja: "この歌を聞くと、私は故郷を思い出します。", answer: "This song reminds me of my hometown.", words: ["me", "this song", "of my hometown", "reminds"] },
    { ja: "その古い家を見ると、彼は祖父母を思い出しました。", answer: "The old house reminded him of his grandparents.", words: ["him", "the old house", "of his grandparents", "reminded"] },
    { ja: "その香りをかぐと、私は母の料理を思い出します。", answer: "The scent reminds me of my mother’s cooking.", words: ["me", "the scent", "of my mother’s cooking", "reminds"] },
    { ja: "この町を見ると、彼女はヨーロッパ旅行を思い出します。", answer: "This town reminds her of her trip to Europe.", words: ["her", "this town", "of her trip to Europe", "reminds"] },
    { ja: "その声を聞くと、私は昔の先生を思い出しました。", answer: "The voice reminded me of my old teacher.", words: ["me", "the voice", "of my old teacher", "reminded"] },
    { ja: "この公園を見ると、私たちは学生時代を思い出します。", answer: "This park reminds us of our school days.", words: ["us", "this park", "of our school days", "reminds"] },
    { ja: "その味を感じると、彼は子どものころの夏を思い出しました。", answer: "The taste reminded him of his childhood summers.", words: ["him", "the taste", "of his childhood summers", "reminded"] },
    { ja: "この音を聞くと、私は海を思い出します。", answer: "This sound reminds me of the sea.", words: ["me", "this sound", "of the sea", "reminds"] },
    { ja: "その写真を見ると、彼女は昔の友人を思い出しました。", answer: "The photograph reminded her of an old friend.", words: ["her", "the photograph", "of an old friend", "reminded"] },
    { ja: "この景色を見ると、私たちは北海道への旅行を思い出します。", answer: "This view reminds us of our trip to Hokkaido.", words: ["us", "this view", "of our trip to Hokkaido", "reminds"] },
    { ja: "その古い時計を見ると、彼は父親を思い出しました。", answer: "The old clock reminded him of his father.", words: ["him", "the old clock", "of his father", "reminded"] }
  ],
  standard: [
    { ja: "この写真を見ると、私は中学校時代の友人を思い出します。", answer: "This photograph reminds me of a friend from junior high school.", words: ["me", "this photograph", "of a friend from junior high school", "reminds"] },
    { ja: "その古い建物を見ると、彼は以前そこで働いていたころを思い出しました。", answer: "The old building reminded him of the time when he worked there.", words: ["him", "the old building", "of the time when he worked there", "reminded"] },
    { ja: "この歌を聞くと、私たちは初めてその町を訪れた日のことを思い出します。", answer: "This song reminds us of the day we first visited the town.", words: ["us", "this song", "of the day we first visited the town", "reminds"] },
    { ja: "その香りをかぐと、彼女は祖母の家で過ごした夏を思い出しました。", answer: "The scent reminded her of the summers she spent at her grandmother’s house.", words: ["her", "the scent", "of the summers she spent at her grandmother’s house", "reminded"] },
    { ja: "この景色を見ると、私は以前住んでいた小さな村を思い出します。", answer: "This view reminds me of the small village where I used to live.", words: ["me", "this view", "of the small village where I used to live", "reminds"] },
    { ja: "その声を聞くと、彼は高校時代の英語の先生を思い出しました。", answer: "The voice reminded him of his high school English teacher.", words: ["him", "the voice", "of his high school English teacher", "reminded"] },
    { ja: "この料理の味を感じると、私たちは子どものころに家族で囲んだ夕食を思い出します。", answer: "The taste of this dish reminds us of the family dinners we had when we were children.", words: ["us", "the taste of this dish", "of the family dinners we had when we were children", "reminds"] },
    { ja: "その古い写真を見ると、彼女は海外で過ごした学生時代を思い出しました。", answer: "The old photograph reminded her of her student days abroad.", words: ["her", "the old photograph", "of her student days abroad", "reminded"] },
    { ja: "この音を聞くと、私は夏休みに訪れた海辺を思い出します。", answer: "This sound reminds me of the beach I visited during summer vacation.", words: ["me", "this sound", "of the beach I visited during summer vacation", "reminds"] },
    { ja: "その町の雰囲気に、彼は若いころ暮らしていた場所を思い出しました。", answer: "The atmosphere of the town reminded him of the place where he lived when he was young.", words: ["him", "the atmosphere of the town", "of the place where he lived when he was young", "reminded"] },
    { ja: "この古い手紙を見ると、彼女は長い間会っていない友人を思い出します。", answer: "This old letter reminds her of a friend she has not seen for a long time.", words: ["her", "this old letter", "of a friend she has not seen for a long time", "reminds"] },
    { ja: "その静かな音楽を聞くと、私は家族と過ごした穏やかな夜を思い出しました。", answer: "The quiet music reminded me of the peaceful evenings I spent with my family.", words: ["me", "the quiet music", "of the peaceful evenings I spent with my family", "reminded"] }
  ],
  advanced: [
    { ja: "この古い写真を見ると、私は家族と初めて海外旅行をしたときのことを思い出します。", answer: "This old photograph reminds me of the time when I first traveled abroad with my family.", words: ["me", "this old photograph", "of the time when I first traveled abroad with my family", "reminds"] },
    { ja: "その香りをかぐと、彼女は毎年祖母の家で過ごした夏休みを思い出しました。", answer: "The scent reminded her of the summer vacations she spent every year at her grandmother’s house.", words: ["her", "the scent", "of the summer vacations she spent every year at her grandmother’s house", "reminded"] },
    { ja: "この景色を見ると、私たちは何年も前に訪れた山あいの村を思い出します。", answer: "This view reminds us of the mountain village we visited many years ago.", words: ["us", "this view", "of the mountain village we visited many years ago", "reminds"] },
    { ja: "その古いメロディーを聞くと、彼は学生時代によく通った小さな喫茶店を思い出しました。", answer: "The old melody reminded him of the small café he used to visit during his student days.", words: ["him", "the old melody", "of the small café he used to visit during his student days", "reminded"] },
    { ja: "このにおいをかぐと、私は子どものころ父と歩いた海辺を思い出します。", answer: "This smell reminds me of the beach where I walked with my father as a child.", words: ["me", "this smell", "of the beach where I walked with my father as a child", "reminds"] },
    { ja: "その静かな町並みを見ると、彼女はかつて留学していたヨーロッパの町を思い出しました。", answer: "The quiet streets reminded her of the European town where she once studied abroad.", words: ["her", "the quiet streets", "of the European town where she once studied abroad", "reminded"] },
    { ja: "この古い手紙を見ると、私は長い間連絡を取っていない友人と過ごした学生時代を思い出します。", answer: "This old letter reminds me of the school days I spent with a friend I have not been in touch with for years.", words: ["me", "this old letter", "of the school days I spent with a friend I have not been in touch with for years", "reminds"] },
    { ja: "その料理の味を感じると、彼は家族全員がまだ一緒に暮らしていたころの夕食を思い出しました。", answer: "The taste of the dish reminded him of the dinners the family had when they all still lived together.", words: ["him", "the taste of the dish", "of the dinners the family had when they all still lived together", "reminded"] },
    { ja: "この建物を見ると、私たちはこの町が今よりずっと小さかったころを思い出します。", answer: "This building reminds us of the time when the town was much smaller than it is now.", words: ["us", "this building", "of the time when the town was much smaller than it is now", "reminds"] },
    { ja: "その古い駅を見ると、彼女は毎朝そこから通勤していた日々を思い出しました。", answer: "The old station reminded her of the days when she used to commute from there every morning.", words: ["her", "the old station", "of the days when she used to commute from there every morning", "reminded"] },
    { ja: "この写真を見ると、私はその計画がまだ単なるアイデアにすぎなかったころを思い出します。", answer: "This photograph reminds me of the time when the project was still only an idea.", words: ["me", "this photograph", "of the time when the project was still only an idea", "reminds"] },
    { ja: "その独特の香りをかぐと、彼は子どものころ家族と海外で訪れた市場を思い出しました。", answer: "The distinctive scent reminded him of the market he visited abroad with his family as a child.", words: ["him", "the distinctive scent", "of the market he visited abroad with his family as a child", "reminded"] }
  ],
  hard: [
    { ja: "この古い写真を見ると、私は家族と初めて海外旅行をしたころを思い出します。", answer: "This old photograph reminds me of when I first traveled abroad with my family.", words: ["abroad", "family", "first", "I", "me", "my", "of", "old", "photograph", "reminds", "this", "traveled", "when", "with", "although"], unused: "although" },
    { ja: "その香りをかぐと、彼女は毎年夏に祖母の家で過ごした日々を思い出しました。", answer: "The scent reminded her of the days she spent at her grandmother’s house every summer.", words: ["at", "days", "every", "grandmother’s", "her", "her", "house", "of", "reminded", "scent", "she", "spent", "summer", "the", "the", "although"], unused: "although" },
    { ja: "この景色を見ると、私たちは何年も前に訪れた山あいの小さな村を思い出します。", answer: "This view reminds us of the small mountain village we visited many years ago.", words: ["ago", "many", "mountain", "of", "reminds", "small", "the", "us", "village", "visited", "we", "years", "this", "view", "whereas"], unused: "whereas" },
    { ja: "その古いメロディーを聞くと、彼は学生時代によく通った小さな喫茶店を思い出しました。", answer: "The old melody reminded him of the small café he used to visit during his student days.", words: ["café", "during", "he", "him", "his", "melody", "of", "old", "reminded", "small", "student", "the", "the", "to", "used", "visit", "days", "unless"], unused: "unless" },
    { ja: "この香りをかぐと、私は子どものころ父とよく歩いた海辺を思い出します。", answer: "This scent reminds me of the beach where I often walked with my father as a child.", words: ["a", "as", "beach", "child", "father", "I", "me", "my", "of", "often", "reminds", "scent", "the", "this", "walked", "where", "with", "although"], unused: "although" },
    { ja: "その静かな町並みを見ると、彼女はかつて留学していたヨーロッパの町を思い出しました。", answer: "The quiet streets reminded her of the European town where she once studied abroad.", words: ["abroad", "European", "her", "of", "once", "quiet", "reminded", "she", "streets", "studied", "the", "the", "town", "where", "although"], unused: "although" },
    { ja: "この古い手紙を見ると、私は長い間連絡を取っていない友人と過ごした学生時代を思い出します。", answer: "This old letter reminds me of the school days I spent with a friend whom I have not been in touch with for years.", words: ["a", "been", "days", "for", "friend", "have", "I", "I", "in", "letter", "me", "not", "of", "old", "reminds", "school", "spent", "the", "this", "touch", "with", "with", "years", "whom", "although"], unused: "although" },
    { ja: "その料理の味を感じると、彼は家族全員がまだ一緒に暮らしていたころの夕食を思い出しました。", answer: "The taste of the dish reminded him of the dinners the whole family had when they all still lived together.", words: ["all", "dinners", "dish", "family", "had", "him", "lived", "of", "of", "reminded", "still", "taste", "the", "the", "the", "the", "they", "together", "when", "whole", "whereas"], unused: "whereas" },
    { ja: "この建物を見ると、私たちはこの町が今よりずっと小さかったころを思い出します。", answer: "This building reminds us of the time when the town was much smaller than it is now.", words: ["building", "is", "it", "much", "now", "of", "reminds", "smaller", "the", "the", "this", "time", "town", "us", "was", "when", "than", "although"], unused: "although" },
    { ja: "その古い駅を見ると、彼女は毎朝そこから通勤していた日々を思い出しました。", answer: "The old station reminded her of the days when she used to commute from there every morning.", words: ["commute", "days", "every", "from", "her", "morning", "of", "old", "reminded", "she", "station", "the", "the", "there", "to", "used", "when", "whereas"], unused: "whereas" },
    { ja: "この写真を見ると、私はその計画がまだ単なるアイデアにすぎなかったころを思い出します。", answer: "This photograph reminds me of the time when the project was still only an idea.", words: ["an", "idea", "me", "of", "only", "photograph", "project", "reminds", "still", "the", "the", "this", "time", "was", "when", "although"], unused: "although" },
    { ja: "その独特の香りをかぐと、彼は子どものころ家族と海外で訪れた市場を思い出しました。", answer: "The distinctive scent reminded him of the market he visited abroad with his family as a child.", words: ["a", "abroad", "as", "child", "distinctive", "family", "he", "him", "his", "market", "of", "reminded", "scent", "the", "the", "visited", "with", "although"], unused: "although" }
  ]
};

worksheetDefinitions["remind-of-order"] = {
  label: "物主構文 remind（目的語＋of・整序英作文）",
  title: "物主構文 remind＋目的語＋of ...　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。",
  answerNote: "語順は「物主語＋remind／reminds／reminded＋目的語＋of ...」です。",
  type: "english-order",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "写真・音・香りなどが人に記憶を思い出させる remind＋目的語＋of の基本です。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "of の後ろに修飾語や関係節を含む表現を扱います。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "長い関係節や時を表す節を含む remind＋目的語＋of を扱います。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "単語単位に分割し、不要語を1語加えます。" }
  }
};

const forceToOptionV13 = worksheetTypeSelect.querySelector('option[value="force-to-order"]');
if (forceToOptionV13 && !worksheetTypeSelect.querySelector('option[value="remind-of-order"]')) {
  const option = document.createElement("option");
  option.value = "remind-of-order";
  option.textContent = "物主構文 remind（目的語＋of ...）― 整序英作文";
  forceToOptionV13.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV13Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV13RemindOf() {
  if (worksheetTypeSelect.value === "remind-of-order") return remindOfQuestions[difficultySelect.value];
  return buildQuestionPoolV13Previous();
};

const appendEnglishAnswerV13Previous = appendEnglishAnswer;
appendEnglishAnswer = function appendEnglishAnswerV13(fragment, question, number, type) {
  if (worksheetTypeSelect.value !== "remind-of-order") {
    appendEnglishAnswerV13Previous(fragment, question, number, type);
    return;
  }
  const item = document.createElement("div");
  item.className = "english-answer-item";
  const answer = document.createElement("p");
  answer.innerHTML = `<b>${number}. ${question.answer}</b>`;
  const structure = document.createElement("p");
  structure.className = "answer-explanation";
  structure.textContent = `物主語＋remind／reminds／reminded＋目的語＋of ...${question.unused ? `（不要語：${question.unused}）` : ""}`;
  item.append(answer, structure);
  fragment.appendChild(item);
};

syncDifficultyOptions();
updateControls();