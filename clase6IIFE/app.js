const value = "hola"

console.log(value)

const saludar = (name) =>{
    console.log(`hola ${name} desde la funcion`)
}

//saludar("maxi")
//saludar("jose")

(async (name)=>{
    return console.log(`saludo unico a ${name}`)
})("maxi")

