import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ChangePasswordPage } from '../pages/change-password-page';
import { LoginPage } from '../pages/login-page';
import { UnauthorizedRoutes } from '../routes/routes';

export const UnauthorizedRoot = (): JSX.Element => {

  return (
    <Switch>
      <Route
        path={UnauthorizedRoutes.INDEX}
        exact
        component={LoginPage}
      />
      <Route
        path={UnauthorizedRoutes.CHANGE_PASSWORD}
        exact
        component={ChangePasswordPage}
      />
      <Redirect to={UnauthorizedRoutes.INDEX}/>
    </Switch>
  );
};
