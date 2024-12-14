import styles from './ButtonPrimary.module.css'

export const ButtonPrimary = ({text,onClick}) => {
  return (
    <button className={styles.btn} onClick={onClick}>{text}</button>
  )
}
