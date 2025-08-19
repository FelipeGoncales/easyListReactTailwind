import { useEffect, useState } from "react"
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
    const [msg, setMsg] = useState(null);

    // Variável para fazendo requisição
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg(null), 4000);
            return () => clearTimeout(timer); // limpa o timer se a msg mudar antes
        }
    }, [msg]);

    // Função para exibir mensagem de erro
    function showMessage(text, type = "error") {
        setMsg({ text, type });
    }

    // Função para envio do formulário
    function onFormSubmit(e) {
        e.preventDefault();
        
        setLoading(true);

        // Caso os dados estejam incompletos, exibe mensagem de erro
        if (!email.trim() || !senha.trim() || !nome.trim()) {
            return showMessage("Dados incompletos.", 'error');
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
                // Desativa o carregamento
                setLoading(false);

                if (data.error) {
                    // Exibir mensagem de erro
                    return showMessage(data.error, 'error');
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
        
            <FormCadastro email={email} setEmail={setEmail} senha={senha} setSenha={setSenha} nome={nome} setNome={setNome} onFormSubmit={onFormSubmit} loading={loading} />

            <p className='text-[15px] sm:w-auto w-[90%] text-slate-900 text-center'>ⓒ {currentYear} Todos os direitos reservados</p>
        
            {
                msg && (
                    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-[30px] flex items-center justify-center w-full">
                        <div 
                        className={`flex items-center justify-center p-3 rounded-md gap-3 shadow-md max-w-[350px] msg
                            ${msg.type === "error" ? "bg-red-400 text-red-800" : "bg-green-400 text-green-800"}`}
                        >
                            <i className={`fa-solid ${msg.type === "error" ? "fa-xmark" : "fa-check"} text-[15px]`} />
                            <p className="text-[14px]/[1.1rem] font-semibold">{msg.text}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Cadastro;