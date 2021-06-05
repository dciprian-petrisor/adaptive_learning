/* eslint-disable no-undef */
import { Selector } from 'testcafe'

fixture('Home')
  .page('http://localhost:8080/#/')

test('My first testcafe test', async t => {
  await t.expect(Selector('title').innerText).eql('Adaptive Learning')
})
