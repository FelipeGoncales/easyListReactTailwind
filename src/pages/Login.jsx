import { useState } from "react"
import { useNavigate } from "react-router-dom";
import FormLogin from '../components/FormLogin'
import Logo from '../components/Logo'

// URL da API
const url = "https://easylistapi.onrender.com";

function Login() {

   
    return (
        <div className='min-h-screen w-full bg-gray-200 flex flex-col gap-10 justify-center items-center p-[80px_0]'>
            <Logo />
        
            <FormLogin />

            <p className='text-[15px] sm:w-auto w-[90%] text-slate-900 text-center'>ⓒ Todos os direitos reservados</p>

        </div>
    )
}

export default Login;