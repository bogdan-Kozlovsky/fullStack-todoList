interface ITodoList {
  _id: string
  name: string
  tasks: any[]
  authorTodoList: string
  created_at: string
  __v: number
}

interface ISuccessResponse {
  success: boolean
  message: string
}

export {ITodoList, ISuccessResponse}
