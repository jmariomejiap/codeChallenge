import ChallengeAttempt from './models/challengeAttempt';
import Challenge from './models/challenge';
import ChallengeStep from './models/challengeStep';

export default function () {
  Challenge.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    (async function() {
      const challengeDoc = await Challenge.create({ name: 'first', folderName: 'beginnerFunctions' });
      const challengeStepsDoc = await ChallengeStep.create([
        { id: 'variables', challengeId: challengeDoc._id, description: 'first file with description' },
        { id: 'variables2', challengeId: challengeDoc._id, description: 'second file with description' },
      ]);
      await ChallengeAttempt.create({
        accessCode: 'myAccessCode',
        passCode: 'myPassCode',
        fullName: 'dummyUserName',
        email: 'dummy@dummy.com',
        score: 0,
        currentStepId: challengeStepsDoc[0]._id,
        challengeId: challengeStepsDoc[0].challengeId,
        status: 'not_started' });
    }());
  });
}
