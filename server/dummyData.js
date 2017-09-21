import ChallengeAttempt from './models/challengeAttempt';
import Challenge from './models/challenge';
// import ChallengeStep from './models/challengeStep';


export default async function () {
  const challengeCount = await Challenge.count();
  if (challengeCount > 0) {
    return;
  }
  const challengeDoc = await Challenge.create({ name: 'Math Challenge', folderName: 'test_challenge_001' });

  await ChallengeAttempt.create({
    accessCode: 'myAccessCode',
    passCode: 'myPassCode',
    fullName: 'dummyUserName',
    email: 'dummy@dummy.com',
    score: 0,
    currentStepId: '001',
    challengeId: challengeDoc._id,
    status: 'not_started',
  });
}
