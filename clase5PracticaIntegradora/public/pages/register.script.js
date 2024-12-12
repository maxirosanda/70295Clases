const register = document.getElementById("register")

register.addEventListener('click',async ()=>{
    const email = document.getElementById('email').value
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const age = document.getElementById('age').value
    const password = document.getElementById('password').value
    const newUser = {
        email,
        firstName,
        lastName,
        age,
        password
    }
    const response = await fetch('http://localhost:8080/api/users/register',{
        method:"POST",
        body: JSON.stringify(newUser),
        headers: {'Content-Type': 'application/json'}

    })
    const data = await response.json()
    console.log(data)
})