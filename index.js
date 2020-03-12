const jimp = require('jimp');

var watermarkor = function (input1, input2) {
    //input
    const imageoLoaction = input1
    const watermarkLocation = input2
    var imageo={};
    var watermark={};
    jimp.read(imageoLoaction).then(ima => imageo=ima)
        .then(() => {
            jimp.read(watermarkLocation).then(ima => watermark = ima)
            .then(() => {
                imageo.composite(watermark, imageo.bitmap.width - watermark.bitmap.width, imageo.bitmap.height - watermark.bitmap.height)
                    .getBuffer(jimp.AUTO,(e,buf)=>{return buf})
            })
            .catch((e) => { console.log(e); return e })
        })
        .catch((e) => { console.log(e); return e })
}

//watermarkor('./resources/input.jpg', './resources/watermark.png')

module.exports = {
    watermarkor: watermarkor
}