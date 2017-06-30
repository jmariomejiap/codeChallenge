import ChallengeAttempt from './models/challengeAttempt';
import Challenge from './models/challenge';
import ChallengeStep from './models/ChallengeStep';

export default function () {
  ChallengeAttempt.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const challengeAttemptDummy = new ChallengeAttempt({
      accessCode: 'myAccessCode',
      passCode: 'myPassCode',
      fullName: 'dummyUserName',
      email: 'dummy@dummy.com',
      score: 0,
      currentStepId: '594559c8174a0ce89eba1723',
      challengeId: '5944d5948b3db4d14ee2ef00',
      status: 'not_started',
    });
    ChallengeAttempt.create(challengeAttemptDummy, (error) => {
      if (error) {
        // console.log('error saving dummy. ', error);
      } else {
        // console.log('challengeAttempt dummy is good to go');
      }
    });
  });


  Challenge.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const challengeDummy = new Challenge({
      name: 'first',
      folderName: 'beginnerFunctions',
    });

    Challenge.create(challengeDummy, (error) => {
      if (error) {
        // console.log('error saving challengeDummy ', error);
      } else {
        // console.log('challenge dummy is good to go');
      }
    });
  });


  ChallengeStep.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const challengeStepDummy = new ChallengeStep({
      id: 'variables',
      challengeId: '5944d5948b3db4d14ee2ef00',
      description: 'file with description',
    });
    ChallengeStep.create(challengeStepDummy, (error) => {
      if (error) {
        // console.log('error saving challengeStepDummy ', error);
      } else {
        // console.log('challengeStep dummy is good to go');
      }
    });
  });
}
