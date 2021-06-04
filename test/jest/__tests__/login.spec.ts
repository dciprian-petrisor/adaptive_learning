import { mountFactory, qLayoutInjections } from '@quasar/quasar-app-extension-testing-unit-jest'
import { QBtn, QPage, QInput, QForm, QIcon } from 'quasar'
import PageLogin from 'src/pages/Login/Login'
import LoginForm from 'src/components/LoginForm/LoginForm'
import { PiniaPlugin, createPinia } from 'pinia'
import { createLocalVue } from '@vue/test-utils'
import VueCompositionAPI from '@vue/composition-api'

describe('PageLogin', () => {
  const factory = mountFactory(PageLogin, {
    mount: {
      provide: qLayoutInjections(),
      components: { QBtn, PageLogin, QPage, QIcon }
    }
  })

  it('should render without errors', () => {
    const wrapper = factory()
    expect(wrapper).toBeTruthy()
  })
})

describe('LoginForm', () => {
  const localVue = createLocalVue()
  localVue.use(VueCompositionAPI)
  localVue.use(PiniaPlugin)
  const pinia = createPinia()
  const factory = mountFactory(LoginForm, {
    mount: {
      localVue: localVue,
      pinia: pinia,
      components: { QForm, QBtn, QInput, QIcon },
      type: 'full'
    }

  })

  it('should fail form validation on missing username', async () => {
    const wrapper = factory()
    const loginForm = wrapper.findComponent({ ref: 'loginForm' }).vm as QForm
    wrapper.vm.password = '1234'
    wrapper.vm.username = ''
    await localVue.nextTick()
    const validateResult = await loginForm.validate()
    expect(validateResult).toBe(false)
  })

  it('should fail form validation on missing password', async () => {
    const wrapper = factory()
    const loginForm = wrapper.findComponent({ ref: 'loginForm' }).vm as QForm
    wrapper.vm.password = ''
    wrapper.vm.username = 'myname'
    await localVue.nextTick()
    const validateResult = await loginForm.validate()
    expect(validateResult).toBe(false)
  })

  it('should pass validation on filled username and password', async () => {
    const wrapper = factory()
    const loginForm = wrapper.findComponent({ ref: 'loginForm' }).vm as QForm
    wrapper.vm.password = '1234'
    wrapper.vm.username = 'myname'
    await localVue.nextTick()
    const validateResult = await loginForm.validate()
    expect(validateResult).toBe(true)
  })
})
