"use strict";

// Version 8: finalized prevent + person + from + V-ing ordering worksheets.
const preventFromIngQuestions = {
  basic: [
    { ja: "雨のため、私たちは外で遊べませんでした。", answer: "The rain prevented us from playing outside.", words: ["from playing outside", "prevented", "the rain", "us"] },
    { ja: "その大きな音のため、私は眠れませんでした。", answer: "The loud noise prevented me from sleeping.", words: ["me", "prevented", "from sleeping", "the loud noise"] },
    { ja: "けがのため、彼は試合に出られませんでした。", answer: "His injury prevented him from playing in the game.", words: ["prevented", "his injury", "from playing in the game", "him"] },
    { ja: "母は私が夜遅く外出するのを止めました。", answer: "My mother prevented me from going out late.", words: ["my mother", "prevented", "me", "from going out late"] },
    { ja: "その雪のため、私たちは学校へ行けませんでした。", answer: "The snow prevented us from going to school.", words: ["prevented", "the snow", "us", "from going to school"] },
    { ja: "その病気のため、彼女は旅行できませんでした。", answer: "Her illness prevented her from traveling.", words: ["her illness", "prevented", "her", "from traveling"] },
    { ja: "父は弟がその危険な場所へ行くのを止めました。", answer: "My father prevented my brother from going to the dangerous place.", words: ["my brother", "from going to the dangerous place", "prevented", "my father"] },
    { ja: "交通渋滞のため、私たちは時間どおりに着けませんでした。", answer: "The traffic jam prevented us from arriving on time.", words: ["the traffic jam", "prevented", "us", "from arriving on time"] },
    { ja: "その心配事のため、彼は仕事に集中できませんでした。", answer: "His worries prevented him from concentrating on his work.", words: ["him", "his worries", "prevented", "from concentrating on his work"] },
    { ja: "先生は生徒たちが授業中に話すのを止めました。", answer: "The teacher prevented the students from talking during the lesson.", words: ["the students", "prevented", "the teacher", "from talking during the lesson"] },
    { ja: "その強い風のため、私たちは前へ進めませんでした。", answer: "The strong wind prevented us from moving forward.", words: ["from moving forward", "the strong wind", "us", "prevented"] },
    { ja: "その知らせのため、彼女は勉強に集中できませんでした。", answer: "The news prevented her from focusing on her studies.", words: ["prevented", "the news", "her", "from focusing on her studies"] }
  ],
  standard: [
    { ja: "激しい雨のため、私たちは予定どおり出発できませんでした。", answer: "The heavy rain prevented us from leaving on schedule.", words: ["the heavy rain", "us", "prevented", "from leaving", "on schedule"] },
    { ja: "そのけがのため、彼は大会に出場できませんでした。", answer: "His injury prevented him from taking part in the tournament.", words: ["his injury", "him", "prevented", "from taking part", "in the tournament"] },
    { ja: "母は私が夜遅くまでテレビを見るのを止めました。", answer: "My mother prevented me from watching TV until late at night.", words: ["my mother", "me", "prevented", "from watching TV", "until late at night"] },
    { ja: "この規則は、生徒たちが授業中にスマートフォンを使うのを防いでいます。", answer: "This rule prevents the students from using their smartphones during class.", words: ["this rule", "the students", "prevents", "from using", "their smartphones", "during class"] },
    { ja: "その騒音のため、私は宿題に集中できませんでした。", answer: "The noise prevented me from concentrating on my homework.", words: ["the noise", "me", "prevented", "from concentrating", "on my homework"] },
    { ja: "悪天候のため、彼らは予定していた試合を行えないかもしれません。", answer: "The bad weather may prevent them from holding the game they planned.", words: ["the bad weather", "may prevent", "them", "from holding", "the game", "they planned"] },
    { ja: "父は弟が一人で川へ行くのを止めました。", answer: "My father prevented my younger brother from going to the river alone.", words: ["my father", "my younger brother", "prevented", "from going", "to the river", "alone"] },
    { ja: "その知らせのため、彼女は仕事に集中できませんでした。", answer: "The news prevented her from focusing on her work.", words: ["the news", "her", "prevented", "from focusing", "on her work"] },
    { ja: "この高い壁は、人々がその区域に入るのを防ぐでしょう。", answer: "This high wall will prevent people from entering the area.", words: ["this high wall", "people", "will prevent", "from entering", "the area"] },
    { ja: "先生の助言のおかげで、私は同じ間違いを繰り返さずに済みました。", answer: "My teacher’s advice prevented me from making the same mistake again.", words: ["my teacher’s advice", "me", "prevented", "from making", "the same mistake", "again"] },
    { ja: "交通渋滞のため、私たちは会議に時間どおり到着できませんでした。", answer: "The traffic jam prevented us from arriving at the meeting on time.", words: ["the traffic jam", "us", "prevented", "from arriving", "at the meeting", "on time"] },
    { ja: "その安全装置は、子どもたちが誤ってドアを開けるのを防ぎます。", answer: "The safety device prevents the children from opening the door by mistake.", words: ["the safety device", "the children", "prevents", "from opening", "the door", "by mistake"] }
  ],
  advanced: [
    { ja: "突然の停電のため、私たちは報告書を時間どおりに完成できませんでした。", answer: "The sudden power failure prevented us from completing the report on time.", words: ["the sudden power failure", "prevented", "us", "from completing", "the report", "on time"] },
    { ja: "彼の強い責任感が、彼がその計画を途中であきらめるのを防ぎました。", answer: "His strong sense of responsibility prevented him from giving up on the plan halfway through.", words: ["his strong sense of responsibility", "prevented", "him", "from giving up on", "the plan", "halfway through"] },
    { ja: "凍結した道路のため、多くの通勤者が予定どおり職場に到着できませんでした。", answer: "The icy roads prevented many commuters from arriving at work as scheduled.", words: ["the icy roads", "prevented", "many commuters", "from arriving", "at work", "as scheduled"] },
    { ja: "この新しい制度は、若者が十分な教育を受けるのを妨げる可能性があります。", answer: "This new system may prevent young people from receiving an adequate education.", words: ["this new system", "may prevent", "young people", "from receiving", "an adequate education"] },
    { ja: "彼女が慎重に準備していたので、問題が起きても慌てずに済みました。", answer: "Her careful preparation prevented her from panicking when a problem arose.", words: ["her careful preparation", "prevented", "her", "from panicking", "when a problem arose"] },
    { ja: "その会社はこれまで、従業員が自宅で働くのを認めてきませんでした。", answer: "The company has prevented its employees from working at home until now.", words: ["the company", "has prevented", "its employees", "from working", "at home", "until now"] },
    { ja: "もし彼が警告を無視していたら、その安全装置でさえ、彼が事故を起こすのを防げなかったかもしれません。", answer: "Even the safety device might not have prevented him from causing an accident if he had ignored the warning.", words: ["even the safety device", "might not have prevented", "him", "from causing", "an accident", "if he had ignored the warning"] },
    { ja: "予想外の技術的な問題のため、研究チームは実験を続けることができませんでした。", answer: "The unexpected technical problem prevented the research team from continuing the experiment.", words: ["the unexpected technical problem", "prevented", "the research team", "from continuing", "the experiment"] },
    { ja: "彼女の周囲の人々からの批判でさえ、彼女が自分の意見を述べるのを止めることはできませんでした。", answer: "Even the criticism from those around her could not prevent her from expressing her own opinion.", words: ["even the criticism from those around her", "could not prevent", "her", "from expressing", "her own opinion"] },
    { ja: "その厳しい規則のため、参加者は必要な変更を自由に提案できませんでした。", answer: "The strict rule prevented the participants from suggesting the necessary changes freely.", words: ["the strict rule", "prevented", "the participants", "from suggesting", "the necessary changes", "freely"] },
    { ja: "長年の経験があったので、彼はプレッシャーの下でも冷静さを失わずに済みました。", answer: "His years of experience prevented him from losing his composure under pressure.", words: ["his years of experience", "prevented", "him", "from losing", "his composure", "under pressure"] },
    { ja: "その情報がもっと早く共有されていれば、私たちは同じ間違いを繰り返さずに済んだかもしれません。", answer: "That information might have prevented us from repeating the same mistake if it had been shared earlier.", words: ["that information", "might have prevented", "us", "from repeating", "the same mistake", "if it had been shared earlier"] }
  ],
  hard: [
    { ja: "直前に届いた警告のおかげで、私たちは危険な区域に入らずに済みました。", answer: "The warning that arrived at the last minute prevented us from entering the dangerous area.", words: ["arrived","although","area","at","dangerous","entering","from","last","minute","prevented","the","the","the","that","us","warning"], unused: "although" },
    { ja: "彼がどれほど疲れていたとしても、責任感が彼に仕事を途中で投げ出させませんでした。", answer: "However tired he was, his sense of responsibility prevented him from abandoning the task halfway through.", words: ["abandoning","halfway","he","him","his","however","responsibility","sense","task","the","through","tired","unless","prevented","from","of","was"], unused: "unless" },
    { ja: "その情報が事前に共有されていれば、何人かの参加者が同じ間違いをするのを防げたかもしれません。", answer: "That information could have prevented several participants from making the same mistake if it had been shared in advance.", words: ["advance","been","could","despite","from","had","have","if","information","it","making","participants","prevented","same","several","shared","mistake","that","the","in"], unused: "despite" },
    { ja: "新たに導入された規則は、研究者が必要なデータを自由に利用するのを妨げかねません。", answer: "The newly introduced regulations may well prevent researchers from accessing the necessary data freely.", words: ["accessing","data","freely","from","introduced","may","necessary","newly","prevent","regulations","researchers","the","the","well","whereas"], unused: "whereas" },
    { ja: "周囲からの激しい批判でさえ、彼女が自分の判断に従って行動するのを止めることはできませんでした。", answer: "Even the severe criticism from those around her could not prevent her from acting according to her own judgment.", words: ["according","acting","around","because","could","criticism","even","from","her","her","judgment","not","own","prevent","severe","the","those","to"], unused: "because" },
    { ja: "安全確認が適切に行われていなかったら、その装置でさえ、作業員が重大な事故を起こすのを防げなかったかもしれません。", answer: "Even the device might not have prevented the workers from causing a serious accident if the safety checks had not been carried out properly.", words: ["a","accident","been","carried","causing","checks","device","even","from","had","have","if","might","not","not","out","prevented","properly","safety","serious","the","the","the","whenever","workers"], unused: "whenever" },
    { ja: "長年にわたって身につけた経験が、予期せぬ事態に直面しても、彼が冷静さを失うのを防ぎました。", answer: "The experience he had gained over the years prevented him from losing his composure when faced with an unexpected situation.", words: ["an","composure","experience","faced","from","gained","had","he","him","his","losing","over","prevented","situation","the","the","unexpected","when","whether","years"], unused: "whether" },
    { ja: "予算がさらに削減されれば、学校は、それを必要とする生徒に十分な支援を提供できなくなるでしょう。", answer: "Further budget cuts will prevent the school from providing adequate support for students who need it.", words: ["adequate","budget","cuts","for","from","further","need","prevent","providing","school","students","support","the","who","whose","will","it"], unused: "whose" },
    { ja: "彼が事実を隠そうとしたことも、私たちが何かがおかしいと疑うのを止めることはできませんでした。", answer: "His attempt to hide the facts did not prevent us from suspecting that something was wrong.", words: ["attempt","did","facts","from","hide","his","not","prevent","since","something","suspecting","that","the","to","us","was","wrong"], unused: "since" },
    { ja: "計画が徹底的に見直されていれば、担当者は同じ判断ミスを繰り返さずに済んだかもしれません。", answer: "A thorough review of the plan might have prevented the officials in charge from repeating the same error in judgment if it had been carried out.", words: ["a","although","been","carried","charge","error","from","had","have","if","in","in","it","judgment","might","officials","of","out","plan","prevented","repeating","review","same","the","the","the","thorough"], unused: "although" },
    { ja: "彼女の冷静な態度のおかげで、ほかのメンバーは感情的に反応せずに済みました。", answer: "Her calm attitude prevented the other members from reacting emotionally.", words: ["attitude","calm","emotionally","from","her","members","other","prevented","reacting","the","unless"], unused: "unless" },
    { ja: "たとえ法律が改正されたとしても、それだけでは企業が同じ慣行を続けるのを完全には防げないかもしれません。", answer: "Even if the law is revised, that alone may not completely prevent companies from continuing the same practice.", words: ["alone","companies","completely","continuing","despite","even","from","if","is","law","may","not","practice","prevent","revised","same","that","the","the"], unused: "despite" }
  ]
};

