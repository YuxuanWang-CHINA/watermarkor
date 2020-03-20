import * as jimp from 'jimp';
import * as fse from 'fs-extra';

let readAll = function(imageLocationArray: string[]) {
    return new Promise<jimp[]>((resolve, reject) => {
        let re: object[] = [];
        for (let v of imageLocationArray) {
            re.push(jimp.read(v));
        }
        Promise.all(re).then((res: jimp[]) => {
            return resolve(res);
        });
    });
};

let addOne = function(imageJimp, watermarkJimp) {
    return new Promise<Buffer>((resolve, reject) => {
        imageJimp
            .composite(
                watermarkJimp,
                imageJimp.bitmap.width - watermarkJimp.bitmap.width,
                imageJimp.bitmap.height - watermarkJimp.bitmap.height
            )
            .getBufferAsync(imageJimp.getMIME())
            .then((tarbuf: Buffer) => {
                return resolve(tarbuf);
            });
    });
};

let addAll = function(imageJimpArray: jimp[], watermarkJimp: jimp) {
    return new Promise<Buffer[]>((resolve, reject) => {
        let rePromise: object[] = [];
        for (let oimage of imageJimpArray) {
            rePromise.push(addOne(oimage, watermarkJimp));
        }
        Promise.all(rePromise).then((res: Buffer[]) => {
            return resolve(res);
        });
    });
};

let watermark = function(imagesLocationArray: string[], watermarkLocation: string) {
    return new Promise<Buffer[]>((resolve, reject) => {
        Promise.all([readAll(imagesLocationArray), jimp.read(watermarkLocation)]).then(
            ([imageJimpArray, watermarkJimp]) => {
                addAll(imageJimpArray, watermarkJimp).then((res) => {
                    // console.log(res);
                    return resolve(res);
                });
            }
        );
    });
};

let watermarkor = function(
    imagesLocationArray: string[],
    watermarkLocation: string,
    outputLocationArray?: string[]
) {
    if (outputLocationArray) {
        return watermarkToFile(imagesLocationArray, watermarkLocation, outputLocationArray);
    } else {
        return watermark(imagesLocationArray, watermarkLocation);
    }
};

let watermarkToFile = function(
    imagesLocationArray: string[],
    watermarkLocation: string,
    outputLocationArray: string[]
) {
    return new Promise<boolean>((resolve, reject) => {
        watermark(imagesLocationArray, watermarkLocation).then((res: Buffer[]) => {
            for (let i in res) {
                if (res.hasOwnProperty(i)) {
                    fse.writeFile(outputLocationArray[i], res[i]).then(() => {
                        return resolve(true);
                    });
                }
            }
        });
    });
};

export = watermarkor;

// watermarkor(['./resources/input1.jpg', './resources/input2.jpg'], './resources/watermark.png', [
//     './resources/o1.jpg',
//     './resources/o2.jpg'
// ]);
