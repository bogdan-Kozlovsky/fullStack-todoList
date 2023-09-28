import {IUserInformation} from "./account.interface";
import {axiosInstance} from "../config";
import {AxiosResponse} from "axios";

class AccountApi {
  async me(): Promise<IUserInformation> {
    const response: AxiosResponse<IUserInformation> = await axiosInstance.get('/auth/me')
    return response.data
  }
}

export {AccountApi}
