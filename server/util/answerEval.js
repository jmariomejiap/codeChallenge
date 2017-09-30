import safeEval from 'safe-eval';

const evalutator = (userAnswer, input, expectedOutput) => {
  // const answer = 'function sum(a, b) {return a + b;}';

  const template = `(${userAnswer})(${input[0]},${input[1]})`;
  try {
    const result = safeEval(template);
    console.log('this is the result', result);
    if (result === expectedOutput) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default evalutator;
