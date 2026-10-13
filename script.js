// ========================================
// MINI E-COMMERCE WEBSITE
// LAB SHEET 2 - VANILLA JAVASCRIPT
// ========================================


// ========================================
// 1. PRODUCT ARRAY
// ========================================

const products = [

    {
        id: 1,
        name: "Wireless Mouse",
        price: 599,
        image:
            "https://images.unsplash.com/photo-1527814050087-3793815479db?w=700"
    },

    {
        id: 2,
        name: "Mechanical Keyboard",
        price: 2499,
        image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700"
    },

    {
        id: 3,
        name: "Wireless Headphones",
        price: 1999,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700"
    },

    {
        id: 4,
        name: "Smart Watch",
        price: 2999,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
    },

    {
        id: 5,
        name: "Laptop Backpack",
        price: 1299,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700"
    },

    {
        id: 6,
        name: "USB-C Hub",
        price: 899,
        image:
            "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=700"
    },

    {
        id: 7,
        name: "Bluetooth Speaker",
        price: 1499,
        image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700"
    },

    {
        id: 8,
        name: "Webcam",
        price: 1799,
        image:
            "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=700"
    }

];


// ========================================
// LOCAL STORAGE KEY
// ========================================

const CART_KEY = "cart";


// ========================================
// 3. GET CART FROM LOCAL STORAGE
// ========================================

function getCart() {

    return JSON.parse(
        localStorage.getItem(CART_KEY)
    ) || [];

}


// ========================================
// SAVE CART TO LOCAL STORAGE
// ========================================

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartBadge();

}


// ========================================
// 8. UPDATE CART BADGE
// ========================================

function updateCartBadge() {

    const badge =
        document.querySelector("#cart-count");

    if (!badge) {
        return;
    }


    const cart = getCart();


    const count = cart.reduce(
        (total, item) => {

            return total + item.quantity;

        },
        0
    );


    badge.textContent = count;

}


// ========================================
// 2. RENDER PRODUCTS
// ========================================

