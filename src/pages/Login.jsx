import { useState } from "react"
import FormLogin from '../components/FormLogin'
import Logo from '../components/Logo'

const url = import.meta.env.API_URL;

function Login() {
    
    // Obtém o ano atual
    const currentYear = new Date().getFullYear();

    // Variáveis email e senha
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Função para envio do formulário
    function onFormSubmit() {
        const data = {
            email: email,
            senha: senha
        }

        
    }

    return (
        <div className='min-h-screen w-full bg-gray-200 flex flex-col gap-10 justify-center items-center p-[80px_0]'>
            <Logo />
        
            <FormLogin email={email} setEmail={setEmail} senha={senha} setSenha={setSenha} onFormSubmit={onFormSubmit} />

            <p className='text-[15px] sm:w-auto w-[90%] text-slate-900 text-center'>ⓒ {currentYear} Todos os direitos reservados</p>
        </div>
    )
}

export default Login;