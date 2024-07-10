import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CiShoppingCart } from 'react-icons/ci'
// import { useHistory } from "react-router-dom";
// import { IoArrowBackSharp } from "react-icons/io5";

const NavBarPanel = () => {
  const cartProducts = useSelector(state => state.cart);
  // let history= useHistory();
  // function handleHistory() {
  //   history.push('/')

  // }
  return (
    <div className='flex justify-around items-center'>
      {/* <section onClick={handleHistory}>
       <IoArrowBackSharp />
      </section> */}

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
