/// <reference types="node" />
declare let watermarkor: (imagesLocationArray: string[], watermarkLocation: string, outputLocationArray?: string[]) => Promise<boolean> | Promise<Buffer[]>;
export = watermarkor;
