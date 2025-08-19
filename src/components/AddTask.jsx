import { useState } from "react";

function AddTask(props) {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    return (
        <div className="sm:p-6 p-4 bg-slate-400 rounded-2xl flex flex-col gap-3 w-full shadow-[0_0_12px_rgba(0,0,0,0.15)]">

            <input 
                type="text" 
                placeholder="Título da tarefa"
                className="bg-slate-50 p-2 outline-0 rounded-md sm:text-[16px] text-[13px]"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
            />

            <input 
                type="text" 
                placeholder="Descrição da tarefa"
                className="bg-slate-50 p-2 outline-0 rounded-md sm:text-[16px] text-[13px]"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />

            <button 
                className="w-full p-2 text-slate-50 bg-slate-700 font-semibold rounded-md cursor-pointer hover:bg-slate-600 sm:text-[16px] text-[13px]"
                onClick={() => {
                    // Retorna caso os inputs estejam vazios
                    if (!title.trim() || !desc.trim()) {
                        props.showMessage("Dados incompletos", "error");
                        return;
                    }

                    props.onAddTaskClick(title, desc);

                    // Limpa os inputs
                    setTitle("");
                    setDesc("");
                }}
            >
                Adicionar tarefa
            </button>

        </div>
    )
}

export default AddTask;