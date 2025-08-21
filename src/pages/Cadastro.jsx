import { useEffect, useState } from "react"
import FormCadastro from '../components/cadastro/FormCadastro'
import Logo from '../components/universais/Logo'
import { useNavigate } from "react-router-dom";
import createQuery from "../components/functions/createQuery";
import AlertMessage from "../components/universais/AlertMessage";
import urlAPI from "../url";

// URL da API
const url = urlAPI;

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

    // Effect para limpar timeout de mensagem
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

                // Redireciona para a página de verificar cadastro
                return createQuery(navigate, '/validar-cadastro', {
                    email: email
                })
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='min-h-screen w-full bg-gray-200 flex flex-col gap-10 justify-center items-center p-[80px_0]'>
            <Logo />
        
            <FormCadastro email={email} setEmail={setEmail} senha={senha} setSenha={setSenha} nome={nome} setNome={setNome} onFormSubmit={onFormSubmit} loading={loading} />

            <p className='sm:text-[15px] text-[13px] sm:w-auto w-[90%] text-slate-900 text-center'>ⓒ {currentYear} Todos os direitos reservados</p>
        
            {
                msg && (
                    <AlertMessage msg={msg} />
                )
            }
        </div>
    )
}

export default Cadastro;