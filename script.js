"use strict";

const worksheetTypeSelect = document.getElementById("worksheetType");
const difficultySelect = document.getElementById("difficulty");
const countSelect = document.getElementById("count");
const createButton = document.getElementById("createButton");
const printButton = document.getElementById("printButton");
const questionsElement = document.getElementById("questions");
const answersElement = document.getElementById("answers");
const statusMessage = document.getElementById("statusMessage");
const countGuide = document.getElementById("countGuide");
const difficultyTitle = document.getElementById("difficultyTitle");
const difficultyDescription = document.getElementById("difficultyDescription");
const worksheetDifficulty = document.getElementById("worksheetDifficulty");
const worksheetCount = document.getElementById("worksheetCount");
const problemTitle = document.getElementById("problemTitle");
const instruction = document.getElementById("instruction");
const answerNote = document.getElementById("answerNote");

const worksheetDefinitions = {
    "simplify-ratio": {
        label: "比を簡単にする",
        title: "比を簡単にする問題",
        instruction: "次の比を、最も簡単な整数の比にしましょう。",
        answerNote: "2つの数を最大公約数で割ると、最も簡単な整数比になります。",
        difficulties: {
            basic: { label: "基本", divisors: [2], answerMin: 5, answerMax: 9, counts: [5, 10, 15], description: "2を最大公約数とする、両方とも2桁の問題を作成します。" },
            standard: { label: "標準", divisors: [2, 3, 5], answerMin: 5, answerMax: 12, counts: [5, 10, 15, 20], description: "2・3・5を最大公約数とする問題を作成します。" },
            advanced: { label: "発展", divisors: [4, 6, 8, 9, 10, 12], answerMin: 5, answerMax: 20, counts: [5, 10, 15, 20], description: "より大きな最大公約数を使う問題を作成します。" }
        }
    },
    "ratio-value": {
        label: "比の値",
        title: "比の値を求める問題",
        instruction: "次の比の値を、最も簡単な分数で表しましょう。",
        answerNote: "比 a：b の値は a÷b、つまり a/b です。分数は約分して表します。",
        difficulties: {
            basic: { label: "基本", multipliers: [2, 3, 5], numeratorMin: 1, numeratorMax: 8, denominatorMin: 2, denominatorMax: 12, properOnly: true, counts: [5, 10, 15], description: "答えが1より小さい分数になる問題を作成します。" },
            standard: { label: "標準", multipliers: [2, 3, 4, 5], numeratorMin: 2, numeratorMax: 15, denominatorMin: 2, denominatorMax: 15, properOnly: false, counts: [5, 10, 15, 20], description: "真分数と仮分数の両方を含む問題を作成します。" },
            advanced: { label: "発展", multipliers: [4, 6, 8, 9, 10, 12], numeratorMin: 3, numeratorMax: 20, denominatorMin: 2, denominatorMax: 20, properOnly: false, counts: [5, 10, 15, 20], description: "大きな数の比を、最も簡単な分数に直す問題を作成します。" }
        }
    },
    "equivalent-ratio": {
        label: "等しい比",
        title: "等しい比の空欄を求める問題",
        instruction: "2つの比が等しくなるように、□にあてはまる数を書きましょう。",
        answerNote: "比の両方の数に同じ数をかけたり、同じ数で割ったりすると、等しい比になります。",
        difficulties: {
            basic: { label: "基本", baseMin: 2, baseMax: 9, factors: [2, 3, 4, 5], missingPositions: [3], counts: [5, 10, 15], description: "右端の数を求める、かけ算中心の問題を作成します。" },
            standard: { label: "標準", baseMin: 2, baseMax: 12, factors: [2, 3, 4, 5, 6], missingPositions: [2, 3], counts: [5, 10, 15, 20], description: "後ろの比のどちらか一方を求める問題を作成します。" },
            advanced: { label: "発展", baseMin: 3, baseMax: 15, factors: [3, 4, 5, 6, 8, 10], missingPositions: [0, 1, 2, 3], counts: [5, 10, 15, 20], description: "前後どの位置にも空欄が入る問題を作成します。" }
        }
    }
};

