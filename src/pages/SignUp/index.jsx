import style from './style.module.css'
import img from '../../assets/Savings.gif'
import {Input, InputGroup, InputLeftElement, Button } from '@chakra-ui/react'
import { AiOutlineMail, AiOutlineArrowRight, AiOutlineLock, AiOutlineUser, AiFillIdcard } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Api from '../../services/Api';

export default function SignUp(){

    const [stage, setStage] = useState(1)

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [CPF, setCPF] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")

    const [ceep, setCeep] = useState("")
    const [complemento, setComplemento] = useState("")
    const [numberEndress, setNUmberEndress] = useState(0)

    function handleSignIn(){
        
        if(stage >= 3){
            
            async function onSubmitUser(){
                
                try{
                    const data = {
                        "full_name" : fullName,
                        "date_nasciment" : dataNascimento,
                        "cpf" : CPF,
                        "email" : email,
                        "password" : password,
                        "ceep" : ceep,
                        "complemento" : complemento,
                        "endress_number" : numberEndress
                    }

                    await Api.post('/creatAccount', data)

                    alert("Cadastrado")
    
                }catch(err){
                    alert("Não foi possivel conectar ao servidor")
                }
            }

            onSubmitUser()
            
        }else{
            setStage(stage+1)
        }
    }

    return(
        <main className={style.container}>
            <form className={style.interationContainer}>

                <p>
                    Nosso banco ofereçe total segurança para você sempre ficar com a mente vazia e a conta cheia
                </p>

                {stage == 1 && (
                    <>                    
                    
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <AiOutlineUser/>
                            </InputLeftElement>
                            <Input type='text' placeholder='Nome completo' value={fullName} onChange={(e => setFullName(e.target.value))}/>
                        </InputGroup>

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

                    </>
                )}

                {stage == 2 && (
                    <>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <AiFillIdcard/>
                            </InputLeftElement>
                            <Input type='text' placeholder='CPF 000.000.000-00' value={CPF} onChange={(e => setCPF(e.target.value))}/>
                        </InputGroup>


                        <div className={style.stage2}>
                            <p>Data de nascimento:</p>

                            <Input
                            placeholder="Select Date and Time"
                            size="md"
                            type="date"
                            onChange={(e) => setDataNascimento(e.target.value)}
                            />

                        </div>
                        
                    </>
                )}

                {stage == 3 && (
                    <>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CiLocationOn/>
                            </InputLeftElement>
                            <Input type='text' placeholder='CEEP 01153000' value={ceep} onChange={(e => setCeep(e.target.value))}/>
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CiLocationOn/>
                            </InputLeftElement>
                            <Input type='text' placeholder='Complemento, ex: Mercado tal' value={complemento} onChange={(e => setComplemento(e.target.value))}/>
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CiLocationOn/>
                            </InputLeftElement>
                            <Input type='number' placeholder='numero da casa' value={numberEndress} onChange={(e => setNUmberEndress(e.target.value))}/>
                        </InputGroup>
                    </>
                )}

                <Button 
                backgroundColor={'#E84855'} 
                color={'white'} 
                width={350}
                rightIcon={<AiOutlineArrowRight/>}
                onClick={handleSignIn}
                >Proximo</Button>

                <Link to={'/'}>Já tem uma conta? aperte aqui</Link>

            </form>
            <figure>
                <img src={img} alt='logo'/>
            </figure>
        </main>
    )
}