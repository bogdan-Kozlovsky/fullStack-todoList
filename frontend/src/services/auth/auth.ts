import {ISigInData, IAuthResponse, ISigUpData} from "./auth.interface";
import {instance} from "../config";

class AuthApi {
  async sigIn(sigInData: ISigInData): Promise<IAuthResponse> {
    return await instance.post<IAuthResponse>('/auth/login', sigInData)
  }

  async sigUp(sigInData: ISigUpData): Promise<IAuthResponse> {
    return await instance.post<IAuthResponse>('/auth/register', sigInData)
  }
}

export {AuthApi}
