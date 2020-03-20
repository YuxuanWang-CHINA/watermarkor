"use strict";
var jimp = require("jimp");
var fse = require("fs-extra");
var readAll = function (imageLocationArray) {
    return new Promise(function (resolve, reject) {
        var re = [];
        for (var _i = 0, imageLocationArray_1 = imageLocationArray; _i < imageLocationArray_1.length; _i++) {
            var v = imageLocationArray_1[_i];
            re.push(jimp.read(v));
        }
        Promise.all(re).then(function (res) {
            return resolve(res);
        });
    });
};
var addOne = function (imageJimp, watermarkJimp) {
    return new Promise(function (resolve, reject) {
        imageJimp
            .composite(watermarkJimp, imageJimp.bitmap.width - watermarkJimp.bitmap.width, imageJimp.bitmap.height - watermarkJimp.bitmap.height)
            .getBufferAsync(imageJimp.getMIME())
            .then(function (tarbuf) {
            return resolve(tarbuf);
        });
    });
};
var addAll = function (imageJimpArray, watermarkJimp) {
    return new Promise(function (resolve, reject) {
        var rePromise = [];
        for (var _i = 0, imageJimpArray_1 = imageJimpArray; _i < imageJimpArray_1.length; _i++) {
            var oimage = imageJimpArray_1[_i];
            rePromise.push(addOne(oimage, watermarkJimp));
        }
        Promise.all(rePromise).then(function (res) {
            return resolve(res);
        });
    });
};
var watermark = function (imagesLocationArray, watermarkLocation) {
    return new Promise(function (resolve, reject) {
        Promise.all([readAll(imagesLocationArray), jimp.read(watermarkLocation)]).then(function (_a) {
            var imageJimpArray = _a[0], watermarkJimp = _a[1];
            addAll(imageJimpArray, watermarkJimp).then(function (res) {
                return resolve(res);
            });
        });
    });
};
var watermarkor = function (imagesLocationArray, watermarkLocation, outputLocationArray) {
    if (outputLocationArray) {
        return watermarkToFile(imagesLocationArray, watermarkLocation, outputLocationArray);
    }
    else {
        return watermark(imagesLocationArray, watermarkLocation);
    }
};
var watermarkToFile = function (imagesLocationArray, watermarkLocation, outputLocationArray) {
    return new Promise(function (resolve, reject) {
        watermark(imagesLocationArray, watermarkLocation).then(function (res) {
            for (var i in res) {
                if (res.hasOwnProperty(i)) {
                    fse.writeFile(outputLocationArray[i], res[i]).then(function () {
                        return resolve(true);
                    });
                }
            }
        });
    });
};
module.exports = watermarkor;
//# sourceMappingURL=index.js.map