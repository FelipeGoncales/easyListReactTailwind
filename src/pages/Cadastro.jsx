import { useState } from "react"
import FormCadastro from '../components/FormCadastro'
import Logo from '../components/Logo'
import { useNavigate } from "react-router-dom";

// URL da API
const url = "https://easylistapi.onrender.com";

function Cadastro() {

    const navigate = useNavigate();
    
    // Obtém o ano atual
    const currentYear = new Date().getFullYear();

    // Variáveis nome, email e senha
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Variável para exibir mensagem
    const [exibirMsg, setExibirMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Função para exibir mensagem de erro
    function onExibirMsg(msg) {
        setExibirMsg(true);
        setErrorMsg(msg);

        setTimeout(() => {
            setExibirMsg(false);
            setErrorMsg('');
        }, 4150)
    }

    // Função para envio do formulário
    function onFormSubmit(e) {
        e.preventDefault();

        // Caso os dados estejam incompletos, exibe mensagem de erro
        if (!email.trim() || !senha.trim() || !nome.trim()) {
            return onExibirMsg("Dados incompletos.");
        }

        // Cria o objeto data
        const data = {
            email: email,
            senha: senha,
            nome: nome
        }

        // Requisição POST para cadastro
        return fetch(`${url}/cadastro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    // Exibir mensagem de erro
                    return onExibirMsg(data.error);
                }

                // Salva o token e redireciona para home
                localStorage.setItem('token', data.token);
                navigate('/');
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='min-h-screen w-full bg-gray-200 flex flex-col gap-10 justify-center items-center p-[80px_0]'>
            <Logo />
        
            <FormCadastro email={email} setEmail={setEmail} senha={senha} setSenha={setSenha} nome={nome} setNome={setNome} onFormSubmit={onFormSubmit} />

            <p className='text-[15px] sm:w-auto w-[90%] text-slate-900 text-center'>ⓒ {currentYear} Todos os direitos reservados</p>
        
            {
                exibirMsg ? (
                    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-[30px] flex items-center justify-center w-full">
                        <div 
                            className="flex items-center justify-center bg-red-400 p-3 rounded-md gap-3 msg box-border box-border max-w-[350px] shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                        >
                            <i className="fa-solid fa-xmark text-[15px] text-red-800"></i>
                            <p className="text-[14px]/[1.1rem] text-red-800 font-semibold">{errorMsg}</p>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default Cadastro;