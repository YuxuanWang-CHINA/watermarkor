"use strict";
var jimp = require("jimp");
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
var watermarkor = function (imagesLocationArray, watermarkLocation) {
    return new Promise(function (resolve, reject) {
        Promise.all([readAll(imagesLocationArray), jimp.read(watermarkLocation)]).then(function (_a) {
            var imageJimpArray = _a[0], watermarkJimp = _a[1];
            addAll(imageJimpArray, watermarkJimp).then(function (res) {
                console.log(res);
                return resolve(res);
            });
        });
    });
};
watermarkor(['./resources/input1.jpg', './resources/input2.jpg'], './resources/watermark.png');
module.exports = watermarkor;
//# sourceMappingURL=index.js.map