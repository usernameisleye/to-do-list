const taskInput = document.querySelector('.task-input input');

let todoList = JSON.parse(localStorage.getItem('todo-list'));//getting localStorage todo-list then parsing
function showTodo(){
    todoList.forEach((todo, id) =>{
        console.log(id, todo);
    })
}

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

