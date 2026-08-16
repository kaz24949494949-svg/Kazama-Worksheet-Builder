"use strict";

// Rewrite 2: there is/are <-> have/has rewriting worksheets.
const thereHaveRewriteQuestions = {
  basic: [
    { source: "The school has a large library.", prompt: "There（　　　）（　　　）large library at the school.", blanks: "is / a", answer: "There is a large library at the school." },
    { source: "The hotel has two restaurants.", prompt: "There（　　　）（　　　）restaurants at the hotel.", blanks: "are / two", answer: "There are two restaurants at the hotel." },
    { source: "The park has a small pond.", prompt: "There（　　　）（　　　）small pond in the park.", blanks: "is / a", answer: "There is a small pond in the park." },
    { source: "The town has three public libraries.", prompt: "There（　　　）（　　　）public libraries in the town.", blanks: "are / three", answer: "There are three public libraries in the town." },
    { source: "The building has an elevator.", prompt: "There（　　　）（　　　）elevator in the building.", blanks: "is / an", answer: "There is an elevator in the building." },
    { source: "The museum has many old paintings.", prompt: "There（　　　）（　　　）old paintings in the museum.", blanks: "are / many", answer: "There are many old paintings in the museum." },
    { source: "There is a large garden at the house.", prompt: "The house（　　　）（　　　）large garden.", blanks: "has / a", answer: "The house has a large garden." },
    { source: "There are four classrooms on the second floor.", prompt: "The second floor（　　　）（　　　）classrooms.", blanks: "has / four", answer: "The second floor has four classrooms." },
    { source: "There is a computer room in our school.", prompt: "Our school（　　　）（　　　）computer room.", blanks: "has / a", answer: "Our school has a computer room." },
    { source: "There are several shops in the station building.", prompt: "The station building（　　　）（　　　）shops.", blanks: "has / several", answer: "The station building has several shops." },
    { source: "There is a bus stop near the library.", prompt: "The library（　　　）（　　　）bus stop nearby.", blanks: "has / a", answer: "The library has a bus stop nearby." },
    { source: "There are many trees in this park.", prompt: "This park（　　　）（　　　）trees.", blanks: "has / many", answer: "This park has many trees." }
  ],
  standard: [
    { source: "The community center has a room for music practice.", prompt: "There（　　　）（　　　）for music practice in the community center.", blanks: "is / a room", answer: "There is a room for music practice in the community center." },
    { source: "The website has several pages for new users.", prompt: "There（　　　）（　　　）for new users on the website.", blanks: "are / several pages", answer: "There are several pages for new users on the website." },
    { source: "The city has a large stadium near the river.", prompt: "There（　　　）（　　　）large stadium near the river in the city.", blanks: "is / a", answer: "There is a large stadium near the river in the city." },
    { source: "The textbook has twelve chapters.", prompt: "There（　　　）（　　　）chapters in the textbook.", blanks: "are / twelve", answer: "There are twelve chapters in the textbook." },
    { source: "The apartment has two bedrooms and a small balcony.", prompt: "There（　　　）（　　　）bedrooms and a small balcony in the apartment.", blanks: "are / two", answer: "There are two bedrooms and a small balcony in the apartment." },
    { source: "The island has no airport.", prompt: "There（　　　）（　　　）airport on the island.", blanks: "is / no", answer: "There is no airport on the island." },
    { source: "There is a special section for children in the library.", prompt: "The library（　　　）（　　　）special section for children.", blanks: "has / a", answer: "The library has a special section for children." },
    { source: "There are five members on the planning committee.", prompt: "The planning committee（　　　）（　　　）members.", blanks: "has / five", answer: "The planning committee has five members." },
    { source: "There is no parking area at the clinic.", prompt: "The clinic（　　　）（　　　）parking area.", blanks: "has / no", answer: "The clinic has no parking area." },
    { source: "There are several examples in the final section of the chapter.", prompt: "The final section of the chapter（　　　）（　　　）examples.", blanks: "has / several", answer: "The final section of the chapter has several examples." },
    { source: "There is a small kitchen next to the meeting room.", prompt: "The meeting room（　　　）（　　　）small kitchen next to it.", blanks: "has / a", answer: "The meeting room has a small kitchen next to it." },
    { source: "There are many useful features in the new app.", prompt: "The new app（　　　）（　　　）useful features.", blanks: "has / many", answer: "The new app has many useful features." }
  ],
  advanced: [
    { source: "The research center has three laboratories equipped for chemical analysis.", prompt: "There（　　　）（　　　）laboratories equipped for chemical analysis at the research center.", blanks: "are / three", answer: "There are three laboratories equipped for chemical analysis at the research center." },
    { source: "The report has a detailed explanation of the methods used in the study.", prompt: "There（　　　）（　　　）detailed explanation of the methods used in the study in the report.", blanks: "is / a", answer: "There is a detailed explanation of the methods used in the study in the report." },
    { source: "The old theater has no seats with a clear view of the entire stage.", prompt: "There（　　　）（　　　）seats with a clear view of the entire stage in the old theater.", blanks: "are / no", answer: "There are no seats with a clear view of the entire stage in the old theater." },
    { source: "The university has several programs designed for international students.", prompt: "There（　　　）（　　　）programs designed for international students at the university.", blanks: "are / several", answer: "There are several programs designed for international students at the university." },
    { source: "The coastal town had a small fishing port before the new harbor was built.", prompt: "There（　　　）（　　　）small fishing port in the coastal town before the new harbor was built.", blanks: "was / a", answer: "There was a small fishing port in the coastal town before the new harbor was built." },
    { source: "The original plan had two major weaknesses.", prompt: "There（　　　）（　　　）major weaknesses in the original plan.", blanks: "were / two", answer: "There were two major weaknesses in the original plan." },
    { source: "There is a separate entrance for delivery vehicles at the back of the building.", prompt: "The back of the building（　　　）（　　　）separate entrance for delivery vehicles.", blanks: "has / a", answer: "The back of the building has a separate entrance for delivery vehicles." },
    { source: "There are no reliable records from the earliest period of the settlement.", prompt: "The settlement（　　　）（　　　）reliable records from its earliest period.", blanks: "has / no", answer: "The settlement has no reliable records from its earliest period." },
    { source: "There were several serious flaws in the first version of the system.", prompt: "The first version of the system（　　　）（　　　）serious flaws.", blanks: "had / several", answer: "The first version of the system had several serious flaws." },
    { source: "There is a section explaining how personal data is protected in the policy document.", prompt: "The policy document（　　　）（　　　）section explaining how personal data is protected.", blanks: "has / a", answer: "The policy document has a section explaining how personal data is protected." },
    { source: "There are more than fifty species of birds in the wetland reserve.", prompt: "The wetland reserve（　　　）（　　　）than fifty species of birds.", blanks: "has / more", answer: "The wetland reserve has more than fifty species of birds." },
    { source: "There was no emergency exit on the upper floor of the old building.", prompt: "The upper floor of the old building（　　　）（　　　）emergency exit.", blanks: "had / no", answer: "The upper floor of the old building had no emergency exit." }
  ],
  hard: [
    { source: "The revised proposal has three measures intended to reduce the burden on small businesses.", prompt: "There（　　　）（　　　）measures intended to reduce the burden on small businesses in the revised proposal.", blanks: "are / three", answer: "There are three measures intended to reduce the burden on small businesses in the revised proposal." },
    { source: "The archive has no complete records from the period immediately following the disaster.", prompt: "There（　　　）（　　　）complete records from the period immediately following the disaster in the archive.", blanks: "are / no", answer: "There are no complete records from the period immediately following the disaster in the archive." },
    { source: "The final chapter has a brief discussion of several questions that remain unresolved.", prompt: "There（　　　）（　　　）brief discussion of several questions that remain unresolved in the final chapter.", blanks: "is / a", answer: "There is a brief discussion of several questions that remain unresolved in the final chapter." },
    { source: "The region had only one road capable of carrying heavy vehicles before the bridge opened.", prompt: "There（　　　）（　　　）one road capable of carrying heavy vehicles in the region before the bridge opened.", blanks: "was / only", answer: "There was only one road capable of carrying heavy vehicles in the region before the bridge opened." },
    { source: "The database has more than a million entries collected from public records.", prompt: "There（　　　）（　　　）than a million entries collected from public records in the database.", blanks: "are / more", answer: "There are more than a million entries collected from public records in the database." },
    { source: "The original agreement had several provisions that later became difficult to enforce.", prompt: "There（　　　）（　　　）provisions that later became difficult to enforce in the original agreement.", blanks: "were / several", answer: "There were several provisions that later became difficult to enforce in the original agreement." },
    { source: "There is no clear definition of the key term in the current regulations.", prompt: "The current regulations（　　　）（　　　）clear definition of the key term.", blanks: "have / no", answer: "The current regulations have no clear definition of the key term." },
    { source: "There are two independent systems that can provide emergency power at the hospital.", prompt: "The hospital（　　　）（　　　）independent systems that can provide emergency power.", blanks: "has / two", answer: "The hospital has two independent systems that can provide emergency power." },
    { source: "There were no facilities capable of storing the material safely at the site at that time.", prompt: "The site（　　　）（　　　）facilities capable of storing the material safely at that time.", blanks: "had / no", answer: "The site had no facilities capable of storing the material safely at that time." },
    { source: "There is a detailed table showing changes in population by age group in the appendix.", prompt: "The appendix（　　　）（　　　）detailed table showing changes in population by age group.", blanks: "has / a", answer: "The appendix has a detailed table showing changes in population by age group." },
    { source: "There are several significant differences between the two versions of the report.", prompt: "The two versions of the report（　　　）（　　　）significant differences.", blanks: "have / several", answer: "The two versions of the report have several significant differences." },
    { source: "There was a narrow passage connecting the two sections of the underground facility.", prompt: "The underground facility（　　　）（　　　）narrow passage connecting its two sections.", blanks: "had / a", answer: "The underground facility had a narrow passage connecting its two sections." }
  ]
};

