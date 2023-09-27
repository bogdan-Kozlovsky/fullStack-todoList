import {IUserInformation} from "./account.interface";
import {instance} from "../config";
import {AxiosResponse} from "axios";

class AccountApi {
  async me(token: string): Promise<IUserInformation> {
    const response: AxiosResponse<IUserInformation> = await instance.get('/auth/me', {
      headers: {
        'Authorization': `${token}`
      }
    })
    return response.data
  }
}

export {AccountApi}
