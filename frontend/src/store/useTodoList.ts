import {ITodoList} from "../services/todoList/todoList.interface";
import {create} from "zustand";

interface ITodoListState {
  todoLists: ITodoList[]
  setTodoList: (todoLists: ITodoList[]) => void
}

const useTodoList = create<ITodoListState>((set) => ({
  todoLists: [],
  setTodoList: (allTodoList: ITodoList) => {
    set({todoLists: allTodoList})
  }
}))

export {useTodoList}
