import { useState } from 'react';
import InputPassword from '../universais/InputPassword';

function FormPerfil(props) {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPasswordAtual, setShowPasswordAtual] = useState(false);

    return (
        <form
            className="!bg-slate-400 flex flex-col gap-4 items-start justify-center p-6 rounded-2xl w-full"
            onSubmit={(e) => props.onFormSubmit(e)}
        >
            <h1 className="subtitle self-center">Informações pessoais</h1>

            <div className="flex flex-col w-full items-start justify-center gap-1">
                <p className="label">Nome*</p>
                <input 
                    className="inputForm"    
                    placeholder="Nome*"
                    value={props.nome}
                    onChange={(e) => props.setNome(e.target.value)}
                />
            </div>

            <div className="flex flex-col w-full items-start justify-center gap-1">
                <p className="label">Email*</p>
                <input 
                    className="inputForm"    
                    placeholder="Email*"
                    value={props.email}
                    onChange={(e) => props.setEmail(e.target.value)}
                />
            </div>

            <div className="flex flex-col w-full items-start justify-center gap-1">
                <p className="label">Senha atual*</p>
                <InputPassword 
                    placeholder={"Senha*"} 
                    showPassword={showPasswordAtual} 
                    setShowPassword={setShowPasswordAtual} 
                    senha={props.senhaAtual} 
                    setSenha={props.setSenhaAtual} 
                />
            </div>

            <div className="flex flex-col w-full items-start justify-center gap-1">
                <p className="label">Nova senha*</p>
                <InputPassword 
                    placeholder={"Nova senha*"} 
                    showPassword={showPassword} 
                    setShowPassword={setShowPassword} 
                    senha={props.senhaNova} 
                    setSenha={props.setSenhaNova} 
                />
            </div>

            <div className="flex flex-col w-full items-start justify-center gap-1">
                <p className="label">Confirmar nova senha*</p>
                <InputPassword  
                    placeholder={"Confirmar nova senha*"} 
                    showPassword={showConfirmPassword} 
                    setShowPassword={setShowConfirmPassword} 
                    senha={props.confirmSenha} 
                    setSenha={props.setConfirmSenha} 
                />
            </div>

            <button
                className="buttonConfirm"
            >
                Salvar alterações
            </button>

        </form>
    )
}

export default FormPerfil;