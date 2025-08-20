function AlertMessage(props) {
    return (
        <div className="fixed left-1/2 transform -translate-x-1/2 bottom-[30px] flex items-center justify-center w-full">
            <div 
            className={`flex items-center justify-center p-3 rounded-md gap-3 shadow-md max-w-[350px] msg
                ${props.msg.type === "error" ? "bg-red-400 text-red-800" : "bg-green-400 text-green-800"}`}
            >
                <i className={`fa-solid ${props.msg.type === "error" ? "fa-xmark" : "fa-check"} text-[15px]`} />
                <p className="text-[14px]/[1.1rem] font-semibold">{props.msg.text}</p>
            </div>
        </div>
    )
}

export default AlertMessage;