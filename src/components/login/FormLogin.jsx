import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputPassword from "../universais/InputPassword";

function FormLogin(props) {

    // Declarando variável de navegação
    const navigate = useNavigate();

    // Variável para controle de mostrar senha
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form
            className="form" 
            onSubmit={(e) => props.onFormSubmit(e)}
        >
            <h1 className="subtitle">Faça login</h1>

            <input 
                className="inputForm"
                type="email" 
                placeholder="E-mail*" 
                required
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
            />

            <InputPassword placeholder={"Senha*"} senha={props.senha} setSenha={props.setSenha} showPassword={showPassword} setShowPassword={setShowPassword} inputRequired={true} />

            <div className="w-full flex flex-col items-center justify-center gap-3">
                <button 
                    type="submit"
                    className={`buttonConfirm ${props.loading ? '!bg-slate-600' : ''}`}
                    disabled={props.loading}
                >
                    {props.loading ? 'Processando...' : 'Entrar'}
                </button>

                <p className="sm:text-[15px] text-[13px] text-slate-700">
                    Não possui uma conta? <span className="text-slate-900 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/cadastro')}>Cadastre-se</span>
                </p>
            </div>
            
        </form>
    )
}

export default FormLogin;