import { 
    Badge,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { BsKey } from "react-icons/bs";
import style from './style.module.css'
import { GoSignOut } from "react-icons/go";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setAuthorizationHeader } from '../../Authorization';
import Api from '../../services/Api';

export default function Dashboard(){

    const [user, setUser] = useState([])

    const navigate = useNavigate()

    let jwt = localStorage.getItem('@jwt')

    useEffect(()=>{

        if(jwt){
            setAuthorizationHeader(jwt)

            async function RequestProfile(){
                await Api.get('/profile')
                .then(res => setUser(res.data))
            }

            RequestProfile()
        }

    },[])

    function SignOut(){
        navigate('/')

        localStorage.removeItem('@jwt')
    }

    if(jwt){

        return(
            <main className={style.container}>
                <article className={style.texts}>
                    <section style={{display: 'flex', flexDirection:'row', gap: 5, alignItems:'center'}}>
                        <BsKey size={20} color='#E84855'/>    
                        <Badge variant='solid' backgroundColor={'#E84855'}>
                            {user.length == 0 ? (<p>Carregando</p>) : (user[0].account_codigo)}
                            
                        </Badge>
                    </section>
                    {user.length == 0 ? (<p>Carregando...</p>) : (
                        
                        <span className={style.fullname}>{user[0].full_name}</span>
                    )}

                </article>
                <article className={style.blocos}>
                    <section className={style.interationOut}>
                        <IconButton
                        backgroundColor={'#E84855'}
                        color={'white'}
                        width={'100%'}
                        height={'100%'}
                        icon={<GoSignOut size={30}/>}
                        onClick={SignOut}
                        />
                        
                    </section>
                    <section  className={style.interation}>
                        <p>Exiba seu saldo atual</p>
                        
                        <Popover>
                            <PopoverTrigger>
                                <Button backgroundColor={'#E84855'} color={'white'}>Exibir</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow/>
                                <PopoverCloseButton/>
                                <PopoverHeader>Valor</PopoverHeader>

                                <PopoverBody>
                                    {
                                        user.length == 0 ? (<p>Carregando</p>) : (<p>R$ {user[0].coin}</p>)
                                    }
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>

                    </section>
                    <section  className={style.interation}>
                        <p>Deposite seu dinheiro</p>

                        <Button backgroundColor={'#E84855'} color={'white'} onClick={()=> navigate('/dep')}>Depositar</Button>

                    </section>
                    <section  className={style.interation}>
                        <p>Transfira seu dinheiro</p>

                        <Button backgroundColor={'#E84855'} color={'white'}  onClick={()=> navigate('/transf')}>Transferir</Button>
                        
                    </section>
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