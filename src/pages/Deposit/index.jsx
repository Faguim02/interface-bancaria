import { Button, Input, InputGroup, InputLeftElement, useToast } from '@chakra-ui/react'
import { GiMoneyStack } from 'react-icons/gi'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { setAuthorizationHeader } from '../../Authorization'
import Api from '../../services/Api'

export default function Deposit(){

    const navigate = useNavigate()

    const [value, setValue] = useState(0)
    const [codigo, setCodigo] = useState("")

    let jwt = localStorage.getItem('@jwt')

    const toast = useToast()

    if(jwt){

        async function handleDeposite(){
            setAuthorizationHeader(jwt)

            await Api.post('/dep', {value : value})
            .then(res => {
                toast({
                    title : 'Depositado com sucesso!',
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
                    <h1>Deposito</h1>
                    <InputGroup>
                        <InputLeftElement pointerEvents={'none'}>
                            <GiMoneyStack/>
                        </InputLeftElement>
                        <Input type='number' placeholder='Valor ex: 1000' onChange={(e)=>setValue(e.target.value)} value={value}/>
                    </InputGroup>
                    <Button backgroundColor={'#E84855'} color={'white'} width={'100%'} onClick={handleDeposite}>
                        Depositar
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