import safeEval from 'safe-eval';

const evalutator = (userAnswer, input, expectedOutput) => {
  // const answer = 'function sum(a, b) {return a + b;}';

  const template = `(${userAnswer})(${input[0]},${input[1]})`;
  const result = safeEval(template);
  if (result === expectedOutput) {
    return true;
  }
  return false;
};

export default evalutator;
