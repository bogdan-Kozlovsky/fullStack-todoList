import React from 'react';
import {TodoListApi} from "../../services/todoList/todoList";
import {useInput} from "../../utils/hooks/useInput";
import {useTodoList} from "../../store/useTodoList";
import s from './s.module.scss';
import {TodoList} from "./todoList/TodoList";

const TodoLists = (): React.ReactElement => {
  const todoLists = useTodoList(state => state.todoLists)
  const setTodoList = useTodoList(state => state.setTodoList)

  const {value: todoListValue, onChange: onChangeTodoList} = useInput('test')

  const getAllTodoLists = async (): Promise<void> => {
    try {
      const allTodoList = await new TodoListApi().getAllTodoList()

      setTodoList(allTodoList)
    } catch (e) {
      console.log(e)
    }
  }

  const onCreateTodoList = async (): Promise<void> => {
    const newTodoList = {
      name: todoListValue.trim(),
    }

    try {
      const allTodoList = await new TodoListApi().createTodoList(newTodoList)

      if (allTodoList) {
        setTodoList(allTodoList)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onDeleteTodoList = async (todoId: string): Promise<void> => {
    try {
      const {success} = await new TodoListApi().deleteTodoList(todoId)

      if (success) {
        setTodoList(todoLists.filter(todo => todo._id !== todoId))
      }
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    getAllTodoLists()
  }, [])

  return (
    <div className={s.t}>
      <div className={s.t__form}>
        <input
          type="text"
          value={todoListValue}
          onChange={event => onChangeTodoList(event)}
        />
        <button onClick={onCreateTodoList}>create TodoList</button>
      </div>

      <div className={s.t__wrapper}>
        {todoLists.map(todo => {
          return (
            <TodoList
              key={todo._id}
              todo={todo}
              onDeleteTodo={onDeleteTodoList}
              getAllTodos={getAllTodoLists}
            />
          )
        })}
      </div>
    </div>
  );
};

export {TodoLists};
