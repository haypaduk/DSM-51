document.addEventListener("DOMContentLoaded", () => {
    const cartBtn = document.getElementById("cart-btn");
    const cartModal = document.getElementById("cart-modal");
    const closeModal = document.querySelector(".close");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const productos = document.querySelectorAll(".producto");
    const searchBar = document.getElementById("search-bar");  // Asegúrate de que exista el input

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Función para actualizar el carrito
    function updateCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        cartItemsContainer.innerHTML = ""; // Limpiar el contenido anterior

        // Calcular el total
        let total = cart.reduce((sum, item) => sum + item.precio, 0);
        cartTotal.textContent = total.toFixed(2); // Mostrar el total con 2 decimales

        // Agregar productos al carrito en el modal
        cart.forEach(item => {
            const productElement = document.createElement("li");
            productElement.classList.add("cart-product");

            productElement.innerHTML = `
                <div class="cart-item">
                    <span><strong>${item.nombre}</strong> - $${item.precio.toFixed(2)}</span>
                </div>
            `;
            cartItemsContainer.appendChild(productElement);
        });

        // Guardar el carrito en el localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Abrir el modal del carrito
    cartBtn.addEventListener("click", () => {
        cartModal.style.display = "block";
        updateCart();
    });

    // Cerrar el modal del carrito
    closeModal.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    // Vaciar el carrito
    clearCartBtn.addEventListener("click", () => {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    });

    // Agregar productos al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const nombre = button.getAttribute("data-nombre");
            const precio = parseFloat(button.getAttribute("data-precio"));

            // Agregar el producto al carrito
            cart.push({ nombre, precio });
            localStorage.setItem("cart", JSON.stringify(cart)); // Guardar en localStorage
            updateCart(); // Actualizar la vista del carrito
        });
    });

    // Funcionalidad de búsqueda de productos
    searchBar.addEventListener("input", () => {
        const searchText = searchBar.value.toLowerCase();
        productos.forEach(producto => {
            const nombre = producto.getAttribute("data-nombre").toLowerCase();
            if (nombre.includes(searchText)) {
                producto.style.display = "inline-block";  // Muestra el producto si coincide
            } else {
                producto.style.display = "none";  // Oculta el producto si no coincide
            }
        });
    });
});
