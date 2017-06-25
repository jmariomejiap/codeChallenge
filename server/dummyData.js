import ChallengeAttempt from './models/challenge_attempt';

export default function () {
  ChallengeAttempt.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const challengeDummy = new ChallengeAttempt({
      accessCode: 'myAccessCode',
      passCode: 'myPassCode',
      fullName: 'dummyUserName',
      email: 'dummy@dummy.com',
      score: 0,
      currentStepId: '594559c8174a0ce89eba1723',
      challengeId: '5944d5948b3db4d14ee2ef00',
      status: 'not_started',
    });
    ChallengeAttempt.create(challengeDummy, (error) => {
      if (error) {
        // console.log('error saving dummy. ', error);
      } else {
        // console.log('challenge dummy is good to go');
      }
    });
  });
}
