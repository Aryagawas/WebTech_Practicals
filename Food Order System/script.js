// Store all orders in an array
let orders = [];


// Get HTML elements
let customerName = document.getElementById("customerName");
let phone = document.getElementById("phone");
let address = document.getElementById("address");
let instructions = document.getElementById("instructions");

let foodItem = document.getElementById("foodItem");
let quantity = document.getElementById("quantity");

let addButton = document.getElementById("addButton");

let orderList = document.getElementById("orderList");

let subtotal = document.getElementById("subtotal");
let deliveryCharge = document.getElementById("deliveryCharge");
let total = document.getElementById("total");

let placeOrderButton =
    document.getElementById("placeOrderButton");

let clearButton =
    document.getElementById("clearButton");


// Error messages
let nameError =
    document.getElementById("nameError");

let phoneError =
    document.getElementById("phoneError");

let addressError =
    document.getElementById("addressError");

let foodError =
    document.getElementById("foodError");

let quantityError =
    document.getElementById("quantityError");

let orderMessage =
    document.getElementById("orderMessage");


// --------------------------------------------------
// VALIDATE CUSTOMER DETAILS
// --------------------------------------------------

function validateCustomerDetails() {

    let valid = true;

    nameError.textContent = "";
    phoneError.textContent = "";
    addressError.textContent = "";


    // Validate name
    let name = customerName.value.trim();

    if (name === "") {

        nameError.textContent =
            "Customer name is required.";

        valid = false;

    } else if (!/^[A-Za-z ]+$/.test(name)) {

        nameError.textContent =
            "Name should contain only letters.";

        valid = false;

    } else if (name.length < 2) {

        nameError.textContent =
            "Name must contain at least 2 characters.";

        valid = false;
    }


    // Validate phone
    let phoneNumber = phone.value.trim();

    if (phoneNumber === "") {

        phoneError.textContent =
            "Phone number is required.";

        valid = false;

    } else if (!/^[0-9]{10}$/.test(phoneNumber)) {

        phoneError.textContent =
            "Enter a valid 10-digit phone number.";

        valid = false;
    }


    // Validate address
    let deliveryAddress = address.value.trim();

    if (deliveryAddress === "") {

        addressError.textContent =
            "Delivery address is required.";

        valid = false;

    } else if (deliveryAddress.length < 10) {

        addressError.textContent =
            "Please enter a complete delivery address.";

        valid = false;
    }


    return valid;
}


// --------------------------------------------------
// CHECK WHETHER ORDER CAN BE PLACED
// --------------------------------------------------

function updatePlaceOrderButton() {

    let customerValid =
        validateCustomerDetails();

    if (customerValid && orders.length > 0) {

        placeOrderButton.disabled = false;

    } else {

        placeOrderButton.disabled = true;
    }
}


// --------------------------------------------------
// ADD OR UPDATE FOOD ITEM
// --------------------------------------------------

addButton.addEventListener("click", function () {

    // Clear previous errors
    foodError.textContent = "";
    quantityError.textContent = "";
    orderMessage.textContent = "";


    let valid = true;


    // Validate food
    if (foodItem.value === "") {

        foodError.textContent =
            "Please select a food item.";

        valid = false;
    }


    // Validate quantity
    let qty = Number(quantity.value);

    if (quantity.value === "") {

        quantityError.textContent =
            "Quantity is required.";

        valid = false;

    } else if (!Number.isInteger(qty)) {

        quantityError.textContent =
            "Quantity must be a whole number.";

        valid = false;

    } else if (qty < 1) {

        quantityError.textContent =
            "Quantity must be at least 1.";

        valid = false;

    } else if (qty > 20) {

        quantityError.textContent =
            "Maximum quantity allowed is 20.";

        valid = false;
    }


    if (!valid) {

        return;
    }


    // Get selected food price
    let selectedOption =
        foodItem.options[foodItem.selectedIndex];

    let price =
        Number(selectedOption.getAttribute("data-price"));


    // Check whether item already exists
    let existingIndex =
        orders.findIndex(function (order) {

            return order.item === foodItem.value;

        });


    if (existingIndex !== -1) {

        // Update existing item quantity
        orders[existingIndex].quantity = qty;

        orders[existingIndex].total =
            price * qty;

        orderMessage.textContent =
            "Item quantity updated successfully.";

        orderMessage.style.color = "green";

    } else {

        // Create new order object
        let order = {

            item: foodItem.value,

            price: price,

            quantity: qty,

            total: price * qty
        };


        // Add object to array
        orders.push(order);

        orderMessage.textContent =
            "Item added to order.";

        orderMessage.style.color = "green";
    }


    // Display updated order
    displayOrders();


    // Reset food selection
    foodItem.value = "";
    quantity.value = "";


    updatePlaceOrderButton();

});


// --------------------------------------------------
// DISPLAY ORDERS
// --------------------------------------------------

