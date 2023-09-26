interface IAuthResponse {
  _id: string
  email: string
  passwordHash: string
  fullName: string
  createdAt: string
  updatedAt: string
  __v: number
  token: string
}

interface ISigInData {
  email: string;
  password: string;
}

interface ISigUpData {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export {IAuthResponse, ISigInData, ISigUpData}
