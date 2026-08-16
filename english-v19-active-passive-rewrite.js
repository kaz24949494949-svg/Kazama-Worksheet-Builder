"use strict";

// Rewrite 5: active voice <-> passive voice.
const activePassiveRewriteQuestions = {
  basic: [
    { source: "Tom cleans this room every day.", prompt: "This room（　　　）（　　　）Tom every day.", blanks: "is cleaned / by", answer: "This room is cleaned by Tom every day." },
    { source: "Ms. Brown teaches this class.", prompt: "This class（　　　）（　　　）Ms. Brown.", blanks: "is taught / by", answer: "This class is taught by Ms. Brown." },
    { source: "The students use these computers after school.", prompt: "These computers（　　　）（　　　）the students after school.", blanks: "are used / by", answer: "These computers are used by the students after school." },
    { source: "My father built this shelf last year.", prompt: "This shelf（　　　）（　　　）my father last year.", blanks: "was built / by", answer: "This shelf was built by my father last year." },
    { source: "The storm damaged several houses.", prompt: "Several houses（　　　）（　　　）the storm.", blanks: "were damaged / by", answer: "Several houses were damaged by the storm." },
    { source: "The chef prepared the meal.", prompt: "The meal（　　　）（　　　）the chef.", blanks: "was prepared / by", answer: "The meal was prepared by the chef." },
    { source: "This picture was painted by Lisa.", prompt: "Lisa（　　　）（　　　）picture.", blanks: "painted / this", answer: "Lisa painted this picture." },
    { source: "The windows are washed by Ken every Saturday.", prompt: "Ken（　　　）（　　　）every Saturday.", blanks: "washes / the windows", answer: "Ken washes the windows every Saturday." },
    { source: "The letter was written by my sister.", prompt: "My sister（　　　）（　　　）letter.", blanks: "wrote / the", answer: "My sister wrote the letter." },
    { source: "These flowers are watered by Mr. Lee every morning.", prompt: "Mr. Lee（　　　）（　　　）every morning.", blanks: "waters / these flowers", answer: "Mr. Lee waters these flowers every morning." },
    { source: "The road was blocked by a fallen tree.", prompt: "A fallen tree（　　　）（　　　）.", blanks: "blocked / the road", answer: "A fallen tree blocked the road." },
    { source: "The cake was made by Emma.", prompt: "Emma（　　　）（　　　）cake.", blanks: "made / the", answer: "Emma made the cake." }
  ],
  standard: [
    { source: "The committee will announce the results tomorrow.", prompt: "The results（　　　）（　　　）the committee tomorrow.", blanks: "will be announced / by", answer: "The results will be announced by the committee tomorrow." },
    { source: "The school must repair the gym before winter.", prompt: "The gym（　　　）（　　　）the school before winter.", blanks: "must be repaired / by", answer: "The gym must be repaired by the school before winter." },
    { source: "The staff has already checked all the applications.", prompt: "All the applications（　　　）（　　　）the staff.", blanks: "have already been checked / by", answer: "All the applications have already been checked by the staff." },
    { source: "The company did not publish the report last month.", prompt: "The report（　　　）（　　　）the company last month.", blanks: "was not published / by", answer: "The report was not published by the company last month." },
    { source: "The guide showed the visitors the old temple.", prompt: "The old temple（　　　）（　　　）the visitors by the guide.", blanks: "was shown / to", answer: "The old temple was shown to the visitors by the guide." },
    { source: "The teacher gave each student a worksheet.", prompt: "A worksheet（　　　）（　　　）each student by the teacher.", blanks: "was given / to", answer: "A worksheet was given to each student by the teacher." },
    { source: "The final decision will be made by the director.", prompt: "The director（　　　）（　　　）final decision.", blanks: "will make / the", answer: "The director will make the final decision." },
    { source: "The documents have been signed by both managers.", prompt: "Both managers（　　　）（　　　）documents.", blanks: "have signed / the", answer: "Both managers have signed the documents." },
    { source: "The entrance must be kept clear by the staff.", prompt: "The staff（　　　）（　　　）entrance clear.", blanks: "must keep / the", answer: "The staff must keep the entrance clear." },
    { source: "The problem was not solved by the research team.", prompt: "The research team（　　　）（　　　）problem.", blanks: "did not solve / the", answer: "The research team did not solve the problem." },
    { source: "The new schedule was sent to every employee by the office.", prompt: "The office（　　　）（　　　）new schedule to every employee.", blanks: "sent / the", answer: "The office sent the new schedule to every employee." },
    { source: "The safety rules should be followed by everyone in the laboratory.", prompt: "Everyone in the laboratory（　　　）（　　　）safety rules.", blanks: "should follow / the", answer: "Everyone in the laboratory should follow the safety rules." }
  ],
  advanced: [
    { source: "The research team has carefully analyzed the information collected during the survey.", prompt: "The information collected during the survey（　　　）（　　　）the research team.", blanks: "has been carefully analyzed / by", answer: "The information collected during the survey has been carefully analyzed by the research team." },
    { source: "The city had completed the new bridge before the festival began.", prompt: "The new bridge（　　　）（　　　）the city before the festival began.", blanks: "had been completed / by", answer: "The new bridge had been completed by the city before the festival began." },
    { source: "The committee may revise several parts of the proposal.", prompt: "Several parts of the proposal（　　　）（　　　）the committee.", blanks: "may be revised / by", answer: "Several parts of the proposal may be revised by the committee." },
    { source: "The technicians are testing the new system at the moment.", prompt: "The new system（　　　）（　　　）the technicians at the moment.", blanks: "is being tested / by", answer: "The new system is being tested by the technicians at the moment." },
    { source: "The investigators were examining the damaged equipment when the power failed.", prompt: "The damaged equipment（　　　）（　　　）the investigators when the power failed.", blanks: "was being examined / by", answer: "The damaged equipment was being examined by the investigators when the power failed." },
    { source: "The agency has not yet approved the revised plan.", prompt: "The revised plan（　　　）（　　　）the agency.", blanks: "has not yet been approved / by", answer: "The revised plan has not yet been approved by the agency." },
    { source: "The final report had been prepared by a team of independent experts.", prompt: "A team of independent experts（　　　）（　　　）final report.", blanks: "had prepared / the", answer: "A team of independent experts had prepared the final report." },
    { source: "The damaged section is being repaired by local workers this week.", prompt: "Local workers（　　　）（　　　）damaged section this week.", blanks: "are repairing / the", answer: "Local workers are repairing the damaged section this week." },
    { source: "Several important questions may be raised by the audience after the presentation.", prompt: "The audience（　　　）（　　　）important questions after the presentation.", blanks: "may raise / several", answer: "The audience may raise several important questions after the presentation." },
    { source: "The external laboratory has not independently confirmed the results.", prompt: "The results（　　　）（　　　）the external laboratory.", blanks: "have not been independently confirmed / by", answer: "The results have not been independently confirmed by the external laboratory." },
    { source: "The original files were being copied by the staff when the system stopped responding.", prompt: "The staff（　　　）（　　　）original files when the system stopped responding.", blanks: "were copying / the", answer: "The staff were copying the original files when the system stopped responding." },
    { source: "The new guidelines should have been reviewed by the legal department before publication.", prompt: "The legal department（　　　）（　　　）the new guidelines before publication.", blanks: "should have / reviewed", answer: "The legal department should have reviewed the new guidelines before publication." }
  ],
  hard: [
    { source: "The review panel will examine all applications submitted before the deadline.", prompt: "All applications submitted before the deadline（　　　）（　　　）the review panel.", blanks: "will be examined / by", answer: "All applications submitted before the deadline will be examined by the review panel." },
    { source: "The investigators have not yet identified the source of the error that affected the final calculation.", prompt: "The source of the error that affected the final calculation（　　　）（　　　）the investigators.", blanks: "has not yet been identified / by", answer: "The source of the error that affected the final calculation has not yet been identified by the investigators." },
    { source: "The committee had rejected the earlier proposal because it did not address the safety concerns.", prompt: "The earlier proposal（　　　）（　　　）the committee because it did not address the safety concerns.", blanks: "had been rejected / by", answer: "The earlier proposal had been rejected by the committee because it did not address the safety concerns." },
    { source: "The research group is currently conducting several experiments designed to test the new method.", prompt: "Several experiments designed to test the new method（　　　）（　　　）the research group.", blanks: "are currently being conducted / by", answer: "Several experiments designed to test the new method are currently being conducted by the research group." },
    { source: "The agency should have informed local residents about the change before the work began.", prompt: "Local residents（　　　）（　　　）about the change by the agency before the work began.", blanks: "should have been / informed", answer: "Local residents should have been informed about the change by the agency before the work began." },
    { source: "The publisher may release a revised edition if enough errors are found in the current one.", prompt: "A revised edition（　　　）（　　　）the publisher if enough errors are found in the current one.", blanks: "may be released / by", answer: "A revised edition may be released by the publisher if enough errors are found in the current one." },
    { source: "All measurements recorded during the first stage were checked independently by two technicians.", prompt: "Two technicians（　　　）（　　　）all measurements recorded during the first stage.", blanks: "independently / checked", answer: "Two technicians independently checked all measurements recorded during the first stage." },
    { source: "The revised procedure has been adopted by several hospitals that participated in the trial.", prompt: "Several hospitals that participated in the trial（　　　）（　　　）revised procedure.", blanks: "have adopted / the", answer: "Several hospitals that participated in the trial have adopted the revised procedure." },
    { source: "The final version had not been approved by the board when the announcement was made.", prompt: "The board（　　　）（　　　）final version when the announcement was made.", blanks: "had not approved / the", answer: "The board had not approved the final version when the announcement was made." },
    { source: "The long-term effects of the policy are being studied by researchers at three universities.", prompt: "Researchers at three universities（　　　）（　　　）the long-term effects of the policy.", blanks: "are / studying", answer: "Researchers at three universities are studying the long-term effects of the policy." },
    { source: "Several weaknesses that had been overlooked in the first review were later identified by an external team.", prompt: "An external team later（　　　）（　　　）that had been overlooked in the first review.", blanks: "identified / several weaknesses", answer: "An external team later identified several weaknesses that had been overlooked in the first review." },
    { source: "The evidence presented at the hearing must be evaluated carefully by the committee before any conclusion is reached.", prompt: "The committee（　　　）（　　　）the evidence presented at the hearing before any conclusion is reached.", blanks: "must carefully / evaluate", answer: "The committee must carefully evaluate the evidence presented at the hearing before any conclusion is reached." }
  ]
};

