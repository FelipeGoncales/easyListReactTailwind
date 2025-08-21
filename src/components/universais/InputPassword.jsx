function InputPassword(props) {
    return (
        <div className="flex w-full relative">
            <input
                className="inputForm" 
                type={props.showPassword ? "text" : "password"} 
                placeholder={props.placeholder} 
                required={props.inputRequired}
                value={props.senha}
                onChange={(e) => props.setSenha(e.target.value)}
            />

            <i 
                className={`fa-solid ${props.showPassword ? "fa-eye-slash" : "fa-eye"} absolute top-1/2 transform -translate-y-1/2 right-0 text-slate-600 cursor-pointer p-2`}
                onClick={() => props.setShowPassword(!props.showPassword)}
            ></i>
        </div>
    )
}

export default InputPassword;