import { mountFactory, qLayoutInjections } from '@quasar/quasar-app-extension-testing-unit-jest'
import { QBtn, QPage } from 'quasar'
import PageLanding from 'src/pages/Landing/Landing'

const factory = mountFactory(PageLanding, {
  mount: {
    provide: qLayoutInjections(),
    components: { QBtn, PageLanding, QPage }
  }
})

describe('PageLanding', () => {
  it('should render without errors', () => {
    const wrapper = factory()
    expect(wrapper).toBeTruthy()
  })
})
