import  { useState } from 'react'
import InputCustom from '../../ui/InputCustom'
import Container from '../../ui/Container'

const Login = () => {


  const [loginForm, setLoginForm] = useState({
    username:'',
    pin:''
  })

  return (
    <Container className='containerBg flex flex-col gap-4 justify-center-safe h-screen text-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6'>
      <h1 className='text-4xl bg-white'>Ingresar</h1>
      <InputCustom inputClassName='text-center' className='text-center text-2xl bg-white' label='Nombre de usuario' type='text' value={loginForm.username} onChange={(e)=> setLoginForm({...loginForm, username:e.target.value})}/>
      <InputCustom inputClassName='text-center' className='text-center text-2xl bg-white' label='Pin' type='text' value={loginForm.pin} onChange={(e) => setLoginForm({...loginForm, pin:e.target.value})} />
      </div>
    </Container>
  )
}

export default Login