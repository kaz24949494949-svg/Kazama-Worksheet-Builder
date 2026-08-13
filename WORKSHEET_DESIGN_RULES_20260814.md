# Worksheet Design Rules - 2026-08-14 Red-Team Revision

This file supersedes the System 3 naming guidance in `WORKSHEET_DESIGN_RULES.md` for this change set.

## Length-sensitive diagrams
- Use coordinate/SVG drawing when physical length carries mathematical meaning.
- One unit must be generated from one shared numeric width; do not rely on image-generation approximation.

## Multiples worksheets
- System 1: B's 1-unit segment is the reference; A is an integer number of those units.
- System 2: the 1-unit marker is embedded in A; A is an integer number of those units.
- System 3: A's 1-unit segment is the reference; B is an integer number of those units.
- For System 3, preserve the actual prototype operation first: A is one unit, B is n equal units, and the student writes integer n in B's circle.
- Do not force a theoretical subtitle such as "unit fraction" or "integer multiple" when that label goes beyond the actual prompt. Use an operation-descriptive title unless the prototype purpose has been explicitly fixed.
- If a future question explicitly asks for the reverse relation B/A = 1/n, treat that as a separate unit-fraction reading task.

## Source-derived word-problem worksheets
- Preserve the source sequence: reading segmentation -> oral reading -> information extraction -> line diagram -> calculation.
- Preserve the source problem type and unknown quantity when creating analog problems.
- Reproduce the source's incomplete line-diagram scaffold when the source provides one; do not replace it with an unrelated blank or a newly invented diagram structure.
- Do not add a new worksheet structure and call it source-format compliant.
- Separate source-supported statements from Kazama-added instructional rules.

## Percentage reading rule added by Kazama
- Base amount x rate = compared amount.
- In the percentage quantity expression "base amount no rate", teach "no" as the multiplication link: base amount x rate.
- Display this as a Kazama-added reinforcement when it is not explicitly stated in the source material.
- This rule is scoped to the percentage quantity expression; do not generalize it to every Japanese "no".

## Japanese reading heuristics
- Do not state "predicate + de always keeps the same subject" as a universal grammar law.
- If the worksheet method uses it as a reading heuristic, label it as such and verify it against the actual sentence.

## Deprecated prototypes
- The independently designed "line-diagram algebra worksheet" prototypes created before the detailed source analysis are research drafts, not formal Builder templates.
- The early "source-format compliant" three-problem percentage PDFs are also research drafts and must not be used as the reference format.
