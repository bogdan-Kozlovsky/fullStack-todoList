import {axiosInstance} from "../config";
import {ISuccessResponse, ITodoList} from "./todoList.interface";

class TodoListApi {
  async getAllTodoList(): Promise<ITodoList[]> {
    const response = await axiosInstance.get<ITodoList[]>('/todolist')

    return response.data
  }

  async createTodoList(newTodoList: { name: string }): Promise<ITodoList[]> {
    const response = await axiosInstance.post<ITodoList[]>('/todolist', newTodoList)

    return response.data
  }

  async updateTodoList(newTodoListName: { name: string }, todolistId: string): Promise<ISuccessResponse> {
    const response = await axiosInstance.put<ISuccessResponse>(`/todolist/${todolistId}`, newTodoListName)

    return response.data
  }

  async deleteTodoList(todoId: string): Promise<ISuccessResponse> {
    const response = await axiosInstance.delete<ISuccessResponse>(`/todolist/${todoId}`)

    return response.data
  }
}

export {TodoListApi}
