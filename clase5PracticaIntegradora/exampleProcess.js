const listNumbers = (...numbers) => {

   const types =  numbers.map(arg => typeof arg)
   const invalidParam = numbers.some(arg => typeof arg != "number")

   if(invalidParam){
    console.log("Invalid parameters: " +  types)
    process.exit(-4)
   }

}

process.on("exit",(code)=> {
    if(code === -4){
        console.log("Proceso finalizado por argumentación inválida en una función")
    } else {
        console.log("Proceso finalizado con codigo: " + code)
    }
})

listNumbers(1,45,56,4)