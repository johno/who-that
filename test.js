import test from 'ava'
import whoThat from './'

test('who-that finds out who that', async t => {
  const who = await whoThat({
    github: 'johnotander',
    npm: 'johno',
    twitter: '4lpine'
  })

  t.truthy(who)
})

test('who-that finds out who that email', async t => {
  const who = await whoThat({
    email: 'johnotander@gmail.com',
    npm: 'johno',
    twitter: '4lpine'
  })

  t.truthy(who)
})

test('who-that finds out who that without npm', async t => {
  const who = await whoThat({
    email: 'johnotander@gmail.com',
    twitter: '4lpine'
  })

  t.truthy(who)
})
