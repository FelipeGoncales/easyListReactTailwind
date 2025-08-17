import { useState } from "react";

function AddTask(props) {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    return (
        <div className="p-6 bg-slate-400 rounded-2xl flex flex-col gap-3 w-full shadow-[0_0_12px_rgba(0,0,0,0.15)]">

            <input 
                type="text" 
                placeholder="Título da tarefa"
                className="bg-slate-50 p-2 outline-0 rounded-md"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
            />

            <input 
                type="text" 
                placeholder="Descrição da tarefa"
                className="bg-slate-50 p-2 outline-0 rounded-md"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />

            <button 
                className="w-full p-2 text-slate-50 bg-slate-700 font-semibold rounded-md cursor-pointer hover:bg-slate-600"
                onClick={() => {
                    // Retorna caso os inputs estejam vazios
                    if (!title.trim() || !desc.trim()) {
                        alert("Dados incompletos!");
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