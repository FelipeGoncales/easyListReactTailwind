import { useEffect, useState } from 'react';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { v4 } from "uuid";
import { useNavigate, useSearchParams } from 'react-router-dom';

const url = "https://easylistapi.onrender.com";

function App() {

  // Chama o navigate fora da função
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch(`${url}/task`)
      .then((res) => res.json())
      .then((data) =>
        setTasks(data.tasks)
      )
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
      .then((res) => res.JSON)
      .then((data) => {
        
        setTasks(newTasks);

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
  function onSeeDetailsClick(title, desc) {

    // Cria a query
    const query = new URLSearchParams()

    // Adiciona os objetos a query
    query.set('title', title);
    query.set('desc', desc);

    // Envia o usuário para outra página
    navigate(`/task?${query.toString()}`)

  }

  return (
    <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
      <div className='flex flex-col gap-6 justify-center items-center w-[480px]'>

        <div className='flex gap-2 items-center justify-center'>
          <i className="fa-solid fa-paperclip text-slate-700 text-3xl"></i>
          <h1 className='text-slate-700 text-3xl font-bold'>EasyList</h1>
        </div>

        <AddTask onAddTaskClick={onAddTaskClick} />

        <Tasks tasks={tasks} onDeleteTaskClick={onDeleteTaskClick} onTaskClick={onTaskClick} onSeeDetailsClick={onSeeDetailsClick} />

      </div>
    </div>
  )
}

export default App;