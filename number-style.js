"use strict";

function wrapLeadingNumber(element) {
    if (!element || element.querySelector(":scope > .question-number")) {
        return;
    }

    const firstNode = element.firstChild;

    if (!firstNode || firstNode.nodeType !== Node.TEXT_NODE) {
        return;
    }

    const match = firstNode.textContent.match(/^(\d+)\.\s*/);

    if (!match) {
        return;
    }

    const numberLabel = document.createElement("span");
    numberLabel.className = "question-number";
    numberLabel.textContent = match[1];

    firstNode.textContent = firstNode.textContent.slice(match[0].length);
    element.insertBefore(numberLabel, firstNode);
}

function styleQuestionNumbers() {
    document.querySelectorAll("#questions > p").forEach(wrapLeadingNumber);

    // 「比を簡単にする」の解答番号
    document.querySelectorAll("#answers > p > b").forEach(wrapLeadingNumber);

    // 「比の値」の解答番号は .ratio-value-answer 内の b 要素に入っています。
    document
        .querySelectorAll("#answers .ratio-value-answer > b")
        .forEach(wrapLeadingNumber);
}

const worksheetNumberObserver = new MutationObserver(styleQuestionNumbers);

worksheetNumberObserver.observe(document.getElementById("questions"), {
    childList: true,
    subtree: true
});

worksheetNumberObserver.observe(document.getElementById("answers"), {
    childList: true,
    subtree: true
});

styleQuestionNumbers();
