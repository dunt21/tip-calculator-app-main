"use script";

const indvTip = document.getElementById("indv-tip");
const indvTotal = document.getElementById("indv-total");
const btnPercent = document.querySelectorAll("button");
const errorMsg = document.querySelector(".error-msg");
const resetBtn = document.getElementById("reset-btn");
const billInput = document.getElementById("bill");
const numOfPeopleInput = document.getElementById("people");

let totalTip = 0;
let tip4Indv = 0;
let total4Indv = 0;

//func to erase error msg
function clearError() {
  document.querySelector(".bill-error").style.display = "none";
  document
    .getElementById("bill")
    .classList.remove("border-red-400", "border-2");

  document.querySelector(".ppl-error").style.display = "none";
  document
    .getElementById("people")
    .classList.remove("border-red-400", "border-2");
  document.querySelector(".custom-err").classList.add("hidden");
  customPercent.classList.remove("border-red-400", "border-2");
}

//func to display errors for wrong input
function displayError(bill, numOfPeople) {
  if (bill === 0 || bill === "") {
    document.querySelector(".bill-error").style.display = "block";
    document.getElementById("bill").classList.add("border-red-400", "border-2");
    hasError = true;
  } else {
    clearError();
  }

  if (numOfPeople === 0 || numOfPeople === "") {
    document.querySelector(".ppl-error").style.display = "block";
    document
      .getElementById("people")
      .classList.add("border-red-400", "border-2");
    hasError = true;
  } else {
    hasError = false;
    clearError();
  }
}

//func to display numbers in human readable format
function formatNumbers(val) {
  const rawValue = Number(Number(val).toFixed(2));
  const formattedValue = Intl.NumberFormat("en-us").format(rawValue);
  return formattedValue;
}

//func to display results
function displayResults(tip, total) {
  indvTip.textContent = `$${formatNumbers(tip)}`;
  indvTotal.textContent = `$${formatNumbers(total)}`;
}

//initializing bill and formatting the user input
let bill = 0;
billInput.addEventListener("input", function (e) {
  const value = e.target.value;
  bill = Number(value);
  e.target.value = formatNumbers(value);
});

//initializing numOfPeople and formatting the user input
let numOfPeople = Number(numOfPeopleInput.value);
numOfPeopleInput.addEventListener("input", function (e) {
  const value = e.target.value;
  numOfPeople = Number(value);

  e.target.value = formatNumbers(value);
});

//func to calculate amt
function calculateAmt(percentage) {
  //check for wrong input
  displayError(bill, numOfPeople);
  if (hasError) {
    return;
  }

  totalTip = bill * (percentage / 100);
  tip4Indv = totalTip / numOfPeople;
  total4Indv = (bill + tip4Indv) / numOfPeople;

  //display results
  displayResults(tip4Indv, total4Indv);
}

btnPercent.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    //making the btn visible for clicks
    resetBtn.classList.remove("opacity-20", "pointer-events-none");

    //retrieving the button percentage
    const percentage = Number(btn.value);
    console.log(percentage);

    //continue calculation
    calculateAmt(percentage);
  });
});

//to calculate with custom percentages
const customPercent = document.getElementById("custom");

customPercent.addEventListener("input", (e) => {
  const value = Number(e.target.value);

  if (value < 1 || value > 100) {
    e.target.value = 0;
    document.querySelector(".custom-err").classList.remove("hidden");
    customPercent.classList.add("border-red-400", "border-2");
  } else {
    document.querySelector(".custom-err").classList.add("hidden");
    customPercent.classList.remove("border-red-400", "border-2");
  }
});

customPercent.addEventListener("keydown", (e) => {
  const percentage = Number(customPercent.value);
  if (e.key === "Enter") {
    //doing this cos after hitting enter it submits the form as a default and uses the btn value instead
    e.preventDefault();

    calculateAmt(percentage);
  }
});

//to reset button default style and results
let isClicked = false;
resetBtn.addEventListener("click", function () {
  isClicked = true;
  if (isClicked) {
    resetBtn.classList.add("opacity-20", "pointer-events-none");
    displayResults(0, 0);
    clearError();
  }
});
