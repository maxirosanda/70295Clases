import React, { useEffect, useState } from 'react'
import { CardProduct } from '../components/CardProduct'
import styles from './Home.module.css'

export const Home = () => {

    const [products,setProducts] = useState([])

    useEffect(()=>{
        (async ()=>{
            try {
                const response = await fetch("http://localhost:8080/api/products",{
                    method:"GET",
                    credentials:'include'
                })
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.log(error)
            }
        })()
    },[])



  return (
    <div className={styles.container}>
        {products.map(product => <CardProduct key={product._id} product={product}/>)}
    </div>
  )
}
