"use strict";

// Version 15: verb-expression <-> noun-expression rewriting worksheets.
const verbNounRewriteQuestions = {
  basic: [
    { source: "Sales increased sharply last year.", prompt: "There was（　　　）（　　　）sales last year.", blanks: "a sharp increase / in", answer: "There was a sharp increase in sales last year." },
    { source: "The number of visitors decreased gradually.", prompt: "There was（　　　）（　　　）the number of visitors.", blanks: "a gradual decrease / in", answer: "There was a gradual decrease in the number of visitors." },
    { source: "The town grew rapidly.", prompt: "There was（　　　）（　　　）the town.", blanks: "rapid growth / in", answer: "There was rapid growth in the town." },
    { source: "Her English improved greatly.", prompt: "There was（　　　）（　　　）her English.", blanks: "a great improvement / in", answer: "There was a great improvement in her English." },
    { source: "The weather changed suddenly.", prompt: "There was（　　　）（　　　）the weather.", blanks: "a sudden change / in", answer: "There was a sudden change in the weather." },
    { source: "There was a steady increase in the population.", prompt: "The population（　　　）（　　　）.", blanks: "increased / steadily", answer: "The population increased steadily." },
    { source: "There was a slight decrease in the price.", prompt: "The price（　　　）（　　　）.", blanks: "decreased / slightly", answer: "The price decreased slightly." },
    { source: "There was rapid growth in online shopping.", prompt: "Online shopping（　　　）（　　　）.", blanks: "grew / rapidly", answer: "Online shopping grew rapidly." },
    { source: "There was a noticeable improvement in his condition.", prompt: "His condition（　　　）（　　　）.", blanks: "improved / noticeably", answer: "His condition improved noticeably." },
    { source: "There was a sudden change in the schedule.", prompt: "The schedule（　　　）（　　　）.", blanks: "changed / suddenly", answer: "The schedule changed suddenly." },
    { source: "She decided to study abroad.", prompt: "She（　　　）（　　　）study abroad.", blanks: "made a decision / to", answer: "She made a decision to study abroad." },
    { source: "They made a decision to postpone the meeting.", prompt: "They（　　　）（　　　）the meeting.", blanks: "decided / to postpone", answer: "They decided to postpone the meeting." }
  ],
  standard: [
    { source: "The company expanded rapidly into Asian markets.", prompt: "The company experienced（　　　）into Asian markets.", blanks: "rapid expansion", answer: "The company experienced rapid expansion into Asian markets." },
    { source: "The city reduced waste significantly last year.", prompt: "There was（　　　）（　　　）waste in the city last year.", blanks: "a significant reduction / in", answer: "There was a significant reduction in waste in the city last year." },
    { source: "The economy recovered slowly after the crisis.", prompt: "There was（　　　）（　　　）the economy after the crisis.", blanks: "a slow recovery / in", answer: "There was a slow recovery in the economy after the crisis." },
    { source: "The city developed rapidly during the decade.", prompt: "The city experienced（　　　）during the decade.", blanks: "rapid development", answer: "The city experienced rapid development during the decade." },
    { source: "The committee decided to revise the policy.", prompt: "The committee（　　　）（　　　）revise the policy.", blanks: "made a decision / to", answer: "The committee made a decision to revise the policy." },
    { source: "The team attempted to solve the problem.", prompt: "The team（　　　）（　　　）solve the problem.", blanks: "made an attempt / to", answer: "The team made an attempt to solve the problem." },
    { source: "There was a sharp decline in exports during the winter.", prompt: "Exports（　　　）（　　　）during the winter.", blanks: "declined / sharply", answer: "Exports declined sharply during the winter." },
    { source: "There was a considerable improvement in air quality.", prompt: "Air quality（　　　）（　　　）.", blanks: "improved / considerably", answer: "Air quality improved considerably." },
    { source: "There was a gradual recovery in consumer confidence.", prompt: "Consumer confidence（　　　）（　　　）.", blanks: "recovered / gradually", answer: "Consumer confidence recovered gradually." },
    { source: "They made an attempt to contact the missing climbers.", prompt: "They（　　　）（　　　）the missing climbers.", blanks: "attempted / to contact", answer: "They attempted to contact the missing climbers." },
    { source: "The two sides reached an agreement on the new rules.", prompt: "The two sides（　　　）（　　　）the new rules.", blanks: "agreed / on", answer: "The two sides agreed on the new rules." },
    { source: "The scientist discovered an important fact about the disease.", prompt: "The scientist made（　　　）about the disease.", blanks: "an important discovery", answer: "The scientist made an important discovery about the disease." }
  ],
  advanced: [
    { source: "The number of people using public transportation increased steadily over the decade.", prompt: "There was（　　　）（　　　）the number of people using public transportation over the decade.", blanks: "a steady increase / in", answer: "There was a steady increase in the number of people using public transportation over the decade." },
    { source: "The company significantly reduced its dependence on imported energy.", prompt: "The company achieved（　　　）（　　　）its dependence on imported energy.", blanks: "a significant reduction / in", answer: "The company achieved a significant reduction in its dependence on imported energy." },
    { source: "Public interest in the issue grew rapidly after the report was published.", prompt: "There was（　　　）（　　　）public interest in the issue after the report was published.", blanks: "rapid growth / in", answer: "There was rapid growth in public interest in the issue after the report was published." },
    { source: "The patient recovered remarkably quickly after the operation.", prompt: "The patient made（　　　）after the operation.", blanks: "a remarkably quick recovery", answer: "The patient made a remarkably quick recovery after the operation." },
    { source: "The government decided to introduce stricter safety standards.", prompt: "The government（　　　）（　　　）introduce stricter safety standards.", blanks: "made the decision / to", answer: "The government made the decision to introduce stricter safety standards." },
    { source: "The researchers investigated the cause of the unexpected failure.", prompt: "The researchers conducted（　　　）（　　　）the cause of the unexpected failure.", blanks: "an investigation / into", answer: "The researchers conducted an investigation into the cause of the unexpected failure." },
    { source: "There was a substantial decrease in the amount of plastic used by the factory.", prompt: "The factory（　　　）the amount of plastic it used.", blanks: "substantially reduced", answer: "The factory substantially reduced the amount of plastic it used." },
    { source: "There was a noticeable improvement in the students' ability to express their ideas clearly.", prompt: "The students' ability to express their ideas clearly（　　　）（　　　）.", blanks: "improved / noticeably", answer: "The students' ability to express their ideas clearly improved noticeably." },
    { source: "The committee conducted a detailed examination of the proposal before voting.", prompt: "The committee（　　　）（　　　）the proposal before voting.", blanks: "examined / in detail", answer: "The committee examined the proposal in detail before voting." },
    { source: "The two governments reached an agreement to share information more quickly.", prompt: "The two governments（　　　）（　　　）information more quickly.", blanks: "agreed / to share", answer: "The two governments agreed to share information more quickly." },
    { source: "The report gave a detailed description of how the system had failed.", prompt: "The report（　　　）（　　　）the system had failed.", blanks: "described in detail / how", answer: "The report described in detail how the system had failed." },
    { source: "The discovery of the new evidence completely changed the direction of the investigation.", prompt: "Investigators（　　　）the new evidence, and this brought about（　　　）（　　　）the direction of the investigation.", blanks: "discovered / a complete change / in", answer: "Investigators discovered the new evidence, and this brought about a complete change in the direction of the investigation." }
  ],
  hard: [
    { source: "The proportion of households using renewable energy increased substantially after the subsidy was introduced.", prompt: "The introduction of the subsidy was followed by（　　　）（　　　）the proportion of households using renewable energy.", blanks: "a substantial increase / in", answer: "The introduction of the subsidy was followed by a substantial increase in the proportion of households using renewable energy." },
    { source: "The company reduced production costs considerably without lowering the quality of its products.", prompt: "The company achieved（　　　）（　　　）production costs without lowering the quality of its products.", blanks: "a considerable reduction / in", answer: "The company achieved a considerable reduction in production costs without lowering the quality of its products." },
    { source: "Public confidence in the institution declined sharply after the investigation revealed serious misconduct.", prompt: "The revelation of serious misconduct during the investigation led to（　　　）（　　　）public confidence in the institution.", blanks: "a sharp decline / in", answer: "The revelation of serious misconduct during the investigation led to a sharp decline in public confidence in the institution." },
    { source: "The region recovered gradually from the economic damage caused by the disaster.", prompt: "The region made（　　　）（　　　）the economic damage caused by the disaster.", blanks: "a gradual recovery / from", answer: "The region made a gradual recovery from the economic damage caused by the disaster." },
    { source: "The board decided unanimously to suspend the project until further evidence became available.", prompt: "The board made（　　　）（　　　）suspend the project until further evidence became available.", blanks: "a unanimous decision / to", answer: "The board made a unanimous decision to suspend the project until further evidence became available." },
    { source: "The authorities investigated whether the data had been deliberately altered before publication.", prompt: "The authorities conducted（　　　）（　　　）whether the data had been deliberately altered before publication.", blanks: "an investigation / into", answer: "The authorities conducted an investigation into whether the data had been deliberately altered before publication." },
    { source: "There was a dramatic expansion of online services while many physical offices were being closed.", prompt: "Online services（　　　）（　　　）while many physical offices were being closed.", blanks: "expanded / dramatically", answer: "Online services expanded dramatically while many physical offices were being closed." },
    { source: "There was a marked improvement in the system's accuracy in identifying rare errors.", prompt: "The system's accuracy in identifying rare errors（　　　）（　　　）.", blanks: "improved / markedly", answer: "The system's accuracy in identifying rare errors improved markedly." },
    { source: "The committee's detailed examination of the evidence revealed several inconsistencies in the original report.", prompt: "The committee（　　　）and revealed several inconsistencies in the original report.", blanks: "examined the evidence in detail", answer: "The committee examined the evidence in detail and revealed several inconsistencies in the original report." },
    { source: "The two countries reached an agreement that they would exchange emergency information without delay.", prompt: "The two countries（　　　）（　　　）emergency information without delay.", blanks: "agreed / to exchange", answer: "The two countries agreed to exchange emergency information without delay." },
    { source: "The report provided a clear explanation of why the earlier forecast had proved inaccurate.", prompt: "The report（　　　）（　　　）the earlier forecast had proved inaccurate.", blanks: "clearly explained / why", answer: "The report clearly explained why the earlier forecast had proved inaccurate." },
    { source: "The investigators' discovery of additional documents completely changed their understanding of the case.", prompt: "The investigators（　　　）additional documents, which（　　　）their understanding of the case.", blanks: "discovered / completely changed", answer: "The investigators discovered additional documents, which completely changed their understanding of the case." }
  ]
};

