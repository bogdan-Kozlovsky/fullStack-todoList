import React from 'react';
import {Link} from "react-router-dom";
import {PATHS} from "../../utils/types/Routes.enum";

const Welcome = (): React.ReactElement => {
  return (
    <>
      <h1>WELCOME</h1>
      <nav>
        <ul>
          <li>
            <Link to={PATHS.LOGIN}>Login</Link>
          </li>
          <li>
            <Link to={PATHS.REGISTRATION}>Registration</Link>
          </li>
          <li>
            <Link to={PATHS.ROOT}>Home</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export {Welcome};