function displayOrders() {

    orderList.innerHTML = "";

    let subtotalAmount = 0;


    if (orders.length === 0) {

        orderList.innerHTML =
            "No items added yet.";

        subtotal.textContent = "0";
        deliveryCharge.textContent = "0";
        total.textContent = "0";

        updatePlaceOrderButton();

        return;
    }


    orders.forEach(function (order, index) {

        // Calculate subtotal
        subtotalAmount =
            subtotalAmount + order.total;


        let div =
            document.createElement("div");


        div.className = "order";


        div.innerHTML =

            "<strong>" + order.item + "</strong>" +

            "<br>Price: ₹" + order.price +

            "<br>Quantity: " +

            "<button class='quantityButton' " +
            "onclick='decreaseQuantity(" + index + ")'>" +
            "−</button>" +

            " <span class='quantity'>" +
            order.quantity +
            "</span> " +

            "<button class='quantityButton' " +
            "onclick='increaseQuantity(" + index + ")'>" +
            "+</button>" +

            "<br>Item Total: ₹" +
            order.total +

            "<br>" +

            "<button class='delete' " +
            "onclick='deleteOrder(" + index + ")'>" +

            "Delete" +

            "</button>";


        orderList.appendChild(div);

    });


    // Delivery charge
    let delivery = 0;

    if (subtotalAmount > 0) {

        delivery = 40;
    }


    // Final bill
    let finalAmount =
        subtotalAmount + delivery;


    subtotal.textContent =
        subtotalAmount;

    deliveryCharge.textContent =
        delivery;

    total.textContent =
        finalAmount;


    updatePlaceOrderButton();
}


// --------------------------------------------------
// INCREASE QUANTITY
// --------------------------------------------------

function increaseQuantity(index) {

    if (orders[index].quantity < 20) {

        orders[index].quantity++;

        orders[index].total =
            orders[index].price *
            orders[index].quantity;

        displayOrders();

    } else {

        orderMessage.textContent =
            "Maximum quantity allowed is 20.";

        orderMessage.style.color = "red";
    }
}


// --------------------------------------------------
// DECREASE QUANTITY
// --------------------------------------------------

function decreaseQuantity(index) {

    if (orders[index].quantity > 1) {

        orders[index].quantity--;

        orders[index].total =
            orders[index].price *
            orders[index].quantity;

        displayOrders();

    } else {

        orderMessage.textContent =
            "Quantity cannot be less than 1.";

        orderMessage.style.color = "red";
    }
}


// --------------------------------------------------
// DELETE ITEM
// --------------------------------------------------

function deleteOrder(index) {

    orders.splice(index, 1);

    displayOrders();

    orderMessage.textContent =
        "Item removed from order.";

    orderMessage.style.color = "red";
}


// --------------------------------------------------
// CLEAR ORDER
// --------------------------------------------------

clearButton.addEventListener("click", function () {

    orders = [];

    customerName.value = "";
    phone.value = "";
    address.value = "";
    instructions.value = "";

    foodItem.value = "";
    quantity.value = "";

    nameError.textContent = "";
    phoneError.textContent = "";
    addressError.textContent = "";
    foodError.textContent = "";
    quantityError.textContent = "";

    orderMessage.textContent = "";

    displayOrders();

});


// --------------------------------------------------
// VALIDATE DETAILS WHILE TYPING
// --------------------------------------------------

customerName.addEventListener("input", updatePlaceOrderButton);

phone.addEventListener("input", updatePlaceOrderButton);

address.addEventListener("input", updatePlaceOrderButton);


// --------------------------------------------------
// PLACE ORDER
// --------------------------------------------------

placeOrderButton.addEventListener("click", function () {

    // Validate customer information again
    if (!validateCustomerDetails()) {

        return;
    }


    if (orders.length === 0) {

        orderMessage.textContent =
            "Please add at least one item.";

        orderMessage.style.color = "red";

        return;
    }


    // Calculate final bill
    let subtotalAmount = 0;

    orders.forEach(function (order) {

        subtotalAmount =
            subtotalAmount + order.total;

    });


    let delivery = 40;

    let finalAmount =
        subtotalAmount + delivery;


    // Create final order object
    let finalOrder = {

        customerName:
            customerName.value.trim(),

        phone:
            phone.value.trim(),

        address:
            address.value.trim(),

        specialInstructions:
            instructions.value.trim(),

        items:
            orders,

        subtotal:
            subtotalAmount,

        deliveryCharge:
            delivery,

        finalBill:
            finalAmount
    };


    // Convert order to JSON
    let jsonData =
        JSON.stringify(finalOrder, null, 2);


    // Display JSON in console
    console.log("Final Order Data in JSON:");
    console.log(jsonData);


    // Success message
    orderMessage.textContent =
        "Order placed successfully! Final Bill: ₹" +
        finalAmount;

    orderMessage.style.color = "green";

});