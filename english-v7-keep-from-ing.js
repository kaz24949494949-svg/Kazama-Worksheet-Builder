"use strict";

// Version 7: finalized keep + person + from + V-ing ordering worksheets.
const keepFromIngQuestions = {
  basic: [
    { ja: "その雨のため、私たちは外で遊べませんでした。", answer: "The rain kept us from playing outside.", words: ["from playing outside", "kept", "the rain", "us"] },
    { ja: "その大きな音のため、私は眠れませんでした。", answer: "The loud noise kept me from sleeping.", words: ["from sleeping", "kept", "me", "the loud noise"] },
    { ja: "けがのため、彼は試合に出られませんでした。", answer: "His injury kept him from playing in the game.", words: ["from playing in the game", "his injury", "him", "kept"] },
    { ja: "母は私が夜遅く外出するのを止めました。", answer: "My mother kept me from going out late.", words: ["from going out late", "kept", "me", "my mother"] },
    { ja: "その雪のため、私たちは学校へ行けませんでした。", answer: "The snow kept us from going to school.", words: ["from going to school", "kept", "the snow", "us"] },
    { ja: "その病気のため、彼女は旅行できませんでした。", answer: "Her illness kept her from traveling.", words: ["from traveling", "her illness", "her", "kept"] },
    { ja: "父は弟がその危険な場所へ行くのを止めました。", answer: "My father kept my brother from going to the dangerous place.", words: ["from going to the dangerous place", "kept", "my brother", "my father"] },
    { ja: "その交通渋滞のため、私たちは時間どおりに着けませんでした。", answer: "The traffic jam kept us from arriving on time.", words: ["from arriving on time", "kept", "the traffic jam", "us"] },
    { ja: "その心配事のため、彼は仕事に集中できませんでした。", answer: "The worry kept him from concentrating on his work.", words: ["from concentrating on his work", "him", "kept", "the worry"] },
    { ja: "先生は生徒たちが授業中に話すのを止めました。", answer: "The teacher kept the students from talking during the lesson.", words: ["from talking during the lesson", "kept", "the students", "the teacher"] },
    { ja: "その強い風のため、私たちは前へ進めませんでした。", answer: "The strong wind kept us from moving forward.", words: ["from moving forward", "kept", "the strong wind", "us"] },
    { ja: "その知らせのため、彼女は勉強に集中できませんでした。", answer: "The news kept her from focusing on her studies.", words: ["from focusing on her studies", "her", "kept", "the news"] }
  ],
  standard: [
    { ja: "激しい雨のため、私たちは予定どおり出発できませんでした。", answer: "The heavy rain kept us from leaving on schedule.", words: ["from leaving", "the heavy rain", "us", "on schedule", "kept"] },
    { ja: "そのけがのため、彼は大会に出場できませんでした。", answer: "His injury kept him from taking part in the tournament.", words: ["kept", "from taking part", "his injury", "him", "in the tournament"] },
    { ja: "母は私が夜遅くまでテレビを見るのをやめさせました。", answer: "My mother kept me from watching TV until late at night.", words: ["from watching TV", "my mother", "kept", "until late at night", "me"] },
    { ja: "この規則は、生徒たちが授業中にスマートフォンを使うのを防いでいます。", answer: "This rule keeps the students from using their smartphones during class.", words: ["the students", "this rule", "from using", "keeps", "their smartphones", "during class"] },
    { ja: "その騒音のため、私は宿題に集中できませんでした。", answer: "The noise kept me from concentrating on my homework.", words: ["from concentrating", "the noise", "kept", "on my homework", "me"] },
    { ja: "悪天候のため、彼らは予定していた試合を行えないかもしれません。", answer: "The bad weather may keep them from holding the game they planned.", words: ["may keep", "the bad weather", "from holding", "them", "the game", "they planned"] },
    { ja: "父は弟が一人で川へ行くのを止めました。", answer: "My father kept my younger brother from going to the river alone.", words: ["my father", "from going", "my younger brother", "kept", "to the river", "alone"] },
    { ja: "その知らせのため、彼女は仕事に集中できませんでした。", answer: "The news kept her from focusing on her work.", words: ["the news", "from focusing", "kept", "on her work", "her"] },
    { ja: "この高い壁は、人々が中へ入るのを防ぐでしょう。", answer: "This high wall will keep people from entering the area.", words: ["will keep", "this high wall", "from entering", "people", "the area"] },
    { ja: "先生の助言のおかげで、私は同じ間違いを繰り返さずにすみました。", answer: "My teacher’s advice kept me from making the same mistake again.", words: ["kept", "my teacher’s advice", "from making", "me", "the same mistake", "again"] },
    { ja: "交通渋滞のため、私たちは会議に時間どおり到着できませんでした。", answer: "The traffic jam kept us from arriving at the meeting on time.", words: ["the traffic jam", "from arriving", "us", "at the meeting", "kept", "on time"] },
    { ja: "その安全装置は、子どもたちが誤ってドアを開けるのを防ぎます。", answer: "The safety device keeps the children from opening the door by mistake.", words: ["from opening", "keeps", "the safety device", "the door", "the children", "by mistake"] }
  ],
  advanced: [
    { ja: "突然の停電のため、私たちは報告書を時間どおりに完成できませんでした。", answer: "The sudden power failure kept us from completing the report on time.", words: ["from completing", "the sudden power failure", "the report", "kept", "us", "on time"] },
    { ja: "彼の強い責任感が、彼にその計画を途中であきらめさせませんでした。", answer: "His strong sense of responsibility kept him from giving up on the plan halfway through.", words: ["his strong sense of responsibility", "from giving up on", "kept", "him", "the plan", "halfway through"] },
    { ja: "道路が凍っていたため、多くの通勤者が予定どおり職場に着けませんでした。", answer: "The icy roads kept many commuters from arriving at work as scheduled.", words: ["the icy roads", "many commuters", "from arriving", "kept", "at work", "as scheduled"] },
    { ja: "この新しい制度は、若者が十分な教育を受けるのを妨げる可能性があります。", answer: "This new system may keep young people from receiving an adequate education.", words: ["may keep", "this new system", "from receiving", "young people", "an adequate education"] },
    { ja: "彼女が慎重に準備していたので、問題が起きても慌てずに済みました。", answer: "Her careful preparation kept her from panicking when a problem arose.", words: ["her careful preparation", "from panicking", "kept", "her", "when a problem arose"] },
    { ja: "その会社はこれまで、従業員が自宅で働くことを認めてきませんでした。", answer: "The company has kept its employees from working at home until now.", words: ["has kept", "the company", "from working", "its employees", "at home", "until now"] },
    { ja: "もし彼が警告を無視していたら、その安全装置でさえ、彼が事故を起こすのを防げなかったかもしれません。", answer: "Even the safety device might not have kept him from causing an accident if he had ignored the warning.", words: ["even the safety device", "might not have kept", "from causing", "him", "an accident", "if he had ignored the warning"] },
    { ja: "予想外の技術的な問題のため、研究チームは実験を続けることができませんでした。", answer: "The unexpected technical problem kept the research team from continuing the experiment.", words: ["the unexpected technical problem", "the research team", "from continuing", "kept", "the experiment"] },
    { ja: "彼女の周囲の人々からの批判でさえ、彼女が自分の意見を述べるのを止めることはできませんでした。", answer: "Even the criticism from those around her could not keep her from expressing her own opinion.", words: ["even the criticism from those around her", "could not keep", "from expressing", "her", "own opinion"] },
    { ja: "その厳しい規則のため、参加者は必要な変更を自由に提案できませんでした。", answer: "The strict rule kept the participants from suggesting the necessary changes freely.", words: ["the strict rule", "from suggesting", "the participants", "kept", "the necessary changes", "freely"] },
    { ja: "長年の経験があったので、彼はプレッシャーの下でも冷静さを失わずに済みました。", answer: "His years of experience kept him from losing his composure under pressure.", words: ["his years of experience", "from losing", "kept", "him", "his composure", "under pressure"] },
    { ja: "その情報がもっと早く共有されていれば、私たちは同じ間違いを繰り返さずに済んだかもしれません。", answer: "That information might have kept us from repeating the same mistake if it had been shared earlier.", words: ["might have kept", "that information", "from repeating", "us", "the same mistake", "if it had been shared earlier"] }
  ],
  hard: [
    { ja: "直前に届いた警告のおかげで、私たちは危険な区域に入らずに済みました。", answer: "The warning that arrived at the last minute kept us from entering the dangerous area.", words: ["area", "arrived", "at", "dangerous", "entering", "from", "kept", "last", "minute", "the", "the", "the", "that", "us", "warning", "although"], unused: "although" },
    { ja: "彼がどれほど疲れていたとしても、責任感が彼に仕事を途中で投げ出させませんでした。", answer: "However tired he was, his sense of responsibility kept him from abandoning the task halfway through.", words: ["abandoning", "from", "halfway", "he", "him", "his", "however", "kept", "of", "responsibility", "sense", "task", "the", "through", "tired", "was", "unless"], unused: "unless" },
    { ja: "その情報が事前に共有されていれば、何人かの参加者が同じ間違いをするのを防げたかもしれません。", answer: "That information could have kept several participants from making the same mistake if it had been shared in advance.", words: ["advance", "been", "could", "from", "had", "have", "if", "in", "information", "it", "kept", "making", "mistake", "participants", "same", "several", "shared", "that", "the", "despite"], unused: "despite" },
    { ja: "新たに導入された規則は、研究者が必要なデータを自由に利用するのを妨げかねません。", answer: "The newly introduced regulations may well keep researchers from accessing the necessary data freely.", words: ["accessing", "data", "freely", "from", "introduced", "keep", "may", "necessary", "newly", "regulations", "researchers", "the", "the", "well", "whereas"], unused: "whereas" },
    { ja: "周囲からの激しい批判でさえ、彼女が自分の判断に従って行動するのを止めることはできませんでした。", answer: "Even the severe criticism from those around her could not keep her from acting according to her own judgment.", words: ["according", "acting", "around", "could", "criticism", "even", "from", "from", "her", "her", "judgment", "keep", "not", "own", "severe", "the", "those", "to", "because"], unused: "because" },
    { ja: "もし安全確認が適切に行われていなかったら、その装置でも作業員が重大な事故を起こすのを防げなかったかもしれません。", answer: "Even the device might not have kept the workers from causing a serious accident if the safety checks had not been carried out properly.", words: ["a", "accident", "been", "carried", "causing", "checks", "device", "even", "from", "had", "have", "if", "kept", "might", "not", "not", "out", "properly", "safety", "serious", "the", "the", "the", "workers", "whenever"], unused: "whenever" },
    { ja: "長年にわたって身につけた経験が、予期せぬ事態に直面しても彼に冷静さを失わせませんでした。", answer: "The experience he had gained over the years kept him from losing his composure when faced with the unexpected situation.", words: ["composure", "experience", "faced", "from", "gained", "had", "he", "him", "his", "kept", "losing", "over", "situation", "the", "the", "the", "unexpected", "when", "with", "years", "whether"], unused: "whether" },
    { ja: "予算がさらに削減されれば、学校は、それを必要とする生徒に十分な支援を提供できなくなるでしょう。", answer: "Further budget cuts will keep the school from providing adequate support for students who need it.", words: ["adequate", "budget", "cuts", "for", "from", "further", "it", "keep", "need", "providing", "school", "students", "support", "the", "who", "will", "whose"], unused: "whose" },
    { ja: "彼が事実を隠そうとしたことも、私たちが何かがおかしいと疑うのを止めることはできませんでした。", answer: "His attempt to hide the facts did not keep us from suspecting that something was wrong.", words: ["attempt", "did", "facts", "from", "hide", "his", "keep", "not", "something", "suspecting", "that", "the", "to", "us", "was", "wrong", "since"], unused: "since" },
    { ja: "計画の徹底的な見直しが実施されていれば、担当者は同じ判断ミスを繰り返さずに済んだかもしれません。", answer: "A thorough review of the plan might have kept the officials in charge from repeating the same error in judgment if it had been carried out.", words: ["a", "been", "carried", "charge", "error", "from", "had", "have", "if", "in", "in", "it", "judgment", "kept", "might", "of", "officials", "out", "plan", "repeating", "review", "same", "the", "the", "the", "thorough", "although"], unused: "although" },
    { ja: "彼女の冷静な態度のおかげで、他のメンバーは感情的に反応せずに済みました。", answer: "Her calm attitude kept the other members from reacting emotionally.", words: ["attitude", "calm", "emotionally", "from", "her", "kept", "members", "other", "reacting", "the", "unless"], unused: "unless" },
    { ja: "たとえ法律が改正されたとしても、それだけでは企業が同じ慣行を続けるのを防ぐには十分でないかもしれません。", answer: "Even if the law is revised, that alone may not be enough to keep companies from continuing the same practice.", words: ["alone", "be", "companies", "continuing", "enough", "even", "from", "if", "is", "keep", "law", "may", "not", "practice", "revised", "same", "that", "the", "the", "to", "despite"], unused: "despite" }
  ]
};

