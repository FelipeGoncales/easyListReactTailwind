function Tasks(props) {

    function addTask(props, task) {
        return (
                <div key={task.id} className="flex justify-center items-center gap-2 h-14">
                    <button 
                        className={`bg-slate-300 rounded-md p-3 text-slate-900 w-full text-left cursor-pointer h-full ${task.isCompleted ? 'line-through' : ""}`}
                        onClick={() => props.onTaskClick(task.id)}
                    >
                        {task.titulo}
                    </button>

                    <button 
                        className="text-xl bg-slate-300 p-5 rounded-md text-slate-900 cursor-pointer h-full flex items-center justify-center"
                        onClick={() => props.onDeleteTaskClick(task.id)}
                    >
                        <i className="fa-regular fa-trash-can"></i>
                    </button>

                    <button 
                        className="text-xl bg-slate-300 p-5 rounded-md text-slate-900 cursor-pointer h-full flex items-center justify-center"
                        onClick={() => props.onSeeDetailsClick(task.id)}
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            )
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="p-6 bg-slate-400 rounded-2xl flex flex-col gap-3 w-full shadow-[0_0_12px_rgba(0,0,0,0.15)]">

                <p className="text-[18px] text-slate-700 font-semibold">Tarefas pendentes</p>

                {props.tasks.map((task) => {
                    if (!task.isCompleted) {
                        return addTask(props, task);
                    }
                })}

            </div>

            
            <div className="p-6 bg-slate-400 rounded-2xl flex flex-col gap-3 w-full shadow-[0_0_12px_rgba(0,0,0,0.15)]">

                <p className="text-[18px] text-slate-700 font-semibold">Tarefas concluídas</p>

                {props.tasks.map((task) => {
                    if (task.isCompleted) {
                        return addTask(props, task);
                    }
                })}

            </div>
        </div>
    )
}

export default Tasks;