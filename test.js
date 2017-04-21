import test from 'ava'
import execa from 'execa'
test('webdict --help', async t => {
  const helpStdout = await execa('./webdict.js', ['--help'])
    // console.log(help_stdout);
  t.true(helpStdout.stdout.length > 0)
})
test('searching `awordwhichdoesnotexist` in urbandictionary', async t => {
  const ansStdout = await execa('./webdict.js', ['-u', 'awordwhichdoesnotexist'])
  // console.log(ansStdout)
  t.is(ansStdout.stdout, 'check the spelling again')
})
