function InfoUser(props) {
    return (
        <div className='sm:mt-2 mt-0 flex gap-3 justify-between items-center w-full'>

          <div className='mt-2 flex gap-3 justify-center items-center'>
            <i className='fa-regular fa-circle-user sm:text-6xl text-5xl text-slate-900'></i>
          
            <div className='flex flex-col justify-center items-start -gap-1'>

                <p className='text-slate-900 font-semibold sm:text-[18px] text-[15px]'>{props.nome}</p>

                <p className='text-slate-900 sm:text-[14px] text-[12px]'>{props.email}</p>

            </div>
          </div>

            <button 
                className='mt-1.5 cursor-pointer flex gap-1 items-center justify-center bg-slate-700 sm:p-[5px_9px] p-[4px_7px] rounded-md text-slate-50 font-semibold sm:text-[13px] text-[11px]'
                onClick={props.onSairClick}
            >
                <i className='fa-solid fa-right-from-bracket !sm:text-[16px] sm:pt-[0px] pt-[2px]'></i>
                Sair
            </button>

        </div>
    )
}

export default InfoUser;