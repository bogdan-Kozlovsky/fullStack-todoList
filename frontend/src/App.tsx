import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useAuthStore} from "./store/useAuth";
import {privateRoutes, publicRoutes} from "./routers";
import {PATHS} from "./utils/types/Routes.enum";

const App = (): React.ReactElement => {

  const checkLoginStatus = useAuthStore(state => state.checkLoginStatus)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  React.useEffect(() => {
    checkLoginStatus()
  }, []);

  return (
    <div className="container">
      <Routes>
        {publicRoutes.map(({component: Component, path}) => (
          <Route key={path} path={path} element={<Component/>}/>
        ))}

        {privateRoutes.map(({component: Component, path}) => (
          <Route key={path} path={path} element={isLoggedIn ? <Component/> : <Navigate to={PATHS.WELCOME}/>}/>
        ))}
      </Routes>
    </div>
  );
};

export {App};
