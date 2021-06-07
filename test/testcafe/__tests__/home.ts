import { ClientFunction } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'

fixture('Landing Page')
  .page('http://localhost:8080/#/')

test('Clicking Login redirects to login page', async t => {
  await t.click(VueSelector('ref:loginBtn'))
  const getURL = ClientFunction(() => window.location.href)
  const url = await getURL()
  await t.expect(url).eql('http://localhost:8080/#/login/')
})

test('Clicking Sign Up redirects to signup page', async t => {
  await t.click(VueSelector('ref:signUpBtn'))
  const getURL = ClientFunction(() => window.location.href)
  const url = await getURL()
  await t.expect(url).eql('http://localhost:8080/#/register/')
})
