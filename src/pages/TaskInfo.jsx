import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

// URL da API
const url = "https://easylistapi.onrender.com";

function TaskInfo() {
  // Navigate
  const navigate = useNavigate();

  // Loading
  const [loading, setLoading] = useState(true);

  // confirmDelete
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Editar
  const [editOn, setEditOn] = useState(false);

  // Obtém os parâmetros da URL
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // Caso os parâmetros estejam vazios, retorna para a página principal
  useEffect(() => {
    if (!id) {
      navigate("/");
    }

    fetch(`${url}/task/${id}`)
      // Verifica se a resposta é bem sucedida
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          // Retorna para home
          navigate("/");
        }
      })
      // Processa o JSON
      .then((data) => {
        // Obtém a task
        const task = data.task;

        // Atualiza os valores das variáveis
        setTitle(task.titulo);
        setDesc(task.descricao);
        setIsCompleted(task.isCompleted);

        // Tira o loading
        setLoading(false);
      })
      // Caso ocorra algum erro, retorna para home
      .catch(() => {
        navigate("/");
      });
  }, [id, navigate]);

  // Função togle para alterar isCompleted da task
  function onIsCompletedClick(taskId) {
    // Obtém o inverso do isCompleted
    const newIsCompleted = !isCompleted;

    const integerIsCompleted = isCompleted == true ? 0 : 1;

    setIsCompleted(integerIsCompleted);

    fetch(`${url}/task`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_task: taskId,
        isCompleted: newIsCompleted,
      }),
    }).catch((err) => console.log(err));
  }

  // Função para abrir o modal
  function onDeleteTaskClick() {
    setConfirmDelete(true);
  }

  // Função para deletar uma task
  function deleteTask(taskId) {

    // Atualizando no front
    setConfirmDelete(false);
    setLoading(true);

    return fetch(`${url}/task`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_task: taskId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          navigate('/')
        } else {
          console.log(res.status);
        }
      })
      .catch((err) => console.log(err));
  }

  // Função para salvar as alterações
  function onSaveChangesClick() {
    setEditOn(false);

    return fetch(`${url}/task`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_task: id,
        titulo: title,
        descricao: desc
      })
    })
      .catch((err) => console.log(err))
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      {loading ? (
        <div className="flex items-center justify-center absolute top-0 left-0 bg-gray-200 w-full h-full z-[2]">
          <ClipLoader size={30} margin={3} speedMultiplier={1.1} />
        </div>
      ) : null}

      {
        confirmDelete ? (
          <div className='absolute left-0 top-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.6)]'>
            <div className='sm:w-[250px] w-[90%] flex flex-col justify-center items-center bg-gray-200 sm:p-6 p-4 rounded-2xl gap-3'>
              <p className='text-slate-700 sm:text-2xl text-xl font-bold duration-500'>Deletar tarefa?</p>
              <button
                className='bg-green-400 w-full p-[6px] rounded-md text-green-900 font-semibold cursor-pointer text-[15px] shadow-[0_0_20px_rgba(0,0,0,0.2)]'
                onClick={() => deleteTask(id)}
              >
                Confirmar
              </button>

              <button
                className='bg-red-400 w-full p-[6px] rounded-md text-red-900 font-semibold cursor-pointer text-[15px] shadow-[0_0_20px_rgba(0,0,0,0.2)]'
                onClick={() => setConfirmDelete(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : null
      }

      <div className="flex flex-col gap-6 justify-center items-center sm:w-[480px] w-[90%]">
        <div className="flex w-full items-center justify-center relative">
          {/* Botão para voltar para home */}
          <i
            className="fa-solid fa-chevron-left absolute left-0 top-1/2 transform -translate-y-1/2 text-slate-900 p-[10px] text-xl cursor-pointer"
            onClick={() => navigate("/")}
          ></i>
          <h1 className="text-slate-700 sm:text-3xl text-2xl font-bold">
            Mais detalhes
          </h1>
        </div>

        <div className="w-full bg-slate-400 sm:p-6 p-4 rounded-md flex flex-col gap-4 justify-center align-top shadow-[0_0_12px_rgba(0,0,0,0.15)]">
          <div className="w-full flex justify-between items-center gap-2">

            {
              !editOn ? (
                <p className="sm:text-[18px] text-[17px] text-slate-700 font-semibold truncate">
                  {title}
                </p>
              ) : (
                <div className="w-[70%] relative">
                  <i className="fa-solid fa-pencil absolute left-0 top-1/2 transform -translate-y-1/2 text-slate-600 text-sm"></i>
                  <input
                    type="text"
                    className="sm:text-[18px] text-[17px] pl-[22px] text-slate-700 font-semibold outline-0 w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              )
            }

            {parseInt(isCompleted) === 1 ? (
              <button
                className="flex gap-1 items-center justify-center bg-teal-400 p-[3px_7px] rounded-sm cursor-pointer"
                onClick={() => onIsCompletedClick(id)}
              >
                <i className="fa-solid fa-circle-check text-slate-900 flex items-center sm:text-[14px] text-[11px]"></i>
                <p className="text-slate-900 sm:text-[14px] text-[11px]">
                  Concluída
                </p>
              </button>
            ) : (
              <button
                className="flex gap-1 items-center justify-center bg-amber-500 p-[3px_7px] rounded-sm cursor-pointer"
                onClick={() => onIsCompletedClick(id)}
              >
                <i className="fa-solid fa-hourglass text-slate-900 flex items-center sm:text-[14px] text-[11px]"></i>
                <p className="text-slate-900 sm:text-[14px] text-[11px]">
                  Pendente
                </p>
              </button>
            )}
          </div>

          {
            !editOn ? (
              <p className="p-3 rounded-sm bg-slate-300 text-slate-900 sm:text-[15px] text-[14px] overflow-hidden">
                {desc}
              </p>
            ) : (
              <div className="w-full relative overflow-hidden">
                <i className="fa-solid fa-pencil absolute left-[10px] top-1/2 transform -translate-y-1/2 text-slate-600 text-sm overflow-hidden"></i>
                <textarea
                  type="text"
                  className="p-3 pl-[33px] rounded-sm bg-slate-300 text-slate-900 sm:text-[15px] text-[14px] outline-0 w-full h-20"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
            )
          }


          <div className="flex w-full gap-2">
            {
              editOn ? (
                <button
                  className="w-full p-2 text-slate-50 bg-slate-700 font-semibold rounded-md cursor-pointer hover:bg-slate-600 sm:text-[16px] text-[13px] flex gap-1 items-center justify-center"
                  onClick={onSaveChangesClick}
                >
                  <i className="fa-solid fa-floppy-disk"></i>
                  Salvar
                </button>
              ) : (
                <button
                  className="w-full p-2 text-slate-50 bg-slate-700 font-semibold rounded-md cursor-pointer hover:bg-slate-600 sm:text-[16px] text-[13px] flex gap-1 items-center justify-center"
                  onClick={() => setEditOn(true)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  Editar
                </button>
              )
            }

            <button className="w-full p-2 text-slate-50 bg-slate-700 font-semibold rounded-md cursor-pointer hover:bg-slate-600 sm:text-[16px] text-[13px] flex gap-1 items-center justify-center" onClick={() => onDeleteTaskClick()}>
              <i className="fa-regular fa-trash-can"></i>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskInfo;
