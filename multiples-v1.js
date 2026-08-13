"use strict";

(() => {
  const MULTIPLE_TYPES = {
    "multiple-system1": {
      label: "倍数強化ワーク 系統1",
      title: "倍数強化ワーク　系統1　整数倍・基本",
      instruction: "Bの①を基準にして、Aの○に入る数を考えましょう。",
      answerNote: "Bの①の長さは、Aの1区切りと同じです。AがBの何個分かを数えます。",
      mode: "system1"
    },
    "multiple-system2": {
      label: "倍数強化ワーク 系統2",
      title: "倍数強化ワーク　系統2　整数倍・単位定着",
      instruction: "①をAの1区切りとして、Aの○に入る数を考えましょう。",
      answerNote: "①はAの中の1区切り分の長さを表します。A全体が①の何個分かを数えます。",
      mode: "system2"
    },
    "multiple-system3": {
      label: "倍数強化ワーク 系統3",
      title: "倍数強化ワーク　系統3　単位分数倍",
      instruction: "A全体を1として、BはAの何分の1の長さかを考えましょう。",
      answerNote: "Aを同じ長さに分けると、Bはその1区切り分です。BはAの1／□倍になります。",
      mode: "system3"
    }
  };

  const difficultySettings = {
    basic: { label: "基礎", min: 2, max: 9, description: "2個分から9個分までの、見通しやすい関係を扱います。" },
    standard: { label: "標準", min: 3, max: 10, description: "3個分から10個分までを重複なしで扱います。" },
    advanced: { label: "発展", min: 4, max: 11, description: "4個分から11個分までの、長い線分図を扱います。" }
  };

  const typeSelect = document.getElementById("worksheetType");
  const difficultySelect = document.getElementById("difficulty");
  const countSelect = document.getElementById("count");
  const createButton = document.getElementById("createButton");
  const questions = document.getElementById("questions");
  const answers = document.getElementById("answers");
  const problemTitle = document.getElementById("problemTitle");
  const instruction = document.getElementById("instruction");
  const answerNote = document.getElementById("answerNote");
  const countGuide = document.getElementById("countGuide");
  const difficultyTitle = document.getElementById("difficultyTitle");
  const difficultyDescription = document.getElementById("difficultyDescription");
  const worksheetDifficulty = document.getElementById("worksheetDifficulty");
  const worksheetCount = document.getElementById("worksheetCount");
  const statusMessage = document.getElementById("statusMessage");
  const problemPage = document.querySelector(".problem-page");
  const answerPage = document.querySelector(".answer-page");

  function isMultipleType(value = typeSelect.value) {
    return Object.hasOwn(MULTIPLE_TYPES, value);
  }

  function shuffle(values) {
    const copy = [...values];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function updateMultipleControls() {
    const definition = MULTIPLE_TYPES[typeSelect.value];
    const settings = difficultySettings[difficultySelect.value];
    const previousCount = Number(countSelect.value) || 8;

    countSelect.replaceChildren();
    [4, 6, 8].forEach((count) => {
      const option = document.createElement("option");
      option.value = String(count);
      option.textContent = `${count}問`;
      option.selected = count === previousCount;
      countSelect.appendChild(option);
    });
    if (![4, 6, 8].includes(previousCount)) countSelect.value = "8";

    problemTitle.textContent = definition.title;
    instruction.textContent = definition.instruction;
    answerNote.textContent = definition.answerNote;
    difficultyTitle.textContent = settings.label;
    difficultyDescription.textContent = definition.mode === "system3"
      ? `${settings.min}等分から${settings.max}等分までの単位分数倍を扱います。`
      : settings.description;
    countGuide.textContent = "A4では8問が標準です。4問・6問も選べます。";
    worksheetDifficulty.textContent = `難易度：${settings.label}`;
    worksheetCount.textContent = `問題数：${countSelect.value}問`;
    questions.textContent = "まだ問題はありません。";
    answers.textContent = "まだ解答はありません。";
    questions.className = "multiple-questions";
    answers.className = "multiple-answers";
    problemPage.classList.add("multiple-page");
    answerPage.classList.add("multiple-answer-page");
    statusMessage.textContent = `${definition.label}・${settings.label}に切り替えました。`;
  }

  function clearMultipleMode() {
    problemPage.classList.remove("multiple-page");
    answerPage.classList.remove("multiple-answer-page");
    questions.classList.remove("multiple-questions");
    answers.classList.remove("multiple-answers");
  }

  function svgElement(name, attributes = {}) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
    return element;
  }

  function addLine(svg, x1, y1, x2, y2, width = 3) {
    svg.appendChild(svgElement("line", { x1, y1, x2, y2, "stroke-width": width, class: "multiple-stroke" }));
  }

  function addText(svg, x, y, text, className, anchor = "middle") {
    const node = svgElement("text", { x, y, class: className, "text-anchor": anchor });
    node.textContent = text;
    svg.appendChild(node);
  }

  function addCircleLabel(svg, cx, cy, text, radius = 17, className = "multiple-circle-label") {
    svg.appendChild(svgElement("circle", { cx, cy, r: radius, class: "multiple-label-circle" }));
    addText(svg, cx, cy + 6, text, className);
  }

  function drawSegment(svg, x, y, units, unitWidth, options = {}) {
    const length = units * unitWidth;
    addLine(svg, x, y, x + length, y, 4);
    for (let i = 0; i <= units; i += 1) {
      const tickX = x + i * unitWidth;
      const height = i === 0 || i === units ? 17 : 13;
      addLine(svg, tickX, y - height, tickX, y + height, 3);
    }

    if (options.wholeLabel) {
      const centerX = x + length / 2;
      const topY = y - 52;
      const path = svgElement("path", {
        d: `M ${x} ${y - 5} Q ${centerX} ${topY} ${x + length} ${y - 5}`,
        class: "multiple-arc"
      });
      svg.appendChild(path);
      addCircleLabel(svg, centerX, topY, options.wholeLabel === "blank" ? "" : options.wholeLabel, 18);
    }

    if (options.unitLabel) {
      addCircleLabel(svg, x + unitWidth / 2, y - 31, "1", 14, "multiple-unit-number");
    }
  }

  function drawDiagram(mode, multiple) {
    const svg = svgElement("svg", {
      viewBox: "0 0 520 235",
      role: "img",
      "aria-label": mode === "system3" ? `1/${multiple}倍の線分図` : `${multiple}個分の線分図`,
      class: "multiple-diagram"
    });
    const unitWidth = 38;
    const x = 82;

    if (mode === "system1") {
      addText(svg, 28, 78, "A", "multiple-row-label", "start");
      drawSegment(svg, x, 75, multiple, unitWidth, { wholeLabel: "blank" });
      addText(svg, 28, 183, "B", "multiple-row-label", "start");
      drawSegment(svg, x, 180, 1, unitWidth, { unitLabel: true });
    } else if (mode === "system2") {
      addText(svg, 28, 133, "A", "multiple-row-label", "start");
      drawSegment(svg, x, 130, multiple, unitWidth, { wholeLabel: "blank", unitLabel: true });
    } else {
      addText(svg, 28, 78, "A", "multiple-row-label", "start");
      drawSegment(svg, x, 75, multiple, unitWidth, { wholeLabel: "1" });
      addText(svg, 28, 183, "B", "multiple-row-label", "start");
      drawSegment(svg, x, 180, 1, unitWidth, { wholeLabel: "blank" });
    }
    return svg;
  }

  function answerText(mode, multiple, number) {
    return mode === "system3" ? `${number}. 1／${multiple}` : `${number}. ${multiple}`;
  }

  function makeMultipleWorksheet() {
    const definition = MULTIPLE_TYPES[typeSelect.value];
    const settings = difficultySettings[difficultySelect.value];
    const count = Number(countSelect.value);
    const candidates = [];
    for (let value = settings.min; value <= settings.max; value += 1) candidates.push(value);
    const selected = shuffle(candidates).slice(0, count);

    const questionFragment = document.createDocumentFragment();
    const answerFragment = document.createDocumentFragment();

    selected.forEach((multiple, index) => {
      const item = document.createElement("section");
      item.className = "multiple-question-item";
      const number = document.createElement("span");
      number.className = "multiple-question-number";
      number.textContent = `(${index + 1})`;
      item.append(number, drawDiagram(definition.mode, multiple));
      questionFragment.appendChild(item);

      const answer = document.createElement("p");
      answer.className = "multiple-answer-item";
      answer.textContent = answerText(definition.mode, multiple, index + 1);
      answerFragment.appendChild(answer);
    });

    questions.replaceChildren(questionFragment);
    answers.replaceChildren(answerFragment);
    worksheetDifficulty.textContent = `難易度：${settings.label}`;
    worksheetCount.textContent = `問題数：${count}問`;
    statusMessage.textContent = `${definition.label}・${settings.label}を${count}問、重複なしで作成しました。`;
    problemPage.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  typeSelect.addEventListener("change", (event) => {
    if (isMultipleType(event.target.value)) {
      event.stopImmediatePropagation();
      updateMultipleControls();
    } else {
      clearMultipleMode();
    }
  }, true);

  difficultySelect.addEventListener("change", (event) => {
    if (!isMultipleType()) return;
    event.stopImmediatePropagation();
    updateMultipleControls();
  }, true);

  createButton.addEventListener("click", (event) => {
    if (!isMultipleType()) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    makeMultipleWorksheet();
  }, true);
})();
