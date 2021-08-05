let bill_button = document.querySelector("#money-input");
let people_button = document.querySelector("#people-input");
let percentage_button = document.getElementsByClassName("tips-button");
let reset = document.querySelector(".reset-button");
let title_tip_per_person = document.querySelector("#tip_per_person");
let title_total_per_person = document.querySelector("#total_per_person");
let warning = document.querySelector("#warning_people");
let has_percentage = false;
let has_people = false;
let has_bill = false;
let bill = 0;
let percentage = 0;
let people = 0;

bill_button.addEventListener("keyup", billGetter);
people_button.addEventListener("keyup", peopleGetter);
reset.addEventListener("click", erase);
for (let i = 0; i < percentage_button.length; ++i) {
    percentage_button[i].addEventListener("click", function () {
        for (let i = 0; i < percentage_button.length; ++i) {
            percentage_button[i].classList.remove("clicked");
        }
        percentage_button[i].classList.add("clicked");
        percentageSetter(i, percentage_button[i]);
    });
}

function erase() {
    bill = 0;
    percentage = 0;
    people = 0;
    title_tip_per_person.textContent = `$0.00`;
    title_total_per_person.textContent = `$0.00`;
    bill_button.textContent = "";
    people_button.textContent = "";
    for (let i = 0; i < percentage_button.length; ++i) {
        percentage_button[i].classList.remove("clicked");
    }
    percentage_button[5].value = "";
}

function percentageSetter(index, value) {
    if (index < 5) {
        percentage = value.getAttribute("data-percentage");
        console.log(percentage);
    } else if (index == 5) {
        console.log("custom");
        percentage_button[5].addEventListener("keyup", function () {
            percentage = this.value;
            console.log(percentage);
            calcTips();
        });
    }
    calcTips();
}

function billGetter() {
    bill = this.value;
    calcTips();
}

function peopleGetter() {
    people = this.value;
    warning.style.display = "none";
    console.log(typeof people);
    if (people < "1" && people != "") {
        warning.style.display = "block";
    }
    calcTips();
}

function calcTips() {
    if (bill > 0 && percentage > 0 && people > 0) {
        let total_bill = parseFloat(bill * (1 + percentage / 100));
        let total_per_person = total_bill / parseInt(people);
        let tip_amout_person = (bill * (percentage / 100)) / parseInt(people);
        console.log(`
        total per person = ${total_per_person}
        tip amout = ${tip_amout_person}
        `);
        title_tip_per_person.textContent = `$${tip_amout_person.toFixed(2)}`;
        title_total_per_person.textContent = `$${total_per_person.toFixed(2)}`;
    }
}
