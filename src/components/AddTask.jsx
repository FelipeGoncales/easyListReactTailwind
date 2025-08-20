import { useState } from "react";

function AddTask(props) {

    // Variável para facilitar alteração no código
    const titleMaxLength = 30;

    // Variáveis de input
    const [title, setTitle] = useState("");
    const [titleLenght, setTitleLenght] = useState(0);
    const [desc, setDesc] = useState("");
    const [data, setData] = useState(() => {
        // Obtém o objeto date
        const date = new Date();

        // Obtém o dia, mês e ano
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const ano = date.getFullYear();

        // Retorna em formato "yyyy-mm-dd"
        return `${ano}-${mes < 10 ? `0${mes}` : mes}-${dia}`;
    })

    // Função de input title change
    function onInputTitleChange(value) {
        // Obtém o comprimento do title
        setTitleLenght(value.length);
        setTitle(value);
    }

    return (
        <div className="sm:p-6 p-4 bg-slate-400 rounded-2xl flex flex-col gap-3 w-full shadow-[0_0_12px_rgba(0,0,0,0.15)]">

            <div className="flex w-full h-full relative">
                <input
                    type="text"
                    placeholder="Título da tarefa"
                    className="bg-slate-300 p-2 w-full outline-0 rounded-md sm:text-[16px] text-[13px]"
                    value={title}
                    maxLength={titleMaxLength}
                    onChange={(e) => onInputTitleChange(e.target.value)}
                />

                <p className={`absolute right-2 top-1/2 transform -translate-y-1/2 font-semibold text-[14px] ${titleLenght == titleMaxLength ? "text-red-700" : "text-slate-500"} `}>{titleLenght}/{titleMaxLength}</p>
            </div>

            <input
                type="text"
                placeholder="Descrição da tarefa"
                className="bg-slate-300 p-2 w-full outline-0 rounded-md sm:text-[16px] text-[13px]"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />

            <input
                type="date"
                placeholder="Data"
                className="bg-slate-300 p-2 outline-0 rounded-md sm:text-[16px] text-[13px]"
                value={data}
                onChange={(e) => setData(e.target.value)}
            />

            <button
                className="w-full p-2 text-slate-50 bg-slate-700 font-semibold rounded-md cursor-pointer hover:bg-slate-600 sm:text-[16px] text-[13px]"
                onClick={() => {
                    // Retorna caso os inputs estejam vazios
                    if (!title.trim() || !desc.trim() || !data.trim()) {
                        props.showMessage("Dados incompletos", "error");
                        return;
                    }

                    props.onAddTaskClick(title, desc, data);

                    // Limpa os inputs
                    setTitle("");
                    setDesc("");
                    setTitleLenght(0);
                }}
            >
                Adicionar tarefa
            </button>

        </div>
    )
}

export default AddTask;