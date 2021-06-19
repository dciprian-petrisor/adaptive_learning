declare module 'vue-advanced-cropper' {
    import Vue, { VueConstructor } from 'vue'

    export interface CropCoordinates {
      height: number;
      left: number;
      top: number;
      width: number;
    }

    export interface CropImage {
        height: number;
        src: string;
        width: number;
    }

    export interface CropVisibleArea {
      height: number;
      left: number;
      top: number;
      width: number;
    }

    export interface CropResult {
      canvas: HTMLCanvasElement;
      coordinates: CropCoordinates;
      image: CropImage;
      visibleArea: CropVisibleArea;

    }

    export const Cropper: VueConstructor<Vue>

    interface CropperInterface {
      getResult: () => CropResult;
    }

}
