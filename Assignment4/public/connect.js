   const socket = io();
   const input=document.getElementById("message-input")
   const form=document.getElementById("message-form")
   const sendBtn=document.getElementById("sendBtn")
   const messages=document.getElementById("messages")

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
            messages.appendChild(li);
        });
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if(sendBtn.disabled) return;
            const message = input.value;
            
            socket.emit('createMessage', {
                from: 'User',
                text: message,
                createdAt: Date.now()
            });
            input.value = '';
            updateBtn()
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });