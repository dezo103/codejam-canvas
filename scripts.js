let elem1 = document.querySelector('.item__4x4');
let elem2 = document.querySelector('.item__32x32');
let elem3 = document.querySelector('.item__img');

elem1.addEventListener('click', function() {

    let req = new XMLHttpRequest();
    req.open('GET', './data/data1.json');
    req.responseType = 'json';
    req.send();

    req.onload = function() {
        let arr = (req.response);

        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < arr[i].length; k++)
            arr[i][k] = '#' + arr[i][k];
        }
        
        
        let canvas = document.querySelector('canvas'), 
            ctx = canvas.getContext('2d'), 
            width = arr[0].length, 
            height = arr.length, 
            scale = 128;  
        
    
        canvas.width = width * scale; 
        canvas.height = height * scale; 
        

        for(let row = 0; row < height; row++) {
            for(let col = 0; col < width; col++) { 
                ctx.fillStyle = arr[row][col]; 
                ctx.fillRect(col * scale, row * scale, scale, scale); 
            }
        }
    }
});

elem2.addEventListener('click', function() {

    let req = new XMLHttpRequest();
    req.open('GET', './data/data2.json');
    req.responseType = 'json';
    req.send();

    req.onload = function() {
        let arr = (req.response);


        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < arr[i].length; k++) {
                for (let l = 0; l < arr[i][k].length; l++) {
                    arr[i][k].splice(3,1);
                }   
            }
        
        }
        
        let canvas = document.querySelector('canvas'), 
            ctx = canvas.getContext('2d'), 
            width = arr[0].length, 
            height = arr.length, 
            scale = 16; 

        canvas.width = width * scale; 
        canvas.height = height * scale; 
        
        
        for(let row = 0; row < height; row++) {
            for(let col = 0; col < width; col++) { 
                ctx.fillStyle = `rgb(${arr[row][col]})`;
                ctx.fillRect(col * scale, row * scale, scale, scale); 
            }
        }
    }
  });



  elem3.addEventListener('click', function() {

    let canvas = document.querySelector('canvas'); 
    ctx = canvas.getContext('2d'); 
        
    canvas.width = 512;
    canvas.height = 512;
        
    let img = new Image();  
    img.addEventListener('load', function() {
        ctx.drawImage(img, 0, 0, 512, 512); 
        }, false);
    img.src = './data/image.png'; 
  });