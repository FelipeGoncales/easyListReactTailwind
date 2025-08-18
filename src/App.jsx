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

    let newTask = {};

    return fetch(`${url}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo: title,
        descricao: desc,
        isCompleted: false
      })
    })
      .then((res) => res.json())
      .then((data) => {
        newTask = data.newTask;

        setTasks([...tasks, newTask])
      })
      .catch((err) => console.log(err))
  }

  // Função para deletar uma task
  function onDeleteTaskClick(taskId) {

    const newTasks = tasks.filter((task) => task.id != taskId)

    return fetch(`${url}/task`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_task: taskId
      })
    })
      .then((res) => {
        if (res.ok) {
          setTasks(newTasks);
        } else {
          console.log(res.status);
        }
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

      {loading ? (
        <div className='flex items-center justify-center absolute top-0 left-0 bg-gray-200 w-full h-full'>
          <ClipLoader size={30} margin={3} speedMultiplier={1.1}/>
        </div>
      ) : null}

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