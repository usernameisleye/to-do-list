const taskInput = document.querySelector('.task-input input');
const taskContent = document.querySelector('.task-content');
const taskStatus = document.querySelectorAll('.status span');
let activeStatus = document.querySelector('span.active');

let editTaskId;
let isEdited = false;
taskInput.addEventListener('keyup', e =>{
    let taskValue = taskInput.value;
    
    if(e.key == 'Enter' && taskValue != ''){
        if(!isEdited){
            if(!todoList){
                todoList = [];
            }
            let todoValues = {name: taskValue, status: 'pending'};
            todoList.push(todoValues);//adding new todo to todoList
        }
        else{
            todoList[editTaskId].name = taskValue;
            isEdited = false; 
        }
        taskInput.value = '';
        localStorage.setItem('todo-list', JSON.stringify(todoList));//saving to localStorage with name as todo-list
        showTodo();
    }
})

let todoList = JSON.parse(localStorage.getItem('todo-list'));//getting localStorage todo-list then parsing

function showTodo(){
    let li = '';
    if(todoList){//if todoList exists
        todoList.forEach((todo, id) =>{
            //if status is completed, then set isChecked to 'checked'
            let isChecked = todoList.status == 'completed' ? 'checked' : '';

            li +=  `<li class="task">
                    <label for="${id}">
                        <input onclick="taskUpdate(this)" type="checkbox" id="${id}" ${isChecked}>
                        <p class="${isChecked}">${todo.name}</p>
                    </label>
    
                    <div class="options">
                        <i class="fa-solid fa-ellipsis" onclick="showTaskMenu(this)"></i>
                        
                        <ul class="task-options">
                            <li onclick="editTask(${id}, '${todo.name}')"><i class="fa-regular fa-pen-to-square"></i>Edit</li>
                            <li onclick="deleteTask(${id})"><i class="fa-regular fa-trash-can"></i>Delete</li>
                        </ul>
                    </div>
                </li>`
        }); 
    }
    taskContent.innerHTML = li;
}
showTodo();  

function taskUpdate(selectedTask){
    let taskInfo = selectedTask.parentElement.lastElementChild;//geting task name

    if(selectedTask.checked){
        taskInfo.classList.add("crossed");
        todoList[selectedTask.id].status = 'completed';
    }
    else{
        taskInfo.classList.remove("crossed");
        todoList[selectedTask.id].status = 'pending';
    }
    localStorage.setItem('todo-list', JSON.stringify(todoList));
}

function showTaskMenu(taskOptions){
    let showTaskOptions = taskOptions.parentElement.lastElementChild;

    showTaskOptions.classList.add('show');
    document.addEventListener('click', e =>{
        if(e.target != taskOptions || e.target.tagName != 'I'){
            showTaskOptions.classList.remove('show');
        }
    })
}

function deleteTask(deleteTaskId){
    todoList.splice(deleteTaskId, 1);
    localStorage.setItem('todo-list', JSON.stringify(todoList));
    showTodo();
}

function editTask(taskId, taskName){
    taskInput.value = taskName; 
    editTaskId = taskId; 
    isEdited = true;
}

taskStatus.forEach(statusBtn =>{
    statusBtn.addEventListener('click', () =>{
        activeStatus.classList.remove('active');
        statusBtn.classList.add('active');
    })
})