"use strict";

const worksheetTypeSelect = document.getElementById("worksheetType");
const difficultySelect = document.getElementById("difficulty");
const countSelect = document.getElementById("count");
const createButton = document.getElementById("createButton");
const printButton = document.getElementById("printButton");
const questionsElement = document.getElementById("questions");
const answersElement = document.getElementById("answers");
const statusMessage = document.getElementById("statusMessage");
const countGuide = document.getElementById("countGuide");
const difficultyTitle = document.getElementById("difficultyTitle");
const difficultyDescription = document.getElementById("difficultyDescription");
const worksheetDifficulty = document.getElementById("worksheetDifficulty");
const worksheetCount = document.getElementById("worksheetCount");
const problemTitle = document.getElementById("problemTitle");
const instruction = document.getElementById("instruction");
const answerNote = document.getElementById("answerNote");

const makeAdjectiveQuestions = {
  basic: [
    { ja: "その知らせを聞いて、私はうれしくなりました。", answer: "The news made me happy.", words: ["happy", "the news", "me", "made"] },
    { ja: "その物語を読んで、彼女は悲しくなりました。", answer: "The story made her sad.", words: ["her", "the story", "sad", "made"] },
    { ja: "その試合を見て、私たちは興奮しました。", answer: "The game made us excited.", words: ["excited", "the game", "us", "made"] },
    { ja: "その音楽を聞いて、彼は眠くなりました。", answer: "The music made him sleepy.", words: ["him", "sleepy", "the music", "made"] },
    { ja: "その長い散歩で、彼らは疲れました。", answer: "The long walk made them tired.", words: ["tired", "the long walk", "them", "made"] },
    { ja: "この部屋にいると、私は落ち着きます。", answer: "This room makes me calm.", words: ["calm", "this room", "me", "makes"] },
    { ja: "その火で、部屋は暖かくなりました。", answer: "The fire made the room warm.", words: ["warm", "the room", "the fire", "made"] },
    { ja: "その雨で、道はぬれました。", answer: "The rain made the road wet.", words: ["the road", "wet", "the rain", "made"] },
    { ja: "彼の言葉を聞いて、私は腹が立ちました。", answer: "His words made me angry.", words: ["angry", "his words", "me", "made"] },
    { ja: "その冗談を聞いて、みんなは楽しい気持ちになりました。", answer: "The joke made everyone happy.", words: ["everyone", "the joke", "happy", "made"] },
    { ja: "その大きな音を聞いて、赤ちゃんは怖くなりました。", answer: "The loud noise made the baby afraid.", words: ["afraid", "the loud noise", "the baby", "made"] },
    { ja: "その音楽によって、赤ちゃんは静かになりました。", answer: "The music made the baby quiet.", words: ["the baby", "quiet", "the music", "made"] }
  ],
  standard: [
    { ja: "その結果を知って、私たちはうれしくなりました。", answer: "The result made us happy.", words: ["us", "the result", "happy", "made"] },
    { ja: "その知らせを聞いて、彼女は不安になりました。", answer: "The news made her nervous.", words: ["nervous", "her", "the news", "made"] },
    { ja: "その経験によって、彼は強くなりました。", answer: "The experience made him strong.", words: ["strong", "the experience", "him", "made"] },
    { ja: "毎日の運動は、私たちを健康にします。", answer: "Daily exercise makes us healthy.", words: ["healthy", "daily exercise", "us", "makes"] },
    { ja: "その新しい規則は、町を安全にしました。", answer: "The new rule made the town safe.", words: ["the town", "safe", "the new rule", "made"] },
    { ja: "彼女の歌声は、その歌を人気のあるものにしました。", answer: "Her voice made the song popular.", words: ["popular", "the song", "her voice", "made"] },
    { ja: "その質問をされて、私は困惑しました。", answer: "The question made me confused.", words: ["me", "confused", "the question", "made"] },
    { ja: "その写真を見て、彼らは懐かしい気持ちになりました。", answer: "The picture made them nostalgic.", words: ["nostalgic", "the picture", "them", "made"] },
    { ja: "その明るい色は、部屋を美しくしました。", answer: "The bright color made the room beautiful.", words: ["beautiful", "the bright color", "the room", "made"] },
    { ja: "彼の親切な言葉を聞いて、私は安心しました。", answer: "His kind words made me relieved.", words: ["relieved", "his kind words", "me", "made"] },
    { ja: "その難しい仕事で、彼女は忙しくなりました。", answer: "The difficult work made her busy.", words: ["her", "busy", "the difficult work", "made"] },
    { ja: "その成功によって、彼らは有名になりました。", answer: "The success made them famous.", words: ["famous", "them", "the success", "made"] }
  ],
  advanced: [
    { ja: "その経験によって、彼は以前より自信を持つようになりました。", answer: "The experience made him more confident.", words: ["more confident", "the experience", "him", "made"] },
    { ja: "新しい技術によって、私たちの生活はより快適になりました。", answer: "The new technology made our lives more comfortable.", words: ["our lives", "more comfortable", "the new technology", "made"] },
    { ja: "先生の助言によって、その問題はより簡単になりました。", answer: "The teacher's advice made the problem easier.", words: ["easier", "the teacher's advice", "the problem", "made"] },
    { ja: "家族の支えによって、彼女はより強くなりました。", answer: "Her family's support made her stronger.", words: ["her", "stronger", "her family's support", "made"] },
    { ja: "その事故によって、道路は危険になりました。", answer: "The accident made the road dangerous.", words: ["dangerous", "the accident", "the road", "made"] },
    { ja: "その発見によって、この町は世界的に有名になりました。", answer: "The discovery made the town world-famous.", words: ["the town", "world-famous", "the discovery", "made"] },
    { ja: "その変化によって、私たちの計画は実行可能になりました。", answer: "The change made our plan possible.", words: ["possible", "our plan", "the change", "made"] },
    { ja: "その長い議論によって、状況はさらに複雑になりました。", answer: "The long discussion made the situation more complicated.", words: ["the situation", "more complicated", "the long discussion", "made"] },
    { ja: "彼の説明によって、その考えはより明確になりました。", answer: "His explanation made the idea clearer.", words: ["clearer", "his explanation", "the idea", "made"] },
    { ja: "その成功によって、チーム全体がより積極的になりました。", answer: "The success made the whole team more active.", words: ["more active", "the whole team", "the success", "made"] },
    { ja: "環境の変化によって、多くの動物が弱くなりました。", answer: "The environmental change made many animals weaker.", words: ["many animals", "weaker", "the environmental change", "made"] },
    { ja: "彼女の落ち着いた態度によって、私たちは安心しました。", answer: "Her calm attitude made us comfortable.", words: ["comfortable", "her calm attitude", "us", "made"] }
  ]
};

