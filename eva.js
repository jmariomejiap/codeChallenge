const safeEval = require('safe-eval');
const fs = require('fs');

/*
const readInfoJson = async () => {
  const info = await fs.readfile('./challenge_data/test_challenge_001/001/info.json');
  console.log(info);
  return info;
};
*/

function readInfoJson() {

}

readInfoJson();

const input = 'function sum(a, b) {return a + b;}';
const functionArguments = '3,3';
const template = `(${input})(${functionArguments})`;
console.log(template);
const result = safeEval(template);
console.log(result);





//////////////////////////////////////////////////////////

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



const evaluated = safeEval(codeStr1);
console.log(evaluated);



