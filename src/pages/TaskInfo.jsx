import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function TaskInfo() {
    
    const navigate = useNavigate();
    
    // Função para retornar para home
    function returnHome() {
        navigate('/');
    }
    
    // Obtém os parâmetros da URL
    const [ searchParams ] = useSearchParams();
    const title = searchParams.get('title');
    const desc = searchParams.get('desc');

    // Caso os parâmetros estejam vazios, retorna para a página principal
    useEffect(() => {
        if (!title || !title.trim() || !desc || !desc.trim()) {
            returnHome();
        }
    }, [title, desc, returnHome()])

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className='flex flex-col gap-6 justify-center items-center w-[480px]'>
                <div className="flex w-full items-center justify-center relative">
                    {/* Botão para voltar para home */}
                    <i 
                        className="fa-solid fa-chevron-left absolute left-0 top-1/2 transform -translate-y-1/2 text-slate-900 p-[10px] text-xl cursor-pointer"
                        onClick={() => returnHome()}
                    >
                    </i>
                    <h1 className="text-slate-700 text-3xl font-bold">Mais detalhes</h1>
                </div>

                <div className="w-full bg-slate-400 p-5 rounded-md flex flex-col gap-3 justify-center align-top shadow-[0_0_12px_rgba(0,0,0,0.15)]">
                    <p className="text-[18px] text-slate-700 font-semibold">{title}</p>
                    <p className="p-3 rounded-sm bg-slate-300 text-slate-900">{desc}</p>
                </div>
            </div>
        </div>
    )
}

export default TaskInfo;