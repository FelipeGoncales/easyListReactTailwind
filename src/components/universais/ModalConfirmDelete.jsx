function ModalConfirmDelete(props) {
    return (
        <div className='fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.6)] z-10'>
            <div className='sm:w-[250px] w-[90%] flex flex-col justify-center items-center bg-gray-200 sm:p-6 p-4 rounded-2xl gap-3'>
                <p className='subtitle'>{props.title}</p>
                <button
                    className='bg-green-400 w-full p-[6px] rounded-md text-green-900 font-semibold cursor-pointer text-[15px] shadow-[0_0_20px_rgba(0,0,0,0.2)]'
                    onClick={() => props.action(props.id ? props.id : null)}
                >
                    Confirmar
                </button>

                <button
                    className='bg-red-400 w-full p-[6px] rounded-md text-red-900 font-semibold cursor-pointer text-[15px] shadow-[0_0_20px_rgba(0,0,0,0.2)]'
                    onClick={() => props.setConfirm(false)}
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}

export default ModalConfirmDelete;