"use strict";

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

const difficultySettings = {
    basic: {
        label: "基本",
        divisors: [2],
        answerMin: 5,
        answerMax: 9,
        counts: [5, 10, 15],
        description: "2を最大公約数とする、両方とも2桁の問題を作成します。"
    },
    standard: {
        label: "標準",
        divisors: [2, 3, 5],
        answerMin: 5,
        answerMax: 12,
        counts: [5, 10, 15, 20],
        description: "2・3・5を最大公約数とする問題を作成します。"
    },
    advanced: {
        label: "発展",
        divisors: [4, 6, 8, 9, 10, 12],
        answerMin: 5,
        answerMax: 20,
        counts: [5, 10, 15, 20],
        description: "より大きな最大公約数を使う問題を作成します。"
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

function buildQuestionPool(settings) {
    const pool = [];

    for (
        let simplifiedLeft = settings.answerMin;
        simplifiedLeft <= settings.answerMax;
        simplifiedLeft += 1
    ) {
        for (
            let simplifiedRight = settings.answerMin;
            simplifiedRight <= settings.answerMax;
            simplifiedRight += 1
        ) {
            if (
                simplifiedLeft === simplifiedRight ||
                gcd(simplifiedLeft, simplifiedRight) !== 1
            ) {
                continue;
            }

            settings.divisors.forEach((divisor) => {
                const left = simplifiedLeft * divisor;
                const right = simplifiedRight * divisor;

                pool.push({
                    left,
                    right,
                    simplifiedLeft,
                    simplifiedRight,
                    divisor
                });
            });
        }
    }

    return pool;
}

function updateDifficultyControls() {
    const settings = difficultySettings[difficultySelect.value];
    const previousCount = Number(countSelect.value) || 10;

    countSelect.replaceChildren();

    settings.counts.forEach((count) => {
        const option = document.createElement("option");
        option.value = String(count);
        option.textContent = `${count}問`;
        option.selected = count === previousCount;
        countSelect.appendChild(option);
    });

    if (!settings.counts.includes(previousCount)) {
        countSelect.value = String(settings.counts[settings.counts.length - 1]);
    }

    difficultyTitle.textContent = settings.label;
    difficultyDescription.textContent = settings.description;
    countGuide.textContent =
        settings.label === "基本"
            ? "基本は重複を避けるため15問までです。"
            : "最大20問まで作成できます。";

    statusMessage.textContent =
        `${settings.label}の設定に切り替えました。問題数を確認してください。`;
}

function makeWorksheet() {
    const settings = difficultySettings[difficultySelect.value];
    const count = Number(countSelect.value);
    const pool = shuffle(buildQuestionPool(settings));

    if (!Number.isInteger(count) || count <= 0) {
        statusMessage.textContent = "問題数を正しく選択してください。";
        return;
    }

    if (pool.length < count) {
        statusMessage.textContent =
            `この設定では${count}問を作成できません。問題数を減らしてください。`;
        return;
    }

    const selectedQuestions = pool.slice(0, count);
    const questionFragment = document.createDocumentFragment();
    const answerFragment = document.createDocumentFragment();

    selectedQuestions.forEach((question, index) => {
        const number = index + 1;

        const problem = document.createElement("p");
        problem.textContent = `${number}. ${question.left}：${question.right}`;
        questionFragment.appendChild(problem);

        const answer = document.createElement("p");
        const answerMain = document.createElement("b");
        const explanation = document.createElement("span");

        answerMain.textContent =
            `${number}. ${question.left}：${question.right}` +
            ` → ${question.simplifiedLeft}：${question.simplifiedRight}`;

        explanation.className = "answer-explanation";
        explanation.textContent =
            `解説：2つの数を最大公約数${question.divisor}で割ります。`;

        answer.appendChild(answerMain);
        answer.appendChild(document.createElement("br"));
        answer.appendChild(explanation);
        answerFragment.appendChild(answer);
    });

    questionsElement.replaceChildren(questionFragment);
    answersElement.replaceChildren(answerFragment);

    worksheetDifficulty.textContent = `難易度：${settings.label}`;
    worksheetCount.textContent = `問題数：${count}問`;
    statusMessage.textContent =
        `${settings.label}の問題を${count}問、重複なしで作成しました。`;

    document.querySelector(".problem-page").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

difficultySelect.addEventListener("change", updateDifficultyControls);
createButton.addEventListener("click", makeWorksheet);
printButton.addEventListener("click", () => window.print());

updateDifficultyControls();
