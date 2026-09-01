"use strict";

(() => {
  if (!document.querySelector('link[data-multiple-rate-bridge-print]')) {
    const printFix = document.createElement("link");
    printFix.rel = "stylesheet";
    printFix.href = "multiple-rate-bridge-print-v1.css";
    printFix.dataset.multipleRateBridgePrint = "v1";
    document.head.appendChild(printFix);
  }

  const typeSelect = document.getElementById("worksheetType");
  const categorySelect = document.getElementById("worksheetCategory");
  if (!typeSelect || !categorySelect) return;

  const groups = [
    {
      id: "math-bridge",
      label: "算数｜分数・わり算・比の値 接続",
      values: [
        "bridge-fraction-to-division",
        "bridge-division-to-fraction",
        "bridge-division-to-fraction-reduce",
        "bridge-ratio-to-fraction",
        "bridge-ratio-to-fraction-reduce",
        "bridge-three-representations-guided",
        "bridge-three-representations-open"
      ]
    },
    {
      id: "math-fraction",
      label: "算数｜分数の意味・式",
      values: ["fraction-box-equations", "integer-times-box", "integer-equals-fraction", "integer-equals-integer-over-box", "fraction-to-division"]
    },
    {
      id: "math-multiple",
      label: "算数｜倍の関係",
      values: ["multiple-system1", "multiple-system2", "multiple-system3"]
    },
    {
      id: "math-multiple-rate-bridge",
      label: "算数｜倍数→割合 接続",
      values: [
        "multiple-rate-bridge-01",
        "multiple-rate-bridge-02",
        "multiple-rate-bridge-03",
        "multiple-rate-bridge-04",
        "multiple-rate-bridge-05",
        "multiple-rate-bridge-06",
        "multiple-rate-bridge-07",
        "multiple-rate-bridge-08",
        "multiple-rate-bridge-09",
        "multiple-rate-bridge-10",
        "multiple-rate-bridge-11",
        "multiple-rate-bridge-12"
      ]
    },
    {
      id: "math-ratio",
      label: "算数｜比",
      values: ["simplify-ratio", "ratio-value", "equivalent-ratio", "proportion"]
    },
    {
      id: "math-rate-basic",
      label: "算数｜割合・基本3用法",
      values: ["rate-decimal", "rate-percent", "compared-amount-decimal", "base-amount-decimal", "rate-three-types-mixed"]
    },
    {
      id: "math-rate-word",
      label: "算数｜割合・文章題ステップ",
      values: ["rate-word-problems", "rate-line-diagram", "rate-word-line-equation", "rate-word-complete-line-equation", "rate-word-draw-line-equation", "rate-word-self-equation", "rate-word-select-info-equation", "rate-word-two-step"]
    },
    {
      id: "math-word-solution",
      label: "算数｜文章題解決",
      values: ["word-solution-rate", "word-solution-rate-auto", "word-solution-ratio", "word-solution-speed"]
    },
    {
      id: "english-make",
      label: "英語｜make",
      test: (value) => ["make-adjective-order", "make-adjective-rewrite", "make-bare-infinitive-order"].includes(value)
    },
    {
      id: "english-keep",
      label: "英語｜keep 系",
      test: (value) => value.startsWith("keep-")
    },
    {
      id: "english-construction",
      label: "英語｜物主構文・目的語をとる動詞",
      test: (value) => /^(prevent|leave|enable|cause|force|remind|deprive)-/.test(value)
    },
    {
      id: "english-transform",
      label: "英語｜表現変換・書き換え",
      test: (value) => value.endsWith("-rewrite") && value !== "make-adjective-rewrite"
    }
  ];

  const initialOptions = Array.from(typeSelect.options).map((option, order) => ({
    value: option.value,
    text: option.textContent,
    order
  }));

  const groupForValue = (value) => {
    for (const group of groups) {
      if (group.values?.includes(value) || group.test?.(value)) return group.id;
    }
    return "other";
  };

  const records = initialOptions.map((item) => ({ ...item, groupId: groupForValue(item.value) }));
  const allGroups = [
    ...groups,
    { id: "other", label: "その他" }
  ].filter((group) => records.some((item) => item.groupId === group.id));

  function makeOption(record) {
    const option = document.createElement("option");
    option.value = record.value;
    option.textContent = record.text;
    return option;
  }

  function fillCategorySelect() {
    categorySelect.replaceChildren();
    allGroups.forEach((group) => {
      const count = records.filter((item) => item.groupId === group.id).length;
      const option = document.createElement("option");
      option.value = group.id;
      option.textContent = `${group.label}（${count}）`;
      categorySelect.appendChild(option);
    });
    const all = document.createElement("option");
    all.value = "all";
    all.textContent = `すべての教材（${records.length}）`;
    categorySelect.appendChild(all);
  }

  function renderTypeOptions(categoryId, preferredValue) {
    typeSelect.replaceChildren();

    if (categoryId === "all") {
      allGroups.forEach((group) => {
        const members = records.filter((item) => item.groupId === group.id);
        if (!members.length) return;
        const optgroup = document.createElement("optgroup");
        optgroup.label = group.label;
        members.forEach((record) => optgroup.appendChild(makeOption(record)));
        typeSelect.appendChild(optgroup);
      });
    } else {
      records
        .filter((item) => item.groupId === categoryId)
        .sort((a, b) => a.order - b.order)
        .forEach((record) => typeSelect.appendChild(makeOption(record)));
    }

    const canKeep = preferredValue && Array.from(typeSelect.options).some((option) => option.value === preferredValue);
    if (canKeep) typeSelect.value = preferredValue;
    else if (typeSelect.options.length) typeSelect.selectedIndex = 0;
  }

  fillCategorySelect();

  const initialValue = typeSelect.value || records[0]?.value || "";
  const initialGroup = groupForValue(initialValue);
  categorySelect.value = allGroups.some((group) => group.id === initialGroup) ? initialGroup : "all";
  renderTypeOptions(categorySelect.value, initialValue);

  categorySelect.addEventListener("change", () => {
    const before = typeSelect.value;
    renderTypeOptions(categorySelect.value, before);
    if (typeSelect.value !== before) {
      typeSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
})();
