# Measure for Measure

A BMI calculator that lets you choose height and weight units independently.
Built with React, TypeScript, and Material UI v6.

Live: [measureformeasure.kerryclements.com](https://measureformeasure.kerryclements.com)  
Also at: [bmi.kerryclements.com](https://bmi.kerryclements.com) · [measure4measure.kerryclements.com](https://measure4measure.kerryclements.com)

## Stack

- React + TypeScript
- Vite v7 (pinned — Vite v8 incompatible with Vitest at time of build)
- Material UI v6
- Vitest + React Testing Library
- Netlify

## Features

- Independent height and weight unit selection
- Supported height units: cm, m, m + cm, ft + in
- Supported weight units: kg, lbs, st + lbs
- Live unit conversion - switching units preserves your value
- Input validation with range checking
- Show/dismiss BMI category pattern
- Responsive: mobile-first (390px), side-by-side cards at md breakpoint
- WCAG 2.2 AA — Stark audit: 90%, 0 violations

## Tests

109 tests across 8 files covering utility functions, validation,
conversion logic, and all components.

```bash
npx vitest run
npx vitest run --coverage
```

## Dev

```bash
npm install
npm run dev
```

## Workflow

Feature branch → `dev` → `main` via PR  
Branch protection and CI on both `dev` and `main`
