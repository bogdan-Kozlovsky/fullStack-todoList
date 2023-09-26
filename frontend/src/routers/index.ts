import {PATHS} from "../utils/types/Routes.enum";
import {Login} from "../pages/login/Login";
import {Registration} from "../pages/registration/Registration";
import {Home} from "../pages/Home";
import {Welcome} from "../pages/welcome/Welcome";

const publicRoutes = [
  {
    path: PATHS.LOGIN,
    component: Login,
  },
  {
    path: PATHS.REGISTRATION,
    component: Registration,
  },
  {
    path: PATHS.WELCOME,
    component: Welcome,
  },
]

const privateRoutes = [
  {
    path: PATHS.ROOT,
    component: Home,
  },
]

export {publicRoutes, privateRoutes}
