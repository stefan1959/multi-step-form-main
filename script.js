// Get elements from the DOM
const nameInput = document.getElementById("name");
const nameError = document.getElementById("nameError");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
const phone = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");
const btn = document.querySelectorAll(".btn");
const btnBack = document.querySelectorAll(".btn-2");
const formNext = document.querySelectorAll(".form-step");
const ArcadeCard = document.getElementById("Arcade");
const AdvancedCard = document.getElementById("Advanced");
const ProCard = document.getElementById("Pro");

const formAddon = document.querySelectorAll(".form-step-addon");

const sideBarStep = document.querySelectorAll(".sidebar-step");
const formOption = document.getElementById("form-option");
const cardprices = document.querySelectorAll(".form-step-card-price");
const extraPrices = document.querySelectorAll(".form-step-card-extra");
const totalPrice = document.getElementById("total-price");

// Variables
let yearlySet = false;
let addonTotal = 0;
let priceSet = 9;
let totalPriceValue = 0;
let currentStep = 0;
let emailOK;
let planSet = "Arcade";
let addOns = {
  OnlineService: false,
  LargerStorage: false,
  CustomizableProfile: false,
};
const YearlyValues = {
  Arcade: 90,
  Advanced: 120,
  Pro: 150,
};
// console.log plan-selected

// page 2
formOption.addEventListener("change", () => {
  if (formOption.checked) {
    yearlySelect();
  } else {
    monthlySelect();
  }
});

// Button listeners
btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (!checkFields()) {
      return;
    }
    hidePage();
    currentStep++;
    showPage();
  });
});
btnBack.forEach((btnBack) => {
  btnBack.addEventListener("click", () => {
    hidePage();
    currentStep--;
    showPage();
  });
});

for (let i = 0; i < formAddon.length; i++) {
  const ele = formAddon[i];
  ele.addEventListener("click", () => {
    if (ele.checked) {
      addOns[ele.id] = true;
    } else {
      addOns[ele.id] = false;
    }
  });
}

// Hide section
function hidePage() {
  formNext[currentStep].classList.add("hidden");
  sideBarStep[currentStep].classList.remove("active");
}
// Show section
function showPage() {
  formNext[currentStep].classList.remove("hidden");
  sideBarStep[currentStep].classList.add("active");
  if (currentStep == 3) {
    console.log("lets create page");
    document.getElementById("plan-selected").innerHTML =
      `${planSet}(${yearlySet === false ? "Monthly" : "Yearly"})<br>
      <div class="form-summary-plan-change"><a onclick="change()" id="change" href="#">Change</a></div>
      `;
    document.getElementById("plan-select-price").innerHTML =
      `$${priceSet}/${yearlySet ? "yr" : "mo"}`;
    addAddon();
    console.log(addonTotal);
    totalPriceValue = priceSet + addonTotal;
    totalPrice.innerHTML = `Total (${yearlySet ? "per year" : "per month"})\n              <div id="total-price" class="form-summary-total-price">$${totalPriceValue}</div>\n            `;
    // totalPriceTxt.innerHTML = `(${yearlySet ? "per year" : "per month"})`;
  }
}
// listen for a click Form - name field
nameInput.addEventListener("click", () => {
  clearErrors(); //clear the errors in the form
});
phone.addEventListener("click", () => {
  clearErrors();
});
email.addEventListener("input", (e) => {
  clearErrors();
  if (validateEmail(email.value)) {
    email.classList.remove("invalid-1");
    email.classList.add("valid");
    emailOK = true;
  } else {
    email.classList.add("invalid-1");
    email.classList.remove("valid");
    emailOK = false;
  }
});
function change() {
  hidePage();
  currentStep = 1;
  showPage();
}

//check email validation
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
// Cech input fields for errors or empty
function checkFields() {
  if (!nameInput.value) {
    nameError.classList.remove("hidden");
    return false;
  } else if (!emailOK) {
    emailError.classList.remove("hidden");
    return false;
  } else if (!phone.value) {
    phoneError.classList.remove("hidden");
    false;
  } else {
    return true;
  }
}

function clearErrors() {
  emailError.classList.add("hidden");
  nameError.classList.add("hidden");
  phoneError.classList.add("hidden");
}

function yearlySelect() {
  for (let i = 0; i < 3; i++) {
    let attrPrice = cardprices[i].getAttribute("yearly");
    console.log("yearly " + attrPrice);
    cardprices[i].innerHTML = `${attrPrice}/yr`;
    cardprices[i].nextElementSibling.style.opacity = "1";
    attrPrice = extraPrices[i].getAttribute("yearly");
    extraPrices[i].innerHTML = `${attrPrice}`;
    yearlySet = true;
    planSet === "Arcade"
      ? (priceSet = 90)
      : planSet === "Advanced"
        ? (priceSet = 120)
        : planSet === "Pro"
          ? (priceSet = 150)
          : (priceSet = 9);
  }
}
function monthlySelect() {
  for (let i = 0; i < 3; i++) {
    let attrPrice = cardprices[i].getAttribute("monthly");
    cardprices[i].innerHTML = `${attrPrice}/mo`;
    cardprices[i].nextElementSibling.style.opacity = "0";
    attrPrice = extraPrices[i].getAttribute("monthly");
    extraPrices[i].innerHTML = `${attrPrice}`;
    yearlySet = false;
    planSet === "Arcade"
      ? (priceSet = 9)
      : planSet === "Advanced"
        ? (priceSet = 12)
        : planSet === "Pro"
          ? (priceSet = 15)
          : (priceSet = 9);
  }
}

// set a plan
ArcadeCard.addEventListener("click", () => {
  deSelectAll();
  ArcadeCard.classList.add("selected");
  planSet = "Arcade";
  yearlySet ? (priceSet = 90) : (priceSet = 9);
});
AdvancedCard.addEventListener("click", () => {
  deSelectAll();
  AdvancedCard.classList.add("selected");
  planSet = "Advanced";
  yearlySet ? (priceSet = 120) : (priceSet = 12);
});

ProCard.addEventListener("click", () => {
  deSelectAll();
  ProCard.classList.add("selected");
  planSet = "Pro";
  yearlySet ? (priceSet = 150) : (priceSet = 15);
});

function deSelectAll() {
  ArcadeCard.classList.remove("selected");
  AdvancedCard.classList.remove("selected");
  ProCard.classList.remove("selected");
}
// display addons in summary page
function addAddon() {
  const finalAddons = document.getElementById("final-add-ons");
  addonTotal = 0;
  finalAddons.innerHTML = "";
  if (addOns.OnlineService) {
    yearlySet ? (addonTotal += 10) : (addonTotal += 1);
    finalAddons.innerHTML += `
      <div class="form-summary-service flex-between">Online Service
      <div class="form-summary-service-price">+$${yearlySet === false ? "1/mo" : "10/yr"}</div>
      </div>
    `;
  }
  if (addOns.LargerStorage) {
    yearlySet ? (addonTotal += 20) : (addonTotal += 2);
    finalAddons.innerHTML += `
      <div class="form-summary-service flex-between">Large Storage
      <div class="form-summary-service-price">+$${yearlySet === false ? "2/mo" : "20/yr"}</div>
      </div>
    `;
  }
  if (addOns.CustomizableProfile) {
    yearlySet ? (addonTotal += 20) : (addonTotal += 2);
    finalAddons.innerHTML += `
      <div class="form-summary-service flex-between">Customizable Profile
      <div class="form-summary-service-price">+$${yearlySet === false ? "2/mo" : "20/yr"}</div>
      </div>
    `;
  }
}
