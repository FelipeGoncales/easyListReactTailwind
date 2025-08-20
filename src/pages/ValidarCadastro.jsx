import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import createQuery from "../components/createQuery";

// URL da API
const url = "https://easylistapi.onrender.com";

function ValidarCadastro() {

    // Criando os hooks
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Variáveis state de email e código
    const [email, setEmail] = useState("");
    const [codigo, setCodigo] = useState("");

    // Atualiza o valor da variável email
    useEffect(() => {
        const emailArg = searchParams.get("email");

        setEmail(emailArg);
    }, [])

    // Valida o campo input, permitindo apenas números
    function inputCodigoChange(codigoInput) {
        const listaCodigo = codigoInput.split('');

        const novaListaCodigo = listaCodigo.filter((a) => [0,1,2,3,4,5,6,7,8,9].includes(parseInt(a)))

        const codigoFormatado = novaListaCodigo.join('');

        setCodigo(codigoFormatado)
    }

    // Envio do formulário
    function onFormSubmit(e) {
        // Previnir evento padrão
        e.preventDefault();

        if (codigo.length < 6) {
            // Show message error
            return alert("Código inválido")
        }

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

                    // Show message error
                    if (data.error) {
                        return alert(data.error)
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

    return (
        <div className='min-h-screen w-full bg-gray-200 flex flex-col gap-10 justify-center items-center p-[80px_0]'>
            
            <form 
                onSubmit={(e) => onFormSubmit(e)}
                className="flex flex-col gap-3 items-center justify-center"
            >

                <p>Email enviado para {email}</p>

                <input 
                    type="text"
                    value={codigo}
                    onChange={(e) => inputCodigoChange(e.target.value)} 
                    className="bg-slate-300 p-2 outline-0"
                    maxLength={6}
                />

                <button
                    type="submit"
                >
                    Confirmar
                </button>

            </form>

        </div>
    )
}

export default ValidarCadastro;