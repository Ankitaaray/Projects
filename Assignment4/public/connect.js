   const socket = io();
   let userName=null;
   let userId=null;
   let receiverId=null;
   const getAllUsers=null;

   const input=document.getElementById("message-input")
   const form=document.getElementById("message-form")
   const sendBtn=document.getElementById("sendBtn")
   const messages=document.getElementById("messages")


   //profile
   fetch("/auth/profile", {
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
    }).then(res=>{
        if(res.status===401){
            window.location.href="/login.html"
            return;
        }
        
        return res.json();
    }).then(data=>{
        userName=data.username;
        userId=data.id;
        socket.emit("register", {userId,userName});
        document.getElementById("username").textContent=data.username;
    }).catch(err=>{
        console.error("Auth failed:",err);
        window.location.href="/login.html"
    })
    


    fetch("/users",{
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
    }).then(res=>res.json()).then(data=>{
        const userList=document.getElementById("user-list");
        userList.innerHTML=" ";
        data.forEach(user=>{
            if(user.id!=userId){
                const li=document.createElement("li");
            li.className="list-group-item list-group-item-action py-3 px-3 d-flex align-items-canter";
            li.innerHTML=`
            <i class="fa-solid fa-user-circle me-2 text primary" style="color:#0c73a6;"></i>
            <span class="fw-bold">${user.user_name}</span>`;
            li.dataset.user_id=user.id;
            userList.appendChild(li);
            }
            
        });
        getAllUsers=data;
    }).catch(er=>{
        console.error("Error fetching users",err);
    })
    document.getElementById("user-list").addEventListener("click", (e)=>{
        let target=e.target;
        if(target.tagName!=="LI"){
            target=target.closest("li");
        }
        
            receiverId=target.dataset.user_id;
            console.log("Clicked user id:", receiverId);

            fetch(`/messages/${userId}?receiver_id=${receiverId}`, {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
    }
})
.then(res => res.json())
.then(data => renderMessage(data))
.catch(err => console.error("Error fetching messages", err));



        
    })
    
    
    //getting message history





   function renderMessage(msg){
    messages.innerHTML=" ";
    msg.forEach(m => {
        const li= document.createElement('li');
        li.classList.add("list-group-item", "mb-2", "p-2", "rounded", "d-flex", "flex-column");
        li.style.maxWidth = "70%";

        const header=document.createElement("div");
        header.classList.add("small","fw-bold", "mb-1");
        header.textContent=m.user_name;

        const body = document.createElement("div");
        body.textContent = m.message;

        const time = document.createElement("div");
        time.classList.add("small", "text-muted", "mt-1", "align-self-end");
        time.textContent = new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        li.appendChild(header);
        li.appendChild(body);
        li.appendChild(time);
        
        if(Number(m.user_id)===Number(userId)){
            li.classList.add("bg-primary", "text-white", "align-self-end");
            li.style.marginLeft = "auto"; 
        }
        else{
            li.classList.add("bg-light", "text-dark", "align-self-start");
            li.style.marginRight = "auto";
        }
        messages.appendChild(li);
        messages.scrollTop=messages.scrollHeight;
    });
   }
   console.log("UserId from connect:",userId)

  function updateBtn(){
    sendBtn.disabled=input.value.trim().length===0;
   }
   updateBtn();
   input.addEventListener("input",updateBtn)
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on('privateMessage', (message) => {
            const li = document.createElement('li');
            li.classList.add("list-group-item", "mb-2", "p-2", "rounded", "d-flex", "flex-column");
            li.style.maxWidth = "70%";

            const header=document.createElement("div");
            header.classList.add("small","fw-bold", "mb-1");
            header.textContent=message.senderName

            const body = document.createElement("div");
            body.textContent = message.message;

            const time = document.createElement("div");
            time.classList.add("small", "text-muted", "mt-1", "align-self-end");
            time.textContent = new Date(Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            li.appendChild(header);
            li.appendChild(body);
            li.appendChild(time);

            if(Number(message.senderId)===Number(userId)){
                li.classList.add("bg-primary", "text-white", "align-self-end");
                li.style.marginLeft = "auto";
            }
            else{
                li.classList.add("bg-light", "text-dark", "align-self-start");
                li.style.marginRight = "auto";
            }
            messages.appendChild(li);
            messages.scrollTop=messages.scrollHeight;
        });
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if(sendBtn.disabled) return;
            const message = input.value;
            
            socket.emit('privateMessage', {
                senderId: userId,
                receiverId: receiverId,
                message:message,
                createdAt: Date.now()
            });

            console.log(userName);

            //saving messages
            fetch("/messages",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token")
                },
                body: JSON.stringify({
                    id:userId,
                    user_name:userName,
                    message:message,
                    receiver_id:receiverId
                })
            }).catch(err=>console.error("failed to save:", err));
            input.value = '';
            updateBtn()
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
//logout
document.getElementById("logoutBtn").addEventListener("click",()=>{
    localStorage.removeItem("token");
    window.location.href="/login.html";
});

