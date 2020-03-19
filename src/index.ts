import * as jimp from 'jimp';

let watermarkor = function(oimageLocation: string, watermarkLocation: string) {
    return new Promise<Buffer>((resolve, reject) => {
        Promise.all([jimp.read(oimageLocation), jimp.read(watermarkLocation)]).then(
            (imgobj: jimp[]) => {
                imgobj[0]
                    .composite(
                        imgobj[1],
                        imgobj[0].bitmap.width - imgobj[1].bitmap.width,
                        imgobj[0].bitmap.height - imgobj[1].bitmap.height
                    )
                    .getBufferAsync(imgobj[0].getMIME())
                    .then((tarbuf) => {
                        return resolve(tarbuf);
                    });
            }
        );
    });
};

export = watermarkor;
