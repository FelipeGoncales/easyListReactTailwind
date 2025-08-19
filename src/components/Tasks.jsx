function Tasks(props) {

    function addTask(props, task) {
        return (
                <div key={task.id} className="flex justify-center items-center gap-2 sm:h-14 h-10">
                    <button 
                        className={`bg-slate-300 rounded-md sm:p-3 p-2 text-slate-900 w-full text-left cursor-pointer h-full sm:text-[16px] text-[14px] ${task.isCompleted ? 'line-through' : ""}`}
                        onClick={() => props.onTaskClick(task.id)}
                    >
                        {task.titulo}
                    </button>

                    <button 
                        className="text-xl bg-slate-300 p-5 rounded-md text-slate-900 cursor-pointer h-full items-center justify-center sm:flex hidden"
                        onClick={() => props.onDeleteTaskClick(task.id)}
                    >
                        <i className="fa-regular fa-trash-can"></i>
                    </button>

                    <button 
                        className="text-xl bg-slate-300 sm:p-5 p-4 rounded-md text-slate-900 cursor-pointer h-full flex items-center justify-center"
                        onClick={() => props.onSeeDetailsClick(task.id)}
                    >
                        <i className="fa-solid fa-chevron-right sm:text-xl text-[15px]"></i>
                    </button>
                </div>
            )
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex w-full justify-center items-start sm:max-h-[235px] max-h-[175px] overflow-auto shadow-[0_0_12px_rgba(0,0,0,0.15)] rounded-2xl">
                <div className="sm:p-6 p-4 bg-slate-400 flex flex-col gap-2 w-full">

                    <p className="sm:text-[18px] text-[16px] text-slate-700 font-semibold">Tarefas pendentes</p>

                    {props.tasks.map((task) => {
                        if (!task.isCompleted) {
                            return addTask(props, task);
                        }
                    })}

                </div>
            </div>

            <div className="flex w-full justify-center items-start sm:max-h-[235px] max-h-[175px] overflow-auto shadow-[0_0_12px_rgba(0,0,0,0.15)] rounded-2xl">
                <div className="sm:p-6 p-4 bg-slate-400 flex flex-col gap-2 w-full">

                    <p className="sm:text-[18px] text-[16px] text-slate-700 font-semibold">Tarefas concluídas</p>

                    {props.tasks.map((task) => {
                        if (task.isCompleted) {
                            return addTask(props, task);
                        }
                    })}

                </div>
            </div>
        </div>
    )
}

export default Tasks;