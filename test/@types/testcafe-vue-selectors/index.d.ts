declare module 'testcafe-vue-selectors' {
    import { Selector } from 'testcafe'
    export interface VueSelector extends Selector {
      getVue: () => Vue
    }
    export default function VueSelector (name: string): VueSelector
}
