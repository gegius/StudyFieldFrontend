import { useStore } from 'effector-react';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { UserHeader } from '../components/headers';
import { userApi } from '../models/user';
import { PriorityPage } from '../pages/user-pages/priority-page';
import { UnauthorizedRoutes, UserRoutes } from '../routes/routes';

export const UserRoot = (): JSX.Element => {
  const user = useStore(userApi.$user);

  if (!user) {
    return <>Error</>;
  }

  return (
    <>
      <UserHeader {...user}/>
      <Switch>
        <Route
          path={UserRoutes.SET_PRIORITY}
          exact
          component={PriorityPage}
        />
        <Redirect
          from={UnauthorizedRoutes.INDEX}
          to={UserRoutes.SET_PRIORITY}
        />
        <Redirect to={UnauthorizedRoutes.INDEX}/>
      </Switch>
    </>
  );
};
