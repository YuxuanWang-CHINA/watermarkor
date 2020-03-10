const jimp = require('jimp');

//input
const imageLoaction = './resources/input.jpg'
const watermarkLocation = './resources/watermark.png'
const outputLocation = './resources/output.png'

//define
var images = []

async function myRead(objname,location) {
    images[objname] = await jimp.read(location)
}

Promise.all([myRead(0,imageLoaction),myRead(1,watermarkLocation)])
.then(()=>{
    images[0].composite(images[1], images[0].bitmap.width - images[1].bitmap.width, images[0].bitmap.height - images[1].bitmap.height)
        .write(outputLocation)
})
.catch((e)=>{console.log(e)})

