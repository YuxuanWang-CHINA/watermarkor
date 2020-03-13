# watermarkor
Add watermark.

## Usage
```
const watermarkor = require('./index.js');

watermarkor.watermarkor('input.png', 'watermark.png')
.then((output)=>{
    //output is buffer of your new image
})
```