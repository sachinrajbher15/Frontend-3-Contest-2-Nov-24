// Script for fetching the menu and displaying the items
document.addEventListener("DOMContentLoaded", getMenu);

function getMenu() {
    fetch("assets/food.json")
        .then(response => response.json())
        .then(data => {
            const menuItemsContainer = document.getElementById("menu-items");
            data.forEach(item => {
                // Create a new div for each food item
                const foodItem = document.createElement("div");
                foodItem.classList.add("menu-item");

                // Add the food item's image, name, and price to the div
                foodItem.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}" class="food-img">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                    <button class="order-btn" onclick="takeOrder('${item.name}', ${item.price})">Order</button>
                `;
                menuItemsContainer.appendChild(foodItem);
            });
        })
        .catch(error => console.error("Error fetching the menu:", error));
}

function takeOrder(foodName, foodPrice) {
    const order = {
        foodName,
        price: foodPrice,
        status: "Pending"
    };

    console.log("Order placed for:", foodName);
    
    TakeOrder(foodName)  // Pass the selected foodName here
        .then(order => {
            console.log("Order processed:", order);
            return orderPrep();
        })
        .then(orderStatus => {
            console.log("Order prepared:", orderStatus);
            return payOrder();
        })
        .then(paymentStatus => {
            console.log("Payment successful:", paymentStatus);
            thankyouFnc();
        })
        .catch(error => console.error("Error during order process:", error));
}

function TakeOrder(foodName) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const order = {
                foodName: foodName,
                status: "Processed"
            };
            resolve(order);
        }, 2500); // Simulate a 2.5s delay
    });
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                order_status: true,
                paid: false
            });
        }, 1500); // Simulate a 1.5s delay
    });
}

function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                order_status: true,
                paid: true
            });
        }, 1000); // Simulate a 1s delay
    });
}

function thankyouFnc() {
    alert("Thank you for eating with us today!");
}
