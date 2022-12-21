const taskInput = document.querySelector('.task-input input');
const taskContent = document.querySelector('.task-content');

let todoList = JSON.parse(localStorage.getItem('todo-list'));//getting localStorage todo-list then parsing
function showTodo(){
    let li = '';
    if(todoList){//if todoList exists
        todoList.forEach((todo, id) =>{
            li +=  `<li class="task">
                    <label for="${id}">
                        <input type="checkbox" id="${id}">
                        <p>${todo.name}</p>
                    </label>
    
                    <div class="options">
                        <i class="fa-solid fa-ellipsis"></i>
                        
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

