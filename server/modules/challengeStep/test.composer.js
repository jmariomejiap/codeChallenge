import test from 'ava'; // eslint-disable-line
import createTestString from '../../util/testComposer';


test.skip('should fail if incomplete arguments,  error missing token', (t) => {
  const input = `
  function sum(a, b) {
    return a - b;
  }
  `;
  const testInfo = [
    {
      input: [1, 2],
      expected_output: 3,
      sample: true,
    },
    {
      input: [10, 2],
      expected_output: 12,
      sample: true,
    },
  ];
  const string = createTestString(input, false, testInfo);

  const match1 = `test('2 + 2', async (t) => {
    t.is(sum(2, 2), 4);
  });`;
  t.is(string.match(match1));

  const match2 = `test('10 + 2', async (t) => {
    t.is(sum(10, 2), 12);
  });`;
  t.is(string.match(match2));
});
