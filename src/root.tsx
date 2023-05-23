import { useStore } from 'effector-react';
import React, { useEffect, JSX } from 'react';
import { Router, Switch } from 'react-router-dom';
import { AlertNotify } from './components';
import { authApi } from './models/auth';
import { AuthorizedRoot } from './routes/authorized-root';
import { UnauthorizedRoot } from './routes/unauthorized-root';
import { historyStore } from './history-store';

export const Root = (): JSX.Element => {

  useEffect(() => {
    authApi.verifyToken();
  }, []);

  const isAuthorized = useStore(authApi.$isAuthorized);
  return (
    <Router history={historyStore}>
      <AlertNotify/>
      <Switch>
        {isAuthorized ? <AuthorizedRoot/> : <UnauthorizedRoot/>}
      </Switch>
    </Router>
  );
};
