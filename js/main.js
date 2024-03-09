document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.querySelector("#contenedor-productos");
    const botones = document.querySelectorAll(".boton-categoria");
    const numerito = document.querySelector("#numerito");

    let productos = [];
    let carrito = [];
    let c = 0;
    fetch("./js/productos.json")
        .then(res => res.json())
        .then(data => {
            productos = data;
            //console.log(productos);
            cargarProductos(productos);
        })

    if (localStorage.getItem.length == 0) {
        localStorage.clear();
        numerito.innerText = 0;
    }

    function cargarProductos(productosElegidos) {
        if (c > 0) {
            resetProductos();
        }

        //console.log(productosElegidos);

        productosElegidos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" id="${producto.id}">Agregar</button>
                    </div>
                </div>
            `;
            contenedor.appendChild(div);
        });

        const add = document.querySelectorAll(".producto-agregar");

        add.forEach(agregar => {
            agregar.addEventListener('click', (e) => {
                const id = e.currentTarget.id;

                if (!carrito.some(p => p.id === id)) {
                    productos.forEach(p => {
                        if (p.id === id) {
                            carrito.push(p);
                        }
                    });
                }

                console.log(carrito);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                numerito.innerText = carrito.length;
            });
        });
    }

    function resetProductos() {
        const product = document.querySelectorAll(".producto");
        product.forEach(p => {
            p.remove();
        });
    }

    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const rm = document.body.querySelector(".active");
            rm.classList.remove('active');
            e.currentTarget.classList.add('active');
            let filtrados = [];
            const idAux = document.getElementById(e.currentTarget.id);

            fetch("./js/productos.json")
                .then(res => res.json())
                .then(data => {
                    if (idAux.id != "todos") {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].id.includes(idAux.id)) {
                                filtrados.push(data[i]);
                            }
                        }
                    } else {
                        filtrados = data;
                    }

                    c++;
                    console.log(filtrados);
                    cargarProductos(filtrados);
                })
        });
    });
});
