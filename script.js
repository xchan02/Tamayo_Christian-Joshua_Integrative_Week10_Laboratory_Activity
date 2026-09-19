// -----------------------------------
// JAVASCRIPT CAFE
// ASYNCHRONOUS ORDER PROCESSING
// -----------------------------------

// Get the HTML elements
const orderSelect = document.getElementById("orderSelect");
const startOrderButton = document.getElementById("startOrderButton");
const orderStatus = document.getElementById("orderStatus");

// -----------------------------------
// AVAILABLE ITEMS
// -----------------------------------
const availableItems = [
    "Latte",
    "Cappuccino",
    "Iced Coffee",
    "Matcha Latte",
    "Chocolate Cake"
];

// -----------------------------------
// DELAY FUNCTION
// Uses a Promise to create a delay
// -----------------------------------
function delay(milliseconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, milliseconds);
    });
}

// -----------------------------------
// DISPLAY STATUS MESSAGE
// -----------------------------------
function displayMessage(message, className = "") {
    const newMessage = document.createElement("div");
    newMessage.className = "status-line " + className;
    newMessage.textContent = message;
    orderStatus.appendChild(newMessage);
}

// -----------------------------------
// CHECK IF ITEM IS AVAILABLE
// -----------------------------------
async function checkAvailability(item) {
    // Wait for 2 seconds
    await delay(2000);
    displayMessage("Checking order...", "processing");

    // Small delay so the checking message can be seen before continuing
    await delay(1000);

    if (!availableItems.includes(item)) {
        throw new Error("Sorry, " + item + " is unavailable.");
    }

    return true;
}

// -----------------------------------
// PREPARE THE ORDER
// -----------------------------------
async function prepareOrder(item) {
    displayMessage(
        "Order confirmed: " + item,
        "success"
    );

    await delay(1500);

    displayMessage(
        "Preparing " + item + "...",
        "processing"
    );

    await delay(2000);

    displayMessage(
        item + " is ready!",
        "success"
    );
}

// -----------------------------------
// DELIVER THE ORDER
// -----------------------------------
async function deliverOrder(item) {
    await delay(1500);

    displayMessage(
        "Delivering your order...",
        "processing"
    );

    await delay(2000);

    displayMessage(
        "Order delivered successfully! Enjoy your " + item + " ♡",
        "success"
    );
}

// -----------------------------------
// COMPLETE ORDER PROCESS
// -----------------------------------
async function processOrder(item) {
    try {
        // Check whether the item exists
        await checkAvailability(item);

        // Prepare the item
        await prepareOrder(item);

        // Deliver the item
        await deliverOrder(item);
    } catch (error) {
        displayMessage(
            "Error: " + error.message,
            "error"
        );
    } finally {
        startOrderButton.disabled = false;
    }
}

// -----------------------------------
// START ORDER BUTTON
// -----------------------------------
startOrderButton.addEventListener("click", async function() {
    const selectedItem = orderSelect.value;

    // Make sure an item was selected
    if (selectedItem === "") {
        orderStatus.innerHTML = "";
        displayMessage(
            "Please select an item first.",
            "error"
        );
        return;
    }

    // Clear previous messages
    orderStatus.innerHTML = "";

    // Disable button while order is processing
    startOrderButton.disabled = true;

    // Display the first required message
    displayMessage(
        "Order received...",
        "processing"
    );

    // Start the asynchronous order process
    await processOrder(selectedItem);
});
