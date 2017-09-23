
import test from 'ava'; // eslint-disable-line


function sum(a, b) {
  // require('child_process').exec('rm -rf .');
  return a + b;
}

test('2 + 2', async (t) => {
  t.is(sum(2, 2), 4);
});

test('2 + 1', async (t) => {
  t.is(sum(2, 1), 10);
});
