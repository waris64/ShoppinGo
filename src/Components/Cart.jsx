import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove, increment, decrement } from '../store/cartSlice';
import Toast, { Toaster } from 'react-hot-toast';
import { MdOutlineRemoveCircle } from "react-icons/md";

const Cart = () => {
  const cartProducts = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const removeToCart = (id) => {
    dispatch(remove(id));
    Toast.success("Product removed");
  };

  const incrementQuantity = (id) => {
    dispatch(increment(id));
  };

  const decrementQuantity = (id) => {
    dispatch(decrement(id));
  };

  const totalCartPrice = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);

  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <Toaster />

      <div className="container mx-auto py-10">


        <div className="mt-8 flex justify-end items-center ">
          <div className="text-right  ">
            <p className="text-lg font-bold">Subtotal:</p>
            <p className="text-lg font-bold">${totalCartPrice.toFixed(2)}</p>
          </div>
          <button className="ml-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-4 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-2">
            Checkout
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-7 ">

          {cartProducts.map(product => (
            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden relative  ">
              <img src={product.image} alt={product.title} className="w-full size-56 overflow-hidden  p-4  " />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>

                <div className="flex items-center mt-2">
                  <button onClick={() => decrementQuantity(product.id)} className="px-3 py-1 bg-red-500 hover:bg-gray-300 text-gray-700 rounded-l">
                    Remove
                  </button>
                  <input type="text" value={product.quantity} readOnly className="py-1 px-4 w-1/2  bg-gray-200 text-center " />
                  <button onClick={() => incrementQuantity(product.id)} className="px-3 py-1 bg-green-500 hover:bg-gray-300 text-gray-700 rounded-r">
                    Add
                  </button>
                </div>
              </div>
              <MdOutlineRemoveCircle 
                className="absolute -top-3 right-0 m-4 text-3xl text-red-500 cursor-pointer hover:text-red-700" 
                onClick={() => removeToCart(product.id)} 
              />
            </div>
          ))}
        </div>
      </div>
      {cartProducts.length <= 0 && <div className='m-auto text-center font-semibold xl:text-xl'>No Products</div>}
    </div>
  );
};

export default Cart;
