let tasks = JSON.parse(localStorage.getItem("tasks")) || [] 
 
let tasklist=document.querySelector(".tasklist") 
let total=document.querySelector("#total") 
let completed=document.querySelector("#completed") 
let pending=document.querySelector("#pending") 
let search= document.querySelector("#search")

search.addEventListener("input",()=>{
    let searchtask=tasks.filter(task=>task.title.toLowerCase().includes(search.value.toLowerCase()))
    showtasks(searchtask)
})
function showtasks(displaytask=tasks) 
{ 
    tasklist.innerHTML="<p class='loading'>Loading...</p>"
setTimeout(()=>{    
    tasklist.innerHTML="" 
    displaytask.forEach(task=>{ 
        let card=document.createElement("div") 
        card.classList.add("task") 
        card.classList.add(task.priority.toLowerCase()) 
        if(task.status === "Completed")
        {
            card.classList.add("completed")
        }

 
        card.innerHTML=` 
           <div class="taskinfo"> 
                <h3>${task.title}</h3> 
                <p>Member: ${task.member}</p> 
            </div> 
            <p>Priority: ${task.priority}</p> 
            <p>Deadline: ${task.deadline}</p> 
            <p>Status: ${task.status}</p>     
             
            <div class="taskbutton"> 
                <button class="complete">Complete</button> 
                <button class="delete">Delete</button> 
            </div> 
        ` 
        tasklist.appendChild(card) 
        let complete=card.querySelector(".complete")

        complete.addEventListener("click",()=>{
            task.status="Completed"
            localStorage.setItem("tasks",JSON.stringify(tasks))
            showtasks()
        })

        let deletetask = card.querySelector(".delete")

        deletetask.addEventListener("click",()=>{
            tasks = tasks.filter(t => t.id !== task.id)
            localStorage.setItem("tasks", JSON.stringify(tasks))
            showtasks()
        })
    }) 
    updatetally()
    },400)
} 
showtasks() 
 
let addtask=document.querySelector("#addtask") 
let form=document.querySelector(".form") 
 
addtask.addEventListener("click",()=>{ 
    form.style.display="flex" 
 
}) 
let title = document.querySelector("#title") 
let member = document.querySelector("#member") 
let priority = document.querySelector("#taskpriority") 
let deadline = document.querySelector("#deadline") 
let savetask = document.querySelector("#savetask") 
let canceltask = document.querySelector("#canceltask") 
 
canceltask.addEventListener("click",()=>{ 
    title.value="" 
    member.value="" 
    priority.value="High" 
    deadline.value="" 
    form.style.display="none" 
}) 
savetask.addEventListener("click",()=>{ 
    try {
        if(title.value.trim()==="")
        {
            throw new Error("Title cannot be empty")
        }
        if(member.value.trim()==="")
        {
            throw new Error("Assign a member")
        }
        if(priority.value==="")
        {
            throw new Error("Set Priority")
        }
        if(deadline.value==="")
        {
            throw new Error("Mention deadline")
        }
        let newtask = { 
        id:tasks.length + 1, 
        title:title.value, 
        member:member.value, 
        priority:priority.value, 
        deadline:deadline.value, 
        status:"Pending" 
    } 
    tasks.push(newtask) 
    localStorage.setItem("tasks", JSON.stringify(tasks)) 
    showtasks() 

    title.value="" 
    member.value="" 
    priority.value="High" 
    deadline.value="" 
    form.style.display="none" 

    } catch (error) {
        alert(error.message)
    }
 
}) 
function updatetally(){ 
    total.innerHTML=tasks.length 
    let completedcount=tasks.filter(tasks=> tasks.status==="Completed").length 
    completed.innerHTML=completedcount     
    let pendingcount=tasks.filter(tasks=> tasks.status==="Pending").length 
    pending.innerHTML=pendingcount 
}

let statusfilter=document.querySelector("#statusfilter")
statusfilter.addEventListener("change",()=>{
    if(statusfilter.value==="All")
    {
        showtasks()
    }
    else{
        let filtertask=tasks.filter(task=>task.status===statusfilter.value)
        showtasks(filtertask)
    }
})

let priorityfilter=document.querySelector("#priorityfilter")
priorityfilter.addEventListener("change",()=>{
    if(priorityfilter.value==="All")
    {
        showtasks()
    }   
    else{
        let filterpriority=tasks.filter(task=>task.priority.toLowerCase()===priorityfilter.value)
        showtasks(filterpriority)
    }
})
