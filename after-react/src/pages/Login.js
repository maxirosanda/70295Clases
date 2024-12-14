import { useState } from 'react'
import styles from './Login.module.css'
import { useNavigate } from 'react-router'
import { ButtonPrimary } from '../components/ButtonPrimary'

export const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {

        if(!email || !password) return console.log("falta parametro") // despues armar mensaje para el usuario
        const user = {email,password}
        try {
            const responde = await fetch('http://localhost:8080/api/users/login',{
                method:"POST",
                body:JSON.stringify(user),
                headers: {'Content-Type': 'application/json'},
                credentials:'include'
            })
            const data = await responde.json()
            setEmail("")
            setPassword("")
            if(data.message === "Ok login") return navigate("/")
    
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.form}>
            <input 
                className={styles.input} 
                type="email" 
                placeholder="Ingrese su email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
                className={styles.input} 
                type="password" 
                placeholder="Ingresu su contraseña"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <ButtonPrimary text="Registrarme" onClick={handleLogin}/>
        </div>
    </div>
  )
}
