import React, { JSX } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { TUser } from '../../models/user/user.types';
import { historyStore } from '../../history-store';
// @ts-ignore
import Logo from '../../image/logo.png';
import { authApi } from '../../models/auth';
import { AdminRoutes } from '../../routes/routes';

export const AdminHeader = (user: TUser): JSX.Element => {
  return (
    <Navbar
      bg={'dark'}
      variant={'dark'}
    >
      <Container style={{ display: 'flex', alignItems: 'center' }}>
        <Navbar.Brand>
          <img
            alt={'MathMech logo'}
            src={Logo}
            width={'30'}
            height={'30'}
            className={'d-inline-block align-top'}
          />
          {' Распределение укрупненных групп'}
        </Navbar.Brand>
        <Nav style={{ marginRight: 'auto' }}>
          <NavDropdown
            title={'Скачать'}
            id={'download-nav-dropdown'}
          >
            <NavDropdown.Item onClick={() => historyStore.push(AdminRoutes.DOWNLOAD_USERS)}>
              {'Таблица студентов'}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => historyStore.push(AdminRoutes.DOWNLOAD_USER_TEMPLATE)}>
              {'Шаблон студента'}
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={'Модификация'}
            id={'modify-nav-dropdown'}
          >
            <NavDropdown.Item onClick={() => historyStore.push(AdminRoutes.MODIFY_USERS)}>
              {'Загрузка / Удаление студентов'}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => historyStore.push(AdminRoutes.EDIT_MOTHER_GROUP)}>
              {'Добавить материнскую группу'}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => historyStore.push(AdminRoutes.LOAD_DOCUMENT_TEMPLATE)}>
              {'Загрузить шаблон документа'}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <NavDropdown
            title={`${user.lastName} ${user.firstName} ${user.middleName}`}
            id={'basic-nav-dropdown'}
          >
            <NavDropdown.Item onClick={authApi.logout}>
              {'Выйти'}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};
