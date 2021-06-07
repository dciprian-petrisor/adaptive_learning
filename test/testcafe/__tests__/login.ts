import { ClientFunction } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'

fixture('Login')
  .page('http://localhost:8080/#/login/')

test('Login with valid credentials redirects to dashboard.', async t => {
  await t.typeText(VueSelector('ref:usernameInput'), 'root')
    .typeText(VueSelector('ref:passwordInput'), 'root')
    .click(VueSelector('ref:submitBtn'))

  const getURL = ClientFunction(() => window.location.href)
  const url = await getURL()
  await t.expect(url).eql('http://localhost:8080/#/dashboard/')
}).after(async t => {
  await t.eval(() => {
    sessionStorage.clear()
    localStorage.clear()
  })
})
