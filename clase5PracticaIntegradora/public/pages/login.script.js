const login = document.getElementById("login")

login.addEventListener('click',async ()=>{
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const user = {
        email,
        password
    }
    const response = await fetch('http://localhost:8080/api/users/login',{
        method:"POST",
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}

    })
    const data = await response.json()
    console.log(data)
})