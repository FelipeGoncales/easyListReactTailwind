import { useNavigate } from "react-router-dom";

function FormLogin(props) {

    const navigate = useNavigate();

    return (
        <form
            className="flex flex-col p-6 rounded-2xl bg-slate-400 items-center justify-center gap-6 w-[90%] max-w-[350px]" 
            onSubmit={(e) => props.onFormSubmit(e)}
        >
            <h1 className="subtitle">Faça login</h1>

            <input 
                className="inputForm"
                type="text" 
                placeholder="E-mail*" 
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
            />

            <input
                className="inputForm" 
                type="password" 
                placeholder="Senha*" 
                value={props.senha}
                onChange={(e) => props.setSenha(e.target.value)}
            />

            <div className="w-full flex flex-col items-center justify-center gap-3">
                <button 
                    type="submit"
                    className="buttonConfirm"
                >
                    Entrar
                </button>

                <p className="text-[15px] text-slate-700">
                    Não possui uma conta? <span className="text-slate-900 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/cadastro')}>Cadastre-se</span>
                </p>
            </div>
            
        </form>
    )
}

export default FormLogin;