const makeAdjectiveRewriteQuestions = {
  basic: [
    { source: "I was happy because of the news.", prompt: "The news（　　　）（　　　）（　　　）.", blanks: "made / me / happy", answer: "The news made me happy." },
    { source: "She was sad because of the story.", prompt: "The story（　　　）（　　　）（　　　）.", blanks: "made / her / sad", answer: "The story made her sad." },
    { source: "He was sleepy because of the music.", prompt: "The music（　　　）（　　　）（　　　）.", blanks: "made / him / sleepy", answer: "The music made him sleepy." },
    { source: "They were tired because of the long walk.", prompt: "The long walk（　　　）（　　　）（　　　）.", blanks: "made / them / tired", answer: "The long walk made them tired." },
    { source: "I was angry because of his words.", prompt: "His words（　　　）（　　　）（　　　）.", blanks: "made / me / angry", answer: "His words made me angry." },
    { source: "We were excited because of the game.", prompt: "The game（　　　）（　　　）（　　　）.", blanks: "made / us / excited", answer: "The game made us excited." },
    { source: "The room was warm because of the fire.", prompt: "The fire（　　　）（　　　）（　　　）.", blanks: "made / the room / warm", answer: "The fire made the room warm." },
    { source: "The road was wet because of the rain.", prompt: "The rain（　　　）（　　　）（　　　）.", blanks: "made / the road / wet", answer: "The rain made the road wet." },
    { source: "The baby was afraid because of the loud noise.", prompt: "The loud noise（　　　）（　　　）（　　　）.", blanks: "made / the baby / afraid", answer: "The loud noise made the baby afraid." },
    { source: "Everyone was happy because of the joke.", prompt: "The joke（　　　）（　　　）（　　　）.", blanks: "made / everyone / happy", answer: "The joke made everyone happy." },
    { source: "I was calm because of the music.", prompt: "The music（　　　）（　　　）（　　　）.", blanks: "made / me / calm", answer: "The music made me calm." },
    { source: "The classroom was clean because of their work.", prompt: "Their work（　　　）（　　　）（　　　）.", blanks: "made / the classroom / clean", answer: "Their work made the classroom clean." }
  ],
  standard: [
    { source: "He became strong because of the experience.", prompt: "The experience（　　　）（　　　）（　　　）.", blanks: "made / him / strong", answer: "The experience made him strong." },
    { source: "She became nervous because of the news.", prompt: "The news（　　　）（　　　）（　　　）.", blanks: "made / her / nervous", answer: "The news made her nervous." },
    { source: "We stayed healthy because of the daily exercise.", prompt: "The daily exercise（　　　）（　　　）（　　　）.", blanks: "made / us / healthy", answer: "The daily exercise made us healthy." },
    { source: "The town became safe because of the new rule.", prompt: "The new rule（　　　）（　　　）（　　　）.", blanks: "made / the town / safe", answer: "The new rule made the town safe." },
    { source: "The song became popular because of her beautiful voice.", prompt: "Her beautiful voice（　　　）（　　　）（　　　）.", blanks: "made / the song / popular", answer: "Her beautiful voice made the song popular." },
    { source: "I became confused because of the difficult question.", prompt: "The difficult question（　　　）（　　　）（　　　）.", blanks: "made / me / confused", answer: "The difficult question made me confused." },
    { source: "They became excited because of the good result.", prompt: "The good result（　　　）（　　　）（　　　）.", blanks: "made / them / excited", answer: "The good result made them excited." },
    { source: "The room became beautiful because of the bright colors.", prompt: "The bright colors（　　　）（　　　）（　　　）.", blanks: "made / the room / beautiful", answer: "The bright colors made the room beautiful." },
    { source: "She became busy because of the new work.", prompt: "The new work（　　　）（　　　）（　　　）.", blanks: "made / her / busy", answer: "The new work made her busy." },
    { source: "He became famous because of the great success.", prompt: "The great success（　　　）（　　　）（　　　）.", blanks: "made / him / famous", answer: "The great success made him famous." },
    { source: "I became relaxed because of her kind words.", prompt: "Her kind words（　　　）（　　　）（　　　）.", blanks: "made / me / relaxed", answer: "Her kind words made me relaxed." },
    { source: "The children became active because of the outdoor activities.", prompt: "The outdoor activities（　　　）（　　　）（　　　）.", blanks: "made / the children / active", answer: "The outdoor activities made the children active." }
  ],
  advanced: [
    { source: "He became more confident because of the experience.", prompt: "The experience（　　　）（　　　）（　　　）.", blanks: "made / him / more confident", answer: "The experience made him more confident." },
    { source: "Our lives became more comfortable because of the new technology.", prompt: "The new technology（　　　）（　　　）（　　　）.", blanks: "made / our lives / more comfortable", answer: "The new technology made our lives more comfortable." },
    { source: "The problem became easier because of the teacher's advice.", prompt: "The teacher's advice（　　　）（　　　）（　　　）.", blanks: "made / the problem / easier", answer: "The teacher's advice made the problem easier." },
    { source: "She became stronger because of her family's support.", prompt: "Her family's support（　　　）（　　　）（　　　）.", blanks: "made / her / stronger", answer: "Her family's support made her stronger." },
    { source: "The road became dangerous because of the accident.", prompt: "The accident（　　　）（　　　）（　　　）.", blanks: "made / the road / dangerous", answer: "The accident made the road dangerous." },
    { source: "The town became world-famous because of the discovery.", prompt: "The discovery（　　　）（　　　）（　　　）.", blanks: "made / the town / world-famous", answer: "The discovery made the town world-famous." },
    { source: "Our plan became possible because of the change.", prompt: "The change（　　　）（　　　）（　　　）.", blanks: "made / our plan / possible", answer: "The change made our plan possible." },
    { source: "The situation became more complicated because of the long discussion.", prompt: "The long discussion（　　　）（　　　）（　　　）.", blanks: "made / the situation / more complicated", answer: "The long discussion made the situation more complicated." },
    { source: "The idea became clearer because of his explanation.", prompt: "His explanation（　　　）（　　　）（　　　）.", blanks: "made / the idea / clearer", answer: "His explanation made the idea clearer." },
    { source: "The whole team became more active because of the success.", prompt: "The success（　　　）（　　　）（　　　）.", blanks: "made / the whole team / more active", answer: "The success made the whole team more active." },
    { source: "Many animals became weaker because of the environmental change.", prompt: "The environmental change（　　　）（　　　）（　　　）.", blanks: "made / many animals / weaker", answer: "The environmental change made many animals weaker." },
    { source: "We felt more comfortable because of her calm attitude.", prompt: "Her calm attitude（　　　）（　　　）（　　　）.", blanks: "made / us / more comfortable", answer: "Her calm attitude made us more comfortable." }
  ]
};

