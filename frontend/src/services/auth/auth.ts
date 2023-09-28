import {ISigInData, IAuthResponse, ISigUpData} from "./auth.interface";
import {axiosInstance} from "../config";

class AuthApi {
  async sigIn(sigInData: ISigInData): Promise<IAuthResponse> {
    return await axiosInstance.post<IAuthResponse>('/auth/login', sigInData)
  }

  async sigUp(sigInData: ISigUpData): Promise<IAuthResponse> {
    return await axiosInstance.post<IAuthResponse>('/auth/register', sigInData)
  }
}

export {AuthApi}
