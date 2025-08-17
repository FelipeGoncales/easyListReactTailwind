import { useState } from 'react';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { v4 } from "uuid";
import { useNavigate, useSearchParams } from 'react-router-dom';

function App() {

  // Chama o navigate fora da função
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([
    {
      id: 12,
      title: "Ir para a escola",
      desc: "Acordar as 6h da manhã para ir para a escola de bicicleta",
      isCompleted: false
    },
    {
      id: 233232,
      title: "Estudar programação",
      desc: "Estudar para melhorar minhas habilidades com React",
      isCompleted: false
    }
  ])

  // Função para adicionar nova tarefa
  function onAddTaskClick(title, desc) {

    // Cria o novo objeto task
    const newTask = {
      id: v4(),
      title: title,
      desc: desc,
      isCompleted: false
    }

    return setTasks([...tasks, newTask])
  }

  // Função para deletar uma task
  function onDeleteTaskClick(taskId) {

    const newTasks = tasks.filter((task) => task.id != taskId)

    setTasks(newTasks);

  }

  // Função togle para alterar isCompleted da task
  function onTaskClick(taskId) {

    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    )

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

        <AddTask onAddTaskClick={onAddTaskClick}/>

        <Tasks tasks={tasks} onDeleteTaskClick={onDeleteTaskClick} onTaskClick={onTaskClick} onSeeDetailsClick={onSeeDetailsClick} />

      </div>
    </div>
  )
}

export default App;