const taskInput = document.querySelector('.task-input input');
const taskContent = document.querySelector('.task-content');

taskInput.addEventListener('keyup', e =>{
    let taskValue = taskInput.value;
    
    if(e.key == 'Enter' && taskValue != ''){
        if(!todoList){
            todoList = [];
        }
        taskInput.value = '';
        let todoValues = {name: taskValue, status: 'Pending'};
        todoList.push(todoValues);//adding new todo to todoList
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
                            <li><i class="fa-regular fa-pen-to-square"></i>Edit</li>
                            <li><i class="fa-regular fa-trash-can"></i>Delete</li>
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
        if(e.target != taskOptions || e.target.tagName != 'I' ){
            showTaskOptions.classList.remove('show');
        }
    })
}
