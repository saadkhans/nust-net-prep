# NUST NET Prep — Engineering / Computing

**Open it:** https://saadkhans.github.io/nust-net-prep/

A practice site for the NUST Entry Test (NET), Engineering/Computing stream (NET-1 to NET-4): 200 MCQs in 3 hours, Maths 50%, Physics 30% and English 20%, with no negative marking.

## What's inside
- **8-week plan** (16 Nov 2026 – 10 Jan 2027). It covers all 30 syllabus modules: 12 Maths, 13 Physics and 5 English. It ends just before NET Series-2.
- **Learning modules.** Each module has key points and formulas, the matching FBISE textbook chapter, and a **topic assessment**. Assessments are freshly generated on every attempt. Pass at 60% to complete a module; 80% counts as mastered.
- **3 full mock tests** (`mocks/mock-1.json` to `mock-3.json`). Each is fixed, with 200 MCQs (100 Maths, 60 Physics, 40 English) and a 180-minute CBT-style timer, a question palette and mark-for-review. The results page has a topic-by-topic breakdown and explanations.
- **Progress tracking** is saved to `progress/progress.json` in this repo, so it follows you to any computer.
- **Progress emails.** An hourly scheduled task emails new completions and scores from waleed@stech.ink.

## One-time setup on each computer
Open **Settings** on the site and paste a GitHub fine-grained token. Give it *Only select repositories → nust-net-prep* and *Contents: Read and write*. Without a token the site still works, but progress stays on that computer.

## Notes
- All questions and passages are original. Maths and Physics numericals are computed by code (`js/bank/`), so the answers are exact. `node scripts/build-mocks.mjs` rebuilds the mocks and validates every question.
- NUST does not publish past papers. Also use the official sample test at ugadmissions.nust.edu.pk and your FBISE textbooks.