function gcd(a, b) {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) {
        const remainder = x % y;
        x = y;
        y = remainder;
    }
    return x;
}

function shuffle(array) {
    const copy = [...array];
    for (let index = copy.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }
    return copy;
}

function getCurrentDefinition() {
    return worksheetDefinitions[worksheetTypeSelect.value];
}

function getCurrentSettings() {
    return getCurrentDefinition().difficulties[difficultySelect.value];
}

function buildSimplifyRatioPool(settings) {
    const pool = [];
    for (let left = settings.answerMin; left <= settings.answerMax; left += 1) {
        for (let right = settings.answerMin; right <= settings.answerMax; right += 1) {
            if (left === right || gcd(left, right) !== 1) continue;
            settings.divisors.forEach((divisor) => {
                pool.push({ left: left * divisor, right: right * divisor, simplifiedLeft: left, simplifiedRight: right, divisor });
            });
        }
    }
    return pool;
}

function buildRatioValuePool(settings) {
    const pool = [];
    for (let numerator = settings.numeratorMin; numerator <= settings.numeratorMax; numerator += 1) {
        for (let denominator = settings.denominatorMin; denominator <= settings.denominatorMax; denominator += 1) {
            if (numerator === denominator || gcd(numerator, denominator) !== 1 || (settings.properOnly && numerator >= denominator)) continue;
            settings.multipliers.forEach((multiplier) => {
                pool.push({ left: numerator * multiplier, right: denominator * multiplier, numerator, denominator, divisor: multiplier });
            });
        }
    }
    return pool;
}

function buildEquivalentRatioPool(settings) {
    const pool = [];
    for (let left = settings.baseMin; left <= settings.baseMax; left += 1) {
        for (let right = settings.baseMin; right <= settings.baseMax; right += 1) {
            if (left === right || gcd(left, right) !== 1) continue;
            settings.factors.forEach((factor) => {
                const values = [left, right, left * factor, right * factor];
                settings.missingPositions.forEach((missingIndex) => {
                    pool.push({ values, missingIndex, answer: values[missingIndex], factor });
                });
            });
        }
    }
    return pool;
}

function buildQuestionPool() {
    const worksheetType = worksheetTypeSelect.value;
    const settings = getCurrentSettings();
    if (worksheetType === "ratio-value") return buildRatioValuePool(settings);
    if (worksheetType === "equivalent-ratio") return buildEquivalentRatioPool(settings);
    return buildSimplifyRatioPool(settings);
}

function createFraction(numerator, denominator) {
    const fraction = document.createElement("span");
    fraction.className = "fraction";
    const top = document.createElement("span");
    top.className = "fraction-top";
    top.textContent = String(numerator);
    const bottom = document.createElement("span");
    bottom.className = "fraction-bottom";
    bottom.textContent = String(denominator);
    fraction.append(top, bottom);
    return fraction;
}

function equivalentRatioText(question, includeAnswer = false) {
    const values = question.values.map((value, index) => {
        if (index !== question.missingIndex) return String(value);
        return includeAnswer ? `□（${question.answer}）` : "□";
    });
    return `${values[0]}：${values[1]} ＝ ${values[2]}：${values[3]}`;
}

function updateControls() {
    const definition = getCurrentDefinition();
    const settings = getCurrentSettings();
    const previousCount = Number(countSelect.value) || 10;
    countSelect.replaceChildren();
    settings.counts.forEach((count) => {
        const option = document.createElement("option");
        option.value = String(count);
        option.textContent = `${count}問`;
        option.selected = count === previousCount;
        countSelect.appendChild(option);
    });
    if (!settings.counts.includes(previousCount)) countSelect.value = String(settings.counts.at(-1));
    problemTitle.textContent = definition.title;
    instruction.textContent = definition.instruction;
    answerNote.textContent = definition.answerNote;
    difficultyTitle.textContent = settings.label;
    difficultyDescription.textContent = settings.description;
    countGuide.textContent = settings.counts.at(-1) === 15 ? "この設定では最大15問まで作成できます。" : "最大20問まで作成できます。";
    questionsElement.textContent = "まだ問題はありません。";
    answersElement.textContent = "まだ解答はありません。";
    worksheetDifficulty.textContent = `難易度：${settings.label}`;
    worksheetCount.textContent = `問題数：${countSelect.value}問`;
    statusMessage.textContent = `${definition.label}・${settings.label}に切り替えました。`;
}

