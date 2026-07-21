function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chooseRandom(array) {
    return array[randomInt(0, array.length - 1)];
}

function makeWorksheet() {
    const difficulty =
        document.getElementById("difficulty").value;

    const count =
        parseInt(document.getElementById("count").value);

    let divisors = [];
    let answerMax = 10;

    if (difficulty === "basic") {
        divisors = [2];
        answerMax = 9;
    }

    if (difficulty === "standard") {
        divisors = [2, 3, 5];
        answerMax = 12;
    }

    if (difficulty === "advanced") {
        divisors = [4, 6, 8, 9, 10, 12];
        answerMax = 20;
    }

    const used = new Set();

    let questions = "";
    let answers = "";

    while (used.size < count) {
        let simplifiedLeft;
        let simplifiedRight;

        /*
         * 答えになる2つの数が、
         * それ以上簡単にできない組になるまで作り直します。
         */
        do {
            simplifiedLeft = randomInt(5, answerMax);
simplifiedRight = randomInt(5, answerMax);
        } while (
            simplifiedLeft === simplifiedRight ||
            gcd(simplifiedLeft, simplifiedRight) !== 1
        );

        const divisor = chooseRandom(divisors);

        const left = simplifiedLeft * divisor;
        const right = simplifiedRight * divisor;

        const key = left + "-" + right;

        if (used.has(key)) {
            continue;
        }

        used.add(key);

        questions +=
            "<p>" +
            used.size +
            ". " +
            left +
            "：" +
            right +
            "</p>";

        answers +=
            "<p><b>" +
            used.size +
            ". " +
            left +
            "：" +
            right +
            " → " +
            simplifiedLeft +
            "：" +
            simplifiedRight +
            "</b><br>" +
            "解説：2つの数を最大公約数" +
            divisor +
            "で割ります。" +
            "</p>";
    }

    document.getElementById("questions").innerHTML =
        questions;

    document.getElementById("answers").innerHTML =
        answers;
}