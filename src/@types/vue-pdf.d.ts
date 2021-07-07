declare module 'vue-pdf' {
    import { Vue, Component } from 'vue-property-decorator'

    export interface PDFDocument {
        numPages: number;
    }
    export interface PDFDocumentLoadingTask {
        promise: Promise<PDFDocument>;
    }

    @Component({})
    declare class PDFComponent extends Vue {
      static createLoadingTask(path: string): PDFDocumentLoadingTask
    }
    export default PDFComponent
}
