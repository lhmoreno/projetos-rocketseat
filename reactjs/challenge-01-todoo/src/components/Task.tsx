import { CheckCircle, Circle, DotsSixVertical, Trash } from "phosphor-react"
import styles from '../styles/Task.module.css'

export type TaskData = {
  id: string
  description: string
  completed?: boolean
}

type TaskProps = {
  data: TaskData
  onChange?: (updatedTask: TaskData) => void
  onDelete?: (taskId: string) => void
}

export function Task({ data, onChange, onDelete }: TaskProps) {
  return (
    <div className={styles.task}>
      <button
        className={styles.dots}
        type="button" 
      >
        <DotsSixVertical />
      </button>

      <div className={styles.description}>
        <input 
          id={data.id}
          type="checkbox" 
          checked={data.completed ?? false}
          onChange={ev => onChange && onChange({...data, completed: ev.target.checked})} 
        />
        <label htmlFor={data.id}>
          {data.completed ? <CheckCircle weight="fill" /> : <Circle />}
          {data.description}
        </label>
      </div>

      <button
        className={styles.trash}
        type="button"
        onClick={() => onDelete && onDelete(data.id)}
      >
        <Trash />
      </button>
    </div>
  )
}
