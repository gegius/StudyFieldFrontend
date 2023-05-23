import { useStore } from 'effector-react';
import React, { JSX } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AdminHeader } from '../components/headers';
import { userApi } from '../models/user';
import {
  ModifyUsersPage,
  EditMotherGroupPage,
  LoadDocumentTemplatePage,
  DownloadUsersPage, DownloadUserTemplatePage
} from '../pages/admin-pages';
import { AdminRoutes, UnauthorizedRoutes } from '../routes/routes';

export const AdminRoot = (): JSX.Element => {
  const user = useStore(userApi.$user);

  if (!user) {
    return <>Error</>;
  }

  return (
    <>
      <AdminHeader {...user}/>
      <Switch>
        <Route
          path={AdminRoutes.MODIFY_USERS}
          exact
          component={ModifyUsersPage}
        />
        <Route
          path={AdminRoutes.EDIT_MOTHER_GROUP}
          exact
          component={EditMotherGroupPage}
        />
        <Route
          path={AdminRoutes.LOAD_DOCUMENT_TEMPLATE}
          exact
          component={LoadDocumentTemplatePage}
        />
        <Route
          path={AdminRoutes.DOWNLOAD_USERS}
          exact
          component={DownloadUsersPage}
        />
        <Route
          path={AdminRoutes.DOWNLOAD_USER_TEMPLATE}
          exact
          component={DownloadUserTemplatePage}
        />
        <Redirect
          from={UnauthorizedRoutes.INDEX}
          to={AdminRoutes.DOWNLOAD_USERS}
        />
        <Redirect to={UnauthorizedRoutes.INDEX}/>
      </Switch>
    </>
  );
};
