import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const delLogo = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>)
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("taskList"));
    return saved ? saved : [];
  });

  const handleAdd = () => {
    if (task.trim() !== '') {
      let value = {
        id: Date.now(),
        value: task.trim()
      }
      const updatedList = [...tasks, value]
      setTasks(updatedList)
      setTask('')
    }

  }
  const handleEdit = (index) => {
    const editedTask = prompt("Edit the task")

    if (editedTask.trim() !== '') {
      let updatedList = [...tasks]
      updatedList[index].value = editedTask;
      setTasks(updatedList)

    }

  }

  const delTask = (id) => {
    const updatedList = tasks.filter((task) => task.id !== id);
    setTasks(updatedList);
  };


  const handleAllClear = () => {
    localStorage.removeItem("taskList");
    setTasks([])
  }

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }, [tasks]);



  return (
    <div className='bg-blur p-3.5 rounded-2xl'>
      <input type="text" className='ip' placeholder='Enter a task' value={task} onChange={(e) => setTask(e.target.value)} />
      <button className='btn' onClick={handleAdd}>Add</button>
      <ul>
        {
          tasks.map((task, index) => (
            <li key={task.id} className='listItem'>
              <span className='text-xl' >{task.value}</span>
              <div className='flex '>
                <button className='btn' onClick={() => handleEdit(index)} >Edit</button>
                <button className='btn' onClick={() => delTask(task.id)}>{delLogo}</button>
              </div>

            </li>
          )

          )
        }
      </ul>


      <button className='btn block m-auto mt-4' onClick={handleAllClear}>Clear All</button>
    </div>
  )
}

export default App
