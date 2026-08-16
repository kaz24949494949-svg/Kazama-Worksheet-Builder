"use strict";

// Rewrite 7: superlative <-> positive degree (as ... as).
const superlativePositiveRewriteQuestions = {
  basic: [
    { source: "Ken is the tallest boy in his class.", prompt: "No other boy in his class is（　　　）（　　　）Ken.", blanks: "as tall / as", answer: "No other boy in his class is as tall as Ken." },
    { source: "Mt. Fuji is the highest mountain in Japan.", prompt: "No other mountain in Japan is（　　　）（　　　）Mt. Fuji.", blanks: "as high / as", answer: "No other mountain in Japan is as high as Mt. Fuji." },
    { source: "This is the largest room in the house.", prompt: "No other room in the house is（　　　）（　　　）this one.", blanks: "as large / as", answer: "No other room in the house is as large as this one." },
    { source: "Aya runs the fastest on the team.", prompt: "No other runner on the team runs（　　　）（　　　）Aya.", blanks: "as fast / as", answer: "No other runner on the team runs as fast as Aya." },
    { source: "That building is the oldest building in this town.", prompt: "No other building in this town is（　　　）（　　　）that building.", blanks: "as old / as", answer: "No other building in this town is as old as that building." },
    { source: "No other lake in Japan is as large as Lake Biwa.", prompt: "Lake Biwa is（　　　）（　　　）in Japan.", blanks: "the largest / lake", answer: "Lake Biwa is the largest lake in Japan." },
    { source: "No other train on this line is as fast as this train.", prompt: "This is（　　　）（　　　）on this line.", blanks: "the fastest / train", answer: "This is the fastest train on this line." },
    { source: "No other question on the test is as difficult as this one.", prompt: "This is（　　　）（　　　）on the test.", blanks: "the most difficult / question", answer: "This is the most difficult question on the test." },
    { source: "No other member of the group is as careful as Rina.", prompt: "Rina is（　　　）（　　　）of the group.", blanks: "the most careful / member", answer: "Rina is the most careful member of the group." },
    { source: "No other student in her class speaks English as clearly as Mika.", prompt: "Mika speaks English（　　　）（　　　）in her class.", blanks: "the most clearly / of all the students", answer: "Mika speaks English the most clearly of all the students in her class." },
    { source: "No other book on the shelf is as expensive as this one.", prompt: "This is（　　　）（　　　）on the shelf.", blanks: "the most expensive / book", answer: "This is the most expensive book on the shelf." },
    { source: "No other student in the group is as old as Tom.", prompt: "Tom is（　　　）（　　　）student in the group.", blanks: "the oldest / student", answer: "Tom is the oldest student in the group." }
  ],
  standard: [
    { source: "Emma sings the best in the school choir.", prompt: "No other singer in the school choir sings（　　　）（　　　）Emma.", blanks: "as well / as", answer: "No other singer in the school choir sings as well as Emma." },
    { source: "This was the worst storm of the year.", prompt: "No other storm that year was（　　　）（　　　）this one.", blanks: "as bad / as", answer: "No other storm that year was as bad as this one." },
    { source: "The blue route is the shortest of the three routes.", prompt: "Neither of the other two routes is（　　　）（　　　）the blue route.", blanks: "as short / as", answer: "Neither of the other two routes is as short as the blue route." },
    { source: "This solution is the simplest of all the proposed solutions.", prompt: "No other proposed solution is（　　　）（　　　）this one.", blanks: "as simple / as", answer: "No other proposed solution is as simple as this one." },
    { source: "The morning flight is the most convenient flight for us.", prompt: "No other flight is（　　　）（　　　）the morning flight for us.", blanks: "as convenient / as", answer: "No other flight is as convenient as the morning flight for us." },
    { source: "Sara solved the problem the most quickly in the class.", prompt: "No other student in the class solved the problem（　　　）（　　　）Sara.", blanks: "as quickly / as", answer: "No other student in the class solved the problem as quickly as Sara." },
    { source: "Yuki made the fewest mistakes in the class.", prompt: "No other student in the class made（　　　）（　　　）Yuki.", blanks: "as few mistakes / as", answer: "No other student in the class made as few mistakes as Yuki." },
    { source: "Daniel performed the best on the team.", prompt: "No other player on the team performed（　　　）（　　　）Daniel.", blanks: "as well / as", answer: "No other player on the team performed as well as Daniel." },
    { source: "This hotel is the most comfortable hotel in the area.", prompt: "No other hotel in the area is（　　　）（　　　）this hotel.", blanks: "as comfortable / as", answer: "No other hotel in the area is as comfortable as this hotel." },
    { source: "The final chapter is the most interesting chapter in the book.", prompt: "No other chapter in the book is（　　　）（　　　）the final chapter.", blanks: "as interesting / as", answer: "No other chapter in the book is as interesting as the final chapter." },
    { source: "No other entrance in the stadium is as wide as the east entrance.", prompt: "The east entrance is（　　　）（　　　）in the stadium.", blanks: "the widest / entrance", answer: "The east entrance is the widest entrance in the stadium." },
    { source: "No other student in the class answered as accurately as Mei.", prompt: "Mei answered（　　　）（　　　）in the class.", blanks: "the most accurately / of all the students", answer: "Mei answered the most accurately of all the students in the class." }
  ],
  advanced: [
    { source: "The new bridge is the longest bridge that the city has ever built.", prompt: "No other bridge that the city has ever built is（　　　）（　　　）the new bridge.", blanks: "as long / as", answer: "No other bridge that the city has ever built is as long as the new bridge." },
    { source: "Of all the proposals submitted this year, this one is the most practical.", prompt: "No other proposal submitted this year is（　　　）（　　　）this one.", blanks: "as practical / as", answer: "No other proposal submitted this year is as practical as this one." },
    { source: "The latest model uses the least energy of all the models in the series.", prompt: "No other model in the series uses（　　　）（　　　）the latest model.", blanks: "as little energy / as", answer: "No other model in the series uses as little energy as the latest model." },
    { source: "The redwood is the tallest tree in this part of the forest.", prompt: "No other tree in this part of the forest is（　　　）（　　　）the redwood.", blanks: "as tall / as", answer: "No other tree in this part of the forest is as tall as the redwood." },
    { source: "The final experiment produced the most reliable results in the study.", prompt: "No other experiment in the study produced results（　　　）（　　　）those of the final experiment.", blanks: "as reliable / as", answer: "No other experiment in the study produced results as reliable as those of the final experiment." },
    { source: "This district has the lowest population density in the city.", prompt: "No other district in the city has（　　　）（　　　）this district.", blanks: "as low a population density / as", answer: "No other district in the city has as low a population density as this district." },
    { source: "The research team completed the task the most efficiently of all the teams involved in the project.", prompt: "No other team involved in the project completed the task（　　　）（　　　）the research team.", blanks: "as efficiently / as", answer: "No other team involved in the project completed the task as efficiently as the research team." },
    { source: "The appendix contains the most detailed information of all the sections in the report.", prompt: "No other section in the report contains information（　　　）（　　　）the information in the appendix.", blanks: "as detailed / as", answer: "No other section in the report contains information as detailed as the information in the appendix." },
    { source: "The Pacific Ocean is the largest ocean on Earth.", prompt: "No other ocean on Earth is（　　　）（　　　）the Pacific Ocean.", blanks: "as large / as", answer: "No other ocean on Earth is as large as the Pacific Ocean." },
    { source: "This year's attendance was the highest in the past decade.", prompt: "Attendance in no other year in the past decade was（　　　）（　　　）this year's.", blanks: "as high / as", answer: "Attendance in no other year in the past decade was as high as this year's." },
    { source: "The eastern route is the longest route currently open to traffic.", prompt: "No other route currently open to traffic is（　　　）（　　　）the eastern route.", blanks: "as long / as", answer: "No other route currently open to traffic is as long as the eastern route." },
    { source: "No other method described in the report is as accurate as the revised method.", prompt: "The revised method is（　　　）（　　　）described in the report.", blanks: "the most accurate / method", answer: "The revised method is the most accurate method described in the report." }
  ],
  hard: [
    { source: "Among all the candidates interviewed for the position, Ms. Lee had the most extensive experience.", prompt: "No other candidate interviewed for the position had experience（　　　）（　　　）Ms. Lee's.", blanks: "as extensive / as", answer: "No other candidate interviewed for the position had experience as extensive as Ms. Lee's." },
    { source: "The final version was the most accurate version produced during the project.", prompt: "No other version produced during the project was（　　　）（　　　）the final version.", blanks: "as accurate / as", answer: "No other version produced during the project was as accurate as the final version." },
    { source: "The southern route requires the least time of all the routes currently available.", prompt: "No other route currently available requires（　　　）（　　　）the southern route.", blanks: "as little time / as", answer: "No other route currently available requires as little time as the southern route." },
    { source: "The report published in May attracted the most public attention of all the reports released by the agency that year.", prompt: "No other report released by the agency that year attracted（　　　）（　　　）the report published in May.", blanks: "as much public attention / as", answer: "No other report released by the agency that year attracted as much public attention as the report published in May." },
    { source: "Of all the factors examined in the study, access to reliable information had the strongest effect on the outcome.", prompt: "No other factor examined in the study had（　　　）（　　　）access to reliable information.", blanks: "as strong an effect on the outcome / as", answer: "No other factor examined in the study had as strong an effect on the outcome as access to reliable information." },
    { source: "The device tested under the new conditions performed the most consistently of all the devices in the trial.", prompt: "No other device in the trial performed（　　　）（　　　）the device tested under the new conditions.", blanks: "as consistently / as", answer: "No other device in the trial performed as consistently as the device tested under the new conditions." },
    { source: "This manuscript is the oldest document preserved in the archive.", prompt: "No other document preserved in the archive is（　　　）（　　　）this manuscript.", blanks: "as old / as", answer: "No other document preserved in the archive is as old as this manuscript." },
    { source: "The revised procedure produced the fewest errors of all the procedures evaluated by the committee.", prompt: "No other procedure evaluated by the committee produced（　　　）（　　　）the revised procedure.", blanks: "as few errors / as", answer: "No other procedure evaluated by the committee produced as few errors as the revised procedure." },
    { source: "This region experienced the most severe decline in population of all the regions included in the survey.", prompt: "No other region included in the survey experienced a decline in population（　　　）（　　　）.", blanks: "as severe as / this region's", answer: "No other region included in the survey experienced a decline in population as severe as this region's." },
    { source: "Her score was the highest recorded in the current group.", prompt: "No other score recorded in the current group was（　　　）（　　　）hers.", blanks: "as high / as", answer: "No other score recorded in the current group was as high as hers." },
    { source: "The latest survey recorded the highest response rate of all the surveys conducted by the organization in the past five years.", prompt: "No other survey conducted by the organization in the past five years recorded（　　　）（　　　）the latest survey did.", blanks: "as high a response rate / as", answer: "No other survey conducted by the organization in the past five years recorded as high a response rate as the latest survey did." },
    { source: "The new material is the strongest material the company has ever used.", prompt: "No other material the company has ever used is（　　　）（　　　）the new material.", blanks: "as strong / as", answer: "No other material the company has ever used is as strong as the new material." }
  ]
};