function renderProducts() {

    const container =
        document.querySelector("#product-list");


    // If we are not on products.html
    // stop the function.

    if (!container) {
        return;
    }


    container.innerHTML = "";


    products.forEach(product => {


        // Create product card

        const card =
            document.createElement("div");


        card.className =
            "product-card";


        // Add HTML inside the card

        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <h3>
                ${product.name}
            </h3>

            <div class="price">

                ₹${product.price.toLocaleString("en-IN")}

            </div>

            <button
                class="add-btn"
                data-id="${product.id}"
            >

                Add to Cart

            </button>

        `;


        // Add card to page

        container.appendChild(card);

    });


    // ====================================
    // ADD EVENT LISTENER TO BUTTONS
    // ====================================

    document
        .querySelectorAll(".add-btn")
        .forEach(button => {


            button.addEventListener(
                "click",
                () => {


                    const id =
                        Number(
                            button.dataset.id
                        );


                    addToCart(id);

                }
            );

        });

}


// ========================================
// 3. ADD PRODUCT TO CART
// ========================================

function addToCart(productId) {


    // Find product using find()

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {
        return;
    }


    // Get current cart

    const cart = getCart();


    // Check whether product already exists

    const existingItem =
        cart.find(
            item => item.id === productId
        );


    if (existingItem) {

        // Increase quantity

        existingItem.quantity++;

    }

    else {

        // Add new product

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    // Save cart

    saveCart(cart);


    alert(
        `${product.name} added to cart!`
    );

}


// ========================================
// 4. RENDER CART
// ========================================

function renderCart() {


    const container =
        document.querySelector("#cart-list");


    const totalElement =
        document.querySelector("#cart-total");


    // If we are not on cart.html

    if (!container || !totalElement) {
        return;
    }


    const cart = getCart();


    // Clear old content

    container.innerHTML = "";


    // ====================================
    // EMPTY CART
    // ====================================

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty">

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some products from
                    the Products page.
                </p>

            </div>

        `;


        totalElement.textContent =
            "₹0";


        return;

    }


    // ====================================
    // DISPLAY CART ITEMS
    // ====================================

    cart.forEach(item => {


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                    each
                </p>

            </div>


            <div>

                <label>

                    Qty:

                    <input
                        class="quantity"
                        type="number"
                        min="1"
                        value="${item.quantity}"
                        data-id="${item.id}"
                    >

                </label>

            </div>


            <button
                class="remove-btn"
                data-id="${item.id}"
            >

                Remove

            </button>

        `;


        container.appendChild(cartItem);

    });


    // ====================================
    // QUANTITY CHANGE
    // ====================================

    document
        .querySelectorAll(".quantity")
        .forEach(input => {


            input.addEventListener(
                "change",
                () => {


                    const id =
                        Number(
                            input.dataset.id
                        );


                    let quantity =
                        Number(input.value);


                    // Minimum quantity = 1

                    if (
                        quantity < 1 ||
                        isNaN(quantity)
                    ) {

                        quantity = 1;

                        input.value = 1;

                    }


                    const cart =
                        getCart();


                    const item =
                        cart.find(
                            item => item.id === id
                        );


                    if (item) {

                        item.quantity =
                            quantity;


                        saveCart(cart);


                        calculateTotal();

                    }

                }
            );

        });


    // ====================================
    // REMOVE BUTTON
    // ====================================

    document
        .querySelectorAll(".remove-btn")
        .forEach(button => {


            button.addEventListener(
                "click",
                () => {


                    const id =
                        Number(
                            button.dataset.id
                        );


                    removeFromCart(id);

                }
            );

        });


    // Calculate initial total

    calculateTotal();

}


// ========================================
// 5. CALCULATE TOTAL
// ========================================

function calculateTotal() {


    const totalElement =
        document.querySelector("#cart-total");


    if (!totalElement) {
        return;
    }


    const cart = getCart();


    // reduce() calculates grand total

    const total =
        cart.reduce(
            (sum, item) => {

                return sum +
                    item.price *
                    item.quantity;

            },
            0
        );


    totalElement.textContent =
        `₹${total.toLocaleString("en-IN")}`;

}


// ========================================
// REMOVE PRODUCT
// ========================================

function removeFromCart(productId) {


    let cart = getCart();


    // filter() removes the selected item

    cart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart(cart);


    // Render again

    renderCart();

}


// ========================================
// 6. CHECKOUT FORM
// ========================================

function setupCheckout() {


    const form =
        document.querySelector(
            "#checkout-form"
        );


    // If checkout form doesn't exist

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {


            // Prevent page refresh

            event.preventDefault();


            // Remove previous errors

            clearErrors();


            // ====================================
            // GET FORM VALUES
            // ====================================

            const name =
                document
                    .querySelector("#name")
                    .value
                    .trim();


            const address =
                document
                    .querySelector("#address")
                    .value
                    .trim();


            const pincode =
                document
                    .querySelector("#pincode")
                    .value
                    .trim();


            const phone =
                document
                    .querySelector("#phone")
                    .value
                    .trim();


            let valid = true;


            // ====================================
            // NAME VALIDATION
            // ====================================

            if (name === "") {

                showError(
                    "name-error",
                    "Name is required."
                );

                valid = false;

            }


            // ====================================
            // ADDRESS VALIDATION
            // ====================================

            if (address === "") {

                showError(
                    "address-error",
                    "Address is required."
                );

                valid = false;

            }


            // ====================================
            // PINCODE VALIDATION
            // Exactly 6 digits
            // ====================================

            if (
                !/^\d{6}$/.test(pincode)
            ) {

                showError(
                    "pincode-error",
                    "Pincode must contain exactly 6 digits."
                );

                valid = false;

            }


            // ====================================
            // PHONE VALIDATION
            // Exactly 10 digits
            // ====================================

            if (
                !/^\d{10}$/.test(phone)
            ) {

                showError(
                    "phone-error",
                    "Phone number must contain exactly 10 digits."
                );

                valid = false;

            }


            // ====================================
            // IF VALIDATION FAILED
            // ====================================

            if (!valid) {

                return;

            }


            // ====================================
            // 7. SUCCESSFUL ORDER
            // ====================================

            // Clear cart

            localStorage.removeItem(
                CART_KEY
            );


            // Update navbar badge

            updateCartBadge();


            // Clear form

            form.reset();


            // Show confirmation

            document
                .querySelector("#confirmation")
                .innerHTML = `

                    <div class="success">

                        Order placed successfully!

                        Thank you for shopping
                        with us.

                    </div>

                `;

        }
    );

}


// ========================================
// SHOW ERROR
// ========================================

function showError(
    elementId,
    message
) {

    document
        .querySelector(`#${elementId}`)
        .textContent = message;

}


// ========================================
// CLEAR ERRORS
// ========================================

function clearErrors() {

    document
        .querySelectorAll(".error")
        .forEach(error => {

            error.textContent = "";

        });

}


// ========================================
// RUN WHEN PAGE LOADS
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // Update cart number

        updateCartBadge();


        // Products page

        renderProducts();


        // Cart page

        renderCart();


        // Checkout page

        setupCheckout();

    }
);