function FormLogin(props) {

    return (
        <form
            className="flex flex-col p-6 rounded-2xl bg-slate-400 items-center justify-center gap-6 w-[90%] max-w-[320px]" 
            onSubmit={() => props.onFormSubmit()}
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
            
            <button 
                type="submit"
                className="buttonConfirm"
            >
                Entrar
            </button>
        </form>
    )
}

export default FormLogin;