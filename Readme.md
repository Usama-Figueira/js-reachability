# AppSec Reachability Test Project

This project demonstrates dynamic and complex JavaScript execution flows to test the **reachability** of vulnerable dependencies using AppSec tools.

## 🔍 What It Tests

- Dynamic `require()` and `import()`
- Callbacks and higher-order functions
- `eval()` and `Function()` use
- Recursion, async chains, conditional branches
- Use of **vulnerable dependencies** like:
  - `lodash@4.17.11` (prototype pollution)
  - `jquery@3.4.0` (XSS)
  - `express@4.16.0` (legacy bugs)

## 📦 Setup

```bash
npm install
node reachability_test.js

```

## 🧪 Expected Tool Capabilities
Feature	Should Detect
Vulnerable lodash.set call	✅
Dynamic require/import paths	✅
Eval and constructor usage	✅
Indirect and recursive calls	✅
Dead/unreachable modules	❌

## Use a security scanner to:

Detect vulnerable dependencies

Prove if the vulnerable function (like _.set) is actually used (reachable)

Check dynamic imports and indirect flows are analyzed correctly
