import React from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavBarPanel from './NavBarPanel';
import store from '../store/store';

const RootLayout = () => {
  return (
    <Provider store={store}>
      <>
        <NavBarPanel />
        <main className='flex flex-row-reverse'>
          <Outlet />
        </main>
      </>
    </Provider>
  );
}

export default RootLayout;
