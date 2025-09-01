document.getElementById('loginForm').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email= document.getElementById("email").value;
    try{
        const response=await fetch('/auth/login',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email})
    })
    const data = await response.json();
    if(response.ok){
        localStorage.setItem("token", data.token)
        window.location.href = "/index.html"; 
    }else {
        statusDiv.innerText = ":x: " + data.message;
      }
    }
    catch(err){
        console.error(err);
        window.location.href
    }
    
})

document.getElementById('registerForm').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email= document.getElementById("email").value;
    const name=document.getElementById("username")
    try{
        const response=await fetch('/auth/register',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email})
    })
    const data = await response.json();
    if(response.ok){
        localStorage.setItem("token", data.token)
        window.location.href = "/index.html"; 
    }else {
        statusDiv.innerText = ":x: " + data.message;
      }
    }
    catch(err){
        console.error(err);
        window.location.href
    }
    
})