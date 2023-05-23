import React, { JSX } from 'react';
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { TUser } from '../../models/user/user.types';
// @ts-ignore
import Logo from '../../image/logo.png';
import { authApi } from '../../models/auth';

export const UserHeader = (user: TUser): JSX.Element => {
  return (
    <Navbar bg={'light'}>
      <Container>
        <Navbar.Brand>
          <img
            alt={'MathMech logo'}
            src={Logo}
            width={'30'}
            height={'30'}
            className={'d-inline-block align-top'}
          />{' '}
          {'Распределение укрупненных групп'}
        </Navbar.Brand>
        <NavDropdown
          title={`${user.lastName} ${user.firstName} ${user.middleName}`}
          id={'basic-nav-dropdown'}
        >
          <NavDropdown.Item onClick={authApi.logout}>
            {'Выйти'}
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};