const worksheetDefinitions = {
  "make-adjective-order": {
    label: "物主構文 make（整序英作文）", title: "物主構文 make　整序英作文",
    instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。",
    answerNote: "語順は「主語＋make／makes／made＋目的語＋形容詞」です。目的語の後ろには、動詞の原形ではなく形容詞を置きます。", type: "english-order",
    difficulties: {
      basic: { label: "基礎", counts: [5, 10, 12], description: "基本的な主語・目的語・形容詞を使い、語順を定着させます。" },
      standard: { label: "標準", counts: [5, 10, 12], description: "語彙と主語を広げ、現在形と過去形の両方を扱います。" },
      advanced: { label: "発展", counts: [5, 10, 12], description: "抽象的な主語、比較級、長い語句を含む問題を扱います。" }
    }
  },
  "make-adjective-rewrite": {
    label: "物主構文 make（書き換え）", title: "物主構文 make　書き換え",
    instruction: "次の2文がほぼ同じ意味になるように、空欄に適する語を書きなさい。",
    answerNote: "原因を表す語句を主語にし、「made＋目的語＋形容詞」の順に書き換えます。", type: "english-rewrite",
    difficulties: {
      basic: { label: "基礎", counts: [5, 10, 12], description: "be動詞＋形容詞＋because ofの文を、madeを使う文へ書き換えます。" },
      standard: { label: "標準", counts: [5, 10, 12], description: "became・stayedなどを含む文を、madeを使う文へ書き換えます。" },
      advanced: { label: "発展", counts: [5, 10, 12], description: "比較級、抽象的な主語、長い語句を含む文を書き換えます。" }
    }
  },
  "simplify-ratio": {
    label: "比を簡単にする", title: "比を簡単にする問題", instruction: "次の比を、最も簡単な整数の比にしましょう。", answerNote: "2つの数を最大公約数で割ると、最も簡単な整数比になります。", type: "math",
    difficulties: {
      basic: { label: "基礎", divisors: [2], answerMin: 5, answerMax: 9, counts: [5, 10, 15], description: "2を最大公約数とする、両方とも2桁の問題を作成します。" },
      standard: { label: "標準", divisors: [2, 3, 5], answerMin: 5, answerMax: 12, counts: [5, 10, 15, 20], description: "2・3・5を最大公約数とする問題を作成します。" },
      advanced: { label: "発展", divisors: [4, 6, 8, 9, 10, 12], answerMin: 5, answerMax: 20, counts: [5, 10, 15, 20], description: "より大きな最大公約数を使う問題を作成します。" }
    }
  },
  "ratio-value": {
    label: "比の値", title: "比の値を求める問題", instruction: "次の比の値を、最も簡単な分数で表しましょう。", answerNote: "比 a：b の値は a÷b、つまり a/b です。分数は約分して表します。", type: "math",
    difficulties: {
      basic: { label: "基礎", multipliers: [2, 3, 5], numeratorMin: 1, numeratorMax: 8, denominatorMin: 2, denominatorMax: 12, properOnly: true, counts: [5, 10, 15], description: "答えが1より小さい分数になる問題を作成します。" },
      standard: { label: "標準", multipliers: [2, 3, 4, 5], numeratorMin: 2, numeratorMax: 15, denominatorMin: 2, denominatorMax: 15, properOnly: false, counts: [5, 10, 15, 20], description: "真分数と仮分数の両方を含む問題を作成します。" },
      advanced: { label: "発展", multipliers: [4, 6, 8, 9, 10, 12], numeratorMin: 3, numeratorMax: 20, denominatorMin: 2, denominatorMax: 20, properOnly: false, counts: [5, 10, 15, 20], description: "大きな数の比を、最も簡単な分数に直す問題を作成します。" }
    }
  },
  "equivalent-ratio": {
    label: "等しい比", title: "等しい比の空欄を求める問題", instruction: "2つの比が等しくなるように、□にあてはまる数を書きましょう。", answerNote: "比の両方の数に同じ数をかけたり、同じ数で割ったりすると、等しい比になります。", type: "math",
    difficulties: {
      basic: { label: "基礎", baseMin: 2, baseMax: 9, factors: [2, 3, 4, 5], missingPositions: [3], counts: [5, 10, 15], description: "右端の数を求める、かけ算中心の問題を作成します。" },
      standard: { label: "標準", baseMin: 2, baseMax: 12, factors: [2, 3, 4, 5, 6], missingPositions: [2, 3], counts: [5, 10, 15, 20], description: "後ろの比のどちらか一方を求める問題を作成します。" },
      advanced: { label: "発展", baseMin: 3, baseMax: 15, factors: [3, 4, 5, 6, 8, 10], missingPositions: [0, 1, 2, 3], counts: [5, 10, 15, 20], description: "前後どの位置にも空欄が入る問題を作成します。" }
    }
  }
};

