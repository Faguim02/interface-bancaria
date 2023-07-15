import style from './style.module.css'
import img from '../../assets/Savings.gif'
import {Input, InputGroup, InputLeftElement, Button } from '@chakra-ui/react'
import { AiOutlineMail, AiOutlineArrowRight, AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Api from '../../services/Api';

export default function SignIn(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('@jwt')){
            navigate('/dashboard')
        }
    },[])

    async function handleSignIn(){
        
        try{

            let data = {
                email : email,
                password : password
            }

            await Api.post('/signIn', data)
            .then(res => {
                
                if(res.data.token){
                    localStorage.setItem('@jwt', res.data.token)

                    navigate('/dashboard')
                }else{
                    alert("Essa conta não existe")
                }
            })
        }catch(err){
            console.log("Erro")
        }

    }

    return(
        <main className={style.container}>
            <article className={style.interationContainer}>

                <p>
                    Nosso banco ofereçe total segurança para você sempre ficar com a mente vazia e a conta cheia
                </p>

                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <AiOutlineMail/>
                    </InputLeftElement>
                    <Input type='email' placeholder='Digite seu email' value={email} onChange={(e => setEmail(e.target.value))}/>
                </InputGroup>

                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <AiOutlineLock/>
                    </InputLeftElement>
                    <Input type='password' placeholder='Senha' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </InputGroup>

                <Button 
                backgroundColor={'#E84855'} 
                color={'white'} 
                width={350}
                rightIcon={<AiOutlineArrowRight/>}
                onClick={handleSignIn}
                >Proximo</Button>

                <Link to={'/signUp'}>Faça sua conta</Link>

            </article>
            <figure>
                <img src={img} alt='logo'/>
            </figure>
        </main>
    )
}