worksheetDefinitions["active-passive-rewrite"] = {
  label: "書き換え⑤ 能動態 ⇄ 受動態",
  title: "書き換え⑤　能動態 ⇄ 受動態",
  instruction: "次の2文がほぼ同じ意味になるように、空欄に適する語句を書きなさい。動作をする側と受ける側の関係、時制・助動詞・否定・副詞の位置に注意しなさい。",
  answerNote: "能動態⇄受動態では、目的語を受動態の主語にし、時制や助動詞を保って be＋過去分詞を作ります。必要な場合は by＋動作主も残します。",
  type: "english-rewrite",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "現在形・過去形を中心に、主語と目的語を入れ替えて基本的な能動態・受動態を書き換えます。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "助動詞・現在完了・否定・第4文型を含む文で、時制と目的語の関係を保って書き換えます。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "完了形・進行形・助動詞＋完了形・長い修飾語を含む文でも、態と時制を正確に対応させます。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト上位程度。関係節・分詞修飾・完了形・進行形・条件節を含む長文で、意味関係を崩さずに書き換えます。" }
  }
};

const stateVerbRewriteOptionV19 = worksheetTypeSelect.querySelector('option[value="state-verb-rewrite"]');
if (stateVerbRewriteOptionV19 && !worksheetTypeSelect.querySelector('option[value="active-passive-rewrite"]')) {
  const option = document.createElement("option");
  option.value = "active-passive-rewrite";
  option.textContent = "書き換え⑤ 能動態 ⇄ 受動態";
  stateVerbRewriteOptionV19.insertAdjacentElement("afterend", option);
}

const buildQuestionPoolV19Previous = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV19ActivePassiveRewrite() {
  if (worksheetTypeSelect.value === "active-passive-rewrite") return activePassiveRewriteQuestions[difficultySelect.value];
  return buildQuestionPoolV19Previous();
};

syncDifficultyOptions();
updateControls();
