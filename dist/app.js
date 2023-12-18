// OOP

const bill_input = document.querySelector("#bill");
const people_input = document.querySelector("#people-input");
const tip_percentage = document.querySelectorAll(".tip-percentage");
const resetBtn = document.querySelector("#reset");
const tipPerPerson = document.querySelector(".tip-person");
const totalPerPerson = document.querySelector(".total-person");

const percentages = Array.from(tip_percentage);
class Calculate {
  bill;
  people;
  tip_percentage;
  #totalTip;
  constructor(bill, people, tip_percentage) {
    this.bill = parseFloat(bill);
    this.people = parseFloat(people);
    this.tip_percentage = parseFloat(tip_percentage);
    this.#totalTip = parseFloat(this.bill * (this.tip_percentage / 100));
  }

  /* 
    Formula to Get the tip per person and total per person
     Total Tip = Bill amount * (Tip percentage / 100);
 Total Amount = Bill amount + Tip Amount
 Tip per person = Total tip / Number of people
 Total per person = Total amount / Number of people  */

  tipAmountPerPerson() {
    const tipPerPerson = (this.#totalTip / this.people).toFixed(2);

    return tipPerPerson;
  }

  totalAmountPerPerson() {
    const totalAmount = this.bill + this.#totalTip;
    const totalPerPerson = (totalAmount / this.people).toFixed(2);
    return totalPerPerson;
  }
}

const bill = 142.55;
const people = 5;

// UI
/*
detectError() => check for invalid input type such as text , then display error ui
output() => Show the calculation into the dom
buttonChangeBg () => Add an event listener to change the bgColor of the selected btn

*/

class UI {
  static showError(message, element) {
    const text = document.createElement("p");
    text.className = "error-msg";
    text.textContent = message;
    element.previousElementSibling.appendChild(text);
    element.style.border = "2px solid #ff5d5b";
    element.previousElementSibling.childNodes.forEach((child, index) => {
      if (index > 3) {
        child.remove();
      }
    });

    // Remove error message after 3s
    setTimeout(() => {
      text.remove();
      element.style.border = "none";
    }, 3000);
    return text;
  }

  static resetApp() {
    totalPerPerson.innerHTML = `$0.00`;
    tipPerPerson.innerHTML = `$0.00`;
    bill_input.value = "";
    people_input.value = "";
    bill_input.style.border = "none";
    people_input.style.border = "none";
    resetBtn.className = "btn";

    percentages.forEach((percentage_, index) => {
      if (index === 5) {
        percentage_.value = "";
      } else {
        percentage_.style.backgroundColor = "";
      }
    });
  }

  static buttonChangeBg(currentBtn) {
    currentBtn.style.backgroundColor = "red";
  }
}

// Event listeners

//inputs event Listener
bill_input.addEventListener("input", (e) => {
  if (bill_input.value === "") {
    resetBtn.className = "btn";
  } else {
    resetBtn.className = "btn-light-up";
  }
});

people_input.addEventListener("input", (e) => {
  if (people_input.value === "") {
    resetBtn.className = "btn";
  } else {
    resetBtn.className = "btn-light-up";
  }
});

// Percentage btn event listener

const percentage = percentages
  .map((percentage_) => percentage_)
  .forEach((percentage_, index) => {
    if (index !== 5) {
      percentage_.addEventListener("click", (e) => {
        percentages.forEach((percentage_) => {
          percentage_.style.backgroundColor = "";
        });
        const currentBtn = percentage_;
        if (index !== 5) {
          currentBtn.style.backgroundColor = "hsl(172, 67%, 45%)";
        }
        const calc = new Calculate(
          bill_input.value,
          people_input.value,
          percentage_.textContent
        );

        if (bill_input.value === "" || people_input.value === "") {
          UI.showError("Can't be zero", bill_input);
          UI.showError("Can't be zero", people_input);
          // Prevent error message from displaying more than once if button is clicked more than once
        } else {
          tipPerPerson.innerHTML = `$${calc.tipAmountPerPerson()}`;
          totalPerPerson.innerHTML = `$${calc.totalAmountPerPerson()}`;
        }
      });
    }

    if (index === 5) {
      percentage_.addEventListener("input", (e) => {
        // Instance of Calculate Class
        const calc = new Calculate(
          bill_input.value,
          people_input.value,
          e.target.value
        );

        if (bill_input.value === "" || people_input.value === "") {
          UI.showError("Can't be zero", bill_input);
          UI.showError("Can't be zero", people_input);
          // Prevent error message from displaying more than once if button is clicked more than once
        } else if (e.target.value === "") {
          totalPerPerson.innerHTML = `$0.00`;
          tipPerPerson.innerHTML = `$0.00`;
        } else {
          tipPerPerson.innerHTML = `$${calc.tipAmountPerPerson()}`;
          totalPerPerson.innerHTML = `$${calc.totalAmountPerPerson()}`;
        }
      });
    }
  });

// Custom Input

// Reset Btn functionality

resetBtn.addEventListener("click", () => {
  UI.resetApp();
});
