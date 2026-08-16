"use strict";

// Rewrite 8: comprehensive mixed rewrite practice.
const comprehensiveRewriteQuestions = {
  basic: [
    { source: "The town grew rapidly last year.", prompt: "The town experienced（　　　）（　　　）last year.", blanks: "rapid / growth", answer: "The town experienced rapid growth last year." },
    { source: "There is a small library in the school.", prompt: "The school（　　　）（　　　）.", blanks: "has / a small library", answer: "The school has a small library." },
    { source: "The news surprised me.", prompt: "I（　　　）（　　　）the news.", blanks: "was surprised / by", answer: "I was surprised by the news." },
    { source: "This design resembles the old model.", prompt: "This design is（　　　）（　　　）the old model.", blanks: "similar / to", answer: "This design is similar to the old model." },
    { source: "The teacher praised Ken.", prompt: "Ken（　　　）（　　　）the teacher.", blanks: "was praised / by", answer: "Ken was praised by the teacher." },
    { source: "Lake Biwa is the largest lake in Japan.", prompt: "Lake Biwa is（　　　）（　　　）lake in Japan.", blanks: "larger than / any other", answer: "Lake Biwa is larger than any other lake in Japan." },
    { source: "No other building in this town is as old as that building.", prompt: "That building is（　　　）（　　　）in this town.", blanks: "the oldest / building", answer: "That building is the oldest building in this town." },
    { source: "His explanation satisfied us.", prompt: "We（　　　）（　　　）his explanation.", blanks: "were satisfied / with", answer: "We were satisfied with his explanation." },
    { source: "The two plans differ from each other.", prompt: "The two plans are（　　　）（　　　）each other.", blanks: "different / from", answer: "The two plans are different from each other." },
    { source: "There were two computers in the room.", prompt: "The room（　　　）（　　　）.", blanks: "had / two computers", answer: "The room had two computers." },
    { source: "The storm frightened the children.", prompt: "The children（　　　）（　　　）the storm.", blanks: "were frightened / by", answer: "The children were frightened by the storm." },
    { source: "The company reduced waste significantly.", prompt: "The company achieved（　　　）（　　　）waste.", blanks: "a significant reduction / in", answer: "The company achieved a significant reduction in waste." }
  ],
  standard: [
    { source: "The committee made a decision to postpone the meeting.", prompt: "The committee（　　　）（　　　）the meeting.", blanks: "decided / to postpone", answer: "The committee decided to postpone the meeting." },
    { source: "There are three meeting rooms in the building.", prompt: "The building（　　　）（　　　）.", blanks: "has / three meeting rooms", answer: "The building has three meeting rooms." },
    { source: "The long delay frustrated the passengers.", prompt: "The passengers（　　　）（　　　）the long delay.", blanks: "were frustrated / by", answer: "The passengers were frustrated by the long delay." },
    { source: "The results reflect broader social changes.", prompt: "The results are（　　　）（　　　）broader social changes.", blanks: "reflective / of", answer: "The results are reflective of broader social changes." },
    { source: "The school will announce the results tomorrow.", prompt: "The results（　　　）（　　　）the school tomorrow.", blanks: "will be announced / by", answer: "The results will be announced by the school tomorrow." },
    { source: "This route is the shortest of the three routes.", prompt: "This route is（　　　）（　　　）of the other two routes.", blanks: "shorter than / either", answer: "This route is shorter than either of the other two routes." },
    { source: "This is the most difficult question on the test.", prompt: "No other question on the test is（　　　）（　　　）this one.", blanks: "as difficult / as", answer: "No other question on the test is as difficult as this one." },
    { source: "The new policy worried many residents.", prompt: "Many residents（　　　）（　　　）the new policy.", blanks: "were worried / about", answer: "Many residents were worried about the new policy." },
    { source: "The final model consists of five main parts.", prompt: "The final model is（　　　）（　　　）five main parts.", blanks: "composed / of", answer: "The final model is composed of five main parts." },
    { source: "The technicians are testing the new system.", prompt: "The new system（　　　）（　　　）the technicians.", blanks: "is being tested / by", answer: "The new system is being tested by the technicians." },
    { source: "Sara solved the problem more quickly than any other student in the class.", prompt: "Sara solved the problem（　　　）（　　　）in the class.", blanks: "the most quickly / of all the students", answer: "Sara solved the problem the most quickly of all the students in the class." },
    { source: "No other student in the class answered as accurately as Mei.", prompt: "Mei answered（　　　）（　　　）in the class.", blanks: "the most accurately / of all the students", answer: "Mei answered the most accurately of all the students in the class." }
  ],
  advanced: [
    { source: "The researchers made a careful analysis of the survey results.", prompt: "The researchers（　　　）（　　　）the survey results.", blanks: "carefully analyzed / the", answer: "The researchers carefully analyzed the survey results." },
    { source: "There was a sharp decline in demand during the winter.", prompt: "Demand（　　　）（　　　）during the winter.", blanks: "declined / sharply", answer: "Demand declined sharply during the winter." },
    { source: "The lack of clear instructions has confused many users.", prompt: "Many users（　　　）（　　　）the lack of clear instructions.", blanks: "have been confused / by", answer: "Many users have been confused by the lack of clear instructions." },
    { source: "The success of the plan depends heavily on local cooperation.", prompt: "The success of the plan is（　　　）（　　　）local cooperation.", blanks: "heavily dependent / on", answer: "The success of the plan is heavily dependent on local cooperation." },
    { source: "The committee has not yet approved the revised proposal.", prompt: "The revised proposal（　　　）（　　　）the committee.", blanks: "has not yet been approved / by", answer: "The revised proposal has not yet been approved by the committee." },
    { source: "This year's attendance was higher than that of any other year in the past decade.", prompt: "This year's attendance（　　　）（　　　）the past decade.", blanks: "was the highest / in", answer: "This year's attendance was the highest in the past decade." },
    { source: "The latest model uses the least energy of all the models in the series.", prompt: "No other model in the series uses（　　　）（　　　）the latest model.", blanks: "as little energy / as", answer: "No other model in the series uses as little energy as the latest model." },
    { source: "The discovery of the error completely changed the direction of the investigation.", prompt: "Discovering the error brought about（　　　）（　　　）the direction of the investigation.", blanks: "a complete change / in", answer: "Discovering the error brought about a complete change in the direction of the investigation." },
    { source: "The possibility that the plan might fail worries the manager.", prompt: "The manager is（　　　）（　　　）the possibility that the plan might fail.", blanks: "worried / about", answer: "The manager is worried about the possibility that the plan might fail." },
    { source: "The evidence indicates a serious problem in the system.", prompt: "The evidence is（　　　）（　　　）a serious problem in the system.", blanks: "indicative / of", answer: "The evidence is indicative of a serious problem in the system." },
    { source: "The staff had already checked all the applications.", prompt: "All the applications（　　　）（　　　）the staff.", blanks: "had already been checked / by", answer: "All the applications had already been checked by the staff." },
    { source: "The Pacific Ocean is the largest ocean on Earth.", prompt: "No other ocean on Earth is（　　　）（　　　）the Pacific Ocean.", blanks: "as large / as", answer: "No other ocean on Earth is as large as the Pacific Ocean." }
  ],
  hard: [
    { source: "The investigators' discovery of the new evidence brought about a complete change in the direction of the investigation.", prompt: "The investigators discovered the new evidence, and this（　　　）（　　　）the direction of the investigation.", blanks: "completely changed / the", answer: "The investigators discovered the new evidence, and this completely changed the direction of the investigation." },
    { source: "There were several weaknesses in the original procedure that the review panel later identified.", prompt: "The original procedure（　　　）（　　　）that the review panel later identified.", blanks: "had / several weaknesses", answer: "The original procedure had several weaknesses that the review panel later identified." },
    { source: "The unexpectedly strong public response encouraged those working to preserve the building.", prompt: "Those working to preserve the building（　　　）（　　　）the unexpectedly strong public response.", blanks: "were encouraged / by", answer: "Those working to preserve the building were encouraged by the unexpectedly strong public response." },
    { source: "The revised framework differs from the original one in several important respects.", prompt: "The revised framework is（　　　）（　　　）the original one in several important respects.", blanks: "different / from", answer: "The revised framework is different from the original one in several important respects." },
    { source: "The legal department should have reviewed the guidelines before publication.", prompt: "The guidelines（　　　）（　　　）the legal department before publication.", blanks: "should have been reviewed / by", answer: "The guidelines should have been reviewed by the legal department before publication." },
    { source: "Among all the candidates interviewed for the position, Ms. Lee had the most extensive experience.", prompt: "Ms. Lee had（　　　）（　　　）candidate interviewed for the position.", blanks: "more extensive experience than / any other", answer: "Ms. Lee had more extensive experience than any other candidate interviewed for the position." },
    { source: "The report published in May attracted the most public attention of all the reports released by the agency that year.", prompt: "No other report released by the agency that year attracted（　　　）（　　　）the report published in May.", blanks: "as much public attention / as", answer: "No other report released by the agency that year attracted as much public attention as the report published in May." },
    { source: "The committee's decision deeply disappointed everyone involved in the negotiations.", prompt: "Everyone involved in the negotiations（　　　）（　　　）the committee's decision.", blanks: "was deeply disappointed / by", answer: "Everyone involved in the negotiations was deeply disappointed by the committee's decision." },
    { source: "The panel is composed of specialists from several different fields.", prompt: "The panel（　　　）（　　　）specialists from several different fields.", blanks: "consists / of", answer: "The panel consists of specialists from several different fields." },
    { source: "The results have not yet been independently confirmed by the external laboratory.", prompt: "The external laboratory（　　　）（　　　）the results independently.", blanks: "has not yet confirmed / the", answer: "The external laboratory has not yet confirmed the results independently." },
    { source: "The latest survey recorded the highest response rate of all the surveys conducted by the organization in the past five years.", prompt: "No other survey conducted by the organization in the past five years recorded（　　　）（　　　）the latest survey did.", blanks: "as high a response rate / as", answer: "No other survey conducted by the organization in the past five years recorded as high a response rate as the latest survey did." },
    { source: "The new material is stronger than any other material the company has ever used.", prompt: "The new material is（　　　）（　　　）the company has ever used.", blanks: "the strongest material / that", answer: "The new material is the strongest material that the company has ever used." }
  ]
};

