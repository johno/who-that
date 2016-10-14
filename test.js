import test from 'ava'
import whoThat from './'

test('who-that finds out who that', async t => {
  const who = await whoThat({
    github: 'johnotander',
    npm: 'johno',
    twitter: '4lpine'
  })

  console.log(who)
  t.truthy(who)
})
