const logout = document.getElementById("logout")

logout.addEventListener('click',async ()=>{

    const response = await fetch('http://localhost:8080/api/users/logout')
    const data = await response.json()
    console.log(data)
})

const containerProducts = document.getElementById('containerProducts')
const getProducts = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/products')
        const data = await response.json()
        console.log(data)
        data.forEach(product => {
            const element = document.createElement('div')
            element.className="card"
            element.innerHTML = `
                <h2 class="card-title">${product.title}</h2>
                <span class="card-text">Precio: ${product.price}$ ARG</span>
                <span class="card-text"> Stock: ${product.stock}</span>
                <button class="btn">Comprar</button>
            `
        containerProducts.append(element)
    })
    } catch (error) {
        console.log(error)
    }
}
getProducts()