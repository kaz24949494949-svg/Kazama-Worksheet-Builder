"use strict";

(() => {
  const TYPES = {
    "multiple-system1": {
      label: "倍数強化ワーク 系統1",
      title: "倍数強化ワーク　系統1　整数倍・基本",
      instruction: "Bの①を基準にして、Aの○に入る数を考えましょう。",
      note: "Bの①の長さは、Aの1区切りと同じです。AがBの何個分かを数えます。",
      mode: 1
    },
    "multiple-system2": {
      label: "倍数強化ワーク 系統2",
      title: "倍数強化ワーク　系統2　整数倍・単位定着",
      instruction: "①をAの1区切りとして、Aの○に入る数を考えましょう。",
      note: "①はAの中の1区切り分の長さを表します。A全体が①の何個分かを数えます。",
      mode: 2
    },
    "multiple-system3": {
      label: "倍数強化ワーク 系統3",
      title: "倍数強化ワーク　系統3　Aの①を基準にBをみる",
      instruction: "Aの①を基準にして、Bの○に入る数を考えましょう。",
      note: "Aの①の長さは、Bの1区切りと同じです。BがAの何個分かを数えます。",
      mode: 3
    }
  };

  const DIFF = {
    basic: { label: "基礎", min: 2, max: 9, description: "2個分から9個分までの、見通しやすい関係を扱います。" },
    standard: { label: "標準", min: 3, max: 10, description: "3個分から10個分までを重複なしで扱います。" },
    advanced: { label: "発展", min: 4, max: 11, description: "4個分から11個分までの、長い線分図を扱います。" }
  };

  const byId = (id) => document.getElementById(id);
  const type = byId("worksheetType");
  const diff = byId("difficulty");
  const count = byId("count");
  const create = byId("createButton");
  const qs = byId("questions");
  const ans = byId("answers");
  const title = byId("problemTitle");
  const inst = byId("instruction");
  const note = byId("answerNote");
  const guide = byId("countGuide");
  const dTitle = byId("difficultyTitle");
  const dDesc = byId("difficultyDescription");
  const wDiff = byId("worksheetDifficulty");
  const wCount = byId("worksheetCount");
  const status = byId("statusMessage");
  const pPage = document.querySelector(".problem-page");
  const aPage = document.querySelector(".answer-page");

  const isType = (v = type.value) => Object.hasOwn(TYPES, v);

  function shuffle(values) {
    const a = [...values];
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function controls() {
    const t = TYPES[type.value];
    const s = DIFF[diff.value];
    const old = Number(count.value) || 8;

    count.replaceChildren();
    [4, 6, 8].forEach((n) => {
      const o = document.createElement("option");
      o.value = String(n);
      o.textContent = `${n}問`;
      o.selected = n === old;
      count.appendChild(o);
    });
    if (![4, 6, 8].includes(old)) count.value = "8";

    title.textContent = t.title;
    inst.textContent = t.instruction;
    note.textContent = t.note;
    dTitle.textContent = s.label;
    dDesc.textContent = s.description;
    guide.textContent = "A4では8問が標準です。4問・6問も選べます。";
    wDiff.textContent = `難易度：${s.label}`;
    wCount.textContent = `問題数：${count.value}問`;
    qs.textContent = "まだ問題はありません。";
    ans.textContent = "まだ解答はありません。";
    qs.className = "multiple-questions";
    ans.className = "multiple-answers";
    pPage.classList.add("multiple-page");
    aPage.classList.add("multiple-answer-page");
    status.textContent = `${t.label}・${s.label}に切り替えました。`;
  }

  function clear() {
    pPage.classList.remove("multiple-page");
    aPage.classList.remove("multiple-answer-page");
    qs.classList.remove("multiple-questions");
    ans.classList.remove("multiple-answers");
  }

  function svgEl(name, attrs = {}) {
    const e = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, String(v)));
    return e;
  }

  function line(svg, x1, y1, x2, y2, width = 3) {
    svg.appendChild(svgEl("line", { x1, y1, x2, y2, "stroke-width": width, class: "multiple-stroke" }));
  }

  function text(svg, x, y, value, className, anchor = "middle") {
    const n = svgEl("text", { x, y, class: className, "text-anchor": anchor });
    n.textContent = value;
    svg.appendChild(n);
  }

  function circleLabel(svg, cx, cy, value, radius = 17, className = "multiple-circle-label") {
    svg.appendChild(svgEl("circle", { cx, cy, r: radius, class: "multiple-label-circle" }));
    text(svg, cx, cy + 6, value, className);
  }

  function segment(svg, x, y, units, unitWidth, opt = {}) {
    const length = units * unitWidth;
    line(svg, x, y, x + length, y, 4);
    for (let i = 0; i <= units; i += 1) {
      const xx = x + i * unitWidth;
      const h = i === 0 || i === units ? 17 : 13;
      line(svg, xx, y - h, xx, y + h, 3);
    }
    if (opt.whole) {
      const cx = x + length / 2;
      const ty = y - 52;
      svg.appendChild(svgEl("path", {
        d: `M ${x} ${y - 5} Q ${cx} ${ty} ${x + length} ${y - 5}`,
        class: "multiple-arc"
      }));
      circleLabel(svg, cx, ty, opt.whole === "blank" ? "" : opt.whole, 18);
    }
    if (opt.unit) circleLabel(svg, x + unitWidth / 2, y - 31, "1", 14, "multiple-unit-number");
  }

  function diagram(mode, multiple) {
    const svg = svgEl("svg", {
      viewBox: "0 0 520 235",
      role: "img",
      "aria-label": `${multiple}個分の線分図`,
      class: "multiple-diagram"
    });
    const unitWidth = 38;
    const x = 82;

    if (mode === 1) {
      text(svg, 28, 78, "A", "multiple-row-label", "start");
      segment(svg, x, 75, multiple, unitWidth, { whole: "blank" });
      text(svg, 28, 183, "B", "multiple-row-label", "start");
      segment(svg, x, 180, 1, unitWidth, { unit: true });
    } else if (mode === 2) {
      text(svg, 28, 133, "A", "multiple-row-label", "start");
      segment(svg, x, 130, multiple, unitWidth, { whole: "blank", unit: true });
    } else {
      text(svg, 28, 78, "A", "multiple-row-label", "start");
      segment(svg, x, 75, 1, unitWidth, { unit: true });
      text(svg, 28, 183, "B", "multiple-row-label", "start");
      segment(svg, x, 180, multiple, unitWidth, { whole: "blank" });
    }
    return svg;
  }

  function make() {
    const t = TYPES[type.value];
    const s = DIFF[diff.value];
    const n = Number(count.value);
    const pool = [];
    for (let v = s.min; v <= s.max; v += 1) pool.push(v);
    const selected = shuffle(pool).slice(0, n);

    const qf = document.createDocumentFragment();
    const af = document.createDocumentFragment();
    selected.forEach((multiple, i) => {
      const sec = document.createElement("section");
      sec.className = "multiple-question-item";
      const num = document.createElement("span");
      num.className = "multiple-question-number";
      num.textContent = `(${i + 1})`;
      sec.append(num, diagram(t.mode, multiple));
      qf.appendChild(sec);

      const p = document.createElement("p");
      p.className = "multiple-answer-item";
      p.textContent = `${i + 1}. ${multiple}`;
      af.appendChild(p);
    });

    qs.replaceChildren(qf);
    ans.replaceChildren(af);
    wDiff.textContent = `難易度：${s.label}`;
    wCount.textContent = `問題数：${n}問`;
    status.textContent = `${t.label}・${s.label}を${n}問、重複なしで作成しました。`;
    pPage.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  type.addEventListener("change", (e) => {
    if (isType(e.target.value)) {
      e.stopImmediatePropagation();
      controls();
    } else {
      clear();
    }
  }, true);

  diff.addEventListener("change", (e) => {
    if (!isType()) return;
    e.stopImmediatePropagation();
    controls();
  }, true);

  create.addEventListener("click", (e) => {
    if (!isType()) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    make();
  }, true);
})();
