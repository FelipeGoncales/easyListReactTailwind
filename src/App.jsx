import { useEffect, useState } from 'react';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Logo from './components/Logo'
import ModalConfirmDelete from './components/ModalConfirmDelete';
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

  // Envia para login caso não tenha token salvo
  useEffect(() => {
    const token = getToken();

    if (!token) {
      return navigate('/login');
    }
  }, [navigate])

  // Busca as tasks
  useEffect(() => {
    fetch(`${url}/task`, {
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        return setTasks(data.tasks), setLoading(false);
      })
      .catch((err) => console.log(err))
  }, [])

  // Função para obter o token
  function getToken() {
    return localStorage.getItem('token');
  }

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
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
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
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
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
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
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
          <ModalConfirmDelete deleteTask={deleteTask} taskId={taskId} setConfirmDelete={setConfirmDelete} />
        ) : null
      }

      <div className='flex flex-col gap-6 justify-center items-center sm:w-[480px] w-[90%]'>

        <Logo />

        <AddTask onAddTaskClick={onAddTaskClick} />

        <Tasks tasks={tasks} onDeleteTaskClick={onDeleteTaskClick} onTaskClick={onTaskClick} onSeeDetailsClick={onSeeDetailsClick} />

      </div>
    </div>
  )
}

export default App;