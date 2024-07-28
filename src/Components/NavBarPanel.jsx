import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiShoppingCart } from 'react-icons/ci';
import { IoArrowBackSharp } from 'react-icons/io5';

const NavBarPanel = () => {
  const cartProducts = useSelector(state => state.cart);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the page title based on the current pathname
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'Shop';
      case '/cart':
        return 'Cart';
      case '/product':
        return 'Product Details';
      default:
        return 'Shop';
    }
  };

  const handleHistory = () => {
    navigate('/');
  };

  return (
    <div className='flex justify-between items-center p-4 bg-gray-100 shadow-md'>
      {/* Back button (only visible when not on the home page) */}
      {location.pathname !== '/' && (
        <section onClick={handleHistory} className='cursor-pointer'>
          <IoArrowBackSharp size={24} />
        </section>
      )}

      {/* Page Title */}
      <h1 className='font-semibold text-2xl'>
        {getPageTitle(location.pathname)}
      </h1>

      {/* Cart Icon with item count */}
      <span className='absolute top-4 right-4 flex items-center cursor-pointer'>
        <Link to="/cart">
          <CiShoppingCart className='text-2xl text-gray-600' />
          <span className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs'>
            {cartProducts.length}
          </span>
        </Link>
      </span>
    </div>
  );
};

export default NavBarPanel;
