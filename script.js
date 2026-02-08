// TODO: Register submissions from the user on the form

let tasks = [] // initialize the variable as an empty array
const taskForm = document.getElementById("taskForm")
const taskTable = document.getElementById("taskTable")

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

    // TODO: Update tasks array
    tasks.push({name: taskName, description: taskDescription, deadline: taskDeadline});
    render();
}


// Function to render tasks in the table
function render() {
    // TODO: Use array methods to create a new table row of data for each item in the array
    taskTable.innerHTML = tasks.map(task =>
        `<tr>
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.deadline}</td>
            <td><button id="complete-btn" onclick="markTaskComplete(this)">Complete</button></td>
            <td><button id="remove-btn" onclick="removeTask(this)">Remove</button></td>
        </tr>`
    ).join("");
}

function markTaskComplete(task) {
    alert("Task completed! Good job!");
    const complete_btn = document.getElementById("complete-btn");
    complete_btn.closest("tr").remove();
}

function removeTask(task) {
    alert("Task removed");
    const remove_btn = document.getElementById("remove-btn");
    remove_btn.closest("tr").remove();
}

// Function to initialize the table
function init() {
    taskTable.innerHTML = ""; // Clears the table
    tasks = []; // Reset the tasks array
    render(); // Call the render function

    // Event listener for form submission
    taskForm.addEventListener("submit", handleSubmission);
}

// Call the init function to set up the initial state of the app
init();
