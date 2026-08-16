"use strict";

// Rewrite 3: be + emotion/psychological expression <-> general verb.
const emotionVerbRewriteQuestions = {
  basic: [
    { source: "The news surprised me.", prompt: "I（　　　）（　　　）the news.", blanks: "was surprised / by", answer: "I was surprised by the news." },
    { source: "The loud noise frightened the baby.", prompt: "The baby（　　　）（　　　）the loud noise.", blanks: "was frightened / by", answer: "The baby was frightened by the loud noise." },
    { source: "His comment annoyed me.", prompt: "I（　　　）（　　　）his comment.", blanks: "was annoyed / by", answer: "I was annoyed by his comment." },
    { source: "The story amused us.", prompt: "We（　　　）（　　　）the story.", blanks: "were amused / by", answer: "We were amused by the story." },
    { source: "The question confused him.", prompt: "He（　　　）（　　　）the question.", blanks: "was confused / by", answer: "He was confused by the question." },
    { source: "The accident shocked everyone.", prompt: "Everyone（　　　）（　　　）the accident.", blanks: "was shocked / by", answer: "Everyone was shocked by the accident." },
    { source: "I was surprised by her answer.", prompt: "Her answer（　　　）（　　　）.", blanks: "surprised / me", answer: "Her answer surprised me." },
    { source: "She was disappointed by the result.", prompt: "The result（　　　）（　　　）.", blanks: "disappointed / her", answer: "The result disappointed her." },
    { source: "They were frightened by the storm.", prompt: "The storm（　　　）（　　　）.", blanks: "frightened / them", answer: "The storm frightened them." },
    { source: "We were confused by the instructions.", prompt: "The instructions（　　　）（　　　）.", blanks: "confused / us", answer: "The instructions confused us." },
    { source: "The children were amused by the clown.", prompt: "The clown（　　　）（　　　）.", blanks: "amused / the children", answer: "The clown amused the children." },
    { source: "He was shocked by the sudden change.", prompt: "The sudden change（　　　）（　　　）.", blanks: "shocked / him", answer: "The sudden change shocked him." }
  ],
  standard: [
    { source: "This topic interests me.", prompt: "I（　　　）（　　　）this topic.", blanks: "am interested / in", answer: "I am interested in this topic." },
    { source: "The long lecture bored the students.", prompt: "The students（　　　）（　　　）the long lecture.", blanks: "were bored / with", answer: "The students were bored with the long lecture." },
    { source: "The possibility of traveling abroad excites her.", prompt: "She（　　　）（　　　）the possibility of traveling abroad.", blanks: "is excited / about", answer: "She is excited about the possibility of traveling abroad." },
    { source: "The final result disappointed the team.", prompt: "The team（　　　）（　　　）the final result.", blanks: "was disappointed / with", answer: "The team was disappointed with the final result." },
    { source: "The explanation satisfied us.", prompt: "We（　　　）（　　　）the explanation.", blanks: "were satisfied / with", answer: "We were satisfied with the explanation." },
    { source: "The long delay frustrated the passengers.", prompt: "The passengers（　　　）（　　　）the long delay.", blanks: "were frustrated / by", answer: "The passengers were frustrated by the long delay." },
    { source: "I am interested in modern architecture.", prompt: "Modern architecture（　　　）（　　　）.", blanks: "interests / me", answer: "Modern architecture interests me." },
    { source: "She was amazed at the speed of the response.", prompt: "The speed of the response（　　　）（　　　）.", blanks: "amazed / her", answer: "The speed of the response amazed her." },
    { source: "He was worried about the rising cost.", prompt: "The rising cost（　　　）（　　　）.", blanks: "worried / him", answer: "The rising cost worried him." },
    { source: "They were embarrassed by the mistake.", prompt: "The mistake（　　　）（　　　）.", blanks: "embarrassed / them", answer: "The mistake embarrassed them." },
    { source: "The audience was puzzled by the ending.", prompt: "The ending（　　　）（　　　）.", blanks: "puzzled / the audience", answer: "The ending puzzled the audience." },
    { source: "The students were inspired by her speech.", prompt: "Her speech（　　　）（　　　）.", blanks: "inspired / the students", answer: "Her speech inspired the students." }
  ],
  advanced: [
    { source: "The unexpected result surprised all the researchers.", prompt: "All the researchers（　　　）（　　　）the unexpected result.", blanks: "were surprised / by", answer: "All the researchers were surprised by the unexpected result." },
    { source: "The lack of clear instructions has confused many users.", prompt: "Many users（　　　）（　　　）the lack of clear instructions.", blanks: "have been confused / by", answer: "Many users have been confused by the lack of clear instructions." },
    { source: "The repeated delays had frustrated the entire team.", prompt: "The entire team（　　　）（　　　）the repeated delays.", blanks: "had been frustrated / by", answer: "The entire team had been frustrated by the repeated delays." },
    { source: "The possibility that the plan might fail worries the manager.", prompt: "The manager（　　　）（　　　）the possibility that the plan might fail.", blanks: "is worried / about", answer: "The manager is worried about the possibility that the plan might fail." },
    { source: "The rapid progress of the project has encouraged the staff.", prompt: "The staff（　　　）（　　　）the rapid progress of the project.", blanks: "have been encouraged / by", answer: "The staff have been encouraged by the rapid progress of the project." },
    { source: "The complexity of the new procedure puzzled even experienced workers.", prompt: "Even experienced workers（　　　）（　　　）the complexity of the new procedure.", blanks: "were puzzled / by", answer: "Even experienced workers were puzzled by the complexity of the new procedure." },
    { source: "We were deeply disappointed with the committee's decision.", prompt: "The committee's decision（　　　）（　　　）.", blanks: "deeply disappointed / us", answer: "The committee's decision deeply disappointed us." },
    { source: "The researchers were amazed at how quickly the material changed.", prompt: "How quickly the material changed（　　　）（　　　）.", blanks: "amazed / the researchers", answer: "How quickly the material changed amazed the researchers." },
    { source: "She has always been interested in how languages change over time.", prompt: "How languages change over time（　　　）（　　　）.", blanks: "has always interested / her", answer: "How languages change over time has always interested her." },
    { source: "The residents were alarmed by the sudden rise in water levels.", prompt: "The sudden rise in water levels（　　　）（　　　）.", blanks: "alarmed / the residents", answer: "The sudden rise in water levels alarmed the residents." },
    { source: "The committee was satisfied with the evidence presented at the hearing.", prompt: "The evidence presented at the hearing（　　　）（　　　）.", blanks: "satisfied / the committee", answer: "The evidence presented at the hearing satisfied the committee." },
    { source: "Many readers were disturbed by the report's description of the incident.", prompt: "The report's description of the incident（　　　）（　　　）.", blanks: "disturbed / many readers", answer: "The report's description of the incident disturbed many readers." }
  ],
  hard: [
    { source: "The fact that the error had remained unnoticed for so long surprised the investigators.", prompt: "The investigators（　　　）（　　　）the fact that the error had remained unnoticed for so long.", blanks: "were surprised / by", answer: "The investigators were surprised by the fact that the error had remained unnoticed for so long." },
    { source: "The possibility of further delays worries officials responsible for the project.", prompt: "Officials responsible for the project（　　　）（　　　）the possibility of further delays.", blanks: "are worried / about", answer: "Officials responsible for the project are worried about the possibility of further delays." },
    { source: "The apparent contradiction between the two sets of data puzzled the research team.", prompt: "The research team（　　　）（　　　）the apparent contradiction between the two sets of data.", blanks: "was puzzled / by", answer: "The research team was puzzled by the apparent contradiction between the two sets of data." },
    { source: "The unexpectedly strong public response encouraged those working to preserve the building.", prompt: "Those working to preserve the building（　　　）（　　　）the unexpectedly strong public response.", blanks: "were encouraged / by", answer: "Those working to preserve the building were encouraged by the unexpectedly strong public response." },
    { source: "The discovery that several records were missing alarmed the officials conducting the review.", prompt: "The officials conducting the review（　　　）（　　　）the discovery that several records were missing.", blanks: "were alarmed / by", answer: "The officials conducting the review were alarmed by the discovery that several records were missing." },
    { source: "The lack of agreement on even the most basic points frustrated everyone involved in the negotiations.", prompt: "Everyone involved in the negotiations（　　　）（　　　）the lack of agreement on even the most basic points.", blanks: "was frustrated / by", answer: "Everyone involved in the negotiations was frustrated by the lack of agreement on even the most basic points." },
    { source: "The panel was deeply impressed by the clarity with which she defended her proposal.", prompt: "The clarity with which she defended her proposal（　　　）（　　　）.", blanks: "deeply impressed / the panel", answer: "The clarity with which she defended her proposal deeply impressed the panel." },
    { source: "The residents have been increasingly concerned about the decline in local medical services.", prompt: "The decline in local medical services（　　　）（　　　）the residents.", blanks: "has increasingly concerned / the residents", answer: "The decline in local medical services has increasingly concerned the residents." },
    { source: "The committee was not satisfied with the explanation given for the sudden change in policy.", prompt: "The explanation given for the sudden change in policy（　　　）（　　　）the committee.", blanks: "did not satisfy / the committee", answer: "The explanation given for the sudden change in policy did not satisfy the committee." },
    { source: "The researchers were fascinated by the way the species adapted to such an extreme environment.", prompt: "The way the species adapted to such an extreme environment（　　　）（　　　）.", blanks: "fascinated / the researchers", answer: "The way the species adapted to such an extreme environment fascinated the researchers." },
    { source: "The public had been confused by the conflicting information released by different agencies.", prompt: "The conflicting information released by different agencies（　　　）（　　　）the public.", blanks: "had confused / the public", answer: "The conflicting information released by different agencies had confused the public." },
    { source: "The board was disappointed that the revised plan failed to address the central problem.", prompt: "That the revised plan failed to address the central problem（　　　）（　　　）the board.", blanks: "disappointed / the board", answer: "That the revised plan failed to address the central problem disappointed the board." }
  ]
};

