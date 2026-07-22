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
    document.querySelectorAll("#answers > p > b").forEach(wrapLeadingNumber);
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
