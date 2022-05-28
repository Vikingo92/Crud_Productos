const form = document.getElementById('form');
const codigo = document.getElementById('dato1');
const nombre = document.getElementById('dato2');
const color = document.getElementById('dato3');
const peso = document.getElementById('dato4');
const cantidad = document.getElementById('dato5');
let listarProductos = document.getElementById('listarProductos');
const total = document.getElementById('total');
const batman = document.getElementById('batman');
const file = document.getElementById('file');
const display = document.getElementById('display_image');

// Sonido
const soundID = 'Thunder';
const sound2 = 'Sweep';
const sound3 = 'Zoom';

const producto = [];

const obtener = () => {

    let products = {
        id: Math.round(Math.random() * (1000 - 1) + 1),
        codigo: codigo.value,
        nombre: nombre.value,
        color: color.value,
        peso: peso.value,
        cantidad: cantidad.value,
    }

    producto.unshift(products);
    // console.log(producto);
    localStorage.setItem('Productos', JSON.stringify(producto));
    getData();

}

form.addEventListener('submit', e => {
    e.preventDefault();
    obtener();
    form.reset()

});

// Obtener la data para renderizarla
const getData = () => {
    listarProductos.innerHTML = '';

    const listar = JSON.parse(localStorage.getItem('Productos'));
    console.log(listar);

    listar.map((item) => {
        const { id, codigo, nombre, color, peso, cantidad } = item;

        listarProductos.innerHTML += `
        <div>
            <table>
                <tr>
                    <td>${codigo}</td>
                    <td>${nombre}</td>
                    <td>${color}</td>
                    <td>${peso}</td>
                    <td>${cantidad}</td>
                    <td>
                        <button id='${id}' class='btn-delete' onclick='playSound3()'>Borrar</button>
                    </td>
                </tr>
            </table>
        </div>
        `
        total.innerHTML = '';
        total.innerHTML += `
        <td>Total: (${listar.length})</td>
        `
    })
}

document.addEventListener('DOMContentLoaded', getData());

// Borrar o eliminar
listarProductos.addEventListener('click', e => {
    const eliminar = e.target.classList.contains('btn-delete');
    const id = e.target.id

    const listar = JSON.parse(localStorage.getItem('Productos'))
    const buscar = listar.find(item => item.id === parseFloat(id));
    console.log(buscar)

    if (eliminar) {
        listar.forEach((item, index) => {
            if (item.id === buscar.id) {
                listar.splice(index, 1)

                localStorage.setItem('Productos', JSON.stringify(listar))

                getData();
            }
        })
    }
})

// Amplair la imagen 
const ampliar = () => {
    batman.style.width = (batman.style.width == '300px') ? '700px' : '300px'
}


// Subir, cargar la imagen
file.addEventListener('change', e => {
    let render = new FileReader();
    render.addEventListener('load', () => {
        const upload_image = render.result;
        display.style.backgroundImage = `url(${upload_image})`;
        localStorage.setItem('Upload-image', JSON.stringify(upload_image))
    })
    render.readAsDataURL(e.target.files[0]);
})


const loadSound = () => {
    createjs.Sound.registerSound('assets/laser.wav', soundID);
    createjs.Sound.registerSound('assets/sweep.wav', sound2);
    createjs.Sound.registerSound('assets/zoom.wav', sound3);
}

const playSound = () => {
    createjs.Sound.play(soundID);
}

const playSound2 = () => {
    createjs.Sound.play(sound2);
}

const playSound3 = () => {
    createjs.Sound.play(sound3);
}