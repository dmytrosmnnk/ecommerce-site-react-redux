import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar';

export class Layout extends React.Component {
  render() {
    return (
      <>
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
      </>
    );
  }
}
