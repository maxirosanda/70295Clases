import { ButtonPrimary } from "../components/ButtonPrimary"
import styles from './Register.module.css'
import { useState } from "react"
import { Link, useNavigate } from "react-router"

export const Register = () => {

    const [email,setEmail] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [age,setAge] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = async () => {
        if(!email || !password || !firstName || !lastName  ) return
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
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
        
            })
            const data = await response.json()
            if(data.message === "user registed") return navigate('/')
        try {
            
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className={styles.form}>
        <input 
            className={styles.input}
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)} 
            placeholder="Ingrese su email"
        /> 
        <input 
            className={styles.input}
            type="text" 
            value={firstName}
            onChange={(e)=> setFirstName(e.target.value)} 
            placeholder="ingrese su primer nombre" 
        />
        <input 
            className={styles.input}
            type="text"
            value={lastName}
            onChange={(e)=> setLastName(e.target.value)} 
            placeholder="Ingrese su apellido" 
        />
        <input 
            className={styles.input}
            type="number"
            value={age}
            onChange={(e)=> setAge(e.target.value)} 
            placeholder="Ingrese su edad"
        />
        <input 
            className={styles.input}
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)} 
            placeholder="Ingrese un password" 
        />
        <ButtonPrimary text="Registrarme" onClick={handleRegister}/>
        <Link to="/login">Ya estoy registrado</Link>
    </div>
  )
}
