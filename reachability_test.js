// File: reachability_test.js

import _ from 'lodash';
import express from 'express';

// Pattern 1: Dynamic require
function loadModule(name) {
  const mod = require('./modules/' + name);
  mod.run();
}

// Pattern 2: Dynamic import
async function loadAndUse(dynamicName) {
  const module = await import(`./modules/${dynamicName}.js`);
  module.execute();
}

// Pattern 3: Higher-order function
function wrap(fn) {
  return function (...args) {
    console.log('wrapped call');
    return fn(...args);
  }
}
const cb = wrap(function secret(a, b) {
  return a + b;
});
cb(2, 3);

// Pattern 4: Dynamic property
const obj = {
  real: () => console.log('real called'),
  fake: () => console.log('fake called')
};
const chosen = obj[process.env.USE_REAL ? 'real' : 'fake'];
chosen();

// Pattern 5: Eval and Function constructor
eval("console.log('eval used')");
const ctor = Function("x", "console.log('Function ctor:', x)");
ctor('used');

// Pattern 6: Recursive + indirect call
function indirectCaller(fn) {
  return () => fn();
}
function recurse(n) {
  if (n <= 0) return;
  console.log('recurse', n);
  recurse(n - 1);
}
const rec = indirectCaller(() => recurse(2));
rec();

// Pattern 7: Conditional require
if (Math.random() > 0.5) {
  require('./modules/optionalA').run();
} else {
  require('./modules/optionalB').run();
}

// Pattern 8: Dynamic dispatcher with eval
function dynamicDispatcher(action) {
  const code = `console.log('Action:', '${action}')`;
  eval(code);
}
dynamicDispatcher('LOGIN');

// Pattern 9: Async callbacks
function asyncChain(cb1, cb2) {
  setTimeout(() => {
    cb1();
    cb2 && cb2();
  }, 10);
}
asyncChain(
  () => console.log('callback 1'),
  () => console.log('callback 2')
);

// Load foo (vulnerable reachability test)
loadModule("foo");
loadAndUse("dynamicName");

// Use lodash vulnerable function
let objVuln = {};
_.set(objVuln, '__proto__.polluted', true);
console.log({ polluted: {}.polluted });

// Simulate Express server (minimal usage to trigger scan)
const app = express();
app.get("/", (req, res) => res.send("OK"));