worksheetDefinitions["prevent-from-ing-order"] = {
  label: "物主構文 prevent（人＋from＋V-ing・整序英作文）",
  title: "物主構文 prevent＋人＋from＋V-ing　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。",
  answerNote: "語順は「主語＋prevent／prevents／prevented＋人＋from＋V-ing」です。",
  type: "english-order",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "中学修了語彙。語句単位を中心に、prevent＋人＋from＋V-ingの語順を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "高校初級語彙。助動詞や長めの目的語を含みます。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "英検準2級程度。完了形や仮定表現を含みます。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト程度。単語単位に分割し、不要語を1語加えます。" }
  }
};

const keepFromOptionV8 = worksheetTypeSelect.querySelector('option[value="keep-from-ing-order"]');
if (keepFromOptionV8 && !worksheetTypeSelect.querySelector('option[value="prevent-from-ing-order"]')) {
  const option = document.createElement("option");
  option.value = "prevent-from-ing-order";
  option.textContent = "物主構文 prevent（人＋from＋V-ing）― 整序英作文";
  keepFromOptionV8.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV8Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV8PreventFromIng() {
  if (worksheetTypeSelect.value === "prevent-from-ing-order") {
    return preventFromIngQuestions[difficultySelect.value];
  }
  return buildQuestionPoolV8Previous();
};

const appendEnglishAnswerV8Previous = appendEnglishAnswer;
appendEnglishAnswer = function appendEnglishAnswerV8(fragment, question, number, type) {
  if (worksheetTypeSelect.value !== "prevent-from-ing-order") {
    appendEnglishAnswerV8Previous(fragment, question, number, type);
    return;
  }
  const item = document.createElement("div");
  item.className = "english-answer-item";
  const answer = document.createElement("p");
  answer.innerHTML = `<b>${number}. ${question.answer}</b>`;
  const structure = document.createElement("p");
  structure.className = "answer-explanation";
  structure.textContent = `主語＋prevent／prevents／prevented＋人＋from＋V-ing${question.unused ? `（不要語：${question.unused}）` : ""}`;
  item.append(answer, structure);
  fragment.appendChild(item);
};

syncDifficultyOptions();
updateControls();
