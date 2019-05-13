//Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST = [],
    id = 0;

// Get item from localstorage
let data = localStorage.getItem("TODO");

// Check if data not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set id 
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

// Load item to UI
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Clear localstorage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
})



// Show todays date
const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US");

// Add toDo item function
function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE}" job="complete" id="${id}"></i>
                    <p class="text">${LINE}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>   
                  </li>
                  `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);

}

// Add an item to the list when user hits enter
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        // if input is not empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id = id,
                done = false,
                trash = false

            });
            // Add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
})
//addToDo("Drink Coffee", 1, true, false);

// Complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove to do
function removeToDO(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//Target the items created dynamically
list.addEventListener("click", function (event) {
    const element = event.target; //return the clicked elemt inside list
    const elementJob = element.attributes.job.value; // coplete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDO(element);
    }

    // Add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));

})