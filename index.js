const jimp = require('jimp');
var image
var overi;

async function beginr() {
    image = await jimp.read('./abc.jpg');
    overi = await jimp.read('./over.png');
}

beginr().then(()=>{
    image.composite(overi, image.bitmap.width - 220, image.bitmap.height-52)
    .write('out.png')

    console.log(image.bitmap.width)
})

