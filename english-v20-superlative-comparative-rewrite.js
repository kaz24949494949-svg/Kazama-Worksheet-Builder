"use strict";

// Rewrite 6: superlative <-> comparative.
const superlativeComparativeRewriteQuestions = {
  basic: [
    { source: "Ken is the tallest boy in his class.", prompt: "Ken is（　　　）（　　　）boy in his class.", blanks: "taller than / any other", answer: "Ken is taller than any other boy in his class." },
    { source: "Mt. Fuji is the highest mountain in Japan.", prompt: "Mt. Fuji is（　　　）（　　　）mountain in Japan.", blanks: "higher than / any other", answer: "Mt. Fuji is higher than any other mountain in Japan." },
    { source: "This is the largest room in the house.", prompt: "This room is（　　　）（　　　）room in the house.", blanks: "larger than / any other", answer: "This room is larger than any other room in the house." },
    { source: "Aya is the fastest runner on the team.", prompt: "Aya runs（　　　）（　　　）runner on the team.", blanks: "faster than / any other", answer: "Aya runs faster than any other runner on the team." },
    { source: "Lake Biwa is the largest lake in Japan.", prompt: "Lake Biwa is（　　　）（　　　）lake in Japan.", blanks: "larger than / any other", answer: "Lake Biwa is larger than any other lake in Japan." },
    { source: "Tom is older than any other student in the group.", prompt: "Tom is（　　　）（　　　）student in the group.", blanks: "the oldest / student", answer: "Tom is the oldest student in the group." },
    { source: "This book is more expensive than any other book on the shelf.", prompt: "This is（　　　）（　　　）on the shelf.", blanks: "the most expensive / book", answer: "This is the most expensive book on the shelf." },
    { source: "Mika speaks English more clearly than any other student in her class.", prompt: "Mika speaks English（　　　）（　　　）in her class.", blanks: "the most clearly / of all the students", answer: "Mika speaks English the most clearly of all the students in her class." },
    { source: "This train is faster than any other train on this line.", prompt: "This is（　　　）（　　　）on this line.", blanks: "the fastest / train", answer: "This is the fastest train on this line." },
    { source: "Rina is more careful than any other member of the group.", prompt: "Rina is（　　　）（　　　）of the group.", blanks: "the most careful / member", answer: "Rina is the most careful member of the group." },
    { source: "That building is the oldest building in this town.", prompt: "That building is（　　　）（　　　）building in this town.", blanks: "older than / any other", answer: "That building is older than any other building in this town." },
    { source: "This question is more difficult than any other question on the test.", prompt: "This is（　　　）（　　　）on the test.", blanks: "the most difficult / question", answer: "This is the most difficult question on the test." }
  ],
  standard: [
    { source: "Emma is the best singer in the school choir.", prompt: "Emma sings（　　　）（　　　）singer in the school choir.", blanks: "better than / any other", answer: "Emma sings better than any other singer in the school choir." },
    { source: "This was the worst storm of the year.", prompt: "This storm was（　　　）（　　　）storm this year.", blanks: "worse than / any other", answer: "This storm was worse than any other storm this year." },
    { source: "The blue route is the shortest of the three routes.", prompt: "The blue route is（　　　）（　　　）of the other two routes.", blanks: "shorter than / either", answer: "The blue route is shorter than either of the other two routes." },
    { source: "This solution is the simplest of all the proposed solutions.", prompt: "This solution is（　　　）（　　　）proposed solution.", blanks: "simpler than / any other", answer: "This solution is simpler than any other proposed solution." },
    { source: "The morning flight is the most convenient flight for us.", prompt: "The morning flight is（　　　）（　　　）flight for us.", blanks: "more convenient than / any other", answer: "The morning flight is more convenient than any other flight for us." },
    { source: "Sara solved the problem more quickly than any other student in the class.", prompt: "Sara solved the problem（　　　）（　　　）in the class.", blanks: "the most quickly / of all the students", answer: "Sara solved the problem the most quickly of all the students in the class." },
    { source: "This hotel is more comfortable than any other hotel in the area.", prompt: "This is（　　　）（　　　）in the area.", blanks: "the most comfortable / hotel", answer: "This is the most comfortable hotel in the area." },
    { source: "The final chapter is more interesting than any other chapter in the book.", prompt: "The final chapter is（　　　）（　　　）in the book.", blanks: "the most interesting / chapter", answer: "The final chapter is the most interesting chapter in the book." },
    { source: "Yuki made fewer mistakes than any other student in the class.", prompt: "Yuki made（　　　）（　　　）in the class.", blanks: "the fewest mistakes / of all the students", answer: "Yuki made the fewest mistakes of all the students in the class." },
    { source: "This option costs less than any other option on the list.", prompt: "This is（　　　）（　　　）on the list.", blanks: "the least expensive / option", answer: "This is the least expensive option on the list." },
    { source: "The north entrance is the least crowded entrance in the stadium.", prompt: "The north entrance is（　　　）（　　　）entrance in the stadium.", blanks: "less crowded than / any other", answer: "The north entrance is less crowded than any other entrance in the stadium." },
    { source: "Daniel performed better than any other player on the team.", prompt: "Daniel performed（　　　）（　　　）on the team.", blanks: "the best / of all the players", answer: "Daniel performed the best of all the players on the team." }
  ],
  advanced: [
    { source: "The new bridge is the longest bridge that the city has ever built.", prompt: "The new bridge is（　　　）（　　　）bridge that the city has ever built.", blanks: "longer than / any other", answer: "The new bridge is longer than any other bridge that the city has ever built." },
    { source: "Of all the proposals submitted this year, this one is the most practical.", prompt: "This proposal is（　　　）（　　　）proposal submitted this year.", blanks: "more practical than / any other", answer: "This proposal is more practical than any other proposal submitted this year." },
    { source: "The latest model uses less energy than any other model in the series.", prompt: "The latest model uses（　　　）（　　　）in the series.", blanks: "the least energy / of all the models", answer: "The latest model uses the least energy of all the models in the series." },
    { source: "The redwood is taller than any other tree in this part of the forest.", prompt: "The redwood is（　　　）（　　　）in this part of the forest.", blanks: "the tallest / tree", answer: "The redwood is the tallest tree in this part of the forest." },
    { source: "The final experiment produced the most reliable results of all the experiments in the study.", prompt: "The final experiment produced（　　　）（　　　）experiment in the study.", blanks: "more reliable results than / any other", answer: "The final experiment produced more reliable results than any other experiment in the study." },
    { source: "This district has the lowest population density in the city.", prompt: "This district has（　　　）（　　　）district in the city.", blanks: "a lower population density than / any other", answer: "This district has a lower population density than any other district in the city." },
    { source: "The research team completed the task more efficiently than any other team involved in the project.", prompt: "The research team completed the task（　　　）（　　　）involved in the project.", blanks: "the most efficiently / of all the teams", answer: "The research team completed the task the most efficiently of all the teams involved in the project." },
    { source: "The revised method is the least complicated method described in the report.", prompt: "The revised method is（　　　）（　　　）method described in the report.", blanks: "less complicated than / any other", answer: "The revised method is less complicated than any other method described in the report." },
    { source: "No other section of the report contains more detailed data than the appendix.", prompt: "The appendix contains（　　　）（　　　）in the report.", blanks: "the most detailed data / of all the sections", answer: "The appendix contains the most detailed data of all the sections in the report." },
    { source: "The Pacific Ocean is larger than any other ocean on Earth.", prompt: "The Pacific Ocean is（　　　）（　　　）on Earth.", blanks: "the largest / ocean", answer: "The Pacific Ocean is the largest ocean on Earth." },
    { source: "This year's attendance was higher than that of any other year in the past decade.", prompt: "This year's attendance was（　　　）（　　　）in the past decade.", blanks: "the highest / of any year", answer: "This year's attendance was the highest of any year in the past decade." },
    { source: "The Nile is longer than any river in Japan.", prompt: "The Nile is（　　　）（　　　）river in Japan.", blanks: "longer than / the longest", answer: "The Nile is longer than the longest river in Japan." }
  ],
  hard: [
    { source: "Among all the candidates interviewed for the position, Ms. Lee had the most extensive experience.", prompt: "Ms. Lee had（　　　）（　　　）candidate interviewed for the position.", blanks: "more extensive experience than / any other", answer: "Ms. Lee had more extensive experience than any other candidate interviewed for the position." },
    { source: "The final version was more accurate than any other version produced during the project.", prompt: "The final version was（　　　）（　　　）produced during the project.", blanks: "the most accurate / version", answer: "The final version was the most accurate version produced during the project." },
    { source: "The southern route requires less time than any other route currently available.", prompt: "The southern route requires（　　　）（　　　）currently available.", blanks: "the least time / of all the routes", answer: "The southern route requires the least time of all the routes currently available." },
    { source: "The report published in May attracted more public attention than any other report released by the agency that year.", prompt: "The report published in May attracted（　　　）（　　　）released by the agency that year.", blanks: "the most public attention / of all the reports", answer: "The report published in May attracted the most public attention of all the reports released by the agency that year." },
    { source: "Of all the factors examined in the study, access to reliable information had the strongest effect on the outcome.", prompt: "Access to reliable information had（　　　）（　　　）factor examined in the study.", blanks: "a stronger effect than / any other", answer: "Access to reliable information had a stronger effect than any other factor examined in the study." },
    { source: "The device tested under the new conditions performed more consistently than any other device in the trial.", prompt: "The device tested under the new conditions performed（　　　）（　　　）in the trial.", blanks: "the most consistently / of all the devices", answer: "The device tested under the new conditions performed the most consistently of all the devices in the trial." },
    { source: "The oldest document in the archive is older than any other document that has been preserved there.", prompt: "The oldest document in the archive is（　　　）（　　　）that has been preserved there.", blanks: "the oldest / document", answer: "The oldest document in the archive is the oldest document that has been preserved there." },
    { source: "The revised procedure produced fewer errors than any other procedure evaluated by the committee.", prompt: "The revised procedure produced（　　　）（　　　）evaluated by the committee.", blanks: "the fewest errors / of all the procedures", answer: "The revised procedure produced the fewest errors of all the procedures evaluated by the committee." },
    { source: "This region experienced the most severe decline in population of all the regions included in the survey.", prompt: "This region experienced（　　　）（　　　）region included in the survey.", blanks: "a more severe decline in population than / any other", answer: "This region experienced a more severe decline in population than any other region included in the survey." },
    { source: "The current system is less flexible than the most flexible system used by any of the neighboring institutions.", prompt: "The current system is（　　　）（　　　）system used by any of the neighboring institutions.", blanks: "less flexible than / the most flexible", answer: "The current system is less flexible than the most flexible system used by any of the neighboring institutions." },
    { source: "The latest survey recorded a higher response rate than any other survey conducted by the organization in the past five years.", prompt: "The latest survey recorded（　　　）（　　　）conducted by the organization in the past five years.", blanks: "the highest response rate / of all the surveys", answer: "The latest survey recorded the highest response rate of all the surveys conducted by the organization in the past five years." },
    { source: "The new material is stronger than any material previously used by the company.", prompt: "The new material is（　　　）（　　　）previously used by the company.", blanks: "stronger than / the strongest material", answer: "The new material is stronger than the strongest material previously used by the company." }
  ]
};

