function canvas(selector, options){
   const canvas = document.querySelector(selector);
   canvas.classList.add('canvas')
   canvas.setAttribute('width', `${options.width || 400}px`)
   canvas.setAttribute('height', `${options.height || 300}px`)


   // отримання контексту для малювання
   const context = canvas.getContext('2d')
  // отримуємо координати canvas відносно viewport
   const rect = canvas.getBoundingClientRect();
   const img = new Image;
img.src =`https://www.fillmurray.com/500/300)`;
img.onload = () => {
   context.drawImage(img, 0, 0);
}


  // ...
  let isPaint = false // чи активно малювання
let points = [] //масив з точками

	// об’являємо функцію додавання точок в масив
const addPoint = (x, y, dragging) => {
   // преобразуємо координати події кліка миші відносно canvas
   points.push({
       x: (x - rect.left),
       y: (y - rect.top),
       dragging: dragging
   })
}

	 // головна функція для малювання
   const redraw = () => {
   //очищуємо  canvas
   context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	context.drawImage(img, 0, 0);
   context.strokeStyle = document.getElementById("color-picker").value;
   context.lineJoin = "round";
   context.lineWidth = document.getElementById("size").value;
   let prevPoint = null;
   for (let point of points){
       context.beginPath();
       if (point.dragging && prevPoint){
           context.moveTo(prevPoint.x, prevPoint.y)
       } else {
           context.moveTo(point.x - 1, point.y);
       }
       context.lineTo(point.x, point.y)
       context.closePath()
       context.stroke();
       prevPoint = point;
   }
}

 // функції обробники подій миші
const mouseDown = event => {
   isPaint = true
   addPoint(event.pageX, event.pageY);
   redraw();
}

const mouseMove = event => {
   if(isPaint){
       addPoint(event.pageX, event.pageY, true);
       redraw();
   }
}

// додаємо обробку подій
canvas.addEventListener('mousemove', mouseMove)
canvas.addEventListener('mousedown', mouseDown)
canvas.addEventListener('mouseup',() => {
   isPaint = false;
});
canvas.addEventListener('mouseleave',() => {
   isPaint = false;
});

// TOOLBAR
const toolBar = document.getElementById('toolbar');
// clear button
const clearBtn = document.createElement('button');
clearBtn.classList.add('btn');
clearBtn.textContent = '🧹';
const downloadBtn = document.createElement('button');
downloadBtn.classList.add('btn');
downloadBtn.textContent = '⇩';

const saveBtn = document.createElement('button');
saveBtn.classList.add('btn');
saveBtn.textContent = '💾';
const loadBtn = document.createElement('button');
loadBtn.classList.add('btn');
loadBtn.textContent = '🔄';

const Timestamp = document.createElement('button');
Timestamp.classList.add('btn');
Timestamp.textContent = '🕑';

clearBtn.addEventListener('click', () => {
points = [];
redraw();
})
toolBar.insertAdjacentElement('afterbegin', clearBtn);

downloadBtn.addEventListener('click', () => {
const dataUrl = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
const newTab = window.open('about:blank','image from canvas');
newTab.document.write("<img src='" + dataUrl + "' alt='from canvas'/>");
})
toolBar.insertAdjacentElement('afterbegin', downloadBtn);

saveBtn.addEventListener('click', () => {
localStorage.setItem('points', JSON.stringify(points));
})
toolBar.insertAdjacentElement('afterbegin', saveBtn);

loadBtn.addEventListener('click', () => {
points = JSON.parse(localStorage.getItem('points'));
redraw();
})
toolBar.insertAdjacentElement('afterbegin', loadBtn);

Timestamp.addEventListener('click', () => {
context.fillText(Date(), 0, 10);
})
toolBar.insertAdjacentElement('afterbegin', Timestamp);

}
