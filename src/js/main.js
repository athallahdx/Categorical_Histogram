import { createHistogram } from "./histogram.js";

const addBtn = document.querySelector(".add");
const deleteBtn = document.querySelector(".delete");
const input = document.querySelector(".inp-group");
const form = document.querySelector("#category")

let i = 1;
let addSubmitBtn = false;
const classNames = [];
const classFrequencies = [];

function addInput() {
    const categoryName = document.createElement("input");
    categoryName.id = `name${i}`;
    categoryName.type = "text";
    categoryName.placeholder = `Category ${i}`;

    const categoryFrequency = document.createElement("input");
    categoryFrequency.id = `freq${i}`;
    categoryFrequency.type = "number";
    categoryFrequency.placeholder = `Frequency ${i}`;

    const flex = document.createElement("div");
    flex.className = "flex";

    const submitBtn = document.createElement("button");
    submitBtn.innerText = "Submit";
    submitBtn.className = "submit";

    flex.appendChild(categoryName);
    flex.appendChild(categoryFrequency);

    if (i == 1 && !addSubmitBtn) {
        form.appendChild(submitBtn);
        addSubmitBtn = true;
    }
    form.insertBefore(flex, form.lastChild);
    i++;

}

addBtn.addEventListener("click", addInput);

deleteBtn.addEventListener("click", (e) => {
    const lastChild = form.lastChild;
    form.removeChild(lastChild.previousSibling);
    if (i > 1) {
        i--;
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    classNames.length = 0; 
    classFrequencies.length = 0;

    for (let c = 1; c < i; c++) {
        let className = document.querySelector(`#name${c}`).value;
        let classFrequency = Number(document.querySelector(`#freq${c}`).value);

        classNames.push(className);
        classFrequencies.push(classFrequency);
    }

    console.log(classNames);
    console.log(classFrequencies);

    createHistogram(classNames, classFrequencies);
});