worksheetDefinitions["superlative-comparative-rewrite"] = {
  label: "書き換え⑥ 最上級 ⇄ 比較級",
  title: "書き換え⑥　最上級 ⇄ 比較級",
  instruction: "次の2文がほぼ同じ意味になるように、空欄に適する語句を書きなさい。比較する範囲、最上級と比較級の形、any other＋単数名詞と any＋名詞の使い分けに注意しなさい。",
  answerNote: "最上級⇄比較級では、主語が同じ比較集団に含まれるときは than any other＋単数名詞を基本にします。主語が比較集団の外にある場合は other を付けず、必要に応じて the＋最上級を比較対象として表します。",
  type: "english-rewrite",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "tall・high・large・fast・difficultなどを使い、the＋最上級 ⇄ 比較級＋than any other の基本を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "good・bad・few・littleや副詞の比較を加え、比較する範囲と語形を正確に対応させます。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "長い修飾語、数量表現、least・fewest、比較集団の内外を含む文で意味を保って書き換えます。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト上位程度。長い名詞句や関係節を含む文で、比較範囲と修飾関係を崩さずに変換します。" }
  }
};

const activePassiveRewriteOptionV20 = worksheetTypeSelect.querySelector('option[value="active-passive-rewrite"]');
if (activePassiveRewriteOptionV20 && !worksheetTypeSelect.querySelector('option[value="superlative-comparative-rewrite"]')) {
  const option = document.createElement("option");
  option.value = "superlative-comparative-rewrite";
  option.textContent = "書き換え⑥ 最上級 ⇄ 比較級";
  activePassiveRewriteOptionV20.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV20Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV20SuperlativeComparativeRewrite() {
  if (worksheetTypeSelect.value === "superlative-comparative-rewrite") return superlativeComparativeRewriteQuestions[difficultySelect.value];
  return buildQuestionPoolV20Previous();
};

syncDifficultyOptions();
updateControls();
