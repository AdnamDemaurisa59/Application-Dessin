
"use strict";

 // Gestion des événements
 const canvas = document.querySelector('canvas');

 const ctx = canvas.getContext("2d");
 let isDrawing = false;
 let horizX = 0;
 let vertiY = 0;

 // Récupération des éléments du DOM
 const b0 = document.getElementById('chooseColor');
 const chooseWidth = document.getElementById('chooseWidth');
 let b1 = document.getElementById('chooseRectangle');
 let b2 = document.getElementById('chooseCircle');
 let b3 = document.getElementById('chooseTriangle');
 let b4 = document.getElementById('bgcBlack');
 let b5 = document.getElementById('drawing');
 let b6 = document.getElementById('deleteAll');
 let b7 = document.getElementById('save');
 let b8 = document.getElementById('addMyDrawing');
 let b9 = document.getElementById('insertAnotherDrawing');
 let b10 = document.getElementById('closeDraw');
 

let shapes = [];
let selectedShape = null;
let resizing = false;

const selectCursor = document.getElementById('chooseCursor');
// const canvas = document.getElementById('drawingArea'); // Supposons que votre zone de dessin ait cet ID

selectCursor.addEventListener('change', (event) => {
    const cursorValue = event.target.value;
    canvas.style.cursor = cursorValue || 'default'; // Rétablir 'default' si aucun n'est sélectionné
});


//Selection de la couleur
 let currentColor = '#000000';
 b0.addEventListener('input', changeColor);

 function changeColor() {
    currentColor = b0.value;
}

// Choisir la largeur du trait
let currentWidth = 10;
chooseWidth.addEventListener('input', changeWidth);

function changeWidth() {
    ctx.lineWidth = parseInt(chooseWidth.value);
}


// Redimension du canvas :
function resize()
{
    let snapshot = ctx.getImageData(0,0, canvas.width, canvas.height)
    canvas.width = window.innerWidth*0.9;
    canvas.height = window.innerHeight*0.7;
    canvas.style.width = canvas.width + "px";
    ctx.putImageData(snapshot, 0, 0)
}

resize();
 window.addEventListener("resize", resize);


// Gestion des événements
canvas.addEventListener('mousedown', (e) => {
    const size = canvas.getBoundingClientRect();
    isDrawing = true;
    horizX = e.clientX - size.left;
    vertiY = e.clientY - size.top;
});

// // Commencer un nouveau dessin
canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const size = canvas.getBoundingClientRect();
        ctx.lineWidth = parseInt(chooseWidth.value);
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;
        ctx.beginPath();
        ctx.moveTo(horizX, vertiY);
        ctx.lineTo(e.clientX - size.left, e.clientY - size.top);
        ctx.stroke();
        horizX = e.clientX - size.left;
        vertiY = e.clientY - size.top;
    }
}
);

window.addEventListener('mouseup', () => {
    isDrawing = false;
});


// canvas.addEventListener('mousedown', (e) => {
//     const x = e.clientX - canvas.offsetLeft;
//     const y = e.clientY - canvas.offsetTop;

//     // Vérifier si une forme est cliquée
//     selectedShape = shapes.find(shape => {
//         if (shape.type === 'rectangle') {
//             return x >= shape.x && x <= shape.x + shape.width &&
//                    y >= shape.y && y <= shape.y + shape.height;
//         } else if (shape.type === 'circle') {
//             const dist = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
//             return dist <= shape.radius;
//         } else if (shape.type === 'triangle') {
//             // Optionnel : vérifiez si le point est dans le triangle
//             return false;
//         }
//     });

//     if (selectedShape) {
//         resizing = true;
//     }
// });

canvas.addEventListener('mousemove', (e) => {
    if (resizing && selectedShape) {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        if (selectedShape.type === 'rectangle') {
            selectedShape.width = x - selectedShape.x;
            selectedShape.height = y - selectedShape.y;
        } else if (selectedShape.type === 'circle') {
            selectedShape.radius = Math.sqrt((x - selectedShape.x) ** 2 + (y - selectedShape.y) ** 2);
        }

        drawShapes();
    }
});

