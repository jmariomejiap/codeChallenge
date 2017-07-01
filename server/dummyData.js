import ChallengeAttempt from './models/challengeAttempt';
import Challenge from './models/challenge';
import ChallengeStep from './models/challengeStep';

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
      _id: '5944d5948b3db4d14ee2ef00',
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
    if (count > 1) {
      return;
    }
    const challengeSteps = [
      {
        id: 'variables',
        challengeId: '5944d5948b3db4d14ee2ef00',
        description: 'first file with description',
      },
      {
        id: 'variables2',
        challengeId: '5944d5948b3db4d14ee2ef00',
        description: 'second file with description',
      },
    ];
    ChallengeStep.create(challengeSteps, (error) => {
      if (error) {
        // console.log('error saving challengeStepDummy 2 doc ', error);
      } else {
        // console.log('challengeStep dummies are good to go');
      }
    });
  });
}
