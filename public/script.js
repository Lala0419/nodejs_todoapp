const tasksDOM = document.querySelector(".tasks")
const formDOM = document.querySelector(".task-form")
const taskInputDOM = document.querySelector(".task-input")
const formAlertDOM = document.querySelector(".form-alert")


const showTasks = async () => {
    try{
        //access to my API
        const {data: tasks} = await axios.get("/api/v1/tasks")
        // console.log(tasks);

        //when there are no tasks 
        //console.log(tasks.length)
        if(tasks.length<1){
            tasksDOM.innerHTML = `<h5 class= "empty-list">There are no tasks for today!</h5>`
            return
        }
        //tasks
        const allTasks = tasks
            .map((task)=>{
                const {completed, _id, name} = task; //分割代入

            return ` <div class="single-task ${completed && "task-completed"}">
                <h5>
                    <span><i class="far fa-check-circle"></i></span>${name}
                </h5>
                <div class="task-links">
                    <!-- modify link -->
                    <a href="edit.html?id=${_id}" class="edit-link">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a>
                    <!-- trash can -->
                    <button type="button" class="delete-btn" data-id="${_id}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>`;
        })
        .join("");
        // console.log(allTasks);
        tasksDOM.innerHTML = allTasks;
    } catch (err){
        console.log(err);
    }
}

showTasks();

//new tasks

formDOM.addEventListener("submit", async(event) => {
    event.preventDefault();
    const name = taskInputDOM.value;

    try{
        await axios.post("/api/v1/tasks", {name: name})
        showTasks();
        taskInputDOM.value = "";
        // to display it was a succcess to add new task
        formAlertDOM.style.display="block"; //display:none -> display: block
        formAlertDOM.textContent="Added new task!"
        formAlertDOM.classList.add('text-success') 
    } catch (err) {
        formAlertDOM.style.display="block"; 
        formAlertDOM.innerHTML = 'please write in maximum 80 letters'
    }
    setTimeout(()=>{
        formAlertDOM.style.display="none";
        formAlertDOM.classList.remove('text-success') 
    },3000)
})

// delete task

tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;
    // console.log(element.parentElement);
    if(element.parentElement.classList.contains("delete-btn")){
        const id = element.parentElement.dataset.id;
        try{
            await axios.delete(`/api/v1/tasks/${id}`)
            showTasks();
        }catch(err){
            console.log(err)
        }
    }
})

