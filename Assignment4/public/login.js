document.getElementById('loginForm').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email= document.getElementById("email").ariaValueMax;
    const response=await fetch('/login',{
        method:"POST",
    })
})