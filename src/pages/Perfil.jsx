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

                <button
                    className="bg-[#ff4652] p-[8px] rounded-xl text-red-800 flex items-center justify-center gap-1 text-[15px] cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.15)]"
                    onClick={() => setConfirmDelete(true)}
                >
                    <i className="fa-solid fa-trash-can"></i>
                    Excluir conta
                </button>
            </div>

        </div>
    )
}

export default Perfil;