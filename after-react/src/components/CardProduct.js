import styles from './CardProduct.module.css'
import { ButtonPrimary } from './ButtonPrimary'

export const CardProduct = ({product}) => {

    const {title,price,stock} = product

  return (
    <div className={styles.card}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.text}>Precio: {price}$ ARG</span>
        <span className={styles.text}> Stock: {stock}</span>
        <ButtonPrimary text="Comprar" onClick={()=>console.log("comprar")}/>
    </div>
  )
}