function appendSimplifyRatioAnswer(answer, question, number) {
    const answerMain = document.createElement("b");
    const explanation = document.createElement("span");
    answerMain.textContent = `${number}. ${question.left}：${question.right} → ${question.simplifiedLeft}：${question.simplifiedRight}`;
    explanation.className = "answer-explanation";
    explanation.textContent = `解説：2つの数を最大公約数${question.divisor}で割ります。`;
    answer.append(answerMain, document.createElement("br"), explanation);
}

function appendRatioValueAnswer(answer, question, number) {
    const line = document.createElement("div");
    line.className = "ratio-value-answer";
    const prefix = document.createElement("b");
    prefix.textContent = `${number}. ${question.left}：${question.right} ＝ `;
    line.append(prefix, createFraction(question.left, question.right), document.createTextNode(" ＝ "), createFraction(question.numerator, question.denominator));
    const explanation = document.createElement("span");
    explanation.className = "answer-explanation";
    explanation.textContent = `解説：比${question.left}：${question.right}の値は${question.left}÷${question.right}です。分子と分母を${question.divisor}で割ります。`;
    answer.append(line, explanation);
}

function appendEquivalentRatioAnswer(answer, question, number) {
    const answerMain = document.createElement("b");
    answerMain.textContent = `${number}. ${equivalentRatioText(question, true)}`;
    const explanation = document.createElement("span");
    explanation.className = "answer-explanation";
    const isFirstRatioMissing = question.missingIndex < 2;
    explanation.textContent = isFirstRatioMissing
        ? `解説：後ろの比の両方の数を${question.factor}で割ると、前の比になります。`
        : `解説：前の比の両方の数に${question.factor}をかけると、後ろの比になります。`;
    answer.append(answerMain, document.createElement("br"), explanation);
}

function makeWorksheet() {
    const definition = getCurrentDefinition();
    const settings = getCurrentSettings();
    const count = Number(countSelect.value);
    const pool = shuffle(buildQuestionPool());
    if (!Number.isInteger(count) || count <= 0) {
        statusMessage.textContent = "問題数を正しく選択してください。";
        return;
    }
    if (pool.length < count) {
        statusMessage.textContent = `この設定では${count}問を作成できません。問題数を減らしてください。`;
        return;
    }
    const selectedQuestions = pool.slice(0, count);
    const questionFragment = document.createDocumentFragment();
    const answerFragment = document.createDocumentFragment();
    selectedQuestions.forEach((question, index) => {
        const number = index + 1;
        const problem = document.createElement("p");
        const answer = document.createElement("p");
        if (worksheetTypeSelect.value === "equivalent-ratio") {
            problem.textContent = `${number}. ${equivalentRatioText(question)}`;
            appendEquivalentRatioAnswer(answer, question, number);
        } else {
            problem.textContent = `${number}. ${question.left}：${question.right}`;
            if (worksheetTypeSelect.value === "ratio-value") appendRatioValueAnswer(answer, question, number);
            else appendSimplifyRatioAnswer(answer, question, number);
        }
        questionFragment.appendChild(problem);
        answerFragment.appendChild(answer);
    });
    questionsElement.replaceChildren(questionFragment);
    answersElement.replaceChildren(answerFragment);
    worksheetDifficulty.textContent = `難易度：${settings.label}`;
    worksheetCount.textContent = `問題数：${count}問`;
    statusMessage.textContent = `${definition.label}・${settings.label}を${count}問、重複なしで作成しました。`;
    document.querySelector(".problem-page").scrollIntoView({ behavior: "smooth", block: "start" });
}

worksheetTypeSelect.addEventListener("change", updateControls);
difficultySelect.addEventListener("change", updateControls);
createButton.addEventListener("click", makeWorksheet);
printButton.addEventListener("click", () => window.print());

updateControls();
