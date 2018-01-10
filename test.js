import test from 'ava'
import execa from 'execa'
test('webdict --help', async t => {
  const helpStdout = await execa('./webdict.js', ['--help'])
    // console.log(help_stdout);
  t.true(helpStdout.stdout.length > 0)
})