worksheetDefinitions["there-have-rewrite"] = {
  label: "書き換え② there is/are ⇄ have/has",
  title: "書き換え②　there is / are ⇄ have / has",
  instruction: "次の2文がほぼ同じ意味になるように、空欄に適する語句を書きなさい。存在を表す there is / are と、場所・物・組織などが持つ特徴を表す have / has の対応に注意しなさい。",
  answerNote: "there is / are ⇄ have / has の書き換えでは、場所・所有者・数量・時制を保ちます。過去形では there was / were ⇄ had も使います。",
  type: "english-rewrite",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "身近な場所や施設を使い、there is / are と have / has の基本的な対応を確認します。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "複数名詞・no・長めの修飾語を含む文で、存在と特徴の表現を相互に書き換えます。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "過去形、no、数詞、分詞による修飾を含む文でも、場所・数量・時制を維持して書き換えます。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト上位程度。長い修飾句や関係節を含む文で、存在表現とhave表現を正確に対応させます。" }
  }
};

const verbNounRewriteOptionV16 = worksheetTypeSelect.querySelector('option[value="verb-noun-rewrite"]');
if (verbNounRewriteOptionV16 && !worksheetTypeSelect.querySelector('option[value="there-have-rewrite"]')) {
  const option = document.createElement("option");
  option.value = "there-have-rewrite";
  option.textContent = "書き換え② there is / are ⇄ have / has";
  verbNounRewriteOptionV16.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV16Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV16ThereHaveRewrite() {
  if (worksheetTypeSelect.value === "there-have-rewrite") return thereHaveRewriteQuestions[difficultySelect.value];
  return buildQuestionPoolV16Previous();
};

syncDifficultyOptions();
updateControls();
