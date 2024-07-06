import { useState, FormEvent, useEffect } from 'react'
import styles from './styles/App.module.css'
import { ClipboardText, PlusCircle } from 'phosphor-react'
import { Task, TaskData } from './components/Task'
import { v4 as uuid } from 'uuid'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

function App() {
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [tasks, setTasks] = useState<TaskData[]>(() => {
    const res = localStorage.getItem('@todoo-1.0.0:tasks')
    if (!res) return []

    const data = JSON.parse(res)

    return data
  })

  const blockSubmission = newTaskDescription.length <= 3
  const completedTasksAmount = tasks.reduce((length, task) => {
    if (task.completed) return length + 1
    return length
  }, 0)

  useEffect(() => {
    localStorage.setItem('@todoo-1.0.0:tasks', JSON.stringify(tasks))
  }, [tasks])

  function handleChangeNewTaskDescription(value: string) {
    if (value === ' ') return

    setNewTaskDescription(value)
  }

  function handleCreateNewTask(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    if (blockSubmission) return

    const cleanTaskDescription = newTaskDescription.trim().replace(/\s{2,}/g, ' ')

    if (cleanTaskDescription.length <= 3) {
      setNewTaskDescription(cleanTaskDescription)
      return
    }

    setNewTaskDescription('')

    setTasks(value => {
      return [...value, {
        id: uuid(),
        description: cleanTaskDescription
      }]
    })
  }

  function handleUpdatedTask(updatedTask: TaskData) {
    setTasks(value => {
      const updatedTasks = [...value]
      const taskIndex = value.findIndex(({id}) => id === updatedTask.id)
      updatedTasks[taskIndex] = updatedTask

      return updatedTasks
    })
  }
  
  function handleDeletedTask(taskId: string) {
    setTasks(value => {
      return value.filter(({id}) => id !== taskId)
    })
  }

  function onDragEnd(result: DropResult) {
    if (!result.destination) return

    setTasks(value => {
      const destinationIndex = result.destination?.index
      if (!destinationIndex && destinationIndex !== 0) return value
      
      const orderedTasks = [...value]
      const [removed] = orderedTasks.splice(result.source.index, 1)
      orderedTasks.splice(destinationIndex, 0, removed)

      return orderedTasks
    })
  }

  return (
    <div className={styles.container}>
      <header>
        <img src="/logo.svg" alt="Logo mostrando um foguete ao lado do nome todoo" />
      </header>
      <main>
        <form onSubmit={handleCreateNewTask}>
          <input 
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskDescription}
            onChange={ev => handleChangeNewTaskDescription(ev.target.value)}
          />
          <button
            type="submit"
            disabled={blockSubmission}
          >
            Criar
            <PlusCircle size={18} weight="bold" />
          </button>
        </form>

        <div className={styles.tasksInfo}>
          <div>
            <p className={styles.createdTasksInfo}>Tarefas criadas</p>
            <span>{tasks.length}</span>
          </div>
          <div>
            <p className={styles.completedTasksInfo}>Concluídas</p>
            <span>{`${completedTasksAmount} de ${tasks.length}`}</span>
          </div>
        </div>

        {!tasks.length &&
          <span className={styles.noTasksContainer}>
            <ClipboardText />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </span>
        }

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided, snapshot) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task data={task} onChange={handleUpdatedTask} onDelete={handleDeletedTask} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </div>
  )
}

export default App
