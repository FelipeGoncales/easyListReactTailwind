import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import createQuery from "../components/createQuery";
import Logo from "../components/Logo";
import FormValidarCadastro from "../components/FormValidarCadastro";
import AlertMessage from "../components/AlertMessage";

// URL da API
const url = "https://easylistapi.onrender.com";

function ValidarCadastro() {

    // Criando os hooks
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Variável para fazendo requisição
    const [loading, setLoading] = useState(false);

    // Variáveis state de email e código
    const [email, setEmail] = useState("");
    const [codigo, setCodigo] = useState("");
    const [codigoLength, setCodigoLength] = useState(0);

    // Variável para exibir mensagem
    const [msg, setMsg] = useState(null);
    
    // Effect de mensagens
    useEffect(() => {
            if (msg) {
                const timer = setTimeout(() => setMsg(null), 4000);
                return () => clearTimeout(timer); // limpa o timer se a msg mudar antes
            }
        }, [msg]);

    // Atualiza o valor da variável email
    useEffect(() => {
        const emailArg = searchParams.get("email");
        const enviarCodigo = searchParams.get("enviarCodigo")

        // Caso o argumento email não tenha sido informado, redireciona para login
        if (!emailArg) {
            navigate('/login');
        }

        // Altera o valor de email
        setEmail(emailArg);

        // Envia o código
        if (enviarCodigo) {
            onReenviarCodigoClick(emailArg);
        }
    }, [])

    // Função para exibir mensagem de erro
    function showMessage(text, type = "error") {
        setMsg({ text, type });
    }

    // Valida o campo input, permitindo apenas números
    function inputCodigoChange(codigoInput) {
        const listaCodigo = codigoInput.split('');

        const novaListaCodigo = listaCodigo.filter((a) => [0,1,2,3,4,5,6,7,8,9].includes(parseInt(a)))

        const codigoFormatado = novaListaCodigo.join('');

        setCodigo(codigoFormatado);
        setCodigoLength(novaListaCodigo.length);
    }

    // Envio do formulário
    function onFormSubmit(e) {
        // Previnir evento padrão
        e.preventDefault();

        if (codigo.length < 6) {
            // Show message error
            return showMessage("Código inválido", "error");
        }

        // Define carregando como verdadeiro
        setLoading(true);

        // Requisição para a API
        return fetch(`${url}/validar-cadastro`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                codigo: codigo
            })
        })
            .then((res) => res.json())
                .then((data) => {
                    // Desativa o carregamento
                    setLoading(false);

                    // Show message error
                    if (data.error) {
                        return showMessage(data.error, "error");
                    }

                    // Armazena o token no local storage
                    localStorage.setItem('token', data.token);

                    return createQuery(navigate, '/', {
                        text: data.success,
                        type: "success"
                    })
                })
                .catch((err) => console.log(err))
    }

    // Função para reenviar código
    function onReenviarCodigoClick(emailArg) {

        // Monta a query
        const query = new URLSearchParams();

        // Adiciona o parâmetro email (Caso não tenha o parâmetro, utiliza o state)
        query.set('email', emailArg ? emailArg : email);

        // Requisição para a API
        fetch(`${url}/reenviar-codigo?${query.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                // Caso retorne erro, exibe a mensagem
                if (data.error) {
                    return createQuery(navigate, '/login', {
                        text: data.error,
                        type: "error"
                    })
                }

                // Caso retorne sucesso, exibe a mensagem
                if (data.success) {
                    if (emailArg) {
                        return showMessage("Email enviado!", "success");
                    }
                    
                    return showMessage(data.success, "success");
                }

                // Caso não retorne nenhum dos dois, mostra mensagem padrão de erro inesperado
                return showMessage("Erro inesperado, tente novamente", "error");
            })
    }

    return (
        <div className='min-h-screen w-full bg-gray-200 flex flex-col gap-10 justify-center items-center p-[80px_0]'>
            
            <Logo />

            <FormValidarCadastro onFormSubmit={onFormSubmit} email={email} codigo={codigo} inputCodigoChange={inputCodigoChange} codigoLength={codigoLength} loading={loading} onReenviarCodigoClick={onReenviarCodigoClick} />

            {
                msg && (
                    <AlertMessage msg={msg} />
                )
            }
        </div>
    )
}

export default ValidarCadastro;