import test from 'ava'
import whoThat from './'

test('who-that does something awesome', t => {
  t.plan(1)

  t.true(whoThat())
})
