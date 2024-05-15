const registerForm = document.getElementById("registerForm");
const testButton = document.getElementById("testButton");
const placeOrderButton = document.getElementById("placeOrder");
console.log("testButton", testButton);

function registerFormSubmit(e) {
  console.log("- registerFormSubmit");
  e.preventDefault();
}

let sessionCart = {};

function updateList() {
  console.log(sessionCart);
  let allForms = document.querySelectorAll(".productCard");
  allForms.forEach((form) => {
    if (form.id in sessionCart) {
      form.querySelector(".productCard__counter").textContent =
        sessionCart[form.id];
    } else {
      form.querySelector(".productCard__counter").textContent = "0";
    }
  });
  // sessionCart.forEach((product) => {});
}

function placeOrder() {
  console.log("- placeOrder");
  fetch("/placeorder", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sessionCart),
  }).catch(function (error) {
    console.log(error);
  });
}

async function getCard(name, amount = 0) {
  let newLine = document.createElement("li");
  let productCardForm = document.createElement("form");
  productCardForm.id = name;
  productCardForm.classList.add("productCard");
  let title = document.createElement("h3");
  title.textContent = name;

  let counterWrapper = document.createElement("div");
  let counter = document.createElement("div");
  counter.classList.add("productCard__counter");
  counter.textContent = amount.toString();
  let plus = document.createElement("button");
  plus.textContent = "+";
  let minus = document.createElement("button");
  minus.textContent = "-";
  counterWrapper.append(minus);
  counterWrapper.append(counter);
  counterWrapper.append(plus);

  minus.addEventListener("click", (e) => {
    e.preventDefault();
    // @ts-ignore
    let id = e.currentTarget.closest("form").id;
    if (sessionCart[id] > 1) {
      sessionCart[id] -= 1;
    } else if (sessionCart[id]) {
      delete sessionCart[id];
    }
    updateList();
  });
  plus.addEventListener("click", (e) => {
    e.preventDefault();
    // @ts-ignore
    let id = e.currentTarget.closest("form").id;
    if (sessionCart[id]) {
      sessionCart[id] += 1;
    } else {
      sessionCart[id] = 1;
    }
    updateList();
  });

  productCardForm.append(title);
  productCardForm.append(counterWrapper);
  newLine.appendChild(productCardForm);
  return newLine;
}

function drawItems(itemArray) {
  console.log("- drawItems");
  console.log("itemArray", itemArray);
  const productList = document.querySelector(".product-list");
  itemArray.forEach((item) => {
    getCard(item.product_name).then((response) => {
      productList.append(response);
    });
  });
}

function init() {
  console.log("INIT");
  fetch("/getproductlist")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      drawItems(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function testButtonfunc() {
  console.log("testButtonfunc");
  fetch("/dbtest")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function setListeners() {
  registerForm.addEventListener("submit", registerFormSubmit);
  testButton.addEventListener("click", testButtonfunc);
  placeOrderButton.addEventListener("click", placeOrder);
}
setListeners();
// drawItems();
init();
