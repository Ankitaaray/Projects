document.getElementById('loginForm').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email= document.getElementById("email").ariaValueMax;
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