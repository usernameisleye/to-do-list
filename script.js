const taskInput = document.querySelector('.task-input input');

taskInput.addEventListener('keyup', e =>{
    let taskValue = taskInput.value;
    
    if(e.key == 'Enter' && taskValue != ''){
        console.log(taskValue)
    }
})