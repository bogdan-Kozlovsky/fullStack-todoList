import {ITodoList} from "../../../services/todoList/todoList.interface";
import React from "react";
import {useInput} from "../../../utils/hooks/useInput";
import {TodoListApi} from "../../../services/todoList/todoList";
import s from "./s.module.scss";

type PropsType = {
  todo: ITodoList
  onDeleteTodo: (todoId: string) => void
  getAllTodos: () => void
}
const TodoList = (props: PropsType): React.ReactElement => {
  const {todo, onDeleteTodo, getAllTodos} = props
  const {name, _id} = todo

  const {value: todoListUpdateValue, onChange: onChangeTodoListUpdate} = useInput(name)

  const [isShowUpdate, setIsShowUpdate] = React.useState(false)

  const handleUpdateTodoList = (): void => {
    setIsShowUpdate(!isShowUpdate)
  }

  const onUpdateTodoList = async (): Promise<void> => {
    try {
      const updateTodoList = {
        name: todoListUpdateValue.trim(),
      }
      const {success} = await new TodoListApi().updateTodoList(updateTodoList, _id)

      if (success) {
        getAllTodos()
        setIsShowUpdate(false)
      }
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div className={s.todo} key={todo._id}>
      {isShowUpdate ? (
        <>
          <input
            type="text"
            value={todoListUpdateValue}
            onChange={onChangeTodoListUpdate}
            placeholder="update name todo"
          />

          <button onClick={onUpdateTodoList}>submit</button>
        </>
      ) : (
        todo.name
      )}

      <div>
        <button onClick={() => onDeleteTodo(todo._id)}>X</button>
        <button onDoubleClick={handleUpdateTodoList}>update</button>
      </div>
    </div>
  )
}

export {TodoList}
