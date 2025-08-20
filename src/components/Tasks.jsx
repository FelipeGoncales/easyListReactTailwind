import { useState } from "react";
import formatarData from "./formatarData";

function Tasks(props) {

    // Variáveis de controle do dropdown de tarefas pendentes e concluídas
    const [pendentesOn, setPendentesOn] = useState(true);
    const [concluidasOn, setConcluidasOn] = useState(false);

    // Função para adicionar o componente task
    function addTask(props, task) {
        return (
            <div key={task.id} className="flex justify-center items-center gap-2 sm:h-14 h-10">
                <div className="flex w-full h-full min-w-0 items-center justify-between bg-slate-300 rounded-md sm:p-3 p-2">

                    <button
                        className={`text-slate-900 w-full text-left cursor-pointer h-full sm:text-[16px] text-[14px] truncate ${task.isCompleted && "line-through"}`}
                        onClick={() => props.onTaskClick(task.id)}
                    >
                        {task.titulo}
                    </button>

                    <p className={`font-semibold text-[13px] ${!task.isCompleted && new Date() > new Date(task.data) ? "text-red-800" : "text-slate-500"}`}>{formatarData(task.data)}</p>
                </div>

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

                    <div className="flex w-full justify-between items-center cursor-pointer" onClick={() => setPendentesOn(!pendentesOn)}>
                        <p className="sm:text-[18px] text-[16px] text-slate-700 font-semibold">Tarefas pendentes</p>
                        <i className={`fa-solid ${pendentesOn ? "fa-chevron-down" : "fa-chevron-right"} sm:text-[18px] text-[16px] text-slate-700 font-semibold`}></i>
                    </div>

                    {
                        pendentesOn ?
                            (
                                props.tasks.map((task) => {
                                    if (!task.isCompleted) {
                                        return addTask(props, task);
                                    }
                                })
                            ) : null
                    }

                </div>
            </div>

            <div className="flex w-full justify-center items-start sm:max-h-[235px] max-h-[175px] overflow-auto shadow-[0_0_12px_rgba(0,0,0,0.15)] rounded-2xl">
                <div className="sm:p-6 p-4 bg-slate-400 flex flex-col gap-2 w-full">

                    <div className="flex w-full justify-between items-center cursor-pointer" onClick={() => setConcluidasOn(!concluidasOn)}>
                        <p className="sm:text-[18px] text-[16px] text-slate-700 font-semibold">Tarefas concluídas</p>
                        <i className={`fa-solid ${concluidasOn ? "fa-chevron-down" : "fa-chevron-right"} sm:text-[18px] text-[16px] text-slate-700 font-semibold`}></i>
                    </div>

                    {
                        concluidasOn ?
                            (
                                props.tasks.map((task) => {
                                    if (task.isCompleted) {
                                        return addTask(props, task);
                                    }
                                })
                            ) : null
                    }



                </div>
            </div>
        </div>
    )
}

export default Tasks;