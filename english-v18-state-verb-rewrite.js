"use strict";

// Rewrite 4: be + state expression <-> general verb.
const stateVerbRewriteQuestions = {
  basic: [
    { source: "This design resembles the old model.", prompt: "This design（　　　）（　　　）the old model.", blanks: "is similar / to", answer: "This design is similar to the old model." },
    { source: "My answer is different from yours.", prompt: "My answer（　　　）（　　　）yours.", blanks: "differs / from", answer: "My answer differs from yours." },
    { source: "The result depends on the weather.", prompt: "The result（　　　）（　　　）the weather.", blanks: "is dependent / on", answer: "The result is dependent on the weather." },
    { source: "This amount is equal to fifty dollars.", prompt: "This amount（　　　）（　　　）dollars.", blanks: "equals / fifty", answer: "This amount equals fifty dollars." },
    { source: "The plan lacks detail.", prompt: "The plan（　　　）（　　　）detail.", blanks: "is lacking / in", answer: "The plan is lacking in detail." },
    { source: "Many residents oppose the proposal.", prompt: "Many residents（　　　）（　　　）the proposal.", blanks: "are opposed / to", answer: "Many residents are opposed to the proposal." },
    { source: "This picture is similar to that one.", prompt: "This picture（　　　）（　　　）one.", blanks: "resembles / that", answer: "This picture resembles that one." },
    { source: "Her opinion differs from mine.", prompt: "Her opinion（　　　）（　　　）mine.", blanks: "is different / from", answer: "Her opinion is different from mine." },
    { source: "Our success is dependent on careful planning.", prompt: "Our success（　　　）（　　　）careful planning.", blanks: "depends / on", answer: "Our success depends on careful planning." },
    { source: "The total cost equals the budget.", prompt: "The total cost（　　　）（　　　）the budget.", blanks: "is equal / to", answer: "The total cost is equal to the budget." },
    { source: "The report is lacking in evidence.", prompt: "The report（　　　）（　　　）.", blanks: "lacks / evidence", answer: "The report lacks evidence." },
    { source: "The students are opposed to the new rule.", prompt: "The students（　　　）（　　　）new rule.", blanks: "oppose / the", answer: "The students oppose the new rule." }
  ],
  standard: [
    { source: "The new machine resembles the earlier model in many ways.", prompt: "The new machine（　　　）（　　　）the earlier model in many ways.", blanks: "is similar / to", answer: "The new machine is similar to the earlier model in many ways." },
    { source: "The current method is different from the previous one.", prompt: "The current method（　　　）（　　　）the previous one.", blanks: "differs / from", answer: "The current method differs from the previous one." },
    { source: "The final outcome depends heavily on timing.", prompt: "The final outcome（　　　）（　　　）timing.", blanks: "is heavily dependent / on", answer: "The final outcome is heavily dependent on timing." },
    { source: "The value is equal to the total from last year.", prompt: "The value（　　　）（　　　）total from last year.", blanks: "equals / the", answer: "The value equals the total from last year." },
    { source: "The proposal lacks practical details.", prompt: "The proposal（　　　）（　　　）practical details.", blanks: "is lacking / in", answer: "The proposal is lacking in practical details." },
    { source: "Local groups are strongly opposed to the plan.", prompt: "Local groups（　　　）（　　　）plan.", blanks: "strongly oppose / the", answer: "Local groups strongly oppose the plan." },
    { source: "These signs are indicative of serious damage.", prompt: "These signs（　　　）（　　　）damage.", blanks: "indicate / serious", answer: "These signs indicate serious damage." },
    { source: "High humidity is characteristic of this climate.", prompt: "High humidity（　　　）（　　　）climate.", blanks: "characterizes / this", answer: "High humidity characterizes this climate." },
    { source: "The results are reflective of broader social changes.", prompt: "The results（　　　）（　　　）social changes.", blanks: "reflect / broader", answer: "The results reflect broader social changes." },
    { source: "This chapter is concerned with the causes of the conflict.", prompt: "This chapter（　　　）（　　　）of the conflict.", blanks: "concerns / the causes", answer: "This chapter concerns the causes of the conflict." },
    { source: "The committee is composed of eight experts.", prompt: "The committee（　　　）（　　　）eight experts.", blanks: "consists / of", answer: "The committee consists of eight experts." },
    { source: "The system consists of three main stages.", prompt: "The system（　　　）（　　　）three main stages.", blanks: "is composed / of", answer: "The system is composed of three main stages." }
  ],
  advanced: [
    { source: "The revised design was similar to the earlier version in several respects.", prompt: "The revised design（　　　）（　　　）earlier version in several respects.", blanks: "resembled / the", answer: "The revised design resembled the earlier version in several respects." },
    { source: "The actual results differed significantly from the original predictions.", prompt: "The actual results（　　　）（　　　）the original predictions.", blanks: "were significantly different / from", answer: "The actual results were significantly different from the original predictions." },
    { source: "The city's economy had long been dependent on tourism.", prompt: "The city's economy（　　　）（　　　）tourism.", blanks: "had long depended / on", answer: "The city's economy had long depended on tourism." },
    { source: "The new estimate was not equal to the combined figures.", prompt: "The new estimate（　　　）（　　　）combined figures.", blanks: "did not equal / the", answer: "The new estimate did not equal the combined figures." },
    { source: "The original report was seriously lacking in reliable evidence.", prompt: "The original report（　　　）（　　　）evidence.", blanks: "seriously lacked / reliable", answer: "The original report seriously lacked reliable evidence." },
    { source: "The committee was firmly opposed to changing the rule at that stage.", prompt: "The committee（　　　）（　　　）the rule at that stage.", blanks: "firmly opposed / changing", answer: "The committee firmly opposed changing the rule at that stage." },
    { source: "The sudden drop was indicative of a deeper problem in the system.", prompt: "The sudden drop（　　　）（　　　）problem in the system.", blanks: "indicated / a deeper", answer: "The sudden drop indicated a deeper problem in the system." },
    { source: "Frequent small errors are characteristic of early versions of the software.", prompt: "Frequent small errors（　　　）（　　　）versions of the software.", blanks: "characterize / early", answer: "Frequent small errors characterize early versions of the software." },
    { source: "The pattern reflected seasonal changes rather than a long-term trend.", prompt: "The pattern（　　　）（　　　）seasonal changes rather than a long-term trend.", blanks: "was reflective / of", answer: "The pattern was reflective of seasonal changes rather than a long-term trend." },
    { source: "The report is concerned mainly with how the policy affected smaller communities.", prompt: "The report（　　　）（　　　）how the policy affected smaller communities.", blanks: "mainly concerns /", answer: "The report mainly concerns how the policy affected smaller communities." },
    { source: "The panel had been composed of specialists from several fields.", prompt: "The panel（　　　）（　　　）specialists from several fields.", blanks: "had consisted / of", answer: "The panel had consisted of specialists from several fields." },
    { source: "The final model consists of components that can be replaced independently.", prompt: "The final model（　　　）（　　　）components that can be replaced independently.", blanks: "is composed / of", answer: "The final model is composed of components that can be replaced independently." }
  ],
  hard: [
    { source: "Although the revised framework is similar to the original one in overall structure, it differs in several important details.", prompt: "Although the revised framework（　　　）（　　　）original one in overall structure, it is different in several important details.", blanks: "resembles / the", answer: "Although the revised framework resembles the original one in overall structure, it is different in several important details." },
    { source: "Whether the plan succeeds is heavily dependent on cooperation among several independent agencies.", prompt: "Whether the plan succeeds（　　　）（　　　）cooperation among several independent agencies.", blanks: "depends heavily / on", answer: "Whether the plan succeeds depends heavily on cooperation among several independent agencies." },
    { source: "The amount recorded in the final report was not equal to the sum of the individual figures.", prompt: "The amount recorded in the final report（　　　）（　　　）sum of the individual figures.", blanks: "did not equal / the", answer: "The amount recorded in the final report did not equal the sum of the individual figures." },
    { source: "The explanation offered by the agency was lacking in the specific evidence needed to support its conclusion.", prompt: "The explanation offered by the agency（　　　）（　　　）specific evidence needed to support its conclusion.", blanks: "lacked / the", answer: "The explanation offered by the agency lacked the specific evidence needed to support its conclusion." },
    { source: "The evidence presented at the hearing is strongly indicative of a broader failure in the system.", prompt: "The evidence presented at the hearing（　　　）（　　　）broader failure in the system.", blanks: "strongly indicates / a", answer: "The evidence presented at the hearing strongly indicates a broader failure in the system." },
    { source: "A high degree of seasonal variation is characteristic of the region's energy demand.", prompt: "A high degree of seasonal variation（　　　）（　　　）region's energy demand.", blanks: "characterizes / the", answer: "A high degree of seasonal variation characterizes the region's energy demand." },
    { source: "The conclusions are broadly reflective of the changes observed across the entire survey period.", prompt: "The conclusions（　　　）（　　　）changes observed across the entire survey period.", blanks: "broadly reflect / the", answer: "The conclusions broadly reflect the changes observed across the entire survey period." },
    { source: "The final section is concerned primarily with the long-term effects that were not considered in the original proposal.", prompt: "The final section（　　　）（　　　）the long-term effects that were not considered in the original proposal.", blanks: "primarily concerns /", answer: "The final section primarily concerns the long-term effects that were not considered in the original proposal." },
    { source: "The advisory group is composed of researchers whose work covers several different areas of public policy.", prompt: "The advisory group（　　　）（　　　）researchers whose work covers several different areas of public policy.", blanks: "consists / of", answer: "The advisory group consists of researchers whose work covers several different areas of public policy." },
    { source: "The response of younger participants differed markedly from that of the older age groups.", prompt: "The response of younger participants（　　　）（　　　）that of the older age groups.", blanks: "was markedly different / from", answer: "The response of younger participants was markedly different from that of the older age groups." },
    { source: "The long-term stability of the system is dependent on whether replacement parts remain available.", prompt: "The long-term stability of the system（　　　）（　　　）whether replacement parts remain available.", blanks: "depends / on", answer: "The long-term stability of the system depends on whether replacement parts remain available." },
    { source: "Several features of the revised procedure are characteristic of approaches used in other countries.", prompt: "Several features of the revised procedure（　　　）（　　　）used in other countries.", blanks: "characterize / approaches", answer: "Several features of the revised procedure characterize approaches used in other countries." }
  ]
};