worksheetDefinitions["verb-noun-rewrite"] = {
  label: "書き換え① 動詞表現⇄名詞表現",
  title: "書き換え①　動詞表現 ⇄ 名詞表現",
  instruction: "次の2文がほぼ同じ意味になるように、空欄に適する語句を書きなさい。動詞と名詞の形だけでなく、形容詞・副詞や前置詞の変化にも注意しなさい。",
  answerNote: "動詞⇄名詞の書き換えでは、意味・時制・修飾関係を保ちます。例：increase sharply ⇄ a sharp increase、decide ⇄ make a decision。",
  type: "english-rewrite",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "increase・decrease・grow・improve・change・decideを中心に、基本的な動詞⇄名詞の変換を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "reduce・recover・decline・develop・attempt・agreement・discoveryなどを加え、前置詞や修飾語も書き換えます。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "長い主語や節を保ちながら、動詞⇄名詞と副詞⇄形容詞を同時に変換します。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト上位程度。長文の意味・時制・修飾関係を維持した複合的な書き換えを扱います。" }
  }
};

const makeRewriteOptionV15 = worksheetTypeSelect.querySelector('option[value="make-adjective-rewrite"]');
if (makeRewriteOptionV15 && !worksheetTypeSelect.querySelector('option[value="verb-noun-rewrite"]')) {
  const option = document.createElement("option");
  option.value = "verb-noun-rewrite";
  option.textContent = "書き換え① 動詞表現 ⇄ 名詞表現";
  makeRewriteOptionV15.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV15Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV15VerbNounRewrite() {
  if (worksheetTypeSelect.value === "verb-noun-rewrite") return verbNounRewriteQuestions[difficultySelect.value];
  return buildQuestionPoolV15Previous();
};

syncDifficultyOptions();
updateControls();
