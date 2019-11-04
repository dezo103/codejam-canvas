let elem1 = document.querySelector('.item__4x4');
let elem2 = document.querySelector('.item__32x32');
let elem3 = document.querySelector('.item__img');

elem1.addEventListener('click', reqAndDraw.bind(null, './data/data1.json', 128, 'hex'));
elem2.addEventListener('click', reqAndDraw.bind(null, './data/data2.json', 16, 'rgba'));
elem3.addEventListener('click', onlyDraw.bind(null, './data/image.png', 512, 512));

function reqAndDraw(pathToFile, userScale, colorModel) {
    let req = new XMLHttpRequest();
    req.open('GET', pathToFile);
    req.responseType = 'json';
    req.send();

    req.onload = function() {
        let arr = (req.response);

        arrTransform();
        
        let canvas = document.querySelector('canvas'), 
            ctx = canvas.getContext('2d'), 
            width = arr[0].length, 
            height = arr.length, 
            scale = userScale;  
        
        canvas.width = width * scale; 
        canvas.height = height * scale; 

        drawInCanvas();
 
        
        function arrTransform(){
            for (let i = 0; i < arr.length; i++) {
                for (let k = 0; k < arr[i].length; k++){
                    if(colorModel=='hex') {
                        arr[i][k] = '#' + arr[i][k];
                        }
                        else if (colorModel=='rgba') {
                            for (let l = 0; l < arr[i][k].length; l++) {
                                arr[i][k].splice(3,1);
                                }  
                            } 
                            else {
                                return 0;
                            }
                }
            }
        }

        function drawInCanvas() {
            for(let row = 0; row < height; row++) {
                for(let col = 0; col < width; col++) { 
                    if(colorModel=='hex') {
                        ctx.fillStyle = arr[row][col];
                        }
                        else if(colorModel=='rgba'){
                            ctx.fillStyle = `rgb(${arr[row][col]})`;
                        }
                        else {
                            return 0;
                        }
                    ctx.fillRect(col * scale, row * scale, scale, scale); 
                }
            } 
        }
    }
}

function onlyDraw(pathToImage, imgWidth, imgHeight) {
    let canvas = document.querySelector('canvas'); 
    ctx = canvas.getContext('2d'); 
        
    canvas.width = 512;
    canvas.height = 512;
        
    let img = new Image();  
    img.addEventListener('load', function() {
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight); 
        }, false);
    img.src = pathToImage; 
};