worksheetDefinitions["keep-from-ing-order"] = {
  label: "keep（人＋from＋V-ing・整序英作文）",
  title: "keep＋人＋from＋V-ing　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。",
  answerNote: "語順は「主語＋keep／keeps／kept＋人＋from＋V-ing」です。",
  type: "english-order",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "中学修了程度の語彙。語句単位を中心に基本語順を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "時制・助動詞や少し長い目的語を含む問題です。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "完了形・仮定法・長い語句を含む問題です。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト程度。単語単位に分割し、不要語を1語加えます。" }
  }
};

const keepPresentParticipleOptionV7 = worksheetTypeSelect.querySelector('option[value="keep-present-participle-order"]');
if (keepPresentParticipleOptionV7 && !worksheetTypeSelect.querySelector('option[value="keep-from-ing-order"]')) {
  const option = document.createElement("option");
  option.value = "keep-from-ing-order";
  option.textContent = "keep（人＋from＋V-ing）― 整序英作文";
  keepPresentParticipleOptionV7.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV7KeepPresentParticiple = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV7KeepFromIng() {
  if (worksheetTypeSelect.value === "keep-from-ing-order") {
    return keepFromIngQuestions[difficultySelect.value];
  }
  return buildQuestionPoolV7KeepPresentParticiple();
};

const appendEnglishAnswerV7Previous = appendEnglishAnswer;
appendEnglishAnswer = function appendEnglishAnswerV7(fragment, question, number, type) {
  if (worksheetTypeSelect.value !== "keep-from-ing-order") {
    appendEnglishAnswerV7Previous(fragment, question, number, type);
    return;
  }

  const item = document.createElement("div");
  item.className = "english-answer-item";
  const answer = document.createElement("p");
  answer.innerHTML = `<b>${number}. ${question.answer}</b>`;
  const structure = document.createElement("p");
  structure.className = "answer-explanation";
  structure.textContent = `主語＋keep／keeps／kept＋人＋from＋V-ing${question.unused ? `（不要語：${question.unused}）` : ""}`;
  item.append(answer, structure);
  fragment.appendChild(item);
};

syncDifficultyOptions();
updateControls();