import { Selector } from 'testcafe'
declare const fixture: FixtureFn
declare const test: TestFn

fixture('Home')
  .page('http://localhost:8080/#/')

test('My first testcafe test', async t => {
  await t.expect(Selector('title').innerText).eql('Adaptive Learning')
})
