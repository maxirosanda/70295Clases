const createCookie = document.getElementById('crear-cookie')
const buttonGetCookie = document.getElementById('getCookie')

createCookie.addEventListener('click',async ()=>{
    const name = document.getElementById('name').value
    const modo = document.getElementById('modo').value
    await fetch('http://localhost:8080/cookie',{
        method:"POST",
        body:JSON.stringify({name,modo}),
        headers:{
            'Content-Type': 'application/json'
        }
    })
})


buttonGetCookie.addEventListener('click',async ()=>{
    try {
     const result = await fetch(`http://localhost:8080/cookie`)
     const data = await result.json()
     coderCookie = JSON.parse(data.coderCookie)
     console.log(coderCookie.name)
    } catch (error) {
         console.log('error')
    }
 })
