let orders = [];

let customerName = document.getElementById("customerName");
let foodItem = document.getElementById("foodItem");
let quantity = document.getElementById("quantity");

let addButton = document.getElementById("addButton");
let orderList = document.getElementById("orderList");
let total = document.getElementById("total");

let placeOrderButton =
document.getElementById("placeOrderButton");

let clearButton =
document.getElementById("clearButton");

let nameError =
document.getElementById("nameError");

let foodError =
document.getElementById("foodError");

let quantityError =
document.getElementById("quantityError");

let orderMessage =
document.getElementById("orderMessage");

addButton.addEventListener("click", function () {

nameError.textContent = "";
foodError.textContent = "";
quantityError.textContent = "";
orderMessage.textContent = "";

let valid = true;

let name = customerName.value.trim();

if (name === "") {

    nameError.textContent =
        "Name is required.";

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


if (foodItem.value === "") {

    foodError.textContent =
        "Please select a food item.";

    valid = false;
}


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


if (valid === false) {
    return;
}


let selectedOption =
    foodItem.options[foodItem.selectedIndex];

let price =
    Number(selectedOption.getAttribute("data-price"));


let alreadyExists = orders.some(function (order) {

    return order.item === foodItem.value;

});


if (alreadyExists) {

    foodError.textContent =
        "This food item is already in your order.";

    return;
}


let order = {

    customer: name,
    item: foodItem.value,
    price: price,
    quantity: qty,
    total: price * qty

};


orders.push(order);

displayOrders();

foodItem.value = "";
quantity.value = "";

});

function displayOrders() {

orderList.innerHTML = "";

let totalAmount = 0;


if (orders.length === 0) {

    orderList.innerHTML =
        "No items added yet.";

    total.textContent = "0";

    return;
}


orders.forEach(function (order, index) {

    totalAmount =
        totalAmount + order.total;


    let div =
        document.createElement("div");


    div.className = "order";


    div.innerHTML =
        "<strong>" + order.item + "</strong><br>" +
        "Price: ₹" + order.price + "<br>" +
        "Quantity: " + order.quantity + "<br>" +
        "Item Total: ₹" + order.total + "<br>" +
        "<button class='delete' " +
        "onclick='deleteOrder(" + index + ")'>" +
        "Delete</button>";


    orderList.appendChild(div);

});


total.textContent = totalAmount;

}

function deleteOrder(index) {

orders.splice(index, 1);

displayOrders();

}

clearButton.addEventListener("click", function () {

orders = [];

displayOrders();

orderMessage.textContent = "";

});

placeOrderButton.addEventListener("click", function () {

if (orders.length === 0) {

    orderMessage.textContent =
        "Please add at least one item before placing the order.";

    orderMessage.style.color = "red";

    return;
}


let jsonData =
    JSON.stringify(orders, null, 2);


console.log("Order Data in JSON:");

console.log(jsonData);


orderMessage.textContent =
    "Order placed successfully!";

orderMessage.style.color = "green";

});