worksheetDefinitions["state-verb-rewrite"] = {
  label: "書き換え④ 状態表現 ⇄ 一般動詞",
  title: "書き換え④　状態表現（be＋過去分詞・形容詞）⇄ 一般動詞",
  instruction: "次の2文がほぼ同じ意味になるように、空欄に適する語句を書きなさい。状態を表す be＋過去分詞・形容詞と一般動詞の対応、前置詞、時制、修飾語に注意しなさい。",
  answerNote: "状態表現の書き換えでは、意味・時制・程度を保ちながら、be similar to ⇄ resemble、be different from ⇄ differ from、be dependent on ⇄ depend on などを対応させます。",
  type: "english-rewrite",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "similar・different・dependent・equal・lacking・opposedなど、基本的な状態表現と一般動詞の対応を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "indicative・characteristic・reflective・concerned・composedなども加え、前置詞と意味関係を正確に対応させます。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "過去形・完了形・否定・程度副詞・長い修飾語を含む文でも、状態と一般動詞の意味を保ちます。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト上位程度。節や長い修飾句を含む文で、状態・関係・程度・時制を崩さずに書き換えます。" }
  }
};

const emotionVerbRewriteOptionV18 = worksheetTypeSelect.querySelector('option[value="emotion-verb-rewrite"]');
if (emotionVerbRewriteOptionV18 && !worksheetTypeSelect.querySelector('option[value="state-verb-rewrite"]')) {
  const option = document.createElement("option");
  option.value = "state-verb-rewrite";
  option.textContent = "書き換え④ 状態表現 ⇄ 一般動詞";
  emotionVerbRewriteOptionV18.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV18Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV18StateVerbRewrite() {
  if (worksheetTypeSelect.value === "state-verb-rewrite") return stateVerbRewriteQuestions[difficultySelect.value];
  return buildQuestionPoolV18Previous();
};

syncDifficultyOptions();
updateControls();
