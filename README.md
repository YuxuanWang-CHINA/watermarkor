# watermarkor

Add watermark.

## Usage

```
const watermarkor = require('watermarkor');

watermarkor(Array('input1.png','input2.png'...), 'watermark.png', [Array('output1.png','output2.png'...)])
.then((res)=>{
    // If no output array, res is buffer array of your new image
    // Else res is true
})
```