worksheetDefinitions["comprehensive-rewrite"] = {
  label: "書き換え⑧ 総合演習",
  title: "書き換え⑧　総合演習",
  instruction: "次の2文がほぼ同じ意味になるように、空欄に適する語句を書きなさい。①動詞⇄名詞、②there is/are⇄have/has、③感情表現、④状態表現、⑤能動態⇄受動態、⑥最上級⇄比較級、⑦最上級⇄原級のどの書き換えが必要かを判断し、意味・時制・比較範囲を保ちなさい。",
  answerNote: "総合演習では、まず主となる書き換え操作を見抜きます。1問につき主変換は原則1つとし、時制・否定・副詞・比較範囲などの情報も保ちます。",
  type: "english-rewrite",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "書き換え①〜④を中心に、基本的な態・比較も含めて変換パターンを見分けます。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "書き換え①〜⑦を混合し、どの操作を使うか判断して意味を保って書き換えます。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "現在完了・過去完了・否定・長い修飾語を含む文で、主変換と付随情報を正確に処理します。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト上位程度。長い名詞句や節を含む文から主変換を自力で見抜き、意味・時制・比較範囲を崩さずに書き換えます。" }
  }
};

const superlativePositiveRewriteOptionV22 = worksheetTypeSelect.querySelector('option[value="superlative-positive-rewrite"]');
if (superlativePositiveRewriteOptionV22 && !worksheetTypeSelect.querySelector('option[value="comprehensive-rewrite"]')) {
  const option = document.createElement("option");
  option.value = "comprehensive-rewrite";
  option.textContent = "書き換え⑧ 総合演習";
  superlativePositiveRewriteOptionV22.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV22Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV22ComprehensiveRewrite() {
  if (worksheetTypeSelect.value === "comprehensive-rewrite") return comprehensiveRewriteQuestions[difficultySelect.value];
  return buildQuestionPoolV22Previous();
};

syncDifficultyOptions();
updateControls();
