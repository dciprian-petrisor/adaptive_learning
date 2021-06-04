import { mountFactory, qLayoutInjections } from '@quasar/quasar-app-extension-testing-unit-jest'
import { QBtn, QPage, QInput, QForm, QIcon } from 'quasar'
import PageRegister from 'src/pages/Register/Register'
import RegisterForm from 'src/components/RegisterForm/RegisterForm'
import { PiniaPlugin, createPinia } from 'pinia'
import { createLocalVue, Wrapper } from '@vue/test-utils'
import VueCompositionAPI from '@vue/composition-api'

describe('PageRegister', () => {
  const factory = mountFactory(PageRegister, {
    mount: {
      provide: qLayoutInjections(),
      components: { QBtn, PageRegister, QPage, QIcon }
    }
  })

  it('should render without errors', () => {
    const wrapper = factory()
    expect(wrapper).toBeTruthy()
  })
})

describe('RegisterForm', () => {
  const localVue = createLocalVue()
  localVue.use(VueCompositionAPI)
  localVue.use(PiniaPlugin)
  const pinia = createPinia()
  const factory = mountFactory(RegisterForm, {
    mount: {
      localVue: localVue,
      pinia: pinia,
      components: { QForm, QBtn, QInput, QIcon },
      type: 'full'
    }

  })

  const setFormData = (wrapper: Wrapper<RegisterForm>) => {
    wrapper.vm.password = 'Acomplicatedpassword123!'
    wrapper.vm.confirmPassword = 'Acomplicatedpassword123!'
    wrapper.vm.firstName = 'firstname'
    wrapper.vm.lastName = 'lastname'
    wrapper.vm.email = 'email@gmail.com'
    wrapper.vm.username = 'username'
  }

  it('should fail form validation on missing username', async () => {
    const wrapper = factory()
    const registerForm = wrapper.findComponent({ ref: 'registerForm' }).vm as QForm
    setFormData(wrapper)
    wrapper.vm.username = ''
    await localVue.nextTick()
    const validateResult = await registerForm.validate()
    expect(validateResult).toBe(false)
  })

  it('should fail form validation on missing password', async () => {
    const wrapper = factory()
    const registerForm = wrapper.findComponent({ ref: 'registerForm' }).vm as QForm
    setFormData(wrapper)
    wrapper.vm.password = ''
    wrapper.vm.confirmPassword = ''
    await localVue.nextTick()
    const validateResult = await registerForm.validate()
    expect(validateResult).toBe(false)
  })

  it('should fail validation on invalid email', async () => {
    const wrapper = factory()
    const registerForm = wrapper.findComponent({ ref: 'registerForm' }).vm as QForm
    setFormData(wrapper)
    wrapper.vm.email = 'invalid_email@'
    await localVue.nextTick()
    const validateResult = await registerForm.validate()
    expect(validateResult).toBe(false)
  })

  it('should fail validation on missing firstname', async () => {
    const wrapper = factory()
    const registerForm = wrapper.findComponent({ ref: 'registerForm' }).vm as QForm
    setFormData(wrapper)
    wrapper.vm.firstName = ''
    await localVue.nextTick()
    const validateResult = await registerForm.validate()
    expect(validateResult).toBe(false)
  })

  it('should fail validation on missing lastname', async () => {
    const wrapper = factory()
    const registerForm = wrapper.findComponent({ ref: 'registerForm' }).vm as QForm
    setFormData(wrapper)
    wrapper.vm.lastName = ''
    await localVue.nextTick()
    const validateResult = await registerForm.validate()
    expect(validateResult).toBe(false)
  })

  it('should pass validation on filled username and password', async () => {
    const wrapper = factory()
    const registerForm = wrapper.findComponent({ ref: 'registerForm' }).vm as QForm
    setFormData(wrapper)
    await localVue.nextTick()
    const validateResult = await registerForm.validate()
    expect(validateResult).toBe(true)
  })
})
