import { useEffect, useState } from "react";
import createQuery from "../components/createQuery";
import InfoUser from "../components/InfoUser";
import TelaLoading from "../components/TelaLoading";
import FormPerfil from "../components/FormPerfil";
import { useNavigate } from "react-router-dom";
import ModalConfirmDelete from "../components/ModalConfirmDelete";

// URL da API
const url = "https://easylistapi.onrender.com";

// Página Perfil
function Perfil() {

    // Declarando variável hook navigate 
    const navigate = useNavigate();

    // Obtém os dados do usuário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');

    // Variável para controle do modal de deletar conta
    const [confirmDelete, setConfirmDelete] = useState(false);

    // Variável para exibir mensagem
    const [msg, setMsg] = useState(null);

    // Variável para controle de loading
    const [loading, setLoading] = useState(true);

    // Função para obter token
    function getToken() {
        return localStorage.getItem('token');
    }

    // Ao carregar a página, busca pelo token
    useEffect(() => {
        const token = getToken();

        // Caso não tenha token, redireciona para login
        if (!token) return navigate('/login');

        // Acessa a rota de get cadastro
        fetch(`${url}/cadastro`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then((res) => res.json())
            .then((data) => {
                // Terminou de buscar as informações
                setLoading(false);

                // Caso haja mensagem de erro
                if (data.error) {
                    // Limpa o token
                    localStorage.removeItem('token');

                    // Redireciona para login e exibe mensagem de erro
                    return createQuery(navigate, '/login', {
                        text: data.error,
                        type: "error"
                    });
                }

                // Obtém e salva os dados do usuário
                const usuario = data.usuario;
                return setNome(usuario.nome), setEmail(usuario.email);
            })
    })

    // Effect onChange msg
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

    // Função de envio do formulário
    function onFormSaveChangesSubmit(e) {
        // Evita que o navegador recarregue a página
        e.preventDefault();

        // Obtém o token
        const token = getToken();

        const data = {}

        if (!email.trim() || !nome.trim()) {
            return showMessage("Dados incompletos", "error");
        }

        data["email"] = email;
        data["nome"] = nome;
        
        // Acessa a rota de cadastro
        fetch(`${url}/cadastro`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                // Retorna mensagem de erro caso houver
                if (data.error) {
                    return showMessage(data.error, "error");
                }

                // Retorna mensagem de sucesso
                return showMessage(data.success, "success");
            })
            .catch((err) => console.log(err));
    }

    // Limpa o token e redireciona para a página de login
    function onSairClick(type, text) {
        // Remove o token do local storage
        localStorage.removeItem('token');

        // Redireciona o usuário para login após limpar o token
        createQuery(navigate, '/login', {
            'type': type,
            'text': text
        })
    }

    // Rota de confirmação da exclusão da conta
    function onDeleteAccountConfirm() {
        const token = getToken();

        // Tela de carregamento
        setConfirmDelete(false);
        setLoading(true);

        // Acessa a rota de deletar usuário
        return fetch(`${url}/cadastro`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then((res) => res.json())
            .then((data) => {
                // Retira o token do local storage
                localStorage.removeItem('token');

                // Redireciona para login com a mensagem do erro
                if (data.error) {
                    return createQuery(navigate, '/login', {
                        text: data.error,
                        type: "error"
                    })
                }

                // Redireciona para login com mensagem de cadastro deletado com sucesso
                return createQuery(navigate, '/login', {
                    text: data.success,
                    type: "success"
                })
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center sm:p-[80px_0] p-[20px_0_30px_0]">
            {
                // Caso esteja carregando, exibe tela de loading
                loading ?
                    (<TelaLoading />) : null
            }

            {
                // Caso o botão de deletar conta seja acionado
                confirmDelete ? (
                    <ModalConfirmDelete action={onDeleteAccountConfirm} setConfirm={setConfirmDelete} title={"Excluir conta permanentemente?"} />
                ) : null
            }

            <div className="sm:w-[420px] w-[90%] flex flex-col justify-center items-center gap-6">
                <InfoUser nome={nome} email={email} onSairClick={() => onSairClick('success', 'Logout realizado com sucesso!')} />

                <FormPerfil email={email} setEmail={setEmail} nome={nome} setNome={setNome} senha={senha} setSenha={setSenha} confirmSenha={confirmSenha} setConfirmSenha={setConfirmSenha} />

                <div className="flex justify-between items-center w-full">
                    <div 
                        className="flex justify-between items-center gap-3 text-[14px] cursor-pointer p-[10px_0] text-slate-900"
                        onClick={() => navigate('/')}
                    >
                        <i className="fa-solid fa-chevron-left text-xl"></i>
                        <p>Voltar para home</p>
                    </div>

                    <button
                        className="bg-[#ff4652] p-[8px] rounded-xl text-red-800 flex items-center justify-center gap-1 text-[14px] cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.15)]"
                        onClick={() => setConfirmDelete(true)}
                    >
                        <i className="fa-solid fa-trash-can"></i>
                        Excluir conta
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Perfil;