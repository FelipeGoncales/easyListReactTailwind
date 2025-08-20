function FormValidarCadastro(props) {
    return (
        <form 
            onSubmit={(e) => props.onFormSubmit(e)}
            className="form"
        >

            <h1 className="subtitle">Código enviado!</h1>

            <i className="fa-solid fa-envelope text-slate-500 text-7xl"></i>

            <p className="text-slate-900 text-center text-[14px]">Código de verificação enviado para <span className="font-semibold">{props.email}</span></p>

            <div className="flex w-full relative">
                <input 
                    type="text"
                    value={props.codigo}
                    placeholder="Código*"
                    onChange={(e) => props.inputCodigoChange(e.target.value)} 
                    className="inputForm"
                    maxLength={6}
                />

                <p className={`absolute right-2 top-1/2 transform -translate-y-1/2 font-semibold text-[14px] ${props.codigoLength < 6 ? "text-red-700" : "text-slate-500"} `}>{props.codigoLength}/6</p>
            </div>

            <div className="flex w-full flex-col gap-2 items-center justify-center">
                <button
                    type="submit"
                    className={`buttonConfirm ${props.loading ? '!bg-slate-600' : ''}`}
                    disabled={props.loading}
                >
                    {props.loading ? 'Processando...' : 'Confirmar'}
                </button>

                <p className="sm:text-[14px] text-[12px] text-slate-900 font-semibold cursor-pointer hover:underline" onClick={() => props.onReenviarCodigoClick()}>Reenviar código</p>
            </div>

        </form>
    )
}

export default FormValidarCadastro;