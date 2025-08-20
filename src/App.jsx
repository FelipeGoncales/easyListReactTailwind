import { useEffect, useState } from 'react';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Logo from './components/Logo'
import ModalConfirmDelete from './components/ModalConfirmDelete';
import InfoUser from './components/InfoUser';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import limparRota from './components/limparRota';
import createQuery from './components/createQuery';
import { v4 } from 'uuid';

// URL da API
const url = "https://easylistapi.onrender.com";

function App() {

  // Chama o navigate fora da função
  const navigate = useNavigate();
  const route = useLocation();
  const [searchParams] = useSearchParams();

  // Variável para exibir mensagem
  const [msg, setMsg] = useState(null);

  // Loading
  const [loading, setLoading] = useState(true);

  // Tasks
  const [tasks, setTasks] = useState([])

  // Obtém os dados do usuário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  // Effect onChange msg
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(null), 4000);
      return () => clearTimeout(timer); // limpa o timer se a msg mudar antes
    }
  }, [msg]);

  // Função para exibir mensagem de erro
  function showMessage(text, type = "error") {
    setMsg({ text, type });
  }

  // Envia para login caso não tenha token salvo
  useEffect(() => {
    const token = getToken();

    if (!token) {
      if (route.pathname !== '/login' && route.pathname !== '/cadastro') {
        // Se não tiver token e não estiver na rota de login ou cadastro, redireciona para login
        navigate('/login');
      }
    }
  }, [navigate, route])

  // Busca as tasks e os dados do usuário
  useEffect(() => {
    // Obtém o token
    const token = getToken();

    // Retorna caso seja inválido
    if (!token) return;

    // Variável de controle
    let cancelled = false;

    // Função para acessar ambas as requisições
    const fetchBoth = async () => {
      try {
        // roda em paralelo
        const [resTasks, resUser] = await Promise.all([
          fetch(`${url}/task`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${url}/cadastro`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        // se qualquer requisição falhar, limpa token e evita continuar
        if (!resTasks.ok || !resUser.ok) {
          onSairClick("error", "Usuário não encontrado");
          if (!cancelled) {
            setTasks([]);
            setNome('');
            setEmail('');
            setLoading(false);
          }
          return;
        }

        // Obtém as informações das requisições
        const tasksData = await resTasks.json();
        const userData = await resUser.json();

        // Caso já tenha terminado retorna
        if (cancelled) return;

        // Altera as variáveis com state
        setTasks(Array.isArray(tasksData.tasks) ? tasksData.tasks : []);
        setNome(userData?.usuario?.nome ?? '');
        setEmail(userData?.usuario?.email ?? '');

        // params de mensagem
        const msgType = searchParams.get("type");
        const msgText = searchParams.get("text");

        // Caso existam os componentes da mensagem, exibe a mensagem
        if (msgType || msgText) {

          limparRota(['text', 'type'], navigate, route, searchParams);

          return showMessage(msgText, msgType)
        }

      } catch (err) {
        console.error(err);

        // opcional: mostrando fallback/limpeza
        if (!cancelled) {
          setTasks([]);
          setNome('');
          setEmail('');
        }

      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchBoth();
  }, [searchParams, route, navigate]);

  // Função para obter o token
  function getToken() {
    return localStorage.getItem('token');
  }

  // Função para adicionar nova tarefa
  function onAddTaskClick(title, desc, data) {

    // Cria o novo objeto task
    const newTask = {
      titulo: title,
      descricao: desc,
      isCompleted: false,
      data: data,
      // ID aleatório provisoriamente
      id: v4()
    };

    // Organiza as tasks por data crescente
    setTasks((prev) => {
      const updatedTasks = [...prev, newTask];
      const sortedTasks = updatedTasks.sort((a,b) => new Date(a.data) - new Date(b.data));
      return sortedTasks;
    })

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
        setTasks((prev) => {
          // Atualiza a lista e retorna ela organizada por data crescente
          const updatedTasks = [...prev.filter(t => t !== newTask), data.newTask];
          const sortedTasks = updatedTasks.sort((a,b) => new Date(a.data) - new Date(b.data));
          return sortedTasks;
      });
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

  // Limpa o token e redireciona para a página de login
  function onSairClick(type, text) {
    localStorage.removeItem('token');

    // Redireciona o usuário para login após limpar o token
    createQuery(navigate, '/login', {
      'type': type,
      'text': text
    })
  }

  // Função para navegar para a página de ver detalhes
  function onSeeDetailsClick(id) {

    // Função para redirecionar para task com parâmetro id
    createQuery(navigate, '/task', {
      'id': id
    })

  }

  return (
    <div
      className="min-h-screen w-full bg-gray-200 flex justify-center items-center sm:p-[80px_0] p-[20px_0_30px_0]"
    >

      {
        loading ? (
          <div className='flex items-center justify-center absolute top-0 left-0 bg-gray-200 w-full h-full z-10'>
            <ClipLoader size={30} margin={3} speedMultiplier={1.1} />
          </div>
        ) : null
      }

      <div className='flex flex-col gap-6 justify-center items-center sm:w-[480px] w-[90%]'>

        <Logo />

        <AddTask onAddTaskClick={onAddTaskClick} showMessage={showMessage} />

        <Tasks tasks={tasks} onTaskClick={onTaskClick} onSeeDetailsClick={onSeeDetailsClick} />

        <InfoUser nome={nome} email={email} onSairClick={() => onSairClick('success', 'Logout realizado com sucesso!')} />

      </div>

      {
        msg && (
          <div className="fixed left-1/2 transform -translate-x-1/2 bottom-[30px] flex items-center justify-center w-full">
            <div
              className={`flex items-center justify-center p-3 rounded-md gap-3 shadow-md max-w-[350px] msg
    ${msg.type === "error" ? "bg-red-400 text-red-800" : "bg-green-400 text-green-800"}`}
            >
              <i className={`fa-solid ${msg.type === "error" ? "fa-xmark" : "fa-check"} text-[15px]`} />
              <p className="text-[14px]/[1.1rem] font-semibold">{msg.text}</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App;