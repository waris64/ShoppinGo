import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {CiShoppingCart} from 'react-icons/ci'
const NavBarPanel = () => {
  const cartProducts = useSelector(state => state.cart);

  return (
    <div className='flex justify-around items-center'>
      <h1 className='font-semibold text-4xl py-4'>
        Products 
      </h1>
      <span className='font-semibold '>
        <Link to="/cart" className=''>
        <span className='pt-4 pl-3 absolute font-semibold'>
          <span className='pl-2'>
            {cartProducts.length}
          </span>
        </span>
        <CiShoppingCart className='size-14  bg-gray-200 rounded-2xl ' />
        </Link>
        </span>
    </div>
  );
};

export default NavBarPanel;