worksheetDefinitions["emotion-verb-rewrite"] = {
  label: "書き換え③ be＋感情・心理表現 ⇄ 一般動詞",
  title: "書き換え③　be＋感情・心理表現 ⇄ 一般動詞",
  instruction: "次の2文がほぼ同じ意味になるように、空欄に適する語句を書きなさい。感情を持つ人と、その感情を引き起こす物・出来事の関係、前置詞、時制に注意しなさい。",
  answerNote: "感情・心理表現の書き換えでは、感情を持つ人が be＋過去分詞側の主語になり、原因となる物・出来事が一般動詞側の主語になることがあります。例：The news surprised me. ⇄ I was surprised by the news.",
  type: "english-rewrite",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "surprise・frighten・annoy・amuse・confuse・shockを中心に、感情を持つ人と原因の入れ替えを確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "interested in・bored with・excited about・disappointed with・satisfied withなど、前置詞を伴う心理表現も扱います。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "現在完了・過去完了、長い主語や節を含む文でも、時制と感情の原因を保って書き換えます。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト上位程度。that節・関係節・否定・完了形を含む長文で、心理状態と原因の対応を正確に維持します。" }
  }
};

const thereHaveRewriteOptionV17 = worksheetTypeSelect.querySelector('option[value="there-have-rewrite"]');
if (thereHaveRewriteOptionV17 && !worksheetTypeSelect.querySelector('option[value="emotion-verb-rewrite"]')) {
  const option = document.createElement("option");
  option.value = "emotion-verb-rewrite";
  option.textContent = "書き換え③ be＋感情・心理表現 ⇄ 一般動詞";
  thereHaveRewriteOptionV17.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV17Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV17EmotionVerbRewrite() {
  if (worksheetTypeSelect.value === "emotion-verb-rewrite") return emotionVerbRewriteQuestions[difficultySelect.value];
  return buildQuestionPoolV17Previous();
};

syncDifficultyOptions();
updateControls();