worksheetDefinitions["superlative-positive-rewrite"] = {
  label: "書き換え⑦ 最上級 ⇄ 原級",
  title: "書き換え⑦　最上級 ⇄ 原級",
  instruction: "次の2文がほぼ同じ意味になるように、空欄に適する語句を書きなさい。the＋最上級と No other ... as＋原級＋as ... の対応、比較する範囲、数量表現に注意しなさい。",
  answerNote: "最上級⇄原級では、同じ比較集団の中で the＋最上級 ⇄ No other＋単数名詞＋... as＋原級＋as ... を基本にします。数量では as much / as little / as many / as few などを使います。",
  type: "english-rewrite",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "tall・high・large・fast・oldなどを使い、the＋最上級 ⇄ No other ... as＋原級＋as ... の基本を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "good・bad・fewや副詞を加え、as well as・as few ... as などの形も扱います。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "長い修飾語、数量表現、as low a ... as、限定された比較範囲を含む文で意味を保って書き換えます。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト上位程度。長い名詞句、関係節、数量・程度表現を含む文で比較範囲を崩さずに変換します。" }
  }
};

const superlativeComparativeRewriteOptionV21 = worksheetTypeSelect.querySelector('option[value="superlative-comparative-rewrite"]');
if (superlativeComparativeRewriteOptionV21 && !worksheetTypeSelect.querySelector('option[value="superlative-positive-rewrite"]')) {
  const option = document.createElement("option");
  option.value = "superlative-positive-rewrite";
  option.textContent = "書き換え⑦ 最上級 ⇄ 原級";
  superlativeComparativeRewriteOptionV21.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV21Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV21SuperlativePositiveRewrite() {
  if (worksheetTypeSelect.value === "superlative-positive-rewrite") return superlativePositiveRewriteQuestions[difficultySelect.value];
  return buildQuestionPoolV21Previous();
};

syncDifficultyOptions();
updateControls();
