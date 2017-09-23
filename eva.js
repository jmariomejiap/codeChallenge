var safeEval = require('safe-eval')

// doesn't work, looks like a scope issue in the VM
const codeStr = `
function sum(a, b) {
  return a + b;
}

sum(2, 2)
`;

// works
const codeStr1 = `
(function sum(a, b) {
  return a + b;
})(2, 2)
`;

// doesn't work
const codeStr2 = `
const sum = (a, b) => {
  return a + b;
}

sum(2, 2);
`;

var evaluated = safeEval(codeStr1);
console.log(evaluated);
