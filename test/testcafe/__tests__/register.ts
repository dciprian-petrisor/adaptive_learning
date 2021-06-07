import { ActivationEmailListener } from '../utils'
import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'

fixture('Register')
  .page('http://localhost:8080/#/register/')

test('Register and verify an account.', async t => {
  const mailListener = new ActivationEmailListener()
  const r = Math.random().toString(36).substring(7)
  const email = `${r}@email.com`
  await t.typeText(VueSelector('ref:firstNameInput'), 'Jane')
    .typeText(VueSelector('ref:lastNameInput'), 'Doe')
    .typeText(VueSelector('ref:usernameInput'), 'janedoe')
    .typeText(VueSelector('ref:emailInput'), email)
    .typeText(VueSelector('ref:passwordInput'), 'Acomplexpassword123!')
    .typeText(VueSelector('ref:confirmPasswordInput'), 'Acomplexpassword123!')
    .click(VueSelector('ref:submitBtn'))

  const mailRaw = await mailListener.mail(60)
  const activateLinkRegex = /(?<link>http:\/\/.*?\/activate\/.*)\s*?$/gm
  const matchResult = mailRaw.match(activateLinkRegex)
  if (!matchResult) {
    throw mailRaw
  }
  const activationLink = matchResult[0]
  await t.navigateTo(activationLink.trim())
    .expect(Selector('#activateResult').innerText).contains('Success! Account verified!')
}).after(async t => {
  await t.eval(() => {
    sessionStorage.clear()
    localStorage.clear()
  })
})
