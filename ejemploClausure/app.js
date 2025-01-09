

const productConstructor = () => {
    
    let product

    function setProduct(value) {
        product = value
    }

    function getProduct() {
        return product
    }

    return {
        setProduct,
        getProduct
    }
}

const newProduct = productConstructor()
newProduct.setProduct('Laptop')
console.log(newProduct.getProduct()) // Laptop