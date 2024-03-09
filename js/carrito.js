document.addEventListener('DOMContentLoaded', () => {
    const vacio = document.querySelector("#carrito-vacio");
    const productos = document.querySelector("#carrito-productos");
    const acciones = document.querySelector("#carrito-acciones");
    const comprado = document.querySelector("#carrito-comprado");
    const botonComprar = document.querySelector("#carrito-acciones-comprar");
    const vaciar = document.querySelector("#carrito-acciones-vaciar");

    const carrito = JSON.parse(localStorage.getItem('carrito'));

    const total = document.querySelector("#total");

    function ocultar() {

        if (!carrito) {
            return;
        }

        vacio.classList.add("disabled");
        productos.classList.remove("disabled");
        acciones.classList.remove("disabled");
        comprado.classList.add("disabled");
    }

    function mostrar() {
        carrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            productos.append(div);
            div.innerHTML = `
                    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                    <small>Nombre del producto</small>
                    <h3>${producto.titulo}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>1</p>
                    </div>
                    <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio}</p>
                    </div>
                `;
            const button = document.createElement('button');
            div.appendChild(button);
            button.classList.add("carrito-producto-eliminar");
            button.innerHTML = `<i class="bi bi-trash-fill"></i>`;

            // const button2 = document.createElement('button');
            // div.appendChild(button2);
            // button2.classList.add("carrito-acciones-comprar");
            // button.innerHTML = `Comprar ahora`;

            console.log(carrito);
        });

        const eliminar = document.querySelectorAll(".carrito-producto-eliminar");

        eliminar.forEach(rm => {
            rm.addEventListener('click', (e) => {
                const target = e.target.parentNode.parentNode;
                const nombre = target.querySelector(".carrito-producto-titulo").querySelector("h3").innerHTML;
                target.remove();
                updatePrice();
                const array = JSON.parse(localStorage.getItem('carrito'));

                let json = [];
                array.forEach(c => {
                    if (!c.titulo == nombre) {
                        console.log("a")
                        json.push(c);
                    }
                });

                if (total.innerText == "$0") {
                    console.log(total.innerText)
                    vacioF();
                }

                JSON.stringify(localStorage.setItem("carrito2", json));
            })
        });
    }

    function updatePrice() {
        const length = document.getElementsByClassName("carrito-producto").length;
        const c = length * 1000;
        total.innerText = "$" + c;
    }

    ocultar();
    mostrar();

    botonComprar.addEventListener('click', () => {
        const title = document.querySelector(".titulo-principal");
        title.remove();
        vacio.classList.add("disabled");
        productos.classList.add("disabled");
        acciones.classList.add("disabled");
        comprado.classList.remove("disabled");

    });

    vaciar.addEventListener('click', vacioF);

    function vacioF() {
        vacio.classList.remove("disabled");
        productos.classList.add("disabled");
        acciones.classList.add("disabled");
        comprado.classList.add("disabled");

        localStorage.removeItem('carrito');
        productos.remove();
    }

    updatePrice();
});