canvas.addEventListener('mouseup', () => {
    resizing = false;
    selectedShape = null;
});



// // Pour choisir la couleur
// b0.addEventListener('click', () => {
//     ctx.strokeStyle = 'black';

//     }
// );

// Choisir un Rectangle
b1.addEventListener('click', () => {
    shapes.push({ type: 'rectangle', x: 50, y: 50, width: 150, height: 25 });
    drawShapes();
    // ctx.beginPath();
    // ctx.rect(50, 50, 150, 25);  
    // ctx.lineWidth = 5;
    // ctx.stroke();

    canvas.addEventListener('mousedown', (e) => {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        // Vérifie si le rectangle est cliquée
        selectedShape = shapes.find(shape => {
            if (shape.type === 'rectangle') {
                return x >= shape.x && x <= shape.x + shape.width &&
                       y >= shape.y && y <= shape.y + shape.height;
            } 
        });

        if (selectedShape) {
            resizing = true;
        }

        // canvas.addEventListener('mouseup', () => {
        //     isDrawing = false;
        // });
    });
    }
);

// Choisir un cercle
b2.addEventListener('click', () => {
    shapes.push({ type: 'circle', x: 89, y: 90, radius: 42 });
    drawShapes();
    // ctx.beginPath();
    // ctx.arc(89, 90, 42, 0, 2*Math.PI);
    // ctx.lineWidth = 5;
    // ctx.stroke();

    canvas.addEventListener('mousedown', (e) => {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        // Vérifie si le cercle est cliqué
        selectedShape = shapes.find(shape => {
            if (shape.type === 'circle') {
                const rayon = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
                return rayon <= shape.radius;
            } 
        });

        if (selectedShape) {
            resizing = true;
        }

        // canvas.addEventListener('mouseup', () => {
        //     isDrawing = false;
        // });
});

}
);

// Choisir un triangle
b3.addEventListener('click', () => {
    shapes.push({ type: 'triangle', points: [{ x: 50, y: 50 }, { x: 150, y: 50 }, { x: 100, y: 200 }] });
    drawShapes();
    // ctx.beginPath();
    // ctx.moveTo(50, 50);
    // ctx.lineTo(150, 50);
    // ctx.lineTo(100, 200);
    // ctx.closePath();
    // ctx.lineWidth = 5;
    // ctx.stroke();

    canvas.addEventListener('mousedown', (e) => {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        // Vérifie si le triangle est cliqué
        selectedShape = shapes.find(shape => {
            if (shape.type === 'triangle') {
                // Optionnel : vérifiez si le point est dans le triangle
                return false;
            } 
        });

        if (selectedShape) {
            resizing = true;
        }
    });

    }
);

// Dessiner les formes
function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas
    shapes.forEach(shape => {
        ctx.beginPath();
        if (shape.type === 'rectangle') {
            ctx.rect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === 'circle') {
            ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        } else if (shape.type === 'triangle') {
            ctx.moveTo(shape.points[0].x, shape.points[0].y);
            ctx.lineTo(shape.points[1].x, shape.points[1].y);
            ctx.lineTo(shape.points[2].x, shape.points[2].y);
            ctx.closePath();
        }
        ctx.lineWidth = 5;
        ctx.stroke();
    });
}



// Couleur de fond : Noir, + dessin couleur blanche
b4.addEventListener('click', () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            ctx.lineWidth = 25;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(horizX, vertiY);
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            horizX = e.clientX;
            vertiY = e.clientY;
            b6.addEventListener('click', () => {
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
            );
        }
    }
    );

}
);

//Pour tout supprimer
b6.addEventListener("click", () => location.reload());
// b6.addEventListener('click', () => {
    
//     ctx.fillStyle = 'white';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     }
// );


//Pour sauvegarder
b7.addEventListener('click', () => {
    localStorage.setItem('canvas', canvas.toDataURL());
    }
);

// Pour ajouter le dessin réaliser dans son ordinateur
b8.addEventListener('click', () => {
    let link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'canvas.png';
    link.click();
}
);


// b0.addEventListener('click', () => {
//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 10;
//     ctx.lineCap = 'round';
//     } 
// );