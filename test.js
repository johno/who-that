import test from 'ava'
import whoThat from './'

test('who-that does something awesome', async t => {
  t.plan(1)

  const who = await whoThat({
    github: 'johnotander',
    npm: 'johno',
    twitter: '4lpine'
  })

  console.log(who)
  t.pass()
})
