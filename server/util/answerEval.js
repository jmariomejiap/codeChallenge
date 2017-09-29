import safeEval from 'safe-eval';

const evalutator = (userAnswer, input, expectedOutput) => {
  // const answer = 'function sum(a, b) {return a + b;}';

  const template = `(${userAnswer})(${input[0]},${input[1]})`;
  console.log(template);
  const result = safeEval(template);
  console.log(result);
  if (result === expectedOutput) {
    return true;
  }
  return false;
};

/*
const input = 'function sum(a, b) {return a + b;}';
const functionArguments = '3,3';
const template = `(${input})(${functionArguments})`;
console.log(template);
const result = safeEval(template);
console.log(result);
*/


export default evalutator;
