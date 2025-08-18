import { useEffect, useState } from 'react';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

// URL da API
const url = "https://easylistapi.onrender.com";

function App() {

  // Chama o navigate fora da função
  const navigate = useNavigate()

  // Loading
  const [loading, setLoading] = useState(true);

  // confirmDelete
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [taskId, setTaskId] = useState(0);

  // Tasks
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch(`${url}/task`)
      .then((res) => res.json())
      .then((data) => {
        return setTasks(data.tasks), setLoading(false);
      })
      .catch((err) => console.log(err))
  }, [])

  // Função para adicionar nova tarefa
  function onAddTaskClick(title, desc) {

    const newTask = {
      titulo: title,
      descricao: desc,
      isCompleted: false
    };

    setTasks([...tasks, newTask]);

    return fetch(`${url}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks((prev) => [...prev.filter(t => t !== newTask), data.newTask]);
      })
      .catch((err) => console.log(err))
  }

  // Função para abrir o modal
  function onDeleteTaskClick(taskId) {
    setTaskId(taskId);
    setConfirmDelete(true);
  }

  // Função para deletar uma task
  function deleteTask(taskId) {
    // Obtém as novas tasks
    const newTasks = tasks.filter((task) => task.id != taskId)
    
    // Atualiza o front
    setTasks(newTasks);
    setConfirmDelete(false);

    return fetch(`${url}/task`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_task: taskId
      })
    })
      .catch((err) => console.log(err))
  }

  // Função togle para alterar isCompleted da task
  function onTaskClick(taskId) {

    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    )

    const updatedTask = newTasks.find((task) => task.id === taskId);

    fetch(`${url}/task`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_task: taskId,
        isCompleted: updatedTask.isCompleted
      })
    })
      .catch((err) => console.log(err))

    setTasks(newTasks);

  }

  // Função para navegar para a página de ver detalhes
  function onSeeDetailsClick(id) {

    // Cria a query
    const query = new URLSearchParams()

    // Adiciona os objetos a query
    query.set('id', id);

    // Envia o usuário para outra página
    navigate(`/task?${query.toString()}`)

  }

  return (
    <div className='min-h-screen w-full bg-gray-200 flex justify-center items-center p-[80px_0]'>

      {
        loading ? (
          <div className='flex items-center justify-center absolute top-0 left-0 bg-gray-200 w-full h-full'>
            <ClipLoader size={30} margin={3} speedMultiplier={1.1} />
          </div>
        ) : null
      }

      {
        confirmDelete ? (
          <div className='absolute left-0 top-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.6)]'>
            <div className='sm:w-[250px] w-[90%] flex flex-col justify-center items-center bg-gray-200 sm:p-6 p-4 rounded-2xl gap-3'>
              <p className='text-slate-700 sm:text-2xl text-xl font-bold duration-500'>Deletar tarefa?</p>
              <button
                className='bg-green-400 w-full p-[6px] rounded-md text-green-900 font-semibold cursor-pointer text-[15px] shadow-[0_0_20px_rgba(0,0,0,0.2)]'
                onClick={() => deleteTask(taskId)}
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

      <div className='flex flex-col gap-6 justify-center items-center sm:w-[480px] w-[90%]'>

        <div className='flex gap-2 items-center justify-center'>
          <i className="fa-solid fa-paperclip text-slate-700 sm:text-3xl text-2xl"></i>
          <h1 className='text-slate-700 sm:text-3xl text-2xl font-bold'>EasyList</h1>
        </div>

        <AddTask onAddTaskClick={onAddTaskClick} />

        <Tasks tasks={tasks} onDeleteTaskClick={onDeleteTaskClick} onTaskClick={onTaskClick} onSeeDetailsClick={onSeeDetailsClick} />

      </div>
    </div>
  )
}

export default App;