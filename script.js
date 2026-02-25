// TODO: Register submissions from the user on the form

let tasks = [] // initialize the variable as an empty array
const taskForm = document.getElementById("taskForm")
const taskTable = document.getElementById("taskTable")

// const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')
const modalElement = document.getElementById("myModal");
const completeModal = new bootstrap.Modal(modalElement);


// TODO: Determine the value of the data submitted and add it to Javascript array calls
// TODO: Call the render function to update the table with new tasks.

// Function to handle form submissions
function handleSubmission(event) {
    event.preventDefault(); // This fuction stops our form from reloading the page
    
    // TODO: Get form input values
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDeadline = document.getElementById("taskDeadline").value;

    // TODO: Validate input fields
    if(taskName == "" && taskDescription == "") {
        alert("Task name and description are required!");
    }
    else {
        // TODO: Update tasks array
        // Placed this in the else block to prevent null tasks added to the tasks array
        tasks.push({name: taskName, description: taskDescription, deadline: taskDeadline});
        render();
        saveTasks(tasks);
    }
}


// Function to render tasks in the table
function render() {
    // TODO: Use array methods to create a new table row of data for each item in the array
    taskTable.innerHTML = tasks.map((task, index) =>
        `<tr>

            <div class="card w-100 mb-3">
                <div class="card-body">
                    <h5 class="card-title">${task.name}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text">Date Due:&nbsp;${task.deadline}</p>
                    <a class="btn btn-secondary" onclick="removeTask(${index})"><i class="fa-solid fa-trash-can"></i>&nbsp;Delete</a>
                    <a class="btn btn-primary" onclick="markTaskComplete(${index})"><i class="fa-solid fa-check"></i>&nbsp;Complete</a>
                    
                </div>
            </div>
        </tr>`
    ).join("");
}

function markTaskComplete(index) {
    const complete_btn = document.getElementById("complete-btn");
    tasks.splice(index, 1);   // remove 1 element at this index
    render(); 
    saveTasks(tasks)
    completeModal.show();
}

function removeTask(index) {
    // alert("Task removed");
    const remove_btn = document.getElementById("remove-btn");
    tasks.splice(index, 1);   // remove 1 element at this index
    render(); 
    saveTasks(tasks)
}

// Function to initialize the table
function init() {
    taskTable.innerHTML = ""; // Clears the table
    tasks = []; // Reset the tasks array
    render(); // Call the render function
    
    // Event listener for form submission
    taskForm.addEventListener("submit", handleSubmission);

}

function saveTasks(tasks) {
    console.log("Saving tasks to local storage...");

    localStorage.setItem("SavedTasks", JSON.stringify(tasks));  // save as JSON
    
    console.log("Tasks saved!");
}

function loadTasks() {
    console.log("Loading tasks...")

    const loadedTasks = localStorage.getItem("SavedTasks");

    if(loadedTasks) {
        tasks = JSON.parse(loadedTasks);    // restore into the global tasks array
        render();                           // rebuild the HTML from tasks
        console.log("Tasks loaded!")
    }
    else console.log("Saved tasks wasn't found...")
}

// Call the init function to set up the initial state of the app
init();
loadTasks();
// render()