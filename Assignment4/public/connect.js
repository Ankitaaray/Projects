   const socket = io();
   let userName=null;
   let userId=null;

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
        document.getElementById("username").textContent="Looged in as: " +data.username;
    }).catch(err=>{
        console.error("Auth failed:",err);
        window.location.href="/login.html"
    })


    //getting message history
    fetch("/messages",{
        headers:{
            "Authorization": "Bearer "+localStorage.getItem("token")
        }
    }).then(res=>{
        if(!res.ok)throw new Error("failed to fetch messages");
            return res.json();
    })
    .then(data=>renderMessage(data))
    .catch(err=>console.error("failed to save:", err));

   function renderMessage(msg){
    messages.innerHTML=" ";
    msg.forEach(m => {
        const li= document.createElement('li');
        li.textContent=`${m.user_name}:${m.message}`;
        if(m.user_id===userId){
            li.classList.add("list-group-item", "mb-2", "p-2", "rounded", "bg-primary", "text-white", "align-self-end")
            li.style.maxWidth = "70%";
            li.style.marginLeft = "auto"; 
        }
        else{
            li.classList.add("list-group-item", "mb-2", "p-2", "rounded", "bg-light", "text-dark", "align-self-start")
            li.style.maxWidth = "70%";
            li.style.marginRight = "auto"
        }
        messages.appendChild(li);
        messages.scrollTop=messages.scrollHeight;
    });
   }

   
  // Sending messages
   function updateBtn(){
    sendBtn.disabled=input.value.trim().length===0;
   }
   updateBtn();
   input.addEventListener("input",updateBtn)
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on('newMessage', (message) => {
            const li = document.createElement('li');
            li.textContent = `${message.from}: ${message.text}`;

            li.classList.add("list-group-item", "mb-2", "p-2", "rounded", "bg-primary", "text-white", "align-self-end");
            li.style.maxWidth = "70%";
            li.style.marginLeft = "auto"; 
            messages.appendChild(li);
            messages.scrollTop=messages.scrollHeight;
        });
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if(sendBtn.disabled) return;
            const message = input.value;
            
            socket.emit('createMessage', {
                from: userName,
                text: message,
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
                    message:message
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

