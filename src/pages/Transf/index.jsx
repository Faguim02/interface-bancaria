import { Button, Input, InputGroup, InputLeftElement, useToast } from '@chakra-ui/react'
import { GiMoneyStack } from 'react-icons/gi'
import { BsKey } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import style from './style.module.css'
import { useState } from 'react'
import { setAuthorizationHeader } from '../../Authorization'
import Api from '../../services/Api'

export default function Transf(){

    const navigate = useNavigate()

    const [keyCod, setKeyCod] = useState("")
    const [value, setValue] = useState("")

    let jwt = localStorage.getItem('@jwt')

    const toast = useToast()

    if(jwt){

        function handleTransf(){
            setAuthorizationHeader(jwt)

            Api.post('/transf', {
                account_codigo : keyCod,
                value : value
            })
            .then(res => {
                toast({
                    title: 'Transferido com sucesso!',
                    description : `Codigo: ${res.data.codigo}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
        }

        return(
            <main className={style.container}>
                <article className={style.camp}>
                    <h1>Transferência</h1>
                    
                    <InputGroup>
                        <InputLeftElement pointerEvents={'none'}>
                            <BsKey/>
                        </InputLeftElement>
                        <Input type='text' placeholder='Chave de transferencia' onChange={(e)=>setKeyCod(e.target.value)} value={keyCod}/>
                    </InputGroup>
                    
                    <InputGroup>
                        <InputLeftElement pointerEvents={'none'}>
                            <GiMoneyStack/>
                        </InputLeftElement>
                        <Input type='number' placeholder='Valor ex: 1000' onChange={(e) => setValue(e.target.value)} value={value}/>
                    </InputGroup>
                    <Button backgroundColor={'#E84855'} color={'white'} width={'100%'} onClick={handleTransf}>
                        Transferir
                    </Button>

                    <Button width={'100%'} onClick={()=>navigate('/dashboard')}>
                        Cancelar
                    </Button>

                </article>
            </main>
        )
    }else{
        return(
            <main style={{
                display : 'flex',
                justifyContent : 'center',
                alignItems : 'center',
                flexDirection : 'column'
            }}>
                <h1>Algo deu errado</h1>
                <Button backgroundColor={'#E84855'} color={'white'}  onClick={()=> navigate('/')}>Voltar</Button>
            </main>
        )
    }
}