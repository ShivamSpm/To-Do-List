const inputVal = document.getElementsByClassName('inputVal')[0]
const addTaskBtn = document.getElementsByClassName('btn')[0]
const undoTaskBtn = document.getElementsByClassName('undoBtn')[0]
const clearTaskBtn = document.getElementsByClassName('clearTask')[0]



undoTaskBtn.disabled = true
inputVal.onkeyup = ()=>{
    let userEnteredValue = inputVal.value; //getting user entered value
    if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
      addTaskBtn.classList.add("active"); //active the add button
    }else{
      addTaskBtn.classList.remove("active"); //unactive the add button
    }
  }

addTaskBtn.addEventListener('click',()=>{
    
    let localItems = JSON.parse(localStorage.getItem('localItem'))
    
    if(localItems===null){
        taskList = []
    }
    else
    {
        taskList = localItems
    }
    taskList.push(inputVal.value)
    localStorage.setItem('localItem', JSON.stringify(taskList))
    inputVal.value = ''
    undoTaskBtn.disabled = true
    showTasks()
    
})


function showTasks(){

    clearTaskBtn.classList.remove("active")
    let html = ''
    let taskListShow = document.querySelector('.todoListItem')
    let localItems = JSON.parse(localStorage.getItem('localItem'))
    if(localItems===null){
        taskList = []
    }
    else
    {
        taskList = localItems
    }
    // console.log(taskList.length)
    if(taskList.length>0){
        clearTaskBtn.classList.add("active")
    }
    taskList.forEach((data,index) => {
        html += `
    <p>${data}<span class="icon" onclick="deleteItem(${index})"><i class="fas fa-trash"></i></span></p>
    `    
    });
    taskListShow.innerHTML = html;
}
showTasks()

function deleteItem(index){
    
    const temp = taskList
    
    let removed = taskList.splice(index,1)
    
    localStorage.setItem('localItem', JSON.stringify(taskList))
    showTasks()
    undoTaskBtn.disabled = false
    undoTaskForDelete(temp,index, removed)
    // temp.splice(index,0,removed)
    // localStorage.setItem('localItem', JSON.stringify(temp))
}



// function clearTask(){
//     let temp = taskList
//     localStorage.clear()
//     showTasks()
//     // localStorage.setItem('localItem', JSON.stringify(temp))
    
// }

clearTaskBtn.addEventListener('click',()=>{
    let temp = taskList
    // undoTask(temp)
    localStorage.clear()
    showTasks()
    undoTaskBtn.disabled = false
    undoTaskForClear(temp)
    // localStorage.setItem('localItem', JSON.stringify(temp))
})


function undoTaskForDelete(temp, index, removed){
    undoTaskBtn.addEventListener('click',()=>{
        
    temp.splice(index,0,removed)
    localStorage.setItem('localItem', JSON.stringify(temp))
    undoTaskBtn.disabled = true
    showTasks()
    })
}

function undoTaskForClear(temp){
    undoTaskBtn.addEventListener('click',()=>{
    
    localStorage.setItem('localItem', JSON.stringify(temp))
    undoTaskBtn.disabled = true
    showTasks()
    })
}

// undoTaskBtn.addEventListener('click',()=>{
//     // let temp = undoTask()
//     // localStorage.setItem('localItem', JSON.stringify(temp))
//     showTasks()


// })