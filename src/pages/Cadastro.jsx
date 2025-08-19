import { useState } from "react"
import FormCadastro from '../components/FormCadastro'
import Logo from '../components/Logo'
import { useNavigate } from "react-router-dom";

// URL da API
const url = "https://easylistapi.onrender.com";

function Cadastro() {

   

    return (
        <div className='min-h-screen w-full bg-gray-200 flex flex-col gap-10 justify-center items-center p-[80px_0]'>
            <Logo />
        
            <FormCadastro />

            <p className='text-[15px] sm:w-auto w-[90%] text-slate-900 text-center'>ⓒ Todos os direitos reservados</p>
        
          
        </div>
    )
}

export default Cadastro;