import safeEval from 'safe-eval';

const evalutator = (userAnswer, input, expectedOutput) => {
  const template = `(${userAnswer})(${input[0]},${input[1]})`;
  try {
    const result = safeEval(template);
    if (result === expectedOutput) {
      return { passed: true, result };
    }
    return { passed: false, result };
  } catch (error) {
    return { passed: false, errorName: error.name, errorMessage: error.message };
  }
};

export default evalutator;
