import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import FormLogin from '../components/login/FormLogin'
import Logo from '../components/universais/Logo'
import limparRota from "../components/functions/limparRota";
import AlertMessage from "../components/universais/AlertMessage";
import createQuery from "../components/functions/createQuery";
import urlAPI from "../url";

// URL da API
const url = urlAPI;

function Login() {
    // Declarando hooks
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const route = useLocation();

    // Obtém o ano atual
    const currentYear = new Date().getFullYear();

    // Variáveis email e senha
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Variável para exibir mensagem
    const [msg, setMsg] = useState(null);

    // Variável para fazendo requisição
    const [loading, setLoading] = useState(false);

    // Ao carregar a página
    useEffect(() => {
        // params de mensagem
        const msgType = searchParams.get("type");
        const msgText = searchParams.get("text");

        // Caso existam os componentes da mensagem, exibe a mensagem
        if (msgType != null && msgText != null) {
            // Limpa a rota
            limparRota(['text', 'type'], navigate, route, searchParams);
            return showMessage(msgText, msgType);
        }
    }, [navigate])

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

        if (!email.trim() || !senha.trim()) {
            return showMessage("Dados incompletos.", "error");
        }

        setLoading(true);

        const data = {
            email: email,
            senha: senha
        }

        return fetch(`${url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);

                // Caso dê erro
                if (data.error) {
                    // Redireciona para validar cadastro caso não esteja verificado
                    if (data.emailNotConfirmed) {
                        return createQuery(navigate, '/validar-cadastro', {
                            email: email,
                            enviarCodigo: true
                        });
                    }
                    // Exibir mensagem de erro
                    return showMessage(data.error, 'error');
                }

                // Salva o token e redireciona para home
                localStorage.setItem('token', data.token);
                createQuery(navigate, '/', {
                    text: data.success,
                    type: "success"
                });
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='min-h-screen w-full bg-gray-200 flex flex-col gap-10 justify-center items-center p-[80px_0]'>
            <Logo />
        
            <FormLogin email={email} setEmail={setEmail} senha={senha} setSenha={setSenha} onFormSubmit={onFormSubmit} loading={loading} />

            <p className='sm:text-[14px] text-[12px] sm:w-auto w-[90%] text-slate-900 text-center'>ⓒ {currentYear} Todos os direitos reservados</p>

            {
                msg && (
                    <AlertMessage msg={msg} />
                )
            }
        </div>
    )
}

export default Login;