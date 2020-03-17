"use strict";
exports.__esModule = true;
var jimp = require("jimp");
var watermarkor = function (oimageLocation, watermarkLocation) {
    return new Promise(function (resolve, reject) {
        Promise.all([jimp.read(oimageLocation), jimp.read(watermarkLocation)]).then(function (imgobj) {
            imgobj[0]
                .composite(imgobj[1], imgobj[0].bitmap.width - imgobj[1].bitmap.width, imgobj[0].bitmap.height - imgobj[1].bitmap.height)
                .getBufferAsync(imgobj[0].getMIME())
                .then(function (tarbuf) {
                return resolve(tarbuf);
            });
        });
    });
};
module.exports = {
    watermarkor: watermarkor
};
//# sourceMappingURL=index.js.map