function gcd(a, b) { let x = Math.abs(a); let y = Math.abs(b); while (y !== 0) { [x, y] = [y, x % y]; } return x; }
function shuffle(array) { const copy = [...array]; for (let i = copy.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
function getCurrentDefinition() { return worksheetDefinitions[worksheetTypeSelect.value]; }
function getCurrentSettings() { return getCurrentDefinition().difficulties[difficultySelect.value]; }

function buildSimplifyRatioPool(settings) {
  const pool = [];
  for (let left = settings.answerMin; left <= settings.answerMax; left += 1) for (let right = settings.answerMin; right <= settings.answerMax; right += 1) {
    if (left === right || gcd(left, right) !== 1) continue;
    settings.divisors.forEach((divisor) => pool.push({ left: left * divisor, right: right * divisor, simplifiedLeft: left, simplifiedRight: right, divisor }));
  }
  return pool;
}
function buildRatioValuePool(settings) {
  const pool = [];
  for (let numerator = settings.numeratorMin; numerator <= settings.numeratorMax; numerator += 1) for (let denominator = settings.denominatorMin; denominator <= settings.denominatorMax; denominator += 1) {
    if (numerator === denominator || gcd(numerator, denominator) !== 1 || (settings.properOnly && numerator >= denominator)) continue;
    settings.multipliers.forEach((multiplier) => pool.push({ left: numerator * multiplier, right: denominator * multiplier, numerator, denominator, divisor: multiplier }));
  }
  return pool;
}
function buildEquivalentRatioPool(settings) {
  const pool = [];
  for (let left = settings.baseMin; left <= settings.baseMax; left += 1) for (let right = settings.baseMin; right <= settings.baseMax; right += 1) {
    if (left === right || gcd(left, right) !== 1) continue;
    settings.factors.forEach((factor) => settings.missingPositions.forEach((missingIndex) => {
      const values = [left, right, left * factor, right * factor];
      pool.push({ values, missingIndex, answer: values[missingIndex], factor });
    }));
  }
  return pool;
}
function buildQuestionPool() {
  const type = worksheetTypeSelect.value;
  const settings = getCurrentSettings();
  if (type === "make-adjective-order") return makeAdjectiveQuestions[difficultySelect.value];
  if (type === "make-adjective-rewrite") return makeAdjectiveRewriteQuestions[difficultySelect.value];
  if (type === "ratio-value") return buildRatioValuePool(settings);
  if (type === "equivalent-ratio") return buildEquivalentRatioPool(settings);
  return buildSimplifyRatioPool(settings);
}

function createFraction(numerator, denominator) {
  const fraction = document.createElement("span"); fraction.className = "fraction";
  const top = document.createElement("span"); top.className = "fraction-top"; top.textContent = String(numerator);
  const bottom = document.createElement("span"); bottom.className = "fraction-bottom"; bottom.textContent = String(denominator);
  fraction.append(top, bottom); return fraction;
}
function equivalentRatioText(question, includeAnswer = false) {
  const values = question.values.map((value, index) => index !== question.missingIndex ? String(value) : includeAnswer ? `□（${question.answer}）` : "□");
  return `${values[0]}：${values[1]} ＝ ${values[2]}：${values[3]}`;
}

function updateControls() {
  const definition = getCurrentDefinition(); const settings = getCurrentSettings(); const previousCount = Number(countSelect.value) || 10;
  countSelect.replaceChildren();
  settings.counts.forEach((count) => { const option = document.createElement("option"); option.value = String(count); option.textContent = `${count}問`; option.selected = count === previousCount; countSelect.appendChild(option); });
  if (!settings.counts.includes(previousCount)) countSelect.value = String(settings.counts.includes(10) ? 10 : settings.counts.at(-1));
  problemTitle.textContent = definition.title; instruction.textContent = definition.instruction; answerNote.textContent = definition.answerNote;
  difficultyTitle.textContent = settings.label; difficultyDescription.textContent = settings.description;
  countGuide.textContent = `この設定では最大${settings.counts.at(-1)}問まで作成できます。`;
  questionsElement.textContent = "まだ問題はありません。"; answersElement.textContent = "まだ解答はありません。";
  const isEnglish = definition.type.startsWith("english-");
  questionsElement.classList.toggle("english-questions", isEnglish);
  answersElement.classList.toggle("english-answers", isEnglish);
  worksheetDifficulty.textContent = `難易度：${settings.label}`; worksheetCount.textContent = `問題数：${countSelect.value}問`;
  statusMessage.textContent = `${definition.label}・${settings.label}に切り替えました。`;
}

function appendEnglishOrderQuestion(fragment, question, number) {
  const item = document.createElement("div"); item.className = "english-question";
  const japanese = document.createElement("p"); japanese.className = "question-japanese"; japanese.textContent = `${number}. ${question.ja}`;
  const wordBank = document.createElement("p"); wordBank.className = "question-words"; wordBank.textContent = `（ ${shuffle(question.words).join(" / ")} ）`;
  const answerLine = document.createElement("div"); answerLine.className = "english-answer-line";
  item.append(japanese, wordBank, answerLine); fragment.appendChild(item);
}
function appendEnglishRewriteQuestion(fragment, question, number) {
  const item = document.createElement("div"); item.className = "english-question rewrite-question";
  const source = document.createElement("p"); source.className = "rewrite-source"; source.textContent = `${number}. ${question.source}`;
  const prompt = document.createElement("p"); prompt.className = "rewrite-prompt"; prompt.textContent = question.prompt;
  item.append(source, prompt); fragment.appendChild(item);
}
function appendEnglishAnswer(fragment, question, number, type) {
  const item = document.createElement("div"); item.className = "english-answer-item";
  const answer = document.createElement("p"); answer.innerHTML = `<b>${number}. ${question.answer}</b>`;
  const structure = document.createElement("p"); structure.className = "answer-explanation";
  structure.textContent = type === "english-rewrite" ? `空欄：${question.blanks}` : "主語＋make／makes／made＋目的語＋形容詞";
  item.append(answer, structure); fragment.appendChild(item);
}
function appendMathAnswer(answer, question, number, type) {
  if (type === "equivalent-ratio") {
    const main = document.createElement("b"); main.textContent = `${number}. ${equivalentRatioText(question, true)}`;
    const explanation = document.createElement("span"); explanation.className = "answer-explanation";
    explanation.textContent = question.missingIndex < 2 ? `解説：後ろの比の両方の数を${question.factor}で割ります。` : `解説：前の比の両方の数に${question.factor}をかけます。`;
    answer.append(main, document.createElement("br"), explanation); return;
  }
  if (type === "ratio-value") {
    const line = document.createElement("div"); const prefix = document.createElement("b"); prefix.textContent = `${number}. ${question.left}：${question.right} ＝ `;
    line.append(prefix, createFraction(question.left, question.right), document.createTextNode(" ＝ "), createFraction(question.numerator, question.denominator));
    const explanation = document.createElement("span"); explanation.className = "answer-explanation"; explanation.textContent = `解説：分子と分母を${question.divisor}で割ります。`;
    answer.append(line, explanation); return;
  }
  const main = document.createElement("b"); main.textContent = `${number}. ${question.left}：${question.right} → ${question.simplifiedLeft}：${question.simplifiedRight}`;
  const explanation = document.createElement("span"); explanation.className = "answer-explanation"; explanation.textContent = `解説：2つの数を最大公約数${question.divisor}で割ります。`;
  answer.append(main, document.createElement("br"), explanation);
}

function makeWorksheet() {
  const definition = getCurrentDefinition(); const settings = getCurrentSettings(); const count = Number(countSelect.value); const pool = shuffle(buildQuestionPool());
  if (!Number.isInteger(count) || count <= 0 || pool.length < count) { statusMessage.textContent = "この設定では指定した問題数を作成できません。"; return; }
  const selected = pool.slice(0, count); const questionFragment = document.createDocumentFragment(); const answerFragment = document.createDocumentFragment();
  selected.forEach((question, index) => {
    const number = index + 1;
    if (definition.type === "english-order") {
      appendEnglishOrderQuestion(questionFragment, question, number); appendEnglishAnswer(answerFragment, question, number, definition.type); return;
    }
    if (definition.type === "english-rewrite") {
      appendEnglishRewriteQuestion(questionFragment, question, number); appendEnglishAnswer(answerFragment, question, number, definition.type); return;
    }
    const problem = document.createElement("p"); const answer = document.createElement("p");
    problem.textContent = worksheetTypeSelect.value === "equivalent-ratio" ? `${number}. ${equivalentRatioText(question)}` : `${number}. ${question.left}：${question.right}`;
    appendMathAnswer(answer, question, number, worksheetTypeSelect.value); questionFragment.appendChild(problem); answerFragment.appendChild(answer);
  });
  questionsElement.replaceChildren(questionFragment); answersElement.replaceChildren(answerFragment);
  worksheetDifficulty.textContent = `難易度：${settings.label}`; worksheetCount.textContent = `問題数：${count}問`;
  statusMessage.textContent = `${definition.label}・${settings.label}を${count}問、重複なしで作成しました。`;
  document.querySelector(".problem-page").scrollIntoView({ behavior: "smooth", block: "start" });
}

worksheetTypeSelect.addEventListener("change", updateControls);
difficultySelect.addEventListener("change", updateControls);
createButton.addEventListener("click", makeWorksheet);
printButton.addEventListener("click", () => window.print());
updateControls();